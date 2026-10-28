# Source reconciliation

Reviewed 28 October 2026, before implementation. All four supplied business originals and the complete master brief were read. Workbook inspection covered **7 visible sheets, 369 populated cells and 70 formulas**, including all cached results. No hidden rows/columns, defined names, external links or embedded images were present. A restricted independent Decimal evaluator recalculated every formula: **70/70 caches agree within 1e-9**. This establishes arithmetic/cache consistency, not correct business logic; Excel was not executed. Originals remain unchanged.

Complete Word packages, available headers/notes/media and both PDF pages were inspected. Neither Word document has tables or tracked changes. The quotation Word/PDF agree in all substantive text after normalization of whitespace, punctuation and list markers. Both A4 PDF pages were rendered and visually reviewed. Recoverable PDF cross-reference offset warnings did not prevent extraction/rendering. Actual customer details are excluded here and must never become demo data.

## Source findings

Confidence describes the observation, not current approval. Owner answers take precedence over the historical quote, then the reconciled workbook. Unconfirmed defaults stay editable and visibly unconfirmed.

| Source | Field/rule | Observed value | Confidence | Conflict/ambiguity | Implementation decision |
|---|---|---|---|---|---|
| Owner answers 1–2 | Workflow | Excel costing/profit → tailored Word menu → PDF → personal email | High | No integrated system | Fast direct-price route plus optional linked private costing |
| Owner answers 2–3 | Price/totals | Normally per-person **ex VAT**, optional children, distinct extras, total ex / VAT / incl | High | Legacy menu is inclusive | Explicit price mode; default new entry to ex-VAT without assuming registration |
| Owner answer 6 | Menu reuse | Copies detailed menu text and tailors each event; reuses some menus | High | Detailed library not supplied | Large sanitized rich-text paste/edit area and independent template copies |
| Quote p1 | Event/contact data | Quote/event dates, 40 pax, contact person/phone; client placeholder, blank email | High | Venue/time/type missing | Support optional fields; no invented real details or historical-contact seed |
| Serving 1 D32/I32 | Ingredients/sundries | R6,840.80 + R4,520 = **R11,360.80** | High | Units/pack sizes incomplete | Explicit quantity, unit and unit cost; no implicit unit conversion |
| Serving 2 I32 | Shared sundries | Spice150 + zest150 + oil269 + salt185 + skewers100 + honey100 = **R954** | High | Not the second menu course | Flexible cost sections independent of menu-course numbering |
| Serving 3–5 | Empty sections | Zero cost totals | High | Dormant denominators conflict | Optional/empty sections valid; no fixed five-sheet algorithm |
| Cost O28/B12 | Miscellaneous | Wood450 + firelighters60 + charcoal260 + cleaning294 = **R1,064** | High | Summary labels this “Equipment” | Explicit expense categories |
| Cost B29 | **Incorrect total** | `SUM(B3:B28)` = **R13,418.80**, including the **40-person headcount as money** | High | Monetary rows B4:B28 total **R13,378.80**; overstatement **R40** | Sum monetary lines only; preserve defect as reconciliation evidence, never reproduce it |
| Cost R3:R9 | Separate expense block | Braai0 + collection/delivery550 + fuel500 + parking350 + flight4600 = **R6,000**; literal `/40` → **R150 pp** | High | Omitted from B29; applicability, overlap and VAT basis unknown | Explicit private expense and bundling fields; shared event denominator |
| Cost J30:J32 | Historic selling price | Calculated637.393; manually entered **640**; `640+150=790` | High | No rounding formula explains 640; 150 appended after tax calculation | Treat 640 as override, 790 as historical inclusive fixture; no magic global rule |
| Cost D30/E30 | “Profit” | Cost divided by1.15, then **90% added to cost** | High | Markup mislabeled; every input's tax basis unknown | Separate markup and margin strategies; 90% markup ≈47.37% margin, not90% margin |
| Cost B32:B33/D32 | Income/profit | **R25,600** income from640×40; **R12,181.20** “profit” after erroneous B29 | High | Ignores final790 and R6,000; tax bases inconsistent | Do not expose as verified profit; calculate from explicit consistent bases |
| Serving 1–5 | Headcounts/weights | Event40; weight denominators80; price denominators40,40,80,80,35 | High | 32.8kg/80=0.41kg versus /40=0.82kg; Serving3 stray `/40`; Serving2 kg-derived value labelled g | One event count, optional explicit portion basis and validated units |
| Cost B10:B14/G:H/K:L | Disconnected expenses | Waiters references D28+E28; chef/transport/wine summary hardcoded0 | High | Filling some detail tables would not affect totals | One authoritative category sum, no silent disconnected subtotals |
| Shopping List | Procurement | Static entries/shop abbreviations/recipe notes; **zero formulas** | High | Missing quantities/units; not derived from current cost lines | Optional later ingredient aggregation; no stock-system claim |
| Quote p1 | Menu | Open Fire Dining intro, five numbered detailed dishes: lamb rump, tandoori chicken, lamb kofta, picanha, oyster steak | High | All five proteins are costed in Serving1 | Flexible rich text; no course-to-sheet inference. Synthetic sample client/event/menu |
| Quote p1; Cost J32 | Menu total | **R31,600 incl VAT**, exactly40×790 | High | No per-person price printed in legacy PDF | Explicit inclusive fixture; new itemized ex/tax/incl reconciliation |
| Quote p2 | Sous chefs | **2×R950 = R1,900** under additional costs | High | Tax basis and bundling unspecified; no reconciled grand total | Explicit billable state, tax mode and already-included choice; never silently merge into31,600 |
| Quote p2 | Other states | Sommelier separately quoted if added; waiters TBA; fire assistant R0; accommodation not included | High | R0 does not settle included/excluded intent | Distinct priced/included/excluded/TBA/separately-quoted states; unpriced items are not silently free |
| Quote p2 | Chef fee brackets | 0–10:R3,500;11–15:R3,000;16–20:R2,500;21–25:R1,500 | High | No40-person bracket; current rules unconfirmed | Editable legacy reference only; no automatic selection |
| Quote p2 | Travel | “Calculated in costs” | High | R6,000 appended in workbook; new travel fee may duplicate it | Explicit embedded/bundled marker and duplicate-travel warning |
| Quote p1 | Service scope | Ingredients, wood, charcoal, firelighters, tables, braai setup included; plates, cutlery, chafing/service equipment excluded | High | Tables/setup and full-service equipment differ | Preserve precise editable scope; do not claim all equipment included/excluded |
| Quote p2 | Late transport | **R400 per worker** if event **including cleaning** runs past21:00 | High | Eligible workers and triggers unconfirmed | Conditional wording/manual extra; no automatic timed charge |
| Quote p2 | Booking/payment | **50% deposit** secures date; balance **7 days before**; final numbers/amendments before final invoice | High | No payment evidence, bank details or expiry | Review-required editable terms; optional deposit; never infer payment or bank facts |
| Quote p2 | Cancellation | “more than61 days” →50% forfeited; “within60 days” →100% | High | **Exactly day61 uncovered**; fractional days undefined | Preserve wording for review; no automatic cancellation calculation |
| Quote p2 | Rescheduling | Another available date and no revenue loss; original rebooked or no financial impact | High | Requires judgment | Editable text, no automatic waiver |
| Owner5; workbook; quote | VAT | Workbook15%; PDF says incl VAT; owner refers to quote | High observation; business status unconfirmed | No explicit registration/rate confirmation or registration number | Unconfigured registration/rate gate; draft saving allowed, tax-labelled issuance blocked.15% only explicit test fixture |
| Owner7 | Email | Existing business account wanted; currently says Safari, wants Outlook | High | Browser/client does not establish mail host; owner abbreviates address | Brief's sender candidate `jay@mrbraaiguy.co.za` needs verification. Manual PDF workflow; no provider/delivery claims |
| Owner8–9 | CRM/marketing | Email and **Zoho Books**; campaigns require approval; **no consent records** | High | Count/schema/eligibility unknown | Reviewable CSV, provenance and suppressions; imported eligibility unverified; no real imports/sends during build |
| Word header/PDF | Logo | Dark-grey Mr Braai Guy badge, “Curated Braai Specialist”; Word PNG **3508×2244**, PDF877×561 | High | Raster rather than vector; no other brand imagery supplied | Use verified high-resolution logo only; editorial ivory/copper PDF |
| Screenshot | Aesthetic | IMG_1617.jpeg / Code XR screenshot absent from attachment inventory | High | Cannot inspect reference | Proceed with explicit Ember Glass direction; document limitation |
| Official site | Brand | Parent's read-only request returned **HTTP403** | High request evidence | Content not reviewed | Use supplied logo/brief; website untouched |

