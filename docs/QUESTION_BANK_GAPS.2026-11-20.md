<!-- generated 2026-11-20 by the scheduled question-bank gap routine -->
<!-- project: LearnCRE @ 22999a7 -->

# Question-bank coverage gaps and 10 draft phrasings

**Source caveat.** The `question_submissions` table (status = approved / integrated)
lives in the `learncre` Supabase project, which is currently **paused** and could not
be queried. This pass therefore uses the shipped situational bank
(`src/quiz/situational/`) as the proxy for "approved" — every case there has been
reviewed and integrated. Re-run the approved-count query once the project is resumed.

## Coverage by situational category (shipped cases)

| Category | Cases | Notes |
|---|---|---|
| deal-process | 21 | Deep |
| document-literacy | 13 | Deep |
| investment-thesis | 9 | OK |
| pricing | 7 | OK |
| diagnostic | 7 | OK |
| risk | 7 | OK |
| **sensitivity** | **2** | Both exit-cap; nothing on rate, cost or rent shocks |
| **lease-econ** | **2** | Office TI-vs-rent and retail NNN-vs-gross only; no industrial or multifamily |
| **comp-selection** | **2** | Industrial + multifamily only; no hotel, no comp-hygiene case |
| **absorption** | **1** | A single multifamily case |

Secondary gaps: `development` role is tagged on 9 cases vs 40 for acquisitions;
hotel appears once and retail three times across the whole bank.

The 10 drafts below target the four thin categories (3 absorption, 3 lease-econ,
2 comp-selection, 2 sensitivity) and lean toward development, industrial, retail and
hotel to close the secondary gaps at the same time. Each entry gives the title, the
scenario the learner reads, the sidebar data, the ask, and the intended best answer
with its arithmetic. Distractors and explanations get written once a draft is approved.

---

### 1. Spec industrial — how long to lease up 400k SF?
*absorption · intermediate · industrial · development / acquisitions*

A 400,000 SF speculative distribution building delivers next quarter. The submarket
posted 2.4M SF of net absorption over the trailing 12 months. Competitive vacant and
under-construction space (excluding the subject) totals 3.6M SF. The construction
lender wants a stabilization date for the mini-perm conversion.

- **Subject:** 400,000 SF, delivering Q+1
- **Trailing-12 net absorption:** 2.4M SF
- **Competitive vacant + pipeline:** 3.6M SF
- **Stabilized occupancy:** 95%

**Q: Using a fair-share capture approach, roughly how long until the building stabilizes?**

Best answer: about 19 months. Subject share of available space = 400 / (3,600 + 400)
= 10%. Submarket absorbs 200k SF/month; subject captures ~20k SF/month;
380k SF (95%) ÷ 20k = 19 months. Distractors: 2 months (ignores competition, divides
400k by 200k), 12 months (assumes 2× fair share with no justification), "it depends on
the tenant" (deflects a computable question).

### 2. Lease-up is behind — is a bigger concession worth it?
*absorption · intermediate · multifamily · development / assetManagement*

A 300-unit lease-up is 40% leased after six months, running 20 units/month versus 30 in
the pro forma. The construction loan is $40M at 7.0% interest-only. Stabilization for
the perm takeout is 93%. The leasing team wants to move from 2 weeks free to 1 month
free, which costs roughly $2,000 per new lease.

- **Units / leased today:** 300 / 120
- **Current pace:** 20 units/month
- **Loan:** $40M at 7.0% IO
- **Stabilization target:** 93%
- **Proposed added concession:** ~$2,000 per lease

**Q: What is the monthly cost of the delay, and how does it compare to the concession?**

Best answer: carry is ~$233k/month (40M × 7% ÷ 12). At 20/month you need ~8 more months.
If the richer concession lifts pace by even 5 units/month, you save ~1.6 months of carry
(~$370k) against ~$360k of extra concessions on the remaining 159 leases. Roughly
break-even on cash, but you also pull forward the perm loan and stop the lender clock.
Distractors: "never add concessions, they reset market rent" (ignores carry), "absorb
the delay, the pro forma was always optimistic" (ignores covenant timing), "concession
cost is trivial, give 2 months free" (ignores the effective-rent hit at takeout).

### 3. Vacancy fell a point — did the market actually absorb space?
*absorption · intermediate · retail · acquisitions / portfolioMgmt*

