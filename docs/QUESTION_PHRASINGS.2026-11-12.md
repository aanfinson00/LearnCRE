# Question phrasings — coverage gaps (2026-11-12)

Scheduled routine output. Goal: find the areas of the question bank with the
fewest approved questions and seed 10 new phrasings for each so a future
session can expand them into full `SituationalCase` entries
(`src/quiz/situational/<id>.ts`, registered in `index.ts`).

## How coverage was measured

The community `question_submissions` table (status = approved / integrated)
lives in the `learncre` Supabase project, which is currently **paused**, so it
could not be queried. Coverage below is the shipped bank itself: 72 situational
cases, 69 quiz templates (every template kind has exactly 2 variants, so the
template side is evenly covered and not the gap).

Situational cases by category:

| Category | Cases |
|---|---|
| deal-process | 21 |
| document-literacy | 13 |
| investment-thesis | 9 |
| risk | 7 |
| pricing | 7 |
| diagnostic | 7 |
| **sensitivity** | **2** |
| **lease-econ** | **2** |
| **comp-selection** | **2** |
| **absorption** | **1** |

Secondary gaps worth filling at the same time: asset classes hotel (1),
retail (2), industrial (3) vs multifamily (11) / office (9); role tag
`development` (9) vs `acquisitions` (40). The phrasings below lean on those
asset classes and the development role where it is natural.

Existing cases in the thin categories (do not duplicate):
`absorption-timing`, `comp-set-vetting`, `comp-vintage-adjustment`,
`lease-structure-nnn-vs-gross`, `ti-vs-rent-giveback`,
`going-in-vs-exit-cap-spread`, `exit-cap-conservatism`.

Format per phrasing: **title** (what the learner sees as the hook) → the
question stem → tags → the principle the best option should land on.

---

## absorption (1 case today → +10)

1. **Should you trust the broker's absorption number?**
   Q: Trailing-12 absorption is 600 units but 400 of it came from one lease-up
   that offered 2 months free. What pace do you underwrite?
   `intermediate · multifamily · acquisitions/development`
   → Strip concession-driven velocity; underwrite organic pace, not the headline.

2. **Pre-leasing is 40% — is the development on track?**
   Q: 40% pre-leased 6 months before delivery against a 12-month lease-up
   budget. Does the pace support the proforma stabilization date?
   `intermediate · multifamily · development`
   → Convert pre-lease % into units/month and compare to budgeted pace; account for pre-lease fall-out.

3. **Two spec buildings, one tenant demand pool**
   Q: 1.2M SF of spec industrial delivers this year; trailing absorption is
   900K SF/yr. How long is the overhang and what does it do to your downtime?
   `intermediate · industrial · development/acquisitions`
   → Months of supply = new vacancy ÷ absorption pace; downtime assumption must stretch with it.

4. **Negative absorption: how fast does occupancy fall?**
   Q: Submarket occupancy is 91%, inventory 10M SF, and net absorption just
   printed −250K SF for the quarter. Where is occupancy in 12 months if the
   trend holds?
   `beginner · office · assetManagement/portfolioMgmt`
   → Occupancy delta = absorption ÷ inventory; annualize the quarter and show the vacancy drift.

5. **Which absorption rate: gross or net?**
   Q: Gross leasing was 800K SF but net absorption was 100K SF. Which figure
   belongs in your lease-up timing and why?
   `beginner · office · acquisitions`
   → Net absorption drives occupancy; gross leasing shows churn, not demand growth.

6. **Hotel ramp: when does the new flag hit stabilized occupancy?**
   Q: A newly opened 200-key hotel runs 45% occupancy in month 3; comparable
   openings in the market added ~5 points per month. When does it hit a 72%
   stabilized level, and what does that do to Year-1 NOI?
   `intermediate · hotel · development/acquisitions`
   → Ramp is a monthly occupancy build; Year-1 NOI is the average of the ramp, not the stabilized figure.

7. **Retail backfill: how long is the box dark?**
   Q: A 35K SF anchor goes dark; recent big-box backfills in the metro took
   14–22 months and 2 of 7 were split into two tenants. What downtime do you
   underwrite for the box?
   `intermediate · retail · assetManagement`
   → Use the observed range, weight toward the long end for a single-user box, and reserve for demising.

