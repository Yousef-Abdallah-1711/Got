# Feature Specification: Customer Accounts and Authentication

**Feature Branch**: `011-customer-accounts-auth`

**Created**: 2026-10-09

**Status**: Draft

**Input**: User description: "Customer account registration, login, password reset, and order history using native WordPress and WooCommerce authentication."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Returning customer logs in and sees their orders (Priority: P1)

As a returning customer, I want to log in and see my past orders and addresses, so that I can reorder and track my purchases.

**Why this priority**: Should-Have (P1-F001); enables repeat purchase, a stated business metric.

**Independent Test**: Register a new account, place a test order as that account, log out, log back in, and confirm the order appears in order history.

**Acceptance Scenarios**:

1. **Given** a new visitor, **When** they register with an email and password, **Then** an account is created and they can log in with those credentials.
2. **Given** a customer is logged in, **When** they open My Account → Orders, **Then** they see only their own orders, each with status, items, and total.
3. **Given** a customer forgets their password, **When** they request a reset, **Then** they receive a reset link valid for 60 minutes and usable only once.
4. **Given** a guest placed an order with a given email, **When** they later register using that same email, **Then** that past order becomes visible in their new account's order history.

---

### User Story 2 - A customer can never see another customer's private data (Priority: P1)

As a customer, I need absolute confidence that no one else can view my orders or personal details, and that I cannot accidentally view anyone else's.

**Why this priority**: A non-negotiable security/privacy requirement, not a feature nicety — equally critical regardless of the overall feature's P1 label.

**Independent Test**: As Customer A, attempt to directly open Customer B's order detail URL; confirm access is denied with a generic message, not an error that reveals the order exists.

**Acceptance Scenarios**:

1. **Given** Customer A is logged in, **When** they request Customer B's order detail URL directly, **Then** access is denied with a generic "you do not have access" response.
2. **Given** a visitor attempts to log in with a wrong password for an email that exists, **When** the attempt fails, **Then** the error message is identical to a failed attempt for an email that does not exist at all.
3. **Given** 5 consecutive failed login attempts for one account, **When** the 6th attempt is made, **Then** the account is temporarily locked for 15 minutes.

### Edge Cases

- What happens when a customer tries to register with an email that already has an account? → They are informed the email is already registered and offered a path to log in, without revealing further detail.
- How does the system handle a password-reset link being clicked twice? → The first use succeeds and invalidates it; the second use is rejected as expired/invalid.
- What happens to a guest-placed order whose email later gets used to register a *different* person's account (shared household email)? → Out of scope for this feature; the matching rule is simple email-equality, and any resulting ambiguity is an accepted limitation, not a defect to engineer around here.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST allow a visitor to register an account with an email and password, and to log in with those credentials afterward.
- **FR-002**: A logged-in customer MUST see only their own order history, addresses, and account details — never another customer's.
- **FR-003**: Any direct attempt to view another customer's order MUST be denied with a generic, non-revealing response.
- **FR-004**: A login failure MUST produce an identical message whether the email exists or not, to prevent learning which emails are registered.
- **FR-005**: A password-reset link MUST expire 60 minutes after issuance and MUST be usable at most once.
- **FR-006**: Five consecutive failed login attempts on one account MUST trigger a 15-minute lockout on further attempts for that account.
- **FR-007**: A guest order placed with a given email MUST become visible in that customer's order history once they register using the same email.
- **FR-008**: Registration MUST NOT be required to complete a purchase — guest checkout MUST remain fully available regardless of this feature's existence.

### Key Entities

- **Customer account**: a WordPress user with associated billing/shipping addresses and an order history filtered strictly to orders they own.
- **Session**: a logged-in state with its own idle-timeout behavior, separate from a guest's cart session.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Zero instances of one customer's order data being visible to another, across a full cross-account access-attempt test sweep.
- **SC-002**: Zero instances of a login error revealing whether a specific email is registered, across a test sweep of both existing and non-existing emails.
- **SC-003**: A guest order becomes visible in order history within the same session as registration in 100% of matching-email test cases.
- **SC-004**: A password-reset link correctly expires at 60 minutes and correctly rejects reuse, verified by direct testing of both boundaries.

## Assumptions

- Two-factor authentication is a requirement for Administrator/Shop Manager roles only (per prior planning), not for ordinary customers, and is out of scope for this feature.
- This feature builds on native WordPress/WooCommerce authentication rather than introducing a custom auth system.
