<!-- generated 2026-07-08 by manual coverage-gap pass -->
<!-- project: LearnCRE -->

# Question bank coverage gaps (2026-07-08)

There's no `approved` flag on the shipped question bank — every case under
`src/quiz/situational/` is live by virtue of being in the source tree. So
"less approved" is read here as **less covered**: which `SituationalCategory`
/ `AssetClass` / `Role` combinations are thin relative to the rest of the
72-case situational bank.

## Coverage snapshot (situational cases, n=72)

**By category:**

| Category | Count |
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

**By asset class:**

| Asset class | Count |
|---|---|
| multifamily | 11 |
| office | 9 |
| mixed | 8 |
| industrial | 3 |
| retail | 2 |
| hotel | 1 |

**By role (cases can carry multiple):**

| Role | Count |
|---|---|
| acquisitions | 40 |
| assetManagement | 31 |
| portfolioMgmt | 25 |
| mortgageUw | 19 |
| development | 9 |

**Thinnest areas:** `absorption`, `comp-selection`, `lease-econ`, `sensitivity`
categories; `hotel`, `retail`, `industrial` asset classes; `development` and
`mortgageUw` roles. The 10 phrasings below deliberately stack these gaps —
each targets a thin category *and* a thin asset class (several also hit a
thin role) so a handful of new cases move several counts at once instead of
piling more content onto `deal-process`/`multifamily`/`acquisitions`, which
are already the deepest.

## 10 candidate phrasings

Format matches the `GAP` entries in `docs/interview-questions.md` — title,
tags, why it matters, proposed slug for whoever drafts the full case
(scenario, 4 options, explanations, takeaway, tips).

### 1. Does the pre-leasing pace support the spec construction loan?
- **Category:** absorption · **Asset class:** industrial · **Roles:** mortgageUw, acquisitions · **Difficulty:** intermediate
- **Scenario seed:** 400k SF spec big-box industrial delivers 40% pre-leased; submarket absorption for comparable product runs ~60k SF/quarter; permanent takeout requires 65% leased within 18 months of delivery.
- **Why:** absorption math is the app's weakest category (1 case) and industrial is under-covered (3 cases); this also pulls in mortgageUw, the second-thinnest role.
- **Maps to:** propose `spec-industrial-preleasing-pace` situational.

### 2. How many months to stabilized occupancy for this new-build hotel?
- **Category:** absorption · **Asset class:** hotel · **Roles:** development · **Difficulty:** intermediate
- **Scenario seed:** 150-key select-service hotel opens at 35% occupancy month 1; comp set stabilizes at 72%; ramp historically adds ~4–5 pts/month in comparable secondary markets.
- **Why:** hotel has exactly 1 situational case total; this is also the only asset class with zero absorption coverage.
- **Maps to:** propose `hotel-ramp-to-stabilization` situational.

### 3. Should the full-service resort comps apply to this select-service deal?
- **Category:** comp-selection · **Asset class:** hotel · **Roles:** acquisitions · **Difficulty:** intermediate
- **Scenario seed:** broker OM for a limited-service hotel leans on full-service resort sale comps at materially lower cap rates; tests whether the analyst re-sets the comp set to flag structure.
- **Why:** comp-selection has only 2 cases and neither touches hotel.
- **Maps to:** propose `hotel-comp-set-flag-structure` situational.

### 4. Do grocery-anchored comps belong in this power-center comp set?
- **Category:** comp-selection · **Asset class:** retail · **Roles:** portfolioMgmt · **Difficulty:** intermediate
- **Scenario seed:** unanchored power center priced off a grocery-anchored center's recent trade; different tenant durability and credit profile.
- **Why:** retail sits at only 2 situational cases; portfolioMgmt is under-represented relative to acquisitions/assetManagement.
- **Maps to:** propose `power-center-vs-grocery-anchor-comps` situational.

