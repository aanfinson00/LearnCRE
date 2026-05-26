# Question Bank Additions — 2026-05-26

## Analysis: Underrepresented Areas

### By template count (quiz templates in `src/quiz/templates/`):

| Area | Template count | Templates |
|------|---------------|-----------|
| Industrial-specific | **2** | `clearHeightPremium`, `truckCountPerSf` |
| Retail-specific | **3** | `salesPerSf`, `occupancyCostRatio`, `percentageRentBreakpoint` |
| Hotel/Hospitality | **4** | `revparFromAdrOcc`, `gopMargin`, `ffeReserveDollars`, `revporVsRevpar` |
| Waterfall/Fund | 5 | `prefAccrual`, `waterfallSimpleSplit`, `gpCatchUp`, `gpEffectivePromote`, `irrAfterPromote` |

### By role tag (quiz templates tagged per role):

| Role | Tagged templates |
|------|-----------------|
| `acquisitions` | 60 |
| `assetManagement` | 20 |
| `portfolioMgmt` | 16 |
| `mortgageUw` | 16 |
| `development` | **10** |

**Conclusion:** Industrial and Retail are the thinnest asset-class areas. Development is the most underrepresented role. The 10 proposed additions below target these gaps.

---

## 10 Proposed New Question Phrasings

### Industrial — 4 new questions

---

#### 1. Industrial: Office Finish Ratio
- **Kind hint:** `industrialOfficePct` (new)
- **Role:** acquisitions, assetManagement, development
- **Difficulty:** beginner
- **Type:** solvable
- **Unit:** pct

**Prompt:**
> An 800,000 SF regional distribution center contains 16,000 SF of built-out office space. What percentage of total GLA is office finish?

**Expected answer:** 2% (= 16,000 / 800,000)

**Formula:** Office SF ÷ Total GLA

**Explanation:** Office finish ratio signals functional fit and future capex risk. Best-in-class logistics buildings run 2–5%; higher ratios (>10%) indicate legacy manufacturing or flex product that prices at a discount to pure bulk distribution.

---

#### 2. Industrial: Power Density
- **Kind hint:** `industrialPowerDensity` (new)
- **Role:** acquisitions, development
- **Difficulty:** intermediate
- **Type:** solvable
- **Unit:** multiple (amps per 1,000 SF)

**Prompt:**
> A 150,000 SF advanced-manufacturing facility has a 2,400-amp electrical service at 480V. What is the power density in amps per 1,000 SF?

**Expected answer:** 16.0 amps/1,000 SF (= 2,400 / 150)

**Formula:** Total amps ÷ (GLA in SF / 1,000)

**Explanation:** Power density is critical for cold storage, data-adjacent, and EV manufacturing tenants. General logistics needs ~4–6 amps/1,000 SF; advanced manufacturing targets 15–30+. Insufficient power is a hard constraint — utility upgrades can cost $1–3M and take 18–36 months, which caps re-tenanting options.

---

#### 3. Industrial: Trailer Storage Ratio
- **Kind hint:** `trailerStorageRatio` (new)
- **Role:** acquisitions, assetManagement
- **Difficulty:** beginner
- **Type:** solvable
- **Unit:** multiple (stalls per dock door)

**Prompt:**
> A 500,000 SF e-commerce fulfillment center has 80 dock-high doors and 240 trailer parking stalls. What is the trailer storage ratio (stalls per dock door)?

**Expected answer:** 3.0 stalls per dock (= 240 / 80)

**Formula:** Trailer stalls ÷ Dock doors

**Explanation:** Trailer storage ratio reflects tenant operational intensity. E-commerce and retail DC tenants typically require 3–5 stalls per dock for overnight staging. Cross-dock facilities run even higher. A ratio below 2.0 can impair a building's marketability to big-box distribution users.

---

