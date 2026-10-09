# Phase 0 Research: Verified Product Reviews

## Decision: Review storage mechanism

**Decision**: WooCommerce's native product-review system (built on WordPress comments, with rating stored as comment meta), not a custom table or CPT.
**Rationale**: This is a fully native, well-tested WooCommerce capability — reimplementing it would violate constitution Principle 9 (avoid unnecessary complexity) for no benefit.
**Alternatives considered**: Custom reviews CPT (rejected — no justification; native reviews already model this correctly, including moderation via the standard comment-approval queue).

## Decision: Verified-purchase gate

**Decision**: `ReviewEligibility::canReview($customer_id, $product_id)` checks for an order containing that product, owned by that customer, with status Delivered — called both to decide whether to show the review form at all and, server-side, before accepting a submission.
**Rationale**: Must be enforced server-side (never trust a client-side "show the form" decision as the actual gate) — matches the project's general "never trust the client" discipline (constitution Principle 5, applied here by analogy to review authenticity rather than pricing).

## Decision: Review-request email timing

**Decision**: A daily WP-Cron job queries for orders that transitioned to Delivered exactly 7 days prior (date-boundary match, not a long-running per-order timer), reusing Feature 013's order-status-change event log as its data source.
**Rationale**: A scheduled daily sweep is simpler and more reliable than scheduling a one-off future event per order, and reuses existing status-history data rather than creating a new tracking mechanism.
**Alternatives considered**: `wp_schedule_single_event()` fired at order-Delivered time for 7 days later (rejected — per-order scheduled events are harder to audit/requeue if the cron system has downtime, versus a daily sweep that self-heals).

## Dependencies confirmed from prior planning

`docs/planning/feature-briefs/` (no prior brief existed for this feature — it was the C1 gap); PRD §7 P1-F005 (verbatim source for this feature's scope); Feature 013 (order status-change infrastructure, reused here).
