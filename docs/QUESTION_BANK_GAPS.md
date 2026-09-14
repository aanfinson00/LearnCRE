# Question bank coverage gaps — 2026-09-14

Recurring pass: tally the live question bank by tag/role and flag the areas
most in need of new content, then draft candidate phrasings to work from.

## Method

Counted `roles: [...]` across every entry in the two tagged content pools:

- `src/quiz/situational/*.ts` (71 tagged cases)
- `src/quiz/templates/*.ts` (68 tagged templates)

## Coverage by role (situational + templates combined)

| Role | Situational | Templates | Total |
|---|---:|---:|---:|
| acquisitions | 40 | 60 | 100 |
| assetManagement | 31 | 20 | 51 |
| portfolioMgmt | 25 | 16 | 41 |
| mortgageUw | 19 | 16 | 35 |
| **development** | **9** | **10** | **19** |

`development` is the clear outlier — roughly a fifth of the coverage
`acquisitions` has, and well behind every other role track. Two other
thinner spots worth a future pass: `difficulty: beginner` (4 of 71
situational cases) and asset class `hotel`/`retail` (1 and 2 of 34 tagged
cases, respectively) — but `development` is the largest, most consistent
gap across both content pools, so this batch targets it.

Existing `development`-tagged situational cases (for de-duplication):
absorption timing, change-order pricing, cost overruns, equity-first vs.
pari-passu, liquidated damages, retainage release, LTC vs. LTV, ground
lease vs. fee, and draw-package mechanics. The phrasings below intentionally
steer clear of those topics.

## 10 candidate phrasings — `development` role

Draft titles/prompts only (no math, options, or explanations yet) — ready
for someone to flesh out into full `SituationalCase` or quiz-template
entries.

1. **Entitlement risk — how much is the unentitled parcel actually worth?**
   Q: A developer is under contract on raw land contingent on rezoning. How
   should the purchase price reflect the entitlement risk before the
   variance is granted?

2. **GMP vs. cost-plus — which contract structure fits this project?**
   Q: For a ground-up deal with a still-evolving unit mix, which GC
   contract type should the developer push for, and what's the trade-off?

3. **Interest reserve — what happens when it runs dry before completion?**
   Q: The construction loan's interest reserve is set to be exhausted two
   months before substantial completion. What are the developer's options?

4. **Residual land value — what can you afford to pay for the site?**
   Q: Given a target yield-on-cost, an all-in construction budget, and a
   projected stabilized NOI, what's the maximum supportable land price?

5. **Pre-leasing hurdle — is the deal fundable yet?**
   Q: The construction lender requires 50% pre-leasing (by SF) before
   closing. At what point in leasing does the deal cross that threshold,
   and what should the developer do if absorption stalls short of it?

6. **CO vs. rent commencement — who eats the gap?**
   Q: Certificate of occupancy lands six weeks after the lease's outside
   date for rent commencement. Who bears the cost of that gap, and how
   should it have been structured upfront?

7. **Development promote — how is a ground-up deal's waterfall different?**
   Q: How should the GP promote structure for a development deal differ
   from a stabilized-asset acquisition's waterfall, given the added
   completion and lease-up risk?

8. **Hard cost vs. soft cost contingency — where should the dollars sit?**
   Q: Given a fixed total contingency budget, how should it be split
   between hard-cost and soft-cost lines, and what's the risk of getting
   that split wrong?

9. **GC payment/performance bonds — when does the developer actually need one?**
   Q: Under what circumstances should a developer require the GC to post
   payment and performance bonds, and what risk does skipping them leave
   uncovered?

10. **Phase I flags something — does the deal still pencil?**
    Q: A Phase I environmental report on the development site comes back
    with a recognized environmental condition (REC). What's the right next
    step before proceeding to Phase II or walking away?

## Next step

Pick from this list (or the beginner-difficulty / hotel-retail gaps noted
above) for the next content-authoring pass — turn the strongest 2-3 into
full `SituationalCase` entries under `src/quiz/situational/`, following the
existing file pattern (`title`, `category`, `difficulty`, `roles`,
`scenario`, `data`, `question`, 4 `options` with one `isBest` + explanations
on each).
