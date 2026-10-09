<?php

namespace GOT\Commerce\SiteMode;

/**
 * Owns the persisted public site mode, its transition guard and its audit log.
 */
final class SiteMode
{
    public const OPTION = 'got_site_mode';
    public const ACTIVITY_OPTION = 'got_site_mode_activity';
    public const CAPABILITY = 'got_manage_site_mode';
    public const NONCE_ACTION = 'got_site_mode_change';
    public const PAGE_SLUG = 'got-site-mode';

    private const MODES = ['coming_soon', 'store'];

    public static function register(): void
    {
        add_action('init', [self::class, 'grant_role_capabilities']);
        add_action('admin_menu', [self::class, 'register_admin_page']);
        add_action('admin_post_got_change_site_mode', [self::class, 'handle_admin_post']);
        add_action('admin_notices', [self::class, 'render_result_notice']);
    }

    public static function grant_role_capabilities(): void
    {
        foreach (['administrator', 'shop_manager'] as $role_name) {
            $role = get_role($role_name);
            if ($role && empty($role->capabilities[self::CAPABILITY])) {
                $role->add_cap(self::CAPABILITY);
            }
        }
    }

    public static function register_admin_page(): void
    {
        add_menu_page(
            __('Site Mode', 'got-commerce'),
            __('Site Mode', 'got-commerce'),
            self::CAPABILITY,
            self::PAGE_SLUG,
            [self::class, 'render_admin_page'],
            'dashicons-store'
        );
    }

    public static function get_mode(): string
    {
        $mode = get_option(self::OPTION, 'coming_soon');

        return in_array($mode, self::MODES, true) ? $mode : 'coming_soon';
    }

    /**
     * Process a submitted mode. Does not redirect, so the result is testable.
     *
     * @return array{status:string, message:string}
     */
    public static function process_submission($requested_mode, $nonce, $user): array
    {
        if (! self::user_may_manage($user)) {
            return ['status' => 'forbidden', 'message' => __('You are not allowed to change Site Mode.', 'got-commerce')];
        }

        if (! is_string($nonce) || ! wp_verify_nonce($nonce, self::NONCE_ACTION)) {
            return ['status' => 'invalid_nonce', 'message' => __('The Site Mode form expired. Please try again.', 'got-commerce')];
        }

        if (! is_string($requested_mode) || ! in_array($requested_mode, self::MODES, true)) {
            return ['status' => 'invalid_mode', 'message' => __('Choose a valid Site Mode.', 'got-commerce')];
        }

        $lock = self::acquire_transition_lock();
        if ($lock['status'] !== 'acquired') {
            return [
                'status' => $lock['status'],
                'message' => $lock['message'],
            ];
        }

        try {
            $result = self::process_locked_submission($requested_mode, $user);
        } finally {
            $lock_released = self::release_transition_lock($lock['name']);
        }

        if (! $lock_released) {
            return [
                'status' => 'lock_release_failed',
                'message' => __('The Site Mode change was processed, but its database lock could not be released. Check the current mode and retry if needed.', 'got-commerce'),
            ];
        }

        return $result;
    }

