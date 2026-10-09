# GØT — Product Requirements Document (E-commerce Website)

---

## SECTION 1 — Project Identity

| Field | Value |
|---|---|
| Project Name | GØT Store |
| Project Type | Web Application (E-commerce — Content-Managed Storefront) |
| Project ID | PRD-001 |
| Version | v1.0 |
| Status | Draft |
| Priority | High |
| Created Date | 2026-10-08 |
| Last Updated | 2026-10-08 |
| Owner | [TBD — brand owner to confirm] |
| Team Members | Product Owner, WordPress/WooCommerce Developer, Frontend Developer (Sage/Blade/Tailwind), UI/UX Designer, QA Engineer |
| Tech Stack | WordPress 6.x, WooCommerce, Roots Sage 10 theme on Acorn (Laravel services for WordPress), Blade templates, Vite, Tailwind CSS, Alpine.js (light interactivity), MySQL 8 / MariaDB, PHP 8.2+ |
| Repository | [TBD] |
| Git Branch Prefix | NNN-feature-name |
| PRD File Path | docs/PRD.md |

---

## SECTION 2 — Problem & Purpose

### Problem Statement

GØT is a pre-launch streetwear brand based in Alexandria, Egypt (EST. 2026). The brand currently has social media presence (Facebook, Instagram, TikTok) and branded physical touchpoints (packaging, hang tags, keychains) that direct people to a website, but no owned storefront exists to receive those visitors. Without a website that can capture early interest and later sell products directly, the brand depends on third-party social platforms for discovery and cannot convert anticipation into orders or collect owned customer contact data.

### Project Purpose

Deliver a brand-led WordPress storefront that:

1. Communicates the GØT identity within five seconds of arrival.
2. Captures opt-in early-access sign-ups during the pre-launch phase (DROP 01 — COMING SOON).
3. Switches to a full WooCommerce store for Drop 01 and subsequent drops, without a redesign or re-platforming.
4. Supports both dark mode and light mode across all pages, with dark as the default presentation.

### Business Value

- Owned sales channel that removes dependence on social platform reach.
- First-party customer data (email, phone, order history) for drop announcements and retention.
- Consistent brand presentation across web, packaging QR destinations, and social links.
- Scalable base for future drops, product lines, and optional Arabic localization.

### Opportunity

Egypt has a large mobile-first, social-driven apparel audience. Cash on Delivery (COD) is widely used for online purchases and must be available at launch. A drop-based release model combined with scarcity storytelling can convert social audiences into direct buyers, provided the website never displays unconfirmed stock, prices, or dates.

---

## SECTION 3 — Goals & Objectives

### Primary Goal

Launch a functional WooCommerce storefront for DROP 01 with a pre-launch Coming Soon mode that collects early-access sign-ups, on the approved launch date, with all six Must Have features live and passing QA.

### Objectives

1. **Brand clarity:** A first-time visitor on a 390 px wide mobile viewport can state the brand's core line ("FORGED TO BE DIFFERENT") after a single five-second view, verified in at least 5 of 8 usability test participants.
2. **Pre-launch capture:** Email early-access sign-ups go live before launch with double opt-in and consent recording.
3. **Launch readiness:** The Coming Soon mode and the Store mode can be switched through one admin setting without a code deployment.
4. **Theme parity:** Dark and light modes meet WCAG 2.1 AA contrast on all text and interactive elements in both modes.
5. **Commerce foundation:** A customer can complete a Cash on Delivery order from product page to order confirmation in 4 steps or fewer on mobile.

### Success Definition

The project is successful when Drop 01 is live in Store mode, at least one COD order has been completed end to end on production, the Coming Soon sign-up list has been migrated to the store's email tool with consent records intact, and the Must Have feature set passes QA with zero open Critical or High defects.

### Non-Goals

- Headless architecture (Next.js frontend) — the storefront is server-rendered through the Sage theme.
- Multi-vendor marketplace, B2B accounts, subscriptions, bookings, or rentals.
- Loyalty program, store wallet, gift cards, and referral programs in v1.
- Native mobile application.
- Marketing claims of limited production, premium fabric, local manufacturing, or sustainability until the brand documents them.
- Displaying a launch countdown before the launch time is confirmed.

---

## SECTION 4 — Scope

### In Scope (v1.0)

- Coming Soon landing page with email early-access sign-up (double opt-in).
- Store mode switch controlled from WordPress admin.
- Dark mode and light mode with user toggle, system preference detection, and persistence.
- Homepage, shop and category listing, product detail page, cart, checkout (guest and registered), order confirmation.
- WooCommerce product management for physical products with simple and variable (size, color) options.
- Cash on Delivery payment method for Egypt.
- Customer registration, login, password reset, and My Account order history.
- Basic shipping zones for Egyptian governorates (Alexandria, Cairo/Giza, other governorates).
- Standard pages: About, Contact, Shipping Policy, Return & Exchange Policy, Privacy Policy, Terms and Conditions, Cookie Policy, FAQ, 404.
- Email transactional notifications (order placed, order status changes).
- SEO basics, analytics with consent, performance and accessibility baseline.
- Brand design system implemented as Sage theme tokens (colors, typography, spacing, motion).

### Out of Scope (deferred to v2)

- Online payment gateways (Paymob, Fawry, card payments, digital wallets, installments) — v2 unless the brand decides otherwise before Phase 2 begins.
- Arabic (RTL) localization of storefront content — v2; the theme must still be built with RTL-ready logical CSS properties.
- Multi-currency and currency switcher (EGP only in v1).
- Wishlist price-drop alerts, back-in-stock alerts, product comparison.
- Product reviews with photo uploads, product Q&A.
- Live chat, AI chatbot, WhatsApp Business API integration (a static WhatsApp contact link only).
- Advanced search (typo correction, voice search, synonyms).
- Gift wrapping, gift messages, and personalization options.
- PWA and push notifications.

### Assumptions

1. The brand has approved its master logo as an SVG or AI file with usage rights. Until then, the team uses a placeholder mark that is not the production logo.
2. Drop 01 product lineup, prices, sizes, and shipping fees are supplied by the brand before Phase 2 ends.
3. The brand has a domain (gøteg.com as supplied, subject to verification) with DNS control.
4. Product photography is real, photographed merchandise. AI-generated mockups are not used as product images on the live store.
5. Hosting is provided by a managed WordPress host with PHP 8.2+, HTTPS, and daily backups.
6. The brand's social accounts (Instagram, TikTok, Facebook) are final before launch.
7. A single store operator manages orders from the WooCommerce admin.

### Constraints

- WordPress and WooCommerce are the only commerce and content platforms for v1.
- Theme must be built on Roots Sage 10 with Acorn and Blade; no page builder plugins that override theme templates.
- No Coming Soon countdown or launch date may be published without written confirmation from the brand owner.
- No product may be shown as available, and no stock quantity or delivery date may be displayed, unless it is confirmed in WooCommerce.
- Total third-party plugin count is capped at 15 for v1 to control maintenance and performance risk.
- Customer data is stored in Egypt-hosted or EU/US-hosted infrastructure with a documented privacy policy; the data location decision is recorded before Phase 1 ends.

### Dependencies

| Dependency | Owner | Needed By | Status |
|---|---|---|---|
| Final master logo (SVG/AI) and usage rights | Brand owner | Phase 1, Week 1 | [TBD] |
| Brand color, typography, and tone approval | Brand owner | Phase 1, Week 1 | [TBD] |
| Domain ownership, DNS access, SSL | Brand owner | Phase 1, Week 1 | [TBD] |
| Drop 01 product list, prices, sizes, photography | Brand owner | Phase 2, Week 3 | [TBD] |
| Shipping fees and delivery areas | Brand owner | Phase 2, Week 3 | [TBD] |
| Legal policy text (privacy, terms, returns) | Brand owner / legal reviewer | Phase 4, Week 7 | [TBD] |
| Email marketing tool account and sending domain | Brand owner | Phase 1, Week 2 | [TBD] |
| Managed hosting account (PHP 8.2+, backups) | Development team | Phase 1, Week 1 | [TBD] |
| Confirmed launch date for Drop 01 | Brand owner | Phase 4, Week 7 | [TBD] |

---

## SECTION 5 — Users & Personas

### Primary Users

**Streetwear buyers (customers):** Fashion-conscious young adults in Egypt, primarily in Alexandria and Cairo, who buy statement hoodies and limited drops. They browse on mobile, follow the brand on social media, and expect COD.

**Brand operator (store administrator):** The person who manages products, orders, drop announcements, and sign-up lists from WordPress admin.

### Secondary Users

**Early-access subscribers:** People who sign up during the Coming Soon phase to receive drop notifications. They have not yet purchased.

**Brand team (content and social):** Edits Coming Soon content, banners, and policy text through the WordPress editor and Sage theme settings.

### User Roles & Permissions

| Role | Access Level | Key Permissions |
|---|---|---|
| Administrator | Full | Manage site settings, Store mode switch, WooCommerce products, orders, coupons, shipping, users, theme, plugins |
| Shop Manager | High | Manage products, orders, coupons, and stock; cannot change plugins, theme, or users |
| Content Editor | Medium | Edit pages, banners, blog posts, and policy text; cannot access orders or products |
| Customer | Standard | Own account, own orders, own addresses, own wishlist (P1); purchase and checkout |
| Guest / Subscriber | Public | Browse, sign up for early access, guest checkout |

