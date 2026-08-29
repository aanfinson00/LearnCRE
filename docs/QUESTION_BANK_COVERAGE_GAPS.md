# Question bank coverage gaps — 2026-08-29

Automated pass over the situational question bank (`src/quiz/situational/*.ts`,
72 files) plus the 100-question review sample (`QUESTION_REVIEW.md`) to find
which roles / asset classes / topics are thinnest, and 10 new phrasings to
start closing the gap.

## What's thin

**By role** (`roles: [...]` tags across all 72 situational files):

| role            | count |
|-----------------|------:|
| acquisitions    | 40 |
| assetManagement | 31 |
| portfolioMgmt   | 25 |
| mortgageUw      | 19 |
| **development** | **9** |

Development is the least-covered role by a wide margin — under a quarter of
acquisitions' count, and it's almost always tagged *secondary* (paired with
mortgageUw or acquisitions on construction-finance questions), rarely the
primary lens.

**By asset class** (`assetClass` on situational files):

| asset class | count |
|-------------|------:|
| multifamily | 11 |
| office      | 9 |
| mixed       | 8 |
| industrial  | 3 |
| retail      | 2 |
| **hotel**   | **1** |

Hotel has exactly one question in the entire bank (`hotelRevparDivergence.ts`).
Retail and industrial are also thin relative to multifamily/office.

**By topic** (from the 100-question review sample's tags — proxy for the
live app's question framing mix): `comp-selection`, `lease-econ`,
`sensitivity`, and `absorption` each appear 1–2 times, versus 21 for
`deal-process` and 13 for `document-literacy`.

## 10 new phrasings to add

All ten sit at the intersection of the thinnest role (development) and/or
the thinnest asset classes (hotel, retail, industrial), using the thinnest
topics where they fit naturally. These are stems/premises only — framed for
someone to build out into full situational questions (4 MC choices +
reasoning), matching the existing `QUESTION_REVIEW.md` format.

1. **How long until this new-build hotel stabilizes to market RevPAR?**
   *Situational · absorption · intermediate · hotel · development/acquisitions*
   — Ramp-up curve for a newly delivered hotel vs. the submarket's stabilized RevPAR; tests absorption math applied to hospitality instead of the usual multifamily framing.

2. **Which hotel comps actually belong in this set — and why does flag matter?**
   *Situational · comp-selection · intermediate · hotel · acquisitions*
   — Comp vetting where brand/flag, not just geography and timing, is the disqualifying variable.

3. **Does the ground-up hotel pencil against buying a stabilized asset of the same flag?**
   *Situational · devSpread · intermediate · hotel · development*
   — Yield-on-cost vs. going-in cap on a stabilized comp; tests the "why build vs. buy" spread outside multifamily/office.

4. **Should you pre-lease the anchor before breaking ground, or build on spec?**
   *Situational · lease-econ · intermediate · retail · development/acquisitions*
   — Construction-loan sizing and go/no-go risk tied to anchor pre-leasing thresholds.

5. **A co-tenancy clause trips mid-construction — what happens to the pro forma?**
   *Situational · sensitivity · advanced · retail · development*
   — Rent abatement/kick-out triggered by anchor vacancy during lease-up; tests downstream NOI and debt-yield sensitivity.

6. **Spec industrial in a market with 18 months of supply on the way — build now or wait?**
   *Situational · risk · intermediate · industrial · development*
   — Timing a spec delivery against a visible supply pipeline; absorption pace vs. months-to-deliver.

7. **Land comps vs. replacement-cost comps — which one actually caps your bid?**
   *Situational · comp-selection · intermediate · industrial · development/acquisitions*
   — Land basis discipline when land comps and a replacement-cost build-up disagree.

8. **The GC's schedule slips four months — what actually happens to your draw schedule and your equity?**
   *Situational · deal-process · intermediate · mixed · development*
   — Mechanics of a construction delay flowing through interest reserve, draw timing, and additional equity calls (deliberately using the bank's most-covered topic, deal-process, but from the underrepresented development lens).

9. **What does the franchise agreement's PIP clause force into your budget?**
   *Situational · document-literacy · advanced · hotel · development/mortgageUw*
   — Reading a hotel franchise agreement's property-improvement-plan requirement into a renovation budget and loan sizing — hotel's one document-literacy gap.

10. **Outparcel pad site: ground-lease it or sell it — which unlocks more value?**
    *Situational · pricing · intermediate · retail · development*
    — Monetizing an out-parcel during a retail development; ground-lease income stream vs. lump-sum sale, and how each affects the parent parcel's basis and financing.

## Suggested next step

Build out 2–3 of these (start with #1 and #3 — hotel is the single biggest
gap) into full situational question files under `src/quiz/situational/`,
following the existing pattern (see `hotelRevparDivergence.ts` for the only
current hotel entry), then regenerate `QUESTION_REVIEW.md` /
`feedback/questions.json` via:

```
npx vitest run src/test/extractQuestions.test.ts
```
