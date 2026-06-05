# Quiz template: ReitVsDirectOwnership

**Kind:** reitVsDirectOwnership
**Category:** other
**Roles:** acquisitions, assetManagement, portfolioMgmt
**Pattern (formula in one line):** [not applicable for conceptual questions]

## Prompt template

"Consider a property with a value of {propertyValue}. If invested directly, the annual return is {directReturn}%. If invested in a REIT, the dividend yield is {reitDividendYield}% and management fees are {managementFees}%. Calculate the difference in annual returns."

## Inputs to randomize

- `{propertyValue}`: [1000000 - 5000000] — Property value
- `{directReturn}`: [4% - 6%] — Annual return from direct property ownership
- `{reitDividendYield}`: [3% - 5%] — Dividend yield for REIT investment
- `{managementFees}`: [1.0% - 2.5%] — Management fees as a percentage of asset value

## Expected computation

[(propertyValue * directReturn / 100) - (propertyValue * reitDividendYield / 100 + propertyValue * managementFees / 100)]

## Answer unit

usdChange

## Tolerance

- type: abs
- band: 50

## Tips (3-5 lines, quick mental-math shortcuts)

- Calculate the direct return as a fraction of the property value.
- Compute the REIT dividend plus management fees as a single percentage of the property value.

## Solution narrative (template)

"The difference in annual returns between direct ownership and investing in a REIT is primarily due to differences in the management fee structure. The direct ownership provides a higher annual return when compared to the combined yield and fees from a REIT investment, calculated based on the given property value."
