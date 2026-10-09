# Data Model: Cart and Standard Checkout

All entities are WooCommerce-native (HPOS); this feature introduces one small supporting record (the idempotency guard).

## Order (WooCommerce, HPOS)

id, order_number, status, customer_id (nullable for guest), billing_email, billing_address{}, shipping_address{}, shipping_method, payment_method (`cod`), line_items[], subtotal, shipping_total, discount_total, total, created_at.

## Order Line Item (WooCommerce)

product_id, variation_id, quantity, unit_price, line_total, size, color.

## Shipping Zone (WooCommerce)

zone_name (`Alexandria` | `Cairo / Giza` | `Other governorates`), governorates[], methods[], fee_egp (placeholder pending brand input).

## Coupon (WooCommerce, unmodified native entity)

code, discount_type, amount, usage_limit, usage_count, expiry_date, minimum_spend, individual_use.

## `got_checkout_idempotency` (new, small, short-lived table)

| Field | Type | Notes |
|---|---|---|
| `idempotency_key` | varchar(64), UNIQUE | client-generated UUID |
| `order_id` | bigint | the order created for this key |
| `created_at` | datetime | rows older than the protection window (60s) are eligible for cleanup, but a stale row is harmless — it just means a very-late duplicate creates a second order, which is an acceptable edge case given the short window |

## Relationships

Order 1 → many Line Items; Shipping Zone 1 → one fee applied per order based on billing/shipping governorate; `got_checkout_idempotency` 1 → 1 Order (lookup only, not a foreign-key-enforced relationship at the database level, by design — it's a short-lived cache, not durable state).

## Validation rules

- An order MUST NOT be created if any line item's requested quantity exceeds current stock at the moment of submission (re-checked server-side, not trusted from the cart's last-known state).
- An order MUST NOT be created if the billing/shipping governorate has no matching shipping zone.
- `total` MUST always equal `subtotal + shipping_total - discount_total`, computed server-side, never accepted from the client.
