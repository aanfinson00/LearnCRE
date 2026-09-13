# LearnCRE — Interview question reference

A curated reference of common CRE interview questions, mapped to the LearnCRE
content that drills the underlying skill (or flagged as a `GAP — propose new
content`). Used as the evidence base for which content to build next.

**Important honesty note on sources.** This file is a starter set written from
the broad pattern of CRE interview-prep literature (A.CRE, Wall Street Oasis
public threads, Reddit `r/CommercialRealEstate`, Breaking Into Wall Street CRE
primers, GP Equity Mentor / Joseph Stampone published posts, public LinkedIn
posts). The questions are *representative* — they're the kinds of things that
appear in real interviews — but the specific URLs are not pinned for each.
The goal is for a future contributor to verify each against a public source
and fill in `Source:` URLs over time.

**How to read this.** Each question has:
- the question text (paraphrased to remove company-specific framing)
- `Role:` the position(s) where it's most-asked
- `Difficulty:` rough proxy for how senior the asker likely is
- `Maps to:` the LearnCRE template / situational / walkthrough id, OR
  `GAP` with a proposed addition

Last edit cadence: as content lands, update the `Maps to:` lines. When a new
case study is curated, add it here first, then propose the `Maps to:` content
in a future PR.

---

## Acquisitions (14)

### Q: How do you compute cap rate, and what's a typical going-in cap range for stabilized industrial in a tier-1 market today?
- **Role:** acquisitions · **Difficulty:** beginner
- **Why it's a good question:** opening filter; tests basic comfort + market awareness.
- **Maps to:** `goingInCap` quiz template + `study` tab cap-rate cheat sheet.

### Q: Walk me through a deal you'd bid on at $50M with $3M of NOI. Talk me through your value, your basis check, and your exit cap.
- **Role:** acquisitions · **Difficulty:** intermediate
- **Why it's a good question:** the canonical "walk me through a deal" prompt.
- **Maps to:** `walk-acq-mock-1` (10-step Mock Acquisition walkthrough).

### Q: Subject is trading at an 8% cap; comps are 6%. What's likely going on?
- **Role:** acquisitions · **Difficulty:** intermediate
- **Why:** classic divergence diagnostic — tests reasoning over computation.
- **Maps to:** `cap-rate-divergence` situational.

### Q: Why use a wider exit cap than going-in cap? How wide?
- **Role:** acquisitions · **Difficulty:** intermediate
- **Why:** standard underwriting-discipline question.
- **Maps to:** `going-in-vs-exit-cap-spread` situational + `exit-cap-conservatism` situational.

### Q: A broker shows 8% NOI growth in years 1-5 on a stabilized asset. Pushback?
- **Role:** acquisitions · **Difficulty:** advanced
- **Why:** tests sponsor-pro-forma diligence muscle.
- **Maps to:** `noi-growth-smell-test` situational + `sponsor-proforma-aggressive` situational.

### Q: Subject is 80% leased, stabilizing year 2. What NOI do you apply the exit cap to?
- **Role:** acquisitions · **Difficulty:** advanced
- **Why:** lease-up nuance most candidates get wrong.
- **Maps to:** `trended-vs-inplace-leaseup` situational.

### Q: How do you mark-to-market a rent roll? Walk through an in-place $24/SF vs market $32/SF case with a 12-month rollover.
- **Role:** acquisitions · **Difficulty:** intermediate
- **Why:** the most-common mark-to-market interview prompt.
- **Maps to:** `mark-to-market-upside` situational + `markToMarketLift` Excel template.

### Q: Five comps in your set; one is in a different submarket and one traded 18 months ago. What do you do?
- **Role:** acquisitions · **Difficulty:** beginner
- **Why:** comp-vetting discipline; lots of candidates average all five.
- **Maps to:** `comp-set-vetting` situational.

### Q: Class-B 1985 vintage subject; comps are mostly 2015+. How do you adjust?
- **Role:** acquisitions · **Difficulty:** intermediate
- **Why:** vintage-spread reasoning.
- **Maps to:** `comp-vintage-adjustment` situational.

