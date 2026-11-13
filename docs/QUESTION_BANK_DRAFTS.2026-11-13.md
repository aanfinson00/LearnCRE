<!-- generated 2026-11-13 by the scheduled question-bank routine -->
<!-- project: LearnCRE @ c5d74bb -->

# Question bank — coverage gaps + 10 draft phrasings (2026-11-13)

## How "approved" was measured

The community-submission ledger (`question_submissions.status = 'approved'`) lives in
the `learncre` Supabase project, which is **paused (INACTIVE)** today, so it could not
be queried. The approved bank was therefore taken to be the content that has actually
shipped into the app: the 71 situational cases in `src/quiz/situational/` and the 69
quiz templates in `src/quiz/templates/`. Re-run the audit against Supabase once the
project is restored.

## Coverage audit (shipped situational cases)

| Axis | Well covered | Thin |
|------|--------------|------|
| Category | deal-process 21 · document-literacy 13 · investment-thesis 9 | **absorption 1 · lease-econ 2 · sensitivity 2 · comp-selection 2** |
| Role | acquisitions 40 · assetManagement 31 · portfolioMgmt 25 · mortgageUw 19 | **development 9** (templates: 10 of 122 role tags) |
| Difficulty | advanced 34 · intermediate 33 | **beginner 4** |
| Asset class | multifamily 11 · office 9 · mixed 8 · untagged 37 | **hotel 1 · retail 2 · industrial 3** |

Every draft below hits at least two thin cells. Tag mix across the 10:
absorption ×3, lease-econ ×3, sensitivity ×2, comp-selection ×2 · development ×4 ·
beginner ×4 · hotel ×2, retail ×2, industrial ×2.

Each draft is in `SituationalCase` shape (one `isBest`, 4 options, takeaway, 3 tips) so
an approved one can be dropped into `src/quiz/situational/<id>.ts` and registered in
`index.ts`. Numbers were hand-checked; re-verify before shipping.

Status legend: `[ ]` queued · `[x]` approved · `[r]` rejected

---

## [ ] 1. When does this spec building stabilize?
*Situational · absorption · intermediate · industrial · development/mortgageUw*
`id: 'spec-industrial-lease-up'`

**Scenario.** Your 400,000 SF spec cross-dock warehouse delivered this quarter with no
pre-leasing. The submarket has 30M SF of inventory at 6.5% vacancy and trailing
four-quarter net absorption of 1.8M SF. Another 2.4M SF is under construction and
delivers over the next 12 months, 25% pre-leased. The construction loan converts to a
mini-perm only at 80% leased, and matures in 24 months. Your pro forma assumed a
12-month lease-up.

| | |
|---|---|
| Subject | 400,000 SF, 0% leased |
| Submarket inventory / vacancy | 30M SF / 6.5% |
| Trailing net absorption | 1.8M SF/yr |
| Competing pipeline (12 mo) | 2.4M SF, 25% pre-leased |
| Conversion test / maturity | 80% leased / 24 months |
| Pro forma lease-up | 12 months |

**Q: How should you treat the 12-month lease-up assumption?**

- ✅ **A.** It is aggressive. Vacant space today (1.95M SF) plus unleased pipeline (1.8M SF) is ~3.75M SF competing for ~1.8M SF of annual demand. A fair-share capture (~10%) is ~180k SF/yr, so 80% leased lands closer to 20–22 months. The maturity, not the pro forma, is the binding constraint: stress lease-up to 18–24 months and line up the extension now.
  - 30M × 6.5% = 1.95M SF vacant; 2.4M × 75% = 1.8M SF unleased pipeline. Your 400k is ~10% of the space chasing 1.8M SF/yr of absorption. Hitting 12 months requires capturing double your fair share. Possible with a best-in-class building and aggressive concessions, but not a base case.
- ◻️ **B.** It is fine. Annual absorption of 1.8M SF is 4.5× your building, so demand swamps supply.
  - Compares your building to total demand while ignoring the other 3.75M SF competing for the same tenants. Demand is shared, not yours alone.
