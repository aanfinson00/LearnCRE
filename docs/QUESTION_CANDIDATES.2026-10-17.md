# Question candidates — 2026-10-17

Ten unreviewed candidate situational questions aimed at the thinnest categories in the bank. They are drafts: **not registered** in `src/quiz/situational/index.ts` and not yet in `SituationalCase` shape. Approve or edit, then convert.

## Why these categories

Coverage counts come from `category:` in `src/quiz/situational/*.ts`. The Supabase `learncre` project was paused (INACTIVE) on this run, so approved community-submission counts could not be read.

| Category | Cases today | Candidates below |
|---|---|---|
| absorption | 1 | 3 |
| comp-selection | 2 | 2 |
| lease-econ | 2 | 3 |
| sensitivity | 2 | 2 |
| (for reference) deal-process | 21 | 0 |

Each candidate marks the best option with ✅. Math was hand-checked.

---

### 1. Lease-up timeline to stabilization — *absorption · intermediate · multifamily · development, acquisitions*
A new 240-unit community opens at 0% leased. Leasing is running 12 units/month. The business plan defines stabilization as 93% occupancy.

**Q: Roughly how long until the property stabilizes?**
- ✅ **A.** About 19 months. 93% × 240 = 223.2, so ~224 units ÷ 12/month ≈ 18.7 months.
- **B.** 20 months. Divides all 240 units by 12 and ignores that the target is 93%, not 100%.
- **C.** About 23 months. Adds an arbitrary 20% cushion before doing the math.
- **D.** Cannot be estimated until rent growth is known. Absorption pace was given, so compute.

**Takeaway:** Stabilization is a % target, not a full building. Compute units-to-target ÷ pace, then stress the pace.

### 2. Does vacancy rise or fall? — *absorption · intermediate · industrial · acquisitions, portfolioMgmt*
An industrial submarket has 50M SF of inventory at 6.0% vacancy (3.0M SF vacant). 2.5M SF of speculative space delivers over the next 12 months, all vacant on delivery. Forecast net absorption is 1.5M SF.

**Q: Where does vacancy land in 12 months?**
- ✅ **A.** About 7.6%. Vacant = 3.0 + 2.5 − 1.5 = 4.0M SF on 52.5M SF of inventory.
- **B.** About 3.0%. Subtracts absorption from existing vacancy and ignores new supply.
- **C.** Stays at 6.0%. Assumes supply and demand offset without checking the numbers (2.5M delivered vs 1.5M absorbed).
- **D.** About 10.5%. Adds new supply to vacancy but ignores absorption (5.5M ÷ 52.5M).

**Takeaway:** Net absorption only matters relative to deliveries. Add supply to both numerator and denominator.

### 3. Gross vs. net absorption in lease-up — *absorption · intermediate · multifamily · asset management, acquisitions*
A 150-unit lease-up signs 15 new leases per month but loses 5 residents per month to move-outs and transfers. The plan stabilizes at 93%.

**Q: How long until stabilization?**
- ✅ **A.** About 14 months. 93% × 150 = 139.5, so ~140 units ÷ net 10/month = 14 months.
- **B.** About 9–10 months. Uses gross leasing (140 ÷ 15 ≈ 9.3) and ignores churn.
- **C.** 15 months. Divides all 150 units by net absorption, ignoring that the target is 93%.
- **D.** About 7 months. Halves the timeline on the assumption that churn stops after move-in season.

**Takeaway:** Pace for lease-up math is net absorption. Churn is a drag from the first month.

### 4. Choosing the best sale comp — *comp-selection · intermediate · office · acquisitions*
Subject: 1985 Class B suburban office, 100,000 SF, 70% leased. You have four candidates:
- (1) 1987 Class B, 90,000 SF, 72% leased, same submarket, sold 14 months ago.
- (2) 2019 Class A trophy, 100% leased, sold last month.
- (3) 1986 Class B, 100% leased, different metro submarket, sale-leaseback.
- (4) A blended average of every office sale in the metro.

**Q: Which is the primary comp?**
- ✅ **A.** Comp 1. Closest in vintage, class, size, occupancy and location. Apply a time adjustment for the 14 months.
- **B.** Comp 2. Most recent, but a different class and fully leased product.
- **C.** Comp 3. Right vintage and class, but a sale-leaseback with a different submarket and full occupancy.
- **D.** Comp 4. Averaging dilutes the specific risk profile of the subject.

**Takeaway:** Rank comps by similarity of risk, then adjust for time. Recency is the cheapest thing to adjust.

