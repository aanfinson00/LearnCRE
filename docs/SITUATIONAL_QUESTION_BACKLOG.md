# Situational question bank — coverage gaps & phrasing backlog

_Snapshot 2026-07-09, from `src/quiz/situational/*.ts` (71 cases)._

## Coverage snapshot

By `category`:

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
| **absorption** | **1** |

By `assetClass`:

| assetClass | count |
|---|---|
| multifamily | 11 |
| office | 9 |
| mixed | 8 |
| industrial | 3 |
| retail | 2 |
| **hotel** | **1** |

**Least-covered areas:** `absorption`, `sensitivity`, `lease-econ`, `comp-selection` on the category axis; `hotel`, `retail`, `industrial` on the asset-class axis. Everything below targets both gaps at once where possible — a case that's both an under-covered category *and* an under-covered asset class does double duty.

## 10 new phrasings for the next batch

Titles + one-line scenario framing, in the same wordy/situational style as `QUESTION_REVIEW.md`. Not fully built out (no options/takeaway yet) — these are candidate prompts to draft into full `SituationalCase` entries.

1. **"Is this shadow supply actually eating your absorption?"**
   *absorption · retail · intermediate* — A power-center submarket shows healthy net absorption on paper, but two big-box anchors gave formal notice and haven't vacated yet. Tests whether the learner nets out known-but-unvacated space before trusting a headline absorption number.

2. **"Does the spec build actually pencil at this pace?"**
   *absorption · industrial · advanced* — A developer is underwriting a speculative last-mile industrial building against a submarket absorbing 400k SF/quarter, but 2.5M SF is under construction and slated to deliver in the same 12 months. Tests supply-adjusted absorption math, not just the trailing pace.

3. **"Sublease space just hit the market — does your lease-up timeline still hold?"**
   *absorption · office · intermediate* — A CBD office submarket's absorption stats look stable, but a large tenant just listed 150k SF of sublease space. Tests whether shadow/sublease inventory should be added to the competitive set before recomputing time-to-stabilization.

4. **"How much does a 50bp exit-cap swing actually move this deal?"**
   *sensitivity · hotel · advanced* — A hotel acquisition underwrites to an 8.5% exit cap on stabilized NOI; the learner is asked to reason about the levered IRR delta from a 50bp cap move given the asset's higher cap-rate volatility vs. stabilized asset classes. Tests whether cap-rate sensitivity scales with asset-class risk, not a flat rule of thumb.

5. **"If rent growth misses by 100bps a year, is this deal still alive?"**
   *sensitivity · multifamily · intermediate* — A multifamily proforma assumes 4% annual rent growth; the learner is asked how a 100bp miss each year for the hold compounds into exit value and equity multiple. Tests compounding intuition vs. treating the miss as a one-time, additive hit.

6. **"How much cushion is actually in this deal if cap rates widen?"**
   *sensitivity · retail · intermediate* — A grocery-anchored retail acquisition is priced at a 6.25% cap with a business plan assuming flat cap rates at exit; learner is asked to reason about the exit-value cushion if cap rates widen 75bps over the hold. Tests going-in vs. exit cap discipline under a specific, named shock.

7. **"Is the percentage-rent breakpoint actually protecting you?"**
   *lease-econ · retail · intermediate* — A retail lease has a low base rent with percentage rent above a natural breakpoint; learner is asked whether the structure protects the landlord's downside if the tenant's sales underperform. Tests natural vs. artificial breakpoint mechanics and downside exposure.

8. **"Free rent vs. a lower face rate — which actually wins on NPV?"**
   *lease-econ · office · intermediate* — Two competing office lease proposals hit the same effective rent target through different structures: one with 6 months free rent at a higher face rate, one with no free rent at a lower face rate. Tests NPV-of-cash-flow-timing reasoning vs. anchoring on the "effective rent" headline number.

9. **"Which of these five hotel trades should you actually trust?"**
   *comp-selection · hotel · advanced* — A broker hands over 5 hotel trade comps spanning different flags, RevPAR tiers, and renovation vintages to support pricing a select-service asset. Tests comp vetting on flag/segment/renovation-recency rather than treating "recent + nearby" as sufficient.

10. **"This industrial comp set is loaded — which comps do you toss?"**
    *comp-selection · industrial · intermediate* — A broker's industrial comp set mixes bulk distribution and last-mile infill product, some pre-dating a rate-hike cycle, to support pricing a Class-A last-mile asset. Tests filtering comps on functional use-case and financing-environment relevance, not just recency and geography.

## Suggested next step

Build these out into full `SituationalCase` entries (`src/quiz/situational/*.ts`, schema in `src/types/situational.ts`) with `data`, `options` (one `isBest: true` + 3 plausible wrong answers with real explanations), `takeaway`, and `tips`, following the pattern in existing files like `absorptionTiming.ts` and `capRateDivergence.ts`. After adding, regenerate the review sheet:

```
npx vitest run src/test/extractQuestions.test.ts
```