- ◻️ **C.** It is conservative. At 6.5% the submarket is tight, so a new Class-A building leases quickly.
  - Today's vacancy is backward-looking. Adding 2.4M SF of deliveries against 1.8M SF of absorption pushes vacancy toward ~8% over the next year, and the new deliveries are your direct competitors.
- ◻️ **D.** It is fine because 25% of the pipeline is already pre-leased, which proves demand is strong.
  - Pre-leased space is spoken for; it does nothing for your building. The 75% that is *not* pre-leased is exactly the space you compete against.

**Takeaway:** Lease-up speed for spec product is a fair-share problem: your share of annual absorption against all vacant and unleased competing space, not your SF against total demand. Underwrite the lease-up to the loan maturity, not the other way around.

- Competing supply = existing vacancy + unleased pipeline inside your lease-up window.
- Fair share ≈ your SF ÷ competing supply; multiply by annual absorption for a pace.
- If the pro forma needs 2× fair share, say so explicitly and show what concessions buy it.

---

## [ ] 2. How long until the inline space fills?
*Situational · absorption · beginner · retail · acquisitions*
`id: 'retail-inline-absorption'`

**Scenario.** You are underwriting a 120,000 SF grocery-anchored center. The 45,000 SF
grocer is in place on a long lease. The 75,000 SF of inline space is 80% leased, with
15,000 SF vacant across six small suites. Your leasing broker says the center has
historically signed about 2,500 SF of new inline deals per quarter. The seller's OM
underwrites inline stabilization at 95% within six months.

| | |
|---|---|
| Inline GLA | 75,000 SF |
| Inline leased / vacant | 60,000 SF (80%) / 15,000 SF |
| Historical inline absorption | ~2,500 SF/quarter |
| OM stabilization target | 95% inline in 6 months |

**Q: Roughly how long should you underwrite to reach 95% inline occupancy?**

- ✅ **A.** About 13–14 months. 95% of 75,000 is 71,250 SF leased, so you need 11,250 SF more; at 2,500 SF/quarter that is 4.5 quarters. The six-month OM case requires doubling the historical pace, so carry the extra downtime and TI in your model.
  - (71,250 − 60,000) ÷ 2,500 = 4.5 quarters ≈ 13.5 months. Also sanity-check the deal count: six vacant suites at ~2,500 SF each is roughly five separate leases, and small-shop deals take their own time.
- ◻️ **B.** Six months is reasonable. The submarket is healthy and grocery-anchored centers lease fast.
  - Anchored centers do lease better than unanchored ones, but this center's own history is 2,500 SF/quarter. You need evidence of a step-change in velocity, not a category generalization.
- ◻️ **C.** About 18 months: 15,000 SF ÷ 2,500 SF/quarter = 6 quarters.
  - That is the time to 100%, not 95%. The 95% target leaves ~3,750 SF structurally vacant, so you only need to absorb 11,250 SF.
- ◻️ **D.** The timing barely matters because the anchor drives the value of the center.
  - The anchor drives traffic and the cap rate, but inline rent is usually the majority of the center's NOI per SF. A year of 20% inline vacancy is real lost income and real TI.

**Takeaway:** Stabilization time = (target leased − current leased) ÷ observed pace. Use the property's own leasing history, and compute to the target occupancy, not to 100%.

- Target SF = GLA × target occupancy; subtract what is already leased.
- Count the deals, not just the SF: five small suites take longer than one 11,000 SF deal.
- When an OM pace is 2× history, model the slower case and price the difference.

---

## [ ] 3. Which renewal proposal is actually richer?
*Situational · lease-econ · beginner · office · assetManagement*
`id: 'ner-two-proposals'`

**Scenario.** A 10,000 SF office tenant's broker sends two five-year proposals. You need to
tell your asset manager which one is worth more to the landlord. Assume flat rent for
simplicity.

| | |
|---|---|
| Proposal 1 | $30.00/SF face · 3 months free · $20/SF TI |
| Proposal 2 | $27.00/SF face · no free rent · $5/SF TI |
| Term | 5 years (60 months) |
| Size | 10,000 SF |

**Q: Which proposal has the higher net effective rent, and by how much?**