8. **Absorption vs. deliveries: is the market tightening or loosening?**
   Q: Absorption was 1,000 units last year; deliveries were 1,400. Occupancy
   stayed flat. What explains that, and which direction does rent go next year
   with 900 units delivering?
   `intermediate · multifamily · portfolioMgmt/acquisitions`
   → Flat occupancy on net new supply means inventory growth masked the gap; falling deliveries flip the balance.

9. **How much does the market need to absorb before you lease?**
   Q: Your 250-unit project delivers in 18 months. The submarket has 1,100
   vacant units and 700 units ahead of you in the pipeline, absorbing 60/mo.
   How many of those competing units are still vacant when you open?
   `advanced · multifamily · development`
   → Project the vacant stock forward: (existing vacancy + pipeline) − (pace × months); that residual is your competition.

10. **Shadow space: why is absorption understated?**
    Q: Reported vacancy is 12%, but tenants are marketing 800K SF of sublease
    space in a 10M SF submarket. What is the effective vacancy and how does it
    change your rent-growth assumption?
    `intermediate · office · acquisitions/portfolioMgmt`
    → Add sublease availability to direct vacancy; sublease space competes on price and caps rent growth.

---

## comp-selection (2 cases today → +10)

1. **Portfolio comp or single-asset comp?**
   Q: The best comp traded inside a 12-property portfolio at an allocated price.
   Should the allocated $/SF carry the same weight as a one-off trade?
   `intermediate · industrial · acquisitions`
   → Allocated portfolio prices are negotiated for tax/debt reasons; discount their weight or exclude.

2. **The comp was a sale-leaseback — does the cap still count?**
   Q: A 5.5% cap comp was a 20-year sale-leaseback to the seller. Is that a
   market cap for your multi-tenant asset?
   `beginner · retail · acquisitions`
   → Sale-leasebacks price credit and term, not real estate; a poor comp for multi-tenant product.

3. **Why is the distressed trade not your floor?**
   Q: A lender-driven sale cleared at $180/SF vs. the $260/SF range on arm's-
   length deals. Where does it belong in your comp set?
   `beginner · office · acquisitions/mortgageUw`
   → Non-market motivation; flag as a data point, not a comp, unless you are also a distressed buyer.

4. **Time-adjust or throw out the 2021 comp?**
   Q: Your closest physical comp traded 30 months ago when 10-year Treasuries
   were 200 bps lower. Adjust for time or exclude?
   `intermediate · multifamily · acquisitions`
   → Adjust via observed cap-rate movement in the submarket, not the Treasury move alone; exclude if no bridge exists.

5. **Hotel comps: price per key or cap rate?**
   Q: Three select-service comps traded at $140–160K/key, but RevPAR ranges
   from $70 to $110. Which metric should anchor your bid?
   `intermediate · hotel · acquisitions`
   → Per-key is a sanity check; cap rate or RevPAR multiple on normalized NOI carries the pricing.

6. **The comp has 40% more parking — so what?**
   Q: A suburban office comp at $230/SF has a 5/1,000 ratio; the subject is
   3/1,000 in a car-dependent submarket. How do you adjust?
   `intermediate · office · acquisitions`
   → Quantify functional differences via rent achievability, then translate the rent gap into value, not a guessed % haircut.

7. **Rent comps vs. sale comps: which one is lying?**
   Q: Rent comps support $28/SF; sale comps imply a $/SF that only pencils at
   $24/SF. Which set do you trust and what do you investigate?
   `advanced · industrial · acquisitions`
   → Reconcile: check comp occupancy, lease terms, and whether the rent comps are asking vs. achieved.

8. **How many comps is enough?**
   Q: You have 2 tight comps within 1 mile and 9 looser comps across the
   metro. The broker's OM leans on all 11. How do you weight them?
   `beginner · multifamily · acquisitions`
   → Weight by comparability, not count; 2 great comps beat 9 mediocre ones but need a sanity band.

9. **Is a build-to-suit a comp for your spec building?**
   Q: A 300K SF build-to-suit sold at a 5.25% cap with a 15-year lease. Your
   spec asset is 60% leased with a 3-year WALT. Can you use it?
   `intermediate · industrial · development/acquisitions`
   → Usable only as a stabilized-value anchor; your deal needs a lease-up risk premium on top.

