# Implementation Plan: Shipping Zones, Coupons, and BOGO/Free-Shipping Promotions

**Branch**: `014-shipping-promotions-bogo` | **Date**: 2026-10-09 | **Spec**: [spec.md](./spec.md)

## Summary

Configure native WooCommerce shipping zones/coupons (already mostly covered by Feature 010's `ShippingZoneSeed`), and build a `got-commerce` `Promotions` module implementing BOGO eligibility + free-shipping-threshold calculation via `woocommerce_cart_calculate_fees`/`woocommerce_before_calculate_totals` hooks, surfaced through the `commerce.promotion`/`commerce.promotionState` contract the `OfferBlock`/`ShippingIncentive` components already expect.

## Technical Context

**Language/Version**: PHP 8.3+ (raised 2026-10-09 for Sage 11/Acorn v6, see docs/adr/0001-sage-version.md) (promotion eligibility hooks into WooCommerce's cart/fee calculation pipeline).
**Primary Dependencies**: WooCommerce cart/fee hooks, native coupon system.
**Storage**: New small table or CPT for promotion configuration (eligible products, quantity/threshold, active window, stacking rule) — decided in research.md.
**Testing**: Playwright E2E (BOGO eligible/ineligible/expired, free-shipping threshold boundary, coupon valid/invalid), PHP unit tests for the eligibility calculator.
**Target Platform**: Same as prior.
**Constraints**: FR-003/FR-008's "never show an unverified promotion" rule is the dominant constraint — every rendering surface (badge, PDP block, cart line, checkout summary) must independently re-check eligibility, never trust a cached/previous render.
**Scale/Scope**: A cross-cutting feature touching PDP (008), cart/checkout (010), and homepage spotlight (006) rendering surfaces.

## Constitution Check

| Principle | Check | Status |
|---|---|---|
| 5 — Never trust client totals | Promotion discount computed server-side in the cart fee hook, never client-calculated | PASS |
| 16 — No fabricated claims | Every promotion surface re-checks eligibility against the server config, never assumed | PASS |

No violations.

## Project Structure

### Documentation (this feature)
```text
specs/014-shipping-promotions-bogo/
├── plan.md
├── research.md
├── data-model.md
├── contracts/
│   └── promotion-eligibility.md
├── quickstart.md
└── tasks.md
```

### Source Code
```text
wp-content/plugins/got-commerce/src/Promotions/
  PromotionConfig.php         # CRUD for promotion configuration (admin screen)
  EligibilityCalculator.php    # given a cart + a promotion config, returns eligible/ineligible + discount + progress
  BogoLineItemHook.php           # CORRECTED (remediates finding C3-PROMO): adds the free unit as a real cart line item (WC()->cart->add_to_cart()) and zeroes its price via woocommerce_before_calculate_totals — replaces the rejected fee-based CartFeeHook.php so stock reduction and refunds apply natively to the free item
  FreeShippingThreshold.php      # wires EligibilityCalculator's threshold check into woocommerce_package_rates for the non-coupon free-shipping case
wp-content/themes/got-sage/resources/views/components/{offer-block,shipping-incentive}.blade.php
```

**Structure Decision**: `EligibilityCalculator` is called fresh by every rendering surface (PDP, cart, checkout) rather than its result being cached/passed between pages, directly enforcing FR-007's cross-surface consistency and FR-003's "always re-verify" rule by construction. **Corrected 2026-10-09**: the BOGO discount mechanism is a real cart/order line item (`BogoLineItemHook.php`), not a cart fee — see `docs/architecture/PROMOTIONS-AND-PRICING.md` for why the fee-based approach in the original plan was a defect (it could not satisfy this feature's own FR-009 stock-reduction requirement).

## Complexity Tracking
*No violations.*
