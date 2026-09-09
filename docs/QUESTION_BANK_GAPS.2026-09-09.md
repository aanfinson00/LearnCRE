<!-- generated 2026-09-09 by scheduled question-bank coverage review -->
<!-- source: src/quiz/situational/*.ts (71 cases) + src/quiz/longform/*.ts (9 cases) -->

# Question bank coverage gaps — 2026-09-09

Tally of the situational + longform case pool (the source of truth for
`QUESTION_REVIEW.md` / `feedback/questions.json` / the in-app Feedback
studio), broken out by `category` and `assetClass`, to find where the bank
is thinnest before writing more content.

## Coverage by `assetClass` (situational + longform, n=41 tagged)

37 of 71 situational cases (and 2 of 9 longform cases) are cross-cutting
mechanics questions (waterfall, LPA terms, construction draws, DSCR
triggers, etc.) with no `assetClass` tag — they apply regardless of
property type and are excluded from this tally. Of the 41 cases that *are*
tagged to a specific asset class:

| assetClass | count |
|---|---|
| hotel | 1 |
| retail | 2 |
| industrial | 4 |
| mixed | 9 |
| office | 10 |
| multifamily | 15 |

**Hotel, retail, and industrial are the underweight asset classes** —
together they're 17% of the tagged pool despite being three of the six
asset classes the app quizzes on. Hotel in particular has exactly one case
(`hotelRevparDivergence`, diagnostic/assetManagement) covering the whole
asset class.

## Coverage by `category` (situational only, n=71)

| category | count |
|---|---|
| absorption | 1 |
| comp-selection | 2 |
| lease-econ | 2 |
| sensitivity | 2 |
| diagnostic | 7 |
| pricing | 7 |
| risk | 7 |
| investment-thesis | 9 |
| document-literacy | 13 |
| deal-process | 21 |

**`absorption`, `comp-selection`, `lease-econ`, and `sensitivity` are the
thinnest categories** — `deal-process` alone has 10x the count of
`absorption`.

## 10 new question phrasings for the gap areas

Each targets an underweight `assetClass` *and* an underweight `category`
where possible, so a single new case closes two gaps at once. These are
phrasing/scenario proposals only (title + hook + tags) — not full
`SituationalCase` objects — for a future pass to flesh out with the
4-option answer + explanation + takeaway + tips format used throughout
`src/quiz/situational/`.

1. **"Hotel: RevPAR is up but GOP margin just fell 300bps — where's the leak?"**
   `diagnostic · intermediate · hotel · assetManagement`
   RevPAR +9% YoY, but GOP margin slipped from 38% to 35%; labor cost per
   occupied room is up sharply and the F&B department loss is widening.
   Which department do you pull P&L detail on first, and what flow-through
   ratio should a RevPAR gain like this have produced?

2. **"Hotel: brand wants a $6M PIP at renewal — re-flag, self-manage, or sell?"**
   `investment-thesis · advanced · hotel · acquisitions/assetManagement`
   Franchise agreement renews in 18 months; brand mandates a $6M PIP
   (~$27k/key); at the asset's implied cap rate only ~$4M of capex pencils
   against the return bump. Walk through the three paths.

3. **"Hotel: the operator's incentive-fee true-up doesn't match your GOP — who's right?"**
   `deal-process · intermediate · hotel · assetManagement/portfolioMgmt`
   Management contract pays a 3%-of-revenue base fee plus a 10%-of-GOP
   incentive fee above a threshold. The operator's year-end true-up
   includes an FF&E reserve draw inside GOP; the owner's controller
   excluded it. ~$150k swing — whose GOP definition governs?

4. **"Retail: the anchor just vacated — how many in-line leases just got cheaper?"**
   `risk · intermediate · retail · assetManagement/acquisitions`
   A grocery anchor (30% of GLA) closes. 6 of 14 in-line leases carry
   co-tenancy clauses tied to anchor occupancy, triggering either a rent
   reduction to a % of sales or a fixed alternate rent. Quantify the NOI
   hit and the first call to make.

5. **"Retail: a tenant is disputing your CAM cap — did you calculate it right?"**
   `lease-econ · intermediate · retail · assetManagement`
   Lease caps controllable CAM increases at 5%/yr, compounded, off a fixed
   base year. Landlord billed cumulatively; the tenant's audit claims the
   landlord applied simple, not compound, growth. Work out the correct cap
   and the billback delta.

6. **"Retail: the lease renewal doubled the base rent — what happens to the percentage-rent breakpoint?"**
   `sensitivity · intermediate · retail · acquisitions`
   Tenant renews from $28/SF to $40/SF; the percentage rate stays 6%.
   Natural breakpoint = base rent ÷ rate, so it moves up. Quantify how much
   more in sales the tenant needs before percentage rent kicks in again,
   and what that does to underwritten upside.

7. **"Industrial: how many extra cents per SF does 4 more feet of clear height buy?"**
   `pricing · beginner · industrial · acquisitions`
   Comp A: 32' clear, $7.25 NNN. Comp B: 36' clear, $7.85 NNN. Derive the
   $/SF/foot premium and apply it to a subject building proposed at 40'
   clear. (Complements the existing `clearHeightPremium` speed-drill kind
   with a situational framing.)

8. **"Industrial: a 500k SF spec building just delivered into a slowing leasing market — how long to lease-up?"**
   `absorption · intermediate · industrial · development/acquisitions`
   Submarket net absorption has slowed from 1.2M SF/quarter to 400k
   SF/quarter over three quarters; 2.1M SF is under construction across 4
   competing spec buildings. Estimate months-to-stabilize for the subject
   given a target market-share-of-absorption assumption.

9. **"Industrial: one of your 'comps' is a sale-leaseback — does it belong in the cap-rate set?"**
   `comp-selection · intermediate · industrial · acquisitions`
   5 trade comps for pricing a vacant building; one is a sale-leaseback
   to the single tenant at an above-market rent with investment-grade
   credit. Decide whether to exclude it, adjust it, or use it as-is —
   and why.

10. **"Multifamily: rates move 100bps between application and rate-lock — does the deal still size?"**
    `sensitivity · intermediate · multifamily · mortgageUw`
    Loan sized off a 1.25x DSCR test at a 6.25% note rate; rates move to
    7.25% before lock. Quantify how much the sized loan amount / proceeds
    shrink at the new rate.

## Suggested next step

Flesh out #1–3 first (hotel is the single thinnest asset class at n=1);
#4, #5, #9 close `lease-econ`/`comp-selection` gaps that also touch
underweight asset classes. Each should land as its own file in
`src/quiz/situational/`, registered in `src/quiz/situational/index.ts`,
following the four-option / explanation / takeaway / tips shape already
used by `hotelRevparDivergence.ts` and `retailPercentageRentClause.ts`.
