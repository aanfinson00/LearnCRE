# LearnCRE — Situational question bank: coverage gaps & proposed phrasings

Periodic pass over `src/quiz/situational/index.ts` (71 cases as of this pass)
to find which slices of the bank are thinnest, and propose new question
*phrasings* to fill them. These are backlog items, not finished content —
each still needs the full `SituationalCase` treatment (scenario, data points,
4 options with `isBest` + explanations, takeaway, tips) before it ships,
following the pattern in any existing file under `src/quiz/situational/`.

Regenerate the coverage counts with:

```
grep -h "roles:" src/quiz/situational/*.ts | grep -o "'[a-zA-Z]*'" | sort | uniq -c
```
(and the equivalent for `assetClass:`, `category:`, `difficulty:`).

## Coverage snapshot (2026-08-15)

**By role** (a case can carry more than one role, so counts don't sum to 71):

| Role | Cases | Share |
|---|---:|---:|
| acquisitions | 40 | — |
| assetManagement | 31 | — |
| portfolioMgmt | 25 | — |
| mortgageUw | 19 | — |
| **development** | **9** | thinnest role by a wide margin |

**By asset class** (37 of 71 cases are asset-class-agnostic — `assetClass`
unset — which is correct for deal-process/document-literacy cases that don't
hinge on property type; the counts below are only the cases that *do* pin an
asset class):

| Asset class | Cases |
|---|---:|
| multifamily | 11 |
| office | 9 |
| mixed | 8 |
| industrial | 3 |
| retail | 2 |
| **hotel** | **1** |

**By difficulty:**

| Difficulty | Cases |
|---|---:|
| advanced | 34 |
| intermediate | 33 |
| **beginner** | **4** |

**By category** (thinnest slices only — full breakdown in the index):

| Category | Cases |
|---|---:|
| absorption | 1 |
| comp-selection | 2 |
| lease-econ | 2 |
| sensitivity | 2 |

## What's underrepresented

Three dimensions stand out as having meaningfully fewer built/approved
questions than the rest of the bank:

1. **Development role** — 9 cases vs. 40 for acquisitions. Most existing
   development-tagged cases lean on mortgageUw pairing (construction loans,
   draws, LTC); there's little on land/entitlement-stage decisions.
2. **Hotel and retail asset classes** — 1 and 2 cases respectively, against
   9–11 for office/multifamily. Hospitality in particular has only the one
   RevPAR-index case; nothing on PIPs, brand-flag mechanics, or management
   agreements.
3. **Beginner difficulty** — just 4 cases total across the *entire* bank,
   despite beginner being the on-ramp difficulty most new learners hit
   first. Several "beginner-coded" topics (NOI definition, going-in vs. exit
   cap) currently only exist at intermediate/advanced framing.

The 10 phrasings below deliberately stack these three dimensions — most hit
two or three of them at once — to get the most coverage lift per new case.

## Proposed phrasings (10)

1. **"Land is under a 3-year option before you're obligated to close — how do you underwrite the carry?"**
   Role: development · Difficulty: intermediate · Category: investment-thesis · Asset class: —
   Premise: a buyer controls a site via option (not fee) for 36 months while entitlements run, paying a small non-refundable deposit plus periodic extension fees. Ask: how should the option carry, extension fees, and walk-away optionality be priced into the land basis vs. treated as sunk cost?

2. **"Hard costs are on budget but soft costs are 40% over — does the contingency still cover it?"**
   Role: development · Difficulty: beginner · Category: deal-process · Asset class: —
   Premise: a ground-up budget splits a 5% contingency across the total project cost; soft-cost overruns (design changes, permitting delay, extended GC general conditions) are eating the contingency while hard costs track to plan. Ask: does a single blended contingency make sense, or should hard and soft costs carry separate reserves?

3. **"What's the difference between ADR, occupancy, and RevPAR — and can RevPAR rise while ADR falls?"**
   Role: assetManagement · Difficulty: beginner · Category: diagnostic · Asset class: hotel
   Premise: a first-touch hotel primer — walk a learner through the RevPAR = ADR × Occupancy identity with a concrete case where occupancy gains outrun an ADR dip, net RevPAR still up. Ask: is that a healthy trade for the asset long-term, or a warning sign about rate discipline?

4. **"A hotel's PIP comes back at $18k/key right before your refinance — how does that change loan sizing?"**
   Role: mortgageUw, development · Difficulty: advanced · Category: risk · Asset class: hotel
   Premise: brand mandates a property-improvement-plan ahead of a flag renewal; the PIP cost lands mid-refi underwriting. Ask: does the PIP get funded from proceeds, reserved out of NOI, or treated as a debt-yield haircut — and how does a lender size around a mandatory, non-optional capex item?

5. **"Anchor is 30% of GLA with a co-tenancy clause letting inline shops cut rent if the anchor vacates — and the anchor's parent just filed Chapter 11."**
   Role: acquisitions, assetManagement · Difficulty: advanced · Category: document-literacy · Asset class: retail
   Premise: co-tenancy domino risk — one anchor bankruptcy can cascade into inline rent reductions across the center. Ask: how do you underwrite the downside, and what lease-document details (opening co-tenancy vs. operating co-tenancy, cure periods) actually matter here?

6. **"Two land parcels are both priced per buildable SF — one's a clean rectangle, the other loses 15% of the pad to an easement."**
   Role: development · Difficulty: intermediate · Category: comp-selection · Asset class: —
   Premise: raw per-SF land comps look close until you account for encumbrances that reduce usable/buildable area. Ask: how do you normalize the comp set before applying a $/buildable-SF benchmark to the subject site?

7. **"What's the difference between going-in cap rate and exit cap rate, and why do underwriters usually assume the exit is wider?"**
   Role: acquisitions · Difficulty: beginner · Category: sensitivity · Asset class: —
   Premise: a first-touch framing of cap-rate direction risk over a hold period, distinct from the existing advanced `exit-cap-conservatism` case — this one is the plain-language "why do this at all" version for someone hitting the concept for the first time.
   Note: complements (doesn't duplicate) the existing `exitCapConservatism` case, which assumes the concept and drills the sizing of the spread.

8. **"Walk through what's excluded from NOI — capex, debt service, leasing commissions — and why they're treated differently."**
   Role: acquisitions, assetManagement · Difficulty: beginner · Category: diagnostic · Asset class: —
   Premise: a proforma lists "NOI" but a learner needs to reconcile it against a cash-flow statement that includes capex and debt service below the line. Ask: which line items belong above vs. below NOI, and why does the industry draw the line where it does?

9. **"Single-tenant NNN industrial vs. a multi-tenant industrial park at the same headline cap rate — how does leasing risk actually differ?"**
   Role: acquisitions · Difficulty: beginner · Category: lease-econ · Asset class: industrial
   Premise: two industrial assets price to an identical 6% cap; one is one tenant on a 10-year NNN lease, the other is eight tenants on staggered 3–5 year terms. Ask: why doesn't an identical cap rate mean identical risk, and what should the multi-tenant asset's basis look like to compensate?

10. **"An inline tenant wants a kick-out clause tied to a sales threshold — what should the landlord push back on?"**
    Role: assetManagement · Difficulty: intermediate · Category: document-literacy · Asset class: retail
    Premise: a prospective tenant asks for the right to terminate early if trailing sales fall below a stated $/SF threshold at a lease anniversary. Ask: what's the landlord's exposure, and which negotiating levers (measurement period length, cure rights, minimum term before the clause activates) actually protect the deal?

## Suggested next pass

Once a few of these are built out into full `SituationalCase` files and added
to `src/quiz/situational/index.ts`, re-run the coverage snapshot above —
`development`, `hotel`, `retail`, and `beginner` should all move off the
bottom of their respective tables. If they don't, the next batch of 10 should
double down on the same dimensions rather than spreading further.
