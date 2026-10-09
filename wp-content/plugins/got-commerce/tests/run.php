<?php

if (PHP_SAPI !== 'cli') {
    http_response_code(403);
    exit("This acceptance harness must be run from the command line.\n");
}

// Minimal WordPress/WooCommerce doubles for dependency-free acceptance coverage.
$GLOBALS['test_options'] = [];
$GLOBALS['test_actions'] = [];
$GLOBALS['test_product_counts'] = ['published' => 0, 'in_stock_ids' => []];
$GLOBALS['test_wc_args'] = [];
$GLOBALS['test_fail_updates'] = [];
$GLOBALS['test_fail_deletes'] = [];
$GLOBALS['test_throw_updates'] = [];
$GLOBALS['test_cache_flushes'] = 0;
$GLOBALS['test_cache_flush_result'] = true;
$GLOBALS['test_wc_transient_flushes'] = 0;
$GLOBALS['test_throw_product_count'] = false;
$GLOBALS['test_throw_cache_callback'] = false;

class FakeWpdb
{
    public string $dbname = 'got_test';
    public string $prefix = 'wp_';
    public $lock_result = '1';
    public int $lock_calls = 0;
    public int $release_calls = 0;
    public bool $held = false;
    public bool $throw_on_release = false;
    public bool $throw_after_acquire = false;

    public function prepare($query, ...$args): string
    {
        return (string) json_encode(['query' => $query, 'args' => $args]);
    }

    public function get_var($prepared_query)
    {
        $statement = json_decode($prepared_query, true);
        if (str_contains($statement['query'] ?? '', 'GET_LOCK(')) {
            $this->lock_calls++;
            if ($this->lock_result === '1' || $this->lock_result === 1) {
                $this->held = true;
            }
            if ($this->throw_after_acquire && $this->held) {
                throw new RuntimeException('Simulated database wrapper exception after lock acquisition.');
            }
            return $this->lock_result;
        }
        if (str_contains($statement['query'] ?? '', 'RELEASE_LOCK(')) {
            $this->release_calls++;
            if ($this->throw_on_release) {
                throw new RuntimeException('Simulated RELEASE_LOCK failure.');
            }
            if (! $this->held) {
                return '0';
            }
            $this->held = false;
            return '1';
        }

        return null;
    }

    public function reset(): void
    {
        $this->lock_result = '1';
        $this->lock_calls = 0;
        $this->release_calls = 0;
        $this->held = false;
        $this->throw_on_release = false;
        $this->throw_after_acquire = false;
    }
}

$GLOBALS['wpdb'] = new FakeWpdb();

function add_action($hook, $callback): void {}
function __($text, $domain = null) { return $text; }
function sanitize_text_field(string $text): string { return trim($text); }
function sanitize_key(string $text): string { return strtolower($text); }
function wp_unslash($value) { return $value; }
function current_user_can($capability): bool { return $capability === 'got_manage_site_mode'; }
function get_option($key, $default = false) { return $GLOBALS['test_options'][$key] ?? $default; }
function update_option($key, $value, $autoload = null): bool
{
    if (! empty($GLOBALS['test_throw_updates'][$key])) {
        unset($GLOBALS['test_throw_updates'][$key]);
        $GLOBALS['test_options'][$key] = $value;
        throw new RuntimeException('Simulated option hook exception after persistence.');
    }
    if (! empty($GLOBALS['test_fail_updates'][$key])) {
        return false;
    }
    if (array_key_exists($key, $GLOBALS['test_options']) && $GLOBALS['test_options'][$key] === $value) {
        return false;
    }
    $GLOBALS['test_options'][$key] = $value;
    return true;
}
function delete_option($key): bool
{
    if (! empty($GLOBALS['test_fail_deletes'][$key])) {
        return false;
    }
    unset($GLOBALS['test_options'][$key]);
    return true;
}
function wp_verify_nonce($nonce, $action): bool { return $nonce === 'valid-nonce' && $action === 'got_site_mode_change'; }
function user_can($user, $capability): bool { return ! empty($user->caps[$capability]); }
function wp_count_posts($post_type)
{
    if ($GLOBALS['test_throw_product_count']) {
        throw new RuntimeException('Simulated product count exception.');
    }
    return (object) ['publish' => $GLOBALS['test_product_counts']['published']];
}
function wc_get_products($args)
{
    $GLOBALS['test_wc_args'] = $args;
    return (object) [
        'products' => array_slice($GLOBALS['test_product_counts']['in_stock_ids'], 0, $args['limit']),
        'total' => count($GLOBALS['test_product_counts']['in_stock_ids']),
    ];
}
function wc_delete_product_transients(): void { $GLOBALS['test_wc_transient_flushes']++; }
function wp_cache_flush(): bool
{
    $GLOBALS['test_cache_flushes']++;
    return $GLOBALS['test_cache_flush_result'];
}
function do_action($hook, ...$args): void
{
    $GLOBALS['test_actions'][] = [$hook, $args];
    if ($hook === 'got_commerce_invalidate_site_mode_page_cache' && $GLOBALS['test_throw_cache_callback']) {
        throw new RuntimeException('Simulated page-cache callback exception.');
    }
}

