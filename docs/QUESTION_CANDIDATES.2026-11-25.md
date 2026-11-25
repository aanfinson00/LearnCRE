# Question candidates — 2026-11-25

Ten candidate situational cases for the thinnest parts of the question bank. These are **proposals for review, not shipped content** — nothing here is registered in `src/quiz/situational/index.ts`. Mark each one keep / edit / drop; the kept ones can be turned into `SituationalCase` files as-is (fields below map one-to-one onto the type).

## Where the bank is thin

Counted from the 71 shipped situational cases (`src/content/catalogIndex.ts` + the case files). The Supabase `learncre` project is paused, so community-submission approval counts could not be read; "approved" here means shipped in the repo.

| Category | Shipped | Candidates below |
|---|---|---|
| deal-process | 21 | — |
| document-literacy | 13 | — |
| investment-thesis | 9 | — |
| pricing / diagnostic / risk | 7 each | — |
| comp-selection | 2 | +2 |
| lease-econ | 2 | +3 |
| sensitivity | 2 | +2 |
| absorption | 1 | +3 |

Cross-cutting gaps the candidates also lean into:

- **Difficulty:** only 4 of 71 cases are beginner (34 advanced, 33 intermediate). Four candidates are beginner.
- **Asset class:** hotel 1, retail 2, industrial 3 (vs. multifamily 11, office 9). Candidates add hotel ×1, retail ×2, industrial ×2.
- **Role:** development is tagged on 9 cases (vs. acquisitions 40). Three candidates carry it.

---

## Absorption

### 1. The broker says 900,000 SF was absorbed
*Proposed id `net-vs-gross-absorption` · absorption · beginner · office · acquisitions, development*

A leasing broker's quarterly report leads with "900,000 SF of absorption" in a 20M SF office submarket. Reading further, 900,000 SF is the total of new leases signed. Over the same quarter, tenants vacated 650,000 SF. Vacancy started the quarter at 8.0% and there were no new deliveries.

- **Inventory:** 20,000,000 SF
- **Starting vacancy:** 8.0% (1,600,000 SF)
- **New leases signed:** 900,000 SF
- **Move-outs:** 650,000 SF
- **New deliveries:** none

**Q: What is the absorption figure you should underwrite to, and where does vacancy end the quarter?**

- ✅ **A.** Net absorption of 250,000 SF; vacancy ends near 6.75%.
  - Net absorption is the change in occupied space: 900,000 leased − 650,000 vacated = 250,000 SF. Vacant space falls from 1,600,000 to 1,350,000 SF, or 6.75% of 20M. The 900,000 figure is gross leasing activity, which measures how busy brokers were, not how much the market tightened.
- ◻️ **B.** 900,000 SF; vacancy ends near 3.5%.
  - Takes the headline at face value. If 900,000 SF had been absorbed net, vacant space would have fallen to 700,000 SF (3.5%). That ignores the 650,000 SF handed back in the same quarter.
- ◻️ **C.** 650,000 SF; vacancy ends near 4.75%.
  - Uses move-outs as if they were absorption. Move-outs are the subtraction, not the result.
- ◻️ **D.** 1,550,000 SF; vacancy ends near 0.25%.
  - Adds leasing and move-outs together. The two flows run in opposite directions and have to be netted.

**Takeaway:** Net absorption is the change in occupied space; gross absorption is leasing volume. Only the net figure moves vacancy, so always ask which one a market report is quoting.

**Tips:**
- Net absorption = move-ins − move-outs over the period.
- Sanity-check any absorption figure against the change in vacancy.
- High gross with low net means tenants are shuffling, not growing.

---

### 2. The lease-up is running behind the reserve
*Proposed id `lease-up-pace-vs-reserve` · absorption · intermediate · multifamily · development, assetManagement*

