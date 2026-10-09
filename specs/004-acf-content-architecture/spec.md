# Feature Specification: ACF Content Architecture

**Feature Branch**: `004-acf-content-architecture`

**Created**: 2026-10-09

**Status**: Draft

**Input**: User description: "ACF Block architecture for editorial content sections: hero, drop intro, editorial split, manifesto, packaging story, social gallery, newsletter, FAQ, brand story, each with code-owned fields and conditional rendering."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Content editor builds and reorders a page from approved sections without a developer (Priority: P1)

As the brand's content editor, I want to add, remove, and reorder editorial sections (hero, manifesto, packaging story, etc.) on a page through the normal WordPress editor, so that I can publish and adjust pages myself without needing a developer for every content change.

**Why this priority**: This is the entire reason the ACF architecture exists — without it, every content change becomes a code change, which the project is explicitly trying to avoid (constitution: WordPress-native solutions, Content Editor role exists precisely for this).

**Independent Test**: Log in as a Content Editor; add a Manifesto section to a page; reorder it above an existing section; save; confirm the live page reflects the new order with no developer involvement.

**Acceptance Scenarios**:

1. **Given** a Content Editor is editing a page, **When** they add an editorial section from the available block list, **Then** it appears in the editor preview in approximately its final visual form.
2. **Given** a page has multiple sections, **When** the editor reorders them, **Then** the live page reflects the new order after publishing.
3. **Given** a section's required content fields are left empty, **When** the page is viewed live, **Then** that section does not render at all (no broken/empty-looking section is shown to visitors).

---

### User Story 2 - Visitor never sees a broken or empty-looking section (Priority: P1)

As a visitor, I should never see a section with missing images, empty headlines, or placeholder text — if content isn't ready, the section simply shouldn't appear.

**Why this priority**: Directly protects the brand's "no fabricated/placeholder content in production" rule and prevents an unfinished-looking site from ever being visible to a real customer.

**Independent Test**: Configure a section with some fields empty; confirm it's entirely absent from the rendered page (not rendered with empty space, broken image icons, or lorem-ipsum-style gaps).

**Acceptance Scenarios**:

1. **Given** a section's content requirement is not met, **When** the page renders, **Then** no partial, broken, or visually empty version of that section appears.
2. **Given** a section's content requirement later becomes met (content is added), **When** the page is viewed again, **Then** the section now appears correctly, with no further code changes.

### Edge Cases

- What happens when every section on a page is empty? → The page itself should still render (header/footer intact), just with no editorial sections in between — not a broken or blank page.
- How does the system handle a section that needs an image but not a headline, versus one that needs both? → Each section's own "required content" definition is independent; a section with only an image requirement renders once that image exists, regardless of headline state.
- What happens if a Content Editor tries to add a section type that doesn't exist yet (not yet built)? → Not offered in the editor's available block list at all — this is a hard constraint, not a runtime check.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST offer each approved editorial section type (hero, drop intro, editorial split, manifesto, packaging story, social gallery, newsletter, FAQ, brand story) as an independently addable, removable, and reorderable unit within the normal page editor.
- **FR-002**: Each section type MUST define its own specific "required content" rule, and MUST NOT render on the live page when that rule is unmet.
- **FR-003**: The system MUST NOT allow a visitor-facing page to display hardcoded placeholder or lorem-ipsum-style content in production.
- **FR-004**: A Content Editor MUST be able to publish a content change (add/remove/reorder a section, or fill in a section's fields) without requiring a developer or a code deployment.
- **FR-005**: The system MUST NOT require editorial section content to be duplicated in more than one place (e.g., the same manifesto text must not need to be entered separately in two different sections or settings screens).
- **FR-006**: Site-wide elements (header, footer, navigation) MUST NOT be among the addable/removable page sections — they are managed separately (Feature 003) and appear automatically on every page.
- **FR-007**: The homepage MUST be composed of these same section types, reorderable the same way as any other page, rather than being a specially hardcoded template.
- **FR-008**: Site-wide values with no other natural home (logo asset, contact details, social handles, default schema data) MUST be editable through one lean global settings area, with every field optional when a frontend default exists and no field present that nothing on the frontend actually reads — this requirement, and the global menu-source-selector requirement it depends on, were identified as missing during the Feature 001 migration audit (originally scattered across generic converter instructions T007/T008a/T008c/T008d with no real owner) and are consolidated here.

### Key Entities

- **Editorial Section**: a self-contained, independently publishable unit of content (one of the 9 named types), each with its own specific fields and its own "render only if populated" rule.
- **Page**: an ordered sequence of editorial sections, assembled by a Content Editor; the homepage is one specific Page, not a separate concept.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A Content Editor can add, reorder, and publish a change to a page's section composition in under 10 minutes without developer assistance (mirrors the PRD's "publish a product in under 10 minutes" operator-efficiency bar, applied to content).
- **SC-002**: 100% of sections with unmet content requirements are absent from the rendered page across a test sweep of every section type in both a filled and an empty state.
- **SC-003**: Zero placeholder/lorem-ipsum content is detectable on any production-bound page during a content audit.

## Assumptions

- The 9 named section types are the complete initial set (per the original project brief and `docs/adr/0004-acf-block-strategy.md`); additional section types may be proposed later but are out of scope for this feature.
- WooCommerce product/category data displayed within a section (e.g., a "featured product" inside the Spotlight-style section) is read live from WooCommerce, not entered as editorial content — this feature defines the section's editorial framing fields only; live commerce data display is covered by Features 006–008.
- "Brand Story," "Packaging Story," and "Manifesto" content text itself (the actual words/images) is supplied by the brand owner and is a content-population task, not an engineering task within this feature's scope.
