# Feature Specification: Content Pages, SEO, and Consent-Gated Analytics

**Feature Branch**: `015-content-pages-seo-analytics`

**Created**: 2026-10-09

**Status**: Draft

**Input**: User description: "Brand and policy content pages, technical SEO, and consent-gated analytics events."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Visitor can read brand and policy information before trusting the store (Priority: P1)

As a visitor, I want to read the brand story and policies (shipping, returns, privacy, terms, cookies, FAQ, about, contact), so that I can trust the store before buying.

**Why this priority**: Should-Have (P1-F006); required for a legally and ethically sound launch, and directly supports buyer trust.

**Independent Test**: From the footer and from checkout, follow each policy link and confirm it leads to real, published content in the current theme (dark/light).

**Acceptance Scenarios**:

1. **Given** a visitor is on any page, **When** they open the footer, **Then** every policy and brand page is linked.
2. **Given** a visitor is at checkout, **When** they look for the terms/privacy reference, **Then** it is linked and reachable without losing their cart.
3. **Given** a visitor reads the About page, **When** they check its claims, **Then** every claim is limited to documented, approved facts.

---

### User Story 2 - The brand's funnel can be measured without violating visitor consent (Priority: P2)

As the brand operator, I want to measure how visitors move from viewing a product to purchasing, while fully respecting whether a visitor has agreed to be tracked.

**Why this priority**: Should-Have (P1-F007); valuable for decision-making but not required for a visitor to successfully buy something.

**Independent Test**: Reject analytics consent and confirm zero tracking requests occur anywhere on the site; accept consent and confirm the funnel events fire correctly and exactly once per order.

**Acceptance Scenarios**:

1. **Given** a visitor has not yet responded to the consent banner, **When** they browse the site, **Then** no non-essential analytics request is sent.
2. **Given** a visitor rejects analytics, **When** they continue browsing or purchase, **Then** no non-essential analytics request is ever sent for that visit.
3. **Given** a visitor accepts analytics, **When** they view a product, add to cart, begin checkout, and purchase, **Then** each corresponding event fires exactly once, with no personal information included.
4. **Given** a visitor wants to change their consent choice later, **When** they use the footer's consent-settings link, **Then** they can do so at any time.

### Edge Cases

- What happens when policy text hasn't been legally reviewed yet? → The page exists and is reachable, but is not published with final, approved text until legal review completes — this feature is not blocked on waiting for that review to finish before building the pages themselves.
- How does the system handle a visitor who accepts consent, then changes their mind mid-session? → Future events stop firing immediately; already-fired events for that session are not retroactively undone (not technically possible), but no further tracking occurs.
- What happens if a visitor's purchase event would fire twice due to a page refresh on the confirmation page? → It must fire exactly once per order regardless of how many times the confirmation page is viewed.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST provide published pages for About, Contact, FAQ, Shipping Policy, Returns & Exchanges, Privacy Policy, Terms and Conditions, and Cookie Policy.
- **FR-002**: Every policy and brand page MUST be linked from the footer, and the relevant policy pages MUST be linked from checkout.
- **FR-003**: Claims on brand/about content MUST be limited to documented, brand-approved facts — no invented history, materials, or sustainability/quality claims.
- **FR-004**: No non-essential analytics request MUST be sent before a visitor has explicitly accepted analytics consent.
- **FR-005**: A visitor who rejects or has not responded to the consent prompt MUST generate zero non-essential tracking requests for the remainder of that session unless they later accept.
- **FR-006**: The system MUST fire distinct, correctly-timed events for product view, add-to-cart, checkout start, and purchase, with the purchase event firing exactly once per order and containing no personal information.
- **FR-007**: A visitor MUST be able to change their consent choice at any time via a persistent footer link.
- **FR-008**: Every page MUST expose accurate, non-duplicated technical metadata (canonical address, structured data, social preview information) suitable for search engines and link previews.

### Key Entities

- **Content page**: a published, brand-owned page of informational (non-commerce) content.
- **Consent state**: a visitor's current choice (accepted / rejected / not yet responded), changeable at any time.
- **Funnel event**: one of a fixed set of named analytics events, fired only when consent is active.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Zero non-essential analytics network requests occur during a full site walkthrough performed with consent rejected, verified by network-traffic inspection.
- **SC-002**: The purchase event fires exactly once per completed order across a test batch, including a deliberate confirmation-page-refresh test.
- **SC-003**: 100% of footer/checkout policy links resolve to a real, published page with no broken links.
- **SC-004**: Zero unapproved or fabricated claims are found on the About/brand pages during a content audit.

## Assumptions

- Final, legally-reviewed policy text is a brand-owner/legal-reviewer deliverable and may not exist at the time this feature's engineering work is built and tested — pages can be built and verified with placeholder-but-clearly-marked-as-draft content, not left unbuilt entirely.
- The specific analytics platform is Google Analytics 4 via Google Tag Manager, with an optional Meta Pixel addition left to a separate brand decision.