### Persona 1 — Streetwear Buyer (Primary)

| Attribute | Detail |
|---|---|
| Name | Karim, 22, university student in Alexandria |
| Role | Fashion-conscious buyer; follows streetwear accounts on Instagram and TikTok |
| Goal | Buy a hoodie from the first drop quickly and be sure of the size and delivery |
| Pain Point | Many local brands post products on social media without clear sizing, delivery times, or a reliable way to pay on delivery |
| Tech Level | High (mobile-first) |
| Frequency | Checks the site around drop dates; buys 1–2 times per drop |
| Success Definition | Finds the hoodie, selects a size, pays COD, and receives an order confirmation in under 5 minutes |

### Persona 2 — Early-Access Subscriber (Secondary)

| Attribute | Detail |
|---|---|
| Name | Nour, 25, marketing professional in Cairo |
| Role | Follows the brand after seeing a QR code on packaging or a social post |
| Goal | Learn when the first drop happens and get early access before it sells out |
| Pain Point | Social posts are easy to miss; no single place to register interest |
| Tech Level | Medium–High |
| Frequency | Visits once or twice during the pre-launch period |
| Success Definition | Submits email once, sees a clear confirmation message, and receives a drop announcement |

### Persona 3 — Brand Operator (Admin)

| Attribute | Detail |
|---|---|
| Name | Operator, brand team member responsible for the store |
| Role | Manages products, orders, and the Store/Coming Soon switch |
| Goal | Publish a new product in under 10 minutes and process COD orders daily |
| Pain Point | Manual order tracking across chats and social DMs |
| Tech Level | Low–Medium |
| Frequency | Daily during drops |
| Success Definition | Can publish, unpublish, and fulfill orders without developer help |

---

## SECTION 6 — MoSCoW Feature Prioritization

### Must Have — P0

| ID | Feature | Status | Description | Assigned To | Sprint |
|---|---|---|---|---|---|
| P0-F001 | Coming Soon Mode and Store Mode Switch | TODO | Single admin setting that switches the homepage between the Coming Soon landing page and the full store | Frontend Dev / WP Dev | Sprint 1 |
| P0-F002 | Dark Mode and Light Mode | TODO | Theme toggle with system preference detection, persisted choice, and full token coverage in both modes | Frontend Dev / Designer | Sprint 1 |
| P0-F003 | Product Catalog and Listing | TODO | Category pages, product grid, sorting, and category filtering using WooCommerce products | WP Dev / Frontend Dev | Sprint 2 |
| P0-F004 | Product Detail and Variation Selection | TODO | Product page with image gallery, size and color selection, stock state, and add-to-cart | WP Dev / Frontend Dev | Sprint 2 |
| P0-F005 | Shopping Cart | TODO | Cart page and mini cart drawer with quantity updates, coupon application, and persistence across sessions | WP Dev / Frontend Dev | Sprint 2 |
| P0-F006 | Checkout with Cash on Delivery | TODO | Guest and registered checkout with address capture for Egyptian governorates, COD payment, and order confirmation | WP Dev | Sprint 3 |
| P0-F007 | Early-Access Email Sign-Up | TODO | Coming Soon sign-up form with consent capture, double opt-in confirmation, and export to email tool | WP Dev / Frontend Dev | Sprint 1 |

### Should Have — P1

| ID | Feature | Status | Description | Assigned To | Sprint |
|---|---|---|---|---|---|
| P1-F001 | Customer Account and Order History | TODO | Registration, login, password reset, My Account with orders, addresses, and order details | WP Dev | Sprint 4 |
| P1-F002 | Order Status Emails and Tracking Page | TODO | Transactional emails at each status change; order lookup by order number and billing email | WP Dev | Sprint 4 |
| P1-F003 | Search | TODO | Product search with results page and no-results state | WP Dev / Frontend Dev | Sprint 4 |
| P1-F004 | Wishlist (Logged-in Users) | TODO | Add/remove wishlist items; wishlist page in My Account | WP Dev / Frontend Dev | Sprint 4 |
| P1-F005 | Product Reviews | TODO | WooCommerce reviews with star rating, moderation, and verified-purchase badge | WP Dev | Sprint 5 |
| P1-F006 | Brand Pages and Policy Pages | TODO | About, Contact, Shipping, Returns, Privacy, Terms, Cookies, FAQ | Content Editor / WP Dev | Sprint 5 |
| P1-F007 | Sales Analytics and Consent Management | TODO | GA4 events for view, add to cart, begin checkout, purchase; consent banner blocking non-essential tracking until accepted | WP Dev | Sprint 5 |

### Could Have — P2

| ID | Feature | Status | Description | Assigned To | Sprint |
|---|---|---|---|---|---|
| P2-F001 | Arabic (RTL) Storefront | TODO | Arabic translation of storefront content and RTL layout | Frontend Dev / Content | Post-launch (v1.1) |
| P2-F002 | Recently Viewed Products | TODO | Cookie-based list of last 6 viewed products | Frontend Dev | Post-launch |
| P2-F003 | Free Shipping Progress Bar | TODO | Cart indicator showing amount remaining for free shipping threshold | Frontend Dev | Post-launch |
| P2-F004 | Back-in-Stock Notification | TODO | Email sign-up on out-of-stock variations | WP Dev | Post-launch |
| P2-F005 | Floating WhatsApp Contact Button | TODO | Static wa.me link button on all store pages | Frontend Dev | Sprint 5 (if approved) |

### Won't Have — P3

| ID | Feature | Status | Description | Assigned To | Sprint |
|---|---|---|---|---|---|
| P3-F001 | Online Payment Gateways (Paymob, Fawry, Cards) | SKIPPED | Deferred to v2 | — | v2 |
| P3-F002 | Multi-vendor Marketplace | SKIPPED | Not applicable to single-brand store | — | — |
| P3-F003 | Loyalty Points and Store Wallet | SKIPPED | Deferred to v2 | — | v2 |
| P3-F004 | Product Comparison | SKIPPED | Not justified for a small catalog | — | v2 |
| P3-F005 | Native Mobile App | SKIPPED | Mobile-responsive web only | — | v2 or later |

### Deferred Feature Note

Features not listed above (Live Chat, AI Chatbot, Subscriptions, Bookings, Multi-currency, B2B) are out of scope and recorded in Section 4.

---

## SECTION 7 — Functional Requirements

### P0-F001 — Coming Soon Mode and Store Mode Switch

**User Story:** As the brand operator, I want to switch the public homepage between Coming Soon and Store mode from WordPress admin, so that the site can launch Drop 01 without a code deployment.

**Trigger:** Operator changes the "Site Mode" setting to Store and saves.

**Pre-conditions:**
- Operator has Administrator or Shop Manager role.
- At least one WooCommerce product is published before Store mode is activated (enforced by validation).

**Post-conditions:**
- Public homepage renders the Store homepage.
- Coming Soon sign-up page remains reachable at /early-access/ for 30 days after switch.
- Setting change is recorded in the activity log with user ID and timestamp.

**Main Flow:**
1. Operator opens Settings → GØT Site Mode.
2. System displays current mode (Coming Soon or Store) and a count of published products.
3. Operator selects Store and clicks Save.
4. System checks that at least one product is published and in stock.
5. System saves the mode, clears the page cache, and renders a success notice.
6. Visitor requests the homepage and receives the Store homepage.

**Alternate Flows:**
- **A1 — No published products:** At step 4, system blocks the change and shows: "Publish at least one product before enabling Store mode."
- **A2 — Switch back to Coming Soon:** Operator selects Coming Soon. Store pages remain accessible via direct URL but are removed from the main navigation, and the homepage returns to the Coming Soon layout.
- **A3 — Cache clear failure:** System saves the mode and shows a warning: "Mode saved. Cache could not be cleared automatically; clear the cache manually."

**Acceptance Criteria:**
- [ ] With Site Mode set to Coming Soon, the homepage shows the Coming Soon hero and sign-up form for an unauthenticated visitor.
- [ ] With Site Mode set to Store and at least one published product, the homepage shows the store homepage within one request cycle after saving.
- [ ] Switching to Store with zero published products shows the blocking message and does not change the mode.
- [ ] Only users with Administrator or Shop Manager capability can change the setting; other roles receive HTTP 403.
- [ ] The setting change is written to the activity log with user ID and timestamp.

---

### P0-F002 — Dark Mode and Light Mode

**User Story:** As a visitor, I want to choose dark or light mode, so that the site is comfortable to read in my lighting and device settings.

**Trigger:** Visitor clicks the theme toggle in the header, or the page loads for the first time without a saved preference.

**Pre-conditions:**
- Theme tokens for both modes are defined in the Sage theme stylesheet.
- Visitor's browser supports CSS custom properties (all supported browsers listed in Section 8).

