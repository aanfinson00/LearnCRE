import type { SituationalCase } from '../../types/situational';

export const retailAnchorDarkening: SituationalCase = {
  id: 'retail-anchor-darkening',
  title: 'Retail: your grocery anchor goes dark with 4 years left on lease — what\'s the 90-day playbook?',
  category: 'diagnostic',
  difficulty: 'advanced',
  roles: ['assetManagement'],
  assetClass: 'retail',
  scenario:
    "You asset-manage a 200,000 SF grocery-shadow center. The grocery anchor (60,000 SF, 30% of GLA) notified you it's closing its doors in 90 days but will continue paying base rent ($12/SF NNN = $720k/yr) through lease expiration in year 4. Eight inline tenants have co-tenancy clauses activating if the anchor space is 'dark and unoccupied for more than 12 consecutive months' — those eight tenants represent $1.1M of annual base rent and can reduce rent to percentage-of-sales minimums once triggered. Center T-12 NOI is $2.9M.",
  data: [
    { label: 'Center size', value: '200,000 SF' },
    { label: 'Anchor space', value: '60,000 SF (30% of GLA)' },
    { label: 'Anchor base rent', value: '$720k/yr through year 4' },
    { label: 'Co-tenancy tenants', value: '8 inline tenants' },
    { label: 'Co-tenancy rent at risk', value: '$1.1M annual base rent' },
    { label: 'Co-tenancy trigger', value: 'Dark and unoccupied >12 consecutive months' },
    { label: 'T-12 NOI', value: '$2.9M' },
  ],
  question: "What's your 90-day playbook, and how do you prioritize the competing risks?",
  options: [
    {
      label:
        "The 12-month co-tenancy clock is the binding constraint — not the anchor's continued rent payment. Priority stack: (1) Launch aggressive anchor re-leasing immediately (medical, fitness, grocery replacement, entertainment) — the 12-month window starts at physical closing, and you need a signed LOI within 6 months to have any chance of avoiding trigger. (2) Audit each co-tenancy clause individually — 'dark and unoccupied' typically tests physical operation, not rent payment; anchor continuing to pay doesn't prevent the trigger from firing. (3) Notify the lender — if $1.1M converts to percentage-of-sales, DSCR likely fails. Worst case: all 8 tenants at 6% of ~$185/SF avg sales = $11.10/SF vs. $32/SF base rent = ~$900k of annual NOI destruction.",
      isBest: true,
      explanation:
        "Right priority stack. The anchor paying rent is false comfort — co-tenancy clauses test occupancy (physical operation), not rent payment. If the anchor sits dark 12 months, all 8 inline tenants can simultaneously invoke the clause, converting $1.1M of contractual base rent to variable percentage-of-sales. At $185/SF avg sales × 6% pct rent = $11.10/SF vs. $28/SF average base rent, the annual NOI hole is $900k+. At a 7.0% cap, that's $12-13M of value destruction. Lender notification is also required before the DSCR covenant trips — not after.",
    },
    {
      label:
        "The anchor is still paying $720k/yr in rent — there's no income impact for four years. Monitor the situation and begin anchor re-marketing as lease expiration approaches.",
      isBest: false,
      explanation:
        "This destroys $12-13M of value. Waiting until year 4 guarantees all 8 co-tenancy clauses activate — the 12-month trigger fires in year 1. Once triggered, co-tenancy rent reductions are often irrevocable for the remaining lease term; you can't un-trigger them after the fact even if you eventually fill the anchor space. The risk is not in year 4; it's in month 13.",
    },
    {
      label:
        "Immediately approach all 8 co-tenancy tenants and offer lease extensions in exchange for waiving their co-tenancy rights.",
      isBest: false,
      explanation:
        "Good tactical idea but wrong sequence. You need to identify which tenants are actually at risk of exercising before negotiating with all eight. Tenants with strong sales ($280+/SF) may not care about co-tenancy because their sales are well above the percentage-rent minimum — approaching them unnecessarily surfaces a leverage point they hadn't considered. Audit the at-risk tenants first (those with sales closest to the percentage-rent floor), then negotiate selectively.",
    },
    {
      label:
        "Redevelop the anchor space into mixed-use or residential — anchor vacancy is the opportunity to reposition the center.",
      isBest: false,
      explanation:
        "Possibly the right 5-year strategy but irrelevant to the 12-month co-tenancy clock. Entitlement plus construction takes 24-48 months minimum — the co-tenancy trigger fires at month 13. Redevelopment doesn't prevent co-tenancy activation and doesn't protect the $1.1M of inline rent. Pursue repositioning as the long-term play only after you've addressed the near-term co-tenancy clock.",
    },
  ],
  takeaway:
    "Anchor darkening creates a co-tenancy clock that runs from the date of physical closing, independent of rent payment. Occupancy is the trigger, not rent. The 12-month window is the operative deadline; re-leasing or curing the clock is the first priority. Total financial exposure is often 2-5× the anchor's own rent: the anchor keeps paying ($720k here) while co-tenancy activates $1.1M of inline rent conversion. Lender notification before the DSCR covenant trips is required, not optional.",
  tips: [
    "Co-tenancy trigger language varies significantly: 'dark' vs. 'dark and unoccupied' vs. 'not continuously operating.' Each version has different curing mechanisms and grace periods — pull every lease before assuming the trigger language is uniform.",
    "Fastest anchor replacement categories: urgent care, dialysis, fitness (pickleball, climbing gyms), food halls, and discount grocers — all drive foot traffic comparable to traditional grocery anchors.",
    "Percentage-rent floors: some co-tenancy clauses reduce rent to 'greater of percent-of-sales or $X/SF minimum.' If a minimum floor exists, check whether it alone covers debt service before assuming worst case.",
  ],
};
