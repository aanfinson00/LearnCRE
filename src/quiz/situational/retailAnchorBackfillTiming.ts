import type { SituationalCase } from '../../types/situational';

export const retailAnchorBackfillTiming: SituationalCase = {
  "id": "retail-anchor-backfill-timing",
  "title": "Anchor goes dark — how long to backfill?",
  "category": "absorption",
  "difficulty": "advanced",
  "assetClass": "retail",
  "roles": [
    "acquisitions",
    "assetManagement"
  ],
  "scenario": "You're underwriting a 120,000 SF grocery-anchored center. The 45,000 SF grocer has 8 months left on its lease and has given notice it will not renew. The inline shops (75,000 SF) are 92% leased, and several shop leases carry co-tenancy clauses that cut rent to 50% if the anchor is dark for more than 12 months.",
  "data": [
    {
      "label": "Center GLA",
      "value": "120,000 SF"
    },
    {
      "label": "Anchor box",
      "value": "45,000 SF, vacating in 8 months"
    },
    {
      "label": "Inline occupancy",
      "value": "92%"
    },
    {
      "label": "Co-tenancy trigger",
      "value": "Anchor dark > 12 months"
    },
    {
      "label": "Seller pro forma",
      "value": "Backfill in 6 months post-vacate"
    }
  ],
  "question": "What downtime assumption for the anchor box is most defensible?",
  "options": [
    {
      "label": "Roughly 18–24 months of downtime after vacancy, with TI/LC sized for a box conversion and a co-tenancy rent-reduction scenario modeled on the inline shops.",
      "isBest": true,
      "explanation": "Big-box backfill is a long-cycle process: marketing, LOI, lease negotiation, plan approval, permitting, and build-out regularly consume 18–24 months, and that is before any demolition for a split box. Because the co-tenancy trigger sits at 12 months, a realistic timeline likely crosses it, so the inline rent cut belongs in the base case."
    },
    {
      "label": "Six months, as the seller shows — grocery boxes are scarce and get snapped up.",
      "isBest": false,
      "explanation": "Six months is the lease-signing optimistic case at best, not the rent-commencement date. It ignores buildout and the co-tenancy clock, and it is exactly the kind of pro forma assumption that inflates going-in value."
    },
    {
      "label": "Zero downtime — assume the grocer renews at market, since they have operated there for years.",
      "isBest": false,
      "explanation": "The tenant has given notice it will not renew. Underwriting a renewal contradicts known facts."
    },
    {
      "label": "Twelve months exactly, because that is the co-tenancy trigger and avoids the rent reduction.",
      "isBest": false,
      "explanation": "Picking the assumption to dodge the trigger is backwards. The downtime estimate comes from the leasing process, not from the lease clause. If the realistic timeline is longer, the cost of the clause has to be modeled."
    }
  ],
  "takeaway": "Anchor backfill is slow and its cost is not just the vacant box — co-tenancy clauses turn a dark anchor into rent loss across the inline shops. Underwrite 18–24 months and model the clause.",
  "tips": [
    "Read every inline lease for co-tenancy before pricing an anchored center.",
    "Rent commencement, not lease signing, ends downtime.",
    "Box splits or conversions need more TI and more time than a like-for-like grocer."
  ]
};
