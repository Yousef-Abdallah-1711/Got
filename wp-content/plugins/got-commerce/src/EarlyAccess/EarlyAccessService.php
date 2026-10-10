<?php
/**
 * Validate and persist consented early-access requests.
 *
 * @package GOT_Commerce
 */

namespace GOT\Commerce\EarlyAccess;

use GOT\Commerce\EarlyAccess\Migrations\CreateEarlyAccessTable;

// phpcs:disable WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching -- The private subscriber table needs atomic writes and has no WordPress object-cache semantics.
// phpcs:disable WordPress.DB.PreparedSQL.InterpolatedNotPrepared -- Table identifiers come from the trusted WordPress database prefix; request values use prepared placeholders.

/** Owns local signup, confirmation, and unsubscribe state changes. */
final class EarlyAccessService {

	public const CONSENT_TEXT = 'I agree to receive Drop 01 updates by email.';

	/**
	 * Validate and persist one anonymous signup.
	 *
	 * @param array<string, mixed> $payload    Parsed JSON request data.
	 * @param string               $ip_address Remote address supplied by the web server.
	 * @return array{status: 'accepted'|'already_confirmed'|'pending', confirmation_sent: bool}|\WP_Error
	 */
	public function submit( array $payload, string $ip_address ): array|\WP_Error {
		$ip_hash = self::hash_ip_address( $ip_address );
		$limit   = ( new RateLimiter() )->record_attempt( $ip_hash );
		if ( is_wp_error( $limit ) ) {
			return $limit;
		}

		if ( self::text_value( $payload['company_website'] ?? '' ) !== '' ) {
			return array(
				'status'            => 'accepted',
				'confirmation_sent' => false,
			);
		}

		$validated = self::validate_payload( $payload );
		if ( is_wp_error( $validated ) ) {
			return $validated;
		}

		global $wpdb;
		$table    = CreateEarlyAccessTable::subscriber_table();
		$existing = $wpdb->get_row(
			$wpdb->prepare( "SELECT * FROM {$table} WHERE email = %s LIMIT 1", $validated['email'] ),
			ARRAY_A
		);

		if ( is_array( $existing ) && in_array( $existing['status'], array( 'confirmed', 'sync_pending' ), true ) ) {
			return array(
				'status'            => 'already_confirmed',
				'confirmation_sent' => false,
			);
		}

		$token = ConfirmationToken::issue();
		$now   = current_time( 'mysql', true );
		$data  = array(
			'email'                         => $validated['email'],
			'first_name'                    => $validated['first_name'],
			'whatsapp'                      => $validated['whatsapp'],
			'status'                        => 'pending',
			'consent_text'                  => self::CONSENT_TEXT,
			'consent_at'                    => $now,
			'confirmed_at'                  => null,
			'confirmation_token_hash'       => $token['hash'],
			'confirmation_token_expires_at' => $token['expires_at'],
			'unsubscribe_token_hash'        => null,
			'ip_hash'                       => $ip_hash,
			'sync_attempts'                 => 0,
			'sync_last_attempt_at'          => null,
			'sync_attention_at'             => null,
			'updated_at'                    => $now,
		);

		if ( is_array( $existing ) ) {
			$data['created_at'] = $now;
			$saved              = $wpdb->update(
				$table,
				$data,
				array( 'id' => (int) $existing['id'] ),
				array( '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%d', '%s', '%s', '%s', '%s' ),
				array( '%d' )
			);
			$subscriber_id      = (int) $existing['id'];
		} else {
			$data['created_at'] = $now;
			$saved              = $wpdb->insert(
				$table,
				$data,
				array( '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%d', '%s', '%s', '%s', '%s' )
			);
			$subscriber_id      = (int) $wpdb->insert_id;
		}

		if ( false === $saved || $subscriber_id < 1 ) {
			return new \WP_Error(
				'got_early_access_storage_failed',
				__( 'We could not save your request. Please try again later.', 'got-commerce' ),
				array( 'status' => 503 )
			);
		}

		if ( ! self::send_confirmation_email( $validated['email'], $token['token'] ) ) {
			return new \WP_Error(
				'got_early_access_confirmation_unavailable',
				__( 'Your request is saved, but we could not send the confirmation message. Please try again later.', 'got-commerce' ),
				array( 'status' => 503 )
			);
		}

		return array(
			'status'            => 'pending',
			'confirmation_sent' => true,
		);
	}

	/**
	 * Validate only the four approved signup fields.
	 *
	 * @param array<string, mixed> $payload Parsed JSON request data.
	 * @return array{email: string, first_name: string, whatsapp: string}|\WP_Error
	 */
	public static function validate_payload( array $payload ): array|\WP_Error {
		$email = strtolower( sanitize_email( self::text_value( $payload['email'] ?? '' ) ) );
		if ( '' === $email || ! is_email( $email ) ) {
			return new \WP_Error(
				'got_early_access_invalid_email',
				__( 'Enter a valid email address.', 'got-commerce' ),
				array(
					'status' => 422,
					'field'  => 'email',
				)
			);
		}

		$consent = $payload['consent'] ?? false;
		if ( ! in_array( $consent, array( true, 1, '1' ), true ) ) {
			return new \WP_Error(
				'got_early_access_consent_required',
				__( 'Please agree before requesting early access.', 'got-commerce' ),
				array(
					'status' => 422,
					'field'  => 'consent',
				)
			);
		}

		$first_name = self::text_value( $payload['first_name'] ?? '' );
		$first_name = function_exists( 'mb_substr' ) ? mb_substr( $first_name, 0, 100 ) : substr( $first_name, 0, 100 );
		$whatsapp   = preg_replace( '/[^0-9+() .-]/', '', self::text_value( $payload['whatsapp'] ?? '' ) );
		$digits     = preg_replace( '/\D/', '', (string) $whatsapp );

		if ( '' !== $whatsapp && ( strlen( (string) $digits ) < 7 || strlen( (string) $digits ) > 20 ) ) {
			return new \WP_Error(
				'got_early_access_invalid_whatsapp',
				__( 'Enter a valid phone number or leave this field empty.', 'got-commerce' ),
				array(
					'status' => 422,
					'field'  => 'whatsapp',
				)
			);
		}

		return array(
			'email'      => $email,
			'first_name' => $first_name,
			'whatsapp'   => (string) $whatsapp,
		);
	}

