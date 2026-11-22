<!-- generated 2026-11-22 by the scheduled question-bank gap review -->

# Question bank gap review — 2026-11-22

Scheduled pass: find the areas of the approved question bank with the fewest
questions and draft 10 new phrasings aimed at them.

**Source of truth used.** The community `question_submissions` table (with
its `approved` status) lives in the `learncre` Supabase project, which is
still **paused (INACTIVE)**, so approval counts could not be queried. The
shipped content in `src/quiz/` was used as the approved set instead.

**Backlog note.** The bank itself has not changed since these reviews began:
the tally below is identical to every prior run. Earlier runs have left
roughly 500 candidate phrasings in about 140 documents spread across
unmerged `claude/upbeat-meitner-*` branches (197 branches exist), nearly all
aimed at the same four categories. To avoid adding more
of the same, this batch was checked against all of those drafts and targets
**role × category cells that are empty in the shipped bank** using angles none
of the earlier drafts cover.

## Where the bank is thin

Situational cases (71 files) by category:

| Category | Cases |
|---|---|
| deal-process | 21 |
| document-literacy | 13 |
| investment-thesis | 9 |
| pricing | 7 |
| diagnostic | 7 |
| risk | 7 |
| **sensitivity** | **2** |
| **lease-econ** | **2** |
| **comp-selection** | **2** |
| **absorption** | **1** |

Role coverage inside the four thin categories (shipped cases):

| Category | Acq | Asset mgmt | Mortgage UW | Portfolio mgmt | Development |
|---|---|---|---|---|---|
| absorption | 1 | **0** | **0** | **0** | 1 |
| comp-selection | 2 | **0** | **0** | **0** | **0** |
| lease-econ | 2 | 2 | **0** | **0** | **0** |
| sensitivity | 2 | **0** | **0** | **0** | **0** |

Other thin cuts: hotel 1, retail 2, industrial 3 cases (multifamily 11,
office 9); beginner 4 (intermediate 33, advanced 34); development role 9
(acquisitions 40).

## 10 proposed phrasings

Each entry is a candidate `SituationalCase` in the shape described in
`docs/agent-instructions.md`: one best answer, plausible distractors, a
takeaway and three tips. Arithmetic was hand-checked. Tick the box to accept;
accepted items get built as `src/quiz/situational/<id>.ts` and registered in
the index.

| # | Category | Role cell filled | Asset | Difficulty |
|---|---|---|---|---|
| 1 | absorption | assetManagement | multifamily | beginner |
| 2 | absorption | portfolioMgmt, assetManagement | office | intermediate |
| 3 | comp-selection | mortgageUw | multifamily | intermediate |
| 4 | comp-selection | portfolioMgmt | office | advanced |
| 5 | comp-selection | development | multifamily | intermediate |
| 6 | sensitivity | assetManagement | multifamily | beginner |
| 7 | sensitivity | portfolioMgmt | mixed | advanced |
| 8 | lease-econ | mortgageUw | office | intermediate |
| 9 | lease-econ | portfolioMgmt, assetManagement | office | advanced |
| 10 | lease-econ | assetManagement | retail | intermediate |

---

### [ ] 1. Why does occupancy fall every winter?
*absorption · beginner · multifamily · assetManagement*

**Scenario.** A 300-unit community runs 95% occupied in summer and drops to
about 86% by February every year. All leases are 12 months. 45% of them
expire between November and February. About half of expiring residents
renew. The leasing team can sign roughly 30 new leases a month in summer but
only about 10 a month in winter because traffic is thin.

| | |
|---|---|
| Units | 300 |
| Leases expiring Nov–Feb | 45% (135 leases, ~34 per month) |
| Renewal rate | ~50% |
| New-lease capacity | ~10/month winter, ~30/month summer |

**Q: What is the most effective fix?**

- ✅ **Change lease terms so expirations land in spring and summer.** Winter
  produces about 17 move-outs a month (34 × 50%) against 10 new leases, a net
  loss of 7 units a month, or about 28 units (9 points of occupancy) over
  four months. Offering 9- or 14-month terms on leases signed in winter, and
  capping the share of leases that can expire in any one month, moves the
  move-outs to months when demand can replace them.
