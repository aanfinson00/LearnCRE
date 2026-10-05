# Question candidates — 2026-10-05

10 candidate phrasings for the situational bank, aimed at the thinnest areas. **Not registered in code.** Mark each `[x]` approve / `[r]` reject; approved ones get translated to `src/quiz/situational/<id>.ts` and registered per `docs/agent-instructions.md`.

## Coverage gaps this batch targets

The Supabase approval ledger wasn't reachable from this run (the connected project has no `question_submissions` table). Gaps are measured from the in-repo situational bank (72 cases) instead.

| Dimension | Current count | Gap |
|---|---|---|
| Category: absorption | 1 | thinnest |
| Category: comp-selection / lease-econ / sensitivity | 2 each | thin |
| Role: development | ~20 | thinnest role |
| Role: mortgageUw | ~36 | thin |
| Asset class: hotel / retail / industrial | 1 / 2 / 3 | thin vs. 9–11 each for office/multifamily |

Each candidate lists one best option (✅) and the distractors with the mistake each represents.

---

### [ ] C1. Is the industrial pipeline a problem? — `industrial-pipeline-vacancy`
*absorption · intermediate · industrial · development, acquisitions*

**Scenario:** A 40M SF industrial submarket sits at 5% vacancy (2.0M SF vacant). 3.0M SF is under construction and delivers within 12 months, 40% pre-leased (1.2M SF). Net absorption has run about 1.5M SF per year.

**Q:** Where does vacancy land in 12 months if absorption holds?

- ✅ **~5.3%** — pre-leased space is occupied at delivery, so only 1.8M SF adds to vacancy. Vacant = 2.0 + 1.8 − 1.5 = 2.3M SF on a 43.0M SF base.
- ◻️ **~9.5%** — adds the full 3.8M SF vacant to the old 40M base and ignores absorption.
- ◻️ **~8.1%** — counts all 3.0M SF as vacant on delivery (2.0 + 3.0 − 1.5 = 3.5M ÷ 43M), ignoring pre-leasing.
- ◻️ **~5.75%** — gets 2.3M SF vacant right but divides by the original 40M SF base instead of 43M.

**Takeaway:** Count only *spec* (unleased) deliveries against absorption, and grow the denominator by all deliveries.
**Tips:** Pre-leased ≠ vacant · re-base inventory after deliveries · test absorption at half the trailing pace.

### [ ] C2. Does sublease space count? — `office-shadow-supply`
*absorption · advanced · office · acquisitions, portfolioMgmt*

**Scenario:** A submarket reports 14% direct vacancy and 4% sublease availability. A tenant just announced a 150,000 SF consolidation, 60% of which will be offered for sublease at 30% below the landlord's asking rent. Your target building is 11% vacant and signing direct deals at $38/SF.

**Q:** How should this affect your lease-up assumption?

- ✅ Underwrite against total availability (~18% plus the new sublease), expect pricing pressure from discounted sublease space, and extend downtime or add concessions.
- ◻️ Ignore it: sublease space is not vacant, so it doesn't compete with direct space.
- ◻️ Use direct vacancy only, since it reflects landlord-controlled inventory.
- ◻️ Treat it as positive, because a consolidating tenant signals a healthy market.

**Takeaway:** Sublease space is shadow supply; tenants see it as a cheaper, shorter-term alternative.
**Tips:** Quote availability, not just vacancy · sublease discounts reset the effective rent ceiling · watch sublease share rising quarter over quarter.

### [ ] C3. Which retail comps count? — `retail-comp-anchor-mix`
*comp-selection · intermediate · retail · acquisitions*

**Scenario:** You're pricing a 90,000 SF grocery-anchored center (NNN, 94% leased). Three sale comps: (1) a grocery-anchored center two miles away, same vintage, 5 years of anchor term remaining; (2) an unanchored strip on a higher-traffic corridor with shorter-term inline leases; (3) a power center with big-box anchors, 12 miles away, with a recent sale at a tighter cap.

**Q:** Which comp should carry the most weight?

- ✅ Comp 1. The anchor type and lease structure drive risk and cap rate more than corridor traffic or distance.
- ◻️ Comp 2. Better traffic means better real estate.
- ◻️ Comp 3. It has the most recent and tightest cap, so it indicates where the market is.
- ◻️ Average all three to smooth out the noise.

