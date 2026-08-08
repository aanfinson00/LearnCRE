# Question bank coverage — role gaps & new phrasings

_Generated 2026-08-08 by the scheduled question-bank review._

## Method

The intent was to pull `question_submissions` counts by `role_hint` /
`status = 'approved'` straight from Supabase (the community review pipeline
described in `ROADMAP.md` and `supabase/migrations/0010_question_submissions.sql`).
That data wasn't reachable this run — the two non-production Supabase projects
on the account timed out (paused/cold), and the active project on the account
belongs to an unrelated app (site-planning schema: `projects`/`sites`/`buildings`/`zones`),
not LearnCRE. No `learn-cre`-named Supabase project exists in the connected
account, so the live approval counts couldn't be queried.

As a proxy, this pass counted `roles: [...]` tags across the **shipped**
question bank — everything already live in `src/quiz/situational/*.ts` and
`src/quiz/templates/*.ts` (141 files, 139 tagged) — on the theory that shipped
content is a reasonable stand-in for "approved into the bank," and it uses the
exact same `Role` taxonomy (`src/types/role.ts`) as `question_submissions.role_hint`.

## Coverage by role (tag occurrences, shipped content)

| Role | Tag count | Share |
|---|---:|---:|
| Acquisitions | 100 | 40% |
| Asset Management | 51 | 20% |
| Portfolio Management | 41 | 16% |
| Mortgage UW | 35 | 14% |
| **Development** | **19** | **8%** |

Development is the clear laggard — roughly a fifth of Acquisitions' coverage
and the smallest of any role by a wide margin. Mortgage UW is the secondary
gap. (Next time this runs with live DB access, re-pull actual `approved`
counts by `role_hint` and reconcile against this proxy — see follow-up below.)

Existing Development-tagged material already covers: absorption timing,
change-order pricing, cost overruns, equity-first vs. pari-passu, liquidated
damages, retainage release, LTC vs. LTV, ground lease vs. fee, draw mechanics,
construction loan sizing, contingency drawdown, cost-to-complete, draw
allocation, lease-up reserve, clear-height premium, yield-on-cost/dev-spread,
and truck-count/SF. The 10 phrasings below were checked against that list to
avoid duplicates.

## 10 new phrasings — Development

Situational-case style (title + one-line framing), ready to draft into
`src/quiz/situational/` or seed as `question_submissions` rows with
`role_hint: 'development'`:

1. **"Entitlement is running 8 months behind schedule — what does the delay actually cost you?"** — carrying cost / land basis drag from an entitlement slip.
2. **"The interest reserve is running dry with 4 months left on the loan — now what?"** — capitalized-interest sizing and the lender conversation when a reserve depletes early.
3. **"GMP vs. cost-plus — which contract structure actually protects the developer?"** — delivery-method / contract-risk tradeoff (GC vs. CM-at-risk).
4. **"The construction loan won't fund past 60% until you hit 60% pre-leased — how close are you, really?"** — pre-leasing covenants as a funding gate.
5. **"Take the density bonus and add the affordable set-aside, or build market-rate only — which pencils?"** — density-bonus / affordable-housing tradeoff math.
6. **"A subcontractor is threatening a mechanic's lien mid-draw — what does the draw process actually protect against?"** — lien waivers and payment-application mechanics.
7. **"You've got a TCO but not a permanent CO — can tenants actually move in?"** — temporary vs. permanent certificate-of-occupancy gating on lease-up and revenue recognition.
8. **"Construction completion guaranty — when does the sponsor's personal recourse actually burn off?"** — completion-guaranty triggers and recourse step-down.
9. **"You need to cut $3M from the budget — which value-engineering items actually move the needle without killing the deal thesis?"** — VE tradeoffs and what's safe to cut vs. what erodes the story.
10. **"Splitting infrastructure costs across development phases — who pays for the shared road?"** — vertical vs. horizontal phasing and shared-infrastructure cost allocation.

## Follow-up

- Next scheduled run: confirm the LearnCRE Supabase project ref (check
  `learn-cre` Vercel project env vars directly, or have a human paste
  `VITE_SUPABASE_URL`) so future passes can pull real `question_submissions`
  approval counts by `role_hint` instead of using the shipped-content proxy.
- Secondary gap to address after Development: Mortgage UW (35 tags, 14%
  share) — worth a follow-up batch of phrasings once Development catches up.
