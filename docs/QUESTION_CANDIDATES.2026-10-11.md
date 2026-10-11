# Candidate situational questions — 2026-10-11

**Coverage scan (shipped = "approved" bank; `question_submissions` is empty).**
72 situational cases. Thinnest areas:

| Area | Count | Note |
|---|---|---|
| Category `absorption` | 1 | thinnest category |
| Categories `comp-selection`, `sensitivity`, `lease-econ` | 2 each | thin |
| Role `development` | 9 situational / 10 templates | thinnest role (acquisitions: 40 / 60) |

These 10 drafts target those gaps. They are **not registered** in code; they await
review. Each follows the `SituationalCase` shape (one best option, 3–4 options). Math is hand-checked.
Format: **Q** · options (✅ best) · why · takeaway.

---

### 1. How fast does the office glut clear? — absorption · intermediate · office · acquisitions/portfolioMgmt
Submarket: 2.4M SF, 18% vacant, 60k SF net absorption per quarter, 200k SF of vacant new product delivering. You need 12% vacancy to underwrite your lease-up.
**Q:** Roughly how long until vacancy hits 12%?
- ✅ ~5–6 quarters. Base 2.6M SF; vacant = 432k + 200k = 632k; 12% target = 312k; 320k ÷ 60k ≈ 5.3 qtrs.
- ◻️ ~3 quarters — ignores the 200k SF delivery (432k−312k=120k ÷ 60k = 2).
- ◻️ ~8 quarters — computes 12% on the old 2.4M base and over-counts.
- ◻️ Never — office demand is structurally negative, so no number can be given.
**Takeaway:** Deliveries raise both numerator (vacant) and denominator (base). Re-base before dividing by absorption.

### 2. Spec industrial into a heavy pipeline — absorption · advanced · industrial · development/acquisitions
You plan 500k SF spec. Market absorbs 1.2M SF/yr; 1.5M SF is already under construction nearby.
**Q:** What does the pipeline imply for your lease-up underwriting?
- ✅ Visible supply is 2.0M SF ≈ 1.7 years of absorption; underwrite a longer lease-up and concessions, or pre-lease before starting.
- ◻️ Use the historical 12-month lease-up; absorption is what it is.
- ◻️ Assume you capture 100% of absorption because yours is the newest.
- ◻️ Ignore competing projects until they deliver.
**Takeaway:** Compare your lease-up to months of supply, not to last year's absorption.

### 3. Which sale is the best cap-rate comp? — comp-selection · intermediate · retail · acquisitions
Valuing a grocery-anchored center. Candidates: (a) arm's-length sale 4 months ago, 30 miles away, similar anchor credit; (b) sale 2 years ago next door; (c) bank-owned REO sale next door 3 months ago; (d) related-party sale 2 months ago next door.
**Q:** Which comp deserves the most weight?
- ✅ (a): recent, arm's-length, similar tenancy and credit; distance matters less than tenancy and timing.
- ◻️ (b): proximity beats recency in a market that has moved.
- ◻️ (c): most recent local trade, so most current.
- ◻️ (d): same reason as (c).
**Takeaway:** Screen first for arm's-length and comparable income quality, then for time and place.

### 4. Face rent vs what you really earn — lease-econ · intermediate · office · acquisitions/assetManagement
Competing lease: $30/SF face, 10 years, 12 months free, $80/SF TI.
**Q:** Approximate straight-line net effective rent?
- ✅ ≈ $19/SF: 30 − (30×1)/10 − 80/10 = 30 − 3 − 8.
- ◻️ $27/SF — only deducts free rent.
- ◻️ $22/SF — only deducts TI.
- ◻️ $30/SF — face rent is what the market quotes.
**Takeaway:** Compare concessions-adjusted rents; headline rent hides the TI and free-rent give-up.

### 5. Cap rate or NOI — which hurts more? — sensitivity · intermediate · all · portfolioMgmt/acquisitions
Value at a 6.0% exit cap. Option A: exit cap +50 bps. Option B: NOI 5% lower.
**Q:** Which reduces exit value more?
- ✅ A: 6.0→6.5% cuts value ≈7.7% (1−6.0/6.5) vs 5% for B.
- ◻️ B: NOI shortfalls always dominate.
- ◻️ Equal: 50 bps ≈ 5%.
- ◻️ Cannot be compared without leverage.
**Takeaway:** A cap-rate move of Δ bps changes value by Δ/new cap; at low caps, small moves bite hard.

### 6. What a 10% value drop does to equity — sensitivity · beginner · all · portfolioMgmt/mortgageUw
Property bought at 65% LTV; value falls 10%, debt unchanged.
**Q:** Equity loss?
- ✅ ≈ 28.6% (10 ÷ 35).
- ◻️ 10% — equity falls in line with value.
- ◻️ 6.5% — 10% × 65%.
- ◻️ 15.4% — 10 ÷ 65.
**Takeaway:** Equity loss = value loss ÷ equity share. Leverage multiplies downside.

### 7. Base-year stop: what does the tenant owe? — lease-econ · beginner · office · assetManagement
Modified gross lease; tenant occupies 20,000 of 100,000 SF; base-year opex $8.00/SF, current $9.50/SF.
**Q:** Annual reimbursement from this tenant?
- ✅ $30,000: ($9.50 − $8.00) × 20,000 SF.
- ◻️ $190,000 — total current opex × pro-rata share.
- ◻️ $38,000 — 20% of building-wide increase mis-scaled.
- ◻️ $0 — base-year leases absorb all increases.
**Takeaway:** Tenant pays its share of increases above the base year, not total opex.

### 8. Is a 70 bps spread enough? — pricing · intermediate · all · development
Yield on cost 6.2%; market exit cap 5.5%.
**Q:** Your call?
- ✅ Too thin: 6.2/5.5−1 ≈ 12.7% value creation on cost, short of typical 15–25% / 100–150 bps compensation for lease-up, cost and entitlement risk — rework or pass.
- ◻️ Proceed: any positive spread creates value.
- ◻️ Proceed: exit caps always compress during hold.
- ◻️ Pass: spreads under 200 bps never work.
**Takeaway:** Development must pay a premium over stabilized assets; compare spread to risk, not to zero.

### 9. Buying land before approvals — deal-process · intermediate · all · development
Seller wants a close in 45 days; rezoning takes ~12 months and is uncertain.
**Q:** Best structure?
- ✅ Contingent PSA or option: small non-refundable deposit, extended entitlement period, close after approvals.
- ◻️ Close now to win the site; entitlement is likely.
- ◻️ Close now with an earn-out to seller.
- ◻️ Decline; contingent contracts never get accepted.
**Takeaway:** Make land payment contingent on the risk that determines value: entitlement.

### 10. GMP before drawings are done — deal-process · advanced · all · development/mortgageUw
Plans are 60% complete; GC offers a GMP now.
**Q:** Best approach?
- ✅ Cost-plus with a fee cap now, converting to GMP once plans reach ~90–100%, with defined allowances and contingency ownership.
- ◻️ Sign the GMP now — certainty for the lender.
- ◻️ Pure cost-plus with no cap through completion.
- ◻️ Wait until 100% drawings before engaging any GC.
**Takeaway:** A GMP on incomplete scope buys a number and a change-order fight.
