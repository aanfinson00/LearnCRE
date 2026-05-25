# Question Bank Additions — Gap Analysis & New Phrasings

## Gap Analysis

**10 templates exist with full generator code but are not assigned to any cert module benchmark or final exam.**
These represent the highest-priority content gaps — the machinery is built, but no learning path sends students through them.

| Template | Category | Roles | Missing From |
|---|---|---|---|
| `vacancySensitivity` | valuation | acquisitions | All certs |
| `otherIncomeImpact` | valuation | acquisitions | All certs |
| `opexPerUnit` | valuation | acquisitions | All certs |
| `rentPerUnit` | valuation | acquisitions | All certs |
| `grossRentMultiplier` | valuation | acquisitions | All certs |
| `capexReserveSizing` | returns | assetManagement, acquisitions | All certs |
| `refiStressTest` | returns | mortgageUw, portfolioMgmt | All certs |
| `feeDragOnIrr` | returns | portfolioMgmt, acquisitions | All certs |
| `leaseUpReserve` | returns | development, acquisitions | All certs |
| `constructionLoanSizing` | returns | development, mortgageUw | All certs |

**Secondary gaps — cert modules with zero quiz benchmarks (situational/walkthrough only):**

- Developer M4 — Feasibility (no numeric quiz practice)
- Acquisitions M3 — Underwriting discipline (no numeric quiz practice)
- Acquisitions M4 — Mock acquisition (no numeric quiz practice)
- Mortgage UW M3 — Sponsor analysis (no numeric quiz practice)
- Mortgage UW M4 — Refi stress (no numeric quiz practice)
- Mortgage UW M5 — Loan-doc literacy (no numeric quiz practice)
- Asset Manager M4 — Capex + reserves (no numeric quiz practice)

---

## 10 New Question Phrasings

Each phrasing targets one of the 10 orphaned templates with an alternative angle to the prompt the template already generates, covering a different entry point into the same concept.

---

### 1. `vacancySensitivity` — gross-income framing
> **Prompt:** "Combined gross income (GPR + other) is $4.8M at a 5.75% cap. Occupancy improves from 88% to 92%. What's the value lift in dollars?"
>
> **Answer type:** `usdChange`  
> **Formula:** (Gross × ΔOccupancy) / Cap  
> **Why this angle:** The existing template splits GPR and other income as separate inputs; this version gives total gross — a more common presentation in OM comp tables and the format most buyers encounter in deal packages.

---

### 2. `otherIncomeImpact` — parking/amenity addition framing
> **Prompt:** "A new parking program adds $150,000/yr of net other income. The property runs 6% vacancy and comps trade at a 5.5% cap. What value does the parking income create?"
>
> **Answer type:** `usd`  
> **Formula:** $150,000 × (1 − 0.06) / 0.055  
> **Why this angle:** The existing template uses a signed "change" frame. This version is an additive value-creation frame — the language analysts and AM teams use when pitching an income-add initiative to IC.

---

### 3. `opexPerUnit` — monthly per-door framing
> **Prompt:** "Annual operating expenses for a 180-unit apartment property are $990,000. What's the monthly OpEx per door?"
>
> **Answer type:** `usd`  
> **Formula:** $990,000 / 180 / 12  
> **Why this angle:** The existing template asks for annual per-unit. Monthly per-door is the benchmark lenders and appraisers actually cite in rent rolls and UW files; quoting it monthly is the field convention for residential MF.

---

### 4. `rentPerUnit` — monthly aggregate → per-unit
> **Prompt:** "A 240-unit complex collects $432,000/month in gross scheduled rent. What's the average monthly rent per unit?"
>
> **Answer type:** `usd`  
> **Formula:** $432,000 / 240  
> **Why this angle:** The existing template gives annual GPR and asks for annual per-unit. Rent rolls are always quoted monthly in MF; this phrasing matches how the input arrives in the field.

---

