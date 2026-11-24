# Question candidates — 2026-11-24

Ten candidate situational cases for the thinnest areas of the question bank. These are **proposals for review only** — nothing here is registered in `src/quiz/situational/index.ts` or shipped to the app.

Mark each one, then integrate the approved ones as `SituationalCase` files:

`[ ]` proposed · `[x]` approved · `[r]` rejected · `[e]` approved with edits (note them inline)

## How the areas were picked

The `question_submissions` table (where `approved` / `integrated` status lives) could not be read: the `learncre` Supabase project is paused. Coverage was measured from the shipped bank instead, on the assumption that a shipped case is an approved case.

Situational cases by category (71 total):

| Category | Shipped | Added here |
|---|---|---|
| absorption | 1 | 3 |
| comp-selection | 2 | 2 |
| lease-econ | 2 | 2 |
| sensitivity | 2 | 3 |
| diagnostic | 7 | — |
| pricing | 7 | — |
| risk | 7 | — |
| investment-thesis | 9 | — |
| document-literacy | 13 | — |
| deal-process | 21 | — |

Secondary gaps the batch also leans into:

| Dimension | Thin spot (shipped) | Candidates addressing it |
|---|---|---|
| Difficulty | beginner (4 of 71) | #2, #5, #6, #9 |
| Asset class | hotel (1), retail (2), industrial (3) | hotel #4, #8 · retail #3, #5, #7 · industrial #2, #6 |
| Role | development (9 tags) | #1, #10 |

None of the ten repeats an existing scenario. The closest neighbours are noted under each candidate.

---

## Absorption

### [ ] 1. Lease-up is running at 12 a month, not 20 — when do you stabilize?

`id: absorption-lease-up-pace-miss` · absorption · intermediate · multifamily · roles: development, assetManagement

**Scenario:** Your 240-unit multifamily development received its certificate of occupancy four months ago. The pro forma assumed 20 leases a month to a 93% stabilized occupancy. Actual leasing has averaged 12 a month, and 48 units are leased today. The construction loan's interest reserve was sized to cover the carry shortfall for 14 months after opening.

| Data | Value |
|---|---|
| Units | 240 |
| Stabilized occupancy | 93% (223 units) |
| Pro forma pace | 20 leases/month |
| Actual pace (4 months) | 12 leases/month |
| Leased today | 48 units |
| Interest reserve coverage | 14 months from opening |

**Q: If the current pace holds, what does it mean for the business plan?**

- ✅ **Stabilization slips from about month 11 to about month 19, so the interest reserve runs out roughly five months early.** 223 − 48 = 175 units left ÷ 12 a month ≈ 14.6 more months, or about 18.6 from opening, against 223 ÷ 20 ≈ 11 in the pro forma. The reserve covers 14 months, so the gap has to be funded with equity, a reserve re-balance, or a faster pace bought with concessions.
- ◻️ **Stabilization slips about four months, the same four months already lost.** Treats the miss as a one-time delay. The pace itself is 40% slower, so the shortfall compounds every month that remains.
- ◻️ **Stabilization lands near month 14, just inside the reserve.** Divides the full 223 units by a blended pace. The remaining 175 units lease at the actual pace of 12, not at an average that includes the pro forma.
- ◻️ **Nothing changes until the loan's stabilization test date.** The test date is when the lender measures. The reserve drains monthly long before that, and it is the binding constraint.

**Takeaway:** Re-forecast lease-up from units remaining ÷ actual pace, then compare the new date with whatever funds the carry. A pace miss is a liquidity problem before it is a returns problem.

**Tips:**
- Remaining units ÷ trailing pace gives the months left. Do not re-use the pro forma pace.
- Compare the new stabilization date with the interest reserve, not just the loan maturity.
- Price the concession needed to recover the pace against the cost of the extra months of carry.

*Nearest existing case: `absorption-timing` (submarket-level, not a single asset against its reserve).*

