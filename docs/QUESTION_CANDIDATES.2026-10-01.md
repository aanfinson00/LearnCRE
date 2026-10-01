# Question candidates — 2026-10-01

Ten new situational-case drafts for review. **Not registered** in `src/quiz/situational/index.ts`; accept/reject, then they get ported to `SituationalCase` files per `docs/agent-instructions.md`.

## Why these areas

Counts of shipped situational cases by category (72 total): deal-process 21, document-literacy 13, investment-thesis 9, pricing 7, risk 7, diagnostic 7, **sensitivity 2, lease-econ 2, comp-selection 2, absorption 1**.
Asset class is also lopsided: multifamily 11, office 9, mixed 8, **industrial 3, retail 2, hotel 1**. Role tags are thin for `development` and `portfolioMgmt`.

Batch mix: absorption ×3, comp-selection ×2, lease-econ ×3, sensitivity ×2, skewed to retail / industrial / hotel / development.

Format per item: meta, scenario, data, question, options (✅ = best), takeaway, tips.

---

### 1. Is the lease-up pace in the pro forma realistic?
*absorption · intermediate · multifamily · development, acquisitions*

A 300-unit garden deal is delivering in 6 months. The sponsor's pro forma assumes 25 units/month net absorption to reach 93%. The submarket averaged 180 units/month of net absorption last year across 14 competing lease-ups, and 3 more projects (900 units total) deliver in the same 12 months.

- **Pro forma pace:** 25 units/mo
- **Submarket net absorption:** 180 units/mo
- **Competing lease-ups:** 14 now, +3 coming (900 units)
- **Capture-share implied:** 25 / 180 ≈ 14%

**Q: How should you pressure-test the 25 units/month assumption?**

- ✅ Convert it to a capture share of submarket absorption and compare to your fair share (units ÷ total competing pipeline), then haircut for the 900 incoming units splitting demand.
  - Absorption is a share-of-demand problem. 300 of roughly 1,500+ competing units is ~20% fair share, but new supply dilutes it; 14% is plausible only if demand holds.
- ◻️ Accept it — 25/mo is well below the 180/mo submarket total, so it's conservative.
  - Compares to the wrong denominator. Submarket absorption is shared among every lease-up.
- ◻️ Use the trailing 12-month absorption of the most recently stabilized comp as the pace.
  - Comp pace reflects its own concession and supply context; it must be adjusted for current competition.
- ◻️ Assume a flat 8–10 units/month so it's safely conservative.
  - Arbitrarily punitive; it mis-sizes carry cost and kills the deal for the wrong reason.

**Takeaway:** Underwrite lease-up as a capture share of net demand against the competing pipeline, not as an absolute pace.
**Tips:** Fair share = your units ÷ all competing units. Net absorption nets out move-outs and renewals. Re-run the share when new deliveries are announced.

---

### 2. Concessions are doing the absorbing — is demand real?
*absorption · advanced · multifamily · assetManagement, acquisitions*

Submarket occupancy rose from 88% to 92% over 12 months, but asking rents are flat and effective rents fell 6% because concessions went from 2 weeks free to 8 weeks free.

- **Occupancy:** 88% → 92%
- **Asking rent:** flat
- **Concessions:** 2 → 8 weeks free
- **Effective rent:** −6%

**Q: What does this tell you about the absorption?**

- ✅ Absorption is being bought with price; headline occupancy overstates demand strength, and effective-rent growth is the better signal.
  - Concessions let owners hold asking rent while clearing units at lower effective rent.
- ◻️ Demand is strong — occupancy up 4 points is the key metric.
  - Occupancy alone ignores the price paid for it.
- ◻️ It's a data error; flat asking rent and rising occupancy can't coexist with falling effective rent.
  - They coexist exactly when concessions rise.
- ◻️ Concessions are one-time and should be ignored in underwriting.
  - Persistent concessions are a market signal; ignoring them overstates NOI.

**Takeaway:** Track effective rent, not asking rent, alongside occupancy; concession-driven absorption is lower quality.
**Tips:** Effective rent = asking − (free months ÷ lease term). Rising concessions often lead rent cuts. Compare concession trend to supply deliveries.

---

### 3. Big-box industrial: how long to backfill?
*absorption · intermediate · industrial · assetManagement, acquisitions*

A 400,000 SF big-box tenant vacates. The submarket has 12 tenants in the market for 300k+ SF and a 7.5% vacancy rate. Over the past 24 months only 6 deals above 300k SF were signed, 2 of them build-to-suit.

- **Space:** 400,000 SF
- **Active 300k+ SF requirements:** 12
- **300k+ SF deals, 24 months:** 6 (2 BTS)
- **Submarket vacancy:** 7.5%

**Q: What downtime should you underwrite?**