require_once dirname(__DIR__) . '/src/SiteMode/SiteMode.php';

use GOT\Commerce\SiteMode\SiteMode;

$passed = 0;
$failed = 0;
$checks = [];

function check(bool $condition, string $name): void
{
    global $passed, $failed, $checks;
    if ($condition) {
        $passed++;
        $checks[] = "PASS $name";
    } else {
        $failed++;
        $checks[] = "FAIL $name";
    }
}

function reset_state(string $mode = 'coming_soon', int $published = 2, array $in_stock = []): void
{
    $GLOBALS['test_options'] = [SiteMode::OPTION => $mode];
    $GLOBALS['test_actions'] = [];
    $GLOBALS['test_product_counts'] = ['published' => $published, 'in_stock_ids' => $in_stock];
    $GLOBALS['test_wc_args'] = [];
    $GLOBALS['test_fail_updates'] = [];
    $GLOBALS['test_fail_deletes'] = [];
    $GLOBALS['test_throw_updates'] = [];
    $GLOBALS['test_cache_flushes'] = 0;
    $GLOBALS['test_cache_flush_result'] = true;
    $GLOBALS['test_wc_transient_flushes'] = 0;
    $GLOBALS['test_throw_product_count'] = false;
    $GLOBALS['test_throw_cache_callback'] = false;
    $GLOBALS['wpdb']->reset();
}

function actor(array $roles = ['administrator'], bool $capability = true): object
{
    return (object) [
        'ID' => 41,
        'display_name' => 'Ada Admin',
        'user_login' => 'ada',
        'roles' => $roles,
        'caps' => [SiteMode::CAPABILITY => $capability],
    ];
}

// Safe default and role/capability assignment.
$GLOBALS['test_options'] = [];
check(SiteMode::get_mode() === 'coming_soon', 'missing option defaults to Coming Soon');

class FakeRole
{
    public array $capabilities = [];
    public function add_cap(string $cap): void { $this->capabilities[$cap] = true; }
}
function get_role($name) { return $GLOBALS['test_roles'][$name] ?? null; }
$GLOBALS['test_roles'] = ['administrator' => new FakeRole(), 'shop_manager' => new FakeRole(), 'editor' => new FakeRole()];
SiteMode::grant_role_capabilities();
check(isset($GLOBALS['test_roles']['administrator']->capabilities[SiteMode::CAPABILITY]), 'Administrator receives site mode capability');
check(isset($GLOBALS['test_roles']['shop_manager']->capabilities[SiteMode::CAPABILITY]), 'Shop Manager receives site mode capability');
check(! isset($GLOBALS['test_roles']['editor']->capabilities[SiteMode::CAPABILITY]), 'other roles do not receive site mode capability');
reset_state('coming_soon', 5, [10, 11, 12]);
$counts = SiteMode::get_product_counts();
check($counts === ['published' => 5, 'in_stock' => 3], 'published and in-stock counts use the paginated total');
check($GLOBALS['test_wc_args']['limit'] === 1 && $GLOBALS['test_wc_args']['paginate'] === true, 'count query materializes at most one product ID');

// Unauthorized role and absent capability are rejected without writes or side effects.
reset_state();
$before = $GLOBALS['test_options'];
$result = SiteMode::process_submission('store', 'valid-nonce', actor(['editor'], true));
check($result['status'] === 'forbidden' && $GLOBALS['test_options'] === $before, 'non-approved role rejected without mutation');
$result = SiteMode::process_submission('store', 'valid-nonce', actor(['administrator'], false));
check($result['status'] === 'forbidden' && $GLOBALS['test_options'] === $before, 'missing capability rejected without mutation');
reset_state('coming_soon', 1, [7]);
$result = SiteMode::process_submission('store', 'valid-nonce', actor(['shop_manager'], true));
check($result['status'] === 'changed', 'Shop Manager with capability may change mode');