---

### [ ] 2. The broker says 2.4M SF leased last year — is demand keeping up?

`id: absorption-gross-vs-net` · absorption · beginner · industrial · roles: acquisitions, portfolioMgmt

**Scenario:** A broker's market report for an industrial submarket leads with "2.4 million SF of leasing activity last year, a record." You pull the underlying numbers. Occupied space grew from 37.2M SF to 37.6M SF over the year, while new deliveries took the inventory from 38.4M SF to 40.0M SF.

| Data | Value |
|---|---|
| Gross leasing activity | 2.4M SF |
| Occupied space, start of year | 37.2M SF |
| Occupied space, end of year | 37.6M SF |
| Inventory, start of year | 38.4M SF |
| Inventory, end of year | 40.0M SF |

**Q: What do the numbers say about supply and demand?**

- ✅ **Demand is trailing supply: net absorption was 0.4M SF against 1.6M SF delivered, and vacancy roughly doubled from 3.1% to 6.0%.** Net absorption is the change in occupied space, 37.6M − 37.2M. Vacancy went from 1.2M ÷ 38.4M to 2.4M ÷ 40.0M. Most of the 2.4M SF of leasing was renewals and tenants moving within the submarket.
- ◻️ **Demand is strong: 2.4M SF leased against 1.6M SF delivered.** Compares gross leasing with new supply. Gross activity counts renewals and relocations that add no occupied space.
- ◻️ **The market is balanced because occupied space still grew.** Positive net absorption is not balance when deliveries are four times larger.
- ◻️ **You cannot tell without rent growth data.** Rents would help, but occupied space and inventory are enough to compute net absorption and vacancy directly.

**Takeaway:** Gross leasing measures deal volume. Net absorption, the change in occupied space, measures demand, and it is the figure to set against deliveries.

**Tips:**
- Net absorption = occupied space at the end − occupied space at the start.
- Compare net absorption with deliveries, never gross leasing with deliveries.
- Recompute vacancy on the new inventory base after deliveries.

*Nearest existing case: `absorption-timing` (uses a given pace, does not test the gross/net distinction).*

---

### [ ] 3. Twelve vacant shop suites — when does the income actually stabilize?

`id: absorption-leased-vs-rent-paying` · absorption · intermediate · retail · roles: acquisitions, assetManagement

**Scenario:** You are underwriting a grocery-anchored center with 12 vacant inline suites of about 2,500 SF each. The leasing team expects to sign two leases a quarter. Each new tenant needs about four months to build out and receives three months of free rent after opening. The seller's pro forma shows stabilized shop NOI in month 18.

| Data | Value |
|---|---|
| Vacant inline suites | 12 (about 30,000 SF) |
| Leasing pace | 2 leases signed per quarter |
| Build-out period | 4 months |
| Free rent after opening | 3 months |
| Seller's stabilization date | Month 18 |

**Q: When should your model show the shop space fully rent-paying?**

- ✅ **Around month 25: the last lease is signed in month 18, then build-out and free rent add seven months.** Six quarters to sign 12 leases puts the final signing at month 18. Rent starts seven months after each signing, so at month 18 only about half the suites are paying.
- ◻️ **Month 18, matching the seller.** That is when the space is 100% leased. Leased occupancy and economic occupancy are different dates.
- ◻️ **Month 22: add the four-month build-out only.** Counts build-out but skips the free-rent period, when the tenant is open and paying nothing.
- ◻️ **Month 18, with a small credit-loss reserve for the lag.** A reserve is the wrong tool. The lag is a known timing shift that belongs in the cash flow lease by lease.

**Takeaway:** Lease-up has three clocks: signed, open, and paying. Stabilized NOI belongs on the third, and the gap between the first and third is often six to nine months for shop space.

**Tips:**
- Model rent commencement lease by lease, not as one occupancy percentage.
- Free rent and build-out both delay cash. Add them together.
- Ask for the leased, occupied and economic occupancy figures separately.

