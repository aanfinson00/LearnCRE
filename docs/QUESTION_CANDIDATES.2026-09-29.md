# Question candidates — 2026-09-29

Ten proposed situational cases aimed at the thinnest areas of the shipped bank. **Not registered in the app** — these are drafts for review. Approve/edit, then implement per `docs/agent-instructions.md` (one `isBest`, 3–4 options, register in `src/quiz/situational/index.ts`).

## Coverage gaps that drove the picks

Counts are across the 72 files in `src/quiz/situational/` (71 cases plus `index.ts`).

| Dimension | Thin spots (count) | Well covered |
|---|---|---|
| Category | absorption (1), comp-selection (2), lease-econ (2), sensitivity (2) | deal-process (21), document-literacy (13) |
| Difficulty | beginner (4) vs intermediate 33 / advanced 34 | — |
| Asset class | hotel (1), retail (2), industrial (3) | multifamily (11), office (9) |
| Role tag | development (9), mortgageUw (19) | acquisitions (40), assetManagement (31) |

Note: "approved" was read as "shipped in the repo bank". Community submissions (`question_submissions`) were not reachable — that table is not in the accessible Supabase project.

All math below was checked by hand.

---

### 1. How long to lease up the new building?
`absorption · beginner · multifamily · roles: development, acquisitions`

**Scenario:** A 240-unit property just received its certificate of occupancy. Comparable new deliveries in the submarket have leased at about 20 units per month. Lender and underwriting target stabilization at 93% occupancy.
**Data:** Units 240 · Pace 20/mo · Target 93%
**Q:** Roughly how many months to stabilize?

- ✅ **About 11 months.** 240 × 93% = 223 units ÷ 20/mo ≈ 11.2. Stabilization is measured to the target occupancy, not 100%.
- ◻️ About 12 months. Divides all 240 units by the pace and ignores the 93% target, which overstates the timeline.
- ◻️ About 7 months. Confuses a 93% target with a monthly rate; nothing in the data supports a faster pace.
- ◻️ Can't say without knowing rent. The pace is given; compute it, and use rent only as a sensitivity.

**Takeaway:** Lease-up months = (units × target occupancy) ÷ monthly absorption.
**Tips:** Use comp-derived pace, not the sponsor's. · Add a pre-leasing lag if the building opens in phases.

### 2. Absorption is positive — so why is vacancy rising?
`absorption · intermediate · industrial · roles: acquisitions, portfolioMgmt`

**Scenario:** An industrial submarket has 50.0M SF of inventory at 6.0% vacancy. This year 2.5M SF of spec product delivered, all vacant at delivery. Net absorption was a healthy +1.0M SF.
**Data:** Inventory 50.0M SF · Vacancy 6.0% (3.0M SF) · Deliveries 2.5M SF · Net absorption 1.0M SF
**Q:** Where does vacancy land?

- ✅ **About 8.6%.** Vacant SF = 3.0 + 2.5 − 1.0 = 4.5M on a 52.5M SF base = 8.57%. Positive absorption still loses to bigger deliveries.
- ◻️ About 5.0%. Subtracts absorption but ignores that deliveries add to both vacancy and inventory.
- ◻️ About 6.0%. Assumes absorption offsets deliveries one-for-one; it offsets only 1.0M of 2.5M.
- ◻️ About 9.5%. Adds deliveries but forgets to grow the denominator (4.5 ÷ 50 = 9.0%) and rounds up.

**Takeaway:** Vacancy moves on net absorption *minus* deliveries, over the new inventory base.
**Tips:** Always grow the denominator. · Track the delivery pipeline, not just leasing velocity.

### 3. Which retail comps actually apply?
`comp-selection · intermediate · retail · roles: acquisitions, mortgageUw`

**Scenario:** You're pricing a shadow-anchored strip center (anchor owns its own box and pays no rent to the landlord). Available trades: grocery-anchored centers at 6.5%, unanchored strips at 7.75%, and two shadow-anchored centers at 7.0% and 7.25%.
**Data:** Grocery-anchored 6.5% · Shadow-anchored 7.0–7.25% · Unanchored 7.75%
**Q:** How should you build the comp set?

