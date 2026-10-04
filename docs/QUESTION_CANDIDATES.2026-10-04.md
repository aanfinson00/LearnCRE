# Question candidates — 2026-10-04

Ten new **situational** drafts aimed at the thinnest areas of the shipped bank. These are *candidates for review only* — nothing here is registered in `src/quiz/situational/index.ts`. Accept one and it gets turned into a `SituationalCase` file per `docs/agent-instructions.md`.

## Coverage gaps (72 situational cases)

Note: the live `question_submissions` table was not reachable (the only active Supabase project has no such table), so "approved" here means shipped in the repo.

| Area | Count | Candidates below |
|---|---|---|
| category `absorption` | 1 | #1, #2, #3 |
| category `comp-selection` | 2 | #4, #5 |
| category `lease-econ` | 2 | #6, #7 |
| category `sensitivity` | 2 | #8, #9 |
| role `development` | 9 (vs 40 acquisitions) | #1, #10 |

Option letters are for review only; the app shuffles at run-time. ✅ = best answer.

---

### 1. How long to stabilize with five competing lease-ups?
*absorption · intermediate · multifamily · development, acquisitions*

A 200-unit garden project delivers into a submarket where six lease-ups (yours included) are open at the same time. Submarket net absorption is running 120 units/month. Your lender sizes to 95% occupancy.

- Units: 200 · Stabilization target: 95% (190 units)
- Submarket net absorption: 120 units/mo, split across 6 lease-ups
- Concessions: 1 month free, stable

**Q: Assuming a fair-share capture, roughly how long to hit 95%?**

- ✅ ~10 months — fair share is 120 ÷ 6 = 20 units/mo; 190 ÷ 20 ≈ 9.5.
- ◻️ ~2 months — divides 190 by the whole submarket's 120/mo, ignoring that five other projects are drawing the same renters.
- ◻️ ~12 months — "lease-up always takes a year" is a rule of thumb, not an underwriting.
- ◻️ Can't be estimated until you know rent growth — absorption is observable, so compute it.

**Takeaway:** Absorption is shared. Divide net submarket demand by the number of competing lease-ups before dividing your units into it.
**Tips:** Use fair share as the base case, then stress at 75% of it · Net absorption, not gross leasing · Add the lender's occupancy-test window on top.

### 2. What does 6 years of supply mean for rents?
*absorption · intermediate · office · acquisitions, assetManagement*

A 1.2M SF office submarket is 18% vacant. Net absorption has averaged 60,000 SF/yr for three years. 250,000 SF is under construction, 40% pre-leased.

- Vacant today: 216,000 SF · Pipeline unleased: 150,000 SF · Absorption: 60,000 SF/yr

**Q: What is the most defensible conclusion for underwriting rent growth?**

- ✅ Vacant + unleased pipeline is 366,000 SF ≈ 6 years of absorption; landlords lack pricing power, so underwrite flat rents and heavy concessions.
- ◻️ 18% vacancy will fall quickly because 40% of the pipeline is pre-leased — pre-leasing is already in the unleased figure and just moves tenants between buildings.
- ◻️ Use the 3-year absorption average to underwrite 3% annual rent growth — growth needs vacancy tightening, not just positive absorption.
- ◻️ Ignore the pipeline; it is a different submarket — buyers of competing space compete for the same tenants.

**Takeaway:** Years-of-supply (vacancy + unleased pipeline ÷ annual absorption) tells you whether rents can grow.
**Tips:** Above ~4–5 years, assume no rent growth · Pre-leased space still pulls tenants out of existing buildings · Check whether absorption was inflated by one big user.

### 3. Gross leasing was strong — why is occupancy flat?
*absorption · beginner · industrial · assetManagement, acquisitions*

A submarket reports 400,000 SF of leasing activity this quarter. Occupancy didn't change.

- Gross absorption: 400,000 SF · Move-outs: 350,000 SF · Deliveries: 0

**Q: What should you take from this?**

- ✅ Net absorption was only 50,000 SF; heavy turnover means the headline overstates demand, so watch net absorption.
- ◻️ Demand is very strong — headline leasing includes renewals and tenant shuffling.
- ◻️ The data must be wrong; occupancy must rise if leasing is positive.
- ◻️ Industrial demand has collapsed — net is still positive.

**Takeaway:** Occupancy follows net absorption (move-ins minus move-outs), not gross leasing volume.
**Tips:** Ask whether renewals are counted · Compare against deliveries · Track net for 4+ quarters.

### 4. Which comp should you throw out?
*comp-selection · intermediate · office/retail · acquisitions*

You are pricing a stabilized asset off three recent trades.

- Comp A: 5.50% cap — buyer assumed below-market 3.5% debt
- Comp B: 5.60% cap — arm's-length, similar vintage and tenancy
- Comp C: 6.20% cap — 1031 buyer with a 10-day identification deadline, off-market

**Q: How should you treat the set?**

- ✅ Anchor on Comp B, and either adjust or discount A (financing inflated price) and C (motivated buyer) — price off clean, arm's-length trades.
- ◻️ Average all three at 5.77% — mixes distorted trades with clean ones.
- ◻️ Use the lowest cap (A) as it's the most recent evidence of strength.
- ◻️ Use the highest cap (C) to be conservative — it embeds a one-off timing discount.

**Takeaway:** A comp is only as good as its terms; strip out financing and motivation effects before using the cap.
**Tips:** Ask how each deal was financed · Note 1031 / forced-sale pressure · Prefer fewer clean comps over many noisy ones.

