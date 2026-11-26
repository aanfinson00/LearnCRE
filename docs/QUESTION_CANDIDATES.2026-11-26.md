# Question candidates — 2026-11-26

Ten candidate situational cases for the thinnest parts of the question bank. These are **proposals for review, not shipped content**: nothing here is registered in `src/quiz/situational/index.ts`. Mark each one keep / edit / drop. The fields map one-to-one onto `SituationalCase`, so a kept candidate can be turned into a case file as written.

## Where the bank is thin

Counted from the 72 situational case files in `src/quiz/situational/`. The Supabase `learncre` project is paused, so community-submission approval counts could not be read; "approved" here means shipped in the repo.

| Category | Shipped | Candidates below |
|---|---|---|
| deal-process | 21 | none |
| document-literacy | 13 | none |
| investment-thesis | 9 | none |
| pricing / diagnostic / risk | 7 each | none |
| comp-selection | 2 | +2 |
| lease-econ | 2 | +3 |
| sensitivity | 2 | +2 |
| absorption | 1 | +3 |

Secondary gaps the candidates lean into:

- **Difficulty:** 4 of 72 cases are beginner (34 advanced, 33 intermediate). Three candidates are beginner.
- **Asset class:** hotel 1, retail 2, industrial 3 (multifamily 11, office 9). Candidates add retail ×2 and industrial ×3.
- **Role:** development is tagged on 9 cases (acquisitions 40). Three candidates carry it.

## Read this before reviewing: the backlog

These four categories have been the thinnest on every run since July, because no earlier batch has been merged or shipped. About 80 earlier candidate docs sit on separate unmerged `claude/upbeat-meitner-*` branches, and they repeat each other heavily: net effective rent, percentage-rent breakpoints, gross vs. net absorption, the 50 bps exit-cap shock and the DSCR rate shock each appear roughly ten times.

Today's ten were checked against the titles in all of those docs and each takes an angle none of them covers. The closest earlier neighbours are noted under each candidate so overlaps are easy to judge.

---

## Absorption

### 1. Which submarket has the stronger demand?
*Proposed id `absorption-rate-vs-inventory` · absorption · beginner · retail · acquisitions, portfolioMgmt*

You are comparing two retail submarkets for a shop-space acquisition. A broker pitches Submarket A as having "more than twice the demand" because it absorbed 450,000 SF over the last twelve months against 200,000 SF in Submarket B. Both sit at 6.0% vacancy and neither has meaningful construction under way.

- **Submarket A inventory:** 30,000,000 SF
- **Submarket A net absorption (12 mo):** 450,000 SF
- **Submarket B inventory:** 5,000,000 SF
- **Submarket B net absorption (12 mo):** 200,000 SF
- **Vacancy, both:** 6.0%

**Q: Which submarket is showing stronger demand, and how do you know?**

- ✅ **A.** Submarket B. It absorbed 4.0% of its inventory against 1.5% in A, and its vacant space clears in about 1.5 years against 4 years in A.
  - Absorption has to be scaled to the size of the market. A: 450,000 ÷ 30M = 1.5%. B: 200,000 ÷ 5M = 4.0%. Vacant space tells the same story: A has 1.8M SF vacant, four years at its pace; B has 300,000 SF vacant, eighteen months at its pace. B is tightening almost three times as fast.
- ◻️ **B.** Submarket A. 450,000 SF is more than twice 200,000 SF.
  - Compares raw square feet across markets of different sizes. A is six times larger than B, so it should absorb far more just to keep pace.
- ◻️ **C.** They are equal, because both are 6.0% vacant.
  - Vacancy is a snapshot. Absorption is the direction of travel, and the two markets are moving at very different speeds from the same starting point.
- ◻️ **D.** You cannot tell without rent growth figures.
  - Rent growth would add to the picture, but the data given already answers the question. Rents usually follow the tightening that absorption measures.

**Takeaway:** Raw absorption mostly tells you how big a market is. Divide it by inventory, or divide vacant space by it, before comparing two markets.

**Tips:**
- Absorption rate = net absorption ÷ inventory.
- Years of vacant supply = vacant SF ÷ annual net absorption.
- A broker quoting raw SF across markets is usually flattering the bigger one.

*Closest earlier neighbour: "How many years of supply is this submarket carrying?" (single market, no cross-market comparison).*

