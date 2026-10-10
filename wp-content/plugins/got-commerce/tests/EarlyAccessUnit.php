<?php

if ( PHP_SAPI !== 'cli' ) {
	http_response_code( 403 );
	exit( "This acceptance harness must be run from the command line.\n" );
}

final class WP_Error {
	private string $code;
	private array $data;

	public function __construct( string $code, string $message = '', array $data = array() ) {
		$this->code = $code;
		$this->data = $data;
	}

	public function get_error_code(): string {
		return $this->code;
	}

	public function get_error_data(): array {
		return $this->data;
	}
}

final class WP_REST_Request {
	private array $headers;

	public function __construct( array $headers ) {
		$this->headers = array_change_key_case( $headers, CASE_LOWER );
	}

	public function get_header( string $name ): ?string {
		return $this->headers[ strtolower( $name ) ] ?? null;
	}
}

define( 'ARRAY_A', 'ARRAY_A' );

final class FakeEarlyAccessWpdb {
	public string $prefix = 'wp_';
	public int $insert_id = 0;
	public int $subscriber_inserts = 0;
	public array $attempts = array();
	public array $subscriber_rows = array();
	public ?array $existing = null;

	public function prepare( string $query, mixed ...$args ): string {
		return (string) wp_json_encode( array( 'query' => $query, 'args' => $args ) );
	}

	public function query( string $prepared_query ): int|false {
		$statement = json_decode( $prepared_query, true );
		$query = $statement['query'] ?? '';
		$args  = $statement['args'] ?? array();
		if ( str_contains( $query, 'INSERT INTO wp_got_early_access_attempts' ) ) {
			$hash = (string) ( $statement['args'][0] ?? '' );
			$this->attempts[ $hash ] = ( $this->attempts[ $hash ] ?? 0 ) + 1;
			return 1;
		}

		if ( str_contains( $query, "SET status = 'sync_pending', confirmed_at" ) ) {
			[ $confirmed_at, $unsubscribe_hash, $updated_at, $id, $token_hash ] = $args;
			$row = $this->subscriber_rows[ (int) $id ] ?? null;
			if ( ! is_array( $row ) || 'pending' !== $row['status'] || ! hash_equals( $row['confirmation_token_hash'], $token_hash ) ) {
				return 0;
			}
			$this->subscriber_rows[ (int) $id ] = array_merge(
				$row,
				array(
					'status' => 'sync_pending',
					'confirmed_at' => $confirmed_at,
					'confirmation_token_hash' => null,
					'confirmation_token_expires_at' => null,
					'unsubscribe_token_hash' => $unsubscribe_hash,
					'updated_at' => $updated_at,
				)
			);
			return 1;
		}

		if ( str_contains( $query, 'sync_attempts = LEAST(sync_attempts + 1' ) ) {
			$id = (int) ( $args[0] ?? 0 );
			if ( isset( $this->subscriber_rows[ $id ] ) ) {
				++$this->subscriber_rows[ $id ]['sync_attempts'];
				$this->subscriber_rows[ $id ]['status'] = 'sync_pending';
			}
			return 1;
		}

		if ( str_contains( $query, "SET status = 'unsubscribed'" ) ) {
			$token_hash = (string) ( $args[0] ?? '' );
			foreach ( $this->subscriber_rows as &$row ) {
				if ( hash_equals( (string) ( $row['unsubscribe_token_hash'] ?? '' ), $token_hash ) ) {
					$row['status'] = 'unsubscribed';
					$row['unsubscribe_token_hash'] = null;
					unset( $row );
					return 1;
				}
			}
			unset( $row );
			return 0;
		}

		return 0;
	}

	public function get_var( string $prepared_query ): int {
		$statement = json_decode( $prepared_query, true );
		$hash      = (string) ( $statement['args'][0] ?? '' );
		return (int) ( $this->attempts[ $hash ] ?? 0 );
	}

