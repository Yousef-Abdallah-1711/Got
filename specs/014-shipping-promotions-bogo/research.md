# Phase 0 Research: Shipping Zones, Coupons, and BOGO/Free-Shipping Promotions

## Decision: BOGO implementation approach (resolves prior conflict C-03, now mandatory per owner decision; **mechanism corrected 2026-10-09, remediates finding C3-PROMO**)

**Decision**: A small custom `Promotions` module (`got-commerce`) that adds the free unit as a **real cart/order line item** (via `WC()->cart->add_to_cart()` then zeroing its price in `woocommerce_before_calculate_totals`), rather than relying on native coupon types (which cannot cleanly express "buy X get Y free") **and rather than the fee-based approach this document previously specified**.
**Rationale**: Native WooCommerce coupons don't have a BOGO discount type, so custom code is genuinely needed — but a cart *fee* (the originally-chosen mechanism) has no product association and therefore cannot reduce the free product's stock, which this feature's own spec.md FR-009 explicitly requires ("MUST correctly reduce stock for every line item created by a BOGO promotion's 'free' item, exactly as for any ordinary purchased item"). A real $0 line item satisfies FR-009 by construction, since WooCommerce's native stock-reduction and refund logic already applies to every order line item, paid or not. This was found by an independent Codex architecture review, verified against the actual spec.md text and WooCommerce's own fee-API documentation (which states fee amounts should not be negative), and corrected here — see `docs/architecture/PROMOTIONS-AND-PRICING.md` for the full mechanism.
**Alternatives considered**: A third-party BOGO/promotions plugin (rejected per Principle 9); the original fee-based approach (rejected this round — the actual defect found).
**Reference**: `docs/adr/0009-promotion-implementation.md`, `docs/architecture/PROMOTIONS-AND-PRICING.md`.

## Decision: Promotion configuration storage

**Decision**: A simple CPT (`got_promotion`) with ACF-style meta fields (eligible product/variation IDs, required quantity or spend threshold, start/end dates, stacking rule) — chosen over a custom table because an admin needs to browse/create/edit these like content, and WordPress's native CPT UI gives that for free.
**Rationale**: Unlike the early-access subscriber case (ADR 0010, which needed fast lookup/rate-limiting), promotion configs are low-volume and admin-browsed, which is exactly the CPT justification case (HTML-to-Sage Principle V: "independently managed... requires its own... admin workflow").
**Alternatives considered**: A custom table (rejected — no query-performance need justifies skipping the native CPT admin UI here, unlike the subscriber case).

## Decision: Free-shipping-threshold mechanism

**Decision**: The same `EligibilityCalculator` class computes both BOGO and free-shipping-threshold eligibility, since `Promo.jsx`'s `ShippingIncentive` contract (`remaining`/`progressPercent`/`eligibilityText`) is structurally generic enough to share the calculator, not a separate system.
**Rationale**: Avoids building two parallel eligibility engines for what is conceptually the same "is this cart eligible, and how far from eligible" question.

## Decision: Shipping zone fees

**Decision**: Reuses Feature 010's `ShippingZoneSeed` (already idempotently seeds the 3 zones); this feature's only addition is ensuring the admin-facing fee fields are clearly marked placeholder until the brand owner supplies real values.
**Rationale**: No reason to duplicate zone-seeding logic across two features.

## Dependencies confirmed from prior planning

`docs/architecture/checkout-flow.md`, `Promo.jsx`'s existing `OfferBlock`/`ShippingIncentive` component contracts (already correctly gated, per `docs/audit/interaction-inventory.md`).
