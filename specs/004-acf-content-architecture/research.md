# Phase 0 Research: ACF Content Architecture

## Decision: One ACF Block per section, composed natively in the block editor (corrected 2026-10-09, remediates finding C1-ARCH)

**Decision**: Each of the 9 section types is its own registered ACF Block; pages compose them by placing/ordering the blocks directly in the native WordPress block editor content — **no separate Flexible Content field**.
**Rationale**: Matches the constitution's explicit anti-monolith rule and preserves the prototype's own content-model flexibility (`home-content.js`'s section-by-section structure). The originally-chosen "Flexible Content field" variant created a second composition model once Feature 006 needed to add commerce-driven sections that weren't naturally part of a Page-post-type field — an independent architecture review found this was a real, not merely theoretical, conflict (Feature 006's sections were specified outside the field entirely, in a hardcoded Blade order). Using the block editor's own native sequence for everything removes the second model rather than trying to force commerce sections into the field too.
**Alternatives considered**: A Flexible Content field with inline "layouts" (originally chosen, now rejected — see Decision); hardcoded section order with only inner content editable (rejected — removes reordering, a regression from the prototype's intent); forcing Feature 006's commerce sections into the Flexible Content field as additional layouts (considered as an alternative fix, rejected because it still leaves two different registration/preview mechanisms — plain ACF Blocks for 004, Flexible Content layouts for would-be 006 sections — for no benefit over making everything a plain ACF Block).
**Reference**: `docs/adr/0004-acf-block-strategy.md`.

## Decision: "Render nothing unless populated" implementation

**Decision**: Each block's render callback checks its own specific required-field condition and returns early (no markup) when unmet — implemented per-block, not via a single generic "has any field" check, since different blocks have different minimum requirements (e.g., FAQ needs at least one question; Hero needs a headline but the image is optional).
**Rationale**: Matches `home-content.js`'s existing pattern (`craftsmanship: null`, `bestSellers: null` hide their sections), which is already correct and should be preserved, not reinvented.
**Alternatives considered**: A single "is this block empty" JS-side check (rejected — must be server-side so visitors never receive the empty markup at all, not just have it hidden by CSS).

## Decision: WooCommerce data inside editorial sections

**Decision**: Where a section needs to show a specific product (e.g., a "featured product" spotlight-style block), the block's ACF field stores a product reference (ACF Post Object/Relationship field pointing at the WooCommerce product), and the block's template reads live price/stock/image from WooCommerce at render time — never a copied snapshot.
**Rationale**: Prevents stale/incorrect commerce data from living inside editorial content, consistent with constitution Principle 3 (WooCommerce is sole commerce authority).

## Dependencies confirmed from prior planning

`docs/architecture/wordpress-structure.md` (framework folder layout), `docs/design/component-mapping.md` (which prototype sections map to which block), `docs/audit/missing-assets.md` (content population is blocked on brand-owner deliverables, not engineering).
