# Data Model: Verified Product Reviews

## Review (WooCommerce-native: `wp_comments` + `wp_commentmeta`)

| Field | Storage | Notes |
|---|---|---|
| `product_id` | `comment_post_ID` | native |
| `customer_id` | `user_id` on the comment | native |
| `rating` | comment meta `rating` (1–5) | WooCommerce-native meta key |
| `content` | `comment_content` | native |
| `verified` | comment meta `verified` (bool) | set to `true` only by `ReviewEligibility`'s server-side check at submission time — never settable by the client |
| `status` | `comment_approved` (0 = pending, 1 = approved, "spam"/"trash" = rejected) | native WordPress comment moderation states |
| `created_at` | `comment_date` | native |

## Relationships

Product 1 → many Reviews (native WooCommerce `total_rating`/`rating_count` product meta, recalculated by WooCommerce itself on every approved review — not duplicated by this feature).

## Validation rules

- A review submission is rejected server-side unless `ReviewEligibility::canReview()` returns true for the submitting customer + target product (FR-002).
- Exactly one review per (customer_id, product_id) pair is permitted — enforced by checking for an existing comment from that user on that product before accepting a new one (FR-007).
- `rating` must be an integer 1–5; any other value is rejected, not clamped or silently corrected.