// Nonce and enum validation.
reset_state();
$before = $GLOBALS['test_options'];
$result = SiteMode::process_submission('store', null, actor());
check($result['status'] === 'invalid_nonce' && $GLOBALS['test_options'] === $before, 'missing nonce rejected without mutation');
$result = SiteMode::process_submission('store', 'bad-nonce', actor());
check($result['status'] === 'invalid_nonce' && $GLOBALS['test_options'] === $before, 'invalid nonce rejected without mutation');
$result = SiteMode::process_submission('live', 'valid-nonce', actor());
check($result['status'] === 'invalid_mode' && $GLOBALS['test_options'] === $before, 'unknown enum value rejected without mutation');

// Malformed request shapes are rejected before a string sanitizer is called.
$sanitize_helper = new ReflectionMethod(SiteMode::class, 'sanitize_string_value');
$sanitize_helper->setAccessible(true);
check($sanitize_helper->invoke(null, ['store'], 'sanitize_text_field') === null, 'array mode input is treated as absent before text sanitization');
check($sanitize_helper->invoke(null, ['nonce'], 'sanitize_text_field') === null, 'array nonce input is treated as absent before text sanitization');
check($sanitize_helper->invoke(null, ['changed'], 'sanitize_key') === null, 'array result notice input is treated as absent before key sanitization');

reset_state('coming_soon', 2, [20]);
$before = $GLOBALS['test_options'];
$result = SiteMode::process_submission(['store'], 'valid-nonce', actor());
check($result['status'] === 'invalid_mode' && $GLOBALS['test_options'] === $before, 'array mode submission is rejected without state or log mutation');
$result = SiteMode::process_submission('store', ['valid-nonce'], actor());
check($result['status'] === 'invalid_nonce' && $GLOBALS['test_options'] === $before, 'array nonce submission is rejected without state or log mutation');
check($GLOBALS['test_cache_flushes'] === 0 && $GLOBALS['test_wc_transient_flushes'] === 0, 'array submissions do not invalidate caches');

$_GET['got_site_mode_result'] = ['changed'];
ob_start();
SiteMode::render_result_notice();
$malformed_notice = ob_get_clean();
unset($_GET['got_site_mode_result']);
check($malformed_notice === '', 'array result notice is ignored without calling a string sanitizer');

// Concurrent requests fail fast without mutating options or caches.
reset_state('coming_soon', 2, [20]);
$before = $GLOBALS['test_options'];
$GLOBALS['wpdb']->lock_result = '0';
$result = SiteMode::process_submission('store', 'valid-nonce', actor());
check($result['status'] === 'lock_busy' && str_contains($result['message'], 'retry'), 'lock contention returns a retryable failure');
check($GLOBALS['test_options'] === $before, 'lock contention leaves mode and activity unchanged');
check($GLOBALS['test_cache_flushes'] === 0 && $GLOBALS['test_wc_transient_flushes'] === 0, 'lock contention does not invalidate caches');
check($GLOBALS['wpdb']->release_calls === 0, 'lock contention does not release a lock it did not acquire');

reset_state('coming_soon', 2, [20]);
$before = $GLOBALS['test_options'];
$GLOBALS['wpdb']->lock_result = null;
$result = SiteMode::process_submission('store', 'valid-nonce', actor());
check($result['status'] === 'lock_unavailable' && $GLOBALS['test_options'] === $before, 'unavailable database lock fails closed without mutation');
reset_state('coming_soon', 2, [20]);
$before = $GLOBALS['test_options'];
$GLOBALS['wpdb']->throw_after_acquire = true;
$result = SiteMode::process_submission('store', 'valid-nonce', actor());
check($result['status'] === 'lock_unavailable' && $GLOBALS['test_options'] === $before, 'lock acquisition exception fails closed without mutation');
check($GLOBALS['wpdb']->release_calls === 1 && ! $GLOBALS['wpdb']->held, 'lock is released if the database wrapper throws after acquisition');

