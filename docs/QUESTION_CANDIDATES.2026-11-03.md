# Question candidates — 2026-11-03

Ten new situational-case phrasings, aimed at the thinnest categories in the bank.

**Coverage snapshot** (situational cases in `src/quiz/situational/`, 72 files):
absorption 1 · comp-selection 2 · lease-econ 2 · sensitivity 2 · diagnostic 7 · pricing 7 · risk 7 · investment-thesis 9 · document-literacy 13 · deal-process 21.

Caveat: "approved" status for community submissions lives in the `question_submissions` table of the `learncre` Supabase project, which is currently **INACTIVE (paused)**. It was not restored, so the gap analysis uses shipped-case counts instead. If the approved-submission mix differs, re-weight.

These are drafts for review — **not registered** in `index.ts`. Format follows `SituationalCase`; `[best]` marks the `isBest` option. Math was hand-checked.

---

## Absorption (3)

### 1. Months of supply with a half-leased pipeline
*absorption · intermediate · industrial · acquisitions, assetManagement*
A 20M SF industrial submarket has 6% vacancy (1.2M SF) and net absorption of 100k SF/month. 1.8M SF is under construction, 50% pre-leased. **Q: Roughly how many months of supply does the market face, and what does it imply for rents?**
- [best] ~21 months: 1.2M existing vacancy + 0.9M speculative space = 2.1M SF ÷ 100k/mo. Expect flat-to-soft rent growth and elevated concessions until it burns off.
- ~12 months: counts only existing vacancy and ignores the pipeline.
- ~30 months: counts the full 1.8M SF as speculative, ignoring pre-leasing.
- Not meaningful; supply is irrelevant because the pipeline is half-leased.
**Takeaway:** Only the unleased share of the pipeline adds to supply, but it must be added to existing vacancy before dividing by absorption.

### 2. Gross vs. net absorption
*absorption · beginner · office · acquisitions, portfolioMgmt*
An office submarket posts 400k SF of move-ins and 550k SF of move-outs for the quarter. A broker calls it "400k SF of demand." **Q: What is the right read?**
- [best] Net absorption is −150k SF. Occupancy fell; gross move-ins overstate demand because they include tenants relocating within the market.
- Net absorption is +400k SF; move-outs are churn.
- Net absorption is +250k SF (the average).
- Net absorption can't be computed without the vacancy rate.
**Takeaway:** Net absorption = occupied SF at end − occupied SF at start. Gross figures hide backfill and churn.

### 3. Underwriting a lease-up pace
*absorption · intermediate · multifamily · development, acquisitions*
A 240-unit new build is leasing 12 units/month. Comparable lease-ups nearby averaged 20/month. Stabilization is 93% (223 units). **Q: What pace should the pro forma use?**
- [best] The subject's observed ~12/month (≈19 months to stabilize), with a sensitivity toward the comp pace (~11 months); don't assume it will converge.
- The comp pace of 20/month, since the market is the better predictor.
- The average of the two, 16/month.
- Whatever hits the target IRR.
**Takeaway:** Observed pace on the actual asset beats comps until you can explain the gap (pricing, concessions, product).

## Comp selection (2)

### 4. The related-party sale in the comp set
*comp-selection · beginner · retail · acquisitions*
Your strip-center comp set has four trades at 6.8–7.1% caps and one at 5.2%. Diligence shows the 5.2% buyer owned the adjacent parcel. **Q: How do you treat it?**
- [best] Exclude from the core set (or footnote it): an adjacent-owner premium isn't arm's-length market pricing.
- Include it and average all five.
- Include it and drop the highest instead.
- Make it the anchor since it's the most recent.
**Takeaway:** Verify motivation before using an outlier; strategic buyers pay prices others can't.

### 5. Rent comps across vintages
*comp-selection · intermediate · multifamily · acquisitions, assetManagement*
Your 1994 Class B asset has no direct comps within 2 miles. Available: a 2023 Class A across the street, and 1990s Class B assets 4 miles away in a similar-income area. **Q: Which comps carry more weight?**
- [best] Lead with the 1990s Class B comps, adjusted for location; use the Class A as a ceiling, not a peer.
- The Class A, because proximity matters most.
- Equal-weight all comps.
- Neither; use list rents from the broker OM.
**Takeaway:** Product type and tenant profile outweigh distance; adjust for location rather than change product class.

## Lease economics (3)

### 6. Net effective rent with free rent and TI
*lease-econ · intermediate · office · assetManagement, acquisitions*
10-year lease at $30/SF face, 6 months free, $50/SF TI allowance, no other costs. **Q: What is the landlord's net effective rent (straight average, undiscounted)?**
- [best] $23.50/SF: (30 × 9.5 − 50) ÷ 10.
- $28.50/SF: nets free rent but ignores TI.
- $25.00/SF: nets TI but ignores free rent.
- $30.00/SF: face rent.
**Takeaway:** Net effective subtracts all landlord concessions (free rent, TI, commissions) from face rent over the term.

### 7. Base-year leases and the gross-up
*lease-econ · advanced · office · assetManagement*
A building is 75% occupied; a new tenant signs a base-year lease and the base year is the current year. **Q: What lease protection matters most to the tenant?**
- [best] A gross-up clause (typically to 95–100%) so the base-year variable opex reflects a full building; otherwise later occupancy gains inflate opex over the base.
- A lower base rent.
- A cap on landlord's management fee only.
- Nothing; base years always net out.
**Takeaway:** Without gross-up, a low-occupancy base year understates the base and shifts cost to the tenant.

### 8. Percentage rent above the breakpoint
*lease-econ · beginner · retail · assetManagement*
Tenant pays $60,000 base rent plus 6% of sales above a natural breakpoint. Sales were $1.4M. **Q: What percentage rent is due?**
- [best] $24,000: breakpoint = $60,000 ÷ 6% = $1.0M; 6% × $400k.
- $84,000: 6% of all sales.
- $60,000: base rent only.
- $0: it's already in base rent.
**Takeaway:** Natural breakpoint = base rent ÷ percentage rate.

## Sensitivity (2)

### 9. Which sensitivity table to run
*sensitivity · intermediate · multifamily · acquisitions, portfolioMgmt*
A value-add deal's returns depend heavily on exit cap and the post-renovation rent premium. **Q: What sensitivity analysis is most useful for IC?**
- [best] A two-way table of exit cap × rent premium, because the drivers interact.
- One-at-a-time tornado charts only.
- A single downside case.
- Vary every input ±10%.
**Takeaway:** Pick the two or three drivers that decide the deal and flex them together.

### 10. DSCR under a rate shock
*sensitivity · intermediate · mortgageUw · mortgageUw, assetManagement*
$30M floating-rate IO loan at SOFR 4.0% + 3.0% spread; NOI $2.7M. **Q: What's DSCR if SOFR rises 100 bps?**
- [best] ~1.13x: interest rises $2.1M → $2.4M; $2.7M ÷ $2.4M.
- 1.29x: the current DSCR.
- 1.20x: the average of the two.
- 0.95x: adds the rate move to the NOI.
**Takeaway:** On floating debt, DSCR sensitivity is direct; check against covenant and rate-cap strikes.
