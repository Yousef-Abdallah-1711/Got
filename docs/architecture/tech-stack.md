# Tech Stack

Status tags: **VERIFIED** / **PROPOSED** / **BLOCKED** / **REQUIRES APPROVAL** — see `overview.md` §0 for definitions. Version numbers below are this agent's best current knowledge as of the stated knowledge cutoff and were **not checked against a live package registry or release notes in this session** (no internet access in this sandbox) — every version is **PROPOSED** unless marked otherwise, and must be confirmed by the owner/dev lead against current Roots/WooCommerce/WordPress release pages before Phase 1 tooling is installed.

## 1. Baseline documented in GOT-Store-PRD.md (VERIFIED as the project's stated baseline)

Per `GOT-Store-PRD.md` §1 and §9, the PRD's own stated stack is:

| Layer | PRD-stated baseline |
|---|---|
| CMS | WordPress 6.x (latest stable at launch) |
| Commerce | WooCommerce (latest stable), HPOS enabled |
| Runtime | PHP 8.2+ |
| Theme framework | Roots Sage 10 on Acorn |
| Templating | Blade |
| Build tool | Vite |
| CSS | Tailwind CSS |
| Interactivity | Alpine.js |
| DB | MySQL 8 / MariaDB 10.6+ |

This is **VERIFIED** as the document-of-record baseline (it is what the PRD says, directly quotable). Whether Sage 10 is still the *currently recommended* Roots release at build time is a separate, **PROPOSED** question addressed in `docs/adr/0001-sage-version.md` — this document does not silently upgrade it.

## 2. Full stack table

