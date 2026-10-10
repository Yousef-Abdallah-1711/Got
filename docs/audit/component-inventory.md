# Component Inventory

All 26 components were read in full via their `.d.ts` contracts (source: `GØT Design System (2)/components/{core,forms,feedback,navigation,commerce}/*.d.ts`). Status: VERIFIED for every row below (prop contracts quoted directly from source).

## Core (5)

| Component | Purpose | Key props | Reuse plan note |
|---|---|---|---|
| `Button` | Rectangular uppercase action; primary = solid inverse (max one per view), secondary = outline, ghost, link. | `variant`, `size` (sm 44/md 48/lg 56 px), `fullWidth`, `loading` (spinner + `aria-busy`), `disabled`, `iconLeft`/`iconRight`, `arrow`, `href` (renders `<a>`), `type`, `onClick` | Maps directly to a Blade `<x-button>` component; `loading`/`disabled` states must mirror real async request state server-round-trips, not a fixed timeout like the mock. |
| `IconButton` | 44×44 icon-only control, **label is required** (not optional) — good accessibility discipline to preserve. | `icon`, `label` (required), `count` (badge, announced in label), `variant`, `size` | Used for cart/wishlist/menu triggers in `Header`. |
| `Icon` | Stroke icon from a bundled Lucide subset (substitute for the brand's own sprite). | `name` (closed union of ~31 names), `size` (default 20), `strokeWidth` (default 1.5 — sharper than default Lucide), `label` (omit for decorative) | **Substitution flagged by the design system itself** — must be swapped for the brand's real SVG sprite when supplied (see `missing-assets.md`). |
| `Badge` | Mono uppercase status/promotion tag; "always text — never colour alone"; max two per product image. | `tone`: `'new' \| 'offer' \| 'bogo' \| 'shipping' \| 'limited' \| 'low' \| 'soldout' \| 'outline' \| 'drop'` | The `'offer'`/`'bogo'`/`'shipping'` tones exist in the component contract even though BOGO/free-shipping-threshold are **not in GOT-Store-PRD.md's P0/P1 scope** (free-shipping bar is P2-F003, BOGO isn't scoped at all). See `source-conflicts.md`. |
| `Wordmark` | Supplied transparent sword/wordmark logo | `size`, `alt` | Production theme uses the reusable logo component and optimized WebP derived from the supplied PNG; editable vector master remains open (`missing-assets.md`). |

## Forms (7)

| Component | Purpose | Key props | Reuse plan note |
|---|---|---|---|
| `TextField` | Labeled input, label above, 52px field, message wired via `aria-describedby`. | `label`, `hideLabel`, `hint`, `error` (sets `aria-invalid`), `success`, `optional`, `multiline`, full native input attrs | Directly maps to WooCommerce/Blade form-field partials; server-side validation must populate `error` from real field-level errors, not just client regex. |
| `Select` | Native select styled to brand (used for sort, governorate). | `label`, `hideLabel`, `options` (string[] or `{value,label,disabled}`), `error`, `hint` | Governorate list in the prototype (`Checkout.jsx`/`DirectCheckout.jsx`) is a 4-item hardcoded array (`Alexandria`, `Cairo`, `Giza`, `Other`) — **must be replaced by real WooCommerce shipping-zone data**, not hardcoded in Blade. |
| `Checkbox` | Square checkbox for consent/filters. | `label`, `error`, `checked`/`defaultChecked`, `disabled` | Used for Terms/Privacy consent in both checkouts and the "I agree to receive..." consent checkbox. |
| `QuantityStepper` | −/+ stepper with numeric readout, clamps to `min..max` where `max = min(10, stock)`. | `value`, `min`, `max`, `onChange`, `size`, `label` | The `max = min(10, stock)` contract is already correctly specified here and must be enforced **server-side** too (constitution: never trust client totals/limits). |
| `SizeSelector` | Radio-group size picker; unavailable sizes struck through, never removed. | `sizes` (string[] or `{label,available}`), `value`, `onChange`, `error`, `aside` (e.g. Size Guide link) | Matches PRD P0-F004 AC exactly ("Size option is shown with a strikethrough and cannot be selected"). |
| `ColorSelector` | Swatch + visible color name radio group; "never colour-only." | `colors` (`{name,hex,available?}[]`), `value`, `onChange`, `label` | |
| `EarlyAccessForm` | Coming Soon email capture: email + consent + one CTA with loading/success/error states. | `state` (forced for docs), `onSubmit`, `cta` (default "Get early access") | **No phone/WhatsApp field in the component contract**, but PRD P0-F007 main flow explicitly allows "optional WhatsApp number" — component needs an additional optional field or the PRD's optional field is simply not yet wired into this component. Flagged as a gap in `production-gaps.md`. |

## Feedback (3)

