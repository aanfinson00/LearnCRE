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

### Q: How do you set a capex reserve on a stabilized asset, and what gets included vs excluded?
- **Role:** assetManagement · **Difficulty:** intermediate
- **Why:** capex discipline; common pitfall is using the OM number unchanged.
- **Maps to:** `capex-reserve-discipline` situational + `capexReserveSizing` quiz template. *(Updated 2026-09-22 — this shipped since the doc was last synced; was flagged GAP.)*

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

### Q: How do you stress-test a permanent loan for refi at maturity? What's a reasonable stressed cap rate vs. today's?
- **Role:** mortgageUw · **Difficulty:** advanced
- **Why:** refi-risk underwriting; common at life cos and debt funds.
- **Maps to:** `refiStressTest` quiz template + `refi-cap-stress` situational. *(Updated 2026-09-22 — shipped since the doc was last synced; was flagged GAP.)*

---

## Portfolio Management (13)

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
- **Maps to:** `fund-vs-deal-irr-gap` situational + `feeDragOnIrr` quiz template. *(Updated 2026-09-22 — shipped since the doc was last synced; was flagged GAP.)*

### Q: Compute portfolio-weighted NOI per unit across 4 assets of different sizes.
- **Role:** portfolioMgmt · **Difficulty:** beginner
- **Why:** weighted-average rollup; common pitfall is averaging the per-unit ratios.
- **Maps to:** `perUnitNormalization` Excel template.

### Q: How do you allocate capital across 5 deals when only 3 will close? What weighting matters?
- **Role:** portfolioMgmt · **Difficulty:** advanced
- **Why:** capital-allocation reasoning; common at closed-end fund GPs.
- **Maps to:** `capital-allocation-priority` situational. *(Updated 2026-09-22 — shipped since the doc was last synced; was flagged GAP.)*

### Q: When does a sponsor pay carry, and what's a typical 2-tier waterfall?
- **Role:** portfolioMgmt · **Difficulty:** intermediate
- **Why:** waterfall basics; explicitly out of scope per ROADMAP — flag for future.
- **Maps to:** `walk-waterfall-1` (3-tier American waterfall walkthrough: pref → ROC → catch-up → above-split). *(Updated 2026-09-22 — shipped since the doc was last synced, and goes beyond the 1-tier ask that was flagged GAP; multi-tier waterfalls were the piece ROADMAP calls out-of-scope, and that line item ships too.)*

### Q: How do you measure risk-adjusted returns across a fund's holdings? What's a defensible Sharpe-equivalent for CRE?
- **Role:** portfolioMgmt · **Difficulty:** advanced
- **Why:** risk-quantification; underbuilt in our content.
- **Maps to:** `risk-adjusted-return-framework` situational. *(Updated 2026-09-22 — shipped since the doc was last synced; was flagged GAP.)*

### Q: Your fund's investment guidelines cap any single asset at 15% of NAV. A core holding has appreciated to 22% of NAV. What are your options?
- **Role:** portfolioMgmt · **Difficulty:** advanced
- **Why:** concentration-limit discipline; tests whether a candidate defaults to "just sell it" vs weighing hold-quality against guideline compliance.
- **Maps to:** **GAP — propose `concentration-limit-breach` situational** (options: sell down to comply, seek LPAC waiver, offset with new equity raised against the denominator, or let it ride to next report date if the breach is temporary/valuation-driven).

### Q: You're raising Fund III while Fund II is only 60% deployed. An LP asks how you're thinking about vintage-year diversification for them. How do you answer?
- **Role:** portfolioMgmt · **Difficulty:** intermediate
- **Why:** LP-facing fundraising question; tests whether the candidate understands vintage-year risk from the allocator's side, not just the GP's.
- **Maps to:** **GAP — propose `vintage-year-diversification` situational** (an LP that concentrates commitments in one or two vintages inherits that cohort's entry-pricing and macro-cycle risk; staggering across vintages smooths it, which is the LP's argument for the GP to keep raising on a steady cadence).

