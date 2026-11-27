# Question candidates — 2026-11-27

Ten candidate situational questions for the thinnest areas of the bank. Nothing
here is wired into the app: these are phrasings to approve, edit, or reject.
Each one is written to the `SituationalCase` shape (one best option, three
plausible wrong ones, takeaway, three tips) so an approved candidate can be
dropped into `src/quiz/situational/` with little rework.

## How "thin" was measured

The `question_submissions` table (where `approved` / `integrated` status lives)
could not be read: the `learncre` Supabase project is paused. Coverage below is
therefore the **shipped situational bank in the repo** (71 cases), used as a
proxy for what has been approved.

| Dimension | Well covered | Thin |
| --- | --- | --- |
| Category | deal-process 21, document-literacy 13, investment-thesis 9 | **absorption 1, lease-econ 2, sensitivity 2, comp-selection 2** |
| Difficulty | advanced 34, intermediate 33 | **beginner 4** |
| Asset class | multifamily 11, office 9, mixed 8 | **hotel 1, retail 2, industrial 3** |
| Role | acquisitions 40, assetManagement 31 | **development 9** |
| Doc type | loan 4, lpa 4, lease 3, construction 3 | **psa 1, om 0** |

## What the ten candidates add

| # | Category | Difficulty | Asset class | Roles |
| --- | --- | --- | --- | --- |
| 1 | absorption | beginner | industrial | acquisitions, development |
| 2 | absorption | intermediate | multifamily | development, acquisitions |
| 3 | lease-econ | beginner | office | assetManagement, acquisitions |
| 4 | lease-econ | intermediate | retail | assetManagement |
| 5 | sensitivity | beginner | multifamily | acquisitions |
| 6 | sensitivity | intermediate | industrial | acquisitions, portfolioMgmt |
| 7 | comp-selection | intermediate | retail | acquisitions |
| 8 | comp-selection | beginner | hotel | assetManagement, acquisitions |
| 9 | document-literacy (psa) | intermediate | retail | acquisitions |
| 10 | document-literacy (om) | beginner | multifamily | acquisitions |

If all ten were approved: absorption 1 → 3, lease-econ 2 → 4, sensitivity 2 → 4,
comp-selection 2 → 4, beginner 4 → 9, hotel 1 → 2, retail 2 → 5, industrial 3 → 5,
and the bank gets its first OM excerpt.

---

## 1. "1.2 million SF of leasing" — so why did vacancy go up?

*absorption · beginner · industrial · acquisitions, development* — proposed id `gross-vs-net-absorption`

**Scenario.** A broker's market report leads with "1.2 million SF of leasing
activity this year — demand is on fire." The same report shows 900,000 SF of
move-outs and 500,000 SF of speculative deliveries that came online empty.

- **Inventory, start of year:** 20.0M SF
- **Vacancy, start of year:** 6.0% (1.2M SF)
- **Gross leasing:** 1.2M SF
- **Move-outs:** 900,000 SF
- **New deliveries (vacant):** 500,000 SF

**Q: What happened to the vacancy rate over the year?**

- ✅ **It rose to about 6.8%. Net absorption was only 300,000 SF, and 500,000 SF of empty new supply was added.**
  - Net absorption = 1.2M leased − 0.9M vacated = 300k SF. Vacant space ends at 1.2M − 0.3M + 0.5M = 1.4M SF on a 20.5M SF base = 6.8%. Supply outran net demand by 200k SF.
- ◻️ **It fell to roughly zero. 1.2M SF of leasing filled the 1.2M SF that was vacant.**
  - Treats gross leasing as if nobody moved out. Most leasing activity is tenants relocating within the market, which fills one box and empties another.
- ◻️ **It fell to about 4.5%. Net absorption of 300,000 SF came off the vacant stock.**
  - The net absorption figure is right, but it ignores the 500k SF of deliveries. That is the answer for a market with no new supply.
- ◻️ **It held at 6.0%. Leasing and move-outs roughly cancel in a healthy market.**
  - They do not cancel here (net is +300k), and the deliveries move both the numerator and the denominator.

**Takeaway.** Gross leasing measures activity, not demand. Vacancy moves on net
absorption against net new supply, so always ask for move-outs and deliveries
before accepting a leasing headline.

