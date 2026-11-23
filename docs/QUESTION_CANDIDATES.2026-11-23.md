# Question candidates — 2026-11-23

Ten candidate situational questions aimed at the thinnest parts of the bank. **None of these are wired into the app** — they are drafts for review. Mark each `[x]` approve / `[r]` reject / `[e]` edit; approved ones get converted to `src/quiz/situational/<id>.ts` and registered in the index.

- [ ] 1 · `months-of-supply-pipeline`
- [ ] 2 · `gross-leasing-vs-net-absorption`
- [ ] 3 · `lease-up-reserve-months`
- [ ] 4 · `retail-comp-anchor-match`
- [ ] 5 · `hotel-comp-pip-adjustment`
- [ ] 6 · `sale-leaseback-comp-distortion`
- [ ] 7 · `annual-vs-stepped-escalations`
- [ ] 8 · `renewal-vs-new-tenant-economics`
- [ ] 9 · `cap-rate-move-asymmetry`
- [ ] 10 · `hotel-operating-leverage-dscr`

## How the gaps were picked

Counted from the 71 shipped situational cases in `src/quiz/situational/` (the community `question_submissions` table could not be read — the `learncre` Supabase project is paused — so "approved" here means "shipped in the repo").

| Dimension | Thinnest | Deepest | Added here |
|---|---|---|---|
| Category | absorption 1 · comp-selection 2 · lease-econ 2 · sensitivity 2 | deal-process 21 · document-literacy 13 | absorption +3 · comp-selection +3 · lease-econ +2 · sensitivity +2 |
| Difficulty | beginner 4 | intermediate 33 · advanced 34 | beginner +5 · intermediate +4 · advanced +1 |
| Asset class | hotel 1 · retail 2 · industrial 3 | multifamily 11 · office 9 | hotel +2 · retail +2 · industrial +3 |
| Role | development 9 | acquisitions 40 · assetManagement 31 | development +2 |

Not addressed this round: PSA document-literacy excerpts (1 shipped vs 3–4 for every other doc type).

---

### 1. How many years of supply is this submarket carrying?
`months-of-supply-pipeline` · *absorption · beginner · industrial · development, acquisitions*

You're underwriting a 400,000 SF speculative warehouse that will deliver in 12 months. The broker's pitch is that the submarket "only has two years of supply." You pull the numbers yourself.

- **Vacant existing space:** 2.4M SF
- **Under construction, unleased:** 1.2M SF
- **Net absorption (3-yr average):** 1.2M SF / year
- **Subject:** 400,000 SF spec, delivers in 12 months

**Q: How many years of supply should your lease-up assumption be built on?**

- ✅ **About 3 years — vacant space plus the unleased pipeline, divided by net absorption.**
  - (2.4M + 1.2M) ÷ 1.2M = 3.0 years. The buildings under construction will be competing for the same tenants by the time yours delivers, so they belong in the numerator.
- ◻️ **About 2 years — vacant space divided by net absorption.**
  - This is the broker's number. It ignores 1.2M SF that will be on the market before or alongside the subject.
- ◻️ **About 1 year — only new product competes with a new building.**
  - Tenants trade between new and second-generation space on price. Existing vacancy is real competition, especially in a soft market.
- ◻️ **It can't be estimated without a rent-growth forecast.**
  - Supply ÷ absorption needs no rent forecast. Rent growth is an output of this ratio, not an input to it.

**Takeaway:** Years of supply = (vacant + unleased pipeline) ÷ net absorption. Leaving the pipeline out is the most common way a lease-up assumption ends up too short.

**Tips:** Always ask what delivers before you do. · Use multi-year average absorption, not the best recent year. · A spec building's lease-up risk is the submarket's supply ratio, not the building's quality.

---

### 2. Leasing volume is up, vacancy is up — which number do you trust?
`gross-leasing-vs-net-absorption` · *absorption · beginner · office · acquisitions, portfolioMgmt*

An offering memorandum for a downtown office tower leads with "leasing activity up 20% year over year." The same quarter's market report shows vacancy rising. No new buildings delivered.

