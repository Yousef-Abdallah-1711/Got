# API Contract: Cart and Checkout Endpoints

**Corrected per `docs/architecture/CHECKOUT-AND-ORDER-LIFECYCLE.md`** (remediates finding C2-CHECKOUT: the prior version of this contract had `CheckoutService` itself calling `wc_create_order()` in place of WooCommerce's native Store API checkout processing — not a documented extension pattern, and a risk of bypassing WooCommerce's own stock-hold/tax/coupon hooks).

This feature uses the WooCommerce Store API's documented cart/checkout routes, **unmodified in their own native order-creation behavior**. GØT-specific rules hook into the Store API's documented extension points.

| Method | Route | Purpose | Notes |
|---|---|---|---|
| GET | `/wc/store/v1/cart` | Read current cart state | Session-based, guest or authenticated |
| POST | `/wc/store/v1/cart/add-item` | Add a product/variation to cart | Server re-validates stock before accepting |
| POST | `/wc/store/v1/cart/update-item` | Change a line's quantity | Server re-caps at available stock, returns an adjustment note if capped |
| POST | `/wc/store/v1/cart/remove-item` | Remove a line | |
| POST | `/wc/store/v1/cart/apply-coupon` | Apply a coupon code | Returns a specific error for invalid/expired/minimum-not-met |
| POST | `/wc/store/v1/checkout` | Create the order | **Native WooCommerce Store API order creation** — GØT validation/idempotency runs inside `woocommerce_store_api_checkout_update_order_from_request` and Store API `ExtendSchema` validation hooks, calling `CheckoutService`'s validation methods; the route's own `wc_create_order()` call is never replaced or wrapped |

## Internal contract: `CheckoutService` (validation/idempotency helper — no longer an order-creation method)

**Purpose**: The single class both this feature's Store API hooks and Feature 009's inline controller call for every GØT-specific validation rule, so neither flow re-implements a rule the other already has correct. **It does not create orders for this feature** — see `docs/architecture/CHECKOUT-AND-ORDER-LIFECYCLE.md` for why, and the Feature 009 contract for how it's used differently there.

**Methods** (each independently callable, no implicit ordering requirement beyond `checkIdempotency` running first):
- `checkIdempotency(idempotency_key): {found: bool, order_id?: int}`
- `recordIdempotency(idempotency_key, order_id): void`
- `validateContact({name, phone, email}): {valid: bool, errors?: {...}}`
- `validateAddress({governorate, city, street, building, floor?}): {valid: bool, shipping_fee?: number, errors?: {...}}`
- `validateStock([{product_id, variation_id, quantity}, ...]): {valid: bool, conflicts?: [...]}`

**Guarantees**: every method is pure validation/lookup with no side effect except `recordIdempotency`; calling the same validation method twice with the same input never produces a different result from WooCommerce's own current data.

## How the Store API hook uses it (this feature)

`woocommerce_store_api_checkout_update_order_from_request` (fired during the native `/wc/store/v1/checkout` call, before WooCommerce finalizes the order) calls `CheckoutService::checkIdempotency()` first; if found, the hook short-circuits and the Store API route returns the existing order instead of creating a new one. Otherwise it calls `validateContact()`/`validateAddress()`, attaching any error to the Store API's own validation-error response shape (not a separate GØT-specific error format) so the frontend's existing Store API error handling works unmodified. On successful native order creation, the hook calls `recordIdempotency()`.

## Order-received page access

`GET /checkout/order-received/{order_id}/?key={order_key}` — the `order_key` is WooCommerce's native order access key (ADR 0008); a mismatched or missing key does not reveal order details (returns the generic "not found"-style response, not a 403 that confirms the order's existence).
