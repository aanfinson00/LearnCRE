# Question phrasings for under-covered areas — 2026-11-17

Scheduled coverage pass. Goal: find the areas of the shipped question bank
with the fewest approved questions and draft 10 candidate phrasings for each,
so the next content batch has a shortlist to pull from.

## How "approved" was measured

The community `question_submissions` table (Supabase project `learncre`) is
**paused / inaccessible**, so this pass counts the content that is already
shipped in the repo as the approved bank: 71 situational cases, 69 quiz
templates, 10 long-form cases, 12 walkthroughs, 14 Excel drills.

### Situational cases by category

| Category | Shipped | Share |
|---|---:|---:|
| deal-process | 21 | 30% |
| document-literacy | 13 | 18% |
| investment-thesis | 9 | 13% |
| risk | 7 | 10% |
| pricing | 7 | 10% |
| diagnostic | 7 | 10% |
| **sensitivity** | **2** | 3% |
| **lease-econ** | **2** | 3% |
| **comp-selection** | **2** | 3% |
| **absorption** | **1** | 1% |

The bottom four categories together hold 7 of 71 cases. Each gets 10
phrasings below.

### Secondary gaps (used to tag the phrasings)

- **Difficulty:** only 4 of 71 situational cases are `beginner` (34 advanced,
  33 intermediate). Several phrasings below are written at beginner level.
- **Asset class:** hotel 1, retail 2, industrial 3 (vs multifamily 11,
  office 9). Phrasings lean on those three where the topic fits.
- **Role:** `development` is tagged on 9 situational cases and 10 templates,
  the fewest of the five roles. Absorption is the natural home for more.

Existing cases in the thin categories, so the phrasings below avoid them:
`absorption-timing`, `comp-set-vetting`, `comp-vintage-adjustment`,
`ti-vs-rent-giveback`, `lease-structure-nnn-vs-gross`,
`going-in-vs-exit-cap-spread`, `exit-cap-conservatism`.

Format per item: **title** · tags · the ask the learner reads · the lesson the
best answer should land. Numbers are illustrative starting points, not final.

---

## Absorption (1 shipped)

1. **Will the pipeline outrun demand?** · intermediate · industrial · acquisitions/development
   *Ask:* 1.2M SF is under construction in a submarket that absorbs 400k SF a year with 9% vacancy today. Where does vacancy land at delivery if absorption holds?
   *Lesson:* months-of-supply = pipeline ÷ absorption pace; add the unabsorbed remainder to the vacancy base.
2. **Does the lease-up clear the covenant?** · intermediate · multifamily · development/mortgageUw
   *Ask:* 250 units leasing at 20 a month against an 18-month stabilization covenant at 92%. Do you make it, and with how much cushion?
   *Lesson:* units needed ÷ pace vs the covenant clock; the cushion is what the interest reserve has to cover.
3. **Buying velocity with concessions** · advanced · multifamily · development/assetManagement
   *Ask:* Two months free lifts absorption from 15 to 25 units a month. What does each month of lease-up saved actually cost?
   *Lesson:* concession cost on the incremental units vs carry (interest, opex, taxes) saved; concessions also set the renewal rent base.
4. **What is 35% pre-leased telling you?** · intermediate · industrial · development
   *Ask:* A spec building reaches certificate of occupancy 35% pre-leased when the submarket norm is 60%. How should that change your downtime and rent assumptions?
   *Lesson:* pre-leasing is a demand signal; re-underwrite downtime and consider whether face rent or TI is the lever.
5. **Gross vs net absorption** · beginner · office · acquisitions
   *Ask:* Brokers report 500k SF of leasing, but 350k SF of move-outs hit the same quarter on a 10M SF base. What is net absorption, and what does it do to vacancy?
   *Lesson:* net = gross − move-outs; vacancy moves by net ÷ inventory.
6. **Which vacancy number drives your rent?** · intermediate · office · acquisitions/assetManagement
   *Ask:* Direct vacancy is 10% and sublease availability adds another 6%. Which figure should set your lease-up pace and rent assumptions?
   *Lesson:* sublease space competes on price and sets the clearing rent, so total availability drives rent while direct vacancy drives the headline.
7. **Beginner: vacancy after absorption** · beginner · retail · acquisitions
   *Ask:* A 2M SF submarket sits at 12% vacancy and absorbs 120k SF with no new deliveries. What is the new vacancy rate?
   *Lesson:* vacant SF − absorbed SF, then ÷ inventory; the simplest version of the stabilization formula.
8. **Re-dating the seller's stabilization** · advanced · multifamily · mortgageUw/acquisitions
   *Ask:* The proforma shows 94% in 12 months, but trailing absorption gets you to 88%. How do you reset the stabilization date and the interest reserve?
   *Lesson:* solve for months to target at trailing pace, then size reserve to the longer carry.
9. **Start phase two now or wait?** · advanced · multifamily · development
   *Ask:* Phase one of a two-phase project leased in nine months. Phase two is 150 units. When do you start, given it will compete with phase one renewals?
   *Lesson:* weigh cannibalization and concession risk against carry on entitled land and construction cost inflation.
