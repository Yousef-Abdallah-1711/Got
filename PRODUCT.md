# GØT — PRODUCT.md

> Product blueprint | Version 1.0 | 2026-10-08 | Status: proposed implementation specification
> Source of truth: `GOT-Store-PRD.md`; supplementary inventory: `Pasted text(20261008-145405).txt`; identity: `GOT_Complete_Brand_Identity.md`. In case of conflict, the approved PRD and subsequent written owner decisions prevail.

## 1. Product identity and vision

**GØT / GOT® STREETWEAR** is an Alexandria-based, pre-launch streetwear label established in 2026. Positioning: **NOT FOR EVERYONE**, **FORGED TO BE DIFFERENT**, **BORN TO BE DIFFERENT**, and **MORE THAN JUST A HOODIE**. The website must feel like a distinct fashion label, not a generic marketplace. Initial release is **DROP 01**; release date, products, prices and quantities remain unconfirmed.

**Product mission:** convert packaging QR scans and social visitors into consenting early-access subscribers before launch, then convert visitors into confident direct buyers with a reliable mobile-first storefront. Do not fabricate scarcity, reviews, product properties, delivery promises or release dates.

**Primary users:** mobile streetwear buyers in Egypt; early-access subscribers; store operator; content editor. **Primary locale:** English; currency EGP; delivery Egypt. Arabic/RTL planned later, but engineering must be RTL-ready now.

## 2. Fixed implementation decisions

- Server-rendered **WordPress 6.x + WooCommerce + Roots Sage 10 + Acorn + Blade + Vite + Tailwind CSS**; Alpine.js for small interactive islands; MySQL/MariaDB; PHP 8.2+ subject to compatibility validation.
- **Not headless**; no Next.js or generic SPA, no page builder replacing theme templates.
- WordPress/WooCommerce is the authority for products, prices, stock, tax, shipping, discounts and orders. Never trust browser-calculated totals.
- Dark/light via semantic CSS tokens and `html[data-theme]`; first load honors stored choice, then OS preference, then dark fallback. Persist under `got-theme` when available; avoid theme flash.
- Coming Soon / Store controlled by an authorized admin setting with audit trail and cache invalidation, no deployment required.
- Cash on Delivery at launch; online gateways deferred to v2 pending approval.
- Use WooCommerce HPOS-compatible APIs; custom behavior in small dedicated plugin/mu-plugin when business-critical, not theme-only storage.
- Plugin budget: at most 15 third-party plugins for v1, subject to audit.

## 3. Scope and release gates

| Priority | Deliverables | Release requirement |
|---|---|---|
| P0 | Site-mode switch; dark/light parity; catalog; product variations; cart; COD checkout; double-opt-in early access | All must pass before public store launch |
| P1 | Account/order history; order emails and tracking; basic search; wishlist; verified reviews; brand/policy pages; consent-aware analytics | Target v1 according to PRD schedule; any unfinished feature needs explicit release decision |
| P2 | Arabic/RTL content; recently viewed; shipping threshold; back-in-stock; optional floating WhatsApp | Post-launch or explicit approval |
| P3/v2 | Payment gateways; comparison; wallet/loyalty; marketplace; mobile app; advanced CRM; advanced personalization | Do not silently implement |

The attached e-commerce checklist is a **feature inventory, not a commitment to build everything**. Enterprise features such as subscriptions, multi-vendor, wallets, AI chatbot, multi-currency and voice search are not v1 requirements.

## 4. Information architecture and routes

**Pre-launch:** `/` Coming Soon, `/early-access/`, `/about/`, `/contact/`, `/faq/`, `/privacy-policy/`, `/terms-and-conditions/`, `/cookie-policy/`; links to socials. Do not leak unapproved product pages via navigation, indexing or QR destination.

**Store:** `/`, `/shop/`, `/product-category/{slug}/`, `/product/{slug}/`, `/cart/`, `/checkout/`, `/checkout/order-received/{id}/` (WooCommerce-secured), `/my-account/` (login, register, orders, view-order, edit-account, edit-address), `/wishlist/` (P1), `/track-order/` (P1), `/search/` or WordPress search route (P1), `/about/`, `/contact/`, `/faq/`, `/shipping-policy/`, `/returns-exchanges/`, `/privacy-policy/`, `/terms-and-conditions/`, `/cookie-policy/`, `/early-access/`, 404 and service-error states.

