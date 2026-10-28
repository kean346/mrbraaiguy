# Ember Glass

Private quotation and costing workspace for Mr Braai Guy. This project implements the local Milestone B workflow described in the supplied master brief. All demo records use synthetic names and `.invalid` email addresses. The business source review is in [docs/source-reconciliation.md](docs/source-reconciliation.md); its restricted underlying evidence is excluded from Git.

## Start locally

Requirements: Node.js 22+, npm, Docker for the local replica set, and Chromium (`/usr/bin/chromium` by default). MongoDB transactions require a replica set; `npm run db:start` starts a persistent single-node local one.

1. `npm ci`
2. `npm run db:start`
3. Copy `.env.example` to `.env.local`. Set a random `BETTER_AUTH_SECRET` of at least 32 characters, `OWNER_EMAIL`, and the local Mongo URI. Keep the file private.
4. Temporarily add `OWNER_BOOTSTRAP_PASSWORD` (12+ characters) to `.env.local`, then run `npm run owner:create`. Remove that key afterward. Public sign-up is disabled. If the owner already exists, the script changes nothing.
5. Optionally run `npm run seed:demo` to create one synthetic client, menu and draft. It is idempotent.
6. `npm run dev`, then open `http://localhost:3000/login` and sign in with the owner credentials.

`npm run build` and `npm run start` serve the production build. A real business deployment needs a dedicated MongoDB Atlas replica set URI, a stable HTTPS `BETTER_AUTH_URL`, a separately stored strong auth secret and an installed Chromium binary for server PDF generation. The PDF preview and export are server-rendered with Chromium from the last saved draft or frozen issued version; unsaved editor changes require Save draft before the preview updates. On Vercel the app now selects the packaged `@sparticuz/chromium` binary; local development continues to use `/usr/bin/chromium`. Confirm PDF preview and export in the actual deployment before business use, since a local build does not prove Vercel runtime behavior. Set secrets only in the host's secret manager. Restrict database network access and credentials to this app. Do not copy the local database or synthetic test credentials into production.

## What works

| Capability | Status | Notes |
| --- | --- | --- |
| Owner sign-in, private routes and downloads | Working locally | Better Auth, owner email gate, no public sign-up; password recovery is not implemented |
| Clients | Working locally | Create/edit/search/archive/restore, quote history, basic consent status |
| Menu vault | Working locally | Rich paste/edit, sanitisation, search/duplicate, independent quote copy |
| Proposal studio | Working locally | Draft autosave, optional child rate, extra states, explicit tax basis, PDF preview |
| Private costing | Working locally | Flexible sections and expenses, markup/margin suggestion, explicit apply action |
| Issue and history | Working locally | Frozen numbered PDF and snapshot, revisions, manual response status, audit |
| Dashboard and business settings | Working locally | Counts reflect quotations, not payments or revenue; settings gate issue |
| Manual communication | Working locally | PDF download and copyable email text; attachment and send happen in the owner's email app |
| Zoho Books CSV import | Future | CSV mapping, review, deduplication and import are not implemented; no customer data was imported |
| Connected email and campaigns | Requires integration | Provider identity and approval/consent flow are unconfigured; no send claim |
| Shopping list and advanced snippets | Future | Do not infer procurement quantities from the static historical sheet |

## Before issuing a real quotation

Confirm VAT registration and rate, sender identity, approved booking terms, deposit defaults and the tax/bundling choice of every extra. These settings begin unconfirmed. The historical cancellation wording leaves exactly day 61 unspecified and needs business/legal review. The owner's answer says per-person prices are normally ex VAT; the historical R790 sample was inclusive. The app asks for an explicit basis on every price. A saved draft is available while these decisions remain pending; issue is blocked.

Customer PDFs are generated from a sanitized public projection. Private cost lines, markup/margin and internal extras are excluded. Every issued PDF is stored as immutable bytes with a SHA-256 digest alongside its public snapshot. Downloading a PDF does not mark it sent. Accepted status is a manual record, not evidence of payment.

## Checks and data care

Run `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`. Browser integration needs the local database, owner account and a local-only `E2E_OWNER_PASSWORD` matching that owner in `.env.local`; then run `npm run test:e2e`. The browser tests create synthetic records, exercise a real UI create/edit/save/reload journey plus issue/revision/history, and write screenshots plus a sample PDF under `artifacts/` (Git-ignored). Remove `E2E_OWNER_PASSWORD` after testing. The static premium UI audit result is in `docs/premium-audit.json`.

The local Docker volume persists across app restarts. For production, schedule encrypted Atlas backups with point-in-time recovery appropriate to your retention needs. Test restoring a backup into a separate, access-controlled database before relying on it. Limit access to source contact information in `docs/source-analysis/`; the directory is Git-ignored and must never be served. No real contact data, customer PDFs or credentials belong in Git or public assets.

## Architecture

Next.js App Router and React serve the owner interface; Better Auth stores users/sessions in MongoDB. The official MongoDB driver stores owner-scoped clients, menu templates, quotes, settings, audit records and issued versions. Zod validates mutations, Decimal.js computes minor-unit totals, and Chromium renders A4 PDFs from the same public projection used for issue. A local replica set enables transactional reference allocation and version freezing. [DESIGN.md](DESIGN.md) and [UX-CONTRACT.md](UX-CONTRACT.md) record the visual and interaction contracts.

## Vercel and Atlas production setup

See [docs/vercel-setup.md](docs/vercel-setup.md) for the exact environment variables, Atlas network setup, owner creation, redeployment and checks. The public design preview works without those settings; the private dashboard requires them.
