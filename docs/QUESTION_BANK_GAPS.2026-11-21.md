<!-- generated 2026-11-21 by the scheduled question-bank gap review -->

# Question bank gap review — 2026-11-21

Scheduled pass: find the areas of the approved question bank with the fewest
questions and draft 10 new phrasings aimed at them.

**Source of truth used.** The community `question_submissions` table (with
its `approved` status) lives in the `learncre` Supabase project, which is
currently **paused (INACTIVE)**, so it could not be queried this run. The
shipped content in `src/quiz/` (everything that has passed review and CI) was
used as the approved set instead. Re-run the submissions tally once the
project is restored.

## Where the bank is thin

Situational cases (72 total) by category:

| Category | Cases |
|---|---|
| deal-process | 21 |
| document-literacy | 13 |
| investment-thesis | 9 |
| pricing | 7 |
| diagnostic | 7 |
| risk | 7 |
| **sensitivity** | **2** |
| **lease-econ** | **2** |
| **comp-selection** | **2** |
| **absorption** | **1** |

Other thin cuts of the same 72 cases:

| Cut | Count | Note |
|---|---|---|
| Asset class: hotel | 1 | vs multifamily 11, office 9 |
| Asset class: retail | 2 | |
| Asset class: industrial | 3 | |
| Difficulty: beginner | 4 | vs intermediate 33, advanced 34 |
| Role: development | 9 | vs acquisitions 40, asset mgmt 31 |

Quiz templates (69) split 41 valuation / 27 returns and are not the
constraint; the gap is in the reasoning (situational) bank.

## 10 proposed phrasings

Each entry is a candidate `SituationalCase` written to the shape in
`docs/agent-instructions.md`: one best answer, plausible distractors, a
takeaway and three tips. Numbers were hand-checked. Tick the box to accept;
accepted items get built as `src/quiz/situational/<id>.ts` and registered in
the index.

---

### [ ] 1. Spec warehouse lease-up: how long is "the market will absorb it"?
*absorption · beginner · industrial · development / acquisitions*

**Scenario.** You are underwriting a 500,000 SF speculative warehouse that
delivers next quarter. The submarket has 40M SF of inventory at 94%
occupancy. Trailing 12-month net absorption is 2.4M SF (about 200,000 SF per
month). Including your building, 1.5M SF is under construction and will
deliver within a year.

| | |
|---|---|
| Subject | 500,000 SF, spec |
| Inventory / occupancy | 40M SF / 94% |
| Net absorption | ~200,000 SF per month |
| Under construction | 1.5M SF (incl. subject) |

**Q: What lease-up period should you underwrite?**

- ✅ **About 18–20 months.** Your building competes for absorption with the
  existing 2.4M SF of vacancy *and* the other 1.0M SF delivering, so it
  captures roughly 500 / 3,900 ≈ 13% of monthly absorption, about 26,000 SF
  per month. 500,000 / 26,000 ≈ 19 months.
- ◻️ About 2.5 months (500,000 / 200,000). Assumes the subject takes every
  SF the market absorbs.
- ◻️ About 7.5 months. Pro-rata share of new deliveries only (500 / 1,500 ×
  200,000 ≈ 67,000 SF per month); ignores existing vacancy.
- ◻️ It cannot be estimated without a pre-lease. Pre-leasing changes the
  answer, but the market-share method is exactly how you set the base case.

**Takeaway.** Lease-up time = subject SF ÷ (subject's share of available
space × market absorption). Existing vacancy is competition too.

Tips: count existing vacancy plus pipeline in the denominator · sensitize
absorption down 25% for the downside case · carry free rent and TI for the
full lease-up window in the budget.

---

### [ ] 2. Absorption is slowing — which pace do you underwrite?
*absorption · intermediate · multifamily · development / acquisitions*

**Scenario.** A 320-unit lease-up submarket has absorbed 300, 225 and 150
units in the last three quarters. Two competing projects delivered during
that time and both are now offering two months free. Your project needs to
lease 240 more units to stabilize. The broker's pro forma uses the
trailing-12-month average.

| | |
|---|---|
| Quarterly absorption | 300 → 225 → 150 units |
| Units left to lease | 240 |
| Competitor concessions | 2 months free |
| Broker assumption | trailing-12 average (~250/qtr) |

**Q: Which absorption pace belongs in your base case?**

- ✅ **The last quarter (150/qtr), or lower.** The trend is down and the
  cause (new supply, concessions) is still in the market. 240 / 150 ≈ 5
  quarters, versus ~3 on the trailing average. Underwrite the trend, not the
  average that includes the good quarters.
- ◻️ Trailing-12 average. Averaging masks a 50% decline over three quarters.
- ◻️ Peak quarter (300), because supply will clear. Assumes recovery with no
  evidence.