#### 4. Industrial: Site Coverage Ratio
- **Kind hint:** `industrialSiteCoverage` (new)
- **Role:** acquisitions, development
- **Difficulty:** intermediate
- **Type:** solvable
- **Unit:** pct

**Prompt:**
> An industrial park sits on a 40-acre site; total building footprint is 1,050,000 SF. What is the site coverage ratio? (1 acre = 43,560 SF)

**Expected answer:** ~60.2% (= 1,050,000 / (40 × 43,560) = 1,050,000 / 1,742,400)

**Formula:** Building footprint SF ÷ (Site acres × 43,560)

**Explanation:** Site coverage governs truck-court depth, trailer staging, and parking. Bulk distribution typically targets 40–55% coverage to preserve adequate maneuvering room. Coverage above 60% compresses operational efficiency and can be a lease-up impediment for larger logistics users.

---

### Retail — 3 new questions

---

#### 5. Retail: Blended Anchor vs Inline Rent
- **Kind hint:** `retailBlendedRent` (new)
- **Role:** acquisitions, assetManagement
- **Difficulty:** intermediate
- **Type:** solvable
- **Unit:** usdPerSf

**Prompt:**
> A 200,000 SF neighborhood center has 100,000 SF of anchor space at $12.00/SF NNN and 100,000 SF of inline space at $28.00/SF NNN. What is the center's blended base rent per SF across all tenants?

**Expected answer:** $20.00/SF (= (100,000 × $12 + 100,000 × $28) / 200,000)

**Formula:** Weighted average: Σ(SF × Rent) ÷ Total SF

**Explanation:** Anchor rents typically run $8–16/SF NNN while inline rents command $22–45/SF. The blended figure is the right top-line metric for comparing centers of different compositions. A center with heavy anchor exposure will show a low blended rent that understates inline pricing power — don't benchmark blended without decomposing the mix.

---

#### 6. Retail: Co-Tenancy Clause Rent Reduction
- **Kind hint:** `retailCoTenancyRent` (new)
- **Role:** acquisitions, assetManagement
- **Difficulty:** intermediate
- **Type:** solvable
- **Unit:** usd

**Prompt:**
> An inline tenant pays $54,000/year in base rent. Their lease contains a co-tenancy clause granting a 25% rent reduction if the anchor goes dark. The anchor vacates. What is the tenant's revised annual base rent obligation?

**Expected answer:** $40,500 (= $54,000 × (1 − 0.25))

**Formula:** Revised rent = Base rent × (1 − reduction %)

**Explanation:** Co-tenancy clauses can cascade: when a major anchor vacates, inline tenants invoke rent reductions that compress NOI precisely when the center is most distressed. In a worst case, enough inline tenants invoking co-tenancy triggers can cut total NOI by 15–25%, further impairing value and DSCR at the moment refi or sale stress is already highest.

---

#### 7. Retail: Percentage Rent Total Rent Owed
- **Kind hint:** Extends `percentageRentBreakpoint`
- **Role:** acquisitions, assetManagement
- **Difficulty:** intermediate
- **Type:** solvable
- **Unit:** usd

**Prompt:**
> A specialty retailer pays $180,000/year in base rent. The lease includes 6% percentage rent on gross sales above the natural breakpoint. Annual gross sales are $3,500,000. What is the total rent the tenant owes?

**Expected answer:** $210,000

**Formula:**
1. Natural breakpoint = Base rent ÷ Pct rate = $180,000 / 0.06 = $3,000,000
2. Sales overage = $3,500,000 − $3,000,000 = $500,000
3. Percentage rent = $500,000 × 6% = $30,000
4. Total rent = $180,000 + $30,000 = $210,000

**Explanation:** This extends the breakpoint calculation (already in the bank) to the full rent obligation. The key two-step flow — compute breakpoint, then apply the rate to overage only — trips many candidates who mistakenly apply the rate to total sales.

---

### Development — 3 new questions

---

