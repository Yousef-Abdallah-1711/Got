**Status: PROPOSED feature brief — not yet run through full Spec Kit specify/plan/tasks workflow. Run `/speckit.specify` when this feature is scheduled to start.**

**Superseded for implementation purposes by `specs/008-product-details-variations/spec.md`, `plan.md`, and `tasks.md`** (generated via the real Spec Kit workflow). This brief is kept as the original planning rationale and is not updated further; treat the Spec Kit artifacts as authoritative for scope, acceptance criteria, and tasks.

# 008 — Product Details, Variations, Inventory

## Summary
Implements PRD **P0-F004** in full: the product detail page as a faithful Blade/Alpine port of `Product.jsx` — gallery, variation selection, stock state, quantity, add-to-cart, plus the trust/story/packaging/shipping/FAQ/related-products sections and the sticky mobile CTA. This feature does **not** include the inline checkout form itself (that's 009, gated separately) but does include the "Order now" CTA's scroll-to-inline-section behavior as dead/no-op or linking to "Add to cart" if 009 is not approved.

## Scope
**In**: `woocommerce/single-product.php` override, gallery (swipe mobile / thumbnails desktop / zoom), `ColorSelector`/`SizeSelector`/`QuantityStepper` wired to real variation data, stock-state messaging, size-guide modal (pending real measurement data), FAQ accordion, related products, product JSON-LD schema, promotion-badge rendering (dormant unless ADR 0009 approved).
**Out**: inline checkout business logic (009), standard cart add-to-cart's *checkout* flow (010) — this feature stops at "item successfully added to cart."

## Dependencies
Hard: 007 (category/attribute model). Soft: ADR 0009 (promotion badges, cosmetic-only dependency).

## Acceptance Criteria
(Verbatim from PRD P0-F004) Gallery supports swipe mobile / click-zoom desktop without layout shift; variation selection updates price/stock within 200ms, no full reload; Add to cart disabled until size + qty≥1 selected; quantity capped at min(stock,10); WCAG 2.1 AA for size/color selection (labeled radio groups, arrow-key nav); product JSON-LD validates in Google's Rich Results Test.

## Risk Register
- Size-guide data is blocked on brand-owner-supplied measurements (`docs/audit/missing-assets.md`) — ships with the "measurements pending" placeholder copy already in the prototype until resolved, not blocked entirely.
- Color swatch hex values need WooCommerce attribute term-meta wiring (`docs/architecture/data-model.md`) — a real but small implementation task.

## Testing Requirements
E2E: variation selection → stock/price update → add to cart, including sold-out-size and quantity-cap edge cases. Accessibility: keyboard-only variation selection, screen-reader stock announcement (`aria-live`). Schema validation via Google's Rich Results Test.

## Visual Parity Requirements
Full — against `Product.jsx` directly, the most complete single-screen reference in the prototype. See `docs/design/component-mapping.md`'s PDP-specific notes.

## Definition of Done
All PRD P0-F004 AC pass; schema validates; sticky mobile CTA behavior matches the prototype's `IntersectionObserver`-driven visibility logic (reimplemented per ADR 0003, behavior preserved).
