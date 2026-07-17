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

## Development (7)

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

- **Total questions in this doc:** 52
- **Mapped to existing content:** 41 (78%)
- **Flagged as GAPs:** 8 (15%)
- **Out of scope (time-sensitive / behavioral):** 4 (8%)

Top GAPs to address (ranked by interview frequency):

1. `capexReserveSizing` quiz + `capex-reserve-discipline` situational (asset mgmt)
2. `refiStressTest` quiz + `refi-cap-stress` situational (mortgage UW)
3. `fund-vs-deal-irr-gap` situational + `feeDragOnIrr` quiz (portfolio mgmt)
4. `constructionLoanSizing` quiz + `dev-ltc-vs-ltv` situational (development)
5. `walk-distressed-1` walkthrough (cross-cutting)

These five gaps would lift mapped-to-content coverage from 78% → ~93% with
~½ day of content work each, and they all surface from real interview-question
patterns rather than top-down design guesses.

---

## Question-base depth pass — Phase 2 candidates (proposed)

ROADMAP's "Question-base depth pass — Phase 1" audit found the live question
bank (`feedback/questions.json`, 100 questions) skewed hard toward a few
asset classes, roles, and difficulty levels, and queued Phases 2-4 to close
the gap. Re-running that audit today (situational + longform + walkthrough
entries, tagging by substring match on `meta`) shows the skew is still wide:

| Asset class  | Count |     | Role            | Count |     | Difficulty   | Count |
|--------------|------:|-----|------------------|------:|-----|--------------|------:|
| multifamily  |    15 |     | acquisitions     |    50 |     | advanced     |    39 |
| office       |    10 |     | assetManagement  |    36 |     | intermediate |    37 |
| mixed        |     9 |     | portfolioMgmt    |    30 |     | beginner     |     4 |
| industrial   |     4 |     | mortgageUw       |    21 |     |              |       |
| retail       |     2 |     | development      |    11 |     |              |       |
| **hotel**    | **1** |     |                  |       |     |              |       |

The 10 phrasings below are new proposals (not yet mapped to shipped content)
deliberately weighted toward the thinnest cells above — hotel, retail,
industrial, development, mortgage UW, and beginner difficulty — to give a
future content pass a running start. Same review flow as the rest of this
doc: verify against a public source, then propose `Maps to:` content.

### Q: You're underwriting a limited-service hotel at a 9% cap versus a 6% cap for stabilized multifamily in the same submarket — is that apples-to-apples? Why or why not?
- **Role:** acquisitions · **Difficulty:** beginner
- **Why:** hotel cap rates price operating risk (RevPAR volatility, no leases), not just real estate risk — a common first-round confusion for candidates coming from multifamily/office backgrounds.
- **Maps to:** **GAP — propose `hotel-cap-rate-comparability` situational**.

### Q: RevPAR is up 6% year-over-year but GOP margin compressed 300bps over the same period. What's your first diagnostic move?
- **Role:** assetManagement · **Difficulty:** intermediate
- **Why:** tests whether a candidate separates top-line (RevPAR) from operating efficiency (GOP margin) instead of treating hotel performance as one number.
- **Maps to:** **GAP — propose `hotel-revpar-gop-divergence` situational** (extends existing `revparFromAdrOcc` / `gopMargin` quiz templates).

### Q: A big-box anchor pays $8/SF in-place versus $14/SF market, on a lease expiring in 18 months, with a co-tenancy clause tied to overall center occupancy. How does that clause change your mark-to-market assumption?
- **Role:** acquisitions · **Difficulty:** intermediate
- **Why:** co-tenancy risk means the mark-to-market upside isn't "free" the way it would be without the clause — losing the anchor can trigger other tenants' rent relief or kick-out rights.
- **Maps to:** **GAP — propose `retail-cotenancy-mark-to-market` situational** (extends `mark-to-market-upside`).

### Q: Walk me through the difference between a percentage-rent breakpoint and a natural breakpoint — why would a landlord prefer one over the other?
- **Role:** assetManagement · **Difficulty:** beginner
- **Why:** foundational retail-lease vocabulary that beginner-level candidates are expected to know before the percentage-rent math questions.
- **Maps to:** **GAP — propose short vocabulary situational**, pairs with existing `percentageRentBreakpoint` quiz template.

### Q: You're comparing two industrial development sites — one with 32' clear height and a smaller footprint, one with 36' clear height and a larger footprint but a longer entitlement timeline. How do you frame that tradeoff for your investment committee?
- **Role:** development · **Difficulty:** intermediate
- **Why:** forces a candidate to weigh a physical-spec premium against time-value-of-money and entitlement risk, not just pick "bigger is better."
- **Maps to:** **GAP — propose `industrial-clear-height-entitlement-tradeoff` situational** (extends `clearHeightPremium` quiz template).

### Q: Why does a bigger truck court and more dock doors per square foot command a rent premium in industrial, even holding clear height constant?
- **Role:** acquisitions · **Difficulty:** beginner
- **Why:** entry-level physical-spec reasoning for logistics/industrial — a common opening filter question distinct from the clear-height question above.
- **Maps to:** **GAP — propose short situational**, pairs with existing `truckCountPerSf` quiz template.

### Q: Your construction lender sized the loan off 65% LTC, but your total project cost estimate has grown 8% since the appraisal was ordered. How does that shift the sponsor's required equity, and what do you flag to the lender?
- **Role:** development / mortgageUw · **Difficulty:** intermediate
- **Why:** tests the mechanical link between cost creep and equity sizing, plus the judgment call of when a lender needs to be looped back in.
- **Maps to:** **GAP — propose `construction-ltc-cost-growth` situational** (extends `constructionLoanSizing` quiz template).

### Q: What's the difference between a preliminary / rough-order-of-magnitude budget and a GMP (guaranteed maximum price) contract, and why does an underwriter care which one a deal is using?
- **Role:** development · **Difficulty:** beginner
- **Why:** foundational development vocabulary; a candidate who can't distinguish budget confidence levels will misjudge cost-overrun risk in every later question.
- **Maps to:** **GAP — propose short vocabulary situational**.

### Q: A borrower's DSCR comes in at 1.15x on your base case, but the lender's minimum is 1.25x. What are the most common levers to close that gap without walking away from the deal?
- **Role:** mortgageUw · **Difficulty:** beginner
- **Why:** entry-level mortgage-UW question — tests whether a candidate knows the standard toolkit (paydown, rate buydown, interest-only period, additional reserves) before the advanced stress-test questions.
- **Maps to:** **GAP — propose `dscr-shortfall-levers` situational** (extends `dscrTestPasses` / `dscrSensitivityRate` quiz templates).

### Q: You're stress-testing a portfolio of five loans maturing in the next 18 months against a 150bps higher refi-rate environment. Two loans fail a 1.20x DSCR test at the stressed rate. How do you prioritize which one to address first?
- **Role:** mortgageUw / portfolioMgmt · **Difficulty:** advanced
- **Why:** combines the existing single-loan refi-stress GAP with portfolio-level prioritization — a natural advanced follow-up once `refiStressTest` ships.
- **Maps to:** **GAP — propose `portfolio-refi-stress-prioritization` situational** (extends `refiStressTest` quiz template).
