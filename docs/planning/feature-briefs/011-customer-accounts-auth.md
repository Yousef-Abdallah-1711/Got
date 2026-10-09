**Status: PROPOSED feature brief — not yet run through full Spec Kit specify/plan/tasks workflow. Run `/speckit.specify` when this feature is scheduled to start.**

**Superseded for implementation purposes by `specs/011-customer-accounts-auth/spec.md`, `plan.md`, and `tasks.md`** (generated via the real Spec Kit workflow). This brief is kept as the original planning rationale and is not updated further; treat the Spec Kit artifacts as authoritative for scope, acceptance criteria, and tasks.

# 011 — Customer Accounts and Authentication

## Summary
Implements PRD **P1-F001**: registration, login, password reset, My Account (orders, addresses, account details). Uses native WordPress/WooCommerce auth — no custom auth system.

## Scope
**In**: `woocommerce/myaccount/*` template overrides (login/register/lost-password/orders/addresses/account-details), guest-order-to-account linking by matching email at registration, lockout after 5 failed logins (15-minute lock, PRD §8 Security).
**Out**: wishlist tab content (012 — this feature only provides the My Account shell/nav the wishlist tab plugs into).

## Dependencies
Hard: 002. Soft: 010 (order-visibility AC needs real orders to test against).

## Acceptance Criteria
(Verbatim, PRD P1-F001) Login errors never reveal whether an email is registered; customer sees only own orders, another customer's order URL returns HTTP 403; password reset link expires after 60 minutes, single-use; guest orders with matching email link to the account after registration.

## Risk Register
- Authorization bugs here are a direct privacy/security incident risk (constitution: "customers must never access another customer's private data") — flagged as the highest-severity risk in this feature, requiring explicit security-focused test coverage, not just functional E2E.
- 2FA requirement (PRD §8: required for Administrator/Shop Manager) is an **admin-side** requirement, not customer-facing — do not conflate with customer login, which has no 2FA requirement in the PRD.

## Testing Requirements
E2E: registration → login → view orders → log out. Security/authorization: direct-URL-access test against another customer's order ID (must 403), login-enumeration test (must not reveal registered-email status), password-reset token single-use/expiry test, 5-failed-login lockout test.

## Visual Parity Requirements
Full — against `Account.jsx`'s sign-in/register/reset/dashboard layouts, adapted to WooCommerce's native endpoint structure (per `docs/design/page-mapping.md`).

## Definition of Done
All PRD P1-F001 AC pass, including the security/authorization tests explicitly (not just happy-path functional tests) — this feature's Definition of Done is not met by UI completeness alone.
