<?php
/**
 * Create the local early-access subscriber and rate-limit tables.
 *
 * @package GOT_Commerce
 */

namespace GOT\Commerce\EarlyAccess\Migrations;

// phpcs:disable WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching -- Migration checks inspect only the private feature tables.

/** Owns the idempotent early-access schema migration. */
final class CreateEarlyAccessTable {

	public const DB_VERSION        = '1';
	public const DB_VERSION_OPTION = 'got_early_access_db_version';

	/** Register migration hooks for activation and upgrades. */
	public static function register(): void {
		add_action( 'plugins_loaded', array( self::class, 'maybe_migrate' ), 20 );
	}

	/** Create or update the early-access tables when the schema version changes. */
	public static function maybe_migrate(): void {
		if ( self::DB_VERSION === get_option( self::DB_VERSION_OPTION ) ) {
			return;
		}

		global $wpdb;
		require_once ABSPATH . 'wp-admin/includes/upgrade.php';

		$charset_collate = $wpdb->get_charset_collate();
		$subscribers     = self::subscriber_table();
		$attempts        = self::attempts_table();

		$subscriber_sql = "CREATE TABLE {$subscribers} (
			id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
			email varchar(255) NOT NULL,
			first_name varchar(100) DEFAULT NULL,
			whatsapp varchar(32) DEFAULT NULL,
			status varchar(20) NOT NULL DEFAULT 'pending',
			consent_text text NOT NULL,
			consent_at datetime NOT NULL,
			confirmed_at datetime DEFAULT NULL,
			confirmation_token_hash char(64) DEFAULT NULL,
			confirmation_token_expires_at datetime DEFAULT NULL,
			unsubscribe_token_hash char(64) DEFAULT NULL,
			ip_hash char(64) NOT NULL,
			sync_attempts tinyint(3) unsigned NOT NULL DEFAULT 0,
			sync_last_attempt_at datetime DEFAULT NULL,
			sync_attention_at datetime DEFAULT NULL,
			created_at datetime NOT NULL,
			updated_at datetime NOT NULL,
			PRIMARY KEY  (id),
			UNIQUE KEY email (email),
			UNIQUE KEY confirmation_token_hash (confirmation_token_hash),
			UNIQUE KEY unsubscribe_token_hash (unsubscribe_token_hash),
			KEY status_created (status,created_at),
			KEY ip_created (ip_hash,created_at)
		) {$charset_collate};";

		$attempts_sql = "CREATE TABLE {$attempts} (
			ip_hash char(64) NOT NULL,
			window_started_at datetime NOT NULL,
			attempts smallint(5) unsigned NOT NULL DEFAULT 0,
			updated_at datetime NOT NULL,
			PRIMARY KEY  (ip_hash),
			KEY updated_at (updated_at)
		) {$charset_collate};";

		dbDelta( $subscriber_sql );
		dbDelta( $attempts_sql );

		$subscriber_exists = $wpdb->get_var( $wpdb->prepare( 'SHOW TABLES LIKE %s', $wpdb->esc_like( $subscribers ) ) );
		$attempts_exists   = $wpdb->get_var( $wpdb->prepare( 'SHOW TABLES LIKE %s', $wpdb->esc_like( $attempts ) ) );

		if ( $subscribers === $subscriber_exists && $attempts === $attempts_exists ) {
			update_option( self::DB_VERSION_OPTION, self::DB_VERSION, false );
		}
	}

	/** Get the subscriber table name. */
	public static function subscriber_table(): string {
		global $wpdb;
		return $wpdb->prefix . 'got_early_access';
	}

	/** Get the rate-limit table name. */
	public static function attempts_table(): string {
		global $wpdb;
		return $wpdb->prefix . 'got_early_access_attempts';
	}
}

// phpcs:enable WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
