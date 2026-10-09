# API Contract: Early-Access Endpoints

All endpoints are public but rate-limited; none require authentication (the whole point is anonymous pre-launch signup).

## `POST /wp-json/got/v1/early-access`

**Purpose**: Submit a new signup.

**Request body**:
```json
{
  "email": "visitor@example.com",
  "first_name": "Karim",
  "whatsapp": "01012345678",
  "consent": true,
  "honeypot_field": ""
}
```

**Responses**:
| Status | Body | Meaning |
|---|---|---|
| 200 | `{"status": "pending"}` | New or re-submitted-but-still-pending signup; confirmation email sent (or re-sent, rate-limit permitting) |
| 200 | `{"status": "already_confirmed"}` | Email already confirmed — no new email sent, matches FR-006 |
| 422 | `{"errors": {"email": "Enter a valid email address."}}` | Validation failure (bad email, consent not checked) |
| 429 | `{"error": "Too many attempts. Try again later."}` | Rate limit exceeded (FR-005) |
| 400 | *(silently rejected, 200 returned with no actual processing)* | Honeypot field was filled (bots get no signal that they were caught, per standard anti-bot practice) |

**Side effects**: creates or updates a `got_early_access` row; sends a confirmation email (unless rate-limited or honeypot-triggered); never sends marketing content directly from this endpoint.

## `GET /wp-json/got/v1/early-access/confirm/{token}`

**Purpose**: Confirm a pending signup via the emailed link.

**Responses**:
| Status | Meaning |
|---|---|
| 200, renders a "you're on the list" page | Valid, unexpired, unused token — status becomes `confirmed`, `EmailSync` enqueued |
| 200, renders an "this link has expired" page | Token not found or expired — explicitly not a 404/500, this is an expected user-facing state |

## `POST /wp-json/got/v1/early-access/unsubscribe`

**Purpose**: Unsubscribe via a signed link in a marketing email.

**Request**: signed token identifying the subscriber (not a raw email, to prevent unsubscribing someone else's address by guessing).

**Response**: `200 {"status": "unsubscribed"}`, idempotent (unsubscribing an already-unsubscribed record is a no-op success, not an error).

## Cross-cutting contract rules

- Every response avoids revealing whether a *specific* email exists in the system beyond the subscriber's own already-confirmed state (no enumeration of other people's signup status).
- All three endpoints are logged (without storing raw request bodies containing PII beyond what's already in the `got_early_access` table) for rate-limit and abuse monitoring.
