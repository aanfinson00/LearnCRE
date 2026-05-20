# Question Bank Gap Analysis — 2026-05-20

## Coverage Summary by Area

| Area | Quiz Templates | Interview Qs | Notes |
|------|---------------|--------------|-------|
| Acquisitions (role) | 60 | 12 | Very well covered |
| Asset Management (role) | 20 | 10 | Reasonable coverage |
| Mortgage Underwriting (role) | 16 | 10 | Reasonable coverage |
| Portfolio Management (role) | 16 | 8 (3 GAPs) | Moderate; 3 open GAPs |
| Development (role) | 10 | 7 (2 GAPs) | **Lowest role coverage** |
| Hotel (asset class) | 4 | — | **Only 4 dedicated templates** |
| Industrial (asset class) | 2 | — | **Only 2 dedicated templates** |
| Retail (asset class) | ~10 | — | Good coverage |
| Multifamily (asset class) | ~6 | — | Adequate |

**Underrepresented areas (ranked by severity):**
1. Industrial asset class — 2 templates (`clearHeightPremium`, `truckCountPerSf`)
2. Hotel asset class — 4 templates (`revparFromAdrOcc`, `gopMargin`, `ffeReserveDollars`, `revporVsRevpar`)
3. Development role — 10 templates, 2 open GAPs in `interview-questions.md`
4. Portfolio Management — 3 open GAPs; a few templates but situational depth is thin

---

## 10 New Question Phrasings

Questions are grouped by the underrepresented area they address. Each entry
includes a proposed `kind` slug, the question prompt (with representative
numbers baked in), the formula/calculation, and the expected answer so the
template author can implement generate() logic.

---

### HOTEL (3 questions — brings template count from 4 → 7)

#### 1. Hotel: ADR Back-Calculation
- **Proposed kind:** `adrFromRevparOcc`
- **Label:** Hotel: ADR from RevPAR + Occupancy
- **Category:** valuation
- **Roles:** acquisitions, assetManagement
- **Pattern:** RevPAR ÷ Occupancy

**Prompt:**
> A 280-room select-service hotel posted $162 RevPAR last month at 74% occupancy. What was the property's ADR?

**Formula:** ADR = RevPAR ÷ Occupancy
**Answer:** $162 ÷ 0.74 = **$218.92**

**Why it matters:** The reverse of `revparFromAdrOcc` — interviewers often present RevPAR and occupancy and ask you to back into ADR. Tests whether the candidate understands the relationship directionally, not just formulaically.

**Tips for template:**
- Vary RevPAR from $90–$280; occupancy from 55%–88%.
- Round ADR to nearest $0.50 or $1 at beginner difficulty.
- Common trap: dividing RevPAR by rooms (confusing room count with occupancy pct).

---

#### 2. Hotel: Total Room Revenue
- **Proposed kind:** `hotelRoomRevenue`
- **Label:** Hotel: Total Room Revenue
- **Category:** valuation
- **Roles:** acquisitions, assetManagement, mortgageUw
- **Pattern:** ADR × Occupancy × Rooms × Days

**Prompt:**
> A 150-room full-service hotel runs at $195 ADR and 78% occupancy for a 31-day month. What is total room revenue for the month?

**Formula:** Room Revenue = ADR × Occupancy Rate × Total Rooms × Days in Period
**Answer:** $195 × 0.78 × 150 × 31 = **$706,005**

**Why it matters:** Lenders and appraisers use trailing-12-month room revenue as a key underwriting input. Candidates who can run this calculation quickly demonstrate hotel-specific fluency. Bridges the gap between RevPAR (the per-available-room metric) and actual gross revenue.

**Tips for template:**
- Vary room count (80–500), ADR ($110–$300), occupancy (55%–88%), period (30/31/28/90/365 days).
- At advanced difficulty use non-round ADR and partial-year periods.
- Mental math shortcut: (ADR × Occ) = RevPAR, then RevPAR × Rooms × Days.

---

#### 3. Hotel: NOI from GOP and Fixed Charges
- **Proposed kind:** `hotelNoiFromGop`
- **Label:** Hotel: NOI from GOP + Fixed Charges
- **Category:** valuation
- **Roles:** acquisitions, assetManagement, mortgageUw
- **Pattern:** GOP − property tax − insurance − FF&E reserve

**Prompt:**
> A hotel reports $3.6M GOP on $9.5M total revenue. Fixed charges: $290K property taxes, $85K insurance. The lender requires a 4% FF&E reserve on total revenue. What is estimated hotel NOI?

**Formula:** NOI = GOP − Fixed Charges (property tax + insurance + FF&E reserve)
**Answer:** $3,600,000 − $290,000 − $85,000 − ($9,500,000 × 4%) = $3,600,000 − $375,000 − $380,000 = **$2,845,000**