- Net absorption = change in occupied SF, not SF leased.
- Vacancy rises whenever deliveries exceed net absorption.
- Recompute vacancy on the new, larger inventory.

---

## 2. Three lease-ups at once — is 25 units a month defensible?

*absorption · intermediate · multifamily · development, acquisitions* — proposed id `lease-up-fair-share`

**Scenario.** Your 240-unit development delivers into a submarket that has
absorbed a steady 60 units a month, net. Two competing projects (300 and 420
units) deliver the same quarter. The pro forma assumes you lease 25 units a
month to reach 93% stabilized occupancy.

- **Subject:** 240 units
- **Competing lease-ups:** 300 + 420 units
- **Submarket net absorption:** 60 units/month
- **Pro forma pace:** 25 units/month
- **Stabilization target:** 93% (223 units)

**Q: How should you treat the 25-unit-a-month assumption?**

- ✅ **Push back. Fair share is about 15 a month, which means roughly 15 months to stabilize, not 9. The pro forma needs a reason you will take 42% of demand with 25% of the units.**
  - Subject share of competing supply = 240 / 960 = 25%. 25% × 60 = 15 units/month. 223 ÷ 15 ≈ 15 months versus 223 ÷ 25 ≈ 9 months. Six extra months of carry and concessions belongs in the base case unless there is a concrete edge (location, price point, earlier delivery).
- ◻️ **Accept it. The submarket absorbs 60 a month, well above the 25 you need.**
  - The 60 is shared with 720 other new units. Total pro forma demand across the three projects would far exceed what the submarket has ever absorbed.
- ◻️ **Cut it to 20 a month. Three projects split 60 evenly.**
  - Closer, but an even split ignores project size. The larger projects have more units on offer and more leasing capacity, so share by units is the better starting point.
- ◻️ **Accept it. New Class A product typically leases 25–30 units a month.**
  - A rule of thumb from uncontested lease-ups says nothing about a quarter with 960 units delivering at once.

**Takeaway.** Lease-up pace is a share of submarket demand, not a property
attribute. Start from fair share by units, then argue up or down with specifics.

- Fair share = your units ÷ all competing units in lease-up.
- Every month of slower lease-up costs carry plus concessions.
- If every pro forma in the pipeline can't be true at once, yours probably isn't.

---

## 3. Same total rent — free months or a lower rate?

*lease-econ · beginner · office · assetManagement, acquisitions* — proposed id `free-rent-vs-face-rate`

**Scenario.** A tenant will sign a 5-year, 20,000 SF lease on either of two
structures and is indifferent between them. You plan to sell the building in
about two years, and buyers in this market are pricing at a 6.5% cap.

- **Option A:** $36.00/SF flat, no free rent
- **Option B:** $40.00/SF flat, 6 months free up front
- **Total rent collected, either way:** $180/SF over the term
- **Planned sale:** year 2 at ~6.5% cap

**Q: Which structure should the landlord prefer, and why?**

- ✅ **Option B. Total rent is identical, but once the free rent burns off the rent roll shows $40, which is $4/SF more NOI at sale.**
  - $4/SF ÷ 6.5% ≈ $61/SF of value, about $1.2M on 20,000 SF. The cost is six months of no cash up front, and a buyer will deduct any free rent still outstanding at closing, so the sale needs to land after the burn-off.
- ◻️ **Option A. Cash starts on day one and a dollar today is worth more than a dollar later.**
  - Correct on time value, and a long-term holder might lean this way. But the timing cost of six months is small next to capitalizing $4/SF of extra contract rent at exit.
- ◻️ **Neither. Net effective rent is $36 in both, so the landlord is indifferent.**
  - Net effective rent is the same, but value at sale is driven by in-place contract rent, not by the average over the term.
- ◻️ **Option A. Free rent signals a weak building and lowers what buyers will pay.**
  - Buyers do look through concessions, but they underwrite the contract rent in place and credit themselves any unexpired free rent. A burned-off concession leaves little trace.

**Takeaway.** Landlords give free rent to protect face rent, because face rent
is what gets capitalized. Equal net effective rent does not mean equal value.

