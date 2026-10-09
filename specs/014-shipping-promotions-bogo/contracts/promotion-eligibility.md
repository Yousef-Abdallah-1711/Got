# Contract: Promotion Eligibility (internal — shared by PDP, cart, checkout rendering)

This is an internal PHP contract (`EligibilityCalculator::evaluate()`), not an externally exposed REST endpoint — every rendering surface calls it server-side during its own template render, consistent with FR-003's "always re-verify, never trust a previous render" rule.

## `EligibilityCalculator::evaluate(array $cartOrProductContext): array`

**Input**: either a single product/variation context (for PDP rendering) or a full cart context (for cart/checkout rendering).

**Output shape** (matches the existing `Promo.jsx` `commerce.promotion`/`commerce.promotionState` contract exactly, so the Blade component ports require no contract redesign):
```json
{
  "source": "woocommerce",
  "active": true,
  "id": 42,
  "type": "bogo",
  "label": "Buy One Get One",
  "eligible": false,
  "requiredQuantity": 2,
  "currentQuantity": 1,
  "savings": null,
  "applied": false,
  "endsAt": "2026-12-31",
  "terms": "One free item per two purchased, while supplies last."
}
```

For `free_shipping_threshold` type, the shape instead includes `remaining`, `progressPercent`, `status` (`"progress"` | `"unlocked"`), matching `ShippingIncentive`'s existing contract.

**Guarantee**: if no promotion is configured, or the configured one is expired/inactive, the function returns `{"active": false}` (or equivalent), and every consuming Blade component's existing "return null unless active+eligible" gate (already correctly implemented in the reference `OfferBlock`/`ShippingIncentive`) results in nothing being rendered — this is the mechanism that makes FR-003/FR-008 structurally true rather than merely policy.
