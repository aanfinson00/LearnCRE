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

## Acquisitions (13)

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

### Q: GAP — You underwrote a big-box industrial acquisition assuming a 3-year rollover to market rent 20% above in-place. Market rent growth comes in at only half that. Walk me through how your levered IRR moves and which lever you'd pull to protect the deal.
- **Role:** acquisitions · **Difficulty:** intermediate
- **Why:** `sensitivity` is one of our thinnest tags (2 of 71 situationals, both `mixed` asset class) and industrial is underrepresented (4 of 71) — this pairs rent-roll sensitivity with an asset class that has none.
- **Maps to:** **GAP — propose `industrial-rent-bump-sensitivity` situational (asset class: industrial) + existing `rentRollChange`/`leveredIrr` quiz templates.**

---

## Asset Management (11)

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

### Q: GAP — You're benchmarking a power-center retail asset against two "comps" — one anchored by a different grocer, one that just lost its anchor tenant. How do you choose and adjust your comp set before drawing conclusions about your asset's NOI performance?
- **Role:** assetManagement · **Difficulty:** intermediate
- **Why:** `comp-selection` is one of our thinnest tags (2 of 71 situationals) and retail is one of our thinnest asset classes (2 of 71) — this closes both gaps at once, and tenant-mix adjustment is a real comp-set pitfall.
- **Maps to:** **GAP — propose `retail-comp-selection-anchor-mix` situational (asset class: retail).**

---

## Mortgage Underwriting (11)

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

### Q: GAP — A hotel borrower wants permanent financing on a property where 60% of NOI is generated in Q2-Q3. How do you size the DSCR covenant and amortization so a normal off-season doesn't trip a technical default?
- **Role:** mortgageUw · **Difficulty:** advanced
- **Why:** hotel debt has none of the asset-class content depth of multifamily/office (1 situational vs 15) — seasonality-adjusted DSCR sizing is a real gap for lenders and life-co underwriters.
- **Maps to:** **GAP — propose `hotel-seasonal-dscr-sizing` situational (asset class: hotel).**

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

### Q: GAP — Your fund holds three hotels in the same metro under three different brand flags. One is underperforming its comp set by 15 points of RevPAR Index. Do you sell it, reflag it, or hold and fix operations? Walk me through the framework.
- **Role:** portfolioMgmt · **Difficulty:** advanced
- **Why:** hotel is our thinnest asset class (1 of 71 situationals) and has zero portfolio-level content — this pairs a hold/sell/reflag decision framework with the asset class that needs it most.
- **Maps to:** **GAP — propose `hotel-portfolio-hold-reflag-sell` situational (asset class: hotel).**

---

## Development (11)

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
- **Maps to:** **GAP — propose `constructionLoanSizing` quiz template + `dev-ltc-vs-ltv` situational**.

### Q: GAP — How do you size a lease-up reserve on a development that stabilizes year 2-3?
- **Role:** development · **Difficulty:** intermediate
- **Why:** lease-up risk pricing; common in development-side underwriting.
- **Maps to:** **GAP — propose `leaseUpReserve` quiz template**.

### Q: Ground lease vs fee-simple on a development site — what changes in your underwriting?
- **Role:** development · **Difficulty:** advanced
- **Why:** ground-lease economics; common at urban infill developers.
- **Maps to:** **GAP — propose `groundLeaseVsFee` situational**.

### Q: GAP — You're underwriting a select-service hotel development: land $6M, hard cost $28M, soft cost $6M, FF&E $3M, 8% contingency, stabilized NOI of $3.4M. What's your TPC and yield-on-cost, and how does that compare to buying a stabilized hotel trading at a 7% cap?
- **Role:** development · **Difficulty:** intermediate
- **Why:** hotel is our thinnest asset class overall (1 of 71 situationals, 0 in development) and FF&E as a distinct TPC line item is a hotel-specific trap most dev-cost templates don't test.
- **Maps to:** **GAP — propose `hotel-development-ffe-tpc` situational (asset class: hotel).**

### Q: GAP — You're evaluating a spec (non-build-to-suit) industrial development, and 18 months of speculative supply is already under construction in your submarket. How do you underwrite lease-up risk and absorption timing before you break ground?
- **Role:** development · **Difficulty:** intermediate
- **Why:** `absorption` is our single thinnest tag (1 of 71 situationals) and industrial development content is limited — spec vs build-to-suit risk is a real distinguishing question at industrial developers.
- **Maps to:** **GAP — propose `industrial-spec-absorption-risk` situational (asset class: industrial).**