**Takeaway:** In retail, match on tenancy and anchor credit first, location and vintage second.
**Tips:** Compare WALT and anchor term · adjust for NNN vs gross · don't average dissimilar comps.

### [ ] C4. Renovated vs classic comps — `mf-renovated-vs-classic-comps`
*comp-selection · beginner · multifamily · acquisitions, assetManagement*

**Scenario:** Your 1980s garden property has original interiors at $1,450. Nearby comps: Property A (same vintage, fully renovated) at $1,720; Property B (same vintage, original interiors) at $1,470; Property C (new 2022 construction) at $2,050. Your business plan renovates units for $14,000 each.

**Q:** Which comp supports your *in-place* rent, and which supports the post-renovation rent?

- ✅ B supports in-place; A supports post-renovation. C is a ceiling check, not a direct comp.
- ◻️ C supports both, since it is the most recent.
- ◻️ A supports both; renovated is renovated.
- ◻️ Average A and B for both cases.

**Takeaway:** Split comps by unit condition, then size the premium (~$250 here) against the renovation cost.
**Tips:** Premium ÷ cost = return on renovation ($250 × 12 ÷ $14,000 ≈ 21%) · don't underwrite to new-build rents · check premium stability across comps.

### [ ] C5. Free rent or TI? — `industrial-free-rent-vs-ti`
*lease-econ · intermediate · industrial · acquisitions, assetManagement*

**Scenario:** Two 5-year NNN proposals for 50,000 SF. Offer A: $12.00/SF, 6 months free rent, $10/SF TI. Offer B: $11.50/SF, no free rent, $10/SF TI.

**Q:** Which has the better net effective rent?

- ✅ **B** — NER ≈ $9.50 vs A's ≈ $8.80. A: (12 × 4.5 − 10) ÷ 5 = $8.80. B: (11.5 × 5 − 10) ÷ 5 = $9.50.
- ◻️ **A** — the higher face rent wins.
- ◻️ They are equal because the TI is the same.
- ◻️ **A**, because free rent is a one-time cost while the rate compounds.

**Takeaway:** Face rent hides free rent. Compare NER (and cash-on-cash timing) before choosing.
**Tips:** Free rent months come off the *paying* term · amortize TI over the term · also check credit and expansion rights.

### [ ] C6. Renewal vs new tenant — `office-renewal-vs-new-economics`
*lease-econ · advanced · office · assetManagement, acquisitions*

**Scenario:** A 20,000 SF office tenant expires in 6 months. Renewal: 5 years at $34/SF, $10/SF TI, 2% commission. A replacement tenant would sign at $36/SF, but needs $50/SF TI, 6% commission, and 9 months downtime (no rent, landlord pays opex of $12/SF/yr).

**Q:** Which frame correctly compares them?

- ✅ Compare cumulative net cash over the same horizon: the replacement's $2/SF rent premium (≈ $10/SF over 5 years) is far smaller than its extra TI ($40/SF), commission, and downtime (carry cost ≈ $9/SF alone), so renewal wins unless the retention discount is very deep.
- ◻️ Take the higher rent, $36 beats $34.
- ◻️ Compare TI only; the lower TI wins.
- ◻️ They're equivalent once you apply the 5-year hold.

**Takeaway:** Renewals win on cost-of-turn, not rent; do the full downtime-plus-TI-plus-commission math.
**Tips:** Weight by renewal probability · include carry (opex, taxes) during downtime · mind the unmodeled risk of the tenant leaving.

### [ ] C7. Rate shock and loan proceeds — `uw-rate-shock-proceeds`
*sensitivity · intermediate · mixed · mortgageUw, portfolioMgmt*

**Scenario:** A lender sized a $30M interest-only loan at 6.0% on $2.4M NOI. The underwriting minimum is 1.25x DSCR. Rates then move up 100 bps to 7.0% before closing.

**Q:** What is the new maximum loan?

- ✅ **~$27.4M** — max debt service $2.4M ÷ 1.25 = $1.92M; ÷ 7.0% = $27.4M. (At 6.0% the original DSCR was 1.33x, so the cut is less than the proportional move.)
- ◻️ **~$25.7M** — scaling by 6/7 holds payment constant and over-cuts, since the original loan had a cushion above 1.25x.
- ◻️ **$30.0M** — assumes a fixed loan amount; ignores that DSCR now fails (1.14x).
- ◻️ **~$28.8M** — reduces proceeds by the rate increase in percentage terms (−4%), which has no basis in the sizing math.