*Nearest existing case: `trended-vs-inplace-leaseup` (which NOI to cap, not the timing of rent commencement).*

---

## Comp selection

### [ ] 4. Four hotel sales, one average — what is the subject worth per key?

`id: comp-selection-hotel-per-key` · comp-selection · intermediate · hotel · roles: acquisitions

**Scenario:** You are pricing a 140-key select-service hotel that has a brand-mandated renovation (PIP) of $18,000 per key due at sale. The broker supports the asking price with the average of four recent sales, about $169,000 per key.

| Data | Value |
|---|---|
| Subject | 140 keys, select-service, $18K/key PIP due |
| Comp A | Select-service, renovated, $165K/key |
| Comp B | Select-service, renovated, $150K/key |
| Comp C | Full-service, 300 keys with meeting space, $240K/key |
| Comp D | Select-service, sold with $25K/key PIP outstanding, $120K/key |
| Broker's average | $168.75K/key |

**Q: How should you use the comp set?**

- ✅ **Drop C, put the others on a renovated basis ($145–165K), then deduct the subject's $18K PIP for a range near $127–147K per key.** C is a different product. D's all-in cost is $120K + $25K = $145K. Around $140K per key, the subject is roughly $19.6M against $23.6M at the broker's average.
- ◻️ **Use the four-comp average: more data points make a better estimate.** A full-service hotel with meeting space lifts the average by about $24K per key and tells you nothing about a select-service asset.
- ◻️ **Use Comp D only, since it is the one sold with a PIP outstanding.** D is useful, but one sale is thin, and its PIP is larger than the subject's. Normalize it, do not rely on it alone.
- ◻️ **Drop C and average A, B and D at $145K per key.** Mixes renovated and unrenovated prices without adjusting either, and still ignores the subject's own PIP.

**Takeaway:** Per-key comps only compare when the product type matches and the price is stated on the same renovation basis. Put every comp on an all-in basis, then deduct the subject's own capital need.

**Tips:**
- Screen comps by chain scale and service level before looking at price.
- All-in basis = price + capital the buyer still has to spend.
- A broker's average is only as good as its weakest comp.

*Nearest existing cases: `comp-set-vetting` (industrial cap-rate comps), `hotel-revpar-divergence` (operations, not pricing).*

---

### [ ] 5. Which rent comps price a 2,000 SF shop space?

`id: comp-selection-inline-rent-comps` · comp-selection · beginner · retail · roles: acquisitions, assetManagement

**Scenario:** You need a market rent for a vacant 2,000 SF inline suite in a grocery-anchored center. The leasing broker sends five recent leases from the trade area.

| Data | Value |
|---|---|
| Comp 1 | 45,000 SF grocery anchor, $14/SF NNN |
| Comp 2 | 1,800 SF inline, grocery-anchored center, $34/SF NNN |
| Comp 3 | 2,400 SF inline, grocery-anchored center, $36/SF NNN |
| Comp 4 | Drive-through pad on an outparcel, $55/SF NNN |
| Comp 5 | 2,000 SF inline, unanchored strip, $26/SF NNN |

**Q: Which comps should set the market rent?**

- ✅ **Comps 2 and 3, for a market rent of about $34–36/SF, with Comp 5 as a floor.** They match on size, position in the center and anchor type. The unanchored strip shows what the same suite earns without grocery traffic.
- ◻️ **All five averaged, about $33/SF.** Lands near the right number by accident. Anchors pay low rent because they drive traffic, and pads pay high rent for visibility and a drive-through.
- ◻️ **Comp 4, because it is the most recent high-water mark.** An outparcel pad is a different product with different economics.
- ◻️ **Comp 1, because the grocer is the most creditworthy tenant.** Credit affects cap rates. It does not make a 45,000 SF anchor rent comparable to a 2,000 SF shop.

