# Question-bank phrasings — thin-coverage areas (2026-11-14)

Scheduled pass: find the areas of the shipped question bank with the fewest questions, then draft 10 candidate phrasings per area for the next content PR. Each phrasing is a hook title plus the ask the learner would read, with a suggested tag line and the trap the question is built around. None of these are written up yet; they are pitches to approve, cut, or re-angle before anyone writes options and explanations.

**Source of the coverage numbers.** The live `question_submissions` table (community submissions with `approved` status) lives in the `learncre` Supabase project, which is currently **paused (INACTIVE)**, so approval counts could not be read this run. Coverage below is measured from the shipped bank instead: the 71 situational cases registered in `src/quiz/situational/index.ts` plus the 68 quiz templates. Restore the project and re-run to layer community-approval counts on top.

## Coverage snapshot (situational cases)

| Dimension | Thin | Count | For comparison |
|---|---|---|---|
| Category | absorption | 1 | deal-process 21, document-literacy 13 |
| Category | comp-selection | 2 | investment-thesis 9 |
| Category | sensitivity | 2 | pricing / risk / diagnostic 7 each |
| Category | lease-econ | 2 | |
| Role | development | 9 (5 are construction-draw mechanics) | acquisitions 40, assetManagement 31 |
| Asset class | hotel | 1 | multifamily 11, office 9 |
| Asset class | retail | 2 | industrial 3 |
| Difficulty | beginner | 4 | intermediate 33, advanced 34 |

Six areas get 10 phrasings each below. Beginner is a cross-cutting gap, so roughly a quarter of the phrasings are pitched at beginner difficulty rather than given their own section.

Tag line format: `role · asset class · difficulty`. Existing cases are listed per section so new ones don't collide.

---

## 1. Absorption (currently 1 case: `absorption-timing`)

1. **The pipeline just doubled — does your lease-up timeline survive?**
   Ask: Deliveries over the next 12 months rise from 300 to 900 units in a 4,000-unit submarket absorbing 50/month. How does your months-to-93% change?
   `acquisitions, development · multifamily · intermediate` · Trap: the denominator moves with deliveries; re-base before dividing.
2. **What's your fair share of absorption?**
   Ask: The submarket absorbs 600 units/yr. Your 250-unit lease-up is one of four, totaling 1,000 competing units. What monthly pace do you underwrite?
   `development · multifamily · beginner` · Trap: assuming you capture 100% of market absorption instead of a capture rate.
3. **Net or gross — which absorption did the broker quote?**
   Ask: The OM cites 400,000 SF of "leasing activity"; move-outs in the same period were 350,000 SF. What did the market actually absorb, and what does that do to your downtime assumption?
   `acquisitions · office · beginner` · Trap: gross leasing velocity is not net absorption.
4. **Concessions are rising but occupancy is flat — what is absorption telling you?**
   Ask: Occupancy has held at 92% for three quarters while free rent went from 2 weeks to 6 weeks. Is this seasonal noise or supply outrunning demand, and how would you tell?
   `assetManagement · multifamily · intermediate` · Trap: reading occupancy as the demand signal when concessions are the leading indicator.
5. **40% pre-leased at certificate of occupancy — how long to stabilization?**
   Ask: 200 units, 80 pre-leased, pace of 20 net leases/month, stabilization defined at 93%. When do you hit it, and what does the lender's test use?
   `development · multifamily · beginner` · Trap: counting pre-leases that haven't commenced as occupied.
6. **Does trailing absorption deserve a haircut?**
   Ask: The last four quarters absorbed 150 / 150 / 120 / 90 units. The OM uses the 4-quarter average. What pace do you underwrite?
   `acquisitions · multifamily · intermediate` · Trap: averaging a declining series instead of weighting the trend.
7. **Three years of supply in the pipeline — what does that do to your rent growth?**
   Ask: 2,400 units under construction against 800 units/yr of absorption. How should that reshape the years 1–3 rent growth line?
   `portfolioMgmt, acquisitions · multifamily · intermediate` · Trap: holding rent growth flat while months-of-supply triples.
8. **Your building is 95% leased in a market with negative absorption — are you safe?**
   Ask: The asset is full, but the submarket shed 600,000 SF last year. 30% of your rent roll expires in 24 months. Where is the risk and how do you underwrite it?
   `assetManagement · office · advanced` · Trap: treating building occupancy as insulation from market absorption at rollover.
