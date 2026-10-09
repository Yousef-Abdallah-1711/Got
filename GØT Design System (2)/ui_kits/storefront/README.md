# Storefront UI kit

Hi-fi click-through of the GØT WooCommerce storefront (Sage/Blade theme in production), composed from `components/`.

Screens: `ComingSoon.jsx` (prelaunch site mode), `Home.jsx`, `Shop.jsx` (tabs, sort, skeleton + empty states), `Product.jsx` + `DirectCheckout.jsx` (product landing page: swipe/thumb gallery, colour/size/qty, stock, size-guide modal, trust, story, packaging, shipping, inline order-form preview, FAQ, related, sticky mobile order bar), `Checkout.jsx` (guest checkout preview), `ThankYou.jsx`, `Confirmation.jsx` (tracking preview), and `Account.jsx` (account preview plus sample dashboard). `index.html` wires the local cart drawer, theme toggle (persists `got-theme`) and a screen switcher (bottom-left).

**Source:** no production UI existed — layouts follow DESIGN.md §7 page blueprints. All product names, prices, shipping fee and order number in `data.js`/screens are SAMPLE placeholders. Images are free **Unsplash** photos (desaturated) used as placeholders — mapped in `window.GOT_PHOTOS` (data.js) with photographer credits; image slots show the credit overlay. They are NOT GØT products: swap the IDs or drop real photos onto any image slot.

**Preview safety:** the screen switcher labels the catalog as sample data. Offer, free-shipping and inventory states remain hidden until WooCommerce-verified state is supplied. Inline and standard checkout only demonstrate layout and validation; they do not send data or create orders. Shipping and final totals remain unconfirmed until the WooCommerce adapter is built.

**Wishlist preview:** use the header heart or open `index.html?screen=wishlist`. Guest items are unique product IDs in localStorage and remain on this browser; current product details are read from the loaded catalog. The header count, cards, product page and wishlist share one React state and synchronize across same-origin tabs. Prices and stock are sample data in this UI kit. Authenticated persistence, device-to-device sync and guest-to-account merge are not connected until a protected WooCommerce account service exists.
