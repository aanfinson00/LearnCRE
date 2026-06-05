# Quiz template: LeaseNetEffectiveRent

**Kind:** leaseNetEffectiveRent
**Category:** legal-document
**Roles:** acquisitions, assetManagement, portfolioMgmt
**Pattern (formula in one line):** `ner = (faceRent * termYears - faceRent * freeRentMonths / 12 - tiAllowance) / termYears`

## Prompt template

"A landlord quotes ${faceRent}/SF starting base rent, flat over a {termYears}-year term, with {freeRentMonths} months of free rent and a ${tiAllowance}/SF TI allowance. Compute the net effective rent in $/SF/year."

## Inputs to randomize

- `{faceRent}`: [25, 60] — Starting base rent in $/SF/year (flat, NNN)
- `{termYears}`: [3, 10] — Lease term in years
- `{freeRentMonths}`: [0, 12] — Months of abated rent in Year 1
- `{tiAllowance}`: [0, 75] — Tenant improvement allowance in $/SF

## Expected computation

`ner = (faceRent * termYears - faceRent * freeRentMonths / 12 - tiAllowance) / termYears`

## Answer unit

usdPerSf

## Tolerance

- type: abs
- band: 0.25

## Tips (3-5 lines, quick mental-math shortcuts)

- Free rent in dollars per SF = faceRent × (freeRentMonths / 12). Convert months to a fraction of a year first.
- TI amortizes straight-line over the term: tiAllowance / termYears is the per-year drag on NER.
- Quick check: NER = faceRent − (freeRent$/SF + TI$/SF) / termYears. Same formula, fewer keystrokes.
- 6 months free on a 5-year lease ≈ 10% effective rent discount before TI. 12 months free ≈ 20%.
- $50/SF TI over 5 years = $10/SF/year drag. Memorize TI/term shortcuts for common terms.

## Solution narrative (template)

"Total face rent over the term is faceRent × termYears. Subtract the dollar value of free rent (faceRent × freeRentMonths / 12) and the TI allowance, then divide by term years to amortize all concessions evenly. The result is the rent the tenant effectively pays per SF per year — the only figure that lets you compare buildings with different concession packages."
