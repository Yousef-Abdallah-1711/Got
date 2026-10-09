# Promotions and Pricing

**Status**: Corrects finding C3-PROMO (`docs/planning/PRE-IMPLEMENTATION-ARCHITECTURE-REMEDIATION.md`) — an independent Codex review found that `specs/014-shipping-promotions-bogo/research.md`'s original choice (a negative cart fee via `woocommerce_cart_calculate_fees` for BOGO) directly conflicts with that same feature's own spec.md FR-009 ("the system MUST correctly reduce stock for every line item created by a BOGO promotion's 'free' item, exactly as for any ordinary purchased item") — a fee has no product association and cannot reduce a specific product's stock. Verified against the actual files: `specs/014/spec.md` lines 63/77 do require line-item-equivalent stock handling, and WooCommerce's own fee API documentation states fee amounts should not be negative. This document replaces the fee-based mechanism with a line-item-based one.

## Native WooCommerce mechanism for every promotion type in scope

| Promotion type | Native mechanism | Why |
|---|---|---|
| Percentage discount | Native WooCommerce coupon, `discount_type: percent` | Fully native, no custom code |
| Fixed discount | Native WooCommerce coupon, `discount_type: fixed_cart` or `fixed_product` | Fully native |
| Free shipping | Native WooCommerce coupon flag (`free_shipping: true`) or a custom threshold check (Feature 014's `EligibilityCalculator`) setting the shipping method's cost to 0 via `woocommerce_package_rates` | Native coupon for a code-driven free-shipping offer; the threshold-based version (spend X, get free shipping with no code) needs the custom calculator since WooCommerce coupons require a code |
| **BOGO (corrected)** | **Add the free unit as a real cart item via `WC()->cart->add_to_cart()`, then set its price to 0 via `woocommerce_before_calculate_totals`** (setting `$cart_item['data']->set_price(0)` on the matching cart item) | This is how real WooCommerce BOGO extensions represent the free item — as an actual product line, so WooCommerce's own stock-reduction, tax-class, and order-display logic applies to it unmodified. **This is the corrected mechanism, replacing the rejected fee-based approach.** |
| Quantity thresholds (for BOGO's "buy N get 1") | `EligibilityCalculator` checks the cart's quantity of the eligible product/variation against the configured `required_quantity`, independent of the above mechanism | Eligibility calculation and the discount-application mechanism are separate concerns |
| Coupon stacking | Native WooCommerce coupon-stacking rules (`individual_use`) for coupon-vs-coupon; a `stacks_with_coupons` flag on the `got_promotion` CPT for promotion-vs-coupon, checked by `EligibilityCalculator` before adding the free line item | No custom stacking engine — this reuses WooCommerce's own flag for the coupon-to-coupon case |
| Promotion expiry | `got_promotion`'s `starts_at`/`ends_at`, checked fresh on every `EligibilityCalculator` call (never cached) | Already correctly specified this way in Feature 014 |
| Product/category/variation eligibility | `got_promotion`'s `eligible_product_ids` field, matched against cart line items | Already correctly specified |
| Promotion priority (if multiple active) | Not currently a scoped requirement — if two promotions could both apply to the same cart, `EligibilityCalculator` applies the one with the lower `ID` (deterministic, documented tie-break) unless the owner specifies a priority field; flagged here as a scope note, not invented as a full priority system beyond what's asked |
| Refunds | WooCommerce's native refund flow, applied to the free line item exactly like any other line item (price 0, so a refund of it is a $0 refund, but stock IS restored on refund exactly like any other line, which the corrected mechanism makes automatic) | This is the single biggest correctness win of the line-item correction: refund/stock-restoration behavior comes free from WooCommerce's native order-item refund logic, which a fee could never participate in |
| Stock reduction | Native — the free line item is a real order line, so `wc_reduce_stock_levels()` (fired on order creation/processing, same as any paid line) reduces it automatically | This is literally what finding C3-PROMO required and the fee-based approach could not deliver |

## Corrected `EligibilityCalculator` responsibility

`EligibilityCalculator::evaluate()` still returns the same contract shape documented in `specs/014/contracts/promotion-eligibility.md` (used by PDP/cart/checkout rendering to decide what badge/message to show) — that part was correct and is unchanged. What changes is what happens **when a BOGO promotion becomes eligible and the buyer proceeds to checkout**: instead of `CartFeeHook.php` adding a negative fee, a new `BogoLineItemHook.php` (hooked to `woocommerce_add_to_cart`/`woocommerce_cart_loaded_from_session` and `woocommerce_before_calculate_totals`) adds/removes the free line item automatically as cart contents cross the eligibility threshold, and zeroes its price.

## What happens when eligibility is lost mid-session (e.g., buyer removes the qualifying item)

The free line item is automatically removed by the same hook on the next cart recalculation — it is never left in the cart as an orphaned $0 item once its qualifying condition is no longer met. This is the correct behavior and was not a defect in the original design (the fee-based approach would have had the same removal-on-recalculation behavior) — only the *representation* of the discount while present was wrong, not its lifecycle.

## No negative/duplicated discounts, no unapproved promotion claims

Unchanged from the original (already-correct) design: `EligibilityCalculator` is called fresh on every render by every surface (PDP, cart, checkout); nothing is cached or assumed; a promotion that is not currently active/eligible produces zero visible effect anywhere, per `specs/014/spec.md` FR-003/FR-008 (unaffected by this correction).
