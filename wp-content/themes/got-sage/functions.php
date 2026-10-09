<?php
/**
 * Bootstrap the Sage/Acorn theme application.
 *
 * @package GOT_Sage
 */

use Roots\Acorn\Application;

$autoload = __DIR__ . '/vendor/autoload.php';

if ( ! file_exists( $autoload ) ) {
	wp_die( esc_html__( 'Composer autoload file not found. Run composer install in the theme directory.', 'got-sage' ) );
}

require $autoload;

if ( ! class_exists( Application::class ) ) {
	wp_die( esc_html__( 'Acorn is not installed. Run composer install in the theme directory.', 'got-sage' ) );
}

Application::configure()
	->withProviders(
		array(
			App\Providers\ThemeServiceProvider::class,
		)
	)
	->boot();