10. **Off-market trade with no reported price**
    Q: The most relevant comp was off-market and the price is unconfirmed; a
    broker "heard" $42M. How do you handle it in a credit memo?
    `beginner · mixed · mortgageUw`
    → Unverified = not a comp; footnote it, do not let it anchor the value conclusion.

---

## lease-econ (2 cases today → +10)

1. **Free rent up front or spread across the term?**
   Q: Tenant wants 6 months free on a 10-year deal. Does it matter whether it
   is taken in year 1 or as a half-month per year?
   `intermediate · office · assetManagement`
   → Same face value, different NPV and different Year-1 NOI (and therefore different financing and sale timing).

2. **Percentage rent only: what is this lease really worth?**
   Q: A restaurant pad signs at $0 base, 8% of sales. Sales history is
   $2.4M. How do you value the income stream and what cap rate does it deserve?
   `intermediate · retail · acquisitions/assetManagement`
   → Treat as variable income: haircut the sales, apply a wider cap than fixed rent.

3. **CPI bumps vs. fixed 3% — who wins?**
   Q: Tenant offers CPI-based escalations capped at 4% instead of fixed 3%.
   In which inflation environment is the landlord worse off?
   `intermediate · industrial · assetManagement/portfolioMgmt`
   → Cap limits upside, floor (if any) limits downside; the asymmetry decides it.

4. **Expense stop: who eats the $1.50 increase?**
   Q: A modified gross lease has a $9.00/SF expense stop; OpEx just went to
   $10.50. What is the tenant's reimbursement and what happens to NOI?
   `beginner · office · assetManagement`
   → Tenant pays the overage above the stop; NOI is protected only above the base-year level.

5. **Hotel management contract: base fee vs. incentive fee**
   Q: The operator proposes 3% base fee plus 10% incentive over a hurdle versus
   a flat 4%. At what GOP does the incentive structure cost more?
   `advanced · hotel · assetManagement/acquisitions`
   → Breakeven GOP where incentive fee exceeds the 1% base-fee difference; aligns operator with owner above it.

6. **Early termination option: how much is the option worth to the tenant?**
   Q: Tenant wants a one-time termination right in year 5 of a 10-year lease
   with a penalty of unamortized TI plus 6 months rent. Is that penalty enough?
   `intermediate · office · assetManagement/mortgageUw`
   → Penalty should cover unamortized costs plus expected downtime and re-tenanting cost; lender view treats it as a 5-year lease.

7. **Renewal option at 95% of market — who benefits?**
   Q: A renewal option is set at 95% of fair market rent. In a rising market
   vs. a falling market, what does the option cost the landlord?
   `beginner · industrial · assetManagement`
   → The tenant exercises only when it is favorable; the option is a one-way discount against the landlord.

8. **Gross-up clause: why does the reimbursement look wrong?**
   Q: The building is 70% occupied and variable OpEx is being reimbursed on
   actual costs. The lease has a 95% gross-up clause. What should the
   reimbursement be?
   `intermediate · office · assetManagement`
   → Gross up variable expenses to 95% occupancy before applying pro-rata share; otherwise landlord eats the vacancy's share.

9. **Co-tenancy clause: what does the anchor leaving actually cost?**
   Q: Inline tenants' leases let them pay 50% rent if the anchor goes dark
   for 6+ months. The anchor is 20% of NOI. What is your true NOI exposure?
   `advanced · retail · assetManagement/acquisitions`
   → Exposure is the anchor's rent plus the co-tenancy haircut on inline rent; often 2x the headline.

10. **Rent abatement vs. TI: which is cheaper for the landlord after taxes and financing?**
    Q: Tenant is indifferent between $40/SF TI and 8 months free. Landlord has
    a construction loan funding TI at 8%. Which should the landlord offer?
    `advanced · office · assetManagement/development`
    → Compare financed cost of TI (interest + depreciation treatment) against the NPV of lost rent and the Year-1 NOI hit.

---

## sensitivity (2 cases today → +10)

1. **Which assumption moves IRR the most?**
   Q: Flex exit cap ±50 bps, rent growth ±1%, and OpEx ±5% one at a time on a
   5-year hold. Rank the IRR impact and explain why the ranking holds.
   `intermediate · multifamily · acquisitions`
   → Exit cap dominates on short holds because it hits the terminal value; rent growth compounds and overtakes on longer holds.

