# Situational question bank — coverage gaps & candidate phrasings

_Generated 2026-09-05 by an automated review pass over `src/quiz/situational/`
(71 shipped cases). This is the closest thing we have to "which areas have
fewer approved questions than others" — every file here is already live in
the app, tagged with `category`, `roles`, `difficulty`, and (optionally)
`assetClass`. Community submissions (`question_submissions` table, statuses
`pending → approved / rejected / integrated`) couldn't be queried from this
session — no Supabase project reachable here has that table — so this pass
used the shipped bank itself as the coverage signal instead._

## Coverage matrix (situational cases per category × role)

Untagged `roles` (applies to all roles) is not present in the current bank —
every case declares explicit roles, so this is a real count, not an estimate.

| category | acquisitions | assetManagement | portfolioMgmt | mortgageUw | development | total |
|---|---|---|---|---|---|---|
| deal-process | 11 | 10 | 12 | 6 | 5 | **44** |
| document-literacy | 9 | 6 | 5 | 4 | 1 | 25 |
| investment-thesis | 4 | 4 | 7 | 0 | 1 | 16 |
| pricing | 7 | 2 | 0 | 1 | 0 | 10 |
| risk | 1 | 2 | 0 | 6 | 1 | 10 |
| diagnostic | 1 | 5 | 1 | 2 | 0 | 9 |
| lease-econ | 2 | 2 | 0 | 0 | 0 | 4 |
| absorption | 1 | 0 | 0 | 0 | 1 | **2** |
| comp-selection | 2 | 0 | 0 | 0 | 0 | **2** |
| sensitivity | 2 | 0 | 0 | 0 | 0 | **2** |

Also thin overall: **development** role (9 cases total vs. 40 for
acquisitions) and **beginner** difficulty (4 cases vs. 33-34 for
intermediate/advanced).

The clearest gaps are the zero cells: `absorption`, `comp-selection`, and
`sensitivity` each have only 2 cases total, all but one concentrated in
`acquisitions`, leaving `assetManagement`, `portfolioMgmt`, `mortgageUw`,
and `development` with no situational coverage at all in those three
categories. `pricing` and `lease-econ` are similarly one-sided toward
acquisitions.

## 10 candidate phrasings

Framing-only drafts (title + the one-line "Q:") aimed squarely at the
emptiest cells above — no math, options, or explanations yet, matching how
`QUESTION_REVIEW.md` treats framing as a separate pass from content. Each
lists its target category/role/asset-class so whoever drafts the full case
can pick up straight from the scenario hook.

1. **Absorption · assetManagement · multifamily**
   *"Is the lease-up pace on track, or is the pro forma optimistic?"*
   Hook: budgeted absorption schedule vs. actual leasing velocity on a
   value-add asset the AM inherited mid-lease-up; decide whether the
   reforecast should trigger a concession or capex reallocation now.

2. **Absorption · portfolioMgmt · mixed**
   *"Which asset gets the marketing dollars this quarter?"*
   Hook: two assets in the portfolio are both behind their absorption
   targets — one has a debt maturity in 9 months, the other doesn't.
   Limited leasing budget, where does it go first.

3. **Absorption · mortgageUw · office**
   *"Does the lease-up covenant get tripped before the loan converts?"*
   Hook: a construction-to-perm loan requires 85% occupancy by the
   conversion date; current absorption pace vs. remaining runway — will
   the borrower hit it, and what's the underwriting fallback if not.

4. **Comp-selection · assetManagement · office**
   *"Which comp actually supports raising the renewal ask?"*
   Hook: the leasing broker hands the AM three "comps" for a renewal
   negotiation — one's 18 months stale, one's a different building class,
   one's a direct match but smaller. Which one is defensible.

5. **Comp-selection · portfolioMgmt · industrial**
   *"Is this comp set telling you about the market, or about one seller?"*
   Hook: a submarket comp set used for a hold/sell decision has one
   outlier from a distressed seller skewing the average — how it should
   be weighted or excluded.

6. **Sensitivity · assetManagement · multifamily**
   *"Which lever actually moves NOI the most here?"*
   Hook: AM has to pick where to spend limited operational attention this
   year — trimming opex, pushing occupancy, or pushing rent — and needs to
   rank them by NOI impact per unit of effort.

7. **Sensitivity · portfolioMgmt · mixed**
   *"Which asset is most exposed if rates move another 100bps?"*
   Hook: a portfolio with a mix of fixed and floating-rate debt across
   assets of different leverage — identify which asset's returns are most
   rate-sensitive, not just which has the most floating debt.

8. **Pricing · portfolioMgmt · office**
   *"Sell into this cap-rate compression, or hold?"*
   Hook: portfolio-level comps are compressing below the fund's cost
   basis on an asset that's mid-hold-period — the hold/sell/refi tradeoff
   framed as a pricing question, not a returns-math one.

9. **Pricing · development · retail**
   *"Does the land price still pencil at today's exit cap?"*
   Hook: a developer optioned a site when exit caps were 200bps tighter;
   re-underwriting the residual land value at today's wider exit cap to
   see if the deal still clears.

10. **Lease-econ · portfolioMgmt · office**
    *"Which renewal is worth saving?"*
    Hook: portfolio manager has one retention-concession budget to spread
    across several expiring tenants in different buildings — deciding by
    lease economics (term, credit, mark-to-market) which renewals earn
    the spend.

## Suggested next step

Pick a few of these, flesh out `scenario` / `data` / 4 `options` with
explanations (mirror the shape in any existing file under
`src/quiz/situational/`), and add them as new `SituationalCase` files. Once
added, re-run this same coverage pass to confirm the target cells moved off
zero.
