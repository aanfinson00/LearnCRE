# Question bank gap analysis — 2026-09-10

Automated pass over the situational question bank (`src/quiz/situational/`, 71
cases — the largest slice of the 100-question review sheet and the part of
the bank with explicit `assetClass` / `category` tags) to find where new
questions would do the most good, followed by 10 candidate phrasings to seed
that work.

## Method

Counted every situational case by its `assetClass` and `category` fields
(cases with no `assetClass` apply across all asset types — mostly capital-stack
/ document-literacy mechanics that aren't asset-specific by nature, so they're
excluded from the per-asset-class comparison below).

## Findings

**By asset class** (37 of 71 cases are asset-class-agnostic; the rest split):

| Asset class | Cases | Share of tagged cases |
|---|---|---|
| Multifamily | 11 | 32% |
| Office | 9 | 27% |
| Mixed (explicit) | 8 | 24% |
| Industrial | 3 | 9% |
| Retail | 2 | 6% |
| **Hotel** | **1** | **3%** |

Hotel and retail are the clear gaps. Hotel in particular has a single case
(`hotelRevparDivergence`) covering the entire asset class — every other CRE
product type in the app's taxonomy (`mixed`, `multifamily`, `office`,
`retail`, `industrial`, `hotel`) has at least 2, most have far more.

**By category** (all 71 cases tagged):

| Category | Cases |
|---|---|
| deal-process | 21 |
| document-literacy | 13 |
| investment-thesis | 9 |
| diagnostic | 7 |
| pricing | 7 |
| risk | 7 |
| lease-econ | 2 |
| sensitivity | 2 |
| comp-selection | 2 |
| **absorption** | **1** |

`absorption`, `comp-selection`, `sensitivity`, and `lease-econ` are the
thinnest categories — each has one order of magnitude fewer cases than
`deal-process`.

## 10 candidate phrasings

Targeted at the intersection of the two gaps: hotel and retail asset classes,
written into the thinnest categories above so each new case also helps close
a category gap, not just an asset-class one. These are ideation-stage
phrasings (title + premise + the graded takeaway), in the same shape as the
curriculum pipeline's `generate` stage — next step is human vet → build out
as a full `SituationalCase` (scenario, 4 options, explanations, tips) in
`src/quiz/situational/`, same pattern as `hotelRevparDivergence.ts` /
`retailPercentageRentClause.ts`.

1. **"Hotel: which comp set actually belongs in your STR benchmark?"**
   *(category: comp-selection, difficulty: intermediate)* — A full-service
   flag is being benchmarked against a comp set that includes two
   limited-service, lower-chain-scale properties because they're
   geographically closest. Tests whether the learner screens comps on chain
   scale / service level before geography, the same discipline as cap-rate
   comp vetting for other asset classes.

2. **"Hotel: how long until a new-build competitor stabilizes?"**
   *(category: absorption, difficulty: intermediate)* — A 250-key
   competitor just opened two blocks away. Learner is asked to reason about
   the typical 24–36 month hotel ramp-up curve and what that means for near-term
   RevPAR Index pressure vs. the multifamily/industrial absorption math
   already in the bank.

3. **"Hotel: how much does a 5-point occupancy swing move your NOI?"**
   *(category: sensitivity, difficulty: intermediate)* — Tests GOP
   flow-through / operating leverage: hotels have far higher fixed-cost
   ratios than other asset classes, so the same occupancy delta moves NOI
   much more violently than in multifamily. Good contrast case against
   existing sensitivity content.

4. **"Hotel: management contract, franchise, or lease — which deal structure is actually cheapest?"**
   *(category: lease-econ, difficulty: advanced)* — Compares the effective
   "occupancy cost" of a franchise fee + brand PIP vs. a third-party
   management contract vs. a ground/percentage-rent lease to an operator —
   the hotel analogue to the NNN-vs-gross lease-econ case already built for
   retail.

5. **"Hotel: does the cap rate still work once you underwrite the PIP?"**
   *(category: pricing, difficulty: intermediate)* — A trade looks attractive
   on in-place cap rate until the brand-mandated Property Improvement Plan
   (PIP) capex is netted against price — tests whether the learner treats
   PIP as a purchase-price adjustment, not a post-close surprise.

6. **"Retail: which lease comps should anchor your CAM recovery assumption?"**
   *(category: comp-selection, difficulty: intermediate)* — A strip-center
   deal is comped against power-center recovery ratios that don't reflect
   the smaller GLA's weaker recovery structure. Same comp-discipline test as
   #1, applied to expense recoveries instead of cap rate.

7. **"Retail: how far does one anchor vacancy ripple through co-tenancy clauses?"**
   *(category: sensitivity, difficulty: advanced)* — An anchor tenant
   vacates, triggering co-tenancy kick-outs / rent abatement clauses in
   several in-line leases. Tests whether the learner models the *chain
   reaction* on NOI, not just the anchor's own rent loss.

8. **"Retail: gross-up vs. expense stop — which recovery structure protects NOI when opex inflates?"**
   *(category: lease-econ, difficulty: intermediate)* — Direct retail
   companion to case #4: compares how a gross-up clause vs. a fixed expense
   stop behaves differently as opex rises, and which one a landlord should
   push for in the current rate/inflation environment.

9. **"Retail: your largest tenant just filed Chapter 11 — what's your real exposure?"**
   *(category: risk, difficulty: advanced)* — Tests the assumed-vs-rejected
   lease distinction in bankruptcy (Section 365), and why "biggest tenant
   files bankruptcy" isn't automatically "biggest tenant vacates."

10. **"Retail: sales are flat but foot traffic is down 15% — what's actually happening?"**
    *(category: diagnostic, difficulty: intermediate)* — Forces the learner
    to decompose sales = traffic × conversion × basket size, the retail
    equivalent of the RevPAR = ADR × Occupancy decomposition already used in
    `hotelRevparDivergence`, and diagnose which lever is offsetting the
    traffic decline.

## Suggested next step

Vet these 10 the same way the curriculum pipeline vets walkthrough ideas
(accept / reject), then build the accepted ones out as full
`SituationalCase` entries and wire them into `src/quiz/situational/index.ts`.
Re-run this gap analysis after landing them — hotel and retail should no
longer be the two smallest asset-class buckets, and `absorption` /
`comp-selection` / `sensitivity` / `lease-econ` should each gain coverage.