**Post-conditions:**
- The document root has data-theme set to "dark" or "light".
- The chosen preference is stored in localStorage under key `got-theme`.
- Next visit uses the stored preference without a flash of the wrong theme.

**Main Flow:**
1. On page load, an inline script in the document head reads `got-theme` from localStorage.
2. If no value is stored, the script reads the operating system preference (prefers-color-scheme).
3. If the operating system preference is unavailable, the script uses dark as default.
4. Script sets data-theme on the html element before the first paint.
5. Visitor clicks the theme toggle in the header.
6. System switches the data-theme value and updates the stored preference.
7. Toggle icon and aria-label update to describe the next action ("Switch to light mode" or "Switch to dark mode").

**Alternate Flows:**
- **A1 — localStorage unavailable (private browsing, blocked storage):** System applies the theme for the current page view only and does not persist it. No error is shown.
- **A2 — JavaScript disabled:** The page renders in dark mode using the CSS default; the toggle is hidden because it requires JavaScript.
- **A3 — Operating system preference changes while no manual choice is stored:** The site follows the new system preference on next page load.

**Design Token Requirements:**

| Token | Dark Mode | Light Mode | Use |
|---|---|---|---|
| --got-bg | #080808 | #F2F2F0 | Page background |
| --got-surface | #111111 | #FFFFFF | Cards, drawers, header |
| --got-surface-2 | #202020 | #E6E6E4 | Secondary surfaces, inputs |
| --got-border | #303030 | #D0D0CE | Dividers, input borders |
| --got-text | #F2F2F0 | #080808 | Body text |
| --got-text-muted | #A3A3A3 | #555555 | Secondary labels (must meet 4.5:1) |
| --got-accent | #BFC0C2 | #3A3A3C | Metallic accent, focus ring base |
| --got-logo | #FFFFFF | #080808 | Logo fill |
| --got-cta-bg | #F2F2F0 | #080808 | Primary button background |
| --got-cta-text | #080808 | #F2F2F0 | Primary button text |

Token values are proposed from the brand guide palette and must be checked against WCAG 2.1 AA before Phase 1 sign-off. The brand guide's #777777 steel gray is not used for body text in either mode because it falls below 4.5:1 on the dark background.

**Acceptance Criteria:**
- [ ] Toggle is keyboard-operable (Tab to focus, Enter or Space to activate) and has a visible focus ring in both modes.
- [ ] No flash of incorrect theme on a hard reload in either mode (verified on 3G throttled profile).
- [ ] All body text and UI text meets 4.5:1 contrast in both modes; large text and UI components meet 3:1.
- [ ] Product images, the logo, and WooCommerce blocks (cart, checkout, My Account) render correctly in both modes with no hard-coded colors.
- [ ] The stored preference persists across page navigation and browser restart.
- [ ] Theme toggle has an accessible name that changes with the current state.

---

### P0-F003 — Product Catalog and Listing

**User Story:** As a streetwear buyer, I want to browse products by category and sort them, so that I can find items that match my style and size quickly.

**Trigger:** Visitor opens the Shop page or a category URL.

**Pre-conditions:**
- At least one product is published in the category.
- Store mode is active.

**Post-conditions:**
- The product grid displays only published, visible products.
- Filter and sort state is reflected in the URL query string so the view can be shared and bookmarked.

**Main Flow:**
1. Visitor opens /shop/ or /product-category/{slug}/.
2. System loads the first 12 products ordered by the default sort (newest first).
3. Each product card shows image, name, price in EGP, and a status badge if applicable (NEW, SOLD OUT).
4. Visitor selects a sort option (Newest, Price low to high, Price high to low).
5. System updates the grid and the URL query string.
6. Visitor selects a size filter.
7. System filters the grid to products with at least one in-stock variation in that size.
8. Visitor scrolls to the bottom and selects "Load more"; system appends the next 12 products.

**Alternate Flows:**
- **A1 — Empty category:** System displays "No products in this collection yet" and a link to the full Shop page. Coming Soon sign-up is not shown on empty categories.
- **A2 — Filter returns no results:** System displays "No products match these filters" and a "Clear all filters" button.
- **A3 — Product becomes unpublished while listed:** On next page load the product disappears from the grid. No error is shown to the visitor.

**Acceptance Criteria:**
- [ ] The grid shows 12 products per page on desktop and 8 per page on mobile, with a "Load more" control that appends without a full page reload.
- [ ] Sorting by price low to high orders products by the lowest variation price in ascending order.
- [ ] Applying a size filter removes products with no in-stock variation in that size within 300 ms of selection.
- [ ] Sold-out products display a SOLD OUT badge and cannot be added to cart.
- [ ] Listing page LCP is under 2.5 s on a simulated mid-range Android device over 4G.
- [ ] Filter and sort state is preserved when the visitor uses the browser back button.

---

### P0-F004 — Product Detail and Variation Selection

**User Story:** As a streetwear buyer, I want to see clear product images, choose my size and color, and add the item to my cart, so that I can purchase the exact variation I need.

**Trigger:** Visitor opens a product URL, /product/{slug}/.

**Pre-conditions:**
- Product is published and visible in the catalog.
- Product has at least one image.

**Post-conditions:**
- If add-to-cart succeeds, the cart count in the header increases by the selected quantity.
- Selected variation ID is stored in the cart line item.

**Main Flow:**
1. System loads product name, price, gallery, description, and variation options.
2. Visitor views the gallery; system displays the first image at full width on mobile and a main image with thumbnails on desktop.
3. Visitor selects a color; gallery and variation list update to show images for that color, if provided.
4. Visitor selects a size; system displays the price and stock status for that variation.
5. Visitor sets quantity (default 1, maximum 10 per variation).
6. Visitor clicks "Add to cart".
7. System adds the variation to the cart and opens the mini cart drawer showing the new item.

**Alternate Flows:**
- **A1 — Size out of stock:** Size option is shown with a strikethrough and cannot be selected. If the visitor has already selected it, the "Add to cart" button is disabled and shows "Select an available size".
- **A2 — Requested quantity exceeds stock:** System caps the quantity at available stock and shows "Only {n} left in this size".
- **A3 — Variation not selected:** "Add to cart" displays "Select a size" inline and does not submit.
- **A4 — Add to cart request fails (network or server error):** System displays "Could not add to cart. Check your connection and try again." and preserves the selected variation.

**Acceptance Criteria:**
- [ ] Gallery supports swipe on mobile and click-to-zoom on desktop without changing page layout.
- [ ] Selecting a variation updates price and stock state within 200 ms without a full page reload.
- [ ] Add to cart is disabled until a size and quantity of at least 1 are selected.
- [ ] Quantity cannot exceed the stock quantity or 10, whichever is lower.
- [ ] Product page passes WCAG 2.1 AA for size and color selection (labeled radio groups, keyboard navigation with arrow keys).
- [ ] Product schema (name, price, availability, SKU, image) is output in JSON-LD and validates in Google's Rich Results Test.

---

### P0-F005 — Shopping Cart

**User Story:** As a streetwear buyer, I want to review and edit my cart, apply a coupon, and see my total before checkout, so that I know exactly what I will pay.

**Trigger:** Visitor adds an item to cart, or opens the Cart page.

**Pre-conditions:**
- WooCommerce session or cookie is available.

**Post-conditions:**
- Cart contents, quantities, and applied coupons persist for 14 days for guests and indefinitely for logged-in customers.
- All totals are calculated on the server, not in the browser.

**Main Flow:**
1. Visitor opens the mini cart drawer from the header.
2. System displays each line item with image, name, selected size and color, quantity control, line total, and remove control.
3. Visitor changes quantity; system updates the line total and cart subtotal.
4. Visitor enters a coupon code and clicks Apply.
5. System validates the coupon and updates the cart total.
6. Visitor selects "Checkout".
7. System navigates to the checkout page with the same cart contents.

**Alternate Flows:**
- **A1 — Empty cart:** System displays "Your cart is empty" and a "Shop new arrivals" button.
- **A2 — Invalid or expired coupon:** System displays "This coupon code is not valid" and does not modify the cart.
- **A3 — Product sold out after being added:** On cart load, the line item is marked "Sold out — remove to continue" and checkout is blocked until removed.
- **A4 — Price changed since add to cart:** Cart shows the current price with a note: "Price updated since you added this item."
- **A5 — Quantity exceeds stock after change:** System reduces the quantity to available stock and shows "Quantity adjusted to available stock."

**Acceptance Criteria:**
- [ ] Cart totals match the sum of line totals plus shipping (if any) and discounts, to the nearest piropiastre (EGP 0.01).
- [ ] Quantity update takes effect within 500 ms and does not require a full page reload in the mini cart.
- [ ] A guest cart survives closing and reopening the browser within 14 days.
- [ ] After login, guest cart items merge with the customer's saved cart without duplicate line items for the same variation.
- [ ] Coupon application responds within 1 s and shows a clear message for valid and invalid codes.
- [ ] Checkout is blocked whenever any line item is sold out or has quantity above stock.

---

### P0-F006 — Checkout with Cash on Delivery

**User Story:** As a streetwear buyer, I want to enter my delivery details and pay cash on delivery, so that I can place an order without needing an online payment method.

