# Question phrasing drafts — 2026-08-23

_Scheduled question-bank pass. Goal: find the area with the thinnest coverage
and draft new phrasings to close the gap._

## Data-access note

The live approval queue (`question_submissions`, reviewed via
`/admin/submissions` → **Approve / Reject / Mark integrated**, filterable by
`role_hint` / `kind_hint` / `tags`) lives in Supabase and would be the exact
source for "which areas have fewer approved questions than others." This run
could not reach it — the three Supabase projects on this account
(`parcycle`, `leasing-tracker`, `aanfinson00's Project`) are all `INACTIVE`
and timed out on every query, including a bare `select 1`, and none is
unambiguously the LearnCRE project (`.env` ships with `VITE_SUPABASE_URL` /
`VITE_SUPABASE_ANON_KEY` blank, so the linked project isn't recorded in the
repo). Flagging this so the real submission-approval counts get checked by
hand next time — worth confirming which project backs LearnCRE and waking it
if it's paused.

As a stand-in, this pass used the one gap signal available locally: role
coverage across the two static question sources that ship in the app,
`src/quiz/templates/*.ts` (drill templates) and `src/quiz/situational/*.ts`
(situational cases). Both tag content with `roles: Role[]`.

| Role | Templates | Situational | Combined |
|---|---|---|---|
| acquisitions | 60 | 40 | **100** |
| assetManagement | 20 | 31 | 51 |
| portfolioMgmt | 16 | 25 | 41 |
| mortgageUw | 16 | 19 | 35 |
| **development** | **10** | **9** | **19** |

`development` is the clear outlier — about a fifth of `acquisitions`'
coverage despite being one of five first-class roles on the role picker.
Existing development content already covers: yield-on-cost, cost-to-complete,
draw allocation, retainage (sizing + release), contingency draw-down,
construction loan sizing, lease-up reserve, clear-height premium, truck
count/SF, change-order pricing, cost overruns, equity-first vs. pari-passu
draws, liquidated damages, LTC vs. LTV, ground lease vs. fee, and lender draw
mechanics.

Below are 10 phrasings for development-side gaps *not* covered by the list
above — drafted for review, not wired to the calc engine yet. Each follows
the situational-case house style (a short, framing-sensitive question over a
scenario) so they can be vetted and turned into `src/quiz/situational/*.ts`
entries the same way the existing 72 were.

## 10 draft phrasings — development

1. **"What's the most you can pay for the dirt?"**
   *(residual land value)* — given a target YoC, hard/soft cost budget, and
   stabilized NOI, work backward to the max supportable land basis.

2. **"How big does the interest reserve need to be?"**
   *(construction loan interest reserve sizing)* — draw schedule, loan
   balance ramp, and rate given; test whether the reserve line in the budget
   is actually enough to carry the loan through completion.

3. **"Does this loan need a mini-perm, or does it convert?"**
   *(construction-to-permanent takeout timing)* — stabilization date vs.
   construction loan maturity, and what happens to proceeds/rate if
   stabilization slips past the maturity date.

4. **"Will the lender fund without more pre-leasing?"**
   *(pre-leasing covenant / threshold)* — signed LOIs vs. the loan
   agreement's minimum pre-leasing percentage; what has to happen before the
   next draw clears.

5. **"Who eats the overrun — you or the GC?"**
   *(GMP vs. cost-plus contract risk)* — a cost overrun scenario where the
   contract type (guaranteed maximum price vs. cost-plus with a fee) decides
   who absorbs it.

6. **"Is the contingency in the right bucket?"**
   *(hard cost vs. soft cost budget structure)* — a development budget with
   contingency lumped into hard costs only; test whether soft-cost overruns
   (permitting delays, design changes) have anywhere to go.

7. **"Is the developer's fee padding the deal or earning it?"**
   *(development fee calculation + basis impact)* — fee as % of total
   project cost, and whether it inflates the basis used for the lender's
   LTC test.

8. **"Is this the highest and best use of the site?"**
   *(entitlement / zoning risk framing)* — as-of-right buildable SF vs. a
   denser use requiring rezoning, weighed against entitlement timeline and
   carry cost.

9. **"Does the value-engineering cut pencil?"**
   *(spec downgrade vs. achievable rent)* — a VE change (e.g., cheaper
   facade, lower ceiling height) that trims hard cost but also trims
   achievable rent or absorption pace; net YoC/IRR impact.

10. **"What happens if the GC walks?"**
    *(payment & performance bond / GC default)* — a GC default mid-
    construction; how the performance bond, retainage held, and a
    replacement GC's re-mobilization cost net out against the budget.

## Next step

Vet these the way `docs/CURRICULUM_QUEUE.md` ideas get vetted: pick the ones
worth building, then draft each into a `src/quiz/situational/*.ts` case
(scenario data → 4-choice reasoning, matching the existing dev-tagged files)
or a `src/quiz/templates/*.ts` drill if the underlying math is closed-form.
