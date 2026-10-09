**Status: PROPOSED feature brief — not yet run through full Spec Kit specify/plan/tasks workflow. Run `/speckit.specify` when this feature is scheduled to start.**

**Superseded for implementation purposes by `specs/016-security-accessibility-performance/spec.md`, `plan.md`, and `tasks.md`** (generated via the real Spec Kit workflow). This brief is kept as the original planning rationale and is not updated further; treat the Spec Kit artifacts as authoritative for scope, acceptance criteria, and tasks.

# 016 — Security, Accessibility, Performance, Observability

## Summary
The PRD Phase 4 hardening pass, applied across the entire site built by features 002–015. Not a new feature in the usual sense — a full-site verification and remediation cycle against the non-functional requirements in `GOT-Store-PRD.md` §8.

## Scope
**In**: 2FA for Administrator/Shop Manager roles, login rate-limiting, security headers (CSP/X-Content-Type-Options/Referrer-Policy/Permissions-Policy), weekly malware scan, dependency/vulnerability audit; full WCAG 2.1 AA automated + manual (screen reader) audit across every page/state in both themes; Core Web Vitals verification on representative mobile hardware against PRD §8's quantified targets; uptime/error-rate/email-delivery monitoring configuration.
**Out**: fixing a defect found here is still "owned" by the feature that introduced it, conceptually — this feature's deliverable is the *audit and the fix-verification pass*, not a separate codebase.

## Dependencies
Hard: 002 through 015 (all of them — this cannot meaningfully start until the site is functionally complete).

## Acceptance Criteria
(Verbatim, PRD §8/§3) Zero open Critical or High defects; WCAG 2.1 AA across all pages, both themes; LCP <2.5s, INP <200ms, CLS <0.1 at p75 on mobile; uptime monitor checking homepage/shop/cart/checkout every 1 minute; 2FA enforced for all Administrator/Shop Manager accounts; weekly malware scan configured.

## Risk Register
- This is where every risk from every prior feature either gets caught or doesn't — treat this feature's own risk register as "the union of every unresolved risk from 002–015," not a new independent list.
- Time pressure to skip the manual screen-reader pass in favor of automated-only accessibility testing — explicitly against PRD §10 Phase 3 validation step, which requires both.

## Testing Requirements
Full regression suite (all E2E scenarios from `docs/testing/commerce-test-matrix.md`); accessibility audit (automated — axe-core or equivalent — AND manual screen-reader pass); performance test against representative mid-range Android/4G profile; security review (dependency audit, header verification, rate-limit/lockout verification, 2FA enforcement check).

## Visual Parity Requirements
A final full-site re-verification of `docs/design/visual-parity-matrix.md` across every page, not a new standard — confirms nothing regressed during the hardening fixes themselves.

## Definition of Done
Zero open Critical/High defects; all NFR targets met and recorded with evidence (not asserted from development screenshots, per constitution); monitoring live and alerting verified (trigger a test alert, confirm it fires).