### 5. Does the $38 comp prove upside?
*comp-selection · intermediate · office · acquisitions*

A broker says a nearby 10-year lease at $38/SF face proves your $32/SF in-place rent is below market.

- Comp: $38 face, 12 months free, $80/SF TI
- Subject: $32 face, 3 months free, $40/SF TI
- Term: 10 years (approximate, undiscounted)

**Q: What is the best response?**

- ✅ Compare net effective rents — comp ≈ $38 × 0.9 − $8 ≈ $26; subject ≈ $32 × 0.975 − $4 ≈ $27. No upside.
- ◻️ Agree — $38 vs $32 shows $6 of mark-to-market.
- ◻️ Average the two face rents to $35.
- ◻️ Throw the comp out because it has TI.

**Takeaway:** Compare rents after concessions. Face rent comps hide free rent and TI.
**Tips:** Net effective = face less free rent and amortized TI/LC · Put every comp on the same term · Discount if you want precision.

### 6. Underwriting the rollover: renew or re-let?
*lease-econ · intermediate · office/retail · assetManagement, acquisitions*

A tenant's lease expires in 12 months. Historical renewal rate for this tenant type is 70%.

- Renewal: 0 downtime, $10/SF TI, 3% LC
- New tenant: 9 months downtime, $50/SF TI, 6% LC

**Q: How should the rollover be underwritten?**

- ✅ Probability-weight the two (70/30) into blended downtime, TI and LC.
- ◻️ Assume the tenant always renews — ignores 30% risk.
- ◻️ Assume the space always goes vacant — over-penalizes.
- ◻️ Use the average of the two cost sets without weighting — ignores the actual renewal odds.

**Takeaway:** Market-leasing assumptions are probabilities. Blend them with the renewal rate.
**Tips:** Blended downtime ≈ 0.3 × 9 = 2.7 months · Check the tenant's own history, not just the market · Test at 50% renewal.

### 7. Free rent or a lower face rate?
*lease-econ · intermediate · office · acquisitions, assetManagement*

You're planning a sale in 2 years. A tenant will sign a 5-year lease; you can give 6 months free (10% of term) or cut face rent 8%.

- Face rent: $30/SF · Cap rate: 6.0%

**Q: Which concession is better for the owner?**

- ✅ Free rent — it is a one-time credit; the lower face rent permanently cuts NOI, which a buyer capitalizes at 6% (~$40/SF of value per $2.40 of rent).
- ◻️ Lower face rent — 8% is less than 10%.
- ◻️ Identical — both cost about the same in nominal dollars.
- ◻️ Free rent — because it improves the in-place cap rate.

**Takeaway:** Rent drops are capitalized into value; free rent is one-time. Prefer free rent, TI, or other non-recurring concessions when a sale is coming.
**Tips:** $ cost ≠ value cost · Buyers credit outstanding free rent at closing · Check lender treatment too.

### 8. How much does 50 bps on exit cap cost?
*sensitivity · beginner · any · acquisitions, portfolioMgmt*

You underwrite a 5.50% exit cap. Holding NOI constant, what if the market exits at 6.00%?

- Cap move: +50 bps · NOI: unchanged

**Q: Roughly how much lower is the sale price?**

- ✅ About 8% (1 − 5.50 ÷ 6.00 = 8.3%).
- ◻️ About 0.5% — confuses bps with percent of value.
- ◻️ About 5% — treats 50 bps as 5%.
- ◻️ About 9% — that's the *gain* if caps compress 50 bps.

**Takeaway:** Value moves inversely with cap. A small cap move is a large value move at low caps.
**Tips:** Price % change ≈ Δcap ÷ new cap · Compression and expansion aren't symmetric · Always run exit-cap sensitivity.

### 9. What does +100 bps do to a floating-rate loan?
*sensitivity · intermediate · multifamily · mortgageUw, assetManagement*

A $40M interest-only loan floats at SOFR + 300. SOFR is 4.50%.

- NOI: $3.6M · Rate today: 7.50% · Interest: $3.0M → DSCR 1.20x

**Q: Where does DSCR land if SOFR rises 100 bps?**

- ✅ ~1.06x — interest rises $400k to $3.4M; $3.6M ÷ $3.4M ≈ 1.06x. A rate cap is worth pricing.
- ◻️ ~1.18x — treats +100 bps as a minor move.
- ◻️ ~1.00x exactly.
- ◻️ Unchanged — NOI is fixed.

**Takeaway:** On a floater with thin coverage, 100 bps costs ~0.14x of DSCR. Size and hedge for the stress case.
**Tips:** Interest change = balance × Δrate · Check cash-trap triggers · Model the cap strike, not just SOFR.

### 10. Is a 125 bps yield-on-cost spread enough?
*pricing/sensitivity · intermediate · development · development, portfolioMgmt*

You're underwriting ground-up multifamily.

- Total cost: $50.0M · Stabilized NOI: $3.25M (6.50% YOC) · Market cap: 5.25%

**Q: What's the right read?**

- ✅ 125 bps is thin; a 5% cost overrun ($52.5M) drops YOC to ~6.19% (94 bps), leaving little cushion for lease-up and exit risk.
- ◻️ Fine — any positive spread is profit.
- ◻️ Strong — 6.5% beats the market 5.25% by over 100 bps, so build.
- ◻️ Irrelevant — compare IRR only.

**Takeaway:** Developers typically need ~150–200 bps over market cap to cover execution risk.
**Tips:** YOC = stabilized NOI ÷ total cost · Stress cost +5–10% and NOI −5% · Spread is the margin of safety.