// Guard rejection preserves option, activity and cache state.
reset_state('coming_soon', 4, []);
$before = $GLOBALS['test_options'];
$result = SiteMode::process_submission('store', 'valid-nonce', actor());
check($result['status'] === 'guard_rejected', 'zero in-stock products blocks Store transition');
check($GLOBALS['test_wc_args']['limit'] === 1 && $GLOBALS['test_wc_args']['paginate'] === true && $GLOBALS['test_wc_args']['return'] === 'ids', 'in-stock count uses a bounded paginated query');
check($GLOBALS['test_options'] === $before && $GLOBALS['test_cache_flushes'] === 0 && $GLOBALS['test_wc_transient_flushes'] === 0, 'guard rejection does not mutate options or caches');

// Audit persistence must succeed before the mode is changed.
reset_state('coming_soon', 2, [20]);
$before = $GLOBALS['test_options'];
$GLOBALS['test_fail_updates'][SiteMode::ACTIVITY_OPTION] = true;
$result = SiteMode::process_submission('store', 'valid-nonce', actor());
check($result['status'] === 'audit_write_failed', 'failed audit write returns an explicit failure');
check(SiteMode::get_mode() === 'coming_soon' && $GLOBALS['test_options'] === $before, 'failed audit write leaves mode and options unchanged');
check($GLOBALS['test_cache_flushes'] === 0 && $GLOBALS['test_wc_transient_flushes'] === 0, 'failed audit write does not invalidate caches');
check($GLOBALS['wpdb']->release_calls === 1 && ! $GLOBALS['wpdb']->held, 'lock is released after audit-write failure');

// If the later mode write fails, remove the newly stored audit entry.
reset_state('coming_soon', 2, [20]);
$before = $GLOBALS['test_options'];
$GLOBALS['test_fail_updates'][SiteMode::OPTION] = true;
$result = SiteMode::process_submission('store', 'valid-nonce', actor());
check($result['status'] === 'save_failed', 'failed mode write returns an explicit failure after audit compensation');
check($GLOBALS['test_options'] === $before, 'failed mode write restores prior mode and activity state');
check($GLOBALS['test_cache_flushes'] === 0 && $GLOBALS['test_wc_transient_flushes'] === 0, 'failed mode write does not invalidate caches');
check($GLOBALS['wpdb']->release_calls === 1 && ! $GLOBALS['wpdb']->held, 'lock is released after mode-write failure');

// If compensation itself fails, surface the partial-state condition.
reset_state('coming_soon', 2, [20]);
$GLOBALS['test_fail_updates'][SiteMode::OPTION] = true;
$GLOBALS['test_fail_deletes'][SiteMode::ACTIVITY_OPTION] = true;
$result = SiteMode::process_submission('store', 'valid-nonce', actor());
check($result['status'] === 'rollback_failed', 'failed compensation is surfaced explicitly');
check(SiteMode::get_mode() === 'coming_soon' && isset($GLOBALS['test_options'][SiteMode::ACTIVITY_OPTION]), 'failed compensation leaves the mode unchanged and exposes the orphan audit record');
check($GLOBALS['test_cache_flushes'] === 0 && $GLOBALS['test_wc_transient_flushes'] === 0, 'failed compensation does not invalidate caches');
check($GLOBALS['wpdb']->release_calls === 1 && ! $GLOBALS['wpdb']->held, 'lock is released after compensating-write failure');

// Option hooks can throw after writing; restore both persisted options before returning.
reset_state('coming_soon', 2, [20]);
$before = $GLOBALS['test_options'];
$GLOBALS['test_throw_updates'][SiteMode::ACTIVITY_OPTION] = true;
$result = SiteMode::process_submission('store', 'valid-nonce', actor());
check($result['status'] === 'audit_write_failed', 'audit option exception returns an explicit persistence failure');
check($GLOBALS['test_options'] === $before, 'audit option exception compensates the persisted audit write');
check($GLOBALS['test_cache_flushes'] === 0 && $GLOBALS['test_wc_transient_flushes'] === 0, 'audit option exception skips cache invalidation');
check($GLOBALS['wpdb']->release_calls === 1 && ! $GLOBALS['wpdb']->held, 'lock is released after an audit option exception');

reset_state('coming_soon', 2, [20]);
$before = $GLOBALS['test_options'];
$GLOBALS['test_throw_updates'][SiteMode::OPTION] = true;
$result = SiteMode::process_submission('store', 'valid-nonce', actor());
check($result['status'] === 'save_failed', 'mode option exception returns an explicit persistence failure');
check($GLOBALS['test_options'] === $before, 'mode option exception compensates both persisted options');
check($GLOBALS['test_cache_flushes'] === 0 && $GLOBALS['test_wc_transient_flushes'] === 0, 'mode option exception skips cache invalidation');
check($GLOBALS['wpdb']->release_calls === 1 && ! $GLOBALS['wpdb']->held, 'lock is released after a mode option exception');