    /**
     * Perform all state reads and writes only while the named lock is held.
     *
     * @param mixed $user
     * @return array{status:string, message:string}
     */
    private static function process_locked_submission(string $requested_mode, $user): array
    {
        $previous_mode = self::get_mode();
        if ($requested_mode === $previous_mode) {
            return ['status' => 'unchanged', 'message' => __('Site Mode is already set to that value.', 'got-commerce')];
        }

        $product_counts = self::get_product_counts();
        if ($requested_mode === 'store' && $product_counts['in_stock'] < 1) {
            return [
                'status' => 'guard_rejected',
                'message' => __('Store mode requires at least one published, in-stock product. No changes were made.', 'got-commerce'),
            ];
        }

        // These are separate options, not a transaction. Snapshot both before
        // writing, then compensate both if either write or verification throws.
        $missing_option = new \stdClass();
        $snapshots_ready = false;
        $mode_write_attempted = false;
        $persistence_failure = null;
        $old_mode_value = $missing_option;
        $old_activity_value = $missing_option;
        $old_mode_exists = false;
        $old_activity_exists = false;

        try {
            $old_mode_value = get_option(self::OPTION, $missing_option);
            $old_mode_exists = $old_mode_value !== $missing_option;
            $old_activity_value = get_option(self::ACTIVITY_OPTION, $missing_option);
            $old_activity_exists = $old_activity_value !== $missing_option;
            $snapshots_ready = true;

            $history = is_array($old_activity_value) ? $old_activity_value : [];
            $history[] = self::make_activity_entry($previous_mode, $requested_mode, $user);

            if (! self::write_option_and_verify(self::ACTIVITY_OPTION, $history, false)) {
                $persistence_failure = 'audit_write_failed';
            } else {
                $mode_write_attempted = true;
                if (! self::write_option_and_verify(self::OPTION, $requested_mode)) {
                    $persistence_failure = 'save_failed';
                }
            }
        } catch (\Throwable $error) {
            if (! $snapshots_ready) {
                return [
                    'status' => 'save_failed',
                    'message' => __('Site Mode could not be changed because its previous state could not be read. No option writes were attempted.', 'got-commerce'),
                ];
            }

            $persistence_failure = $mode_write_attempted ? 'save_failed' : 'audit_write_failed';
        }

        if ($persistence_failure !== null) {
            // Attempt both restorations even if the first one fails or throws.
            $mode_restored = self::restore_option(self::OPTION, $old_mode_exists, $old_mode_value);
            $activity_restored = self::restore_option(
                self::ACTIVITY_OPTION,
                $old_activity_exists,
                $old_activity_value
            );

            if (! $mode_restored || ! $activity_restored) {
                return [
                    'status' => 'rollback_failed',
                    'message' => __('Site Mode persistence failed and compensating cleanup could not be verified. Inspect the current mode and activity history.', 'got-commerce'),
                ];
            }

            return $persistence_failure === 'audit_write_failed'
                ? ['status' => 'audit_write_failed', 'message' => __('The activity record could not be persisted. The prior mode and activity history were restored.', 'got-commerce')]
                : ['status' => 'save_failed', 'message' => __('Site Mode could not be persisted. The prior mode and activity history were restored.', 'got-commerce')];
        }

        // Both options are committed. Cache failures are reported without
        // pretending that the persisted transition was rolled back.
        try {
            if (! self::invalidate_caches($previous_mode, $requested_mode)) {
                return [
                    'status' => 'cache_invalidation_failed',
                    'message' => __('Site Mode and its activity record were saved, but cache invalidation failed. Check the public site cache.', 'got-commerce'),
                ];
            }
        } catch (\Throwable $error) {
            return [
                'status' => 'cache_invalidation_failed',
                'message' => __('Site Mode and its activity record were saved, but cache invalidation failed. Check the public site cache.', 'got-commerce'),
            ];
        }

        return ['status' => 'changed', 'message' => __('Site Mode was updated.', 'got-commerce')];
    }