	public function get_row( string $prepared_query, mixed $format = null ): ?array {
		$statement = json_decode( $prepared_query, true );
		$query = $statement['query'] ?? '';
		$args  = $statement['args'] ?? array();
		if ( str_contains( $query, 'WHERE email = %s' ) ) {
			if ( is_array( $this->existing ) ) {
				return $this->existing;
			}
			foreach ( $this->subscriber_rows as $row ) {
				if ( $row['email'] === ( $args[0] ?? '' ) ) {
					return $row;
				}
			}
			return null;
		}

		if ( str_contains( $query, 'WHERE confirmation_token_hash = %s' ) ) {
			foreach ( $this->subscriber_rows as $row ) {
				if ( 'pending' === $row['status'] && hash_equals( (string) $row['confirmation_token_hash'], (string) ( $args[0] ?? '' ) ) ) {
					return array( 'id' => $row['id'] );
				}
			}
			return null;
		}

		if ( str_contains( $query, 'WHERE id = %d' ) ) {
			return $this->subscriber_rows[ (int) ( $args[0] ?? 0 ) ] ?? null;
		}

		return null;
	}

	public function insert( string $table, array $data, array $formats = array() ): int {
		$this->subscriber_inserts++;
		$this->insert_id = 100 + $this->subscriber_inserts;
		$this->subscriber_rows[ $this->insert_id ] = array_merge( array( 'id' => $this->insert_id ), $data );
		return 1;
	}

	public function update( string $table, array $data, array $where, array $formats = array(), array $where_formats = array() ): int {
		$id = (int) ( $where['id'] ?? 0 );
		if ( isset( $this->subscriber_rows[ $id ] ) ) {
			$this->subscriber_rows[ $id ] = array_merge( $this->subscriber_rows[ $id ], $data );
			return 1;
		}
		return 1;
	}
}

$GLOBALS['wpdb'] = new FakeEarlyAccessWpdb();
$GLOBALS['early_access_mail_count'] = 0;
$GLOBALS['early_access_mail_messages'] = array();
$GLOBALS['early_access_mock_provider'] = null;

function __( string $text, string $domain = '' ): string { return $text; }
function sanitize_text_field( string $text ): string { return trim( strip_tags( $text ) ); }
function sanitize_email( string $email ): string { return filter_var( $email, FILTER_SANITIZE_EMAIL ) ?: ''; }
function is_email( string $email ): string|false { return filter_var( $email, FILTER_VALIDATE_EMAIL ); }
function is_wp_error( mixed $value ): bool { return $value instanceof WP_Error; }
function wp_salt( string $scheme = 'auth' ): string { return 'test-only-local-salt'; }
function current_time( string $type, bool $gmt = false ): string { return gmdate( 'Y-m-d H:i:s' ); }
function wp_mail( string $to, string $subject, string $message ): bool { $GLOBALS['early_access_mail_count']++; $GLOBALS['early_access_mail_messages'][] = $message; return true; }
function wp_json_encode( mixed $value ): string|false { return json_encode( $value ); }
function rest_url( string $path = '' ): string { return 'https://got.local/wp-json/' . ltrim( $path, '/' ); }
function home_url( string $path = '/' ): string { return 'https://got.local' . $path; }
function add_query_arg( string $key, string $value, string $url ): string { return $url . ( str_contains( $url, '?' ) ? '&' : '?' ) . rawurlencode( $key ) . '=' . rawurlencode( $value ); }
function wp_parse_url( string $url ): array|false { return parse_url( $url ); }
function wp_verify_nonce( ?string $nonce, string $action ): bool { return 'valid-nonce' === $nonce && 'wp_rest' === $action; }
function apply_filters( string $hook, mixed $value ): mixed { return $GLOBALS['early_access_mock_provider'] ?? $value; }

require_once __DIR__ . '/../src/EarlyAccess/Migrations/CreateEarlyAccessTable.php';
require_once __DIR__ . '/../src/EarlyAccess/ConfirmationToken.php';
require_once __DIR__ . '/../src/EarlyAccess/RateLimiter.php';
require_once __DIR__ . '/../src/EarlyAccess/EmailSync.php';
require_once __DIR__ . '/../src/EarlyAccess/EarlyAccessService.php';
require_once __DIR__ . '/../src/EarlyAccess/RestController.php';

use GOT\Commerce\EarlyAccess\ConfirmationToken;
use GOT\Commerce\EarlyAccess\EarlyAccessService;
use GOT\Commerce\EarlyAccess\EmailSync;
use GOT\Commerce\EarlyAccess\RateLimiter;
use GOT\Commerce\EarlyAccess\RestController;

$passed = 0;
$failed = 0;

function check( bool $condition, string $name ): void {
	global $passed, $failed;
	if ( $condition ) {
		++$passed;
		echo "PASS {$name}\n";
	} else {
		++$failed;
		echo "FAIL {$name}\n";
	}
}

