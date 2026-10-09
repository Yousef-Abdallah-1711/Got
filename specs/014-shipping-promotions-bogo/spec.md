# Feature Specification: Shipping Zones, Coupons, and BOGO/Free-Shipping Promotions

**Feature Branch**: `014-shipping-promotions-bogo`

**Created**: 2026-10-09

**Status**: Draft

**Input**: User description: "Shipping zones and fees, native coupons, and mandatory Buy One Get One and free shipping promotions that only display when server-configured and eligible." (Owner decision: BOGO and free shipping are mandatory; must only display when configured and eligible.)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Buyer sees the correct delivery fee for their address (Priority: P1)

As a buyer, I want to see the correct delivery fee for my governorate before I pay, so that I know the real total.

**Why this priority**: Must-Have — checkout cannot be considered complete without correct shipping (feeds Feature 010's own definition of done).

**Independent Test**: Enter addresses in each of the 3 configured shipping zones; confirm each shows its own correct fee and that an uncovered governorate blocks checkout with a clear message.

**Acceptance Scenarios**:

1. **Given** a buyer enters an address in a covered governorate, **When** the shipping fee is calculated, **Then** the correct zone-specific fee is shown and included in the total.
2. **Given** a buyer enters an address in an uncovered governorate, **When** they reach that point, **Then** a clear message appears and checkout is blocked.

---

### User Story 2 - Buyer applies a valid discount code (Priority: P1)

As a buyer, I want to enter a coupon code and see my total update correctly, so that I can use a promotion I was given.

**Why this priority**: Must-Have (part of P0-F005's cart experience).

**Independent Test**: Apply a valid percent-off coupon and confirm the total reduces correctly; apply an invalid one and confirm a clear rejection with no change to the cart.

**Acceptance Scenarios**:

1. **Given** a buyer enters a valid, unexpired coupon meeting its minimum spend, **When** applied, **Then** the total updates correctly within 1 second.
2. **Given** a buyer enters an invalid, expired, or minimum-not-met coupon, **When** applied, **Then** a clear rejection message appears and the cart is otherwise unchanged.

---

### User Story 3 - Buyer sees a real, currently-active promotion, and never a fake one (Priority: P2)

As a buyer, if a Buy-One-Get-One or free-shipping promotion is actually running and I qualify for it, I want to see it clearly on the product page, cart, and checkout; if no real promotion is configured, or I don't qualify, I should see nothing promotional at all.

**Why this priority**: Owner-approved mandatory capability, but secondary to the core shipping/coupon mechanics that checkout depends on unconditionally.

**Independent Test**: With no promotion configured, confirm no promotional badge or message appears anywhere; configure a real BOGO promotion for a specific product, then confirm the badge, eligibility message, and discount all appear correctly and consistently across product page, cart, and checkout for a qualifying purchase — and don't appear for a non-qualifying one.

**Acceptance Scenarios**:

1. **Given** no promotion is currently configured for a product, **When** that product's page, its cart line, or checkout is viewed, **Then** no promotional badge, message, or discount appears anywhere.
2. **Given** a Buy-One-Get-One promotion is configured and active for a product, and a buyer's cart meets its quantity requirement, **When** the cart or checkout is viewed, **Then** the discount is applied and clearly explained, with the savings amount shown.
3. **Given** the same promotion is configured but the buyer's cart does not yet meet the quantity requirement, **When** viewed, **Then** the promotion's requirement is shown as an invitation ("add one more to unlock..."), with no discount yet applied.
4. **Given** a free-shipping threshold promotion is configured, **When** a buyer's cart is below the threshold, **Then** a message shows how much more they need to add; **When** at or above it, **Then** a "free shipping unlocked" message replaces it and the shipping fee becomes zero.
5. **Given** a promotion's configured end date has passed, **When** any page is viewed, **Then** it behaves exactly as if the promotion were never configured — no badge, no message, no discount.

### Edge Cases

- What happens when a buyer's cart qualifies for both a coupon and a BOGO promotion? → The combination/stacking behavior is governed by the promotion's own configuration (whether it allows stacking with coupons); the buyer always sees a clear, correct final total regardless of which combination rule applies.
- How does the system handle a promotion being deactivated while a buyer has an eligible item in their cart mid-session? → On their next cart/checkout view, the promotion's current (now inactive) state is reflected — no discount is honored that isn't currently real.
- What happens to stock when a BOGO "free" item is fulfilled? → The free item's stock is reduced exactly like any other line item; a BOGO promotion cannot be configured to exceed available stock without the same stock-conflict handling as an ordinary order.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST calculate and apply the correct shipping fee for a buyer's selected governorate, based on configured shipping zones, and MUST block checkout entirely for an uncovered governorate.
- **FR-002**: The system MUST support native discount coupons (percentage, fixed-cart, fixed-product) with usage limits, expiry, and minimum spend, applied with server-side validation.
- **FR-003**: A promotional badge, message, or discount of any kind MUST NOT appear anywhere on the site unless a real, currently-active, server-configured promotion exists and the specific buyer's cart is actually eligible for it at that moment.
- **FR-004**: A Buy-One-Get-One promotion MUST be configurable per product/variation with a required quantity, and MUST calculate and apply its discount automatically once that quantity is met.
- **FR-005**: A buyer who has not yet met a BOGO promotion's quantity requirement MUST see a clear invitation describing what's needed to qualify, without any discount being applied prematurely.
- **FR-006**: A free-shipping-threshold promotion MUST show progress toward the threshold when below it, and MUST show an unlocked state (with the shipping fee actually set to zero) when met or exceeded.
- **FR-007**: Any promotion's displayed state (badge, message, discount) MUST be identical and consistent across the product page, cart, and checkout for the same cart contents.
- **FR-008**: An expired or deactivated promotion MUST behave identically to one that was never configured at all, everywhere it would otherwise have appeared.
- **FR-009**: The system MUST correctly reduce stock for every line item created by a BOGO promotion's "free" item, exactly as for any ordinary purchased item.

### Key Entities

- **Shipping zone**: a named group of governorates with an associated delivery fee.
- **Coupon**: a native discount code with type, amount, usage limit, expiry, and minimum spend.
- **Promotion**: a configured BOGO or free-shipping-threshold rule, with eligible products/variations, a required quantity or spend threshold, an active window, and stacking rules relative to coupons.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of a test sweep across all 3 shipping zones shows the correct fee; an uncovered governorate blocks checkout in 100% of tests.
- **SC-002**: Zero promotional claims appear anywhere in the absence of a real, active, eligible server-side configuration, across a full negative-test sweep (no promotion configured at all, expired promotion, ineligible cart).
- **SC-003**: A qualifying BOGO cart receives the exact correct discount in 100% of test configurations, shown identically on product page, cart, and checkout.
- **SC-004**: A free-shipping threshold correctly transitions from "progress" to "unlocked" messaging at the exact configured amount, with zero off-by-one errors across boundary testing.

## Assumptions

- BOGO and free-shipping-threshold are now mandatory v1 capabilities per owner approval, reversing the earlier open question about their scope; this does not change the underlying "never show an unverified promotion" rule, which remains in force regardless.
- Shipping fee values themselves are supplied by the brand owner; this feature's engineering work can be completed and tested with clearly-marked placeholder fees in the meantime.
- Coupon-and-promotion stacking rules are configured per-promotion rather than being a single global on/off rule.