**Takeaway:** Retail rent depends on where the space sits in the center. Compare inline with inline, anchor with anchor and pad with pad.

**Tips:**
- Match size, position and anchor type before averaging anything.
- Anchor rents are low on purpose. Never blend them into shop rent.
- Check that every comp is quoted on the same expense basis (NNN or gross).

*Nearest existing case: `comp-set-vetting` (sale comps, not rent comps).*

---

## Lease economics

### [ ] 6. Higher face rent or lower concessions — which lease pays more?

`id: lease-econ-net-effective-rent` · lease-econ · beginner · industrial · roles: assetManagement, acquisitions

**Scenario:** Two tenants want the same warehouse bay on five-year leases with flat rent. Tenant A offers $9.50/SF but wants five months of free rent and $6.00/SF in tenant improvements. Tenant B offers $8.75/SF with one month free and $2.00/SF in improvements. Ignore commissions and discounting.

| Data | Tenant A | Tenant B |
|---|---|---|
| Face rent | $9.50/SF | $8.75/SF |
| Term | 5 years, flat | 5 years, flat |
| Free rent | 5 months | 1 month |
| Tenant improvements | $6.00/SF | $2.00/SF |

**Q: Which proposal gives the landlord the higher net effective rent?**

- ✅ **Tenant B, at about $8.20/SF against about $7.51/SF for Tenant A.** A: $47.50 of rent − $3.96 free − $6.00 TI = $37.54 over five years. B: $43.75 − $0.73 − $2.00 = $41.02. B is about 9% higher despite the lower face rent.
- ◻️ **Tenant A, because $9.50 beats $8.75 every year of the term.** Face rent ignores $9.96/SF of concessions that the landlord pays for up front.
- ◻️ **Tenant A, because a higher face rent raises the sale value.** A real consideration if you sell mid-term, but buyers and lenders look at concessions too, and the question asks about net effective rent.
- ◻️ **They are about equal once concessions are netted.** The gap is about $0.69/SF a year, or roughly $3.50/SF over the term.

**Takeaway:** Net effective rent = (total rent − free rent − landlord costs) ÷ term. Compare proposals on that basis first, then decide whether face rent matters for your exit.

**Tips:**
- Convert free rent to dollars: months free ÷ 12 × face rent.
- Spread every landlord cost across the term before comparing.
- A front-loaded concession costs more than the simple average shows once you discount.

*Nearest existing case: `ti-vs-rent-giveback` (one tenant, TI against a rent cut, not two competing proposals).*

---

### [ ] 7. Renew at $27 or hold out for $30?

`id: lease-econ-renewal-vs-new-tenant` · lease-econ · intermediate · retail · roles: assetManagement

**Scenario:** A 10,000 SF junior-anchor tenant's lease expires in six months. They will renew for five years at $27/SF with $5/SF in improvements. Your leasing broker believes a new tenant would pay $30/SF, but expects nine months of downtime, three months of free rent, $35/SF in improvements and an $8/SF commission. The renewal commission is $2/SF.

| Data | Renewal | New tenant |
|---|---|---|
| Rent | $27/SF | $30/SF |
| Downtime | None | 9 months |
| Free rent | None | 3 months |
| Tenant improvements | $5/SF | $35/SF |
| Leasing commission | $2/SF | $8/SF |

**Q: Over the five years after expiry, which path produces more cash?**

- ✅ **The renewal, by about $51/SF or roughly $510,000.** Renewal: $135 of rent − $7 of costs = $128/SF. New tenant: 48 paying months at $2.50 = $120, less $43 of costs = $77/SF. The new tenant would need about $42.75/SF to break even.
- ◻️ **The new tenant: $3/SF more for five years is $150,000.** Counts the rent premium and none of the downtime, free rent or re-leasing costs.
- ◻️ **The new tenant, because the higher rent raises the value at sale.** $3/SF at a 7% cap is about $43/SF of value, still less than the $51/SF of cash given up, and it assumes the broker's rent is achieved.
- ◻️ **About even once the costs are included.** The costs are not close: $43/SF against $7/SF, plus a year without rent.