9. **Industrial vacancy went from 4% to 7% after 1.2M SF delivered — what was net absorption?**
   Ask: Back into net absorption from the vacancy change and the deliveries on a 20M SF base. Positive or negative?
   `acquisitions · industrial · intermediate` · Trap: reading rising vacancy as negative absorption when deliveries explain it.
10. **Pace slows 30% — does the lease-up reserve still cover carry?**
   Ask: Reserve was sized for a 14-month lease-up at $180k/month of shortfall. Pace drops from 50 to 35 units/month. How short is the reserve, and who funds the gap?
   `development, mortgageUw · multifamily · advanced` · Trap: sizing the reserve to the base case with no pace cushion.

## 2. Comp selection (currently 2 cases: `comp-set-vetting`, `comp-vintage-adjustment`)

1. **Your tightest comp was a 1031 buyer — keep it or cut it?**
   Ask: The 5.25% cap trade was an exchange buyer under a 180-day clock; the rest of the set is 5.75–6.0%. How do you treat it?
   `acquisitions · multifamily · beginner` · Trap: a motivated-buyer print is a data point, not the market.
2. **Portfolio sale allocated values — are those real comps?**
   Ask: Three of five comps are allocated prices from a single 12-asset portfolio trade. What's wrong with using them, and what can they still tell you?
   `acquisitions · industrial · intermediate` · Trap: allocations are accounting outputs, not negotiated prices.
3. **Sale-leaseback at a 5.5% cap — comparable to your multi-tenant asset?**
   Ask: Broker cites a 20-year, investment-grade sale-leaseback as the lead comp for a 10-tenant flex building with a 3.5-year WALT. Why doesn't it transfer, and what adjustment is defensible?
   `acquisitions · industrial · intermediate` · Trap: credit and lease structure drive the cap, not the walls.
4. **Pricing a 60%-leased asset — stabilized comps or value-add comps?**
   Ask: Subject is 60% leased. Stabilized trades are at 6.0%; value-add trades at $220/SF. Which basis do you compare on, and why does the cap rate mislead here?
   `acquisitions · office · intermediate` · Trap: a cap rate on depressed in-place NOI is not comparable to stabilized caps.
5. **Price per unit or cap rate — which metric wins for a 1970s garden deal?**
   Ask: The asset has 18% loss-to-lease. Cap-rate comps say $42M; $/unit comps say $48M. Which do you lean on, and how do you reconcile?
   `acquisitions · multifamily · beginner` · Trap: in-place cap rates understate value when rents are far below market.
6. **The comp traded with assumable 3.5% debt — how much of the price was the loan?**
   Ask: A 2024 trade carried an assumable loan 250 bps below market. Roughly how much did the financing add to the price, and what does the "cash-equivalent" cap look like?
   `acquisitions, mortgageUw · multifamily · advanced` · Trap: taking a financing-inflated print at face value.
7. **Rent comps from Class A towers for a Class B building — adjust or reject?**
   Ask: The appraisal's lease comps are all newer, higher floor-plate buildings two blocks away. Which adjustments are defensible (class, floor, TI package, free rent) and which are reaching?
   `assetManagement, mortgageUw · office · intermediate` · Trap: adjusting a comp so far it stops being a comp.
8. **Can a ground-lease trade anchor fee-simple pricing?**
   Ask: One comp is a leasehold with 42 years remaining at a 6.75% cap. Can it inform your fee-simple pricing, and in which direction do you adjust?
   `acquisitions · retail · advanced` · Trap: leasehold caps embed reversion risk the fee owner doesn't carry.
9. **Two comps in 24 months — how do you widen the set without diluting it?**
   Ask: You can expand geography, time window, or product type. Rank the three by how much adjustment they require, and say which you'd expand first.
   `acquisitions · industrial · intermediate` · Trap: expanding the dimension that moves cap rates the most.
10. **Every comp came from the listing shop — what's the bias check?**
   Ask: The OM comp set is five trades, all brokered by the seller's team. What do you verify, and where (public records, third-party data, lender appraisals)?
   `acquisitions · mixed · beginner` · Trap: a self-selected comp set with no independent corroboration.

## 3. Sensitivity (currently 2 cases: `going-in-vs-exit-cap-spread`, `exit-cap-conservatism`)

