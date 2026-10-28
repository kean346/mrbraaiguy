# Local verification · 28 October 2026

Synthetic local MongoDB replica set and a temporary owner account were used. No real contacts were imported and no email was sent.

- TypeScript: `npm run typecheck` passed.
- Lint: `npm run lint` passed with no warnings.
- Domain: `npm test` passed 7 pricing/costing tests, covering inclusive/exclusive VAT, line rounding, extra eligibility, markup/margin and travel warnings.
- Browser: `npm run test:e2e` passed the local owner sign-in and API journey, unauthenticated API rejection, synthetic client/quote, sanitised menu, issued PDF, private-cost exclusion, idempotent issue, revision 2 with version 1 PDF unchanged, concurrent quote references, long-menu PDF completeness and desktop/mobile rendering.
- Print: generated sample is a two-page tagged A4 PDF; both pages were rendered and visually inspected. Source wording, scope and totals remained readable. `pdftotext` confirmed the synthetic R31 600,00 inclusive amount; private cost and injected script sentinel did not appear.
- Premium static audit: strict mode returned zero findings (`docs/premium-audit.json`).

Evidence artifacts in the current execution environment: `/tmp/ember-glass-evidence/sample-quotation.pdf`, `desktop.png`, `mobile.png`, `page-1.png`, `page-2.png`. These are local synthetic artifacts, outside the repository.

Business/legal approval, actual sender verification, Atlas deployment, backup restore and real mail/Zoho integrations were not performed.
