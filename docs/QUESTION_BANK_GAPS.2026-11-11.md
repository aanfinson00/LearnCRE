<!-- generated 2026-11-11 by the scheduled question-bank coverage run -->

# Question bank coverage gaps + 10 candidate phrasings (2026-11-11)

## How coverage was measured

The intended signal was the `question_submissions` table (status = `approved`)
in the `learncre` Supabase project. That project is **paused / INACTIVE**, so
the database was not reachable this run and approval counts could not be
pulled. (Restoring a paused project changes billing state, so it was left
alone — restore it from the Supabase dashboard and re-run to get the real
approved-by-area numbers.)

As a proxy, coverage below is measured on the **shipped question bank**:
71 situational cases + 68 quiz templates + the 100-item review set
(`src/quiz/reviewQuestions.ts`), tallied by category, role, asset class and
difficulty.

## Where the bank is thin

| Dimension | Well covered | Thin (count) |
|---|---|---|
| Situational category | deal-process (21), document-literacy (13) | **absorption (1)**, **comp-selection (2)**, **lease-econ (2)**, **sensitivity (2)** |
| Asset class (situational) | multifamily (11), office (9), mixed (8) | **hotel (1)**, **retail (2)**, **industrial (3)** |
| Role (situational) | acquisitions (40), assetManagement (31) | **development (9)**, mortgageUw (19) |
| Role (quiz templates) | acquisitions (60) | **development (10)**, mortgageUw (16), portfolioMgmt (16) |
| Difficulty (situational) | advanced (34), intermediate (33) | **beginner (4)** |

Every candidate below hits at least two thin cells. Each is written in the
shape the Submit-a-question form / `SubmissionDraft` expects (multiple choice,
expected answer = letter, `kind_hint` / `role_hint` / `difficulty_hint` /
`tags`), so it can be approved as-is or lifted into
`src/quiz/situational/<id>.ts` per `docs/agent-instructions.md`.

Existing titles in the thin categories were checked so none of these
duplicates a shipped case (`absorption-timing`, `comp-set-vetting`,
`comp-vintage-adjustment`, `lease-structure-nnn-vs-gross`,
`ti-vs-rent-giveback`, `going-in-vs-exit-cap-spread`, `exit-cap-conservatism`,
the hotel RevPAR-index case, the retail percentage-rent case, the industrial
truck-court case).

---

### 1. Where does industrial vacancy land after the spec wave delivers?
`multipleChoice` · kind_hint: absorption · role_hint: development · difficulty: intermediate · tags: industrial, absorption, supply

**Scenario.** An industrial submarket has 20.0M SF of inventory at 4.0% vacancy (800K SF vacant). 1.5M SF is under construction and delivers over the next 12 months; 30% of it (450K SF) is pre-leased. Trailing-twelve-month net absorption has been 1.2M SF and already includes tenants taking down pre-leased space when they move in.

- Inventory: 20.0M SF · Vacancy: 4.0% (800K SF)
- Deliveries next 12 mo: 1.5M SF (450K pre-leased)
- Trailing net absorption: 1.2M SF/yr

**Q: If absorption holds at the trailing pace, where is vacancy in 12 months?**

- **A.** ~5.1% — vacant = 800K + 1.5M − 1.2M = 1.1M SF on a 21.5M SF base. ✅
  Net absorption already counts the pre-leased move-ins, so you add the full 1.5M SF to vacant and subtract 1.2M SF of absorption. Vacancy drifts up even in a healthy market because deliveries exceed absorption.
- **B.** ~4.0% — absorption of 1.2M SF covers the deliveries, so vacancy is flat.
  Only true if deliveries ≤ absorption. 1.5M > 1.2M, so 300K SF of net new vacancy lands on the market.
- **C.** ~10.7% — every delivered foot is vacant until proven leased.
  Ignores absorption entirely. That is a stress case, not a base case, and the prompt gives you a demand pace.
- **D.** ~3.0% — only the 1.05M SF of spec space adds to vacancy, then subtract 1.2M SF of absorption.
  Double-counts the pre-leasing: trailing absorption already includes pre-leased take-up, so you cannot also strip it out of the supply side.

**Takeaway.** Deliveries − net absorption = change in vacant SF. Check whether your absorption series already includes pre-leased move-ins before netting pre-leasing out of supply.

