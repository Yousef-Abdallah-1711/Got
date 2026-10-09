# Implementation Order

**Superseded for execution purposes by `docs/planning/MASTER-IMPLEMENTATION-ROADMAP.md`** §2/§3, which has the corrected critical path (first executable feature: 002, not 001) and the explicit `CheckoutService`-timing resolution. Kept here as the original pre-Spec-Kit planning rationale.

**This is a recommendation requiring explicit owner approval before any implementation begins** — per the project's strict planning-only mode, nothing in this document authorizes starting Feature 002 or any other build work.

## Recommended order (follows the critical path in `docs/planning/dependency-graph.md`, aligned to PRD §10's own 4-phase structure)

1. **Resolve Tier 1 blockers first** (`docs/planning/risks-and-blockers.md`): Acid Lime decision (C-01), inline-checkout scope (C-02), BOGO scope (C-03), hosting/email vendor selection. None of these require engineering time to resolve — they require owner decisions, so resolving them early costs nothing and unblocks everything downstream.
2. **002 — Foundation**, including the Sage-version verification checklist (ADR 0001) as its first task.
3. **003 — Tokens/global UI**, built against whichever accent decision came out of step 1 (never built lime-first "to be safe" — building toward an unapproved default wastes rework if the owner picks silver).
4. **004 — ACF architecture**, in parallel with the tail end of 003 once the Blade component base exists.
5. **005 — Coming Soon/early access**, as soon as 003/004 are far enough along and the subscriber-storage/email-provider ADRs (0010/0011) are confirmed. This can ship and go live in Coming Soon mode **before** the rest of the catalog/checkout work is finished — matching PRD Phase 1's own goal of an independently launchable Coming Soon page.
6. **007 — Catalog** (not search yet) and **008 — PDP**, in sequence, once real or placeholder Drop 01 product data exists.
7. **010 — Cart/standard checkout**, immediately following 008, including its shipping-zone sub-scope from 014 (shipping zones are really part of checkout's own Definition of Done, not a separable later step).
8. **006 — Homepage/editorial**, finished out once 007/008 provide the live data its "new arrivals"/"spotlight" sections need (can be scaffolded with placeholder data earlier, in parallel with step 6).
9. **009 — Inline PDP checkout**, *only if approved in step 1*, immediately after 010 (same service layer).
10. **013 — Order confirmation/email** (the Phase-2-scoped half), as part of finishing 010's Definition of Done.
11. **011 — Accounts/auth**, then **012 — Wishlist/merge**, then **013's tracking half**, then **007's search sub-scope**, then **014's BOGO sub-scope (if approved)**, then **015 — Content pages/SEO/analytics** — this cluster is the PRD's Phase 3 and can be substantially parallelized across more than one contributor if available, constrained by the single-developer risk (R-012) if not.
12. **016 — Hardening** (security, accessibility, performance, observability) — a full-site pass, not a feature in the usual sense; cannot start meaningfully until the above are functionally complete.
13. **017 — Deployment/production acceptance** — the final gate; requires brand-owner-supplied Drop 01 content/legal text/launch date to even attempt the production smoke test, regardless of engineering readiness.

## Why this order, not a strict "ship P0 then P1" order

Early-access (005) is deliberately pulled forward to ship independently, because PRD Phase 1's own goal is a live Coming Soon page before the rest of the store exists — the roadmap's P0/P1 labels describe *launch-blocking* status, not *build-order* priority, and this document treats build order as its own question.

## What must NOT happen

- Building 009 or 014's BOGO sub-scope before their respective ADR/conflict is resolved (wasted work on an unapproved feature).
- Building 003's token system against the lime default "temporarily" and planning to swap later — rework risk is real (every component touching `--got-cta-bg`/`--color-focus` would need re-verification), so the decision should be made before, not after, this step.
- Starting 016/017 before 002–015 are functionally complete — hardening and production-acceptance work against a moving target otherwise.

## Approval status

**REQUIRES APPROVAL** — this entire document is a recommendation. Per the project's execution rules, implementation does not begin on Feature 002 or any other item above until the owner explicitly says so.
