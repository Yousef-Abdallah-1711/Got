**Status: PROPOSED feature brief — not yet run through full Spec Kit specify/plan/tasks workflow. Run `/speckit.specify` when this feature is scheduled to start.**

**Superseded for implementation purposes by `specs/017-deployment-production-acceptance/spec.md`, `plan.md`, and `tasks.md`** (generated via the real Spec Kit workflow). This brief is kept as the original planning rationale and is not updated further; treat the Spec Kit artifacts as authoritative for scope, acceptance criteria, and tasks.

# 017 — Deployment, Backups, Recovery, Production Acceptance

## Summary
The final gate before public launch: production environment cutover, backup/restore verification, and the production smoke test, per PRD Phase 4 and `docs/architecture/deployment.md`.

## Scope
**In**: production environment provisioning (same spec as staging, per ADR 0012), daily backup configuration (database + uploads, 30-day retention), a tested restore drill on staging, production monitoring (uptime/error-rate/email-delivery), Site Mode switch to Store on production, post-launch smoke test, early-access list migration to the chosen email tool with consent records intact.
**Out**: any feature-level engineering work — everything here assumes 002–016 are already complete and signed off.

## Dependencies
Hard: 016. Also hard-blocked on brand-owner deliverables that no feature above produces: confirmed Drop 01 launch date (written confirmation per PRD), real product data/photography/prices, legal-reviewed policy text, verified social/QR links.

## Acceptance Criteria
(Verbatim, PRD Phase 4 validation step) Production smoke test passes (homepage, shop, product, cart, COD checkout, confirmation email, sign-up); monitoring active; backup restore verified; brand owner approval recorded per PRD §15 Approval Gates table.

## Risk Register
- R-002 (launch date set before products/legal ready) — this feature's own gate (Site Mode switch requires ≥1 published in-stock product) is the designed safeguard; do not bypass it manually "just this once."
- R-010 (domain/DNS) — must be fully resolved before this feature's production cutover, not discovered during it.
- Every Tier-1 blocker in `docs/planning/risks-and-blockers.md` that hasn't been resolved by this point becomes a hard launch blocker here, with nowhere further to defer it.

## Testing Requirements
Production smoke test (the full happy path, for real, on production, with a real test order); backup-restore drill (restore a backup to a scratch environment and verify integrity); monitoring-alert trigger test.

## Visual Parity Requirements
Final confirmation that production rendering matches staging exactly (no environment-specific CSS/build differences) — not a new design review, a build-integrity check.

## Definition of Done
Brand owner's written launch-date confirmation on file; Site Mode switched to Store on production; smoke test passed; backup restore verified; early-access list migrated with consent intact; PRD §3 Success Definition fully satisfied (≥1 completed production COD order, zero open Critical/High defects).
