# API Contract: Wishlist Endpoints

## `POST /wp-json/got/v1/wishlist/add` / `POST /wp-json/got/v1/wishlist/remove`

**Request**: `{"product_id": 123}`
**Response**: `200 {"wishlist": [123, 456], "count": 2}` — always returns the full current list + count, so the client's shared store can resync in one round trip rather than trusting its own optimistic update.
**Authorization**: Works for both guests (operates on the request's guest-list payload, see below) and authenticated users (operates on their user meta); the server never needs to know which case it is beyond checking `is_user_logged_in()`.

For a guest, the request additionally includes the current guest list so the server can validate/normalize it: `{"product_id": 123, "guest_list": [456]}`, and the response is the guest's own responsibility to persist client-side (the server does not store guest state).

## `POST /wp-json/got/v1/wishlist/merge`

**Purpose**: Called immediately after a successful login/registration.
**Request**: `{"guest_list": [123, 456]}`
**Response**: `200 {"wishlist": [123, 456, 789], "count": 3}` — the merged, de-duplicated account wishlist.
**Side effect**: Updates `_got_wishlist` user meta; idempotent (calling it twice with the same guest list produces no further change).

## `GET /wp-json/got/v1/wishlist`

**Purpose**: Fetch the current wishlist with live product data attached (for rendering the wishlist page).
**Response**: `200 {"items": [{"product_id": 123, "name": "...", "price": 1450, "available": true, "exists": true}, ...]}` — `exists: false` for a removed product (FR-009's "no longer available" state), `available: false` for a sold-out one (FR-005).