- ◻️ Cut winter asking rents until traffic recovers. Lower rent does not
  create winter traffic that isn't there, and it resets rents on every lease
  signed.
- ◻️ Increase the winter marketing budget. Helps at the margin, but the
  problem is the expiration schedule, not lead volume alone.
- ◻️ Push bigger renewal increases to make up the lost revenue. That lowers
  the renewal rate and makes the winter hole deeper.

**Takeaway.** Occupancy is a matching problem between when leases expire and
when demand shows up. Manage the expiration calendar, not just the rent.

Tips: chart expirations by month against historical leasing velocity · cap
any single month at roughly 10% of leases · price off-cycle terms so the
resident chooses the term you want.

---

### [ ] 2. The market is absorbing space. Is your building?
*absorption · intermediate · office · portfolioMgmt / assetManagement*

**Scenario.** Your fund owns a Class B office building that is 82% leased.
The asset plan assumes it reaches 90% in 24 months, citing a broker report
that the submarket posted +150,000 SF of net absorption last year. The
detail in the same report shows Class A absorbed +600,000 SF and Class B
lost 450,000 SF.

| | |
|---|---|
| Subject | Class B, 82% leased |
| Plan | 90% leased in 24 months |
| Submarket net absorption | +150,000 SF |
| Class A / Class B | +600,000 SF / −450,000 SF |

**Q: How should the lease-up assumption be treated?**

- ✅ **Rebuild it on Class B absorption, which is negative.** Tenants are
  moving up in quality, so the headline number describes demand for a
  product you don't own. Without a capital plan that changes the building's
  competitive position, the base case should hold occupancy flat or lower
  and budget higher concessions to defend it.
- ◻️ Keep it. Positive net absorption means the market is growing. The total
  hides a 450,000 SF loss in the subject's own segment.
- ◻️ Keep the 90% but stretch it to 36 months. Changes the timing without
  addressing that the segment is shrinking.
- ◻️ Assume Class B benefits next as Class A fills up. Possible, but it is a
  thesis that needs evidence (Class A vacancy, rent gap), not a base case.

**Takeaway.** Absorption only supports an underwriting assumption when it is
measured for the segment the asset competes in.

Tips: always split absorption by class, size and vintage · check whether
move-outs from your segment are going to newer product · a lease-up
assumption needs a named source of demand.

---

### [ ] 3. The borrower's expense comps look cheap. Are they comps?
*comp-selection · intermediate · multifamily · mortgageUw*

**Scenario.** A borrower is refinancing a 220-unit, 1985-vintage apartment
property. Their underwriting uses operating expenses of $4,300 per unit and
supports it with three expense comps at $4,200–$4,400. Those comps are
2018-or-newer properties with 300+ units. The subject's trailing-12 expenses
are $5,450 per unit. Three 1980s properties of 150–250 units in the same
county run $5,300–$5,800.

| | |
|---|---|
| Subject | 220 units, built 1985 |
| Borrower's expense assumption | $4,300/unit |
| Subject T-12 expenses | $5,450/unit |
| Borrower's comps | 2018+, 300+ units: $4,200–$4,400 |
| Like-vintage comps | 1980s, 150–250 units: $5,300–$5,800 |

**Q: What expense level should the loan be sized on?**

- ✅ **About $5,450 or higher, using T-12 as the floor and like-vintage comps
  as the check.** New, larger properties carry lower repairs, payroll per
  unit and insurance. The gap is ($5,450 − $4,300) × 220 = $253,000 of NOI,
  which is about $4.2M of value at a 6% cap. Property taxes should also be
  restated if the refinance or a sale triggers reassessment.
- ◻️ $4,300, because it is supported by three comps. The comps differ in
  age and scale, the two things that drive expenses most.
- ◻️ Split the difference at about $4,900. Averaging a relevant number with
  an irrelevant one is not conservatism.
- ◻️ Use the borrower's number but add a larger replacement reserve.
  Reserves cover capital items, not the operating expense gap.

**Takeaway.** Expense comps need the same screening as sale comps: vintage,
size, tax basis and who pays utilities. Actual trailing expenses are the
floor unless a specific, documented change explains a reduction.

Tips: compare line by line (payroll, R&M, insurance, taxes), not just the
total · ask what changes operationally to justify any cut below T-12 ·
capitalize the expense gap to see what is really at stake.