### Q: Compute the levered IRR from $5M equity → $250k/yr distributions → $7.5M sale at year 4.
- **Role:** acquisitions · **Difficulty:** intermediate
- **Why:** the standard levered-IRR back-of-envelope.
- **Maps to:** `irrSimple` quiz template + `irrFromCashflows` Excel template + `walk-acq-mock-1` walkthrough Step 10.

### Q: Buying at $50M; jurisdiction reassesses on sale at 1.25%. Current tax bill is $200k. How does this hit your bid?
- **Role:** acquisitions · **Difficulty:** advanced
- **Why:** Prop-13-style trap; tests jurisdiction awareness.
- **Maps to:** `tax-reassessment-surprise` situational + `taxReassessment` quiz template.

### Q: How does an investment-grade tenant on a 15-year lease change your cap rate vs spec-grade?
- **Role:** acquisitions · **Difficulty:** advanced
- **Why:** single-tenant pricing nuance.
- **Maps to:** `tenant-credit-pricing` situational.

### Q: Five industrial trade comps are in the same submarket and all traded within the last six months. Three have 28' clear height; two have 36'+ clear height. Do you average all five cap rates?
- **Role:** acquisitions · **Difficulty:** beginner
- **Why:** comp-vetting nuance most beginners miss — physical spec differences move cap rates as much as timing/geography do. `industrial` is one of the thinnest asset classes in the situational catalog (3 of 71 cases) and `comp-selection` one of the thinnest categories (2 of 71).
- **Maps to:** **GAP — propose `clear-height-comp-adjustment` situational** (`comp-selection` · beginner · industrial). Complements the shipped `clearHeightPremium` quiz template, which computes the rent premium directly but doesn't test the comp-weighting judgment call.

### Q: An industrial lease offers a choice: fixed 3%/year bumps, or CPI-linked bumps that have historically averaged 3.2% but are volatile. On a 10-year NNN lease, which structure is worth more to the landlord, and what risk are you trading away?
- **Role:** acquisitions/assetManagement · **Difficulty:** intermediate
- **Why:** escalation-structure tradeoff; `lease-econ` is one of the thinnest categories (2 of 71, both retail/office) and has no industrial example.
- **Maps to:** **GAP — propose `fixed-vs-cpi-bumps` situational** (`lease-econ` · intermediate · industrial).

---

## Asset Management (12)

### Q: Year-3 NOI came in 8% below pro forma. Where do you look first?
- **Role:** assetManagement · **Difficulty:** intermediate
- **Why:** the classic "diagnose the variance" prompt.
- **Maps to:** `noi-growth-missing` situational.

### Q: Single tenant 40% of NRSF rolling in 14 months in a 15%-vacancy submarket. Hold or sell?
- **Role:** assetManagement · **Difficulty:** intermediate
- **Why:** rollover-concentration discipline.
- **Maps to:** `rollover-concentration` situational.

### Q: A tenant wants $30/SF TI on a $20/SF face rent vs. comp $20/SF TI. How do you compare?
- **Role:** assetManagement · **Difficulty:** intermediate
- **Why:** TI vs rent NER tradeoff.
- **Maps to:** `ti-vs-rent-giveback` situational + `tiVsRent` quiz template + `tiVsRentViz` viz.

### Q: Your asset has 7-year anchor leases at 1% bumps. Submarket grew 4%/yr. What's the rent-roll opportunity?
- **Role:** assetManagement · **Difficulty:** intermediate
- **Why:** compounding bumps-vs-growth gap.
- **Maps to:** `rent-roll-undervalued` situational + `rentBumpsWithSteps` Excel template.

### Q: Walk me through a value-add deal: $1.2M starting NOI, $12k/unit reno on 100 units. What's the exit value at the new cap?
- **Role:** assetManagement · **Difficulty:** intermediate
- **Why:** the standard value-add walkthrough.
- **Maps to:** `walk-am-valueadd-1` walkthrough.

