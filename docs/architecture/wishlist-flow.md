# Wishlist Flow

Status: VERIFIED for prototype behavior (`wishlist-store.js`, `Wishlist.jsx`, `Account.jsx` read in full) / PROPOSED for production architecture / **REQUIRES APPROVAL** on the guest-gate question (C-06).

## Scope reminder

Wishlist is PRD **P1-F004** ("Should Have"), not a P0 launch blocker. This document specifies the target architecture so it's ready to build in Phase 3 per PRD §10.

## What the prototype already gets right (preserve exactly)

- Canonical-ID-only storage: `wishlist-store.js` stores **only product-ID strings**, never a copied snapshot of product data — "product details always come from the current catalog" (explicit code comment). Production must replicate this: store `(user_id|guest_token, product_id, variation_id)`, never a denormalized copy of name/price/image.
- De-duplication and input validation on every read/write (`normalize()` filters to non-empty strings ≤128 chars, de-dupes via `Set`).
- Defensive try/catch around every `localStorage` access (handles private-browsing/blocked-storage gracefully, matching DESIGN.md's "handle blocked storage gracefully" rule).
- Stock/availability is re-checked at the point of action (`Wishlist.jsx`'s `add()` function checks `commerce.availability` before allowing "Add to cart" — never trusts a stale saved state).

## Target production architecture

```mermaid
flowchart LR
    subgraph Guest
        GC[Browser cookie/localStorage<br/>product IDs only]
    end
    subgraph Authenticated
        UM[WordPress user meta<br/>or custom table]
    end
    GC -- "on login" --> MERGE{Merge service<br/>got-commerce}
    UM --> MERGE
    MERGE --> UM2[Reconciled wishlist<br/>de-duplicated by product+variation]
    UM2 --> Header[Header heart count]
    UM2 --> PC[Product card hearts]
    UM2 --> PDP[PDP heart]
    UM2 --> WP[/wishlist/ page]
```

- **Guest persistence**: cookie or `localStorage` holding product (and variation, if size/color-specific saves are wanted — PRD doesn't specify variation-level wishlist, so PROPOSED: product-level only, matching the prototype) IDs, 30 days per PRD P1-F004 alternate flow.
- **Authenticated persistence**: user meta (simple, low-volume, no new table) unless catalog/wishlist size projections change — PRD's "up to 1,000 products" scale assumption makes a custom table unnecessary; see `docs/adr/0007-wishlist-persistence.md` for the final call.
- **Guest-to-account merge**: on login/registration, the plugin reads the guest cookie/localStorage list (passed via a small JS call on login success) and unions it with the account's existing wishlist, de-duplicated, then clears the guest store. No duplicate entries, no data loss in either direction.
- **Cross-device sync**: automatic for authenticated users once stored server-side (every device reads the same user-meta record); not applicable to guests by definition.
- **Variation identity rule**: PROPOSED — wishlist saves the *product*, not a specific variation, consistent with the prototype (`Wishlist.jsx`'s `add()` auto-resolves to the first available color/size only when there's exactly one of each; otherwise it opens the product page for the visitor to choose). This avoids modeling "wishlisted variation combinations" as a separate concern from "wishlisted products."

## Add-to-cart-from-wishlist validation (reuses the cart/checkout service, not a separate code path)

Exactly the pattern already in `Wishlist.jsx`: before adding, re-check `availability` (`in-stock`/`low-stock` only); if multiple size/color options exist, send the visitor to the PDP to choose rather than guessing; if the product was removed from the catalog entirely, show "This product was removed from the store" (already-correct prototype copy) with a remove-only action.

## Synchronization across header/cards/PDP/wishlist page

All four surfaces must read from **one source of truth** (the plugin's wishlist service), not four independently-fetched copies — implemented as a single Alpine.js store (client-side cache) hydrated from a server-rendered initial state and kept in sync via the same add/remove endpoint response, mirroring the prototype's "one React state... synchronizes across same-origin tabs" design intent (per `ui_kits/storefront/README.md`), achieved in production via a `BroadcastChannel`/`storage` event listener for guests and a simple re-fetch-on-focus for authenticated users.

## Open item (REQUIRES APPROVAL — C-06)

PRD P1-F004 alternate flow says a guest click "prompts to log in or continue as guest"; `PRODUCT.md` §F07 flags this as unreconciled; the prototype never prompts at all (silent guest wishlist). Production must implement whichever the owner confirms — the architecture above supports either (the prompt, if added, is a presentation-layer interstitial in front of the same guest-persistence mechanism, not a different backend).
