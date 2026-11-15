# Question-bank phrasings — empty role × category cells (2026-11-15)

Scheduled pass: find the areas of the question bank with the fewest approved questions, then draft 10 new phrasings for them. Each phrasing is a hook title, the ask the learner reads, a `role · asset class · difficulty` tag line, the trap the question is built around, and the shape it should ship in. None are written up; they are pitches to approve, cut, or re-angle before anyone writes options and explanations.

## How "approved" was measured

The approval ledger (`question_submissions` with `status in ('approved','integrated')`) lives in the `learncre` Supabase project, which is still **paused (INACTIVE)**. Approval counts could not be read this run, same as every run since 2026-10-30. Coverage was measured from the shipped bank on `main` instead: 71 situational cases in `src/quiz/situational/`, 68 quiz templates in `src/quiz/templates/`, 86 walkthroughs, 9 long-form cases. Restore the project and re-run to layer community-approval counts on top.

## What is different about this run

Ten earlier runs (2026-10-30 through 2026-11-14) already drafted roughly 110 phrasings for the four thin **categories** (absorption, comp-selection, lease-econ, sensitivity). All of them sit on unmerged `claude/upbeat-meitner-*` branches:

| Date | File on its branch |
|---|---|
| 2026-11-14 | `docs/QUESTION_BANK_PHRASINGS.2026-11-14.md` (60 phrasings) |
| 2026-11-13 | `docs/QUESTION_BANK_DRAFTS.2026-11-13.md` (10 full drafts) |
| 2026-11-12 | `docs/QUESTION_PHRASINGS.2026-11-12.md` (40 phrasings) |
| 2026-11-11 | `docs/QUESTION_BANK_GAPS.2026-11-11.md` (10 drafts) |
| 2026-11-09, -08, -05, -04, -01, 10-30 | `docs/QUESTION_CANDIDATES.*.md` and peers (10 each) |

Rather than add an eleventh set on the same four categories, this run slices the bank by **role × category** and targets cells that are literally empty. Every phrasing below fills a zero cell, and each was checked against the earlier 110 titles so it does not repeat one.

## Coverage snapshot (shipped situational cases, `main` @ c5d74bb)

Category × role (a case tagged to two roles counts in both):

| Category | acquisitions | assetManagement | mortgageUw | portfolioMgmt | development |
|---|---|---|---|---|---|
| deal-process | 11 | 10 | 6 | 12 | 5 |
| document-literacy | 9 | 6 | 4 | 5 | 1 |
| investment-thesis | 4 | 4 | **0** | 7 | 1 |
| pricing | 7 | 2 | 1 | **0** | **0** |
| risk | 1 | 2 | 6 | **0** | 1 |
| diagnostic | 1 | 5 | 2 | 1 | **0** |
| lease-econ | 2 | 2 | **0** | **0** | **0** |
| sensitivity | 2 | **0** | **0** | **0** | **0** |
| comp-selection | 2 | **0** | **0** | **0** | **0** |
| absorption | 1 | **0** | **0** | **0** | 1 |

Difficulty × role:

| Difficulty | acquisitions | assetManagement | mortgageUw | portfolioMgmt | development |
|---|---|---|---|---|---|
| beginner | 3 | 3 | **0** | 2 | **0** |
| intermediate | 19 | 21 | 6 | 7 | 4 |
| advanced | 18 | 7 | 13 | 16 | 5 |

Other thin dimensions, unchanged from prior runs: asset class hotel 1, retail 2, industrial 3 (vs. multifamily 11, office 9, untagged 37); quiz templates are 41 valuation / 27 returns with development tagged on only 10 of 68.

Cells this run fills: mortgageUw × {absorption, comp-selection, sensitivity}, portfolioMgmt × {sensitivity, lease-econ, pricing}, development × {lease-econ, comp-selection}, assetManagement × {absorption, comp-selection}. Three phrasings are pitched at beginner for the two roles with zero beginner cases.

---

## The 10 phrasings