---

### 2. The lease-up slows down in month 13
*Proposed id `lease-up-first-expirations` · absorption · intermediate · multifamily · development, assetManagement*

A 300-unit multifamily lease-up has run exactly to plan: 20 move-ins a month for twelve months, all on 12-month leases, for 240 occupied units. The model keeps adding 20 units a month until the 95% stabilization target. Starting next month, the first leases begin to expire. Comparable lease-ups in the submarket are renewing about half of their first-generation tenants.

- **Units:** 300
- **Stabilization target:** 95% (285 units)
- **Occupied at month 12:** 240
- **New leases signed:** 20/month
- **Leases expiring from month 13:** 20/month
- **Expected renewal rate:** 50%

**Q: When does the property reach 285 occupied units?**

- ✅ **A.** Around month 17, about two months later than the model.
  - From month 13 the building loses about 10 households a month (20 expirations × 50% that leave) while signing 20 new leases, so the net gain is 10 a month. The remaining 45 units take 4.5 months, landing in the middle of month 17. The model's 20 a month would get there in 2.25 months, early in month 15.
- ◻️ **B.** Early in month 15, as modeled: 45 units at 20 a month.
  - Treats gross leasing as net. That was true while no leases were expiring and stops being true in month 13.
- ◻️ **C.** It stalls at 240, because 20 expirations cancel 20 new leases.
  - Assumes every expiring tenant moves out. With half renewing, only 10 units a month come back to the leasing team.
- ◻️ **D.** Around month 14, because renewals add to the leasing count.
  - A renewal keeps a unit occupied; it does not fill a vacant one. Counting renewals as absorption double-counts units that were already in the 240.

**Takeaway:** A lease-up that runs longer than its first lease term has to re-lease its early units while still filling its empty ones. Model move-outs from the month the first leases expire.

**Tips:**
- Net pace = new leases − (expirations × (1 − renewal rate)).
- First-generation renewals are often weak because opening concessions burn off.
- Ask whether a lease-up schedule is gross or net once it passes month 12.

*Closest earlier neighbours: "Lease-up is running at 12 a month, not 20" and "The lease-up is running behind the reserve" (both re-forecast a slow pace; neither involves expirations).*

---

### 3. How much of the absorption was build-to-suit?
*Proposed id `absorption-build-to-suit-share` · absorption · intermediate · industrial · development, acquisitions*

A developer's memo for a speculative warehouse says the submarket "absorbed 3.2M SF last year against a 2.4M SF pipeline, so supply clears in nine months." Reading the market report, 2.0M SF of that absorption was two build-to-suit facilities that delivered fully occupied by the companies that commissioned them. The entire 2.4M SF pipeline is speculative and unleased.

- **Inventory:** 80,000,000 SF
- **Vacancy:** 5.0% (4,000,000 SF)
- **Net absorption (12 mo):** 3,200,000 SF
- **Of which build-to-suit deliveries:** 2,000,000 SF
- **Speculative pipeline, unleased:** 2,400,000 SF

**Q: What absorption pace should the spec deal be underwritten against?**

- ✅ **A.** About 1.2M SF a year, which makes the pipeline two years of demand for available space.
  - A build-to-suit adds a building and its tenant on the same day, so it counts as absorption without taking any space off the market. Strip it out: 3.2M − 2.0M = 1.2M SF of tenants leasing space that was available. Against that pace, the 2.4M SF pipeline alone is two years, and the 4.0M SF already vacant sits in front of it.
- ◻️ **B.** 3.2M SF a year. It is the reported net absorption figure.
  - The figure is correct as a market statistic. It answers a different question from the one a spec developer is asking, which is how fast empty buildings find tenants.
- ◻️ **C.** 2.0M SF a year, since build-to-suits show what large users really want.
  - Uses the wrong slice. Those users needed a building nobody had and built it, which says nothing about how quickly existing vacant boxes lease.
- ◻️ **D.** More than 3.2M SF a year, since build-to-suit activity signals deep demand for spec.
  - If anything it cuts the other way. Two large requirements have just been satisfied and are out of the tenant pool for a decade or more.

**Takeaway:** Build-to-suit deliveries raise net absorption without leasing any available space. For a spec deal, measure demand as absorption excluding build-to-suits.

