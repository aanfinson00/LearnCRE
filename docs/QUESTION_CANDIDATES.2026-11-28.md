# Question candidates — 2026-11-28

Ten candidate situational questions for the thinnest areas of the bank. **None of these are registered in the app** — they are phrasings awaiting review. Mark each `[x]` approve / `[r]` reject; approved ones can be lifted into `src/quiz/situational/<id>.ts` (shape already matches `SituationalCase`).

## How the gaps were picked

The cloud `question_submissions` table (where `approved` / `integrated` status lives) could not be read — the `learncre` Supabase project is paused. Coverage below is therefore measured against the **shipped situational bank** (72 cases), which is the set of questions that have made it through review.

| Category | Cases | | Role | Cases | | Difficulty | Cases |
|---|---|---|---|---|---|---|---|
| absorption | **1** | | development | **9** | | beginner | **4** |
| comp-selection | **2** | | mortgageUw | 19 | | intermediate | 33 |
| lease-econ | **2** | | portfolioMgmt | 25 | | advanced | 34 |
| sensitivity | **2** | | assetManagement | 31 | | | |
| diagnostic / pricing / risk | 7 each | | acquisitions | 40 | | | |
| investment-thesis | 9 | | | | | | |
| document-literacy | 13 | | | | | | |
| deal-process | 21 | | | | | | |

Asset-class tags are also lopsided: hotel 1, retail 2, industrial 3 vs. multifamily 11, office 9.

So this batch targets **absorption (3), comp-selection (2), lease-econ (2), sensitivity (3)**, leaning on beginner difficulty, the development role, and hotel / retail / industrial.

| # | Id | Category | Difficulty | Asset | Roles |
|---|---|---|---|---|---|
| 1 | `gross-vs-net-absorption` | absorption | beginner | industrial | acquisitions, development |
| 2 | `lease-up-carry-vs-leasing-pace` | absorption | intermediate | office | development, mortgageUw |
| 3 | `fair-share-capture-rate` | absorption | intermediate | multifamily | development, acquisitions |
| 4 | `retail-comp-weighting` | comp-selection | intermediate | retail | acquisitions |
| 5 | `hotel-per-key-comp-set` | comp-selection | beginner | hotel | acquisitions |
| 6 | `face-vs-net-effective-rent` | lease-econ | beginner | office | assetManagement |
| 7 | `percentage-rent-breakpoint-reset` | lease-econ | advanced | retail | assetManagement, portfolioMgmt |
| 8 | `rent-miss-vs-cap-move` | sensitivity | beginner | multifamily | acquisitions, assetManagement |
| 9 | `cost-overrun-vs-noi-shortfall` | sensitivity | intermediate | mixed | development |
| 10 | `binding-constraint-rate-vs-cap` | sensitivity | advanced | industrial | mortgageUw |

---

## 1. `gross-vs-net-absorption` — "The broker says 1.2M SF was absorbed"

- [ ] *absorption · beginner · industrial · acquisitions, development*

**Scenario.** You are underwriting the lease-up of a 300,000 SF spec warehouse. The broker's market report headlines "1.2 million SF of leasing activity last year" in the submarket. Reading further, tenants also vacated 900,000 SF over the same period. No other new supply is delivering.

| | |
|---|---|
| Leasing activity (gross) | 1,200,000 SF |
| Move-outs | 900,000 SF |
| Subject (vacant spec) | 300,000 SF |
| Competing new supply | None |

**Q: What annual absorption figure should anchor your lease-up assumption?**

- ✅ **About 300,000 SF — net absorption is leasing activity minus move-outs.** 1,200,000 − 900,000 = 300,000 SF. Net is the change in occupied space, which is what actually fills vacancy. At that pace the subject alone would take the whole submarket's net demand for a year.
- ◻️ **1,200,000 SF — that is what tenants actually signed.** Gross activity counts renewals-by-relocation and churn. A tenant leaving one building for another adds to gross and adds nothing to occupied space.
- ◻️ **900,000 SF — the space coming back is the real demand indicator.** Move-outs are the subtraction, not the demand measure.
- ◻️ **2,100,000 SF — add both, since both represent tenant movement.** Double-counts churn; this is turnover, not absorption.

