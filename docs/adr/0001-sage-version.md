# ADR 0001 — Sage Version

## Status
**VERIFIED 2026-10-09, SUPERSEDED DECISION: Sage 11** (not Sage 10 — see Decision below). Ratified by the project owner after the Phase 1 version-confirmation checklist below was actually run.

## Context

`GOT-Store-PRD.md` §1 and §9 and `PRODUCT.md` §2 both explicitly and repeatedly specify **"Roots Sage 10 theme on Acorn"** as a fixed implementation decision. The broader project brief that initiated this planning session separately raised a concern that "newer architecture suggestions may refer to Sage 11" and asked for an explicit ADR rather than a silent upgrade. No Sage 11 is referenced anywhere in the project's own source documents — the concern is externally sourced caution, not a documented requirement.

This planning session has no live internet access to check the current Roots Sage release line, changelog, or compatibility matrix against WordPress/WooCommerce/ACF/PHP versions at the moment of writing. Any specific version-number claim below is a **starting hypothesis**, not a verified fact.

## Options

1. **Sage 10 (documented baseline)** — matches every project document, matches the `.html-to-sage/` scaffolding's assumed `app/`/`framework/` convention, zero re-planning cost.
2. **Sage 11 (if it exists and is current at build time)** — potentially newer tooling/Acorn/Vite defaults, but completely unverified against this project's PHP/WooCommerce/ACF requirements, and contradicts every explicit project document.
3. **A non-Sage Blade-capable alternative** (e.g. raw Acorn without Sage's starter theme, or a different Laravel-for-WordPress bridge) — rejected outright; not requested anywhere and would re-open the "Blade vs. React" and theme-structure questions for no documented benefit.

## Trade-offs

- Defaulting to Sage 10 risks building on a line that may be superseded by the time implementation starts (weeks/months after this planning session).
- Switching to a newer Sage line without verification risks breaking the documented `resources/{css,js,views}` + `app/Providers` structure assumed throughout the PRD, DESIGN.md, and the `.html-to-sage/` scaffolding — all of which quote Sage-10-shaped paths.

## Decision

**The Phase 1 version-confirmation checklist was run on 2026-10-09** (`composer create-project roots/sage` via a throwaway Docker container, per this ADR's own mandate). Result: the installer's current default is no longer Sage 10 — it is **Sage 11**, which bundles Acorn and Vite directly rather than requiring them as a manual add-on. Verified versions actually produced:

| Package | Verified version |
|---|---|
| `roots/sage` (installer line) | 11.x (Acorn/Vite bundled by default) |
| `roots/acorn` | v6.3.0 |
| `vite` | ^8.0.0 |
| `@roots/vite-plugin` | ^2.0.0 |
| `tailwindcss` | ^4.0.0 (`@tailwindcss/vite` plugin) |
| PHP platform requirement | >=8.3 |
| Node engine requirement | ^20.19.0 \|\| >=22.12.0 |

For comparison, pinning `roots/sage:10.*` explicitly was also verified to still work (v10.8.2), but its bare scaffold uses Bud.js (not Vite) and does not include Acorn by default — matching this project's documented "Acorn + Vite + Tailwind 3" stack would have required manually assembling an unofficial combination, not the installer's supported path.

**Decision: move to Sage 11**, per the project owner's explicit choice (2026-10-09), accepting its current defaults (Acorn v6, Vite v8, Tailwind v4, PHP >=8.3) rather than pinning the now-superseded Sage 10 line. This is a real, owner-approved stack change, not a silent upgrade — it was raised as a REQUIRES APPROVAL discrepancy exactly as this ADR originally mandated, and resolved explicitly rather than defaulted into.

**Consequential changes this decision requires elsewhere** (tracked for follow-through, not yet all applied at ADR-authoring time):
- PHP floor raises from 8.2+ to **8.3+** everywhere it's stated (every feature `plan.md`'s Technical Context line, and `docs/adr/0012-hosting-and-caching.md`'s hosting selection criteria).
- Tailwind moves from v3's `tailwind.config.js`-based theme extension to v4's CSS-first `@theme`/`@import "tailwindcss"` model — affects Feature 003's design-token implementation strategy specifically (`specs/003-design-tokens-global-ui/plan.md` and `tasks.md`).
- `docs/architecture/tech-stack.md`'s version table needs the same corrections.

## Consequences

- Every planning document that assumed Sage 10 / Acorn v5-class / Tailwind 3 / PHP 8.2+ needs a corresponding correction (tracked above and being applied across the repo as part of this decision, not deferred).
- Tailwind 4's CSS-first configuration is a real architectural difference from Tailwind 3, not just a version bump — any feature whose plan describes `tailwind.config.js`-based token wiring needs its approach rewritten, not just its version string.

## Approval status

**RATIFIED 2026-10-09** — Sage 11 is the official project policy, verified against a live installer run, not a default or a guess.
