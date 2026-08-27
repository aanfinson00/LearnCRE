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

## Coverage-gap analysis (2026-08-27)

Every `GAP` flagged in the previous pass of this doc has since shipped —
`capex-reserve-discipline`, `refiStressTest`/`refi-cap-stress`,
`fund-vs-deal-irr-gap`/`feeDragOnIrr`, `capital-allocation-priority`,
`walk-waterfall-1` (covers the deferred promote/waterfall walk),
`risk-adjusted-return-framework`, `constructionLoanSizing`/`dev-ltc-vs-ltv`,
`leaseUpReserve`, `ground-lease-vs-fee`, and `walk-distressed-1` all now exist
in `src/quiz/`. Those entries below are marked *(Built since last pass)*
instead of being re-flagged.

To find where the bank is genuinely thin *now*, rather than re-guess from
this doc's own (now-stale) GAP list, we counted `roles:` tags across every
content type currently shipped — situational cases, quiz templates, longform
cases, and walkthroughs:

| Role | Situational | Templates | Longform | Walkthroughs | Mock prose | **Total** |
|---|---|---|---|---|---|---|
| acquisitions | 40 | 60 | 6 | 8 | 1 | **115** |
| assetManagement | 31 | 20 | 3 | 4 | 1 | **59** |
| portfolioMgmt | 25 | 16 | 4 | 3 | 0 | **48** |
| mortgageUw | 19 | 16 | 1 | 2 | 2 | **40** |
| development | 9 | 10 | 1 | 2 | 0 | **22** |

**development is the least-covered role by a wide margin** — roughly a fifth
of acquisitions' coverage and about half of the next-thinnest role
(mortgageUw). Six new candidate phrasings below target development
specifically (highest-and-best-use/entitlement risk, pre-leasing covenants,
TIF/PILOT incentives, phasing, parking-ratio tradeoffs, and mid-build cost
escalation — none of which exist in the bank today). Four more target
mortgageUw, the second-thinnest role, covering subordinate-debt structuring,
rate-cap sizing, prepayment penalties, and CMBS special-servicing triggers.
All ten are flagged `GAP` — phrasings only, not yet built or source-verified.

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

### Q: How do you set a capex reserve on a stabilized asset, and what gets included vs excluded?
- **Role:** assetManagement · **Difficulty:** intermediate
- **Why:** capex discipline; common pitfall is using the OM number unchanged.
- **Maps to:** `capex-reserve-discipline` situational + `capexReserveSizing` quiz template. *(Built since last pass — was flagged GAP.)*

---

## Mortgage Underwriting (14)

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
- **Maps to:** `refiStressTest` quiz template + `refi-cap-stress` situational. *(Built since last pass — was flagged GAP.)*

### Q: GAP — Senior debt covers 65% LTV. Sponsor wants to add a 15% mezzanine tranche at a 12% pay rate to reach 80% total leverage. As the senior lender, what do you require in the intercreditor agreement?
- **Role:** mortgageUw · **Difficulty:** advanced
- **Why:** mezz/pref-equity stacking and intercreditor terms (cure rights, standstill periods, control-of-workout) are a staple debt-fund and life-co interview topic; the bank has no subordinate-debt-structuring content.
- **Maps to:** **GAP — propose `mezz-intercreditor-terms` situational**.

### Q: GAP — Floating-rate bridge loan at SOFR+300; loan docs require a rate cap struck at 5.5% SOFR for the full term, and SOFR is currently 5.0%. How do you size the cap cost, and what happens to DSCR if SOFR strikes through the cap?
- **Role:** mortgageUw · **Difficulty:** intermediate
- **Why:** rate-cap sizing and replacement-cap risk became one of the most-asked underwriting questions once floating-rate bridge lending scaled post-2021; not represented in our bank.
- **Maps to:** **GAP — propose `rate-cap-sizing` situational + `rateCapCost` quiz template**.