- ◻️ Pace does not matter if rents hold. Slower lease-up costs carry,
  interest reserve and concessions even at flat face rents.

**Takeaway.** Trailing averages are only valid when the series is flat. When
absorption is trending, use the most recent quarter and explain why.

Tips: plot the series before averaging · match the concession level in your
effective-rent assumption · a longer lease-up usually means a bigger interest
reserve, not just a later stabilization date.

---

### [ ] 3. Which retail comps actually support the price?
*comp-selection · beginner · retail · acquisitions*

**Scenario.** You are pricing a 95%-leased, fee-simple grocery-anchored
center asking a 6.5% cap. The broker offers four comps.

| Comp | Format | Cap |
|---|---|---|
| 1 | Unanchored strip, same submarket | 7.50% |
| 2 | Grocery-anchored, same MSA, fee simple | 6.25% |
| 3 | Power center, big-box anchors | 7.00% |
| 4 | Grocery-anchored, on a ground lease | 5.75% |

**Q: How should you build the comp set?**

- ✅ **Anchor on Comp 2 and treat the others as bookends.** Comp 2 is the
  same format and ownership structure. Comp 1 and Comp 3 are different
  formats with weaker credit and higher re-tenanting risk, so they should
  price wider. Comp 4 is leasehold: the ground rent sits above the NOI line
  and the cap reflects leasehold economics, not fee-simple pricing.
- ◻️ Average all four (6.6%) and call the ask fair. Averages across formats
  and ownership structures are not comparable.
- ◻️ Use Comp 4 because it is the tightest cap. Leasehold caps are not fee
  caps.
- ◻️ Use Comps 1 and 3 because they are closest geographically. Format and
  anchor credit matter more than distance within an MSA for retail.

**Takeaway.** Retail comps have to match format (grocery, power, strip),
anchor credit and fee vs leasehold before location is even considered.

Tips: check whether the comp NOI is before or after ground rent · grocery
anchors trade on the grocer's credit and sales, not the shop space · a 50–100
bps spread between anchored and unanchored is normal.

---

### [ ] 4. Does a sale-leaseback belong in the comp set?
*comp-selection · intermediate · office · acquisitions / portfolioMgmt*

**Scenario.** Your office comp set has five trades at 6.75–7.25%. One
outlier at 5.50% is a sale-leaseback: a corporate owner sold its
headquarters and signed a 15-year lease at $38/SF. Market rent for the
building is $30/SF. The broker uses the 5.50% trade to argue your subject,
leased at market, should price at 6.25%.

| | |
|---|---|
| Market comp caps | 6.75–7.25% |
| Sale-leaseback cap | 5.50% |
| Leaseback rent / market | $38 / $30 per SF |
| Leaseback term | 15 years |

**Q: How do you treat the 5.50% trade?**

- ✅ **Exclude it, or normalize it to market rent before using it.** The
  seller-tenant set its own rent 27% above market and added 15 years of
  term; the buyer paid for the credit and the bond-like lease. Re-cut the
  price on market NOI and the implied cap on the real estate is closer to
  7%, in line with the others.
- ◻️ Keep it; a trade is a trade. The price reflects the tenant's credit
  and an inflated NOI, not the building.
- ◻️ Weight it 50% because it is the most recent. Recency does not fix a
  structural mismatch.
- ◻️ Use it as the ceiling and price everything else off it. That imports
  the manufactured rent into every comp.

**Takeaway.** A cap rate is only comparable if the NOI underneath it is
market. Sale-leasebacks price credit and term; strip that out or leave them
out.

Tips: always compare comp rent to market rent, not just comp cap to ask ·
look for related-party or seller-tenant structures in the deed and lease ·
longer WALT compresses caps on its own; do not double-count it.

---

### [ ] 5. What is the net effective rent on this office deal?
*lease-econ · beginner · office · assetManagement / acquisitions*

**Scenario.** A tenant signs a 5-year lease at $30.00/SF face with 3% annual
bumps and 6 months of free rent at the start. The landlord also funds
$40/SF of TI, which you are told to ignore for this question.

| | |
|---|---|
| Face rent | $30.00/SF |
| Bumps | 3% per year |
| Free rent | 6 months |
| Term | 5 years |

**Q: Roughly what is the net effective rent (undiscounted)?**

- ✅ **About $28.90/SF.** Face rent over 5 years is 30.00 + 30.90 + 31.83 +
  32.78 + 33.77 ≈ $159.28/SF. Free rent costs 6/12 × $30 = $15/SF. Net
  $144.28 over 5 years ≈ $28.86/SF per year.
