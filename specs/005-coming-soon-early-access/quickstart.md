# Quickstart: Coming Soon and Early-Access Workflow

1. Visit the Coming Soon page; submit the form with a real test email + consent checked → confirm the "check your inbox" state appears.
2. Check the test inbox (or a sandbox email provider's log) → confirm a confirmation email arrived with a working link.
3. Click the link → confirm a "you're on the list" state renders and the database record's `status` is now `confirmed`.
4. Manually expire a token (set `confirmation_token_expires_at` to the past) and visit its link → confirm the "this link has expired" state, not an error page.
5. Submit the same confirmed email again → confirm "you're already on the list," no duplicate row.
6. Fill the hidden honeypot field via devtools and submit → confirm no row is created and no email is sent.
7. Script 6 rapid submissions from the same source within a minute → confirm the 6th is rejected with the rate-limit message.
8. Temporarily point `EmailSync` at an unreachable URL, submit a new signup → confirm the visitor still sees the normal success state, and the record is `sync_pending`; then restore the URL and confirm the next retry-job run flips it to `confirmed`/synced.
9. Click the unsubscribe link from a (test) marketing email → confirm the record becomes `unsubscribed` and a second click is a harmless no-op.

**Done when**: all 9 steps pass.
