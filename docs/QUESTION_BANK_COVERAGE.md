<!-- generated 2026-07-13T08:10:02Z -->
<!-- project: LearnCRE @ 4e5d612 -->

# Question bank coverage — by role area

There is no live "approval" metric wired up in this repo yet (the community
`question_submissions.status = 'approved'` table lives in a Supabase project
this session doesn't have access to, and the curriculum-idea pipeline tracks
*topics*, not individual question phrasings). Until that's connected, the
best proxy for "how well is each area covered" is a straight count of shipped
content — situational cases (`src/quiz/situational/*.ts`) and quiz templates
(`src/quiz/templates/*.ts`) — tagged per `Role` (`src/types/role.ts`).

## Current counts (role tag mentions across situational cases + templates)

| Role | Count | Share |
|---|---|---|
| acquisitions | 100 | 38% |
| assetManagement | 51 | 19% |
| portfolioMgmt | 41 | 16% |
| mortgageUw | 35 | 13% |
| development | 19 | 7% |

`development` is the clear gap — about a fifth of `acquisitions`' coverage —
with `mortgageUw` next lowest. (Method: `grep -o "roles: \[[^]]*\]"` across
both directories, tallied by role string. All situational/template files
carry an explicit `roles:` tag — none rely on the untagged catch-all — so
this count is complete, not a sample.)

Cross-checked against `docs/interview-questions.md`'s per-role question
counts (Acquisitions 12, Asset Mgmt 10, Mortgage UW 10, Portfolio Mgmt 8,
Development 7) — same ordering, `development` lowest there too. Note that
doc's "Top GAPs" list is now stale: all five (`capexReserveSizing`,
`refiStressTest`, `feeDragOnIrr`, `constructionLoanSizing`,
`walk-distressed-1`) have already shipped.

## 10 candidate phrasings to close the gap

Weighted toward `development` (6) and `mortgageUw` (4) — the two lowest
areas. These are draft prompts only, not full situational cases/templates;
follow `docs/agent-instructions.md`'s workflow (match `SituationalCase` /
`QuestionTemplate` shape, register in the relevant `index.ts`, tag `roles`)
to build out whichever ones get picked up.

### Development

1. **Q: Entitlement risk — how much basis do you underwrite before zoning approval is actually certain?**
   Proposed id: `entitlement-risk-basis` (situational)

2. **Q: The construction loan won't fund past 65% until you hit 40% pre-leased — what actually happens if you're stuck at 25%?**
   Proposed id: `pre-leasing-covenant-threshold` (situational)

3. **Q: GMP vs. cost-plus — which contract structure actually protects your budget, and what do you give up for it?**
   Proposed id: `gmp-vs-cost-plus` (situational)

4. **Q: Your interest reserve is on pace to run out three months before stabilization — where does the shortfall get covered?**
   Proposed id: `interest-reserve-depletion` (situational)

5. **Q: Offsite infrastructure costs (roads, utilities, sewer) just came back 30% over budget before you've broken ground — whose problem is it?**
   Proposed id: `offsite-infra-cost-overrun` (situational)

6. **Q: Development fee — is it earned on a draw schedule as the project proceeds, or paid in a lump sum at closing?**
   Proposed id: `development-fee-timing` (situational or `developmentFeeSchedule` quiz template)

### Mortgage underwriting

7. **Q: The interest-rate cap just got 3x more expensive to renew — does the deal still clear your debt-yield covenant?**
   Proposed id: `rate-cap-cost-spike` (situational)

8. **Q: Yield maintenance vs. defeasance — which prepayment structure actually costs more to exit early, and why does the lender care which one you have?**
   Proposed id: `yield-maintenance-vs-defeasance` (situational)

9. **Q: There's a mezz piece behind your senior loan — when can the mezz lender actually step in under the intercreditor agreement?**
   Proposed id: `mezz-intercreditor-standstill` (situational)

10. **Q: The buyer wants to assume your loan instead of getting new debt — what do they actually have to qualify for, and who has to sign off?**
    Proposed id: `loan-assumption-qualification` (situational)

## Next step

Pick a subset of the above (or run them past `docs/interview-questions.md`'s
sourcing bar first — none of these ten are pinned to a public source yet),
draft via the normal `docs/agent-instructions.md` workflow, and re-run the
coverage count to confirm the `development` / `mortgageUw` gap narrowed.
