# Question candidates — 2026-09-30

Ten unreviewed situational-case drafts aimed at the thinnest areas of the bank. **Not registered** in `src/quiz/situational/index.ts` — promote a draft to `src/quiz/situational/<id>.ts` (per `docs/agent-instructions.md`) once approved.

## Gap analysis

No approved-status data was reachable (the connected Supabase projects don't contain `question_submissions`), so gaps were measured from repo content — 72 situational cases:

| Dimension | Thin spots (case count) |
|---|---|
| Category | absorption (1), sensitivity (2), lease-econ (2), comp-selection (2), pricing (7) vs deal-process (21) |
| Asset class | hotel (1), retail (2), industrial (3) vs multifamily (11), office (9) |
| Role | development, portfolioMgmt (single-role tags: 3 each) vs acquisitions (10) |

Each draft targets one or more of these. Numbers are illustrative; math is checked. ✅ = intended best answer.

---

### 1. `industrial-spec-lease-up` — absorption · industrial · intermediate · development/acquisitions
**Scenario:** You're underwriting a 400,000 SF spec warehouse delivering next quarter. Trailing-12-month net absorption in the submarket is 2.0M SF. Another 2.1M SF of competing product (four buildings) delivers in the same window. Market vacancy is 7%.
**Q:** How long should the base case assume to fill the building?
- ✅ **A.** ~15 months — a fair-share capture of 400k ÷ 2.5M total new supply = 16% of 2.0M SF absorption ≈ 320k SF/yr.
- B. 6 months — 2.0M SF of absorption easily covers a 400k SF building.
- C. 12 months — the submarket's standard lease-up for spec product.
- D. Can't be estimated until a pre-lease is signed.

**Takeaway:** Absorption is shared across all competing deliveries; size your lease-up to your *share* of demand, not to total demand.

### 2. `mf-concession-burn-off` — absorption · multifamily · intermediate · development/assetManagement
**Scenario:** A 300-unit new build is leasing 15 units/month at a $2,000 asking rent with two months free on 12-month leases. Stabilization is 93% occupancy.
**Q:** What rent and timeline belong in the underwriting?
- ✅ **A.** ~19 months to stabilize (279 ÷ 15); carry net effective rent of ~$1,667 during lease-up, stepping to face rent only as concessions burn off.
- B. 20 months at the $2,000 asking rent throughout.
- C. 12 months, since leases are 12 months long.
- D. Concessions are one-time marketing costs and can be excluded from NOI.

**Takeaway:** Net effective rent = face × (12 − free months) ÷ 12. Concessions are a revenue haircut, not a marketing line item.

### 3. `sensitivity-table-design` — sensitivity · multifamily · intermediate · acquisitions/portfolioMgmt
**Scenario:** Your IC memo has room for one sensitivity table on a 5-year value-add deal with a floating-rate loan.
**Q:** Which table is most decision-useful?
- ✅ **A.** Exit cap rate × annual rent growth — the two assumptions that drive most of the exit value and are least certain.
- B. Purchase price × closing costs.
- C. Property tax growth × insurance growth.
- D. Hold period × asset-management fee.

**Takeaway:** Sensitize the variables that are both high-impact and genuinely uncertain, and pair them so the committee sees the interaction.

### 4. `floating-rate-dscr-shock` — sensitivity · office · intermediate · mortgageUw
**Scenario:** $30M interest-only floating loan at SOFR + 300 bps. SOFR is 4.0%. NOI is $2.4M. The lender's minimum DSCR is 1.10×.
**Q:** What happens to coverage if SOFR rises 100 bps, and what's the right response?
- ✅ **A.** DSCR falls from 1.14× (2.4 ÷ 2.1) to 1.00× (2.4 ÷ 2.4) — below the covenant; require a rate cap or interest reserve at closing.
- B. DSCR falls slightly to about 1.10×, which still passes.
- C. No impact, because NOI is unchanged.
- D. DSCR improves because higher rates signal stronger rent growth.

**Takeaway:** On IO floating debt every 100 bps is ~$300k of debt service here; stress DSCR to the cap strike, not today's index.

### 5. `office-net-effective-rent` — lease-econ · office · beginner · acquisitions/assetManagement
**Scenario:** A 10-year office lease: $40/SF face rent, 8 months free rent, $60/SF TI allowance.
**Q:** What is the simple (undiscounted) net effective rent per year?
- ✅ **A.** ~$31.33/SF — $40 − $2.67 (free rent ÷ 10) − $6.00 (TI ÷ 10).
- B. ~$34.00/SF — ignores free rent.
- C. ~$37.33/SF — ignores TI.
- D. $40.00/SF — TI is landlord capital, not a rent concession.

**Takeaway:** Net effective rent spreads every concession across the term; compare deals on NER, not face rent. (Leasing commissions would lower it further.)

### 6. `retail-co-tenancy-trigger` — lease-econ · retail · advanced · assetManagement/portfolioMgmt
**Scenario:** Inline tenants representing 35% of a center's base rent have co-tenancy clauses: rent drops to 50% of base (or a reduced percentage-rent-only basis) if the anchor goes dark for more than 90 days. The anchor's parent just announced store closures, and your anchor store isn't on the list yet.
**Q:** How should this be reflected in underwriting?
- ✅ **A.** Probability-weight the anchor-dark scenario, model the inline rent step-down (~17.5% of total base rent at risk), and check the cure and replacement-anchor rights.
- B. Ignore it until the closure list includes your store.
- C. Assume all inline tenants vacate immediately.
- D. Treat it as an insurance issue; it doesn't affect NOI.

**Takeaway:** Co-tenancy converts anchor risk into inline rent risk. Quantify rent at risk = inline base rent share × reduction.

### 7. `industrial-sale-comp-weighting` — comp-selection · industrial · intermediate · acquisitions
**Scenario:** Subject: 240,000 SF, 32' clear, infill. Comps — A: 100k SF, 24' clear, infill, 6.0% cap, 2 months ago. B: 500k SF, 36' clear, exurban, 5.25%, 4 months ago. C: 220k SF, 32' clear, infill, 4.75%, 20 months ago (before rates rose). D: 250k SF, 30' clear, infill, 5.5%, 3 months ago.
**Q:** Which comp should carry the most weight?
- ✅ **A.** D — closest in size, function, location, and date; use A and B as bounds and C only after adjusting for the rate move.
- B. C — the closest spec match, so date doesn't matter.
- C. B — newest building type and largest trade.
- D. Average all four equally.

**Takeaway:** Rank comps by the attributes that drive pricing for the asset class (clear height, location, size) *and* recency; stale comps need a market-movement adjustment.

### 8. `mf-renovation-comp-split` — comp-selection · multifamily · intermediate · acquisitions/development
**Scenario:** A 1985 garden community with unrenovated units renting at $1,500. Renovated comps rent at $1,650. Your plan is a $12,000/unit interior renovation.
**Q:** Which comps support which part of the model?
- ✅ **A.** Classic comps for in-place and lease-up rents; renovated comps only for the post-renovation premium, validated by actual lease trade-outs. The $150 premium implies a 15% return on cost ($1,800 ÷ $12,000).
- B. Renovated comps for everything — the building will be renovated eventually.
- C. Classic comps only; the renovation premium can't be underwritten.
- D. Average the two rent levels.

**Takeaway:** Match comps to the product state being underwritten, and test the renovation premium against return on cost.

### 9. `hotel-gop-flow-through` — pricing/diagnostic · hotel · intermediate · assetManagement/acquisitions
**Scenario:** A hotel with $20M revenue and a 35% GOP margin ($7.0M GOP) sees revenue fall 6% ($1.2M). Management says the flow-through on lost revenue is about 65%.
**Q:** What happens to GOP?
- ✅ **A.** GOP falls ~$0.78M (to ~$6.22M), about 11% — a 6% revenue drop becomes an ~11% GOP drop.
- B. GOP falls 6%, in line with revenue.
- C. GOP falls $1.2M, because all lost revenue drops through.
- D. GOP is unchanged because hotel costs are fully variable.

**Takeaway:** Hotels carry high fixed costs, so operating leverage makes GOP fall faster than revenue. Flow-through = ΔGOP ÷ Δrevenue.

### 10. `retail-anchor-go-dark` — risk · retail · advanced · portfolioMgmt/assetManagement
**Scenario:** Your anchor has 8 years left on its lease with no continuous-operation covenant, and has told you it may close the store but keep paying rent.
**Q:** What's the right strategic posture?
- ✅ **A.** Quantify the co-tenancy exposure from a dark anchor, then negotiate — recapture or buy-out the space in exchange for releasing the rent obligation — rather than relying on the rent stream alone.
- B. Nothing is lost; rent is still being paid.
- C. Sue for breach of a continuous-operation covenant.
- D. Cut inline tenants' rents pre-emptively to keep them.

**Takeaway:** A dark anchor can keep paying rent while destroying the center's traffic and triggering inline co-tenancy clauses. Absent an operating covenant, the landlord's leverage is the recapture negotiation.
