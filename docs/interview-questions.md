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

### Q: GAP — A bulk-industrial submarket has absorbed 1.8M SF trailing four quarters against 2.4M SF of new deliveries, and the going-in cap on a stabilized asset there is 40 bps tighter than a submarket with flat absorption. How much of that spread is buyers pricing absorption momentum vs. asset quality?
- **Role:** acquisitions · **Difficulty:** advanced
- **Why:** industrial is the most cap-rate-competitive asset class right now and absorption-driven cap compression is a live underwriting question; industrial is also the most underrepresented asset class in our current situational catalog (3 of 71 cases).
- **Maps to:** **GAP — propose `industrial-absorption-cap-rate-divergence` situational (asset class: industrial)**.

---

## Asset Management (13)

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
- **Maps to:** `capex-reserve-discipline` situational + `capexReserveSizing` quiz template. *(was flagged GAP — shipped in the Question-base depth pass, Phase 1.)*

### Q: GAP — A grocery-anchored center's 45,000 SF junior-anchor box has sat dark for 18 months; comparable boxes in the trade area take 24-30 months to backfill at rents 15% below the prior tenant's. How do you model that absorption timeline in your NOI, and what's your downside case if it runs the full 30 months?
- **Role:** assetManagement · **Difficulty:** intermediate
- **Why:** big-box backfill absorption is a retail-specific diagnostic our catalog doesn't cover yet; retail is one of the three thinnest asset classes in the situational catalog (2 of 71 cases).
- **Maps to:** **GAP — propose `retail-anchor-backfill-absorption` situational (asset class: retail)**.

### Q: GAP — An anchor tenant at a strip center files bankruptcy and rejects its lease. Three in-line tenants have co-tenancy clauses tied to that anchor being open. How do you sequence backfill vs. co-tenancy exposure, and what absorption pace do you underwrite for the in-line spaces if the box sits vacant for a year?
- **Role:** assetManagement · **Difficulty:** advanced
- **Why:** co-tenancy domino risk is a retail-specific diagnostic that combines lease-clause literacy with absorption timing — a gap in both the retail and lease-econ/document-literacy coverage.
- **Maps to:** **GAP — propose `retail-cotenancy-domino-risk` situational (asset class: retail)**.

### Q: GAP — Three new hotels (450 keys combined) are set to open in your comp set over the next 18 months — a 22% supply increase — while your asset runs 68% occupancy today. Historical patterns show new supply takes 12-18 months to stabilize and depresses comp-set RevPAR 8-12% during ramp. How do you underwrite your hold-period RevPAR growth assumption against that absorption wave?
- **Role:** assetManagement · **Difficulty:** advanced
- **Why:** competitive new-supply absorption is the hotel-specific analogue of a lease-up case and hotel is the thinnest asset class in the situational catalog by far (1 of 71 cases).
- **Maps to:** **GAP — propose `hotel-new-supply-absorption-wave` situational (asset class: hotel)**.

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
- **Maps to:** `refiStressTest` quiz template + `refi-cap-stress` situational. *(was flagged GAP — shipped.)*

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
- **Maps to:** `fund-vs-deal-irr-gap` situational + `feeDragOnIrr` quiz template. *(was flagged GAP — shipped.)*

### Q: Compute portfolio-weighted NOI per unit across 4 assets of different sizes.
- **Role:** portfolioMgmt · **Difficulty:** beginner
- **Why:** weighted-average rollup; common pitfall is averaging the per-unit ratios.
- **Maps to:** `perUnitNormalization` Excel template.

### Q: How do you allocate capital across 5 deals when only 3 will close? What weighting matters?
- **Role:** portfolioMgmt · **Difficulty:** advanced
- **Why:** capital-allocation reasoning; common at closed-end fund GPs.
- **Maps to:** `capital-allocation-priority` situational. *(was flagged GAP — shipped.)*

### Q: When does a sponsor pay carry, and what's a typical 2-tier waterfall?
- **Role:** portfolioMgmt · **Difficulty:** intermediate
- **Why:** waterfall basics.
- **Maps to:** `distribution-waterfall-1tier` situational (1-tier mechanics). Multi-tier promote walkthroughs remain **OUT OF SCOPE** per ROADMAP ("Multi-tier waterfalls... out of pedagogical scope").