- ✅ **A.** Proposal 2, by about $1.50/SF per year. Proposal 1 nets $24.50/SF after free rent and TI; Proposal 2 nets $26.00/SF. On 10,000 SF that is ~$15,000/yr, ~$75,000 over the term.
  - P1: $30 × 5 = $150 gross, less $7.50 free rent (3 ÷ 12 × $30), less $20 TI = $122.50 ÷ 5 = $24.50/SF/yr. P2: $27 × 5 = $135, less $5 TI = $130 ÷ 5 = $26.00/SF/yr.
- ◻️ **B.** Proposal 1, because the face rent is higher and that is what gets capitalized.
  - Cap rates apply to NOI, and free rent and TI are real cash out the door. A higher face rent with heavy concessions can easily net less than a lower clean rent.
- ◻️ **C.** They are equivalent, since free rent and TI are one-time items that wash out over five years.
  - They are one-time, but they do not wash out; they are spread across the term, which is exactly what net effective rent measures. Here they swing the answer by $1.50/SF/yr.
- ◻️ **D.** Proposal 1, because a $30 face rent sets a better comp for the building's other suites.
  - A legitimate secondary consideration, but it does not change which deal has more cash. If you want the higher face for comp optics, do it knowing it costs ~$15,000/yr.

**Takeaway:** Compare leases on net effective rent: total rent net of free rent and TI, divided by the term. Face rent is a headline, not an economic answer.

- NER = (face × term − free rent − TI − LC) ÷ term.
- Three months free on a five-year deal is 5% of the rent stream.
- Convert $/SF differences to dollars on the suite so the trade-off is concrete.

---

## [ ] 4. What should a year-5 kick-out cost the tenant?
*Situational · lease-econ · intermediate · retail · development/assetManagement*
`id: 'termination-fee-sizing'`

**Scenario.** A junior anchor is pre-leasing 20,000 SF in your mixed-use development on a
10-year NNN lease at $28/SF. You are funding $60/SF of TI and a 6% leasing commission
on the full term. The tenant now wants a one-time right to terminate at the end of year
5 and proposes a termination fee of six months' rent.

| | |
|---|---|
| Rent | $28/SF NNN, 10-year term |
| TI | $60/SF |
| Leasing commission | 6% of total rent ≈ $16.80/SF |
| Proposed fee | 6 months' rent = $14/SF |
| Expected re-leasing downtime | ~9 months |

**Q: How should you size the termination fee?**

- ✅ **A.** Counter at roughly unamortized TI and commissions plus expected downtime: about $38/SF of unamortized costs plus ~$21/SF of lost rent, so ~$55–60/SF, or about two years of rent. Six months does not even cover half of the unamortized TI/LC.
  - TI + LC = $76.80/SF; half remains at year 5 on a straight-line basis = $38.40/SF (more with interest). Nine months of downtime = $21/SF. The fee's job is to make you whole on sunk costs and downtime, not to punish.
- ◻️ **B.** Accept six months. It is a common market quote and the tenant's pre-lease is what gets the project financed.
  - The pre-lease matters, which is why you negotiate rather than refuse. But $14/SF against ~$59/SF of exposure is a $900,000 gift on 20,000 SF.
- ◻️ **C.** Refuse any termination right. A development pro forma cannot carry a 5-year kick-out.
  - Doctrinally safe, pragmatically expensive: losing the anchor can stall the construction loan. A properly priced option is a normal landing zone.
- ◻️ **D.** Set the fee at all remaining rent: 5 years × $28 = $140/SF.
  - No tenant signs that, and it overstates the harm. You would re-lease the space; the real loss is sunk costs plus downtime, not five years of rent.

**Takeaway:** Price a termination option at unamortized TI and commissions plus expected downtime. A "months of rent" quote is only reasonable if it covers that number. Also flag it to the lender: a year-5 kick-out shortens WALT for perm sizing.

- Unamortized cost at the option date ≈ (TI + LC) × remaining term ÷ total term, plus interest.
- Add downtime rent and, if realistic, a share of replacement TI.
- Convert the fee to months of rent so both sides can compare it to "market".

