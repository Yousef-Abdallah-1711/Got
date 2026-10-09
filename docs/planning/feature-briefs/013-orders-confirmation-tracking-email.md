**Status: PROPOSED feature brief — not yet run through full Spec Kit specify/plan/tasks workflow. Run `/speckit.specify` when this feature is scheduled to start.**

**Superseded for implementation purposes by `specs/013-orders-confirmation-tracking/spec.md`, `plan.md`, and `tasks.md`** (generated via the real Spec Kit workflow). This brief is kept as the original planning rationale and is not updated further; treat the Spec Kit artifacts as authoritative for scope, acceptance criteria, and tasks.

# 013 — Orders, Confirmation, Tracking, Email

## Summary
Two PRD items bundled because they share the same order data: the Phase-2-scoped order-confirmation/email piece of **P0-F006**, and the Phase-3-scoped **P1-F002** (order status emails + tracking page).

## Scope
**In**: order-received page (`ThankYou.jsx` port), transactional emails for order placed + each status change (Processing/Out for Delivery/Delivered/Cancelled), `/track-order/` page (`Confirmation.jsx` port) with non-enumerating lookup-by-order-number-and-billing-email, rate limiting on the tracking endpoint.
**Out**: My Account's order-history list (011's scope; this feature supplies the per-order detail/tracking content that list links to).

## Dependencies
Hard: 010 (order confirmation is literally part of checkout's own completion), ADR 0011 (email provider). Soft: 011 (account order-history reuses this feature's order-detail view).

## Acceptance Criteria
(Confirmation/email, PRD P0-F006) Confirmation email delivered within 2 minutes in 99% of cases.
(Tracking, verbatim PRD P1-F002) Status emails sent for Processing/Out for Delivery/Delivered/Cancelled; Track Order page returns the identical generic "No order found" message for a mismatched number+email as for a non-existent order (no enumeration); tracking timeline shows statuses in order with date/time.

## Risk Register
- R-004 (email deliverability) — this feature is where that risk materializes concretely; SPF/DKIM/DMARC testing (Phase 1 task per PRD) must be verified working before this feature's emails go live.
- Order-tracking enumeration is a real security risk if implemented naively (e.g. different error messages for "wrong email" vs. "no such order") — explicit non-enumeration AC above, test accordingly.

## Testing Requirements
E2E: order placed → confirmation page → confirmation email received (mock/sandbox provider); each status transition → matching email; tracking lookup with correct/incorrect number-email pairs (must return identical response). Monitoring: email-delivery-rate tracked, alert below 98% (PRD §8).

## Visual Parity Requirements
Full — against `ThankYou.jsx` and `Confirmation.jsx`.

## Definition of Done
All AC above pass; email-delivery monitoring active and alerting configured; non-enumeration verified by an explicit security test, not just code review.
