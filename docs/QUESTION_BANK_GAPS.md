# Question bank coverage gaps — 2026-08-28

Automated pass over the shipped situational question bank (`src/quiz/situational/`,
71 cases as of this run) to find which `category` / `assetClass` / `role` tags are
thinnest, and propose new phrasings to close the gap. Counts pulled directly from
the `category:`, `assetClass:`, and `roles:` fields on each `SituationalCase`.

## Coverage by category (71 cases)

| category | count |
|---|---|
| deal-process | 21 |
| document-literacy | 13 |
| investment-thesis | 9 |
| risk | 7 |
| pricing | 7 |
| diagnostic | 7 |
| sensitivity | 2 |
| lease-econ | 2 |
| comp-selection | 2 |
| absorption | 1 |

`absorption`, `comp-selection`, `lease-econ`, and `sensitivity` are the clear
underweight categories — each has 1-2 shipped cases against 21 for `deal-process`.

## Coverage by asset class (tagged cases only; 38 of 71 are untagged/apply-to-all)

| assetClass | count |
|---|---|
| multifamily | 11 |
| office | 9 |
| mixed | 8 |
| industrial | 3 |
| retail | 2 |
| hotel | 1 |

`hotel` and `retail` are the thinnest asset classes.

## Coverage by role

| role | count |
|---|---|
| acquisitions | 40 |
| assetManagement | 31 |
| portfolioMgmt | 25 |
| mortgageUw | 19 |
| development | 9 |

`development` is the lightest role tag.

## 10 proposed phrasings

Targeting the four underweight categories above, weighted toward the thin
`hotel`/`retail` asset classes and the `development` role where they overlap
naturally. These are titles + a one-line scenario hook, in house style
(see `absorptionTiming.ts`, `capSpread.ts`, `compSetVetting.ts`,
`tiVsRentGiveBack.ts` for the full-case pattern) — not built out into full
`SituationalCase` objects yet.

1. **"Concessions are back — how does that change your lease-up timeline?"**
   *category: absorption · assetClass: multifamily · roles: development, acquisitions*
   A lease-up that was underwritten on face rents now needs 6 weeks free to move
   units. Ask: does the absorption pace assumption still hold, and what does the
   concession actually cost the stabilization date.

2. **"Pre-leasing is behind pro forma — does the construction loan still fund?"**
   *category: absorption · assetClass: industrial · roles: development, mortgageUw*
   A spec industrial building needs 40% pre-leased by a covenant date and is
   sitting at 22% with three months left. Ask: what's the real risk to the
   draw schedule.

3. **"A new anchor just signed — how much does that pull forward absorption?"**
   *category: absorption · assetClass: retail · roles: acquisitions, development*
   A power-center pad was stalled at 60% leased; a national anchor just
   executed. Ask: how much of the co-tenancy-driven shadow demand should get
   underwritten into the lease-up curve.

4. **"How much does a 25 bps rate move actually swing your IRR?"**
   *category: sensitivity · assetClass: multifamily · roles: acquisitions, portfolioMgmt*
   A deal pencils at a target IRR assuming a given exit cap and refi rate. Ask:
   which lever — rate or exit cap — the IRR is more sensitive to, and by how
   much per 25 bps.

5. **"What if renewal probability comes in 10 points lower than underwritten?"**
   *category: sensitivity · assetClass: office · roles: assetManagement, acquisitions*
   Underwriting assumed a 70% renewal probability on the anchor tenant; leasing
   is now signaling closer to 60%. Ask: how much downtime/TI exposure that
   10-point swing actually adds to year-1 cash flow.

6. **"Free rent or a lower face rate — which actually costs the landlord more?"**
   *category: lease-econ · assetClass: industrial · roles: acquisitions, assetManagement*
   Two competing lease proposals hit the same headline deal value: one trades
   3 months free at a higher face rent, the other a lower face rate with no
   concession. Ask: which one nets a higher effective rent on a PV basis.

7. **"Is the percentage-rent breakpoint set too low?"**
   *category: lease-econ · assetClass: retail · roles: assetManagement, acquisitions*
   A tenant's sales are running well ahead of pro forma and is already tripping
   the natural breakpoint most months. Ask: what that says about how the base
   rent was set relative to sales productivity.

8. **"Should you even be using these comps for a hotel underwrite?"**
   *category: comp-selection · assetClass: hotel · roles: acquisitions*
   The comp set mixes select-service and full-service assets with very
   different RevPAR and GOP margin profiles. Ask: which comps actually belong
   in the set and which should get thrown out or adjusted.

9. **"The broker's comp set skews suburban — does it still support the cap rate?"**
   *category: comp-selection · assetClass: office · roles: acquisitions*
   A CBD office acquisition is being pitched against a comp set that's mostly
   suburban trades at a wider cap. Ask: is the cap rate defensible once the
   comp set is corrected for submarket.

10. **"Which assumption actually moves the exit value the most?"**
    *category: sensitivity · assetClass: mixed · roles: portfolioMgmt, acquisitions*
    A hold/sell model has three live variables — exit cap, hold period, and
    rent growth — all moving at once in the sponsor's sensitivity table. Ask:
    isolate which single assumption is doing the most work on the exit value,
    and why that's the one to stress-test hardest before committing.

## Next step

Pick whichever of these pass review, then build them out into full
`SituationalCase` objects in `src/quiz/situational/` — follow the shape
(title, category, scenario, data points, question, 4 options with one
`isBest`, takeaway, tips, difficulty, assetClass, roles) and wire the new
file into `src/quiz/situational/index.ts`. After adding, regenerate the
review sheet per `feedback/README.md`:

```
npx vitest run src/test/extractQuestions.test.ts
```