**Trigger:** Visitor selects "Checkout" from the cart.

**Pre-conditions:**
- Cart has at least one valid, in-stock line item.
- COD is enabled in WooCommerce payment settings.
- At least one shipping zone covers the selected governorate.

**Post-conditions:**
- An order with status "Pending payment" or "Processing" (per COD setting) is created.
- Stock is reduced for each line item on order creation.
- Order confirmation email is sent to the billing email.
- Duplicate submissions within 60 seconds of the first are rejected.

**Main Flow:**
1. Visitor enters first name, last name, phone (Egyptian format, +20), email, governorate, city, street address, and building/apartment.
2. Visitor selects "Ship to a different address" only if needed.
3. System displays shipping method and fee for the selected governorate.
4. Visitor reviews the order summary.
5. Visitor checks the Terms and Privacy checkbox.
6. Visitor selects "Cash on Delivery" and clicks "Place order".
7. System validates all fields, creates the order, reduces stock, clears the cart, and redirects to the order confirmation page.
8. System sends the order confirmation email.

**Alternate Flows:**
- **A1 — Invalid phone format:** Inline error "Enter a valid Egyptian mobile number (e.g. 01X XXXX XXXX)". The form is not submitted.
- **A2 — Governorate not covered by a shipping zone:** Inline error "We do not deliver to this governorate yet" and the Place order button is disabled.
- **A3 — Stock changed during checkout:** System shows "One or more items are no longer available" with the affected items listed; the visitor returns to cart.
- **A4 — Double-click or repeated submit:** Button is disabled after the first click and shows a spinner. A second request within 60 seconds with the same cart returns the existing order instead of creating a new one.
- **A5 — Server error during order creation:** System shows "Your order could not be placed. Your cart has been saved. Please try again." Cart is not cleared and no stock is reduced.
- **A6 — Guest enters an email already registered:** System suggests "Log in to view your orders" and keeps the guest checkout open.

**Acceptance Criteria:**
- [ ] All required fields are validated inline on blur and again on submit; no page reload is needed to see an error.
- [ ] Egyptian mobile numbers are accepted in the formats 01[0125]XXXXXXXX and +20 1[0125]XXXXXXXX.
- [ ] COD order creation completes and the confirmation page renders within 2 s on a 4G connection.
- [ ] Stock is reduced exactly once per order; a repeated submission does not create a second order or a second stock reduction.
- [ ] Order confirmation email is delivered within 2 minutes of order creation in 99% of cases.
- [ ] No payment card or gateway secret is present in the page source, browser storage, or network responses on checkout.
- [ ] Checkout completes in 4 steps or fewer on a 390 px wide viewport for a guest buyer (fields, review, place order).

---

### P0-F007 — Early-Access Email Sign-Up

**User Story:** As a potential buyer, I want to sign up for early access to the first drop, so that I receive the announcement before the public.

**Trigger:** Visitor submits the email (and optional first name and WhatsApp number) on the Coming Soon page or the Early Access page.

**Pre-conditions:**
- Coming Soon mode is active or the Early Access page is published.
- Email tool integration is configured with a sending domain.
- Spam protection (honeypot and rate limiting) is enabled.

**Post-conditions:**
- A subscriber record exists with status "Pending confirmation" and a consent timestamp.
- A confirmation email is sent.
- After confirmation, the subscriber status is "Confirmed" and the record is synced to the email tool list.

**Main Flow:**
1. Visitor enters email and selects the consent checkbox ("I agree to receive drop announcements from GØT. You can unsubscribe at any time.").
2. Visitor clicks "Get early access".
3. System validates the email format and checks the honeypot field is empty.
4. System saves the subscriber as Pending and sends a confirmation email.
5. System shows the confirmation state: "Check your inbox to confirm your spot."
6. Subscriber clicks the confirmation link within 48 hours.
7. System marks the subscriber Confirmed and shows the thank-you state.

**Alternate Flows:**
- **A1 — Invalid email format:** Inline error "Enter a valid email address." Form is not submitted.
- **A2 — Consent checkbox not selected:** Inline error "Please agree to receive announcements to continue."
- **A3 — Email already confirmed:** System shows "You're already on the list" without creating a duplicate.
- **A4 — Confirmation link expired (after 48 hours):** Page shows "This link has expired. Sign up again to receive a new link."
- **A5 — Rate limit exceeded (more than 5 submissions per IP per hour):** System shows "Too many attempts. Try again later." and does not send any email.
- **A6 — Email tool unavailable:** Subscriber is saved locally with status "Sync pending" and a retry job runs every 15 minutes for up to 24 hours.

**Acceptance Criteria:**
- [ ] No subscriber receives any marketing email before confirming via double opt-in.
- [ ] Consent timestamp and the exact consent text shown are stored with each record.
- [ ] Every marketing email contains a working unsubscribe link that takes effect within 24 hours.
- [ ] Duplicate email submissions do not create duplicate records in the database or the email tool.
- [ ] Form is fully operable by keyboard and announces validation errors to screen readers via aria-live.
- [ ] Sign-up form does not collect any data beyond email, optional first name, and optional WhatsApp number.

---

### P1-F001 — Customer Account and Order History (Summary)

**User Story:** As a returning customer, I want to log in and see my orders and saved addresses, so that I can reorder and track my purchases.

**Trigger:** Visitor selects Register or Log in, or completes a checkout as a new customer.

**Main Flow:** Register with email and password → verify email → log in → open My Account → view Orders, Addresses, Account Details, Wishlist.

**Alternate Flows:** Wrong password (generic error, lockout after 5 failures for 15 minutes); forgotten password (reset link valid for 60 minutes); email already registered (prompt to log in).

**Acceptance Criteria:**
- [ ] Login errors never reveal whether an email address is registered.
- [ ] Customer sees only their own orders; access to another customer's order URL returns HTTP 403.
- [ ] Password reset link expires after 60 minutes and can be used once.
- [ ] Guest orders placed with the same email can be linked to the account after registration.

### P1-F002 — Order Status Emails and Tracking Page (Summary)

**User Story:** As a buyer, I want to be notified when my order status changes and to look up my order without logging in, so that I know when to expect delivery.

**Main Flow:** Operator changes order status in admin → system sends matching email → buyer opens Track Order page → enters order number and billing email → sees status timeline.

**Alternate Flows:** Order number and email do not match (generic "No order found" message); order cancelled (cancellation email, refund note if applicable).

**Acceptance Criteria:**
- [ ] Status emails are sent for: Processing, Out for Delivery, Delivered, Cancelled.
- [ ] Track Order page returns the same result for a mismatched order number and email as for a non-existent order (no enumeration).
- [ ] Tracking timeline shows the statuses in order with date and time.

### P1-F003 — Search (Summary)

**User Story:** As a buyer, I want to search by product name or category, so that I can find a specific item quickly.

**Main Flow:** Visitor types in the header search field → results page lists matching products → visitor applies the same filters as the catalog.

**Alternate Flows:** No results ("No results for {term}" plus link to Shop); empty search submission (no request sent).

**Acceptance Criteria:**
- [ ] Search returns results within 1 s for a catalog of up to 500 products.
- [ ] Search matches product name, SKU, and category name.
- [ ] Search input has an accessible label and results count is announced to screen readers.

### P1-F004 — Wishlist (Summary)

**User Story:** As a logged-in customer, I want to save products to a wishlist, so that I can buy them later.

**Main Flow:** Visitor clicks heart icon on product card or detail page → item saved → Wishlist page lists items → customer moves item to cart.

**Alternate Flows:** Guest clicks heart → prompted to log in or continue as guest (guest list stored in local browser storage for 30 days).

**Acceptance Criteria:**
- [ ] Wishlist persists across sessions for logged-in customers.
- [ ] Moving an item to cart validates stock and variation availability.
- [ ] Heart icon state is announced to screen readers ("Saved" or "Save to wishlist").

### P1-F005 — Product Reviews (Summary)

**User Story:** As a buyer, I want to read verified customer reviews, so that I can judge fit and quality.

**Main Flow:** Verified buyer receives review request email 7 days after delivery → submits rating (1–5) and text → operator approves → review displays with Verified Purchase badge.

**Alternate Flows:** Unverified review attempt (not allowed to submit); review flagged for abuse (hidden pending moderation).

**Acceptance Criteria:**
- [ ] Only customers with a Delivered order for the product can submit a review.
- [ ] Reviews are not shown publicly until approved.
- [ ] Average rating and count display on product card and detail page.

### P1-F006 — Brand Pages and Policy Pages (Summary)

**User Story:** As a visitor, I want to read the brand story and policies, so that I can trust the store before buying.

**Main Flow:** Visitor opens About, Shipping, Returns, Privacy, Terms, Cookies, or FAQ from footer → page renders in current theme mode.

**Acceptance Criteria:**
- [ ] All policy pages are linked from the footer and from checkout.
- [ ] Policy text is supplied by the brand and reviewed by legal before publishing.
- [ ] Brand claims on About page are limited to documented facts.

### P1-F007 — Sales Analytics and Consent Management (Summary)

**User Story:** As the brand operator, I want to measure funnel performance while respecting visitor consent, so that I can make drop decisions with data.

