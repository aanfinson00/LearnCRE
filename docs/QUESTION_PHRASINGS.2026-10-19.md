# Question-bank phrasings — 2026-10-19

**Why these areas:** the Supabase `learncre` project is paused, so approved-submission counts couldn't be read. Coverage was measured from the shipped situational bank instead (72 cases). Thinnest categories: `absorption` (1), `comp-selection` (2), `lease-econ` (2), `sensitivity` (2), against `deal-process` (21) and `document-literacy` (13).

These are **drafts for review**, not registered in any `index.ts`. Each is a candidate `SituationalCase` (one best option, 3 plausible distractors). Numbers are illustrative; math is checked inline.

---

## Absorption (3)

### 1. Absorption — "months of supply" read
*absorption · intermediate · multifamily · acquisitions*
A submarket has 600 vacant units, 450 under construction delivering within 12 months, and trailing-12-month absorption of 360 units (30/mo). A sponsor says "only 20 months of supply, we're fine."
**Q:** What is wrong with that read?
- ✅ It ignores the pipeline: (600 + 450) ÷ 30 = 35 months of supply, not 20.
- ◻️ Absorption should be annualized from the last quarter only.
- ◻️ Months of supply is meaningless for multifamily.
- ◻️ Under-construction units shouldn't count until permitted.

### 2. Absorption — lease-up pace from comps
*absorption · beginner · multifamily · development*
A 240-unit new build must reach 93% before the construction loan converts. Two comparable lease-ups averaged 18 units/month at delivery.
**Q:** Roughly how long to reach 93%?
- ✅ ~12.4 months: 240 × 0.93 = 223 ÷ 18.
- ◻️ ~13.3 months: dividing 240 by 18 and ignoring the 93% target.
- ◻️ ~6 months: assuming 2× comp velocity because the product is newer.
- ◻️ Cannot be estimated without rent growth.

### 3. Absorption — gross vs. net
*absorption · intermediate · industrial · asset management*
Gross absorption in a market was 4.2M SF last quarter but net absorption was 0.6M SF.
**Q:** What does the gap most likely mean?
- ✅ Significant move-outs/givebacks offset new occupancy; demand is churning, not growing.
- ◻️ Data error — net can't be lower than gross.
- ◻️ New supply was absorbed ahead of schedule.
- ◻️ Landlords are raising rents faster than tenants can pay.

## Comp selection (2)

### 4. Comps — which sale to throw out
*comp-selection · intermediate · office · acquisitions*
Four comps at 6.0%, 6.2%, 6.3%, and 8.5%. The 8.5% was a 9-month-old sale of a half-vacant building from a distressed seller.
**Q:** How should you treat the 8.5% trade?
- ✅ Down-weight or exclude it; it reflects occupancy and seller motivation, not market pricing for stabilized product.
- ◻️ Average all four for objectivity.
- ◻️ Use it alone because it's the most conservative.
- ◻️ Use only the lowest cap since it implies the highest value.

### 5. Comps — adjusting for time
*comp-selection · advanced · retail · portfolio management*
A comp traded 14 months ago at $310/SF. Market cap rates have since widened ~40 bps; NOI growth was flat.
**Q:** Direction and logic of the time adjustment?
- ✅ Adjust the price per SF downward; wider cap rates on flat NOI imply lower value today.
- ◻️ Adjust upward for inflation.
- ◻️ No adjustment; $/SF comps are timeless.
- ◻️ Adjust upward since rates fall eventually.

## Lease economics (3)

### 6. Lease economics — net effective rent
*lease-econ · intermediate · office · asset management*
A 5-year lease at $40/SF gross-up flat, with 6 months free rent and a $50/SF TI allowance.
**Q:** What best describes the economics versus the face rent?
- ✅ Effective rent is well below $40: free rent and TI are amortized against the term and dilute it.
- ◻️ Effective rent equals face rent; concessions are one-time.
- ◻️ Effective rent is above face because TI improves the asset.
- ◻️ Only free rent matters; TI is a tenant cost.

### 7. Lease economics — renewal vs. new lease
*lease-econ · intermediate · industrial · asset management*
Tenant renewal: 4% lower rent, $2/SF TI, no downtime. Alternative: re-let at market, 6 months downtime, 5% commission, $8/SF TI.
**Q:** Which framing favors the renewal?
- ✅ Compare net effective rent after downtime, commissions and TI, not face rent alone.
- ◻️ Always take the highest face rent.
- ◻️ Always renew to avoid vacancy.
- ◻️ Ignore commissions as they're paid once.

### 8. Lease economics — expense stops
*lease-econ · advanced · office · mortgage underwriting*
A tenant's lease has a 2024 base-year expense stop; opex has since risen 9%.
**Q:** Who bears the increase?
- ✅ The tenant pays its pro-rata share of increases over the base year; the landlord bears the base amount.
- ◻️ Landlord absorbs all increases.
- ◻️ Tenant pays all expenses, as it's a triple-net lease.
- ◻️ Increases are split 50/50 by default.

## Sensitivity (2)

### 9. Sensitivity — exit cap vs. NOI growth
*sensitivity · intermediate · multifamily · acquisitions*
Base case: 5.0% exit cap, 3% NOI growth, 18% IRR. Moving the exit cap +50 bps drops IRR to 14%. Moving NOI growth −100 bps drops it to 16.5%.
**Q:** Which assumption should get more diligence?
- ✅ Exit cap, because it moves returns more per unit of plausible error.
- ◻️ NOI growth, since it compounds annually.
- ◻️ Neither, base case is enough.
- ◻️ Whichever the broker emphasizes.

### 10. Sensitivity — breakeven occupancy
*sensitivity · advanced · multifamily · mortgage underwriting*
Gross potential rent is $5.0M, opex $2.2M, and debt service $2.1M.
**Q:** What's the approximate breakeven occupancy?
- ✅ ~86%: (2.2 + 2.1) ÷ 5.0.
- ◻️ ~42%: opex ÷ GPR.
- ◻️ ~58%: debt service ÷ GPR plus a cushion.
- ◻️ ~100%: any vacancy breaks the deal.