    /**
     * Acquire a site-specific MySQL/MariaDB named lock, failing closed if the
     * database wrapper or server does not support the required calls.
     *
     * @return array{status:string,name?:string,message:string}
     */
    private static function acquire_transition_lock(): array
    {
        global $wpdb;

        if (! is_object($wpdb) || ! method_exists($wpdb, 'prepare') || ! method_exists($wpdb, 'get_var')) {
            return [
                'status' => 'lock_unavailable',
                'message' => __('Site Mode could not be changed because the database lock is unavailable. Please retry later.', 'got-commerce'),
            ];
        }

        $lock_name = self::transition_lock_name($wpdb);

        try {
            $query = $wpdb->prepare('SELECT GET_LOCK(%s, %d)', $lock_name, 0);
            if (! is_string($query) || $query === '') {
                return [
                    'status' => 'lock_unavailable',
                    'message' => __('Site Mode could not be changed because the database lock is unavailable. Please retry later.', 'got-commerce'),
                ];
            }

            $lock_result = $wpdb->get_var($query);
        } catch (\Throwable $error) {
            // If the DB wrapper throws after the server granted the lock, an
            // idempotent release attempt prevents leaving it held on this session.
            self::release_transition_lock($lock_name);

            return [
                'status' => 'lock_unavailable',
                'message' => __('Site Mode could not be changed because the database lock is unavailable. Please retry later.', 'got-commerce'),
            ];
        }

        if ($lock_result === 1 || $lock_result === '1') {
            return ['status' => 'acquired', 'name' => $lock_name, 'message' => ''];
        }

        if ($lock_result === 0 || $lock_result === '0') {
            return [
                'status' => 'lock_busy',
                'message' => __('Another Site Mode change is in progress. Please retry shortly.', 'got-commerce'),
            ];
        }

        return [
            'status' => 'lock_unavailable',
            'message' => __('Site Mode could not be changed because the database lock is unavailable. Please retry later.', 'got-commerce'),
        ];
    }

    /** @param object $wpdb */
    private static function transition_lock_name($wpdb): string
    {
        $blog_id = function_exists('get_current_blog_id') ? (string) get_current_blog_id() : '1';
        $site_url = function_exists('site_url') ? (string) site_url() : (string) get_option('siteurl', '');
        $database = (string) ($wpdb->dbname ?? '');
        $prefix = (string) ($wpdb->prefix ?? '');
        $site_scope = implode('|', [$database, $prefix, $blog_id, $site_url]);

        // Keep below MySQL's 64-character lock-name limit.
        return 'got_site_mode_' . substr(hash('sha256', $site_scope), 0, 48);
    }

    private static function release_transition_lock(string $lock_name): bool
    {
        global $wpdb;

        if (! is_object($wpdb) || ! method_exists($wpdb, 'prepare') || ! method_exists($wpdb, 'get_var')) {
            return false;
        }

        try {
            $query = $wpdb->prepare('SELECT RELEASE_LOCK(%s)', $lock_name);
            if (! is_string($query) || $query === '') {
                return false;
            }

            $release_result = $wpdb->get_var($query);

            return $release_result === 1 || $release_result === '1';
        } catch (\Throwable $error) {
            return false;
        }
    }

    /** @return array{published:int,in_stock:int} */
    public static function get_product_counts(): array
    {
        if (! function_exists('wc_get_products')) {
            return ['published' => 0, 'in_stock' => 0];
        }

        $published = wp_count_posts('product');
        $published_count = is_object($published) && isset($published->publish) ? (int) $published->publish : 0;
        $in_stock_result = wc_get_products([
            'status' => 'publish',
            'stock_status' => 'instock',
            'limit' => 1,
            'paginate' => true,
            'return' => 'ids',
        ]);

        $in_stock_count = is_object($in_stock_result) && isset($in_stock_result->total)
            ? (int) $in_stock_result->total
            : 0;

        return ['published' => $published_count, 'in_stock' => $in_stock_count];
    }

    /** @param mixed $user */
    private static function user_may_manage($user): bool
    {
        if (! is_object($user) || empty($user->ID) || ! is_array($user->roles ?? null)) {
            return false;
        }

        if (! array_intersect(['administrator', 'shop_manager'], $user->roles)) {
            return false;
        }

        return user_can($user, self::CAPABILITY);
    }