1. **Exit cap, rent growth, or hold period — which moves IRR most?**
   Ask: One-at-a-time shocks: +50 bps exit cap, −100 bps rent growth, +2 years hold. Rank the IRR hits and explain why the order comes out the way it does.
   `acquisitions · multifamily · intermediate` · Trap: assuming the biggest headline number is the biggest IRR driver.
2. **A 25 bps exit-cap move on a $50M deal — how much value is that?**
   Ask: Exit cap moves from 6.00% to 6.25%. Approximate the value change without a model, then say what it does to the equity.
   `acquisitions · mixed · beginner` · Trap: forgetting leverage turns a 4% value move into a 10%+ equity move.
3. **Rates up 100 bps — unlevered vs. levered IRR, which suffers more and why?**
   Ask: Same asset, same NOI path, debt cost rises 100 bps at refinance in year 3. Walk through the two IRRs.
   `mortgageUw, acquisitions · office · intermediate` · Trap: treating rate sensitivity as an unlevered problem.
4. **Does the deal survive a 10% opex miss?**
   Ask: Operating expense ratio is 42%. Opex comes in 10% over budget in year 1. What happens to NOI, DSCR, and the year-1 cash-on-cash?
   `assetManagement · multifamily · beginner` · Trap: a 10% opex miss is not a 10% NOI miss; it's levered by the expense ratio.
5. **Rent growth × exit cap table — which cell is your downside?**
   Ask: You're handed a two-way data table. The IC asks for "the downside case." Which cell do you point to and how do you justify it isn't the corner?
   `acquisitions · multifamily · intermediate` · Trap: calling the worst corner the downside when it's a joint tail event.
6. **How wide can the exit cap go before equity just gets its money back?**
   Ask: Compute the break-even exit cap where the equity multiple is 1.0x, given the debt balance and cumulative distributions.
   `acquisitions, portfolioMgmt · office · advanced` · Trap: solving for value instead of equity after debt payoff.
7. **Six months late on a development — which return metric suffers most?**
   Ask: IRR, equity multiple, or yield on cost? Explain which barely moves and which falls hardest.
   `development · multifamily · intermediate` · Trap: expecting all three to move together.
8. **5% more vacancy on a gross lease vs. a NNN lease — same NOI hit?**
   Ask: Two identical buildings, one gross, one NNN. Vacancy rises 5 points. Why does NOI fall further on one of them?
   `assetManagement · office · intermediate` · Trap: forgetting lost expense recoveries on the vacant NNN space.
9. **The tornado chart says exit cap dominates — so why does the IC keep asking about rent growth?**
   Ask: Explain why a one-variable sensitivity understates the compounding of rent growth through NOI and exit value.
   `acquisitions · mixed · advanced` · Trap: reading a tornado chart as if inputs were independent.
10. **Exit cap and rent growth move together in a downturn — does your downside case know that?**
   Ask: Build the case for a scenario (correlated shocks) over a one-variable sensitivity, and name the two inputs you'd move together.
   `portfolioMgmt · mixed · advanced` · Trap: stress-testing inputs one at a time when they're correlated.

## 4. Lease economics (currently 2 cases: `ti-vs-rent-giveback`, `lease-structure-nnn-vs-gross`)

1. **Free rent up front or a lower face rent — same NER, so who cares?**
   Ask: Two offers net to the same effective rent. Why does the landlord still prefer the higher face rent, and who else is looking at it?
   `assetManagement · office · beginner` · Trap: NER equality hides the valuation and lender optics of face rent.
2. **Blend-and-extend: a rent cut today for five more years — where's the break-even?**
   Ask: Tenant wants $28 to $25 today in exchange for a 5-year extension on a lease with 2 years left. Compare to re-leasing at $30 with downtime and TI.
   `assetManagement · office · intermediate` · Trap: pricing the cut without crediting avoided downtime and TI.
3. **3% annual bumps or 10% every five years — which pays more over 10 years?**
   Ask: Same starting rent. Compute total rent under each schedule and say which the tenant is actually asking for.
   `acquisitions · industrial · beginner` · Trap: compounding; 3% annual is not "15% every five years."
4. **What does a 70% renewal probability do to your rollover cost?**
   Ask: Renewal costs $15/SF TI and 0 downtime; new lease costs $60/SF TI, 8 months downtime. Compute the probability-weighted rollover cost.
   `acquisitions, assetManagement · office · intermediate` · Trap: underwriting the renewal case or the vacate case, not the blend.