---

### 2. Negative net absorption but rents are up — what gives?
`multipleChoice` · kind_hint: absorption · role_hint: acquisitions · difficulty: beginner · tags: retail, absorption, market-read

**Scenario.** A retail submarket reports −150K SF of net absorption for the year, yet average asking rents rose 4%. You are underwriting a well-located grocery-anchored center in that submarket and the OM leans on the rent growth.

- Net absorption (TTM): −150K SF
- Asking rent change: +4%
- Subject: grocery-anchored, 96% leased

**Q: What most likely explains rents rising while absorption is negative?**

- **A.** The market is bifurcated: give-backs are concentrated in obsolete big-box / Class B-C space while well-located neighborhood centers are tight, so the average rent rises even as total occupied SF shrinks. ✅
  Submarket averages blend very different product. Negative absorption from a dark junior anchor can coexist with a tight, rent-growing grocery-anchored segment. Underwrite the subject against its own segment, not the headline.
- **B.** Negative absorption means tenants are expanding, which pushes rents up.
  Sign error — negative net absorption means occupied space fell.
- **C.** Rents lag absorption, so the 4% is stale and rents must fall next year.
  Possible in a uniformly weak market, but the prompt describes a 96%-leased subject in a tight segment. Lag alone does not explain a 4% rise.
- **D.** Asking rents are set by brokers and do not reflect any real deals.
  Asking rents do run ahead of effective rents, but they still move with demand. Check effective (net of free rent / TI) rents instead of dismissing the data.

**Takeaway.** Headline absorption and rent stats blend segments. When they disagree, look for bifurcation by quality and location before concluding one series is wrong.

---

### 3. Which hotels belong in the comp set?
`multipleChoice` · kind_hint: comp-selection · role_hint: assetManagement · difficulty: intermediate · tags: hotel, comp-set, RevPAR

**Scenario.** You manage a 180-key upper-midscale select-service hotel near a suburban office park. Ownership wants to add two new full-service luxury hotels downtown (ADR ~2.2× yours) to the STR competitive set because they are "where we want to be." The current set is five upper-midscale and upscale hotels within three miles.

- Subject: 180 keys, upper-midscale, suburban
- Proposed adds: 2 luxury full-service, downtown, ADR ~2.2×
- Current set: 5 hotels, same chain scales, ≤3 mi

**Q: How should the comp set be built?**

- **A.** Keep the set to hotels competing for the same demand — similar chain scale, location and ADR band — and benchmark against aspirational hotels separately if at all. ✅
  The comp set exists to tell you whether you are winning or losing your share of *your* demand. Adding luxury downtown product collapses your RevPAR index for reasons that have nothing to do with operations and hides real share loss or gain.
- **B.** Add them — a tougher set keeps the operator honest and shows the upside.
  It shows noise, not upside. A permanently sub-80 index against hotels you do not compete with gives the operator a built-in excuse and makes trend analysis useless.
- **C.** Use the whole metro market as the comp set.
  Market-wide data is a useful second lens, but as a comp set it averages in demand you never see (airport, convention, luxury) and blunts any signal.
- **D.** Pick the weakest nearby hotels so the index stays above 100.
  Gaming the index makes it worthless for asset management and will be seen through by any lender or buyer who rebuilds the set.

**Takeaway.** A comp set is a share-of-demand tool: same guest, same trip purpose, same price band. Aspirational benchmarks belong in the strategy deck, not the STR set.

---

### 4. Which sale comp needs the biggest adjustment?
`multipleChoice` · kind_hint: comp-selection · role_hint: acquisitions · difficulty: beginner · tags: multifamily, comps, cap-rate

**Scenario.** You are valuing a 2015-vintage, 240-unit garden multifamily asset. The broker's comp set has three sales:

- Comp 1: same submarket, same vintage, traded in mid-2021 at a 4.0% cap
- Comp 2: same submarket, 1990s vintage, traded 4 months ago at a 5.5% cap
- Comp 3: adjacent submarket, same vintage, traded 3 months ago at a 5.25% cap

**Q: Which comp requires the largest adjustment before you can use it?**