- **Gross leasing activity:** 1.1M SF (up 20% YoY)
- **Net absorption:** −250,000 SF
- **Inventory:** 25M SF
- **Vacancy:** 16.0% → 17.0%

**Q: Which figure tells you whether demand is actually growing?**

- ✅ **Net absorption — occupied space shrank by 250,000 SF, so demand fell regardless of how many leases were signed.**
  - Gross leasing counts every signed lease, including tenants relocating and downsizing. A tenant leaving 60,000 SF to sign for 40,000 SF adds 40,000 to gross leasing and subtracts 20,000 from net absorption.
- ◻️ **Gross leasing activity — more signed leases means more tenants in the market.**
  - It means more transactions, not more occupied space. In a downsizing cycle the two move in opposite directions.
- ◻️ **Neither — vacancy rose only because of new supply.**
  - Nothing delivered. With flat inventory, a 1-point vacancy increase on 25M SF is exactly the 250,000 SF of negative absorption.
- ◻️ **Both are equally valid; average them.**
  - They measure different things and cannot be averaged. Only net absorption measures the change in occupied space.

**Takeaway:** Gross leasing measures activity; net absorption measures demand. When an OM quotes the first, go find the second.

**Tips:** Net absorption = change in occupied SF. · Rising leasing volume with rising vacancy means tenants are shrinking. · Check whether deliveries explain a vacancy move before blaming or crediting demand.

---

### 3. How many months of lease-up does this deal need to carry?
`lease-up-reserve-months` · *absorption · intermediate · multifamily · development, mortgageUw*

A 280-unit apartment project is about to receive its certificate of occupancy. You're sizing the interest and operating reserve through stabilization. The leasing team reports application volume; the lender defines stabilization as 93% occupied.

- **Units:** 280
- **Stabilization threshold:** 93%
- **Pre-leased at CO:** 15%
- **Applications per month:** 22
- **Net move-ins per month (after cancellations and denials):** 18

**Q: Roughly how many months from CO to stabilization should the reserve cover?**

- ✅ **About 12 months — 218 remaining units to reach 93%, at 18 net move-ins per month.**
  - 93% × 280 = 260 units. Less 42 pre-leased = 218. 218 ÷ 18 = 12.1 months. Most underwriters would add a cushion on top, since first-year renewals begin turning over around month 12.
- ◻️ **About 15–16 months — 280 units at 18 per month.**
  - Overshoots twice: it targets 100% rather than the 93% threshold and ignores the 42 units already leased.
- ◻️ **About 10 months — 218 remaining units at 22 per month.**
  - Applications are not move-ins. Sizing the reserve on gross applications leaves it roughly two months short.
- ◻️ **6 months — a standard lease-up reserve.**
  - There is no standard. The reserve follows from the unit count and the net pace, and this project needs twice that.

**Takeaway:** Lease-up months = (stabilized units − pre-leased units) ÷ net monthly move-ins. Use net pace, the lender's stabilization threshold, and credit for pre-leasing.

**Tips:** Net pace, not applications. · Stabilization is the lender's defined percentage, not 100%. · Past month 12, early leases start expiring and the net pace slows.

---

### 4. Which sale belongs in the comp set for a grocery-anchored center?
`retail-comp-anchor-match` · *comp-selection · beginner · retail · acquisitions*

You're pricing a 95,000 SF grocery-anchored neighborhood center built in 2008. You can only lean on one of four recent sales as your primary cap-rate comp.

- **Subject:** 95,000 SF, grocery-anchored, 2008 vintage
- **Sale A:** unanchored strip center next door, sold last month
- **Sale B:** grocery-anchored center 3 miles away, 2005 vintage, sold 8 months ago
- **Sale C:** power center on the same road, sold 3 months ago
- **Sale D:** grocery-anchored center across the street, sold 4 years ago

**Q: Which sale is the best primary comp?**

- ✅ **Sale B — same anchor type and vintage, reasonably recent, same trade area.**
  - Retail cap rates are driven by the anchor and the income profile it creates. Three miles and eight months are small adjustments compared with a different retail format.