**Takeaway.** Gross absorption measures activity; net absorption measures demand growth. Lease-up timing is underwritten on net.

**Tips.** Always ask whether a quoted figure is gross or net. · Net absorption can be negative in an active leasing market. · Compare net absorption to deliveries, not to gross leasing.

---

## 2. `lease-up-carry-vs-leasing-pace` — "When does the interest reserve stop bleeding?"

- [ ] *absorption · intermediate · office · development, mortgageUw*

**Scenario.** A 200,000 SF office building delivers 30% pre-leased. The business plan calls stabilization at 92% and assumes 10,000 SF of new leases signed per month. Market deals carry four months of free rent from lease commencement. The lender is sizing the post-delivery interest reserve.

| | |
|---|---|
| Building size | 200,000 SF |
| Pre-leased at delivery | 30% (60,000 SF) |
| Stabilized occupancy | 92% (184,000 SF) |
| Leasing pace | 10,000 SF / month |
| Free rent | 4 months per lease |

**Q: Roughly how long after delivery until the building is collecting stabilized cash rent?**

- ✅ **About 16–17 months — ~12.4 months to sign the space, plus four months of free rent on the last leases.** (184,000 − 60,000) ÷ 10,000 = 12.4 months of leasing. The final leases do not pay cash for another four months. A reserve sized to the signing date runs dry before rent arrives.
- ◻️ **About 12 months — 124,000 SF at 10,000 SF per month.** Correct for *leased* occupancy, but leased is not paying. Reserves fund cash shortfalls.
- ◻️ **About 14 months — 140,000 SF of vacancy at 10,000 SF per month.** Solves to 100% occupancy, not the 92% target, and still ignores free rent.
- ◻️ **About 18 months — 184,000 SF at 10,000 SF per month.** Ignores the 60,000 SF already pre-leased.

**Takeaway.** Leased, occupied and paying are three different dates. Size carry to rent commencement, not lease signing.

**Tips.** Subtract pre-leasing before dividing by pace. · Add free rent (and build-out time) to the last lease signed. · Stabilization targets are rarely 100%.

---

## 3. `fair-share-capture-rate` — "Is 40 leases a month a fair share?"

- [ ] *absorption · intermediate · multifamily · development, acquisitions*

**Scenario.** A sponsor's 300-unit lease-up assumes 40 net leases per month. The submarket has been absorbing about 1,200 units per year of new product. Three competing projects totalling 900 units will be in lease-up at the same time. The subject is comparable in quality and location to its competitors.

| | |
|---|---|
| Subject | 300 units |
| Competing lease-ups | 900 units |
| Submarket absorption (new product) | 1,200 units / year |
| Sponsor pace | 40 units / month |
| Stabilization | 95% (285 units) |

**Q: How should you treat the 40-per-month assumption?**

- ✅ **Base case at ~25 per month — fair share is 25% of demand; 40 implies a 1.6× penetration the facts do not support.** 300 ÷ 1,200 units in lease-up = 25% share × 100 units/month = 25. That is ~11.4 months to 285 units versus ~7.1 at the sponsor's pace. With a comparable product, out-capturing fair share has to be bought with concessions.
- ◻️ **Accept it — 40 per month is well under the submarket's 100 per month.** Compares the subject to total demand without dividing that demand among competitors.
- ◻️ **Use 100 per month — that is the observed market pace.** Assigns the entire submarket's absorption to one project.
- ◻️ **Use 33 per month — split demand evenly across the three competitors.** Miscounts the field (there are four projects) and ignores size; fair share is proportional to units.

**Takeaway.** Fair share = your units ÷ competitive units × market absorption. Anything above it is a penetration assumption that needs a reason.

**Tips.** Count the subject in the denominator. · Penetration above 1.0× should map to a specific advantage. · Faster lease-up usually costs rent or concessions — sensitize both together.

---

## 4. `retail-comp-weighting` — "Four sales, one real comp"

- [ ] *comp-selection · intermediate · retail · acquisitions*

**Scenario.** You are pricing a 110,000 SF grocery-anchored neighborhood center. The broker's comp sheet shows four sales and an average cap rate of 6.9%.

