<?php
/**
 * Register theme-specific Acorn services.
 *
 * @package GOT_Sage
 */

namespace App\Providers;

use Roots\Acorn\Sage\SageServiceProvider;

/**
 * Extend the Sage theme service provider.
 */
class ThemeServiceProvider extends SageServiceProvider {

	/**
	 * Register the theme's presentation setup and navigation locations.
	 */
	public function boot(): void {
		parent::boot();

		add_action( 'after_setup_theme', array( $this, 'setup_theme' ) );
		add_action( 'after_setup_theme', array( $this, 'register_menus' ), 20 );
		add_action( 'after_switch_theme', array( $this, 'seed_default_menus' ) );
		add_action( 'admin_init', array( $this, 'seed_default_menus' ) );
	}

	/**
	 * Declare the WordPress features used by the theme.
	 */
	public function setup_theme(): void {
		add_theme_support( 'title-tag' );
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'html5', array( 'caption', 'comment-form', 'comment-list', 'gallery', 'search-form', 'style', 'script' ) );
		add_theme_support( 'woocommerce' );
	}

	/**
	 * Register the navigation locations rendered by the shared chrome.
	 */
	public function register_menus(): void {
		register_nav_menus(
			array(
				'primary_navigation' => __( 'Primary Navigation', 'got-sage' ),
				'footer_shop'        => __( 'Footer: Shop', 'got-sage' ),
				'footer_help'        => __( 'Footer: Help', 'got-sage' ),
				'footer_follow'      => __( 'Footer: Follow', 'got-sage' ),
			)
		);
	}

	/**
	 * Seed default menus only when their theme locations are unassigned.
	 * Existing editor-assigned menus and their items are left untouched.
	 */
	public function seed_default_menus(): void {
		$locations = get_nav_menu_locations();
		$shop_url  = function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : '';
		$cart_url  = function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'cart' ) : '';
		$privacy   = function_exists( 'wp_privacy_policy_url' ) ? wp_privacy_policy_url() : '';
		$terms_id  = function_exists( 'wc_get_page_id' ) ? wc_get_page_id( 'terms' ) : 0;
		$terms_url = $terms_id > 0 ? get_permalink( $terms_id ) : '';

		$definitions = array(
			'primary_navigation' => array(
				'name'  => 'GOT Main Navigation',
				'items' => array_filter(
					array(
						$this->menu_item( __( 'Home', 'got-sage' ), home_url( '/' ) ),
						$shop_url ? $this->menu_item( __( 'Shop', 'got-sage' ), $shop_url ) : null,
					)
				),
			),
			'footer_shop'        => array(
				'name'  => 'GOT Footer Shop',
				'items' => array_filter(
					array(
						$shop_url ? $this->menu_item( __( 'Shop', 'got-sage' ), $shop_url ) : null,
						$cart_url ? $this->menu_item( __( 'Cart', 'got-sage' ), $cart_url ) : null,
					)
				),
			),
			'footer_help'        => array(
				'name'  => 'GOT Footer Help',
				'items' => array_filter(
					array(
						$privacy ? $this->menu_item( __( 'Privacy Policy', 'got-sage' ), $privacy ) : null,
						$terms_url ? $this->menu_item( __( 'Terms and Conditions', 'got-sage' ), $terms_url ) : null,
					)
				),
			),
			'footer_follow'      => array(
				'name'  => 'GOT Footer Follow',
				'items' => array(
					$this->menu_item( 'Instagram — @got.official1', 'https://www.instagram.com/got.official1/' ),
					$this->menu_item( 'TikTok — @got.offical', 'https://www.tiktok.com/@got.offical' ),
				),
			),
		);

		$locations_changed = false;

		foreach ( $definitions as $location => $definition ) {
			if ( ! empty( $locations[ $location ] ) ) {
				continue;
			}

			$menu    = wp_get_nav_menu_object( $definition['name'] );
			$menu_id = $menu ? (int) $menu->term_id : wp_create_nav_menu( $definition['name'] );

			if ( is_wp_error( $menu_id ) ) {
				continue;
			}

			if ( ! $menu || ! wp_get_nav_menu_items( $menu_id ) ) {
				foreach ( $definition['items'] as $item ) {
					wp_update_nav_menu_item(
						$menu_id,
						0,
						array(
							'menu-item-title'  => $item['label'],
							'menu-item-url'    => $item['url'],
							'menu-item-type'   => 'custom',
							'menu-item-status' => 'publish',
						)
					);
				}
			}

			$locations[ $location ] = $menu_id;
			$locations_changed      = true;
		}

		if ( $locations_changed ) {
			set_theme_mod( 'nav_menu_locations', $locations );
		}
	}

	/**
	 * Build a sanitized custom menu item definition.
	 *
	 * @param  string $label  Menu label.
	 * @param  string $url  Destination URL.
	 * @return array{label: string, url: string}
	 */
	private function menu_item( string $label, string $url ): array {
		return array(
			'label' => $label,
			'url'   => esc_url_raw( $url ),
		);
	}
}
