# Feature Specification: Wishlist and Guest-to-Account Merge

**Feature Branch**: `012-wishlist-guest-merge`

**Created**: 2026-10-09

**Status**: Draft

**Input**: User description: "Wishlist feature with guest persistence, authenticated persistence, and guest-to-account merge on login."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Buyer saves products to revisit later (Priority: P1)

As a buyer, I want to save products I like to a wishlist, so that I can find and buy them later without re-browsing.

**Why this priority**: Should-Have (P1-F004); supports repeat engagement and reduces lost interest.

**Independent Test**: Save a product from a product card, confirm it appears on the dedicated wishlist page, and confirm the header's saved-count updates to match.

**Acceptance Scenarios**:

1. **Given** a buyer views a product card or product page, **When** they select the save/heart control, **Then** the product is added to their wishlist and the control's state updates immediately everywhere it appears.
2. **Given** a buyer has saved items, **When** they open the wishlist page, **Then** all saved items appear with current price and availability, not stale data from when they were saved.
3. **Given** a saved product is sold out, **When** the wishlist page renders, **Then** it is clearly marked unavailable and cannot be moved to cart until that changes.
4. **Given** a buyer selects "move to cart" on an available single-variation item, **When** selected, **Then** it is added to the cart directly; for a multi-variation item, **When** selected, **Then** the buyer is taken to the product page to choose.
5. **Given** a buyer wants to clear their wishlist, **When** they confirm the clear action, **Then** all saved items are removed after an explicit confirmation step.

---

### User Story 2 - A guest's saved items aren't lost when they create an account (Priority: P2)

As a guest who saved items before registering, I don't want to lose my saved items when I create an account.

**Why this priority**: A retention-preserving detail layered on top of the core save/view behavior.

**Independent Test**: As a guest, save two products; register for an account; confirm both products appear in the new account's wishlist with no duplicates.

**Acceptance Scenarios**:

1. **Given** a guest has saved items locally, **When** they register or log into an existing account, **Then** those items merge into the account's wishlist with no duplicate entries.
2. **Given** an account already has saved items and the guest's local list overlaps with them, **When** the merge happens, **Then** the result contains each product only once.

### Edge Cases

- What happens to a wishlist item for a product that's later removed from the store entirely? → It remains listed as "no longer available" with a remove-only action, rather than disappearing silently or erroring.
- How does the system handle a guest's saved list across multiple browser tabs on the same device? → Changes made in one tab are reflected in the others without requiring a manual refresh.
- What happens on a device/browser where local storage is unavailable? → Saving is not possible for that session, and the save control communicates this rather than silently failing.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Any buyer (guest or logged-in) MUST be able to save and remove products from a wishlist, with the saved state reflected consistently across product cards, the product page, and the wishlist page.
- **FR-002**: A logged-in customer's wishlist MUST persist across sessions and devices.
- **FR-003**: A guest's wishlist MUST persist on their device for at least 30 days.
- **FR-004**: The wishlist page MUST always show current price and availability for each saved item, never a stale snapshot from when it was saved.
- **FR-005**: A sold-out or otherwise unavailable saved item MUST be clearly marked and MUST NOT be movable to cart until it becomes available again.
- **FR-006**: Moving a single-variation, available item to cart MUST add it directly; a multi-variation item MUST instead direct the buyer to choose options on the product page.
- **FR-007**: When a guest registers or logs in, their locally saved items MUST merge into their account's wishlist with no duplicate entries.
- **FR-008**: Clearing a wishlist MUST require an explicit confirmation step before removing items.
- **FR-009**: A product removed from the store MUST remain visible in a wishlist as a clearly marked "no longer available" entry with only a remove option, not disappear silently or error.

### Key Entities

- **Wishlist item**: a reference from a buyer (guest device or account) to a specific product, storing only the reference — never a copy of price/name/image, which are always read live.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The saved/not-saved state of any product is identical across the product card, product page, and wishlist page in 100% of tested interactions, with no synchronization lag noticeable to a user.
- **SC-002**: A guest-to-account merge produces zero duplicate entries across every tested overlap scenario.
- **SC-003**: Every wishlist item's displayed price/availability matches the live product data at the moment of viewing, in 100% of spot-checks against a changed product.
- **SC-004**: Zero move-to-cart actions succeed against an unavailable item, across a full test sweep.

## Assumptions

- A wishlist entry references a product, not a specific size/color combination, consistent with how the feature was originally designed and prototyped.
- Whether a first-time guest save should first prompt a login choice or proceed silently is an open decision tracked separately; this feature's requirements are written to support either resolution without a structural change.
