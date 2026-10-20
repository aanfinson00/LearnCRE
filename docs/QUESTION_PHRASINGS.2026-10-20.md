# Candidate question phrasings — 2026-10-20

Source of thin areas: Supabase `question_submissions` (approved counts) was unreachable — the `learncre` project is paused (INACTIVE). Gaps below come from repo content counts instead:

- Situational categories: absorption (1), comp-selection (2), lease-econ (2), sensitivity (2) vs deal-process (21), document-literacy (13)
- Roles: development (9) vs acquisitions (40), assetManagement (31)
- Asset classes: hotel (1), retail (2), industrial (3) vs office (9)

These are drafts for review, not registered content. Each follows the `SituationalCase` shape (scenario → question → one best answer). Answer sketches are unverified; check the math before promoting.

| # | Category | Role | Asset | Difficulty |
|---|----------|------|-------|-----------|
| 1 | absorption | development | industrial | intermediate |
| 2 | absorption | acquisitions | retail | beginner |
| 3 | comp-selection | acquisitions | retail | intermediate |
| 4 | comp-selection | portfolioMgmt | hotel | advanced |
| 5 | lease-econ | assetManagement | retail | intermediate |
| 6 | lease-econ | acquisitions | industrial | beginner |
| 7 | sensitivity | development | mixed | advanced |
| 8 | sensitivity | mortgageUw | hotel | intermediate |
| 9 | absorption | development | multifamily | intermediate |
| 10 | lease-econ | assetManagement | office | advanced |

---

### 1. Spec industrial: is the pipeline eating your lease-up?
**Scenario:** You're evaluating a 400,000 SF spec warehouse. Submarket vacancy is 7%, but 2.1M SF is under construction against trailing 12-month net absorption of 1.4M SF. Your pro forma assumes 12-month lease-up.
**Q:** What is the most defensible way to test the lease-up assumption?
**Best:** Divide the under-construction pipeline by trailing net absorption (~18 months of supply) and underwrite a lease-up that competes for a share of absorption, not the whole market.
**Distractors:** use current 7% vacancy as proof of demand; assume pre-leasing is irrelevant for spec; average the last 5 years of absorption regardless of cycle.

### 2. Retail: how long to fill the box?
**Scenario:** A grocery-anchored center has a 22,000 SF junior-anchor box going dark in 6 months. Comparable boxes have averaged 14 months to re-lease, with 6 months of free rent and $35/SF TI.
**Q:** What downtime and cost should the underwriting carry?
**Best:** Carry vacancy through expiry plus ~14 months, then free rent and TI, and add leasing commissions — not a flat renewal probability alone.
**Distractors:** assume 12-month blended downtime; ignore free rent because it is non-cash; assume the anchor's co-tenancy clauses are irrelevant.

### 3. Which retail comps actually count?
**Scenario:** You have four sale comps for a 60,000 SF neighborhood center: a 2019 power center, a 1998 grocery-anchored center two miles away, a 2005 strip center across the highway, and a single-tenant pad site.
**Q:** Which should drive the cap-rate conclusion?
**Best:** The grocery-anchored center first, adjusted for age and traffic; the others only as bounds, because anchor type and tenancy drive retail cap rates more than vintage.

### 4. Hotel comps: RevPAR index vs. price per key
**Scenario:** A 180-key select-service hotel is being priced off per-key comps. Two comps sold at $140K/key but have 25% higher RevPAR; one sold at $95K/key with a pending PIP.
**Q:** How should the comps be normalized?
**Best:** Normalize to price as a multiple of NOI (or per-key adjusted for RevPAR index and PIP cost) before comparing; raw per-key ignores earnings and capex.

### 5. Retail percentage rent: is it real income?
**Scenario:** An inline tenant pays $28/SF base with 6% percentage rent over a $400/SF natural breakpoint. Reported sales are $385/SF, rising 3%/yr.
**Q:** How should percentage rent be treated in the underwriting?
**Best:** Exclude it from Year 1 (below breakpoint) and model it only if projected sales cross the breakpoint, haircutting for sales-reporting risk.

### 6. Industrial NNN vs. modified gross
**Scenario:** Two industrial leases both quote $9.00/SF: one NNN, one modified gross with a $2.10 expense stop.
**Q:** Which is worth more to the landlord, all else equal?
**Best:** The NNN, because the modified gross leaks expense growth above the stop; compare on a net-effective basis.

### 7. Development sensitivity: which input moves yield-on-cost most?
**Scenario:** A mixed-use project underwrites to a 6.8% yield on cost against a 5.5% exit cap. Hard costs are $320/SF, rents $4.10/SF/mo.
**Q:** Which sensitivity should be run first to judge deal risk?
**Best:** A joint rent × hard-cost grid showing breakeven vs. the required spread over exit cap; one-variable tornado charts hide correlated downside.

### 8. Hotel debt: how fragile is the DSCR?
**Scenario:** A hotel loan shows 1.45× DSCR on trailing NOI. Revenue is highly operating-leveraged (~65% flow-through).
**Q:** What RevPAR decline takes DSCR below the 1.25× covenant?
**Best:** Compute the NOI decline needed (~14% of NOI) and translate through flow-through: roughly a 9% RevPAR drop — much thinner than the headline cushion suggests.
**Note:** verify arithmetic before use.

### 9. Multifamily lease-up: concessions vs. pace
**Scenario:** A 300-unit new build is leasing 18 units/month at 2 months free; the plan assumes 25 units/month with 1 month free.
**Q:** What should the reforecast do?
**Best:** Re-underwrite at the observed pace and concession load, then test whether burning concessions to hit pace beats a slower, higher-effective-rent lease-up.

### 10. Office: gross-up the effective rent
**Scenario:** A 10-year office lease at $42/SF has 8 months free and $85/SF TI. A competing offer is $38/SF with 4 months free and $60/SF TI.
**Q:** Which has the better net effective rent to the landlord?
**Best:** Convert both to NER (rent less amortized TI and free rent, plus commission) at the landlord's cost of capital; the headline rent alone is misleading.