### Q: 95% → 80% occupancy in one quarter. Marketing it as "temporary leasing opportunity" — what would you ask?
- **Role:** assetManagement · **Difficulty:** intermediate
- **Why:** vacancy-spike diagnostic; pull-the-rent-roll discipline.
- **Maps to:** `vacancy-spike` situational.

### Q: Year 3 of a 5-year hold at 14% IRR realized. Sponsor wants 2 more years for "more growth". How do you test it?
- **Role:** assetManagement · **Difficulty:** advanced
- **Why:** extension-IRR discipline; blended-IRR is the wrong frame.
- **Maps to:** `hold-extension-discipline` situational + `extensionDrag` quiz template + `walk-am-holdsell-1` walkthrough.

### Q: After-tax cash on a $40M sale of a $30M-purchase asset with $1.5M of accumulated depreciation?
- **Role:** assetManagement · **Difficulty:** advanced
- **Why:** recapture + cap gains math; common mid-level question.
- **Maps to:** `taxAdjustedExit` quiz template + `walk-am-holdsell-1` walkthrough Steps 6-7.

### Q: Asset is fully stabilized. Refi at 65% LTV vs sell now — same after-tax IRR. How do you decide?
- **Role:** assetManagement · **Difficulty:** advanced
- **Why:** tax-deferral vs redeployment-opportunity tradeoff.
- **Maps to:** `tax-vs-irr-tradeoff` situational + `refi-vs-sell` situational.

### Q: How do you set a capex reserve on a stabilized asset, and what gets included vs excluded?
- **Role:** assetManagement · **Difficulty:** intermediate
- **Why:** capex discipline; common pitfall is using the OM number unchanged.
- **Maps to:** `capex-reserve-discipline` situational + `capexReserveSizing` quiz template. *(Shipped — corrected from stale GAP marker 2026-09-13.)*

### Q: A big-box anchor's lease has a co-tenancy clause — if center occupancy drops below 70%, the anchor can pay reduced "alternate rent" or terminate. Two junior anchors just vacated, dropping the center to 65% occupied. What's your exposure, and what do you check first?
- **Role:** assetManagement/portfolioMgmt · **Difficulty:** advanced
- **Why:** co-tenancy is one of the most consequential clauses in retail lease admin and a frequent surprise for asset managers who haven't read the anchor leases closely. `retail` is one of the thinnest asset classes in the situational catalog (2 of 71 cases).
- **Maps to:** **GAP — propose `retail-co-tenancy-clause` situational** (`document-literacy` · advanced · retail).

### Q: A hotel's trailing-12 RevPAR is running 15% below its comp set average, but GOP margin is right on budget. Is that a pricing problem, a demand problem, or a budget problem — and what's the first number you'd pull to tell?
- **Role:** assetManagement · **Difficulty:** beginner
- **Why:** `hotel` is the single thinnest asset class in the situational catalog (1 of 71 cases) and `beginner` the thinnest difficulty tier (4 of 71). This is a simpler on-ramp ahead of the shipped intermediate `hotel-revpar-divergence` situational.
- **Maps to:** **GAP — propose `revpar-vs-comp-first-look` situational** (`diagnostic` · beginner · hotel), a lead-in to the shipped `hotel-revpar-divergence` situational and `walk-hotel-revpar-1` walkthrough.

---

## Mortgage Underwriting (12)

### Q: What's the formula for DSCR? What's a healthy threshold?
- **Role:** mortgageUw · **Difficulty:** beginner
- **Why:** opening filter for any debt-side role.
- **Maps to:** `dscrFromNoiAndDs` quiz template.

### Q: NOI $5M, requested loan $65M at 5%/30yr. Does it pass DSCR at 1.25x?
- **Role:** mortgageUw · **Difficulty:** beginner
- **Why:** the canonical DSCR-test math.
- **Maps to:** `dscrTestPasses` quiz template.

### Q: Same loan goes from passing DSCR to failing if rate moves +100 bps. Walk me through how.
- **Role:** mortgageUw · **Difficulty:** intermediate
- **Why:** rate-sensitivity reasoning; refi-stress prompt.
- **Maps to:** `dscrSensitivityRate` quiz template.

