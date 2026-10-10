<?php
/**
 * Isolate confirmed subscriber sync from the unselected marketing provider.
 *
 * @package GOT_Commerce
 */

namespace GOT\Commerce\EarlyAccess;

use GOT\Commerce\EarlyAccess\Migrations\CreateEarlyAccessTable;

// phpcs:disable WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching -- The private subscriber table needs atomic writes and has no WordPress object-cache semantics.
// phpcs:disable WordPress.DB.PreparedSQL.InterpolatedNotPrepared -- Table identifiers come from the trusted WordPress database prefix; query values are otherwise fixed or prepared.

/** Owns the provider boundary and retry schedule. */
final class EmailSync {

	public const RETRY_HOOK               = 'got_commerce_early_access_sync_pending';
	public const CLEANUP_HOOK             = 'got_commerce_early_access_cleanup';
	public const MANUAL_ATTENTION_SECONDS = 86400;

	/** Register retry and retention hooks. */
	public static function register(): void {
		add_filter( 'cron_schedules', array( self::class, 'add_cron_intervals' ) );
		add_action( 'init', array( self::class, 'schedule_jobs' ), 2 );
		add_action( self::RETRY_HOOK, array( self::class, 'retry_pending' ) );
		add_action( self::CLEANUP_HOOK, array( self::class, 'cleanup_unconfirmed' ) );
	}

	/**
	 * Add the planned fifteen-minute retry interval.
	 *
	 * @param array<string, array{interval: int, display: string}> $schedules Registered cron schedules.
	 * @return array<string, array{interval: int, display: string}>
	 */
	public static function add_cron_intervals( array $schedules ): array {
		$schedules['got_every_fifteen_minutes'] = array(
			'interval' => 15 * MINUTE_IN_SECONDS,
			'display'  => __( 'Every fifteen minutes (GOT Commerce)', 'got-commerce' ),
		);
		return $schedules;
	}

	/** Schedule idempotent retry and retention jobs. */
	public static function schedule_jobs(): void {
		if ( ! wp_next_scheduled( self::RETRY_HOOK ) ) {
			wp_schedule_event( time() + 15 * MINUTE_IN_SECONDS, 'got_every_fifteen_minutes', self::RETRY_HOOK );
		}

		if ( ! wp_next_scheduled( self::CLEANUP_HOOK ) ) {
			wp_schedule_event( time() + DAY_IN_SECONDS, 'daily', self::CLEANUP_HOOK );
		}
	}

	/**
	 * Attempt to sync one confirmed subscriber through an explicitly configured provider.
	 *
	 * @param int $subscriber_id Confirmed local subscriber ID.
	 */
	public static function sync( int $subscriber_id ): bool {
		$subscriber = self::get_subscriber( $subscriber_id );
		if ( ! $subscriber || empty( $subscriber['confirmed_at'] ) ) {
			return false;
		}

		$provider = apply_filters( 'got_commerce_early_access_provider', null );
		if ( ! is_callable( $provider ) ) {
			self::record_failed_attempt( $subscriber_id );
			return false;
		}

		global $wpdb;
		$unsubscribe_token = ConfirmationToken::issue();
		$token_saved       = $wpdb->update(
			CreateEarlyAccessTable::subscriber_table(),
			array(
				'unsubscribe_token_hash' => $unsubscribe_token['hash'],
				'updated_at'             => current_time( 'mysql', true ),
			),
			array( 'id' => $subscriber_id ),
			array( '%s', '%s' ),
			array( '%d' )
		);
		if ( false === $token_saved ) {
			self::record_failed_attempt( $subscriber_id );
			return false;
		}

		$provider_payload                    = array(
			'email'        => $subscriber['email'],
			'first_name'   => $subscriber['first_name'],
			'whatsapp'     => $subscriber['whatsapp'],
			'consent_text' => $subscriber['consent_text'],
			'consent_at'   => $subscriber['consent_at'],
			'confirmed_at' => $subscriber['confirmed_at'],
		);
		$provider_payload['unsubscribe_url'] = add_query_arg(
			'got_early_access_token',
			$unsubscribe_token['token'],
			add_query_arg( 'got_early_access_status', 'unsubscribe', home_url( '/' ) )
		);

		try {
			$synced = true === call_user_func( $provider, $provider_payload );
		} catch ( \Throwable $error ) {
			$synced = false;
		}

		if ( $synced ) {
			$updated = $wpdb->update(
				CreateEarlyAccessTable::subscriber_table(),
				array(
					'status'               => 'confirmed',
					'sync_last_attempt_at' => current_time( 'mysql', true ),
					'sync_attention_at'    => null,
					'updated_at'           => current_time( 'mysql', true ),
				),
				array( 'id' => $subscriber_id ),
				array( '%s', '%s', '%s', '%s' ),
				array( '%d' )
			);
			return false !== $updated;
		}

		self::record_failed_attempt( $subscriber_id );
		return false;
	}

