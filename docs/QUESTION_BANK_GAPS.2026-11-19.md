<!-- generated 2026-11-19 by the scheduled question-bank gap routine -->
<!-- project: LearnCRE @ 22999a7 -->

# Question bank — coverage gaps and 10 candidate phrasings

**What this is.** A scheduled pass that measures where the shipped question bank
is thin and drafts 10 new question phrasings aimed at those areas. The
phrasings follow the `SituationalCase` shape (title · scenario · data grid ·
ask) so a reviewer can approve, tweak or reject them before anyone writes
options, explanations and tests. A one-line "best-answer direction" is
included per item so the reviewer can sanity-check the intent; it is not the
final explanation.

**Source of the counts.** The community-submission table
(`question_submissions`, statuses pending / approved / rejected / integrated)
could not be read this run: the `learncre` Supabase project is paused
(`INACTIVE`), so the live approved-per-area counts are unavailable. The
numbers below are therefore the *shipped* bank in `src/quiz/`, which is the
set that has already passed review and been integrated. If the project is
unpaused, re-run the routine and the submission statuses will be folded in.

---

## Where the bank is thin (shipped content, 2026-11-19)

Situational cases by category (71 total):

| Category | Cases | Share |
|---|---|---|
| deal-process | 21 | 30% |
| document-literacy | 13 | 18% |
| investment-thesis | 9 | 13% |
| pricing | 7 | 10% |
| risk | 7 | 10% |
| diagnostic | 7 | 10% |
| **sensitivity** | **2** | 3% |
| **lease-econ** | **2** | 3% |
| **comp-selection** | **2** | 3% |
| **absorption** | **1** | 1% |

Cross-cutting gaps that compound the above:

| Dimension | Thin values | Count (situational) | Count (quiz templates) |
|---|---|---|---|
| Role | development | 9 tags | 10 tags (vs 60 acquisitions) |
| Asset class | hotel / retail / industrial | 1 / 2 / 3 | n/a |
| Difficulty | beginner | 4 of 71 | n/a |
| Template category | returns | n/a | 27 (vs 41 valuation) |

The four categories in bold hold 7 of 71 cases combined. Deal-process alone
has three times that. The 10 phrasings below go only to those four
categories, and within them lean toward development, hotel / retail /
industrial, and beginner difficulty wherever the topic allows.

Existing cases in the thin categories, so the drafts don't duplicate them:
`absorption-timing`, `comp-set-vetting`, `comp-vintage-adjustment`,
`ti-vs-rent-giveback`, `lease-structure-nnn-vs-gross`,
`going-in-vs-exit-cap-spread`, `exit-cap-conservatism`.

---

## 10 candidate phrasings

Allocation: absorption ×3, comp-selection ×2, lease-econ ×2, sensitivity ×3.

### 1. Will the submarket absorb the spec pipeline before you deliver?
*Situational · absorption · intermediate · industrial · development / acquisitions*

You are nine months from delivering a 250,000 SF spec industrial building. The submarket has 40.0M SF of inventory at 6.0% vacancy. Another 1.2M SF is under construction and delivers over the next 12 months, including yours. Trailing four-quarter net absorption has averaged 600,000 SF per year and rents have been flat for two quarters.

- **Inventory:** 40.0M SF
- **Current vacancy:** 6.0% (2.4M SF)
- **Under construction:** 1.2M SF (delivers within 12 months)
- **Trailing net absorption:** 600,000 SF / year
- **Your building:** 250,000 SF, delivers month 9

**Q: What submarket vacancy should you underwrite at your delivery date, and what does that do to your lease-up assumption?**

*Best-answer direction:* roll the base forward: (2.4M + 1.2M − ~0.45M absorbed over nine months) ÷ 41.2M ≈ 7.6%. Vacancy rises ~160 bps into your delivery, so the lease-up period and concession budget should be stressed, not held at the trailing pace. Distractors: using today's 6.0%, ignoring the other 950k SF of competing deliveries, or treating annual absorption as if it all lands before month 9.

*Fills:* absorption, development role, industrial.

### 2. Is 30 leases a month fast or slow?
*Situational · absorption · beginner · multifamily · acquisitions / assetManagement*

A 300-unit lease-up is 15% pre-leased at certificate of occupancy. The leasing team is signing 30 net new leases per month and the business plan calls the asset stabilized at 93% occupancy. The lender's interest reserve was sized for a 10-month lease-up.

- **Units:** 300
- **Pre-leased at CO:** 15% (45 units)
- **Net leases per month:** 30
- **Stabilized occupancy target:** 93% (279 units)
- **Interest reserve sized for:** 10 months

**Q: Roughly how many months to stabilization, and which single assumption would you stress first?**

*Best-answer direction:* (279 − 45) ÷ 30 ≈ 7.8, call it 8 months, inside the 10-month reserve. The assumption to stress is the 30/month pace, since it is net of move-outs and typically slows as the easiest units lease first. Distractors: dividing all 300 units by 30 (10 months), forgetting the pre-lease, or treating the reserve as the stabilization date.

*Fills:* absorption, beginner difficulty.