- ✅ Roughly 12–18 months — thin big-box demand (about 2 existing-building deals/yr) means the tenant pool, not vacancy rate, sets the timeline.
  - Only 4 non-BTS deals in 24 months; requirements ≠ closed deals.
- ◻️ 3–6 months, consistent with a sub-8% vacancy market.
  - Submarket vacancy is dominated by small and mid-size bays.
- ◻️ 24+ months because big boxes never lease.
  - Overly pessimistic; there is demonstrated demand.
- ◻️ Use the 12 requirements as 12 chances and assume 3 months.
  - Requirements convert slowly and many are BTS or already committed.

**Takeaway:** For large-format space, underwrite downtime off size-specific deal flow, not market-wide vacancy.
**Tips:** Count closed deals by size band. Requirements overstate real demand. Add TI/LC and carry for the long tail.

---

### 4. Which retail comps actually belong?
*comp-selection · intermediate · retail · acquisitions, portfolioMgmt*

You're pricing a grocery-anchored neighborhood center (anchored by a regional grocer, 92% leased, 1.2 mi to a competing center). Candidate comps: (a) grocery-anchored center, same metro, similar trade area, sold 5 months ago at 6.4%; (b) shadow-anchored strip, sold 3 months ago at 7.1%; (c) lifestyle center in a higher-income submarket, sold 4 months ago at 5.6%; (d) grocery-anchored center, different state, sold 20 months ago at 6.0%.

**Q: Which comps do you weight most?**

- ✅ (a) most, with (b) and (d) as bracketing context — closest on anchor type, trade area and timing.
  - Anchor type and trade area drive retail cap rates.
- ◻️ (c) — the lowest cap proves the center is undervalued.
  - Different product and income profile; cherry-picking the low print.
- ◻️ Average all four equally for a statistically balanced view.
  - Equal weighting dilutes the best evidence with poor comps.
- ◻️ (d) — most recent grocery-anchored data point regardless of market.
  - It is the oldest and from another market; rates have moved.

**Takeaway:** Weight comps by anchor/tenancy profile, trade area, and recency, not by whichever print supports the number.
**Tips:** Match anchor type first. Adjust older comps for rate moves. Disclose excluded comps.

---

### 5. The only recent trade is a portfolio deal
*comp-selection · advanced · industrial · acquisitions, portfolioMgmt*

Your single-asset industrial bid needs support. The only trades in the last 9 months are one 12-building portfolio at a 5.4% cap (reported as a blended price) and two older single-asset trades from 15+ months ago at 5.9% and 6.0%. Rates are up ~40 bps since those older trades.

**Q: How do you use this evidence?**

- ✅ Treat the portfolio cap as a lower bound that includes a portfolio premium, roll the older comps forward ~40 bps, and triangulate a range rather than a point.
  - Portfolios can carry a scale premium or hide asset-level pricing; aged comps need adjustment.
- ◻️ Use 5.4% — it's the most recent.
  - Ignores portfolio premium and allocation uncertainty.
- ◻️ Use 5.9–6.0% unadjusted; they are single assets like yours.
  - Ignores 15 months of rate movement.
- ◻️ Refuse to price until more comps exist.
  - Thin evidence is normal; the job is a defended range.

**Takeaway:** Thin comp sets call for adjusted ranges with stated caveats, not a false-precision point.
**Tips:** Portfolio ≠ single-asset pricing. Roll aged comps by rate change. Show low / base / high.

---

### 6. Free rent vs. lower face rent — which costs the landlord less?
*lease-econ · intermediate · retail · acquisitions, assetManagement*

A 5-year retail lease: Option A is $30/SF NNN with 6 months free rent; Option B is $27.50/SF NNN with 0 free rent. Buyer cap rates apply to in-place NOI, and you plan to sell in year 3.

- **A:** $30 face, 6 mo free
- **B:** $27.50 face, no free rent
- **Hold:** 3 years

**Q: Which is better for the landlord and why?**

- ✅ Depends on the exit: free rent hurts effective rent in years 1–3 but A's higher face rent is capitalized at sale, so A wins if the free period is burned off before sale.
  - A: net effective ≈ $27.00/yr over 5 yrs (30 × 4.5 ÷ 5); B: $27.50. B wins on pure 5-yr NER, A wins on capitalized value at a sale after free rent expires, since face rent drives value.
- ◻️ B always — higher net effective rent.
  - Ignores capitalization of face rent at exit.
- ◻️ A always — face rent is higher.
  - Ignores the lost cash flow in the free period.
- ◻️ They are identical because total dollars are similar.
  - They differ in timing and in what a buyer capitalizes.

**Takeaway:** Compare NER for cash economics and face rent for exit value; hold period decides which dominates.
**Tips:** NER = total rent ÷ term. Buyers often credit remaining free rent at closing. Check how the buyer treats free rent in the PSA.

---

