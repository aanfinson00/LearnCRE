# Question candidates — 2026-10-07

Ten candidate situational questions aimed at the thinnest areas of the bank. These are **drafts for review** and are not registered in `src/quiz/situational/index.ts`, so none of them are live.

## Gap analysis

The `question_submissions` table in the learncre Supabase project is empty (0 pending, 0 approved), so there is no approval signal to go on. This analysis counts the 72 situational cases in the repo by category:

| Category | Cases | Note |
|---|---|---|
| deal-process | 21 | well covered |
| document-literacy | 13 | well covered |
| investment-thesis | 9 | ok |
| diagnostic / pricing / risk | 7 each | ok |
| **lease-econ** | 2 | thin → candidates 6–8 |
| **sensitivity** | 2 | thin → candidates 9–10 |
| **comp-selection** | 2 | thin → candidates 4–5 |
| **absorption** | 1 | thinnest → candidates 1–3 |

By role: development has 9 cases and mortgageUw has 19, against 40 for acquisitions. Candidates 3, 9 and 10 are tagged toward those roles.

Each draft below follows the `SituationalCase` shape. `✅` marks the best option.

---

## Absorption

### 1. `absorption-pipeline-vs-demand` — Is the pipeline too big for demand? (multifamily · acquisitions, portfolioMgmt · intermediate)
**Scenario:** A 20,000-unit submarket has absorbed about 1,200 units per year for the last three years and is 94% occupied. Developers have 3,000 units delivering evenly over the next 18 months. Demand is expected to stay flat.
**Data:** Inventory 20,000 · Trailing absorption 1,200/yr · Pipeline 3,000 units / 18 mo · Occupancy 94%
**Q:** What happens to submarket occupancy by the end of the delivery window?
- ✅ It falls by roughly 6 points. 18 months of absorption is about 1,800 units, so about 1,200 units go unabsorbed, which is 6% of 20,000.
- Stays near 94%; developers only build into demand. *(Pipelines are not demand-aware once under construction.)*
- Falls by about 15 points, because 3,000 units is 15% of inventory. *(Ignores the 1,800 units of absorption that happens meanwhile.)*
- Cannot be estimated without rent growth data. *(Supply minus absorption gives a first-order answer.)*
**Takeaway:** Compare pipeline to absorption over the same window, not to inventory.

### 2. `absorption-gross-vs-net` — Strong leasing, weak market? (industrial · assetManagement · beginner)
**Scenario:** A broker touts 400,000 SF of leasing activity in the submarket this quarter. Move-outs and contractions in the same period total 250,000 SF. The submarket holds 30M SF.
**Q:** What was net absorption, and what does it say?
- ✅ +150,000 SF net. Gross leasing overstates demand because it includes renewals and relocations.
- +400,000 SF; leasing volume is absorption.
- −250,000 SF; move-outs dominate.
- Net absorption is only meaningful as a percent of vacancy.
**Takeaway:** Net absorption is occupied-space change. Gross leasing includes churn.

### 3. `lease-up-pace-underwriting` — How fast will this lease up? (multifamily · development, mortgageUw · intermediate)
**Scenario:** A 240-unit development is delivering. The sponsor's pro forma assumes 20 leases per month. Three comparable lease-ups in the submarket averaged 11, 13 and 9 leases per month, and the lender requires 93% occupancy for the permanent take-out.
**Data:** Units 240 · Sponsor pace 20/mo · Comp paces 9–13/mo · Take-out test 93% (223 units)
**Q:** What is the most defensible way to size the interest reserve?
- ✅ Underwrite to about 11 per month, which is about 20 months to the take-out test. Show 20/mo only as an upside case.
- Use the sponsor's 20/mo: about 11 months.
- Use the best comp, 13/mo: about 17 months.
- Skip an interest reserve; lease-up is the sponsor's risk.
**Takeaway:** Size reserves on comp-set average pace, not on the sponsor's best case.

## Comp selection

### 4. `comp-sale-vs-lease-comps` — Which comps answer which question? (office · acquisitions · intermediate)
**Scenario:** You are valuing a 60%-leased office building. You have six recent sales and four recent lease comps in the submarket.
**Q:** How should the two comp sets be used?
- ✅ Lease comps set market rent and downtime assumptions. Sale comps set the exit cap and price per SF cross-check.
- Use sale comps for everything; lease comps are noise.
- Use lease comps to derive the cap rate.
- Average the two sets to reach one value.
**Takeaway:** Each comp set answers a different input, so don't blend them.

