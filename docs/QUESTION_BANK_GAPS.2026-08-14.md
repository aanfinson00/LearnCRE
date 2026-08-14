# Question bank gap analysis — 2026-08-14

_Scheduled sweep of `src/quiz/situational/` (71 shipped situational cases) to
find underrepresented areas and seed new question phrasings. Counts below are
tag frequencies pulled from each case's `roles`, `assetClass`, `category`, and
`difficulty` fields._

## Coverage today

**By difficulty** — the biggest imbalance in the bank:

| Difficulty | Count |
|---|---|
| advanced | 34 |
| intermediate | 33 |
| beginner | **4** |

**By asset class:**

| Asset class | Count |
|---|---|
| multifamily | 11 |
| office | 9 |
| mixed | 8 |
| industrial | 3 |
| retail | 2 |
| hotel | **1** |

**By category:**

| Category | Count |
|---|---|
| deal-process | 21 |
| document-literacy | 13 |
| investment-thesis | 9 |
| pricing | 7 |
| diagnostic | 7 |
| risk | 7 |
| sensitivity | 2 |
| comp-selection | 2 |
| lease-econ | 2 |
| absorption | **1** |

**By role:**

| Role | Count |
|---|---|
| acquisitions | 40 |
| assetManagement | 31 |
| portfolioMgmt | 25 |
| mortgageUw | 19 |
| development | **9** |

**Thinnest role × asset-class corners** (1 case each): development×multifamily,
mortgageUw×mixed, portfolioMgmt×office, portfolioMgmt×multifamily,
assetManagement×hotel, mortgageUw×industrial. Retail and hotel have zero
mortgageUw or development coverage at all.

## Where to focus next

1. **Beginner difficulty** — only 4 of 71 cases. Most gaps below should default
   to beginner or a beginner/intermediate split to close this.
2. **Hotel and retail asset classes** — hotel has exactly one case; retail two.
3. **`absorption`, `comp-selection`, `lease-econ`, `sensitivity` categories** —
   2 or fewer cases each, vs. 21 for `deal-process`.
4. **`development` role** — least-covered role, and almost absent from hotel
   and retail.

## 10 new question phrasings to draft

Each targets one or more of the gaps above. Titles follow the existing
house style (short, situational hook); tags are proposed, not final.

1. **"Is this RevPAR growth number believable?"**
   `category: sensitivity · difficulty: beginner · assetClass: hotel · roles: [assetManagement]`
   Hotel comp is underwriting 12% RevPAR growth off a stabilized base — learner checks it against ADR/occupancy math instead of taking the top-line number on faith.

2. **"Which hotel comps should anchor this deal?"**
   `category: comp-selection · difficulty: intermediate · assetClass: hotel · roles: [acquisitions]`
   Five "comparable" hotel trades with different flags, chain scales, and renovation vintages — learner has to throw out the ones that don't actually compare.

3. **"Does the percentage-rent breakpoint even matter here?"**
   `category: lease-econ · difficulty: beginner · assetClass: retail · roles: [assetManagement]`
   Tenant sales are well under the natural breakpoint — learner recognizes percentage rent is a non-factor for this year's NOI and stops modeling it as upside.

4. **"Is this the right industrial comp set?"**
   `category: comp-selection · difficulty: beginner · assetClass: industrial · roles: [acquisitions]`
   Mixes a bulk-distribution comp with a small infill last-mile comp — learner has to separate by clear height, dock ratio, and truck court depth before averaging cap rates.

5. **"Will pre-leasing hit the construction lender's threshold in time?"**
   `category: absorption · difficulty: intermediate · assetClass: mixed · roles: [development]`
   Given current leasing velocity and months to certificate of occupancy, learner projects whether pre-leasing clears the lender's 60% threshold before the loan's outside date.

6. **"How much does a 3-month construction delay actually cost?"**
   `category: sensitivity · difficulty: intermediate · assetClass: mixed · roles: [development, mortgageUw]`
   Learner traces a schedule slip through extended interest carry, a later lease-up start, and a squeezed exit timeline — not just "3 months of extra interest."

7. **"Is this retail comp set apples-to-apples?"**
   `category: comp-selection · difficulty: intermediate · assetClass: retail · roles: [acquisitions]`
   Anchored center vs. unanchored strip vs. power center all lumped into one cap-rate average — learner has to separate by format before pricing.

8. **"What's the real net effective rent on this industrial renewal?"**
   `category: lease-econ · difficulty: beginner · assetClass: industrial · roles: [assetManagement]`
   Renewal has a lower face rate but no TI and no downtime versus a new lease at a higher face rate — learner compares NER, not headline rent.

9. **"Is the portfolio absorbing vacancy fast enough to hit plan?"**
   `category: absorption · difficulty: beginner · assetClass: mixed · roles: [portfolioMgmt]`
   Multi-asset portfolio with uneven lease-up paces — learner checks blended absorption against the business-plan timeline rather than eyeballing the best-performing asset.

10. **"Does this hotel loan actually clear the DSCR test on a bad season?"**
    `category: sensitivity · difficulty: intermediate · assetClass: hotel · roles: [mortgageUw]`
    Learner stress-tests DSCR against a seasonal occupancy trough rather than trailing-twelve-month NOI, since hotel cash flow is far more seasonal than the other asset classes in the bank.

## Suggested next step

Draft full cases (scenario, data points, 4 answer choices with explanations,
takeaway) for #1, #4, #5, and #10 first — they hit the two biggest gaps
(beginner difficulty + development role) at once. Add to
`src/quiz/situational/`, then regenerate `feedback/questions.json` and
`QUESTION_REVIEW.md` via `npx vitest run src/test/extractQuestions.test.ts`.
