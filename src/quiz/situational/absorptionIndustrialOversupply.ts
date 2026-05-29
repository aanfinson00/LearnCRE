import type { SituationalCase } from '../../types/situational';

export const absorptionIndustrialOversupply: SituationalCase = {
  id: 'absorption-industrial-oversupply',
  title: 'Spec industrial deal with 2M SF in the pipeline',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'development'],
  assetClass: 'industrial',
  scenario:
    "You're underwriting a 200,000 SF spec industrial building in a Sun Belt distribution submarket. The market has 800,000 SF of existing vacancy and 2,000,000 SF of active construction, all expected to deliver over the next 18 months. Net absorption has averaged 250,000 SF per quarter over the past two years. Your model assumes the building stabilizes at 95% occupancy in month 18.",
  data: [
    { label: 'Existing vacancy', value: '800,000 SF' },
    { label: 'Pipeline deliveries (18 mo)', value: '2,000,000 SF' },
    { label: 'Quarterly net absorption', value: '250,000 SF' },
    { label: 'Subject size', value: '200,000 SF' },
    { label: 'Assumed stabilization', value: 'Month 18 (95% occ)' },
  ],
  question: 'How do you stress-test the month-18 stabilization assumption?',
  options: [
    {
      label: 'Run the full-market absorption math: total supply to absorb (existing + pipeline) divided by quarterly pace gives ~17 quarters to clear the market — which makes month-18 stabilization aggressive for a spec building competing against 2M SF of new product.',
      isBest: true,
      explanation:
        'Total new supply to absorb: 800K existing + 2,000K pipeline = 2,800,000 SF. At 250K/quarter, the submarket needs ~11 quarters (2.75 years) to clear. Your spec building is 1 of ~11 competitors entering the same funnel. Month 18 assumes you lease up faster than the market average — possible if you have a location or spec advantage, but not the base case. The honest sensitivity is month 24–30 stabilization, and the model should show IRR at both.',
    },
    {
      label: 'Focus only on the subject building — your 200K SF is a small slice of the market, so market-level supply doesn\'t directly determine your lease-up.',
      isBest: false,
      explanation:
        "Tenants selecting space in an oversupplied market have leverage — they can take their time, negotiate concessions, and play landlords against each other. When 2M SF of competing product delivers simultaneously, every landlord's effective market rent and TI expectations soften. Treating your building in isolation misses the competitive dynamic that determines your lease-up timeline and NER.",
    },
    {
      label: 'Check whether absorption has accelerated recently — if it jumped to 300K+/quarter in the last 2 quarters, month 18 is achievable.',
      isBest: false,
      explanation:
        'Trend analysis matters but trailing acceleration can reverse. Supply-side shocks (like 2M SF coming online) depress absorption by giving tenants more options. An uptick in recent quarters that preceded the new deliveries is not a reliable forward indicator; if anything, the inflection point is when the pipeline finishes delivering and demand reasserts.',
    },
    {
      label: "Month-18 stabilization is fine — industrial has had strong demand nationally, so the pipeline will get absorbed quickly.",
      isBest: false,
      explanation:
        "Sector tailwinds don't override submarket math. National industrial demand headlines don't determine your specific building's lease-up in a submarket where new supply is growing 3.5x faster than trailing absorption. Always run the local math; never substitute macro narrative for bottoms-up submarket analysis.",
    },
  ],
  takeaway:
    "Spec industrial lease-up timing is a market-share problem: your building competes for the same tenant demand as every other new delivery. Total pipeline ÷ quarterly absorption tells you how long the market needs to clear; your building's stabilization should be benchmarked against that — not assumed faster without a specific advantage to defend.",
  tips: [
    'Total pipeline ÷ quarterly absorption = quarters to clear the submarket — sanity check every spec underwrite.',
    'In oversupplied markets, NER tends to compress even when face rent holds; model the concession creep.',
    'If stabilization extends, carry costs (interest, taxes, insurance) compound — show the IRR at month 24 and 30.',
  ],
};
