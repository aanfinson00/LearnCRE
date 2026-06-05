# Quiz template: ReitVsDirectOwnership

**Kind:** reitVsDirectOwnership
**Category:** other
**Roles:** acquisitions, assetManagement, portfolioMgmt
**Pattern (formula in one line):** afterTaxDividend = capital × (dividendYield/100) × (1 − (ordinaryTaxRate/100) × 0.80)

## Prompt template

"You hold a ${capital} position in a publicly-traded REIT yielding a {dividendYield}% ordinary dividend. You are in the {ordinaryTaxRate}% federal ordinary bracket. REIT ordinary dividends qualify for the 20% QBI deduction (Section 199A), so your effective rate on the dividend is 80% of your ordinary rate. What is your after-tax annual dividend in dollars?"

## Inputs to randomize

- `{capital}`: [100000 - 1000000, step 50000] — Capital invested in the REIT, in USD
- `{dividendYield}`: [3.0 - 6.0, step 0.5] — REIT ordinary dividend yield, in pct
- `{ordinaryTaxRate}`: [22 - 37, choose from {22, 24, 32, 35, 37}] — Federal ordinary income tax bracket, in pct

## Expected computation

afterTaxDividend = capital * (dividendYield / 100) * (1 - (ordinaryTaxRate / 100) * 0.80)

## Answer unit

usd

## Tolerance

- type: abs
- band: 50

## Tips (3-5 lines, quick mental-math shortcuts)

- Gross dividend first: capital × yield. A $500K position at 5% is $25K — anchor on that.
- The QBI deduction shrinks your effective rate to 80% of the bracket: 24% → 19.2%, 32% → 25.6%, 37% → 29.6%.
- After-tax shortcut: multiply gross by (1 − 0.8 × rate). At 25% bracket that's × 0.80; at 37% bracket that's × 0.704.
- Sanity check: even at the top 37% bracket, REIT dividends keep ~70% net — better than most ordinary income.

## Solution narrative (template)

"Gross dividend is {capital} × {dividendYield}% = ${grossDividend}. Because REIT ordinary dividends get the 20% QBI deduction, only 80% of the dividend is taxed at the ordinary rate — so the effective tax rate is {ordinaryTaxRate}% × 0.80 = {effectiveRate}%. After-tax dividend = ${grossDividend} × (1 − {effectiveRate}%) = ${afterTaxDividend}. This is the REIT's signature tax feature: ordinary-income-rate dividends with a ~20% haircut to the rate, but no depreciation shelter passing through."