**Tips:**
- Spec-relevant absorption = net absorption − pre-committed deliveries.
- Compare it to vacant space plus the unleased pipeline.
- Check the footnotes: most market reports break out build-to-suit deliveries.

*Closest earlier neighbours: "Months of supply with a half-leased pipeline" and "Does the pipeline matter if half is pre-leased?" (both adjust the supply side; this one adjusts the demand side).*

---

## Comp selection

### 4. The comp came with a 3.5% loan
*Proposed id `comp-assumable-debt` · comp-selection · advanced · multifamily · acquisitions, mortgageUw*

Your comp set for a multifamily acquisition has four trades between 5.3% and 5.4% and one at 4.8%. The 4.8% sale was a 200-unit property at $50.0M on $2.4M of NOI. The buyer assumed the seller's $30M loan at a fixed 3.5%, interest-only, with seven years remaining. New loans are pricing at 6.5%. Your deal will be financed with new debt.

- **Comp price:** $50,000,000 ($250,000/unit)
- **Comp NOI / cap rate:** $2,400,000 / 4.8%
- **Assumed loan:** $30,000,000 at 3.5%, 7 years interest-only
- **Market rate today:** 6.5%
- **Other four comps:** 5.3%–5.4%

**Q: How should this sale be used in the comp set?**

- ✅ **A.** Adjust it to a cash-equivalent price of about $45M, which is a 5.3% cap and in line with the others.
  - The assumed loan saves 3.0% × $30M = $900,000 a year for seven years. Discounted at 6.5% that is worth about $4.9M (annuity factor ≈ 5.48). The buyer paid roughly $45.1M for the real estate and $4.9M for the financing. $2.4M ÷ $45.1M ≈ 5.3%, or about $225,000 a unit.
- ◻️ **B.** Use 4.8% as reported. It is a closed, arm's-length sale.
  - The price is real, but part of it bought an asset your deal does not come with. Applying 4.8% to a property financed at 6.5% overpays by about the value of the loan.
- ◻️ **C.** Adjust the price down by $6.3M, the full seven years of interest savings.
  - Right idea, too large. $900,000 × 7 ignores that the savings arrive over seven years and need discounting. It would put the comp at about 5.5%, above the rest of the set.
- ◻️ **D.** Drop it. Financed sales cannot be compared with market-rate deals.
  - Loses a usable data point. Once adjusted, the sale confirms the 5.3%–5.4% range and makes the set five trades deep.

**Takeaway:** A sale with assumed below-market debt bundles real estate and financing in one price. Convert it to a cash-equivalent price before reading a cap rate or a price per unit from it.

**Tips:**
- Financing value ≈ PV of (market rate − loan rate) × balance over the remaining term.
- Cash-equivalent price = reported price − financing value.
- An outlier comp usually has a story; find it before averaging or discarding.

*Closest earlier neighbours: "The comp sold at $145,000 per key — what did the buyer really pay?" and the sale-leaseback / portfolio-premium comps (different non-real-estate components).*

---

### 5. Sixty thousand feet on nine acres
*Proposed id `comp-excess-land` · comp-selection · beginner · industrial · acquisitions*

You are pricing a 100,000 SF warehouse on 5 acres. The broker's comp sheet averages four recent sales to $141/SF. Three of them are warehouses on similar sites that traded at $118, $122 and $125/SF. The fourth is a 60,000 SF building on 9 acres that sold for $12.0M. Buildings in this market typically cover about 45% of their site, and paved industrial land trades near $750,000 an acre.

- **Subject:** 100,000 SF on 5 acres (46% coverage)
- **Comps 1–3:** $118, $122, $125/SF at ~45% coverage
- **Comp 4:** 60,000 SF on 9 acres, $12.0M ($200/SF)
- **Typical site coverage:** 45%
- **Industrial land value:** ~$750,000/acre

**Q: What price per SF does this comp set support for the subject?**

- ✅ **A.** About $120–125/SF. Comp 4 includes roughly six acres of excess land worth about $4.5M.
  - At 45% coverage a 60,000 SF building needs about 3 acres. The other 6 acres are extra yard, worth about $4.5M at $750,000 an acre. Take that out and the building traded for $7.5M, or $125/SF, right on top of the other three. The subject has no excess land, so it prices near $12.2M, not $14.1M.
