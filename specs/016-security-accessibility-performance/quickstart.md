# Quickstart: Security, Accessibility, and Performance Hardening

1. Create an Administrator account → confirm 2FA setup is required before the account can be used normally.
2. Fail login 5+ times against a test admin account → confirm lockout triggers.
3. Inspect response headers on several pages → confirm CSP, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy are all present.
4. Trigger the weekly scan manually (or wait for a scheduled run) → confirm it reports malware/file-integrity/outdated-software status.
5. Run an automated axe-core scan across every major page in both themes → confirm zero Critical/Serious findings.
6. Perform a full manual screen-reader purchase walkthrough (browse → PDP → cart → checkout → confirmation) → confirm zero blocking issues.
7. Zoom to 200% on several pages → confirm no clipped or broken content.
8. Run Lighthouse against homepage/shop/product on a simulated mobile/4G profile → confirm LCP/INP/CLS all meet target.
9. Run the full regression suite (`docs/testing/commerce-test-matrix.md`) → confirm zero open Critical/High defects.

**Done when**: all 9 steps pass.
