# Question candidates — 2026-10-31

**Why these areas:** The Supabase `learncre` project is paused, so approval counts could not be read. As a proxy, this uses the situational bank's category counts in `src/quiz/situational/`. The thinnest are `absorption` (1), `comp-selection` (2), `lease-econ` (2) and `sensitivity` (2), against `deal-process` (21) and `document-literacy` (13).

**Status:** Drafts only. Nothing here is registered in `src/quiz/situational/index.ts`, so nothing ships until reviewed. Approve one and it gets built to the `SituationalCase` shape. Each draft lists the best answer first, followed by the plausible wrong answers. Run-time order is shuffled.

---

## Absorption (1 existing → 3 candidates)

### 1. Pre-leasing vs. market absorption
*absorption · intermediate · multifamily · development*
**Scenario:** A 300-unit lease-up is 40% pre-leased 60 days before delivery. The submarket absorbs about 400 units a month across 5 competing lease-ups. **Q:** What is the better way to forecast your stabilization date?
- ✅ Estimate your capture share (about 1/5 of 400 = about 80/mo, adjusted for product quality and concessions), then add that to your pre-lease base.
- ◻️ Assume the full 400 units/mo flows to you because you are pre-leased.
- ◻️ Use the 40% pre-lease pace and extrapolate it linearly.
- ◻️ Ignore competing lease-ups; they serve different renters.

**Takeaway:** Market absorption is shared. Forecast your capture rate, not the market total.

### 2. Absorption slowing as supply peaks
*absorption · advanced · multifamily · acquisitions*
**Scenario:** Trailing 12-month absorption was 1,800 units. The last two quarters ran at 350 and 300 per quarter, while 2,200 new units are scheduled over the next 12 months. **Q:** Which absorption assumption is most defensible?
- ✅ Use the recent run-rate (about 1,300/yr or less) and show that supply exceeds demand, so occupancy drifts down.
- ◻️ Use the trailing 12 months (1,800).
- ◻️ Assume absorption rises to meet supply.
- ◻️ Use the 5-year average.

**Takeaway:** Weight the most recent absorption pace when it is trending, and pair it with the supply pipeline.

### 3. Industrial spec absorption
*absorption · intermediate · industrial · development*
**Scenario:** A 500k SF spec building delivers into a submarket with 6.5% vacancy. Net absorption is 1.2M SF a year and 1.8M SF is under construction. **Q:** What is the key risk to your lease-up timeline?
- ✅ The pipeline exceeds annual absorption, so your building competes with about 1.5 years of supply for the same tenants.
- ◻️ The 6.5% vacancy rate alone makes lease-up safe.
- ◻️ Absorption is irrelevant for big-box industrial.
- ◻️ Only rent growth matters.

**Takeaway:** Compare pipeline to absorption (months of supply), not vacancy alone.

---

## Comp selection (2 existing → 2 candidates)

### 4. Comp set that is too broad
*comp-selection · intermediate · multifamily · acquisitions*
**Scenario:** A broker's rent comps include four 2020-vintage Class A properties, but the subject is a 1985 value-add asset with unrenovated units. **Q:** What should you do with the comp set?
- ✅ Rebuild it with 1980s-vintage assets (renovated and unrenovated) and use the Class A comps only as a ceiling on post-renovation rents.
- ◻️ Use the broker's set because it is the most recent.
- ◻️ Average all comps for a larger sample.
- ◻️ Discount Class A rents by a flat 10%.

**Takeaway:** Match the comp to the asset's current state. Aspirational comps are a ceiling, not a basis.

### 5. Sale comps across rate regimes
*comp-selection · advanced · office · portfolio management*
**Scenario:** Your best-fit sale comp traded 14 months ago, before a 150 bps rise in the 10-year Treasury. A less similar building traded last month. **Q:** How should you weigh them?
- ✅ Weight the recent trade for the pricing level and the older comp for the physical and tenancy fit, with a rate-based adjustment to the older cap rate.
- ◻️ Use only the older comp because it is the closest match.
- ◻️ Use only the recent comp.
- ◻️ Average the two cap rates.