- Net effective rent = total rent over the term ÷ term, net of concessions.
- Face rent sets the rent roll, the comps, and the base for escalations.
- Check for unexpired free rent before trusting any in-place NOI.

---

## 4. The new tenant pays 7% more — why renew?

*lease-econ · intermediate · retail · assetManagement* — proposed id `renew-vs-replace-economics`

**Scenario.** A 10,000 SF inline tenant's lease expires in six months. It will
renew for 5 years at $28/SF. A broker says a replacement tenant would pay
$30/SF for 5 years, but the space needs a new build-out and would sit dark
while that happens.

- **Renewal:** $28/SF, $5/SF TI, 2% commission, no downtime
- **New tenant:** $30/SF, $40/SF TI, 6% commission, 9 months downtime
- **Space:** 10,000 SF
- **Comparison window:** 5 years from expiration
- **Market cap rate:** ~7.0%

**Q: Which deal is better for the owner over the next five years?**

- ✅ **The renewal, by roughly $54/SF. Downtime, TI, and commission cost far more than the $2 rent premium earns back.**
  - Renewal: $140 rent − $5 TI − $2.80 commission = $132.20/SF. New tenant: 4.25 years × $30 = $127.50 − $40 TI − $9.00 commission = $78.50/SF. Gap ≈ $53.70/SF, about $537k. Even capitalizing the extra $2 at 7% adds only ~$29/SF of value.
- ◻️ **The new tenant. $2/SF more rent capitalized at 7% adds about $29/SF of value.**
  - The value math is right but it is half the ledger. You spend about $54/SF more in cash to create $29/SF of value.
- ◻️ **The new tenant. Five years at $30 is $150/SF against $140/SF for the renewal.**
  - Ignores nine months of no rent and $44/SF more in leasing costs.
- ◻️ **They are about equal. The higher TI is recovered through the higher rent.**
  - $35/SF of extra TI recovered at $2/SF a year takes more than 17 years, on a 5-year lease.

**Takeaway.** Compare leases on net cash after downtime, TI, and commissions,
not on face rent. A small rent premium rarely pays for a vacancy and a build-out.

- Cost to replace = downtime + TI + commission, all front-loaded.
- Payback on incremental TI = extra TI ÷ extra annual rent.
- The answer flips only when the rent premium is large or the incumbent is weak credit.

---

## 5. Which hurts more — 50 bps of cap or 5% of NOI?

*sensitivity · beginner · multifamily · acquisitions* — proposed id `cap-vs-noi-sensitivity`

**Scenario.** You are valuing a stabilized apartment building at a 5.0% cap on
$1.0M of NOI. Your VP asks which downside to worry about more: the exit cap
coming in 50 bps wider, or NOI coming in 5% short.

- **NOI:** $1,000,000
- **Cap rate:** 5.0%
- **Base value:** $20.0M
- **Downside 1:** cap rate 5.5%
- **Downside 2:** NOI $950,000

**Q: Which downside takes more off the value?**

- ✅ **The cap move. 50 bps wider cuts value about 9%; a 5% NOI miss cuts it 5%.**
  - $1.0M ÷ 5.5% = $18.2M, down 9.1%. $950k ÷ 5.0% = $19.0M, down 5.0%. Value moves one-for-one with NOI but by Δcap ÷ new cap with the cap rate, and 0.5 ÷ 5.5 is a big fraction when caps are low.
- ◻️ **The NOI miss. 5% is ten times larger than 0.5%.**
  - Compares percentage points to percent. A 50 bps move on a 5% cap is a 10% change in the cap rate itself.
- ◻️ **They are the same. Each reduces value by about 5%.**
  - Only the NOI miss is 5%. The cap move is 9.1%.
- ◻️ **The cap move, by about 10%, because the cap rate rose 10%.**
  - Right direction, slightly wrong math. Value falls by 1 − (5.0 ÷ 5.5) = 9.1%, not 10%, because the cap rate is in the denominator.

**Takeaway.** At low cap rates, value is more sensitive to the cap than to NOI.
The lower the going-in cap, the more a given basis-point move costs.

- %Δ value from NOI = %Δ NOI.
- %Δ value from cap ≈ −Δcap ÷ new cap.
- 50 bps is ~9% of value at a 5 cap but only ~6% at an 8 cap.