- ◻️ **Sale A — it is adjacent and the most recent.**
  - An unanchored strip has shorter leases, weaker credit and no traffic driver. It trades at a meaningfully wider cap rate, so proximity does not make it comparable.
- ◻️ **Sale C — same road and recent.**
  - A power center is a different product: big-box tenants, larger scale, a different buyer pool and different rollover risk.
- ◻️ **Sale D — nearest match on location and anchor.**
  - Four years is too stale. Rates and cap rates have moved enough that the price says little about today's market.

**Takeaway:** Match product type and income profile first, then timing, then distance. The closest building is often not the closest comp.

**Tips:** In retail, the anchor defines the product. · A comp older than about 18–24 months needs a market-conditions adjustment or a lower weight. · Use the adjacent sale as a location check, not a pricing anchor.

---

### 5. The comp sold at $145,000 per key — what did the buyer really pay?
`hotel-comp-pip-adjustment` · *comp-selection · intermediate · hotel · acquisitions*

You're valuing a 140-key select-service hotel that completed a full brand renovation last year. The best comp is the same brand, two exits away, sold six months ago. The buyer's press release mentions a required property improvement plan (PIP).

- **Comp sale price:** $145,000 per key
- **PIP assumed by the comp's buyer:** $25,000 per key
- **Subject:** 140 keys, renovated last year, no PIP due
- **Brand and market:** same as comp

**Q: What per-key figure should the comp contribute to your valuation?**

- ✅ **About $170,000 per key — the price plus the PIP the buyer had to fund.**
  - The buyer's all-in basis for a renovated hotel was $145,000 + $25,000. The subject is already in that renovated condition, so the like-for-like indication is roughly $170,000 per key, or about $23.8M.
- ◻️ **$145,000 per key — use the recorded price.**
  - That compares a renovated hotel with one that needed $25,000 per key of work. It undervalues the subject by about $3.5M.
- ◻️ **About $120,000 per key — deduct the PIP from the comp.**
  - Wrong direction. The PIP was a cost on top of the price, and the subject does not owe one.
- ◻️ **Discard the comp — sales with a PIP can't be used.**
  - Most hotel sales carry a PIP. Throwing them out leaves no comp set; adjusting for it is standard practice.

**Takeaway:** Hotel comps are compared on all-in basis: price plus required PIP. A subject with no PIP due should be measured against the comp's post-renovation cost.

**Tips:** Always ask what PIP came with a hotel sale. · Price per key without PIP context is not comparable. · The same logic applies to deferred maintenance on any asset class.

---

### 6. The appraisal leans on a sale-leaseback comp — what's wrong with it?
`sale-leaseback-comp-distortion` · *comp-selection · advanced · industrial · mortgageUw, acquisitions*

You're reviewing an appraisal for a loan on a warehouse leased at market rent. The appraiser concludes $150/SF, weighting heavily toward one sale: a sale-leaseback where the seller stayed on as tenant under a new 20-year lease.

- **Sale-leaseback comp:** $165/SF at a 6.0% cap rate
- **Comp's lease rent:** $9.90/SF NNN
- **Market rent:** $7.50/SF NNN
- **Other comps:** $118–$130/SF
- **Appraised value:** $150/SF

**Q: How should the sale-leaseback comp be treated?**

- ✅ **Don't use its price per SF without adjusting to market rent — at $7.50 and the same cap rate it implies about $125/SF, in line with the other comps.**
  - In a sale-leaseback the seller sets the rent and the price together. Rent 32% above market at a 6.0% cap produces $165/SF, but that is the price of a lease, not of the building. $7.50 ÷ 6.0% = $125/SF.
- ◻️ **Give it the most weight — it's the most recent arm's-length sale with a long lease in place.**
  - It is arm's-length on price but the rent was negotiated as part of the financing, not set by the leasing market. The premium disappears if the tenant defaults or leaves.
