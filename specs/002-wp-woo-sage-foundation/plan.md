# Implementation Plan: WordPress, WooCommerce, and Sage Foundation

**Branch**: `002-wp-woo-sage-foundation` | **Date**: 2026-10-09 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/002-wp-woo-sage-foundation/spec.md`

## Summary

Provision a staging environment and install WordPress + WooCommerce (HPOS enabled, EGP currency) on **Roots Sage 11/Acorn v6** (superseded from the originally documented Sage 10 — see `docs/adr/0001-sage-version.md`, ratified 2026-10-09), with `got-sage` (theme) and `got-commerce` (plugin) skeletons and a GitHub Actions CI pipeline that lints/builds every PR and auto-deploys to staging on merge. This is the prerequisite for every other feature (`docs/planning/dependency-graph.md`).

## Technical Context

**Language/Version**: PHP 8.3+ (Sage 11 / Acorn v6 requirement — raised from the originally documented 8.2+, per `docs/architecture/tech-stack.md` and `docs/adr/0001-sage-version.md`); Node 20 LTS minimum for the build only (Sage 11 engine range is `^20.19.0 || >=22.12.0`), not a runtime dependency.

**Primary Dependencies**: WordPress 6.x, WooCommerce (latest stable), Roots Sage 11 + Acorn v6, Vite ^8 (`@roots/vite-plugin` ^2), Tailwind CSS v4 (`@tailwindcss/vite`, CSS-first `@theme` config — not `tailwind.config.js`), Composer 2.x.

**Storage**: MySQL 8 / MariaDB 10.6+ (WordPress core tables + WooCommerce HPOS order tables).

**Testing**: PHPStan (level 6+), WordPress Coding Standards (PHPCS), Stylelint, ESLint, Vite build check — all in CI per `docs/architecture/deployment.md`.

**Target Platform**: Managed WordPress hosting (provider per `docs/adr/0012-hosting-and-caching.md`), Cloudflare DNS/CDN/WAF.

**Project Type**: Web application — WordPress theme (`got-sage`) + companion plugin (`got-commerce`), not a standalone service.

**Performance Goals**: N/A at this stage (no user-facing pages yet beyond WordPress/WooCommerce defaults) — performance budgets apply starting with Feature 006.

**Constraints**: No WordPress/WooCommerce core file modification (constitution Principle 10); theme/plugin boundary enforced from the first commit (constitution Principle 7); database/uploads never deployed from local (PRD §9).

**Scale/Scope**: Single staging + single production environment; single developer of record (PRD Persona 3 / Risk R-012).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Check | Status |
|---|---|---|
| 3 — WooCommerce owns business data | No business data modeled yet in this feature | PASS (N/A) |
| 6 — HPOS compatibility | HPOS enabled at install time, not retrofitted | PASS |
| 7 — Theme/plugin boundary | `got-sage`/`got-commerce` skeletons created as separate units from commit 1 | PASS |
| 9 — Avoid unnecessary dependencies | Only the PRD-documented stack is installed; no extra plugins yet | PASS |
| 10 — Never modify core | No core file touches planned | PASS |
| 18 — Staging before production | CI auto-deploys to staging only; production is manual-approval | PASS |
| 20 — No deployment without approval | Production deploy step requires explicit approval, enforced in CI config | PASS |

No violations. No Complexity Tracking entries needed.

## Project Structure

### Documentation (this feature)

```text
specs/002-wp-woo-sage-foundation/
├── plan.md
├── research.md
├── quickstart.md
└── tasks.md
# No data-model.md or contracts/ — this feature introduces no domain entities or APIs.
```

### Source Code (repository root)

```text
wp-content/
  themes/got-sage/
    style.css                 # WordPress theme header
    functions.php              # Composer autoload + Acorn bootstrap
    app/Providers/ThemeServiceProvider.php
    resources/{css,js,views}/  # empty scaffolds, filled by Feature 003+
    public/build/               # Vite output (gitignored, built in CI)
  plugins/got-commerce/
    got-commerce.php            # plugin bootstrap header
    src/                          # empty namespace scaffold, filled by Feature 005+
    tests/{Unit,Integration}/   # PHPUnit/Pest scaffold
.github/workflows/ci.yml        # lint + build on PR, deploy to staging on merge to main
README.md                       # setup instructions (FR-008)
```

**Structure Decision**: Conventional single-root WordPress layout (not Bedrock's `web/app`/`web/wp` split) per `docs/adr/0013-deployment-architecture.md` — simplest to deploy on a typical managed host and matches every project document's assumed path structure.

## Complexity Tracking

*No violations — table omitted per template instructions.*
