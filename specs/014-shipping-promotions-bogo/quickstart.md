# Quickstart: Shipping Zones, Coupons, and BOGO/Free-Shipping Promotions

1. Enter a test address in each of the 3 shipping zones → confirm each correct fee applies; try an uncovered governorate → confirm checkout is blocked with the correct message.
2. Apply a valid test coupon → confirm the total updates correctly; apply an invalid one → confirm rejection with no cart change.
3. With no promotion configured at all, check the PDP, cart, and checkout for any test product → confirm zero promotional badges/messages appear anywhere.
4. Configure a BOGO promotion (required quantity 2) for a test product → add 1 to cart → confirm the "add one more to unlock" invitation shows, no discount yet.
5. Add a 2nd of the same product → confirm the discount applies and is shown identically on PDP, cart, and checkout, with the correct savings amount.
6. Set that promotion's end date to the past → reload all three surfaces → confirm it behaves exactly as if never configured.
7. Configure a free-shipping threshold → add items below it → confirm the "add X more for free shipping" message and progress indicator; cross the threshold → confirm "free shipping unlocked" and a zero shipping fee.
8. Set the promotion's stacking rule to not-stackable, apply a coupon on a BOGO-eligible cart → confirm the two interact exactly per the configured rule, with a single clear correct total shown.

**Done when**: all 8 steps pass.