## Financial reconciliation

```text
Serving1 protein                                  R  6,840.80
Serving1 sundries                                 R  4,520.00
Serving2 sundries                                 R    954.00
Wood/firelighters/charcoal/cleaning                 R  1,064.00
Listed operating costs                            R 13,378.80
Headcount accidentally included as money           R     40.00
Workbook recorded B29                             R 13,418.80
Separate equipment/travel block                   R  6,000.00
Allocation / literal40                            R    150.00 pp
Manual inclusive selling price J31                R    640.00 pp
Final rate J32                                    R    790.00 pp
40 ×790                                           R 31,600.00 incl VAT
```

If all R6,000 expenses are applicable/distinct, costs across both blocks are **R19,378.80** before resolving tax basis and completeness. This is conditional, not an approved final event cost. Sous-chef costs are absent from populated private-cost cells; the R1,900 public fee does not establish their actual cost.

At an **explicit fixture VAT rate15%**,40×R790 **inclusive** gives **R27,478.26 ex +R4,121.74 VAT =R31,600**. If sous-chef950 units are also inclusive, grand total would be **R33,500**; if those units are exclusive at15%, it would be **R33,785**. Neither extra interpretation is approved by the sample. A distinct new-price fixture40×R790 **exclusive** gives **R31,600 ex +R4,740 VAT =R36,340**, before extras.

Use integer minor units and document a deterministic rounding policy. For inclusive lines, multiply quantity by entered inclusive unit amount before splitting rounded line net/tax; do not round an inferred ex-VAT unit price first and change the agreed gross total. This policy is an implementation choice, not a rule found in the sources.

## Remaining choices and implementation gate

**Business-source analysis complete; local implementation may proceed.** No further business answer blocks synthetic development, private drafts or calculation tests. Missing screenshot/inaccessible site limit visual-reference matching but do not block the brief's defined design direction.

Before real tax-labelled issuance: confirm VAT registration/rate, sender identity, approved terms/deposit settings and each customer's fee tax/bundling choices. Do not silently settle legacy extra fees, chef brackets or the61-day gap. Before production: configure owner authentication/recovery, MongoDB Atlas, backups/restore and secrets securely. Before integrated sending: verify mail provider/account; campaigns additionally require approved eligibility/suppression handling and owner approval. These gates do not prevent independent local implementation.

## Evidence and privacy

`docs/source-analysis/` holds SHA-256 inventory, complete cells/formulas/caches, independent formula verification, complete source texts, Word structure/media and both rendered PDF pages. **It contains actual contact information: Git-ignore the entire directory and never serve/package it publicly.** This sanitized report may be committed. Only the inspected standalone logo may be copied to application assets; no source proposal pages or real contact data may become seeds/public assets. Originals were never modified.
