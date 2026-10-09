<?php
/**
 * Plugin Name: GOT Commerce
 * Description: GOT store functionality for WooCommerce.
 * Version: 0.1.0
 * Requires PHP: 8.3
 * Text Domain: got-commerce
 *
 * @package GOT_Commerce
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once __DIR__ . '/src/SiteMode/SiteMode.php';

GOT\Commerce\SiteMode\SiteMode::register();
