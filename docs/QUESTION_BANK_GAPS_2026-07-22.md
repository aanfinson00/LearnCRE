# Question bank coverage gap — 2026-07-22

Scheduled audit of role coverage in the shipped question bank (situational
cases + quiz templates, `src/quiz/situational` + `src/quiz/templates`), tagged
by the `Role` taxonomy in `src/types/role.ts`. This is the same `role_hint`
axis the community submission pipeline (`question_submissions`, see
`ROADMAP.md` "Community question submissions") files new questions under —
the live submissions table wasn't reachable from this session (no
`question_submissions`-bearing Supabase project connected), so this pass
counts role tags on the already-shipped bank as the best available proxy for
"which areas are thin."

## Coverage by role (role-tagged blocks, `roles: [...]` occurrences)

| Role | Count | Share |
|---|---|---|
| acquisitions | 118 | 39% |
| assetManagement | 61 | 20% |
| portfolioMgmt | 50 | 17% |
| mortgageUw | 41 | 14% |
| development | 22 | 7% |

Acquisitions is ~5x the size of Development and ~3x Mortgage UW. Those two
are the clear laggards — Development in particular is almost entirely
construction-loan-draw and cost-overrun scenarios today, and Mortgage UW
leans heavily on DSCR/debt-yield framing without touching hedging,
prepayment, or carve-out mechanics.

## 10 candidate phrasings for the vet queue

Five per underrepresented role, picked to cover sub-topics not already
present in the bank (checked against existing titles under each role tag).
These are phrasings/prompts only — not full situational cases with scored
options — ready to flesh out or run through the curriculum pipeline.

### Development (currently thinnest — 22 tags)

1. **Entitlement risk** — "The rezoning falls through six months into due diligence — how much of the land basis do you write off, and how much was always at risk?"
2. **Yield-on-cost vs. exit cap spread** — "Yield-on-cost pencils at 6.25% and comparable stabilized assets trade at 5.5% — is 75 bps enough spread to break ground?"
3. **Pre-leasing covenant** — "The construction lender won't fund the final draw until you hit 60% pre-leased — you're at 45% with 4 months of runway. What's your move?"
4. **GMP contract overage** — "The GC comes back $3M over budget under a guaranteed maximum price contract — who actually eats that number, and when does it become your problem?"
5. **Zoning variance denial** — "The parking variance gets denied and you lose 40 units off the plan — walk through what that does to your pro forma and your equity check."

### Mortgage UW (second-thinnest — 41 tags)

6. **Rate cap sizing** — "The loan requires a 3-year interest rate cap as a condition of closing — how do you size the premium into sources and uses, and who pays for it?"
7. **Yield maintenance vs. defeasance** — "Which prepayment structure actually costs the borrower more if you sell in year 3 — yield maintenance or defeasance — and why?"
8. **Non-recourse carve-outs** — "What specific borrower actions actually spring a 'bad boy' guaranty and flip a non-recourse loan to full recourse?"
9. **Extension option test** — "The loan hits its initial maturity next quarter — what does the borrower have to prove (DSCR, debt yield, no default) to earn the 1-year extension option?"
10. **LTC vs. LTSV** — "Is the construction lender actually underwriting to loan-to-cost or loan-to-stabilized-value — and what happens when those two give different answers?"

## Suggested next step

Run these through the existing vetting flow — either drop them into
`docs/CURRICULUM_QUEUE.md`-style review or draft directly as
`SituationalCase` entries under `src/quiz/situational/`, tagged
`roles: ['development']` / `roles: ['mortgageUw']` respectively — before
merging into the shipped bank.