### Q: GAP — Borrower wants to refinance 3 years into a 10-year fixed-rate CMBS loan. What's the difference between a yield-maintenance and a defeasance prepayment penalty, and which is more expensive here?
- **Role:** mortgageUw · **Difficulty:** intermediate
- **Why:** prepayment-penalty mechanics are a standard fixed-rate and CMBS debt-desk question; nothing in the bank currently tests yield maintenance vs. defeasance.
- **Maps to:** **GAP — propose `yield-maintenance-vs-defeasance` situational**.

### Q: GAP — A CMBS loan misses its DSCR covenant for two consecutive quarters. Does it go straight to default, or does something else happen first?
- **Role:** mortgageUw · **Difficulty:** advanced
- **Why:** distinguishes a cash-management/lockbox trigger and special-servicing transfer from an actual payment default — commonly tested, and adjacent to but distinct from our existing `dscr-cash-trap-trigger` case (which covers the cash-trap mechanic, not the servicing-transfer pathway).
- **Maps to:** **GAP — propose `special-servicing-transfer-trigger` situational**.

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
- **Maps to:** `fund-vs-deal-irr-gap` situational + `feeDragOnIrr` quiz template. *(Built since last pass — was flagged GAP.)*

### Q: Compute portfolio-weighted NOI per unit across 4 assets of different sizes.
- **Role:** portfolioMgmt · **Difficulty:** beginner
- **Why:** weighted-average rollup; common pitfall is averaging the per-unit ratios.
- **Maps to:** `perUnitNormalization` Excel template.

### Q: How do you allocate capital across 5 deals when only 3 will close? What weighting matters?
- **Role:** portfolioMgmt · **Difficulty:** advanced
- **Why:** capital-allocation reasoning; common at closed-end fund GPs.
- **Maps to:** `capital-allocation-priority` situational. *(Built since last pass — was flagged GAP.)*

### Q: When does a sponsor pay carry, and what's a typical 2-tier waterfall?
- **Role:** portfolioMgmt · **Difficulty:** intermediate
- **Why:** waterfall basics; explicitly out of scope per ROADMAP — flag for future.
- **Maps to:** `walk-waterfall-1` walkthrough (+ the `waterfall*` situational family). *(Built since last pass — the deferred-per-ROADMAP note no longer applies.)*

### Q: How do you measure risk-adjusted returns across a fund's holdings? What's a defensible Sharpe-equivalent for CRE?
- **Role:** portfolioMgmt · **Difficulty:** advanced
- **Why:** risk-quantification; underbuilt in our content.
- **Maps to:** `risk-adjusted-return-framework` situational. *(Built since last pass — was flagged GAP.)*

### Q: Deal returned 1.4x EM in 5 years. Translate to IRR — and explain why EM and IRR can diverge.
- **Role:** portfolioMgmt · **Difficulty:** beginner
- **Why:** EM↔IRR translation; common filter.
- **Maps to:** `equityMultiple` quiz template + `irrSimple` quiz template + `EquityMultipleViz`.

---

## Development (13)

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
- **Maps to:** `constructionLoanSizing` quiz template + `dev-ltc-vs-ltv` situational. *(Built since last pass — was flagged GAP.)*

### Q: How do you size a lease-up reserve on a development that stabilizes year 2-3?
- **Role:** development · **Difficulty:** intermediate
- **Why:** lease-up risk pricing; common in development-side underwriting.
- **Maps to:** `leaseUpReserve` quiz template. *(Built since last pass — was flagged GAP.)*

### Q: Ground lease vs fee-simple on a development site — what changes in your underwriting?
- **Role:** development · **Difficulty:** advanced
- **Why:** ground-lease economics; common at urban infill developers.
- **Maps to:** `ground-lease-vs-fee` situational. *(Built since last pass — was flagged GAP.)*

### Q: GAP — You control a 5-acre urban infill site currently zoned for low-rise retail. As-is value is $8M; rezoned to multifamily, the appraised residual land value is $14M. How do you underwrite the rezoning risk in your bid?
- **Role:** development · **Difficulty:** intermediate
- **Why:** highest-and-best-use analysis and entitlement-risk discounting is a core development-underwriting skill and is completely absent from our content — development has the thinnest coverage of the six roles (see coverage-gap analysis above).
- **Maps to:** **GAP — propose `highest-and-best-use-rezoning` situational**.