---

## 6. Exit value misses by 10% — what happens to the equity?

*sensitivity · intermediate · industrial · acquisitions, portfolioMgmt* — proposed id `leverage-exit-sensitivity`

**Scenario.** You bought a warehouse for $50M with a 65% LTV interest-only
loan. The base case sells it for $60M in year 5. Investment committee asks what
a 10% miss on exit value does to equity proceeds at sale. Ignore sale costs.

- **Purchase price:** $50.0M
- **Loan (interest-only):** $32.5M
- **Equity:** $17.5M
- **Base-case exit value:** $60.0M
- **Downside exit value:** $54.0M

**Q: By how much do equity proceeds at exit fall?**

- ✅ **About 22%. Proceeds drop from $27.5M to $21.5M because the loan balance does not move.**
  - Base: $60.0M − $32.5M = $27.5M. Downside: $54.0M − $32.5M = $21.5M. $6.0M ÷ $27.5M = 21.8%. The multiplier is exit value ÷ exit equity = 60 ÷ 27.5 ≈ 2.2×.
- ◻️ **About 10%. Leverage changes dollars, not percentages.**
  - The lender takes none of the loss, so the full $6M lands on a $27.5M equity position.
- ◻️ **About 29%. At 65% LTV, equity is 35% of the capital stack, so 10% ÷ 35%.**
  - Uses leverage at purchase. By exit the base case has appreciated, so equity is 46% of value and the amplification is smaller.
- ◻️ **About 6.5%. The lender absorbs 35% of the decline.**
  - Backwards. Debt is paid first and in full; equity absorbs the whole decline until it is wiped out.

**Takeaway.** Debt is a fixed claim, so every dollar of value lost comes out of
equity. The amplification depends on leverage at the moment you measure it,
not at purchase.

- Equity sensitivity ≈ asset value ÷ equity value.
- Appreciation de-levers the deal and dampens later sensitivity.
- Run exit sensitivities on equity proceeds, not just on asset value.

---

## 7. Five retail trades — which ones set the cap rate?

*comp-selection · intermediate · retail · acquisitions* — proposed id `retail-comp-set-anchor`

**Scenario.** You are pricing a 120,000 SF grocery-anchored neighborhood
center, 95% leased, with 12 years left on the grocer's lease. The broker's comp
sheet lists five trades and quotes "a 6.8% average."

- **Comp 1:** grocery-anchored, 3 miles away, 4 months ago, 6.50%
- **Comp 2:** unanchored strip, same intersection, 2 months ago, 7.75%
- **Comp 3:** power center, same submarket, 6 months ago, 7.25%
- **Comp 4:** grocery-anchored, same metro, 26 months ago, 5.75%
- **Comp 5:** grocery-anchored, adjacent submarket, 7 months ago, 6.75%, anchor has 3 years of term left

**Q: Which comps should anchor your cap rate?**

- ✅ **Comp 1 as the primary, with Comp 5 as support adjusted tighter for the subject's longer anchor term. That points to roughly 6.5%.**
  - Comps 1 and 5 are the same product and recent. Comp 5's short anchor term explains its wider cap, so the subject should price inside it. Comps 2 and 3 are different product with different tenant risk, and Comp 4 predates the current rate environment.
- ◻️ **All five. A larger sample averages out the noise, so use 6.8%.**
  - Averaging across product types and time periods adds bias, not precision. Three of the five are not comparable.
- ◻️ **Comp 2. It is the closest and the most recent.**
  - Location and timing are right, but an unanchored strip carries more rollover and credit risk and trades more than 100 bps wider for that reason.
- ◻️ **Comps 1 and 4. They are the two most physically similar centers, which points to about 6.1%.**
  - Comp 4 is the right product but a 26-month-old trade reflects a different cost of capital. Use it for context on the spread to other formats, not for the level.

**Takeaway.** A good comp matches on product, tenancy, and time. Narrow the set
to the trades that share the subject's risk, then adjust for the differences
that remain.

- Filter first on product type and anchor, then on recency, then on distance.
- Explain each comp's cap before averaging anything.
- Stale comps show relative pricing, not today's level.