| Component | Proposed version/range | Status | Rationale / cross-reference |
|---|---|---|---|
| WordPress core | 6.6–6.7 line (latest stable at build time) | PROPOSED | PRD §9 says "6.x, latest stable at launch"; exact minor must be re-checked at build time, not pinned now. |
| PHP | 8.2.x (8.3 acceptable if host/Sage 10 confirms support) | PROPOSED, baseline 8.2 is VERIFIED from PRD §1/§9 | Sage 10 documented minimum is PHP 8.1+; PRD mandates 8.2+ for other reasons (perf, typed properties used by Acorn). Confirm host supports 8.2 before provisioning (`deployment.md`). |
| WooCommerce | Latest stable 9.x line, HPOS enabled by default | PROPOSED | PRD §9 ("WooCommerce (latest stable)... HPOS enabled"); Commerce Principle 6 makes HPOS compatibility non-negotiable, so any plugin candidate (shipping, reviews, etc.) must declare HPOS compatibility before inclusion. |
| Roots Sage | 10.x (documented baseline) | VERIFIED as documented baseline; PROPOSED whether still current-best — see ADR 0001 | PRD §1, §9; `.html-to-sage/` scaffolding and `specs/.../plan.md` project structure (`app/`, `framework/`, `resources/`) match the Sage 10 + Acorn convention, not Sage 11's structure (if/when that diverges). |
| Acorn | Version matched to chosen Sage line (9.x/10.x Acorn) | PROPOSED | Acorn version is coupled to Sage major version; pin together, do not mix. |
| Laravel components (via Acorn) | Whatever Illuminate components Acorn's chosen version bundles | PROPOSED | Acorn uses a trimmed set of Illuminate packages (container, view, config) — not a full Laravel app; do not add Laravel packages that assume a full framework (e.g., Eloquent ORM) without justification, per Commerce Principle 9 (avoid unnecessary dependencies). |
| Blade | Bundled with Acorn's Illuminate View component | PROPOSED | No separate version decision; follows Acorn. |
| Vite | 5.x or 6.x (match Sage 10's bundled `@roots/vite-config` / `@roots/sage` Vite plugin version) | PROPOSED | PRD §9; must match whatever `@roots/sage` CLI scaffolds for the chosen Sage line — do not hand-upgrade Vite independently of the Roots Vite plugin. |
| Tailwind CSS | 3.x (NOT presumed v4 — see note) | PROPOSED, flagged | Tailwind v4 changed its config/build model substantially (CSS-first config, no `tailwind.config.js` by default, new engine). Sage 10's documented scaffolding assumes Tailwind 3's PostCSS pipeline. Upgrading to Tailwind 4 is an **upgrade decision requiring its own ADR-level approval**, not a default — flagged here as a risk for the dev lead to verify against the actual `@roots/sage` installer output at build time. |
| Alpine.js | 3.x | PROPOSED | PRD §9; stable, low-churn, matches "lightweight interactivity" requirement and the no-SPA constraint. |
| ACF Pro | Current stable (6.x line) | PROPOSED | Constitution HTML-to-Sage principle III mandates ACF Pro + code-owned field groups; CPT/taxonomy registration also lives in `framework/post-type/`, `framework/taxonomies/` per the documented project structure. |
| MySQL / MariaDB | MySQL 8.0.x or MariaDB 10.6+ | VERIFIED from PRD §9 | Matches WooCommerce HPOS and WordPress 6.x minimums; exact minor pinned by hosting provider at provisioning. |
| Node.js (build only, not runtime) | 20.x LTS | VERIFIED from `specs/.../plan.md` ("Node.js 20+") | Needed for Vite/Tailwind build in CI; not present on the production PHP runtime. |
| Composer | 2.x | PROPOSED | Standard for Acorn/Sage dependency management. |

## 3. Fonts, icons, assets (cross-referenced to GOT-Store-PRD.md §9 Frontend Stack)

- **Icons:** SVG sprite, no icon font. **VERIFIED** from PRD.
- **Fonts:** self-hosted Inter (body/UI), Inter Tight (headlines), IBM Plex Mono (drop numbers/mono accents only). Loaded with `font-display: swap`, subset to Latin now with Arabic glyph ranges reserved for the v1.1 RTL phase. **VERIFIED** from PRD; font *licensing* for self-hosting is flagged **REQUIRES APPROVAL / BLOCKED** per the constitution's sync-impact note ("self-hosted font licensing unresolved") — do not ship self-hosted font files to production until licensing is confirmed by the brand owner.

## 4. Plugin budget

PRD §9 caps third-party plugins at 15 for v1, and Commerce Principle 9 requires a documented justification per plugin. The indicative list in the PRD (email connector, consent/SEO/caching/security/backup/spam-protection/analytics/image-optimization/redirect/sitemap/WooCommerce-email-styling/activity-log/cache-purge) is **PROPOSED** and each entry needs a one-line justification recorded before install — tracked as implementation-time work, not decided here. Every plugin candidate must also be checked for HPOS compatibility (Commerce Principle 6) before selection.

## 5. Things intentionally NOT in the stack

- No React/Vue/Next.js runtime in production (Non-Goal, PRD §3; constitution context brief). The prototype `.jsx` files are design reference only (see `checkout-flow.md`, `wishlist-flow.md`).
- No page-builder plugins that override theme templates (PRD §4 Constraints — Sage/Blade only).
- No online payment gateway code in v1 (COD only; PRD §4 Out of Scope, confirmed by ADR 0005/0006 scope).
- No custom ORM/database abstraction bypassing `$wpdb`/WooCommerce CRUD.

## 6. Version-confirmation checklist (owner/dev-lead action before Phase 1 tooling install)

1. Run `composer create-project roots/sage` (or the then-current Roots install path) in a scratch dir and record the exact Sage/Acorn/Vite/Tailwind versions it scaffolds.
2. Cross-check against this table; update `docs/adr/0001-sage-version.md` with the VERIFIED versions and a changelog note.
3. Confirm the chosen managed WordPress host's supported PHP version matches 8.2+ before committing to it in `deployment.md`.

This checklist exists precisely because this planning session has no live internet access to verify package registries — treat every version above as a starting hypothesis, not a pinned requirement.