A broker's package touts "vacancy improved from 14% to 13%" in a 10M SF retail
submarket. The footnote shows a 200,000 SF center was demolished for residential during
the period.

- **Inventory before / after:** 10.0M SF / 9.8M SF
- **Vacancy before / after:** 14% / 13%
- **Space removed:** 200,000 SF

**Q: What was true net absorption over the period?**

Best answer: negative ~74,000 SF. Occupied before = 8.60M SF; occupied after =
9.8M × 87% = 8.526M SF. The headline vacancy improved only because the denominator
shrank. Distractors: +100,000 SF (1% × 10M), +126,000 SF (adds the demolished space
back), "zero, vacancy rate is the only thing that matters".

### 4. Flat $8.00 or $7.25 with 3% bumps — which lease is worth more?
*lease-econ · intermediate · industrial · assetManagement / acquisitions*

A 200,000 SF industrial tenant offers two 10-year NNN structures: $8.00/SF flat, or
$7.25/SF with 3% annual bumps. You plan to sell in year 10.

- **Term:** 10 years NNN
- **Option A:** $8.00 flat
- **Option B:** $7.25 with 3% annual bumps
- **Exit:** year 10

**Q: Which structure is worth more to the landlord, and what actually drives the answer?**

Best answer: B. Average rent under B is ~$8.31 vs $8.00, and year-10 rent is ~$9.46 vs
$8.00. Discounted at 7.5% the PV of B is still ~2% higher, but the real driver is exit:
the buyer caps year-11 NOI, so B adds ~$1.46/SF of NOI to the reversion. Distractors:
A, because $8.00 > $7.25 on day one; "identical, bumps just reprice inflation"; A,
because flat rent is lower credit risk.

### 5. Six months free at $40 or $36 face with no free rent?
*lease-econ · beginner · office · assetManagement / acquisitions*

A 10,000 SF office tenant will sign a 5-year lease either at $40/SF with 6 months free
or at $36/SF with no free rent. Everything else in the lease is identical.

- **Term:** 5 years
- **Option A:** $40 face, 6 months free
- **Option B:** $36 face, 0 months free
- **Size:** 10,000 SF

**Q: Which structure does each side prefer, and why?**

Best answer: total rent is identical ($180/SF over the term), so undiscounted NER is the
same. The landlord prefers A: the higher face rate prints in comps, feeds the appraisal
and sets the base for escalations and renewals. A cash-constrained tenant prefers A for
the upfront relief; a tenant that wants simpler accounting or expects to sublease
prefers B. Distractors: "A is worth 11% more because the face rate is higher"; "B is
worth more because the landlord collects from day one" (true on timing only, trivial at
these rates); "they're identical in every respect".

### 6. Loss-to-lease is 8% — how much can you actually capture this year?
*lease-econ · intermediate · multifamily · assetManagement / acquisitions*

A 240-unit garden asset averages $1,800 in-place rent while new leases are signing at
$1,950. Sixty percent of leases expire in the next 12 months. Historically half of
expiring tenants renew, and renewals capture about 60% of the gap to market.

- **In-place / market:** $1,800 / $1,950
- **Loss-to-lease:** 8.3%
- **Expiring in 12 months:** 60% of units
- **Renewal rate / renewal capture:** 50% / 60% of gap

**Q: Roughly how much of the $150 gap shows up in average rent after 12 months?**

Best answer: about $72, or ~half the headline loss-to-lease. Of the 60% rolling, half
re-lease at full market (+$150) and half renew at +$90; weighted = $120 × 60% = $72.
The other 40% of units do not move. Distractors: the full $150 (treats LTL as
immediate), $90 (applies renewal capture to everyone), $150 × 60% = $90 (ignores
renewals).

### 7. Which hotels belong in the comp set?
*comp-selection · intermediate · hotel · acquisitions / assetManagement*

You are building a performance comp set for a 150-key upscale select-service hotel at a
suburban office park. Candidates: (1) a 300-key full-service downtown hotel with 20k SF
of meeting space; (2) a same-brand 120-key select-service 3 miles away at the airport;
(3) a 90-key economy hotel across the street; (4) a competing-brand 140-key upscale
select-service in the same office park.

- **Subject:** 150 keys, upscale select-service, suburban office park
- **Candidate 1:** full-service, downtown, heavy group
- **Candidate 2:** same brand, airport demand
- **Candidate 3:** economy, same corner
- **Candidate 4:** competing brand, same chain scale, same demand generator

