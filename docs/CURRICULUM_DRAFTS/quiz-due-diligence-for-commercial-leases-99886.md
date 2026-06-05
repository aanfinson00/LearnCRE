# Quiz template: LeaseDueDiligence

**Kind:** leaseDueDiligence
**Category:** legal-document
**Roles:** acquisitions, assetManagement, portfolioMgmt
**Pattern (formula in one line):** `costPerSquareFoot = totalLeaseCost / squareFootage`

## Prompt template

"The annual cost of a commercial lease is {totalLeaseCost}. The property size is {squareFootage} sq ft. Calculate the cost per square foot."

## Inputs to randomize

- `{totalLeaseCost}`: [1000, 25000] — Annual cost of the commercial lease
- `{squareFootage}`: [500, 10000] — Size of the property in sq ft

## Expected computation

`costPerSquareFoot = totalLeaseCost / squareFootage`

## Answer unit

usdPerSf

## Tolerance

- type: abs
- band: 0.1

## Tips (3-5 lines, quick mental-math shortcuts)

- Divide the total lease cost by a rough estimate of the property size for a quick approximation.
- Round up or down to simplify the division process.

## Solution narrative (template)

"The annual lease cost is divided evenly across each square foot of the property to determine the cost per square foot."
