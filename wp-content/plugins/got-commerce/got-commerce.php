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
require_once __DIR__ . '/src/EarlyAccess/Migrations/CreateEarlyAccessTable.php';
require_once __DIR__ . '/src/EarlyAccess/ConfirmationToken.php';
require_once __DIR__ . '/src/EarlyAccess/RateLimiter.php';
require_once __DIR__ . '/src/EarlyAccess/EmailSync.php';
require_once __DIR__ . '/src/EarlyAccess/EarlyAccessService.php';
require_once __DIR__ . '/src/EarlyAccess/RestController.php';

GOT\Commerce\SiteMode\SiteMode::register();
GOT\Commerce\EarlyAccess\Migrations\CreateEarlyAccessTable::register();
GOT\Commerce\EarlyAccess\EmailSync::register();
GOT\Commerce\EarlyAccess\RestController::register();

register_activation_hook(
	__FILE__,
	array( GOT\Commerce\EarlyAccess\Migrations\CreateEarlyAccessTable::class, 'maybe_migrate' )
);
