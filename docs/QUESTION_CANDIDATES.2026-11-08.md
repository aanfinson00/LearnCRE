# Question candidates — 2026-11-08

Ten new situational-case phrasings aimed at the thinnest areas of the shipped bank
(`src/quiz/situational/`, 72 cases). They are drafts for vetting, not registered in code.

## Coverage gaps this batch targets

| Dimension | Thin spots (shipped case count) |
|---|---|
| Role | `development` (9 of ~124 role tags) vs `acquisitions` (40) |
| Asset class | `hotel` (1), `retail` (2), `industrial` (3) |
| Category | `absorption` (1), `comp-selection` (2), `lease-econ` (2), `sensitivity` (2) |

Note: the approved/integrated community submissions live in the Supabase `question_submissions`
table, which this scheduled run can't read. Counts above are from shipped repo content.
Re-weight the next batch once approved-submission counts are available.

Format per item: `category · assetClass · roles · difficulty`, scenario, question, options (★ = best), takeaway.
All math was checked by hand.

---

### 1. Higher RevPAR, lower margin?
`diagnostic · hotel · acquisitions, assetManagement · intermediate`

Hotel A runs a $200 ADR at 62% occupancy. Hotel B, a comparable competitor, runs a $160 ADR at 80% occupancy.

**Q:** Which statement best compares the two?
- ★ B has the higher RevPAR ($128 vs. $124), but A likely earns the higher GOP margin because fewer occupied rooms means lower variable cost per available room.
- A is better because its ADR is 25% higher.
- They are equal because ADR × occupancy nets out on a per-key basis.
- B is better on every metric because occupancy is the only driver of hotel profit.

**Takeaway:** RevPAR = ADR × occupancy. It ignores the cost of servicing occupied rooms, so compare GOP/NOI margin as well.

### 2. The 8% cap that isn't
`pricing · hotel · acquisitions · intermediate`

A hotel is marketed at $36M with $3.0M of NOI before reserves. Revenue is $20M and the brand requires a 4% FF&E reserve.

**Q:** What is the cap rate after the reserve?
- ★ About 6.1% ($2.2M ÷ $36M); the headline 8.3% ignores the reserve.
- 8.3%, because reserves are a below-the-line capital item.
- 7.2%, splitting the difference.
- 4.0%, the reserve rate.

**Takeaway:** For hotels, underwrite NOI after FF&E reserve. Check whether comps are quoted before or after.

### 3. Percentage rent overage
`lease-econ · retail · acquisitions, assetManagement · beginner`

An inline tenant pays $200,000 base rent plus 5% of gross sales above the natural breakpoint. Sales were $4.5M.

**Q:** What percentage rent is owed?
- ★ $25,000. The breakpoint is $4.0M ($200k ÷ 5%), and the $0.5M of sales above it × 5% is $25k.
- $225,000, which is 5% of total sales.
- $0, because base rent already exceeds 5% of sales.
- $12,500, because only half the overage is shared.

**Takeaway:** Natural breakpoint = base rent ÷ percentage rate. Percentage rent only applies above it.

### 4. The anchor goes dark
`risk · retail · assetManagement, mortgageUw · advanced`

A grocery-anchored center has inline tenants with co-tenancy clauses. These let them pay 50% of base rent if the anchor goes dark for more than 6 months. The anchor has just announced it will vacate.

**Q:** How should you reflect this in underwriting?
- ★ Treat inline rent as at risk: haircut it, model re-tenanting downtime for the anchor box, and check which tenants have termination rights.
- Leave NOI unchanged. Co-tenancy only matters if tenants actually invoke it.
- Only the anchor's own rent matters, so remove just that income.
- Apply a 25 bps cap-rate bump and keep NOI.

**Takeaway:** Co-tenancy clauses link income across tenants. A single vacancy can reprice the whole rent roll.

### 5. Mark-to-market on an industrial roll
`lease-econ · industrial · acquisitions · intermediate`

A 100,000 SF warehouse leases at $6.50/SF NNN, and the lease expires in 18 months. Market rent is $8.50/SF today and is growing 3% a year.

**Q:** Roughly what is the annual NOI uplift at re-leasing, before downtime and TI?
- ★ About $240k. Market at expiry is about $8.89/SF, which is $2.39/SF above in-place.
- $200k, from today's $2.00 spread with no growth.
- $255k, from two full years of growth.
- $850k, which is the entire market rent.

**Takeaway:** Grow market rent to the expiry date, not to today or to a whole-year step. Then net out downtime, TI and leasing commissions.

### 6. Does the development pencil?
`pricing · mixed · development, acquisitions · intermediate`

Total project cost is $50M and stabilized NOI is $3.25M. Comparable stabilized assets trade at a 5.25% cap.

**Q:** What is the development spread and the profit margin on cost?
- ★ Yield on cost of 6.5% is 125 bps over market cap. Stabilized value of about $61.9M gives roughly a 24% margin.
- 6.5% yield and 5.25% cap means a 6.5% margin on cost.
- 125 bps of spread means a $1.25M profit.
- Yield on cost is irrelevant. Only the loan constant matters.

**Takeaway:** Yield on cost ÷ market cap drives margin. A 100–150 bps spread is a common hurdle.

### 7. Cap expansion on the exit
`sensitivity · office · acquisitions, portfolioMgmt · intermediate`

Stabilized NOI is $2.0M and you underwrite exit at a 5.0% cap, which implies $40M.

**Q:** What happens to exit value if the cap rate expands 50 bps?
- ★ Value falls about 9% to about $36.4M ($2.0M ÷ 5.5%).
- Value falls 10% because 50 bps is 10% of 5.0%.
- Value falls about 1% because the change is only 50 bps.
- Value is unchanged if NOI holds.

**Takeaway:** ΔValue ≈ −Δcap ÷ new cap. Lower starting caps are more sensitive per bp.

### 8. Interest reserve sizing
`deal-process · multifamily · development, mortgageUw · intermediate`

A $30M construction loan draws evenly over a 24-month build and carries an 8% rate.

**Q:** What is a reasonable interest-reserve estimate?
- ★ About $2.4M, using a 50% average balance: $30M × 50% × 8% × 2 years.
- $4.8M, which is interest on the full balance for 2 years.
- $1.2M, which is one year of average-balance interest.
- $0, because interest is paid from operations.

**Takeaway:** Average outstanding balance, not commitment, drives interest during the draw. Also size for lease-up beyond completion.

### 9. Net effective rent with concessions
`lease-econ · multifamily · assetManagement, development · beginner`

Face rent is $2,000/month on a 12-month lease with one month free.

**Q:** What is the net effective rent?
- ★ About $1,833/month ($24,000 − $2,000) ÷ 12.
- $2,000, because concessions are a one-time item.
- $1,750, since the free month is subtracted twice.
- $1,900, which is a 5% discount.

**Takeaway:** Net effective = total paid ÷ lease months. Concessions in lease-up inflate headline rent.

### 10. Choosing comps for a lease-up
`comp-selection · multifamily · development, acquisitions · advanced`

Your subject is a new 300-unit lease-up. Comp set options: (i) five stabilized 2005-vintage properties 0.5 mi away, (ii) three recent lease-ups within 2 mi, (iii) a 2023 trade in another metro.

**Q:** Which set best supports absorption and rent assumptions?
- ★ The recent lease-ups. Absorption and concession behavior depends on product age and phase, then adjust for location.
- The stabilized 2005 vintage, because proximity dominates.
- The other-metro trade because it is the newest data.
- Blend all three equally to avoid bias.

**Takeaway:** Match comps on lifecycle stage and product quality for absorption. Use proximity second.
