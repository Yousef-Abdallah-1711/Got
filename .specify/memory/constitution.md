<!--
Sync Impact Report
Version change: 1.0.0 -> 1.1.0
Modified principles: none removed; HTML-to-Sage principles (I-V) retained unchanged
Added sections: GØT Commerce & Brand Principles (20 non-negotiables), Review/Rollback/Migration Governance
Removed sections: none
Templates requiring updates: docs/planning feature briefs must cite these principles; ADRs must record approval status against them
Follow-up TODOs: Acid Lime (#C2FF3D) formal brand approval status unresolved (see docs/audit/source-conflicts.md); self-hosted font licensing unresolved
-->

# GØT WooCommerce Conversion Constitution

This constitution governs the conversion of the existing GØT React design system and storefront prototype (`GØT Design System (2)/`) into a production WordPress + WooCommerce + Sage/Blade/Acorn storefront. It extends, and does not replace, the HTML-to-Sage mechanical principles below with the commerce- and brand-specific non-negotiables the project owner has set.

## GØT Commerce & Brand Principles

1. **Design is the visual source of truth.** The existing GØT design system, tokens, and storefront prototype define the approved visual language; no unapproved redesign.
2. **No unapproved visual redesign.** Any deviation from documented tokens/components requires explicit owner approval and must be logged in `.html-to-sage/DECISIONS.md`.
3. **WordPress and WooCommerce own all business data.** Products, inventory, pricing, orders, customers, and promotions live in WooCommerce/WordPress — never in a parallel JS/mock data store.
4. **Server-side validation is mandatory** for every form, cart action, and checkout step. Client-side checks are UX convenience only.
5. **Never trust client-submitted prices or totals.** All totals, discounts, shipping, and tax are server-calculated and re-validated at order creation.
6. **WooCommerce APIs/integrations must remain HPOS-compatible** (High-Performance Order Storage); no direct `wp_posts`/`wp_postmeta` order queries.
7. **Maintain a clear theme/plugin responsibility boundary**: theme (`got-sage`) owns presentation; plugin (`got-commerce`) owns business logic, persistence, and integrations.
8. **Prefer maintainable WordPress-native solutions** over bespoke reimplementations of WooCommerce/WordPress capabilities.
9. **Avoid unnecessary third-party dependencies.** Every new plugin/package requires a documented justification.
10. **Never modify WordPress or WooCommerce core.**
11. **Every feature requires explicit, written acceptance criteria** before implementation begins.
12. **Every feature requires appropriate automated testing** (PHP unit, integration, and/or E2E as applicable) per `docs/testing/test-strategy.md`.
13. **Every page requires responsive and theme (dark/light) validation** at 360/390/768/1024/1440/1920px.
14. **Accessibility (WCAG 2.1 AA) is a release requirement**, not a stretch goal.
15. **Security and privacy are architectural requirements**, assessed at design time, not bolted on later.
16. **No fabricated product, shipping, promotion, inventory, testimonial, or trust-badge claims.** Every customer-facing claim must be backed by real configuration/data.
17. **Every external integration requires documented failure-state handling** (payment/email/shipping/analytics providers degrading gracefully).
18. **Production changes require staging validation** before going live.
19. **Source files and design references must remain preserved** (`stock/`, `GØT Design System (2)/`) and independently viewable throughout the project.
20. **No deployment without explicit owner approval.**

Additional governance:
- **Code review**: every feature's implementation requires review against this constitution and its own acceptance criteria before merge.
- **Documentation**: every feature ships with updated `docs/` artifacts; undocumented behavior is treated as unfinished.
- **Regression prevention**: visual parity and commerce-flow E2E tests gate merges touching catalog, cart, checkout, wishlist, or account.
- **Data migrations**: any schema/content migration must be reversible or have a documented rollback path, and must be rehearsed on staging first.
- **Rollback**: every deployment must have a known, tested rollback procedure before it is allowed to ship.
- **Maintainability**: prefer WordPress/WooCommerce-native extension points (hooks, filters, Store API, CRUD classes) over core overrides or fragile DOM/string patching.

## HTML to Sage WordPress Conversion Constitution

## Core Principles

### I. HTML Visual Parity First

The original HTML website is the visual source of truth. Every converted WordPress/Sage/ACF section must match the original HTML section 100% in layout, spacing, typography, colors, responsive behavior, animations, image ratios, hover states, and visual hierarchy unless the user explicitly approves a change.

No redesign, improvement, layout simplification, spacing change, typography change, color change, or animation removal is permitted without explicit user approval. Visual mismatch is failed work.

### II. Section-by-Section Conversion

Each original HTML section MUST be classified as one of: ACF Block, global template part, CPT archive/single template, or reusable component. The full page MUST NOT be flattened into one giant block.

Headers, footers, navigation, announcement bars, mobile sticky CTAs, schema data, and other site-wide UI MUST be mapped to Sage layout partials/template parts by default, not normal page ACF blocks.

### III. Sage Architecture Enforcement

The WordPress theme MUST use Sage, Acorn, Blade, Vite, SCSS, ACF Pro, and code-owned ACF field groups. The implementation MUST include `framework/builder/acf-blocks/`, `framework/builder/front-end/`, `framework/builder/blocks.php`, `framework/custom-fields/`, `framework/post-type/`, and `framework/taxonomies/`.

### IV. ACF Editability Without Over-Dynamic DOM

All meaningful content from the original HTML must be editable through ACF fields or justified CPT fields. Templates may contain structure, layout, and behavior hooks, but must not hardcode client-editable content.

Wrappers, container classes, grid classes, animation hooks, JS hooks, ARIA structure, and technical layout markup SHOULD remain in templates unless the editor explicitly needs control over them.

Client-editable media from the original HTML must be imported or seedable into the WordPress Media Library and referenced through ACF attachment/file/gallery fields, options, menus, CPT fields, or other documented WordPress data. Do not rely on permanent hardcoded stock/ or theme asset URLs for editable images, icons, logos, background images, videos, documents, or galleries.

Page templates must render WordPress editor/block content as the single source of truth. Do not hardcode converted homepage/page sections in front-page.php, page.php, index.php, Blade page templates, CPT templates, or fallback templates. A neutral index.php empty-state or maker-credit fallback is allowed only when no content exists and it must not contain converted client website sections.

When posts, blog, news, articles, or press content are in scope, include branded WordPress post templates: home.php for the Posts page, archive.php for post archives, single.php for individual posts, shared post card/pagination partials, and matching Sage Blade views when resources/views exists. Templates must render real WordPress post data/editor content and reuse the converted site's colors, fonts, cards, buttons, spacing, responsive behavior, and global header/footer.

### V. Justified CPTs Only

Custom post types and taxonomies are allowed only when content is repeatable across pages, independently managed, filterable, archiveable, searchable, requires its own URL, or needs a separate admin workflow.

## Sage Architecture Requirements

Every ACF block MUST define registration, fields, frontend template, SCSS file, optional JS module, editor preview behavior, and visual parity checklist.

Global site UI MUST use Sage partials, layout SCSS, WordPress menus, ACF options, theme options, Customizer, or approved plugins.

Global ACF option fields should be optional when frontend defaults/fallbacks exist. Do not block saving header/footer/logo/contact/schema settings because one logo, link, footer item, or schema value is empty.

Global option pages must be lean: use WordPress menus for header/footer link columns, seed default menus idempotently when original menus exist, avoid ACF repeaters for normal label/URL menus, and remove unused, duplicate, speculative, or non-rendered global fields. Every global option field must have a render location or approved integration and must be verified by changing it in the admin.

When a global settings/options page exists, add optional menu selector fields for each global menu area. Selectors must choose existing WordPress menus by menu ID, seed once from assigned default menus when empty, fall back to Appearance > Menus location assignments when blank, and never hardcode menu IDs.

## Spec Kit Workflow

Spec Kit artifacts are the planning source of truth for implementation. The workflow MUST produce and keep aligned `.specify/memory/constitution.md`, `specs/<feature>/spec.md`, `plan.md`, `research.md`, `data-model.md`, `quickstart.md`, `tasks.md`, and `.html-to-sage/*`.

The source HTML/CSS/JS/assets MUST be preserved in `stock/` and treated as read-only source material.

## Quality Gates

Implementation MUST NOT begin until stock source is preserved, every HTML section has a WordPress target decision, every ACF block has a field contract, every meaningful content item has an editable source or documented exception, every global template part has a data source, CPT decisions are justified, visual QA tasks exist, Spec Kit spec/plan/tasks exist, and WordPress clone-readiness tasks exist.

The delivered theme must work when cloned into wp-content/themes/<theme-slug> and activated: valid style.css theme header, functions.php bootstrap, render templates or verified Sage/Acorn routing, documented required plugins and install/build commands, ignored local agent/skill/cache/dependency folders, no html-to-wordpress-converter skill repo inside wp-content/themes, and final report notes for checks that could not run.

Generate ready-pages/ with one paste-ready .md file per WordPress page. Each file must contain the exact Gutenberg ACF block comments in the correct page order.

Client-editable media from the original HTML must be imported or seedable into the WordPress Media Library and referenced through ACF attachment/file/gallery fields, options, menus, CPT fields, or other documented WordPress data. Do not rely on permanent hardcoded stock/ or theme asset URLs for editable images, icons, logos, background images, videos, documents, or galleries.

## Governance

This constitution supersedes conflicting implementation shortcuts. Changes require updating this file, affected Spec Kit artifacts, and `.html-to-sage/DECISIONS.md`.

**Version**: 1.1.0 | **Ratified**: 2026-06-17 | **Last Amended**: 2026-10-08