    /** @param mixed $user
     *  @return array{actor_id:int,actor:string,timestamp_utc:string,previous_mode:string,new_mode:string}
     */
    private static function make_activity_entry(string $previous_mode, string $new_mode, $user): array
    {
        return [
            'actor_id' => (int) $user->ID,
            'actor' => (string) ($user->display_name ?? $user->user_login ?? $user->ID),
            'timestamp_utc' => gmdate('Y-m-d\TH:i:s\Z'),
            'previous_mode' => $previous_mode,
            'new_mode' => $new_mode,
        ];
    }

    /**
     * @param mixed $value
     */
    private static function write_option_and_verify(string $name, $value, $autoload = null): bool
    {
        update_option($name, $value, $autoload);

        return get_option($name, new \stdClass()) === $value;
    }

    /**
     * Restore an option's prior value (or absence) and verify the result.
     *
     * @param mixed $previous_value
     */
    private static function restore_option(string $name, bool $previously_existed, $previous_value): bool
    {
        $missing_option = new \stdClass();

        try {
            if (! $previously_existed) {
                delete_option($name);

                return get_option($name, $missing_option) === $missing_option;
            }

            update_option($name, $previous_value);

            return get_option($name, $missing_option) === $previous_value;
        } catch (\Throwable $error) {
            return false;
        }
    }

    private static function invalidate_caches(string $previous_mode, string $new_mode): bool
    {
        if (function_exists('wc_delete_product_transients')) {
            wc_delete_product_transients();
        }

        $object_cache_flushed = wp_cache_flush() !== false;

        /**
         * Page cache/CDN integrations should purge their public page cache here.
         * The hook runs only after a persisted mode change.
         */
        do_action('got_commerce_site_mode_changed', $previous_mode, $new_mode);
        do_action('got_commerce_invalidate_site_mode_page_cache', $new_mode);

        return $object_cache_flushed;
    }

    public static function handle_admin_post(): void
    {
        $result = self::process_submission(
            self::sanitize_string_value($_POST['got_site_mode'] ?? null, 'sanitize_text_field'),
            self::sanitize_string_value($_POST['_wpnonce'] ?? null, 'sanitize_text_field'),
            wp_get_current_user()
        );

        if ($result['status'] === 'forbidden') {
            wp_die(esc_html($result['message']), '', ['response' => 403]);
        }

        $url = add_query_arg(
            'got_site_mode_result',
            rawurlencode($result['status']),
            admin_url('admin.php?page=' . self::PAGE_SLUG)
        );
        wp_safe_redirect($url);
        exit;
    }

    public static function render_result_notice(): void
    {
        if (! current_user_can(self::CAPABILITY) || ! isset($_GET['got_site_mode_result'])) {
            return;
        }

        $status = self::sanitize_string_value($_GET['got_site_mode_result'], 'sanitize_key');
        if ($status === null) {
            return;
        }

        $messages = [
            'changed' => ['success', __('Site Mode was updated.', 'got-commerce')],
            'unchanged' => ['info', __('Site Mode is already set to that value.', 'got-commerce')],
            'invalid_nonce' => ['error', __('The Site Mode form expired. Please try again.', 'got-commerce')],
            'invalid_mode' => ['error', __('Choose a valid Site Mode.', 'got-commerce')],
            'guard_rejected' => ['error', __('Store mode requires at least one published, in-stock product. No changes were made.', 'got-commerce')],
            'audit_write_failed' => ['error', __('The activity record could not be saved, so Site Mode was not changed.', 'got-commerce')],
            'save_failed' => ['error', __('Site Mode could not be saved. Please try again.', 'got-commerce')],
            'rollback_failed' => ['error', __('Site Mode could not be saved and compensating cleanup was incomplete. Inspect the current mode and activity history.', 'got-commerce')],
            'lock_busy' => ['error', __('Another Site Mode change is in progress. Please retry shortly.', 'got-commerce')],
            'lock_unavailable' => ['error', __('Site Mode could not be changed because the database lock is unavailable. Please retry later.', 'got-commerce')],
            'lock_release_failed' => ['error', __('The Site Mode change was processed, but its database lock could not be released. Check the current mode and retry if needed.', 'got-commerce')],
            'cache_invalidation_failed' => ['error', __('Site Mode and its activity record were saved, but cache invalidation failed. Check the public site cache.', 'got-commerce')],
        ];

        if (! isset($messages[$status])) {
            return;
        }

        [$type, $message] = $messages[$status];
        printf('<div class="notice notice-%1$s is-dismissible"><p>%2$s</p></div>', esc_attr($type), esc_html($message));
    }