- ◻️ **Use it, but apply a wider cap rate to reflect the above-market rent.**
  - Widening the cap rate on inflated rent still leaves a number unrelated to the real estate. The cleaner fix is to reprice at market rent.
- ◻️ **Reject the whole appraisal — the comp set is tainted.**
  - The other comps cluster at $118–$130/SF and support a conclusion. The issue is the weighting of one sale, which is a revision, not a rejection.

**Takeaway:** A sale-leaseback price reflects the lease the seller wrote for itself. Check the rent against market before letting its price per SF into a comp set.

**Tips:** Rent ÷ cap rate tells you what drove a comp's price. · Above-market rent is tenant credit exposure, not real estate value. · When one comp sits far outside the range, find out why before weighting it.

---

### 7. 3% a year or 10% at year six — which escalation is worth more?
`annual-vs-stepped-escalations` · *lease-econ · beginner · retail · assetManagement*

A tenant in your shopping center will sign a 10-year lease at $30/SF. They've offered a choice of escalation structures and say the two are "basically the same."

- **Starting rent:** $30.00/SF
- **Term:** 10 years
- **Option A:** 3% annual increases
- **Option B:** flat for five years, then one 10% increase for years 6–10

**Q: Which structure delivers more rent to the landlord?**

- ✅ **Option A — about $344/SF over the term versus $315/SF, and a year-10 rent of $39.14 versus $33.00.**
  - Annual 3% bumps compound: rent is already $33.77 in year 5, above where Option B ever gets. Total rent is roughly 9% higher and the ending rent, which drives sale value, is about 19% higher.
- ◻️ **Option B — a 10% increase is larger than 3%.**
  - One 10% step in ten years is far less than nine compounding 3% steps, which add up to about 30%.
- ◻️ **They are about equal — 10% over five years is roughly 2% a year.**
  - Even on that logic 2% is less than 3%. And Option B pays nothing extra for the first five years.
- ◻️ **Option B — flat rent early reduces the tenant's default risk, which is worth more.**
  - A real consideration for a weak tenant, but it does not close a 9% gap in collected rent and a 19% gap in exit rent.

**Takeaway:** Compare escalation structures on total rent over the term and on the final-year rent. Annual compounding bumps nearly always beat an occasional step.

**Tips:** Nine 3% bumps compound to about 30%. · Final-year rent matters most when you plan to sell. · "Basically the same" is worth five minutes in a spreadsheet.

---

### 8. Renew at $8.50 or re-lease at $8.90?
`renewal-vs-new-tenant-economics` · *lease-econ · intermediate · industrial · assetManagement*

A 100,000 SF warehouse tenant's lease expires in nine months. They'll renew for five years at $8.50/SF NNN. Your leasing broker thinks a new tenant would pay $8.90 and recommends letting them go.

- **Renewal:** $8.50/SF, $2.00/SF TI, 3% commission, no downtime
- **New tenant:** $8.90/SF, $8.00/SF TI, 6% commission, 6 months downtime
- **Carrying costs while vacant:** $2.50/SF per year
- **Horizon:** 5 years, rents flat for simplicity

**Q: Which path is worth more over the five years?**

- ✅ **Renew — about $39/SF net versus $28/SF, a difference of roughly $1.1M on the building.**
  - Renewal: $42.50 rent − $2.00 TI − $1.28 commission = $39.22/SF. New tenant: $40.05 rent (4.5 years) − $8.00 TI − $2.67 commission − $1.25 carry = $28.13/SF. The $0.40 higher face rent does not cover six months of vacancy and the extra capital.
- ◻️ **Re-lease — $8.90 is higher, and higher rent means higher value.**
  - $0.40 of extra rent at a 6% cap rate is worth about $6.67/SF at sale, still less than the roughly $11/SF it costs to get there.
- ◻️ **They are equivalent once commissions are netted out.**
  - Commissions are the smallest item. Downtime and TI account for most of the gap.
- ◻️ **Re-lease — the downtime is a one-time cost, the rent is permanent.**
  - TI and commissions recur at every rollover, and the rent premium lasts only as long as the lease does.