### Q: Loan passes DSCR (1.31x) but fails debt yield (7.7% vs 8% threshold). Which governs?
- **Role:** mortgageUw · **Difficulty:** advanced
- **Why:** debt-yield-vs-DSCR sophistication; debt yield is rate-resistant.
- **Maps to:** `debt-yield-vs-dscr` situational + `debtYield` quiz template.

### Q: Refi the loan: market rate is 7%, current is 4%. NOI is flat. DSCR test fails. What levers exist?
- **Role:** mortgageUw · **Difficulty:** intermediate
- **Why:** classic refi-stress prompt; paydown is usually the answer.
- **Maps to:** `dscr-refi-failing` situational + `dscrLoanSizing` quiz template + `walk-dscr-1` walkthrough.

### Q: Walk me through sizing a permanent loan at 1.25x DSCR + 75% LTV + 8% debt yield. Which binds?
- **Role:** mortgageUw · **Difficulty:** intermediate
- **Why:** triple-constraint sizing; lender-style reasoning.
- **Maps to:** `dscrLoanSizing` quiz template + `walk-dscr-1` walkthrough + `loanSizingDscr` Excel template.

### Q: Sponsor's pro forma shows 8% NOI growth, 25 bps cap expansion, no capex. As lender, what do you re-cut?
- **Role:** mortgageUw · **Difficulty:** advanced
- **Why:** stack-conservatism reasoning.
- **Maps to:** `sponsor-proforma-aggressive` situational.

### Q: What's the loan constant for a 30-yr amort at 6%? At 7%? At 8%?
- **Role:** mortgageUw · **Difficulty:** intermediate
- **Why:** memorization check; loan constants are the bridge from rate to DS.
- **Maps to:** `loanConstant` quiz template + `walk-dscr-1` Step 1.

### Q: How does cash-on-cash differ from levered IRR, and when do you cite each?
- **Role:** mortgageUw · **Difficulty:** intermediate
- **Why:** distinction-tested often as a filter for understanding leverage.
- **Maps to:** `cashOnCash` quiz template + `CashOnCashViz`.

### Q: How do you stress-test a permanent loan for refi at maturity? What's a reasonable stressed cap rate vs. today's?
- **Role:** mortgageUw · **Difficulty:** advanced
- **Why:** refi-risk underwriting; common at life cos and debt funds.
- **Maps to:** `refiStressTest` quiz template + `refi-cap-stress` situational. *(Shipped — corrected from stale GAP marker 2026-09-13.)*

### Q: What's the difference between loan-to-cost and loan-to-value, and why might a construction lender size off LTC while the permanent lender sizes off LTV?
- **Role:** mortgageUw/development · **Difficulty:** beginner
- **Why:** foundational vocabulary most candidates fumble before they've done a real deal; `development` is the thinnest role in the situational catalog (9 of 71 cases, vs 40 for acquisitions) and `beginner` the thinnest difficulty (4 of 71).
- **Maps to:** **GAP — propose `ltc-vs-ltv-basics` situational** (`risk` · beginner · development), a plain-language lead-in ahead of the shipped advanced `dev-ltc-vs-ltv` situational's numeric sizing exercise.

### Q: Your office asset's DSCR is 1.35x today. 30% of the rent roll rolls in the next 18 months at a rate you can't predict. How would you stress the DSCR before your lender does?
- **Role:** mortgageUw/assetManagement · **Difficulty:** intermediate
- **Why:** rollover-driven DSCR risk; `sensitivity` is one of the thinnest categories in the catalog (2 of 71, both acquisitions-side cap-rate cases).
- **Maps to:** **GAP — propose `dscr-rollover-sensitivity` situational** (`sensitivity` · intermediate · office).

---

## Portfolio Management (9)

### Q: Your fund is 40% office vs 25% target. Which assets do you sell first to rebalance?
- **Role:** portfolioMgmt · **Difficulty:** advanced
- **Why:** forward-IRR-vs-backward-PnL framing; common partner-track interview.
- **Maps to:** `over-weight-office` situational.