### 1. The borrower's model says 93% leased in month 10 — when does the loan actually convert?
**Ask.** A 240-unit lease-up signs 20 leases a month. The construction loan converts to the mini-perm when the asset holds 90% *physical* occupancy for 90 consecutive days *and* trailing-3-month annualized NOI covers debt service at 1.25x. Walk from the month-10 "93% leased" claim to the month the conversion test is actually met, and name each lag.
`mortgageUw · multifamily · beginner` · Cell: mortgageUw × absorption, mortgageUw × beginner
**Trap.** Leased is not occupied, occupied is not seasoned, and seasoned is not tested on trailing NOI. Each step adds one to three months; the honest answer lands near month 15–16, not 10.
**Shape.** Situational, 4 options (month 10 / 12 / 15–16 / "depends on rent growth").

### 2. The appraisal came in $4M light — which of the appraiser's comps do you push back on?
**Ask.** You are sizing a 65% LTV loan on a value expected at $66M. The appraisal concludes $62M. Of the appraiser's four sale comps, one is a receiver sale from a six-week marketing window and one is 30 months old with no time adjustment. Which comp is a defensible challenge, roughly how far does removing it move the concluded value, and what does the loan ($43M) do to LTV either way?
`mortgageUw · office · intermediate` · Cell: mortgageUw × comp-selection
**Trap.** Appraisal review is about defensible adjustments, not shopping for the number. $43M on $62M is 69.4% LTV; the stale comp is the legitimate challenge, the distressed comp is a weighting argument, and neither lets the lender hit 65% by assertion.
**Shape.** Situational, 4 options; sidebar carries the four comps with date, $/SF, and condition of sale.

### 3. Cap rates widen 50 bps across the fund — where does NAV actually move?
**Ask.** A 12-asset open-end fund, $500M gross asset value at a 5.5% value-weighted cap, 55% loan-to-value. Cap rates move out 50 bps everywhere. Approximate the gross value change and the NAV change, then explain why the office sleeve (at a 7.0% cap) moves *less* in percentage terms than the multifamily sleeve at 4.75%.
`portfolioMgmt · mixed · intermediate` · Cell: portfolioMgmt × sensitivity
**Trap.** The same 50 bps is a bigger percentage of a small cap rate: 5.5 → 6.0 is −8.3% value, 7.0 → 7.5 is −6.7%, 4.75 → 5.25 is −9.5%. At 55% LTV the −8.3% on gross value is about −18.5% on NAV.
**Shape.** Situational with a numeric follow-up; could also seed a `portfolioCapShock` quiz template.

### 4. Fund WALT is 4.2 years — rent-weighted or square-foot-weighted, and does it matter?
**Ask.** The quarterly letter reports a 4.2-year weighted average lease term. Two office tenants with nine years remaining carry 30% of fund rent on 18% of the SF; the retail inline roll averages 1.8 years on 25% of rent. Recompute WALT both ways, then say what percentage of rent rolls inside 24 months, and why that number, not WALT, is what the redemption queue should be reading.
`portfolioMgmt · mixed · advanced` · Cell: portfolioMgmt × lease-econ
**Trap.** WALT averages away a rollover cliff. Two long leases on a small footprint can hide that a quarter of the rent expires before the next valuation cycle.
**Shape.** Situational, 4 options; sidebar is a five-row rent roll summary.

### 5. Solve the build-to-suit rent from the cost — then pick the term the tenant offered
**Ask.** All-in cost is $180/SF and the developer needs a 7.0% untrended yield on cost on a NNN lease. What starting rent does that require? The tenant then offers either a 10-year term with 3% annual bumps or a 15-year term with 2% bumps. Which gets the developer a lower starting rent at the same return, and what in the exit assumption makes that true?
`development · industrial · intermediate` · Cell: development × lease-econ
**Trap.** Rent is yield × cost ($12.60/SF), full stop. The second half is about exit: a 15-year WALT typically trades at a tighter cap than a 10-year, so the developer can concede starting rent on the longer term and still clear the spread.
**Shape.** Situational with a numeric first step; `btsRentSolve` is also a clean quiz template (rent = YOC × cost).