- ✅ **Lead with the shadow-anchored trades, and use the other two as bracketing bounds.** The subject gets traffic but not anchor rent or lease security, so it sits between the two extremes.
- ◻️ Average all four to get a market cap of ~7.1%. Blends structurally different income streams into a number no buyer used.
- ◻️ Use the grocery-anchored 6.5%, since the anchor drives traffic. Ignores that the landlord collects nothing from the anchor.
- ◻️ Use the unanchored 7.75% to be conservative. Ignores the real traffic benefit and would under-price the deal.

**Takeaway:** Comps must match income structure and credit, not just property type. Use others only as brackets.
**Tips:** Ask who owns the anchor box. · Adjust for lease term and tenant credit before comparing caps.

### 4. Choosing a hotel comp set
`comp-selection · advanced · hotel · roles: acquisitions, portfolioMgmt`

**Scenario:** A 180-key select-service hotel near an airport reports RevPAR of $92. The broker's competitive set includes a 400-key convention-center full-service hotel at $148 RevPAR, which lifts the "index" to 118%.
**Data:** Subject RevPAR $92 · Broker comp avg $78 (index ~118%) · Convention hotel $148
**Q:** What's the right critique?

- ✅ **The set should match chain scale, location type, and demand segment; the convention hotel serves different demand and distorts the index.** Rebuild with similar select-service, airport-driven competitors.
- ◻️ The set is fine; a larger comp is conservative. Size does not make demand drivers comparable.
- ◻️ Remove the highest and lowest properties automatically. A statistical trim doesn't fix a demand-segment mismatch.
- ◻️ Ignore RevPAR and use cap rates only. RevPAR index is the core performance test; the issue is set quality.

**Takeaway:** RevPAR index is only as good as the competitive set behind it.
**Tips:** Ask for STR reports and the set's construction rationale. · Check segment mix (transient, group, contract).

### 5. What's the net effective rent?
`lease-econ · beginner · office · roles: acquisitions, assetManagement`

**Scenario:** A tenant signs a 10-year office lease at $40/SF gross with 6 months of free rent and a $60/SF tenant improvement allowance.
**Data:** Face rent $40/SF · Term 10 yrs · Free rent 6 months · TI $60/SF
**Q:** Approximate net effective rent, undiscounted?

- ✅ **$32.00/SF.** ($40 × 10 − $20 free − $60 TI) ÷ 10 = $32.00.
- ◻️ $40.00/SF. Face rent ignores the concessions the landlord funds.
- ◻️ $34.00/SF. Subtracts only the TI ($400 − $60 = $340 ÷ 10) and forgets free rent.
- ◻️ $28.00/SF. Also deducts an assumed $40/SF leasing commission that isn't in the data.

**Takeaway:** Net effective rent spreads free rent and TI over the term; face rent overstates what the landlord earns.
**Tips:** Add leasing commissions for a fuller picture. · Discount cash flows for a true PV-based NER.

### 6. When does percentage rent kick in?
`lease-econ · intermediate · retail · roles: assetManagement, acquisitions`

**Scenario:** A retail tenant pays $30/SF base rent plus 6% of sales above a natural breakpoint. Current sales are $420/SF.
**Data:** Base rent $30/SF · Percentage rate 6% · Sales $420/SF
**Q:** What are the breakpoint and the overage rent today?

- ✅ **Breakpoint is $500/SF; overage is $0 today.** Breakpoint = $30 ÷ 6% = $500. At $560/SF sales, overage = $60 × 6% = $3.60/SF.
- ◻️ Breakpoint is $420/SF; overage is $30. Uses current sales as the breakpoint.
- ◻️ Breakpoint is $180/SF; overage is $14.40. Multiplies base rent by the rate instead of dividing.
- ◻️ Breakpoint is $30/SF; overage is $23.40. Treats base rent as the sales threshold.

**Takeaway:** Natural breakpoint = base rent ÷ percentage rate.
**Tips:** Check whether the breakpoint is natural or artificial. · Don't underwrite percentage rent below the breakpoint.

### 7. What does +50 bps of exit cap do to equity?
`sensitivity · intermediate · multifamily · roles: acquisitions, portfolioMgmt`

