# Phase 0 Research: Product Catalog, Categories, Filters, Search

## Decision: Search implementation (resolves ADR 0014)

**Decision**: WordPress/WooCommerce native search, extended via `pre_get_posts` to also match SKU (meta query) and category (taxonomy query).
**Rationale**: PRD explicitly caps scope at 500 products, 1-second response, and explicitly excludes typo-correction/synonyms/voice search — exactly the capabilities that would justify a dedicated search service. Native search trivially meets the stated bar at this scale.
**Alternatives considered**: Elasticsearch/Algolia (rejected — disproportionate, adds infrastructure and cost with no requirement that needs it).
**Reference**: `docs/adr/0014-search-implementation.md`.

## Decision: Filter/sort/pagination state in the URL

**Decision**: Query-string parameters (`?cat=hoodies&sort=price-asc&size=M&page=2`) read/written via `URLSearchParams`, with the Alpine filter component syncing to `history.pushState` on each change (not a full navigation) and reading from `location.search` on load/back-button.
**Rationale**: Satisfies FR-005 (shareable/back-button-restorable view) without a full page reload on every filter change.
**Alternatives considered**: Server-side-only filtering with a full page reload per change (rejected — fails the 300ms filter-apply target and the "no full page reload" requirement for Load More).

## Decision: Load More mechanism

**Decision**: A small AJAX endpoint (standard WordPress AJAX action, not a new REST namespace) returning the next page's product-card HTML fragment, appended client-side.
**Rationale**: Simpler than a full headless JSON API for a presentation-only "append more cards" need; avoids building a second product-serialization format alongside the server-rendered grid.
**Alternatives considered**: WooCommerce Store API's product collection endpoint (viable alternative, slightly more work to map JSON back into the existing Blade card markup — noted as a legitimate alternative if the dev team prefers a single consistent API surface across catalog and cart; not chosen here to avoid introducing a second rendering path for the same `ProductCard` markup).

## Dependencies confirmed from prior planning

`docs/design/page-mapping.md` (category page is an "extension requiring review," derived from Shop's own patterns), `docs/audit/production-gaps.md` (Load More/pagination flagged as a prototype gap to fill here).
