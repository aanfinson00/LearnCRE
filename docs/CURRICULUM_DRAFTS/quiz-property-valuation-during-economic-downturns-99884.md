# Quiz template: CapRateAdjustment

**Kind:** capRateSensitivity  
**Category:** valuation  
**Roles:** acquisitions, assetManagement, portfolioMgmt  

## Prompt template

"Given a property with NOI of {noi}, and its cap rate changes from {oldCap} to {newCap}. Calculate the percentage change in value."

## Inputs to randomize

- `{noi}`: [100000...500000] — Net Operating Income (NOI) of the property.
- `{oldCap}`: [4%...8%] — Original capitalization rate.
- `{newCap}`: [6%...12%] — New capitalization rate after economic downturn.

## Expected computation

`((noi / newCap - noi / oldCap) / (noi / oldCap)) * 100`

## Answer unit

pctChange

## Tolerance

- type: pct
- band: 1.5

## Tips (3-5 lines, quick mental-math shortcuts)

- Adjust the NOI by considering the inverse relationship between cap rate and property value.
- Remember that a lower cap rate generally indicates higher property valuation.

## Solution narrative (template)

"The percentage change in property value is calculated based on the change in the capitalization rate from {oldCap} to {newCap}, impacting the value as inversely proportional."