- ◻️ **B.** $141/SF, the average of the four sales.
  - Averages in a price that is one-third land the subject does not have. That overstates value by about $1.9M.
- ◻️ **C.** About $200/SF, since Comp 4 shows what buyers will pay today.
  - Reads a land purchase as a building price. Nothing about the subject resembles a low-coverage site with surplus yard.
- ◻️ **D.** About $180/SF, taking Comp 4 with a discount because the subject is larger.
  - Size adjustments are real but small. The gap between $200 and $125 comes from the land, and a size discount does not address it.

**Takeaway:** Price per building SF only compares properties with similar site coverage. When a comp sits on far more land than its building needs, value the excess land separately and take it out.

**Tips:**
- Coverage = building SF ÷ site SF (43,560 SF per acre).
- Excess land = site acres − (building SF ÷ typical coverage ÷ 43,560).
- Low-coverage industrial sites often trade for their yard or outdoor storage value.

*Closest earlier neighbours: "Land comps are quoted per land SF — your deal is priced per buildable SF" (land deal) and "Do these industrial comps actually compare?" (building specs).*

---

## Lease economics

### 6. Two dollars cheaper and still losing deals
*Proposed id `load-factor-usable-rent` · lease-econ · beginner · office · assetManagement, acquisitions*

Your office building quotes $38.00/SF and keeps losing tenants to the building across the street at $40.00/SF. The leasing team is puzzled. Both rents are quoted per rentable SF. Your building has an older floor plate with a 20% add-on factor; the competitor's is 12%. The tenant you just lost needed 10,000 usable SF.

- **Your rent:** $38.00/RSF, 20% add-on factor
- **Competitor rent:** $40.00/RSF, 12% add-on factor
- **Tenant requirement:** 10,000 usable SF
- **Other terms:** comparable

**Q: Which building is cheaper for this tenant?**

- ✅ **A.** The competitor, by about $8,000 a year. On a usable basis you are $45.60/SF and they are $44.80/SF.
  - The tenant pays on rentable SF, which is usable SF plus a share of common areas. Yours: 10,000 × 1.20 = 12,000 RSF × $38 = $456,000. Theirs: 10,000 × 1.12 = 11,200 RSF × $40 = $448,000. The same 10,000 SF of working space costs more in your building despite the lower quoted rent.
- ◻️ **B.** Yours, by $20,000 a year: $2/SF on 10,000 SF.
  - Applies both rents to usable SF. Neither building bills that way.
- ◻️ **C.** Yours, by about 5%. The tenant must have preferred the other building's amenities.
  - Compares face rents and then looks for a non-price reason. The price explains it once the add-on factor is included.
- ◻️ **D.** You cannot compare them without knowing the TI packages.
  - Concessions matter, but the prompt holds other terms comparable. The difference in billed area is enough to answer.

**Takeaway:** Office rents are quoted per rentable SF, and tenants occupy usable SF. A lower face rent with a higher add-on factor can be the more expensive building.

**Tips:**
- Rentable SF = usable SF × (1 + add-on factor).
- Cost per usable SF = face rent × (1 + add-on factor).
- Compare competing buildings on total annual occupancy cost for the same usable area.

*Closest earlier neighbours: the many net-effective-rent candidates (concessions over time; none address rentable vs. usable area).*

---

### 7. The upside belongs to the grocer
*Proposed id `anchor-fixed-rate-options` · lease-econ · advanced · retail · acquisitions, portfolioMgmt*

An offering memorandum for a grocery-anchored center highlights "$385,000 of mark-to-market upside" when the anchor's primary term ends in four years: the grocer pays $9.00/SF against $16.00 market. The lease abstract shows the grocer holds six 5-year renewal options, each at a 5% increase over the prior rent. The store does $650/SF in sales and pays about $4.00/SF in NNN charges.

- **Anchor:** 55,000 SF at $9.00/SF NNN
- **Primary term remaining:** 4 years
- **Renewal options:** six 5-year options, +5% each
- **Market anchor rent:** $16.00/SF
- **Store sales / occupancy cost:** $650/SF / ~2.0%

**Q: How should the anchor rent be underwritten after year 4?**

