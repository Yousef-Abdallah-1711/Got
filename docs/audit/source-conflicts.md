# Source Conflicts

Every conflict below is logged, not resolved. Per project instructions, conflicts are flagged for an owner decision rather than silently overridden. Status: VERIFIED (both sides of the conflict were directly read in source) unless noted.

## C-01 — Acid Lime accent vs. documented silver accent (HIGH IMPACT) — **RESOLVED 2026-10-09**

- **Decision**: brand owner approved **Acid Lime (`#C2FF3D`) as the production accent** for CTA backgrounds, focus rings, and `AnnouncementBar`'s default variant, per `GØT Design System (2)/tokens/colors.css`. The documented silver accent (`DESIGN.md` §3 / `GOT_Complete_Brand_Identity.md` §4.2) is superseded for these roles; the `data-accent="silver"` override remains available as an opt-in, not the default.
- **Claim A** (`DESIGN.md` §3, `GOT_Complete_Brand_Identity.md` §4.2): the brand accent is **Brushed Silver `#BFC0C2`** (dark) / **Gunmetal `#3A3A3C`** (light). No lime color appears anywhere in either document.
- **Claim B** (`GØT Design System (2)/tokens/colors.css`, VERIFIED by direct read): `--got-lime: #C2FF3D` is defined, and the semantic system wires `--accent`, `--got-cta-bg` (primary button background, both themes), `--color-focus` (keyboard focus ring, both themes), and `AnnouncementBar`'s default `variant="lime"` all through this lime value. Silver is demoted to an opt-in override via `html[data-accent="silver"]`.
- **readme.md** (design system) is self-aware of this and labels lime "a previously proposed design addition, not automatically a formally approved original brand color... conflicts with the documented silver accent."
- **Compounding issue**: `readme.md` cites "`uploads/DESIGN.md` §17" as the section discussing this conflict, but the actual `DESIGN.md` read for this audit **only goes up to §16** ("Relationship to product specification") — there is no §17, and no Acid Lime mention anywhere in `DESIGN.md`. This cross-reference is itself broken, reinforcing that Acid Lime was never actually reconciled with the documented spec.
- **Impact**: affects every primary CTA button, every keyboard focus ring, and the always-visible announcement bar across the entire site.
- **Resolution needed**: none — resolved above. (Historical context only: the choice was between (a) Acid Lime as the production accent — **selected** — (b) reverting to the documented silver accent, or (c) a third color.)

## C-02 — Inline PDP Cash-on-Delivery checkout: designed in full, but absent from the approved PRD's feature table

