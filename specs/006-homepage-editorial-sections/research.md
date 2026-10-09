# Phase 0 Research: Homepage and Editorial Sections

## Decision: Commerce-section data source

**Decision**: `wc_get_products(['featured' => true])` for Featured Drop, `orderby: date` for New Arrivals, `get_terms('product_cat', ['hide_empty' => true])` for Shop by Category (hidden if resulting count < 2), per the design system's own prior audit (`HOMEPAGE-AUDIT.md` §6).
**Rationale**: These are native, documented WooCommerce query patterns — no custom data layer needed.
**Alternatives considered**: Caching a snapshot of "featured products" into an ACF field, refreshed by a cron job (rejected — reintroduces a staleness risk the live-query approach avoids entirely, for no real performance benefit at this catalog scale of ≤100–1000 products).

## Decision: Commerce-section composition mechanism (corrected 2026-10-09, remediates finding C1-ARCH)

**Decision**: Each commerce-driven section (Featured Drop, New Arrivals, Shop by Category, Spotlight) is registered as its own ACF Block, composed in the native block editor exactly like Feature 004's editorial blocks — not a hardcoded Blade section sequence outside the editor, which is what this document originally implied.
**Rationale**: An independent Codex architecture review found that the original design created two competing page-composition models (Feature 004's Flexible-Content-composed editorial blocks, and this feature's separately-coded, fixed-order commerce sections). See `docs/architecture/ACF-CONTENT-RENDERING-DECISION.md` for the full correction, which also removes Feature 004's Flexible Content field entirely in favor of this same native-block-editor model for everything.
**Alternatives considered**: Keep commerce sections hardcoded, make Feature 004's sections also hardcoded (rejected — the entire point of Feature 004 is editor-controlled composition without a developer); force commerce sections into Feature 004's Flexible Content field as additional layouts (rejected along with removing that field entirely — see the ACF decision doc).

## Decision: Caching strategy for a commerce-driven, publicly-cacheable page

**Decision**: Full-page cache the homepage shell for anonymous visitors, with product-dependent fragments (stock badges, prices) either baked into the cached HTML and invalidated on product save/stock-change, or loaded via a small AJAX call — the exact mechanism is an implementation choice deferred to task-level work, not re-litigated here; the **constraint** (never serve a stale price/stock claim) is fixed regardless of mechanism.
**Rationale**: Matches `docs/architecture/overview.md` §3's caching pattern and constitution Principle 5 (never trust/display unverified totals).
**Alternatives considered**: No caching at all on this page (rejected — fails the LCP/TTFB performance targets at the stated drop-day traffic multiplier).

## Decision: Section-presence QA method

**Decision**: A test sweep covering all 2^2 = 4 combinations of {Craftsmanship present/absent} × {Best Sellers present/absent} (the only two optional/conditional sections at launch), rather than treating this as untestable combinatorial explosion.
**Rationale**: Only 2 sections are genuinely conditional at launch; the other 12 are either always-present (if Feature 004/005's content exists) or hard-gated by Store Mode itself.

## Dependencies confirmed from prior planning

`docs/planning/feature-briefs/006-homepage-editorial.md`, `HOMEPAGE-AUDIT.md` (prototype's own prior audit of this exact page).
