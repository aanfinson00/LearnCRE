<!-- audit run 2026-09-15 -->

# Situational question bank — category coverage audit

Counted every live `SituationalCase` in `src/quiz/situational/*.ts` (the
shipped, in-app question bank) by `category`. 71 cases total.

| Category | Label | Count |
|---|---|---|
| deal-process | Deal process | 21 |
| document-literacy | Document literacy | 13 |
| investment-thesis | Investment thesis | 9 |
| risk | Risk | 7 |
| pricing | Pricing | 7 |
| diagnostic | Diagnostic | 7 |
| **sensitivity** | **Sensitivity** | **2** |
| **lease-econ** | **Lease economics** | **2** |
| **comp-selection** | **Comp selection** | **2** |
| **absorption** | **Absorption** | **1** |

Four categories are badly underweighted relative to the rest of the bank —
`absorption` has a single case, and `sensitivity`, `lease-econ`, and
`comp-selection` have two apiece. Within those four, coverage is also
narrow on asset class / role / difficulty:

- `absorption`: only multifamily, only acquisitions/development, only intermediate.
- `sensitivity`: only `mixed` asset class, only acquisitions, only intermediate/advanced.
- `lease-econ`: only retail/office, only assetManagement/acquisitions, only intermediate.
- `comp-selection`: only industrial/multifamily, only acquisitions, only beginner/intermediate.

## 10 candidate phrasings to close the gap

Each targets an asset class / role / difficulty combo not yet covered in
its category. These are draft prompts (the learner-facing question + a
one-line premise) for the next author pass to build out into full
`SituationalCase` entries (4 options, explanations, takeaway, tips) —
not yet integrated into the app.

### Absorption (3 — the thinnest category)

1. **"Will the anchor's opening pull the shop space with it?"**
   *office · portfolioMgmt · beginner*
   A grocery-anchored retail center signs its anchor but shop-space
   leasing has historically lagged anchor opening by 2–3 quarters —
   learner computes how long until in-line space clears a leasing
   hurdle tied to the anchor's opening date.

2. **"Can this warehouse pre-lease to cover the construction loan covenant?"**
   *industrial · development · advanced*
   A spec industrial building under construction needs 40% pre-leasing
   before the lender releases the next draw; given current LOI pace,
   learner works out whether the covenant is met before shell delivery.

3. **"How many months of negative absorption can this submarket absorb before rents crack?"**
   *office · assetManagement · intermediate*
   A submarket is delivering more space than it's absorbing for three
   straight quarters — learner reasons through the vacancy trendline to
   flag when concessions/rent cuts become likely, not just "when is it full."

### Lease economics (3)

4. **"NNN escalations vs. flat bumps — which lease actually nets more?"**
   *industrial · mortgageUw · beginner*
   Two competing industrial leases (3% annual bumps vs. CPI-linked NNN
   escalations) are compared for effective rent over a 10-year term —
   learner picks which one produces a higher debt-yield-supporting NOI.

5. **"Is the loss-to-lease closing or widening?"**
   *multifamily · portfolioMgmt · advanced*
   A multifamily portfolio has in-place rents trailing market by a
   shrinking margin quarter over quarter — learner distinguishes real
   mark-to-market capture from renewal-driven noise in the loss-to-lease trend.

6. **"Does the ground-lease escalation eat the development spread?"**
   *mixed · development · advanced*
   A ground-leased development site has a step-up in ground rent at
   stabilization — learner checks whether yield-on-cost still clears
   the hurdle after the escalation hits.

### Sensitivity (2)

7. **"How much rent growth do you need to keep the refi DSCR test passing?"**
   *multifamily · assetManagement · beginner*
   A loan's DSCR covenant is tight at today's NOI — learner solves for
   the minimum annual rent growth needed over the next two years to
   clear the test at refinance.

8. **"How sensitive is this deal to a miss on percentage rent?"**
   *retail · mortgageUw · advanced*
   A retail tenant's percentage rent above its sales breakpoint is
   underwritten into NOI — learner stress-tests debt yield if tenant
   sales come in 15% below plan and percentage rent evaporates.

### Comp selection (2)

9. **"Which comps survive after you adjust for the renovation?"**
   *office · portfolioMgmt · advanced*
   A value-add office reposition needs a comp set that isolates the
   renovation premium — learner screens out comps that don't share
   vintage-adjusted quality after capex, not just submarket and size.

10. **"Power center or lifestyle center — which comp set actually applies?"**
    *retail · assetManagement · intermediate*
    A retail asset sits ambiguously between two comp pools with
    different cap-rate bases — learner picks the comp set whose tenant
    mix and trade-area dynamics actually match the subject, not the
    one with the most recent trades.

## Suggested next step

Build out #2 and #6 first (both `advanced`, both fill a role — `development`
— that has zero cases in three of these four categories), then round out
the remaining eight. Keep the asset-class/role/difficulty spread intentional
rather than defaulting back to `mixed`/`acquisitions`/`intermediate`, which is
how these four categories got this narrow in the first place.