**Navigation:** GØT logo, Shop, Drops/Collections (only if published), About, Search, Account, Cart/count, theme toggle. Wishlist only when delivered. Do not show currency, compare, brand directory, marketplace seller or location selector without an actual supported function.

## 5. End-to-end flows and acceptance contracts

### F01 — Coming Soon and early access
1. Visitor arrives via social or packaging QR → sees identity and DROP 01 status without invented date.
2. Enters email, optionally first name/WhatsApp, actively checks marketing consent → submit.
3. Server validates and rate-limits, records exact consent wording/time, sends confirmation link (48h validity).
4. Pending user sees check-inbox state; confirmed user receives success; duplicates handled idempotently; unsubscribe available.
5. Email provider outage queues retry without silently losing the sign-up. No marketing before confirmed opt-in.

**AC:** keyboard and screen-reader operable; no duplicate subscribers; no third-party marketing call without consent; unconfirmed records removed according to retention policy; generic responses where needed to prevent enumeration.

### F02 — Mode switch
Authorized operator selects mode; Store mode requires at least one published, in-stock product; record actor/time; purge relevant caches; verify public response. Switching back to Coming Soon must not accidentally expose checkout through hidden links or search engines; PRD currently permits direct store URLs in Coming Soon mode, **owner must approve this exposure policy before implementation**. Keep `/early-access/` reachable for at least 30 days after switch.

### F03 — Browse, search and discover
Catalog loads 12 products per desktop page / 8 per mobile page, with Load More, category and size filters, sort newest/price asc/price desc. URL encodes filters; back/forward works. Product cards show approved photography, name, EGP price and truthful NEW/SOLD OUT badge. P1 search covers title/SKU/category. Empty, loading, no-match and offline/error states are mandatory.

### F04 — Product detail and variations
Show real gallery, accurate name/description, size/color, variation-dependent price, verified stock, size guide if approved, quantity 1–10 capped by stock, clear delivery/returns links, accessible selection. Sold-out variation is visible but unavailable. Add to cart only after valid selection; show confirmation in cart drawer. Never claim unverified fit, fabric, material or availability.

### F05 — Cart
Mini cart and full cart share WooCommerce session state; edit quantities, remove, apply/remove coupon, see verified subtotal and shipping/tax disclosure, proceed to checkout. Server recalculates after any update. Detect changed prices, stock conflicts and expired coupons. Guest cart retention target: 14 days subject to privacy/session behavior; account cart merges safely without duplicate variation lines.

### F06 — COD checkout
Guest or logged-in; name, Egyptian mobile, email, governorate, city, street, building/apartment, optional alternate address and notes; show supported shipping fee and full EGP total. Confirm policy acknowledgment; place order once using server-side idempotency; decrement inventory exactly once, create WooCommerce order, email confirmation, show order number and safe tracking path. Validate Egyptian mobile formats `01[0125]XXXXXXXX` and `+20 1[0125]XXXXXXXX` after normalization. On failure preserve cart and inputs; never show success until order is persisted.

### F07 — Account, tracking, reviews, wishlist (P1)
- Registration/login/logout, reset token expiring after 60 minutes and one-time use, account details, addresses and own orders only.
- Track order requires matching order number and billing email; identical generic failure for invalid combinations, with rate limiting.
- Wishlist authenticated persistence; guest behavior must be reconciled with PRD (guest temporary list vs logged-in-only P1).
- Reviews only for delivered-order verified purchasers; moderation before publishing; no invented star ratings.

## 6. Component behavior matrix

| Component | Default | Loading | Empty | Error | Success / special |
|---|---|---|---|---|---|
| Early access | Email + consent | Submit disabled + progress | — | Inline + retry | Pending-confirmation and confirmed |
| Catalog | Grid and filters | Skeleton matching card dimensions | No products / no matches | Retry + fallback | Filter chips + URL sync |
| Product | Gallery + variations | Image placeholders | Unavailable variation | Preserve selections | Add-to-cart confirmation |
| Cart | Items + totals | Item-level busy state | Empty cart CTA | Revalidation error | Totals refreshed |
| Checkout | Form + summary | Submission in progress | Empty cart redirect | Field / stock / server errors | Verified order confirmation |
| Search | Query and results | Results skeleton | Suggestions / no matches | Retry | Result count announced |
| Account | Secure private data | Skeleton | No orders | Generic auth/network error | Saved confirmation |

## 7. Data and integration contracts