- **A.** Comp 1 — the 2021 trade predates a 150+ bps move in rates, so it needs a market-conditions (time) adjustment larger than any vintage or location adjustment. ✅
  Vintage and location adjustments are typically 25–50 bps. A rate regime change is far bigger, and a peak-cycle comp with no time adjustment anchors value too high. Many underwriters would drop it entirely.
- **B.** Comp 2 — a 1990s building is not comparable to a 2015 build.
  Vintage matters, but a 20-year gap on garden product is a routine 25–50 bps adjustment, well within normal comp practice.
- **C.** Comp 3 — never use comps outside the subject's submarket.
  Adjacent-submarket comps are standard when the subject's submarket is thin. The location adjustment is modest if the submarkets are similar.
- **D.** None — average the three cap rates (4.92%) and apply it.
  Averaging unadjusted comps lets the stale 4.0% drag the answer down ~40 bps. Adjust first, then weight.

**Takeaway.** Time is the most powerful comp adjustment in a rate-driven cycle. A recent, imperfect comp beats a perfect-match stale one.

---

### 5. 3% annual bumps or a 10% step in year 6 — which is worth more?
`multipleChoice` · kind_hint: lease-econ · role_hint: assetManagement · difficulty: intermediate · tags: industrial, escalations, lease-structure

**Scenario.** An industrial tenant will sign a 10-year NNN lease at $8.00/SF starting rent. Two escalation structures are on the table: (i) 3.0% annual bumps, or (ii) flat for five years, then a single 10% step to $8.80 for years 6–10. The tenant says they are "about the same."

- Starting rent: $8.00/SF NNN · Term: 10 yrs
- Option (i): 3% annual
- Option (ii): flat 5 yrs, +10% step, flat 5 yrs

**Q: Which structure is worth more to the landlord, and by roughly how much?**

- **A.** The 3% annual bumps — average rent is ~$9.17 vs ~$8.40 (≈9% more cash over the term), and year-10 rent is $10.44 vs $8.80 (≈19% higher), which is what the exit cap rate gets applied to. ✅
  Sum of 3% compounding over 10 years ≈ 11.46× the starting rent vs 10.5× for the step structure. The exit-year gap matters even more than the cash gap because reversion value capitalizes the final-year NOI.
- **B.** They are equivalent — 10% in year 6 roughly matches five years of ~2% growth.
  The arithmetic is wrong (3% × 5 years ≈ 16%, not 10%), and it ignores years 6–10, where the step structure stays flat while the annual bumps keep compounding.
- **C.** The step structure — flat rent for five years gives the tenant certainty, so they will pay more at renewal.
  Renewal is ten years away and uncertain. Trading guaranteed contractual rent for a hoped-for renewal premium is not a landlord-favorable trade.
- **D.** It depends entirely on the discount rate; you cannot say without a DCF.
  Discounting changes the magnitude, not the sign. The annual-bump structure has higher rent in every year from year 2 onward, so it wins at any positive discount rate.

**Takeaway.** Compare escalation structures on both average rent and final-year rent. The final-year rent sets reversion value, so back-loaded growth is worth more than a tenant's "about the same" suggests.

---

### 6. The anchor goes dark — what actually happens to NOI?
`multipleChoice` · kind_hint: lease-econ · role_hint: assetManagement · difficulty: advanced · tags: retail, co-tenancy, go-dark, mortgageUw

**Scenario.** A grocery-anchored center's anchor (35% of GLA, $600K of rent) has a go-dark right and announces it will close the store but keep paying rent through its lease. Eight inline tenants ($1.2M total base rent, $15M combined sales) carry co-tenancy clauses: if the anchor is dark more than 6 months, inline rent converts to the lesser of base rent or 6% of sales, and each tenant may terminate after 12 months of dark anchor.

- Anchor rent: $600K (continues to be paid)
- Inline base rent: $1.2M · Inline sales: $15M → 6% = $900K
- Co-tenancy: rent relief after 6 mo, termination right after 12 mo

**Q: What is the first-order NOI impact, and where is the real risk?**

- **A.** The anchor keeps paying, so the immediate hit is inline rent dropping to ~$900K (−$300K/yr) once co-tenancy triggers; the real risk is the termination rights at month 12, falling inline sales as traffic dies, and the lender sweeping cash or demanding a re-tenanting reserve. ✅
  Going dark is not a default. The damage flows through the co-tenancy clauses, which convert fixed rent to percentage rent at a time sales are about to fall, and then hand tenants an exit. Model the cascade, not just the anchor line.
