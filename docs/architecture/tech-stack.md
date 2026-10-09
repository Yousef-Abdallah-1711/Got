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

This is **VERIFIED** as the document-of-record baseline (it is what the PRD says, directly quotable). **Superseded 2026-10-09**: the Phase 1 version-confirmation checklist (§6 below) was actually run, found Sage 10 no longer the installer's current default, and the project owner chose to move to **Sage 11** rather than pin Sage 10 — see `docs/adr/0001-sage-version.md` for the verified versions and rationale. The table in §2 below reflects the ratified Sage 11 stack, not the PRD's original Sage-10 baseline.

## 2. Full stack table

| Component | Proposed version/range | Status | Rationale / cross-reference |
|---|---|---|---|
| WordPress core | 6.6–6.7 line (latest stable at build time) | PROPOSED | PRD §9 says "6.x, latest stable at launch"; exact minor must be re-checked at build time, not pinned now. |
| PHP | **8.3+** | **VERIFIED 2026-10-09** | Raised from the PRD's original 8.2+ floor — Sage 11/Acorn v6's `composer.json` requires `php: >=8.3`. Confirm host supports 8.3 before provisioning (`deployment.md`); this also raises `docs/adr/0012-hosting-and-caching.md`'s selection criteria. |
| WooCommerce | Latest stable 9.x line, HPOS enabled by default | PROPOSED | PRD §9 ("WooCommerce (latest stable)... HPOS enabled"); Commerce Principle 6 makes HPOS compatibility non-negotiable, so any plugin candidate (shipping, reviews, etc.) must declare HPOS compatibility before inclusion. |
| Roots Sage | **11.x** | **VERIFIED 2026-10-09**, ratified — see ADR 0001 | Superseded from the PRD's documented Sage 10 baseline. `composer create-project roots/sage` was actually run; Sage 10 is still explicitly installable (`roots/sage:10.*`, verified v10.8.2) but its bare scaffold uses Bud.js (not Vite) with no Acorn by default, so it would not have matched this project's documented Acorn+Vite stack without unofficial manual assembly. Owner chose Sage 11 instead of pinning 10. |
| Acorn | **v6.3.0** | **VERIFIED 2026-10-09** | Bundled by Sage 11's installer by default (unlike Sage 10, where Acorn is a manual add-on). |
| Laravel components (via Acorn) | Whatever Illuminate components Acorn's chosen version bundles | PROPOSED | Acorn uses a trimmed set of Illuminate packages (container, view, config) — not a full Laravel app; do not add Laravel packages that assume a full framework (e.g., Eloquent ORM) without justification, per Commerce Principle 9 (avoid unnecessary dependencies). |
| Blade | Bundled with Acorn's Illuminate View component | PROPOSED | No separate version decision; follows Acorn. |
| Vite | **^8.0.0**, via `@roots/vite-plugin ^2.0.0` | **VERIFIED 2026-10-09** | Bundled by Sage 11's installer; do not hand-upgrade independently of the Roots Vite plugin. |
| Tailwind CSS | **v4 (`^4.0.0`, via `@tailwindcss/vite`)** | **VERIFIED 2026-10-09, ratified** | Owner explicitly chose Sage 11's bundled Tailwind 4 over pinning Tailwind 3 (ADR 0001). This is a real architecture change, not just a version bump: Tailwind 4 uses CSS-first configuration (`@theme`/`@import "tailwindcss"`), no `tailwind.config.js` by default. **Feature 003's design-token implementation strategy must be rewritten for this** — any plan/task describing a `tailwind.config.js` reading CSS custom properties needs the CSS-first equivalent instead. |
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

**COMPLETE — run 2026-10-09.** Outcome: see §2 above and `docs/adr/0001-sage-version.md`.

1. ~~Run `composer create-project roots/sage` (or the then-current Roots install path) in a scratch dir and record the exact Sage/Acorn/Vite/Tailwind versions it scaffolds.~~ Done — via a throwaway Docker container (this host has no native PHP/Composer).
2. ~~Cross-check against this table; update `docs/adr/0001-sage-version.md` with the VERIFIED versions and a changelog note.~~ Done.
3. Confirm the chosen managed WordPress host's supported PHP version matches **8.3+** (raised from 8.2+) before committing to it in `deployment.md` — still open, hosting itself remains BLOCKED/REQUIRES APPROVAL per ADR 0012.
