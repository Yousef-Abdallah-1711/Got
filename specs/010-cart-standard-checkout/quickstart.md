# Quickstart: Cart and Standard Checkout

1. Add two different variations to the cart via the PDP → open the mini-cart drawer → confirm both lines show correctly with accurate totals.
2. Change one line's quantity → confirm the total updates within 500ms.
3. Apply a valid test coupon → confirm the total updates within 1s; apply an invalid/expired one → confirm a clear rejection message and no cart change.
4. Set one cart item's stock to 0 in WooCommerce → reload the cart → confirm it's marked sold-out and checkout is blocked.
5. Proceed to `/checkout/`, fill in a real test Egyptian address and phone number, select COD, accept terms, submit → confirm an order is created, stock reduced once, and confirmation page/email both appear within 2s on a throttled connection.
6. Enter an address in a governorate with no configured shipping zone → confirm "we do not deliver to this governorate yet" and a disabled Place Order button.
7. Double-submit the checkout form (rapid double-click or resubmit) → confirm only one order exists and stock was reduced only once.
8. As a guest, add items to cart, close the browser, reopen within 14 days → confirm the cart persists; then log in → confirm the guest cart merges with no duplicate lines.
9. Inspect the network tab and page source throughout checkout → confirm no payment secret/credential is present anywhere.
10. Repeat step 5 for each of the 3 configured shipping zones → confirm each completes successfully with the correct zone-specific fee.

**Done when**: all 10 steps pass.