- ✅ **A.** At $9.45/SF. Assume the options are exercised; the upside is about $25,000 a year, not $385,000.
  - A renewal option is the tenant's right, and this tenant has every reason to use it: rent is $7 below market and total occupancy cost is ($9 + $4) ÷ $650 = 2.0% of sales. The first option takes rent to $9.45, adding 55,000 × $0.45 ≈ $24,750. With six options the grocer controls the space for up to 34 years on those terms.
- ◻️ **B.** At $16.00/SF, as the OM shows.
  - The landlord cannot mark the rent to market while the tenant holds an option at a stated rent. The OM is describing value that the lease has already given to the grocer.
- ◻️ **C.** At a 50/50 blend of $9.45 and $16.00, about $12.70.
  - Probability-weighting is the right instinct with the wrong odds. A profitable store with rent this far below market exercises almost every time.
- ◻️ **D.** As a vacancy with downtime and re-tenanting cost, since the grocer may leave.
  - Possible in general, but the evidence here points the other way. Strong sales and cheap rent are what keep an anchor in place.

**Takeaway:** Below-market rent only becomes landlord upside when the landlord controls the space at expiry. Read the option terms before crediting any mark-to-market on an anchor.

**Tips:**
- Fixed-rate options transfer the mark-to-market to the tenant.
- Low occupancy cost plus below-market rent means the option gets exercised.
- Value the anchor as long-dated, nearly flat income and look for growth in the shop space.

*Closest earlier neighbours: "Mark-to-market on an industrial roll" and "Loss-to-lease is 8% — how much can you actually capture this year?" (both assume the landlord controls the roll).*

---

### 8. Push renewals 6% or settle for 3%?
*Proposed id `renewal-increase-vs-turnover` · lease-econ · intermediate · multifamily · assetManagement*

One hundred leases at a multifamily property expire this quarter, all at $1,800 a month. New leases are signing at $1,872. The property manager wants to send 6% renewal increases and expects half the residents to stay. The alternative is 3% increases with 65% expected to stay. Each unit that turns costs $1,400 to make ready and sits vacant for about a month.

- **Expiring leases:** 100 at $1,800/month
- **Market rent for new leases:** $1,872/month
- **Option X:** +6% ($1,908), 50% renew
- **Option Y:** +3% ($1,854), 65% renew
- **Turn cost:** $1,400 plus one month vacant

**Q: Which renewal strategy produces more income over the next twelve months?**

- ✅ **A.** Option Y, by about $13,000.
  - X: 50 renewals × $1,908 × 12 = $1,144,800; 50 turns × $1,872 × 11 months = $1,029,600, less $70,000 of turn cost; total $2,104,400. Y: 65 renewals × $1,854 × 12 = $1,446,120; 35 turns × $1,872 × 11 = $720,720, less $49,000; total $2,117,840. The extra 3% earns $32,400 on the 50 who stay, and the 15 extra turns cost about $45,800.
- ◻️ **B.** Option X. A 6% increase beats a 3% increase.
  - Looks only at the rent on the units that renew. It leaves out the fifteen additional units that go vacant and need a make-ready.
- ◻️ **C.** Option X. Turned units reset to $1,872, which is higher than the $1,854 renewal rent.
  - The $18 a month is real, but it is $198 over eleven months against roughly $3,300 of lost rent and turn cost per unit.
- ◻️ **D.** Option X. Residents who leave over a rent increase were going to leave anyway.
  - Assumes retention does not respond to price. The manager's own estimates say fifteen more households leave at 6% than at 3%.

**Takeaway:** A renewal increase is worth what it adds on the residents who stay, less what it costs on the ones it pushes out. Each avoidable turn costs about a month of rent plus the make-ready.

**Tips:**
- Cost of a turn ≈ vacant days of rent + make-ready + any leasing concession.
- Compare strategies on total twelve-month income, not on the renewal rate alone.
- The answer flips when market rent is far above the renewal rent, so rerun it each quarter.

*Closest earlier neighbours: "Renew at $27 or hold out for $30?" and "Underwriting the rollover: renew or re-let?" (single commercial tenant with TI and downtime; no retention-rate trade-off).*

---

## Sensitivity

### 9. The exit slipped two years and the multiple went up
*Proposed id `hold-period-irr-vs-multiple` · sensitivity · intermediate · mixed · portfolioMgmt, acquisitions*

