# Question bank coverage gap — 2026-09-25

Automated scan of the question bank to find areas with the thinnest coverage,
and 10 draft phrasings to start closing the biggest gap. This is a proposal
doc — nothing here has been wired into `src/quiz` or submitted to
`question_submissions` yet.

## Method

Live "approved" counts live in Supabase's `question_submissions` table
(`status = 'approved'`), reviewed via the in-app Admin → Submission review
screen. This session's Supabase MCP connection only exposes three projects
(`parcycle`, `leasing-tracker`, `aanfinson00's Project`), none of which has
a `question_submissions` table — so the live approval counts weren't
reachable from here. As a proxy, this scan used `feedback/questions.json`
(the 100-question set that mirrors `REVIEW_QUESTIONS`, the app's single
source of truth for the Feedback studio) and counted the `meta` tags
(`type · kind · difficulty · assetClass · role`) on all 100 entries.

## Findings

**By role** (the 5 canonical roles in `src/types/role.ts`; a question can
carry more than one, so counts sum to more than 100):

| Role | Count |
|---|---|
| acquisitions | 50 |
| assetManagement | 36 |
| portfolioMgmt | 30 |
| mortgageUw | 21 |
| **development** | **11** |

Development is tagged on under half as many questions as the next-lowest
role, and less than a quarter as many as acquisitions.

**By topic** (`kind` tag on the 71 situational entries — walkthrough kinds
appear once each by design and aren't gaps):

| Topic | Count |
|---|---|
| deal-process | 21 |
| document-literacy | 13 |
| investment-thesis | 9 |
| pricing / diagnostic / risk | 7 each |
| fit / marketView (mock-interview) | 3–4 |
| comp-selection / lease-econ / sensitivity | 2 each |
| **absorption** | **1** |

Absorption/lease-up pacing — a core development and acquisitions
underwriting skill — has exactly one question in the whole set (#2, "How
long until the market hits 95%?", itself tagged `acquisitions/development`).

Cross-checked against the existing 71 situational titles in
`src/quiz/situational/`: development-adjacent content that does exist
skews toward financing mechanics already covered elsewhere (construction
loan draws, LTC vs LTV, retainage, cost-overrun sharing, LDs). The
feasibility/market-risk side of development — pre-leasing hurdles,
yield-on-cost vs. exit spread, entitlement risk, absorption sensitivity,
density/parking tradeoffs — has little to no dedicated coverage.

## Proposal: 10 draft phrasings (role: development)

Titles only, in the house style (short, situational, ends in "?"). Each
notes the tension it's meant to test and a suggested `kind_hint`/`tags` for
whoever turns it into a full situational case (prompt + data points + 4
answer choices + explanations, per the `ReviewQuestion` shape in
`src/quiz/reviewQuestions.ts`).

1. **"Your pre-leasing is at 35% — does the construction loan still close?"**
   Tests the pre-leasing covenant in construction loan commitments and what
   happens when a deal is short of the threshold at closing.
   `kind_hint: preLeasingThreshold` · `tags: [development, mortgageUw, construction]`

2. **"Yield-on-cost is 6.5% and stabilized cap rates are 5.75% — is that spread enough to build?"**
   Tests reading the development spread (yield-on-cost minus exit cap) as
   the compensation for development risk, not just a rate comparison.
   `kind_hint: devSpread` · `tags: [development, acquisitions, pricing]`

3. **"Lease-up is running 40% below your pro forma absorption pace — what do you do first?"**
   Tests diagnosing a slow lease-up (rate vs. rent vs. concessions vs.
   market) before touching the pro forma.
   `kind_hint: absorption` · `tags: [development, assetManagement, diagnostic]`

4. **"Entitlement is taking 9 months longer than underwritten — what actually breaks?"**
   Tests carrying-cost math on a delayed entitlement timeline and which
   loan terms (extension fees, rate resets) bite first.
   `kind_hint: entitlementDelay` · `tags: [development, risk]`

5. **"GMP contract or cost-plus with a guaranteed cap — which do you actually want here?"**
   Tests trade-offs in construction contract structure under a rising-cost
   environment, and who bears escalation risk in each.
   `kind_hint: constructionContractType` · `tags: [development, risk]`

6. **"Cutting the amenity package saves $1.2M — does it cost you more in rent?"**
   Tests value-engineering trade-offs: hard-cost savings vs. the rent
   premium or lease-up velocity a cut amenity was underwritten to deliver.
   `kind_hint: valueEngineeringTradeoff` · `tags: [development, pricing]`

7. **"Construction debt matures before the permanent loan closes — now what?"**
   Tests the gap between construction-loan maturity and a permanent
   takeout, and the options (extension, bridge, mini-perm) when they don't
   line up.
   `kind_hint: takeoutTimingGap` · `tags: [development, mortgageUw]`

8. **"Trending market rent 3 years forward for a ground-up deal — how aggressive is too aggressive?"**
   Tests underwriting rent growth over a multi-year construction/lease-up
   horizon instead of anchoring to today's asking rents.
   `kind_hint: rentGrowthTrending` · `tags: [development, investment-thesis]`

9. **"Dropping the parking ratio unlocks 20 more units — what's the real trade?"**
   Tests density/parking-ratio trade-offs against zoning minimums,
   leasability, and per-unit cost, not just unit count.
   `kind_hint: densityParkingTradeoff` · `tags: [development, deal-process]`

10. **"Replacement cost is $310/SF and you can buy stabilized product at $260/SF — do you still build?"**
    Tests the buy-vs-build decision when replacement cost sits above
    trading comps, and what has to be true (rent growth, scarcity, timing)
    to justify developing anyway.
    `kind_hint: replacementCost` · `tags: [development, acquisitions, investment-thesis]`

## Next step

Each of these needs a full situational case (prompt, data block, 4 choices
with an `isBest` and explanations, takeaway, tips) before it can be added
to `src/quiz/situational/` and flow into `REVIEW_QUESTIONS` /
`feedback/questions.json`. Alternatively, submit them through the in-app
**Feedback → Submit a question** flow so they land in
`question_submissions` as `pending` for the normal admin approve/reject
pass.