You are four months past opening on a 300-unit multifamily development. The pro forma assumed 42 units pre-leased at opening and 25 net leases a month after that, reaching 94% stabilized occupancy. The pre-leasing landed, but the first four months have averaged 16 net leases a month. The construction loan's interest reserve was sized to cover 12 months after opening.

- **Units:** 300
- **Stabilized target:** 94% (282 units)
- **Leased at opening:** 42
- **Pro forma pace:** 25 units/month
- **Actual pace, months 1–4:** 16 units/month
- **Interest reserve:** 12 months post-opening

**Q: What do you report on stabilization timing?**

- ✅ **A.** Stabilization is tracking to about month 15, roughly three months past the interest reserve, so the shortfall needs to be raised now.
  - Leased today: 42 + (4 × 16) = 106. Remaining to 282: 176 units. At 16 a month that is 11 more months, landing at month 15 against a 12-month reserve. Raising it at month 4 leaves time to test concessions, check whether the slow start is seasonal, and line up a reserve top-up before the lender asks.
- ◻️ **B.** Still on plan: 240 units at 25 a month is under 10 months.
  - Restates the pro forma. Four months of actuals at 16 a month are the best evidence available, and the plan pace has not been hit once.
- ◻️ **C.** About month 11, inside the reserve, since 176 ÷ 16 = 11.
  - The arithmetic is right but the clock is wrong. Eleven months is the time remaining from today, and four months have already elapsed.
- ◻️ **D.** About month 13, using the midpoint of plan and actual pace.
  - Averaging a forecast with actuals has no basis. If you believe pace will recover, say why and model that, rather than splitting the difference.

**Takeaway:** Re-forecast a lease-up from actual pace and from today's date. The useful number is the gap between the new stabilization date and whatever is funding the carry.

**Tips:**
- Remaining units ÷ trailing pace gives months from today, not from opening.
- Compare the re-forecast to the reserve, not to the pro forma.
- A slow first quarter may be seasonal; check the opening month before extrapolating.

---

### 3. Strong absorption, rising vacancy
*Proposed id `absorption-vs-supply-pipeline` · absorption · intermediate · industrial · acquisitions, mortgageUw*

An industrial submarket has 50M SF of inventory at 5.0% vacancy. Trailing twelve-month net absorption is a healthy 2.4M SF. The sponsor's memo cites that absorption to support 4% annual rent growth. The delivery pipeline shows 4.0M SF of speculative product completing over the next twelve months.

- **Inventory:** 50,000,000 SF
- **Vacancy today:** 5.0% (2,500,000 SF)
- **Trailing net absorption:** 2,400,000 SF/yr
- **Deliveries, next 12 months:** 4,000,000 SF (speculative)
- **Sponsor rent growth:** 4.0%/yr

**Q: If absorption holds at its trailing pace, where is vacancy in a year, and what does that mean for the rent growth assumption?**

- ✅ **A.** Vacancy rises to about 7.6%, so the rent growth assumption needs to come down despite the strong absorption.
  - Vacant space in a year: 2.5M + 4.0M delivered − 2.4M absorbed = 4.1M SF, on a new base of 54M SF, or about 7.6%. Demand is strong but supply is stronger. New speculative buildings will compete on concessions, which argues for flatter rents and longer downtime in the near-term years.
- ◻️ **B.** Vacancy falls to about 0.2%, which supports the 4% growth.
  - Subtracts absorption from today's vacancy and ignores the pipeline entirely. This is the calculation the sponsor's memo is implicitly making.
- ◻️ **C.** Vacancy rises to about 8.2%.
  - Gets the 4.1M SF of vacant space right but divides by the old 50M SF base. Deliveries add to the denominator too.
- ◻️ **D.** Vacancy holds near 5%, since developers only build what the market can absorb.
  - Speculative supply is built on a forecast, not on signed leases. The pipeline exceeds trailing absorption by 1.6M SF, and nothing in the data says demand will rise to meet it.

**Takeaway:** Absorption only tells you about demand. Vacancy and rent growth depend on absorption net of deliveries, so read the pipeline before trusting a demand story.

