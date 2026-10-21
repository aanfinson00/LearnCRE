# Question candidates — 2026-10-21

Daily question-generator run. **Not registered in the app** — these are drafts for review; accepted ones should be converted to `SituationalCase` files under `src/quiz/situational/` and registered in `index.ts` (see `docs/agent-instructions.md`).

## Why these areas

The Supabase `learncre` project (where `question_submissions.status = 'approved'` lives) is **INACTIVE/paused**, so approved counts could not be queried and I did not restore it unasked. As a proxy, coverage was measured from the situational cases currently in the repo (72 files):

| Dimension | Thinnest buckets (count) |
|---|---|
| Category | absorption (1), comp-selection (2), lease-econ (2), sensitivity (2) |
| Asset class | hotel (1), retail (2), industrial (3) |
| Difficulty | beginner (4) vs. 34 advanced |

Candidates below target those buckets. Option A is the best answer in every draft (shuffled at runtime). Math was checked by hand.

---

### 1. Absorbing a speculative delivery — industrial
`absorption · intermediate · industrial · acquisitions/development`

**Scenario:** A submarket has 10.0M SF of industrial inventory, 92% occupied. 1.2M SF is delivering next quarter, 40% pre-leased (tenants take occupancy at delivery). Trailing net absorption is 600k SF/yr.
**Q:** What is submarket vacancy right after delivery, and roughly how long to return to 92% occupancy?
- ✅ **A.** ~13.6% vacancy; about 12–13 months. *(Base 11.2M SF; occupied 9.2M + 0.48M = 9.68M → 86.4% occupied. 92% of 11.2M = 10.304M; gap 624k ÷ 600k/yr ≈ 1.04 yrs.)*
- ◻️ **B.** ~17.9% vacancy; about 2 years. *(Ignores the pre-leased space.)*
- ◻️ **C.** 8% vacancy; no change. *(Ignores that new supply enlarges the denominator.)*
- ◻️ **D.** ~13.6% vacancy; about 3 months. *(Confuses quarterly delivery with annual absorption pace.)*

### 2. Restoring occupancy after a delivery wave — multifamily
`absorption · beginner · multifamily · acquisitions`

**Scenario:** 6,000 units, 93% occupied. 450 new units deliver; trailing absorption is 25 units/month.
**Q:** About how long to restore 93% occupancy?
- ✅ **A.** ~17 months. *(Base 6,450; 93% = 5,998.5; occupied 5,580; gap 418.5 ÷ 25 ≈ 16.7.)*
- ◻️ **B.** 18 months. *(450 ÷ 25 — forgets the new units only need to reach 93%, not 100%.)*
- ◻️ **C.** Already there — occupancy is 93%. *(Occupancy is measured against the enlarged base.)*
- ◻️ **D.** Cannot be estimated without rent growth. *(Pace is given; compute.)*

### 3. Cap rate vs NOI shock — sensitivity
`sensitivity · intermediate · mixed · acquisitions/portfolioMgmt`

**Scenario:** Year-5 NOI is $2.4M and the exit cap is 6.0% (exit value $40.0M). You test two downside cases: exit cap +50 bps, or NOI −5%.
**Q:** Which hits exit value harder?
- ✅ **A.** The cap move: 6.5% → $36.9M (−7.7%) vs −5% for NOI.
- ◻️ **B.** NOI −5%: it hits every year's cash flow too. *(Real, but exit-value comparison favors the cap move; combined effect is what matters.)*
- ◻️ **C.** Equal — 50 bps ≈ 5%. *(Mixes bps with percent.)*
- ◻️ **D.** Cap move only matters above 8%. *(Sensitivity is larger at lower caps: at 5% a +50 bps move is −9.1%.)*

### 4. Leverage amplifies value declines — sensitivity
`sensitivity · beginner · mixed · mortgageUw/acquisitions`

**Scenario:** Asset bought at $100M with a 65% LTV loan ($65M). Value falls 10%.
**Q:** What happens to equity?
- ✅ **A.** Down ~28.6% ($35M → $25M).
- ◻️ **B.** Down 10%. *(Ignores leverage.)*
- ◻️ **C.** Down 6.5%. *(Multiplies by LTV instead of dividing by equity.)*
- ◻️ **D.** Down 15.4%. *(Divides loss by debt: $10M ÷ $65M.)*

