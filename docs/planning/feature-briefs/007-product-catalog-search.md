**Status: PROPOSED feature brief — not yet run through full Spec Kit specify/plan/tasks workflow. Run `/speckit.specify` when this feature is scheduled to start.**

**Superseded for implementation purposes by `specs/007-product-catalog-search/spec.md`, `plan.md`, and `tasks.md`** (generated via the real Spec Kit workflow). This brief is kept as the original planning rationale and is not updated further; treat the Spec Kit artifacts as authoritative for scope, acceptance criteria, and tasks.

# 007 — Product Catalog, Categories, Filters, Search

## Summary
Implements PRD **P0-F003** (catalog/listing — launch-blocking) and **P1-F003** (search — target v1, not launch-blocking).

## Scope
**In**: `/shop/` and `/product-category/{slug}/` templates (WooCommerce archive/taxonomy overrides), `FilterBar` (tabs/sort/size-filter/URL-state sync), 12-per-page desktop / 8-per-page mobile with "Load more" (no full reload), sold-out badge/disabled-add-to-cart state; search results page + no-results state (ADR 0014: native WordPress/WooCommerce search extended to SKU/category).
**Out**: PDP itself (008), homepage's own category/new-arrivals modules (built in 006, consuming this feature's data layer).

## Dependencies
Hard: 002. Soft: ADR 0014 for the search sub-scope only.

## Acceptance Criteria
(Verbatim from PRD P0-F003) Grid shows 12/8 per page with non-reloading Load More; price-low-to-high sorts by lowest variation price; size filter removes non-matching products within 300ms; sold-out products show badge and cannot be added to cart; listing LCP <2.5s mobile/4G; filter/sort state preserved on browser back button, encoded in URL query string.
(From PRD P1-F003) Search returns results <1s for ≤500 products; matches name/SKU/category; accessible label, results count announced to screen readers.

## Risk Register
- Risk of over-building search (Elasticsearch/Algolia) beyond the PRD's explicit, modest scope — mitigated by ADR 0014's explicit decision and rationale.
- Category page is an "extension requiring review" per `docs/design/page-mapping.md` (no distinct prototype reference) — visual design derived from Shop's patterns, not invented fresh.

## Testing Requirements
E2E: sort/filter/load-more/back-button scenarios; search happy-path + no-results; performance test against the LCP/search-latency targets at the 500-product scale assumption.

## Visual Parity Requirements
Shop page: full parity against `Shop.jsx`. Category page: design-extension review (no 1:1 reference) per `docs/design/page-mapping.md`. Search: design-extension review (no prototype reference at all).

## Definition of Done
All PRD P0-F003 AC pass; search P1-F003 AC pass (or explicitly deferred per `docs/planning/release-scope.md`'s P1 slip-allowance); category page reviewed and approved as a visual extension by the brand owner.
