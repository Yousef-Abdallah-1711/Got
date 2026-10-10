<?php
/**
 * Apply a rolling per-source early-access submission limit.
 *
 * @package GOT_Commerce
 */

namespace GOT\Commerce\EarlyAccess;

use GOT\Commerce\EarlyAccess\Migrations\CreateEarlyAccessTable;

// phpcs:disable WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching -- Atomic rate limiting uses a private table, not the WordPress object cache.
// phpcs:disable WordPress.DB.PreparedSQL.InterpolatedNotPrepared -- The table identifier comes from the trusted WordPress database prefix.

/** Counts attempts atomically without retaining raw IP addresses. */
final class RateLimiter {

	public const LIMIT = 5;

	/**
	 * Record one attempt and return a rate-limit error after the fifth.
	 *
	 * @param string $ip_hash HMAC of the source address.
	 */
	public function record_attempt( string $ip_hash ): true|\WP_Error {
		global $wpdb;
		$table = CreateEarlyAccessTable::attempts_table();

		$query = $wpdb->prepare(
			"INSERT INTO {$table} (ip_hash, window_started_at, attempts, updated_at)
			VALUES (%s, UTC_TIMESTAMP(), 1, UTC_TIMESTAMP())
			ON DUPLICATE KEY UPDATE
			attempts = IF(window_started_at < DATE_SUB(UTC_TIMESTAMP(), INTERVAL 1 HOUR), 1, attempts + 1),
			window_started_at = IF(window_started_at < DATE_SUB(UTC_TIMESTAMP(), INTERVAL 1 HOUR), UTC_TIMESTAMP(), window_started_at),
			updated_at = UTC_TIMESTAMP()",
			$ip_hash
		);

		// phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared -- The statement was assembled with $wpdb->prepare() immediately above.
		if ( false === $wpdb->query( $query ) ) {
			return new \WP_Error(
				'got_early_access_rate_limit_unavailable',
				__( 'We could not process your request. Please try again later.', 'got-commerce' ),
				array( 'status' => 503 )
			);
		}

		$attempts_value = $wpdb->get_var(
			$wpdb->prepare( "SELECT attempts FROM {$table} WHERE ip_hash = %s", $ip_hash )
		);
		if ( null === $attempts_value || false === $attempts_value ) {
			return new \WP_Error(
				'got_early_access_rate_limit_unavailable',
				__( 'We could not process your request. Please try again later.', 'got-commerce' ),
				array( 'status' => 503 )
			);
		}

		$attempts = (int) $attempts_value;

		if ( $attempts > self::LIMIT ) {
			return new \WP_Error(
				'got_early_access_rate_limited',
				__( 'Too many attempts. Try again later.', 'got-commerce' ),
				array( 'status' => 429 )
			);
		}

		return true;
	}
}

// phpcs:enable WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
// phpcs:enable WordPress.DB.PreparedSQL.InterpolatedNotPrepared
