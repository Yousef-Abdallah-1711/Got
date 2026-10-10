<?php
/**
 * Issue and validate one-time early-access credentials.
 *
 * @package GOT_Commerce
 */

namespace GOT\Commerce\EarlyAccess;

/** Handles opaque confirmation and unsubscribe tokens. */
final class ConfirmationToken {

	public const CONFIRMATION_TTL = 172800;

	/**
	 * Issue a random token and return only its hash for persistence.
	 *
	 * @param int $ttl Token lifetime in seconds.
	 * @return array{token: string, hash: string, expires_at: string}
	 */
	public static function issue( int $ttl = self::CONFIRMATION_TTL ): array {
		$token = bin2hex( random_bytes( 32 ) );

		return array(
			'token'      => $token,
			'hash'       => hash( 'sha256', $token ),
			'expires_at' => gmdate( 'Y-m-d H:i:s', time() + max( 1, $ttl ) ),
		);
	}

	/**
	 * Hash a correctly formed opaque token; invalid input never reaches storage.
	 *
	 * @param mixed $token Untrusted token supplied by a visitor.
	 */
	public static function hash_token( mixed $token ): ?string {
		if ( ! is_string( $token ) || ! preg_match( '/\A[a-f0-9]{64}\z/i', $token ) ) {
			return null;
		}

		return hash( 'sha256', strtolower( $token ) );
	}
}