**Tips:**
- Future vacant SF = current vacant + deliveries − net absorption.
- Add deliveries to the inventory base before computing the rate.
- Deliveries above trailing absorption mean vacancy rises even in a good market.

---

## Comp selection

### 4. Five retail comps, one cap rate
*Proposed id `retail-comp-anchor-type` · comp-selection · intermediate · retail · acquisitions*

You are pricing a grocery-anchored neighborhood center. The broker's comp sheet lists five recent retail sales and concludes at the 6.9% average. The five are different kinds of retail.

- **Comp 1:** grocery-anchored center, same trade area: 6.50%
- **Comp 2:** grocery-anchored center, adjacent submarket: 6.75%
- **Comp 3:** unanchored strip center, same trade area: 7.75%
- **Comp 4:** single-tenant NNN pharmacy, 15-year lease: 5.50%
- **Comp 5:** power center, same metro: 8.00%
- **Broker's conclusion:** 6.9% (simple average)

**Q: How should you build the comp set?**

- ✅ **A.** Anchor on Comps 1 and 2, adjusting Comp 2 for location, and treat the other three as context rather than evidence.
  - The two grocery-anchored sales share the subject's tenancy and risk profile and point to roughly 6.5–6.75%. The pharmacy trades like a bond on a long single-tenant lease, the unanchored strip lacks the traffic driver, and the power center carries big-box rollover risk. The 6.9% average sits 15–40 bps wide of the like-kind evidence, and it lands that close only because the pharmacy and the power center happen to offset each other.
- ◻️ **B.** Use the 6.9% average, since more comps give a more reliable number.
  - More comps help only when they are comparable. Averaging across retail formats blends different risks into a figure that describes none of them.
- ◻️ **C.** Use Comp 1 alone, since it is the only same-format sale in the trade area.
  - The instinct to prioritize it is right, but a single sale can carry deal-specific noise. Comp 2 is the same format nearby and is worth keeping with a location adjustment.
- ◻️ **D.** Use Comp 4's 5.50%, since the grocer is also a credit tenant.
  - A grocer anchors a multi-tenant center with shop-space rollover; it is not a single-tenant net lease. Pricing the whole center at a net-lease cap would overpay materially.

**Takeaway:** Comparability is about the income stream's risk, not the property-type label. Within retail, anchor type and tenancy structure matter more than proximity.

**Tips:**
- Sort comps by format before you look at their cap rates.
- Two good comps beat five mixed ones.
- If an average looks plausible, check whether the outliers are just offsetting.

---

### 5. Price per key, with one comp that doesn't belong
*Proposed id `hotel-comp-service-level` · comp-selection · beginner · hotel · acquisitions, mortgageUw*

A 140-key select-service hotel is being offered. The broker supports pricing with four recent sales averaging $173,000 per key, implying about $24.2M. Three of the four are select-service hotels. The fourth is a 300-key full-service convention hotel with restaurants and meeting space.

- **Subject:** 140 keys, select-service
- **Comp 1 (select-service):** $135,000/key
- **Comp 2 (select-service):** $142,000/key
- **Comp 3 (select-service):** $150,000/key
- **Comp 4 (full-service, 300 keys):** $265,000/key
- **Broker's average:** $173,000/key (≈ $24.2M)

**Q: How should you treat the comp set?**

- ✅ **A.** Drop the full-service sale; the three select-service comps imply roughly $135,000–150,000 per key, or about $19–21M.
  - A full-service hotel earns food, beverage and group revenue on top of rooms and has a different cost structure, so its per-key price is not evidence for a select-service asset. The three like-kind comps average about $142,000, which is $19.9M on 140 keys. One outlier moved the broker's figure by more than $4M.
- ◻️ **B.** Accept the $173,000 average, since all four are hotels in the same market.
  - Same market is necessary but not sufficient. Service level changes what a key earns and therefore what it is worth.
