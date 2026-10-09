# GØT — DESIGN.md

> Complete UI/UX and visual-system specification | v1.0 | 2026-10-08
> Companion to `PRODUCT.md` and `GOT-Store-PRD.md`. Design direction is derived from supplied packaging and logo imagery; **proposed tokens are not officially approved brand standards**.

## 1. Creative direction

**Art direction:** editorial streetwear, underground luxury, monochrome industrial, forged metal, disciplined typography, deliberate negative space. Identity should feel sharp, rare and self-assured rather than loud, cluttered or conventionally “premium”. Reference cues: black mailer with white sword monogram, matte black shopping bags, dark rigid gift boxes, silver keychain, circular QR tags.

**Core lines:** `GØT`, `NOT FOR EVERYONE`, `FORGED TO BE DIFFERENT`, `BORN TO BE DIFFERENT`, `MORE THAN JUST A HOODIE`, `DROP 01 — COMING SOON`. Treat each as a distinct approved/observed message; don't invent a longer brand story.

**Non-negotiable:** strong typography and photography do the work. Avoid generic gradients, glassmorphism, glowing neon, endless rounded cards, emoji iconography, fake scarcity, stock model imagery and animation for its own sake. Metallic texture is an *art-direction detail*, not a noisy universal background.

## 2. Brand marks and assets

- Primary: supplied **GØT sword monogram**; sword vertically bisects/anchors the wordmark and diagonal slash crosses the Ø. Reproduce only from approved vector master; **do not reconstruct or redraw from raster as a production logo**.
- Secondary: standalone sword mark, only if brand owner approves and provides master asset.
- Wordmark text: `GØT` with U+00D8, not plain `GOT` in visible branding; ASCII `GOT` acceptable in filenames and accessibility descriptions.
- Use white/silver logo on dark surfaces and near-black logo on light surfaces; never put a black logo on black or white on white.
- Clear space: provisional minimum 0.5× logo height on all sides; verify with brand owner. Never stretch, skew, apply gradients, glow or excessive drop shadows.
- Small UI icon: simplify only via an owner-approved small-size asset; intricate sword should not become illegible at 16 px.
- Photography: high-contrast studio/editorial with honest garment color and texture; product photos must be actual merchandise, not AI mockups. Packaging imagery may support storytelling but must not imply product contents.
- QR: retain quiet zone and test scanning on print and mobile; accessible fallback text link always accompanies QR.

## 3. Color system — semantic, dual theme

### Palette

| Role | Dark | Light | Usage |
|---|---|---|---|
| `--got-bg` | `#080808` | `#F2F2F0` | App canvas |
| `--got-surface` | `#111111` | `#FFFFFF` | Header, cards, panels |
| `--got-surface-2` | `#202020` | `#E6E6E4` | Input / elevated inset |
| `--got-border` | `#303030` | `#D0D0CE` | Rules and dividers |
| `--got-text` | `#F2F2F0` | `#080808` | Main content |
| `--got-text-muted` | `#A3A3A3` | `#555555` | Secondary content |
| `--got-accent` | `#BFC0C2` | `#3A3A3C` | Metallic / focus accent base |
| `--got-logo` | `#FFFFFF` | `#080808` | Logo |
| `--got-cta-bg` | `#F2F2F0` | `#080808` | Primary action |
| `--got-cta-text` | `#080808` | `#F2F2F0` | Primary action label |

These are sourced from the supplied PRD, not measured official production ink colors. `#777777` is a decorative steel gray only, **not** default small text. Validate all text, border, focus and state pairings with an automated contrast checker; do not assume a palette token itself guarantees compliance.

### Recommended implementation

```css
:root, html[data-theme="dark"] {
  color-scheme: dark;
  --got-bg: #080808; --got-surface: #111111; --got-surface-2: #202020;
  --got-border: #303030; --got-text: #F2F2F0; --got-text-muted: #A3A3A3;
  --got-accent: #BFC0C2; --got-logo: #FFFFFF;
  --got-cta-bg: #F2F2F0; --got-cta-text: #080808;
}
html[data-theme="light"] {
  color-scheme: light;
  --got-bg: #F2F2F0; --got-surface: #FFFFFF; --got-surface-2: #E6E6E4;
  --got-border: #D0D0CE; --got-text: #080808; --got-text-muted: #555555;
  --got-accent: #3A3A3C; --got-logo: #080808;
  --got-cta-bg: #080808; --got-cta-text: #F2F2F0;
}
body { background: var(--got-bg); color: var(--got-text); }
```