### 3. Hotel: 400 new keys land in a 3,000-key market. Where does your occupancy go?
*Situational · absorption · intermediate · hotel · acquisitions / assetManagement*

You own a 220-key select-service hotel running 72% occupancy in a 3,000-key submarket. Two new hotels totaling 400 keys open next year. Room-night demand in the market has grown about 3% per year for five years and nothing in the pipeline suggests that changes.

- **Market supply:** 3,000 keys, growing to 3,400 (+13.3%)
- **Market demand growth:** ~3% / year
- **Your current occupancy:** 72%
- **Your fair share today:** 1.0x (penetration index 100)

**Q: Assuming you hold fair share, what occupancy should you underwrite for the first full year after the new supply opens?**

*Best-answer direction:* occupancy ≈ demand ÷ supply, so 72% × 1.03 ÷ 1.133 ≈ 65–66%. It recovers roughly 2 points a year as demand growth outruns the now-flat supply. Distractors: assuming new supply hits only the new hotels, subtracting 13% from occupancy directly, or assuming rate holds while occupancy falls.

*Fills:* absorption, hotel asset class.

### 4. Grocery-anchored vs. unanchored strip — do these comps even apply?
*Situational · comp-selection · intermediate · retail · acquisitions*

You are pricing a 110,000 SF grocery-anchored center, 96% leased with a 6.2-year WALT. The broker's comp package has four sales: two unanchored strip centers in the same trade area at 7.25–7.50%, one grocery-anchored center 60 miles away at 6.00%, and a power center in the next county at 7.00%.

- **Subject:** 110k SF, grocery-anchored, 96% leased, WALT 6.2 yrs
- **Comp A/B:** unanchored strips, same trade area, 7.25–7.50%
- **Comp C:** grocery-anchored, 60 miles away, 6.00%
- **Comp D:** power center, adjacent county, 7.00%

**Q: Which comp should carry the most weight, and how do you adjust the rest?**

*Best-answer direction:* format matters more than distance for retail cap rates. Comp C is the primary anchor with a location adjustment; the strips tell you about the local shop-space risk, not the anchored going-in cap; the power center is a different tenant and credit profile and should be weighted lightly or dropped. Distractors: weighting by proximity only, averaging the four, or discarding Comp C because of distance.

*Fills:* comp-selection, retail asset class.

### 5. Stale comps in a moving-rate market — how much do you re-trend?
*Situational · comp-selection · intermediate · multifamily · mortgageUw / acquisitions*

The appraisal for a 220-unit refinance leans on three comps that closed 9 to 14 months ago at 5.0–5.2% caps. Since then the 10-year Treasury is up about 80 bps and lending spreads have tightened about 20 bps. The appraiser applied no time adjustment.

- **Comp caps (9–14 months old):** 5.0–5.2%
- **10-year Treasury since comps:** +80 bps
- **Loan spreads since comps:** −20 bps
- **Appraiser's time adjustment:** none

**Q: What cap-rate range should the credit memo use, and how do you justify the adjustment?**

*Best-answer direction:* cap rates do not move one-for-one with Treasuries; historically a fraction of the move passes through, and the spread tightening offsets part of it. A defensible range is roughly 5.4–5.7%, with the memo stating the pass-through assumption explicitly. Distractors: adding the full 80 bps, making no adjustment, or adjusting by the net 60 bps as if cap rates were a pure debt-cost pass-through.

*Fills:* comp-selection, mortgage UW role.

### 6. Free rent or a lower face rate — which concession costs you more?
*Situational · lease-econ · intermediate · office · assetManagement*

A 20,000 SF tenant will sign a seven-year lease either way. Option A is $34.00/SF with seven months of free rent up front. Option B is $31.00/SF with no free rent. Tenant improvements, bumps and expenses are identical. You plan to sell the building in year 3.

- **Term:** 84 months, 20,000 SF
- **Option A:** $34.00/SF, 7 months free
- **Option B:** $31.00/SF, no free rent
- **TI / bumps / expenses:** identical
- **Planned exit:** year 3

**Q: Which structure has the higher net effective rent, and which one should a seller in year 3 prefer?**

*Best-answer direction:* NER for A ≈ $34 × 77/84 ≈ $31.17, slightly above B. A also shows a $34 face rent in the rent roll at exit, which a buyer capitalizes, while the free rent has long since burned off. The cost is near-term cash. Distractors: picking B because it collects cash from day one, treating free rent as a one-time cost that does not affect NER, or assuming buyers underwrite NER instead of in-place rent.

*Fills:* lease-econ, asset management role.

### 7. 3% bumps vs. 4% bumps — how much does it move year-5 rent and value?
*Situational · lease-econ · beginner · industrial · acquisitions*

A 150,000 SF warehouse tenant will sign a five-year NNN lease at $8.00/SF. The tenant has offered either 3% or 4% annual bumps in exchange for a slightly different TI package. You plan to sell at the end of year 5 at a 6.0% cap.

- **Size:** 150,000 SF
- **Starting rent:** $8.00/SF NNN
- **Bumps:** 3% vs. 4% annually
- **Term:** 5 years
- **Exit cap:** 6.0%

