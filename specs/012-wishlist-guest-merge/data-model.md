# Data Model: Wishlist and Guest-to-Account Merge

## Authenticated wishlist (user meta)

| Meta key | Value shape | Notes |
|---|---|---|
| `_got_wishlist` | JSON array of product IDs (integers) | De-duplicated; no variation-level granularity (per spec Assumption) |

## Guest wishlist (cookie/localStorage, client-side only)

| Key | Value shape | Notes |
|---|---|---|
| `got-wishlist` | JSON array of product-ID strings | Normalized/de-duplicated client-side (mirrors existing `wishlist-store.js` validation: non-empty, ≤128 chars, trimmed); 30-day expiry on the cookie if cookie-based, or a stored timestamp checked against if localStorage-based |

## Relationships

Customer (WordPress user) 1 → one `_got_wishlist` value (a set, not a repeatable relationship table) → many Product references (by ID; products are WooCommerce-native and unmodified by this feature).

## Validation rules

- Product IDs in either store MUST reference a product that still exists at display time; if not, render the "no longer available" state (FR-009) rather than filtering it out silently from storage (so the buyer can consciously remove it).
- Merge operation: `merged = dedupe(account_list ∪ guest_list)`; guest store is cleared only after a successful merge response, never optimistically before.
