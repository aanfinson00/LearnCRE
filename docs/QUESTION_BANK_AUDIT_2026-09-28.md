# Situational question-bank audit — 2026-09-28

Automated pass over `src/quiz/situational/` (71 shipped cases) to find which
areas of the question bank are thinnest and need the next depth pass. Same
kind of audit that drove the "Question-base depth pass — Phase 1" entry in
`ROADMAP.md`; this is the follow-up read a quarter later.

## Current distribution

**By category** (`SituationalCategory` in `src/types/situational.ts`):

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
| **absorption** | **1** |

**By asset class:**

| Asset class | Count |
|---|---|
| multifamily | 11 |
| office | 9 |
| mixed / unspecified | 8 |
| industrial | 3 |
| retail | 2 |
| **hotel** | **1** |

**By difficulty:**

| Difficulty | Count |
|---|---|
| advanced | 34 |
| intermediate | 33 |
| **beginner** | **4** |

## Where the gaps are

Four categories (`absorption`, `sensitivity`, `lease-econ`, `comp-selection`)
sit at 1–2 cases each while `deal-process` alone accounts for 21 — the same
skew pattern the last depth pass found, just shifted (that pass fixed the
asset-class imbalance on `hotel`/`retail`/`industrial`; category balance and
`beginner` difficulty are now the loudest gaps). `beginner` is especially
thin given three difficulty tiers should roughly balance for a fair setup-screen
mix, and `hotel`/`retail` are still underrepresented relative to
multifamily/office despite Phase 1's hotel-asset-class addition.

## 10 draft phrasings for the next batch

Targets the four thinnest categories, weighted toward `beginner`/`intermediate`
and toward `hotel`/`retail`/`industrial` asset classes. These are framing
drafts only (title + one-line hook), not full cases — next step is picking
which land, writing the full scenario/options/takeaway, and running them
through a QUESTION_REVIEW.md-style framing pass before merging into
`src/quiz/situational/index.ts`.

1. **"How many months of supply is this retail corridor carrying?"**
   *absorption · retail · beginner* — A power center submarket has 1.2M SF of
   vacancy against 40k SF/month of net absorption; a big-box anchor is
   about to deliver another 150k SF.

2. **"Is this industrial submarket over-supplied, or just catching up?"**
   *absorption · industrial · intermediate* — Speculative deliveries spiked
   3 quarters ago; net absorption has been positive every quarter since but
   vacancy is still rising off a low base.

3. **"When does RevPAR recover after new supply hits?"**
   *absorption · hotel · intermediate* — A select-service hotel submarket
   just added two competitive flags; ADR has softened while occupancy held.

4. **"Your submarket has negative absorption — should you still buy?"**
   *absorption · office · beginner* — Two quarters of negative net absorption
   in an otherwise stable office submarket, priced at a wider cap than
   comps.

5. **"Which comps actually belong in this set?"**
   *comp-selection · retail · beginner* — A comp set mixes a power center,
   a lifestyle center, and a strip center with a materially different
   anchor-to-inline ratio.

6. **"Branded or independent — which hotel comps should you trust here?"**
   *comp-selection · hotel · advanced* — Underwriting a flag-conversion play
   where the trailing comps are all legacy-independent and the go-forward
   comp set should be branded select-service.

7. **"Is the percentage-rent kicker worth the lower base rent?"**
   *lease-econ · retail · intermediate* — An anchor tenant offers a lower
   base rent plus a percentage-rent breakpoint that only clears in strong
   sales years.

8. **"Free rent vs. a lower base rent — which is the better deal for the
   landlord?"**
   *lease-econ · industrial · beginner* — Two competing lease structures
   with the same NER on paper but very different cash-flow timing.

9. **"How much does a 1-point RevPAR miss move your IRR?"**
   *sensitivity · hotel · advanced* — Underwriting sensitivity on a hotel
   acquisition where RevPAR growth assumptions drive most of the year-1
   variance.

10. **"What happens to your cash-on-cash if the rate cap resets 100 bps
    higher?"**
    *sensitivity · multifamily · beginner* — A floating-rate bridge loan
    with an expiring rate cap; simple before/after cash-on-cash comparison.

## Suggested next step

Pick 4–6 of the above (prioritize the `absorption` and `comp-selection`
entries — they're the thinnest categories) for full case-writing in the next
sitting, following the existing `SituationalCase` shape in
`src/types/situational.ts` and the file-per-case pattern in
`src/quiz/situational/`.
