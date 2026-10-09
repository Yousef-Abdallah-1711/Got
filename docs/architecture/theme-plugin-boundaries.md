# Theme / Plugin Responsibility Boundary

Status: PROPOSED (architecture policy, not yet implemented). Grounded in constitution Commerce Principle 7 ("Maintain a clear theme/plugin responsibility boundary") and HTML-to-Sage Principle III/IV.

## The rule

**If it's business logic, persistence, or an external integration, it belongs in `got-commerce` (plugin). If it's presentation, it belongs in `got-sage` (theme).** A WooCommerce or Sage update must never be able to silently break checkout, wishlist, or site-mode logic — that's only guaranteed if that logic doesn't live in theme files, which get swapped/upgraded independently of business rules.

## Decision table

| Concern | Theme (`got-sage`) | Plugin (`got-commerce`) | Why |
|---|---|---|---|
| Blade views, partials, layouts | ✅ | — | Pure presentation. |
| Design tokens, Tailwind config, CSS | ✅ | — | Pure presentation. |
| Alpine.js interaction islands (gallery, drawer, toggle) | ✅ | — | Client-side UX behavior with no persisted business state. |
| ACF Block registration (editorial sections) | ✅ | — | Editorial content is theme-owned per HTML-to-Sage Principle III; these blocks never model commerce data. |
| WooCommerce template overrides (`resources/views/woocommerce/*`) | ✅ | — | Presentation of WooCommerce data — reads from WooCommerce, writes nothing itself. |
| Site Mode **flag storage + guard + activity log** | — | ✅ | Business rule (product-count guard) + audit trail = business logic, must survive a theme swap. |
| Site Mode **template branching** (which homepage to render) | ✅ (reads the plugin's public getter) | — | Presentation decision based on a plugin-owned fact. |
| Early-access signup validation, consent logging, double opt-in, email-tool sync | — | ✅ | Business logic + external integration + PII handling. |
| Early-access **form markup** | ✅ | — | Presentation; submits to a plugin-registered endpoint. |
| Checkout business-rule service (stock/shipping/coupon/total computation, order creation) | — | ✅ | The single most important boundary in the project — constitution Principle 5 requires one authoritative calculation path; it cannot live in swappable theme code. |
| Checkout **form markup** (both standard and, if approved, inline PDP) | ✅ | — | Two presentations, one shared plugin service underneath. |
| Wishlist persistence (guest reconciliation, auth storage, merge-on-login) | — | ✅ | Cross-device/account business logic. |
| Wishlist **heart icon, wishlist page layout** | ✅ | — | Presentation; calls plugin-registered endpoints. |
| Promotion/BOGO eligibility calculation (if approved, see ADR 0009) | — | ✅ | Business logic — must be server-authoritative, never a CSS/JS-only badge. |
| Promotion **badge rendering** (`Badge`, `OfferBlock`) | ✅ | — | Presentation of a plugin-computed eligibility flag. |
| Order tracking lookup endpoint (rate-limited, non-enumerating) | — | ✅ | Security-sensitive business logic. |
| Order tracking **page layout** | ✅ | — | Presentation. |
| Admin settings screens (Site Mode, Early Access config, any plugin setting) | — | ✅ | Settings are business configuration, registered by the plugin so they survive a theme change. |
| Custom REST endpoints (`/api/v1/*`) | — | ✅ | All custom endpoints, with explicit `permission_callback`s, live in the plugin. |
| Security helpers (nonce verification wrappers, rate-limit helper, honeypot check) | — | ✅ | Shared across every custom form; centralizing in the plugin avoids duplicated/divergent security logic across theme files. |

## Consequence of this boundary

- Deactivating `got-sage` and activating a different theme (hypothetically) would **not** lose Site Mode state, subscriber records, wishlist data, or the ability to place orders — only the presentation would break, which is the expected/desired failure mode.
- Deactivating `got-commerce` would **not** take down basic page rendering (visitors would just lose Site Mode switching, early access, wishlist, and inline-checkout-specific features) — WooCommerce's own native cart/checkout keeps functioning via the theme's WooCommerce template overrides, because those overrides call WooCommerce core directly, not the plugin.
- This boundary also directly satisfies the constitution's "regression prevention" governance clause: visual/theme changes and business-logic changes become independently testable and independently deployable.

## What this boundary explicitly forbids

- No Blade partial directly queries `$wpdb` for order/subscriber/wishlist data — it calls a plugin-exposed PHP service/helper.
- No plugin file contains Tailwind classes, inline styles, or Blade markup — plugin-rendered output (e.g. transactional email HTML) uses its own minimal, versioned templates, not shared theme views, so the plugin has zero dependency on the active theme being `got-sage`.
- No "quick fix" that reaches across the boundary for convenience (e.g. a theme functions.php snippet that creates a WooCommerce order directly) — if a theme-side feature needs new business logic, it is added to the plugin, even if that means a few extra minutes of ceremony.
