# Question candidates — 2026-10-09

Automated gap pass. Nothing here is registered in the app; approve, edit or
reject each one, then scaffold approved ones as `SituationalCase` files per
`docs/agent-instructions.md`.

## Where the bank is thin

Counted from `src/quiz/situational/` (71 cases). The `question_submissions`
table in Supabase (project `learncre`) has zero rows, so there are no
community-approved questions to count. Gaps below come from the repo bank.

| Dimension | Thin spots |
|---|---|
| Category | absorption (1), lease-econ (2), sensitivity (2), comp-selection (2) vs deal-process (21) |
| Role | development (9) vs acquisitions (40) |
| Difficulty | beginner (4) vs advanced (34) / intermediate (33) |
| Asset class | hotel (1), retail (2), industrial (3) |

The 10 candidates target these gaps. Correct answer is **A** in each below;
`pickCases` shuffles at run-time.

---

### 1. Can the submarket absorb this pipeline? — absorption · intermediate · multifamily · acquisitions, development
**Scenario:** A submarket has 6,000 units at 93% occupancy. 900 units are under construction and deliver over the next 12 months. Trailing-12-month net absorption was 480 units. A sponsor says "demand is strong, it will all lease up."
**Q:** What does the pipeline imply for your underwriting?
- **A (best):** Deliveries are ~1.9x trailing absorption, so expect occupancy to fall and concessions to rise. Underwrite lease-up at the trailing pace, not a hoped-for one. *At 480 units/yr against 900 new, about 420 units go unabsorbed, roughly 5 points of occupancy (93% to ~88%) on a 6,900 base.*
- B: Trailing absorption understates demand, so assume the pipeline leases within 12 months. *Assumes a demand jump with no evidence.*
- C: The 93% occupancy gives enough cushion; pipeline is irrelevant. *Ignores that the cushion is only ~7% of inventory, about 420 units.*
- D: Only the units delivering in your submarket's top-quartile rent band matter. *Segments without data; total supply still pressures concessions.*
**Takeaway:** Compare pipeline to trailing absorption, not to current vacancy.

### 2. Is this retail center's lease-up realistic? — absorption · intermediate · retail · acquisitions
**Scenario:** A 120,000 SF neighborhood center is 70% leased. The seller's pro forma reaches 95% in 12 months. The submarket's average new-lease velocity for in-line space is 12,000 SF per year; the center has leased 9,000 SF in the last 12 months.
**Q:** What timeline is defensible?
- **A (best):** About 24+ months, using the center's own 9,000-12,000 SF/yr pace. *Gap to 95% is 30,000 SF; at 12,000 SF/yr that is 2.5 years.*
- B: 12 months as the seller states; brokers know the market.
- C: 6 months, because anchor-driven traffic lifts in-line demand immediately.
- D: Cannot be estimated without a market study; use the seller's figure meanwhile.
**Takeaway:** Convert vacancy to SF and divide by observed velocity.

### 3. Who pays when the lease says "gross with a base year"? — lease-econ · beginner · office · acquisitions, assetManagement
**Scenario:** A tenant signs a full-service lease at $30/SF with a 2025 base year. 2025 operating expenses were $10/SF. 2027 expenses are $11.50/SF.
**Q:** What happens to recoveries in 2027?
- **A (best):** The tenant pays $1.50/SF above base on top of $30 rent; the landlord keeps the base-year expense risk. *Tenant reimburses only increases over base.*
- B: Tenant pays the full $11.50/SF as a NNN charge.
- C: Nothing changes; gross means the landlord absorbs all increases.
- D: Tenant's rent drops $1.50/SF because expenses rose.
**Takeaway:** Base year moves risk of growth, not level, to the tenant.

### 4. Is that percentage rent real income? — lease-econ · intermediate · retail · acquisitions, mortgageUw
**Scenario:** A tenant pays $35/SF base rent plus 5% of sales above a $700/SF natural breakpoint. Reported sales are $780/SF, up from $690/SF two years ago. The seller capitalizes $4/SF of percentage rent.
**Q:** How should you treat the $4/SF?
- **A (best):** Haircut or exclude it; it is volatile and sits just above the breakpoint. *5% x $80 = $4; a ~10% sales dip eliminates it.*
- B: Capitalize it fully, since sales are trending up.
- C: Treat it as guaranteed because it is contractual.
- D: Double it, because sales growth will compound.
**Takeaway:** Underwrite overage rent on a stressed sales figure.