### 5. Net effective rent — lease-econ
`lease-econ · intermediate · office · assetManagement/acquisitions`

**Scenario:** 10-year office lease, $30.00/SF face rent, 6 months free rent, $40/SF TI.
**Q:** Simple (undiscounted) net effective rent per SF per year?
- ✅ **A.** $24.50. *($30 × 9.5 = $285 − $40 = $245 ÷ 10.)*
- ◻️ **B.** $28.50. *(Free rent only; ignores TI.)*
- ◻️ **C.** $26.00. *(TI only; ignores free rent.)*
- ◻️ **D.** $30.00. *(Face rent.)*

### 6. Percentage rent above the breakpoint — lease-econ
`lease-econ · intermediate · retail · assetManagement`

**Scenario:** Retail tenant pays $40/SF base rent plus 5% of sales above a natural breakpoint. Sales are $1,000/SF.
**Q:** Percentage rent owed per SF?
- ✅ **A.** $10/SF. *(Breakpoint = $40 ÷ 5% = $800; 5% × $200 = $10.)*
- ◻️ **B.** $50/SF. *(5% of all sales.)*
- ◻️ **C.** $0. *(Base rent already exceeds 5% of... — confuses breakpoint.)*
- ◻️ **D.** $2/SF. *(Applies 1% instead of 5%.)*

### 7. Choosing the right comp — comp-selection
`comp-selection · intermediate · multifamily · acquisitions`

**Scenario:** Subject is a 300-unit 1990s Class B suburban garden community. Available sales: (1) 2022 Class A lease-up, 2 mi away; (2) 1988 Class B garden, 2 mi away, sold 6 months ago; (3) 1995 Class B garden, same submarket, sold 3 years ago; (4) Class A high-rise, downtown, last month.
**Q:** Which anchors your cap rate?
- ✅ **A.** #2 — same product/quality/location, recent; adjust for age and minor rent differences.
- ◻️ **B.** #4 — most recent trade. *(Recency can't offset a different product type.)*
- ◻️ **C.** #1 — nearest and newest. *(Lease-up pricing reflects a different risk profile.)*
- ◻️ **D.** #3 — same submarket. *(Stale; rates have moved. Use as a time-adjusted cross-check.)*

### 8. RevPAR can fall while ADR rises — hotel
`diagnostic · intermediate · hotel · acquisitions/assetManagement`

**Scenario:** Hotel runs $180 ADR at 70% occupancy. Next year ADR rises 5% and occupancy drops 4 points to 66%.
**Q:** What happens to RevPAR?
- ✅ **A.** Falls ~1% ($126.00 → $124.74).
- ◻️ **B.** Rises 5%. *(ADR only.)*
- ◻️ **C.** Falls ~5.7%. *(Occupancy only.)*
- ◻️ **D.** Rises ~1%. *(Sign error.)*

### 9. Anchor goes dark: co-tenancy hit — retail
`risk · advanced · retail · acquisitions/assetManagement`

**Scenario:** Anchor vacates. 60,000 SF of in-line tenants at $30/SF have co-tenancy clauses cutting rent 50% after 6 months dark. The center is valued at a 7.0% cap.
**Q:** Approximate value at risk if all clauses trigger?
- ✅ **A.** ~$12.9M. *(60,000 × $30 × 50% = $900k NOI ÷ 7% ≈ $12.86M.)*
- ◻️ **B.** $900k. *(Forgets to capitalize.)*
- ◻️ **C.** ~$25.7M. *(Applies full rent loss, not 50%.)*
- ◻️ **D.** $0 — in-line tenants are contractually obligated. *(Co-tenancy is a contractual rent remedy.)*

### 10. Yield on cost after roll — industrial
`pricing · intermediate · industrial · acquisitions`

**Scenario:** 100,000 SF NNN industrial bought at 5.0% cap on in-place $6.00/SF ($12.0M). Lease expires in 24 months; market rent $8.50/SF. Re-leasing costs $3/SF.
**Q:** Stabilized yield on total cost after roll?
- ✅ **A.** ~6.9%. *(NOI $850k ÷ ($12.0M + $0.3M) = 6.91%.)*
- ◻️ **B.** ~7.1%. *(Ignores re-leasing cost.)*
- ◻️ **C.** 5.0%. *(Ignores mark-to-market.)*
- ◻️ **D.** ~8.5%. *(Confuses rent per SF with a yield.)*