---

## [ ] 5. How far can RevPAR fall before the hotel loan trips?
*Situational · sensitivity · intermediate · hotel · mortgageUw*
`id: 'hotel-revpar-dscr-cushion'`

**Scenario.** You are sizing a $35M loan on a 200-key select-service hotel. Total revenue
is $9.0M and NOI is $3.3M. The loan constant is 7.6%, so debt service is $2.66M and
DSCR is 1.24×. The covenant is 1.20×. Hotels have high fixed costs: in a downturn,
roughly 70% of each lost revenue dollar falls straight to NOI.

| | |
|---|---|
| Revenue / NOI | $9.0M / $3.3M |
| Loan / constant / debt service | $35M / 7.6% / $2.66M |
| DSCR / covenant | 1.24× / 1.20× |
| Flow-through on lost revenue | ~70% |

**Q: Roughly how much can RevPAR decline before DSCR breaches 1.20×?**

- ✅ **A.** Under 2%. The NOI floor is $3.19M, a cushion of ~$108k (3.3% of NOI). Each 1% of revenue is $90k, of which ~$63k hits NOI, so the cushion is gone after ~1.7% of RevPAR decline. The 1.24× is cosmetic: size to a stressed RevPAR or require a cash-flow sweep.
  - 1.20 × $2.66M = $3.19M floor. $108k ÷ $63k ≈ 1.7%. A 10% RevPAR drop takes ~$630k out of NOI and DSCR to ~1.00×.
- ◻️ **B.** About 3.3%, the same as the NOI cushion.
  - Treats NOI as moving 1:1 with revenue in percentage terms. With 70% flow-through and a 37% margin, NOI moves ~1.9% for every 1% of revenue.
- ◻️ **C.** About 9%. Only 37 cents of each revenue dollar is NOI, so NOI is insulated.
  - Backwards. A low margin means NOI is a thin slice, so the same dollar loss is a bigger *percentage* of NOI. Margin amplifies NOI volatility; it does not dampen it.
- ◻️ **D.** RevPAR is irrelevant to the covenant until occupancy falls below ~60%.
  - There is no such threshold. Fixed costs mean every lost room-night reduces NOI, and the covenant tests NOI against debt service each period.

**Takeaway:** Hotel NOI is levered to revenue through fixed costs. Translate a DSCR cushion into a revenue cushion by dividing by (flow-through × revenue ÷ NOI); on a typical hotel that shrinks a 3% NOI cushion to under 2% of RevPAR.

- NOI % change ≈ revenue % change × flow-through × (revenue ÷ NOI).
- Hotel DSCR of 1.20–1.25× is thin; stabilized multifamily at the same number is not.
- Stress RevPAR −10% to −15% and show the DSCR; that is the number the credit committee needs.

---

## [ ] 6. Which 5% miss hurts the development the most?
*Situational · sensitivity · advanced · multifamily · development/portfolioMgmt*
`id: 'dev-yoc-shock-ranking'`

**Scenario.** A 250-unit development costs $60M, of which $42M is hard cost. Stabilized
revenue is $7.0M and OpEx $2.8M, so NOI is $4.2M and yield on cost is 7.0%. Exit cap is
5.5%, giving a value of ~$76.4M and a profit of ~$16.4M. The investment committee asks
which single shock does the most damage: rents 5% below pro forma, hard costs 5% over,
or exit cap 25 bps wider.

| | |
|---|---|
| Total / hard cost | $60M / $42M |
| Revenue / OpEx / NOI | $7.0M / $2.8M / $4.2M |
| YOC / exit cap | 7.0% / 5.5% |
| Base value / profit | $76.4M / $16.4M |

**Q: Rank the three shocks by lost profit.**

- ✅ **A.** Rents −5% (≈ −$6.4M) > exit cap +25 bps (≈ −$3.3M) > hard cost +5% (≈ −$2.1M). The rent miss is amplified twice: fixed OpEx turns −5% revenue into −8.3% NOI, and the 18× exit multiple turns that into −$6.4M of value.
  - Rents: NOI falls $350k to $3.85M; ÷ 5.5% = $70.0M; profit $10.0M. Exit cap: $4.2M ÷ 5.75% = $73.0M; profit $13.0M. Hard cost: +$2.1M of cost; profit $14.3M. YOC under the rent miss drops to 6.4%, shrinking the development spread from 150 bps to ~90.
