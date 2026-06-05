# Quiz template: DownturnRepricing

**Kind:** downturnRepricing  
**Category:** valuation  
**Roles:** acquisitions, assetManagement, portfolioMgmt  

## Prompt template

"An asset was acquired at a {oldCap}% cap on current NOI. In the downturn, NOI compresses {noiDropPct}% and buyer-required cap rates widen {capExpansionBps} bps. What % of acquisition value is lost?"

## Inputs to randomize

- `{oldCap}`: [4.5...6.5] — Going-in cap rate (%), one decimal.
- `{noiDropPct}`: [5...20] — NOI compression in the downturn (%), integer.
- `{capExpansionBps}`: [50...200] — Cap rate expansion (bps), step 25.

## Expected computation

`(1 - (oldCap * (1 - noiDropPct/100)) / (oldCap + capExpansionBps/100)) * 100`

## Answer unit

pctChange

## Tolerance

- type: pct
- band: 1.5

## Tips (3-5 lines, quick mental-math shortcuts)

- NOI cancels — only the ratio of (1 − NOI drop) to (newCap / oldCap) drives the answer.
- newCap / oldCap = 1 + (capExpansionBps / 100) / oldCap. On a 5.0% cap, 100 bps is a 20% cap multiplier.
- Cap expansion alone clips value by 1 − oldCap/newCap. 100 bps on a 5.0% cap = 16.7% clip before any NOI hit.
- Anchor case: 10% NOI drop + 100 bps on a 5.0% cap → exactly 25.0% value loss. Triangulate from there.
- Stack the two haircuts multiplicatively, not additively — that's the most common analyst mistake.

## Solution narrative (template)

"Acquisition value = NOI / {oldCap}%. Downturn value = (NOI × (1 − {noiDropPct}/100)) / ({oldCap} + {capExpansionBps}/100)%. The % loss is 1 − (newValue / oldValue), which simplifies to 1 − ({oldCap} × (1 − {noiDropPct}/100)) / ({oldCap} + {capExpansionBps}/100). NOI cancels because it appears in both numerator and denominator — the answer depends only on the cap-rate ratio and the NOI haircut."
