# Data Model: Shipping Zones, Coupons, and BOGO/Free-Shipping Promotions

## `got_promotion` (custom post type)

| Field (post meta) | Type | Notes |
|---|---|---|
| `type` | enum: `bogo`, `free_shipping_threshold` | |
| `eligible_product_ids` | array of product/variation IDs | BOGO only |
| `required_quantity` | integer | BOGO only — quantity of an eligible item needed to trigger the free one |
| `threshold_amount` | decimal (EGP) | free_shipping_threshold only |
| `starts_at` / `ends_at` | datetime, nullable | null `ends_at` = no end date; both checked on every eligibility calculation, never cached |
| `stacks_with_coupons` | boolean | governs whether this promotion combines with an applied coupon or is mutually exclusive |
| `label` | string | shown in the badge/offer block, e.g. "Buy One Get One" |
| `terms` | text, nullable | shown in the offer block's fine print |

## Shipping Zone (WooCommerce-native, unmodified)

zone_name, governorates[], methods[], fee_egp (per `docs/architecture/data-model.md`).

## Coupon (WooCommerce-native, unmodified)

code, discount_type, amount, usage_limit, usage_count, expiry_date, minimum_spend, individual_use.

## Relationships

`got_promotion` references 0–N WooCommerce products/variations (by ID, not a formal foreign key — validated at read time, since a referenced product could later be deleted, which is treated as "that promotion has no eligible products" rather than an error).

## Validation rules

- `EligibilityCalculator` MUST check `starts_at`/`ends_at` against the current time on every single call — a promotion is never considered active based on a cached prior check.
- **Corrected 2026-10-09** (remediates finding C3-PROMO): a BOGO promotion's discount is applied by adding `floor(cart_quantity_of_eligible_item / required_quantity)` real, zero-priced copies of the eligible item as actual cart/order line items — never a cart fee (a fee cannot reduce the free item's stock, which this feature's own FR-009 requires). This still supports multiple BOGO triggers in one cart, each as its own zero-priced line item. See `docs/architecture/PROMOTIONS-AND-PRICING.md`.