2. **How much rent can you lose before DSCR breaks?**
   Q: NOI is $3.0M, debt service $2.4M, DSCR covenant 1.20x. Rents are 80% of
   revenue. What % rent decline triggers the covenant?
   `beginner · mixed · mortgageUw/assetManagement`
   → Back-solve the NOI floor from the covenant, then translate to a revenue and rent decline.

3. **Interest-rate sensitivity on a floating-rate bridge**
   Q: SOFR is 4.3%, spread 350 bps, loan $40M interest-only. Each 25 bps move
   does what to annual debt service, and where does the cap strike need to be
   to keep DSCR above 1.0x?
   `intermediate · multifamily · mortgageUw/acquisitions`
   → Debt service delta = loan × bps change; cap strike is the rate where NOI equals debt service.

4. **Hold period sensitivity: why does IRR fall when you hold longer?**
   Q: A deal shows 18% IRR at a 3-year hold and 14% at 7 years with the same
   exit cap. Is longer holding worse?
   `intermediate · mixed · acquisitions/portfolioMgmt`
   → Early IRR is driven by cap compression captured quickly; equity multiple keeps growing. IRR vs. multiple tradeoff.

5. **Construction cost sensitivity: how much overrun kills the spread?**
   Q: Yield on cost is 6.75% vs. a 5.50% market cap. What % hard-cost overrun
   collapses the development spread to 75 bps?
   `intermediate · industrial · development`
   → Back-solve total cost from the target yield on cost; the overrun headroom is the difference.

6. **Hotel: a 5-point occupancy drop vs. a $10 ADR drop**
   Q: 200 keys, 72% occupancy, $150 ADR, 35% flow-through margin. Which hurts
   NOI more and why is the answer not symmetric?
   `intermediate · hotel · assetManagement/acquisitions`
   → Occupancy loss saves variable costs; ADR loss flows almost entirely to NOI. Compute both.

7. **Vacancy sensitivity on a single-tenant vs. multi-tenant asset**
   Q: Two buildings, same NOI. One has 1 tenant, one has 12. Under a 10%
   probability of any tenant leaving, which has the wider value range?
   `beginner · office · acquisitions/mortgageUw`
   → Binary outcome on single-tenant yields wider dispersion; multi-tenant averages out.

8. **Exit cap vs. rent growth: are you double-counting?**
   Q: The model assumes 4% rent growth and 50 bps of cap compression at exit.
   Which combination of assumptions is internally inconsistent?
   `advanced · multifamily · acquisitions`
   → Strong growth usually coincides with higher rates and wider caps; stress one or the other, not both favorably.

9. **Refinance sensitivity: what cap rate at refi leaves you under water?**
   Q: Bridge loan $30M, stabilized NOI $2.4M, refi lender caps proceeds at
   65% LTV and 1.25x DSCR with an 7.0% constant. What cap rate at refi makes
   the take-out loan smaller than the bridge?
   `advanced · multifamily · mortgageUw/acquisitions`
   → Compute the binding constraint (LTV vs. DSCR) and back-solve the value, then the cap rate.

10. **Retail sales sensitivity: at what sales level does the occupancy cost ratio break the tenant?**
    Q: Tenant pays $45/SF all-in; sales are $420/SF. If sales fall 15%, what
    is the occupancy cost ratio and is the tenant still healthy?
    `beginner · retail · assetManagement/portfolioMgmt`
    → OCR = occupancy cost ÷ sales; above ~12–15% for most inline retail signals renewal risk.

---

## Suggested order of work

1. absorption (biggest gap; 9 of 10 phrasings above also fill hotel/retail/industrial or development).
2. comp-selection (pure acquisitions skill, fast to write; mix in the mortgageUw credit-memo angle).
3. sensitivity (good source of numeric sidebars; two of these could also become quiz templates).
4. lease-econ.

Each phrasing above needs: a 2–4 sentence `scenario`, 5–7 `data` rows, 3–4
options with exactly one `isBest`, a `takeaway`, 3 `tips`, and registration in
`src/quiz/situational/index.ts`.