### 5. Asking rent vs. effective rent comps — *comp-selection · intermediate · office · asset management, acquisitions*
Two competing lease comps for a 20,000 SF suite:
- Comp A: $30.00 NNN, 10-year term, 12 months free.
- Comp B: $28.00 NNN, 5-year term, 3 months free.

**Q: Which comp supports the higher market rent after concessions, and by roughly how much?**
- ✅ **A.** Comp A, by about $0.40/SF. Effective rents are $30 × 108/120 = $27.00 vs $28 × 57/60 = $26.60.
- **B.** Comp A, by about $2.00/SF. Compares face rents only.
- **C.** Comp B, because its concession package is shorter.
- **D.** They are equal because both are NNN.

**Takeaway:** Convert comps to effective rent before comparing. A $2 headline gap can shrink to under $0.50.

### 6. Net effective rent with free rent, TI and commissions — *lease-econ · advanced · office · asset management, acquisitions*
A 5-year lease: $36.00/SF NNN, 4 months free rent, $30/SF TI, leasing commission of 6% of rent actually paid.

**Q: What is the approximate net effective rent per year?**
- ✅ **A.** About $25.6/SF. Rent paid: $3.00 × 56 months = $168. Commission 6% ≈ $10.08. Net = 168 − 30 − 10.08 = $127.92 ÷ 5 years.
- **B.** $33.60/SF. Deducts free rent only (168 ÷ 5).
- **C.** $30.00/SF. Amortizes TI alone ($36 − 30 ÷ 5).
- **D.** $36.00/SF. Face rent.

**Takeaway:** Net effective rent nets out free rent, TI and commissions across the full term.

### 7. Blended TI on a rollover — *lease-econ · intermediate · office · asset management, mortgageUw*
A tenant rolls in 12 months. Renewal probability is 70%. Renewal TI is $10/SF; new-tenant TI is $40/SF; new-tenant downtime is 9 months.

**Q: What probability-weighted TI and downtime should the model carry?**
- ✅ **A.** $19/SF TI and 2.7 months downtime. TI = 0.7 × 10 + 0.3 × 40; downtime = 0.3 × 9.
- **B.** $25/SF and 4.5 months. Simple averages that ignore the 70/30 weighting.
- **C.** $10/SF and 0 months. Assumes the renewal case.
- **D.** $40/SF and 9 months. Assumes the conservative case.

**Takeaway:** Probability-weight rollover assumptions rather than picking a single scenario.

### 8. Percentage rent overage — *lease-econ · intermediate · retail · asset management, acquisitions*
A 5,000 SF retail tenant pays $30/SF base rent ($150,000/year) plus 6% percentage rent above a natural breakpoint. Annual sales are $3.2M.

**Q: What percentage rent is owed?**
- ✅ **A.** $42,000. Breakpoint = $150,000 ÷ 6% = $2.5M; overage = 6% × ($3.2M − $2.5M).
- **B.** $192,000. Applies 6% to all sales.
- **C.** $0. Argues base rent already covers 6% of sales.
- **D.** $183,000. Applies 6% to sales minus base rent ($3.05M).

**Takeaway:** The natural breakpoint is base rent ÷ percentage rate. Only sales above it generate overage.

### 9. Exit cap rate sensitivity — *sensitivity · intermediate · all · acquisitions, portfolioMgmt*
Year-6 forward NOI is $1.2M. The base-case exit cap is 6.0% (sale price $20.0M). You stress it +50 bps to 6.5%.

**Q: How much does the sale price fall?**
- ✅ **A.** About 7.7%, or $1.54M (price falls to ~$18.46M).
- **B.** About 8.3%. Takes 50 ÷ 600 and treats it as the price change.
- **C.** About 0.5%. Reads bps as percent of value.
- **D.** About 5.0%. A rule-of-thumb figure with no calculation.

**Takeaway:** Price = NOI ÷ cap, so price moves with the inverse of the cap rate and the effect is convex.

### 10. Leverage and equity sensitivity — *sensitivity · beginner · all · acquisitions, portfolioMgmt*
A property is purchased for $100M with $65M of debt ($35M equity). Values fall 10%.

**Q: What happens to the equity value?**
- ✅ **A.** It falls about 28.6%, from $35M to $25M.
- **B.** It falls 10%.
- **C.** It falls about 15.4%. Divides the loss by the debt.
- **D.** It falls about 6.5%. Multiplies the 10% loss by the 65% LTV.

**Takeaway:** Equity absorbs the whole loss. A 10% value drop at 65% LTV costs ~29% of equity.

---

## Next steps
- Approve, edit or drop each item; approved items get converted to `SituationalCase` files with `roles`, `tips` and per-option explanations.
- Once the `learncre` Supabase project is resumed, re-run this routine against approved-submission counts.