5. **An expansion option at fixed rent — what is it costing you?**
   Ask: Tenant holds a 20,000 SF expansion option at today's rent, exercisable in year 3. Market rent is growing 4%/yr. What did you give away?
   `assetManagement · office · advanced` · Trap: treating a free option as costless.
6. **The termination fee is 6 months of rent — does it make you whole?**
   Ask: Tenant can terminate at year 5 with a 6-month rent penalty. Unamortized TI and leasing commissions at year 5 total 11 months of rent. Is the fee adequate?
   `assetManagement, mortgageUw · office · intermediate` · Trap: forgetting unamortized costs and downtime in the fee.
7. **Gross-up at 70% occupancy — what are the tenants actually reimbursing?**
   Ask: Variable opex is $6/SF at full occupancy; the building is 70% leased. With and without a 95% gross-up clause, what do tenants pay and what does the landlord absorb?
   `assetManagement · office · intermediate` · Trap: pro-rating variable expenses over a half-empty building.
8. **Co-tenancy triggered — how much rent is actually at risk?**
   Ask: The anchor goes dark. Four inline tenants with co-tenancy clauses can drop to percentage-only rent. Quantify the exposure and the cure window.
   `assetManagement · retail · advanced` · Trap: counting only the anchor's rent as the loss.
9. **Lease commencement vs. rent commencement — how many months of carry did you just absorb?**
   Ask: Lease commences on delivery; rent commences 90 days after; the build-out takes 5 months. Who is paying opex on the space and for how long?
   `assetManagement · retail · beginner` · Trap: assuming lease commencement means cash starts.
10. **12% loss-to-lease — how fast can you actually capture it?**
   Ask: Rents are 12% below market, but only 35% of the roll turns in year 1 and 40% in year 2. What's the realistic year-1 and year-2 revenue uplift?
   `acquisitions · multifamily · beginner` · Trap: booking the full mark-to-market in year 1.

## 5. Development role (currently 9 role-tagged cases; 5 are construction-draw mechanics)

1. **Is a 100 bps development spread enough for a 36-month build?**
   Ask: Yield on cost 6.5%, stabilized market cap 5.5%. What spread does a ground-up risk profile warrant, and what would make 100 bps acceptable?
   `development · multifamily · intermediate` · Trap: judging the spread without the duration and lease-up risk behind it.
2. **Land is 15% of total cost — is that cheap land or an expensive building?**
   Ask: Land $9M, total cost $60M. What does the land share tell you about the deal type, and where should the margin come from?
   `development · mixed · beginner` · Trap: reading a land ratio without the construction-cost context.
3. **What can you pay for the dirt?**
   Ask: Back into residual land value from a target 6.75% yield on cost, stabilized NOI of $4.0M, and all-in non-land costs of $48M.
   `development · multifamily · beginner` · Trap: solving for land before hitting the yield hurdle.
4. **Hard costs came in 8% over at GMP — do you still build?**
   Ask: Re-run the yield on cost. Rank your options: value-engineer, re-bid, re-trade the land, or pause. Which first?
   `development · multifamily · intermediate` · Trap: absorbing the overrun in contingency and calling it done.
5. **Eighteen months of pre-development spend before a zoning vote — how do you price that risk?**
   Ask: $2.5M of soft costs at risk ahead of entitlement. What return does that capital need, and how does it change the land deal structure (option vs. purchase)?
   `development · mixed · advanced` · Trap: treating pre-dev capital like construction equity.
6. **Rates moved 150 bps mid-construction — how short is the interest reserve?**
   Ask: $40M loan, average outstanding 55%, 24 months remaining. Quantify the shortfall and say who funds it under the loan docs.
   `development, mortgageUw · multifamily · intermediate` · Trap: computing the shortfall on the full commitment rather than the average draw.
7. **Spec industrial vs. build-to-suit — what spread premium does spec deserve?**
   Ask: BTS pencils at a 6.0% yield on cost with a signed 15-year lease. The spec deal shows 7.0%. Is 100 bps enough for lease-up risk?
   `development · industrial · intermediate` · Trap: comparing yields without pricing the lease-up gap.
8. **Merchant build or hold — which exit assumption drives the pro forma?**
   Ask: Same project. Merchant exit at stabilization vs. 10-year hold. Which NOI do you cap, trended or untrended, and why does the answer differ by strategy?
   `development, portfolioMgmt · multifamily · advanced` · Trap: using a trended NOI for a merchant-build exit.