- ◻️ **C.** Keep all four but weight by key count.
  - This makes it worse. The 300-key full-service hotel would dominate the weighting and pull the figure further from the subject.
- ◻️ **D.** Use only Comp 4, since it is the largest and most reliable transaction.
  - Deal size says nothing about comparability. This would price a select-service hotel as a convention hotel.

**Takeaway:** Per-unit comps are only meaningful across assets that earn revenue the same way. In hotels, match service level before comparing price per key.

**Tips:**
- Check service level, brand tier and RevPAR before using a per-key comp.
- Recompute the average without the outlier to see how much it was moving.
- State the comp-implied value as a range, not a point.

---

## Lease economics

### 6. Higher face rent or the better deal?
*Proposed id `face-vs-net-effective-rent` · lease-econ · beginner · office · assetManagement, acquisitions*

Two tenants want the same 10,000 SF office suite on a five-year lease with flat rent. Tenant A offers $40/SF but wants six months free and a $50/SF improvement allowance. Tenant B offers $36/SF with no free rent and a $20/SF allowance. Leasing commissions are the same on both.

- **Suite:** 10,000 SF, 5-year term, flat rent
- **Tenant A:** $40.00/SF, 6 months free, $50/SF TI
- **Tenant B:** $36.00/SF, no free rent, $20/SF TI
- **Commissions:** equal

**Q: Which proposal is worth more to the landlord on a simple net effective basis?**

- ✅ **A.** Tenant B, at about $32/SF per year against about $26/SF for Tenant A.
  - Tenant A: $40 × 4.5 years = $180, less $50 TI = $130, or $26.00 a year. Tenant B: $36 × 5 = $180, less $20 TI = $160, or $32.00 a year. Both pay the same $180 of total rent, so the whole difference is the $30/SF of extra capital A requires, and A's cash also arrives later.
- ◻️ **B.** Tenant A, because the $40 face rent is what shows up in the rent roll and drives value.
  - Face rent does flatter a rent roll, and that is worth knowing at sale. But a buyer who underwrites properly will look through to concessions, and the landlord is out $300,000 of extra TI on day one.
- ◻️ **C.** They are equivalent, since both pay $180/SF over the term.
  - Total rent is equal, but concessions are not. Net effective rent exists to capture exactly this difference.
- ◻️ **D.** Tenant A, because the improvements stay with the building.
  - Tenant-specific build-out rarely carries full value to the next tenant. Treat TI as a cost unless there is a clear reason it will be reused.

**Takeaway:** Compare lease proposals on net effective rent, not face rent. Free rent and TI are both price cuts, just paid in different forms.

**Tips:**
- Simple NER = (total rent − free rent − TI − commissions) ÷ term.
- Equal total rent with different concessions is not an equal deal.
- When cash timing differs a lot, discount the two streams instead of using the simple version.

---

### 7. The breakpoint that didn't move
*Proposed id `percentage-rent-breakpoint-reset` · lease-econ · intermediate · retail · assetManagement*

A restaurant tenant pays $240,000 of base rent plus 6% of sales above a $4.0M breakpoint. Sales are running at $4.6M. At renewal the tenant asks to cut base rent to $210,000 and proposes leaving "everything else in the lease unchanged."

- **Current base rent:** $240,000/yr
- **Percentage rent:** 6% over breakpoint
- **Current breakpoint:** $4,000,000 (natural)
- **Sales:** $4,600,000
- **Proposed base rent:** $210,000/yr

**Q: How do you evaluate the request?**

- ✅ **A.** Leaving the breakpoint at $4.0M makes it a straight $30,000 cut; if base rent drops, the breakpoint should reset to its natural level of $3.5M.
  - Today the landlord collects $240,000 + 6% × $600,000 = $276,000. At $210,000 base with the old breakpoint: $210,000 + $36,000 = $246,000. With the breakpoint reset to $210,000 ÷ 6% = $3.5M: $210,000 + 6% × $1.1M = $276,000. The reset keeps total rent whole at current sales, though it still converts $30,000 from fixed to sales-dependent income, which lenders and buyers will discount.
