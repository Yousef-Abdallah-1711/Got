# Acceptance Matrix

One row per roadmap feature: key acceptance criteria (summarized from the PRD where applicable, or from the feature brief where the PRD doesn't cover it), required test type(s), and whether visual parity sign-off applies.

| Feature | Key acceptance criteria (summary) | Test type(s) required | Visual parity required? |
|---|---|---|---|
| 002 — Foundation | Sage/Acorn/WooCommerce installed and verified; HPOS enabled; staging environment live | Integration (environment smoke test) | No |
| 003 — Tokens/global UI | Dark/light toggle persists, no flash, WCAG AA contrast both themes; header/footer/announcement bar render at all 6 widths | Visual regression, accessibility, manual device QA | **Yes** |
| 004 — ACF architecture | Every editorial section renders only when content exists; no hardcoded client-editable content in Blade | Manual admin QA (toggle content, verify render), code review | Yes (per-block) |
| 005 — Coming Soon/early access | Double opt-in works end to end; no marketing email before confirmation; rate limiting blocks >5/IP/hour; consent text+timestamp stored | E2E (Playwright), security (rate-limit test) | Yes |
| 006 — Homepage/editorial | All 14 sections render correctly when content exists, hidden when not; LCP <2.5s mobile | Visual regression, performance (Lighthouse) | Yes |
| 007 — Catalog/search | Sort/filter/load-more work per PRD AC; search returns results <1s for 500 products | E2E, performance | Yes |
| 008 — PDP/variations | Variation selection updates price/stock <200ms; quantity capped at min(10,stock); schema validates in Rich Results Test | E2E, accessibility (keyboard variation nav), schema validation | Yes |
| 009 — Inline PDP checkout | *(pending ADR 0006 approval)* Same order-lifecycle AC as 010, entry point = PDP | E2E (duplicate of 010's suite, PDP entry point) | Yes, if approved |
| 010 — Cart/standard checkout | Totals match server computation to EGP 0.01; stock reduced exactly once; duplicate submission returns existing order; confirmation <2s on 4G | E2E, order-lifecycle, security (idempotency test) | Yes |
| 011 — Accounts/auth | Login never reveals email-registration status; customer sees only own orders (403 on others'); reset token single-use, 60-min expiry | E2E, authorization/security test | Yes |
| 012 — Wishlist/merge | Guest wishlist persists 30 days; merge on login produces no duplicates; move-to-cart re-validates stock | E2E (guest + authenticated + merge scenarios) | Yes |
| 013 — Orders/confirmation/tracking/email | Status emails sent for Processing/Out for Delivery/Delivered/Cancelled; tracking lookup is non-enumerating | E2E, email-delivery monitoring, security (enumeration test) | Yes |
| 014 — Shipping/coupons/promotions | Shipping fee correct per governorate; invalid/expired coupon rejected cleanly; BOGO *(if approved)* eligibility server-verified | E2E, coupon/promotion test matrix | Yes |
| 015 — Content/SEO/analytics | No analytics request before consent; purchase event fires once per order with no PII; policy pages linked from footer+checkout | E2E (consent gating), analytics QA, SEO schema validation | Yes (policy pages) |
| 016 — Security/accessibility/performance | Zero Critical/High defects; WCAG 2.1 AA automated+manual; Core Web Vitals targets met on representative mobile hardware | Full regression suite, accessibility audit (automated+screen reader), performance test, security review | Yes (final full-site pass) |
| 017 — Deployment/production acceptance | Production smoke test passes (home/shop/product/cart/checkout/confirmation/signup); backup restore verified; monitoring active | Production smoke test, backup-restore drill | No (operational, not visual) |

This matrix is the input to `docs/testing/commerce-test-matrix.md`'s more granular per-scenario breakdown — this table operates at the feature level, that one at the individual E2E-scenario level.
