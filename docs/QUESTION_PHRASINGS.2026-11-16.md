<!-- generated 2026-11-16 by the scheduled question-bank coverage routine -->
<!-- project: LearnCRE @ c5d74bb -->

# Question-bank coverage audit + candidate phrasings

Scheduled pass over the live question bank to find the areas with the fewest
approved (integrated) questions and seed 10 new phrasings for each.

**Source of truth for "approved":** the `question_submissions` table in the
`learncre` Supabase project could not be read this run (project is paused, DB
returned "not accessible"). Counts below are therefore from what is actually
integrated in the repo — the situational cases registered in
`src/quiz/situational/index.ts` and the quiz templates in
`src/quiz/templates/`. Re-run the SQL once the project is unpaused to layer in
pending/approved community submissions.

## Coverage snapshot

### Situational cases by category (72 live)

| Category | Live cases | Status |
|---|---|---|
| deal-process | 21 | saturated |
| document-literacy | 13 | healthy |
| investment-thesis | 9 | healthy |
| pricing | 7 | ok |
| risk | 7 | ok |
| diagnostic | 7 | ok |
| **sensitivity** | **2** | thin |
| **lease-econ** | **2** | thin |
| **comp-selection** | **2** | thin |
| **absorption** | **1** | thin |

### Secondary gaps (used to steer the phrasings below)

| Dimension | Thin values |
|---|---|
| Asset class (situational) | hotel 1 · retail 2 · industrial 3 (vs multifamily 11, office 9) |
| Difficulty (situational) | beginner 4 of 72 |
| Role (situational) | development 9 (vs acquisitions 40) |
| Quiz templates | every one of the 68 templates has exactly one prompt phrasing |

Quiz templates split 41 valuation / 27 returns, with acquisitions tagged on 60
of 68 and development on 10. That is a role skew rather than a topic gap, so
the new phrasings target the four thin situational categories and bias toward
hotel / retail / industrial, beginner difficulty, and the development role.

## Existing cases in the thin categories (do not duplicate)

- absorption: *How long until the market hits 95%?* (multifamily, intermediate)
- comp-selection: *Which comps belong in this set?* (industrial, beginner) ·
  *Why does the comp set support a tighter cap?* (multifamily, intermediate)
- lease-econ: *NNN vs Gross — who actually bears the OpEx risk?* (retail,
  intermediate) · *Should you give the TI or the rent break?* (office,
  intermediate)
- sensitivity: *Is your exit cap conservative enough?* (mixed, intermediate) ·
  *Defend the 150 bps exit cap expansion* (mixed, advanced)

## Candidate phrasings

Each entry is a title-style question the learner sees in the picker, followed
by the **ask** line that closes the scenario, plus the tags it should carry.
Scenario bodies, options and takeaways are still to be written; these are
framing candidates for the next authoring pass.

### Absorption (1 live → +10)

1. **Who absorbs first — the new tower or the 1990s stock?**
   Ask: *Where does the next 12 months of demand most likely land, and why?*
   `absorption · intermediate · office · acquisitions`
2. **Is 40 units a month a leasing pace or a concession pace?**
   Ask: *What does the concession trend tell you about true absorption?*
   `absorption · intermediate · multifamily · assetManagement`
3. **Pipeline vs. absorption: when does this submarket flip to oversupply?**
   Ask: *In which quarter does cumulative deliveries outrun trailing absorption?*
   `absorption · advanced · multifamily · development`
4. **How many months of vacancy should your lease-up reserve cover?**
   Ask: *What lease-up period does the absorption data actually support?*
   `absorption · intermediate · industrial · development`
5. **The broker says 18 months to stabilize. The data says what?**
   Ask: *Which stabilization timeline is defensible to an investment committee?*
   `absorption · beginner · multifamily · acquisitions`
6. **Big-box or small-bay: which industrial product is absorbing?**
   Ask: *Which size segment should your spec building target?*
   `absorption · intermediate · industrial · development`
7. **Why did occupancy fall while absorption stayed positive?**
   Ask: *What explains positive net absorption alongside falling occupancy?*
   `absorption · beginner · mixed · assetManagement`
8. **Hotel ramp-up: how fast does a new flag reach stabilized occupancy?**
   Ask: *Which ramp assumption should drive your Year 1–3 RevPAR?*
   `absorption · intermediate · hotel · acquisitions`
9. **Shadow space: how much of this "occupied" office is really available?**
   Ask: *How should sublease availability change your absorption forecast?*
   `absorption · advanced · office · portfolioMgmt`
10. **Grocery-anchored center: does the anchor opening pull in-line leasing?**
    Ask: *How should the anchor's opening date reshape your in-line lease-up curve?*
    `absorption · intermediate · retail · development`

### Comp selection (2 live → +10)

1. **A sale-leaseback printed at a 5 cap. Is it a comp?**
   Ask: *How should a sale-leaseback trade be weighted in your comp set?*
   `comp-selection · intermediate · industrial · acquisitions`
2. **Portfolio sale vs. one-off: which price per key do you trust?**
   Ask: *How do you adjust a portfolio allocation before using it as a comp?*
   `comp-selection · intermediate · hotel · acquisitions`
3. **Three comps, three different cap-rate definitions.**
   Ask: *How do you normalize trailing, forward and pro forma caps before comparing?*
   `comp-selection · beginner · mixed · acquisitions`
4. **Distressed note sale or arm's-length trade?**
   Ask: *Which of these transactions belong in a market-value comp set?*
   `comp-selection · intermediate · office · mortgageUw`