**Main Flow:** Visitor sees consent banner → accepts or rejects → analytics events fire only after acceptance → events: view_item, add_to_cart, begin_checkout, purchase.

**Alternate Flows:** Visitor rejects analytics (no GA4 or pixel requests; essential cookies only).

**Acceptance Criteria:**
- [ ] No non-essential analytics request is sent before consent is given.
- [ ] Purchase event includes order ID, value in EGP, and item list, and fires once per order.
- [ ] Consent choice can be changed from footer link.

---

## SECTION 8 — Non-Functional Requirements

### Performance

| Metric | Target | Measurement |
|---|---|---|
| Largest Contentful Paint (mobile, 4G) | < 2.5 s at 75th percentile | Google PageSpeed / CrUX |
| Interaction to Next Paint | < 200 ms at 75th percentile | Chrome User Experience Report |
| Cumulative Layout Shift | < 0.1 | CrUX |
| Server response time (TTFB) for cached pages | < 200 ms | Synthetic monitoring |
| Checkout form submission response | < 2 s at 95th percentile | APM tracing |
| Homepage weight (mobile, first load) | < 1 MB transfer, excluding video | Lighthouse |

### Security

- HTTPS only, HSTS enabled, TLS 1.2 minimum (TLS 1.3 preferred).
- WordPress core, theme, WooCommerce, and plugins updated within 14 days of a security release.
- Login protected with rate limiting and lockout after 5 failed attempts (15-minute lock).
- Two-factor authentication required for all Administrator and Shop Manager accounts.
- All forms protected with nonces, server-side validation, and output escaping (Blade `{{ }}` escaping by default; `{!! !!}` only for trusted, sanitized content).
- Payment secrets (if added in v2) stored in environment variables, never in theme files or the browser.
- Customer personal data encrypted at rest through the hosting provider's database encryption.
- Security headers: Content-Security-Policy, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.
- Weekly malware scan and file integrity check.
- Admin area restricted by IP allowlist or equivalent WAF rule (optional, decision recorded before launch).

### Availability

- Target uptime: 99.9% monthly, measured by external uptime monitor.
- Planned maintenance windows outside 18:00–23:00 Cairo time on Fridays and Saturdays (peak drop time).
- Recovery Point Objective: 24 hours. Recovery Time Objective: 4 hours.

### Scalability

- Launch traffic assumption: under 5,000 monthly visitors for Drop 01, with peaks up to 10 times the baseline during a drop announcement. Confirmed by the brand owner or revised before Phase 4.
- Catalog size at launch: up to 100 published products. Architecture must support 1,000 products without a rewrite.
- Page caching (full-page cache for public pages, object cache for WooCommerce queries) through the hosting provider or a Redis-compatible object cache.
- Cloudflare CDN in front of the origin for static assets and cached HTML where cookies allow.
- Drop-day plan: queue or stock-hold rule documented to prevent overselling during peak order volume.

### Accessibility

- WCAG 2.1 Level AA across all pages in both dark and light modes.
- Keyboard operable everywhere; visible focus ring at minimum 2 px with 3:1 contrast against adjacent colors.
- Images have meaningful alt text; decorative images use empty alt.
- Form errors announced to screen readers.
- Reduced motion preference respected: no autoplay video or parallax when prefers-reduced-motion is set.
- Touch targets at least 44 × 44 px on mobile.

### Compatibility

- Browsers: Chrome 110+, Safari 16+ (including iOS 16+), Firefox 110+, Samsung Internet 21+, Edge 110+.
- Devices: responsive from 360 px to 1920 px width; tested on at least two Android and two iOS devices before launch.
- Layout uses logical CSS properties (margin-inline, padding-block, inset-inline-start) so Arabic RTL can be enabled in v1.1 without rewriting styles.

### Data and Compliance

