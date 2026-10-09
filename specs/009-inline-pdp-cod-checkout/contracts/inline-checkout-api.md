# API Contract: Inline PDP Checkout

**Corrected per `docs/architecture/CHECKOUT-AND-ORDER-LIFECYCLE.md`**: this controller calls `CheckoutService`'s *validation* methods (`checkIdempotency`, `validateContact`, `validateAddress`, `validateStock`), then creates the order itself via a direct `wc_create_order()` call — `CheckoutService` itself no longer has a `createOrder()` method (see Feature 010's corrected contract). This is a deliberate split, not a regression: 009 has no WooCommerce cart/Store-API session to delegate order creation to (by design, per ADR 0006, to avoid touching the visitor's real cart), so it is the one flow that legitimately calls `wc_create_order()` directly — a supported, documented WooCommerce API.

## `POST /wp-json/got/v1/inline-checkout`

**Purpose**: Create a single-item Cash-on-Delivery order directly from the product page, without touching the visitor's WooCommerce cart session.

**Request body**:
```json
{
  "product_id": 123,
  "variation_id": 456,
  "quantity": 1,
  "contact": { "name": "Karim A.", "phone": "01012345678", "email": "karim@example.com" },
  "address": { "governorate": "Alexandria", "city": "Smouha", "street": "...", "building": "12", "floor": "3" },
  "notes": "",
  "terms_accepted": true,
  "idempotency_key": "client-generated-uuid-per-form-session"
}
```

**Responses**:
| Status | Body | Meaning |
|---|---|---|
| 201 | `{"order_id": 789, "order_number": "1007", "redirect": "/checkout/order-received/789/?key=..."}` | Order created by this controller's own `wc_create_order()` call, after `CheckoutService` validation passed; response shape identical to Feature 010's native Store API success response |
| 200 | *(same body as above)* | A repeated request with the same `idempotency_key` within the protection window returns the existing order instead of creating a new one — same status/body as the original 201, not an error |
| 422 | `{"errors": {"phone": "Enter a valid Egyptian mobile number, e.g. 010 1234 5678."}}` | Field validation failure — identical error vocabulary to Feature 010's standard checkout |
| 409 | `{"error": "One or more items are no longer available."}` | Stock/variation conflict detected at order-creation time |
| 422 | `{"error": "We do not deliver to this governorate yet."}` | No shipping zone covers the given governorate |
| 500 | `{"error": "Your order could not be placed. Please try again."}` | Unexpected server error — no stock reduced, no order created |

**Side effects**: Creates exactly one WooCommerce order via this controller's own `wc_create_order()` call (after `CheckoutService` validation), reduces stock exactly once, sends the standard order-confirmation email (the same native WooCommerce hooks Feature 010's order triggers), and never modifies the visitor's WooCommerce cart session.

**Authorization**: Public (guest-accessible), same as standard checkout; if the visitor is logged in, the order attaches to their account by the same email-matching rule as the standard checkout.