Add semantic aliases for `--color-link`, `--color-focus`, `--color-error`, `--color-success`, `--color-warning`, `--color-disabled`, `--color-overlay`, `--color-input-bg`, `--color-on-image`, `--color-skeleton`, and `--color-selection`; **choose and contrast-test** these per theme before shipping. Do not force every semantic status into silver; clear error/success recognition matters. Never communicate state through color alone.

### Theme preference contract

Read `got-theme` before first paint; valid manual choice overrides OS preference; otherwise follow `prefers-color-scheme`; dark fallback when unavailable. Toggle has dynamic accessible name and state; system changes can update theme only if no manual override. Handle blocked storage gracefully. No light-to-dark flash, no mismatched native form controls, no images/logos disappearing. Theme applies to WordPress notices, WooCommerce widgets, emails preview (where appropriate), cart, checkout, auth and overlays.

## 4. Typography and editorial hierarchy

**Proposed stack from PRD:** Inter Tight for large headlines, Inter for UI/body, IBM Plex Mono for release identifiers and micro-labels. Self-host licensed files, subset responsibly, preload only truly critical weights, use `font-display: swap`. A proprietary logo is not recreated using fonts. Arabic requires a separately approved Arabic typeface with comparable rhythm when localization launches.

| Style | Desktop | Mobile | Weight / leading | Treatment |
|---|---|---|---|---|
| Display hero | clamp(3.5rem, 8vw, 8rem) | clamp(2.75rem, 12vw, 4.75rem) | 600–700 / 0.92–1.02 | Tight tracking, short lines |
| H1 page | clamp(2.75rem, 5vw, 5.5rem) | 2.5–3.5rem | 600 / 1.05 | Editorial |
| H2 section | clamp(2rem, 3.5vw, 4rem) | 1.8–2.5rem | 600 / 1.1 | Minimal |
| H3/card | 1.25–1.75rem | 1.125–1.5rem | 500–600 / 1.2 | Product hierarchy |
| Body | 1rem–1.125rem | 1rem | 400 / 1.5–1.65 | Readability |
| Small | 0.875rem | 0.875rem | 400–500 / 1.45 | Never tiny critical copy |
| Eyebrow | 0.75–0.875rem | 0.75rem | 500 / 1.3 | Mono, uppercase, tracking |

Use uppercase selectively for headlines, drop identifiers, buttons and navigation; do not uppercase paragraphs. Avoid justified text, artificial letter spacing on Arabic, and text baked into images. Ensure minimum readable sizes and 200% zoom without clipping.

## 5. Grid, spacing, dimensions

- 4 px spacing unit; spacing tokens: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 px. Favor 24/32/48/64 in editorial compositions.
- Max content width 1440 px; text max width 65–72ch; standard page gutters 20 px mobile, 32 px tablet, 48–72 px desktop.
- Breakpoints (proposed): 360–639 mobile, 640–1023 tablet, 1024–1439 desktop, >=1440 wide. Design fluidly, not by device-specific hacks.
- Grid: 4 columns mobile, 8 tablet, 12 desktop; catalog 2 / 3 / 4 columns depending on usable width, never make cards too narrow.
- Header height target 64–72 px mobile, 76–88 px desktop; no excessive fixed chrome. Content may be asymmetrical editorially, but controls and product grids remain predictable.
- Radius: mostly 0–4 px for controls and cards; pill only for intentionally small tags. Border 1 px; avoid thick boxes around every section.
- Product images: consistent 4:5 portrait ratio for listing, flexible high-resolution gallery for PDP. Prevent layout shift via aspect-ratio and explicit dimensions.
- Full-bleed visual sections may use 16:9 desktop and 4:5 or 3:4 mobile art direction; provide separate crops and safe text areas.

## 6. Component design contracts

