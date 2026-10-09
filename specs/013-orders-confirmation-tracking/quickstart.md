# Quickstart: Order Confirmation, Tracking, and Transactional Email

1. Complete a real test checkout → confirm the confirmation page shows the real order number/items, and a matching email arrives within 2 minutes (sandbox provider).
2. Change the test order's status to Processing, then Out for Delivery, then Delivered in the admin → confirm a matching email is sent at each step.
3. Cancel a different test order → confirm a cancellation email is sent.
4. Visit `/track-order/`, enter the correct order number + billing email → confirm the status timeline renders correctly with dates.
5. Enter the correct order number with a wrong email → confirm the generic "no order found" response.
6. Enter a wrong order number with the correct email → confirm the identical generic response as step 5 (byte-for-byte compare both responses).
7. Enter both wrong → confirm the same identical response again.
8. Submit the tracking form rapidly many times → confirm rate limiting kicks in with a clear message.
9. Directly request the confirmation-page URL for an order that was never actually created (if reachable at all) → confirm no fabricated "confirmed" state appears.

**Done when**: all 9 steps pass, with step 5–7's responses byte-identical.