### Q: Two paths produce identical after-tax IRRs (sell vs refi+hold). What tips the decision?
- **Role:** portfolioMgmt · **Difficulty:** advanced
- **Why:** tax-timing + LP-base sensitivity reasoning.
- **Maps to:** `tax-vs-irr-tradeoff` situational + `refi-vs-sell` situational.

### Q: Fund-level IRR is 14%, deal-level is 16%. Why the gap?
- **Role:** portfolioMgmt · **Difficulty:** intermediate
- **Why:** fees, J-curve, undeployed capital — common gotcha.
- **Maps to:** `fund-vs-deal-irr-gap` situational + `feeDragOnIrr` quiz template. *(Shipped — corrected from stale GAP marker 2026-09-13.)*

### Q: Compute portfolio-weighted NOI per unit across 4 assets of different sizes.
- **Role:** portfolioMgmt · **Difficulty:** beginner
- **Why:** weighted-average rollup; common pitfall is averaging the per-unit ratios.
- **Maps to:** `perUnitNormalization` Excel template.

### Q: How do you allocate capital across 5 deals when only 3 will close? What weighting matters?
- **Role:** portfolioMgmt · **Difficulty:** advanced
- **Why:** capital-allocation reasoning; common at closed-end fund GPs.
- **Maps to:** `capital-allocation-priority` situational. *(Shipped — corrected from stale GAP marker 2026-09-13.)*

### Q: When does a sponsor pay carry, and what's a typical waterfall structure?
- **Role:** portfolioMgmt · **Difficulty:** intermediate
- **Why:** waterfall basics; previously flagged out-of-scope per an old ROADMAP note, since superseded.
- **Maps to:** `distribution-waterfall-1tier` situational + `walk-waterfall-1` walkthrough, plus the deeper-cut `waterfall-european-vs-american`, `waterfall-catchup-mechanics`, `waterfall-irr-vs-moic-hurdle`, `waterfall-clawback-mechanics`, `waterfall-pref-compound-vs-simple`, and `waterfall-key-person-event` situational cases. *(Shipped — corrected from stale GAP marker 2026-09-13; this is now one of the best-covered topics in the bank.)*

### Q: How do you measure risk-adjusted returns across a fund's holdings? What's a defensible Sharpe-equivalent for CRE?
- **Role:** portfolioMgmt · **Difficulty:** advanced
- **Why:** risk-quantification; underbuilt in our content.
- **Maps to:** `risk-adjusted-return-framework` situational. *(Shipped — corrected from stale GAP marker 2026-09-13.)*

### Q: Deal returned 1.4x EM in 5 years. Translate to IRR — and explain why EM and IRR can diverge.
- **Role:** portfolioMgmt · **Difficulty:** beginner
- **Why:** EM↔IRR translation; common filter.
- **Maps to:** `equityMultiple` quiz template + `irrSimple` quiz template + `EquityMultipleViz`.

### Q: Two of your fund's assets have identical cap rates and hold periods, but one is 90% leased to a single investment-grade tenant and the other is 90% leased across 40 diversified small tenants. Do they carry the same risk in your portfolio construction?
- **Role:** portfolioMgmt · **Difficulty:** beginner
- **Why:** tenant-concentration is a first-principles portfolio-construction idea most candidates haven't explicitly named; `beginner` is the thinnest difficulty tier in the catalog (4 of 71 cases).
- **Maps to:** **GAP — propose `tenant-concentration-portfolio-risk` situational** (`investment-thesis` · beginner · portfolioMgmt).

---

## Development (10)

### Q: Land cost $8M, hard cost $38M, soft $7M, 5% contingency. What's TPC and what's the yield-on-cost on $4.5M stabilized NOI?
- **Role:** development · **Difficulty:** intermediate
- **Why:** standard feasibility-walkthrough opener.
- **Maps to:** `walk-dev-feasibility-1` walkthrough.

### Q: Yield on cost is 6.5%; market cap is 5%. Does this deal pencil for development risk?
- **Role:** development · **Difficulty:** intermediate
- **Why:** dev-spread vs threshold reasoning.
- **Maps to:** `devSpread` quiz template + `DevSpreadViz`.

