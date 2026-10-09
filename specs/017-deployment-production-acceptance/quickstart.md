# Quickstart: Production Deployment and Launch Acceptance

1. Provision production to the staging specification (PHP version, HTTPS, backups, staging-equivalent config).
2. Run the 7-flow smoke test directly against production: homepage, shop, product, cart, COD checkout (a real test order), confirmation email, early-access sign-up.
3. Trigger a backup, restore it to a fresh scratch environment, and verify the restored data matches the source exactly.
4. Run the early-access migration script → confirm every confirmed subscriber appears in the production email tool with consent data intact (count + spot-check comparison).
5. Trigger a test alert on each of uptime, error-rate, and email-delivery monitoring → confirm each actually fires.
6. Confirm at least one real published, in-stock product exists; confirm the brand owner's written launch-date confirmation is on file; confirm all required legal/policy pages are published with final text.
7. With all of the above passed, flip Store Mode to live and re-run the smoke test once more against the now-live site.

**Done when**: all 7 steps pass, in order, with no step skipped or assumed.