### Q: How do you measure risk-adjusted returns across a fund's holdings? What's a defensible Sharpe-equivalent for CRE?
- **Role:** portfolioMgmt · **Difficulty:** advanced
- **Why:** risk-quantification; underbuilt in our content.
- **Maps to:** `risk-adjusted-return-framework` situational. *(was flagged GAP — shipped.)*

### Q: Deal returned 1.4x EM in 5 years. Translate to IRR — and explain why EM and IRR can diverge.
- **Role:** portfolioMgmt · **Difficulty:** beginner
- **Why:** EM↔IRR translation; common filter.
- **Maps to:** `equityMultiple` quiz template + `irrSimple` quiz template + `EquityMultipleViz`.

### Q: GAP — You're underwriting rent growth for three multifamily assets in the same submarket. One appraiser's absorption comp set spans the whole metro (800 units/quarter); another restricts to a 3-mile radius, where the pipeline dwarfs local absorption (120 units/quarter against 900 units coming). Which comp set do you trust across the portfolio, and why?
- **Role:** portfolioMgmt · **Difficulty:** advanced
- **Why:** reconciling metro-wide vs. micro-radius absorption comps is a real portfolio-level underwriting disagreement, and `absorption` is the single thinnest category in the situational catalog (1 of 71 cases).
- **Maps to:** **GAP — propose `portfolio-absorption-comp-radius` situational (asset class: multifamily)**.

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
- **Maps to:** `constructionLoanSizing` quiz template + `dev-ltc-vs-ltv` situational. *(was flagged GAP — shipped.)*

### Q: How do you size a lease-up reserve on a development that stabilizes year 2-3?
- **Role:** development · **Difficulty:** intermediate
- **Why:** lease-up risk pricing; common in development-side underwriting.
- **Maps to:** `leaseUpReserve` quiz template. *(was flagged GAP — shipped.)*

### Q: Ground lease vs fee-simple on a development site — what changes in your underwriting?
- **Role:** development · **Difficulty:** advanced
- **Why:** ground-lease economics; common at urban infill developers.
- **Maps to:** `groundLeaseVsFee` situational. *(was flagged GAP — shipped.)*

### Q: GAP — You're deciding whether to build 500,000 SF of industrial spec or wait for a build-to-suit tenant. Trailing absorption in the submarket is decelerating but still net positive. At what absorption pace does spec development stop penciling against your return hurdle?
- **Role:** development · **Difficulty:** advanced
- **Why:** spec-vs-BTS is the core development go/no-go decision for industrial, and industrial is one of the thinnest asset classes in the situational catalog (3 of 71 cases) — absorption is the variable that actually drives the decision.
- **Maps to:** **GAP — propose `industrial-spec-vs-bts-absorption` situational (asset class: industrial)**.

### Q: GAP — Your industrial portfolio spans small-bay infill and bulk distribution in the same metro. The metro-wide absorption comp set nets a healthy pace, but small-bay absorption alone is running well below it. Which comp set drives your leasing assumption on a small-bay acquisition, and why?
- **Role:** development · **Difficulty:** intermediate
- **Why:** small-bay and bulk industrial absorb on different cycles; mixing the comp sets is a common analyst mistake and industrial comp-selection cases don't exist yet in the catalog.
- **Maps to:** **GAP — propose `industrial-small-bay-vs-bulk-absorption` situational (asset class: industrial)**.

### Q: GAP — A power-center redevelopment is delivering 180,000 SF of new retail into a submarket at 90% occupied. Anchor pre-leasing covers a third of the space at delivery; in-line absorption has run 15,000 SF/quarter. How long until the submarket is back to 92% occupied, and how does anchor pre-leasing change the math vs. treating the whole delivery as unleased?
- **Role:** development · **Difficulty:** intermediate
- **Why:** retail lease-up math (anchor pre-leasing vs. in-line absorption pace) is untested; retail is one of the three thinnest asset classes in the catalog (2 of 71 cases).
- **Maps to:** **GAP — propose `retail-power-center-preleasing-absorption` situational (asset class: retail)**.

