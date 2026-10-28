# Local verification · 28 October 2026

Synthetic local MongoDB replica set and a temporary owner account were used. No real contacts were imported and no email was sent.

- TypeScript: `npm run typecheck` passed.
- Lint: `npm run lint` passed with no warnings.
- Domain: `npm test` passed 7 pricing/costing tests, covering inclusive/exclusive VAT, line rounding, extra eligibility, markup/margin and travel warnings.
- Browser: `npm run test:e2e` passed two journeys: local owner sign-in and API quotation lifecycle with unauthenticated API rejection, sanitised menu, private-cost exclusion, idempotent issue, revision 2 with version 1 PDF unchanged, issued preview equality after VAT settings change, concurrent quote references and long-menu PDF completeness; plus UI client create, five-course rich menu composition, quote draft save/reload, private cost editing and desktop/mobile rendering.
- Print: generated sample is a two-page tagged A4 PDF; both pages were rendered and visually inspected. Source wording, scope and totals remained readable. `pdftotext` confirmed the synthetic R31 600,00 inclusive amount; private cost and injected script sentinel did not appear.
- Premium static audit: strict mode returned zero findings (`docs/premium-audit.json`).

Representative synthetic artifacts are copied to Git-ignored `artifacts/`: `sample-quotation.pdf`, `five-course-draft-1440.png`, `costing-1440.png`, and `mobile.png`. Rendered PDF page images remain under `/tmp/ember-glass-evidence/`.

Business/legal approval, actual sender verification, Atlas deployment, backup restore and real mail/Zoho integrations were not performed.
