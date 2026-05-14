import type { SituationalCase } from '../../types/situational';

export const multifamilyLeaseUpAbsorption: SituationalCase = {
  id: 'multifamily-lease-up-absorption',
  title: 'Multifamily: your lease-up velocity just missed by 30 units in Month 3 — do you cut rents?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['development', 'assetManagement'],
  assetClass: 'multifamily',
  scenario:
    "You just delivered a 300-unit Class-A apartment building in a growing Sun Belt submarket. Your proforma projected leasing 25 units/month to stabilize at 94% in 12 months. After 3 months you've leased 45 units (15/month pace vs 25/month target). You're 30 units behind. Asking rents are $2,050/unit; submarket comps are at $1,980–$2,020. A leasing broker is suggesting you drop rents 5% to $1,948 to accelerate absorption.",
  data: [
    { label: 'Units', value: '300' },
    { label: 'Proforma pace', value: '25 units/month → 94% in 12 months' },
    { label: 'Actual pace (3 mos)', value: '15 units/month (45 units total)' },
    { label: 'Deficit', value: '30 units behind' },
    { label: 'Asking rent', value: '$2,050/unit' },
    { label: 'Submarket comp rents', value: '$1,980–$2,020' },
    { label: 'Broker suggestion', value: '5% rent reduction to $1,948' },
  ],
  question: 'Should you cut asking rents 5%, and what\'s the cost of the rent cut vs. the cost of the delay?',
  options: [
    {
      label:
        "Don't cut face rents yet — you're 3% over comp rents and 3 months in. Offer concessions (1–2 months free rent) instead to close the velocity gap while preserving the ADR. Cutting face rent is permanent and resets comps for your remaining 255 units at a lower benchmark. Cost of 1-month free on 30 units: ~$62k. Cost of permanent rent cut on all 255 remaining units: $102/unit × 255 × 12 months = ~$312k in Year 1 alone. The concession path is 5× cheaper and reversible.",
      isBest: true,
      explanation:
        "The math: $2,050 × 5% = $102/unit/month rent reduction. Applied to all 255 remaining units × 12 months = $311,700 in Year 1 NOI loss that compounds into all future years and affects exit valuation. Free rent on 30 units (to bridge the velocity gap) at $2,050 × 1 month = $61,500 one-time. Concessions are off the rent roll and don't reset the comp base; face rent cuts do. Also: at 3 months and 45 units leased, you're at 15% occupancy — it's too early to declare a market miss. Rents at $2,050 are only 1.5–3.5% above comps; that's within a normal discovery period. The instinct to cut at first miss is expensive.",
    },
    {
      label:
        'Cut rents 5% immediately to accelerate leasing — the velocity miss is compounding and stabilization timing is critical to your construction loan maturity.',
      isBest: false,
      explanation:
        "Urgency is real if the construction loan matures in 12 months, but a permanent 5% rent cut is the wrong tool. First, model the construction loan extension cost vs. the permanent NOI impairment: a 6-month extension at 300 bps over SOFR on a $40M loan costs ~$500k — still less than the $312k/yr permanent hit from a rent cut compounded over a 5-year hold. Second, consider concessions first — they can close velocity gaps without resetting the rent base. Only cut face rents if the submarket has repriced and comps have moved down, which 3 months of data does not establish.",
    },
    {
      label:
        'Bring in a new leasing firm and wait 60 more days before making a pricing decision.',
      isBest: false,
      explanation:
        "Changing brokers and waiting is a valid tactic but doesn't engage the rent-vs-concession tradeoff the question is driving at. If the issue is broker execution (tour quality, follow-up, online presence), a new firm makes sense. If the issue is pricing, concessions are the right first move regardless of broker. A decision-free 60-day wait risks deeper velocity misses and may not be compatible with construction loan timeline.",
    },
    {
      label:
        'The velocity miss is normal — lease-up ramps slowly in Month 1–2 and accelerates later. Take no action.',
      isBest: false,
      explanation:
        "A 40% miss vs proforma (15 vs 25 units/month) over 3 months is not noise. Month 1 ramp-up is real, but by Month 3 you should be at or near full velocity. The 30-unit deficit compounds: at the current pace, 12-month total = 180 units (60% occupancy) vs 280 units target (93%). That's a construction loan breach risk. Taking no action on a 40% miss after 3 months is not defensible to investors or lenders.",
    },
  ],
  takeaway:
    "Lease-up velocity misses should be addressed with concessions before face rent cuts because: (1) concessions preserve the rent roll benchmark for all remaining unleased units; (2) the cost of concessions is bounded and one-time; (3) face rent cuts are permanent and multiply across all remaining units and all future years. The break-even test: if the concession cost < (rent cut × remaining units × hold period), concessions are the right first move. Face rents should only come down if comps have moved and the submarket has repriced.",
  tips: [
    'Effective rent = face rent − (free months / lease term). A 1-month free on a 12-month lease = 8.3% effective discount with no change to the rent roll.',
    'Leasing velocity benchmarks: luxury/Class-A typically 15–20 units/month in early months, ramping to 25–35/month at stabilization.',
    'Velocity data becomes meaningful after Month 3 — before that, discovery period traffic and initial ramp are too variable to draw conclusions.',
  ],
};