### 5. `grossRentMultiplier` — implied price from GRM (reverse direction)
> **Prompt:** "Comparable sales suggest multifamily trades at a 12.5× GRM in this submarket. The subject property's annual gross potential rent is $2,400,000. What's the GRM-implied value?"
>
> **Answer type:** `usd`  
> **Formula:** 12.5 × $2,400,000  
> **Why this angle:** The existing template solves forward (price / rent = GRM). This solves in reverse — the more common use case in acquisitions, where the GRM multiple is known from comps and the analyst is backing into a bid.

---

### 6. `capexReserveSizing` — annual reserve only (no hold period)
> **Prompt:** "An underwriter applies a $0.35/SF/year capex reserve to an 85,000 SF suburban office building. What annual dollar amount should flow into the reserve account?"
>
> **Answer type:** `usd`  
> **Formula:** 85,000 × $0.35  
> **Why this angle:** The existing template sizes total reserves over a hold period. Asset managers and lenders often want the annual budget figure to normalize T-12 NOI; stripping out the hold-period multiplier isolates that question.

---

### 7. `refiStressTest` — equity cure shortfall framing
> **Prompt:** "A $16M bridge loan matures on an asset with $1.1M of NOI. The refi lender caps proceeds at 65% LTV and the exit cap is 6.25%. How much cash must the sponsor bring to closing to retire the bridge?"
>
> **Answer type:** `usd`  
> **Formula:** Paydown = Existing loan − (65% × NOI / exitCap)  
> **Why this angle:** The existing template asks for the maximum cap rate that avoids a paydown ("stressed cap"). This version fixes the exit cap and asks for the dollar shortfall — the number that actually appears in the lender's maturity extension memo.

---

### 8. `feeDragOnIrr` — basis-point drag framing
> **Prompt:** "Deal-level IRR is 16% over a 7-year hold. Annual management fee is 1.5% on committed capital. How many basis points does the fee drag reduce the LP's IRR?"
>
> **Answer type:** `bps`  
> **Formula:** IRR drag in bps = (IRR_deal − LP_net_IRR) × 10,000  
> **Why this angle:** The existing template asks for the LP's net IRR as a percentage. Quoting the drag in bps is the common way fund LPs and placement agents frame fee conversation — "1.5% fees cost you ~150 bps of IRR on a 7-year hold."

---

### 9. `leaseUpReserve` — ground-up office framing
> **Prompt:** "A new ground-up office building achieves stabilization over 18 months on a linear ramp from 0 to 100% occupancy. Stabilized NOI is $2.4M. What lease-up reserve is needed to fund the NOI shortfall during the ramp?"
>
> **Answer type:** `usd`  
> **Formula:** $2.4M × (18 / 12) × 0.5  
> **Why this angle:** The existing template uses multifamily as its narrative context. Office ground-up deals have the same math but longer ramp windows and larger per-SF NOI, making the numbers feel different — good for asset-class fluency.

---

### 10. `constructionLoanSizing` — max loan (not equity check) framing
> **Prompt:** "A ground-up multifamily has $52M in total project cost. The construction lender's LTC constraint is 65%. What are the maximum loan proceeds the developer can draw?"
>
> **Answer type:** `usd`  
> **Formula:** $52M × 65%  
> **Why this angle:** The existing template asks for the equity check (TPC × (1 − LTC)). This version asks for the loan proceeds — what the banker quotes on their term sheet and what the developer uses to size the equity raise. Two sides of the same arithmetic, different interview entry points.

---

## Recommended Next Steps

1. Assign the 10 orphaned templates to cert modules (see gap table above) — this is the highest ROI fix since the question generators already exist.
2. Add alternate prompt variants to each template's `generate()` function using `rng.pickFromSet([promptA, promptB])` so students encounter varied language.
3. Wire `refiStressTest` and `feeDragOnIrr` into Mortgage UW M4 (refi stress) and Portfolio Manager M2 (fund math) respectively — both are natural fits with no new content needed.
4. Add `leaseUpReserve` and `constructionLoanSizing` to Developer M1 or M2 benchmark `kindSet` — they complete the developer debt + cost picture.
