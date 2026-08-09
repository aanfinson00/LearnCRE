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

## Acquisitions (12)

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

---

## Asset Management (10)

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

### Q: GAP — How do you set a capex reserve on a stabilized asset, and what gets included vs excluded?
- **Role:** assetManagement · **Difficulty:** intermediate
- **Why:** capex discipline; common pitfall is using the OM number unchanged.
- **Maps to:** **GAP — propose `capex-reserve-discipline` situational + `capexReserveSizing` quiz template**.

---

## Mortgage Underwriting (10)

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

### Q: GAP — How do you stress-test a permanent loan for refi at maturity? What's a reasonable stressed cap rate vs. today's?
- **Role:** mortgageUw · **Difficulty:** advanced
- **Why:** refi-risk underwriting; common at life cos and debt funds.
- **Maps to:** **GAP — propose `refiStressTest` quiz template + `refi-cap-stress` situational**.

---

## Portfolio Management (8)

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
- **Maps to:** **GAP — propose `fund-vs-deal-irr-gap` situational + `feeDragOnIrr` quiz template**.

### Q: Compute portfolio-weighted NOI per unit across 4 assets of different sizes.
- **Role:** portfolioMgmt · **Difficulty:** beginner
- **Why:** weighted-average rollup; common pitfall is averaging the per-unit ratios.
- **Maps to:** `perUnitNormalization` Excel template.

### Q: How do you allocate capital across 5 deals when only 3 will close? What weighting matters?
- **Role:** portfolioMgmt · **Difficulty:** advanced
- **Why:** capital-allocation reasoning; common at closed-end fund GPs.
- **Maps to:** **GAP — propose `capital-allocation-priority` situational**.

### Q: When does a sponsor pay carry, and what's a typical 2-tier waterfall?
- **Role:** portfolioMgmt · **Difficulty:** intermediate
- **Why:** waterfall basics; explicitly out of scope per ROADMAP — flag for future.
- **Maps to:** **GAP — propose `1-tier-promote-walk` walkthrough (deferred per ROADMAP)**.

### Q: GAP — How do you measure risk-adjusted returns across a fund's holdings? What's a defensible Sharpe-equivalent for CRE?
- **Role:** portfolioMgmt · **Difficulty:** advanced
- **Why:** risk-quantification; underbuilt in our content.
- **Maps to:** **GAP — propose `risk-adjusted-return-framework` situational**.

### Q: Deal returned 1.4x EM in 5 years. Translate to IRR — and explain why EM and IRR can diverge.
- **Role:** portfolioMgmt · **Difficulty:** beginner
- **Why:** EM↔IRR translation; common filter.
- **Maps to:** `equityMultiple` quiz template + `irrSimple` quiz template + `EquityMultipleViz`.

---

## Development (17)

*2026-08-09 note: this was the thinnest section relative to actual in-app coverage — only 22 development-tagged content items vs. 38-114 for the other roles — so it's the first target for expansion. Also caught 3 stale GAP flags below where content had already shipped since the doc was last synced. Added 10 new candidate question phrasings (still GAPs — proposed framings only, not yet drafted into full situationals) to seed the next content batch.*

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
- **Maps to:** `constructionLoanSizing` quiz template + `dev-ltc-vs-ltv` situational. *(2026-08-09: content shipped since this doc was last synced — was flagged GAP, now built.)*

### Q: GAP — How do you size a lease-up reserve on a development that stabilizes year 2-3?
- **Role:** development · **Difficulty:** intermediate
- **Why:** lease-up risk pricing; common in development-side underwriting.
- **Maps to:** `leaseUpReserve` quiz template. *(2026-08-09: content shipped since this doc was last synced — was flagged GAP, now built.)*

### Q: Ground lease vs fee-simple on a development site — what changes in your underwriting?
- **Role:** development · **Difficulty:** advanced
- **Why:** ground-lease economics; common at urban infill developers.
- **Maps to:** `groundLeaseVsFee` situational. *(2026-08-09: content shipped since this doc was last synced — was flagged GAP, now built.)*

### Q: What's the difference between hard costs and soft costs on a ground-up budget, and which soft-cost lines get missed most often in a first-pass estimate?
- **Role:** development · **Difficulty:** beginner
- **Why:** opening filter for development-side roles; soft-cost blind spots (FF&E, marketing/lease-up commissions, developer fee, insurance during construction, extended interest reserve) are the most common first-pass budget miss.
- **Maps to:** **GAP — propose `hard-vs-soft-cost-classification` situational**, ties to `walk-dev-feasibility-1` Step 2.

### Q: Your GC offers a choice between a GMP (guaranteed maximum price) contract and cost-plus-fee with no cap. Which do you push for, and how does the choice change your contingency sizing?
- **Role:** development · **Difficulty:** intermediate
- **Why:** contract-structure reasoning; candidates often default to "GMP is always better" without pricing the fee premium GCs charge for taking on price risk.
- **Maps to:** **GAP — propose `gmp-vs-cost-plus` situational**.

### Q: The municipality is charging $18k/unit in impact fees plus requiring a $2M off-site infrastructure improvement as a condition of approval. How does this move your TPC and your yield-on-cost target?
- **Role:** development · **Difficulty:** intermediate
- **Why:** entitlement-condition cost creep; a common way deals that penciled at application stage stop penciling by permit.
- **Maps to:** **GAP — propose `impact-fee-tpc-impact` situational**, ties to `yieldOnCost` quiz template.

