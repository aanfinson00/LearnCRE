# Question candidates — 2026-11-07

Ten draft situational-case phrasings aimed at the thinnest parts of the bank. Not yet TypeScript and not registered in `src/quiz/situational/index.ts`. Approve or edit, then convert each to a `SituationalCase`, tag its roles, and register it.

## Coverage gap that drove the picks (72 situational cases)

| Dimension | Thinnest slots (count) | Best-covered (count) |
|---|---|---|
| category | absorption (1), comp-selection (2), lease-econ (2), sensitivity (2) | deal-process (21), document-literacy (13) |
| role | development (9), mortgageUw (19) | acquisitions (40), assetManagement (31) |
| assetClass | hotel (1), retail (2), industrial (3) | multifamily (11), office (9) |

Counts come from `category`, `roles` and `assetClass` in `src/quiz/situational/*.ts`. The bank has 69 quiz templates besides these. The cloud `question_submissions` table was not reachable from this run, so "approved" is read as "shipped in the bank".

All math below was hand-checked. Each answer key is option A, and `pickCases` shuffles the order at run-time.

---

### 1. Spec industrial lease-up (absorption · industrial · development, acquisitions · intermediate)
**Scenario:** A 400,000 SF spec distribution building delivers next month, 25% pre-leased. Submarket net absorption has averaged 450,000 SF/yr, and comparable new-construction buildings have captured about 20% of it.
**Data:** Remaining vacancy 300,000 SF · submarket absorption 450,000 SF/yr · expected capture share 20%
**Q:** About how long to lease the remaining space?
- ✅ ~40 months. Capture is 450,000 × 20% = 90,000 SF/yr, so 300,000 ÷ 90,000 ≈ 3.3 yrs.
- ◻️ ~8 months. Uses all submarket absorption (300k ÷ 450k × 12) as if the building wins every deal.
- ◻️ ~16 months. Applies a 50% share with no basis in the comps.
- ◻️ Can't be estimated without rent growth.
**Takeaway:** Lease-up speed is your capture share of absorption, not the submarket total. Competing deliveries cut that share.

### 2. Retail lease-up with a known rollover (absorption · retail · asset management, acquisitions · advanced)
**Scenario:** A 120,000 SF center is 82% leased. A 20,000 SF junior anchor gave non-renewal notice and leaves in 6 months. Stabilization means 90% leased, and the center has leased about 4,000 SF per quarter.
**Q:** About how many months until it is back to 90% leased?
- ✅ ~28 months. After the anchor leaves it is at 78,400 SF leased and needs 108,000 SF, a gap of 29,600 SF. At 4,000 SF/qtr that is 7.4 quarters, about 22 months after month 6.
- ◻️ ~6 months. Counts only the 8-pt gap vs. today's 82% (9,600 SF) and ignores the exit.
- ◻️ ~14 months. Measures the gap from 82% but leaves the box vacancy out.
- ◻️ ~42 months. Uses the 82%→90% gap plus a full 12-month dark period for the box.
**Takeaway:** Re-base occupancy to the known post-rollover figure before dividing by pace.

### 3. Headline vs. net effective rent comps (comp-selection · office · acquisitions · intermediate)
**Scenario:** Comp A: $38/SF, 10-yr lease, 12 months free, $80 TI. Comp B: $34/SF, 7-yr lease, 4 months free, $30 TI. Compare on a simple straight-line, undiscounted basis.
**Q:** Which comp better supports the subject's effective-rent assumption?
- ✅ B. Net effective is ≈ $28.10 vs. A's ≈ $26.20. A: $38 × 108/120 = $34.20, less $80 ÷ 10 = $8, so $26.20. B: $34 × 80/84 = $32.38, less $30 ÷ 7 = $4.29, so $28.10.
- ◻️ A, because it has the higher headline rent.
- ◻️ A, because longer terms always command a premium.
- ◻️ Neither; concessions can't be compared across deals.
**Takeaway:** Compare comps on net effective rent. Headline rent plus concessions hides the real economics.

### 4. Renovated vs. unrenovated sale comps (comp-selection · multifamily · acquisitions, mortgageUw · intermediate)
**Scenario:** A 1998-vintage, unrenovated 220-unit subject. Comp 1 is a 2022 renovated 1997 deal at $210k/unit, and renovation cost about $22k/unit. Comp 2 is an unrenovated 1996 deal at $175k/unit.
**Q:** How should the comps be weighted?
- ✅ Lean on Comp 2 as the base. Back Comp 1 down by renovation cost plus a profit/risk load (about $210k − $25k ≈ $185k) and use it as an upper bound, giving roughly $175–185k/unit.
- ◻️ Average the two unadjusted ($192.5k), since both are 1990s vintage.
- ◻️ Use Comp 1 only, since it is the more recent trade.
- ◻️ Ignore both, since neither matches the year built exactly.
**Takeaway:** Adjust to the subject's condition. Value-add comps need the capex and margin stripped out.