| Comp | Cap rate | Note |
|---|---|---|
| A — grocery-anchored center, same metro | 6.25% | Closed 14 months ago |
| B — grocery-anchored center | 6.0% | Allocated price from a 12-asset portfolio sale |
| C — unanchored strip center | 7.5% | Closed 3 months ago |
| D — power center, big-box tenants | 7.9% | Closed 5 months ago |

**Q: How should you use this comp set?**

- ✅ **Anchor on Comp A with a time adjustment; treat B as soft support and C / D as bookends, not inputs.** A is the only arm's-length trade of the same product. B's price is an allocation, not a negotiated value. C and D are different risk profiles — no anchor, or big-box rollover exposure — and price wider for that reason.
- ◻️ **Use the 6.9% average — four data points are better than one.** Averaging across product types imports risk the subject does not carry.
- ◻️ **Weight C and D most heavily because they are the most recent.** Recency does not fix non-comparability; adjust the right comp for time instead.
- ◻️ **Rely on Comp B — it is the tightest grocery-anchored print.** Portfolio allocations are frequently set for tax or loan-release reasons and include a portfolio premium.

**Takeaway.** Comparability comes first, recency second. One true comp adjusted for time beats an average of four mismatched ones.

**Tips.** Ask how each price was established. · Different anchor profile means a different product. · State the time adjustment explicitly rather than swapping in a newer, worse comp.

---

## 5. `hotel-per-key-comp-set` — "Which price-per-key applies?"

- [ ] *comp-selection · beginner · hotel · acquisitions*

**Scenario.** You are valuing a 120-key select-service hotel near a suburban office park. A colleague suggests using the average of four recent sales, which works out to about $193,000 per key.

| Comp | Price / key | Type |
|---|---|---|
| A | $140,000 | Select-service, 110 keys |
| B | $155,000 | Select-service, 135 keys |
| C | $165,000 | Extended-stay, 125 keys |
| D | $310,000 | Full-service convention hotel, 300 keys |

**Q: What per-key range should anchor your value?**

- ✅ **Roughly $140,000–$155,000 — the two select-service trades; C is a cross-check and D is excluded.** Select-service hotels share the subject's revenue mix and cost structure. A full-service hotel earns F&B and group revenue on a different margin, so its per-key price says nothing about the subject. Extended-stay runs longer stays and leaner staffing — adjacent, not identical.
- ◻️ **About $193,000 — the average of all four.** One non-comparable trade lifts the average ~$45,000 per key above the relevant range.
- ◻️ **$310,000 — the most valuable hotel sets the market ceiling you should price toward.** A different business in a different chain scale.
- ◻️ **$165,000 — the highest of the limited-service comps is the best evidence of current pricing.** Picks the top of an adjacent segment without a reason to prefer it.

**Takeaway.** Per-key pricing only compares within a service level and chain scale. Check the outlier before trusting an average.

**Tips.** Match service level first, then size and location. · A simple average hides one bad comp. · Cross-check per-key against RevPAR and a cap rate on trailing NOI.

---

## 6. `face-vs-net-effective-rent` — "The higher rent is the worse deal"

- [ ] *lease-econ · beginner · office · assetManagement*

**Scenario.** Two tenants want the same suite on a 10-year term with flat rent. Your leasing broker prefers Offer A because "$40 is a great rent for the building."

| | Offer A | Offer B |
|---|---|---|
| Face rent | $40.00 / SF | $36.00 / SF |
| Free rent | 10 months | 2 months |
| TI allowance | $60 / SF | $20 / SF |
| Term | 10 years | 10 years |

**Q: Which offer is economically better for the landlord (simple, undiscounted)?**

- ✅ **Offer B — net effective rent of about $33.40 versus $30.67 for Offer A.** A: (400 − 33.33 free rent − 60 TI) ÷ 10 = $30.67. B: (360 − 6 − 20) ÷ 10 = $33.40. B also puts $40/SF less capital out on day one, so discounting widens the gap.
- ◻️ **Offer A — $4 more per SF for ten years is $40 of extra rent.** Counts the face-rent difference and ignores $67 more in concessions.
- ◻️ **They are equivalent — higher rent offsets higher concessions.** The arithmetic does not net out; B is ~$2.70/SF per year better.
- ◻️ **Offer A — a higher face rent raises the building's appraised value.** Face rent can help optics, but buyers and lenders underwrite effective economics and see the concession package.

