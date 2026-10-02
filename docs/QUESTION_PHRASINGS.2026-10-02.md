# Question phrasing drafts — 2026-10-02

Scheduled run: add 10 candidate situational questions aimed at the thinnest areas of the bank.

**Coverage basis.** The Supabase project holding `question_submissions` (and its `approved` status) was not reachable from this run (the only active project has no such table), so "least approved" was proxied by the repo's situational bank. Counts of 68 cases by category: absorption 1, comp-selection 2, lease-econ 2, sensitivity 2, risk 7, pricing 7, diagnostic 7, investment-thesis 9, document-literacy 13, deal-process 21. Also: only 4 beginner cases; hotel (1), retail (2) and industrial (3) asset classes are thin. These drafts target those gaps.

Format: prompt → options (✅ = best) → takeaway. Not yet in `src/quiz/situational/`; promote with the pattern in `docs/agent-instructions.md` once vetted.

---

### 1. How long to burn off the new spec supply? — absorption · intermediate · industrial · acquisitions/development
A 25M SF industrial submarket is 7% vacant. 1.0M SF of fully speculative space delivers next quarter. Net absorption has run 700k SF/yr. You need 5% vacancy before underwriting rent growth.
**Q: Roughly how long until vacancy reaches 5%?**
- ✅ About 2 years — post-delivery base is 26M SF; vacant = 1.75M + 1.0M = 2.75M; 5% target = 1.3M; (2.75 − 1.3) ÷ 0.7 ≈ 2.1 yrs.
- ◻️ About 6 months — absorption of 700k SF clears the 1.0M SF delivery quickly. (Ignores existing vacancy and the target.)
- ◻️ About 1 year — (1.75M − 1.3M) ÷ 0.7M. (Ignores the delivery.)
- ◻️ Can't be estimated without rent growth. (Absorption pace is given; compute.)
**Takeaway:** Recompute both vacant SF and the base after deliveries before dividing by absorption.

### 2. Which vacancy number is the real one? — absorption · intermediate · office · acquisitions/assetManagement
An office submarket shows 12% direct vacancy. The broker's deck omits that another 3% of inventory is available for sublease, mostly from tenants that have already moved out.
**Q: How should you treat the sublease space?**
- ✅ As shadow supply competing for the same tenants — underwrite against ~15% available space.
- ◻️ Ignore it; subleases aren't landlord-controlled vacancy.
- ◻️ Count it at 50% because subleases rent at a discount.
- ◻️ Treat it as demand because the tenants are still paying rent.
**Takeaway:** Subleases compete with your direct space, often at lower rents; the leasing market sees all of it.

### 3. Will lease-up meet the lender's timeline? — absorption · beginner · multifamily · mortgageUw/development
A new 240-unit building is leasing 12 units/month. The construction loan requires 93% occupancy within 15 months of first lease.
**Q: Does the business plan hit the test?**
- ✅ No — 93% of 240 ≈ 224 units ÷ 12/mo ≈ 18.7 months; you need ~15 units/mo or an extension.
- ◻️ Yes — 12 × 15 = 180 units is "close enough."
- ◻️ Yes — move-outs will be offset by renewals.
- ◻️ Unknowable until concessions are known.
**Takeaway:** Convert the occupancy covenant into units, then into a required monthly pace.

### 4. Is the anchored center a valid comp? — comp-selection · intermediate · retail · acquisitions
Your subject is a grocery-anchored strip center. The three nearest sales are unanchored strips; one grocery-anchored center sold 6 miles away in a similar-income trade area.
**Q: Which comp set is most defensible?**
- ✅ Weight the grocery-anchored sale most heavily; use the unanchored sales only with an explicit anchor-premium adjustment.
- ◻️ Use the three nearest — proximity beats anchor status.
- ◻️ Average all four equally.
- ◻️ Discard all four and use national cap-rate surveys.
**Takeaway:** Tenancy and anchor quality drive retail cap rates more than distance.