### 5. Percentage rent breakpoint (lease-econ · retail · asset management · intermediate)
**Scenario:** A 5,000 SF tenant pays $30/SF base rent plus 6% of sales above the natural breakpoint. Sales this year were $580/SF.
**Data:** Base rent $150,000 · percentage rate 6% · sales $2.9M
**Q:** How much percentage rent is owed?
- ✅ $24,000. The natural breakpoint is $150,000 ÷ 6% = $2.5M, and 6% × ($2.9M − $2.5M) = $24,000.
- ◻️ $174,000. Takes 6% of total sales ($2.9M × 6%) and stops there.
- ◻️ $24,000 on top of a re-based rent. Double-counts the base.
- ◻️ $0. Percentage rent only applies above 100% of market.
**Takeaway:** The natural breakpoint is base rent ÷ percentage rate. Percentage rent applies to sales above that.

### 6. Free rent and the quoted cap rate (lease-econ · office · acquisitions, mortgageUw · intermediate)
**Scenario:** An asset is offered at $20M at a 6.5% cap on $1.3M contractual NOI. A tenant paying $400k/yr has 6 months of free rent still to run.
**Q:** What should the buyer do about the free rent?
- ✅ Ask for a $200k closing credit, because the $1.3M NOI includes rent the buyer won't collect in year one.
- ◻️ Nothing; the cap rate is already stabilized.
- ◻️ Ask for the credit but cut the price by a further 6 months of NOI.
- ◻️ Ask the seller to extend the lease instead.
**Takeaway:** Contractual cap rate is not cash NOI. Outstanding free rent and TI belong in a closing credit.

### 7. Development margin stress (sensitivity · multifamily · development, portfolioMgmt · advanced)
**Scenario:** A project costs $50M and stabilizes at $3.25M NOI (6.5% yield on cost) with a 5.25% exit cap, for a base profit of $11.9M. Two shocks are being considered: +50 bps on the exit cap, and +10% on cost.
**Q:** What is the profit if both hit at once?
- ✅ About $1.5M. Value falls to $56.5M ($3.25M ÷ 5.75%) and cost rises to $55M. Each shock alone leaves ~$6.5–6.9M.
- ◻️ About $5M. Counts only the cost overrun.
- ◻️ About $6.5M. Counts only the cap-rate move.
- ◻️ About $11.9M. Development profit is insensitive to the exit cap.
**Takeaway:** Margin is thin, and shocks compound. Run the two-way grid, not one variable at a time.

### 8. ADR vs. occupancy drop (sensitivity · hotel · asset management, portfolioMgmt · advanced)
**Scenario:** A 200-key hotel runs 70% occupancy at a $160 ADR. Variable cost is about $35 per occupied room-night. Scenario X is ADR −$10 (−6.25%); scenario Y is occupancy −5 pts (−7.1%). Both are roughly equal in RevPAR terms.
**Q:** Which hurts profit more?
- ✅ ADR −$10, at about $511k vs. about $456k. ADR cuts flow through 100% (51,100 nights × $10), while a lost room-night saves the $35 variable cost (3,650 × ($160 − $35)).
- ◻️ Occupancy, because it is the larger RevPAR decline.
- ◻️ They are equal because RevPAR is the same.
- ◻️ Neither; hotels reprice daily.
**Takeaway:** RevPAR hides flow-through. Rate cuts hit GOP harder than volume cuts.

### 9. Construction interest reserve sizing (sensitivity · development · mortgageUw, development · advanced)
**Scenario:** A $30M construction loan at 7.5% funds linearly over 18 months, then stays fully drawn for a 6-month lease-up.
**Q:** About how big should the interest reserve be?
- ✅ ≈ $2.8M. Construction: average balance $15M × 7.5% × 1.5 yrs ≈ $1.69M. Lease-up: $30M × 7.5% × 0.5 yrs ≈ $1.125M.
- ◻️ ≈ $4.5M. Treats the full loan as outstanding for the 2 years.
- ◻️ ≈ $1.7M. Leaves lease-up interest out.
- ◻️ ≈ $1.1M. Counts only lease-up.
**Takeaway:** Reserve = average balance during construction + full balance during lease-up. Lenders will add a cushion.

### 10. Yield-on-cost spread (investment-thesis · industrial · development, portfolioMgmt · intermediate)
**Scenario:** A speculative industrial project is underwritten to a 6.0% yield on cost. Market cap rates are 5.5%, and the fund requires at least a 100–150 bps spread to proceed.
**Q:** What does the spread imply?
- ✅ Don't proceed as drawn. The 50 bps spread implies only a ~9% margin ($1 of NOI is worth $18.18 and costs $16.67). That is not enough for entitlement, construction and lease-up risk.
- ◻️ Proceed; any positive spread is accretive.
- ◻️ Proceed, but add leverage until IRR clears the hurdle.
- ◻️ Wait for cap rates to compress.
**Takeaway:** Development spread is the buffer for risk. If the spread is thin, buy existing assets instead.
