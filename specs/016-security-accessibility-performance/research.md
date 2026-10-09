# Phase 0 Research: Security, Accessibility, and Performance Hardening

## Decision: 2FA mechanism

**Decision**: A dedicated, well-maintained 2FA plugin for Administrator/Shop Manager roles (specific product chosen at task level), rather than a hand-rolled TOTP implementation.
**Rationale**: 2FA correctness (secret storage, time-drift handling, recovery codes) is exactly the kind of security-critical, well-solved problem that constitution Principle 9's "avoid unnecessary dependencies" does not apply to — the risk of a custom implementation getting subtly wrong outweighs the dependency cost here, unlike the login-lockout case (Feature 011) which is simple enough to own directly.
**Alternatives considered**: Custom TOTP (rejected — security-critical code with no justification to hand-roll).

## Decision: Accessibility audit method

**Decision**: Automated axe-core scanning in CI (catches the bulk of mechanical issues — missing labels, contrast, landmark structure) PLUS a mandatory manual screen-reader walkthrough of the primary purchase journey before each phase gate (automated tools cannot verify actual usability).
**Rationale**: PRD Phase 3 validation step explicitly requires both; automated-only is a known gap (axe-core catches roughly 30-50% of real-world issues per industry consensus, not verified independently here but consistent with general accessibility-testing practice).
**Alternatives considered**: Automated-only (rejected — explicitly insufficient per the PRD's own validation requirement).

## Decision: Performance measurement method

**Decision**: Lighthouse CI configured with a simulated mid-range Android/4G throttling profile, run against staging on every deploy, with the specific PRD §8 targets (LCP/INP/CLS) as hard CI gates for the homepage/shop/product pages.
**Rationale**: Matches the PRD's own measurement method (Google PageSpeed/CrUX-equivalent) and makes performance regression visible immediately rather than discovered at a late hardening pass.
**Alternatives considered**: Manual spot-checking only (rejected — doesn't catch regressions introduced between manual checks).

## Dependencies confirmed from prior planning

`docs/testing/test-strategy.md`, `docs/planning/feature-briefs/016-security-accessibility-performance.md`.
