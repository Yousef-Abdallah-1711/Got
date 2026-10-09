# Implementation Plan: Security, Accessibility, and Performance Hardening

**Branch**: `016-security-accessibility-performance` | **Date**: 2026-10-09 | **Spec**: [spec.md](./spec.md)

## Summary

A full-site audit-and-remediation pass: 2FA + login lockout + security headers + weekly malware/dependency scan; axe-core + manual screen-reader accessibility sweep across every page/theme; Lighthouse performance sweep against PRD §8's targets; final regression-suite gate.

## Technical Context

**Language/Version**: PHP 8.3+ (raised 2026-10-09 for Sage 11/Acorn v6, see docs/adr/0001-sage-version.md) (security headers, 2FA integration), no new frontend framework.
**Primary Dependencies**: A 2FA plugin or WordPress-native application-passwords-adjacent mechanism (task-level choice), a security-headers helper, axe-core, Lighthouse CI.
**Storage**: N/A — this feature audits existing data, introduces no new entities.
**Testing**: This feature *is* testing — the full regression suite from `docs/testing/test-strategy.md` and `docs/testing/commerce-test-matrix.md` runs here as the gate.
**Target Platform**: Same as prior; this is the point where production-equivalent staging conditions matter most.
**Performance Goals**: LCP < 2.5s, INP < 200ms, CLS < 0.1 (p75, mobile/4G) per PRD §8.
**Constraints**: Nothing here introduces new product features — any defect found is fixed in the feature that introduced it, with this feature tracking and verifying the fix.
**Scale/Scope**: Every page/flow built by Features 002–015.

## Constitution Check

| Principle | Check | Status |
|---|---|---|
| 14 — Accessibility is a release requirement | Explicit automated + manual gate, not optional | PASS |
| 15 — Security/privacy architectural | 2FA, lockout, headers, scanning all required before launch | PASS |

No violations.

## Project Structure

### Documentation (this feature)
```text
specs/016-security-accessibility-performance/
├── plan.md
├── research.md
├── quickstart.md
└── tasks.md
# No data-model.md or contracts/ — this feature audits existing systems, introduces none of its own.
```

### Source Code
```text
wp-content/plugins/got-commerce/src/Security/
  SecurityHeaders.php       # CSP, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
  TwoFactorPolicy.php        # enforces 2FA requirement on Administrator/Shop Manager roles
.github/workflows/security-scan.yml   # weekly dependency/malware scan
.github/workflows/a11y-performance.yml # axe-core + Lighthouse CI on PR/staging deploy
```

**Structure Decision**: Security-policy enforcement code lives in `got-commerce` (business/security logic); CI workflow files are infrastructure, living alongside Feature 002's existing CI config.

## Complexity Tracking
*No violations.*