5. **The best rent comp is a 2,000 SF deal. Yours is 40,000 SF.**
   Ask: *How should deal size change the weight you give each rent comp?*
   `comp-selection · beginner · retail · assetManagement`
6. **Comps from 14 months ago in a market that moved 150 bps.**
   Ask: *How do you time-adjust stale comps without inventing a number?*
   `comp-selection · advanced · multifamily · portfolioMgmt`
7. **Is the comp across the freeway really in your submarket?**
   Ask: *Which location adjustments are supportable and which are guesswork?*
   `comp-selection · beginner · industrial · acquisitions`
8. **Land comps: entitled, unentitled, or already graded?**
   Ask: *How should entitlement status order these land comps?*
   `comp-selection · intermediate · mixed · development`
9. **The appraiser used a comp with 30% below-market rents.**
   Ask: *How does in-place rent position change what that comp's cap rate means?*
   `comp-selection · advanced · office · mortgageUw`
10. **Hotel comps: full-service trades for a select-service subject.**
    Ask: *Which comp attributes matter most when the service level doesn't match?*
    `comp-selection · intermediate · hotel · acquisitions`

### Lease economics (2 live → +10)

1. **Percentage rent: is the breakpoint helping you or the tenant?**
   Ask: *How does a natural vs. artificial breakpoint change expected rent?*
   `lease-econ · intermediate · retail · assetManagement`
2. **Free rent up front or lower face rent: same NER, different deal.**
   Ask: *Which structure is better for the landlord, and for whom does it matter?*
   `lease-econ · beginner · office · assetManagement`
3. **CAM caps: who eats the 8% tax increase?**
   Ask: *How do cumulative vs. non-cumulative CAM caps shift the expense risk?*
   `lease-econ · intermediate · retail · assetManagement`
4. **Renewal at 5% bumps vs. new tenant at market with $60 TI.**
   Ask: *Which outcome has the higher net effective rent over the term?*
   `lease-econ · intermediate · office · acquisitions`
5. **Early termination option: what is the right fee?**
   Ask: *How should unamortized TI and commissions size the termination fee?*
   `lease-econ · advanced · office · assetManagement`
6. **Co-tenancy clause: how much rent is really at risk if the anchor goes dark?**
   Ask: *What does the co-tenancy trigger do to your in-line income forecast?*
   `lease-econ · advanced · retail · portfolioMgmt`
7. **Industrial escalations: 3% fixed vs. CPI with a 2% floor and 4% cap.**
   Ask: *Which escalation clause is worth more in a 5% inflation environment?*
   `lease-econ · intermediate · industrial · acquisitions`
8. **Ground lease resets: what happens to the leasehold at year 25?**
   Ask: *How does a fair-market-value rent reset change your exit cap?*
   `lease-econ · advanced · mixed · acquisitions`
9. **Hotel management vs. lease: who holds the operating risk?**
   Ask: *How does a management agreement change the income you capitalize?*
   `lease-econ · intermediate · hotel · acquisitions`
10. **The tenant wants a 10-year term. You want 5. What is the term worth?**
    Ask: *How do you price the extra five years of term into the rent?*
    `lease-econ · beginner · industrial · assetManagement`

### Sensitivity (2 live → +10)

1. **Which 50 bps hurts more: cap rate or interest rate?**
   Ask: *Which single-variable shock moves the levered IRR further?*
   `sensitivity · intermediate · mixed · acquisitions`
2. **Flat rents for two years: does the deal still clear the hurdle?**
   Ask: *How many years of flat rent growth can the pro forma absorb?*
   `sensitivity · beginner · multifamily · acquisitions`
3. **Exit year 5 or year 7: which is the real sensitivity?**
   Ask: *How does hold period interact with exit cap in your downside case?*
   `sensitivity · intermediate · office · portfolioMgmt`
4. **One ADR point or one occupancy point: which matters more?**
   Ask: *Which lever moves hotel NOI more, and why isn't it symmetric?*
   `sensitivity · intermediate · hotel · assetManagement`
5. **The two-way table says 14%. Which cell should you actually trust?**
   Ask: *How do you read a cap-rate × rent-growth table for the base case?*
   `sensitivity · beginner · mixed · acquisitions`
6. **Construction costs up 10%: is the development spread still there?**
   Ask: *How much cost overrun erases the yield-on-cost premium?*
   `sensitivity · intermediate · industrial · development`
7. **Refi at 7% instead of 5.5%: does the DSCR still pass?**
   Ask: *At what rate does the refi stop covering, and what's the cash-in?*
   `sensitivity · advanced · multifamily · mortgageUw`
8. **The anchor leaves in year 3: what is the downside IRR?**
   Ask: *How should a single-tenant event be stress-tested versus a market shock?*
   `sensitivity · advanced · retail · portfolioMgmt`
9. **Stress one variable or all of them at once?**
   Ask: *When is a combined downside case more honest than a tornado chart?*
   `sensitivity · intermediate · mixed · portfolioMgmt`
10. **Opex up 15% on a gross lease vs. a NNN lease.**
    Ask: *Why does the same expense shock hit these two values so differently?*
    `sensitivity · beginner · office · assetManagement`

## Suggested next steps

- Author the absorption and comp-selection sets first; they are the thinnest
  and most of these phrasings fit the existing `SituationalCase` shape with no
  new types.
- Tag at least six of the forty as `beginner` to lift the 4-of-72 ratio.
- Add second prompt phrasings to quiz templates in a later pass; every template
  currently renders one fixed sentence, so wording variety there is zero.
- Unpause the `learncre` Supabase project and re-run the submissions query so
  approved community questions can be counted alongside integrated content.
