# Quickstart: Verified Product Reviews

1. Mark a test order Delivered, set its date so the 7-day mark is "today" → run the daily scheduler job → confirm the review-request email is sent to that order's buyer.
2. As that buyer, submit a review (rating + text) for a product in that order → confirm it's accepted and appears in the moderation queue, not publicly.
3. As a different visitor (no Delivered order for that product), attempt to submit a review for it → confirm it's rejected.
4. Approve the pending review in WP Admin → confirm it now appears publicly with a "Verified Purchase" badge.
5. Submit a second review attempt from the same buyer for the same product → confirm it's rejected as a duplicate.
6. Flag a different test review as spam/rejected → confirm it never becomes publicly visible.
7. With zero approved reviews on a product, view its card and PDP → confirm no rating is shown at all.
8. With 3 approved reviews averaging 4.3, view the card and PDP → confirm the average and count both display correctly.
9. Approve one more review that changes the average → reload → confirm the displayed average updates immediately.

**Done when**: all 9 steps pass.