9. **Two phases of 150 or one phase of 300 — what does phasing actually buy you?**
   Ask: Phasing adds 6% to cost and 9 months to completion but halves the units in lease-up at any time. When is it worth it?
   `development · multifamily · intermediate` · Trap: seeing phasing as only a cost, not an absorption hedge.
10. **Impact fees and offsite work just added $4M — which bucket, and does contingency cover it?**
   Ask: Classify the cost (hard, soft, owner), and say whether a 5% hard-cost contingency was ever meant to cover it.
   `development · mixed · beginner` · Trap: pulling owner-side costs from the hard-cost contingency.

## 6. Retail and hotel asset classes (currently 2 retail, 1 hotel case)

Retail:

1. **The anchor goes dark but keeps paying rent — what's the real exposure?**
   Ask: Anchor is current on rent but closed the store. Walk through inline sales, co-tenancy, and the lender's view of a dark anchor.
   `assetManagement · retail · intermediate` · Trap: a paying tenant looks like no problem on the rent roll.
2. **Occupancy cost ratio at 18% — is the tenant over-rented, and what do you do about it?**
   Ask: Inline apparel tenant at 18% OCR against a 10–12% healthy range. Renewal is in 14 months. What's your opening position?
   `assetManagement · retail · beginner` · Trap: treating a current tenant as a safe renewal.
3. **Grocery-anchored and power center at the same cap — which deserves the tighter one?**
   Ask: Both trade at 6.5%. Argue which is mispriced and name the two risk factors driving your view.
   `acquisitions · retail · intermediate` · Trap: pricing retail formats as interchangeable.
4. **Natural or artificial breakpoint — which did the OM use?**
   Ask: Base rent $400k, percentage rent 6%, OM shows breakpoint at $5.5M of sales. Compute the natural breakpoint and say what the difference means for the income.
   `acquisitions · retail · intermediate` · Trap: assuming the breakpoint is always base rent divided by the percentage.
5. **CAM caps on 60% of the inline roll — who eats opex inflation?**
   Ask: Controllable CAM grows 7%; 60% of tenants have 3% caps. Quantify the landlord's leakage and what it does to NOI growth.
   `assetManagement · retail · intermediate` · Trap: modeling 100% recovery when the leases say otherwise.

Hotel:

6. **ADR up 5%, occupancy down 6 points — did RevPAR go up or down?**
   Ask: ADR $180 to $189; occupancy 72% to 66%. Compute RevPAR both years and explain what the mix tells you about the revenue strategy.
   `assetManagement · hotel · beginner` · Trap: assuming rate growth always lifts RevPAR.
7. **Flagged or independent — how much RevPAR does the brand fee need to buy?**
   Ask: Franchise and marketing fees total 9% of rooms revenue. What RevPAR premium does the flag need to deliver to break even?
   `acquisitions, assetManagement · hotel · intermediate` · Trap: comparing fee cost to total revenue instead of the incremental RevPAR.
8. **A $25k/key PIP at acquisition — is it capex or purchase price?**
   Ask: 200 keys, $25k/key brand-mandated PIP. How does it enter your basis, your going-in yield, and the loan sizing?
   `acquisitions, mortgageUw · hotel · intermediate` · Trap: quoting a going-in cap on a price that excludes the PIP.
9. **GOP margin at 32% against a 38% comp set — labor or flow-through?**
   Ask: Rooms revenue is in line; margin is 600 bps light. Where do you look first, and what's the quickest fix?
   `assetManagement · hotel · advanced` · Trap: blaming revenue when the gap is in departmental expense.
10. **Select-service at 7.5% and full-service at 8.5% — why the spread?**
   Ask: Same market, same quality. Name the three structural reasons full-service trades wider.
   `acquisitions · hotel · beginner` · Trap: reading the wider cap as a bargain.

---

## Next steps

- Approve or cut phrasings above; approved ones become `SituationalCase` files per `docs/agent-instructions.md` (one `isBest` option, 3–4 options, takeaway, 3 tips, role tag, registered in the index).
- Beginner is under-served across the whole bank (4 of 71). About a quarter of the pitches above are tagged beginner on purpose.
- Restore the `learncre` Supabase project and re-run this pass to add community-submission approval counts (`question_submissions` grouped by `kind_hint`, `role_hint`, `status`) to the coverage table.
