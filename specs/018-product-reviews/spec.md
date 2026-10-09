# Feature Specification: Verified Product Reviews

**Feature Branch**: `018-product-reviews`

**Created**: 2026-10-09

**Status**: Draft

**Input**: User description: "Verified-purchase product reviews with star rating, moderation queue, and WooCommerce integration." (Remediation of cross-feature-analysis.md finding C1 — this feature was missing entirely from the original 002–017 roadmap despite being PRD P1-F005.)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - A buyer who actually received the product can leave a trustworthy review (Priority: P1)

As a buyer who received my order, I want to rate and review the product, so that other buyers can judge fit and quality from a real customer's experience.

**Why this priority**: Should-Have (P1-F005); directly supports buyer trust and informs purchase decisions, but depends on orders already reaching "Delivered" status, so it is naturally a later-stage feature.

**Independent Test**: Mark a test order Delivered; confirm the buyer who placed it receives a review request 7 days later; submit a rating and text; confirm it does not appear publicly until an operator approves it; confirm it then displays with a Verified Purchase badge.

**Acceptance Scenarios**:

1. **Given** an order has been marked Delivered for 7 days, **When** the review-request email is due, **Then** it is sent to the buyer who placed that order.
2. **Given** a buyer has a Delivered order for a specific product, **When** they submit a rating (1–5) and review text, **Then** the submission is accepted and queued for moderation.
3. **Given** a visitor has never purchased a product (or their order for it is not yet Delivered), **When** they attempt to submit a review for it, **Then** the submission is rejected.
4. **Given** a submitted review is pending moderation, **When** any visitor views the product, **Then** that review is not visible to them yet.
5. **Given** an operator approves a pending review, **When** it is approved, **Then** it becomes publicly visible with a "Verified Purchase" badge.
6. **Given** an operator rejects or flags a review as abusive, **When** that decision is made, **Then** the review remains hidden from the public permanently (not merely delayed).

---

### User Story 2 - A visitor can judge a product's quality from real review data (Priority: P2)

As a prospective buyer, I want to see a product's average rating and review count, so that I can factor real customer opinions into my purchase decision.

**Why this priority**: Supports conversion but is not required for a purchase to succeed — layered on top of User Story 1's data existing at all.

**Independent Test**: With at least one approved review on a product, confirm its average rating and review count appear correctly on both the product card and the product detail page.

**Acceptance Scenarios**:

1. **Given** a product has one or more approved reviews, **When** its product card or detail page renders, **Then** the average rating and review count both display accurately.
2. **Given** a product has zero approved reviews, **When** its product card or detail page renders, **Then** no rating is shown (never a fabricated "0 stars" or placeholder rating).
3. **Given** a new review is approved, **When** the average is next displayed, **Then** it reflects the updated average immediately, not a stale cached value.

### Edge Cases

- What happens when a buyer tries to submit more than one review for the same product from the same order? → Rejected as a duplicate; one review per customer per product is the standing rule.
- How does the system handle a review-request email for an order that gets later cancelled or refunded after being marked Delivered? → Out of scope for this feature to re-validate retroactively; the email trigger is based on Delivered status at the 7-day mark, not re-checked afterward.
- What happens to an already-published, approved review if the reviewer's account is later deleted? → The review itself remains (it's product feedback, not account data), but is no longer attributable to a live account — handled per the project's standard data-retention/anonymization approach, not specific to this feature.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST send a review-request email to a buyer exactly 7 days after their order is marked Delivered.
- **FR-002**: Only a buyer with a Delivered order for a specific product MUST be permitted to submit a review for that product.
- **FR-003**: A submitted review MUST NOT be publicly visible until an operator explicitly approves it.
- **FR-004**: An approved review MUST display a "Verified Purchase" badge, since every review is, by construction, from a confirmed buyer.
- **FR-005**: A rejected or abuse-flagged review MUST remain permanently hidden from the public.
- **FR-006**: Every product's card and detail page MUST display its average rating and review count whenever at least one approved review exists, and MUST display nothing rating-related when none exist.
- **FR-007**: A buyer MUST NOT be able to submit more than one review for the same product from the same order.
- **FR-008**: A displayed average rating MUST always reflect the current set of approved reviews, never a stale or manually-entered value.

### Key Entities

- **Review**: product reference, customer reference, rating (1–5), text content, verified-purchase flag (always true, by construction of FR-002), moderation status (pending / approved / rejected), creation timestamp.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of a test batch of Delivered orders triggers a review-request email at exactly the 7-day mark, with zero early or missed sends.
- **SC-002**: Zero unverified-purchase review submissions succeed, across a full test sweep of non-purchasing and non-delivered-order visitors.
- **SC-003**: Zero pending or rejected reviews are visible to the public, verified by direct inspection of product pages against the moderation queue's actual state.
- **SC-004**: A product's displayed average rating matches a manual recalculation from its approved reviews in 100% of spot-checks.

## Assumptions

- This feature depends on Feature 013's order-status-change infrastructure (the 7-day-after-Delivered trigger reuses the same status-change event mechanism built there) and on Feature 011's customer-account/order-ownership model (to verify "this buyer has a Delivered order for this product").
- Review moderation is performed by the Shop Manager/Administrator role via the native WordPress moderation queue, not a separate custom admin screen.
- No photo-upload capability is included (explicitly out of scope per PRD §4's "Product reviews with photo uploads... out of scope").