- ◻️ **B.** Hard cost +5%, because it is $2.1M of real cash today while the others are paper value.
  - Profit is profit at exit. The rent miss costs three times as much, and it is just as real to the buyer who caps your NOI.
- ◻️ **C.** All three are roughly equal, about 5% of profit each.
  - A 5% input shock is not a 5% profit shock. Operating leverage and the cap multiple make the rent shock ~40% of profit; hard cost is ~13%.
- ◻️ **D.** Exit cap, because cap rates are always the biggest driver of value.
  - Often true, and at +50 bps it would tie the rent shock here. At +25 bps it ranks second. Compute each shock rather than reciting a rule.

**Takeaway:** In a development, revenue misses are the most expensive input error because they pass through fixed OpEx and then through the exit multiple. Cost overruns are 1:1. Rank shocks by dollars of profit, not by the headline percentage.

- Rent shock → NOI shock multiplier ≈ revenue ÷ NOI (here 1.67×).
- NOI shock → value shock multiplier = 1 ÷ exit cap (here ~18×).
- Report every sensitivity as dollars of profit and bps of development spread.

---

## [ ] 7. Which per-key comps actually apply to this hotel?
*Situational · comp-selection · intermediate · hotel · acquisitions*
`id: 'hotel-per-key-comp-set'`

**Scenario.** You are pricing a 150-key, 2015-vintage, upper-midscale select-service hotel
in a suburban submarket. Trailing RevPAR is $105. The broker provides five sales.

| | |
|---|---|
| Comp 1 | 140-key select-service, same submarket, 2014, RevPAR $100, 5 mos ago — $165k/key |
| Comp 2 | 250-key full-service, downtown, 15k SF meeting space, RevPAR $150 — $290k/key |
| Comp 3 | 120-key economy exterior-corridor, same submarket, RevPAR $55 — $70k/key |
| Comp 4 | 160-key select-service, adjacent submarket, 2017, RevPAR $112, 9 mos ago — $180k/key, buyer assumed a $25k/key PIP |
| Comp 5 | 150-key select-service, same brand, allocated price from a 3-hotel portfolio sale — $150k/key |

**Q: How should you build the comp set?**

- ✅ **A.** Anchor on Comps 1 and 4. Gross Comp 4 up to its all-in basis (~$205k/key) and scale both to the subject's RevPAR: Comp 1 implies ~$173k/key, Comp 4 ~$192k/key, a range of ~$170–195k. Discard Comps 2 and 3 as different segments and treat Comp 5 as a data point only.
  - Within a segment, price per key tracks RevPAR. Comp 1 trades at ~1,650× RevPAR; Comp 4 all-in at ~1,830×. Applying those to $105 gives $173k–$192k. Comp 5's allocation was set by the seller, not the market.
- ◻️ **B.** Average all five (~$171k/key); that lands inside the defensible range anyway.
  - It lands there by accident: the full-service and economy outliers happen to offset. A number you cannot bridge from observed trade to subject is not a comp, even when it is close.
- ◻️ **C.** Use Comp 4 at $180k/key as the primary comp; it is the newest and the closest RevPAR.
  - The buyer's true basis was $205k/key after the PIP. Ignoring the required capital understates what that buyer actually paid for the hotel's earning power.
- ◻️ **D.** Use Comp 5; same brand and same key count is as close as it gets.
  - Portfolio allocations are negotiated for tax, loan and reporting reasons and routinely misstate individual asset values. Same flag does not make it an arm's-length single-asset price.

**Takeaway:** Hotel comps need to be in the same chain scale, adjusted to all-in basis including PIP, and scaled to RevPAR. A price-per-key number without those three steps is not comparable, even when the arithmetic lands close.

- Price per key ÷ RevPAR gives a segment multiple; apply it to the subject's RevPAR.
- Always add assumed PIP to the comp's purchase price.
- Portfolio allocations and different chain scales are discards, not adjustments.

