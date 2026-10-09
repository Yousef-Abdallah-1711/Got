# Release Scope

Grounded directly in `GOT-Store-PRD.md` §6 MoSCoW table and §3 Success Definition. This document translates that into the 16-feature roadmap's launch-vs-post-launch split.

## v1 launch-blocking (Must Have, P0 — all required per PRD §3 Success Definition)

| PRD ID | Feature | Roadmap feature(s) |
|---|---|---|
| P0-F001 | Coming Soon / Store mode switch | 002, 003, 005 |
| P0-F002 | Dark mode / light mode | 003 |
| P0-F003 | Product catalog and listing | 007 (catalog only, not search) |
| P0-F004 | Product detail and variation selection | 008 |
| P0-F005 | Shopping cart | 010 |
| P0-F006 | Checkout with Cash on Delivery | 010, 013 (confirmation/email), 014 (shipping zones) |
| P0-F007 | Early-access email sign-up | 005 |

Plus the cross-cutting hardening gate (016) and production-acceptance gate (017), since PRD §3 requires "zero open Critical or High defects" and a completed production COD order before success is declared.

## v1 target, schedule-permitting (Should Have, P1 — PRD §6: "Target v1 according to PRD schedule; any unfinished feature needs explicit release decision")

| PRD ID | Feature | Roadmap feature(s) |
|---|---|---|
| P1-F001 | Customer account and order history | 011 |
| P1-F002 | Order status emails and tracking page | 013 |
| P1-F003 | Search | 007 (search sub-scope) |
| P1-F004 | Wishlist (logged-in users) | 012 |
| P1-F005 | Product reviews | *(not yet assigned a dedicated roadmap feature — falls under 015's content scope or a future 018; flagged as a minor roadmap gap)* |
| P1-F006 | Brand pages and policy pages | 015 |
| P1-F007 | Sales analytics and consent management | 015 |

**Explicit PRD language**: any P1 item not finished by the Phase 3 gate "needs explicit release decision" — i.e., slipping a P1 item to post-launch is an allowed, expected outcome, not a project failure, as long as the owner explicitly signs off on which ones slip.

## Post-launch / v1.1+ (Could Have, P2)

Arabic/RTL storefront, recently viewed products, free-shipping progress bar, back-in-stock notification, floating WhatsApp button (P2-F001–005, PRD §6) — none of these are in the 002–017 roadmap's launch path; they'd become a future roadmap feature 018+ if/when prioritized.

## Explicitly out of v1 (Won't Have, P3 / v2, PRD §6)

Online payment gateways, multi-vendor marketplace, loyalty/wallet, product comparison, native mobile app — not planned anywhere in this roadmap.

## Items this roadmap adds beyond the PRD's own scope (owner decision required before they're "in" anything)

- **009 — Inline PDP COD checkout**: not in the PRD at all; fully designed in the prototype. Gated on C-02/ADR 0006.
- **BOGO** (part of 014): not in the PRD at all; UI exists in the design system. Gated on C-03/ADR 0009.

Neither of these two items should be assumed "in scope" by anyone reading only the roadmap feature list — both require the explicit approval flagged in their respective ADRs before a single line of implementation code is written for them.

## Drop 01 product/content readiness is a separate gate from engineering readiness

Per `docs/audit/missing-assets.md`, even a 100%-complete engineering build of every P0 feature cannot launch without: real Drop 01 product data/photography/prices, shipping fees, legal policy text, and a confirmed launch date — all brand-owner deliverables, not tracked as roadmap "features" because no amount of engineering work produces them.