| Component | Visual rule | Interaction / states |
|---|---|---|
| Announcement bar | Compact, mono drop status; never perpetual flashing ticker | Dismiss only if meaningful; no unconfirmed countdown |
| Header | Minimal logo/nav, utility icons, strong baseline | Sticky after scroll if useful; keyboard nav; mobile menu trap/restore focus |
| Primary CTA | Solid inverse high-contrast rectangle, strong label | Hover inversion/underline; focus ring; disabled; loading; pressed |
| Secondary CTA | Outline or editorial text link with arrow | Underline/focus; sufficient hit target |
| Theme toggle | Sun/moon icon + accessible label | Persist, no flash, supports keyboard |
| Product card | Large image, quiet info, price/stock truth | Hover alternate image only if available; wishlist P1; no hover-only actions |
| Size selector | Segmented/radio buttons, not unlabelled chips | Selected, focus, unavailable, error, price change |
| Color selector | Swatch + visible name | Selected ring, keyboard, never color-only meaning |
| Quantity | Stepper + numeric readout | Enforce 1..min(10, stock); announce changes |
| Cart drawer | Edge-aligned high-contrast panel | Escape, focus trap, return focus, scroll lock, close |
| Filters | Desktop sidebar or top rail; mobile bottom sheet/drawer | Applied count, clear all, URL state, focus handling |
| Inputs | Visible label above field, subtle border, ample padding | Focus, filled, invalid, disabled, success; errors text + aria |
| Toast / notice | Quiet, high-contrast and non-blocking | aria-live; never sole confirmation for an order |
| Modal | Minimal surface, strong title and close affordance | Focus trap, Escape, no nested modal stack |
| Skeleton | Stable geometry, low-contrast neutral blocks | Reduced-motion friendly; no infinite busy state |
| Footer | Brand manifesto + navigation/policies/social | Consent settings always discoverable |

For **every** component document default, hover, focus-visible, active, disabled, loading, error, success, empty and dark/light behavior where relevant. Hover is never the only path to functionality.

## 7. Page-by-page visual blueprints

### 7.1 Coming Soon — primary prelaunch experience

**First viewport:** nearly-black editorial canvas, approved sword mark as focal anchor, eyebrow `EST. 2026 / ALEXANDRIA`, huge `NOT FOR EVERYONE` or `FORGED TO BE DIFFERENT`, smaller `DROP 01 — COMING SOON`, email capture with one strong CTA `GET EARLY ACCESS`. Minimal navigation: logo, theme toggle, social links. The goal is one decisive action, not a fake full catalog.

**Below fold:** short brand statement (approved copy only), cropped packaging detail or real product teaser only when authorized, what signing up means, privacy reassurance, footer. No fabricated launch timer, price, inventory, press mentions or testimonials. Use genuine supplied packaging images sparingly. Success and check-email state replace the form cleanly. Mobile: logo and CTA visible early; form full width, 44+ px controls; avoid giant hero pushing form several screens down.

**Light mode:** warm off-white canvas, black logo/text, grayscale imagery with intentional dark photographic band; same editorial personality, not a generic white SaaS landing page.

### 7.2 Store homepage

Editorial hero featuring approved drop/product imagery and a single Shop Drop CTA; concise drop label; collection/new arrivals module; selective featured product grid; two-column brand manifesto with close-up material/packaging photo; newsletter opt-in; FAQ or shipping reassurance if accurate; restrained footer. Do **not** include every generic e-commerce widget from the feature inventory. Prefer fewer intentional modules, fast load and strong storytelling.

### 7.3 Shop / category

Large collection title, compact product count, category tabs, sort and filter access, consistent product grid, informative sold-out states, load-more control, no-results recovery. Desktop 4-up when space allows; mobile 2-up. Filters preserve URL; don't reset scroll unnecessarily. Light/dark image backgrounds should not alter the perceived garment color.

### 7.4 Product detail

Desktop split: gallery 55–60% and purchase column 40–45%, sticky purchase details only while usable. Mobile: swipeable gallery first, title/price, size/color options, size guide, shipping summary, Add to Cart; optional sticky mobile CTA that never hides forms or cookie notice. Image zoom, clear variation state, real stock messaging, accordions for approved details/care/shipping, related products only if catalog supports it.

### 7.5 Cart and mini cart

Editorial but utilitarian: clear image, variation, unit price, quantity, remove, discount and order summary. Empty state has a genuine return-to-shop CTA. Cart drawer should show full totals or clear link to cart; never obscure a validation failure. Recalculate on server and show price/stock changes prominently.

### 7.6 Checkout

Reduce distractions; compact checkout header with logo and secure-order context, no unrelated promotional carousel. Desktop form + sticky order summary; mobile linear single-column form with grouped sections and explicit shipping costs. Inline validation, EGP totals, COD explanation, clear place-order action, retry-safe pending state. Avoid dark-on-dark input controls; autocomplete and mobile keyboard types must be correct. Confirm order only after verified server response.

### 7.7 Order confirmation / tracking

Large but restrained confirmation headline, order reference, status, items, shipping destination summary (private), payment method and next steps. Tracking uses a clear chronological list with timestamp and current step; distinguish order received vs shipped vs delivered. Don't invent tracking numbers or carrier.

