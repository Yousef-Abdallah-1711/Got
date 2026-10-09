# Feature Specification: Product Detail, Variations, Inventory

**Feature Branch**: `008-product-details-variations`

**Created**: 2026-10-09

**Status**: Draft

**Input**: User description: "Product detail page with image gallery, color and size variation selection, stock state, quantity, and add to cart."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Buyer selects the exact variation they want and adds it to cart (Priority: P1)

As a streetwear buyer, I want to see clear product images, choose my size and color, and add the exact item to my cart, so that I receive the right variation.

**Why this priority**: Must-Have launch feature (P0-F004); the entire commerce funnel depends on this page working correctly.

**Independent Test**: Open a product with 2 colors × 3 sizes; select a color, select a size, confirm price/stock update; add to cart; confirm the mini-cart reflects the exact variation chosen.

**Acceptance Scenarios**:

1. **Given** a visitor opens a product page, **When** it loads, **Then** the name, price, image gallery, and available variation options all display.
2. **Given** a visitor selects a color, **When** that color has its own images, **Then** the gallery updates to show that color's images.
3. **Given** a visitor selects a size, **When** the selection is made, **Then** price and stock status update within 200ms without a full page reload.
4. **Given** a selected variation has limited stock, **When** the visitor sets a quantity, **Then** it cannot exceed the lesser of the item's stock or 10.
5. **Given** a visitor clicks "Add to cart" without selecting a size, **When** the click happens, **Then** an inline "select a size" message appears and no item is added.
6. **Given** a visitor successfully adds an item, **When** it's added, **Then** the cart indicator updates and a confirmation (mini-cart) appears showing the exact item added.

---

### User Story 2 - Buyer sees accurate stock truth, never a false promise (Priority: P1)

As a buyer, I need to see exactly which sizes/colors are actually available, with no false "in stock" claims, so that I don't order something that can't be fulfilled.

**Why this priority**: Directly protects against the project's strongest stated constraint — never claiming availability that isn't real — and is equally launch-blocking.

**Independent Test**: Make one size's stock zero in WooCommerce; confirm that size shows as struck-through/unavailable on the product page and cannot be selected or added to cart.

**Acceptance Scenarios**:

1. **Given** a size variation has zero stock, **When** the product page renders, **Then** that size is visibly struck through and cannot be selected.
2. **Given** a visitor had a now-out-of-stock size already selected (e.g., via a shared link), **When** the page loads, **Then** "Add to cart" is disabled with a message to select an available size.
3. **Given** a visitor requests a quantity greater than current stock, **When** they try, **Then** the quantity is capped at available stock with a clear "only N left" message.

### Edge Cases

- What happens when a product has only one size and one color? → No selector friction is needed beyond confirming availability; the single option is effectively pre-selected.
- How does the system handle a network failure during add-to-cart? → A clear retry message appears, and the visitor's selection (color/size/quantity) is preserved, not reset.
- What happens when a product's structured data (for search engines) includes a variation that's since sold out? → The structured data must reflect current, real availability at the time of each page render, not a cached stale state.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The product page MUST display the product's real gallery images, with support for swiping on mobile and zooming on desktop, without causing layout shift.
- **FR-002**: Selecting a color MUST update the gallery to that color's images when color-specific images exist.
- **FR-003**: Selecting a size MUST update displayed price and stock status within 200ms, without a full page reload.
- **FR-004**: A size or color with zero available stock MUST be visibly marked unavailable and MUST NOT be selectable to the point of allowing an add-to-cart.
- **FR-005**: Quantity MUST be constrained to between 1 and the lesser of 10 or the selected variation's current stock.
- **FR-006**: "Add to cart" MUST be disabled (or clearly blocked with an inline message) until a valid size (and color, where applicable) is selected.
- **FR-007**: A successful add-to-cart MUST update the visible cart count and show a clear confirmation of exactly what was added (name, variation, quantity).
- **FR-008**: The product page MUST expose machine-readable product information (name, price, availability, identifier, image) that accurately reflects current, real data at the time of each render.
- **FR-009**: All variation selection controls MUST be operable by keyboard, with each option's state (selected/unavailable) clear to assistive technology.
- **FR-010**: A network failure during add-to-cart MUST show a clear, actionable message and MUST preserve the visitor's current selection.

### Key Entities

- **Product**: name, description, images, price, status, category, attributes (size, color).
- **Variation**: a specific size+color combination of a product, with its own price, stock quantity, and optional image.
- **Color option**: a named color with an associated visual swatch value, used for selection display.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Variation selection updates price/stock display within 200ms in 100% of tested selections, with no full page reload.
- **SC-002**: Zero out-of-stock variations are addable to cart across a full test sweep of every product/variation combination in a test catalog.
- **SC-003**: Quantity can never be set above the lesser of 10 or real stock, verified across a range of stock levels including 0, 1, 5, and 15+.
- **SC-004**: The page's structured product data validates successfully against a standard rich-results/schema validator in 100% of tested products.
- **SC-005**: A keyboard-only walkthrough of variation selection and add-to-cart completes with zero unreachable or unclear controls.

## Assumptions

- Promotion/offer badges (if any) are rendered only when a separate, server-verified eligibility signal exists (Feature 014); this feature's own scope is the core selection/stock/add-to-cart behavior, not promotion logic itself.
- Color swatch visual values (hex codes) are stored as metadata on the product's color attribute terms, since WooCommerce's native attribute model does not include a visual swatch value by default.
- Size-guide measurement content depends on brand-supplied data and may ship with a "measurements pending" placeholder state without blocking this feature's other acceptance criteria.