**Takeaway:** Recency and similarity trade off. Adjust the stale comp rather than discarding either.

---

## Lease economics (2 existing → 2 candidates)

### 6. Free rent vs. higher TI
*lease-econ · intermediate · office · asset management*
**Scenario:** A tenant offers either (a) 6 months free rent on a 5-year, $30/SF NNN lease or (b) a $20/SF higher TI package. **Q:** How do you compare them?
- ✅ Compare the net effective rent of each, including cost of capital, and consider which reduces landlord risk if the tenant defaults.
- ◻️ Choose the higher face rent without discounting.
- ◻️ Always pick TI because it is amortized.
- ◻️ They are always equivalent.

**Takeaway:** Compare on a net effective basis. Free rent is not recoverable, while TI is partly retained in the improvements.

### 7. Renewal probability and downtime
*lease-econ · advanced · retail · acquisitions*
**Scenario:** An in-line retail tenant expires in 18 months at $22/SF, with market rent at $26/SF. Historical renewal probability is 65%, new-tenant downtime is 9 months, and TI is $15/SF for a new tenant versus $5/SF for a renewal. **Q:** What is the right rollover underwriting approach?
- ✅ Use a probability-weighted blend: 65% renewal, 35% new-tenant (downtime, TI, leasing commissions), applied to market rent.
- ◻️ Assume 100% renewal at market.
- ◻️ Assume the tenant leaves and use full downtime.
- ◻️ Hold rent flat at $22.

**Takeaway:** Blend renewal and new-tenant economics instead of picking the best case.

---

## Sensitivity (2 existing → 2 candidates)

### 8. Which assumption moves value most?
*sensitivity · intermediate · multifamily · acquisitions*
**Scenario:** A deal is at a 5.5% exit cap, 3% rent growth, 5-year hold. A 50 bps move in exit cap changes the levered IRR by 220 bps, a 100 bps move in rent growth by 90 bps, and a 100 bps move in the interest rate by 60 bps. **Q:** Where should diligence time go?
- ✅ Exit cap, because per unit of plausible variation it has the largest IRR impact and the least certainty.
- ◻️ Rent growth because it is the most visible assumption.
- ◻️ Interest rate because it is fixed at closing.
- ◻️ All equally.

**Takeaway:** Prioritise by sensitivity multiplied by uncertainty, not by visibility.

### 9. Two-variable downside
*sensitivity · advanced · industrial · portfolio management*
**Scenario:** The base case is a 6.0% exit cap and 4% rent growth. A downside case needs both: exit cap +75 bps and rent growth −200 bps. **Q:** Why run the two together rather than separately?
- ✅ Cap rates and rent growth are correlated in downturns, so the combined shock is more realistic than the sum of independent shocks.
- ◻️ Combined shocks are always smaller than the sum.
- ◻️ Single-variable tests are sufficient.
- ◻️ Lenders require only one variable at a time.

**Takeaway:** Stress correlated variables together.

### 10. Break-even as a sensitivity
*sensitivity · beginner · office · mortgage underwriting*
**Scenario:** A loan has a 1.30x DSCR at 90% occupancy. Operating expenses are fixed at 55% of full-occupancy revenue. **Q:** Why compute break-even occupancy?
- ✅ It shows how far occupancy can fall before DSCR hits 1.0x, a direct measure of cushion for the lender.
- ◻️ It replaces the DSCR test.
- ◻️ It only matters at stabilization.
- ◻️ It shows the exit cap rate.

**Takeaway:** Break-even occupancy converts DSCR into a margin of safety.

---

## Notes for the reviewer
- Numeric details in drafts 2, 3, 6, 7 and 8 are illustrative. Each needs a worked check before it ships, as `absorptionTiming.ts` has.
- Per `docs/agent-instructions.md`, approved drafts need a `roles` tag, 3–4 options with an explanation per option, a takeaway, 3 tips and registration in `index.ts`.
- To get real approval counts, resume the `learncre` Supabase project and query `question_submissions` grouped by `status`, `role_hint` and `kind_hint`.