- ◻️ $27.00/SF (30 × 54 / 60). Ignores the bumps.
- ◻️ $30.00/SF. That is face rent, not effective rent.
- ◻️ $31.90/SF. Average face rent with the bumps but no deduction for free
  rent.

**Takeaway.** NER = (sum of contractual rent − free rent − optionally TI) ÷
term. Bumps and concessions pull in opposite directions; compute both.

Tips: free rent is priced at the Year-1 rate unless the lease says
otherwise · adding TI to the numerator turns NER into a landlord "net of
costs" rent · brokers quote face; lenders underwrite effective.

---

### [ ] 6. Blend-and-extend now, or hold out for market in 3 years?
*lease-econ · advanced · industrial · assetManagement / acquisitions*

**Scenario.** An industrial tenant pays $6.00/SF NNN with 3 years left.
Market is $8.50/SF. The tenant offers to extend today for a new 10-year term
at $7.25/SF flat, no TI, no downtime. If you refuse and roll at expiry you
expect 6 months downtime, $5.00/SF of TI and 3 months free at $8.50.

| | |
|---|---|
| In-place / market | $6.00 / $8.50 per SF NNN |
| Remaining term | 3 years |
| Blend offer | $7.25/SF, 10 years from today |
| Rollover costs | 6 mo downtime, $5/SF TI, 3 mo free |

**Q: Which path produces more rent over the next 10 years, and by roughly
how much?**

- ✅ **The blend, by about $6/SF.** Blend: 10 × $7.25 = $72.50/SF. Hold: 3 ×
  $6.00 = $18.00, then 6.5 years × $8.50 = $55.25, minus $5.00 TI and
  0.25 × $8.50 ≈ $2.13 free rent, ≈ $66.10/SF. The blend also removes the
  rollover risk and lengthens WALT, which helps the exit cap.
- ◻️ Hold for market; $8.50 beats $7.25. Ignores 3 years at $6.00 plus
  downtime, TI and free rent.
- ◻️ Hold, because a longer flat lease caps your upside. True, but the
  question asks what the 10-year rent totals are, and the upside is already
  below the certain blend.
- ◻️ It depends only on the tenant's credit. Credit matters for both paths
  equally; the math difference is in the rollover costs.

**Takeaway.** The cost of getting to market rent (downtime, TI, free rent)
often exceeds the gap between a blended rate and market. Price the whole
path, not the headline rate.

Tips: compute both paths per SF over the same horizon · a blend that
lengthens WALT can also tighten the exit cap · if the blend rate is below
market less your rollover cost per year, negotiate harder.

---

### [ ] 7. Which assumption moves value the most?
*sensitivity · beginner · multifamily · acquisitions / mortgageUw*

**Scenario.** A stabilized apartment property is valued at $10.0M: GPR
$1.00M, 5% vacancy, $350k of operating expenses, NOI $600k at a 6.00% cap.
You are asked to rank three one-at-a-time shocks.

| Shock | |
|---|---|
| A | Exit cap +25 bps |
| B | Occupancy −2 points |
| C | OpEx +5% |

**Q: Rank the shocks by value impact.**

- ✅ **A > B > C.** A: $600k / 6.25% = $9.60M, −4.0%. B: EGI falls $20k,
  NOI $580k → $9.67M, −3.3%. C: OpEx $367.5k, NOI $582.5k → $9.71M, −2.9%.
- ◻️ B > C > A. Treats operating shocks as bigger than a quarter-point of cap
  rate.
- ◻️ C > A > B. OpEx is the smallest lever here.
- ◻️ All roughly equal. The spread is 4.0% vs 2.9%, enough to matter in a bid.

**Takeaway.** On a stabilized asset a 25 bps cap-rate move is worth more
than a 2-point occupancy drop or a 5% expense miss. Spend your diligence
time where the sensitivity is.

Tips: % value change from a cap move ≈ old cap ÷ new cap − 1 · occupancy
shocks hit NOI dollar-for-dollar on GPR · expense shocks are muted by the
expense ratio.

---

### [ ] 8. Hotel: raise ADR or push occupancy?
*sensitivity · intermediate · hotel · acquisitions / assetManagement*

**Scenario.** A 200-key select-service hotel runs 70% occupancy at a $180
ADR (RevPAR $126, rooms revenue ≈ $9.2M). Management proposes two
strategies: raise ADR $10 at flat occupancy, or hold ADR and add 5 points of
occupancy. Incremental ADR flows about 90% to GOP; incremental occupied
rooms flow about 60% after housekeeping, supplies and commissions.

| | |
|---|---|
| Keys / occ / ADR | 200 / 70% / $180 |
| Option 1 | ADR +$10 |
| Option 2 | Occupancy +5 pts |
| Flow-through | ADR 90%, occupancy 60% |