**Takeaway:** Compare renewal and new-tenant deals on net cash after downtime, TI, commissions and carry, not on face rent. A modest rent premium rarely pays for a vacancy.

**Tips:** Six months of downtime costs half a year of rent plus carry. · New-tenant TI and commissions typically run a multiple of renewal costs. · Check the value of the higher rent at exit before dismissing it.

---

### 9. The cap rate moves 50 bps — how much value moves?
`cap-rate-move-asymmetry` · *sensitivity · beginner · multifamily · acquisitions, portfolioMgmt*

An apartment property produces $1,000,000 of NOI and was valued at a 5.0% cap rate. Rates have risen and buyers now want 5.5%. NOI is unchanged.

- **NOI:** $1,000,000
- **Prior cap rate:** 5.0%
- **New cap rate:** 5.5%
- **Prior value:** $20.0M

**Q: Roughly how much value has been lost?**

- ✅ **About 9% — value falls from $20.0M to roughly $18.2M.**
  - $1,000,000 ÷ 5.5% = $18.18M, a decline of 9.1%. The percentage change in value is the change in cap rate divided by the *new* cap rate: 0.5 ÷ 5.5.
- ◻️ **About 0.5% — the cap rate moved half a point.**
  - Confuses a change in the rate with a change in value. A half-point move on a 5% cap rate is a large relative change.
- ◻️ **About 5% — half a point on a 5% cap is half of 10%.**
  - No basis in the arithmetic. Value is NOI divided by the cap rate, and 5.0 ÷ 5.5 is 0.909.
- ◻️ **About 11% — the same amount it would gain from 50 bps of compression.**
  - 11.1% is the *gain* from 5.0% to 4.5%. Expansion and compression are not symmetric; the loss from an equal move up is smaller.

**Takeaway:** Value change from a cap-rate move ≈ the move ÷ the new cap rate. The lower the starting cap rate, the more each basis point costs.

**Tips:** 50 bps on a 5% cap is about 9%; on an 8% cap it is about 6%. · Compression gains more than equal expansion loses. · Low-cap assets carry the most cap-rate risk.

---

### 10. Hotel revenue drops 10% — what happens to DSCR?
`hotel-operating-leverage-dscr` · *sensitivity · intermediate · hotel · mortgageUw, assetManagement*

You're stress-testing a loan on a full-service hotel. The borrower's downside case shows revenue falling 10% and argues coverage "only slips to about 1.26x." You rebuild it using the hotel's cost structure.

- **Revenue:** $10.0M
- **Operating expenses:** $6.5M (60% fixed, 40% variable with revenue)
- **NOI:** $3.5M
- **Annual debt service:** $2.5M
- **Current DSCR:** 1.40x

**Q: Where does DSCR land if revenue falls 10%?**

- ✅ **About 1.10x — NOI falls roughly 21%, about twice the revenue decline.**
  - Fixed costs stay at $3.9M. Variable costs fall 10% to $2.34M. NOI = $9.0M − $3.9M − $2.34M = $2.76M, down 21%. $2.76M ÷ $2.5M = 1.10x.
- ◻️ **About 1.26x — NOI falls 10% along with revenue.**
  - The borrower's number. It assumes every expense flexes with revenue, which no hotel achieves.
- ◻️ **About 1.40x — management will cut costs to protect the margin.**
  - Fixed costs such as property tax, insurance, base staffing and brand fees cannot be cut in step with revenue.
- ◻️ **Below 1.00x — the full $1.0M revenue loss comes out of NOI.**
  - Too severe. $2.6M of expenses do vary with revenue and fall by $260,000, so NOI drops $740,000, not $1.0M.

**Takeaway:** Fixed costs magnify revenue swings into larger NOI swings. For hotels, expect NOI to move roughly twice as far as revenue, and size the debt for that.

**Tips:** Split expenses into fixed and variable before running a downside. · A margin that holds in a downturn is an assumption to challenge. · This leverage is why hotel loans carry higher DSCR and debt-yield requirements.
