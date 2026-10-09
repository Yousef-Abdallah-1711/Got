# Feature Specification: Coming Soon and Early-Access Workflow

**Feature Branch**: `005-coming-soon-early-access`

**Created**: 2026-10-09

**Status**: Draft

**Input**: User description: "Coming Soon landing page and early-access email signup workflow with double opt-in, consent logging, honeypot and rate limiting, and email marketing tool sync with retry."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Visitor signs up for early access and confirms their spot (Priority: P1)

As a potential buyer arriving before launch, I want to sign up with my email and be clearly told to check my inbox, so that I receive the Drop 01 announcement before the public.

**Why this priority**: This is the entire pre-launch business value of the Coming Soon period (PRD §3: "captures opt-in early-access sign-ups") and a Must-Have (P0-F007).

**Independent Test**: Submit a valid email with consent checked; receive a confirmation email; click the link; see a "you're on the list" state; confirm no marketing email was sent before that click.

**Acceptance Scenarios**:

1. **Given** a visitor on the Coming Soon page, **When** they enter a valid email, check the consent box, and submit, **Then** they see a "check your inbox" message and a confirmation email is sent.
2. **Given** a subscriber received a confirmation email, **When** they click the link within 48 hours, **Then** they see a success/"on the list" state and are marked confirmed.
3. **Given** a subscriber's confirmation link is older than 48 hours, **When** they click it, **Then** they see a clear "this link has expired, sign up again" message.
4. **Given** no subscriber has clicked a confirmation link, **When** any point in time passes, **Then** that subscriber receives zero marketing emails.

---

### User Story 2 - The signup form resists spam and abuse (Priority: P2)

As the brand operator, I need the signup form to reject bot/spam submissions and excessive repeat attempts, so that the early-access list stays clean and the email tool isn't abused.

**Why this priority**: Protects list quality and sender reputation (feeds directly into deliverability, PRD Risk R-004), but is a defensive layer around User Story 1, not the primary value.

**Independent Test**: Submit the form automatically more than 5 times in an hour from one source; confirm the 6th+ attempt is rejected with a clear message and sends no email.

**Acceptance Scenarios**:

1. **Given** a hidden anti-bot field is filled in (as only a bot would do), **When** the form is submitted, **Then** the submission is silently rejected without creating a subscriber record.
2. **Given** more than 5 submissions from the same source within one hour, **When** another submission is attempted, **Then** it is rejected with a "too many attempts" message and no email is sent.
3. **Given** an email address that has already confirmed, **When** it is submitted again, **Then** the visitor sees "you're already on the list," with no duplicate record created.

---

### User Story 3 - Signup list survives an email-tool outage (Priority: P3)

As the brand operator, I don't want to lose a single signup just because the email marketing tool happened to be down at that moment.

**Why this priority**: An availability/resilience concern layered on top of the core flow — valuable but not blocking the primary launch value.

**Independent Test**: Simulate the email tool being unreachable during a signup; confirm the subscriber is still saved locally and a retry eventually succeeds without the visitor seeing an error.

**Acceptance Scenarios**:

1. **Given** the email marketing tool is unreachable at the moment of signup, **When** a visitor submits the form, **Then** they still see the normal "check your inbox" confirmation state, and the record is queued for a later retry.
2. **Given** a queued record exists, **When** the retry job next runs, **Then** it attempts to sync again, continuing for up to 24 hours before giving up.

### Edge Cases

- What happens when a visitor submits only whitespace or an obviously malformed email? → Rejected inline with a plain, specific error message; no record created, no request sent to the server at all if detectable client-side, and re-validated server-side regardless.
- How does the system handle someone submitting the exact same email twice in quick succession, both times correctly formatted? → Idempotent — no duplicate record, same confirmation-pending state shown both times.
- What happens to a subscriber who never confirms at all? → Removed after 30 days per the project's data-retention rule (not part of this feature's own acceptance criteria to implement the cleanup job's exact scheduling, but the record must not persist indefinitely unconfirmed).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST capture email (required), consent acknowledgment (required), and optionally first name and a WhatsApp/phone number, and nothing beyond these four fields.
- **FR-002**: The system MUST record the exact consent text shown and the exact moment of consent alongside every subscriber record.
- **FR-003**: The system MUST require a visitor to confirm via a time-limited (48-hour) emailed link before being considered a confirmed subscriber, and MUST send zero marketing content to an unconfirmed subscriber.
- **FR-004**: The system MUST reject a submission that fails an invisible anti-bot check, without creating any record or sending any email.
- **FR-005**: The system MUST reject more than 5 submission attempts from the same source within a rolling one-hour window, with a clear message, and MUST NOT send any email for a rejected attempt.
- **FR-006**: The system MUST treat a duplicate submission of an already-confirmed email as a no-op that creates no new record, and MUST inform the visitor they are already on the list.
- **FR-007**: The system MUST continue to accept and store signups even when the external email marketing tool is temporarily unreachable, and MUST retry syncing such records automatically for up to 24 hours.
- **FR-008**: The system MUST provide a working unsubscribe mechanism on every marketing email that takes effect within 24 hours of use.
- **FR-009**: The signup form MUST be fully operable by keyboard and MUST announce validation errors to assistive technology.
- **FR-010**: Unconfirmed subscriber records MUST NOT be retained indefinitely; they are removed after the project's defined retention window (30 days).

### Key Entities

- **Subscriber**: email (unique), optional first name, optional phone/WhatsApp, status (pending / confirmed / sync_pending / unsubscribed), consent text, consent timestamp, confirmation timestamp, creation timestamp.
- **Confirmation token**: a time-limited (48-hour), single-use credential tied to one subscriber, used to transition pending → confirmed.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Zero marketing emails are ever sent to an unconfirmed subscriber, across every test and production record.
- **SC-002**: A visitor completes signup (form submit to "check your inbox" state) in under 10 seconds of perceived wait.
- **SC-003**: A simulated spam/bot submission burst (10+ rapid submissions) results in zero new subscriber records beyond the first 5 legitimate-looking ones per source per hour.
- **SC-004**: A simulated email-tool outage of up to 24 hours results in zero lost signups — every affected record eventually syncs or is clearly flagged for manual attention.
- **SC-005**: 100% of subscriber records carry a recorded consent timestamp and consent text, verified by a database spot-check.

## Assumptions

- The Coming Soon page itself (its hero layout, brand copy, imagery) is delivered by Feature 003/004's global UI and ACF architecture; this feature supplies only the signup form's behavior, not the surrounding page design.
- The specific email marketing tool vendor is not yet chosen (`docs/adr/0011-email-provider.md`); this feature's acceptance criteria are written to be vendor-agnostic and must pass against whichever vendor is eventually selected.
- The 30-day unconfirmed-record retention and the 15-minute retry cadence are taken as given from prior planning (PRD §8/§9) and are not re-derived here.