**Scenario:** A multifamily asset has $2.0M of exit-year NOI and a 5.0% exit cap ($40.0M). Debt at exit is $26.0M (65% of that value).
**Data:** NOI $2.0M · Exit cap 5.0% → 5.5% · Debt $26.0M
**Q:** Approximate change in exit value and exit equity?

- ✅ **Value −9.1%; equity −26%.** $2.0M ÷ 5.5% = $36.4M; equity falls from $14.0M to $10.4M.
- ◻️ Value −0.5%; equity −0.5%. Treats basis points as percent of value.
- ◻️ Value −9.1%; equity −9.1%. Ignores leverage; the debt is fixed.
- ◻️ Value −10%; equity −14%. Assumes a linear cap-to-value relationship.

**Takeaway:** Value is inversely related to cap rate, and fixed debt magnifies equity swings.
**Tips:** Run ±25/50/100 bps. · Leverage turns a 9% value drop into a 26% equity hit.

### 8. A 10% overrun and the development spread
`sensitivity · advanced · industrial · roles: development, portfolioMgmt`

**Scenario:** A ground-up industrial project has a $60.0M budget and $3.9M of stabilized NOI. The market exit cap is 5.5%.
**Data:** Cost $60.0M · NOI $3.9M · Exit cap 5.5%
**Q:** What happens to the yield-on-cost spread if costs run 10% over?

- ✅ **YoC drops from 6.5% to ~5.9%; the spread to market cap shrinks from 100 bps to ~41 bps.** $3.9M ÷ $66.0M = 5.91%.
- ◻️ Spread drops to 90 bps. Subtracts 10 bps for the 10% overrun.
- ◻️ Spread is unchanged; NOI is the same. Ignores that cost is the denominator.
- ◻️ Spread goes negative. Overstates the overrun impact; 5.91% is still above 5.5%.

**Takeaway:** Overruns hit yield on cost directly, and a thin spread erases the development premium.
**Tips:** Most lenders want ≥ 100–150 bps of spread. · Stress cost and rent together.

### 9. Which RevPAR growth is better?
`risk · intermediate · hotel · roles: assetManagement, mortgageUw`

**Scenario:** Two hotels both grew RevPAR from $105 to about $106. Hotel A went from 70% occupancy at $150 ADR to 64% at $165. Hotel B went from 70% at $150 to 76% at $139.
**Data:** A: 70%/$150 → 64%/$165 · B: 70%/$150 → 76%/$139
**Q:** Which growth is higher quality for NOI?

- ✅ **Hotel A.** Fewer occupied rooms means lower variable costs (housekeeping, amenities), while higher ADR drops mostly to the bottom line.
- ◻️ Hotel B. Higher occupancy is always better. Extra occupied rooms carry per-room cost and wear.
- ◻️ Equal, since RevPAR is the same. RevPAR ignores cost differences.
- ◻️ Neither; RevPAR isn't a useful metric. It's useful, but must be decomposed.

**Takeaway:** Decompose RevPAR into occupancy and ADR; rate-driven growth flows through better.
**Tips:** Look at GOPPAR too. · Check ADR growth isn't from a mix shift.

### 10. What's the development margin?
`investment-thesis · beginner · multifamily · roles: development, acquisitions`

**Scenario:** A developer expects $3.5M of stabilized NOI on a $50.0M all-in cost. Similar stabilized assets trade at a 5.5% cap.
**Data:** Cost $50.0M · NOI $3.5M · Market cap 5.5%
**Q:** What are yield on cost, the spread, and the implied margin?

- ✅ **7.0% YoC, 150 bps spread, ~27% margin.** Value = $3.5M ÷ 5.5% = $63.6M; margin = $63.6M ÷ $50.0M − 1 ≈ 27%.
- ◻️ 5.5% YoC, no spread. Mixes up market cap with return on cost.
- ◻️ 7.0% YoC, but only a 50 bps spread and ~9% margin. Compares YoC to a 6.5% cap that appears nowhere in the data.
- ◻️ 12.7% margin. Computes $63.6M − $50.0M as a percent of value, not of cost.

**Takeaway:** Yield on cost minus market cap is the development spread; value ÷ cost is the margin.
**Tips:** Use all-in cost including interest and reserves. · Compare the spread to the risk of lease-up.