### 7.8 Account and authentication

Minimal sign-in/register with legible labels and password assistance; account dashboard with orders, addresses, details and wishlist only if enabled. Desktop compact left navigation, mobile stacked navigation. Avoid unnecessary charts, fake wallet balances or badges. Empty-order state and auth errors are carefully written and accessible.

### 7.9 Search and wishlist

Search overlay or dedicated page with prominent input, clear button, keyboard escape and real results; empty query suggests shop. Wishlist uses the same product-card language, guest ID persistence, and live stock checks before cart addition; authenticated sync and merge use the protected WooCommerce account service.

### 7.10 About / Contact / FAQ / Policies / 404

About: short manifesto, brand origin facts, packaging photography, editorial typography; never fabricate founder story or material claims. Contact: approved email/WhatsApp/social and accessible form if built. FAQ: categorized accordion with concise real answers. Policies: comfortable reading width, table of contents for long pages, effective dates, real legal text. 404: concise brand-aligned line and clear route back to Shop or early access depending on site mode.

## 8. Motion and micro-interactions

Motion should feel **precise and mechanical**, not playful. Default durations: 120–180 ms for controls, 200–320 ms for panels, 400–600 ms for one-time editorial reveals; easing `cubic-bezier(.2,.7,.2,1)` as a starting point. Prefer opacity/transform to layout animation. Do not animate critical checkout totals, create infinite reveal loops or use scroll hijacking. Respect `prefers-reduced-motion: reduce` by disabling nonessential motion and parallax. All controls work without animation.

## 9. Accessibility and interaction quality

- WCAG 2.1 AA minimum; target WCAG 2.2 AA where feasible. Text contrast >=4.5:1 normal and >=3:1 large; UI indicators and focus boundaries >=3:1 against adjacent colors.
- Semantic headings in order, landmarks, visible skip-to-content link, meaningful labels and descriptions, keyboard-operable controls, consistent tab order.
- Visible 2+ px focus ring, not `outline: none` without a replacement. Touch target >=44 × 44 px per PRD.
- Error text beside relevant field plus summary on submit; use `aria-describedby`, `aria-invalid`, and appropriate live regions. Do not rely solely on red.
- Accessible cart drawers and dialogs: trap focus, Escape to close, restore focus, announce cart updates without interrupting typing.
- Support 200% zoom, narrow viewport and long text; avoid horizontal scroll except intentionally scrollable galleries/tables.
- RTL-ready logical properties and icon mirroring decisions; avoid hardcoded left/right. Arabic content is out of scope for v1.

## 10. Responsive and theme QA matrix

Test widths **360, 390, 768, 1024, 1440, 1920 px** in both themes. At each width test Coming Soon, homepage, shop, PDP, cart, checkout, account, search, policies and 404; also modal/drawer, empty, error, loading and success states. Test keyboard-only, screen reader, 200% zoom, reduced motion, browser back, theme reload and form autocomplete. Capture approved reference screenshots before visual implementation; compare against them after each phase.

**Visual defects to reject:** clipped headings, misaligned grids, floating buttons obscuring checkout, faint muted text, inconsistent corner radii, unrelated accent colors, awkward image crops, tiny tap targets, layout shift, contrast failures, light-mode-only defects, and inaccessible dark-mode inputs.

## 11. Performance and production constraints

Use responsive `<picture>`/`srcset`, modern formats where supported, accurate `sizes`, reserved image ratios and lazy loading below fold. Do not lazy-load the LCP hero. Self-host/subset fonts, minimize JS, defer noncritical assets, cache public pages without caching private/cart state, use CDN appropriately. Avoid autoplay background video by default; if approved, provide poster, muted playback, reduced-motion static fallback and data-saving behavior. Targets from PRD: mobile LCP <2.5 s, INP <200 ms, CLS <0.1, homepage mobile transfer <1 MB excluding video.

## 12. Sage / Blade implementation map

```text
resources/
  css/tokens.css                 # semantic theme variables
  css/app.css                    # Tailwind + global primitives
  js/app.js                      # minimal Alpine setup
  views/layouts/app.blade.php
  views/partials/header.blade.php
  views/partials/footer.blade.php
  views/partials/theme-toggle.blade.php
  views/partials/early-access-form.blade.php
  views/components/               # buttons, fields, product cards, notices
  views/sections/                 # hero, manifesto, featured collection
  views/woocommerce/              # WooCommerce-compatible template overrides
app/
  Support/SiteMode.php
  Providers/ThemeServiceProvider.php
```

