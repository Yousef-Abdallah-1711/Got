# Missing Assets

Everything below is referenced, implied, or required by the source documents but not actually present anywhere in the project directory. Status: VERIFIED absent (checked via file listing and the documents' own explicit statements) unless noted.

## Brand / legal assets

| Asset | Required by | Current state |
|---|---|---|
| Approved master logo (SVG/AI, GOT sword monogram) | GOT Store PRD assumption 1; DESIGN sections 2 and 14; brand identity section 4.1 | A transparent PNG logo was supplied. The theme uses its optimized 193 KB WebP copy at `wp-content/themes/got-sage/resources/images/got-logo.webp`. The editable SVG/AI master remains unsupplied; keep the raster as the current brand asset and vector delivery as an open design input. |
| Brand color sign-off (final, measured ink values) | `DESIGN.md` §15, brand-identity §4.2 | All hex values across every document are labeled "recommended approximations," not measured production ink. |
| Licensed font binaries (Inter, Inter Tight, IBM Plex Mono — self-hosted) | PRD §9, DESIGN.md §4 | **Does not exist.** `tokens/fonts.css` currently loads from Google Fonts as a placeholder per `readme.md`. |
| Real brand icon sprite (inline SVG, no icon font, per PRD §9) | PRD §9 Frontend Stack | **Does not exist.** 32 Lucide SVGs (ISC license) are substituted; `Icon.d.ts`/`readme.md` both explicitly flag this as a substitution to replace later. |
| Registered trademark confirmation (the `®` symbol) | `GOT_Complete_Brand_Identity.md` §1, §11 | Unverified; brand doc explicitly says the `®` appearing in social bios "does not independently prove a registered trademark." |

## Product / commerce content

| Asset | Required by | Current state |
|---|---|---|
| Drop 01 product lineup (names, prices, sizes, stock) | PRD Dependencies table, Assumption 2 | **Does not exist.** `data.js`'s 4-item catalog is explicitly "SAMPLE DATA... not approved; real Drop 01 list is TBD by brand owner." |
| Real product photography | PRD Assumption 4, DESIGN.md §2 | **Does not exist.** All prototype imagery is desaturated Unsplash stock with photographer-credit overlays, explicitly labeled "NOT GØT products." |
| Size guide measurements (chest/length/sleeve per size) | `Product.jsx`'s size-guide modal | **Does not exist.** Table renders literal `—` placeholders; copy states it awaits "the approved Drop 01 size chart." |
| Shipping fees per governorate | PRD Dependencies table, §7 P0-F006 | **Does not exist.** Prototype's governorate `Select` lists Alexandria/Cairo/Giza/Other with no associated fee data. |
| Return & exchange policy text | PRD §4 In Scope, P1-F006 | **Does not exist.** `Product.jsx`'s shipping section explicitly states this is pending approval. |
| Confirmed launch date for Drop 01 | PRD Dependencies table, Non-Goals ("Displaying a launch countdown before the launch time is confirmed") | **Does not exist** and must not be guessed or fabricated — this is a hard constraint, not merely an open item. |

## Legal / policy content

| Asset | Required by | Current state |
|---|---|---|
| Privacy Policy text | PRD §4, §8 Data and Compliance | **Does not exist** anywhere in the project. |
| Terms and Conditions text | PRD §4 | **Does not exist.** Only a dead `<a href="#">` link stub exists in `DirectCheckout.jsx`. |
| Cookie Policy text | PRD §4 | **Does not exist.** |
| Shipping Policy text | PRD §4 | **Does not exist.** |
| Legal review of the above (Egyptian Personal Data Protection Law) | PRD §8, §15 Approval Gates | **Does not exist** — flagged as a Phase 4 gate in the PRD itself, not yet started. |

## Technical / infrastructure assets

| Asset | Required by | Current state |
|---|---|---|
| Any WordPress, WooCommerce, Sage, Acorn, or Blade code | Entire project goal | **Does not exist anywhere in the repository.** Confirmed by direct directory listing — the project is 100% planning documents plus the React design-system reference. |
| Domain ownership / DNS control for `gøteg.com` | PRD Assumption 3, Dependencies table | Unverified; PRD explicitly lists IDN/Punycode handling as unconfirmed. |
| Managed WordPress hosting account (PHP 8.2+, backups, staging) | PRD Dependencies table | Not provisioned. |
| Email marketing tool account + sending domain | PRD Dependencies table | Not selected/provisioned ("TBD" throughout). |
| Confirmed, verified social media URLs (Instagram/TikTok/Facebook/WhatsApp) | PRD §16, brand-identity §6 | Supplied but explicitly unverified; spelling inconsistencies flagged in `source-conflicts.md` C-08. |
| A `.rar` archive to extract | Project instructions mention one may exist | **Not found as a `.rar`** — "GØT Design System (2)" already exists as a plain, already-extracted folder. No archive extraction was necessary or performed. |

## Design-system-internal gaps (assets referenced by the prototype itself but absent)

| Asset | Where referenced | Current state |
|---|---|---|
| Real hero/editorial/packaging photography for the homepage | `HOMEPAGE-AUDIT.md` §5 "Content dependencies (blocking production)" | Explicitly listed as blocking by the design system's own prior audit. |
| Craftsmanship/material copy | `home-content.js` (`craftsmanship: null`) | Intentionally hidden pending approved copy. |
| Real WooCommerce sales data for "Best sellers" | `home-content.js` (`bestSellers: null`) | Intentionally hidden — "needs real WooCommerce sales data — never faked." |
| Social post imagery (6 slots) | `HOMEPAGE-AUDIT.md` | Placeholder slots only. |

This list should be treated as a standing blocker register — most Phase 1/Phase 2 implementation tasks in `GOT-Store-PRD.md` Section 10 are gated on brand-owner deliverables from this list, not on engineering effort.