	/** Retry confirmed records while leaving the unselected provider disabled. */
	public static function retry_pending(): void {
		global $wpdb;
		$table = CreateEarlyAccessTable::subscriber_table();
		$rows  = $wpdb->get_results(
			"SELECT id, created_at FROM {$table}
			WHERE status = 'sync_pending' AND confirmed_at IS NOT NULL AND sync_attention_at IS NULL
			ORDER BY id ASC LIMIT 50",
			ARRAY_A
		);

		if ( ! is_array( $rows ) ) {
			return;
		}

		foreach ( $rows as $row ) {
			$id = (int) ( $row['id'] ?? 0 );
			if ( $id < 1 ) {
				continue;
			}

			if ( strtotime( (string) $row['created_at'] . ' UTC' ) <= time() - self::MANUAL_ATTENTION_SECONDS ) {
				$wpdb->update(
					$table,
					array(
						'sync_attention_at' => current_time( 'mysql', true ),
						'updated_at'        => current_time( 'mysql', true ),
					),
					array( 'id' => $id ),
					array( '%s', '%s' ),
					array( '%d' )
				);
				continue;
			}

			self::sync( $id );
		}
	}

	/** Remove unconfirmed records after thirty days and expire old rate-limit hashes. */
	public static function cleanup_unconfirmed(): void {
		global $wpdb;
		$subscribers = CreateEarlyAccessTable::subscriber_table();
		$attempts    = CreateEarlyAccessTable::attempts_table();

		$wpdb->query(
			"UPDATE {$subscribers} SET confirmation_token_hash = NULL, confirmation_token_expires_at = NULL
			WHERE status = 'pending' AND confirmation_token_expires_at < UTC_TIMESTAMP()"
		);
		$wpdb->query(
			"DELETE FROM {$subscribers} WHERE status = 'pending' AND created_at < DATE_SUB(UTC_TIMESTAMP(), INTERVAL 30 DAY)"
		);
		$wpdb->query(
			"DELETE FROM {$attempts} WHERE updated_at < DATE_SUB(UTC_TIMESTAMP(), INTERVAL 2 HOUR)"
		);
	}

	/**
	 * Read a subscriber without logging or exposing its personal fields.
	 *
	 * @param int $subscriber_id Local subscriber ID.
	 * @return array{
	 *     id: int|string,
	 *     email: string,
	 *     first_name: string|null,
	 *     whatsapp: string|null,
	 *     status: string,
	 *     consent_text: string,
	 *     consent_at: string,
	 *     confirmed_at: string|null,
	 *     confirmation_token_hash: string|null,
	 *     confirmation_token_expires_at: string|null,
	 *     unsubscribe_token_hash: string|null,
	 *     ip_hash: string,
	 *     sync_attempts: int|string,
	 *     sync_last_attempt_at: string|null,
	 *     sync_attention_at: string|null,
	 *     created_at: string,
	 *     updated_at: string
	 * }|null
	 */
	private static function get_subscriber( int $subscriber_id ): ?array {
		global $wpdb;
		$table = CreateEarlyAccessTable::subscriber_table();
		$row   = $wpdb->get_row(
			$wpdb->prepare( "SELECT * FROM {$table} WHERE id = %d", $subscriber_id ),
			ARRAY_A
		);
		return is_array( $row ) ? $row : null;
	}

	/**
	 * Keep retry failure state without persisting provider error text or PII.
	 *
	 * @param int $subscriber_id Local subscriber ID.
	 */
	private static function record_failed_attempt( int $subscriber_id ): void {
		global $wpdb;
		$table = CreateEarlyAccessTable::subscriber_table();
		$wpdb->query(
			$wpdb->prepare(
				"UPDATE {$table} SET status = 'sync_pending', sync_attempts = LEAST(sync_attempts + 1, 255),
				sync_last_attempt_at = UTC_TIMESTAMP(), updated_at = UTC_TIMESTAMP() WHERE id = %d",
				$subscriber_id
			)
		);
	}
}

// phpcs:enable WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
// phpcs:enable WordPress.DB.PreparedSQL.InterpolatedNotPrepared