$valid = EarlyAccessService::validate_payload(
	array(
		'email'      => '  GUEST@EXAMPLE.INVALID ',
		'first_name' => '<b>Ada</b>',
		'whatsapp'   => '+201234567890',
		'consent'    => true,
	)
);
check( is_array( $valid ) && 'guest@example.invalid' === $valid['email'], 'email is normalized before storage' );
check( is_array( $valid ) && 'Ada' === $valid['first_name'], 'optional first name is sanitized' );
check( is_array( $valid ) && '+201234567890' === $valid['whatsapp'], 'optional phone is retained in an accepted format' );

$invalid_email = EarlyAccessService::validate_payload( array( 'email' => 'nope', 'consent' => true ) );
check( is_wp_error( $invalid_email ) && 'got_early_access_invalid_email' === $invalid_email->get_error_code(), 'invalid email is rejected server-side' );

$missing_consent = EarlyAccessService::validate_payload( array( 'email' => 'guest@example.invalid' ) );
check( is_wp_error( $missing_consent ) && 'got_early_access_consent_required' === $missing_consent->get_error_code(), 'consent is required server-side' );

$invalid_phone = EarlyAccessService::validate_payload( array( 'email' => 'guest@example.invalid', 'consent' => true, 'whatsapp' => '123' ) );
check( is_wp_error( $invalid_phone ) && 'got_early_access_invalid_whatsapp' === $invalid_phone->get_error_code(), 'invalid optional phone is rejected' );

$token = ConfirmationToken::issue();
$expiry = strtotime( $token['expires_at'] . ' UTC' );
check( 64 === strlen( $token['token'] ) && hash_equals( $token['hash'], hash( 'sha256', $token['token'] ) ), 'confirmation token is random-length and persisted as a hash' );
check( null === ConfirmationToken::hash_token( 'not-a-token' ), 'malformed confirmation token is rejected before lookup' );
check( false !== $expiry && abs( ( $expiry - time() ) - ConfirmationToken::CONFIRMATION_TTL ) <= 2, 'confirmation token expires after 48 hours' );

$ip_hash_a = EarlyAccessService::hash_ip_address( '192.0.2.10' );
$ip_hash_b = EarlyAccessService::hash_ip_address( '192.0.2.11' );
check( 64 === strlen( $ip_hash_a ) && ! str_contains( $ip_hash_a, '192.0.2.10' ) && $ip_hash_a !== $ip_hash_b, 'rate-limit source is HMAC hashed without storing the address' );

$GLOBALS['wpdb']->attempts = array();
$rate_limiter = new RateLimiter();
$within_limit = true;
for ( $attempt = 0; $attempt < RateLimiter::LIMIT; ++$attempt ) {
	$within_limit = $within_limit && true === $rate_limiter->record_attempt( $ip_hash_a );
}
check( $within_limit, 'first five attempts are accepted' );
$sixth = $rate_limiter->record_attempt( $ip_hash_a );
check( is_wp_error( $sixth ) && 'got_early_access_rate_limited' === $sixth->get_error_code(), 'sixth attempt is rejected' );

$GLOBALS['wpdb']->attempts = array();
$GLOBALS['wpdb']->existing = null;
$GLOBALS['wpdb']->subscriber_inserts = 0;
$GLOBALS['early_access_mail_count'] = 0;
$honeypot = ( new EarlyAccessService() )->submit(
	array( 'email' => 'bot@example.invalid', 'consent' => true, 'company_website' => 'https://spam.invalid' ),
	'192.0.2.12'
);
check( is_array( $honeypot ) && 'accepted' === $honeypot['status'], 'honeypot submission is silently acknowledged' );
check( 0 === $GLOBALS['wpdb']->subscriber_inserts && 0 === $GLOBALS['early_access_mail_count'], 'honeypot creates no subscriber and sends no email' );

