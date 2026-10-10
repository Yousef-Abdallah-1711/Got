# ADR 0002 — Headless vs. Traditional Architecture

## Status
VERIFIED as a settled, owner-approved decision (not a live choice this ADR is reopening — recorded here per the project's requirement that all architecture decisions be documented as ADRs, including ones already fixed by the PRD).

## Context

`GOT-Store-PRD.md` §4 "Non-Goals" states explicitly: "Headless architecture (Next.js frontend) — the storefront is server-rendered through the Sage theme." `PRODUCT.md` §2 repeats this as a "fixed implementation decision": "Not headless; no Next.js or generic SPA, no page builder replacing theme templates." The existing React design system (`GØT Design System (2)/ui_kits/storefront/`) is explicitly a **reference/prototype only** — its own `README.md` and `HOMEPAGE-AUDIT.md` both state there is no production UI and no WordPress/Sage code exists yet, i.e. the React code was never intended to become the production runtime.

## Options

1. **Traditional, server-rendered WordPress/WooCommerce via Sage/Blade** (the documented decision).
2. **Headless WordPress + a React/Next.js frontend consuming the WooCommerce Store API/GraphQL** — would let the existing `.jsx` component library become the literal production frontend with comparatively less rewriting.
3. **Hybrid** (server-rendered pages + islands of React for commerce-heavy views like PDP/checkout) — not requested and adds a second runtime to maintain for marginal benefit over Alpine.js islands.

## Trade-offs

- Option 2 would reduce the amount of "component translation" work (Blade/Alpine ports of 25 React components), but:
  - Directly contradicts an explicit, repeated, written Non-Goal in the approved PRD.
  - Requires duplicating or proxying all of WooCommerce's cart/stock/price/tax/shipping logic through a custom API layer, which conflicts with constitution Principle 3 (WooCommerce as sole authority) and Principle 8 (prefer WordPress-native solutions).
  - Adds an entire second deployable runtime (a Node.js app) to the infrastructure, which the project's single-developer-risk profile (PRD Risk R-012) and modest scale (under 5,000 monthly visitors) do not justify.
- Option 1 costs more translation effort up front (Blade/Alpine ports) but has no duplicated business logic, no second runtime, and matches every documented requirement.

## Decision

**Server-rendered WordPress/WooCommerce via Roots Sage/Acorn/Blade. No headless layer, no React/Next.js runtime in production.** The existing `.jsx` component library and `ui_kits/storefront/` screens are used exclusively as **behavioral/visual reference** for building Blade partials + Alpine.js islands — never bundled or executed as-is in production.

## Consequences

- All 26 components in `docs/design/component-mapping.md` are mapped to Blade/Alpine/ACF-block targets, not "ported."
- The checkout, cart, and wishlist business logic described in `docs/architecture/checkout-flow.md`/`wishlist-flow.md` lives entirely server-side in PHP (`got-commerce`), with WooCommerce's own Store API or native checkout hooks doing the heavy lifting — not a custom GraphQL/REST layer re-implementing WooCommerce.
- If a future version of the brand wants a richer client-side experience, that is a new, explicitly-approved architecture change — not something to quietly reach for mid-build because "the React components already exist."

## Approval status

VERIFIED/ratified by the existing PRD and PRODUCT.md — no new owner approval needed to proceed on this basis, only flagged here for completeness and traceability.