- **WooCommerce:** products, variations, categories, media, inventory, coupons, taxes, shipping zones, customers, HPOS orders and status events.
- **Early access:** subscriber ID, normalized email, optional name/phone, status `pending|confirmed|unsubscribed|sync_pending`, consent text/version/time, confirmation expiry, provider sync status; minimize retention and log access.
- **Site settings:** `site_mode`, mode-change actor/time, announcement content, approved drop details, social links, approved WhatsApp destination, policy revision metadata.
- **Email provider:** double opt-in, transaction and marketing separated; retry/backoff, webhook signature verification when available; idempotent sync.
- **Analytics:** consent-gated GA4/GTM/Meta as approved; view_item, add_to_cart, begin_checkout, purchase (one event per order); exclude personal information from analytics payloads.
- **Payments:** COD only in v1. Future gateways require signed webhook verification, idempotency and server-side order-state reconciliation.
- **CRM:** optional future integration only, not implied by feature inventory; map data and legal basis before enabling.

## 8. Security, privacy and resilience

- HTTPS, secure cookies, CSRF/nonces, escaping and sanitization, capability checks on every admin action, object-level authorization on order/account endpoints.
- Never expose WooCommerce admin credentials, email API keys, personal addresses, payment secrets or subscriber lists in HTML/JS/repository.
- Rate limit sign-ups, login, reset, tracking and checkout; protect against enumeration, spam and duplicate submissions.
- Admin/shop-manager MFA, least privilege, dependency updates, vulnerability scans, secure backups and restore drills.
- Do not cache personalized cart/checkout/account HTML publicly; avoid cache poisoning and stale stock/prices.
- Consent-aware analytics and lawful privacy/retention policy with legal review; explicit unsubscribe and export/deletion process.
- Errors should not leak stack traces or customer data. Monitor order failures, email delivery and stock conflicts.

## 9. Non-functional targets

| Area | Target |
|---|---|
| Mobile LCP | < 2.5 s at p75 |
| INP | < 200 ms at p75 |
| CLS | < 0.1 |
| Cached TTFB | < 200 ms target |
| Checkout server response | < 2 s p95 target |
| Accessibility | WCAG 2.1 AA minimum, both themes |
| Mobile tap targets | 44 × 44 px minimum |
| Layout | 360–1920 px; RTL-ready logical properties |
| Uptime | 99.9% monthly target |
| Backups | Daily; 30-day retention; restore-tested |
| Scale | Initial <=100 products; design for 1,000; drop-day spikes tested |

Performance is measured on representative devices and real/realistic network profiles, not asserted from development screenshots.

## 10. Execution plan and quality gates

1. **Foundation:** requirements reconciliation, identity assets, domain verification, environments, Sage, WooCommerce, tokens, mode switch, early access, accessibility primitives.
2. **Commerce:** catalog, filters, PDP, variations, cart, shipping, COD checkout, inventory concurrency, confirmation emails.
3. **Customer and content:** account, tracking, search, wishlist/reviews if approved, policies, consent, analytics, SEO.
4. **Hardening:** device/browser QA, security checks, load tests including drop spikes, backup restore, email deliverability, staging-to-production rehearsal.

Every feature needs documented user story, acceptance criteria, integration owner, empty/loading/error states, keyboard support, both-theme screenshots, automated tests and manual mobile QA. Never declare complete based only on a rendered UI. Test real WooCommerce order creation and inventory effects in a safe staging environment.

## 11. Open decisions — do not guess

- Domain `gøteg.com` and its ASCII/Punycode DNS equivalent, ownership and canonical HTTPS host require verification.
- Approved SVG/AI master logo, exact brand colors, typography licensing and legal rights.
- Drop 01 date, products, prices, quantities, shipping fees, return windows and size guide.
- Whether direct shop/cart URLs are public in Coming Soon mode.
- Email marketing platform, hosting region, privacy/legal text, support hours, approved social URLs.
- Whether P1 is mandatory for first public drop or released afterward; wishlist guest behavior; admin permission for mode switching.
- Any payment provider or CRM integration is explicitly future scope unless owner signs off.

## 12. Source traceability

- PRD sections 1–7: identity, scope, priority, functional flows and acceptance criteria.
- PRD sections 8–17: non-functional constraints, architecture, phases, risk, approvals.
- Feature inventory sections 1–21: broad checklist for future discovery, not a v1 promise.
- `DESIGN.md`: visual and interaction specification; defer to this file for token/component details.
