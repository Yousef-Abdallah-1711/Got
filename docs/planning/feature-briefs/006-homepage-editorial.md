**Status: PROPOSED feature brief — not yet run through full Spec Kit specify/plan/tasks workflow. Run `/speckit.specify` when this feature is scheduled to start.**

**Superseded for implementation purposes by `specs/006-homepage-editorial-sections/spec.md`, `plan.md`, and `tasks.md`** (generated via the real Spec Kit workflow). This brief is kept as the original planning rationale and is not updated further; treat the Spec Kit artifacts as authoritative for scope, acceptance criteria, and tasks.

# 006 — Homepage and Editorial Sections (Store Mode)

## Summary
The Store-mode homepage: 14 sections per `HOMEPAGE-AUDIT.md`'s audited structure (Announcement, Header, Hero, Featured Drop 01, Shop by Category, New Arrivals, Manifesto, Spotlight, Packaging, Brand Story, Social, Early Access, FAQ, Footer), with live WooCommerce data in the commerce-facing sections.

## Scope
**In**: all 14 sections as ACF blocks (004) composed via Flexible Content; live data wiring for Featured Drop 01 (`wc_get_products(['featured'=>true])`), New Arrivals (`orderby=date`), Shop by Category (`get_terms('product_cat', ['hide_empty'=>true])`, hidden if <2 categories), Spotlight (working color/size/add-to-cart/wishlist per `HOMEPAGE-AUDIT.md`).
**Out**: Craftsmanship and Best Sellers sections stay registered-but-empty until their content dependencies (`docs/audit/missing-assets.md`) resolve — explicitly not a bug, matching the prototype's own `null`-hides-section design intent.

## Dependencies
Hard: 004. Soft: 007 (category/new-arrivals data), 008 (spotlight needs a real product page to link to).

## Acceptance Criteria
- [ ] Each section renders only when its content/data requirement is met (ACF content present AND/OR WooCommerce data exists).
- [ ] Shop-by-category hides itself with fewer than 2 categories (matches `HOMEPAGE-AUDIT.md`'s documented rule).
- [ ] Homepage mobile LCP <2.5s (PRD §8), homepage weight <1MB mobile first load excluding video (PRD §8).
- [ ] Packaging/hero bands remain intentionally dark in both themes (DESIGN.md §7.1 "intentional dark photographic band").

## Risk Register
- Content dependencies blocking full visual completion (hero/editorial photography, craftsmanship copy) — tracked in `docs/audit/missing-assets.md`, not an engineering risk.
- Performance risk if too many above-the-fold images load unoptimized — mitigate via responsive images, lazy-loading below fold, no lazy-load on the LCP hero (DESIGN.md §11).

## Testing Requirements
Visual regression at 6 breakpoints/2 themes; Lighthouse performance run against the targets above; manual QA for the "section hides when empty" behavior across every section.

## Visual Parity Requirements
Full — this is the highest-visibility page on the site. See `docs/design/visual-parity-matrix.md` and `docs/design/responsive-contracts.md`.

## Definition of Done
All 14 sections implemented and content-gated correctly; live data sections verified against real (or realistic placeholder) WooCommerce data; performance budget met; both themes verified at all 6 breakpoints.