---

### [ ] 4. A foreclosure sale next door printed 38% below your mark. Now what?
*comp-selection · advanced · office · portfolioMgmt*

**Scenario.** Your fund carries a stabilized Class A office building at
$340/SF. Three arm's-length trades in the last nine months support that
value. Last month a lender sold the building next door after foreclosure at
$210/SF. It was 55% leased. Getting it to stabilized occupancy would take
leasing about 40% of the building at roughly $120/SF of that space in TI,
commissions and carry. An LP asks why your asset isn't marked at $210.

| | |
|---|---|
| Subject carrying value | $340/SF, stabilized |
| Arm's-length trades (3) | support the mark |
| Lender sale | $210/SF, 55% leased |
| Cost to stabilize | 40% of the building × ~$120/SF ≈ $48/SF |

**Q: How should the lender sale affect the mark?**

- ✅ **Adjust it to a stabilized equivalent and weigh it as a low-end data
  point.** $210 + $48 = $258/SF at cost. A buyer needs a return for taking
  the leasing risk; at 15–20% on cost that implies about $300–$310
  stabilized. That is roughly 10% below $340, which is a reason to test the
  mark and explain the gap, not to adopt $210 and not to dismiss the sale.
- ◻️ Ignore it. Distressed sales are never comps. The seller was motivated,
  but a real buyer paid a real price for the neighboring building.
- ◻️ Mark the asset to $210/SF. It is the most recent trade. It prices a
  half-empty building, not a stabilized one.
- ◻️ Average all four trades. Mixing unadjusted stabilized and vacant
  pricing produces a number that describes neither.

**Takeaway.** A distressed or vacant trade is evidence once it is adjusted
for occupancy and the buyer's required return. Report the adjustment so the
valuation holds up to an LP's question.

Tips: adjust for income condition before comparing $/SF · note seller
motivation, then quantify it instead of using it as a reason to exclude ·
document why each comp was weighted the way it was.

---

### [ ] 5. Your units are smaller than the comps. Rent per SF or rent per unit?
*comp-selection · intermediate · multifamily · development*

**Scenario.** You are setting pro forma rents for a planned building whose
units average 650 SF. The closest new comps average 900 SF and rent for
$2,250 a month, or $2.50/SF. One analyst applies $2.50/SF to get $1,625.
Another uses $2,250 per unit. Within those same comps, the 620–680 SF units
rent for $1,850–$1,950.

| | |
|---|---|
| Subject average unit | 650 SF |
| Comp average | 900 SF, $2,250/month, $2.50/SF |
| Per-SF method | $1,625/month |
| Per-unit method | $2,250/month |
| Comp units of 620–680 SF | $1,850–$1,950 (~$2.92/SF) |

**Q: Which rent belongs in the pro forma?**

- ✅ **About $1,900, from the comps' similarly sized units.** Rent per SF
  rises as units get smaller and rent per unit falls, so applying an average
  from 900 SF units is wrong in both directions. Matching by unit size gives
  about $2.92/SF, which is 17% above the per-SF method and 16% below the
  per-unit method.
- ◻️ $1,625. Per SF is the standard metric. It understates what small units
  achieve.
- ◻️ $2,250. Renters pay by the unit. It ignores that these units are 28%
  smaller.
- ◻️ $1,940, the midpoint of the two methods. Close by coincidence here, but
  it is not a method and will not hold on the next deal.

**Takeaway.** Rent comps have to be matched by unit type and size before any
per-SF or per-unit metric is applied.

Tips: build the comp grid by floor plan, not by property average · check the
rent-per-SF curve across sizes in each comp · confirm the market is deep
enough for the unit mix you are planning.

---

### [ ] 6. The insurance renewal came in 60% higher. What did that cost in value?
*sensitivity · beginner · multifamily · assetManagement / acquisitions*

**Scenario.** A 250-unit apartment property produces $2.5M of NOI and is
valued at a 5.5% cap. The insurance renewal moves from $800 to $1,300 per
unit. The property carries a loan at 60% of value.

| | |
|---|---|
| Units | 250 |
| NOI | $2,500,000 |
| Cap rate | 5.5% |
| Insurance | $800 → $1,300 per unit |
| Leverage | 60% LTV |

