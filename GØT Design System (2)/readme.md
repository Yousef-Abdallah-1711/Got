# GØT Design System

GØT (GOT® | STREETWEAR) is a pre-launch streetwear brand from Smouha, Alexandria, Egypt — EST. 2026, Drop 01 coming soon. The digital product is one surface: a **WooCommerce storefront** on a custom Sage/Blade theme at `gøteg.com`, which runs in two site modes — **Coming Soon** (prelaunch early-access signup) and **Store** (catalog, PDP, cart, guest COD checkout, account). Dark mode is the cinematic primary identity; light mode keeps the same personality on off-white. Mobile-first 360 → 1920px, WCAG 2.1 AA, EGP only, English v1 (RTL-ready logical CSS).

## Sources
- `uploads/DESIGN.md` — UI/UX + visual system spec (tokens, components, page blueprints). Primary source.
- `uploads/GOT_Complete_Brand_Identity.md` — brand strategy, voice, palette, logo, packaging, socials.
- `uploads/GOT-Store-PRD.md` — product requirements (P0 features, token table, tech stack: Sage + Tailwind + Alpine, SVG sprite icons, self-hosted Inter / Inter Tight / IBM Plex Mono).
- `uploads/PRODUCT.md` — feature scope and workflows.
- Mounted folder `got ecommerce/` — contains the same four markdown files; **no code, no images, no logo files**.
- All hex values are documented as *recommended approximations*, not measured brand ink; brand sign-off is pending.

## Index
- `styles.css` — entry point (imports only) → `tokens/{fonts,colors,typography,spacing,effects,base}.css`, `components/components.css`
- `components/` — React primitives (see list below), one `@dsCard` per folder
- `guidelines/` — 18 foundation specimen cards (Colors, Type, Spacing, Effects, Brand)
- `ui_kits/storefront/` — click-through: `index.html` (store), `coming-soon.html`, `product.html` + README
- `assets/icons/` — 32 Lucide SVGs (copied from lucide-static 0.460.0)
- `thumbnail.html`, `SKILL.md`

## Components
- core: **Button**, **IconButton**, **Icon**, **Badge**, **Wordmark**
- forms: **TextField**, **Select**, **Checkbox**, **QuantityStepper**, **SizeSelector**, **ColorSelector**, **EarlyAccessForm**
- feedback: **Notice** (inline + toast), **Skeleton**, **Modal**
- navigation: **AnnouncementBar**, **Header** (store / minimal / checkout), **ThemeToggle**, **Footer**, **Accordion**, **FilterBar**
- commerce: **ProductCard**, **Price** (+ `formatEGP`), **CartLine**, **OrderSummary**, **CartDrawer**

Inventory follows DESIGN.md §6 component contracts. **Intentional additions:** Icon (wraps the glyph set), Wordmark (typeset stand-in for the missing logo), Price/CartLine/OrderSummary (factored out of the cart/checkout contracts), Accordion (PDP + FAQ per §7.4/7.10), Checkbox/Select (consent + governorate fields).

## v1.1 update — accent & header
Proposed **Acid Lime #C2FF3D** accent (not an approved brand colour; conflicts with the documented silver accent — see `uploads/DESIGN.md` §17; revert via `html[data-accent="silver"]`), rotating announcement bar, compact sticky header, motion tokens, lime newsletter band.