### 5. Should this sale be in the comp set? — comp-selection · advanced · multifamily · acquisitions/portfolioMgmt
A comp sold at a 4.9% cap, well below the others (5.6–5.9%). Diligence shows the buyer and seller shared a sponsor and the loan was assumed at a below-market rate.
**Q: What do you do with it?**
- ✅ Exclude it or footnote it as non-arm's-length; it doesn't reflect open-market pricing.
- ◻️ Keep it; it's the most recent trade.
- ◻️ Keep it but average it with the others to dilute the effect.
- ◻️ Replace it with the highest cap comp to be conservative.
**Takeaway:** Vet each comp for arm's-length terms, financing, and motivation before using it.

### 6. What's the true rent? — lease-econ · beginner · office · acquisitions/assetManagement
A 10-year lease is quoted at $30/SF with 6 months free rent and a $50/SF TI allowance (ignore discounting).
**Q: What is the net effective rent per year?**
- ✅ ≈ $23.50/SF — (300 − 15 free − 50 TI) ÷ 10.
- ◻️ $30.00/SF — the face rent.
- ◻️ $28.50/SF — only subtracts free rent.
- ◻️ $25.00/SF — only subtracts TI.
**Takeaway:** Concessions and TI come out of the effective rent; compare deals on a net-effective basis.

### 7. Blended rollover cost — lease-econ · intermediate · office · assetManagement/mortgageUw
Rolling tenants renew 65% of the time (0 months downtime, $10 TI, 2% LC) or turn over (9 months downtime, $40 TI, 6% LC).
**Q: What's the right downtime assumption for the model?**
- ✅ A probability-weighted blend: 0.35 × 9 ≈ 3.2 months, with TI and LC weighted the same way.
- ◻️ 9 months — always assume the worst case.
- ◻️ 0 months — the likely outcome is renewal.
- ◻️ 4.5 months — split the difference.
**Takeaway:** Use renewal probability to weight downtime, TI and commissions together.

### 8. How much does a 50 bp exit cap hurt? — sensitivity · intermediate · multifamily · acquisitions/portfolioMgmt
Buying at $50M on $3.0M NOI (6.0% cap) with a 65% LTV loan. You assume a 6.0% exit; lenders ask for 6.5%.
**Q: What does 6.5% do to value and equity?**
- ✅ Value falls ~7.7% to ≈ $46.2M, a ~$3.8M hit — roughly 22% of the $17.5M equity.
- ◻️ Value falls 0.5% — a 50 bp change is a 0.5% change.
- ◻️ Value falls 7.7% and equity falls 7.7% too.
- ◻️ Value is unchanged because NOI is unchanged.
**Takeaway:** Leverage magnifies value changes into larger equity changes.

### 9. Which assumption should you stress first? — sensitivity · advanced · mixed · portfolioMgmt/acquisitions
Your IRR model shows these 1-step moves: exit cap +50 bp → −2.1 pts, rent growth −100 bp → −1.4 pts, vacancy +2 pts → −0.6 pts, interest rate +50 bp → −0.9 pts.
**Q: What should your downside case prioritise?**
- ✅ Exit cap first, then rent growth, scaled to what's plausible, not just largest.
- ◻️ Vacancy first because it's the most intuitive.
- ◻️ Only the rate, since it's observable.
- ◻️ Stress all equally for simplicity.
**Takeaway:** Rank by impact × plausibility, not by the order of the inputs.

### 10. Does a floating-rate move break DSCR? — sensitivity · intermediate · office · mortgageUw
NOI $2.4M; $30M floating, interest-only at 6.0% (DS $1.8M, DSCR 1.33×). Lender minimum is 1.20×.
**Q: What happens at +100 bp?**
- ✅ DS rises to $2.1M, DSCR ≈ 1.14× — below 1.20×; a cap or paydown is needed.
- ◻️ DSCR stays ~1.33× because NOI is fixed.
- ◻️ DSCR drops to ~1.25× — still passes.
- ◻️ DSCR falls below 1.0×.
**Takeaway:** Run covenant math at the stressed rate, not the in-place rate.

---

### Note on an existing case
`src/quiz/situational/absorptionTiming.ts`: the work shown computes 685 ÷ 50 ≈ 13.7 months, yet the best answer reads 16 months and justifies the gap loosely ("deliveries lengthening the tail"), which is arguably already included in the 685. Worth a human look.
