# Candidate question phrasings — 2026-10-29

Unreviewed drafts for the question bank. Not wired into the app; vet, then convert to `SituationalCase` (see `docs/agent-instructions.md`).

**Gap analysis (repo proxy).** The Supabase `learncre` project is paused, so per-area *approved* counts from `question_submissions` could not be read. Coverage in `src/quiz/situational` was used instead: `development` role has 9 cases vs 40 acquisitions / 31 asset mgmt; categories `absorption` (1), `comp-selection` (2), `lease-econ` (2), `sensitivity` (2); asset classes hotel (1), retail (2), industrial (3).

| # | Title | Role / category / asset | Prompt phrasing |
|---|---|---|---|
| 1 | Entitlements vs. shovel-ready: what are you paying for? | development · risk · mixed | A land seller offers a fully entitled site at $9M/acre and an unentitled site nearby at $5M/acre. Entitlement is 18–24 months out with uncertain outcome. What does the $4M gap actually price? |
| 2 | Yield-on-cost vs. market cap: is the spread enough? | development · pricing · multifamily | Untrended YOC is 6.4%; stabilized cap rates for the submarket are 5.4%. Construction is 24 months. Is 100 bps enough development spread, and what moves the answer? |
| 3 | Lease-up concessions: burn-off or permanent? | development · absorption · multifamily | Developer offers 2 months free on 13-month leases to hit 50 units/month. Underwriting assumed no concessions. How should the pro forma treat them? |
| 4 | Pre-leasing threshold for a spec industrial building | development · risk · industrial | Lender requires 50% pre-leased before first draw; the sponsor has one 30% LOI. Which path is most defensible: start spec, wait, or phase the building? |
| 5 | Interest reserve sizing when lease-up slips | development · sensitivity · office | Interest reserve covers 30 months; lease-up now runs 6 months long. What breaks first, and who funds the shortfall? |
| 6 | Which comps belong in a development exit valuation? | acquisitions · comp-selection · multifamily | Three trades: 1980s Class B, 2022 Class A at 5.1%, 2019 Class A with 40% concessions at 5.6%. Which anchor the exit cap, and why? |
| 7 | Absorption math with a competing pipeline | development · absorption · retail | Submarket has 600k SF at 91% occupancy, a 150k SF competitor opens next year, and demand is 40k SF/yr. When does your center stabilize? |
| 8 | Ground-up hotel: why RevPAR index matters more than ADR | acquisitions · lease-econ · hotel | New-build hotel hits $140 ADR but 55% occupancy; comp set runs $125 / 72%. Is the hotel outperforming? |
| 9 | Sensitivity: which assumption drives a development IRR most? | development · sensitivity · mixed | A +10% hard-cost overrun, a 6-month delay, and a +50 bps exit cap each hit a 22% IRR. Rank them and explain why. |
| 10 | Free rent vs. higher TI: same net effective rent? | asset mgmt · lease-econ · retail | Tenant offers two packages with identical net effective rent: 6 months free, or $30/SF more TI. Which does the owner prefer and why (lender, NOI, valuation)? |

## Next step
Pick 2–3 for full `SituationalCase` drafts (4 options, one `isBest`, takeaway, 3 tips). Prioritize #3, #5, #9 (thinnest categories + development).
