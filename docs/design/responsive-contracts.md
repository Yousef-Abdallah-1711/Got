# Responsive Contracts

Per-breakpoint behavior, grounded in DESIGN.md §5/§10 (VERIFIED by quote) and the prototype's observed grid/gutter usage (`HOMEPAGE-AUDIT.md`, `Product.jsx`, `Shop.jsx`). Required test widths: **360, 390, 768, 1024, 1440, 1920px**, both themes, per DESIGN.md §10.

## Breakpoint bands (DESIGN.md §5, VERIFIED)

| Band | Range | Grid columns | Gutter |
|---|---|---|---|
| Mobile | 360–639px | 4 | 20px |
| Tablet | 640–1023px | 8 | 32px |
| Desktop | 1024–1439px | 12 | 48–72px |
| Wide | ≥1440px | 12 (content capped at 1440px max-width) | 48–72px |

DESIGN.md explicitly: "Design fluidly, not by device-specific hacks" — breakpoints are guidance bands for fluid `clamp()`/`minmax()` CSS, not fixed device-width `@media` cliffs everywhere.

## Per-page/component responsive behavior

| Page/component | Mobile (360–639) | Tablet (640–1023) | Desktop (≥1024) |
|---|---|---|---|
| Header | Compact (56–72px, per `Header.d.ts`'s `compact` prop), mobile menu via `IconButton` trigger | Transitional — `Header.d.ts`'s `layout="auto"` uses the 1024px breakpoint, so tablet renders the mobile layout | Full nav row, 76–88px height, sticky optional |
| Shop/category grid | 2-up (per `Shop.jsx`: `gridTemplateColumns: 'repeat(2,minmax(0,1fr))'` when ≤2 items, else `auto-fill, minmax(min(100%/2 - 8px,240px),1fr)`) | 2–3-up | 3–4-up (desktop 4-up when space allows per DESIGN.md §7.3) |
| Product detail gallery | Swipeable single-column track (scroll-snap, per `Product.jsx`'s `pd-gal__track`) | Transitional | Split layout: gallery 55–60% / purchase column 40–45% (DESIGN.md §7.4), sticky purchase column |
| Product detail sticky CTA | Visible (`pd-sticky`, hidden only while hero/inline-checkout CTA visible) | Same | Typically not needed once the purchase column is sticky itself — PROPOSED to hide the floating bar ≥1024px since the sticky column supersedes it (not explicitly stated in the prototype, which doesn't appear to have a desktop-specific override here — **flag for implementation-time visual QA**) |
| Cart drawer | Full-width or near-full-width edge panel | Fixed-width edge panel | Fixed-width edge panel (DESIGN.md: "Edge-aligned high-contrast panel") |
| Checkout | Mobile: linear single-column, grouped sections (DESIGN.md §7.6) | Transitional | Desktop form + sticky order summary, two-column |
| Account | Stacked navigation | Transitional | Desktop compact left nav + content (DESIGN.md §7.8), matching `Account.jsx`'s `gridTemplateColumns: '240px minmax(0,1fr)'` |
| Filters | Bottom sheet/drawer (DESIGN.md §7.3) | Transitional | Desktop sidebar or top rail |
| Full-bleed editorial imagery | 4:5 or 3:4 crop | Transitional | 16:9 crop (DESIGN.md §5) |

## Cross-cutting rules (apply at every breakpoint)

- Touch targets ≥44×44px (PRD §8 Accessibility, `Button`'s `sm` size is exactly 44px per `.d.ts`).
- No horizontal scroll except intentionally scrollable galleries/filter rails.
- Text max-width 65–72ch regardless of viewport (DESIGN.md §5).
- Layout shift prevented via explicit `aspect-ratio`/width+height on all images (CLS <0.1 target, PRD §8).
- RTL-readiness: all spacing/positioning uses logical CSS properties (`margin-inline`, `padding-block`, `inset-inline-start`) at every breakpoint, even though Arabic itself is v1.1/out of scope (PRD §4, §8 Compatibility).

## Verification protocol (planning only — not yet executed)

For every page in `docs/design/page-mapping.md`, capture and compare at all 6 widths × 2 themes = 12 states, per `docs/design/visual-parity-matrix.md`'s checklist, plus modal/drawer-open, empty, error, loading, and success states at a representative subset of those widths (DESIGN.md §10's explicit list). Browser/device matrix: Chrome 110+, Safari 16+ (incl. iOS 16+), Firefox 110+, Samsung Internet 21+, Edge 110+ (PRD §8 Compatibility), tested on at least two Android and two iOS physical devices before launch (PRD Phase 4 task).
