import type { SituationalCase } from '../../types/situational';

export const absorptionSupplyDemandRead: SituationalCase = {
  id: 'absorption-supply-demand-read',
  title: 'New supply is filling up — but vacancy is still rising. Why?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'industrial',
  scenario:
    'A quarterly market report for a major industrial submarket shows 2.5M SF of new supply delivered in the quarter and 1.8M SF of net absorption. Vacancy rose 40 bps to 4.2%. Asking rents are flat quarter-over-quarter. You\'re underwriting a 500,000 SF bulk warehouse in the same submarket.',
  data: [
    { label: 'New supply delivered', value: '2.5M SF' },
    { label: 'Net absorption', value: '1.8M SF' },
    { label: 'Vacancy change', value: '+40 bps (now 4.2%)' },
    { label: 'Asking rent change', value: 'Flat QoQ' },
    { label: 'Prior quarter vacancy', value: '3.8%' },
  ],
  question: 'What does this market data signal for your underwriting?',
  options: [
    {
      label:
        'Supply is outpacing demand (2.5M delivered vs 1.8M absorbed = 700k SF incremental vacancy). Submarket is healthy but tipping — underwrite rent growth of 0–2% (vs prior 4–6% trend) until supply digestion improves. 4.2% is still tight but deteriorating.',
      isBest: true,
      explanation:
        'Net absorption measures net occupancy gain — leases signed minus move-outs. When absorption < new supply, vacant inventory builds even in a "healthy" market. Here, 2.5M delivered − 1.8M absorbed = 700k SF added to vacancy, producing the +40 bps rise. The market isn\'t broken, but 2-3 more quarters of this pattern will push vacancy into the 5–6% range where rent growth stalls or reverses. Flat rents this quarter are the leading indicator. Underwriting above 2% rent growth without a supply pipeline correction story is aggressive.',
    },
    {
      label:
        'Positive net absorption means demand is strong — underwrite rent growth inline with historical trend of 4–6%.',
      isBest: false,
      explanation:
        'Positive absorption doesn\'t mean demand is absorbing supply fast enough. The number you need is net absorption vs. new deliveries. Here, demand absorbed only 72% of what was added. Underwriting prior-trend rent growth assumes the supply/demand balance is unchanged — it isn\'t.',
    },
    {
      label:
        'Vacancy rose so the market is weakening — underwrite 0% rent growth and 5.5% exit cap (vs current 5.0% market).',
      isBest: false,
      explanation:
        'The direction is right (caution), but the magnitude is overdone. 4.2% vacancy is still well below the 6–8% level where landlords make meaningful concessions. Flat rent and modest vacancy rise warrant moderating growth assumptions, not a full-stop scenario.',
    },
    {
      label:
        'Flat rents and positive absorption are contradictory — the data is probably wrong. Request a revised report before bidding.',
      isBest: false,
      explanation:
        'Flat rents with positive absorption are entirely consistent: demand is growing but so is supply. Rents plateau when the supply/demand balance is neutral and begin falling when vacancy exceeds ~6–8%. There is no contradiction here — this is the textbook early-softening signal.',
    },
  ],
  takeaway:
    'Net absorption alone is not a demand signal — it must be read against new supply. Vacancy direction is the scorecard: rising vacancy (even from a tight base) signals supply is winning. In your underwriting, stress-test the rent growth assumption against the supply pipeline, not just the historical trend.',
  tips: [
    'Net absorption = total new occupancy (move-ins) minus total occupancy losses (move-outs) in the period.',
    'When deliveries > absorption, vacancy rises even with positive demand — supply is faster.',
    'Vacancy below 5% = landlord market. 5–8% = balanced. Above 8% = tenant market with rent pressure.',
    'Always pair net absorption with the under-construction pipeline — future supply is as important as current.',
  ],
};