#### 8. Development: Construction Period Interest Carry
- **Kind hint:** `constructionInterestCarry` (new)
- **Role:** development, mortgageUw
- **Difficulty:** intermediate
- **Type:** solvable
- **Unit:** usd

**Prompt:**
> A $30M construction loan is drawn evenly over 30 months. The interest rate is 7.5% per annum on drawn balances only. Using an average drawn balance of 50% of total commitment over the construction period, what is the total interest carry?

**Expected answer:** $2,812,500 (= $30M × 50% × 7.5% × 2.5 years)

**Formula:** Total carry = Loan commitment × Avg draw % × Rate × Construction period (years)

**Explanation:** Interest carry is a major soft-cost line item — often 5–10% of total project cost on a 24–36 month schedule. Developers who model carry on the full commitment (rather than average drawn balance) overstate cost and make deals look worse than they are; those who ignore carry altogether understate it and blow up their return on re-underwriting.

---

#### 9. Development: Land Residual Value (Profit-on-Cost Method)
- **Kind hint:** `landResidual` (new)
- **Role:** development, acquisitions
- **Difficulty:** advanced
- **Type:** solvable
- **Unit:** usd

**Prompt:**
> A ground-up project will stabilize at a 5.5% cap on $4.125M of NOI (implied value: $75M). Hard and soft costs excluding land total $58M. The developer's required profit on cost is 20%. What is the maximum land price they can pay to hit their return target?

**Expected answer:** $4,500,000

**Formula:**
1. Max total project cost = Stabilized value ÷ (1 + profit margin) = $75M / 1.20 = $62.5M
2. Max land = Max TPC − Other costs = $62.5M − $58M = $4.5M

**Explanation:** The land residual is the development feasibility check most commonly tested at the senior level. Working backward from value → allowable cost → land bid is the fundamental discipline that separates developers who chase land from those who price it rationally. If land is trading above the residual, the deal doesn't pencil at your return target.

---

#### 10. Development: Developer Profit on Cost
- **Kind hint:** `developerProfitOnCost` (new)
- **Role:** development, acquisitions
- **Difficulty:** beginner
- **Type:** solvable
- **Unit:** pct

**Prompt:**
> A ground-up development: land $6M, hard costs $32M, soft costs $8M, interest carry $2M. The stabilized project sells for $60M. What is the developer's profit on cost?

**Expected answer:** ~25.0% (= ($60M − $48M) / $48M = $12M / $48M)

**Formula:** Profit on cost = (Sale price − Total project cost) ÷ Total project cost

**Explanation:** Profit on cost (also called "return on cost" or "development margin") is the go/no-go gate for every ground-up deal. Threshold varies by market cycle and product type: value-add conversion deals target 10–15%; ground-up spec industrial targets 15–20%; complex urban infill targets 20–30%+ to compensate for execution and entitlement risk. If yield on cost is the lender's frame, profit on cost is the developer's frame — both derive from the same TPC.

---

## Summary

| # | New question | Area | Kind hint | Status |
|---|-------------|------|-----------|--------|
| 1 | Office finish ratio | Industrial | `industrialOfficePct` | Proposed |
| 2 | Power density (amps/1k SF) | Industrial | `industrialPowerDensity` | Proposed |
| 3 | Trailer storage ratio | Industrial | `trailerStorageRatio` | Proposed |
| 4 | Site coverage ratio | Industrial | `industrialSiteCoverage` | Proposed |
| 5 | Blended anchor vs inline rent | Retail | `retailBlendedRent` | Proposed |
| 6 | Co-tenancy clause rent reduction | Retail | `retailCoTenancyRent` | Proposed |
| 7 | Percentage rent total owed | Retail | extends `percentageRentBreakpoint` | Proposed |
| 8 | Construction interest carry | Development | `constructionInterestCarry` | Proposed |
| 9 | Land residual (profit-on-cost method) | Development | `landResidual` | Proposed |
| 10 | Developer profit on cost | Development | `developerProfitOnCost` | Proposed |
