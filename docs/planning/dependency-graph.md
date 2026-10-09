# Dependency Graph

**Superseded by `docs/planning/MASTER-IMPLEMENTATION-ROADMAP.md`** §2/§2a, which recalculates this graph against the real 18-feature Spec Kit artifacts and removes an artificial dependency edge found during that recalculation. Kept here as the original pre-Spec-Kit planning rationale.

Explicit edges between the 16 proposed features (002–017), beyond the summary Mermaid diagram in `master-roadmap.md`. "Hard" = cannot start without; "Soft" = can start in parallel but cannot *finish/ship* without.

| Feature | Hard dependencies | Soft dependencies | Reasoning |
|---|---|---|---|
| 002 — Foundation | 000/001 (constitution, ADR 0001 Sage version, ADR 0013 deployment layout) | — | Nothing else can start without a provisioned WordPress/WooCommerce/Sage install. |
| 003 — Tokens/global UI | 002 | C-01 (Acid Lime decision) must land before this feature can be marked *done*, though build can start with a placeholder accent | Global header/footer/theme-toggle need the theme scaffold from 002. |
| 004 — ACF architecture | 002, ADR 0004 | 003 (shares the same Blade component conventions) | ACF blocks render inside Blade partials that assume 003's token/component base exists. |
| 005 — Coming Soon/early access | 003, 004 | ADR 0010 (subscriber storage), ADR 0011 (email provider) | Coming Soon hero is an ACF-composed page (004) using global UI (003); the signup form needs a storage/email decision to actually submit anywhere. |
| 006 — Homepage/editorial | 004 | 007 (for live "new arrivals"/category modules), 008 (for "spotlight" featured product) | Several homepage sections pull live WooCommerce data — can be built against mock data first but can't be *finished* without 007/008. |
| 007 — Catalog/categories/search | 002 | ADR 0014 (search — only needed for the search sub-scope, not catalog/filter) | Catalog needs WooCommerce product/category data model from 002; search is a P1 add-on within this feature, not a hard blocker on catalog shipping. |
| 008 — PDP/variations/inventory | 007 | ADR 0009 (promotion badges — PDP renders them if approved, dormant otherwise) | PDP needs the category/attribute model from 007 to resolve variations. |
| 009 — Inline PDP checkout | 008, 010, **ADR 0006 approval (C-02)** | — | Cannot be built at all until the scope decision lands; architecturally needs both PDP (008) and the shared checkout service (010). |
| 010 — Cart/standard checkout | 008 | ADR 0005 (Store API mechanism), ADR 0008 (guest session) | Needs real product/variation data to validate against; shares its service layer forward into 009 and 013. |
| 011 — Accounts/auth | 002 | 010 (guest-order-to-account linking needs checkout to exist first to be testable) | Auth itself only needs WordPress/WooCommerce user tables (002), but its acceptance criteria (order visibility) need 010's orders to exist. |
| 012 — Wishlist/guest merge | 008 (needs products to wishlist), ADR 0007 | 011 (merge-on-login needs accounts to exist) | Guest wishlist can ship standalone; the "merge" half hard-depends on 011. |
| 013 — Orders/confirmation/tracking/email | 010, ADR 0011 (email provider) | 011 (account order history reuses the same order data) | Confirmation/email are part of checkout's own definition of done; tracking is a thin additional lookup feature. |
| 014 — Shipping/coupons/promotions/BOGO | 010 | ADR 0009 (BOGO sub-scope only) | Shipping zones must exist before checkout can be considered complete — this is actually a **hard** dependency *of* 010's Definition of Done, not purely downstream; BOGO itself is independently gated. |
| 015 — Content pages/SEO/analytics | 004 (policy pages are ACF/ordinary Pages) | 006, 013 (analytics events instrument homepage/catalog/checkout, so can't be *verified* without them) | Policy page shells can be built early; analytics event wiring needs the pages/flows they instrument to exist. |
| 016 — Security/accessibility/performance/observability | 002 through 015 (all of them, by definition — this is the hardening pass) | — | PRD Phase 4 is explicitly "everything else is built, now harden it." |
| 017 — Deployment/backups/production acceptance | 016 | — | Cannot "go live" before the hardening gate passes per constitution Principle 18/20. |

## Critical path (longest hard-dependency chain)

```text
000/001 → 002 → 007 → 008 → 010 → 013 → 016 → 017
```

Everything else (003/004/005/006/009/011/012/014/015) can be parallelized around this spine to varying degrees, constrained by team size (PRD Persona 3 assumes a single operator/developer-of-record, which in practice limits true parallelism regardless of this graph's theoretical structure — see `docs/planning/risks-and-blockers.md`).