**Q: Which option adds more NOI, and by roughly how much?**

- ✅ **Option 1, by about $65k.** ADR +$10: RevPAR +$7.00 → +$511k revenue ×
  90% ≈ +$460k. Occupancy +5 pts: RevPAR +$9.00 → +$657k × 60% ≈ +$394k. The
  smaller RevPAR gain wins because rate carries almost no cost.
- ◻️ Option 2, because +$9 RevPAR beats +$7. Compares revenue, not NOI.
- ◻️ They are equal because both lift RevPAR. Flow-through differs.
- ◻️ Neither; RevPAR index is what matters. Index tells you position, not
  which lever is more profitable.

**Takeaway.** In hotels, rate and occupancy are not interchangeable. Rate
gains flow almost entirely to profit; occupancy gains carry variable cost.
Always convert RevPAR moves to NOI.

Tips: NOI impact = ΔRevPAR × keys × 365 × flow-through · rate pushes can
cost occupancy; test the elasticity · occupancy pushes add wear, so check the
FF&E reserve too.

---

### [ ] 9. How much cost overrun kills the development spread?
*sensitivity · intermediate · mixed · development*

**Scenario.** A ground-up project has a $50.0M total budget and $3.75M of
stabilized NOI, a 7.50% yield on cost. Comparable stabilized assets trade at
a 5.75% cap. Your investment committee requires at least 100 bps of
development spread.

| | |
|---|---|
| Budget / stabilized NOI | $50.0M / $3.75M |
| Yield on cost | 7.50% |
| Market cap | 5.75% |
| Minimum spread | 100 bps |

**Q: How much can total cost grow before the deal breaches the minimum
spread?**

- ✅ **About 11%, to roughly $55.6M.** Minimum YOC = 5.75% + 1.00% = 6.75%.
  Max cost = $3.75M / 6.75% ≈ $55.6M, an overrun of about $5.6M.
- ◻️ About 25%. That is the full 175 bps spread (3.75 / 5.75% = $65.2M),
  which leaves no cushion.
- ◻️ About 5%. Too conservative; the math allows twice that.
- ◻️ Unlimited, as long as the lender funds the overrun. Lender funding does
  not restore the spread; it just changes who is exposed.

**Takeaway.** Break-even cost for a required spread = stabilized NOI ÷
(market cap + spread). Know the number before the first change order.

Tips: contingency is usually 5–10% of hard cost, so an 11% total-budget
cushion is thin · run the same test on NOI falling 5% · rising market caps
eat the spread as fast as cost overruns do.

---

### [ ] 10. Can this retailer afford the renewal rent?
*lease-econ · beginner · retail · assetManagement / acquisitions*

**Scenario.** An apparel tenant in your center reports $400/SF in sales. It
pays $40/SF base rent plus $8/SF in CAM, taxes and insurance. The lease
expires in 12 months and your budget assumes a renewal at $48/SF base.
Healthy occupancy cost for apparel in this market runs 10–12% of sales.

| | |
|---|---|
| Sales | $400/SF |
| Base rent + recoveries | $40 + $8 per SF |
| Budgeted renewal | $48/SF base |
| Healthy OCR range | 10–12% |

**Q: Is the $48 renewal defensible?**

- ✅ **Not on current sales.** Today's occupancy cost is ($40 + $8) / $400 =
  12%, at the top of the band. At $48 base it becomes $56 / $400 = 14%,
  which is where apparel tenants start to close stores or demand relief.
  The bump needs sales growth to roughly $465/SF first.
- ◻️ Yes, market rent is market rent. Retail rent is capped by what the
  tenant's sales can carry, not by comps alone.
- ◻️ Yes, because 12% is still within the healthy band. The question is the
  renewal at 14%, not today's 12%.
- ◻️ No, and you should cut rent to get to 10%. Nothing says the tenant is
  struggling at 12%; the right move is to hold rent flat and share in sales
  growth.

**Takeaway.** Occupancy cost ratio = (base rent + recoveries) ÷ sales. Rent
growth on a retail renewal has to be funded by sales growth, or you are
underwriting a vacancy.

Tips: include recoveries, not just base rent, in OCR · grocery tolerates
2–4%, restaurants 6–10%, apparel 10–13% · flat sales plus rent bumps is a
slow-motion default.

---

## Coverage of the 10 phrasings

| Dimension | Added |
|---|---|
| absorption | 2 (was 1) |
| comp-selection | 2 (was 2) |
| lease-econ | 3 (was 2) |
| sensitivity | 3 (was 2) |
| retail / hotel / industrial | 2 / 1 / 2 |
| beginner difficulty | 4 (was 4) |
| development role | 2 (was 9) |
