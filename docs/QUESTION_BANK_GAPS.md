# Question bank coverage gaps

_Generated 2026-07-23 — automated audit of role coverage across the question
bank, with new phrasings queued for the thinnest areas._

## Method

Counted every `roles: [...]` tag across the shipped question bank
(`src/quiz/templates`, `src/quiz/situational`, `src/quiz/walkthroughs.ts`,
`src/quiz/longform`, `src/quiz/mockInterview`) — 292 tagged blocks total,
against the five roles in `src/types/role.ts`.

| Role | Templates | Situational | Walkthroughs | Longform | Mock interview | Total |
|---|---|---|---|---|---|---|
| acquisitions | 60 | 40 | 8 | 6 | 4 | **118** |
| assetManagement | 20 | 31 | 4 | 3 | 3 | **61** |
| portfolioMgmt | 16 | 25 | 3 | 4 | 2 | **50** |
| mortgageUw | 16 | 19 | 2 | 1 | 3 | **41** |
| development | 10 | 9 | 2 | 1 | 0 | **22** |

**Development is the thinnest area by a wide margin** — roughly a fifth of
acquisitions' coverage, and the smallest slice in every single subsystem
(templates, situational, walkthroughs, longform, mock interview). Mortgage
underwriting is the second-thinnest area, running about a third of
acquisitions' volume.

## 10 new question phrasings to draft next

Titles only — framing/structure in the style of `QUESTION_REVIEW.md`. Each
still needs full situational blocks (context bullets, 4 answer choices,
reasoning, takeaway) before it's ready to ship as a template or situational
case.

### Development (7 — the priority gap)

1. **Why does the GC want a GMP instead of cost-plus?**
   *Situational · construction contracts · intermediate · office/industrial · development*
   — Risk allocation between owner and GC; when a guaranteed maximum price protects the deal vs. when it just pads the number.

2. **The contingency is almost gone at 60% complete — what now?**
   *Situational · construction cost overrun · intermediate · mixed · development*
   — Reading a burn-down curve on hard-cost contingency mid-build and deciding whether to raise more capital, value-engineer, or hold.

3. **Land is free-and-clear but the deal still doesn't pencil — why?**
   *Situational · residual land value · advanced · multifamily · development/acquisitions*
   — Yield-on-cost vs. stabilized cap rate spread; why "free land" doesn't fix a deal where vertical costs and rents don't support the basis.

4. **Lease-up is 3 months behind pro forma — how much value did that cost?**
   *Situational · absorption/lease-up · intermediate · multifamily · development/assetManagement*
   — Quantifying the carry cost and IRR drag of a slower-than-underwritten absorption curve.

5. **Why did the lender cut the loan-to-cost from 65% to 55% mid-construction?**
   *Situational · construction lending/draws · advanced · industrial · development/mortgageUw*
   — Re-margining after a cost overrun; how a construction lender protects basis when the budget moves.

6. **The GC submits a change order for $400K — do you approve it?**
   *Situational · change orders/contingency · intermediate · office · development*
   — Owner's-rep judgment call: scope creep vs. legitimate unforeseen condition, and how it should draw against contingency.

7. **Why is the developer's promote structured differently than the acquisitions deal next door?**
   *Situational · development JV/waterfall · advanced · mixed · development/portfolioMgmt*
   — How construction and lease-up risk change promote hurdles and sponsor economics relative to a stabilized acquisition.

### Mortgage underwriting (3)

8. **Debt yield says no, DSCR says yes — which one wins?**
   *Situational · loan sizing · intermediate · office · mortgageUw*
   — When the two sizing constraints disagree, which one actually binds and why lenders lean on debt yield in a low-rate/high-price environment.

9. **The rate cap costs $180K upfront — is it worth it?**
   *Situational · floating-rate hedging · intermediate · multifamily · mortgageUw*
   — Pricing a lender-required rate cap against downside protection on a floating-rate construction or bridge loan.

10. **The loan matures in 6 months and rates are 250 bps higher — what's the refi gap?**
    *Situational · maturity/refinance risk · advanced · office · mortgageUw*
    — Sizing a refinance shortfall (and whether an extension test is met) when the new-money rate no longer supports the existing balance.

## Suggested next step

Run these through the existing curriculum/submission pipeline (or hand-author
as situational cases in `src/quiz/situational/`) to close the development and
mortgage-underwriting gap — same review bar as `QUESTION_REVIEW.md`.