### Q: 4,000-unit submarket, 85% leased, +300 units delivering, 50/mo absorption. How long to 95%?
- **Role:** development · **Difficulty:** intermediate
- **Why:** absorption math with deliveries — easy to get the denominator wrong.
- **Maps to:** `absorption-timing` situational.

### Q: What's a healthy land-cost-as-%-TPC for mid-rise multifamily? What if it's at 30%?
- **Role:** development · **Difficulty:** intermediate
- **Why:** sanity-check on dev cost structure.
- **Maps to:** `walk-dev-feasibility-1` Step 3.

### Q: Construction loan sizing on a $50M TPC dev with 65% LTC. What's the equity check?
- **Role:** development · **Difficulty:** intermediate
- **Why:** LTC-vs-LTV distinction; common at debt funds + GC-side.
- **Maps to:** `constructionLoanSizing` quiz template + `dev-ltc-vs-ltv` situational + `constructionLoanSizing` Excel template. *(Shipped — corrected from stale GAP marker 2026-09-13.)*

### Q: How do you size a lease-up reserve on a development that stabilizes year 2-3?
- **Role:** development · **Difficulty:** intermediate
- **Why:** lease-up risk pricing; common in development-side underwriting.
- **Maps to:** `leaseUpReserve` quiz template. *(Shipped — corrected from stale GAP marker 2026-09-13.)*

### Q: Ground lease vs fee-simple on a development site — what changes in your underwriting?
- **Role:** development · **Difficulty:** advanced
- **Why:** ground-lease economics; common at urban infill developers.
- **Maps to:** `ground-lease-vs-fee` situational. *(Shipped — corrected from stale GAP marker 2026-09-13.)*

### Q: A 2M SF industrial submarket is 92% leased. 500k SF of new supply is delivering in two phases six months apart. Quarterly net absorption has averaged 120k SF. How do you frame the leasing risk on the spec building delivering in phase two?
- **Role:** development/acquisitions · **Difficulty:** intermediate
- **Why:** `absorption` is the single thinnest category in the situational catalog (1 of 71 cases — only the multifamily `absorption-timing` case) and has no industrial or phased-delivery example.
- **Maps to:** **GAP — propose `phased-delivery-absorption` situational** (`absorption` · intermediate · industrial).

### Q: You're underwriting a 250-unit lease-up. Your pro forma needs 20 units/month average velocity to hit stabilization on schedule. The first two months leased 12 and 15 units. Is the deal off track?
- **Role:** development · **Difficulty:** beginner
- **Why:** a simpler, earlier-stage companion to the shipped `absorption-timing` situational and `leaseUpReserve` quiz template; `beginner` is the thinnest difficulty tier (4 of 71 cases) and `development` the thinnest role (9 of 71).
- **Maps to:** **GAP — propose `leaseup-velocity-checkpoint` situational** (`absorption` · beginner · multifamily).

### Q: Your development pro forma underwrites a 5.25% exit cap on $50M of stabilized value. If cap rates widen 75 bps by delivery, how much value does that erase, and does the deal still clear your development-spread hurdle?
- **Role:** development/acquisitions · **Difficulty:** intermediate
- **Why:** exit-cap sensitivity is a standard go/no-go stress test on the dev side but the catalog's only two `sensitivity` cases are both acquisitions-side cap-rate spreads.
- **Maps to:** **GAP — propose `dev-exit-cap-sensitivity` situational** (`sensitivity` · intermediate · development).

---

## Cross-cutting / market awareness (5)

These appear across all roles — they're filters at first-round interviews
regardless of position.

### Q: What's interesting in CRE right now?
- **Role:** all · **Difficulty:** beginner
- **Why:** market-awareness filter; almost universal first question.
- **Maps to:** **OUT OF SCOPE — too time-sensitive to maintain in a content app**.

### Q: Walk me through a recent deal you've seen.
- **Role:** all · **Difficulty:** intermediate
- **Why:** tests deal flow / market participation.
- **Maps to:** **OUT OF SCOPE — behavioral, not technical**.

