# Situational question bank — coverage audit & backlog

_Audit run 2026-07-16. Counts pulled directly from `src/quiz/situational/*.ts`
(`assetClass`, `roles`, `category` fields) — 71 cases at time of writing._

This is a lighter-weight companion to `docs/interview-questions.md` (which
tracks GAPs against real interview-question patterns). This file tracks GAPs
against the shape of the bank itself — which `assetClass` / `role` /
`category` buckets are thin relative to the rest, independent of whether an
interview question prompted them. Re-run the audit after each content pass
and append a new dated section below rather than editing old ones.

## Distribution snapshot

**By asset class:**

| assetClass | count |
|---|---|
| multifamily | 11 |
| office | 9 |
| mixed | 8 |
| industrial | 3 |
| retail | 2 |
| hotel | 1 |

**By role** (cases can carry more than one role):

| role | count |
|---|---|
| acquisitions | 40 |
| assetManagement | 31 |
| portfolioMgmt | 25 |
| mortgageUw | 19 |
| development | 9 |

**By category:**

| category | count |
|---|---|
| deal-process | 21 |
| document-literacy | 13 |
| investment-thesis | 9 |
| risk | 7 |
| pricing | 7 |
| diagnostic | 7 |
| sensitivity | 2 |
| lease-econ | 2 |
| comp-selection | 2 |
| absorption | 1 |

**Thinnest buckets:** hotel (1) and retail (2) asset class; development (9)
role; absorption (1), sensitivity (2), lease-econ (2), comp-selection (2)
categories. ROADMAP's Phase 1 depth pass already closed the worst of the
hotel/retail/industrial gap (0/1/2 → 1/2/3) — this round targets what's still
thin after that pass, doubling up on cases that hit two thin buckets at once
(e.g. a thin asset class *and* a thin category) where the framing supports it.

## 10 candidate phrasings

Titles only — framing/numbers/distractors still need to be built out into
full `SituationalCase` entries. Each maps to one of the thin buckets above;
several intentionally double up.

1. **"Hotel: the flag just raised franchise fees 150bps — what happens to value?"**
   `assetClass: hotel` · `category: pricing` · `roles: [acquisitions, assetManagement]`
   Fee load is a direct NOI hit that's easy to underweight next to RevPAR — pairs with the existing `hotel-revpar-divergence` case without repeating it.

2. **"New-build hotel: how long to stabilized occupancy, and how does that hit your DSCR covenant?"**
   `assetClass: hotel` · `category: absorption` · `roles: [development, mortgageUw]`
   Doubles up on two of the thinnest buckets (hotel, absorption) in one case.

3. **"Retail: the anchor is closing — what does the co-tenancy clause actually trigger?"**
   `assetClass: retail` · `category: risk` · `roles: [assetManagement]`
   Distinct from the existing `retail-percentage-rent-clause` case (rent mechanics vs. lease-continuance risk).

4. **"Retail: is a power-center comp even valid for a lifestyle-center subject?"**
   `assetClass: retail` · `category: comp-selection` · `roles: [acquisitions]`
   Retail x comp-selection — both thin.

5. **"Industrial: how much does losing 4 feet of clear height actually cost you in rent?"**
   `assetClass: industrial` · `category: sensitivity` · `roles: [acquisitions]`
   Industrial x sensitivity — both thin; distinct from `industrial-truck-court-bid` (bid defense vs. rent sensitivity to a single spec variable).

6. **"Industrial: last-mile e-commerce tenant vs. traditional 3PL — does the cap rate really move?"**
   `assetClass: industrial` · `category: pricing` · `roles: [acquisitions]`

7. **"Development: which hurts your IRR more — a 6-month delay or a 10% cost overrun?"**
   `assetClass: mixed` · `category: sensitivity` · `roles: [development]`
   Development x sensitivity — both thin; distinct from `construction-cost-overrun` (single-variable magnitude vs. this case's two-variable tradeoff).

8. **"Development: the lender wants 60% pre-leased before funding — what's your fallback?"**
   `assetClass: mixed` · `category: risk` · `roles: [development, mortgageUw]`

9. **"Gross-up clause: why does a half-empty building make your CAM bill go up?"**
   `assetClass: office` · `category: lease-econ` · `roles: [assetManagement]`
   Lease-econ is thin; distinct from `lease-base-year-vs-stop` (base year/stop mechanics vs. occupancy-driven gross-up).

10. **"Is a gateway-market comp any use for pricing a secondary-market deal?"**
    `assetClass: mixed` · `category: comp-selection` · `roles: [acquisitions]`
    Cross-market adjustment — distinct axis from the existing vintage/physical comp-selection cases.

## Next step

Pick off phrasings against `src/quiz/situational/index.ts` conventions (see
any existing case, e.g. `capRateDivergence.ts`, for the full shape: `scenario`,
`data`, `question`, 4 `options` with one `isBest: true` and reasoned
`explanation` on each, plus a closing `takeaway`). Add to
`SITUATIONAL_CASES` in `src/quiz/situational/index.ts` and re-run the audit
counts above.