### Q: Your GC's surety won't bond a project above $40M without additional collateral, and the project is $55M. What are your options as the developer?
- **Role:** development · **Difficulty:** intermediate
- **Why:** bonding-capacity constraint; underappreciated gate on GC selection for larger deals.
- **Maps to:** **GAP — propose `performance-bond-capacity` situational**.

### Q: A site needs a zoning variance before it can break ground. The process typically runs 9-14 months and isn't guaranteed. How do you structure the land purchase to price that risk — option, phased closing, or cash at risk?
- **Role:** development · **Difficulty:** advanced
- **Why:** entitlement-risk allocation; tests whether a candidate reaches for optionality instead of just discounting the bid.
- **Maps to:** **GAP — propose `entitlement-risk-option-structure` situational**.

### Q: Phase I comes back clean but Phase II finds contamination requiring $1.5M of remediation before vertical construction can start, discovered after you're under a hard-money deposit. Walk through your options.
- **Role:** development · **Difficulty:** advanced
- **Why:** environmental-diligence discipline; tests PSA contingency awareness alongside the cost impact.
- **Maps to:** **GAP — propose `environmental-remediation-budget` situational**.

### Q: Your construction loan requires 50% pre-leasing before the lender funds the final draw. You're at 35% pre-leased with 4 months until the loan matures. What are your options?
- **Role:** development · **Difficulty:** advanced
- **Why:** pre-leasing-covenant stress; common late-cycle question as lease-up timelines slip.
- **Maps to:** **GAP — propose `preleasing-covenant-shortfall` situational**.

### Q: The jurisdiction offers a 20% density bonus if you set aside 15% of units as affordable at 60% AMI. Walk through how you'd model whether to take it.
- **Role:** development · **Difficulty:** advanced
- **Why:** density-bonus tradeoff; increasingly common in gateway-metro multifamily development underwriting.
- **Maps to:** **GAP — propose `density-bonus-tradeoff` situational**.

### Q: You're underwriting a deal with a 10-year PILOT (payment in lieu of taxes) that steps up to full assessment in year 11. How does that change your going-in vs. exit cap assumptions?
- **Role:** development · **Difficulty:** advanced
- **Why:** tax-abatement-cliff reasoning; a common trap is holding the exit cap flat and missing the reassessment hit to NOI at sale.
- **Maps to:** **GAP — propose `pilot-abatement-cliff` situational**, ties to `taxReassessment` quiz template.

### Q: Halfway through entitlement, the for-sale condo market softens and rental comps look stronger than the condo pro forma. What does it take to re-underwrite as a rental hold, and what sunk costs get written off?
- **Role:** development · **Difficulty:** advanced
- **Why:** highest-and-best-use pivot mid-deal; tests separating sunk entitlement/design cost from the go-forward decision.
- **Maps to:** **GAP — propose `condo-to-rental-pivot` situational**.

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

### Q: GAP — Walk me through a distressed deal: half-vacant, basis below replacement, equity wiped — does it pencil?
- **Role:** all · **Difficulty:** advanced
- **Why:** distressed underwriting; increasingly relevant 2024+.
- **Maps to:** **GAP — propose `walk-distressed-1` walkthrough**.

---

## Summary statistics

*Updated 2026-08-09 — added 10 new Development phrasings and corrected 3 stale GAP flags (content had shipped since the doc was last synced). See counts by section above; Development and Portfolio Management remain the thinnest sections and are the next candidates for a similar pass.*

- **Total questions in this doc:** 62
- **Mapped to existing content:** 38 (61%)
- **Flagged as GAPs:** 20 (32%)
- **Out of scope (time-sensitive / behavioral):** 4 (6%)

Note: the mapped% dropped from the prior 78% not because coverage regressed,
but because this pass added 10 deliberately-unbuilt candidate phrasings
(new GAPs) for the thinnest section rather than only auditing what already
exists. Several previously-tracked GAPs were also discovered to already be
built (`constructionLoanSizing`, `leaseUpReserve`, `groundLeaseVsFee`,
`refiStressTest`, `capexReserveSizing`, `feeDragOnIrr`,
`fund-vs-deal-irr-gap`, `capital-allocation-priority`,
`risk-adjusted-return-framework` all now exist in `src/quiz/`) — only the
Development section's 3 were corrected in this pass; the mortgage/asset-mgmt/
portfolio sections likely need the same staleness sweep in a follow-up.

Top GAPs to address (ranked by interview frequency / section thinness):

1. `hard-vs-soft-cost-classification` situational (development)
2. `gmp-vs-cost-plus` situational (development)
3. `entitlement-risk-option-structure` situational (development)
4. `preleasing-covenant-shortfall` situational (development)
5. `walk-distressed-1` walkthrough (cross-cutting)

Development now carries the largest single batch of open GAPs (10) of any
section — by design, since it's also the section with the fewest built
content items (22 development-tagged templates/situationals/walkthroughs,
vs. 38-114 for the other roles). Portfolio Management (48 content items,
4/8 doc entries still mapped) is the next-thinnest area and is a reasonable
target for the same treatment in a future pass.
