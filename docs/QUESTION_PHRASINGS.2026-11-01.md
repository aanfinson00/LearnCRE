# Candidate question phrasings — 2026-11-01

Scheduled run: add 10 candidate questions aimed at the thinnest areas of the bank.
These are **proposals for review, not registered content** — nothing here is wired into
`src/quiz/*/index.ts`. Promote a keeper by copying the closest existing case/template.

## Why these areas

The `learncre` Supabase project was paused, so approved `question_submissions` counts
could not be read. Gaps were measured from the repo instead (situational cases, 72 total):

| Area | Count | Note |
|---|---|---|
| category `absorption` | 1 | thinnest category |
| categories `comp-selection`, `lease-econ`, `sensitivity` | 2 each | |
| role `development` | 9 situational / 10 templates | vs 40 / 60 for acquisitions |
| asset classes hotel / retail / industrial | 1 / 2 / 3 | vs multifamily 11, office 9 |

Answers are marked ✅. All arithmetic was hand-checked.

---

### 1. Lease-up clock (absorption · multifamily · development)
A 240-unit new build delivers with 24 units pre-leased and nets 12 leases per month. The business plan stabilizes at 93% occupancy.
**Q: About how many months to stabilization?**
- ✅ ~17 months — 93% × 240 = 223 units; (223 − 24) ÷ 12 ≈ 16.6.
- ◻️ ~19 months — forgets the 24 pre-leased units (223 ÷ 12).
- ◻️ ~18 months — targets 100% occupancy: (240 − 24) ÷ 12.
- ◻️ ~10 months — treats 12/mo as 12/mo *per bedroom type* and halves it.

### 2. Spec industrial supply overhang (absorption · industrial · acquisitions)
A submarket has 1.2M SF vacant, 900K SF under construction (unleased), and net absorption of 600K SF per year.
**Q: Roughly how long to absorb all existing and pipeline vacancy, holding pace flat?**
- ✅ ~3.5 years — (1.2M + 0.9M) ÷ 0.6M.
- ◻️ 2 years — ignores the pipeline.
- ◻️ 1.5 years — counts only pipeline.
- ◻️ Never — absorption is always demand-limited.

### 3. Which comp actually matters? (comp-selection · retail)
Subject: 28,000 SF grocery-anchored center, 2019 build, suburban. Four recent trades: (a) 30,000 SF grocery-anchored, 2017, same trade area, 6.6% cap; (b) 120,000 SF power center, 2021, 5.9%; (c) 26,000 SF unanchored strip, 2018, same trade area, 7.4%; (d) 29,000 SF grocery-anchored, 2018, different metro, 6.1%.
**Q: Which comp should anchor your cap-rate view?**
- ✅ (a) — same anchor type, size, vintage, and trade area.
- ◻️ (b) — newest, but a different format and scale.
- ◻️ (c) — same trade area, but unanchored risk is priced very differently.
- ◻️ (d) — right format, wrong market; use as a cross-check only.

### 4. Hotel competitive set (comp-selection · hotel)
A 150-room select-service hotel near a hospital reports a 92 RevPAR index against its set. The set includes two convention-center full-service hotels.
**Q: What is the most defensible adjustment before judging performance?**
- ✅ Rebuild the set around demand-source peers (healthcare/corporate select-service); the convention hotels skew the index.
- ◻️ Keep the set; 92 is simply underperformance.
- ◻️ Add more full-service hotels to widen the sample.
- ◻️ Drop the index and use ADR alone.

### 5. Net effective rent (lease-econ · office)
10-year lease, $30/SF face rent, 12 months free, $60/SF TI. Ignore discounting.
**Q: What is the net effective rent per SF per year?**
- ✅ $21.00 — (9 × 30 − 60) ÷ 10.
- ◻️ $24.00 — subtracts TI only from rent paid: (270 − 30) ÷ 10.
- ◻️ $30.00 — quotes face rent.
- ◻️ $27.00 — ignores TI: 270 ÷ 10.

### 6. Expense stop pass-through (lease-econ · office)
Tenant leases 20,000 SF on a base-year structure. Base-year opex was $9.00/SF; current-year opex is $10.20/SF.
**Q: What does the tenant owe in pass-throughs this year?**
- ✅ $24,000 — ($10.20 − $9.00) × 20,000.
- ◻️ $204,000 — bills the full current opex.
- ◻️ $0 — assumes a gross lease absorbs all increases.
- ◻️ $180,000 — bills the base-year amount.

### 7. Exit-cap shock (sensitivity · all asset classes)
You underwrite a 5.5% exit cap on flat NOI. Lenders push you to stress to 6.0%.
**Q: By roughly how much does the exit value fall?**
- ✅ ~8.3% — 5.5 ÷ 6.0 − 1.
- ◻️ ~9.1% — divides by the old cap: 0.5 ÷ 5.5.
- ◻️ ~0.5% — reads bps as percent change.
- ◻️ ~50% — confuses 50 bps with 50%.

### 8. Rate shock on coverage (sensitivity · mortgage UW)
$15M loan, 30-year amortization, NOI $1.5M. Rate moves from 6.0% to 7.0%.
**Q: What happens to DSCR?**
- ✅ Falls from ~1.39x to ~1.25x — debt service rises from ~$1.08M to ~$1.20M.
- ◻️ Stays above 1.35x — interest-only intuition.
- ◻️ Falls below 1.0x — overstates the rate effect.
- ◻️ Unchanged — NOI is unaffected, so coverage is.

### 9. Is the development spread enough? (investment-thesis · development)
Total cost $48M; stabilized NOI $3.36M; market exit cap 5.5%.
**Q: What do yield on cost and the spread imply?**
- ✅ 7.0% YOC, 150 bps spread; value ≈ $61M, ~27% margin on cost — clears a typical 100–150 bps hurdle with modest cushion.
- ◻️ 7.0% YOC means a 7.0% profit margin.
- ◻️ Spread is 5.5% because value is set by the exit cap alone.
- ◻️ Not computable without leverage assumptions.

### 10. Contingency burn rate (diagnostic · development)
Hard costs $30M with a 5% contingency ($1.5M). The project is 40% complete and has used $1.2M of contingency.
**Q: If the burn rate continues linearly, what is the projected position?**
- ✅ ~$1.5M shortfall — $1.2M ÷ 0.40 = $3.0M needed vs $1.5M budgeted.
- ◻️ On budget — only $0.3M of contingency remains.
- ◻️ ~$0.3M shortfall — treats the remaining balance as the overrun.
- ◻️ ~$0.9M shortfall — adds only the remaining 60% at the used rate.

---

**Suggested promotion order:** 5, 6 (templates — parametrize with `pickBand`), 1, 2 (absorption), 10, 9 (development), then 3, 4, 7, 8.