### 7. Hotel: RevPAR is up 5% — is NOI?
*lease-econ / sensitivity · intermediate · hotel · assetManagement, portfolioMgmt*

A select-service hotel reports RevPAR +5% YoY from rate growth (ADR +5%, occupancy flat). Management says NOI should rise ~5%. Operating costs (labor, insurance, utilities) rose 7%, and about 60% of the cost base is non-variable.

**Q: What happens to NOI?**

- ✅ NOI likely rises less than 5% or can fall — revenue growth is rate-driven (high flow-through) but fixed costs growing 7% erode it, so model the flow-through explicitly.
  - Rate growth has high flow-through, but with costs up 7% the net margin impact must be computed.
- ◻️ NOI rises 5% — NOI moves with RevPAR.
  - Ignores operating leverage and cost inflation.
- ◻️ NOI falls because RevPAR growth is always offset by costs.
  - Overstated; depends on the numbers.
- ◻️ NOI is unrelated to RevPAR.
  - RevPAR is the primary revenue driver.

**Takeaway:** Hotels have high operating leverage; flow-through, not RevPAR, determines NOI.
**Tips:** Rate flow-through ≫ occupancy flow-through. Separate fixed and variable costs. Stress ADR and cost growth together.

---

### 8. Which assumption moves value most?
*sensitivity · intermediate · multifamily · acquisitions, portfolioMgmt*

A stabilized deal: NOI $2.0M, going-in cap 5.5%, 5-year hold, 60% LTV. Plausible ranges: exit cap ±50 bps, rent growth ±100 bps/yr, vacancy ±200 bps, opex growth ±100 bps/yr.

**Q: Which sensitivity is typically the largest driver of levered IRR?**

- ✅ Exit cap rate — a 50 bps move reprices the whole terminal value, amplified by leverage.
  - Terminal value is the largest cash flow and leverage amplifies changes in it.
- ◻️ Vacancy ±200 bps — it hits every year of income.
  - Material but smaller than a repricing of the sale.
- ◻️ Opex growth — it compounds.
  - Compounds at 1 pt/yr on a 40% expense ratio; smaller effect.
- ◻️ They are all roughly equal by design.
  - Ranges are not equal impact.

**Takeaway:** Rank sensitivities by impact per plausible range; exit cap and leverage usually dominate.
**Tips:** Tornado-chart the inputs. Use realistic ranges, not equal ones. Show IRR and equity multiple.

---

### 9. Land basis vs. cost overrun: yield-on-cost cushion
*sensitivity · advanced · multifamily · development, mortgageUw*

A development pencils to 6.5% yield on cost against a 5.25% market exit cap (125 bps spread, the sponsor's minimum). Budget is $60M. Your lender asks what cost overrun or rent shortfall erases the spread.

**Q: Approximately how much can costs rise before the spread falls below 100 bps (holding NOI constant)?**

- ✅ About 4% (~$2.4M): YoC 6.5% × 60 = $3.9M NOI; at 100 bps spread need 6.25% YoC → cost ≤ $62.4M.
  - $3.9M ÷ 6.25% = $62.4M, i.e. +$2.4M (~4%) overrun.
- ◻️ About 10% — spread falls linearly with cost.
  - YoC is inverse in cost; 10% overrun cuts YoC to ~5.9%.
- ◻️ About 1% — margins are razor thin.
  - Understates the cushion.
- ◻️ Cost overruns don't matter if rents grow.
  - NOI growth is a separate assumption.

**Takeaway:** YoC cushion = NOI ÷ target YoC; translate spread into a dollar overrun capacity.
**Tips:** Overrun capacity = NOI/target − budget. Pair with rent-shortfall sensitivity. Contingency should sit below the cushion.

---

### 10. The lease-up reserve is sized to the wrong thing
*absorption · intermediate · office · development, mortgageUw*

A spec office building is 20% pre-leased. The loan has a lease-up reserve sized at 12 months of interest. Brokers say comparable new buildings in the submarket took 24–30 months to reach 85%. Tenant TI/LC for the remaining space is not in the reserve.

**Q: What's the main gap in the reserve?**

- ✅ It's both too short (12 vs 24–30 month lease-up) and incomplete (excludes TI/LC for yet-unleased space); size to the realistic timeline plus leasing costs.
  - Carry and leasing costs both scale with the lease-up tail.
- ◻️ Nothing — 12 months is market standard.
  - Contradicted by comps.
- ◻️ Only the length; TI/LC are paid from operating cash flow.
  - There's little operating cash flow before stabilization.
- ◻️ Only TI/LC; interest carry is covered by the borrower's other income.
  - Carry exposure is the lender's main risk.

**Takeaway:** Size lease-up reserves to realistic lease-up duration plus leasing capital, not a formulaic carry period.
**Tips:** Use comp lease-up durations. TI/LC on unleased space is a hard cost of stabilization. Stress with a 6-month slip.