### Q: What submarket are you bullish on, and why?
- **Role:** all · **Difficulty:** intermediate
- **Why:** market thesis prompt.
- **Maps to:** **OUT OF SCOPE — time-sensitive market-read**.

### Q: How do you feel about office in 2024+?
- **Role:** all · **Difficulty:** intermediate
- **Why:** sector-thesis prompt.
- **Maps to:** **OUT OF SCOPE — explicitly time-sensitive**.

### Q: Walk me through a distressed deal: half-vacant, basis below replacement, equity wiped — does it pencil?
- **Role:** all · **Difficulty:** advanced
- **Why:** distressed underwriting; increasingly relevant 2024+.
- **Maps to:** `walk-distressed-1` walkthrough + `distressed-loan-workout` situational. *(Shipped — corrected from stale GAP marker 2026-09-13.)*

---

## Summary statistics

- **Total questions in this doc:** 62
- **Mapped to existing content:** 48 (77%)
- **Flagged as GAPs:** 10 (16%)
- **Out of scope (time-sensitive / behavioral):** 4 (6%)

### 2026-09-13 coverage audit

Every GAP previously flagged in this doc (10 of them — the doc's own running
count had drifted stale) turned out to already be shipped in
`src/quiz/situational/`, `src/quiz/templates/`, or `src/quiz/walkthroughs.ts`:
`capex-reserve-discipline`, `refi-cap-stress` / `refiStressTest`,
`fund-vs-deal-irr-gap` / `feeDragOnIrr`, `capital-allocation-priority`,
the waterfall walkthrough + situational cluster, `risk-adjusted-return-framework`,
`dev-ltc-vs-ltv` / `constructionLoanSizing`, `leaseUpReserve`,
`ground-lease-vs-fee`, and `walk-distressed-1`. All ten are now marked mapped
above. None of this doc's questions are unmapped GAPs left over from that
batch — the 10 GAPs listed below are new proposals from this audit.

Cross-referencing this doc against the live `SITUATIONAL_CASES` catalog
(71 cases) to find which dimensions have the fewest shipped questions
relative to the rest of the catalog:

- **Category:** `absorption` is thinnest (1 of 71) vs `deal-process` (21);
  `comp-selection`, `sensitivity`, and `lease-econ` are next-thinnest (2 each).
- **Asset class:** `hotel` (1), `retail` (2), `industrial` (3) vs
  `multifamily` (11) and `office` (9); 37 cases are asset-class-agnostic.
- **Role:** `development` (9) is thinnest vs `acquisitions` (40); every
  development case also double-tags a second role.
- **Difficulty:** `beginner` (4) is by far the thinnest tier vs
  `intermediate` (33) and `advanced` (34) — the bank skews hard toward
  intermediate/advanced and under-serves an easier on-ramp.

New GAPs added this pass (ranked by how many thin dimensions each closes):

1. `ltc-vs-ltv-basics` — beginner + development (mortgage UW)
2. `leaseup-velocity-checkpoint` — beginner + absorption + development-adjacent (development)
3. `revpar-vs-comp-first-look` — beginner + hotel (asset mgmt)
4. `clear-height-comp-adjustment` — beginner + comp-selection + industrial (acquisitions)
5. `tenant-concentration-portfolio-risk` — beginner (portfolio mgmt)
6. `phased-delivery-absorption` — absorption + industrial + development (development)
7. `dev-exit-cap-sensitivity` — sensitivity + development (development)
8. `fixed-vs-cpi-bumps` — lease-econ + industrial (acquisitions)
9. `dscr-rollover-sensitivity` — sensitivity (mortgage UW)
10. `retail-co-tenancy-clause` — retail (asset mgmt)

Six of the ten hit the `beginner` gap, four hit `development`, three hit
`absorption`/`sensitivity` each, and four touch a thin asset class
(hotel/retail/industrial) — deliberately stacked so a single implementation
pass closes several coverage gaps at once rather than adding more depth to
the already-strong `deal-process`/`document-literacy`/advanced/acquisitions
areas. These are proposed phrasings for the vet queue, not yet implemented
as `SituationalCase` files.
