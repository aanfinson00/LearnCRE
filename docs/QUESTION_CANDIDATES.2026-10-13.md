# Question candidates — 2026-10-13

**Why these topics:** no community submissions exist yet (`question_submissions` is empty), so coverage was measured on the shipped situational bank (72 cases). Thinnest categories: `absorption` (1), `comp-selection` (2), `lease-econ` (2), `sensitivity` (2) vs. `deal-process` (21) and `document-literacy` (13).

**Status:** drafts for review — NOT registered in `src/quiz/situational/index.ts`. Each is a `SituationalCase` shape (one best option, shuffled at runtime). Math checked by hand; re-verify before shipping.

---

## Absorption (target: 4 total)

### 1. `absorption-lease-up-months` — How long is this lease-up?
*absorption · intermediate · multifamily · roles: development, acquisitions*

**Scenario:** A 280-unit garden property just delivered with 0% leased. Underwriting stabilizes at 93% occupancy. The submarket comps are leasing 18 units/month, and the sponsor's pro forma assumes stabilization in 12 months.
**Data:** Units 280 · Stabilized occupancy 93% · Comp lease-up pace 18 units/mo · Pro forma 12 months
**Q:** What does the comp pace imply for the stabilization timeline?
- ✅ ~15 months — 93% × 280 ≈ 261 units ÷ 18/mo ≈ 14.5, so the 12-month pro forma is aggressive; carry interest and concessions for the longer period.
- ◻️ 12 months — the sponsor's pro forma is the best estimate of the property's own pace.
- ◻️ ~16 months — you must also lease the 7% that will turn over, so add one month per percentage point.
- ◻️ Can't be determined without rent growth forecasts.
**Takeaway:** Lease-up length = target units ÷ observed pace; extra months are extra interest carry.
**Tips:** Use comp pace, not the pro forma · Target is stabilized occupancy × units · Sensitize pace ±20%.

### 2. `absorption-office-years-of-supply` — Is 6 years of supply a problem?
*absorption · intermediate · office · roles: acquisitions, portfolioMgmt*

**Scenario:** A CBD office submarket has 2.4M SF vacant. Trailing-12-month net absorption was 400,000 SF and nothing is under construction.
**Q:** How should you read the market?
- ✅ ~6 years of supply at the current pace — rent growth is unlikely and concessions will persist; underwrite flat-to-down effective rents.
- ◻️ Healthy — no construction means vacancy will clear within a year.
- ◻️ ~0.17 years of supply — absorption of 400K SF exceeds what the market needs.
- ◻️ Irrelevant to a single building with a strong tenant roster.
**Takeaway:** Years of supply = vacant SF ÷ annual net absorption; no new supply limits downside, not the glut.
**Tips:** Look at vacancy ÷ absorption · Check shadow/sublease space · Compare to class-specific, not market-wide.

### 3. `absorption-spec-industrial-pipeline` — Does the pipeline matter if half is pre-leased?
*absorption · advanced · industrial · roles: acquisitions, development*

**Scenario:** 8M SF of industrial space is under construction in a market absorbing 5M SF/year. 50% of the pipeline is pre-leased to users.
**Q:** What is the right supply read?
- ✅ ~0.8 years of speculative supply (4M ÷ 5M) — manageable if absorption holds; stress-test absorption at 3M SF.
- ◻️ 1.6 years of supply (8M ÷ 5M) — pre-leasing doesn't change what hits the market.
- ◻️ Zero — pre-leased space has already been absorbed, so there is no net new supply.
- ◻️ Not measurable until deliveries.
**Takeaway:** Net out pre-leased space, but pre-leases can also be relocations that leave vacancy behind.
**Tips:** Ask if pre-leases are expansions or moves · Stress absorption · Track delivery timing.

---

## Comp selection (target: 5 total)

### 4. `comp-portfolio-premium` — Can you use the 5.5% portfolio trade?
*comp-selection · intermediate · multifamily · roles: acquisitions*

**Scenario:** Single-asset trades nearby print 5.9–6.1%. A 1,200-unit portfolio sold at 5.5% to a REIT buying for scale.
**Q:** How do you treat the 5.5% comp?
- ✅ Show it separately and don't average it in — portfolio/entity premiums reflect scale and platform value, not single-asset pricing.
- ◻️ Average all four comps for a broader sample.
- ◻️ Use it as the primary comp since it is the most recent.
- ◻️ Discard it and every comp over 3 months old.
**Takeaway:** Comps must match the transaction type, not just the location.
**Tips:** Separate portfolio from one-off · Check buyer type · Disclose adjustments.

### 5. `comp-stale-after-rate-move` — Are 14-month-old comps still good?
*comp-selection · intermediate · all · roles: acquisitions, mortgageUw*