### Q: GAP — A ground-up grocery-anchored retail development won't get construction financing until the anchor is pre-leased. The anchor wants a $2M TI allowance and a 10-year term at below-market rent. How do you evaluate whether that anchor lease still clears your development return hurdle?
- **Role:** development · **Difficulty:** intermediate
- **Why:** retail has almost no development-side content (2 of 71 situationals total, 0 in development) and lender pre-leasing requirements are a common real-world gate.
- **Maps to:** **GAP — propose `retail-anchor-preleasing-tradeoff` situational (asset class: retail).**

### Q: GAP — A build-to-suit industrial developer is negotiating a lease with a credit tenant who wants 2% annual bumps instead of the developer's preferred 3%. How does that 100 bps difference flow through to your yield-on-cost, and does it change how much construction debt you can size against the lease?
- **Role:** development · **Difficulty:** advanced
- **Why:** `lease-econ` is one of our thinnest tags (2 of 71 situationals, both retail) — this brings lease-economics reasoning into development/mortgageUw territory where it's currently unaddressed.
- **Maps to:** **GAP — propose `bts-lease-bump-yield-impact` situational (asset class: industrial).**

---

## Cross-cutting / market awareness (7)

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

### Q: GAP — How do you think about basis risk between floating-rate debt and a fixed-rate underwriting assumption when rates are volatile?
- **Role:** all · **Difficulty:** intermediate
- **Why:** Cross-cutting is our thinnest section (5 questions) despite being asked at every seniority level; rate-basis risk sits between acquisitions and mortgage underwriting and isn't owned by either template set today.
- **Maps to:** **GAP — propose `rate-basis-risk-framework` situational.**

### Q: GAP — Two "comparable" sales closed within a month of each other in the same submarket at a 150 bps cap-rate spread. How do you decide which one is actually more relevant to your subject deal?
- **Role:** all · **Difficulty:** intermediate
- **Why:** `comp-selection` is one of our thinnest tags (2 of 71 situationals) and reconciling conflicting comps is asked across acquisitions, asset management, and portfolio roles alike.
- **Maps to:** **GAP — propose `comp-selection-conflicting-comps` situational.**

---

## Summary statistics

- **Total questions in this doc:** 62
- **Mapped to existing content:** 41 (66%)
- **Flagged as GAPs:** 18 (29%)
- **Out of scope (time-sensitive / behavioral):** 4 (6%)

**2026-07 coverage audit.** Cross-referencing `feedback/questions.json` (71
shipped situational + longform items) against role and asset-class tags
surfaced a skew that this doc's per-section counts didn't fully capture:

- **By asset class:** multifamily 15, office 10, mixed 9, industrial 4,
  retail 2, **hotel 1**. Hotel/retail/industrial combined (7) are still
  outnumbered 2-to-1 by multifamily alone.
- **By role:** acquisitions 46 tags, assetManagement 34, portfolioMgmt 29,
  mortgageUw 20, **development 10** — development is the thinnest role by a
  wide margin, matching this doc's own Development section being its
  shortest (7 questions, now 11).
- **By topic tag:** `absorption` (1), `sensitivity` (2), `comp-selection`
  (2), and `lease-econ` (2) are the four thinnest categories out of 12.

The 10 questions added in this pass (marked `GAP` above, dated 2026-07-03)
target that skew directly rather than adding more acquisitions/multifamily
content on top of an already-deep pile.

Top GAPs to address next (ranked by how much of the skew they close):

1. `hotel-development-ffe-tpc` + `hotel-seasonal-dscr-sizing` + `hotel-portfolio-hold-reflag-sell` — hotel is the single thinnest asset class (1 situational) and had zero development/mortgageUw/portfolio coverage.
2. `industrial-spec-absorption-risk` + `industrial-rent-bump-sensitivity` + `bts-lease-bump-yield-impact` — closes the `absorption` and `sensitivity` tag gaps while adding industrial-development content.
3. `retail-anchor-preleasing-tradeoff` + `retail-comp-selection-anchor-mix` — retail's only 2 situationals are both acquisitions/assetManagement-side; these add development and comp-selection angles.
4. `rate-basis-risk-framework` + `comp-selection-conflicting-comps` — Cross-cutting is the thinnest section overall (5, now 7) despite being asked at every seniority level.
5. Older GAPs already shipped per `ROADMAP.md` (`capexReserveSizing`, `refiStressTest`, `feeDragOnIrr`, `constructionLoanSizing`, `walk-distressed-1`, `leaseUpReserve`, `groundLeaseVsFee`) still read as open above — a follow-up pass should update those five entries' `Maps to:` lines rather than adding new content.
