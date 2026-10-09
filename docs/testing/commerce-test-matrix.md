# Commerce Test Matrix

The 19 critical E2E scenarios required by the project brief, plus two scenarios this audit added (inline-checkout duplication, order-tracking non-enumeration already folded into #17). Status: PROPOSED — none of these have been executed; this is the test plan.

| # | Scenario | Test layer(s) | Preconditions | Pass criteria | Priority |
|---|---|---|---|---|---|
| 1 | Guest product purchase (standard checkout) | Playwright E2E | ≥1 published, in-stock product; COD enabled | Order created, stock reduced once, confirmation page + email shown/sent | P0 |
| 2 | Inline COD checkout from PDP | Playwright E2E | **Only if ADR 0006/C-02 approved** | Identical outcome to #1, PDP entry point | P0 if approved, N/A otherwise |
| 3 | Standard COD checkout (from cart, multi-item) | Playwright E2E | Cart has ≥2 line items | Correct multi-line totals, single order created | P0 |
| 4 | Variation selection (size/color) | Playwright E2E + accessibility (keyboard) | Product has ≥2 sizes/colors | Price/stock update <200ms; keyboard-operable via arrow keys | P0 |
| 5 | Out-of-stock prevention | Playwright E2E | A variation with 0 stock | Strikethrough shown, cannot select, cannot add to cart | P0 |
| 6 | Coupon application (valid) | Playwright E2E + WC integration | Valid, unexpired coupon configured | Total updates correctly within 1s | P0 |
| 7 | Coupon application (invalid/expired) | Playwright E2E | Expired or nonexistent code | Exact PRD error message shown, cart unchanged | P0 |
| 8 | Free shipping eligibility | Playwright E2E | **Only if threshold feature approved (P2-F003/ADR 0009)** | Progress bar / unlocked message matches server-verified state | P1 if approved |
| 9 | BOGO eligibility | Playwright E2E + WC integration | **Only if ADR 0009 approved** | Offer never shown unless server-verified; discount calculated correctly | P1 if approved, N/A otherwise |
| 10 | Duplicate order prevention | Playwright E2E + PHP unit (idempotency key logic) | Rapid double-submit of the same order | Second request returns the existing order, no second stock reduction | P0 |
| 11 | Order confirmation rendering | Playwright E2E | Order successfully created | Confirmation page shows real order number/items within 2s on 4G-throttled profile | P0 |
| 12 | Order confirmation email delivery | Email-delivery monitoring + Playwright (sandbox provider) | Order created | Email received within 2 minutes (sandbox-measured proxy for the 99%-in-production target) | P0 |
| 13 | Guest wishlist | Playwright E2E | No account | Add/remove persists across page reload, 30-day cookie lifetime verified via cookie inspection | P1 |
| 14 | Authenticated wishlist | Playwright E2E | Logged-in account | Persists across sessions/devices (verified via two separate browser contexts) | P1 |
| 15 | Guest wishlist merge into account | Playwright E2E | Guest wishlist populated, then registers | Merged list has no duplicates, nothing lost from either side | P1 |
| 16 | Account registration | Playwright E2E + security (enumeration test) | — | Registration succeeds; login-error messages never reveal registered-email status | P1 |
| 17 | Order ownership security | Security/authorization test (Playwright + direct HTTP request) | Two distinct customer accounts, each with an order | Customer B's direct request to Customer A's order URL returns HTTP 403 | **P0** (security-critical regardless of P1 feature label) |
| 18 | Order tracking | Playwright E2E + security (non-enumeration test) | A real order exists | Correct number+email shows the status timeline; any mismatched pair (wrong number, wrong email, or both) returns the identical generic "no order found" response | P1 |
| 19 | Coming Soon mode | Playwright E2E | Site Mode = Coming Soon | Homepage shows hero + signup form only; no cart/checkout entry points in primary nav | P0 |
| 20 | Store mode | Playwright E2E | Site Mode = Store, ≥1 published in-stock product | Homepage shows full store; mode-switch guard blocks the switch with 0 published products | P0 |
| 21 | Dark/light mode persistence | Playwright E2E (localStorage inspection) + manual (3G-throttled reload) | — | No flash of incorrect theme on reload; preference persists across navigation and browser restart | P0 |

## Priority legend

**P0** = launch-blocking per `docs/planning/release-scope.md`'s Must-Have set, or security-critical regardless of feature priority label (scenario 17 is nominally a P1 feature but its *security property* is non-negotiable). **P1** = should-have, slip-allowed per PRD's explicit "any unfinished feature needs explicit release decision" language, but still planned and tested if time permits.

## Cross-reference

This table operationalizes `docs/planning/acceptance-matrix.md`'s feature-level criteria into individual executable scenarios, and is the thing `docs/testing/test-strategy.md`'s CI gating flow actually runs.
