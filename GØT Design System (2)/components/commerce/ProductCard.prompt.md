Product grid tile (2-up mobile, 3–4-up desktop): image does the work, info stays quiet.
```jsx
<ProductCard name="Forged Hoodie" meta="Black" price={1450} badge="New" image={src} onClick={open} />
<ProductCard name="Monogram Keychain" price={250} soldOut />
```
- `wishlisted` + `onWishlist` add a 44px heart toggle top-right (aria-pressed).
- Never use AI mockups as product images.