**Q: Which candidates make the set, and what is the ranking principle?**

Best answer: 4 first, 2 second; drop 1 and 3. Chain scale and shared demand generators
matter more than brand flag or physical proximity. Candidate 3 shares a corner but
competes for a different guest; candidate 1 is group-driven and downtown. Distractors:
"all four, more data is better"; "2 and 3, proximity and brand are what STR uses";
"1 and 4, bigger hotels anchor the index".

### 8. Five comps average 6.0% — what cap does the clean set support?
*comp-selection · advanced · office · acquisitions / mortgageUw*

The broker's comp sheet shows five suburban office trades at 5.50%, 5.75%, 6.10%, 6.25%
and 6.40%, averaging 6.0%. Footnotes reveal the 5.50% was an allocated price inside a
portfolio trade, the 5.75% was a 20-year sale-leaseback to the seller, and the 6.40%
buyer was a 1031 exchange.

- **Comps:** 5.50 / 5.75 / 6.10 / 6.25 / 6.40
- **Headline average:** 6.00%
- **Flags:** portfolio allocation, sale-leaseback, 1031 buyer

**Q: What is the defensible market cap rate from this set?**

Best answer: ~6.25%, range 6.10–6.40%. Drop the allocation (not an arm's-length price)
and the sale-leaseback (different income durability and a motivated seller). Keep the
1031 trade but note it may be a touch rich, which argues for the midpoint rather than the
low end. Distractors: 6.00% (take the average as given); 5.75% (sale-leasebacks are the
cleanest credit); 6.40% (the only buyer who had to close is the only real comp).

### 9. Rates up 100 bps — how much smaller is the loan?
*sensitivity · intermediate · multifamily · mortgageUw / acquisitions*

You sized a permanent loan on $3.0M of NOI at a 1.25x DSCR with 30-year amortization
when the all-in coupon was 6.00%. Treasuries moved and the coupon is now 7.00%.

- **NOI:** $3.0M
- **DSCR constraint:** 1.25x
- **Amortization:** 30 years
- **Coupon:** 6.00% → 7.00%

**Q: Roughly how much do loan proceeds fall, and what fills the gap?**

Best answer: proceeds drop ~10%, from ~$33.4M to ~$30.1M. Max debt service is $2.4M;
the 30-year loan constant moves from ~7.19% to ~7.98%. The ~$3.3M shortfall is new
equity, a lower price, or mezz. Distractors: ~1% (treats the rate change as the proceeds
change); ~14% (uses interest-only constants, 2.4/0.06 vs 2.4/0.07); "no change, DSCR is
set on NOI not rate".

### 10. Which shock kills the development spread first?
*sensitivity · advanced · industrial · development / acquisitions*

A build-to-core industrial project pencils at a 7.00% yield on cost ($7.0M NOI on
$100M) against a 5.50% exit cap, a 150 bps spread. Hard costs are 60% of budget;
carry runs about $500k/month. The IC wants to know which single assumption is most
dangerous.

- **YOC / exit cap / spread:** 7.00% / 5.50% / 150 bps
- **Shock A:** hard cost +10%
- **Shock B:** market rent −5%
- **Shock C:** exit cap +50 bps
- **Shock D:** 6-month delivery delay

**Q: Which shock compresses the spread the most, and why does that matter?**

Best answer: C. Exit cap +50 bps takes the spread to 100 bps directly. Hard cost +10%
lifts total cost 6% (YOC 6.60%, spread 110 bps); rent −5% gives YOC 6.65% (115 bps);
a 6-month delay adds ~$3M of carry (YOC 6.80%, 130 bps). The exit cap is also the input
the sponsor controls least, so it should carry the widest band in the sensitivity table.
Distractors: A (hard costs are the biggest line item); D (delays compound); B (rent
drives everything).

---

## Suggested next steps

1. Resume the `learncre` Supabase project and re-run the approved-by-area count against
   `question_submissions` to confirm the category ranking above.
2. Approve or strike each draft; approved ones get full option sets, explanations,
   takeaway and tips, then land as `src/quiz/situational/<id>.ts` and register in the
   index per `docs/agent-instructions.md`.
3. Drafts 1, 2 and 10 also lift the `development` role count; 7 is the first hotel
   comp-selection case.
