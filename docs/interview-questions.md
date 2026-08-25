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
- **Maps to:** `capex-reserve-discipline` situational + `capexReserveSizing` quiz template *(shipped — was flagged GAP, now closed)*.

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
- **Maps to:** `refiStressTest` quiz template + `refi-cap-stress` situational *(shipped — was flagged GAP, now closed)*.

---

## Portfolio Management (12)

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
- **Maps to:** `fund-vs-deal-irr-gap` situational + `feeDragOnIrr` quiz template *(shipped — was flagged GAP, now closed)*.

### Q: Compute portfolio-weighted NOI per unit across 4 assets of different sizes.
- **Role:** portfolioMgmt · **Difficulty:** beginner
- **Why:** weighted-average rollup; common pitfall is averaging the per-unit ratios.
- **Maps to:** `perUnitNormalization` Excel template.

### Q: How do you allocate capital across 5 deals when only 3 will close? What weighting matters?
- **Role:** portfolioMgmt · **Difficulty:** advanced
- **Why:** capital-allocation reasoning; common at closed-end fund GPs.
- **Maps to:** `capital-allocation-priority` situational *(shipped — was flagged GAP, now closed)*.

### Q: When does a sponsor pay carry, and what's a typical 2-tier waterfall?
- **Role:** portfolioMgmt · **Difficulty:** intermediate
- **Why:** waterfall basics; explicitly out of scope per ROADMAP — flag for future.
- **Maps to:** **GAP — propose `1-tier-promote-walk` walkthrough (deferred per ROADMAP)**. Note: a 3-tier American waterfall walkthrough (`walk-waterfall-1`) has since shipped despite the ROADMAP's multi-tier-out-of-scope note — worth reconciling, but it doesn't cover the simple 1-tier case this question is asking for.

### Q: How do you measure risk-adjusted returns across a fund's holdings? What's a defensible Sharpe-equivalent for CRE?
- **Role:** portfolioMgmt · **Difficulty:** advanced
- **Why:** risk-quantification; underbuilt in our content.
- **Maps to:** `risk-adjusted-return-framework` situational *(shipped — was flagged GAP, now closed)*.

### Q: Deal returned 1.4x EM in 5 years. Translate to IRR — and explain why EM and IRR can diverge.
- **Role:** portfolioMgmt · **Difficulty:** beginner
- **Why:** EM↔IRR translation; common filter.
- **Maps to:** `equityMultiple` quiz template + `irrSimple` quiz template + `EquityMultipleViz`.

### Q: A 1-tier waterfall pays an 8% pref, then return of capital, then an 80/20 residual split. Walk me through how $35M of sale proceeds actually gets split between LP and GP.
- **Role:** portfolioMgmt · **Difficulty:** intermediate
- **Why:** the mechanical waterfall-sequencing question — tests whether the candidate distributes in the right order (pref accrual first, capital return second, residual split last) rather than just applying 80/20 to the whole pot.
- **Maps to:** `distribution-waterfall-1tier` situational.

### Q: European vs American waterfall — which structure is better for the LP, and why does it actually matter?
- **Role:** portfolioMgmt · **Difficulty:** intermediate
- **Why:** deal-level vs fund-level promote timing; a frequent GP/LP-alignment question at fund-of-funds and institutional LP shops.
- **Maps to:** `waterfall-european-vs-american` situational.

### Q: Full catch-up vs 50/50 catch-up in the promote structure — which pays the GP more during the catch-up tier itself, and by roughly how much?
- **Role:** portfolioMgmt · **Difficulty:** intermediate
- **Why:** catch-up mechanics are one of the most-misunderstood waterfall levers; candidates often can't quantify the dollar difference.
- **Maps to:** `waterfall-catchup-mechanics` situational.

### Q: Under a typical LPA clawback provision, when does the GP actually have to return promote dollars already received?
- **Role:** portfolioMgmt · **Difficulty:** advanced
- **Why:** clawback triggers (early-deal outperformance followed by later underperformance) are a real diligence question LPs ask GPs directly.
- **Maps to:** `waterfall-clawback-mechanics` situational.

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
- **Maps to:** `constructionLoanSizing` quiz template + `dev-ltc-vs-ltv` situational *(shipped — was flagged GAP, now closed)*.

### Q: How do you size a lease-up reserve on a development that stabilizes year 2-3?
- **Role:** development · **Difficulty:** intermediate
- **Why:** lease-up risk pricing; common in development-side underwriting.
- **Maps to:** `leaseUpReserve` quiz template *(shipped — was flagged GAP, now closed)*.

### Q: Ground lease vs fee-simple on a development site — what changes in your underwriting?
- **Role:** development · **Difficulty:** advanced
- **Why:** ground-lease economics; common at urban infill developers.
- **Maps to:** `ground-lease-vs-fee` situational *(shipped — was flagged GAP, now closed)*.

### Q: A change order comes in mid-construction. Walk me through who actually pays for the cost variance and how that gets priced.
- **Role:** development · **Difficulty:** advanced
- **Why:** change-order pricing mechanics (unit-price vs T&M vs lump-sum, markup caps) are a real document-reading test on the GMP contract, not just a math problem.
- **Maps to:** `construction-change-order-pricing` situational.