**Why it matters:** Many candidates stop at GOP margin and don't know the bridge to NOI. The FF&E deduction from *revenue* (not GOP) is a consistent interview gotcha. This is the companion question to `gopMargin` and `ffeReserveDollars`.

**Tips for template:**
- GOP margin range: 28%–45% of revenue.
- Fixed charges: property tax $200K–$600K, insurance $60K–$150K.
- FF&E reserve rate: 3%–5% of total revenue.
- Always compute FF&E on *total revenue*, not on GOP.

---

### INDUSTRIAL (3 questions — brings template count from 2 → 5)

#### 4. Industrial: Land Coverage Ratio
- **Proposed kind:** `industrialLandCoverage`
- **Label:** Industrial: Land Coverage Ratio
- **Category:** valuation
- **Roles:** acquisitions, development
- **Pattern:** Building SF ÷ Site SF

**Prompt:**
> A 425,000 SF distribution center sits on an 18.5-acre site. What is the land coverage ratio? (Use 43,560 SF per acre.)

**Formula:** Coverage Ratio = Building SF ÷ (Acres × 43,560)
**Answer:** 425,000 ÷ (18.5 × 43,560) = 425,000 ÷ 805,860 = **52.7%**

**Why it matters:** Coverage ratio determines how much of the site is left for trailer parking, truck courts, and auto parking — which directly affects functional utility and rent. Modern logistics requires 30–40% coverage to accommodate 130-ft truck courts; high coverage (>55%) is a functional deficiency.

**Tips for template:**
- Building SF: 200,000–1,200,000 SF; Acres: 10–60 acres.
- Benchmark: well-designed distribution = 35%–50% coverage; cross-dock = 25%–35%; urban infill can reach 60%+.
- Always convert acres to SF using 43,560 — this is the unit-conversion trap.

---

#### 5. Industrial: Effective Rent Across Partial Vacancy
- **Proposed kind:** `industrialEffectiveRent`
- **Label:** Industrial: Portfolio Effective Rent (with Vacancy)
- **Category:** valuation
- **Roles:** acquisitions, assetManagement
- **Pattern:** (Occupied SF × In-Place Rent) ÷ Total SF

**Prompt:**
> A 5-building industrial park totals 1.2M SF. Two buildings (180,000 SF combined) are vacant. Occupied space leases at $7.25/SF NNN. What is the blended effective rent per SF across the full portfolio?

**Formula:** Effective Rent = (Occupied SF × In-Place Rent) ÷ Total SF
**Answer:** (1,020,000 × $7.25) ÷ 1,200,000 = $7,395,000 ÷ 1,200,000 = **$6.16/SF**

**Why it matters:** Asset managers and portfolio managers use this to quickly size rent-to-value. The subtle point — you divide by *total* SF, not occupied SF — is a common error candidates make when thinking about "average" rent. This is the portfolio NOI-per-SF calculation in disguise.

**Tips for template:**
- Total portfolio: 400K–3M SF; vacancy: 5%–30% of total.
- In-place rents: $4.50–$14.00/SF NNN depending on market.
- Trap: candidates who just report the in-place occupied rent rather than blending vacancy.

---

#### 6. Industrial: Dock-High Door Ratio
- **Proposed kind:** `dockHighRatio`
- **Label:** Industrial: Dock-High Door Ratio
- **Category:** valuation
- **Roles:** acquisitions, assetManagement, development
- **Pattern:** Dock-high doors ÷ Total doors

**Prompt:**
> A 650,000 SF distribution warehouse has 96 dock-high doors and 8 grade-level drive-in doors. What percentage of loading doors are dock-high?

**Formula:** Dock-High % = Dock-High Doors ÷ Total Doors
**Answer:** 96 ÷ (96 + 8) = 96 ÷ 104 = **92.3%**

**Why it matters:** Dock-high vs. grade-level mix is a direct functional-quality signal. Distribution and e-commerce tenants want 95%+ dock-high; grade-level drive-ins serve smaller manufacturers. A building with 70% dock-high trades at a discount vs. Class A logistics. This is the functional-quality analog to `clearHeightPremium`.

**Tips for template:**
- Building SF: 100,000–1,500,000 SF.
- Dock-high doors: 12–240; grade-level: 2–20.
- Benchmarks: Class A logistics = 90%+ dock-high; flex/light industrial = 60%–80%.
- Unit: percent (format as pct).

---

### DEVELOPMENT (4 questions — addresses open GAPs from interview-questions.md)

#### 7. Development: FAR-Based Maximum Buildable SF
- **Proposed kind:** `farBuildableSf`
- **Label:** Development: FAR → Max Buildable SF
- **Category:** valuation
- **Roles:** development, acquisitions
- **Pattern:** Lot SF × FAR

**Prompt:**
> A developer controls a 1.75-acre infill site zoned with a 12.0 FAR. What is the maximum gross buildable SF? (43,560 SF per acre.)

