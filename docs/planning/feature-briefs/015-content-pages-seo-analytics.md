**Status: PROPOSED feature brief — not yet run through full Spec Kit specify/plan/tasks workflow. Run `/speckit.specify` when this feature is scheduled to start.**

**Superseded for implementation purposes by `specs/015-content-pages-seo-analytics/spec.md`, `plan.md`, and `tasks.md`** (generated via the real Spec Kit workflow). This brief is kept as the original planning rationale and is not updated further; treat the Spec Kit artifacts as authoritative for scope, acceptance criteria, and tasks.

# 015 — Content Pages, Policies, SEO, Analytics

## Summary
Implements PRD **P1-F006** (brand/policy pages) and **P1-F007** (analytics + consent), plus baseline technical SEO (PRD §8/§16 references, not a dedicated feature ID but implied throughout).

## Scope
**In**: About, Contact, FAQ (standalone page, reusing the `Accordion` pattern already proven on the PDP), Shipping Policy, Returns & Exchanges, Privacy Policy, Terms and Conditions, Cookie Policy, 404 — all as ordinary WordPress Pages per `docs/design/page-mapping.md`; consent banner (ADR 0015) gating GTM/GA4; `view_item`/`add_to_cart`/`begin_checkout`/`purchase` events; product/category JSON-LD, canonical URLs, XML sitemap, robots rules, Open Graph metadata.
**Out**: product-specific schema (already covered in 008's PDP scope) — this feature covers site-wide/category-level SEO only, to avoid duplicate schema generation from two features both touching product pages.

## Dependencies
Hard: 004 (policy pages are ordinary ACF-composed or plain WordPress Pages). Soft: 006, 010 (analytics events instrument homepage/catalog/checkout flows that must already exist to verify against).

## Acceptance Criteria
(Verbatim, PRD P1-F006) All policy pages linked from footer and checkout; policy text supplied by the brand and legally reviewed before publishing; About-page claims limited to documented facts.
(Verbatim, PRD P1-F007) No non-essential analytics request before consent; purchase event includes order ID/EGP value/item list, fires once per order; consent choice changeable from footer link.

## Risk Register
- All policy-page **content** is a brand-owner/legal-reviewer blocker (`docs/audit/missing-assets.md`), not an engineering task — this feature can build the page shells/templates well before the content exists, but cannot publish without it.
- R-008 (data-protection compliance) materializes here directly — legal review is a hard gate before public launch (PRD §15 Approval Gates), separate from this feature's engineering Definition of Done.
- Avoid duplicate schema from two plugins/sources (constitution/project brief explicit warning) — only one schema-generation path per entity type.

## Testing Requirements
E2E: consent-accept/reject gating (verify zero analytics network requests before consent — a network-level assertion, not just a policy check); purchase-event-fires-once-per-order test; SEO: schema validation (Rich Results Test), sitemap/robots verification.

## Visual Parity Requirements
Policy/About/Contact/FAQ/404 pages are all design extensions (no 1:1 prototype reference) per `docs/design/page-mapping.md` — reviewed against DESIGN.md §7.10's described tone/structure, not pixel-diffed against a nonexistent reference.

## Definition of Done
All templates built and functional against placeholder content; consent-gating verified at the network level; analytics events verified firing correctly and exactly once per order; publishing of real content gated on legal review per PRD §15, tracked as a separate approval, not this feature's own DoD.
