# Page Inventory

Classification taxonomy (per project instructions): **Fully implemented in the prototype** / **Visual-only** / **Partially functional** / **Mock-data dependent** / **Missing** / **Requires WordPress integration** / **Requires WooCommerce integration** / **Requires a business decision**. A page can carry more than one tag. Status tags (VERIFIED/PROPOSED/etc.) follow each page per the usual convention.

| # | Page / screen | Prototype file(s) | Classification | Notes |
|---|---|---|---|---|
| 1 | Coming Soon | `ComingSoon.jsx` | Mock-data dependent · Requires WordPress integration | Hero, early-access form UI, packaging band. `EarlyAccessForm` only has a `cta`/`onSubmit` prop — no real submit wired (VERIFIED, `.d.ts`). Needs P0-F007 backend (double opt-in, consent log). |
| 2 | Homepage (Store mode) | `Home.jsx`, `HomeSections.jsx`, `home-content.js`, `HOMEPAGE-AUDIT.md` | Visual-only · Mock-data dependent | 14 rendered sections per `HOMEPAGE-AUDIT.md`; 2 sections (`craftsmanship`, `bestSellers`) intentionally hidden pending real content/sales data. Spotlight section has "working" add-to-cart/wishlist wired to the same mock cart/wishlist as the rest of the kit — not WooCommerce. |
| 3 | Shop / category listing | `Shop.jsx` | Partially functional (client-side filter/sort only) · Mock-data dependent | Tabs/sort/skeleton/empty states implemented against the 4-item mock catalog; no pagination/"Load more" wiring seen (PRD P0-F003 requires 12/8-per-page + Load More — **gap**, see `production-gaps.md`). |
| 4 | Product category | *(no distinct file — `Shop.jsx`'s `initialTab` prop simulates a category)* | Missing (as a distinct template) | PRD requires `/product-category/{slug}/`; prototype only has an in-page tab filter, not a separate category template/URL. |
| 5 | Drop / collection page | *(none found)* | Missing | No distinct "Drop 01 collection" template exists separate from Shop/Home's drop framing. PRODUCT.md IA doesn't list a distinct collection route beyond `/product-category/{slug}/`. |
| 6 | Product detail (PDP) | `Product.jsx` | Fully implemented (UI/interaction) · Mock-data dependent · Requires WooCommerce integration | Gallery, variation selection, sticky mobile CTA, size guide modal, FAQ accordion, related products, and **both** "Order now" (scrolls to inline checkout) and "Add to cart" paths are implemented. All commerce facts (`commerce.price`, `.availability`, `.promotion`, `.shippingIncentive`) are read through a `p.commerce.source === 'woocommerce'` gate that is never satisfied in this prototype — i.e. the PDP is interaction-complete but commerce-inert. |
| 7 | Cart (dedicated `/cart/` page) | *(none found — only `CartDrawer` component and cart-line props passed into `Checkout.jsx`)* | Missing | PRD P0-F005 requires a dedicated Cart page in addition to the mini-cart drawer. No `Cart.jsx` screen exists in `ui_kits/storefront/`. **Gap.** |
| 8 | Checkout (standard, from cart) | `Checkout.jsx` | Fully implemented (UI/validation) · Mock-data dependent | Contact/Delivery/Payment sections, Egyptian phone regex validation, explicit "Design preview... does not send an order" notices throughout. |
| 9 | Checkout (inline, on PDP) | `DirectCheckout.jsx` (rendered inside `Product.jsx`'s `#checkout` section) | Fully implemented (UI/validation) · Mock-data dependent · **Requires a business decision** | This is the exact "inline PDP COD checkout" pattern — fully validated contact/delivery/payment form, order summary, "Confirm order" CTA — but **GOT-Store-PRD.md's feature table (Section 6/7) does not list a separate inline-PDP-checkout feature**; P0-F006 only specifies checkout "from the cart." See `source-conflicts.md` item on inline checkout scope. |
| 10 | Order confirmation ("Thank you") | `ThankYou.jsx` | Visual-only · Mock-data dependent | Renders only placeholder/"preview" copy until `order.confirmed === true`; no real order object exists to feed it. |
| 11 | Order tracking | `Confirmation.jsx` | Visual-only · Mock-data dependent | Same `order.confirmed` gate; status timeline UI exists but has nothing real to render. |
| 12 | Wishlist (`/wishlist/`) | `Wishlist.jsx`, `wishlist-store.js` | Fully implemented (guest, client-only) · Requires WooCommerce integration | Guest-only localStorage persistence; "Add to cart"/"availability" logic already gated on `commerce.source === 'woocommerce'`; no authenticated/cross-device sync exists (expected — P1 feature, needs real backend). |
| 13 | Customer account (dashboard) | `Account.jsx` | Visual-only · Mock-data dependent | Orders/Addresses/Account details/Wishlist tabs all render **hardcoded sample data** ("Order #1001 (sample)", "Karim A., Smouha..."); every submit shows a "preview only, not connected" notice. |
| 14 | Login | `Account.jsx` (`mode === 'signin'`) | Visual-only | Same file, a mode of the Account screen, not a separate page/URL. |
| 15 | Registration | `Account.jsx` (`mode === 'register'`) | Visual-only | As above. |
| 16 | Password reset | `Account.jsx` (`mode === 'reset'`) | Visual-only | As above; "Preview reset request" only. |
| 17 | Order history / order details | `Account.jsx` (`tab === 'orders'`) | Visual-only · Mock-data dependent | No distinct per-order detail page/URL — "View" button routes to the shared `Confirmation` screen. |
| 18 | Search | *(none found)* | Missing | PRD P1-F003. No search input, results page, or no-results state found anywhere in the design system. |
| 19 | About | *(none found)* | Missing | PRD P1-F006 / PRODUCT.md IA `/about/`. No file. |
| 20 | Contact | *(none found)* | Missing | PRODUCT.md IA `/contact/`. No file. |
| 21 | FAQ (standalone page) | *(none found as a page — only PDP's inline FAQ accordion)* | Missing (as a dedicated page) · Partially present (as a PDP section) | `Product.jsx` has an FAQ `Accordion`; no standalone `/faq/` page exists. |
| 22 | Size guide | `Product.jsx` (`Modal` triggered by "Size guide" link) | Visual-only · Requires a business decision | Table renders size labels only; chest/length/sleeve columns are literal `—` placeholders pending "the approved Drop 01 size chart." |
| 23 | Shipping policy | *(none found)* | Missing | PRD P1-F006. |
| 24 | Returns & exchanges | *(none found)* | Missing | PRD P1-F006; `Product.jsx`'s shipping section explicitly says "Returns and exchange details will be added when the policy is approved." |
| 25 | Privacy policy | *(none found)* | Missing | PRD P1-F006 / legal gate (PRD §15). |
| 26 | Terms and conditions | *(none found)* | Missing · referenced only as a link stub (`<a href="#">Terms and Conditions</a>` in `DirectCheckout.jsx`) | |
| 27 | Cookie policy | *(none found)* | Missing | PRD P1-F006; DirectCheckout/Checkout don't even reference a cookie-consent banner yet (PRD P1-F007 is the consent banner, separate from the policy page). |
| 28 | 404 | *(none found)* | Missing | DESIGN.md §7.10 describes intended tone ("concise brand-aligned line") but no implementation exists. |
| 29 | Early access (`/early-access/`) standalone page | *(none found as distinct from the Coming Soon hero form)* | Missing (as a distinct route) · Partially present (as a hero section) | PRODUCT.md IA lists `/early-access/` as a route that must stay reachable 30 days after the Store-mode switch — the prototype only shows the form embedded in the Coming Soon hero, not a separable page. |

## Summary counts

- **Fully/mostly implemented as interactive UI** (still mock-data dependent): Coming Soon hero form, Shop filter/sort, Product detail + both checkouts, Wishlist (guest).
- **Visual-only (sample data, no real logic)**: Homepage non-hidden sections, Account (all tabs/modes), order confirmation/tracking.
- **Missing entirely**: dedicated Cart page, Product category as its own template, Drop/collection page, Search, About, Contact, standalone FAQ, Size Guide data, all five policy pages, 404, standalone Early Access page.

This gap set is large but expected: PRODUCT.md itself frames the design system as covering P0 commerce-UI patterns, not the full P1 content/account surface, which GOT-Store-PRD.md schedules for Phase 3.