**Takeaway:** A renewal's advantage is the cost it avoids. Compare paths on cash over the same window, and solve for the new-tenant rent that breaks even.

**Tips:**
- Downtime and free rent are both months without rent. Add them.
- Compare over the same window, starting at the expiry date.
- The breakeven rent shows how much you are betting on the broker's opinion.

*Nearest existing cases: `ti-vs-rent-giveback`, `rollover-concentration` (hold-or-sell framing, no renewal math).*

---

## Sensitivity

### [ ] 8. Hotel revenue drops 10% — how far does NOI fall?

`id: sensitivity-hotel-operating-leverage` · sensitivity · intermediate · hotel · roles: acquisitions, mortgageUw, assetManagement

**Scenario:** A select-service hotel earns $10.0M of revenue and $3.0M of NOI. Of its $7.0M in operating expenses, $4.2M is fixed and $2.8M varies with revenue. Annual debt service is $2.0M. You are stress-testing a 10% revenue decline.

| Data | Value |
|---|---|
| Revenue | $10.0M |
| Fixed expenses | $4.2M |
| Variable expenses | $2.8M (28% of revenue) |
| NOI | $3.0M |
| Debt service | $2.0M (1.50x DSCR) |

**Q: What does a 10% revenue decline do to NOI and coverage?**

- ✅ **NOI falls about 24% to $2.28M, and DSCR drops from 1.50x to 1.14x.** Revenue of $9.0M less $2.52M variable and $4.2M fixed leaves $2.28M. About 72 cents of each lost revenue dollar reaches NOI, so the NOI decline is 2.4 times the revenue decline.
- ◻️ **NOI falls 10% to $2.7M, in line with revenue.** Assumes every expense flexes with revenue. Sixty percent of the cost base is fixed.
- ◻️ **NOI falls about 33% to $2.0M, since the full $1.0M comes off the bottom line.** Assumes no expense flexes. Variable costs fall by $280,000.
- ◻️ **NOI holds near $3.0M because management can cut costs to protect the margin.** Fixed costs are fixed over the stress horizon. Only the variable 28% moves.

**Takeaway:** Operating leverage multiplies revenue shocks: NOI change ≈ revenue change × (1 − variable cost ratio) ÷ NOI margin. Hotels carry high fixed costs and no leases, so small top-line moves produce large coverage moves.

**Tips:**
- Flow-through = 1 − variable cost ratio. Here it is 72%.
- A rate-driven decline flows through harder than an occupancy-driven one.
- Stress DSCR on NOI after the shock, not on the revenue percentage.

*Nearest existing case: `hotel-revpar-divergence` (diagnosing share loss, no expense flow-through).*

---

### [ ] 9. Same 50 bps exit cap move — which deal gets hurt more?

`id: sensitivity-cap-move-low-vs-high-cap` · sensitivity · beginner · mixed · roles: acquisitions, portfolioMgmt

**Scenario:** You are comparing two deals that each produce $1.2M of NOI in the exit year. Deal A is an industrial building you underwrote to a 5.0% exit cap. Deal B is a hotel underwritten to an 8.0% exit cap. Your investment committee asks what happens to each if exit caps come in 50 bps wider.

| Data | Deal A | Deal B |
|---|---|---|
| Exit-year NOI | $1.2M | $1.2M |
| Base exit cap | 5.0% | 8.0% |
| Stressed exit cap | 5.5% | 8.5% |

**Q: Which deal loses more value, and why?**

