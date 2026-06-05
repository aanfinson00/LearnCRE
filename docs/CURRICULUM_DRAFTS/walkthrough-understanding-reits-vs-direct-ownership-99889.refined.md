# Understanding REITs vs. Direct Ownership

**Category:** concept-primer
**Audience:** pre-intern, career-switcher

## Setup narrative

You have $500,000 to deploy and two paths: (a) buy a small stabilized rental property all-cash for $500,000 producing $40,000 of NOI, or (b) put the same $500K into a publicly-traded REIT yielding a 5.0% dividend. Same capital, same asset class — but the cash flow, the tax treatment, and the work look nothing alike. We'll walk through the after-tax yield of each, side-by-side, so the trade-off is a number, not a vibe. Assume a 25% ordinary federal tax bracket, 88% of the purchase price allocated to building basis, and the standard 20% QBI deduction on REIT ordinary dividends.

## Steps

### Step 1 — Direct ownership cap rate
- **Prompt:** The property produces $40,000 of NOI on a $500,000 all-cash purchase. What is the going-in cap rate?
- **Expected:** 8.0%
- **Unit:** pct
- **Hint:** Cap rate = NOI / purchase price.
- **Result description:** An 8.0% cap rate sets the unlevered yield ceiling for the direct deal. Everything after this — management fees, taxes — only reduces it.

### Step 2 — Pre-tax cash flow after property management
- **Prompt:** A third-party property manager charges 10% of NOI to run the building. What is the pre-tax cash flow?
- **Expected:** $36,000
- **Unit:** usd
- **Hint:** Subtract 10% of $40,000 NOI from NOI.
- **Result description:** Direct ownership is operationally hands-on. Even with a manager doing the work, you wear 100% of the leasing, capex, and vacancy risk — for $36,000 of cash flow, or a 7.2% cash yield.

### Step 3 — Annual depreciation deduction
- **Prompt:** 88% of the $500,000 purchase price is allocated to building basis. Using a 27.5-year residential straight-line schedule, what is the annual depreciation deduction?
- **Expected:** $16,000
- **Unit:** usd
- **Hint:** Building basis = $500,000 × 88% = $440,000. Depreciation = $440,000 / 27.5.
- **Result description:** Depreciation is the single largest tax advantage of direct ownership. It's a non-cash expense that shelters real cash from tax.

### Step 4 — Federal tax owed on rental cash flow
- **Prompt:** Apply the 25% ordinary tax rate to taxable rental income (pre-tax cash flow minus depreciation). What is the federal tax bill?
- **Expected:** $5,000
- **Unit:** usd
- **Hint:** Taxable income = $36,000 − $16,000 = $20,000. Tax = 25% × $20,000.
- **Result description:** $36,000 of real cash, but only $20,000 of it is taxable thanks to the depreciation shelter. Direct ownership's tax efficiency is the depreciation, not the rate.

### Step 5 — After-tax cash flow, direct ownership
- **Prompt:** Pre-tax cash flow is $36,000 and the tax bill is $5,000. What is the after-tax cash flow?
- **Expected:** $31,000
- **Unit:** usd
- **Hint:** $36,000 − $5,000.
- **Result description:** $31,000 / $500,000 = a 6.2% after-tax cash yield on the direct deal. This is the number the REIT has to beat on an apples-to-apples basis.

### Step 6 — After-tax REIT dividend
- **Prompt:** The REIT pays a 5.0% dividend on the $500,000 stake. REIT ordinary dividends qualify for the 20% QBI deduction, so the effective tax rate is 25% × 80% = 20%. What is the after-tax REIT dividend?
- **Expected:** $20,000
- **Unit:** usd
- **Hint:** Gross dividend = $25,000. After-tax = $25,000 × (1 − 0.20).
- **Result description:** The 20% QBI deduction is REIT-specific and is why REIT dividends are not as tax-disadvantaged as people assume — but there's no depreciation shelter passing through to you.

### Step 7 — After-tax cash yield differential
- **Prompt:** Direct ownership delivers $31,000 of after-tax cash flow. The REIT delivers $20,000. What is the annual after-tax dollar advantage of direct ownership?
- **Expected:** $11,000
- **Unit:** usdChange
- **Hint:** $31,000 − $20,000.
- **Result description:** Direct ownership earns $11,000 more per year after tax — a 220 bps after-tax yield premium — but in exchange you take on illiquidity, single-asset concentration, capex risk, and operational drag. The REIT gives you daily liquidity, diversification across hundreds of assets, and zero leasing calls at 9pm.

## Takeaway

On identical $500K capital, direct ownership posts a 6.2% after-tax cash yield versus 4.0% for the REIT — an $11,000/yr advantage driven almost entirely by the depreciation shelter, not by the headline NOI. That premium is the price the market pays you for taking illiquidity, single-asset risk, and operational work. REITs trade some yield for liquidity, diversification, and the 20% QBI deduction. Neither is "better" — they're priced for different jobs.

## Notes for the converter

- All dollar figures tie out: $40K NOI → $36K pre-tax CF → $31K after-tax CF (direct) vs. $25K gross → $20K after-tax (REIT) → $11K differential.
- Depreciation uses 27.5-year residential schedule; swap to 39-year if the variant is a commercial asset (annual depreciation becomes ~$11,282, breaking the round numbers).
- QBI 20% deduction on REIT ordinary dividends is current law through 2025 and proposed to be extended — flag if the variant runs in a post-sunset world.