**Q: Roughly how much value did the renewal remove?**

- ✅ **About $2.3M.** The increase is $500 × 250 = $125,000 a year, or 5% of
  NOI. Capitalized at 5.5% that is $125,000 / 0.055 ≈ $2.27M, also 5% of
  value. With 60% leverage the equity absorbs all of it, so equity value
  falls about 12.5%.
- ◻️ About $125,000. That is one year of extra cost, not the value of a
  recurring expense.
- ◻️ Nothing. Insurance passes through to tenants. Apartment leases are
  gross; the owner pays operating expenses.
- ◻️ Nothing until the lender orders a new appraisal. Value depends on NOI,
  not on when someone measures it.

**Takeaway.** Every recurring expense dollar is worth 1 ÷ cap rate in value
(about 18x at 5.5%), and leverage concentrates the loss in the equity.

Tips: multiply any recurring NOI change by 1/cap for a quick value estimate
· state expense shocks as a percentage of NOI, not of the expense line ·
check the DSCR covenant after any large expense reset.

---

### [ ] 7. The sensitivity table says exit cap is the biggest risk. Is it?
*sensitivity · advanced · mixed · portfolioMgmt / acquisitions*

**Scenario.** A deal model's sensitivity table shows the IRR change per unit
of each input. The analyst concludes exit cap is the main risk because it has
the largest number. The investment committee's downside case, built from this
submarket's history and its supply pipeline, uses the ranges in the last
column.

| Input | IRR change per unit | Committee's plausible range |
|---|---|---|
| Exit cap | ∓3.5 pts per ±100 bps | ±50 bps |
| Rent growth | ±2.0 pts per ±100 bps a year | ±250 bps a year |
| Lease-up timing | ∓1.2 pts per ±6 months | ±12 months |

**Q: Which input is the largest risk to the IRR?**

- ✅ **Rent growth.** Scale each sensitivity by how far the input can
  plausibly move: exit cap 0.5 × 3.5 = 1.75 pts, rent growth 2.5 × 2.0 = 5.0
  pts, lease-up 2 × 1.2 = 2.4 pts. Rent growth is nearly three times the
  exit cap exposure, and lease-up timing also outranks it.
- ◻️ Exit cap. It has the highest sensitivity per 100 bps. Per-unit
  sensitivity ignores that the inputs do not move by the same amount.
- ◻️ Lease-up timing. Delays always dominate. Not here: 2.4 pts against 5.0.
- ◻️ They cannot be compared because the units differ. Scaling by a
  plausible range is exactly what makes them comparable.

**Takeaway.** Risk is sensitivity multiplied by the realistic range of the
input. A table of equal-sized shocks ranks the math, not the risk.

Tips: set shock sizes from history and current supply, not round numbers ·
present the ranked result as IRR points at risk · revisit the ranges when
market conditions change.

---

### [ ] 8. The largest tenant pays above market. Which rent sizes the loan?
*lease-econ · intermediate · office · mortgageUw*

**Scenario.** You are sizing a 10-year loan at a 9% minimum debt yield. The
building's in-place NOI is $4.0M. Its largest tenant leases 60,000 SF at $42
NNN with three years of term remaining. Market rent for that space is $34
NNN. The borrower asks to be sized on in-place NOI.

| | |
|---|---|
| In-place NOI | $4,000,000 |
| Tenant | 60,000 SF at $42 NNN, 3 years left |
| Market rent | $34 NNN |
| Loan term / sizing test | 10 years / 9% debt yield |

**Q: What NOI should size the loan?**

- ✅ **About $3.52M, with the tenant marked to market.** The lease expires
  in year 3 of a 10-year loan, so the extra $8/SF (60,000 × $8 = $480,000)
  is not income the loan can rely on. Proceeds are $3.52M / 9% ≈ $39.1M
  instead of $44.4M. The rollover also calls for a TI and leasing-commission
  reserve.
- ◻️ $4.0M. The rent is contractual. It is, for three years of a ten-year
  loan.
- ◻️ $4.0M, because the tenant has strong credit. Credit protects the rent
  through expiry and does nothing after it.
- ◻️ $3.76M, splitting the difference. There is no basis for half; the
  income either survives the roll or resets to market.