- ✅ **Deal A loses about 9.1% of its value against about 5.9% for Deal B.** A: $24.0M falls to $21.8M. B: $15.0M falls to $14.1M. The same 50 bps is a tenth of a 5.0% cap and a sixteenth of an 8.0% cap.
- ◻️ **They lose the same, since the cap move and the NOI are identical.** Value is NOI ÷ cap rate, so the percentage change depends on the starting cap, not the basis-point move alone.
- ◻️ **Deal B, because hotels are riskier.** Hotel cash flow is more volatile, but this question is about cap-rate arithmetic, where the lower cap is more exposed.
- ◻️ **Deal B, because it starts from the higher cap rate.** Backwards. A higher starting cap makes a given basis-point move proportionally smaller.

**Takeaway:** Value change ≈ −(cap move ÷ new cap). Low-cap assets are the most sensitive to a given basis-point move, and leverage multiplies the hit to equity.

**Tips:**
- Quick check: 50 bps on a 5.0% cap is about −9%, on an 8.0% cap about −6%.
- Size exit-cap stress in proportion to the cap rate, not as a flat number of bps.
- With 60% leverage, a 9% value drop is roughly a 23% equity drop.

*Nearest existing cases: `going-in-vs-exit-cap-spread`, `exit-cap-conservatism` (defending the spread, not the arithmetic of sensitivity).*

---

### [ ] 10. Costs up 10%, rents down 10%, or caps out 50 bps — which hurts most?

`id: sensitivity-development-margin-shocks` · sensitivity · advanced · multifamily · roles: development, acquisitions

**Scenario:** Your multifamily development has a $50.0M total cost and a stabilized pro forma of $5.0M revenue, $1.75M operating expenses and $3.25M NOI. At a 5.25% market cap rate the finished project is worth $61.9M, an $11.9M profit. The committee wants to know which single downside does the most damage: a 10% cost overrun, rents 10% below pro forma, or a 50 bps wider exit cap. Assume operating expenses do not change with rents.

| Data | Value |
|---|---|
| Total cost | $50.0M |
| Stabilized revenue | $5.0M |
| Operating expenses | $1.75M (fixed) |
| Stabilized NOI | $3.25M (6.5% yield on cost) |
| Market cap rate | 5.25% |
| Base value and profit | $61.9M and $11.9M |

**Q: Which shock removes the most profit?**

- ✅ **The rent miss: profit falls about 80% to $2.4M.** Revenue of $4.5M leaves $2.75M NOI, a 15% drop, worth $52.4M. The cost overrun leaves $6.9M of profit and the cap move leaves $6.5M, each a loss of about 42–45%.
- ◻️ **The cost overrun, because it is the only shock that is a certain cash outlay.** It costs $5.0M of profit. The rent miss costs $9.5M because the lost NOI is capitalized.
- ◻️ **The cap rate move, because value is most sensitive to the cap rate.** 50 bps takes $5.4M off the value. Close to the cost overrun, well short of the rent miss.
- ◻️ **All three are about equal, since each is a roughly 10% shock.** A 10% cost shock hits profit one for one. A 10% rent shock is geared by fixed expenses and then by the cap rate.

**Takeaway:** Development profit is a thin margin on two large numbers. Rent shocks are geared twice, once through fixed operating expenses and again through the cap rate, so they usually outweigh a same-sized cost shock.

**Tips:**
- Value lost from a rent miss = lost NOI ÷ cap rate. Here $0.5M ÷ 5.25% ≈ $9.5M.
- Express each shock in dollars of profit, not percentage of the input.
- Yield-on-cost spread falls from 125 bps to about 25 bps in the rent case.

*Nearest existing cases: `construction-cost-overrun` (who funds it), `dev-ltc-vs-ltv` (loan sizing).*

---

## Integration notes

- Each candidate maps onto `SituationalCase` in `src/types/situational.ts`. The bullet after each ◻️ / ✅ is the option's `explanation`.
- Options are shuffled at run time, so no option text refers to its position.
- After adding files, register them in `src/quiz/situational/index.ts` and regenerate the review sheet with `npx vitest run src/test/extractQuestions.test.ts`.
