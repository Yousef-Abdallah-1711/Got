**Status: PROPOSED feature brief — not yet run through full Spec Kit specify/plan/tasks workflow. Run `/speckit.specify` when this feature is scheduled to start.**

**Superseded for implementation purposes by `specs/005-coming-soon-early-access/spec.md`, `plan.md`, and `tasks.md`** (generated via the real Spec Kit workflow). This brief is kept as the original planning rationale and is not updated further; treat the Spec Kit artifacts as authoritative for scope, acceptance criteria, and tasks.

# 005 — Coming Soon and Early-Access Workflow

## Summary
Implements PRD **P0-F007** in full and the Coming-Soon half of **P0-F001**: the pre-launch homepage, the early-access sign-up form with double opt-in, consent logging, honeypot/rate-limiting, and email-tool sync with retry.

## Scope
**In**: Coming Soon hero (ACF-composed, per 004), `EarlyAccessForm` Blade+Alpine port (plus the first-name/WhatsApp optional fields missing from the current component contract, C-07), `got-commerce`'s `EarlyAccess` service (validation, honeypot, rate limit, consent persistence, double-opt-in token issue/verify, email-tool sync + 15-minute retry job), Site Mode read (this feature just *reads* the mode flag to decide which homepage to render — the flag/guard itself is built in 002/010's cross-cutting Site Mode logic, tracked here as a dependency not a deliverable).
**Out**: Store-mode homepage (006), the Site Mode admin *switch UI* and product-count guard (co-owned with 010, since the guard checks published/in-stock products).

## Dependencies
Hard: 003, 004. Soft: ADR 0010 (subscriber storage — this feature's entire backend depends on it), ADR 0011 (email provider).

## Acceptance Criteria
(Verbatim from PRD P0-F007) No subscriber receives marketing email before confirming; consent timestamp + exact consent text stored per record; unsubscribe link works within 24h; duplicate email submissions create no duplicate records; form fully keyboard-operable, validation errors announced via `aria-live`; form collects no data beyond email + optional first name + optional WhatsApp.

## Risk Register
- R-004 (email deliverability) — SPF/DKIM/DMARC must be configured and tested as part of this feature, not assumed.
- R-008 (data-protection compliance) — consent logging must be legally reviewable before go-live (Phase 4 gate, not this feature's own DoD, but this feature must produce the data correctly).
- C-07 (missing optional fields) — straightforward implementation task, listed here so it isn't missed.

## Testing Requirements
E2E (Playwright): full double-opt-in happy path; rate-limit trigger (>5/IP/hour); expired-confirmation-link path; email-tool-outage retry path (mockable). Security: honeypot/rate-limit verification, no enumeration of existing subscriber status.

## Visual Parity Requirements
Coming Soon hero + below-fold sections per `docs/design/page-mapping.md` and DESIGN.md §7.1 — first mobile viewport must communicate "FORGED TO BE DIFFERENT" within 5 seconds per PRD Objective 1.

## Definition of Done
Double opt-in verified end to end against a real (or sandbox) email-tool account; consent records legally reviewable; Coming Soon page passes the 5-second brand-clarity usability check (PRD Objective 1) with real test participants — this last item is a PRD-mandated usability test, not just an engineering check.
