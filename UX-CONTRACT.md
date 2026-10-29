# UX contract

## Product context and business sources

Private owner workspace for bespoke South African open-fire dining; English/en-ZA, ZAR, ISO date-only fields, Africa/Johannesburg instants displayed. Accessibility target WCAG 2.2 AA. Master build brief and docs/source-reconciliation.md (2026-10-28) ground permission, quote lifecycle, billing, review-only terms and marketing rules. No real customer data in fixtures.

## Visual contract

DESIGN.md records the visual intent; src/app/globals.css owns runtime semantic tokens. One dark app theme and a separate light PDF surface. New project, no prior sibling screen; client/menu forms establish shared behavior.

## Canonical UI Map

| Capability | Canonical owner | Source of truth | Allowed variants | Verification |
|---|---|---|---|---|
| Select/Listbox | Shared Select field | This contract | Native platform popup accepted | Keyboard/open popup browser |
| Date | Shared Field type=date | This contract | Native platform locale accepted | ISO storage/browser |
| Form | Shared Field + domain Zod schemas | Domain schemas | Create/edit/quote autosave | Validation/browser |
| Scrollbar | src/app/globals.css | DESIGN.md | Default global | Computed style |
| Toast | Shared Feedback/live status | This contract | Success/error/info | Browser live region |
| CRUD | API workspace route + shared forms | Master brief | Return-to-list, quote stay-inline | Full-flow integration/browser |

Table selection is not offered; no bulk action scope to misrepresent.

## Dataset navigation

Server pagination twenty records, bounded search queries; explicit Previous/Next and total. Search is transient component state intentionally excluded from URLs to avoid contact/financial query terms in browser history. Page may be URL state. Debounce 300ms with cancellation, preserve list footprint and report no results. No optimistic financial writes.

## Flow ledger

Create client/menu saves then returns to its list; edit follows the same rule. Quote create opens its composer because the master brief requires ongoing authoring. Draft changes autosave after 1000ms and report saved only after server acknowledgement; Save draft flushes explicitly. Revision conflicts preserve entered data and require reload/review. Archive is reversible, uses a named app dialog and offers Restore from archived view. No hard deletion.

Issue uses confirmation and a UUID idempotency key. The server calculates, freezes public data/settings and stores immutable PDF bytes in one transaction. Download is not send; manual attachment flow never marks sent. Accepted/declined/expired are manual decisions on issued quotes, never payment. Revise opens a new draft with prior versions preserved. Applying suggested selling price explicitly changes both adult/child rates, shows before/after and records audit. Cost editing alone cannot change prices.

## Navigation, overlays and feedback

Semantic links/buttons; per-route title and app-owned error/not-found routes. Phone retains all operations and horizontal table scroll; forms retain natural document scroll. Dialog uses Radix focus containment, Escape, accessible name and focus restoration. Dirty navigation is guarded with an app dialog; browser close uses beforeunload. Shared polite status; errors persist inline with retry. No native alert/confirm/prompt.

## Async and resilience

Pessimistic commit, disabled pending buttons, optimistic concurrency revision on edits; no silent overwrite. Abort stale reads, preserve inputs on failure, no sensitive drafts in localStorage. Saved means Mongo acknowledged. Auth expiry produces login guidance preserving safe in-memory input until navigation; no false offline queue. PDF generation has a timeout; server failures expose safe messages and request IDs without secrets.

## Validation and permissions

Strict Zod on every external mutation, bounded strings/arrays/prices; client fields and server errors share accessible labels/summary. Forms noValidate, focus first invalid control and associate inline errors. Password masked with reveal; autocomplete supported. Auth pages use Better Auth; every query and PDF route verifies session and configured owner, with owner-scoped IDs. No public signup. Clipboard only on explicit click with completion/error feedback. Unconfigured VAT/sender/terms block issue, not drafts. Campaign/sending integration unavailable with a reason.

## Verification

Required: npm run typecheck, npm run lint, npm test, npm run build, npm run test:e2e, design lint, premium static audit. Browser desktop 1440/1280, tablet and phone, keyboard, dialog/open select, no-results, errors, reload persistence, long menu, reduced motion. Mongo integration covers currency, concurrency, auth, immutable versions and PDF privacy. Human business/legal approval and Atlas/backup verification remain production prerequisites, not claims inferred from tests.
# Client maintenance

The client list provides an explicit Edit client link. Editing loads only editable schema fields, excluding stored metadata. Saving returns to Clients. Delete requires an app-owned confirmation, revision check and owner authorization. Permanent deletion is allowed only for clients without linked quotations; linked clients can be archived. Client deletion and quote linking coordinate through transactional writes to prevent dangling client references. Issued PDF snapshots remain unchanged.
