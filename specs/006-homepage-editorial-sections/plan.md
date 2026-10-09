# Implementation Plan: Homepage and Editorial Sections

**Branch**: `006-homepage-editorial-sections` | **Date**: 2026-10-09 | **Spec**: [spec.md](./spec.md)

## Summary

**Corrected 2026-10-09** (remediates finding C1-ARCH, `docs/architecture/ACF-CONTENT-RENDERING-DECISION.md`): register the homepage's commerce-driven sections (Featured Drop, New Arrivals, Shop by Category, Spotlight) as **ACF Blocks**, registered and composed exactly like Feature 004's 9 editorial blocks — not as hardcoded Blade sections assembled in a fixed order outside the block editor, which was the original (and defective) design. Each commerce block has its own small set of editorial-framing ACF fields (eyebrow text, heading override, CTA label) and a render callback that calls `HomepageQueries` for the live WooCommerce data — the data itself is never an ACF field (constitution Principle 3, unaffected). The editor composes the full homepage (14 sections total: these 4 commerce blocks + Feature 004's 9 editorial blocks + the global Announcement/Header/Footer, which are template parts, not page blocks) by placing and ordering ACF Blocks directly in the native WordPress block editor — meeting the performance/LCP budget is unaffected by this correction.

## Technical Context

**Language/Version**: PHP 8.3+ (raised 2026-10-09 for Sage 11/Acorn v6, see docs/adr/0001-sage-version.md)/Blade.
**Primary Dependencies**: WooCommerce (`wc_get_products()`, `get_terms('product_cat')`), Feature 004's ACF block framework.
**Storage**: No new storage — reads live WooCommerce data at render time.
**Testing**: Visual parity per `docs/design/IMPLEMENTATION-VISUAL-CONTRACT.md` (viewport matrix and procedure, not restated here); Lighthouse performance run; manual QA sweep of section-presence combinations.
**Target Platform**: Same as prior features; this is the highest-traffic page, so caching behavior (full-page cache for the shell, AJAX-loaded cart fragment) matters more here than elsewhere.
**Performance Goals**: LCP < 2.5s mobile/4G (PRD §8); homepage weight < 1MB mobile first load excluding video.
**Constraints**: No lazy-loading on the hero/LCP image; commerce sections must never show stale/cached-incorrect product data even on a cached page shell (mini-cart-style fragment loading pattern applies here too, for e.g. stock-dependent badges).
**Scale/Scope**: Single page, highest visibility/traffic of the whole site.

## Constitution Check

| Principle | Check | Status |
|---|---|---|
| 16 — No fabricated claims | Craftsmanship/Best Sellers hidden until real content/data exists | PASS |
| 3 — WooCommerce owns commerce data | Featured/New Arrivals/Category sections query WooCommerce live, not ACF copies | PASS |

No violations.

## Project Structure

### Documentation (this feature)
```text
specs/006-homepage-editorial-sections/
├── plan.md
├── research.md
├── quickstart.md
└── tasks.md
# No data-model.md (reuses Feature 004's editorial model + live WooCommerce queries, no new entities)
# No contracts/ (no new API — server-rendered only)
```

### Source Code
```text
wp-content/themes/got-sage/
  resources/views/
    front-page.blade.php                 # Site-Mode branch: Store homepage vs. Coming Soon (Feature 005); Store branch renders the_content() — no hardcoded section sequence
    blocks/featured-drop.blade.php         # ACF Block render template (registered via framework/builder/acf-blocks/featured-drop/, same convention as Feature 004)
    blocks/shop-by-category.blade.php      # ACF Block render template
    blocks/new-arrivals.blade.php          # ACF Block render template
    blocks/spotlight.blade.php             # ACF Block render template
  app/Support/HomepageQueries.php         # thin query helpers: featured products, category list (hide_empty), new arrivals — called from each block's render callback, never stored as ACF field data
```

**Structure Decision**: **Corrected 2026-10-09.** Commerce-driven sections are registered as real ACF Blocks (`framework/builder/acf-blocks/{featured-drop,shop-by-category,new-arrivals,spotlight}/`, each with its own small editorial-framing field group), exactly like Feature 004's editorial blocks — not a separate hardcoded-order mechanism. Only their *live data* comes from `HomepageQueries` inside the render callback, never from an ACF field; this is the same "editorial framing is a field, commerce data is a live query" split Feature 004 already uses for its Drop Intro block's product-relationship field, applied consistently here. Block registration lives in the theme (presentation), matching every other ACF Block in this project — `HomepageQueries` itself is a read-only query helper, not business logic, so it correctly stays in the theme rather than `got-commerce`.

## Complexity Tracking
*No violations.*
