# Question bank coverage pass — 2026-09-03

Scheduled sweep of the question bank (`src/quiz/templates/*.ts` +
`src/quiz/situational/*.ts`, tagged by `roles: Role[]` per
`src/types/role.ts`) to find the roles with the thinnest coverage, then
draft new question phrasings to close the gap.

Note: the crowd-sourced `question_submissions` table (the actual
`pending → approved → integrated` pipeline described in ROADMAP.md) isn't
reachable from this session — no Supabase project configured for LearnCRE
was visible to query real approval counts by role/tag. This pass uses the
shipped question bank itself as the coverage proxy: every template and
situational case tags 1+ `Role`, so counting tag frequency shows where the
library is thin.

## Coverage by role (current bank)

| Role | Situational | Templates | Total | Share |
|---|---:|---:|---:|---:|
| Acquisitions | 40 | 60 | 100 | 32% |
| Asset Management | 31 | 20 | 51 | 16% |
| Portfolio Mgmt | 25 | 16 | 41 | 13% |
| **Mortgage UW** | 19 | 16 | **35** | 11% |
| **Development** | 9 | 10 | **19** | 6% |

(Counts are tag occurrences, not distinct files — most cases carry 2+
roles — but the ranking is stable: **Development is the thinnest role by
a wide margin, with Mortgage UW second-thinnest.**)

### Where Development is already covered (don't duplicate)
absorption timing, change-order pricing, cost overrun, equity-first vs.
pari-passu, liquidated damages, retainage release, LTC vs. LTV sizing,
ground lease vs. fee, draw mechanics, clear-height premium, construction
loan sizing, contingency draw-down, cost-to-complete, dev spread, draw
allocation, lease-up reserve, retainage running, truck-count/SF, yield on
cost.

### Where Mortgage UW is already covered (don't duplicate)
DSCR vs. debt yield, DSCR cash-trap trigger, DSCR cure rights, DSCR refi
failing, DSCR springing recourse, DSCR test timing mechanics, covenant
testing cadence, refi cap stress, sponsor proforma aggressiveness, sponsor
recourse vs. covenants, NOI growth smell test, tax reassessment surprise,
tenant credit pricing, waterfall clawback mechanics.

## 10 draft phrasings for the question bank

Titles only (in the app's situational-case voice) — each needs a full
scenario, data block, 4 options w/ explanations, and a takeaway before it's
submittable. Flagging suggested `roles`, `assetClass`, and `category` so
whoever drafts these can go straight to `src/quiz/situational/` or submit
via **Contribute → Submit a question**.

**Development (6 — the larger gap):**

1. "The entitlement is taking longer than underwritten — what actually breaks?"
   `roles: ['development']` · `category: risk` · tests carrying cost of a
   slipped entitlement timeline against interest reserve + rate-lock
   expiry, not just "the schedule moves."
2. "Your GC wants GMP instead of cost-plus — what changes for you?"
   `roles: ['development', 'mortgageUw']` · `category: risk` · contract-type
   risk transfer (who eats an overrun) vs. the pricing premium GMP carries.
3. "Phase I comes back with a rec — do you still close?"
   `roles: ['development', 'acquisitions']` · `category: risk` ·
   environmental escrow / holdback sizing vs. walking, based on remediation
   cost estimate vs. contingency.
4. "The interest reserve is burning faster than the draw schedule assumed — now what?"
   `roles: ['development', 'mortgageUw']` · `category: risk` · reserve
   depletion from delay/rate stack, funding gap options (equity top-up vs.
   contingency vs. loan mod).
5. "Off-sites got kicked back to you — who actually pays?"
   `roles: ['development']` · `category: deal-process` · municipality-
   required infrastructure cost allocation between developer exactions and
   reimbursement districts.
6. "Pre-leasing hasn't hit the covenant — does the loan still fund?"
   `roles: ['development', 'mortgageUw']` · `category: risk` · pre-leasing
   / pre-sale threshold as a funding condition, not just a stabilization
   metric.

**Mortgage UW (4):**

7. "Rates moved since you locked the hedge — what's the real cost?"
   `roles: ['mortgageUw']` · `category: pricing` · rate-cap strike cost vs.
   floating exposure, sizing the hedge to the covenant, not the loan term.
8. "You're inside the extension window — do you qualify?"
   `roles: ['mortgageUw', 'assetManagement']` · `category: risk` · extension
   option test (debt yield / DSCR hurdle + fee) vs. maturity default.
9. "Yield maintenance or defeasance — which actually costs less to exit early?"
   `roles: ['mortgageUw', 'acquisitions']` · `category: pricing` · prepayment
   penalty math under a rate-move scenario, framed as a sale-timing decision.
10. "The loan has a mezz piece — whose vote actually matters in default?"
    `roles: ['mortgageUw', 'portfolioMgmt']` · `category: deal-process` ·
    intercreditor standstill / cure rights between senior and mezz lenders.

## Suggested next step
Pick 2-3 of these, build them out as full `SituationalCase` entries (see
`src/quiz/situational/devLtcVsLtv.ts` for the shape), then run
`npx vitest run src/test/extractQuestions.test.ts` to regenerate
`feedback/questions.json` + `QUESTION_REVIEW.md` so they enter the
voice-memo review queue like the rest of the bank.