- ◻️ **B.** Accept as proposed; percentage rent will make up the difference as sales grow.
  - With the breakpoint unchanged, percentage rent is identical before and after. Nothing makes up the $30,000 at any sales level.
- ◻️ **C.** Reject outright; base rent should never go down at renewal.
  - A blanket rule ignores the tenant's occupancy cost and the cost of a vacancy. A restructure that keeps total rent whole can be worth doing.
- ◻️ **D.** Accept, but raise the percentage to 7% over the same $4.0M breakpoint.
  - That adds only 1% × $600,000 = $6,000, recovering a fifth of the cut. It sounds like a trade but is not close to one.

**Takeaway:** The natural breakpoint is base rent divided by the percentage rate. Change base rent without moving the breakpoint and you have changed the deal, usually in the tenant's favor.

**Tips:**
- Natural breakpoint = base rent ÷ percentage rate.
- Recompute total rent at current sales under every proposal.
- Percentage rent is worth less than base rent to a lender or buyer.

---

### 8. Renew at $9 or re-lease at $10?
*Proposed id `renewal-vs-relet-economics` · lease-econ · intermediate · industrial · assetManagement, acquisitions*

A 100,000 SF industrial tenant's lease is expiring. They will renew for five years at $9.00/SF NNN with a modest allowance. Your leasing broker believes a new tenant would pay $10.00/SF on a five-year lease, after about six months of downtime and a market concession package. While vacant, you carry roughly $3.00/SF a year of taxes, insurance and maintenance.

- **Renewal:** $9.00/SF, $2/SF TI, 2% commission, no downtime
- **New lease:** $10.00/SF, $8/SF TI, 6% commission, 6 months downtime
- **Carry while vacant:** $3.00/SF/yr
- **Comparison window:** next 5 years

**Q: Which path is worth more over the next five years, per square foot?**

- ✅ **A.** The renewal, at about $42 net against about $33 for the new lease.
  - Renewal: $45.00 rent − $2.00 TI − $0.90 commission = $42.10. New lease: 4.5 years of rent in the window is $45.00, less $8.00 TI, $3.00 commission on the full lease, and $1.50 of carry = $32.50. The $1 of extra face rent is more than consumed by downtime and re-leasing costs. The new lease does leave a higher in-place rent at the end of the window, which matters if a sale is near, but it has to be worth almost $10/SF to close the gap.
- ◻️ **B.** The new lease, because $10 is 11% more rent.
  - Compares face rents only. Over this window both paths collect the same $45 of rent, and the new lease costs far more to get.
- ◻️ **C.** Roughly a wash, since both collect about $45 of rent.
  - Rent collected is equal, but TI, commissions and carry differ by nearly $10/SF.
- ◻️ **D.** The new lease, because the broker's $10 rent proves the renewal is below market.
  - A broker's estimate is not a signed lease, and the downtime could run longer than six months. The renewal is certain; the alternative is a forecast.

**Takeaway:** A renewal a little below market usually beats a new lease at market once downtime, TI, commissions and carry are counted. Compare the two over the same window, net of all costs.

**Tips:**
- Put both paths on the same time window before comparing.
- Vacant NNN space still costs you the expenses the tenant was paying.
- Ask what in-place rent is worth at exit before dismissing the higher face rate.

---

## Sensitivity

### 9. Which hurts more: 50 bps of cap rate or 5% of NOI?
*Proposed id `cap-vs-noi-sensitivity` · sensitivity · beginner · multifamily · acquisitions*

A multifamily asset has $2.0M of NOI and is valued at a 5.0% cap rate. Your associate is stress-testing the exit and asks which downside matters more: the cap rate moving out 50 bps, or NOI coming in 5% short.

