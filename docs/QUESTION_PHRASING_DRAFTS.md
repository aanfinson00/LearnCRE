# Question bank — phrasing drafts (batch 1)

_Generated 2026-07-19 by the automated question-bank review routine._

## Why these categories

The static situational-question bank (`src/quiz/situational/*.ts`, aggregated in
`src/quiz/situational/index.ts`) is the closest thing this repo has to an "approved
question bank" — a case only ships to learners once it's a fully-fleshed
`SituationalCase` committed to the codebase. Counting the 71 shipped cases by
`category` shows a wide imbalance:

| category | shipped cases |
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

`absorption`, `comp-selection`, `lease-econ`, and `sensitivity` are the four
thinnest categories — each has 1–2 cases versus 21 for `deal-process`. This batch
adds 10 draft phrasings targeting exactly those four categories, so the bank can
grow where it's weakest instead of adding more `deal-process`/`document-literacy`
volume.

These are **phrasing drafts only** — title, scenario setup, and question stem,
in the same spirit as `QUESTION_REVIEW.md` ("this pass is about how the question
is posed"). None of these have answer keys, explanations, or vetted numbers yet.
Before any of these become a real `SituationalCase` in `src/quiz/situational/`,
they need: a reviewer to sanity-check the scenario numbers, a correct-answer
rationale, three plausible-but-wrong distractors with explanations, and a
takeaway — mirroring the existing case files (e.g.
`src/quiz/situational/absorptionTiming.ts`).

---

## absorption (1 shipped → thinnest category)

### 1. When does the backfill actually clear?
*Situational · absorption · intermediate · office · assetManagement*

An anchor tenant (140,000 SF) has just vacated a 400,000 SF office building that was otherwise 92% leased. Leasing velocity for comparable blocks in the submarket has been running about 25,000 SF/quarter. You're being asked when the building returns to 90%+ occupancy assuming no further rollover.

**Q: Roughly how many quarters until the building is back above 90% occupied?**

### 2. Racing the pipeline
*Situational · absorption · intermediate · industrial · acquisitions/development*

A submarket has 12M SF of industrial inventory at 91% occupied. A developer has 1.8M SF of spec space delivering over the next two quarters (evenly split), and trailing net absorption has averaged 400,000 SF/quarter for the last four quarters.

**Q: Does absorption keep pace with the new supply, or does the submarket's vacancy rate widen over the next six months?**

### 3. Re-tenanting around a co-tenancy clause
*Situational · absorption · advanced · retail · acquisitions*

A grocery-anchored center loses its 60,000 SF anchor. Three in-line tenants (representing 22% of center GLA) have co-tenancy clauses that let them pay reduced rent — or terminate — if the anchor space sits dark past 9 months. Leasing has one LOI in hand for a 45,000 SF replacement anchor, expected to close in month 7.

**Q: What's the actual absorption risk here — the anchor backfill timeline, or something else?**

---

## comp-selection (2 shipped)

### 4. Wide net vs. tight fit
*Situational · comp-selection · intermediate · multifamily · acquisitions*

You have two comp sets for a 1990s-vintage garden-style multifamily asset: (A) eleven trades in the last 18 months, spanning 1980s–2010s vintage and B/B+ quality across three submarkets; (B) three trades in the last 6 months, all 1990s-vintage garden-style product within 2 miles of the subject.

**Q: Which comp set should anchor your pricing, and why?**

### 5. Adjusting across lease structures
*Situational · comp-selection · advanced · industrial · acquisitions*

You're pricing a single-tenant NNN industrial asset. The two closest recent comps are a NNN sale at a 6.25% cap and a modified-gross sale at a 6.75% cap for a similar-quality building nearby.

**Q: How should the lease-structure difference change how you use these two comps?**

### 6. Borrowing comps across markets
*Situational · comp-selection · intermediate · office · portfolioMgmt*

You're underwriting a suburban office asset in a secondary market where only one comparable trade has occurred in three years. A gateway-market analyst on your team suggests using cap rates from a primary MSA 90 minutes away, adjusted for a market-tier spread.

**Q: Is cross-market comp borrowing defensible here, and what would make it more or less reliable?**

---

## lease-econ (2 shipped)

### 7. Effective rent isn't the sticker price
*Situational · lease-econ · intermediate · office · acquisitions*

Two competing office leases both quote $38/SF face rent on a 7-year term. Lease A offers 3 months free rent and a $60/SF TI allowance. Lease B offers 1 month free rent and a $25/SF TI allowance.

**Q: Which lease actually produces the higher effective rent to the landlord?**

### 8. When percentage rent doesn't show up
*Situational · lease-econ · intermediate · retail · assetManagement*

A retail tenant pays $20/SF base rent plus 6% percentage rent over a $2M natural breakpoint. Trailing sales have been flat at $1.85M for two years, but the tenant's category (apparel) is trending down nationally.

**Q: How durable is the percentage-rent component of this tenant's NOI contribution, and should you underwrite to it?**

---

## sensitivity (2 shipped)

### 9. Which assumption is actually driving the IRR
*Situational · sensitivity · advanced · multifamily · acquisitions*

A 5-year hold model shows a 16% IRR at a 5.0% exit cap and a 22% rent CAGR assumption. Flexing the exit cap to 5.5% (holding rent growth flat) drops IRR to 12.8%. Flexing rent growth down to 3.0% CAGR (holding exit cap flat) drops IRR to 13.5%.

**Q: Which assumption should get the most underwriting scrutiny, and why?**

### 10. Floating-rate debt yield under a rate shock
*Situational · sensitivity · advanced · office · mortgageUw*

A bridge loan is sized to a 9.0% debt yield on in-place NOI, floating at SOFR + 350 bps with SOFR currently at 5.3%. The loan has an in-place rate cap struck 200 bps above the current SOFR level, expiring in 18 months on a 3-year term.

**Q: What's the real exposure here once the rate cap expires, and how should it change how the loan is sized?**

---

## Next step

Route these through the normal review path before they ship: either flesh each
one out into a full `SituationalCase` (options, explanations, takeaway) and add
it to `src/quiz/situational/`, or run them through the community-submission
review flow (`src/components/AdminSubmissionsScreen.tsx`) if a "pending →
approved → integrated" audit trail is wanted before they're merged.
