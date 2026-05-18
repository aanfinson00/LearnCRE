import type { SituationalCase } from '../../types/situational';

export const hotelPipRequirement: SituationalCase = {
  id: 'hotel-pip-requirement',
  title: 'Hotel: the brand requires a $12M PIP at acquisition — how do you underwrite it?',
  category: 'investment-thesis',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'hotel',
  scenario:
    "You're acquiring a 180-key Marriott-flagged hotel in a secondary market. The brand's PIP (Property Improvement Plan) requires $12M in renovations within 18 months of close — soft goods, lobby redesign, and tech upgrades. In-place NOI is $2.1M. The seller is offering a $3M credit at closing. Competing bids are landing at $30M ($167k/key). You need to decide whether the credit fully compensates you and how to incorporate the PIP into your bid.",
  data: [
    { label: 'Keys', value: '180' },
    { label: 'Flag', value: 'Marriott (full-service)' },
    { label: 'In-place NOI', value: '$2.1M' },
    { label: 'Going-in cap (at $30M)', value: '7.0%' },
    { label: 'PIP requirement', value: '$12M within 18 months' },
    { label: 'Seller credit', value: '$3M at closing' },
    { label: 'Competing bids', value: '$30M ($167k/key)' },
  ],
  question: "How do you underwrite the PIP into your bid, and does the $3M seller credit fully compensate you?",
  options: [
    {
      label:
        "No — the credit covers 25% of PIP spend. Model two hits: (1) net capex of $9M buyer cost after credit; (2) NOI disruption during renovation — phased reno at 60-65% occupancy vs. stabilized 75% costs $400-500k of annual NOI over 18 months. True all-in basis = $30M purchase + $9M net PIP + ~$600k NPV of disruption. Your effective yield check is year-3 stabilized NOI (post-PIP), not in-place $2.1M.",
      isBest: true,
      explanation:
        "Right framework. PIP underwriting has two components sellers routinely under-compensate: hard capex and soft NOI disruption. The $3M credit covers only 25% of $12M hard spend, leaving $9M on the buyer. Add the disruption hit: 10-15 point occupancy drag × $200 ADR × 180 keys × 18 months = $400-600k of lost NOI NPV. All-in basis must reflect both hits. Post-PIP NOI typically jumps 10-20% on flagged assets as brand compliance drives ADR and loyalty bookings — that's where you earn the return, not on the day-one in-place NOI.",
    },
    {
      label:
        "The $3M credit is standard and essentially covers the PIP risk. Bid $30M and underwrite on in-place NOI — the PIP is ordinary maintenance capex.",
      isBest: false,
      explanation:
        "Misclassifies the PIP. A brand-mandated PIP is not ordinary maintenance — it's a condition of keeping the flag, and losing the flag on a hotel drops value 15-25% (unbranded hotels trade at significant discounts vs. flagged). The $3M covers 25 cents on the dollar while leaving $9M of net capex and 18 months of disruption as the buyer's problem.",
    },
    {
      label:
        "Walk from any deal with a PIP — brand-mandated renovations are open-ended in cost and always overrun.",
      isBest: false,
      explanation:
        "Too binary. PIPs are a normal feature of branded hotel transactions — every change of ownership triggers a brand review, and PIPs are routinely negotiated. A defined PIP with fixed scope (soft goods, lobby, tech) has manageable overrun risk. The issue is pricing it correctly, not avoiding it. Experienced hotel buyers accept PIPs in exchange for proper price adjustments.",
    },
    {
      label:
        "Capitalize the full $12M PIP into your basis, hold year-1 NOI flat at $2.1M, and model a 15% NOI lift in year 2 immediately post-renovation.",
      isBest: false,
      explanation:
        "Misses the disruption hit. Capitalizing $12M is correct, but leaving year-1 NOI at $2.1M ignores that phased renovation displaces revenue — $400-600k of in-year NOI loss during construction. Modeling a 15% NOI lift in year 2 (immediately post-reno) is also aggressive; brand guests and loyalty bookings rebuild gradually, so the ramp is typically 12-24 months post-completion.",
    },
  ],
  takeaway:
    "Hotel PIP underwriting requires two adjustments: (1) net capex after seller credit, added to all-in basis; (2) NOI disruption during renovation, which is distinct from the capex and often under-estimated. Seller credits of $2-4M on a $10M+ PIP are common but insufficient — the buyer should adjust the bid price to reflect both. Post-PIP year-3 stabilized NOI is the correct yield check, not in-place day-one NOI.",
  tips: [
    "PIP scope risk: always request a third-party PIP assessment before signing the PSA — brand PIPs are estimates, not guaranteed maximums.",
    "Disruption model: estimate 10-15 point occupancy drag during active reno phases × daily room revenue. Flag this as a separate line in your acquisition model.",
    "Post-PIP NOI lift: flagged hotel renovations typically improve ADR 8-15% and occupancy 3-5 points over 18-24 months via brand compliance and loyalty system enrollment.",
  ],
};