### Q: A deal fits both Fund II (winding down, in harvest mode) and Fund III (ramping up, needs to deploy). How do you decide which fund gets it, and what governance keeps that decision from being a conflict of interest?
- **Role:** portfolioMgmt · **Difficulty:** advanced
- **Why:** cross-fund allocation conflicts are a real diligence question LPs ask GPs raising overlapping vehicles.
- **Maps to:** **GAP — propose `cross-fund-allocation-conflict` situational** (typical answer: a pre-agreed written allocation policy — e.g. strategy fit and remaining dry powder, not GP convenience — reviewed by the LPAC, applied consistently and documented before the deal is sourced, not after).

### Q: Contrast how a closed-end fund vs. an evergreen/open-end vehicle would treat proceeds from an early, unexpectedly successful exit.
- **Role:** portfolioMgmt · **Difficulty:** intermediate
- **Why:** structure-driven reasoning; closed-end vs evergreen mechanics are a common "do you understand fund structures, not just deals" filter.
- **Maps to:** `fund-vs-deal-irr-gap` situational (recycling vs distributing proceeds is the same J-curve/redeployment tension that drives the fund-vs-deal IRR gap) + **GAP — propose `evergreen-vs-closed-end-recycling` situational** for the structure-specific mechanics (closed-end: proceeds typically distribute, since there's no reinvestment period left, and the GP starts marketing the next fund off realized DPI; evergreen: proceeds can recycle into new deals without a capital call, which flatters IRR by keeping capital working but also delays realized DPI to LPs).

### Q: How do you pick a benchmark to judge a value-add fund's performance — NCREIF ODCE, a public REIT index, or a custom peer set? What's the problem with each?
- **Role:** portfolioMgmt · **Difficulty:** advanced
- **Why:** benchmark selection is a sophistication filter; a lot of candidates default to "we beat our target IRR" and never engage with the comparability problem.
- **Maps to:** **GAP — propose `benchmark-selection-framework` situational** (ODCE is mostly core, so it understates the risk a value-add fund is taking; public REITs carry daily mark-to-market and leverage/liquidity premia that private funds don't; a custom peer set fixes comparability but is easy to cherry-pick — the honest answer names the mismatch in whichever benchmark you're handed).

### Q: Deal returned 1.4x EM in 5 years. Translate to IRR — and explain why EM and IRR can diverge.
- **Role:** portfolioMgmt · **Difficulty:** beginner
- **Why:** EM↔IRR translation; common filter.
- **Maps to:** `equityMultiple` quiz template + `irrSimple` quiz template + `EquityMultipleViz`.

---

## Development (12)

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
- **Maps to:** `constructionLoanSizing` quiz template + `dev-ltc-vs-ltv` situational. *(Updated 2026-09-22 — shipped since the doc was last synced; was flagged GAP.)*

### Q: How do you size a lease-up reserve on a development that stabilizes year 2-3?
- **Role:** development · **Difficulty:** intermediate
- **Why:** lease-up risk pricing; common in development-side underwriting.
- **Maps to:** `leaseUpReserve` quiz template. *(Updated 2026-09-22 — shipped since the doc was last synced; was flagged GAP.)*

### Q: Ground lease vs fee-simple on a development site — what changes in your underwriting?
- **Role:** development · **Difficulty:** advanced
- **Why:** ground-lease economics; common at urban infill developers.
- **Maps to:** `groundLeaseVsFee` situational. *(Updated 2026-09-22 — shipped since the doc was last synced; was flagged GAP.)*

### Q: Replacement cost basis comes in at $45M all-in; the appraised as-complete value is $52M. What does the $7M gap tell you, and would you trust it?
- **Role:** development · **Difficulty:** beginner
- **Why:** replacement-cost sanity check; tests whether a candidate treats the gap as "free money" or interrogates the appraisal.
- **Maps to:** `replacementCost` quiz template + `walk-dev-feasibility-1`.

### Q: You're underwriting raw land with no as-of-right entitlements and an 18-month approvals timeline, versus a shovel-ready site next door. How does entitlement risk change your required return?
- **Role:** development · **Difficulty:** advanced
- **Why:** entitlement risk is a real spread in land pricing that candidates often gloss over as "just development risk."
- **Maps to:** **GAP — propose `entitlement-risk-premium` situational** (entitled/shovel-ready land should trade at a materially lower discount rate than raw land with approval risk — the premium compensates for capital at risk with no assurance the project is buildable, on top of ordinary construction/lease-up risk).

### Q: GC proposes a 3% contingency on a $40M hard-cost budget for a site with unproven soil conditions. Is 3% enough?
- **Role:** development · **Difficulty:** intermediate
- **Why:** contingency-sizing judgment; tests whether a candidate anchors on a rule-of-thumb % or actually reasons about site-specific risk.
- **Maps to:** `contingencyDrawDown` quiz template + `construction-cost-overrun` situational (unproven soil conditions push toward the higher end of a typical 3-7% contingency range, closer to 5-7%, since geotechnical surprises are one of the most common sources of overrun).

### Q: A $30M GC contract holds back 10% retainage on every draw. Walk through the cash-flow impact for the GC, and how it should shape your draw schedule as the lender.
- **Role:** development · **Difficulty:** intermediate
- **Why:** retainage mechanics; tests whether a candidate sees retainage as a lender-protection tool with a real cost to the GC's working capital, not just a line item.
- **Maps to:** `retainageRunning` quiz template + `walk-construction-draw-1`.

### Q: You've delivered a stabilized 250-unit development at a 5.75% yield on cost while comps are trading at 5.25%. Do you sell now to crystallize the spread, or hold and refinance?
- **Role:** development · **Difficulty:** advanced
- **Why:** build-to-core vs build-to-sell decision; tests whether a candidate can translate a dev-spread win into a hold-vs-sell framework instead of treating them as separate questions.
- **Maps to:** `devSpread` quiz template + `holdVsSellIrr` quiz template + `walk-am-holdsell-1`.

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
- **Maps to:** `walk-distressed-1` walkthrough. *(Updated 2026-09-22 — shipped since the doc was last synced; was flagged GAP.)*

---

## Summary statistics

*(Last synced 2026-09-22 against `src/quiz/situational/`, `src/quiz/templates/`,
and `src/quiz/walkthroughs.ts`. All 8 items previously flagged `GAP` in the
2024-era pass had already shipped — the doc had drifted out of sync with the
codebase — so those lines were updated to `Maps to:` the real id instead of
re-verified as new gaps. Development and Portfolio Management were also the
two thinnest sections by raw count (7 and 8, vs. 10-12 elsewhere), so 5 new
candidate questions were added to each — most rephrasing/extending concepts
already shipped, a handful newly flagged as `GAP` for future content work.)*

- **Total questions in this doc:** 62
- **Mapped to existing content:** 52 (84%)
- **Flagged as GAPs:** 6 (10%)
- **Out of scope (time-sensitive / behavioral):** 4 (6%)

By section: Acquisitions 12/12 mapped · Asset Management 10/10 mapped ·
Mortgage Underwriting 10/10 mapped · Portfolio Management 8/13 mapped (5 new
GAPs) · Development 11/12 mapped (1 new GAP) · Cross-cutting 1/5 mapped (4
out of scope by design).

Top GAPs to address (ranked by interview frequency):

1. `concentration-limit-breach` situational (portfolio mgmt) — single-asset
   NAV-concentration breaches are a recurring LP-diligence question.
2. `vintage-year-diversification` situational (portfolio mgmt) — LP-facing
   fundraising question, common whenever a GP is raising back-to-back funds.
3. `cross-fund-allocation-conflict` situational (portfolio mgmt) — deal
   allocation across overlapping vehicles; a standard GP-governance probe.
4. `entitlement-risk-premium` situational (development) — pricing raw/
   unentitled land vs. shovel-ready sites; common at land-banking and
   ground-up development shops.
5. `benchmark-selection-framework` situational (portfolio mgmt) — performance
   benchmarking (ODCE vs. REIT index vs. custom peer set) comes up whenever a
   candidate is asked to defend fund-level returns.

These five gaps, plus the still-open `evergreen-vs-closed-end-recycling`
situational (portfolio mgmt), would lift mapped-to-content coverage from
84% → ~94% with roughly the same ~½-day-per-item content cost as the last
batch, and — like last time — they all surface from real interview-question
patterns rather than top-down design guesses.
