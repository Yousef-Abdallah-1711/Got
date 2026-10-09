<?php
/**
 * Read the public site mode owned by GOT Commerce.
 *
 * @package GOT_Sage
 */

namespace App\Support;

/**
 * Read-only access to the mode stored by the GOT Commerce plugin.
 *
 * @package GOT_Sage
 */
final class SiteMode {

	private const OPTION = 'got_site_mode';

	private const MODES = array( 'coming_soon', 'store' );

	/**
	 * Get the current public site mode.
	 *
	 * Unknown or malformed stored values safely fall back to Coming Soon.
	 */
	public static function get_mode(): string {
		$mode = get_option( self::OPTION, 'coming_soon' );

		if ( ! is_string( $mode ) || ! in_array( $mode, self::MODES, true ) ) {
			return 'coming_soon';
		}

		return $mode;
	}
}