A deal was underwritten to return $36M on $20M of equity at a year-5 sale, with no interim distributions. The sale has been pushed to year 7 and is now expected to return $38M. The asset manager's update reads: "Projected multiple has improved from 1.8x to 1.9x."

- **Equity invested:** $20,000,000
- **Original plan:** $36,000,000 at year 5 (1.8x)
- **Revised plan:** $38,000,000 at year 7 (1.9x)
- **Interim distributions:** none

**Q: What happened to the deal's return?**

- ✅ **A.** The IRR fell from about 12.5% to about 9.6%. The extra two years earn under 3% a year.
  - Original: 1.8^(1/5) − 1 ≈ 12.5%. Revised: 1.9^(1/7) − 1 ≈ 9.6%. Looked at another way, holding turns $36M at year 5 into $38M at year 7, which is about 2.7% a year on capital that could have come back to investors.
- ◻️ **B.** It improved. The multiple and the dollar profit are both higher.
  - Both are higher, and both ignore time. Investors waited two more years for an extra $2M.
- ◻️ **C.** It is roughly unchanged, since the multiple grew along with the hold.
  - The multiple grew about 6% while the hold grew 40%. For the IRR to hold at 12.5%, year-7 proceeds would need to be about $45.5M.
- ◻️ **D.** The IRR rose to about 12.9%: a 90% gain over seven years.
  - Divides total profit by years, which ignores compounding. The same shortcut would have given 16% for the original plan.

**Takeaway:** A longer hold can raise the multiple while lowering the IRR. Judge an extension by the return earned on the proceeds you are choosing not to take today.

**Tips:**
- With one cash flow in and one out, IRR = multiple^(1/years) − 1.
- Marginal return of holding = (later proceeds ÷ earlier proceeds)^(1/extra years) − 1.
- Report multiple and IRR together; either one alone can mislead.

*Closest earlier neighbour: "How much does one more year of lease-up cost you?" (delay to stabilization; does not contrast IRR with multiple).*

---

### 10. A 5% miss on NOI and the land price
*Proposed id `residual-land-value-sensitivity` · sensitivity · advanced · industrial · development*

You are bidding on a site for a speculative warehouse. The pro forma shows $3.2M of stabilized NOI, and the investment committee requires a 6.4% yield on total cost. Hard and soft costs excluding land are $42.5M and are largely fixed by the contractor's pricing. The seller wants $7.5M for the land. A revised leasing opinion now puts stabilized NOI 5% lower.

- **Stabilized NOI (original):** $3,200,000
- **Required yield on cost:** 6.4%
- **Hard + soft costs, ex-land:** $42,500,000
- **Land ask:** $7,500,000
- **Revised NOI:** $3,040,000 (−5%)

**Q: How much can you now pay for the land and still meet the 6.4% yield?**

- ✅ **A.** About $5.0M, a third less than the ask.
  - Supportable total cost = NOI ÷ required yield. Originally $3.2M ÷ 6.4% = $50.0M, leaving $7.5M for land after $42.5M of other costs. At $3.04M the budget is $47.5M and the land residual is $5.0M. Total cost fell 5%, and because the other costs are fixed the whole $2.5M comes out of the land.
- ◻️ **B.** About $7.1M, 5% less than the ask.
  - Assumes land value moves in proportion to NOI. Land is what is left after every other cost is paid, so it takes the entire change.
- ◻️ **C.** About $5.4M: take 5% of the hard and soft costs off the land.
  - Applies the 5% to the wrong base. The supportable budget fell by 5% of $50.0M, which is $2.5M.
- ◻️ **D.** $7.5M. Land trades on comparable sales, not on your pro forma.
  - Comps may explain what the seller asks. The question is what this project can pay, and at $7.5M the yield drops to about 6.1%.

**Takeaway:** Land is the residual in a development budget, so small changes in NOI, cost or required yield move its value several times over. Here the multiplier is total cost ÷ land, about 6.7×.

**Tips:**
- Residual land value = (NOI ÷ required yield) − all other costs.
- % change in land ≈ % change in supportable cost × (total cost ÷ land).
- Run this before going hard on a land deposit; it shows how much pricing cushion the contract needs.

*Closest earlier neighbours: "Land basis vs. cost overrun: yield-on-cost cushion" and "Which lever kills the development spread first?" (both hold land fixed and watch the spread move; this one holds the yield fixed and solves for land).*
