# Phase 0 Research: WordPress, WooCommerce, and Sage Foundation

## Decision: Sage version

**Decision (updated 2026-10-09, SUPERSEDES the original planning-time decision below)**: the version-confirmation step was actually run — `composer create-project roots/sage` via Docker found the installer's current default is **Sage 11** (Acorn v6.3.0, Vite ^8, Tailwind v4, PHP >=8.3), not Sage 10. Pinning `roots/sage:10.*` was also verified to still work (v10.8.2), but its bare scaffold uses Bud.js with no Acorn by default, so matching this project's documented "Acorn + Vite" stack on Sage 10 would have meant assembling an unofficial combination by hand. The project owner explicitly chose to **move to Sage 11** rather than pin Sage 10. See `docs/adr/0001-sage-version.md` for full verified versions and the resulting consequential changes (PHP floor, Tailwind 4 CSS-first config).
**Original planning-time decision (superseded)**: Target Sage 10 on Acorn, with a mandatory version-confirmation step as this feature's first task.
**Rationale**: Every project document (`GOT-Store-PRD.md`, `PRODUCT.md`) fixes Sage 10 as the documented baseline. No internet access was available during planning to verify whether Sage 10 is still the current Roots release at build time.
**Alternatives considered**: Silently installing whatever the Roots installer currently scaffolds (rejected — could silently diverge from every planning document); a non-Sage Blade bridge (rejected — not requested, reopens settled architecture questions).
**Reference**: `docs/adr/0001-sage-version.md`.

## Decision: Repository root layout

**Decision**: Conventional single `wp-content` root, not a Bedrock-style `web/app`/`web/wp` split.
**Rationale**: Matches every path assumption in the PRD/DESIGN.md's own file-structure snippets; works on a typical managed WordPress host without requiring non-standard document-root support.
**Alternatives considered**: Bedrock split root (rejected for now — adds a hosting-compatibility dependency not justified without a specific host already chosen; revisit jointly with the hosting decision).
**Reference**: `docs/adr/0013-deployment-architecture.md`.

## Decision: HPOS enabled at install time

**Decision**: Enable WooCommerce's High-Performance Order Storage immediately on install, not after orders exist.
**Rationale**: Enabling HPOS after real orders exist requires a migration; enabling it from day one avoids that risk entirely and is mandated by constitution Principle 6.
**Alternatives considered**: Legacy post-based order storage (rejected outright — explicitly forbidden by the constitution).

## Decision: CI tooling

**Decision**: GitHub Actions running PHPStan (level 6+), WordPress Coding Standards, Stylelint, ESLint, and a Vite build check on every pull request; auto-deploy to staging on merge to `main`; production deploy requires manual approval.
**Rationale**: Explicitly specified in `GOT-Store-PRD.md` §9, and matches the single-developer risk profile — automated checks substitute for a second human reviewer where possible.
**Alternatives considered**: A simpler "lint only, no CI build" approach (rejected — doesn't catch build-breaking errors before they reach staging).

## Decision: Hosting provider

**Decision**: Deferred — not decided in this feature.
**Rationale**: Genuinely unresolved per `docs/adr/0012-hosting-and-caching.md`; this feature's tasks are written to be host-agnostic (any host meeting the stated criteria: PHP 8.3+ (raised 2026-10-09 for Sage 11/Acorn v6), object cache support, staging environment, daily backups).
**Status**: BLOCKED pending owner/dev-lead selection — tracked in `docs/planning/risks-and-blockers.md` Tier 1.

## Dependencies confirmed from prior planning (not re-derived here)

- `docs/architecture/tech-stack.md` — full version table (PROPOSED pending live verification).
- `docs/architecture/wordpress-structure.md` — theme/plugin folder layout this feature scaffolds.
- `docs/architecture/theme-plugin-boundaries.md` — the boundary rule this feature's two skeletons must respect from commit 1.