**Scenario:** Your best comps closed 14 months ago at a 5.25% cap. Since then the 10-year Treasury has risen 150 bps and the two most recent trades (thin, distressed-adjacent) printed 6.25%.
**Q:** How should the comp set be weighted?
- ✅ Weight recent trades more, apply a market adjustment to older comps, and widen the range rather than anchoring on 5.25%.
- ◻️ Use only the 14-month-old comps — more were arm's-length.
- ◻️ Use only the two recent trades.
- ◻️ Average all of them equally.
**Takeaway:** Time is an adjustment axis; stale prints need a market-movement adjustment.
**Tips:** Adjust for rates · Treat thin recent trades as a floor of evidence, not gospel · Show a range.

### 6. `comp-owner-user-sale` — Why exclude the owner-user trade?
*comp-selection · beginner · office/industrial · roles: acquisitions, mortgageUw*

**Scenario:** A vacant building sold at a price equal to a 4.6% yield on market rent to an owner-user company. Investor trades in the area are at 6.5–7.0%.
**Q:** Why not use it as an investment comp?
- ✅ Owner-users value space for occupancy and may pay for utility, financing (SBA), and control, not investment return.
- ◻️ It is the newest data and should override the others.
- ◻️ Vacant buildings never trade at caps.
- ◻️ Owner-user deals are always at market.
**Takeaway:** Buyer motive determines whether a trade reflects investor pricing.
**Tips:** Identify buyer type · Convert $/SF, not cap, when vacant · Keep as a $/SF reference only.

---

## Lease economics (target: 4 total)

### 7. `lease-net-effective-rent` — What is the net effective rent?
*lease-econ · intermediate · office · roles: assetManagement, acquisitions*

**Scenario:** A 10-year lease at $30/SF flat gross-equivalent face rent, 8 months free rent, and a $60/SF TI allowance.
**Q:** What is the (undiscounted) net effective rent per year?
- ✅ $22.00/SF — (112 paid months × $2.50 = $280) − $60 TI = $220 over 10 years.
- ◻️ $30.00/SF — face rent.
- ◻️ $28.00/SF — ignores the TI.
- ◻️ $24.00/SF — ignores the free rent.
**Takeaway:** Net effective rent charges concessions and TI against face rent.
**Tips:** Subtract free rent and TI · Then divide by term · Discount for a true PV view.

### 8. `lease-base-year-stop` — What does the tenant reimburse in year 3?
*lease-econ · intermediate · office · roles: assetManagement, mortgageUw*

**Scenario:** A modified-gross lease with a base year; opex was $10.00/SF in the base year and grows 4% annually.
**Q:** What does the tenant reimburse in year 3 (two years after the base)?
- ✅ ~$0.82/SF — opex of $10.816 less the $10.00 base.
- ◻️ $10.82/SF — the full opex.
- ◻️ $0.40/SF — 4% of the base, once.
- ◻️ Nothing — base-year leases never pass through increases.
**Takeaway:** The landlord bears the base amount; the tenant pays only increases above it.
**Tips:** Base = stop · Gross-up for occupancy · Negotiate base year in a low-expense year.

---

## Sensitivity (target: 4 total)

### 9. `sensitivity-exit-cap-50bps` — What does 50 bps of exit cap do?
*sensitivity · beginner · all · roles: acquisitions, portfolioMgmt*

**Scenario:** Exit NOI is $3.3M at a 5.5% exit cap. Underwriting is being stress-tested to a 6.0% exit cap.
**Q:** By roughly how much does the exit value fall?
- ✅ ~8.3% — 5.5 ÷ 6.0 = 0.917 (from $60.0M to $55.0M).
- ◻️ ~0.5% — 50 bps is half a percent.
- ◻️ ~5.0% — about 10× the bps change.
- ◻️ ~12.0% — the change is applied to NOI and value.
**Takeaway:** Value moves inversely with the cap rate by the ratio, not by the bps.
**Tips:** ΔValue ≈ Δcap ÷ new cap · Lower caps are more sensitive · Always stress the exit.

### 10. `sensitivity-floating-rate-dscr` — Does DSCR survive +100 bps?
*sensitivity · intermediate · all · roles: mortgageUw, assetManagement*

**Scenario:** A $30M floating-rate IO loan at 6.0% on $2.4M of NOI. Lender minimum DSCR is 1.20x.
**Q:** After a 100 bps rate increase, what is DSCR and what follows?
- ✅ 1.14x — debt service rises from $1.80M to $2.10M; below 1.20x, so cash management or a paydown triggers (hedge or buy a cap).
- ◻️ 1.33x — unchanged, since NOI is unchanged.
- ◻️ 1.25x — rate changes only affect amortizing loans.
- ◻️ 1.20x — covenants reset to the new rate.
**Takeaway:** On floating debt, rate moves hit DSCR directly; price the cap into the deal.
**Tips:** DSCR = NOI ÷ debt service · Test +100/+200 bps · Know your cap strike.