// finally must release the lock when normal PHP exceptions escape the transition.
reset_state('coming_soon', 2, [20]);
$GLOBALS['test_throw_product_count'] = true;
$exception_escaped = false;
try {
    SiteMode::process_submission('store', 'valid-nonce', actor());
} catch (RuntimeException $error) {
    $exception_escaped = true;
}
check($exception_escaped, 'transition exception remains visible to the caller');
check($GLOBALS['wpdb']->release_calls === 1 && ! $GLOBALS['wpdb']->held, 'lock is released when transition code throws');

// A cache callback exception occurs after persistence and must not imply rollback.
reset_state('coming_soon', 2, [20]);
$GLOBALS['test_throw_cache_callback'] = true;
$result = SiteMode::process_submission('store', 'valid-nonce', actor());
check($result['status'] === 'cache_invalidation_failed', 'cache callback exception has an explicit failure result');
check(SiteMode::get_mode() === 'store' && count($GLOBALS['test_options'][SiteMode::ACTIVITY_OPTION]) === 1, 'cache callback exception preserves the committed mode and activity');
check($GLOBALS['wpdb']->release_calls === 1 && ! $GLOBALS['wpdb']->held, 'lock is released after a cache callback exception');

// A false object-cache flush result is also a cache failure, after persistence.
reset_state('coming_soon', 2, [20]);
$GLOBALS['test_cache_flush_result'] = false;
$result = SiteMode::process_submission('store', 'valid-nonce', actor());
check($result['status'] === 'cache_invalidation_failed', 'false wp_cache_flush result returns cache invalidation failure');
check(SiteMode::get_mode() === 'store' && count($GLOBALS['test_options'][SiteMode::ACTIVITY_OPTION]) === 1, 'false cache flush preserves the committed mode and activity');
check($GLOBALS['wpdb']->release_calls === 1 && ! $GLOBALS['wpdb']->held, 'lock is released after false cache flush result');

// Successful forward and reverse switches persist audit details and invalidate caches.
reset_state('coming_soon', 3, [10]);
$result = SiteMode::process_submission('store', 'valid-nonce', actor());
$history = $GLOBALS['test_options'][SiteMode::ACTIVITY_OPTION] ?? [];
check($result['status'] === 'changed' && SiteMode::get_mode() === 'store', 'valid stock permits Store transition');
check(count($history) === 1 && $history[0]['actor_id'] === 41 && $history[0]['actor'] === 'Ada Admin', 'activity records actor identity');
check((bool) preg_match('/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/', $history[0]['timestamp_utc']), 'activity timestamp is UTC ISO format');
check($history[0]['previous_mode'] === 'coming_soon' && $history[0]['new_mode'] === 'store', 'activity records previous and new modes');
check($GLOBALS['test_cache_flushes'] === 1 && $GLOBALS['test_wc_transient_flushes'] === 1 && count($GLOBALS['test_actions']) === 2, 'successful change invalidates WP, WooCommerce and integration caches');
$result = SiteMode::process_submission('coming_soon', 'valid-nonce', actor());
check($result['status'] === 'changed' && SiteMode::get_mode() === 'coming_soon', 'valid switch back to Coming Soon is permitted');
check(count($GLOBALS['test_options'][SiteMode::ACTIVITY_OPTION]) === 2, 'reverse change is recorded as another activity entry');
check($GLOBALS['wpdb']->lock_calls === 2 && $GLOBALS['wpdb']->release_calls === 2 && ! $GLOBALS['wpdb']->held, 'lock is released after successful mode changes');

// Re-selecting the current value is not an actual change and has no side effects.
$before = $GLOBALS['test_options'];
$flushes = $GLOBALS['test_cache_flushes'];
$result = SiteMode::process_submission('coming_soon', 'valid-nonce', actor());
check($result['status'] === 'unchanged' && $GLOBALS['test_options'] === $before && $GLOBALS['test_cache_flushes'] === $flushes, 'same mode selection does not create an activity or invalidate caches');

foreach ($checks as $line) {
    echo $line, PHP_EOL;
}
printf("\n%d passed, %d failed (%d checks)\n", $passed, $failed, $passed + $failed);
exit($failed === 0 ? 0 : 1);