---

## 8. Who is this hotel actually competing with?

*comp-selection · beginner · hotel · assetManagement, acquisitions* — proposed id `hotel-comp-set-selection`

**Scenario.** You asset-manage a 140-key select-service hotel near the airport
with a $145 ADR. The operator proposes a new competitive set for RevPAR index
reporting and notes the hotel would score 118 against it, up from 97 today.

- **Subject:** 140 keys, select-service, airport, ADR $145
- **Hotels A and B:** select-service, within 2 miles, ADR $138–152
- **Hotel C:** extended-stay, 1 mile, ADR $120, average stay 20 nights
- **Hotel D:** economy motel, 1 mile, ADR $70
- **Hotel E:** full-service convention hotel, 1 mile, 400 keys, ADR $230
- **Operator's proposed set:** C and D plus one of A or B

**Q: How should you respond to the proposed comp set?**

- ✅ **Reject it. The set should be the hotels that compete for the same guest at a similar rate, which means A and B plus other nearby select-service properties. An index against weaker hotels measures nothing.**
  - RevPAR index is only useful against true substitutes. Adding an economy motel and a long-stay product guarantees a score above 100 and hides whether the hotel is winning or losing its fair share.
- ◻️ **Accept it. All three hotels are within a mile or two, and proximity defines competition.**
  - Proximity is necessary but not sufficient. A $70 motel and a $145 select-service hotel are not serving the same booking.
- ◻️ **Add Hotel E instead. Benchmarking against the best hotel nearby pushes the operator hardest.**
  - A 400-key convention hotel sells group business and meeting space the subject cannot offer. The index would sit below 100 for structural reasons and be just as uninformative.
- ◻️ **Accept it. A higher index helps with the lender and the next appraisal.**
  - Lenders and appraisers review the comp set too, and a flattering set costs credibility. The index exists to manage the operator.

**Takeaway.** A comp set defines what "fair share" means. Pick it by guest
type, rate tier, and location, and be suspicious when a change in the set
improves the score.

- RevPAR index = subject RevPAR ÷ comp set RevPAR × 100.
- Match on chain scale and rate tier before distance.
- An operator choosing its own benchmark has a conflict of interest.

---

## 9. PSA estoppel condition — is the buyer obligated to close?

*document-literacy (psa) · intermediate · retail · acquisitions* — proposed id `psa-estoppel-condition`

**Document excerpt** — *Purchase & Sale Agreement, Section 8.2 (Tenant Estoppels)*

```
(a) Estoppel Requirement. It shall be a condition to Purchaser's
    obligation to close that Seller deliver, not less than three (3)
    Business Days prior to Closing, estoppel certificates from (i) each
    Major Tenant (any tenant leasing more than 10,000 square feet) and
    (ii) other tenants leasing, in the aggregate, not less than
    seventy-five percent (75%) of the remaining leased area of the
    Property (the "Required Estoppels").

(b) Seller Estoppels. Seller may, at its option, satisfy up to ten
    percent (10%) of the requirement in clause (a)(ii) by delivering its
    own certificate as to such leases. No Seller certificate may be
    substituted for a Major Tenant.

(c) Non-Conforming Estoppels. An estoppel shall not count toward the
    Required Estoppels if it discloses a landlord default, an unpaid
    landlord obligation, or economic terms inconsistent with the Rent
    Roll (a "Material Discrepancy"), unless Seller cures the same or
    Purchaser waives it in writing. If the Required Estoppels are not
    delivered, Purchaser may (x) waive the condition and close, or
    (y) terminate this Agreement and receive a return of the Deposit.
```

**Scenario.** Three business days before closing, the seller has delivered
clean estoppels from every Major Tenant and from small tenants covering 68% of
the remaining leased area. One of those small-tenant estoppels, covering 4% of
the area, states that the landlord still owes an $85,000 TI allowance. The
seller says it will "paper the rest with seller estoppels" and expects you to
close.

- **Major Tenant estoppels:** all delivered, clean
- **Small-tenant estoppels delivered:** 68% of remaining leased area
- **Of which non-conforming:** 4% (unpaid $85,000 TI allowance)
- **Required:** 75%
- **Seller estoppel cap:** 10%

