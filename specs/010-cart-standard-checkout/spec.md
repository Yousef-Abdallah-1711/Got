# Feature Specification: Cart and Standard Checkout

**Feature Branch**: `010-cart-standard-checkout`

**Created**: 2026-10-09

**Status**: Draft

**Input**: User description: "Shopping cart and standard WooCommerce checkout with Cash on Delivery, shipping zones, and idempotent order creation."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Buyer reviews their cart and sees a trustworthy total before paying (Priority: P1)

As a streetwear buyer, I want to review and edit my cart — change quantities, remove items, apply a coupon — and see an accurate total before checkout, so that I know exactly what I will owe.

**Why this priority**: Must-Have launch feature (P0-F005); nothing downstream (checkout) matters if the cart itself isn't trustworthy.

**Independent Test**: Add two different variations to the cart, change one's quantity, apply a valid coupon, and confirm the displayed total exactly equals the sum of line totals plus shipping and discounts.

**Acceptance Scenarios**:

1. **Given** a buyer has items in their cart, **When** they view it (full page or mini-cart drawer), **Then** each line shows image, name, variation, quantity control, line total, and a remove control.
2. **Given** a buyer changes a quantity, **When** the change is made, **Then** the line and cart totals update within 500ms without a full page reload.
3. **Given** a buyer enters a valid coupon code, **When** they apply it, **Then** the total updates correctly within 1 second.
4. **Given** a buyer enters an invalid or expired coupon, **When** they apply it, **Then** a clear message appears and the cart is otherwise unchanged.
5. **Given** a cart item has gone out of stock since being added, **When** the cart is viewed, **Then** it is clearly marked sold-out and checkout is blocked until it is removed.
6. **Given** a cart's item price changed since it was added, **When** the cart is viewed, **Then** the current price is shown with a note that it changed.
7. **Given** a buyer's cart is empty, **When** they view it, **Then** a clear "your cart is empty" state with a path back to shopping appears.
8. **Given** a guest buyer closes and reopens their browser within 14 days, **When** they return, **Then** their cart contents are still there.
9. **Given** a guest with cart items logs in, **When** they log in, **Then** their guest cart merges with any existing saved cart with no duplicate lines for the same variation.

---

### User Story 2 - Buyer completes a real Cash-on-Delivery order (Priority: P1)

As a streetwear buyer, I want to enter my delivery details and pay cash on delivery, so that I can place an order without needing an online payment method.

**Why this priority**: The single most business-critical flow in the entire project — this is how the brand actually makes money.

**Independent Test**: From a non-empty, valid cart, complete checkout with a real Egyptian address and COD; confirm an order is created, stock is reduced exactly once, and a confirmation page and email both appear.

**Acceptance Scenarios**:

1. **Given** a buyer reaches checkout, **When** they fill in name, phone, email, governorate, city, street, and building/apartment, **Then** each field is validated as they move between fields and again on submit.
2. **Given** a buyer enters an Egyptian mobile number in a supported format, **When** validated, **Then** it is accepted.
3. **Given** a buyer selects Cash on Delivery, accepts the terms, and submits, **Then** the order is created, stock is reduced exactly once, the cart is cleared, and a confirmation page with order number appears within 2 seconds on a 4G connection.
4. **Given** a buyer's governorate has no shipping coverage, **When** they reach that step, **Then** a clear message appears and "Place order" is disabled.
5. **Given** stock changed between adding to cart and submitting, **When** the order is attempted, **Then** the affected items are clearly listed and the buyer is returned to the cart — no order is created.
6. **Given** a buyer double-clicks "Place order" or resubmits within a short window, **When** the second request arrives, **Then** the existing order is returned, not a second one.
7. **Given** an unexpected server error occurs during order creation, **When** it happens, **Then** the buyer sees a clear message that their order wasn't placed and that their cart is saved, with no stock reduced.

### Edge Cases

- What happens when a buyer applies a coupon that requires a minimum spend they haven't met? → Treated the same as any invalid coupon — clear rejection message, cart unchanged.
- How does the system handle a buyer attempting checkout with zero items? → Checkout is not reachable from an empty cart; the buyer is redirected to shop.
- What happens if a buyer enters an email already registered to an account while checking out as a guest? → They are offered a path to log in instead, while still being able to continue as a guest if they choose.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The cart (mini-cart and full page) MUST show accurate, server-computed totals that always equal the sum of line totals plus shipping and discounts, to the smallest currency unit.
- **FR-002**: Quantity changes MUST update within 500ms without a full page reload; coupon application MUST respond within 1 second with a clear valid/invalid message.
- **FR-003**: A guest's cart MUST persist for 14 days; a logged-in customer's cart MUST persist indefinitely.
- **FR-004**: Merging a guest cart into an account at login MUST NOT create duplicate line items for the same variation.
- **FR-005**: Checkout MUST be blocked whenever any cart line is sold-out or exceeds currently available stock.
- **FR-006**: Checkout MUST collect full name, Egyptian mobile number, email, governorate, city, street address, and building/apartment, and MUST validate each on blur and again on submission.
- **FR-007**: The system MUST calculate and display the correct shipping fee for the buyer's selected governorate, and MUST block order placement entirely when no shipping coverage exists for that governorate.
- **FR-008**: Placing an order MUST reduce stock exactly once per order, create the order, clear the cart, and show a confirmation — all only after the order is verifiably persisted, never before.
- **FR-009**: A duplicate order submission within a short protection window MUST return the original order rather than creating a second one or reducing stock twice.
- **FR-010**: A failed order attempt (stock conflict or server error) MUST preserve the buyer's cart and input, reduce no stock, and create no order.
- **FR-011**: No payment-related secret or credential MUST ever appear in page source, browser storage, or network responses during checkout.
- **FR-012**: Checkout MUST be completable in 4 steps or fewer on a 390px-wide mobile viewport for a guest buyer.

### Key Entities

- **Cart**: a session- or account-bound collection of line items (product + variation + quantity), with applied coupons and computed totals.
- **Order**: the persisted result of a successful checkout — line items, totals, billing/shipping address, payment method (Cash on Delivery), status.
- **Shipping zone**: a named group of governorates with an associated delivery fee.
- **Coupon**: a discount code with a type (percent/fixed), usage limit, expiry, and minimum spend.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Cart totals match the sum of line totals plus shipping and discounts exactly, in 100% of a representative test sweep including multi-item, coupon-applied, and stock-conflict scenarios.
- **SC-002**: A real end-to-end test order completes from an empty cart to a confirmed order with email received, for each configured shipping zone, with zero failures.
- **SC-003**: Stock is reduced exactly once per order in 100% of tests, including deliberate duplicate-submission attempts.
- **SC-004**: Checkout confirmation renders within 2 seconds on a simulated 4G connection in at least 95% of attempts.
- **SC-005**: Zero payment secrets or credentials are detectable in page source, browser storage, or network traffic across a full checkout session inspection.

## Assumptions

- Shipping fees per governorate are supplied by the brand owner before this feature's final sign-off; the feature's engineering work (zone configuration mechanism) can be completed and tested with placeholder fees in the meantime.
- Online payment gateways are explicitly out of scope; Cash on Delivery is the only payment method this feature supports.
- The inline product-page checkout (Feature 009) depends on this feature's checkout business-rule service but is a separate feature with its own specification.
