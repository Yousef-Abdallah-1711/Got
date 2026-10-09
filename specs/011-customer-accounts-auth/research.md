# Phase 0 Research: Customer Accounts and Authentication

## Decision: Auth mechanism

**Decision**: Native WordPress authentication (`wp_signon`, cookie-based sessions) plus WooCommerce's native My Account endpoints, restyled via Blade template overrides — no custom auth system.
**Rationale**: Re-implementing authentication is both unnecessary (WordPress already solves it correctly) and a security risk (constitution Principle 9: avoid unnecessary dependencies/complexity; Principle 15: security is architectural, meaning "use the proven mechanism," not "build a new one").
**Alternatives considered**: A custom JWT-based auth layer (rejected — no requirement needs stateless tokens; adds attack surface and complexity for no benefit in a server-rendered site).

## Decision: Login lockout implementation

**Decision**: A small custom counter (failed-attempt count + timestamp per user login) in `got-commerce`, resetting on success, triggering a 15-minute block after 5 failures.
**Rationale**: Simple enough to own directly rather than adding a security plugin purely for this one rule; keeps the plugin budget (15 max) available for things that genuinely need a dedicated tool.
**Alternatives considered**: A dedicated login-security plugin (viable alternative if the team prefers not to maintain this logic directly — not chosen here but not ruled out at the ADR level, since this is a task-level implementation choice, not an architecture decision).

## Decision: Guest-order-to-account linking

**Decision**: WooCommerce's native behavior — on registration, orders with a matching billing email and no `customer_id` are offered/linked to the new account.
**Rationale**: Already correct, native, well-tested behavior; no reason to reimplement.

## Dependencies confirmed from prior planning

`docs/planning/feature-briefs/011-customer-accounts-auth.md`, `docs/architecture/overview.md` (session handling, idle-timeout notes).
