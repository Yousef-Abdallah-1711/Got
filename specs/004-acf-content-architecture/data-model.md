# Data Model: ACF Content Architecture

Each entity below is an ACF field group attached to one Block, stored as post meta on whichever page uses it. "Required for render" is the specific per-block guard condition (FR-002).

| Block | Fields | Required for render |
|---|---|---|
| **Hero** | eyebrow (text), headline (text, required), subheading (text), image (image), CTA label (text), CTA link (URL) | headline present |
| **Drop Intro** | drop label (text, e.g. "Drop 01"), status (text, e.g. "Coming soon"), title (text), editorial image (image), linked products (relationship → WooCommerce products, max 2) | title present |
| **Editorial Split** | heading (text), body (textarea), image (image), image position (select: left/right) | heading present AND image present |
| **Manifesto** | lines (repeater of short text, 1–4 items), support lines (repeater of short text) | at least 1 line present |
| **Packaging Story** | items (repeater: image, caption, note — 1 to 3 items) | at least 1 item with both image and caption present |
| **Social Gallery** | platform links (repeater: label, handle, href), post images (repeater of images, up to 6) | at least 1 platform link present |
| **Newsletter** | heading (text), supporting text (text), form variant (select) | heading present (form itself always renders if the block is active, but the block won't appear at all without a heading) |
| **FAQ** | items (repeater: question, answer — answer may be left null to intentionally hide that one question without removing others) | at least 1 item with both question and a non-null answer |
| **Brand Story** | facts (repeater: label, value — e.g. "Est." / "2026") | at least 1 fact present |

## Relationships

- **Page** (native WordPress Page/Post) 1 → many **Editorial Section** instances, ordered by the page's own native block-editor content sequence — **not** a Flexible Content field (corrected 2026-10-09, remediates finding C1-ARCH; see `docs/architecture/ACF-CONTENT-RENDERING-DECISION.md`).
- **Drop Intro** block MAY reference 0–2 **WooCommerce Products** (by ID, via ACF relationship field) — read live at render time, never duplicated.

## Validation rules

- No block's fields are marked "required" at the ACF field-group level in a way that blocks saving the page (per the project's "optional when a default/fallback exists" pattern) — instead, the render callback silently skips the block. This lets an editor save a page with a half-finished section without an error, while guaranteeing visitors never see it until it's ready (FR-002/FR-003).
- Repeater minimums (e.g., Manifesto needs ≥1 line) are enforced at render time, not at save time, for the same reason.
