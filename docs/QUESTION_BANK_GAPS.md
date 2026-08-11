# Question bank coverage audit — 2026-08-11

Scheduled audit of question-bank coverage across asset class and role tags, run against
the live template/situational source (`src/quiz/templates`, `src/quiz/situational`) and
the 100-question sample in `QUESTION_REVIEW.md`. Goal: find the areas that are thinnest
relative to the rest of the bank and seed new phrasings to close the gap.

_(Note: the community `question_submissions` review queue — the actual `status = approved`
table — isn't reachable from this environment; no Supabase project connected here exposes
that table. This audit uses shipped/integrated content as the best available proxy for
"approved" coverage.)_

## Findings

**Asset class — hotel/hospitality is the clear outlier.**

| Asset class | `QUESTION_REVIEW.md` tag count | Dedicated situational scenarios |
|---|---|---|
| multifamily | 11 | 12 |
| office | 9 | 21 |
| industrial | 3 | 12 |
| retail | 2 | 8 |
| **hotel** | **1** | **1** (`hotelRevparDivergence.ts`) |

Hospitality has exactly one dedicated situational scenario in the entire bank (72 files)
and appears in only 1 of the 100 reviewed questions, vs. 9–11 for office/multifamily.
The few hotel-adjacent numeric templates that exist (`revparFromAdrOcc.ts`,
`revporVsRevpar.ts`, `gopMargin.ts`, `ffeReserveDollars.ts`) have no situational/judgment
companions the way office and multifamily do.

**Role — `development` trails the other four roles.**

| Role | Mentions across templates/situational/longform |
|---|---|
| acquisitions | 106 |
| assetManagement | 54 |
| portfolioMgmt | 45 |
| mortgageUw | 36 |
| **development** | **20** |

`development` is ~5x thinner than `acquisitions`. Worth a separate pass, but this audit's
10 new phrasings focus on the sharper gap (hospitality), since it's under-covered on both
the asset-class and situational-scenario axes at once.

## 10 proposed phrasings — hospitality/hotel

Headline stems only, ready for full write-up (context, 4-choice answer, explanation,
takeaway) in the next content pass. Tag format matches `QUESTION_REVIEW.md`.

1. **"Why is RevPAR flat while ADR is up double digits?"**
   *Situational · diagnostic · intermediate · hotel · assetManagement*
   Occupancy compression masking ADR growth — read RevPAR components separately before
   trusting the topline number.

2. **"The brand wants a $9M PIP before renewal — does the deal still pencil?"**
   *Situational · deal-process · advanced · hotel · acquisitions/development*
   Franchise Property Improvement Plan capex sprung mid-underwriting; re-run returns net
   of the PIP, not around it.

3. **"GOP margin dropped 400bps despite RevPAR growth — what's the read?"**
   *Situational · diagnostic · intermediate · hotel · assetManagement*
   Labor and cost inflation outrunning topline; GOP margin, not RevPAR, is the operating
   health signal.

4. **"How much should the FF&E reserve actually be funding?"**
   *Situational · document-literacy · beginner · hotel · assetManagement/mortgageUw*
   Reserve % of gross revenue vs. real deferred-capex exposure — most brand agreements
   require 3–5% but that's rarely enough on an aging asset.

5. **"Comp set includes two independents and three branded — do you keep them?"**
   *Situational · comp-selection · intermediate · hotel · acquisitions*
   STR competitive-set methodology; brand mix skews ADR/RevPAR comparisons if not
   normalized.

6. **"New extended-stay supply is delivering three blocks away — how much RevPAR risk is that?"**
   *Situational · marketView · advanced · hotel · acquisitions/portfolioMgmt*
   New-supply absorption risk specific to lodging (vs. the multifamily absorption
   question the bank already covers well).

7. **"The management contract has an incentive fee kicker at 30% GOP margin — whose interest does that align?"**
   *Situational · investment-thesis · intermediate · hotel · assetManagement*
   Incentive-fee structuring in third-party management agreements; base fee vs. GOP
   kicker misalignment with ownership.

8. **"Off-season occupancy craters to 38% — how do you underwrite seasonality into DSCR?"**
   *Situational · sensitivity · advanced · hotel · mortgageUw*
   Seasonal cash-flow debt sizing — trailing-twelve DSCR vs. worst-quarter DSCR, and
   which one the lender actually tests.

9. **"Should you buy the hotel encumbered or push for a brand PIP waiver first?"**
   *Situational · deal-process · advanced · hotel · acquisitions*
   Negotiating brand-flag requirements pre-close vs. inheriting them at close.

10. **"Group/convention bookings are down 20% but transient ADR is up — demand mix shift or a real slowdown?"**
    *Situational · diagnostic · intermediate · hotel · assetManagement/portfolioMgmt*
    Segment-level demand read (group vs. transient) before calling a topline trend
    good or bad.

## Suggested next step

Flesh out #2, #3, and #8 first — they pair most cleanly with existing numeric templates
(`ffeReserveDollars.ts`, `gopMargin.ts`, `revparFromAdrOcc.ts`) so the situational
scenario and the drill-mode question can share underwriting assumptions.
