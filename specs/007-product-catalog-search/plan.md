# Implementation Plan: Product Catalog, Categories, Filters, Search

**Branch**: `007-product-catalog-search` | **Date**: 2026-10-09 | **Spec**: [spec.md](./spec.md)

## Summary

`woocommerce/archive-product.php` and `taxonomy-product_cat.php` Blade overrides with a `FilterBar` Alpine component (tabs/sort/size-filter, URL-query-string synced), 12/8-per-page + Load More via a small AJAX endpoint, and `search.php` reusing the same grid, extended to match SKU/category per ADR 0014.

## Technical Context

**Language/Version**: PHP 8.3+ (raised 2026-10-09 for Sage 11/Acorn v6, see docs/adr/0001-sage-version.md)/Blade, Alpine.js (filter/sort/load-more state), vanilla `URLSearchParams` for query-string sync.
**Primary Dependencies**: WooCommerce product query (`WP_Query`/`wc_get_products()`), WooCommerce product attributes (size).
**Storage**: N/A — reads WooCommerce data live; no new storage.
**Testing**: Playwright E2E (sort/filter/load-more/back-button/no-results scenarios), Lighthouse performance test.
**Target Platform**: Same as prior.
**Performance Goals**: LCP < 2.5s mobile/4G; filter apply < 300ms; search < 1s for ≤500 products.
**Constraints**: No dedicated search infrastructure (ADR 0014 — explicitly rejected as over-engineering for this scale).
**Scale/Scope**: Up to 1,000 products (design ceiling), ≤100 at launch.

## Constitution Check

| Principle | Check | Status |
|---|---|---|
| 9 — Avoid unnecessary dependencies | Native WP/WC search extended via `pre_get_posts`, not a dedicated search service | PASS |
| 16 — No fabricated claims | Sold-out status read live from WooCommerce stock, not guessed | PASS |

No violations.

## Project Structure

### Documentation (this feature)
```text
specs/007-product-catalog-search/
├── plan.md
├── research.md
├── quickstart.md
└── tasks.md
# No data-model.md (pure WooCommerce-native query feature) or contracts/ (server-rendered + one small AJAX load-more endpoint documented inline in tasks, not a formal external contract).
```

### Source Code
```text
wp-content/themes/got-sage/resources/views/woocommerce/
  archive-product.php
  taxonomy-product_cat.php
wp-content/themes/got-sage/resources/views/components/filter-bar.blade.php
wp-content/themes/got-sage/resources/js/filter-bar.js        # Alpine: tab/sort/filter state, URL sync, load-more fetch
wp-content/themes/got-sage/app/search.php                      # search.php override, extends WP_Query via pre_get_posts
wp-content/plugins/got-commerce/src/Catalog/SearchQuery.php    # pre_get_posts filter: match name + SKU (meta) + category (taxonomy)
```

**Structure Decision**: The search-query extension (SKU/category matching) is the one piece of business logic here, so it lives in `got-commerce` per the theme/plugin boundary; everything else is presentation.

## Complexity Tracking
*No violations.*
