# Question bank gap scan — 2026-07-05

Source: `QUESTION_REVIEW.md` / `src/quiz/situational/*.ts` (71 live situational
cases — the full situational question bank, not a sample; see
`src/quiz/reviewQuestions.ts`).

## Where the gaps are

**By asset class** (situational cases tagged with a single `assetClass`):

| Asset class | Cases |
|---|---|
| hotel | **1** |
| retail | 2 |
| industrial | 3 |
| mixed | 8 |
| office | 9 |
| multifamily | 11 |

**By category** (cases with a real-world asset-class anchor, i.e. excluding the
untagged process/document-literacy cases):

| Category | Cases |
|---|---|
| absorption | 1 |
| comp-selection | 2 |
| lease-econ | 2 |
| sensitivity | 2 |
| pricing | 6 |
| diagnostic | 7 |
| risk | 7 |
| investment-thesis | 7 |

**Standout gap: hotel.** It's the thinnest asset class by a wide margin (1 vs.
8–11 for mixed/office/multifamily) despite having decent procedural-math
coverage already (`revparFromAdrOcc`, `revporVsRevpar`, `gopMargin`,
`ffeReserveDollars`, `capexReserveSizing` templates). The one existing hotel
situational case (`hotelRevparDivergence.ts`) covers `diagnostic` only —
`pricing`, `risk`, `comp-selection`, `investment-thesis`, `sensitivity`,
`absorption`, `deal-process`, and `document-literacy` have zero hotel-specific
scenarios.

## 10 candidate phrasings — hotel situational cases

Titles + one-line premise, ready to be fleshed out into full
`SituationalCase` entries (scenario, data points, 4 options, takeaway, tips)
the way `hotelRevparDivergence.ts` is:

1. **"Why does this hotel trade at a 200 bps wider cap than the office building next door?"** *(pricing)* — same market, same sponsor credit; buyer is discounting for operating-business risk (labor, brand, FF&E capex cadence) baked into hotel cap rates vs. other CRE.
2. **"The brand wants a $6M PIP before it'll renew the flag — does the deal still pencil?"** *(risk)* — Property Improvement Plan cost hits right after acquisition; how a PIP requirement changes basis and returns underwriting.
3. **"Which hotels actually belong in your STR comp set?"** *(comp-selection)* — full-service vs. select-service, chain scale, distance ring, and why a comp set with the wrong chain-scale mix produces a misleading RevPAR Index.
4. **"Buy the tired asset, flip the flag — does a brand conversion pencil on this timeline?"** *(investment-thesis)* — converting a fading independent to a recognized flag: PIP cost, brand fees, and the RevPAR lift needed to justify the basis.
5. **"GOP margin is compressing while RevPAR keeps climbing — what's eating the flow-through?"** *(sensitivity / diagnostic)* — labor cost inflation and service-level creep outpacing top-line growth; second hotel diagnostic angle distinct from the existing RevPAR Index case.
6. **"Renovation just wrapped — how long until RevPAR ramps back to pre-PIP levels?"** *(absorption)* — post-renovation displacement and ramp-up curve, the hotel analog to lease-up absorption timing.
7. **"Franchise agreement termination — what does the exit actually cost?"** *(document-literacy)* — reading liquidated-damages and de-flagging clauses in a franchise agreement excerpt.
8. **"Management contract: base fee vs. incentive fee — who actually eats a bad year?"** *(lease-econ analog)* — base fee (% of revenue) vs. incentive fee (% of GOP over a hurdle) and how that split allocates downside risk between owner and operator.
9. **"Lender wants a PIP reserve escrow before closing — how does that change your sources & uses?"** *(deal-process)* — hotel-specific financing condition (FF&E reserve / PIP escrow) and how it moves through the closing checklist versus a standard CRE loan.
10. **"Seasonal debt yield covenant — do you trip it in the off-quarter?"** *(risk / deal-process)* — testing a DSCR/debt-yield covenant against a hotel's seasonal NOI curve instead of the flat quarterly income assumed in office/multifamily covenant tests.

## Suggested next step

Draft 2–3 of these per sprint into `src/quiz/situational/`, following the
shape of `hotelRevparDivergence.ts` (scenario + data points + 4 options with
one `isBest` + takeaway + tips), then regenerate `QUESTION_REVIEW.md` /
`feedback/questions.json` via `npx vitest run src/test/extractQuestions.test.ts`.

Secondary gap worth a follow-up pass: **retail** (2 cases) and **industrial**
(3 cases) are also thin relative to office/multifamily/mixed.
