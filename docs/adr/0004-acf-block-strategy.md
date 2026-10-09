# ADR 0004 — ACF Block Strategy

## Status
**RESOLVED. Corrected 2026-10-09** (remediates finding C1-ARCH, `docs/planning/PRE-IMPLEMENTATION-ARCHITECTURE-REMEDIATION.md`): Option 2 as originally decided below still used a Flexible Content field as the composition wrapper, which created a second composition model once Feature 006 needed to add commerce-driven sections outside that field. See the corrected Decision and the new Option 4 below, and `docs/architecture/ACF-CONTENT-RENDERING-DECISION.md` for the full detail.

## Context

The constitution (HTML-to-Sage Principle II/III) requires every section to be classified as an ACF Block, global template part, CPT archive/single template, or reusable component — never one giant homepage block, and global chrome (header/footer/nav) must default to template parts, not page blocks. The homepage alone has 14 documented sections (`HOMEPAGE-AUDIT.md` §2), each independently gated on content existing (`home-content.js`'s `null`-hides-section pattern).

## Options

1. **One ACF Flexible Content field covering the whole homepage**, with each section as a "layout" inside it.
2. **One ACF Block per homepage section** (Hero, Drop Intro, Categories, New Arrivals, Manifesto, Spotlight, Packaging, Craftsmanship, Best Sellers, Brand Story, Social, Early Access, FAQ), each independently registered, with its own fields/template/SCSS, composed on the homepage via a Flexible Content field that lets the operator reorder/add/remove them.
3. **Hardcoded section order in the Blade template**, with only the *content inside* each section as ACF fields (no reordering capability).
4. **(Added this round) One ACF Block per section, composed directly in the native WordPress block editor content — no wrapper field at all.** Every section, editorial or commerce-driven, is placed/reordered by the editor using the block editor's own native drag-and-reorder mechanism, the same UI every WordPress editor already knows.

## Trade-offs (Option 4, added this round)

- Option 4 keeps everything Option 2 got right (per-section registration, no monolith, live commerce data never in ACF) while removing the one thing that caused the actual defect: a second, parallel ordering mechanism (the Flexible Content field) that commerce-driven sections could end up living outside of. Once Option 4 is chosen, there is exactly one place an editor reorders anything — the block editor's own canvas — for every section on every page, not just the ones inside a particular field.

## Trade-offs

- Option 1 (one giant flexible-content monolith with inline layouts) risks exactly the "flatten the full page into one block" anti-pattern the constitution explicitly forbids, and makes each section harder to unit-test/preview independently in the block editor.
- Option 3 is simplest to build but removes the content editor's ability to reorder or omit sections — the prototype's own content model (`home-content.js`) already treats section presence as conditional/configurable, so removing that flexibility would be a regression from what's already designed.
- Option 2 matches the constitution's explicit rule ("Each original HTML section MUST be classified as one of: ACF Block, global template part...") and preserves the prototype's section-level flexibility.

## Decision (corrected)

**Option 4**: each homepage/editorial section (Hero, Drop Intro, Editorial Split, Manifesto, Packaging Story, Social Gallery, Newsletter, FAQ, Brand Story, plus the commerce-driven sections Featured Drop, New Arrivals, Shop by Category, Spotlight) becomes its own registered ACF Block with code-owned fields (per constitution HTML-to-Sage Principle III), composed on the homepage (and reusable on other editorial pages, e.g. About) **directly in the page's native block-editor content** — **not** via a Flexible Content field, and **not** hardcoded into `front-page.php`. Category/product-grid sections pull live WooCommerce data (`wc_get_products()`, `get_terms('product_cat')`) rather than ACF fields for the product data itself — only the section's editorial copy (eyebrow, heading, CTA label) is an ACF field, per `docs/architecture/data-model.md`'s "editorial vs. commerce-derived" distinction.

**ACF Blocks are never used for WooCommerce products, orders, or cart/checkout data** (constitution explicit rule) — those remain WooCommerce template overrides reading live commerce data.

## Consequences

- Each block gets its own: registration, field group, frontend Blade template, SCSS partial, optional JS module, editor preview, and visual-parity checklist entry (per `docs/design/visual-parity-matrix.md`).
- The homepage becomes editable/reorderable by a Content Editor role without a code deploy, matching PRD's role table (`Content Editor: Edit pages, banners, blog posts, and policy text`).
- Two intentionally-hidden sections (`craftsmanship`, `bestSellers`) ship as real ACF blocks from day one, simply left unpublished/empty until their content dependencies (`docs/audit/missing-assets.md`) are resolved — not special-cased in code.

## Approval status

**RESOLVED** — a build-methodology decision, not a business decision; no owner sign-off required, but documented for the dev lead to follow consistently across every editorial page (Homepage, About, Contact, FAQ), not just the homepage.
