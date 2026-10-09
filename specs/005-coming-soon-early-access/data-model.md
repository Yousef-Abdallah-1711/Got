# Data Model: Coming Soon and Early-Access Workflow

## `got_early_access` (custom table)

| Field | Type | Notes |
|---|---|---|
| `id` | bigint, PK, auto-increment | |
| `email` | varchar(255), UNIQUE | normalized lowercase before storage |
| `first_name` | varchar(100), nullable | optional field |
| `whatsapp` | varchar(32), nullable | optional field, stored as entered (format validated, not normalized to a single standard) |
| `status` | enum: `pending`, `confirmed`, `sync_pending`, `unsubscribed` | |
| `consent_text` | text | exact wording shown at the moment of consent |
| `consent_at` | datetime | |
| `confirmed_at` | datetime, nullable | |
| `confirmation_token` | varchar(64), nullable | cleared once used or expired |
| `confirmation_token_expires_at` | datetime, nullable | created_at + 48h |
| `ip_hash` | varchar(64) | salted hash, not raw IP (data minimization) |
| `sync_attempts` | tinyint, default 0 | incremented by the retry job, capped (stop retrying after 24h per FR-007) |
| `created_at` | datetime | |

## Validation rules

- `email`: required, valid format, normalized (lowercased, trimmed) before the uniqueness check.
- `status` transitions: `pending` → `confirmed` (via valid token) or `pending` → removed (30-day cleanup if never confirmed); `confirmed` → `sync_pending` (on sync failure) → `confirmed` (on successful retry); any → `unsubscribed` (via unsubscribe link, one-way).
- A `pending` record older than 30 days with no `confirmed_at` is deleted by a scheduled job (not modeled as a state transition — it's a deletion).

## Relationships

None — this is a standalone entity, intentionally not linked to the WordPress user table (a subscriber is not necessarily ever a customer; linking happens only if/when the same email later places an order, which is a separate concern for Feature 011, not this feature).