**Takeaway:** Re-solve the constraint: max loan = (NOI ÷ DSCR) ÷ constant.
**Tips:** Check which constraint binds (DSCR vs LTV vs debt yield) · IO vs amortizing changes the constant · always show proceeds at +100 bps.

### [ ] C8. Exit cap and development profit — `dev-exit-cap-profit-sensitivity`
*sensitivity · intermediate · mixed · development, portfolioMgmt*

**Scenario:** A development has $60M total cost and $4.5M stabilized NOI (7.5% yield on cost). The pro forma exit cap is 5.5%. The market softens and you underwrite 6.0%.

**Q:** What happens to development profit?

- ✅ **Profit falls ~31%** — value drops from $81.8M to $75.0M, so profit goes from $21.8M to $15.0M.
- ◻️ **Profit falls ~8%** — mistakes the percentage drop in *value* for the drop in *profit*.
- ◻️ **Profit falls ~50%** — double-counts the cap move.
- ◻️ **No change** — cost is fixed, so profit is fixed.

**Takeaway:** Profit is a thin residual (value − cost), so small cap moves hit it disproportionately; check the spread between YOC and exit cap (here 200 bps → 150 bps).
**Tips:** Compare YOC to exit cap, not to today's cap · target ≥150 bps of spread · run the downside before you buy land.

### [ ] C9. RevPAR trade-off — `hotel-revpar-adr-occupancy-tradeoff`
*sensitivity · beginner · hotel · assetManagement, portfolioMgmt*

**Scenario:** A hotel runs 72% occupancy at a $180 ADR (RevPAR $129.60). Management proposes raising rate to cut low-yield volume; the sales team forecasts occupancy dropping to 66%.

**Q:** What ADR keeps RevPAR flat?

- ✅ **~$196 (+9%)** — $129.60 ÷ 0.66 = $196.4.
- ◻️ **~$191 (+6%)** — subtracts the 6 occupancy points as if they were 6%.
- ◻️ **$180** — assumes ADR doesn't matter when occupancy falls.
- ◻️ **~$216 (+20%)** — doubles the correction.

**Takeaway:** RevPAR = occupancy × ADR, and the break-even ADR is the old RevPAR divided by the new occupancy. A hotel should also account for variable costs (cleaning, comps), which fall when volume drops, so the true break-even is lower.
**Tips:** Profit flow-through is higher on rate than on occupancy · occupancy is the bigger driver of GOP · check RGI vs the comp set.

### [ ] C10. Below replacement cost? — `dev-replacement-cost-margin-of-safety`
*pricing · advanced · mixed · development, acquisitions*

**Scenario:** You can buy a 10-year-old building for $200/SF. Replacement cost (land + hard + soft) is $280/SF. At today's market rents, a new building would yield only 5.0% on cost, below the 6.5% yield developers require.

**Q:** Is the 29% discount to replacement cost a margin of safety?

- ✅ Only partially. Development is infeasible at current rents, so replacement cost isn't a binding ceiling on supply; rents would need to rise ~30% before new construction pencils, which limits near-term supply risk but doesn't guarantee your price is cheap.
- ◻️ Yes, always. Anything below replacement cost is a bargain.
- ◻️ No. Replacement cost is irrelevant to pricing.
- ◻️ Yes, because the discount equals your expected return.

**Takeaway:** Replacement cost is a *supply-side* argument that only works when it's compared to feasible rent, not just to the price.
**Tips:** Required rent = cost × required yield (here $280 × 6.5% = $18.20/SF vs $14.00 implied) · discount to replacement helps most in high-barrier markets · still underwrite the cash flows.

---

## Notes for the reviewer

- C6's cost figures are approximate on purpose; if approved, numbers should be tightened to give one clean best answer before coding.
- C10 uses 5.0% / 6.5% yields and $280 → $18.20 required rent vs 5.0% × $280 = $14.00 implied; the 30% rent move is $18.20 ÷ $14.00 − 1.
- Next run should target: retail/hotel/industrial role mix, `mortgageUw` underwriting cases, and more `absorption` cases (multifamily and retail).