### 6. Land comps are quoted per land SF — your deal is priced per buildable SF
**Ask.** Three land trades: $40/SF at FAR 1.0, $55/SF at FAR 2.0, $70/SF at FAR 3.5. Your parcel is entitled at FAR 2.5 and the seller is asking $65/SF of land. Normalize the comps to $/buildable SF, say which one actually bounds your deal, and judge the ask.
`development · multifamily · intermediate` · Cell: development × comp-selection
**Trap.** Raw land $/SF across different densities is not comparable. Normalized, the comps are $40, $27.50 and $20 per buildable SF; the ask is $26 per buildable SF, which sits inside the range even though $65/SF of land looks like the top of it.
**Shape.** Situational, 4 options; good beginner-to-intermediate bridge for the development role.

### 7. Cut asking rent 8% to fill the floor, or carry the vacancy — what does the absorption pace say?
**Ask.** A 200,000 SF office building is 88% leased at $30/SF NNN. At current asking, submarket pace implies ten months to fill the 24,000 SF; at an 8% cut, four months. Compare the carry saved against the rent given up on the new lease *and* on the 40,000 SF of renewals that will reprice off it inside two years.
`assetManagement · office · intermediate` · Cell: assetManagement × absorption
**Trap.** Six months of carry saved on 24,000 SF (about $360k) is real, but the 8% mark compounds across every lease that renews off the new face rent. The rent cut is a decision about the whole roll, not one floor.
**Shape.** Situational, 4 options with rough dollar figures in each.

### 8. The renewal tenant brought three "comps" — which one is a comp?
**Ask.** You proposed $29/SF net on a renewal. The tenant's broker counters with: a sublease at $22, an executed new lease in a Class A building at $34 with 12 months free on a 7-year term, and an asking rent on a vacant listing at $26. Which of the three is an executed, comparable data point, and what is the effective rent on the $34 deal?
`assetManagement · office · beginner` · Cell: assetManagement × comp-selection
**Trap.** Subleases and asking rents are not market comps. The one real comp, netted for free rent, is about $29.10/SF, which is your number.
**Shape.** Situational, 4 options; a natural beginner case because the math is one line.

### 9. 30-year, 25-year, or interest-only — how much do the amortization terms cost in proceeds?
**Ask.** NOI is $2.0M, the rate is 6.5%, and the lender tests 1.25x DSCR. Size the loan under 30-year amortization, 25-year amortization, and full interest-only. Then say which sizing the borrower will ask for and what the lender gives up by agreeing.
`mortgageUw · multifamily · beginner` · Cell: mortgageUw × sensitivity, mortgageUw × beginner
**Trap.** Shorter amortization raises the loan constant (about 7.6% at 30 years, 8.1% at 25 years, 6.5% IO) and shrinks proceeds: roughly $21.1M, $19.8M, $24.6M. IO sizes largest and leaves the most balance at maturity.
**Shape.** Quiz template (`dscrAmortSensitivity`) with three sub-answers, or a situational framed as "which structure, and why."

### 10. Selling the trophy to fund redemptions — what happens to the fund's cap rate?
**Ask.** A $500M fund carries a 5.8% blended cap rate. To meet redemptions it sells its $100M, 5.0%-cap trophy asset at carrying value. What is the remaining portfolio's blended cap rate, why does NAV per share not move on the day of sale, and what did the fund's risk profile just do?
`portfolioMgmt · mixed · intermediate` · Cell: portfolioMgmt × pricing
**Trap.** Cap rates aggregate by NOI over value, not by averaging. Remaining NOI is $24.0M on $400M, a 6.0% cap. Selling the lowest-cap asset at NAV is NAV-neutral and quality-negative at once.
**Shape.** Situational, 4 options; the arithmetic step is a good `blendedCapAfterSale` quiz template.

---

## Next steps

1. **Unpause the `learncre` Supabase project** so the next run can read `question_submissions` and rank by real approval counts instead of shipped-content proxies. Eleven consecutive runs have hit the same wall.
2. **Triage the backlog before adding to it.** About 120 phrasings now sit across eleven unmerged branches. Merge the ones worth building into a single `docs/QUESTION_BACKLOG.md` on `main` and delete the rest, or the next scheduled run will keep producing drafts no one reads.
3. **Build order for this set.** 8, 9, 1 first (beginner, one-line math, fill two zero cells each); then 3, 10 (portfolioMgmt, reusable as quiz templates); then 2, 5, 6; 4 and 7 last.