---

## [ ] 8. Which comps should the appraiser have thrown out?
*Situational · comp-selection · beginner · multifamily · mortgageUw*
`id: 'appraisal-comp-review'`

**Scenario.** You are the lender on a 120-unit, 1990s-vintage garden-style apartment
deal. The appraisal averages five sales to ~$168k/unit and concludes $165k/unit
($19.8M). The sponsor has requested 65% LTV, about $12.9M.

| | |
|---|---|
| Comp 1 | 110 units, 1988, same submarket, 3 mos ago — $145k/unit, 5.6% cap |
| Comp 2 | 300 units, 2021 vintage, same submarket — $265k/unit, 4.9% cap |
| Comp 3 | 96 units, 1995, same submarket, 7 mos ago — $150k/unit; seller carried 80% financing at 4% when market debt was 6.5% |
| Comp 4 | 130 units, 1992, same submarket, 2 mos ago — $138k/unit, 5.8% cap; lender REO sale |
| Comp 5 | 125 units, 1991, adjacent submarket, 4 mos ago — $142k/unit, 5.7% cap |

**Q: How should you respond to the appraisal?**

- ✅ **A.** Push back before sizing. Comp 2 is a different vintage and quality and alone lifts the average by ~$25k/unit; Comp 3 needs a cash-equivalency adjustment down; Comp 4 is a distressed sale that needs an upward adjustment or a discard. Comps 1 and 5 support ~$142–148k/unit, or ~$17.5M, which puts 65% LTV near $11.4M, about $1.5M less.
  - (145 + 265 + 150 + 138 + 142) ÷ 5 = $168k; drop Comp 2 and the remaining four average ~$144k. Below-market seller financing inflates price; REO sales depress it. Each needs an adjustment, not an average.
- ◻️ **B.** Accept it. Five recent comps, four in the same submarket, is a solid data set.
  - Recency and location are necessary, not sufficient. Vintage, financing terms and sale conditions are the three adjustments appraisers are required to make, and two of these comps fail them outright.
- ◻️ **C.** Only remove Comp 4 as a distressed sale, which raises the value and supports the loan.
  - Comp 4 is the only comp biased low. Removing it while keeping the 2021 building makes the conclusion worse, not better. Adjust in both directions or not at all.
- ◻️ **D.** Comps do not matter to the lender; size the loan on DSCR and move on.
  - LTV and DSCR are both tests, and value drives the LTV, the credit memo, and the loss severity if the loan goes bad. A $2M overstatement is a lending error even when DSCR passes.

**Takeaway:** Appraisal review is comp review. Check every comp for vintage, financing terms and sale conditions before accepting the average, and re-size the loan on the defensible value, not the concluded one.

- One newer-vintage comp in a five-comp set can move the average 15%.
- Seller financing below market inflates the price; REO and short sales depress it.
- Re-run LTV on the adjusted value and show both numbers in the memo.

---

## [ ] 9. Does lease-up get us to the perm loan in time?
*Situational · absorption · intermediate · multifamily · development*
`id: 'lease-up-vs-loan-maturity'`

**Scenario.** Your 300-unit garden community delivered four months ago and is 32% leased
(96 units). Net leasing has run 24 units per month for three months, against a pro forma
of 25. The construction loan matures in 14 months. The perm lender requires 90%
physical occupancy sustained for 90 days before funding. Two competing projects
totaling 550 units deliver over the next nine months.

| | |
|---|---|
| Units / leased | 300 / 96 (32%) |
| Trailing pace / pro forma | 24 per month / 25 per month |
| Perm test | 90% occupied for 90 days |
| Construction loan maturity | 14 months |
| Competing deliveries | 550 units in 9 months |

**Q: How much cushion do you have, and what should you do about it?**