**Formula:** Max Buildable SF = (Acres × 43,560) × FAR
**Answer:** (1.75 × 43,560) × 12.0 = 76,230 × 12.0 = **914,760 SF**

**Why it matters:** FAR → buildable SF is step one of every development underwriting. Candidates who can't do the unit conversion (acres → SF → apply FAR) often missize the project. This is the entry point for yield-on-cost, which already has a template.

**Tips for template:**
- Site: 0.5–5.0 acres; FAR: 2.0–20.0.
- Urban high-density: FAR 10–20; suburban mid-rise: FAR 2–5; industrial/flex: FAR 0.35–0.60.
- Common trap: applying FAR to acres directly instead of converting to SF first.

---

#### 8. Development: Hard-Cost Escalation Contingency
- **Proposed kind:** `constructionCostEscalation`
- **Label:** Development: Construction Cost Escalation Budget
- **Category:** returns
- **Roles:** development, mortgageUw
- **Pattern:** Hard Costs × Annual Rate × (Months ÷ 12)

**Prompt:**
> A developer budgets $72M in hard costs with a 22-month construction timeline. Assumed cost escalation is 4.5% per annum. How much additional dollar contingency should be reserved for escalation alone?

**Formula:** Escalation $ = Hard Costs × Annual Rate × (Construction Months ÷ 12)
**Answer:** $72M × 4.5% × (22 ÷ 12) = $72M × 4.5% × 1.833 = **$5.94M**

**Why it matters:** Sponsors who ignore escalation risk understate TPC, which compresses yield-on-cost and can flip a viable deal to infeasible after GMP execution. This pairs with `contingencyDrawDown` (which tracks remaining contingency) and `costToComplete`. Escalation is a real-time variable interviewers ask about in 2024–2025 post-inflation cycles.

**Tips for template:**
- Hard costs: $30M–$150M; timeline: 12–36 months; escalation rate: 2%–6%/year.
- Convention: simple linear escalation over the midpoint of construction is sometimes used; prompt as-stated uses full-period convention.
- Unit: usd.

---

#### 9. Development: Developer Fee on Hard and Soft Costs
- **Proposed kind:** `developerFee`
- **Label:** Development: Developer Fee Calculation
- **Category:** returns
- **Roles:** development, portfolioMgmt
- **Pattern:** (Hard Costs × Hard Rate) + (Soft Costs × Soft Rate)

**Prompt:**
> A ground-up project has $55M hard costs and $9M soft costs. The sponsor charges a 3% developer fee on hard costs and a 2% fee on soft costs. What is the total developer fee?

**Formula:** Dev Fee = (Hard Costs × Hard Rate) + (Soft Costs × Soft Rate)
**Answer:** ($55M × 3%) + ($9M × 2%) = $1,650,000 + $180,000 = **$1,830,000**

**Why it matters:** The developer fee is a TPC line item that shifts cost from the project to the GP's pocket — it directly affects investor returns in a GP/LP structure. Candidates who conflate it with the asset management fee, or apply it to TPC rather than component costs, make material errors in deal analysis. This bridges to `feeDragOnIrr`.

**Tips for template:**
- Hard costs: $25M–$120M; soft costs: $3M–$20M.
- Developer fee on hard costs: 2%–4%; on soft costs: 1%–3% (or zero — vary this).
- Harder variant: apply single blended rate to TPC (less common, easier math).
- Unit: usd.

---

#### 10. Development: Equity Required at Construction Closing (LTC)
- **Proposed kind:** `constructionEquityCheck`
- **Label:** Development: Equity Check at Construction Closing
- **Category:** returns
- **Roles:** development, mortgageUw
- **Pattern:** TPC − Construction Loan − Land Equity Already Paid

**Prompt:**
> A development has a $68M TPC. The sponsor acquired the land for $12M with all equity (no debt). The construction lender will fund 60% LTC on TPC. How much additional equity must the sponsor contribute at construction closing?

**Formula:** Loan = TPC × LTC%; Additional Equity = TPC − Loan − Land Already Paid
**Answer:** Loan = $68M × 60% = $40.8M; Additional Equity = $68M − $40.8M − $12M = **$15.2M**

**Why it matters:** Addresses the open GAP from `interview-questions.md` ("Construction loan sizing on a $50M TPC dev with 65% LTC. What's the equity check?"). Most candidates forget that land equity already contributed reduces the residual equity check at closing. Getting this wrong materially overstates the sponsor's cash requirement and understates returns.

**Tips for template:**
- TPC: $30M–$200M; LTC: 55%–70%; land cost: 8%–20% of TPC.
- Vary whether land has been purchased (reduces equity check) vs. is part of TPC funded at closing.
- Companion template: `constructionLoanSizing` already exists for the straight LTC sizing; this adds the land-equity twist.
- Unit: usd.