### 5. `comp-buyer-type-premium` — That comp looks too good (any · acquisitions · advanced)
**Scenario:** The best sale comp traded at a cap rate 75 bps below the others. The broker's notes say the buyer was a 1031-exchange buyer with a 45-day identification deadline.
**Q:** How do you treat the comp?
- ✅ Keep it but footnote it, weight it lightly, and show the valuation with and without it.
- Use it as the primary comp, since it is the most recent.
- Drop it entirely because the buyer was irrational.
- Average it equally with the rest.
**Takeaway:** Compulsion-driven pricing is real but is not the marginal buyer.

## Lease economics

### 6. `lease-net-effective-rent` — Face rent vs net effective (office · assetManagement · beginner)
**Scenario:** Two proposals for 10,000 SF over a 10-year term. A: $30/SF face, 6 months free, $50/SF TI. B: $27/SF face, 2 months free, $20/SF TI. Ignore discounting.
**Data:** A face $30 · B face $27 · concessions as above
**Q:** Which has the higher undiscounted net effective rent?
- ✅ B. A nets (300 − 15 − 50) ÷ 10 = $23.50. B nets (270 − 4.5 − 20) ÷ 10 = $24.55.
- A, because face rent is higher.
- They are equal once TI is amortized.
- Cannot be compared without the credit of each tenant.
**Takeaway:** Compare on net effective rent, then adjust for credit and discounting.

### 7. `lease-renewal-probability-blend` — Blended TI and downtime (office · assetManagement, acquisitions · intermediate)
**Scenario:** The market leasing assumptions are: new tenant TI $60/SF with 9 months downtime; renewal TI $20/SF with no downtime. Renewal probability is 70%.
**Q:** What is the blended TI per SF used in the pro forma?
- ✅ $32/SF, which is 0.7 × 20 + 0.3 × 60, with downtime blended at 0.3 × 9 = 2.7 months.
- $60/SF; always underwrite the new-tenant case.
- $20/SF; renewals dominate.
- $40/SF, the simple average.
**Takeaway:** Weight each term by renewal probability, but test the 0% renewal case too.

### 8. `retail-natural-breakpoint` — When does percentage rent kick in? (retail · assetManagement · beginner)
**Scenario:** A retail tenant pays $30/SF base rent plus 5% of gross sales above a natural breakpoint. Sales are currently $450/SF.
**Q:** Does the landlord receive percentage rent today?
- ✅ No. The natural breakpoint is $30 ÷ 5% = $600/SF, and sales of $450/SF sit below it.
- Yes, 5% × $450 = $22.50/SF.
- Yes, but only on the portion above $300/SF.
- Only if sales exceed $30/SF.
**Takeaway:** Natural breakpoint = base rent ÷ percentage rate.

## Sensitivity

### 9. `sensitivity-rate-shock-dscr` — Floating-rate shock (multifamily · mortgageUw · intermediate)
**Scenario:** A $30M interest-only floating-rate loan is at 6.0%. NOI is $2.4M. There is no rate cap, and rates rise 100 bps.
**Q:** What happens to DSCR?
- ✅ It falls from 1.33x to about 1.14x. Interest rises from $1.8M to $2.1M.
- It stays above 1.25x; NOI will grow to offset.
- It falls to 0.80x.
- Not computable without amortization.
**Takeaway:** On IO debt, DSCR = NOI ÷ (loan × rate). A 100 bps shock is about 17% more debt service at 6%.

### 10. `sensitivity-which-lever` — Which assumption matters most? (any · portfolioMgmt, development · advanced)
**Scenario:** A five-year value-add deal has a 15% levered IRR. You can flex one assumption: exit cap +50 bps, rent growth −1 point per year, or a six-month delay in business plan completion.
**Q:** How should you pick which sensitivity to lead with?
- ✅ Run each against the base case and lead with the one that moves IRR the most. For short-hold value-add that is usually the exit cap or the delay.
- Always lead with exit cap.
- Lead with rent growth since it is the most observable.
- Pick the one the sponsor is most confident about.
**Takeaway:** Rank sensitivities by IRR impact, not by comfort.