Build reusable tokens and primitives **before** page-specific styling. Use CSS variables consumed by Tailwind utilities. Preserve WooCommerce semantics and hooks; validate plugin/theme compatibility rather than overriding every template indiscriminately. Maintain no-JS fallback for critical purchasing flows where practical.

## 13. Copywriting rules

Voice: short, assertive, selective, cinematic; never arrogant toward customers. Labels must remain clear: `SHOP DROP 01`, `SELECT SIZE`, `ADD TO CART`, `CHECKOUT`, `GET EARLY ACCESS`. Use branded lines for storytelling, not as substitutes for functional labels. Error messages are plain and actionable, not mysterious. No fake scarcity, unsupported quality claims or AI-generated customer reviews. Currency always `EGP` or approved `ج.م` convention, consistent across cart/checkout/email.

## 14. Design acceptance gates

- [ ] Approved vector mark available and legible in dark/light, mobile and favicon contexts
- [ ] Semantic token audit completed for all backgrounds, text, borders, focus and statuses
- [ ] Every major component has interactive state coverage in both themes
- [ ] Coming Soon communicates brand and sign-up action within first mobile viewport
- [ ] Store homepage prioritizes real products and deliberate editorial composition
- [ ] Product variants, stock and price changes are unambiguous
- [ ] Checkout passes real guest COD flow without duplicate orders
- [ ] No content overlap, horizontal overflow or tap-target failures at test widths
- [ ] Keyboard, screen-reader, contrast, reduced-motion and zoom QA passed
- [ ] Performance budgets checked against representative mobile hardware
- [ ] All marketing claims, images, dates and policies approved by brand owner

## 15. Approval-needed items

Official logo source/rights, image licenses, typography licensing, exact brand color sign-off, final hero photography, launch/drop timing, products and size guide, approved legal copy, confirmed social URLs and canonical domain. These must not be silently filled with generated assets or placeholder claims in production.

## 16. Relationship to product specification

`PRODUCT.md` controls feature scope, workflows, integrations, data/security and release decisions. `DESIGN.md` controls UI tokens, visual hierarchy, responsive composition and interaction details. If an artistic idea harms usability, accessibility, truthful commerce or performance, the product/accessibility requirement wins. Use the supplied PRD for traceability; the broad e-commerce checklist is future ideation only.


## 17. v1.1 — Accent system, two-layer header, motion (proposed)

**Colour conflict (needs approval):** the brand identity document defines a monochrome palette with brushed-silver accent (~75/20/5). Acid Lime #C2FF3D is a *proposed* accent and is not an approved brand colour. It is implemented behind a token so it can be reverted: `html[data-accent="silver"]` restores silver (toggle "Lime accent" in the UI kit bar).

