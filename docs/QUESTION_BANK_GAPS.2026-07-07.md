# Question bank coverage gaps — 2026-07-07

Automated pass: counted tags across the live content (not the stale GAP
list in `interview-questions.md`, which pre-dates the Phase 1 depth pass and
already-shipped templates). Source: `src/quiz/situational/*.ts` (71 cases)
and `src/quiz/templates/*.ts` (68 templates).

## Situational cases by category (71 total)

| category | count |
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

Thinnest categories: `absorption` (1), `comp-selection` / `sensitivity` /
`lease-econ` (2 each) — all well under half the count of the next-smallest
group (`diagnostic`/`pricing`/`risk` at 7).

## Situational cases by asset class (71 total, 37 untagged/cross-asset)

| asset class | count |
|---|---|
| multifamily | 11 |
| office | 9 |
| mixed | 8 |
| industrial | 3 |
| retail | 2 |
| **hotel** | **1** |

Still heavily skewed toward multifamily/office despite the Phase 1 pass
(hotel 0→1, retail 1→2, industrial 2→3). Hotel and retail remain the
thinnest asset classes.

## Coverage by role (situational + quiz templates)

| role | situational (of 71) | quiz templates (of 68) |
|---|---|---|
| acquisitions | 40 | 60 |
| assetManagement | 31 | 20 |
| portfolioMgmt | 25 | 16 |
| mortgageUw | 19 | 16 |
| **development** | **9** | **10** |

`development` is the smallest role bucket in both content types — well
under a quarter of the acquisitions count.

## 10 proposed phrasings

Picked to hit the intersection of the thinnest categories, asset classes,
and the `development` role gap. Each is a candidate title only — full
scenario/options/takeaway still need to be drafted before these go in as
situational cases.

1. **Absorption · industrial · development** — "Pre-leasing is 3 months behind pro forma on your spec industrial building — extend the construction loan, cut asking rent, or hold?"
2. **Absorption · multifamily** — "Lease-up stalls at 60% in month 8 — do you widen concessions or hold face rent and wait out the season?"
3. **Comp-selection · retail** — "The only recent trades near your strip center are big-box anchor deals — do they belong in your comp set?"
4. **Comp-selection · hotel** — "A new-build lifestyle hotel two blocks away just opened — does it belong in your STR comp set yet?"
5. **Sensitivity · development** — "Hard costs jump 8% mid-construction — how much exit-cap cushion do you need to still clear your hurdle?"
6. **Sensitivity · mortgageUw** — "Rates move 75 bps between application and close — does the deal still clear your DSCR covenant?"
7. **Lease-econ · industrial** — "Big-box industrial tenant wants roof and structure carved out of their NNN obligation — who actually eats that capex?"
8. **Lease-econ · retail** — "An anchor tenant's co-tenancy clause just got triggered — what does it actually cost you if they go dark?"
9. **Deal-process · hotel · development** — "A PIP renovation comes in $3M over budget mid-project — where does the money come from, and who signs off?"
10. **Risk · portfolioMgmt · development** — "Three ground-up developments in the fund are all delayed ~6 months — how do you triage capital calls across them?"

## Note on the `question_submissions` approval pipeline

Checked the connected Supabase project (`dayxxakuczqfwwltchto`) for
`question_submissions` (the community-contribution approval table from
migration `0010`) — that table doesn't exist in the currently connected
project, so there's no live "approved vs. pending" submission data to pull
counts from right now. This report is based on the shipped content in the
repo instead (which is the real question bank users see).
