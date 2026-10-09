# Phase 0 Research: Product Detail, Variations, Inventory

## Decision: Variation data fetch mechanism

**Decision**: WooCommerce's native variation-form JSON data (already attached to the page on load for variable products) as the primary source, with a fallback AJAX "get variation" call only if a selection combination wasn't pre-loaded.
**Rationale**: WooCommerce already generates this data natively for variable products; re-fetching from scratch on every selection would be redundant network overhead working against the 200ms target.
**Alternatives considered**: A fully custom REST endpoint re-implementing variation lookup (rejected — duplicates logic WooCommerce already provides correctly).

## Decision: Color swatch values

**Decision**: Store a `hex` value as term meta on each `pa_color` attribute term, read by the `ColorSelector` component to render swatches.
**Rationale**: WooCommerce's native attribute model has no visual-swatch concept; term meta is the standard, lowest-friction WordPress-native extension point for this.
**Alternatives considered**: A custom color taxonomy entirely separate from WooCommerce's attribute system (rejected — breaks native variation matching, which depends on WooCommerce's own attribute taxonomies).

## Decision: Structured data (schema) freshness

**Decision**: JSON-LD product schema is generated at render time, every request, from the same live data the visible page uses — never cached independently of the page's own cache invalidation rules.
**Rationale**: FR-008's "accurately reflects current, real data at the time of each render" requirement; a schema that's cached longer than the page itself risks search engines indexing stale availability claims.
**Alternatives considered**: A separately-cached schema snippet refreshed on a cron schedule (rejected — reintroduces a staleness window the live-render approach avoids).

## Dependencies confirmed from prior planning

`docs/architecture/data-model.md` (color swatch term-meta already identified there), `docs/audit/interaction-inventory.md` (confirms the prototype's existing, correct selection/stock-cap interaction logic to preserve).
