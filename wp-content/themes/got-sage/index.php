<?php
/**
 * Render the default Sage view.
 *
 * @package GOT_Sage
 */

// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Blade renders trusted theme templates with escaped dynamic data.
echo view( app( 'sage.view' ), app( 'sage.data' ) )->render();