- ✅ **A.** About four months on trailing pace, and none if the competing deliveries slow you to ~15 per month. You need 174 more leases: ~7 months at 24 per month, plus 90 days of seasoning, lands at ~10 months. At 15 per month it is ~14.6 months, past maturity. Pin down the extension option and the lender's seasoning definition now, and protect velocity with targeted concessions.
  - 270 − 96 = 174 units. 174 ÷ 24 ≈ 7.3 months + 3 months seasoning ≈ 10.3 months vs 14. At 15 per month: 11.6 + 3 = 14.6 months. The risk is forward-looking competition, not trailing performance.
- ◻️ **B.** Plenty of cushion: seven months to 90% leaves seven months to spare.
  - Forgets the 90-day seasoning requirement, which cuts the cushion from seven months to four. Seasoning is a timing cost, not a formality.
- ◻️ **C.** You are already behind: 32% after four months is below the pro forma pace.
  - 96 units ÷ 4 months = 24 per month, essentially on pro forma. Trailing performance is fine; the question is whether it holds against 550 new units.
- ◻️ **D.** Cut rents 10% to push leasing to 40 per month and lock in the timeline.
  - Deep cuts erode the NOI the perm loan is sized on, and a 10% rent cut likely costs more in perm proceeds than the time it buys. Use targeted concessions (a month free, look-and-lease) that keep face rents intact.

**Takeaway:** Lease-up risk on a construction loan is a timeline problem: months to the occupancy test, plus the seasoning period, against the maturity. Stress the pace for competing deliveries, and remember that the perm lender sizes on the rents you lease at.

- Months to perm = (target units − leased) ÷ pace + seasoning period.
- Stress pace down 30–40% when competing deliveries overlap your lease-up.
- Protect face rent; concessions burn off, rent cuts are in the perm sizing forever.

---

## [ ] 10. Which rent schedule is worth more?
*Situational · lease-econ · beginner · industrial · acquisitions/assetManagement*
`id: 'rent-escalation-structures'`

**Scenario.** A tenant's broker offers three five-year rent schedules on a 200,000 SF
warehouse. You plan to sell the building at the end of year 5 at a 6.0% cap.

| | |
|---|---|
| Option A | $8.00/SF year 1, fixed 3% annual bumps |
| Option B | $8.50/SF flat for five years |
| Option C | $7.75/SF year 1, CPI bumps with a 2% floor and 4% cap |
| Size / exit | 200,000 SF / sale at year 5, 6.0% cap |

**Q: Which schedule is worth the most to you?**

- ✅ **A.** A and B are nearly identical on average rent (~$8.49 vs $8.50) and C is lowest under any CPI path. Between A and B, A finishes year 5 at ~$9.00/SF versus $8.50, and the exit buyer caps the in-place rent, so A adds ~$100k of NOI and ~$1.7M of exit value. Prefer A if you are selling at year 5; prefer B if year-1 cash flow or DSCR is the constraint.
  - A: 8.00, 8.24, 8.49, 8.74, 9.00 → average $8.49. C at the 2% floor averages $8.07; at the 4% cap, $8.40. B's flat $8.50 is worth slightly more than A on a present-value basis, but A's ending rent is what the next buyer capitalizes: $0.50 × 200,000 = $100k ÷ 6% = $1.67M.
- ◻️ **B.** Option B, because it has the highest face rent.
  - Highest *starting* rent. Over five years A averages the same, and A ends $0.50/SF higher, which is the number that drives your exit price.
- ◻️ **C.** Option A, because 3% annual bumps are always worth more than flat rent.
  - Only barely here, and only on an undiscounted basis. Bumps from a lower base need time to catch up; the real advantage of A is the ending rent at exit, not the average.
- ◻️ **D.** Option C, because CPI protection is worth more than a lower starting rent.
  - From a $7.75 base, even the 4% cap every year averages $8.40, below both A and B. Inflation protection from a low start does not catch up in five years.

**Takeaway:** Compare rent schedules on average rent over the term, then on the ending rent if you plan to sell: buyers cap in-place NOI at exit. Starting face rent is the least informative of the three numbers.

- Average rent over term ≈ starting rent × (1 + bumps × (years − 1) ÷ 2).
- Ending rent × SF ÷ exit cap is the exit value at stake between schedules.
- CPI-linked rent from a lower base needs 7–10 years to overtake a fixed-bump schedule.