10. **Hotel absorption is occupancy, not SF** · intermediate · hotel · acquisitions/development
    *Ask:* A 200-key hotel opens into a market running 68% occupancy with two more hotels delivering next year. How do you phrase the ramp?
    *Lesson:* ramp occupancy and ADR separately toward a penetration index target; new supply dilutes the index, not just the market occupancy.

## Comp selection (2 shipped)

1. **Beginner: sales, listings, and asking prices** · beginner · multifamily · acquisitions
   *Ask:* The broker's comp set mixes three closed sales with two active listings. Which belong, and how do you treat the asking prices?
   *Lesson:* closed trades set value; listings set a ceiling and should be discounted or excluded.
2. **The portfolio-trade comp** · intermediate · industrial · acquisitions
   *Ask:* One comp traded inside a 12-asset portfolio about 50 bps tighter than single-asset trades. Should it anchor your pricing?
   *Lesson:* portfolio premiums reflect scale and allocation; strip the premium or down-weight the comp.
3. **The lender-driven sale in the set** · intermediate · office · acquisitions/mortgageUw
   *Ask:* A note sale cleared at a 9 cap in a set that otherwise prints 6.5. Include, exclude, or adjust?
   *Lesson:* distressed trades show the floor, not market; include only as a downside anchor and say so.
4. **Time-adjusting a 14-month-old comp** · advanced · mixed · acquisitions
   *Ask:* The best comp closed 14 months ago, before the 10-year moved 150 bps. How do you bring its cap rate forward?
   *Lesson:* cap rates track rates with a partial pass-through; adjust with a spread assumption and widen the range.
5. **The 70% occupied comp** · intermediate · office · acquisitions
   *Ask:* A comp traded 70% occupied at a 5 cap on in-place NOI. What is its stabilized-equivalent cap rate, and does it belong in the set?
   *Lesson:* re-express the comp on stabilized NOI net of lease-up cost before comparing caps.
6. **What rent does this rent comp carry?** · beginner · office · assetManagement/acquisitions
   *Ask:* A rent comp shows $34 face with six months free on a 60-month term. What effective rent should drive your market rent?
   *Lesson:* net effective rent on the comp, not face; the same discipline you apply to your own leases.
7. **Full-floor comp, spec-suite subject** · intermediate · office · acquisitions
   *Ask:* Your only rent comp is a 20k SF full-floor deal; the subject is leasing 4k SF spec suites. Which direction do you adjust and roughly how much?
   *Lesson:* smaller suites carry higher face rent and higher cost per SF; adjust rent up and TI and downtime up with it.
8. **Adjusting for tenancy and term** · advanced · retail · acquisitions
   *Ask:* The comp is 100% investment-grade single tenant with 12 years of term. The subject is multi-tenant with a 3.5-year WALT. Which way does the cap adjust, and by how much?
   *Lesson:* credit and duration compress caps; quantify the spread instead of hand-waving it.
9. **The comp you cannot verify** · beginner · multifamily · acquisitions
   *Ask:* A broker whispers an off-market trade that would support your bid. How much weight does an unverified comp get?
   *Lesson:* unverified comps inform direction, never price; look for the recording or drop it.
10. **$/FAR or $/acre?** · intermediate · mixed · development
    *Ask:* Land comps are quoted both per buildable SF and per acre. Which unit fits the subject, and why does it change the answer?
    *Lesson:* zoning sets buildable area; price density, not dirt, when entitlements differ.

## Lease economics (2 shipped)

1. **Free rent or lower face?** · intermediate · office · assetManagement
   *Ask:* The tenant will take a 10% lower face rent or six months free on a 60-month term. Which costs more on a net effective basis, and which hurts the appraisal?
   *Lesson:* compare NER, then note face rent drives the rent roll a buyer or appraiser capitalizes.
2. **Renew or re-lease?** · intermediate · office · assetManagement
   *Ask:* Renewal at $30 with $10 TI, or a new tenant at $34 with $60 TI and six months downtime. Which wins on net effective rent?
   *Lesson:* downtime and TI usually swamp the face-rent gap; renewal probability is the hidden input.
3. **Pricing an early termination** · advanced · office · assetManagement/acquisitions
   *Ask:* A tenant wants out three years early. What is the floor on the termination fee?
   *Lesson:* unamortized TI and commissions plus expected downtime, discounted; anything less is a gift.
4. **What does the expansion option cost you?** · advanced · industrial · assetManagement
   *Ask:* The tenant wants a fixed-rate expansion option on the adjacent bay versus a right of first offer at market. What is the landlord giving away?
   *Lesson:* a fixed-rate option is a free call on rent growth and freezes the adjacent space's marketability.
5. **Fixed 3% or CPI escalations?** · beginner · retail · acquisitions/mortgageUw
   *Ask:* Inflation is running 2% and the tenant offers CPI bumps instead of fixed 3%. Which is worth more, and how does a lender see it?
   *Lesson:* compare expected paths; lenders underwrite the floor, so uncapped CPI with no floor is worth less to them.