| Component | Purpose | Key props | Reuse plan note |
|---|---|---|---|
| `Notice` | Quiet high-contrast inline notice or toast, `aria-live`; **"never the sole order confirmation"** (explicit rule in the doc comment). | `tone` (`info/success/error/warning`), `title`, `onDismiss`, `toast`, `action` | This rule must be enforced in the real implementation: order confirmation must be a persisted, re-fetchable page (`ThankYou`/order-received URL), never just a toast. |
| `Modal` | Minimal dialog, focus trap, Escape + scrim-click to close. | `open`, `title` (required), `onClose`, `footer`, `contained` | Used for size guide, wishlist "clear all" confirmation, Shop filter panel. |
| `Skeleton` | Stable-geometry loading placeholder; shimmer disabled under reduced motion. | `variant` (`block/text/card`), `width`, `height`, `lines` | |

## Navigation (6)

| Component | Purpose | Key props | Reuse plan note |
|---|---|---|---|
| `Header` | Minimal store header: nav left, wordmark centered, utility icons right, 1px baseline. | `nav`, `cartCount`, `theme`/`onToggleTheme`, `onCart`/`onSearch`/`onAccount`/`onMenu`, `mode` (`store/minimal/checkout`), `layout`, `sticky`, `wishCount`/`onWishlist`, `compact` (56px after scroll) | Three header modes map cleanly to three Blade header partial variants (full nav / Coming-Soon minimal / distraction-free checkout). |
| `AnnouncementBar` | Rotating announcement bar, auto-advances every 4.5s, pauses on hover/focus/Pause button/reduced-motion; **never announces automatic changes to screen readers** (explicit accessibility rule). | `messages`, `variant` (`lime/dark/quiet`), `interval` | `variant="lime"` is the default, consistent with the owner-approved Acid Lime treatment in resolved C-01. Preserve the pause/reduced-motion and screen-reader behavior. |
| `FilterBar` | Category tab rail + count + filter trigger + sort, top of shop/category grids. | `tabs`, `active`, `onTab`, `count`, `sort`/`sortOptions`/`onSort`, `filterCount`, `onFilters` | |
| `Footer` | Brand manifesto + link columns + policies; cookie settings always reachable. | `columns` (`{h, items}[]`), `manifesto` (default "Forged to be different."), `onCookieSettings`, `onLink` | Footer link columns should become native WordPress menus per the HTML-to-Sage global-template-parts rule, not a hardcoded `columns` array. |
| `Accordion` | Rule-separated disclosure list (PDP details/care/shipping, FAQ). | `items` (`{title,content}[]`), `defaultOpen`, `multiple` | |
| `ThemeToggle` | Sun/moon toggle with dynamic accessible name; persists `localStorage['got-theme']`. | `theme`, `onToggle`, `showLabel` | Matches PRD P0-F002 contract exactly. |

## Commerce (5)

| Component | Purpose | Key props | Reuse plan note |
|---|---|---|---|
| `ProductCard` | Catalog card: 4:5 image, name + mono price, NEW/SOLD OUT badge, optional always-visible wishlist heart. | `name`, `price`, `compareAt`, `image`/`altImage`, `meta`, `badge`, `soldOut`, `colors`, `badges` (`{tone,label,icon?}[]`, max 2 render), `wishlisted`/`onWishlist` | `badges` prop is the promotion-badge entry point referenced across `data.js`'s `GOT_BADGES`/`Promo.jsx` — confirms promotion UI is a first-class, already-designed surface despite not being in PRD scope. |
| `Price` | Mono EGP price, optional struck compare-at; "Currency always EGP." | `amount`, `compareAt` | Also exports `formatEGP(n)` helper — a good reference for the Blade/PHP currency-formatting helper's expected output format. |
| `CartLine` | Cart row: 88px 4:5 thumb, name, variation, line total, stepper, remove, optional stock/price warning. | `name`, `variant`, `price`, `qty`, `max`, `image`, `warning`, `onQty`, `onRemove` | `warning` prop is exactly the PRD's "Price updated since you added this item" / stock-conflict messaging contract (P0-F005 A4/A5). |
| `OrderSummary` | Totals list: subtotal, discount, shipping, total in mono EGP. | `subtotal`, `shipping` (undefined = "Calculated at checkout", 0 = "Free"), `discount`, `total` (override), `note` | |
| `CartDrawer` | Right-edge mini-cart panel: lines, subtotal, Checkout; empty state with return-to-shop. | `open`, `items` (`CartItem[]`), `onClose`, `onQty`, `onRemove`, `onCheckout`, `onViewCart`, `onShop`, `contained` | |

## Cross-cutting observations

- Every component with a "required accessible label/name" rule (`IconButton.label`, `ProductCard` wishlist heart, `ThemeToggle`) should be treated as a **hard accessibility requirement**, not just a nice-to-have, when re-implemented in Blade — these are already-correct patterns worth preserving exactly.
- No component directly implements price/stock calculation — they are all pure presentation components driven by props. This is the correct shape for a WordPress/WooCommerce port: all 26 components can become stateless Blade partials/Alpine components fed by server-computed data, with no component-level logic to "port" beyond prop wiring.
