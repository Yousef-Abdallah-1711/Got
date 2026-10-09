# ADR 0016 — Order Status Mapping ("Out for Delivery")

## Status
RESOLVED (remediates cross-feature-analysis.md finding E1).

## Context

PRD P1-F002 requires status emails at four points: Processing, **Out for Delivery**, Delivered, and Cancelled. WooCommerce's default order statuses are: Pending payment, Processing, On hold, Completed, Cancelled, Refunded, Failed, Draft. There is no native "Out for Delivery" or "Delivered" status — "Completed" is WooCommerce's native terminal success state. `specs/013-orders-confirmation-tracking/research.md` flagged this mapping as unresolved and deferred it to task-level implementation; this ADR resolves it before implementation so Feature 013's email-hook wiring (T013) and Feature 018's 7-days-after-Delivered scheduler (T008) both have a single, unambiguous status to key off.

## Options

1. **Register two new custom WooCommerce order statuses**, `wc-out-for-delivery` and `wc-delivered`, via the standard `wc_order_statuses` filter and `init` hook registration (the documented WooCommerce extension pattern for adding statuses), with `wc-delivered` replacing `wc-completed` as the terminal success state in this store's workflow.
2. **Reuse native statuses only**: map "Out for Delivery" messaging to a custom order note on the existing `Processing` status (no status change, just a note + email trigger), and map "Delivered" directly to WooCommerce's native `Completed` status.
3. **Register only `wc-out-for-delivery`** as a custom intermediate status, and use native `Completed` for "Delivered" (hybrid of 1 and 2).

## Trade-offs

- Option 1 gives the operator a fully accurate, native-feeling status list in WooCommerce admin (matching the PRD's own named statuses exactly) but requires two new status registrations, each needing admin-UI label/color registration and bulk-action support to feel native.
- Option 2 requires zero new statuses but means "Out for Delivery" is not a real, filterable order state in the admin — only a note — which makes the Shop Manager's daily workflow (PRD Persona 3: "process COD orders daily") harder, since they can't filter the orders list by "Out for Delivery."
- Option 3 gives the operationally-important "Out for Delivery" filterability while reusing WooCommerce's native terminal state for "Delivered," minimizing new-status registration overhead to just one.

## Decision

**Option 3.** Register exactly one custom order status, `wc-out-for-delivery` ("Out for Delivery"), via `wc_order_statuses`/`init`. "Delivered" maps to WooCommerce's native `Completed` status — no new status for it, since `Completed` already means exactly "the order was fulfilled" in WooCommerce's own model, and the admin/report tooling already understands it correctly (e.g., sales reports, "completed orders" queries). The order-status-change email hook (`woocommerce_order_status_changed`) fires the "Out for Delivery" email on transition to `wc-out-for-delivery` and the "Delivered" email on transition to `wc-completed`.

## Consequences

- `specs/013-orders-confirmation-tracking/tasks.md` T003 ("Resolve the Out for Delivery status mapping") is now a concrete implementation task, not an open research question: register `wc-out-for-delivery`, no change needed for Delivered/`Completed`.
- `specs/018-product-reviews/`'s "7 days after Delivered" trigger (`ReviewRequestScheduler`) keys off the native `wc-completed` status, which it would have needed to do regardless of how this ADR resolved.
- The Shop Manager's order list in WP Admin gains one new filterable status alongside WooCommerce's native ones, with no disruption to existing reporting that already relies on `Completed`.
- HPOS compatibility is unaffected — custom order statuses are a documented, HPOS-compatible WooCommerce extension point (constitution Principle 6 unaffected).

## Approval status

RESOLVED — technical implementation decision, consistent with the PRD's named statuses; no owner sign-off required beyond this ADR's own record.