### Q: GAP — Your construction lender requires 50% pre-leasing before the first draw. You're at 30% pre-leased with 4 months left before your rate lock expires. What are your options?
- **Role:** development · **Difficulty:** intermediate
- **Why:** pre-leasing covenants are one of the most common construction-loan gating items in real interviews and aren't tested anywhere in our bank.
- **Maps to:** **GAP — propose `preleasing-covenant-shortfall` situational + `preleasingCoverageGap` quiz template**.

### Q: GAP — A municipality offers a 10-year TIF rebate worth $3M against your $40M vertical construction cost, in exchange for 15% affordable units. How does that change your feasibility math?
- **Role:** development · **Difficulty:** advanced
- **Why:** public-private financing tools (TIF, PILOT, impact-fee waivers) come up often in urban infill and affordable-adjacent development interviews and are entirely absent from our content.
- **Maps to:** **GAP — propose `tif-incentive-feasibility` situational**.

### Q: GAP — You're developing 500 units in three ~165-unit phases over 4 years instead of building all at once. How does phasing change your capital stack and your risk profile?
- **Role:** development · **Difficulty:** advanced
- **Why:** phasing trades construction-cost efficiency against market-timing and re-underwriting risk between phases — a common senior-level development prompt.
- **Maps to:** **GAP — propose `phased-development-capital-stack` situational**.

### Q: GAP — Zoning allows 1.5 parking spaces/unit surface-parked, or 1.0 space/unit with a $35k/space structured deck. How do you decide?
- **Role:** development · **Difficulty:** intermediate
- **Why:** parking-ratio-vs-density tradeoffs move yield-on-cost directly and are a frequent junior-development technical question; untested in our bank.
- **Maps to:** **GAP — propose `parking-ratio-density-tradeoff` situational**.

### Q: GAP — Steel and lumber costs are up 20% since your pro forma was underwritten and you're 60% through vertical construction. How do you re-underwrite the remaining budget and protect your return?
- **Role:** development · **Difficulty:** intermediate
- **Why:** cost-escalation stress-testing has been a near-universal development interview question since 2021-22; extends our existing `contingencyDrawDown` template into a full situational rather than a single-step calc.
- **Maps to:** **GAP — propose `cost-escalation-midbuild` situational**.

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
- **Maps to:** `walk-distressed-1` walkthrough. *(Built since last pass — was flagged GAP.)*

---

## Summary statistics

_Updated 2026-08-27 — all 10 GAPs from the prior pass have shipped; stats
below reflect that plus the 10 new candidate phrasings added this pass._

- **Total questions in this doc:** 62
- **Mapped to existing content:** 48 (77%)
- **Flagged as GAPs:** 10 (16%)
- **Out of scope (time-sensitive / behavioral):** 4 (6%)

By role, mapped-to-content rate: acquisitions 12/12 (100%), asset management
10/10 (100%), portfolio management 8/8 (100%), mortgage underwriting 10/14
(71%), development 7/13 (54%). Development and mortgage underwriting are the
two roles carrying every open GAP in this doc, consistent with them being the
two thinnest-covered roles by shipped-content volume (see coverage-gap
analysis above).

Top GAPs to address (ranked by interview frequency):

1. `preleasing-covenant-shortfall` situational + `preleasingCoverageGap` quiz (development)
2. `cost-escalation-midbuild` situational (development)
3. `rate-cap-sizing` situational + `rateCapCost` quiz (mortgage UW)
4. `mezz-intercreditor-terms` situational (mortgage UW)
5. `highest-and-best-use-rezoning` situational (development)
6. `yield-maintenance-vs-defeasance` situational (mortgage UW)
7. `special-servicing-transfer-trigger` situational (mortgage UW)
8. `phased-development-capital-stack` situational (development)
9. `parking-ratio-density-tradeoff` situational (development)
10. `tif-incentive-feasibility` situational (development)

These ten gaps would lift mapped-to-content coverage from 77% → ~94% with
~½ day of content work each, and — like the prior batch — they all surface
from real interview-question patterns in development and mortgage
underwriting rather than top-down design guesses.