- Privacy Policy and Cookie Policy published before public launch.
- Consent recorded for marketing emails with timestamp and exact consent text.
- Egyptian Personal Data Protection Law (Law No. 151 of 2020) considered in data handling; legal review recorded before launch.
- Customer data export and deletion requests handled through WordPress personal data tools within 30 days.
- Data retention: order records retained for accounting requirements (period confirmed by brand's accountant); unconfirmed subscribers deleted after 30 days.
- Analytics and marketing cookies blocked until consent.

### Observability

- Application error logging with severity levels; alerts for error rate above 1% of requests over 5 minutes.
- Uptime monitor checks homepage, shop, cart, and checkout every 1 minute.
- Email delivery monitoring: order and confirmation email delivery rate tracked; alert below 98%.
- Daily backup of database and uploads with 30-day retention and monthly restore test.
- Activity log for admin changes (mode switch, product publish, order status, role changes).

---

## SECTION 9 — Technical Architecture

### Frontend Stack

- **Theme framework:** Roots Sage 10 (current major version) with Acorn for Laravel-style service container and Blade templating.
- **Templating:** Blade templates for all theme views, including WooCommerce overrides under `resources/views/woocommerce/`.
- **Build tooling:** Vite with Sage's built-in asset pipeline; output in `public/build/`.
- **Styling:** Tailwind CSS with the GØT design tokens defined as CSS custom properties in `resources/css/tokens.css`. Dark and light modes are controlled by the `data-theme` attribute on the html element.
- **Interactivity:** Alpine.js for theme toggle, mini cart drawer, gallery, and filter UI. No full client-side framework.
- **Icons:** SVG sprite; no icon font.
- **Fonts:** Self-hosted Inter (body/UI) and Inter Tight (headlines), plus IBM Plex Mono for drop numbers and countdown only. Loaded with font-display: swap and subset to Latin and Arabic glyph ranges for v1.1 readiness.

Theme file structure (summary):

```
resources/
  css/tokens.css        # dark/light token definitions
  css/app.css           # Tailwind entry and component styles
  js/app.js             # Alpine setup, theme toggle, cart drawer
  views/
    layouts/app.blade.php
    partials/header.blade.php
    partials/footer.blade.php
    partials/theme-toggle.blade.php
    partials/early-access-form.blade.php
    sections/coming-soon-hero.blade.php
    sections/product-card.blade.php
    woocommerce/                # overrides for shop, product, cart, checkout, account
app/
  Providers/ThemeServiceProvider.php
  Support/SiteMode.php          # Coming Soon / Store switch logic
  Http/Controllers/EarlyAccessController.php
  Services/EmailSync.php        # Email tool integration
```

### Backend Stack

- **Platform:** WordPress 6.x (latest stable at launch).
- **Commerce:** WooCommerce (latest stable), using core product types, variations, cart, checkout, orders, shipping zones, and My Account.
- **Runtime:** PHP 8.2 or higher (Sage 10 requirement).
- **Custom code:** Delivered as a small mu-plugin or theme service class for Site Mode, early-access sign-up, and email sync. Custom logic does not modify WooCommerce core files.
- **Plugins (capped at 15 for v1):**
  - WooCommerce
  - Email marketing connector (selected tool — TBD)
  - Consent management plugin or custom consent banner
  - SEO plugin (Yoast or Rank Math — TBD)
  - Caching plugin or host-provided caching
  - Security plugin (login protection, malware scanning)
  - Backup plugin or host backup
  - Spam protection for forms (honeypot + rate limit, or reCAPTCHA v3 — TBD)
  - Analytics connector (GA4 via Google Tag Manager)
  - Image optimization (WebP/AVIF conversion)
  - Redirect manager
  - Sitemap generator (if not included in SEO plugin)
  - WooCommerce email customizer (if needed for brand styling)
  - Activity log
  - Page cache purge helper

### Database Architecture

Database: MySQL 8 or MariaDB 10.6+ with WordPress core tables and WooCommerce tables (HPOS, High-Performance Order Storage, enabled).

Custom tables (only if needed):

| Table | Purpose | Key Fields |
|---|---|---|
| got_early_access | Coming Soon sign-up records | id, email (unique), first_name, whatsapp, status (pending/confirmed/sync_pending/unsubscribed), consent_text, consent_at, confirmed_at, ip_hash, created_at |

Alternatively, early-access records are stored as a custom post type or in the email tool; the decision is recorded in Phase 1. Where possible, use WordPress options and post meta to avoid custom schema changes.

Key WooCommerce entities used:

- **Product:** name, slug, description, short description, images, category, tags, attributes (Size, Color), SKU, status, visibility, featured flag.
- **Variation:** size and color attribute values, regular price, sale price (optional), stock quantity, image.
- **Order:** order number, status, billing and shipping addresses, payment method (COD), shipping method, line items, totals, customer ID or guest email.
- **Customer:** user account, billing and shipping addresses, order history.
- **Coupon:** code, type (percent / fixed cart / fixed product), amount, usage limit, expiry, minimum spend.
- **Shipping zone:** governorate list, shipping method, fee.

### Auth and Authorization Design

- Customer authentication: WordPress native login with cookie session; password policy enforced by WordPress (minimum 8 characters, strength meter).
- Administrator and Shop Manager accounts require two-factor authentication through the security plugin.
- Authorization: WordPress roles and capabilities. Custom capability `got_manage_site_mode` granted only to Administrator.
- Customer data isolation: My Account and order views enforce ownership checks on every request. Order URLs with another customer's order ID return HTTP 403.
- Guest checkout: uses WooCommerce guest session with order access key for the confirmation page.
- Sessions: 14 days for guests (cart), standard WordPress session for logged-in users with idle timeout of 2 hours for admin.

### Infrastructure and Deployment

- **Hosting:** Managed WordPress hosting with PHP 8.2+, MySQL 8 or MariaDB 10.6+, HTTPS, daily backups, and staging environment. Provider: [TBD].
- **DNS and CDN:** Cloudflare for DNS, SSL, CDN, WAF, and bot protection. Domain: gøteg.com as supplied; IDN and Punycode handling to be confirmed (see Section 16).
- **Environments:** Local (Lando or Docker), Staging, Production.
- **Deployment:** Git-based. Theme code deployed from the repository; Composer and npm build run in CI. Database and uploads are not deployed from local.
- **CI/CD:** GitHub Actions running PHP lint (PHPStan level 6 or higher), PHP CodeSniffer with WordPress coding standards, Stylelint, ESLint, and Vite build on each pull request. Deployment to staging on merge to main; production deployment is manual with approval.
- **Testing:** PHPUnit for custom service classes, Playwright end-to-end tests for checkout, cart, sign-up, and theme toggle; manual device testing before launch.

### External Integrations

| Integration | Purpose | Method | Required in v1 |
|---|---|---|---|
| Email marketing tool (Mailchimp, MailerLite, or equivalent — TBD) | Early-access list and drop announcements | API via custom service class | Yes |
| Transactional email provider (SMTP or API) | Order and account emails | WordPress mail transport | Yes |
| Google Analytics 4 via GTM | Funnel analytics (consent-gated) | GTM container | Yes |
| Meta Pixel | Paid social attribution | GTM, consent-gated | Optional, decision by brand |
| WhatsApp (wa.me link) | Customer contact | Static link | Yes |
| Paymob / Fawry | Online payment | WooCommerce gateway plugin | No (v2) |
| Egyptian courier API (e.g., Bosta, Aramex — TBD) | Shipment tracking | Tracking link or API | No (manual tracking link in v1) |

---

## SECTION 10 — Implementation Phases

Phase totals: 8 weeks (Week 1 starts 2026-10-08). Drop 01 launch date is set only after Phase 4 is approved.

### Phase 1 — Foundation (Weeks 1–2, 2026-10-08 to 2026-10-21)

**Goal:** Working Sage theme with brand tokens, dark and light modes, Coming Soon page, early-access sign-up, and hosting ready.

**Duration:** 2 weeks

**Tasks:**
- [ ] Provision managed WordPress hosting with PHP 8.2+, staging environment, and daily backups
- [ ] Configure Cloudflare DNS, SSL, and www redirects; verify gøteg.com ownership and IDN/Punycode handling
- [ ] Create Sage 10 project with Acorn, Vite, and Tailwind; set up Git repository and CI pipeline
- [ ] Implement design tokens for dark and light modes in `tokens.css`
- [ ] Build theme toggle with localStorage persistence, system preference detection, and no-flash inline script
- [ ] Build Coming Soon hero (EST. 2026 / ALEXANDRIA, EGYPT; FORGED TO BE DIFFERENT; DROP 01 — COMING SOON) with no countdown
- [ ] Build early-access form with consent, double opt-in, honeypot, and rate limiting
- [ ] Connect early-access form to email tool with sync-pending fallback
- [ ] Implement SiteMode switch (Coming Soon / Store) with admin setting and product-count guard
- [ ] Install WooCommerce, configure store currency (EGP), base address, and tax settings (per accountant)
- [ ] Obtain final logo SVG and brand approval for colors and typography
- [ ] Contrast audit of all tokens in both modes against WCAG 2.1 AA

**Validation step:** Coming Soon page live on staging; theme toggle works on Chrome, Safari, and Android; early-access sign-up sends double opt-in email; contrast audit report shows zero failing text pairs in either mode; brand owner signs off visual direction.

### Phase 2 — Core Features (Weeks 3–4, 2026-10-22 to 2026-11-04)

**Goal:** Full product catalog, product detail with variations, cart, and COD checkout working end to end on staging.

**Duration:** 2 weeks

**Tasks:**
- [ ] Configure product attributes (Size, Color) and variation structure
- [ ] Import Drop 01 products (or create manually) with real photography and confirmed prices
- [ ] Build shop, category, and listing with sort, size filter, and load-more
- [ ] Build product detail page with gallery, variation selector, stock state, and product schema
- [ ] Build mini cart drawer and cart page with quantity updates and coupon application
- [ ] Configure shipping zones for Alexandria, Cairo/Giza, and other governorates with brand-approved fees
- [ ] Enable COD payment method with order status rules
- [ ] Build checkout with Egyptian phone validation, duplicate-order protection, and order confirmation
- [ ] Configure transactional emails with brand styling
- [ ] Implement stock reduction and sold-out handling
- [ ] Write Playwright tests for add to cart, checkout, and COD order placement

**Validation step:** On staging, a test order completes from product page to confirmation email for each shipping zone; stock reduces exactly once; repeated submission creates no duplicate order; all Phase 2 acceptance criteria in P0-F003 through P0-F006 pass.

### Phase 3 — Polish and P1 Features (Weeks 5–6, 2026-11-05 to 2026-11-18)

**Goal:** Customer accounts, order tracking, search, wishlist, reviews, policy pages, and consent-gated analytics live on staging.

**Duration:** 2 weeks

**Tasks:**
- [ ] Build registration, login, password reset, and My Account with orders and addresses
- [ ] Implement order status emails and Track Order page with non-enumerating responses
- [ ] Build search with results page and no-results state
- [ ] Build wishlist for logged-in users with move-to-cart validation
- [ ] Enable reviews with purchase verification and moderation queue
- [ ] Create About, Contact, Shipping, Returns, Privacy, Terms, Cookies, and FAQ pages with brand-supplied text
- [ ] Implement consent banner and GA4 events (view_item, add_to_cart, begin_checkout, purchase)
- [ ] Complete mobile polish: sticky add-to-cart, touch-friendly filters, cart drawer on small screens
- [ ] Add reduced motion support and focus state audit

**Validation step:** All P1 acceptance criteria pass on staging; customer can register, order, and see the order in My Account; analytics fire only after consent; accessibility audit (automated and manual with screen reader) shows zero Critical or Serious issues.

### Phase 4 — Launch Hardening (Weeks 7–8, 2026-11-19 to 2026-12-02)

**Goal:** Production-ready store with security, performance, legal content, and launch readiness confirmed.

**Duration:** 2 weeks

**Tasks:**
- [ ] Complete security hardening: 2FA for admin roles, login rate limiting, security headers, malware scan, file permissions
- [ ] Run performance tests and meet Section 8 targets on mobile
- [ ] Complete cross-browser and device matrix testing
- [ ] Legal review of privacy, terms, returns, and cookie policies; publish approved text
- [ ] Verify all social links, WhatsApp link, email address, and phone number against live accounts
- [ ] Verify QR destinations on packaging artwork resolve to the correct live pages
- [ ] Run full regression test suite; zero open Critical or High defects
- [ ] Configure production monitoring (uptime, error rate, email delivery)
- [ ] Test backup restore on staging
- [ ] Brand owner confirms Drop 01 launch date and product lineup in writing
- [ ] Switch to Store mode and run post-launch smoke test
- [ ] Migrate early-access list to email tool with consent records intact

**Validation step:** Production smoke test passes (homepage, shop, product, cart, COD checkout, confirmation email, sign-up); monitoring active; backup restore verified; brand owner approval recorded in the approval gates table (Section 15).

---

## SECTION 11 — Advanced Execution Rules

### 11.1 User Flows

**Flow A — Coming Soon sign-up (pre-launch):**
1. Visitor lands on homepage from social link or QR code.
2. Coming Soon hero displays: "FORGED TO BE DIFFERENT" and "DROP 01 — COMING SOON".
3. Visitor selects "GET EARLY ACCESS" in the hero; page scrolls to the sign-up form.
4. Visitor enters email, checks consent, and submits.
5. System shows "Check your inbox to confirm your spot."
6. Visitor confirms via email link; system shows "You're on the list."

**Flow B — Buy a product (Store mode):**
1. Visitor lands on homepage; theme follows system preference or saved choice.
2. Visitor selects "Shop new arrivals" or a category.
3. Visitor sorts or filters by size; product grid updates in place.
4. Visitor opens a product, selects color and size, and selects "Add to cart".
5. Mini cart drawer opens showing the item and subtotal.
6. Visitor selects "Checkout"; cart page shows totals and coupon field.
7. Visitor enters delivery details, selects COD, checks terms, and selects "Place order".
8. System creates order, reduces stock, clears cart, shows order number and confirmation, and sends email.

**Flow C — Returning customer order review:**
1. Customer logs in from header.
2. Customer opens My Account → Orders.
3. Customer selects an order and reviews status, items, and address.
4. Customer selects "Track order" if the status is Shipped or Out for Delivery.

### 11.2 Edge Cases

| Condition | System behavior | User feedback |
|---|---|---|
| Invalid input (phone, email, required field) | Server validates; no order or sign-up created | Inline error message next to field, announced to screen readers |
| Empty state — no products in category | Renders empty collection template | "No products in this collection yet" with link to Shop |
| Empty state — empty cart | Renders empty cart template | "Your cart is empty" with "Shop new arrivals" button |
| Empty state — no search results | Returns empty results | "No results for {term}" with suggestions |
| Network failure during add to cart | Request times out after 10 s; client retries once | "Could not add to cart. Check your connection and try again." |
| Payment or order API failure at checkout | Order not created; cart preserved; no stock reduced | "Your order could not be placed. Your cart has been saved." |
| Email tool API down during sign-up | Subscriber saved as Sync pending; retry every 15 min for 24 h | Confirmation message shown normally; no error to visitor |
| Unauthorized order access (another customer's order ID) | Returns HTTP 403; access logged | Generic "You do not have access to this page." |
| Admin without permission tries to switch mode | Request rejected | "You do not have permission to change the site mode." |
| Duplicate order submission (double-click or refresh) | Second request within 60 s returns existing order | Shows the same confirmation page; no second charge or stock change |
| Duplicate email sign-up | No new record created | "You're already on the list." |
| Product sold out after added to cart | Line marked sold out; checkout blocked | "Sold out — remove to continue." |
| Price changed after added to cart | Current price applied; note shown | "Price updated since you added this item." |
| Coupon expired or invalid | Cart unchanged | "This coupon code is not valid." |
| Governorate not covered by shipping | Place order disabled | "We do not deliver to this governorate yet." |
| Dark/light preference unavailable (storage blocked) | Theme applied per page view only | No error shown |
| Duplicate product SKU | Admin validation blocks save | Admin notice identifying the conflicting product |

### 11.3 API Design (Store and Custom Endpoints)

The v1 storefront is server-rendered. Core WooCommerce endpoints and routes are used where available; custom endpoints are limited to early access and Site Mode.

| Method | Route | Resource | Purpose | Access |
|---|---|---|---|---|
| GET | /shop/ | Products | Product listing with sort and filter query params | Public |
| GET | /product/{slug}/ | Product | Product detail with variations | Public |
| POST | /wc/store/v1/cart/add-item | Cart | Add variation to cart | Public (session) |
| POST | /wc/store/v1/cart/update-item | Cart | Update quantity | Public (session) |
| POST | /wc/store/v1/cart/apply-coupon | Cart | Apply coupon code | Public (session) |
| POST | /wc/store/v1/checkout | Order | Create COD order | Public (session) |
| POST | /api/v1/early-access | Subscriber | Submit early-access sign-up | Public, rate limited |
| GET | /api/v1/early-access/confirm/{token} | Subscriber | Confirm double opt-in | Public, token expires 48 h |
| POST | /api/v1/early-access/unsubscribe | Subscriber | Unsubscribe | Public, signed link |
| GET | /my-account/orders/ | Orders | Customer order list | Customer |
| GET | /my-account/view-order/{id}/ | Order | Customer order detail | Customer, owner only |
| GET | /api/v1/track-order | Order | Order status by number and billing email | Public, rate limited |
| PUT | /wp-admin/options (Site Mode) | Setting | Switch Coming Soon / Store | Administrator |

Note: WooCommerce route paths follow the WooCommerce Store API version in use at build time; the table records the intended resource and method, and the exact paths are confirmed in Phase 2.

### 11.4 Data Model

**Subscriber** (custom or email-tool backed)
- id, email (unique), first_name, whatsapp, status (pending / confirmed / sync_pending / unsubscribed), consent_text, consent_at, confirmed_at, created_at

**Product** (WooCommerce)
- id, name, slug, description, short_description, status, featured, sku, images[], category_ids[], tag_ids[], attribute_ids[]

**Product Variation** (WooCommerce)
- id, product_id, size, color, regular_price, sale_price, stock_quantity, image_id, status

**Order** (WooCommerce, HPOS)
- id, order_number, status, customer_id (nullable for guest), billing_email, billing_address{}, shipping_address{}, shipping_method, payment_method (cod), line_items[], subtotal, shipping_total, discount_total, total, created_at

**Order Line Item**
- product_id, variation_id, quantity, unit_price, line_total, size, color

**Coupon** (WooCommerce)
- code, discount_type, amount, usage_limit, usage_count, expiry_date, minimum_spend, individual_use

**Shipping Zone** (WooCommerce)
- zone_name, governorates[], methods[], fee_egp

**Customer** (WordPress user + WooCommerce customer)
- id, email, first_name, last_name, phone, billing_address{}, shipping_address{}, role

**Wishlist Item** (P1, custom table or user meta)
- user_id, product_id, variation_id, created_at

**Review** (WooCommerce)
- id, product_id, customer_id, rating (1–5), content, verified (bool), status (pending / approved / rejected), created_at

**Relationships:** Product 1 → many Variations; Order 1 → many Line Items; Customer 1 → many Orders; Customer 1 → many Wishlist Items; Product 1 → many Reviews.

### 11.5 Build Order

**Phase 1 (Foundation):** Hosting and CI → Sage theme and tokens → dark and light mode → Coming Soon page → early-access sign-up → Site Mode switch.

**Phase 2 (Core commerce):** Product catalog → product detail and variations → cart and mini cart → shipping zones and COD → checkout → order confirmation and emails.

**Phase 3 (Supporting features):** Customer accounts → order status emails and tracking → search → wishlist → reviews → policy pages → consent and analytics.

**Phase 4 (Hardening):** Security → performance → QA matrix → legal text → production switch → migration of early-access list.

Authentication is included in Phase 3 because guest checkout is the Phase 2 launch path; registration is not required to buy.

### 11.6 UX Rules

- **Validation:** All forms validate on blur and on submit. Phone, email, and required fields are checked server-side.
- **Loading states:** Every action that calls the server (add to cart, apply coupon, place order, sign-up, load more) shows a loading indicator within 100 ms and disables the triggering control.
- **Error states:** Inline near the field for validation; banner at form top for server or network errors; never a generic "Something went wrong" without a next step.
- **Success feedback:** Add to cart opens the mini cart with the item highlighted; sign-up shows confirmation state; order placed shows order number and summary.
- **Consistency:** Same button hierarchy (primary = inverted surface, secondary = outlined) in both dark and light modes.
- **Motion:** 180 ms for fast transitions and 350 ms for drawers; disabled under prefers-reduced-motion.
- **Theme:** Toggle always visible in header; theme change applies instantly with no page reload.

### 11.7 Functional Requirements Depth

Each P0 feature in Section 7 includes a user story, main flow, at least one alternate flow, and testable acceptance criteria. Each P1 feature includes a summary; full detail is written in Phase 3 before development starts.

### 11.8 Quantified KPIs

All KPIs are in Section 12 with numeric targets and measurement method.

### 11.9 Risk Prioritization

All risks are in Section 14 with likelihood, impact, score, mitigation, and owner.

### 11.10 Project-Specific Content

Content is specific to GØT: the brand line, Drop 01 status, Alexandria origin, Egyptian phone and governorate handling, COD-first checkout, and the brand's constraints on countdowns, claims, and stock display.

---

## SECTION 12 — Success Metrics and KPIs

### Business Metrics

| Metric | Target | Measurement Method | Tracking Tool | Owner |
|---|---|---|---|---|
| Early-access sign-ups in first 30 days of Coming Soon | 500 confirmed (proposed; confirm with brand) | Count of records with status Confirmed | Email tool + database | Brand Owner |
| Drop 01 units sold in first 14 days | Target set by brand before Phase 4 | WooCommerce order report | WooCommerce analytics | Brand Owner |
| Drop 01 revenue (EGP) in first 14 days | Target set by brand before Phase 4 | WooCommerce order report | WooCommerce analytics | Brand Owner |
| Repeat purchase rate within 90 days | ≥ 15% of buyers (proposed) | Customers with 2+ Completed orders ÷ all customers | WooCommerce analytics | Brand Owner |

### Product Metrics

| Metric | Target | Measurement Method | Tracking Tool | Owner |
|---|---|---|---|---|
| Visitor-to-purchase conversion rate (Store mode) | ≥ 2.0% (proposed) | Purchase events ÷ sessions | GA4 | Product Owner |
| Add-to-cart rate | ≥ 8% of product page sessions (proposed) | add_to_cart events ÷ view_item sessions | GA4 | Product Owner |
| Checkout completion rate | ≥ 50% of begin_checkout sessions (proposed) | purchase ÷ begin_checkout sessions | GA4 | Product Owner |
| Early-access double opt-in confirmation rate | ≥ 60% of submissions (proposed) | Confirmed ÷ submitted within 48 h | Database + email tool | Product Owner |
| Theme toggle usage | Tracked for information only; no target | Toggle events, consent-gated | GA4 | Designer |

### Technical Metrics

| Metric | Target | Measurement Method | Tracking Tool | Owner |
|---|---|---|---|---|
| LCP (mobile, 75th percentile) | < 2.5 s | Field data | CrUX / PageSpeed | Dev Lead |
| INP (75th percentile) | < 200 ms | Field data | CrUX | Dev Lead |
| CLS (75th percentile) | < 0.1 | Field data | CrUX | Dev Lead |
| Error rate (5xx and PHP fatal) | < 0.1% of requests | Server log monitoring | Hosting monitor | Dev Lead |
| Uptime | ≥ 99.9% monthly | External uptime check every 1 min | Uptime monitor | Dev Lead |
| Order confirmation email delivery | ≥ 98% within 2 min | Email provider logs | Email provider | Dev Lead |
| Checkout form response (p95) | < 2 s | APM tracing | APM | Dev Lead |

### User Satisfaction Metrics

| Metric | Target | Measurement Method | Tracking Tool | Owner |
|---|---|---|---|---|
| Post-purchase satisfaction (1–5 survey) | ≥ 4.2 average (proposed) | Survey sent 7 days after delivery | Email survey tool | Brand Owner |
| Product review average rating | ≥ 4.0 once 20 reviews exist (proposed) | Average of approved reviews | WooCommerce | Brand Owner |
| Support contacts about delivery or payment per 100 orders | ≤ 5 (proposed) | Support log ÷ orders × 100 | Support log | Operator |

### Review Frequency

- Business and product metrics: weekly during pre-launch and first 30 days after launch; monthly after.
- Technical metrics: daily automated report; weekly review.
- User satisfaction: monthly.

---

## SECTION 13 — Timeline and Milestones

**Start date:** 2026-10-08
**Target public launch of Store mode:** 2026-12-02 (end of Phase 4), subject to Drop 01 launch date confirmation in writing
**Total duration:** 8 weeks

| Milestone | Description | Due Date | Status | Owner |
|---|---|---|---|---|
| Kickoff | Team and roles confirmed; inputs requested from brand | 2026-10-08 | TODO | Product Owner |
| PRD Approved | This document approved by brand owner | 2026-10-10 | TODO | Brand Owner |
| Phase 1 Done | Foundation, dark/light mode, Coming Soon, sign-up on staging | 2026-10-21 | TODO | Dev Lead |
| Phase 2 Done | Catalog, cart, COD checkout on staging | 2026-11-04 | TODO | Dev Lead |
| Phase 3 Done | Accounts, tracking, search, wishlist, reviews, policies on staging | 2026-11-18 | TODO | Dev Lead |
| Phase 4 Done | Hardening, legal, QA sign-off, production ready | 2026-12-02 | TODO | Dev Lead |
| Beta Launch | Internal and invited buyers test COD checkout on production | [TBD — after Phase 4] | TODO | Product Owner |
| Public Launch | Drop 01 live in Store mode | [TBD — confirmed by brand] | TODO | Brand Owner |

---

## SECTION 14 — Risk Register

Scoring: Likelihood and Impact are scored High = 3, Medium = 2, Low = 1. Score = Likelihood × Impact.

| ID | Description | Likelihood | Impact | Score | Mitigation | Owner |
|---|---|---|---|---|---|---|
| R-001 | Brand assets incomplete (logo SVG, product photos, prices) delay Phase 2 | High (3) | High (3) | 9 | Request full asset list in Week 1; agree a fallback date; use placeholder content flagged as non-public | Product Owner |
| R-002 | Launch date set before products and legal text are ready | Medium (2) | High (3) | 6 | Store mode switch blocked until product guard passes; launch date only confirmed after Phase 4 review | Brand Owner |
| R-003 | Overselling on drop day causes unfulfillable orders | Medium (2) | High (3) | 6 | Stock reduced at order creation; stock limits per size; manual review of orders above threshold; queue documented | Shop Manager |
| R-004 | Email deliverability issues (confirmation emails land in spam) | Medium (2) | High (3) | 6 | Configure SPF, DKIM, DMARC on sending domain; test with major providers in Phase 1 | Dev Lead |
| R-005 | Traffic spike on drop announcement overloads shared hosting | Medium (2) | Medium (2) | 4 | Full-page caching; Cloudflare CDN; load test to 10× baseline before launch; upgrade plan if needed | Dev Lead |
| R-006 | Plugin conflicts with Sage 10 or WooCommerce updates | Medium (2) | Medium (2) | 4 | Cap plugins at 15; pin versions; staging test before every update | Dev Lead |
| R-007 | COD fraud or non-delivery increases cost | Medium (2) | Medium (2) | 4 | Phone verification at checkout (OTP in v2 if needed); order confirmation call for first-time buyers above threshold; return policy clearly defined | Shop Manager |
| R-008 | Data protection non-compliance (consent, storage, privacy policy) | Low (1) | High (3) | 3 | Double opt-in; consent logging; legal review before launch; data retention rules documented | Brand Owner |
| R-009 | Dark or light palette fails contrast on some product photography | Medium (2) | Low (1) | 2 | Contrast audit in Phase 1; product image background rules; photography brief for both modes | Designer |
| R-010 | Domain or DNS issues (IDN handling, SSL, unverified ownership) | Low (1) | High (3) | 3 | Verify ownership in Week 1; Punycode and redirect test on staging; keep original DNS records documented | Dev Lead |
| R-011 | Social handles inconsistent across channels, causing broken links on packaging QR codes | Medium (2) | Medium (2) | 4 | Verify all handles and QR destinations in Phase 4; keep an approved link register | Brand Owner |
| R-012 | Single key person dependency for WordPress and Sage knowledge | Medium (2) | Medium (2) | 4 | Document setup in repository README; knowledge transfer session before launch | Dev Lead |

---

## SECTION 15 — Stakeholders and Approvals

### Stakeholders

| Name | Role | Involvement | Contact |
|---|---|---|---|
| [TBD] | Brand Owner / Product Owner | Approves scope, content, pricing, launch date | [TBD] |
| [TBD] | Operator / Shop Manager | Manages products, orders, drop announcements | [TBD] |
| [TBD] | WordPress / WooCommerce Developer | Builds Sage theme, WooCommerce setup, custom services | [TBD] |
| [TBD] | Frontend Developer | Theme UI, dark and light mode, interactions | [TBD] |
| [TBD] | UI/UX Designer | Brand application, token approval, photography direction | [TBD] |
| [TBD] | QA Engineer | Test plan, regression, device matrix | [TBD] |
| [TBD] | Legal Reviewer | Privacy, terms, returns, cookie policy | [TBD] |

### Approval Gates

| Gate | Approver | Required By | Status |
|---|---|---|---|
| PRD approval | Brand Owner | 2026-10-10 | TODO |
| Design and token approval (dark and light) | Brand Owner + Designer | 2026-10-15 | TODO |
| Phase 1 sign-off (Coming Soon on staging) | Brand Owner | 2026-10-21 | TODO |
| Phase 2 sign-off (commerce on staging) | Product Owner | 2026-11-04 | TODO |
| Phase 3 sign-off (accounts and P1 features) | Product Owner | 2026-11-18 | TODO |
| Legal text approval | Legal Reviewer + Brand Owner | 2026-11-25 | TODO |
| Production go-live | Brand Owner | Before Drop 01 public launch | TODO |

---

## SECTION 16 — References and Links

| Item | Link / Value | Status |
|---|---|---|
| Brand identity guide | GOT_Complete_Brand_Identity.md (uploaded reference) | Available |
| Design files (Figma or equivalent) | [TBD] | TBD |
| Logo master (SVG/AI) | [TBD — required from brand] | TBD |
| Repository | [TBD] | TBD |
| WordPress site (staging) | [TBD] | TBD |
| WordPress site (production) | https://gøteg.com (supplied; ownership and DNS not verified) | TBD |
| Punycode form of domain | [TBD — confirm ASCII representation] | TBD |
| Sage 10 documentation | https://roots.io/sage/docs/ | Reference |
| WooCommerce documentation | https://woocommerce.com/documentation/ | Reference |
| API docs (WooCommerce Store API) | https://developer.woocommerce.com/docs/apis/store-api/ | Reference |
| Architecture diagram | [TBD] | TBD |
| CI/CD pipeline | GitHub Actions — [TBD link] | TBD |
| Monitoring dashboard | [TBD] | TBD |
| Instagram | https://www.instagram.com/got.official1/ (supplied; verify before publishing) | TBD |
| TikTok | https://www.tiktok.com/@got.offical (supplied; verify before publishing) | TBD |
| Facebook | [TBD — exact page URL not supplied] | TBD |
| WhatsApp contact | https://wa.me/201001276371 (supplied; test before publishing) | TBD |
| Contact email | gotoffical1@gmail.com (supplied; domain email planned) | TBD |
| Slack channel | [TBD] | TBD |
| Meeting notes | [TBD] | TBD |
| Related PRDs | None | — |

Note: Social handles are spelled differently across platforms (got.official1, got.offical, gotoffical1). Each link must be verified against the live account before it appears on the site or on printed materials.

---

## SECTION 17 — Revision History

| Version | Date | Author | Changes |
|---|---|---|---|
| v1.0 | 2026-10-08 | [TBD — owner] | Initial PRD created |

---

*End of document.*