**Takeaway.** Lenders underwrite the lower of in-place and market rent for
any lease that rolls during the loan term. Above-market rent is a
temporary premium, not stabilized NOI.

Tips: compare every major lease's expiry to the loan maturity · mark
above-market rents down, and do not mark below-market rents up without a
signed lease · size reserves for the rollover you just identified.

---

### [ ] 9. A tenant offers $1.2M to leave three years early. Take it?
*lease-econ · advanced · office · assetManagement / portfolioMgmt*

**Scenario.** A tenant occupies 20,000 SF at $30/SF with three years left
and offers a $1.2M fee to terminate now. Market rent is $36/SF. Your leasing
team expects nine months of downtime, $40/SF in TI and $200,000 in
commissions for a new 10-year lease. The tenant has told you it will not
renew.

| | |
|---|---|
| Remaining rent | $600,000 a year × 3 = $1.8M |
| Termination fee offered | $1.2M |
| Market rent | $36/SF ($720,000 a year) |
| Re-leasing | 9 months down, $800,000 TI, $200,000 commissions |

**Q: What is the best response?**

- ✅ **Accept, or counter for more, as long as leasing demand is credible.**
  Over the same three years: $1.2M fee + 2.25 years × $720,000 = $2.82M,
  less $1.0M of re-leasing cost = $1.82M, against $1.8M from holding the
  lease. Cash is about even, but you finish with a 10-year lease at market
  instead of a vacancy, and the $1.0M is a cost you would have paid in year
  3 anyway.
- ◻️ Reject. $1.2M is less than the $1.8M owed. Ignores the rent from the
  replacement tenant during those three years.
- ◻️ Accept. The fee is pure profit on top of new rent. Ignores downtime and
  $1.0M of re-leasing cost.
- ◻️ Accept only at the full $1.8M. A reasonable opening ask, but walking
  away below it gives up a better lease and term.

**Takeaway.** Judge a buyout against the whole alternative: fee plus
replacement rent, less downtime and re-leasing cost, plus the value of
moving the rollover forward. The fee itself is one-time income and should
not be capitalized.

Tips: re-leasing cost for a non-renewing tenant is a matter of when, not
whether · stress the downtime before accepting (at 18 months the cash result
drops to about $1.28M) · check loan documents for lender consent and for
where termination fees must be deposited.

---

### [ ] 10. "CAM increases capped at 5%." Capped against what?
*lease-econ · intermediate · retail · assetManagement*

**Scenario.** A 40,000 SF retail tenant's letter of intent says controllable
CAM increases are "capped at 5% per year" and nothing more. Base-year
controllable CAM is $6.00/SF. Suppose actual costs rise 2% in year 1 and 9%
in year 2.

| | |
|---|---|
| Base-year controllable CAM | $6.00/SF |
| Actual, year 1 / year 2 | $6.12 / $6.67 |
| Non-cumulative cap, year 2 limit | $6.12 × 1.05 = $6.43 |
| Cumulative compounding cap, year 2 limit | $6.00 × 1.05² = $6.62 |

**Q: As the landlord's asset manager, which wording should you require in
the lease?**

- ✅ **A cumulative, compounding cap measured from the base year, applied to
  controllable expenses only.** Under a non-cumulative cap the landlord
  absorbs $6.67 − $6.43 = $0.24/SF in year 2 (about $9,800 for this tenant)
  and that shortfall carries into every later year. Under a cumulative cap
  the unused room from year 1 carries forward and the shortfall is about
  $0.06/SF (about $2,200). Taxes, insurance, utilities and snow removal
  should sit outside the cap.
- ◻️ Leave it as written. 5% is 5%. The two readings differ by a factor of
  four in this example and the ambiguity will be argued at reconciliation.
- ◻️ Non-cumulative, because it is simpler to administer. Simpler, and it
  costs the landlord in any year following a low-growth year.
- ◻️ Agree to the cap on all CAM, including taxes and insurance. Those are
  the least controllable lines and the most likely to exceed 5%.

**Takeaway.** A CAM cap has three terms that matter: the base it is measured
from, whether unused increases carry forward, and which expenses it covers.
All three belong in the LOI.

Tips: model the cap against a volatile expense history before agreeing to it
· carve out uncontrollable expenses by name · track recovery leakage by
tenant in the annual reconciliation.