- **Claim A** (`GOT-Store-PRD.md` §6/§7): P0-F006 "Checkout with Cash on Delivery" is scoped only as checkout reached "from the cart" (trigger: "Visitor selects 'Checkout' from the cart"). No separate feature ID exists for an inline, product-page checkout.
- **Claim B** (`GØT Design System (2)/ui_kits/storefront/DirectCheckout.jsx`, rendered inside `Product.jsx`'s `#checkout` section, both VERIFIED by direct read): a fully built, fully validated inline COD order form lives directly on the product detail page, with its own "Order now" CTA that scrolls to it, separate from "Add to cart."
- **Impact**: this is a significant, UX-visible feature whose scope and existence is ambiguous between the two authoritative sources. Building it doubles the checkout-validation surface to maintain (two forms instead of one) and was explicitly called out as a wider project brief priority ("one of the highest-priority features") in the broader planning request, but is simply not present in the PRD's MoSCoW table.
- **Resolution needed**: owner must explicitly decide whether inline PDP COD checkout is in v1 scope (and if so, add it as a formal PRD feature with its own acceptance criteria) or deferred. **REQUIRES APPROVAL.** Tracked architecturally regardless in `docs/adr/0006-inline-checkout-architecture.md` so the decision is ready to execute either way.

## C-03 — BOGO / promotion-badge UI exists in components, but is not in PRD/PRODUCT.md scope at all

- **Claim A** (`GOT-Store-PRD.md`, `PRODUCT.md`): BOGO is never mentioned. The closest related item is P2-F003 "Free Shipping Progress Bar" (Could Have, post-launch) and P3/v2 explicitly excludes advanced promotion machinery.
- **Claim B** (`Badge.d.ts` tones include `'offer'`/`'bogo'`/`'shipping'`; `data.js`'s `window.GOT_PROMOS`/`GOT_calc`/`GOT_BADGES`; `Promo.jsx`'s `OfferBlock`/`ShippingIncentive` components, all VERIFIED by direct read): a complete, server-verification-gated BOGO and free-shipping-threshold UI layer is already designed and ready to wire up.
- **Impact**: moderate. The UI is defensively built (never renders without a `source: 'woocommerce'` + `active`/`eligible` flag), so including it costs little if left dormant, but implementing full BOGO business logic (eligible products, stacking rules, refund behavior) is real scope not currently budgeted in the PRD's 8-week phase plan.
- **Resolution needed**: owner decides whether BOGO ships in v1, v1.1, or stays dormant UI. **REQUIRES APPROVAL.** See `docs/adr/0009-promotion-implementation.md`.

## C-04 — Typography: "fixed" PRD decision vs. brand-identity doc's uncertainty

- **Claim A** (`PRODUCT.md` §2 "Fixed implementation decisions"): typography is stated as settled — Inter Tight / Inter / IBM Plex Mono, self-hosted.
- **Claim B** (`GOT_Complete_Brand_Identity.md` §4.3): "the exact typeface cannot be identified reliably from the images," lists Inter Tight only as one of three *candidate* headline fonts (alongside Neue Haas Grotesk / Helvetica Now), and flags typography licensing as an open question in §12.
- **Impact**: low risk to implementation (PRD's fixed decision governs per source-priority order), but font **licensing** for self-hosting remains genuinely unresolved per both documents and the constitution's sync-impact note.
- **Resolution needed**: none for font family choice (PRD governs); licensing confirmation is **REQUIRES APPROVAL** / **BLOCKED** before any font file is shipped to production.

## C-05 — `--got-ash` CSS variable referenced but not defined in `colors.css`

- **Claim**: `colors.css` line 12 sets `--got-text-muted: var(--got-ash)`, but the raw-palette block (lines 2–6) never declares `--got-ash` — only `--got-steel` is declared, at a different value (`#777777`) than the documented muted-text color (`#A3A3A3`).
- **Possible explanations** (not verified in this pass): `--got-ash` is defined in `tokens/base.css` or `tokens/effects.css` (not opened in this audit), or this is a genuine broken reference that silently falls back to the browser default (`unset`/inherit) wherever used.
- **Resolution needed**: verify `base.css`/`effects.css` for a `--got-ash` declaration before implementation; if absent, this is a bug in the design system to fix during token porting, not a brand decision. **BLOCKED — needs a quick file check**, not an owner decision.

## C-06 — Wishlist: "guest behavior must be reconciled with PRD" (the PRD says this about itself)

- **Claim A** (`GOT-Store-PRD.md` P1-F004): "Guest clicks heart → prompted to log in or continue as guest (guest list stored in local browser storage for 30 days)."
- **Claim B** (`PRODUCT.md` §F07): "Wishlist authenticated persistence; guest behavior must be reconciled with PRD (guest temporary list vs logged-in-only P1)" — **PRODUCT.md itself flags this as unresolved**, not fully aligned with the PRD line above.
- **Claim C** (prototype `wishlist-store.js`/`Wishlist.jsx`): implements guest-only wishlist with no login prompt at all — adding to wishlist never gates on auth state.
- **Impact**: low-to-moderate; affects whether first-time wishlist use shows a login prompt or silently works as guest.
- **Resolution needed**: **REQUIRES APPROVAL** — confirm whether guest wishlist is silent (prototype behavior) or gated behind a login prompt (PRD's literal wording).

## C-07 — Early-access form: optional WhatsApp field in PRD, absent from the component contract

- **Claim A** (`GOT-Store-PRD.md` P0-F007 main flow / data model §11.4): subscriber capture includes "optional first name and WhatsApp number."
- **Claim B** (`EarlyAccessForm.d.ts`, VERIFIED): props are only `state`, `onSubmit`, `cta` — no first-name or WhatsApp field is modeled in the component contract at all.
- **Impact**: low — straightforward to add two optional fields to the Blade/Alpine implementation of this form; it isn't a decision conflict so much as an incomplete component contract.
- **Resolution needed**: none (not a business decision) — tracked as an implementation gap in `production-gaps.md`, to be included when the real `early-access` form partial is built.

## C-08 — Domain/social-handle spelling inconsistencies (brand data, not a build decision, but blocks launch content)

- `GOT_Complete_Brand_Identity.md` §6 and `GOT-Store-PRD.md` §16 both independently flag that Instagram (`got.official1`), TikTok (`got.offical`), and the contact email alias (`gotoffical1`) use three different spellings, and that Facebook's exact URL was never supplied. Both documents agree this must be verified before publishing — not a conflict between the two documents, but a shared, unresolved external dependency. Logged here because it affects the Footer/social-links Blade partial content and must not be hardcoded from a guess.
- **Resolution needed**: **REQUIRES APPROVAL** (brand owner must supply verified handles).

## Non-conflicts worth noting (confirmed consistent)

- Dark-mode-default, `localStorage['got-theme']`, system-preference-fallback contract: consistent across PRD, DESIGN.md, PRODUCT.md, readme.md, and the `ThemeToggle`/`Header` component contracts.
- Egyptian mobile-number validation pattern (`01[0125]XXXXXXXX` / `+20 1[0125]XXXXXXXX`): consistent across PRD §7, PRODUCT.md §F06, and both `Checkout.jsx`/`DirectCheckout.jsx` implementations (down to the exact regex).
- "Never fabricate stock, price, dates, reviews, testimonials, scarcity" rule: consistently and repeatedly stated across all four root documents and faithfully implemented as the "commerce verification gate" pattern in `data.js`/`Promo.jsx`.