- **NOI:** $2,000,000
- **Cap rate:** 5.0%
- **Base value:** $40,000,000
- **Downside 1:** cap rate +50 bps
- **Downside 2:** NOI −5%

**Q: Which downside takes more off the value?**

- ✅ **A.** The cap rate move, at about −9% against −5% for the NOI miss.
  - At 5.5%, value is $2.0M ÷ 0.055 = $36.4M, down 9.1%. With NOI 5% lower, value is $1.9M ÷ 0.05 = $38.0M, down 5%. Value moves one-for-one with NOI but inversely with cap rate, and 50 bps is a tenth of a 5.0% cap. The same 50 bps on an 8.0% cap would cost only about 6%.
- ◻️ **B.** The NOI miss, because it is a real loss of income while cap rates are just sentiment.
  - Both flow straight into the sale price. Whatever the cause, a buyer paying a 5.5% cap writes a smaller check.
- ◻️ **C.** They are about the same, since both are roughly a 5% change.
  - Fifty basis points is half a percentage point, but it is a 10% change in the cap rate itself.
- ◻️ **D.** The cap rate move is negligible, about −0.5%.
  - Confuses the change in the rate with the change in value. Value depends on the proportional change in the cap rate, not the absolute one.

**Takeaway:** Value is proportional to NOI and inversely proportional to cap rate. The lower the going-in cap, the more each basis point of expansion costs.

**Tips:**
- Value change from a cap move ≈ −(change in cap ÷ new cap).
- Low-cap assets are the most exposed to cap rate expansion.
- Stress the exit cap before you stress NOI on a core deal.

---

### 10. Which shock breaks the refinance?
*Proposed id `refi-binding-constraint-sensitivity` · sensitivity · advanced · office · mortgageUw, assetManagement, portfolioMgmt*

A $29.0M loan matures next year on an office asset producing $3.0M of NOI. The takeout lender sizes to the lowest of three tests. Today the asset clears with about $1M of room. You have time to run one downside case properly before the lender call and need to pick which variable to stress.

- **NOI:** $3,000,000
- **Existing balance:** $29,000,000
- **LTV test:** 65% at a 6.50% cap → $30.0M
- **DSCR test:** 1.25× at 6.75%, 30-year amortization → $30.8M
- **Debt yield test:** 9.5% → $31.6M
- **Candidate shocks:** cap +50 bps, rate +75 bps, NOI −5%

**Q: Which single shock produces the largest refinancing shortfall?**

- ✅ **A.** The cap rate shock: proceeds fall to about $27.9M, a shortfall of roughly $1.1M.
  - LTV is the binding test today, so the valuation cap is the most exposed input. At a 7.0% cap, value is $42.9M and 65% of it is $27.9M. The rate shock lifts the loan constant from about 7.78% to 8.39% and cuts DSCR proceeds to $28.6M, a $0.4M shortfall. The NOI shock lowers all three tests, and LTV still binds at $28.5M, a $0.5M shortfall. All three break the refinance, but the cap move breaks it worst.
- ◻️ **B.** The rate shock, because debt service is what lenders care about most.
  - The rate shock does flip the binding test from LTV to DSCR, which is worth noting. But DSCR started with more cushion, so proceeds fall less than under the cap shock.
- ◻️ **C.** The NOI shock, because it is the only one that hits all three tests.
  - It does hit all three, but each by only 5%. Breadth is not the same as depth; the binding test falls to $28.5M.
- ◻️ **D.** None of them; the loan clears with $1M of room today.
  - Every one of the three shocks takes proceeds below the $29.0M balance. A $1M cushion on a $30M sizing is about 3%.

**Takeaway:** Find the binding constraint first, then stress the input that drives it. A shock can also change which test binds, so re-run all three tests under each case rather than only the one that binds today.

**Tips:**
- Size to each test separately and take the minimum.
- The test with the least cushion tells you which variable to worry about.
- Re-check which test binds after every shock.
