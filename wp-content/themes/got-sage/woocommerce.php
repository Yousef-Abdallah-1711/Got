<?php
/**
 * Route WooCommerce templates through the shared Sage layout.
 *
 * @package GOT_Sage
 */

// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Blade renders trusted theme templates with escaped dynamic data.
echo view( 'woocommerce', app( 'sage.data' ) )->render();