### Q: GAP — A newly opened 150-key select-service hotel posts 35% occupancy in month one against a comp-set stabilized occupancy of 72%. Historical ramp curves for this segment run +4-6 points/month through month 12, then flatten. How many months until the hotel is within 5 points of stabilized, and what would make you distrust a vendor's faster projected curve?
- **Role:** development · **Difficulty:** intermediate
- **Why:** hotel ramp-to-stabilization is the hotel-specific analogue of lease-up absorption and hotel is the single thinnest asset class in the situational catalog (1 of 71 cases).
- **Maps to:** **GAP — propose `hotel-ramp-to-stabilization` situational (asset class: hotel)**.

### Q: GAP — A 600-unit multifamily development is entitled as a single phase, but trailing submarket absorption is only 180 units/quarter against 1,400 units of announced competitive pipeline. Should you phase the project, and what absorption pace would justify building all 600 units at once?
- **Role:** development · **Difficulty:** advanced
- **Why:** phasing-vs-absorption is a core development go/no-go lever and development is the most underrepresented role in the situational catalog (9 of 71 cases carry a `development` role tag vs. 40 for acquisitions).
- **Maps to:** **GAP — propose `multifamily-phasing-absorption-pace` situational (asset class: multifamily)**.

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
- **Maps to:** `walk-distressed-1` walkthrough. *(was flagged GAP — shipped.)*

---

## Coverage gap audit — 2026-09-12

Cross-referenced this doc against the shipped `src/quiz/situational/` catalog
(71 cases) to find which areas have the fewest **approved / shipped**
questions relative to the rest of the catalog, rather than guessing top-down.
Three skews stood out:

| Dimension | Thinnest | Count | vs. largest |
|---|---|---|---|
| Category | `absorption` | 1 of 71 | `deal-process` at 21 |
| Asset class | `hotel` | 1 of 71 | `multifamily` at 11 |
| Asset class | `retail` | 2 of 71 | `multifamily` at 11 |
| Asset class | `industrial` | 3 of 71 | `multifamily` at 11 |
| Role | `development` | 9 of 71 | `acquisitions` at 40 |

(Also found in the process: the five "Top GAPs" previously listed below had
already shipped — see the `*(was flagged GAP — shipped.)*` notes inline
above. Corrected rather than left stale.)

The 10 phrasings below all sit in the `absorption` category and were
distributed to double up on the other thin dimensions — 8 of 10 target
hotel/retail/industrial, 6 of 10 tag a `development` role — so one content
pass closes multiple gaps at once. They're new `### Q: GAP` entries added
above under Acquisitions, Asset Management, Development, and Portfolio
Management. Full list:

1. `industrial-absorption-cap-rate-divergence` situational (acquisitions · industrial)
2. `retail-anchor-backfill-absorption` situational (asset mgmt · retail)
3. `retail-cotenancy-domino-risk` situational (asset mgmt · retail)
4. `hotel-new-supply-absorption-wave` situational (asset mgmt · hotel)
5. `industrial-spec-vs-bts-absorption` situational (development · industrial)
6. `industrial-small-bay-vs-bulk-absorption` situational (development · industrial)
7. `retail-power-center-preleasing-absorption` situational (development · retail)
8. `hotel-ramp-to-stabilization` situational (development · hotel)
9. `multifamily-phasing-absorption-pace` situational (development · multifamily)
10. `portfolio-absorption-comp-radius` situational (portfolio mgmt · multifamily)

These are phrasings/prompts for the vet queue, not yet implemented as full
`SituationalCase` files (scenario data, 3-4 graded options, takeaway, tips)
— that's the next step before they can ship.

## Summary statistics

- **Total questions in this doc:** 62
- **Mapped to existing content:** 48 (77%)
- **Flagged as GAPs (open):** 10 (16%)
- **Out of scope (time-sensitive / behavioral):** 4 (6%)

All 10 open GAPs are the absorption/hotel/retail/industrial/development
phrasings from the coverage gap audit above — the prior "Top GAPs to
address" list is now fully shipped (see inline `(was flagged GAP —
shipped.)` notes) and has been retired from this section.