**Q: Where does the buyer stand?**

- ✅ **The condition is not yet met. Only 64% conforms, the seller can add at most 10%, and that reaches 74%. The seller has to cure the TI claim or get more tenant estoppels; otherwise the buyer can waive and close or terminate and take back the deposit.**
  - The estoppel with the unpaid allowance is a Material Discrepancy and does not count: 68% − 4% = 64%. Seller estoppels are capped at 10%, so 74% falls short of 75%. In practice this is leverage for an $85,000 credit, not a reason to walk.
- ◻️ **The condition is met. 68% plus 10% of seller estoppels is 78%.**
  - Counts the non-conforming estoppel. Clause (c) removes it from the total until it is cured or waived.
- ◻️ **The condition fails outright. Seller estoppels are not allowed once a tenant has alleged a default.**
  - Nothing in the clause says that. Seller estoppels are still available up to the cap; the cap simply is not enough here.
- ◻️ **The buyer must close. The Major Tenants delivered, and they are what matter.**
  - Clause (a) has two tests joined by "and." Satisfying the Major Tenant test does not satisfy the 75% test.

**Takeaway.** Estoppel conditions are arithmetic. Count only conforming
certificates, apply the seller-estoppel cap, and treat any discrepancy with the
rent roll as both a diligence finding and negotiating leverage.

- Read the threshold, the seller-estoppel cap, and the definition of a conforming estoppel together.
- An estoppel that contradicts the rent roll is a diligence result, not a formality.
- A failed condition gives the buyer an option to waive or terminate; price the waiver.

---

## 10. The OM says "6.0% cap" — on what?

*document-literacy (om) · beginner · multifamily · acquisitions* — proposed id `om-cap-rate-basis`

**Document excerpt** — *Offering Memorandum, Financial Summary*

```
PRICING GUIDANCE                         $43,500,000  ($181,250 / unit)
YEAR 1 PRO FORMA CAP RATE                6.0%

                              IN-PLACE (1)      YEAR 1 PRO FORMA (2)
Effective Gross Income        $3,940,000        $4,480,000
Operating Expenses            $1,790,000        $1,870,000
Net Operating Income          $2,150,000        $2,610,000

(1) T-3 income annualized; T-12 expenses. Real estate taxes at
    current assessment.
(2) Assumes all 240 units achieve post-renovation rents of $1,675.
    86 units renovated to date.
```

**Scenario.** A junior analyst drops this deal into the pipeline tracker as
"240 units, $43.5M, 6.0% cap" and notes that it clears the fund's 5.75% minimum
going-in cap.

- **Guidance price:** $43,500,000
- **In-place NOI:** $2,150,000
- **Year 1 pro forma NOI:** $2,610,000
- **Units renovated:** 86 of 240
- **Fund minimum going-in cap:** 5.75%

**Q: What going-in cap rate is the buyer actually paying?**

- ✅ **About 4.9%. The 6.0% is on pro forma NOI that assumes 154 more renovations the buyer still has to fund and execute.**
  - $2,150,000 ÷ $43,500,000 = 4.94%. The deal does not clear a 5.75% in-place threshold. Even the in-place number is flattering: it pairs the most recent three months of income with trailing-twelve expenses, and taxes have not been reset to the purchase price.
- ◻️ **6.0%. Year 1 NOI is the standard denominator for a going-in cap.**
  - Forward NOI is a common convention for a stabilized asset. Here "Year 1" includes rents that do not exist yet on 64% of the units.
- ◻️ **About 5.5%. Split the difference, since part of the renovation is done.**
  - There is no basis for a blend. Price the in-place income, then underwrite the renovation upside and its cost separately.
- ◻️ **It cannot be determined without the full T-12.**
  - The T-12 would sharpen it, but the OM already gives in-place NOI and a price. The headline cap can be tested with what is on the page.

**Takeaway.** A cap rate means nothing until you know which NOI is in the
numerator. Recompute it yourself on in-place income before comparing a deal to
any threshold or comp.

- Always ask: in-place, T-12, or pro forma?
- Read the footnotes; that is where the period mismatches and assumptions sit.
- Pro forma upside is something you pay to create, so don't also pay the seller for it.
