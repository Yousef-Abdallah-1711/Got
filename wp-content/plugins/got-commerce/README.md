# GOT Commerce

## Site Mode

The plugin stores the public mode in `got_site_mode` (`coming_soon` or `store`) and defaults to `coming_soon`. The plugin grants `got_manage_site_mode` to the Administrator and WooCommerce Shop Manager roles, and checks both that capability and the user's role when processing changes and rendering the screen.

Switching to Store requires at least one published, in-stock WooCommerce product. Rejected changes do not update the mode, activity history, or caches. Actual mode changes add an actor and UTC timestamp to `got_site_mode_activity`.

The mode and activity history are separate WordPress options, so WordPress does not provide a transaction across them. A change writes the audit entry first, then the mode, and verifies each write. If either write or verification throws/fails, the plugin attempts to restore both prior option values; it reports the corresponding persistence failure when restoration is verified, or `rollback_failed` when it is not. In that case partial state may remain for inspection. Cache invalidation runs only after both writes are verified. If `wp_cache_flush()` returns `false`, or a cache invalidation function or callback throws, the plugin returns `cache_invalidation_failed` and leaves the already-committed mode and activity intact.

The transition is serialized with a site-specific MySQL/MariaDB named lock, acquired through `$wpdb`. Contention returns a retryable error before reading or mutating Site Mode state. Missing lock APIs or a database lock error fail closed. The lock is released in a `finally` path after the transition returns or throws.

After a mode change, the plugin clears WordPress's object cache, WooCommerce product transients, and fires `got_commerce_site_mode_changed` plus `got_commerce_invalidate_site_mode_page_cache`. A page-cache/CDN integration can attach its purge handler to the latter hook; no provider-specific full-page cache purge is configured by this plugin.

## Acceptance checks

Run the dependency-free regression and acceptance checks from this directory with:

```sh
php tests/run.php
```

The harness uses lightweight WordPress/WooCommerce function doubles and requires only PHP; it does not add production dependencies.
