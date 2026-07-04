# Question bank coverage audit — 2026-07-04

## Where the bank is thin

Counting `roles: [...]` tags across `src/quiz/templates/*.ts` +
`src/quiz/situational/*.ts` (untagged content is catch-all and excluded from
these counts):

| Role              | Templates | Situational | Total |
|-------------------|-----------|-------------|-------|
| acquisitions      | 60        | 40          | 100   |
| assetManagement    | 20        | 31          | 51    |
| portfolioMgmt      | 16        | 25          | 41    |
| mortgageUw         | 16        | 19          | 35    |
| **development**    | **10**    | **9**       | **19** |

`development` is the least-approved/least-shipped role by a wide margin —
about a fifth of the acquisitions count, and the longform layer only has one
development-tagged case (`devFeasibilityMemo`) versus three each for
acquisitions/mortgageUw-adjacent roles. `ROADMAP.md`'s "Question-base depth
pass — Phase 1" (99) flagged this exact skew in an earlier audit and queued
"Phases 2-4" (walkthrough role/asset retrofit, modeling-test asset-class
expansion, vocab depth pass) — those phases never shipped, so the gap is
still open.

Secondary gap, same root cause: asset-class distribution in situationals
still skews multifamily/office-heavy relative to retail/industrial/hotel
(noted in the same ROADMAP entry; not re-audited here).

## 10 draft phrasings — development role

These target sub-topics **not yet represented** in `templates/` or
`situational/` (checked against `constructionLoanSizing`, `devSpread`,
`yieldOnCost`, `costToComplete`, `drawAllocation`, `contingencyDrawDown`,
`retainageRunning`, `leaseUpReserve`, `clearHeightPremium`,
`truckCountPerSf`, `absorptionTiming`, `constructionChangeOrderPricing`,
`constructionCostOverrun`, `constructionEquityFirstVsParipassu`,
`constructionLiquidatedDamages`, `constructionRetainageRelease`,
`devLtcVsLtv`, `groundLeaseVsFee`, `lenderDrawMechanics`,
`devFeasibilityMemo`). Each is scenario-style, matching the house voice
(concrete numbers, one clean question, ready to become a `situational` case
or quiz `template`).

1. **Entitlement carry cost.** "Your site plan is under review by the
   planning commission. Original pro forma assumed a 6-month entitlement
   window; the jurisdiction now says 11 months. Land is under a $2M/year
   carrying loan at 8% interest-only. How much extra carry cost does the
   5-month delay add to total project cost, and what does that do to your
   yield-on-cost?"

2. **Impact fees / exactions.** "The city assesses a $6,500/unit
   transportation impact fee and a $2,200/unit parks fee on a 220-unit
   ground-up multifamily deal. Your original TPC budget had $1.2M in soft
   costs allocated for all municipal fees combined. Do the actual exactions
   blow the soft-cost budget, and by how much per unit?"

3. **Hard bid vs. GMP.** "Two GCs bid your 180-key hotel shell: GC A offers a
   hard bid of $42M with no shared savings; GC B offers a GMP of $45M with a
   $2M contingency and a 50/50 savings share below GMP. If you believe
   there's a realistic path to $43M in actual cost, which structure nets the
   owner more, and why would a lender prefer one over the other?"

4. **Environmental remediation contingency.** "A Phase II ESA on your
   industrial redevelopment site comes back with confirmed soil
   contamination; the environmental consultant's remediation estimate is
   $1.8M-$3.4M (wide range pending a corrective action plan). Your current
   contingency line is $1.5M on a $38M TPC. How much do you need to add to
   contingency to cover the low end of the remediation range, and what does
   that do to your development spread if market cap is 6%?"

5. **Tax abatement / PILOT.** "Your city offers a 10-year PILOT (payment in
   lieu of taxes) fixed at $180k/year on a project that would otherwise pay
   $410k/year in stabilized property taxes. Stabilized NOI before tax is
   $3.1M. Recompute stabilized NOI with the PILOT in place, and the resulting
   swing in yield-on-cost on a $46M TPC."

6. **For-sale vs. for-rent product mix.** "A 12-acre site pencils two ways:
   96 for-rent apartment units at a 5.5% stabilized yield-on-cost, or 60
   for-sale townhomes at an average $145/SF margin on $220/SF hard cost. TPC
   is roughly equal at $34M either way. Walk through which pro forma
   structure — stabilized NOI vs. unit-sale margin — actually applies to
   each, and which nets a higher return given a 3-year build-and-sell-out
   timeline for the for-sale option."

7. **Pre-leasing threshold for loan conversion.** "Your construction loan
   converts to a permanent mini-perm at certificate of occupancy, but the
   loan agreement requires 65% pre-leasing (signed leases, not just
   applications) before conversion. At month 10 of a 14-month construction
   schedule you're at 48% leased. What absorption rate do you need over the
   remaining 4 months to hit the 65% test, and what's the lender's fallback
   if you miss it?"

8. **Development fee mechanics.** "Your development management agreement
   pays a fee of 4% of TPC, paid ratably with construction draws (not as a
   lump sum at closing). TPC is $28M. If draws run $2M/month for 14 months,
   how much development fee lands in month 6, and how does that differ from
   a deal where the fee is earned 50% at closing / 50% at completion?"

9. **Vertical vs. horizontal cost split & draw sequencing.** "A 40-acre
   business park has $9M in horizontal costs (grading, utilities, roads)
   and $31M in vertical (buildings) across three phases. The lender will
   only fund vertical draws once horizontal work reaches substantial
   completion on a given phase. If Phase 1 horizontal is 80% complete and
   Phase 1 vertical is ready to start, what's blocking the draw, and how
   much horizontal spend remains before vertical draws can begin (assume
   horizontal cost is spread evenly across the phase's acreage)?"

10. **Value engineering vs. GMP buyout.** "Your GMP contract was set at
    $52M including a $2.5M design contingency. Value-engineering during the
    buyout phase (substituting finishes, resequencing MEP rough-in) saves
    $1.1M against the original budget. Under your GMP contract's shared-
    savings clause (owner keeps 60% of buyout savings below GMP), how much
    of that $1.1M savings flows to the owner, and how does it change your
    effective TPC and yield-on-cost versus the original underwriting?"

## Suggested next step

Turn 3-4 of these into `situational` cases (they're judgment-heavy, not pure
arithmetic — items 1, 3, 6, 9 read most naturally as scenario/options
content) and the remainder into quiz `templates` with a clean single-formula
answer (items 2, 5, 7, 8, 10 each reduce to one computable number). This
would roughly double `development`'s situational count (9 → ~11-13) and add
meaningfully to its template count (10 → ~13-15), closing most of the gap
to `mortgageUw` (35 total) without touching the acquisitions-heavy end of
the catalog.
