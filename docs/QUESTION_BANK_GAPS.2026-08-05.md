<!-- generated 2026-08-05 by scheduled question-bank coverage review -->
<!-- source: src/quiz/situational/*.ts (71 shipped situational cases, the ones actually "approved"/live in the app) -->

# Question bank coverage gaps — 2026-08-05

Coverage snapshot of the 71 shipped situational cases (`src/quiz/situational/*.ts`),
tagged by `category`, `assetClass`, `roles`, and `difficulty`. These are the fields
every case is tagged with, so they're the cleanest proxy for "areas" of the bank.

## Category (n=71)

| Category | Count |
|---|---|
| deal-process | 21 |
| document-literacy | 13 |
| investment-thesis | 9 |
| diagnostic | 7 |
| pricing | 7 |
| risk | 7 |
| lease-econ | 2 |
| sensitivity | 2 |
| comp-selection | 2 |
| **absorption** | **1** |

## Asset class (34 of 71 tagged; 37 are untagged/general)

| Asset class | Count |
|---|---|
| multifamily | 11 |
| office | 9 |
| mixed | 8 |
| industrial | 3 |
| retail | 2 |
| **hotel** | **1** |

## Role (124 tags across 71 cases — most cases tag 1-2 roles)

| Role | Count |
|---|---|
| acquisitions | 40 |
| assetManagement | 31 |
| portfolioMgmt | 25 |
| mortgageUw | 19 |
| **development** | **9** |

## Difficulty (n=71)

| Difficulty | Count |
|---|---|
| advanced | 34 |
| intermediate | 33 |
| **beginner** | **4** |

## Where the bank is thinnest

Four areas are approved/shipped at roughly a quarter (or less) of the next-lowest
peer: **absorption** (category), **hotel** (asset class), **development** (role),
and **beginner** (difficulty). Retail, industrial, comp-selection, sensitivity, and
lease-econ are the next tier down and worth targeting once the above four catch up.

## 10 new candidate phrasings

Drafted to stack multiple gaps per question where the scenario supports it
(e.g. a hotel + absorption + beginner case closes three gaps at once). These are
framing/title-stage drafts only — no answer key or math worked yet, matching the
"structure & framing" pass the Feedback studio review already uses. Next step for
each is a full `SituationalCase` (data points, 4 options, explanations, takeaway).

1. **"How many months of ADR growth until this hotel's debt yield clears the covenant?"**
   *absorption · hotel · development · beginner* — select-service hotel ramping RevPAR post-PIP; ties monthly ADR/occupancy gains to a debt-yield covenant test date.

2. **"Which of these five retail comps actually belongs in your cap-rate set?"**
   *comp-selection · retail · acquisitions · beginner* — grocery-anchored strip center comps with mixed anchor credit, trade dates, and center sizes to screen before averaging.

3. **"Your industrial tenant's renewal comes in 10% under proforma rent — what happens to your yield?"**
   *sensitivity · industrial · assetManagement · intermediate* — single-tenant distribution box; walks the reader through re-running yield-on-cost off the lower renewal rent.

4. **"Percentage rent just kicked in — how much extra is the landlord actually owed?"**
   *lease-econ · retail · assetManagement · beginner* — inline retail tenant crosses its natural breakpoint mid-year; tests breakpoint math, not just the %.

5. **"How much pre-leasing do you need before the construction lender lets this industrial spec building draw?"**
   *absorption · industrial · development · beginner* — spec last-mile facility; ties pre-leasing % threshold to loan-doc draw conditions.

6. **"Which hotel comp set actually predicts this asset's RevPAR — trailing STR or the new supply pipeline?"**
   *comp-selection · hotel · acquisitions · intermediate* — hotel-specific comp vetting (STR competitive set vs. announced new supply) instead of the usual cap-rate comp framing.

7. **"If ADR holds but occupancy drops 5 points, does this hotel still cover debt service?"**
   *sensitivity · hotel · mortgageUw · intermediate* — separates the two RevPAR levers to show why occupancy risk and rate risk aren't interchangeable for DSCR.

8. **"NNN vs. modified gross on the same industrial rent roll — which lease structure is the landlord actually better off with?"**
   *lease-econ · industrial · assetManagement · beginner* — same headline rent, different expense responsibility; tests whether the reader can normalize to effective landlord yield.

9. **"You've got entitlements and a signed GC contract — what's your land basis actually worth right now?"**
   *deal-process · mixed · development · beginner* — early development-stage valuation question aimed at the development-role and beginner-difficulty gaps together.

10. **"Retail absorption slowed for two straight quarters — do you still trust the pro forma lease-up schedule?"**
    *absorption · retail · portfolioMgmt · intermediate* — diagnostic-style prompt on when to override a stale absorption assumption with observed leasing velocity.

## Suggested next pass

Once these (or better phrasings for the same gaps) are built into full
`SituationalCase` entries and merged, re-run this coverage check — the
category/assetClass/role/difficulty counts above should move together rather
than compounding a single axis (e.g. don't only add more advanced/acquisitions
content under the hotel label).
