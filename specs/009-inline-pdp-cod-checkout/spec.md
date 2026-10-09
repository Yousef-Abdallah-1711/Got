# Feature Specification: Inline Product-Page Cash-on-Delivery Checkout

**Feature Branch**: `009-inline-pdp-cod-checkout`

**Created**: 2026-10-09

**Status**: Draft

**Input**: User description: "Mandatory inline Cash on Delivery checkout embedded on the product detail page, sharing the same authoritative checkout service as the standard checkout." (Owner decision: mandatory in V1.)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Buyer orders directly from the product page without visiting a separate checkout (Priority: P1)

As a streetwear buyer who has already decided to buy, I want to enter my delivery details and place a Cash-on-Delivery order right from the product page, so that I don't need an extra page visit to complete my purchase.

**Why this priority**: Owner-approved mandatory V1 feature; the product page is explicitly a conversion landing page, and this is its primary conversion mechanism alongside "Add to cart."

**Independent Test**: On a product page, select a size, click "Order now," fill in the inline form, submit, and confirm an order is created with the exact same correctness guarantees as the standard checkout (correct total, stock reduced once, confirmation shown).

**Acceptance Scenarios**:

1. **Given** a buyer has selected a valid size and color, **When** they click "Order now," **Then** the page scrolls to and focuses the inline order form.
2. **Given** the inline form is open, **When** the buyer fills in contact and delivery details, accepts the terms, and submits, **Then** the order is created using the exact same validation, stock-check, shipping-fee, and total-calculation rules as the standard checkout.
3. **Given** the order is successfully created, **When** confirmation is shown, **Then** it is the identical confirmation experience (page and email) as a standard-checkout order.
4. **Given** the buyer double-clicks submit or resubmits within a short window, **When** the second request arrives, **Then** the existing order is returned rather than a duplicate being created.
5. **Given** the currently selected variation is sold out or unavailable, **When** the inline form would otherwise be shown, **Then** it is disabled with a clear message instead.

### Edge Cases

- What happens when a buyer changes their size/color selection after the inline form is already open? → The form's order summary updates to reflect the new selection; it does not silently submit the old one.
- How does the system handle a buyer who already has other items in their shopping cart when placing an inline order? → The inline order is a separate, single-item order; it does not add to, remove from, or otherwise disturb the buyer's existing cart contents.
- What happens if the shipping zone for the entered address isn't covered? → The same "we do not deliver to this governorate yet" message as the standard checkout appears, and the order is not placed.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The product page MUST offer an inline order form reachable via an "Order now" action, distinct from "Add to cart."
- **FR-002**: The inline form MUST collect the same information as the standard checkout: full name, Egyptian mobile number, email, governorate, city, street address, building/apartment, optional delivery notes, and policy acknowledgment.
- **FR-003**: The inline order MUST be validated, priced, and created using the identical business rules as the standard checkout — the same stock/variation check, the same shipping-fee lookup, the same total calculation, and the same duplicate-submission protection.
- **FR-004**: Placing an inline order MUST NOT alter the buyer's existing shopping cart contents in any way.
- **FR-005**: A successful inline order MUST produce the same confirmation page, confirmation email, and order-tracking access as a standard-checkout order.
- **FR-006**: The inline form MUST be disabled with a clear message whenever the currently selected variation is sold out or otherwise unavailable.
- **FR-007**: The inline form MUST never show a success state before the order is actually, verifiably created.

### Key Entities

- **Inline order request**: a single product + variation + quantity + contact/delivery details, processed through the same order-creation path as a standard multi-item cart checkout, resulting in an ordinary WooCommerce order indistinguishable in the admin from one placed via the standard checkout.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: An inline order and a standard-checkout order, given identical inputs (same product, variation, quantity, address), produce an identical total, 100% of the time.
- **SC-002**: Zero instances of a buyer's existing cart being altered by placing an inline order, across a full regression sweep.
- **SC-003**: A duplicate inline submission within the protection window results in zero duplicate orders or duplicate stock reductions, across repeated testing.
- **SC-004**: A buyer can complete an inline order in 4 steps or fewer on a 390px-wide mobile viewport, matching the standard checkout's own mobile step-count bar.

## Assumptions

- This feature depends on the standard checkout's business-rule service (Feature 010) already existing; the inline form is a second entry point to that same service, not an independent implementation.
- "Order now" and "Add to cart" coexist as two separate, always-available actions on the product page whenever the selected variation is available for purchase.
