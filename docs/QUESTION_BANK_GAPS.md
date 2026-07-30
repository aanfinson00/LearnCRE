# Question bank coverage gaps & candidate phrasings

_Snapshot generated 2026-07-30 from `src/quiz/situational/*.ts` (72 cases, the
same set `src/quiz/reviewQuestions.ts` draws the numbered 1–100 review list
from). Re-run the counts below after adding cases to keep this current._

## Coverage snapshot

| Dimension | Well covered | Thin |
|---|---|---|
| **Difficulty** | advanced 34, intermediate 33 | **beginner 4** |
| **Role** | acquisitions 40, assetManagement 31, portfolioMgmt 25, mortgageUw 19 | **development 9** |
| **Asset class** | multifamily 11, office 9, mixed 8 | **hotel 1, retail 2, industrial 3** |
| **Category** | deal-process 21, document-literacy 13, investment-thesis 9 | **absorption 1, comp-selection 2, sensitivity 2, lease-econ 2** |

Biggest single gap: **beginner difficulty** — only 4 of 72 cases, vs. 33–34
each for intermediate/advanced. Second: **development role** and the
**hotel/retail/industrial** asset classes, which are each covered by a
handful of cases while multifamily/office/mixed dominate.

## 10 candidate question phrasings

Phrasing only — headline + one-line premise, tagged for whoever drafts the
full `SituationalCase` (scenario, data, 4 options, takeaway, tips). Each
targets 2–3 of the gaps above at once.

1. **"Why does this hotel's cap rate look nothing like the office building down the street?"**
   `beginner · pricing · hotel · acquisitions`
   Premise: same submarket, similar quality, hotel trades 200+ bps wide of the office comp — tests whether the learner reaches for RevPAR volatility / operating-intensity risk instead of assuming a mispriced deal.

2. **"What actually happens between a signed LOI and a closed construction loan?"**
   `beginner · deal-process · development`
   Premise: sequences the real gating steps (entitlements, GC bids, lender underwriting, equity commitment) so a beginner can tell which ones can run in parallel vs. which are hard blockers.

3. **"Why doesn't this 'comparable' industrial sale actually compare?"**
   `beginner · comp-selection · industrial · acquisitions, portfolioMgmt`
   Premise: OM lists a same-submarket industrial sale as a comp, but clear height / dock ratio / office finish differ enough to invalidate the comp.

4. **"How much does a 90-day permitting delay actually cost a spec industrial deal?"**
   `intermediate · sensitivity · industrial · development`
   Premise: quantifies carry cost + pushed-out lease-up against a fixed construction loan rate, tests whether the learner isolates the delay's cash cost from the deal's overall IRR drag.

5. **"Why is the anchor paying so much less per square foot than the shop next door?"**
   `beginner · lease-econ · retail · assetManagement`
   Premise: anchor rent looks "cheap" against in-line tenants — tests whether the learner connects it to the anchor's foot-traffic draw and percentage-rent/CAM structure instead of calling it a bad lease.

6. **"Why is the lender stress-testing lease-up speed on this spec building, not just the pro forma rent?"**
   `intermediate · absorption · industrial · mortgageUw`
   Premise: underwriting a spec industrial construction loan — tests whether the learner sees that absorption pace, not rent level, drives interest-reserve sizing and DSCR at stabilization.

7. **"Of these three retail 'comps' in the OM, which one should you throw out — and why?"**
   `beginner · comp-selection · retail · portfolioMgmt`
   Premise: three retail sale comps with one distorted by a sale-leaseback or portfolio premium — tests basic comp-vetting instincts.

8. **"ADR's up, RevPAR's up, but GOP margin is shrinking — what's going on?"**
   `intermediate · diagnostic · hotel · development, assetManagement`
   Premise: classic hotel operating-leverage trap — rising labor/utility costs outpacing rate growth — tests whether the learner separates top-line health from margin health.

9. **"How much does a 25 bps rate move actually change your refi proceeds?"**
   `beginner · sensitivity · mixed · assetManagement`
   Premise: simple DSCR-constrained refi sizing exercise — tests whether the learner recalculates max loan off the new debt-service constraint rather than eyeballing a small rate move as immaterial.

10. **"Why does the anchor's co-tenancy clause just rewrite your construction draw schedule?"**
    `intermediate · deal-process · retail · development`
    Premise: co-tenancy trigger tied to anchor's own opening date forces re-sequencing of TI/pad-site construction — tests whether the learner connects a lease clause to a hard construction-schedule constraint.

## Suggested next step

Draft 2–3 of these into full `SituationalCase` files (see
`src/quiz/situational/absorptionTiming.ts` for the shape) per pass, favoring
beginner difficulty and the hotel/retail/industrial asset classes until the
gaps above close. Re-run the coverage snapshot after each batch.