- **B.** No impact — the anchor is still paying its $600K.
  Ignores the co-tenancy clauses, which are exactly the mechanism by which a dark anchor destroys inline NOI.
- **C.** You lose the full $600K anchor rent immediately.
  A go-dark right lets the tenant stop operating, not stop paying. The rent obligation survives unless the lease also has a termination right.
- **D.** Inline rent is unaffected until a tenant actually terminates.
  Wrong on the mechanics: the rent conversion kicks in at month 6, before any termination right vests.

**Takeaway.** In retail, read the inline leases when the anchor wobbles. Co-tenancy converts a single tenant event into a portfolio-wide rent reset and a cluster of termination options.

---

### 7. Same revenue hit — ADR cut or occupancy drop, which hurts GOP more?
`multipleChoice` · kind_hint: sensitivity · role_hint: acquisitions · difficulty: intermediate · tags: hotel, flow-through, ADR, occupancy

**Scenario.** A 200-key limited-service hotel runs 70% occupancy at a $180 ADR (room revenue ≈ $9.2M). Variable cost per occupied room (housekeeping, supplies, OTA commissions, loyalty fees) is about $40. You are stress-testing two cases that each cut room revenue by the same ~$460K: (a) ADR falls 5% to $171; (b) occupancy falls 5% relative, to 66.5%.

- Keys: 200 · Occ: 70% · ADR: $180
- Variable cost / occupied room: ~$40
- Case (a): ADR −5% · Case (b): occupancy −5% (to 66.5%)

**Q: Which case hurts gross operating profit more?**

- **A.** The ADR cut — a rate decline flows through to GOP at ~100%, while the occupancy drop saves ~$40 on each of the ~1,800 lost room-nights (≈$70K), so its GOP hit is roughly $390K vs $460K. ✅
  Rate has no cost attached; occupancy does. That is why operators defend rate in a downturn and why RevPAR declines driven by ADR are worse than the same decline driven by occupancy.
- **B.** They are identical — the revenue impact is the same.
  Revenue is the same; profit is not. Variable costs only scale with occupied rooms.
- **C.** The occupancy drop — fixed costs get spread over fewer rooms.
  Fixed costs are fixed in dollars regardless of how you allocate them per room. Allocation does not change GOP.
- **D.** The occupancy drop — lost guests also mean lost F&B and ancillary spend.
  Real second-order effect at a full-service hotel, but the prompt specifies limited-service, where ancillary revenue is minimal. The flow-through difference dominates.

**Takeaway.** When sensitizing hotel NOI, separate rate from occupancy: a dollar of lost ADR is a dollar of lost GOP, a dollar of lost occupancy revenue is less.

---

### 8. +100 bps on the construction loan vs a 6-month delay — which costs more?
`multipleChoice` · kind_hint: sensitivity · role_hint: development · difficulty: advanced · tags: development, construction-loan, schedule-risk, interest-reserve

**Scenario.** An $80M development is financed with a $52M construction loan (65% LTC) at 7.5% floating. The build is 24 months; the loan's average outstanding balance over the build is about 50% of the commitment. Stabilized NOI is $6.0M/yr. You are sizing the interest reserve and contingency against two shocks: (a) rates rise 100 bps for the whole build, or (b) construction slips 6 months with the loan essentially fully drawn.

- Loan: $52M at 7.5% · Build: 24 mo · Avg balance: 50%
- Stabilized NOI: $6.0M/yr
- Shock (a): +100 bps · Shock (b): +6 months

**Q: Which shock does more damage to the deal?**

- **A.** The delay — ~$1.95M of extra interest on a fully drawn loan ($52M × 7.5% × 0.5), plus ~$3M of deferred NOI and extended GC general conditions, versus ~$520K for the rate shock ($52M × 50% × 1% × 2). ✅
  Late-stage delay hits when the balance is highest and the asset is producing nothing. Schedule risk late in a project is typically several times rate risk, which is why interest reserves are sized to schedule stress first.
- **B.** The rate shock — it compounds over every month of the build.
  It applies to every month, but on an average balance of only half the commitment. Two years × 1% × $26M average ≈ $520K.
