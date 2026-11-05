# Question phrasing drafts — 2026-11-05

**Why these categories:** the approval counts live in Supabase (`question_submissions`), but the
`learncre` project is paused (INACTIVE), so the routine could not read them. Fallback: situational
cases per category in `src/quiz/situational/` — thinnest are `absorption` (1), `comp-selection` (2),
`lease-econ` (2), `sensitivity` (2) vs `deal-process` (21).

These are **drafts for review, not registered** in any `index.ts`. Each should be converted to a
`SituationalCase` (or quiz template) once approved. All math hand-checked.

## absorption

**1. Lease-up timing.** A 250-unit new build has 0 units leased and is absorbing 14 units/month. Lender requires 93% occupancy for stabilization. Months to stabilize?
- ✅ ~17 months (0.93 × 250 = 232.5 → 233 units ÷ 14 = 16.6)
- ◻️ ~18 months (uses 100% of units: 250 ÷ 14)
- ◻️ ~13 months (uses 70% as "stabilized")
- ◻️ Can't compute without rent growth

**2. Delivery shock.** Industrial submarket: 12.0M SF, 8% vacant. A 600k SF spec building delivers 100% vacant. Net absorption is 100k SF/month. How long to return to 8% vacancy?
- ✅ ~5.5 months (vacant: 960k + 600k = 1.56M of 12.6M = 12.4%; 8% of 12.6M = 1.008M; 552k ÷ 100k)
- ◻️ 6 months (ignores that the base grows with the delivery)
- ◻️ ~9.6 months (960k ÷ 100k; ignores new vacancy)
- ◻️ Never — new supply always lifts vacancy permanently

**3. Gross vs net absorption.** A submarket posts 80k SF of move-ins and 55k SF of move-outs this quarter. Which figure belongs in a lease-up underwriting?
- ✅ Net absorption, 25k SF — it nets the space handed back
- ◻️ Gross absorption, 80k SF — it shows demand
- ◻️ Average of the two, 67.5k SF
- ◻️ Move-outs only, 55k SF, as the conservative case

**4. Months of supply.** 480 units are available for lease in a submarket absorbing 40 units/month. What does the months-of-supply figure tell you, and what is it?
- ✅ 12 months; it's the time to clear current availability at the current pace, with no new deliveries
- ◻️ 12 months; it's the time for rents to recover
- ◻️ 0.083 months; availability ÷ absorption inverted
- ◻️ 480 months; availability ÷ 1 unit

## comp-selection

**5. Which comp leads?** Subject: 1985 office, 150k SF, suburban. Comps: (A) 2019 trophy tower, $450/SF, same submarket, 3 months ago; (B) 1988 office, $210/SF, 8 miles away, 4 months ago; (C) 1984 office, same submarket, $195/SF, 26 months ago. Best lead comp?
- ✅ B or C-with-time-adjustment — vintage and class match matter more than proximity alone; adjust C for market movement
- ◻️ A — newest, closest, most recent
- ◻️ Average all three
- ◻️ Discard all three; none is perfect

**6. Distressed comp.** A receiver sells a comparable asset at 20% below peers' pricing after a 6-week marketing window. How should it enter your comp set?
- ✅ Flag as non-arm's-length/distressed; use as a floor or cross-check, not a lead comp
- ◻️ Lead comp — most recent clearing price
- ◻️ Exclude silently
- ◻️ Gross up 20% and treat as normal

## lease-econ

**7. Net effective rent.** 10-year lease, $30/SF NNN, 6 months free rent, $50/SF TI. Undiscounted net effective rent per year?
- ✅ $23.50/SF ((30 × 9.5 = 285 − 50) ÷ 10)
- ◻️ $28.50/SF (ignores TI)
- ◻️ $30.00/SF (face rent)
- ◻️ $25.00/SF (subtracts TI from only year 1)

**8. Gross vs NNN offers.** Offer X: $38 full-service gross, building opex $12/SF. Offer Y: $27 NNN. Same term and TI. Which is better for the landlord on a net basis?
- ✅ Y — X nets to $26 NNN-equivalent (38 − 12), $1 below Y
- ◻️ X — higher headline number
- ◻️ Equal — all offers net out
- ◻️ Can't tell without cap rate

## sensitivity

**9. Exit-cap sensitivity.** Base case exits at a 5.5% cap. What is the approximate hit to exit value if the exit cap is 6.0% instead (same NOI)?
- ✅ ~8.3% lower (1 − 5.5 ÷ 6.0)
- ◻️ ~9.1% lower (uses 0.5 ÷ 5.5)
- ◻️ 0.5% lower
- ◻️ 50% lower

**10. DSCR breakeven.** Base DSCR is 1.35x. NOI falls 10% with debt service unchanged. New DSCR, and is a 1.25x covenant tripped?
- ✅ 1.215x; yes, covenant tripped (1.35 × 0.9)
- ◻️ 1.25x; exactly at covenant
- ◻️ 1.35x; DSCR is NOI-independent
- ◻️ 1.215x; no, covenants test annually only