### 5. How much does one more year of lease-up cost you? — sensitivity · intermediate · multifamily · acquisitions, development
**Scenario:** A value-add deal projects a 5.5% yield on cost at stabilization in 18 months. Interest carry and lost NOI mean each additional 6 months of lease-up reduces levered IRR by about 150 bps. The base-case IRR is 15%; the investor hurdle is 13%.
**Q:** What does the sensitivity tell you?
- **A (best):** The deal tolerates roughly 8 extra months of delay before breaching the hurdle, a thin cushion given the pipeline risk. *150 bps per 6 months; 200 bps of cushion is about 8 months.*
- B: The deal is safe; one lease-up variable cannot move IRR much.
- C: Delay matters only if rents also fall.
- D: Add 12 months to the base case so IRR looks safer.
**Takeaway:** Express cushion as time or bps, not as a pass/fail.

### 6. Which assumption breaks the deal first? — sensitivity · advanced · office · acquisitions, portfolioMgmt
**Scenario:** A two-way table shows IRR at 15.0% base. Exit cap +50 bps costs 120 bps of IRR. Renewal probability 75% to 50% costs 310 bps. Rent growth 3% to 2% costs 90 bps. Hurdle is 12%.
**Q:** Where should diligence focus?
- **A (best):** Renewal probability; it has the largest per-step impact and is the least observable from market data. *Base-to-hurdle cushion is 300 bps, so a 25-point renewal miss alone breaches it.*
- B: Exit cap, since cap rates are macro-driven.
- C: Rent growth, since it compounds every year.
- D: All equally; sensitivities are uniformly unreliable.
**Takeaway:** Rank sensitivities by impact times uncertainty.

### 7. Is this the right comp for a Class B hotel? — comp-selection · intermediate · hotel · acquisitions
**Scenario:** You are valuing a 150-key select-service hotel near an airport. Candidate comps: (1) 140-key select-service hotel 2 miles away, sold 5 months ago; (2) 400-key convention hotel downtown, sold 3 months ago; (3) 150-key airport hotel in another state, sold 18 months ago.
**Q:** Which comp should carry the most weight?
- **A (best):** Comp 1; same segment, size and demand driver, nearby and recent. *Per-key pricing only transfers across similar service level and RevPAR profile.*
- B: Comp 2; most recent and largest sale.
- C: Comp 3; the closest in size and use type.
- D: Average all three equally.
**Takeaway:** Match segment and demand driver before size and date.

### 8. Do these industrial comps actually compare? — comp-selection · intermediate · industrial · acquisitions, assetManagement
**Scenario:** Your target is a 100,000 SF, 32' clear, cross-dock distribution building. Comps: 250,000 SF, 36' clear; 90,000 SF, 24' clear older flex; 105,000 SF, 32' clear, 3 miles away with 2 years of lease term left.
**Q:** How do you use the third comp, which has the same specs but a short lease?
- **A (best):** Keep it for physical and location fit, but adjust for lease term and mark-to-market; a short WALT can print a higher cap or lower price. *Use rent and cap as separate adjustments.*
- B: Discard it; any lease difference makes it unusable.
- C: Use it unadjusted because specs match.
- D: Prefer the 250,000 SF comp since larger sales are more reliable.
**Takeaway:** Adjust, don't discard, a good physical comp.

### 9. Why did the budget increase before we broke ground? — risk · beginner · multifamily · development
**Scenario:** A ground-up project's hard-cost budget rose 6% between the GMP draft and the signed contract after two sub bids came in high. Contingency is 5% of hard costs. Pre-construction is 4 months in.
**Q:** What is the right first response?
- **A (best):** Value-engineer, re-check the contingency, and confirm the funding gap before closing. *A 6% rise already exceeds a 5% contingency before any site surprises.*
- B: Spend the contingency; that is what it is for.
- C: Close and revisit costs after groundbreaking.
- D: Ask the lender to increase the loan with no other changes.
**Takeaway:** Do not start construction with a spent contingency.

### 10. Does a hotel's RevPAR gain mean NOI gain? — diagnostic · intermediate · hotel · assetManagement, portfolioMgmt
**Scenario:** A 200-key hotel's RevPAR is up 8%, driven by ADR. Occupancy is flat, but payroll rose 11% and a brand PIP adds $1.2M in required capex. Flow-through on incremental revenue is usually 45-55%.
**Q:** What should you expect for NOI and cash flow?
- **A (best):** Modest NOI growth below 8%, and lower cash flow after FF&E and PIP spending. *Revenue growth is offset by wage inflation, and the PIP draws on reserves.*
- B: NOI up 8%, in line with RevPAR.
- C: NOI up more than 8% because of operating leverage.
- D: NOI is unchanged, because ADR gains are always passed to staff.
**Takeaway:** Check flow-through, labor and reserve spend, not RevPAR alone.

---

## Review notes
- Numbers in #1, #2, #5 and #6 were hand-checked; #4's sales breakpoint and #7-#8 comps are illustrative.
- Each candidate still needs `data` rows, three tips, full per-option explanations and a `roles` tag when scaffolded.
