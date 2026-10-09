# Feature Specification: Design Tokens and Global UI

**Feature Branch**: `003-design-tokens-global-ui`

**Created**: 2026-10-09

**Status**: Draft

**Input**: User description: "Dark and light design tokens and global UI: header in 3 modes, footer, announcement bar, theme toggle, cart drawer shell, with the approved Acid Lime primary accent while preserving the monochrome identity."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Visitor reads the site comfortably in their preferred light/dark mode (Priority: P1)

As a visitor, I want the site to open in dark mode by default (or whichever mode I last chose, or whichever mode my device prefers), and to be able to switch instantly, so that the site is comfortable to read regardless of my environment or device settings.

**Why this priority**: Dark/light parity is a Must-Have launch feature (PRD P0-F002) and every other visual feature depends on the token system this story delivers.

**Independent Test**: Load the site fresh (no stored preference) on a device set to dark OS preference → dark renders. Switch to light via the toggle → light renders instantly, no page reload. Reload the page → light mode persists, no flash of dark mode first.

**Acceptance Scenarios**:

1. **Given** a visitor with no stored preference and a dark-mode OS setting, **When** the page first paints, **Then** dark mode renders with no flash of the wrong theme.
2. **Given** a visitor clicks the theme toggle, **When** the new theme applies, **Then** it applies instantly with no full page reload, and the choice is remembered on the next visit.
3. **Given** a visitor's browser blocks persistent storage, **When** they reload the page, **Then** the theme applies correctly for that page view without an error, even though it isn't remembered.
4. **Given** either theme, **When** any text or interactive control is viewed, **Then** it meets the project's accessibility contrast requirement.

---

### User Story 2 - Visitor always sees the brand's core navigation and status regardless of page (Priority: P1)

As a visitor, I want the same header, footer, and announcement bar to appear consistently across every page, so that I always know where I am and how to get back to shopping, cart, or account.

**Why this priority**: Equally foundational to User Story 1 — every page in the entire site depends on this global chrome existing and working correctly.

**Independent Test**: Visit five different pages (home, a policy page, the product page, the cart, the checkout); confirm the header/footer/announcement bar appear with the correct variant for context (e.g., checkout shows a distraction-free header, not the full navigation).

**Acceptance Scenarios**:

1. **Given** a visitor is browsing the store, **When** they view any ordinary page, **Then** the full header (navigation, search, account, cart, wishlist, theme toggle) and footer (brand manifesto, links, cookie settings) both appear.
2. **Given** a visitor reaches the checkout, **When** the checkout page loads, **Then** the header switches to a distraction-free variant with no promotional navigation.
3. **Given** a visitor is in the pre-launch "Coming Soon" period, **When** they view the homepage, **Then** a minimal header variant (logo, theme toggle, social links only) appears instead of the full store navigation.
4. **Given** the announcement bar has more than one message, **When** the page is open and idle, **Then** the messages rotate automatically, pausing while the visitor hovers, focuses, or presses a pause control, and never rotating at all if the visitor has reduced-motion enabled.

---

### User Story 3 - Visitor using a screen reader or keyboard only can operate every global control (Priority: P2)

As a visitor who cannot or does not use a mouse, I need the theme toggle, header navigation, and announcement bar to be fully operable by keyboard with clear audible feedback, so that I am not excluded from using the site.

**Why this priority**: A legal/ethical accessibility requirement (WCAG 2.1 AA, constitution Principle 14) — not optional, but logically layered on top of the visual system existing first.

**Independent Test**: Using only the Tab/Enter/Space keys and a screen reader, reach and operate the theme toggle, open the mobile menu, and read the announcement bar's content, without being trapped or confused by any control.

**Acceptance Scenarios**:

1. **Given** a keyboard-only visitor, **When** they Tab to the theme toggle, **Then** a visible focus ring appears and Enter/Space activates it.
2. **Given** a screen-reader user, **When** the theme toggle's state changes, **Then** its accessible name changes to describe the next action ("Switch to light mode" / "Switch to dark mode").
3. **Given** a screen-reader user, **When** the announcement bar automatically rotates, **Then** the automatic change is not announced (it would be disruptive), but the visitor can still read the current message on request.

### Edge Cases

