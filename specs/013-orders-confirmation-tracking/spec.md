# Feature Specification: Order Confirmation, Tracking, and Transactional Email

**Feature Branch**: `013-orders-confirmation-tracking`

**Created**: 2026-10-09

**Status**: Draft

**Input**: User description: "Order confirmation page, transactional status emails, and a non-enumerating order tracking lookup page."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Buyer receives clear confirmation that their order was placed (Priority: P1)

As a buyer who just placed an order, I want to see and receive clear confirmation with my order number, so that I know it was really placed and have a record of it.

**Why this priority**: Directly part of the checkout experience's completion — a buyer who doesn't trust their order went through will contact support unnecessarily or distrust the brand.

**Independent Test**: Complete a real checkout; confirm the confirmation page shows the order number and items, and a matching confirmation email arrives within 2 minutes.

**Acceptance Scenarios**:

1. **Given** an order was just successfully created, **When** the confirmation page loads, **Then** it shows the order number, items, and next-step information.
2. **Given** an order was successfully created, **When** a few minutes pass, **Then** a confirmation email arrives at the billing email with matching details.
3. **Given** no order has actually been created, **When** the confirmation page would otherwise be requested directly, **Then** it never shows a fabricated "confirmed" state.

---

### User Story 2 - Buyer is notified as their order progresses, and can check status without logging in (Priority: P2)

As a buyer, I want to be notified when my order's status changes and to be able to look up my order without an account, so that I know when to expect delivery.

**Why this priority**: Should-Have (P1-F002); improves trust and reduces support burden but isn't required for the core purchase to succeed.

**Independent Test**: Change a test order's status in the admin through Processing, Out for Delivery, and Delivered; confirm a matching email is sent at each change, and confirm the tracking page shows the correct timeline when looked up by order number and billing email.

**Acceptance Scenarios**:

1. **Given** an order's status changes to Processing, Out for Delivery, Delivered, or Cancelled, **When** the change is saved, **Then** a matching email is sent to the buyer.
2. **Given** a buyer enters their correct order number and billing email on the tracking page, **When** submitted, **Then** they see a chronological status timeline with dates.
3. **Given** a buyer enters an order number and email that don't match each other (or don't exist at all), **When** submitted, **Then** they see the exact same generic "no order found" message in every such case.

### Edge Cases

- What happens when a buyer requests the tracking lookup many times in a short period (possibly guessing order numbers)? → Requests are rate-limited, consistent with the project's other public-form protections.
- How does the system handle a cancelled order's tracking view? → Shows the cancellation clearly in the timeline, with a refund note if applicable, rather than a generic error.
- What happens if the transactional email provider is temporarily down when a status changes? → The status change itself still saves correctly; the email delivery is monitored and retried/alerted per the project's email-delivery monitoring, not silently dropped.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The order confirmation page MUST show the real order number and items only after the order is verifiably persisted, and MUST NOT show a fabricated confirmed state under any circumstance.
- **FR-002**: A confirmation email MUST be sent to the billing email upon successful order creation, matching the confirmation page's details.
- **FR-003**: A status-change email MUST be sent for each of: Processing, Out for Delivery, Delivered, and Cancelled.
- **FR-004**: The order tracking lookup MUST require both an order number and the billing email, and MUST return the identical generic "no order found" response whether the order number is unknown, the email doesn't match, or both are wrong — with no way to distinguish these cases from the response alone.
- **FR-005**: A successful tracking lookup MUST display a chronological timeline of the order's status history with dates.
- **FR-006**: The tracking lookup MUST be rate-limited to prevent systematic guessing of valid order number/email combinations.
- **FR-007**: Email delivery MUST be monitored, with a visible operational alert if the delivery success rate drops below the project's defined threshold.

### Key Entities

- **Order status event**: a timestamped record of a status transition for an order, used to build the tracking timeline.
- **Tracking lookup request**: an order number + billing email pair, resolved to either a visible status timeline or the generic not-found response.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Confirmation emails are delivered within 2 minutes of order creation in at least 99% of a representative test batch.
- **SC-002**: A status-change email is sent for 100% of the four defined status transitions across a full test sweep.
- **SC-003**: Zero distinguishable differences exist between the "wrong order number," "wrong email," and "both wrong" tracking-lookup responses, verified by direct comparison.
- **SC-004**: A correct order-number/email pair reaches the correct status timeline in 100% of test lookups.

## Assumptions

- This feature depends on Feature 010's order-creation flow (and, where applicable, Feature 009's) already producing real orders to confirm, email, and track.
- The specific transactional email provider is not yet chosen (`docs/adr/0011-email-provider.md`); this feature's requirements are written to be vendor-agnostic.