## CONTENT FUNDAMENTALS
- **Voice:** short, declarative, confident, cinematic — "minimal words, strong meaning." Never arrogant toward customers, no gimmicky hype.
- **Approved lines (use verbatim, don't invent a longer story):** FORGED TO BE DIFFERENT (manifesto/hero) · NOT FOR EVERYONE (hook) · BORN TO BE DIFFERENT · MORE THAN JUST A HOODIE (packaging/product) · WELCOME TO GOT (unboxing) · SCAN TO DISCOVER MORE (QR) · DROP 01 — COMING SOON · FIRST DROP SOON.
- **Casing:** UPPERCASE for headlines, nav, buttons, drop identifiers, labels; sentence case for body, hints and errors. Never uppercase paragraphs. Headlines 2–6 words.
- **Name:** always `GØT` (U+00D8) in visible text; `GOT` only for ASCII/filenames/alt text.
- **Functional labels stay functional:** SHOP DROP 01, SELECT SIZE, ADD TO CART, CHECKOUT, PLACE ORDER, GET EARLY ACCESS. Taglines never replace a label.
- **Person:** brand speaks as "we", addresses "you" plainly ("We'll email you once when Drop 01 goes live").
- **Errors:** plain and actionable — "Enter an Egyptian mobile number, e.g. 010 1234 5678." / "Select a size to continue."
- **Currency:** `EGP 1,450` everywhere (cart, checkout, email).
- **Never:** emoji, fake scarcity, invented countdowns/launch dates, testimonials, unverified quality/material/limited-run claims, AI-generated product imagery.

## VISUAL FOUNDATIONS
- **Palette:** monochrome — obsidian `#080808`, packaging `#111`, graphite `#202020`, rule `#303030`, brushed silver `#BFC0C2`, off-white `#F2F2F0`, white. ~75% black, 20% white, 5% silver. Steel `#777` is decorative only, never small text. Status colors (error/success/warning) are per-theme and always paired with an icon + text.
- **Themes:** `:root` = dark; `[data-theme="light"]` swaps to off-white canvas, white surfaces, black ink, gunmetal accent. Theme read from `localStorage['got-theme']` → `prefers-color-scheme` → dark, before first paint.
- **Type:** Inter Tight 600–700 for display/headings (tight −3% tracking, 0.96 leading, uppercase); Inter 400–600 for UI/body (1.6 leading, 68ch measure); IBM Plex Mono 400–500 for eyebrows, drop IDs, prices, counts (uppercase, +12% tracking).
- **Spacing:** 4px unit; 4·8·12·16·24·32·48·64·96·128. Editorial sections breathe at 64–96px. Gutters 20/32/56; max width 1440; grid 4/8/12; catalog 2/3/4-up.
- **Backgrounds:** flat solid canvas. No gradients, no textures, no patterns. Imagery is the only "texture" — full-bleed editorial bands, 16:9 desktop / 4:5 mobile. Metallic sheen is an art-direction detail on the mark only.
- **Imagery vibe:** low-key studio light, hard directional shadows, matte black paper, glossy black plastic, aged silver; monochrome/cool, high contrast, honest garment color. Real merch only.
- **Borders:** 1px hairlines (`--got-border`) do the structural work — header baseline, filter bar, accordion rules, cart lines. Avoid boxing every section.
- **Corners:** 0 for images/sections, 2px controls, 4px cards/modals, pill only for tiny tags.
- **Cards:** no shadow, no border; product card = 4:5 image on `surface-2` + quiet info row (name caps left, mono price right). Badge top-left.
- **Shadows/elevation:** flat by default. One `--shadow-panel` (1px ring + soft 64px drop) for drawer, modal, toast. No glow.
- **Transparency/blur:** only the overlay scrim (`rgba(8,8,8,.72)` dark / `.48` light) and a bottom protection gradient on photos for on-image text. No glassmorphism or backdrop blur.
- **Motion:** precise, mechanical. `cubic-bezier(.2,.7,.2,1)`; 150ms controls, 280ms panels, 500ms one-time reveals. Fade + 8px rise for toasts/modals, slide-from-right for drawer. Opacity/transform only. `prefers-reduced-motion` → 0ms, shimmer off.
- **Hover:** primary CTA inverts (solid → outline); secondary fills solid; ghost gets `surface-2`; links thicken underline 1→2px; arrows nudge 3px; product image swaps to alt or scales 2.5%.
- **Press:** 1px downward translate. No shrink, no color flash.
- **Focus:** 2px solid ring (`--color-focus`: silver dark / gunmetal light) with 2–3px offset; inputs get a 1px inner+outer border in text color.
- **Disabled:** muted surface + `--color-disabled` text; unavailable sizes struck diagonally.
- **Layout:** sticky header only; header grid = nav left / wordmark centred / utilities right. Checkout strips nav. Hit targets ≥44px.

## ICONOGRAPHY
- Production spec: inline **SVG sprite, no icon font** (PRD). No sprite was supplied, so the system uses **Lucide** (ISC) — 32 SVGs copied into `assets/icons/` and inlined as path data in `components/core/Icon.jsx`. ⚠️ Substitution — replace with the brand sprite when available.
- Style: 24-grid outline, **1.5px stroke, square caps/miter joins** (sharper than Lucide's default round), `currentColor`, 20px default, 16px in dense controls.
- Set: shopping-bag, search, user, sun/moon (theme), menu, x, plus/minus, arrows, chevrons, check, heart, circle-alert/check, truck, package, lock, trash, loader, mail, sliders, ruler, info, phone, map-pin, zoom-in, instagram. TikTok has no Lucide glyph → text link.
- No emoji, no unicode-as-icon. Icon-only buttons always carry an accessible label.
- **Logo:** the GØT sword monogram exists only as raster mockups (not supplied here). **No logo file is in this system** — `Wordmark` typesets "GØT" in Inter Tight as a placeholder. Never redraw the sword.

## Fonts
⚠️ No font binaries were supplied. `tokens/fonts.css` loads **Inter Tight, Inter, IBM Plex Mono from Google Fonts** (the PRD's named families). Production must self-host licensed, subset files.