**Takeaway.** Compare leases on net effective rent: total rent minus free rent and landlord capital, spread over the term.

**Tips.** Convert free rent to dollars per SF before comparing. · Up-front capital is worth more than rent paid later. · A high face rent with heavy concessions is a marketing number.

---

## 7. `percentage-rent-breakpoint-reset` — "Trade the overage for base rent?"

- [ ] *lease-econ · advanced · retail · assetManagement, portfolioMgmt*

**Scenario.** A restaurant tenant pays $200,000 of base rent plus 6% of sales over a natural breakpoint. Sales are running at $4.0 million. At renewal the tenant proposes raising base rent to $240,000, keeping 6% over a natural breakpoint. Your analyst objects: "We would be giving up $40,000 of percentage rent."

| | Current | Proposed |
|---|---|---|
| Base rent | $200,000 | $240,000 |
| Percentage rate | 6% | 6% |
| Natural breakpoint | $3,333,333 | $4,000,000 |
| Current sales | $4,000,000 | $4,000,000 |

**Q: How should you evaluate the proposal?**

- ✅ **Accept — total rent is unchanged at current sales, upside is identical above $4.0M, and the floor rises by $40,000.** Today: $200,000 + 6% × $666,667 = $240,000. Proposed: $240,000 + 0. Above a natural breakpoint, total rent is simply 6% of sales under either structure. Below $4.0M the landlord now keeps $240,000 where it previously slid toward $200,000. Lenders and buyers also capitalize base rent more fully than overage.
- ◻️ **Reject — the landlord loses $40,000 of percentage rent.** The overage is converted to base rent, not lost.
- ◻️ **Reject — a higher breakpoint means the landlord no longer shares in sales growth.** Above $4.0M both structures pay 6% of every sales dollar.
- ◻️ **Accept only if the percentage rate also rises to 7.2% to hold the breakpoint at $3.33M.** That would be a rent increase, not an equivalent trade; it is a negotiation ask, not a condition of indifference.

**Takeaway.** Natural breakpoint = base rent ÷ percentage rate. Raising base at a natural breakpoint converts variable rent to fixed without capping the upside.

**Tips.** Total rent above a natural breakpoint equals rate × sales. · Check whether a breakpoint is natural or artificial before modeling. · Base rent is underwritten at a tighter cap than overage.

---

## 8. `rent-miss-vs-cap-move` — "Which miss costs more?"

- [ ] *sensitivity · beginner · multifamily · acquisitions, assetManagement*

**Scenario.** An apartment deal is underwritten at $1,000,000 of NOI and a 5.0% cap rate, a $20.0 million value. Revenue is $1,666,667 and operating expenses are $666,667, assumed fixed. Your investment committee asks which downside matters more.

| | |
|---|---|
| Revenue | $1,666,667 |
| Operating expenses (fixed) | $666,667 |
| NOI | $1,000,000 |
| Cap rate | 5.0% |
| Downside 1 | Rents 5% below plan |
| Downside 2 | Cap rate 25 bps wider |

**Q: Which downside takes more off the value?**

- ✅ **The 5% rent miss — about −8.3% of value versus −4.8% for the cap move.** A 5% revenue miss is $83,333, all of which falls to NOI: $916,667 ÷ 5.0% = $18.33M. The cap move gives $1,000,000 ÷ 5.25% = $19.05M. Fixed expenses turn a 5% revenue miss into an 8.3% NOI miss.
- ◻️ **The cap rate move — cap rates always dominate value.** True for large moves; here 25 bps on a 5.0% cap is a 4.8% hit.
- ◻️ **They are equal — a 5% rent miss is a 5% value loss, and 25 bps on 5.0% is 5%.** Ignores operating leverage; the revenue miss is magnified at the NOI line.
- ◻️ **The rent miss, but only about −5% — value moves one-for-one with rent.** Right direction, wrong magnitude: value moves with NOI, not revenue.

**Takeaway.** Value sensitivity runs through NOI. With a 60% margin, each 1% of revenue is roughly 1.67% of NOI.

