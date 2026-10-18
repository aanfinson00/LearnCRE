# Question phrasing candidates — 2026-10-18

Scheduled pass: add to the question bank where coverage is thinnest.

## Coverage gaps (repo content, `src/quiz/situational`, 71 cases)

Approval status lives in Supabase (`question_submissions.status`); it was not queried in this run, so gaps below are measured by shipped content, not approvals.

| Dimension | Thin areas (case count) |
|---|---|
| Asset class | hotel (1), retail (2), industrial (3) vs multifamily (11), office (9) |
| Role | development (9), mortgageUw (19) vs acquisitions (40) |
| Category | absorption (1), comp-selection (2), lease-econ (2), sensitivity (2) vs deal-process (21) |

Candidates below target those gaps. Each is a phrasing/seed only (scenario + ask + intended best answer); none are drafted into TS. To ship, follow `docs/agent-instructions.md`.

## Candidates

1. **Industrial · acquisitions · lease-econ · intermediate** — "Is this rent bump real?"
   A 250k SF distribution building has 3 years left at $6.50/SF NNN with 3% annual bumps; market is $9.25/SF. Ask: which underwriting treatment of the mark-to-market is most defensible? (Best: roll to market at expiry net of downtime, TI, and LC; don't capitalize the gap at close.)

2. **Hotel · portfolioMgmt · sensitivity · advanced** — "What does a 5-point occupancy drop really cost?"
   A 180-key select-service hotel runs 74% occupancy, $142 ADR, 62% flow-through on incremental revenue. Ask: approximate NOI impact of a 5-pt occupancy decline, and how it moves value at a 9% cap. (Tests RevPAR → flow-through → cap math.)

3. **Retail · assetManagement · lease-econ · intermediate** — "Does the co-tenancy clause bite?"
   Inline shop tenant has a co-tenancy clause tied to the anchor staying open; anchor goes dark. Ask: what is the landlord's most likely exposure, and what first action protects income? (Best: read the remedy tiers — alternative rent vs termination — and cure timeline before negotiating a replacement.)

4. **Multifamily · acquisitions · absorption · intermediate** — "How much concession burn is in my lease-up?"
   200-unit new build leasing 12 units/month, offering 6 weeks free on 12-month leases at $2,100 rent. Ask: effective rent and total concession cost to reach 93%. (Net vs gross effective rent distinction.)

5. **Development · development · sensitivity · advanced** — "Which assumption breaks the yield-on-cost?"
   Untrended yield-on-cost is 6.9% vs a 5.5% exit cap. Rent −5%, hard cost +8%, or exit cap +50 bps — which erodes the spread most? (Forces a three-way sensitivity ranking; best: exit cap, with the math.)

6. **Office · mortgageUw · comp-selection · intermediate** — "Which comps does the appraiser actually use?"
   Subject: 1998 Class B suburban office, 78% leased. Four sales: Class A CBD 95% leased, 1999 Class B suburban 74% leased, 2019 Class A suburban, 1985 Class B suburban 100% leased single-tenant. Ask: which comp gets the most weight and why.

7. **Industrial · development · absorption · intermediate** — "Spec or build-to-suit?"
   Submarket vacancy is 4.1%, 6M SF under construction (2.2M pre-leased), net absorption 3.0M SF/yr. Ask: is a 400k SF spec start justified, and what leading indicator would change your mind?

8. **Hotel · mortgageUw · risk · advanced** — "Why does the lender size this on debt yield?"
   Hotel loan request at 65% LTV on a 7.5% cap. Lender sizes to 12% debt yield instead. Ask: what explains the more conservative metric for hospitality vs a stabilized multifamily loan. (Operating leverage, daily rent reset, FF&E reserve, management fees.)

9. **Retail · acquisitions · comp-selection · beginner** — "Are these sales comps apples to apples?"
   Grocery-anchored center vs an unanchored strip vs a single-tenant NNN pad. Ask: which cap-rate comp is most relevant to a grocery-anchored target and what adjustment is needed for the other two.

10. **Multifamily · portfolioMgmt · lease-econ · beginner** — "Loss-to-lease or true upside?"
    Rent roll shows average in-place $1,480 vs market $1,590 with 52% annual turnover. Ask: how much of the 7% gap is capturable in year one, and what operational constraint caps it. (Turnover timing, renewal caps, concessions.)
