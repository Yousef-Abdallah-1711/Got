# Implementation Plan: Product Detail, Variations, Inventory

**Branch**: `008-product-details-variations` | **Date**: 2026-10-09 | **Spec**: [spec.md](./spec.md)

## Summary

`woocommerce/single-product.php` Blade override: gallery (swipe/thumbnails/zoom), `ColorSelector`/`SizeSelector`/`QuantityStepper` Alpine components wired to real WooCommerce variation data via a small AJAX "get variation" lookup, stock-state messaging, JSON-LD product schema, sticky mobile CTA. Promotion badges render only via Feature 014's eligibility signal (dormant otherwise).

## Technical Context

**Language/Version**: PHP 8.2+/Blade, Alpine.js.
**Primary Dependencies**: WooCommerce variable products/variations, WooCommerce attribute term meta (color hex).
**Storage**: No new tables; one new term-meta field (`hex`) on `pa_color` terms.
**Testing**: Playwright E2E (variation selection, stock-cap, add-to-cart, network-failure recovery), accessibility (keyboard variation nav), schema validation.
**Target Platform**: Same as prior.
**Performance Goals**: Variation-select response < 200ms.
**Constraints**: Never claim availability WooCommerce doesn't confirm (constitution Principle 16).
**Scale/Scope**: One template, reused for every product in the catalog.

## Constitution Check

| Principle | Check | Status |
|---|---|---|
| 5 — Never trust client totals/limits | Quantity cap and stock state re-validated server-side on add-to-cart, not just client-side | PASS |
| 16 — No fabricated claims | Stock/availability always read live from WooCommerce | PASS |

No violations.

## Project Structure

### Documentation (this feature)
```text
specs/008-product-details-variations/
├── plan.md
├── research.md
├── data-model.md        # color swatch term-meta extension only
├── quickstart.md
└── tasks.md
# No contracts/ — the variation-lookup AJAX action is documented as an internal implementation detail in tasks.md, not a formal external contract (no external consumer).
```

### Source Code
```text
wp-content/themes/got-sage/resources/views/woocommerce/single-product.php
wp-content/themes/got-sage/resources/views/components/{color-selector,size-selector,quantity-stepper}.blade.php
wp-content/themes/got-sage/resources/js/product-detail.js     # Alpine: gallery, variation lookup, sticky CTA, add-to-cart
wp-content/plugins/got-commerce/src/Catalog/ColorSwatchMeta.php  # registers/reads the `hex` term-meta field on pa_color
```

**Structure Decision**: The color-swatch term-meta registration is a small, generic WooCommerce-attribute extension with no checkout-adjacent business logic, but is kept in `got-commerce` anyway since it's data-model-shaping code, not pure presentation, per the theme/plugin boundary's conservative default.

## Complexity Tracking
*No violations.*