**Tips.** Percent change in value from a cap move ≈ −(Δcap ÷ new cap). · Operating leverage = revenue ÷ NOI. · Lower-margin assets are more rent-sensitive.

---

## 9. `cost-overrun-vs-noi-shortfall` — "Which 10% hurts the development more?"

- [ ] *sensitivity · intermediate · mixed · development*

**Scenario.** A ground-up project budgets $50.0 million of total cost and $3.5 million of stabilized NOI, a 7.0% yield on cost. Stabilized product trades at a 5.5% cap. The partners are debating where to spend diligence time: tightening the cost estimate or re-testing the rent assumptions.

| | |
|---|---|
| Total project cost | $50.0M |
| Stabilized NOI | $3.5M |
| Yield on cost | 7.0% |
| Market cap rate | 5.5% |
| Stabilized value | $63.6M |
| Development profit | $13.6M |

**Q: Which does more damage to development profit — a 10% cost overrun or a 10% NOI shortfall?**

- ✅ **The NOI shortfall — profit falls to about $7.3M versus $8.6M for the overrun.** Overrun: cost $55.0M, profit $63.6M − $55.0M = $8.6M. Shortfall: NOI $3.15M ÷ 5.5% = $57.3M, profit $7.3M. Every dollar of NOI is worth ~$18 of value at a 5.5% cap, so 10% of NOI ($6.4M of value) outweighs 10% of cost ($5.0M).
- ◻️ **The cost overrun — it is a hard-dollar loss, while NOI can recover.** NOI may recover, but the question is the size of the hit; on these numbers the shortfall is larger.
- ◻️ **They are identical — each takes 10% off the yield on cost.** Close on yield (6.36% vs 6.30%), not on dollars of profit.
- ◻️ **The cost overrun — profit falls by 10% of $50M, the NOI shortfall only by $350,000.** Compares capitalized cost to un-capitalized annual income.

**Takeaway.** When value exceeds cost, a given percentage miss on NOI costs more than the same percentage miss on budget. The wider the development spread, the more this holds.

**Tips.** Capitalize an NOI change before comparing it to a cost change. · Yield on cost hides the dollar difference. · Both misses tend to arrive together — test the combined case.

---

## 10. `binding-constraint-rate-vs-cap` — "Which move cuts proceeds more?"

- [ ] *sensitivity · advanced · industrial · mortgageUw*

**Scenario.** You are sizing a loan on a warehouse with $2.0 million of NOI. The lender tests three constraints and lends the lowest. Between quote and closing, the borrower asks which market move is the bigger threat to proceeds.

| | |
|---|---|
| NOI | $2,000,000 |
| Minimum DSCR | 1.25× (6.50% rate, 30-year amortization) |
| Maximum LTV | 65% at a 6.0% cap ($33.3M value) |
| Minimum debt yield | 9.0% |
| Move 1 | Rate +100 bps to 7.50% |
| Move 2 | Appraisal cap +50 bps to 6.5% |

**Q: Which move reduces loan proceeds more?**

- ✅ **The rate move — DSCR is the binding constraint, and proceeds fall about $2.0M versus about $1.1M for the cap move.** Today: DSCR $21.1M, LTV $21.7M, debt yield $22.2M, so DSCR governs at $21.1M. At 7.50% the DSCR loan drops to ~$19.1M. A 6.5% cap takes value to $30.8M and the LTV loan to $20.0M — LTV becomes binding, but only $1.1M below today's proceeds.
- ◻️ **The cap move — value falls about $2.6M, and proceeds follow value.** Proceeds follow the binding constraint. LTV had ~$0.6M of cushion to absorb first, and only 65% of a value change reaches the loan.
- ◻️ **Neither — the 9.0% debt yield caps the loan at $22.2M regardless.** Debt yield is the loosest of the three tests here and never binds.
- ◻️ **They are about equal — each is roughly an 8% shock to its input.** The inputs feed different constraints with different cushions; the outputs are not symmetric.

**Takeaway.** Find the binding constraint first. Sensitivities on a non-binding test do nothing until the cushion is used up.

**Tips.** Size all three tests and note the cushion between them. · DSCR-constrained loans are rate-sensitive; LTV-constrained loans are value-sensitive. · Debt yield is rate-independent — useful as a floor when rates move.