### Q: The project is 90 days past Substantial Completion. Under a typical liquidated-damages clause, what does the owner actually recover?
- **Role:** development · **Difficulty:** advanced
- **Why:** tests whether the candidate reads the LD clause systematically — excused vs unexcused days, the per-day rate, the cap, and whether consequential damages are waived — rather than assuming the owner is made whole.
- **Maps to:** `construction-liquidated-damages` situational.

### Q: How much retainage gets released to the contractor at Substantial Completion, and what triggers release of the rest?
- **Role:** development · **Difficulty:** advanced
- **Why:** retainage-release mechanics (punch list, lien waivers, final retainage) are a common gap for candidates who've only underwritten stabilized deals.
- **Maps to:** `construction-retainage-release-trigger` situational.

### Q: Lender proposes equity-first construction funding; sponsor wants pari-passu draws. Which structure does each side actually prefer, and what's the dollar impact on the sponsor over the build period?
- **Role:** development · **Difficulty:** intermediate
- **Why:** draw-sequencing negotiation is a real term-sheet lever candidates rarely think through past "the lender wants equity first."
- **Maps to:** `construction-equity-first-vs-paripassu` situational.

### Q: A $2M cost overrun hits mid-construction and the loan is already at its LTC ceiling. Where does the money actually come from?
- **Role:** development · **Difficulty:** intermediate
- **Why:** overrun-funding waterfall (contingency → sponsor cash equity → additional capital call → renegotiated loan) is the practical follow-up to every feasibility walkthrough.
- **Maps to:** `construction-cost-overrun` situational.

### Q: Walk me through what a construction lender actually requires in a monthly draw package before releasing funds.
- **Role:** development · **Difficulty:** intermediate
- **Why:** draw-package mechanics (AIA G702/G703, lien waivers, inspector sign-off, retainage held-back) are the operational side of development that pure feasibility math skips.
- **Maps to:** `lender-draw-mechanics` situational.

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
- **Maps to:** `walk-distressed-1` walkthrough *(shipped — was flagged GAP, now closed)*.

---

## Summary statistics

- **Total questions in this doc:** 62 *(+10 this pass — see "Coverage audit" below)*
- **Mapped to existing content:** 61 (98%)
- **Flagged as GAPs:** 1 (2%) — `1-tier-promote-walk` walkthrough (portfolio mgmt)
- **Out of scope (time-sensitive / behavioral):** 4 (6%)

Every GAP flagged in the original 52-question pass has since shipped as real
content (confirmed against the source files, not just the ROADMAP claim) —
this pass corrected the stale `**GAP — propose ...**` labels to point at the
now-existing `id`s. One GAP remains open: a genuine 1-tier promote walkthrough
(the shipped `walk-waterfall-1` is a 3-tier American structure, which doesn't
answer the simple-carry question a first-round interview asks).

### Coverage audit — 2026-08-25

Per-category question counts before this pass, ranked lowest first — the two
categories below the 10-question median (`Development`, `Portfolio
Management`) got 10 new questions between them, mapped to situational
content that already ships but wasn't yet catalogued here:

| Category | Before | Added | After |
|---|---|---|---|
| Cross-cutting / market awareness | 5 | 0 *(capped — see note)* | 5 |
| Development | 7 | +6 | 13 |
| Portfolio Management | 8 | +4 | 12 |
| Asset Management | 10 | 0 | 10 |
| Mortgage Underwriting | 10 | 0 | 10 |
| Acquisitions | 12 | 0 | 12 |

Cross-cutting stays at 5 by design — 4 of its 5 entries are explicitly
out-of-scope (too time-sensitive / behavioral for a content app to maintain),
so it isn't a real growth lane the way the other five categories are.

New Development entries (all map to shipped, previously-uncatalogued
situational cases): `construction-change-order-pricing`,
`construction-liquidated-damages`, `construction-retainage-release-trigger`,
`construction-equity-first-vs-paripassu`, `construction-cost-overrun`,
`lender-draw-mechanics`.

New Portfolio Management entries (shipped waterfall/promote-mechanics
situational cases): `distribution-waterfall-1tier`,
`waterfall-european-vs-american`, `waterfall-catchup-mechanics`,
`waterfall-clawback-mechanics`.

Mortgage UW and Asset Management are next in line if another depth pass is
wanted — both sit at 10, and Mortgage UW in particular still has unmapped
document-literacy content (`dscr-cash-trap-trigger`) that could seed a
similar batch. Portfolio Mgmt also still has unmapped LPA-mechanics content
(`lpa-capital-call-default`, `lpa-contribution-ratios`,
`lpa-cost-overrun-sharing`, `lpa-initial-vs-additional-capital`,
`cost-segregation-basics`, `waterfall-irr-vs-moic-hurdle`,
`waterfall-key-person-event`, `waterfall-pref-compound-vs-simple`) for a
follow-up batch beyond this pass's 4.