	/**
	 * Confirm a pending record once, before it can be included in marketing sync.
	 *
	 * @param mixed $plain_token Untrusted confirmation token from the link.
	 * @return array{status: 'expired'|'confirmed'}
	 */
	public function confirm( mixed $plain_token ): array {
		$token_hash = ConfirmationToken::hash_token( $plain_token );
		if ( null === $token_hash ) {
			return array( 'status' => 'expired' );
		}

		global $wpdb;
		$table = CreateEarlyAccessTable::subscriber_table();
		$row   = $wpdb->get_row(
			$wpdb->prepare(
				"SELECT id FROM {$table} WHERE confirmation_token_hash = %s AND status = 'pending'
				AND confirmation_token_expires_at > UTC_TIMESTAMP() LIMIT 1",
				$token_hash
			),
			ARRAY_A
		);

		if ( ! is_array( $row ) ) {
			return array( 'status' => 'expired' );
		}

		$unsubscribe_token = ConfirmationToken::issue();
		$now               = current_time( 'mysql', true );
		$updated           = $wpdb->query(
			$wpdb->prepare(
				"UPDATE {$table} SET status = 'sync_pending', confirmed_at = %s, confirmation_token_hash = NULL,
				confirmation_token_expires_at = NULL, unsubscribe_token_hash = %s,
				updated_at = %s WHERE id = %d AND status = 'pending'
				AND confirmation_token_hash = %s AND confirmation_token_expires_at > UTC_TIMESTAMP()",
				$now,
				$unsubscribe_token['hash'],
				$now,
				(int) $row['id'],
				$token_hash
			)
		);

		if ( 1 !== (int) $updated ) {
			return array( 'status' => 'expired' );
		}

		EmailSync::sync( (int) $row['id'] );
		return array( 'status' => 'confirmed' );
	}

	/**
	 * Apply a one-way unsubscribe using the opaque token from a signed link.
	 *
	 * @param mixed $plain_token Untrusted unsubscribe token from the request.
	 * @return array{status: 'unsubscribed'}|\WP_Error
	 */
	public function unsubscribe( mixed $plain_token ): array|\WP_Error {
		$token_hash = ConfirmationToken::hash_token( $plain_token );
		if ( null === $token_hash ) {
			return new \WP_Error( 'got_early_access_invalid_unsubscribe_token', __( 'This unsubscribe link is invalid.', 'got-commerce' ), array( 'status' => 400 ) );
		}

		global $wpdb;
		$table  = CreateEarlyAccessTable::subscriber_table();
		$result = $wpdb->query(
			$wpdb->prepare(
				"UPDATE {$table} SET status = 'unsubscribed', unsubscribe_token_hash = NULL, updated_at = UTC_TIMESTAMP()
				WHERE unsubscribe_token_hash = %s AND status IN ('confirmed', 'sync_pending', 'unsubscribed')",
				$token_hash
			)
		);

		if ( false === $result ) {
			return new \WP_Error( 'got_early_access_unsubscribe_failed', __( 'We could not update your request. Please try again later.', 'got-commerce' ), array( 'status' => 503 ) );
		}

		return array( 'status' => 'unsubscribed' );
	}

	/**
	 * Generate an HMAC so neither subscriber nor rate-limit tables retain raw IPs.
	 *
	 * @param string $ip_address Remote address supplied by the web server.
	 */
	public static function hash_ip_address( string $ip_address ): string {
		$address = filter_var( $ip_address, FILTER_VALIDATE_IP ) ? $ip_address : 'unknown';
		return hash_hmac( 'sha256', $address, wp_salt( 'auth' ) );
	}

	/**
	 * Send only the requested double-opt-in email through WordPress's configured transport.
	 *
	 * @param string $email Recipient address.
	 * @param string $token Single-use confirmation token.
	 */
	private static function send_confirmation_email( string $email, string $token ): bool {
		$confirmation_url = rest_url( 'got/v1/early-access/confirm/' . rawurlencode( $token ) );
		$subject          = __( 'Confirm your GØT Drop 01 email updates', 'got-commerce' );
		$message          = sprintf(
			/* translators: %s: single-use confirmation URL. */
			__( "Please confirm your request to receive GØT Drop 01 updates by email.\n\nConfirm within 48 hours: %s\n\nIf you did not request this, you can ignore this message.", 'got-commerce' ),
			$confirmation_url
		);

		return (bool) wp_mail( $email, $subject, $message );
	}

	/**
	 * Normalize text input without accepting arrays or objects.
	 *
	 * @param mixed $value Untrusted input value.
	 */
	private static function text_value( mixed $value ): string {
		if ( ! is_string( $value ) && ! is_numeric( $value ) ) {
			return '';
		}
		return sanitize_text_field( trim( (string) $value ) );
	}
}

// phpcs:enable WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
// phpcs:enable WordPress.DB.PreparedSQL.InterpolatedNotPrepared
