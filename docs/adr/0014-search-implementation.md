# ADR 0014 — Search Implementation

## Status
PROPOSED.

## Context

PRD P1-F003 (Should Have, Sprint 4): search by product name/SKU/category, results page, no-results state, results within 1s for up to 500 products, accessible label + announced result count. PRD §4 Out of Scope explicitly excludes "Advanced search (typo correction, voice search, synonyms)" — this is a deliberately modest requirement, not a search-engine project.

## Options

1. **WordPress native search** (`WP_Query` with `s=` parameter) scoped to the `product` post type, extended via `pre_get_posts` to also match SKU and category name.
2. **WooCommerce's built-in product search enhancements** (WooCommerce already improves on core search for products to some degree) + the same SKU/category extension.
3. **A dedicated search service** (Elasticsearch/Algolia/etc.) — explicitly disproportionate: the PRD caps the problem at 500 products and 1-second response, and explicitly excludes typo-correction/synonyms, i.e. the exact capabilities that would justify a dedicated search service.

## Trade-offs

- Options 1/2 meet the literal, modest PRD requirement with zero new infrastructure or third-party dependency (constitution Principle 9).
- Option 3 would be a clear case of over-engineering relative to the explicit Out-of-Scope line — flagged here specifically so a well-meaning engineer doesn't reach for Algolia "because it's better," when the PRD has already decided a simple native search is sufficient and explicitly excluded the capabilities that would justify more.

## Decision

**Option 2**: WooCommerce's native product search, extended with a `pre_get_posts` filter to also match against SKU (meta query) and category name (taxonomy query), rendered as a results page with the same `FilterBar`/`ProductCard` components as the Shop page (reuse, not a new UI) and an accessible, `aria-live`-announced result count per PRD AC.

## Consequences

- No new plugin, no new infrastructure, satisfies the 1-second/500-product target trivially at this scale.
- If the catalog or the search quality bar grows substantially post-launch (explicitly out of this project's v1 scope), revisit this ADR rather than silently bolting on a search service later.

## Approval status

PROPOSED — no owner sign-off required; this is the PRD's own implied default, made explicit to prevent scope creep toward an unneeded dedicated search service.