6. **Base-year gross-up in a 60% occupied building** · intermediate · office · assetManagement
   *Ask:* A new tenant's base year is set while the building is 60% occupied. Why does grossing up to 95% protect the tenant, and what happens if you skip it?
   *Lesson:* variable expenses scale with occupancy; an ungrossed base year hands the tenant a bill as the building fills.
7. **Finding the natural breakpoint** · beginner · retail · assetManagement/acquisitions
   *Ask:* Base rent is $40/SF with 6% percentage rent. What sales per SF trigger percentage rent, and how far is the tenant from paying it?
   *Lesson:* natural breakpoint = base rent ÷ percentage; compare to reported sales.
8. **The anchor went dark** · advanced · retail · assetManagement
   *Ask:* A co-tenancy clause drops inline rents to 50% when the anchor closes. What is the NOI hit, and what is the anchor really worth to the center?
   *Lesson:* the anchor's value is the inline rent it protects, not its own rent check.
9. **Hotel management fee vs lease** · intermediate · hotel · acquisitions
   *Ask:* An operator offers a 3% base plus incentive management agreement, or a fixed lease at a stated rent. Who holds the operating risk in each, and which does a lender prefer?
   *Lesson:* a lease converts operating risk to credit risk; the structure, not the headline number, decides the cap rate.
10. **What rate is the tenant really borrowing at?** · advanced · industrial · acquisitions
    *Ask:* A tenant can buy the building or sign a 15-year NNN lease. What implied borrowing rate is embedded in the lease payments?
    *Lesson:* solve for the rate that equates rent to the purchase price less residual; sale-leasebacks price off this.

## Sensitivity (2 shipped)

1. **Beginner: 50 bps on exit value** · beginner · multifamily · acquisitions
   *Ask:* Exit cap moves from 6.0% to 6.5% with NOI unchanged. What is the percentage change in exit value?
   *Lesson:* value ratio = old cap ÷ new cap; 50 bps is not 0.5%.
2. **Which lever matters most?** · intermediate · office · acquisitions
   *Ask:* Rent swings ±10%, exit cap ±50 bps, hold ±1 year. Rank the IRR impact and explain the order.
   *Lesson:* exit cap and rent usually dominate; hold length mostly trades IRR against multiple.
3. **A 100 bps rate shock on floating debt** · intermediate · multifamily · mortgageUw
   *Ask:* The loan floats and the index rises 100 bps. Where does DSCR land, and what strike do you need on the cap?
   *Lesson:* debt service moves by loan balance × bps; the cap strike is where DSCR hits the covenant.
4. **How much rent growth offsets exit cap expansion?** · advanced · mixed · acquisitions
   *Ask:* The exit cap widens 50 bps on a five-year hold. How much additional annual NOI growth holds exit value flat?
   *Lesson:* solve the compound growth that offsets the cap ratio; shows how much faith sits in the growth line.
5. **Break-even exit cap** · intermediate · industrial · acquisitions/portfolioMgmt
   *Ask:* At what exit cap does this deal return exactly 1.0× equity?
   *Lesson:* back into the exit value that repays the loan and equity, then the cap that produces it.
6. **IRR falls as you hold longer — is that bad?** · intermediate · multifamily · portfolioMgmt
   *Ask:* IRR drops from 18% to 14% as the hold stretches from three to seven years while the multiple rises. What is the table telling you?
   *Lesson:* IRR rewards speed, multiple rewards dollars; the right hold depends on reinvestment options.
7. **Designing a downside case without double counting** · advanced · office · acquisitions/mortgageUw
   *Ask:* For a recession case, which three assumptions move together, and which combinations double count the same risk?
   *Lesson:* vacancy, rent, and exit cap correlate; stacking all at their worst produces a scenario nobody will believe.
8. **Leverage and the downside** · advanced · multifamily · acquisitions/portfolioMgmt
   *Ask:* Compare 55% and 70% LTV. For each five points of leverage, how much wider does the downside IRR range get?
   *Lesson:* leverage amplifies both tails; the downside tail widens faster when debt service approaches NOI.
9. **Opex at 4%, rent at 3%** · beginner · multifamily · assetManagement
   *Ask:* Expenses grow 4% a year and rents 3%. What happens to the NOI margin over ten years?
   *Lesson:* margin compresses every year the growth rates diverge; small gaps compound into real value.
10. **Reading the tornado chart** · intermediate · hotel · acquisitions
    *Ask:* Given a tornado chart on a hotel deal, which input deserves diligence dollars, and which can you accept from the broker?
    *Lesson:* spend diligence where the bar is widest and the input is verifiable, like ADR and the management contract.

---

## Suggested next step

Pick the strongest 2 or 3 phrasings per category and build them as
`SituationalCase` files under `src/quiz/situational/`, following
`docs/agent-instructions.md` (one best answer, 3 to 4 options, three tips,
role tags, registration in `index.ts`, and a new entry in
`src/content/catalogIndex.ts`). Writing the beginner and hotel/retail/
industrial items first also closes the secondary gaps.
