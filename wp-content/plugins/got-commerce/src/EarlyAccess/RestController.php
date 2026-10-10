<?php
/**
 * Register public early-access endpoints with same-origin request checks.
 *
 * @package GOT_Commerce
 */

namespace GOT\Commerce\EarlyAccess;

/** Owns the anonymous REST API contract. */
final class RestController {

	/** Register the public signup, confirmation, and unsubscribe routes. */
	public static function register(): void {
		add_action( 'rest_api_init', array( self::class, 'register_routes' ) );
	}

	/** Register routes with explicit permission callbacks. */
	public static function register_routes(): void {
		register_rest_route(
			'got/v1',
			'/early-access',
			array(
				'methods'             => 'POST',
				'callback'            => array( self::class, 'submit' ),
				'permission_callback' => array( self::class, 'same_origin_with_nonce' ),
			)
		);

		register_rest_route(
			'got/v1',
			'/early-access/confirm/(?P<token>[^/]+)',
			array(
				'methods'             => 'GET',
				'callback'            => array( self::class, 'confirm' ),
				'permission_callback' => '__return_true',
			)
		);

		register_rest_route(
			'got/v1',
			'/early-access/unsubscribe',
			array(
				'methods'             => 'POST',
				'callback'            => array( self::class, 'unsubscribe' ),
				'permission_callback' => '__return_true',
			)
		);
	}

	/**
	 * Validate nonce and request origin for the anonymous signup mutation.
	 *
	 * @param \WP_REST_Request $request Incoming REST request.
	 */
	public static function same_origin_with_nonce( \WP_REST_Request $request ): true|\WP_Error {
		$origin = $request->get_header( 'origin' );
		$home   = wp_parse_url( home_url( '/' ) );
		$source = is_string( $origin ) ? wp_parse_url( $origin ) : false;

		if ( ! is_array( $home ) || ! is_array( $source ) || empty( $home['host'] ) || empty( $source['host'] ) ) {
			return new \WP_Error( 'got_early_access_bad_origin', __( 'This request is not allowed.', 'got-commerce' ), array( 'status' => 403 ) );
		}

		$home_port   = (int) ( $home['port'] ?? ( 'https' === ( $home['scheme'] ?? '' ) ? 443 : 80 ) );
		$source_port = (int) ( $source['port'] ?? ( 'https' === ( $source['scheme'] ?? '' ) ? 443 : 80 ) );
		$same_host   = strtolower( $home['host'] ) === strtolower( $source['host'] );
		$same_scheme = strtolower( $home['scheme'] ?? '' ) === strtolower( $source['scheme'] ?? '' );

		if ( ! $same_host || ! $same_scheme || $home_port !== $source_port ) {
			return new \WP_Error( 'got_early_access_bad_origin', __( 'This request is not allowed.', 'got-commerce' ), array( 'status' => 403 ) );
		}

		if ( ! wp_verify_nonce( $request->get_header( 'x-wp-nonce' ), 'wp_rest' ) ) {
			return new \WP_Error( 'got_early_access_invalid_nonce', __( 'Refresh the page and try again.', 'got-commerce' ), array( 'status' => 403 ) );
		}

		return true;
	}

	/**
	 * Process a consented submission without logging personal data.
	 *
	 * @param \WP_REST_Request $request Incoming REST request.
	 */
	public static function submit( \WP_REST_Request $request ): \WP_REST_Response|\WP_Error {
		$params         = $request->get_json_params();
		$remote_address = sanitize_text_field(
			wp_unslash( (string) ( $_SERVER['REMOTE_ADDR'] ?? '' ) )
		);
		$remote         = filter_var( $remote_address, FILTER_VALIDATE_IP );
		$remote         = is_string( $remote ) ? $remote : '';
		$result         = ( new EarlyAccessService() )->submit( $params, $remote );

		if ( is_wp_error( $result ) ) {
			return $result;
		}

		return new \WP_REST_Response( $result, 200, array( 'Cache-Control' => 'no-store' ) );
	}

	/**
	 * Confirm a token, then send the browser to an accessible theme state.
	 *
	 * @param \WP_REST_Request $request Incoming REST request.
	 */
	public static function confirm( \WP_REST_Request $request ): \WP_REST_Response {
		$result = ( new EarlyAccessService() )->confirm( $request->get_param( 'token' ) );
		$target = add_query_arg( 'got_early_access_status', $result['status'], home_url( '/' ) );
		return new \WP_REST_Response(
			null,
			302,
			array(
				'Location'      => $target,
				'Cache-Control' => 'no-store',
			)
		);
	}

	/**
	 * Apply an opaque unsubscribe token; the token itself authorizes the change.
	 *
	 * @param \WP_REST_Request $request Incoming REST request.
	 * @return array{status: 'unsubscribed'}|\WP_Error
	 */
	public static function unsubscribe( \WP_REST_Request $request ): array|\WP_Error {
		$params = $request->get_json_params();
		return ( new EarlyAccessService() )->unsubscribe( $params['token'] ?? null );
	}
}