**Tokens**
| Token | Dark | Light |
|---|---|---|
| --got-bg | #080808 | #F4F4F1 |
| --got-surface | #141414 | #FFFFFF |
| --got-surface-2 | #202020 | #E9E9E5 |
| --accent (fills) | #C2FF3D | #C2FF3D |
| --on-accent (text on lime) | #080808 | #080808 |
| --accent-ink (accent as text/line) | #C2FF3D | #3D5200 |
| --color-focus | #C2FF3D | #080808 |
Lime is never used as text on light surfaces; light mode uses --accent-ink (olive, ≥7:1 on #F4F4F1).

**Accent usage (≈10%):** primary CTAs, selected size/colour, NEW badge, cart count, active tab/nav underline, collection numbers, one highlighted word in the manifesto, announcement bar, the single lime newsletter band. Nothing else.

**Header:** layer 1 announcement slider (lime; `variant="dark"` fallback), layer 2 centred-logo navigation (Shop · Hoodies · Accessories · About | logo | Search · Wishlist · Account · Theme · Cart). Layer 1 scrolls away; layer 2 is sticky and compacts 80→56px past 80px scroll while keeping its flow footprint (negative margin) so content does not jump. Mobile ≤1023px: menu · logo · search · wishlist · theme · cart; drawer menu includes Account.

**Announcement slider:** 3 editable messages, 4.5s, vertical reveal 380ms, prev/next/pause (44px targets), pauses on hover/focus-within and under reduced motion, aria-live off while auto-playing (polite when paused/held), non-active slides aria-hidden.

**Motion tokens:** --dur-control 150ms · --dur-hover 220ms · --dur-announce 380ms · --dur-panel 280ms · --dur-reveal 500ms · ease --ease-mech cubic-bezier(.2,.7,.2,1). Transform/opacity only; `prefers-reduced-motion` zeroes all.


## 18. Promotions & Wishlist (proposed)
**Promotion badges** (`Badge` tones): NEW (lime fill), SPECIAL OFFER / BUY 1 GET 1 (lime fill, dark text), FREE SHIPPING (truck icon, lime-ink outline), LIMITED DROP (strong outline), LOW STOCK (warning outline, only when stock ≤ configured threshold), SOLD OUT (muted). Priority: availability → main promotion → shipping → new/collection; max **two** on a card image; extras move to the purchase panel. Badges are produced by a promotion layer (`GOT_BADGES`), never hardcoded in cards. Promotion/threshold values in the UI kit are SAMPLE config; WooCommerce/server is authoritative for discounts, shipping and totals.
**Offer block:** only when active + applicable; shows name, benefit, eligibility, applied savings, terms, expiry only if configured. No countdowns.
**Free-shipping incentive:** three states (available / add EGP X more / unlocked) with progress line; hidden if no threshold is configured.
**Wishlist:** heart in header (between Search and Account) with unique-product count (hidden at 0, in the accessible name); card heart is a separate 44px toggle (outline → lime-filled) so it never triggers card navigation; polite live-region announces changes. Identity rule: **parent product ID** is saved (variant is chosen at add-to-cart). Guest = localStorage ID list (no product data); account = server list merged idempotently on sign-in; unavailable products show a "No longer available" row; "Add to cart" re-reads live price/stock and requires option selection when a product has several sizes/colours. Heart motion 150ms; reduced-motion disables.

### 19. Wishlist page and interaction specification

- **Header:** desktop utilities read Search → Wishlist → Account → Theme → Cart. At mobile widths, keep the heart next to Search and Cart in the utility row; Account remains in the menu. The heart is always present and occupies a fixed 44×44 target so the counter never shifts the header. Hide the badge at zero. Use Acid Lime `#C2FF3D` for the selected heart and badge fill with dark badge text. The accessible name includes the count and correct singular/plural form.
- **Heart control:** separate button outside the product-card link; 44×44 minimum touch target, `aria-pressed`, visible focus ring, and an accessible name that includes the product. Outline means not saved; filled Lime means saved. Hover and press use a brief 150ms scale response. Disable nonessential motion under `prefers-reduced-motion`.
- **Wishlist page:** heading `YOUR WISHLIST`; subtitle `THE PIECES YOU SAVED`. Reuse product cards, display current variation/meta and price, availability, eligible promotion badges, View Product, Add to Cart, and Remove from Wishlist. At 360–639px use two columns; 640–1199px three; 1200px and wider four when content width permits. Preserve readable card names and touch targets.
- **Empty state:** outlined heart, `NOTHING SAVED YET`, `Find the pieces that speak to you`, and primary `EXPLORE THE DROP` action to the actual published collection. Keep the content centered in a bounded editorial region rather than leaving a blank page.
- **Clear action:** show only when entries exist. Open a labeled confirmation dialog; focus the first dialog control, trap Tab/Shift+Tab, close with Escape, restore focus to the trigger, and leave saved items untouched on cancel. Storage failure keeps the dialog open and exposes a retryable alert.
- **Persistence and status:** guest storage contains unique canonical parent-product IDs only. Hydrate title, image, current price, color/variation, stock and promotion from the live catalog. Unknown/deleted items remain removable and show an unavailable row. Do not claim an unverified stock state in the preview; use `Availability not connected in this preview` until a verified WooCommerce state is supplied.
- **Feedback and themes:** saving/removing is announced through a polite live region; failures use an assertive alert with Retry. Lime active state and dark-text badge meet contrast requirements in both themes. Header focus rings remain visible against dark and light surfaces. Do not change button or header dimensions as the count changes.
- **Production boundary:** this design kit supports guest storage and synchronization across same-origin browser tabs. Authenticated persistence, cross-device synchronization, and account merge require the protected WooCommerce customer service; do not represent them as implemented until the service confirms writes.

## Preview implementation note — 2026-10-08
Acid Lime `#C2FF3D` is applied in this local design preview at the user's request. This is a preview direction and does not update the pending production brand-approval gate. The local kit suppresses offer, shipping-threshold, and inventory badges unless the incoming state is marked as WooCommerce-sourced and verified. Payment methods, delivery zones, and fees remain unconfirmed until the store configuration is connected. The prototype has no commerce backend.