$GLOBALS['wpdb']->attempts = array();
$GLOBALS['wpdb']->existing = null;
$GLOBALS['early_access_mail_count'] = 0;
$pending = ( new EarlyAccessService() )->submit(
	array(
		'email' => 'GUEST@EXAMPLE.INVALID',
		'first_name' => 'Ada',
		'whatsapp' => '+201234567890',
		'consent' => true,
	),
	'192.0.2.20'
);
$stored = $GLOBALS['wpdb']->subscriber_rows[101] ?? array();
$confirmation_token = '';
if ( preg_match( '/confirm\/([a-f0-9]{64})/', $GLOBALS['early_access_mail_messages'][0] ?? '', $matches ) ) {
	$confirmation_token = $matches[1];
}
check( is_array( $pending ) && 'pending' === $pending['status'] && true === $pending['confirmation_sent'], 'valid consent is saved pending and local test mail is accepted' );
check( 'guest@example.invalid' === ( $stored['email'] ?? '' ) && EarlyAccessService::CONSENT_TEXT === ( $stored['consent_text'] ?? '' ), 'subscriber row stores normalized email and the exact consent text' );
check( 'pending' === ( $stored['status'] ?? '' ) && empty( $stored['confirmed_at'] ), 'signup remains unconfirmed before the email link is used' );
check( 64 === strlen( $confirmation_token ) && ! hash_equals( $confirmation_token, (string) ( $stored['confirmation_token_hash'] ?? '' ) ), 'confirmation email contains the one-time token while storage keeps only its hash' );

$confirmed = ( new EarlyAccessService() )->confirm( $confirmation_token );
$stored = $GLOBALS['wpdb']->subscriber_rows[101] ?? array();
check( 'confirmed' === $confirmed['status'] && ! empty( $stored['confirmed_at'] ), 'valid 48-hour token records consent confirmation' );
check( 'sync_pending' === $stored['status'], 'confirmed signup waits locally while no marketing provider is configured' );

$GLOBALS['early_access_mock_unsubscribe_token'] = '';
$GLOBALS['early_access_mock_provider'] = static function ( array $subscriber ): bool {
	$GLOBALS['early_access_mock_provider_calls'][] = $subscriber;
	parse_str( (string) parse_url( $subscriber['unsubscribe_url'], PHP_URL_QUERY ), $query );
	$GLOBALS['early_access_mock_unsubscribe_token'] = (string) ( $query['got_early_access_token'] ?? '' );
	return ! empty( $subscriber['confirmed_at'] );
};
$GLOBALS['early_access_mock_provider_calls'] = array();
check( true === EmailSync::sync( 101 ), 'mock provider accepts only the already-confirmed record' );
check( 'confirmed' === $GLOBALS['wpdb']->subscriber_rows[101]['status'], 'successful mock sync leaves the confirmed status' );
check( 1 === count( $GLOBALS['early_access_mock_provider_calls'] ), 'provider boundary receives one confirmed record' );
check( 64 === strlen( $GLOBALS['early_access_mock_unsubscribe_token'] ), 'provider receives a signed unsubscribe URL for marketing mail' );
$GLOBALS['early_access_mock_provider'] = null;

$GLOBALS['wpdb']->attempts = array();
$duplicate = ( new EarlyAccessService() )->submit(
	array( 'email' => 'guest@example.invalid', 'consent' => true ),
	'192.0.2.21'
);
check( is_array( $duplicate ) && 'already_confirmed' === $duplicate['status'], 'confirmed duplicate is idempotent' );
check( 1 === $GLOBALS['early_access_mail_count'], 'confirmed duplicate does not send another email' );

$reused = ( new EarlyAccessService() )->confirm( $confirmation_token );
check( 'expired' === $reused['status'], 'confirmation token cannot be reused' );

$unsubscribed = ( new EarlyAccessService() )->unsubscribe( $GLOBALS['early_access_mock_unsubscribe_token'] );
check( is_array( $unsubscribed ) && 'unsubscribed' === $unsubscribed['status'], 'signed unsubscribe token changes the record state' );
$unsubscribed_again = ( new EarlyAccessService() )->unsubscribe( $GLOBALS['early_access_mock_unsubscribe_token'] );
check( is_array( $unsubscribed_again ) && 'unsubscribed' === $unsubscribed_again['status'], 'unsubscribe endpoint is idempotent' );

$same_origin = RestController::same_origin_with_nonce(
	new WP_REST_Request( array( 'Origin' => 'https://got.local', 'X-WP-Nonce' => 'valid-nonce' ) )
);
$cross_origin = RestController::same_origin_with_nonce(
	new WP_REST_Request( array( 'Origin' => 'https://attacker.invalid', 'X-WP-Nonce' => 'valid-nonce' ) )
);
check( true === $same_origin, 'same-origin anonymous request with REST nonce is allowed' );
check( is_wp_error( $cross_origin ) && 'got_early_access_bad_origin' === $cross_origin->get_error_code(), 'cross-origin signup is rejected' );

printf( "\n%d passed, %d failed (%d checks)\n", $passed, $failed, $passed + $failed );
exit( $failed === 0 ? 0 : 1 );
