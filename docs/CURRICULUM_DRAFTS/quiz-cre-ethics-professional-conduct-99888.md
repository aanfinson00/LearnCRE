# Quiz template: CRE Ethical Scenario Analysis

**Kind:** creEthicsScenarioAnalysis  
**Category:** other  
**Roles:** acquisitions, assetManagement, development  

## Prompt template

"A real estate agent is offered a commission of {commission} for a property that they know would benefit their friend at the cost of fairness to another potential buyer. If ethical standards require splitting the commission equally among all interested parties, what would be the reduced commission per party?"

## Inputs to randomize

- `{commission}`: [10000..50000] — Total commission offered for the property.
- `{parties}`: [2..4] — Number of interested parties.

## Expected computation

\({commission}/{parties}\)

## Answer unit

usd

## Tolerance

- type: abs
- band: 10

## Tips (3-5 lines, quick mental-math shortcuts)

- Divide the total commission by the number of parties to find the ethical split.
- Use rough estimates for large numbers to quickly approximate the answer.

## Solution narrative (template)

"Given a total commission of {commission} and {parties} interested parties, splitting it equally results in each party receiving \({commission}/{parties}\) dollars."
