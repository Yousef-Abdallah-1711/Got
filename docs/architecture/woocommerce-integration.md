# WooCommerce Integration

Status: VERIFIED (entity list cross-referenced against `GOT-Store-PRD.md` §9 "Key WooCommerce entities used" and §11.4 "Data Model", both read in full) / PROPOSED for implementation-pattern recommendations.

## Principle (constitution Commerce Principles 3, 6, 10)

WooCommerce is the sole authority for product, price, stock, tax, shipping, discount, and order data. The `got-commerce` plugin calls WooCommerce CRUD classes and hooks — it never writes to `wp_wc_orders`/`wp_postmeta`/`wp_posts` directly, and never forks or overrides WooCommerce core files.

## Entities and how each is used

| Entity | WooCommerce mechanism | GØT-specific usage |
|---|---|---|
| **Product** | `WC_Product_Simple` / `WC_Product_Variable` | Simple (accessories: keychain, tag) and variable (hoodies: Size × Color) per PRD §9. Fields used: name, slug, description, short description, images, category, tags, attributes, SKU, status, visibility, featured flag. |
| **Variation** | `WC_Product_Variation` | Size + Color attribute values, regular/sale price, stock quantity, image. `QuantityStepper`'s `max = min(10, stock)` contract reads `get_stock_quantity()`. |
| **Category** | `product_cat` taxonomy | Drives Shop filter tabs (`FilterBar`) and "Shop by category" homepage module (`get_terms('product_cat', ['hide_empty' => true])` per `HOMEPAGE-AUDIT.md` §6). |
| **Attribute** | Global attributes (`pa_size`, `pa_color`) | Size/Color selectors read these; color swatch hex values are **not** native WooCommerce attribute data — see `data-model.md` for the custom attribute-meta mapping needed to drive `ColorSelector`'s hex swatches. |
| **Stock** | Core inventory management, HPOS-compatible | Reduced exactly once per order (PRD P0-F006 AC); sold-out state drives `ProductCard`/`SizeSelector` strikethrough states. |
| **Coupon** | `WC_Coupon` | Percent/fixed-cart/fixed-product, usage limit, expiry, minimum spend — applied via the cart/Store API, never recalculated client-side. |
| **Shipping zone/method** | `WC_Shipping_Zone` | Governorate-based zones (Alexandria / Cairo+Giza / Other governorates) with brand-approved flat fees (fees are currently **missing** — see `docs/audit/missing-assets.md`). |
| **Customer** | WordPress user + WooCommerce customer meta | Billing/shipping addresses, order history; "Customer" role per PRD §5 role table. |
| **Order** (HPOS) | `WC_Order`, `wc_create_order()`, Custom Order Tables | `order_number`, `status`, billing/shipping address, `payment_method = 'cod'`, shipping method, line items, totals, `customer_id` nullable for guest. All reads/writes go through `WC_Order`/`wc_get_order()` — never direct SQL. |
| **Order line item** | `WC_Order_Item_Product` | product_id, variation_id, quantity, unit_price, line_total, size/color meta. |
| **Review** | Native WooCommerce product reviews (comments-based) | P1-F005 — verified-purchase badge requires checking the reviewer has a Delivered order for that product before allowing submission (custom gate on top of native reviews, not a core-file change). |

## Custom data beyond native WooCommerce (minimized per constitution Principle 9)

| Need | Chosen approach | Why not a custom table |
|---|---|---|
| Early-access subscribers | Custom table (`got_early_access`) **or** CPT **or** email-tool-only, per PRD §9 — **decision deferred to `docs/adr/0010-early-access-storage.md`** | PRD itself says "the decision is recorded in Phase 1... Where possible, use WordPress options and post meta to avoid custom schema changes." Not yet decided — REQUIRES APPROVAL. |
| Wishlist items | User meta for logged-in users (P1 scope only); guest = cookie/localStorage reconciled at login | Avoids a custom table for a small, append-mostly dataset; see `docs/adr/0007-wishlist-persistence.md`. |
| Site Mode flag | WordPress option (`got_site_mode`), not a CPT/table | A single global flag; an option with a capability-gated settings UI is the simplest correct native mechanism. |
| Color swatch hex values for `ColorSelector` | Term meta on the `pa_color` attribute terms (`add_term_meta('hex', ...)`) | Native WooCommerce attribute terms already support term meta — no custom table needed. |

## Store API vs. custom endpoints

Per PRD §11.3, the server-rendered storefront uses:
- **WooCommerce Store API** (`/wc/store/v1/cart/*`, `/wc/store/v1/checkout`) for cart add/update/coupon and order creation — this is WooCommerce's own supported, versioned, HPOS-compatible public API, not a custom reimplementation.
- **Custom endpoints**, namespaced under `/api/v1/`, only for things WooCommerce has no native concept of: early-access signup/confirm/unsubscribe, order tracking lookup, and Site Mode admin toggle. These are implemented as a REST API controller inside `got-commerce`, each with an explicit `permission_callback` (never public-write without rate limiting).

The exact mechanism for the **inline PDP checkout** (reusing Store API vs. a dedicated wrapper endpoint) is the subject of `docs/adr/0006-inline-checkout-architecture.md` and is gated on the C-02 scope decision in `docs/audit/source-conflicts.md`.

## HPOS compliance checklist (constitution Principle 6 — non-negotiable)

- [ ] All order reads/writes via `wc_get_order()`/`WC_Order` methods, never `get_post()`/`get_post_meta()` on order IDs.
- [ ] Any third-party plugin candidate (shipping, reviews, email-styling, activity log — see `docs/architecture/tech-stack.md` §4 plugin budget) is checked for a declared HPOS-compatible flag before inclusion.
- [ ] Custom reporting/export code (if any) queries the HPOS order tables' supported query API, not legacy `wp_posts`.
- [ ] HPOS is enabled from day one in `docs/architecture/deployment.md`'s environment provisioning steps, not toggled on after orders already exist (migration risk).