### 5. Who actually pays for the roof replacement — you or the tenant?
- **Category:** lease-econ · **Asset class:** industrial · **Roles:** assetManagement · **Difficulty:** intermediate
- **Scenario seed:** NNN industrial lease silent on capital-item allocation vs. routine maintenance; roof replacement due year 3 of a 10-year term.
- **Why:** lease-econ has only 2 cases (office, retail) — no industrial case exists on capital-vs-opex allocation, a common real-world dispute.
- **Maps to:** propose `nnn-capital-item-allocation` situational.

### 6. Management fee vs. lease — which structure actually protects your downside?
- **Category:** lease-econ · **Asset class:** hotel · **Roles:** assetManagement · **Difficulty:** advanced
- **Scenario seed:** owner choosing between a hotel management contract (base + incentive fee) and a percentage-rent lease to a third-party operator.
- **Why:** hotel's operating-structure economics (management contract vs. lease) are entirely unrepresented in the bank.
- **Maps to:** propose `hotel-management-contract-vs-lease` situational.

### 7. How much does losing the anchor tenant move your IRR?
- **Category:** sensitivity · **Asset class:** retail · **Roles:** acquisitions · **Difficulty:** advanced
- **Scenario seed:** single-anchor retail center; anchor has 2 years left plus a termination option; model IRR with vs. without anchor renewal.
- **Why:** sensitivity has only 2 cases (both `mixed` asset class); no retail-specific sensitivity case exists despite anchor risk being a defining retail underwriting question.
- **Maps to:** propose `anchor-loss-irr-sensitivity` situational.

### 8. Does the deal still cash-flow if rents flatten instead of grow 3% a year?
- **Category:** sensitivity · **Asset class:** industrial · **Roles:** mortgageUw · **Difficulty:** intermediate
- **Scenario seed:** underwriting assumed 3% annual rent bumps on renewal; DSCR sensitivity test against a 0%-rent-growth scenario for permanent loan sizing.
- **Why:** stacks the two thinnest dimensions available (sensitivity category, industrial asset class) with the second-thinnest role (mortgageUw).
- **Maps to:** propose `flat-rent-growth-dscr-stress` situational.

### 9. Is the anchor's draw enough to fast-track lease-up of the junior boxes?
- **Category:** absorption · **Asset class:** retail · **Roles:** development · **Difficulty:** intermediate
- **Scenario seed:** new retail development anchored by a grocery store with strong pre-leasing; junior-box absorption pace historically tracks the anchor's opening.
- **Why:** absorption (1 case) and retail (2 cases) are both thin; development is the thinnest role at 9 cases.
- **Maps to:** propose `anchor-driven-junior-box-absorption` situational.

### 10. Should this last-mile infill comp set the cap rate for a bulk distribution deal?
- **Category:** comp-selection · **Asset class:** industrial · **Roles:** mortgageUw, acquisitions · **Difficulty:** advanced
- **Scenario seed:** last-mile infill industrial (small footprint, urban) trades at materially tighter cap rates than bulk distribution (large footprint, exurban); analyst must decide whether the comp applies.
- **Why:** comp-selection has no industrial case, and this is a real, frequently-confused submarket-comp distinction in industrial underwriting.
- **Maps to:** propose `last-mile-vs-bulk-distribution-comps` situational.

## Net effect if all 10 are built

| Dimension | Before | After |
|---|---|---|
| absorption | 1 | 4 |
| comp-selection | 2 | 5 |
| lease-econ | 2 | 4 |
| sensitivity | 2 | 4 |
| hotel | 1 | 4 |
| retail | 2 | 5 |
| industrial | 3 | 7 |
| development (role) | 9 | 12 |
| mortgageUw (role) | 19 | 23 |

These are drafts for review, not finished cases — next step for whoever picks
one up is to flesh out the full scenario, 4 answer options with explanations,
takeaway, and tips, following the existing file shape in
`src/quiz/situational/*.ts` (see `absorptionTiming.ts` / `compSetVetting.ts`
/ `leaseStructureNnnVsGross.ts` / `capSpread.ts` for the closest analogues).
