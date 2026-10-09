# Quickstart: Customer Accounts and Authentication

1. Register a new account with a test email/password → confirm login works afterward.
2. Place a guest order with a different (new) test email, then register using that same email → confirm the guest order appears in the new account's order history.
3. As Customer A, note Customer B's order URL (from an admin view); while logged in as A, request that URL directly → confirm a generic access-denied response, not a 404/500 that differs informatively.
4. Attempt login with a wrong password for a real registered email, then for a made-up email → confirm the two error messages are identical.
5. Fail login 5 times in a row for one account → confirm the 6th attempt is blocked for 15 minutes.
6. Request a password reset → confirm the link works once, then confirm a second click on the same link is rejected.
7. Wait (or simulate) past 60 minutes on an unused reset link → confirm it's rejected as expired.
8. Complete a guest checkout with no account at all → confirm nothing in this feature forces registration.

**Done when**: all 8 steps pass.