**Q: What is the difference in year-5 rent per SF, and roughly how much exit value is riding on that one percentage point?**

*Best-answer direction:* year-5 rent is $8.00 × 1.03⁴ ≈ $9.00 vs. $8.00 × 1.04⁴ ≈ $9.36, a $0.36/SF gap. On 150k SF that is ~$53k of NOI, which at a 6% cap is ~$890k of exit value. Distractors: compounding five times instead of four, treating the gap as $0.08/SF per year, or ignoring the cap-rate multiplier.

*Fills:* lease-econ, beginner difficulty, industrial.

### 8. Which lever kills the development spread first: cost, rent, or exit cap?
*Situational · sensitivity · advanced · multifamily · development*

A ground-up multifamily deal pencils at a 7.0% yield on cost against a 5.25% exit cap, a 175 bps development spread. Your investment committee wants to know which of three plausible shocks hurts most: hard costs up 8%, market rents down 5%, or exit caps out 50 bps.

- **Total project cost:** $60.0M (hard costs $42.0M)
- **Stabilized NOI:** $4.20M (YOC 7.0%)
- **Exit cap:** 5.25%; spread 175 bps
- **Shock 1:** hard costs +8%
- **Shock 2:** rents −5% (expenses fixed)
- **Shock 3:** exit cap +50 bps

**Q: Rank the three shocks by damage to the development spread and explain why the ranking is what it is.**

*Best-answer direction:* the rent shock is worst because fixed expenses turn a 5% revenue cut into a larger NOI cut (operating leverage), dropping YOC below ~6.5%. The exit-cap shock costs 50 bps of spread by definition. The cost shock adds ~$3.4M to TPC and takes YOC to ~6.6%, costing ~40 bps. Distractors: assuming cost overruns dominate because they are the biggest dollar figure, or treating a 5% rent cut as a 5% NOI cut.

*Fills:* sensitivity, development role.

### 9. A 25 bps rate move: which asset in the book is most exposed?
*Situational · sensitivity · intermediate · mixed · portfolioMgmt*

You run a three-asset separate account and the client asks what a 25 bps rise in rates does to NAV. Asset A is a trophy office at a 4.0% cap with 10-year fixed-rate debt. Asset B is a value-add multifamily at a 6.5% cap with floating-rate debt and a one-year rate cap. Asset C is an unlevered 7.5% cap industrial portfolio.

- **Asset A:** 4.0% cap, 55% LTV, 10-yr fixed
- **Asset B:** 6.5% cap, 65% LTV, floating, 1-yr cap
- **Asset C:** 7.5% cap, unlevered
- **Shock:** +25 bps rates, assume full pass-through to cap rates

**Q: Rank the three by percentage hit to equity value and name the driver for each.**

*Best-answer direction:* A takes the biggest value hit because 25 bps on a 4.0% cap is a ~6% value move (vs. ~3.7% at 6.5% and ~3.2% at 7.5%), and 55% leverage roughly doubles it at the equity line. B's value move is smaller but its cash flow is also hit once the rate cap rolls. C moves least. Distractors: ranking by leverage alone, by cap rate alone, or assuming fixed-rate debt makes A immune.

*Fills:* sensitivity, portfolio management role.

### 10. Hotel: how far can RevPAR fall before DSCR breaches 1.25x?
*Situational · sensitivity · intermediate · hotel · mortgageUw*

You are sizing a loan on a 180-key hotel. Rooms revenue is 85% of total revenue and the hotel runs a 30% NOI margin on total revenue. On lost rooms revenue, about 65% flows through to NOI. Proposed debt service is $1.90M per year and the covenant is 1.25x.

- **Keys / ADR / occupancy:** 180 / $160 / 72% (RevPAR $115)
- **Rooms share of revenue:** 85%
- **NOI margin on total revenue:** 30%
- **Flow-through on lost rooms revenue:** 65%
- **Debt service / covenant:** $1.90M / 1.25x

**Q: Roughly what percentage decline in RevPAR puts the loan at the covenant, and is that cushion adequate for this asset type?**

*Best-answer direction:* rooms revenue ≈ $7.6M, total ≈ $8.9M, NOI ≈ $2.67M, DSCR ≈ 1.41x. Minimum NOI at 1.25x is $2.375M, so NOI can fall ~$295k; at 65% flow-through that is ~$455k of rooms revenue, about a 6% RevPAR decline. For a hotel, where RevPAR routinely swings 10–20% in a downturn, that is thin. Distractors: using the 30% margin as the flow-through, ignoring that only rooms revenue falls, or judging the 1.41x headline as comfortable.

*Fills:* sensitivity, hotel asset class, mortgage UW role.

---

## Next step for the reviewer

Approve, edit or reject each phrasing. For any that are approved, the shipping
pattern is in `docs/agent-instructions.md`: one file per case in
`src/quiz/situational/<id>.ts`, four options with exactly one `isBest: true`,
a takeaway, three tips, registration in `index.ts` and in
`src/content/catalogIndex.ts`, then `npm run build && npx vitest run`.
