# Implementation Plan: Customer Accounts and Authentication

**Branch**: `011-customer-accounts-auth` | **Date**: 2026-10-09 | **Spec**: [spec.md](./spec.md)

## Summary

`woocommerce/myaccount/*` Blade overrides (login/register/lost-password/orders/addresses/account-details) on native WordPress/WooCommerce auth, with guest-order-to-account linking by email at registration and the project's standard lockout/reset-token rules.

## Technical Context

**Language/Version**: PHP 8.3+ (raised 2026-10-09 for Sage 11/Acorn v6, see docs/adr/0001-sage-version.md)/Blade.
**Primary Dependencies**: WordPress core auth (`wp_signon`, `wp_set_auth_cookie`), WooCommerce My Account endpoints, a login-rate-limiting mechanism (plugin or small custom implementation).
**Storage**: Native `wp_users`/`wp_usermeta`; no new tables.
**Testing**: Playwright E2E + explicit security/authorization tests (direct-URL-access, enumeration, lockout, token single-use/expiry).
**Target Platform**: Same as prior.
**Constraints**: Must never reveal registered-email status via error messages (constitution Principle 15); object-level ownership check on every order-related request (constitution, PRD §9 Auth design).
**Scale/Scope**: One account shell, reused for every customer.

## Constitution Check

| Principle | Check | Status |
|---|---|---|
| 15 — Security/privacy are architectural | Non-enumeration, lockout, ownership checks designed in from the start, not bolted on | PASS |

No violations.

## Project Structure

### Documentation (this feature)
```text
specs/011-customer-accounts-auth/
├── plan.md
├── research.md
├── quickstart.md
└── tasks.md
# No data-model.md (WordPress/WooCommerce-native user/order model, unmodified) or contracts/ (uses WooCommerce's native My Account endpoints, not new custom APIs).
```

### Source Code
```text
wp-content/themes/got-sage/resources/views/woocommerce/myaccount/
  my-account.php
  form-login.php
  form-register.php
  form-lost-password.php
  orders.php
  view-order.php
  edit-address.php
wp-content/plugins/got-commerce/src/Accounts/LoginRateLimiter.php   # 5-failure/15-minute lockout
```

**Structure Decision**: The lockout mechanism is business-logic (security policy, not presentation) so it lives in `got-commerce`; everything else is a WooCommerce template override in the theme.

## Complexity Tracking
*No violations.*