- **C.** Roughly equal — both are about 1% of project cost.
  The rate shock is ~0.65% of cost; the delay is ~2.5% in carry alone before lost NOI.
- **D.** The rate shock — delay costs are covered by the hard-cost contingency.
  Hard-cost contingency covers construction overruns, not interest carry or lost NOI. Delay drains the interest reserve, and a depleted reserve is a lender default trigger.

**Takeaway.** Sensitize schedule before rate. A 6-month slip at full draw is a multi-million-dollar event; a 100 bp rate move over an average balance is not.

---

### 9. The lender says you are "debt-yield constrained." What does that mean?
`multipleChoice` · kind_hint: debtYield · role_hint: mortgageUw · difficulty: beginner · tags: debt-yield, LTV, loan-sizing, office

**Scenario.** You are buying a stabilized suburban office building for $40M. NOI is $2.4M (6.0% cap). The lender quotes 65% LTV, a 1.30× DSCR minimum and a 9.5% minimum debt yield, then tells you the loan is "debt-yield constrained."

- Price: $40M · NOI: $2.4M
- Max LTV: 65% → $26.0M
- Min debt yield: 9.5% → $2.4M / 0.095 = $25.3M

**Q: What is the lender telling you?**

- **A.** The debt-yield test ($25.3M) produces a smaller loan than the LTV test ($26.0M), so proceeds are capped by NOI, not by price — a higher appraisal will not get you more loan, only more NOI would. ✅
  Lenders size to the most restrictive of LTV, DSCR and debt yield. "Constrained by X" names the test that binds. Debt yield = NOI / loan, so it is immune to cap-rate compression, which is exactly why lenders use it.
- **B.** The lender thinks the appraisal is too high.
  They may, but that is not what the phrase means. Debt yield binding is a statement about NOI relative to the loan, not about value.
- **C.** The loan will carry a higher interest rate.
  Rate is set separately. The constraint is about proceeds, not pricing.
- **D.** The DSCR is below 1.0×.
  At $25.3M and typical terms, DSCR is comfortably above 1.30×. Debt yield binding says nothing about coverage failing.

**Takeaway.** A loan is sized to the tightest of LTV, DSCR and debt yield. When debt yield binds, the lender is capping leverage against income, so tight cap rates do not buy you more proceeds.

---

### 10. 92% occupied after lease-up — is this asset stabilized?
`multipleChoice` · kind_hint: absorption · role_hint: development · difficulty: intermediate · tags: multifamily, lease-up, concessions, economic-occupancy

**Scenario.** A 300-unit new multifamily delivery reaches 92% physical occupancy 14 months after opening. The leasing team hit that number by offering two months free on 12-month leases, and about 60% of in-place leases carry that concession. The sponsor wants to call the asset stabilized and start the perm-loan process.

- Units: 300 · Physical occupancy: 92%
- Concession: 2 months free on 12-month leases, on ~60% of leases
- Stabilization target in the business plan: 92%

**Q: Is this asset stabilized?**

- **A.** Physically yes, economically no — 2/12 free on 60% of leases is ~10% of occupied-unit rent, so economic occupancy is ~83%; a perm lender will underwrite in-place collections and test whether renewals hold at face rent once the free rent burns off. ✅
  Stabilization is about durable collected income. Concession-driven occupancy front-loads a renewal cliff: if tenants only signed because of the free rent, year-2 retention and effective rent are at risk, and that is what the lender's T-3 / T-1 underwriting will reveal.
- **B.** Yes — 92% beats the 90% rule of thumb and matches the business plan.
  The business plan target assumed market-rate leases. Hitting the headline number with heavy concessions is not the same milestone.
- **C.** No — stabilization always requires 95% occupancy.
  There is no universal threshold. 92–95% is typical, but the issue here is the quality of the 92%, not the number.
- **D.** Yes — concessions are a one-time marketing cost and sit below the NOI line.
  Free rent reduces collected rent; it is a revenue deduction, not a below-the-line expense. Treating it as marketing hides the gap between gross potential and effective rent.

**Takeaway.** Judge stabilization on economic occupancy and renewal durability, not physical occupancy. Free rent converts a lease-up problem into a year-2 retention problem.