- What happens when a visitor's device has no stored preference and no detectable OS preference at all? → Defaults to dark mode.
- How does the system handle a visitor switching their OS-level light/dark setting while they have never manually chosen a theme on this site? → The site follows the new OS setting on next load, since no manual override exists.
- What happens when the announcement bar has exactly one message? → It renders as a static bar with no rotation controls at all (nothing to rotate between).
- What happens when a visitor is in Coming Soon mode but types a direct URL to a store page? → Out of scope for this feature; governed by the site-mode exposure policy decided elsewhere (see Assumptions).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST render the entire site in exactly one of two themes (dark or light) at any time, with dark as the default when no preference is known.
- **FR-002**: The system MUST apply a visitor's previously chosen theme before the first visual paint, with no visible flash of the other theme.
- **FR-003**: The system MUST let a visitor switch themes instantly from any page, with no full page reload.
- **FR-004**: The system MUST remember a visitor's manually chosen theme across visits when persistent storage is available, and MUST continue to work correctly for the current page view when it is not.
- **FR-005**: The system MUST follow the visitor's device-level light/dark preference whenever no manual choice has been made, and MUST re-check that preference on each subsequent visit if still no manual choice exists.
- **FR-006**: Every page MUST display a consistent header and footer appropriate to that page's context: a full-navigation header for ordinary store pages, a distraction-free header for checkout, and a minimal header for the pre-launch Coming Soon period.
- **FR-007**: The announcement bar MUST rotate between multiple messages automatically when more than one exists, MUST pause on hover, keyboard focus, or an explicit pause control, and MUST NOT rotate at all when the visitor has requested reduced motion.
- **FR-008**: The system MUST NOT announce automatic announcement-bar rotation to assistive technology, to avoid disruptive, repeated interruptions.
- **FR-009**: Every interactive global control (theme toggle, menu trigger, search trigger, cart/wishlist/account icons) MUST be operable by keyboard alone and MUST carry an accurate accessible name that reflects its current state where applicable.
- **FR-010**: All text and interactive elements in both themes MUST meet the project's minimum contrast requirement (4.5:1 for normal text, 3:1 for large text and UI components).
- **FR-011**: The primary visual accent color used for calls-to-action, focus indicators, and the announcement bar MUST be the approved accent color, applied consistently across both themes while preserving the site's overall monochrome, high-contrast identity (the accent is a deliberate highlight, not a wholesale recoloring).
- **FR-012**: Every layout, spacing, and directional style decision in the token system and global UI MUST use direction-agnostic (logical) positioning rather than hardcoded left/right values, so that a future right-to-left language can be enabled without restyling — this requirement was identified as missing during the cross-feature audit (PRD §8 Compatibility requires it even though full Arabic translation itself is out of v1 scope) and is added here as part of that remediation.

### Key Entities

- **Theme preference**: a per-visitor stored choice (dark/light), with a defined resolution order (manual choice → device preference → dark default).
- **Global navigation**: the set of header/footer/announcement content and links shown on every page, distinct per header variant (store/minimal/checkout).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Zero visible theme-flash incidents across 100 repeated hard-reload tests, in both themes, on a throttled connection.
- **SC-002**: 100% of body text and interactive components pass the project's contrast requirement in both themes, verified by an automated contrast audit with zero failing pairs.
- **SC-003**: A keyboard-only user can reach and operate every global control (theme toggle, menu, search, cart, wishlist, account) without a mouse, verified by a full keyboard-only walkthrough with zero unreachable or unlabeled controls.
- **SC-004**: The correct header variant (store/minimal/checkout) appears on 100% of a sample of at least one page per site section.
- **SC-005**: A visitor's theme choice persists across at least 3 separate page navigations and a full browser restart, in a test where persistent storage is available.
- **SC-006**: Zero hardcoded left/right (non-logical) positioning properties are found in a code-level audit of the token system and global UI partials.

## Assumptions

- The approved primary accent color is Acid Lime (#C2FF3D), applied consistently in both themes per the project's brand-decision record; the monochrome palette (obsidian/graphite/silver/off-white) remains the dominant surface language, with the accent reserved for CTAs, focus rings, and the announcement bar rather than general-purpose recoloring.
- Whether direct URLs to store pages remain reachable during Coming Soon mode is a separate, still-open policy decision (tracked in `docs/planning/risks-and-blockers.md`) and is out of scope for this feature, which only builds the header variant itself.
- Cart drawer content (real line items) is out of scope here — this feature delivers only the drawer's empty-state shell and open/close mechanics; Feature 010 wires it to real cart data.
