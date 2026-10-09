**Status: PROPOSED feature brief — not yet run through full Spec Kit specify/plan/tasks workflow. Run `/speckit.specify` when this feature is scheduled to start.**

**Superseded for implementation purposes by `specs/002-wp-woo-sage-foundation/spec.md`, `plan.md`, and `tasks.md`** (generated via the real Spec Kit workflow). This brief is kept as the original planning rationale and is not updated further; treat the Spec Kit artifacts as authoritative for scope, acceptance criteria, and tasks.

# 002 — WordPress, WooCommerce, Sage Foundation

## Summary
Provision the hosting environment and install the base platform: WordPress, WooCommerce (HPOS enabled), Roots Sage 10 (pending ADR 0001 verification) on Acorn, Vite, Tailwind, Composer, CI pipeline. This is the prerequisite for every other feature.

## Scope
**In**: hosting provisioning, DNS/SSL/Cloudflare setup, Sage/Acorn/Vite scaffold, WooCommerce install + HPOS + EGP currency + base store settings, Git repo + GitHub Actions CI (lint/build on PR, auto-deploy to staging), `got-sage` theme skeleton + `got-commerce` plugin skeleton per `docs/architecture/wordpress-structure.md`.
**Out**: any visual/content work (003+), any business logic beyond empty plugin scaffolding.

## Dependencies
Hard: 000/001 (ADR 0001 Sage version, ADR 0013 deployment layout, ADR 0012 hosting criteria). None downstream of this feature can start without it.

## Acceptance Criteria
- [ ] Staging environment reachable over HTTPS with valid SSL.
- [ ] WooCommerce active, HPOS enabled, EGP currency, Egypt base address configured (PRD §10 Phase 1 task).
- [ ] `composer create-project roots/sage` version-confirmation checklist run and ADR 0001 updated with VERIFIED versions.
- [ ] CI pipeline runs PHPStan (level 6+), WPCS, Stylelint, ESLint, Vite build on every PR (PRD §9).
- [ ] `got-sage`/`got-commerce` skeletons pass the WordPress Clone Readiness checklist (`docs/architecture/wordpress-structure.md`) at a minimal/empty level (valid theme header, functions.php bootstraps Composer/Acorn).

## Risk Register
- R-010 (domain/DNS/IDN) — PRD-scored risk, mitigation: verify ownership Week 1.
- R-012 (single key-person dependency) — mitigation: document setup in README from day one of this feature, not retroactively.
- Sage-version drift (ADR 0001) — mitigation: run the checklist as literally this feature's first task, not an afterthought.

## Testing Requirements
Integration: environment smoke test (WordPress loads, WooCommerce admin accessible, HPOS confirmed active via `wc_get_container()` check). No E2E/visual tests yet (nothing user-facing exists).

## Visual Parity Requirements
None (no frontend output yet beyond WordPress/WooCommerce defaults).

## Definition of Done
Staging environment live, CI green, ADR 0001 updated with verified versions, theme/plugin skeletons pass clone-readiness checks, README documents setup steps.