    /**
     * Do not pass malformed request values to WordPress's string sanitizers.
     *
     * @param mixed $value
     */
    private static function sanitize_string_value($value, callable $sanitizer): ?string
    {
        if (! is_string($value)) {
            return null;
        }

        return $sanitizer(wp_unslash($value));
    }

    public static function render_admin_page(): void
    {
        if (! current_user_can(self::CAPABILITY) || ! self::user_may_manage(wp_get_current_user())) {
            wp_die(esc_html__('You are not allowed to access Site Mode.', 'got-commerce'), '', ['response' => 403]);
        }

        $counts = self::get_product_counts();
        $history = get_option(self::ACTIVITY_OPTION, []);
        $history = is_array($history) ? array_reverse($history) : [];
        ?>
        <div class="wrap">
            <h1><?php esc_html_e('Site Mode', 'got-commerce'); ?></h1>
            <p><?php esc_html_e('Current mode:', 'got-commerce'); ?> <strong><?php echo esc_html(self::get_mode() === 'store' ? __('Store', 'got-commerce') : __('Coming Soon', 'got-commerce')); ?></strong></p>
            <p><?php printf(esc_html__('Published products: %d', 'got-commerce'), $counts['published']); ?></p>
            <p><?php printf(esc_html__('Published, in-stock products (required for Store mode): %d', 'got-commerce'), $counts['in_stock']); ?></p>

            <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
                <input type="hidden" name="action" value="got_change_site_mode">
                <?php wp_nonce_field(self::NONCE_ACTION); ?>
                <label for="got-site-mode"><?php esc_html_e('Public site mode', 'got-commerce'); ?></label>
                <select id="got-site-mode" name="got_site_mode">
                    <option value="coming_soon" <?php selected(self::get_mode(), 'coming_soon'); ?>><?php esc_html_e('Coming Soon', 'got-commerce'); ?></option>
                    <option value="store" <?php selected(self::get_mode(), 'store'); ?>><?php esc_html_e('Store', 'got-commerce'); ?></option>
                </select>
                <?php submit_button(__('Save Site Mode', 'got-commerce')); ?>
            </form>

            <h2><?php esc_html_e('Activity history', 'got-commerce'); ?></h2>
            <?php if (! $history) : ?>
                <p><?php esc_html_e('No mode changes have been recorded.', 'got-commerce'); ?></p>
            <?php else : ?>
                <table class="widefat striped">
                    <thead><tr><th><?php esc_html_e('Actor', 'got-commerce'); ?></th><th><?php esc_html_e('UTC timestamp', 'got-commerce'); ?></th><th><?php esc_html_e('Change', 'got-commerce'); ?></th></tr></thead>
                    <tbody>
                    <?php foreach ($history as $entry) : ?>
                        <tr>
                            <td><?php echo esc_html((string) ($entry['actor'] ?? '')); ?> (<?php echo esc_html((string) ($entry['actor_id'] ?? '')); ?>)</td>
                            <td><?php echo esc_html((string) ($entry['timestamp_utc'] ?? '')); ?></td>
                            <td><?php echo esc_html((string) ($entry['previous_mode'] ?? '')); ?> to <?php echo esc_html((string) ($entry['new_mode'] ?? '')); ?></td>
                        </tr>
                    <?php endforeach; ?>
                    </tbody>
                </table>
            <?php endif; ?>
        </div>
        <?php
    }
}
