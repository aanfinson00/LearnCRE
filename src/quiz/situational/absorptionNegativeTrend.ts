import type { SituationalCase } from '../../types/situational';

export const absorptionNegativeTrend: SituationalCase = {
  id: 'absorption-negative-trend',
  title: 'Three quarters of negative absorption — which deal do you still underwrite?',
  category: 'absorption',
  difficulty: 'advanced',
  roles: ['acquisitions', 'development'],
  assetClass: 'industrial',
  scenario:
    'An industrial submarket has posted three consecutive quarters of negative net absorption: Q1: -50k SF, Q2: -75k SF, Q3: -100k SF. The trend is accelerating. You have two deals under LOI: Deal A needs a 200k SF building leased within 6 months; Deal B needs a 150k SF building leased within 18 months. New supply in the pipeline is 400k SF delivering over the next 12 months.',
  data: [
    { label: 'Q1 net absorption', value: '-50,000 SF' },
    { label: 'Q2 net absorption', value: '-75,000 SF' },
    { label: 'Q3 net absorption', value: '-100,000 SF' },
    { label: 'New supply (12 mo)', value: '400,000 SF' },
    { label: 'Deal A lease-up window', value: '6 months' },
    { label: 'Deal B lease-up window', value: '18 months' },
  ],
  question: 'How does the negative absorption trend affect your deal discipline?',
  options: [
    {
      label: 'Kill Deal A — 6 months is indefensible with a -100k SF/quarter trend and 400k SF of supply incoming. Deal B has potential if the trend reverses within 12 months; price it with wide vacancy assumptions and model a base case of 18–24 months to stabilization.',
      isBest: true,
      explanation:
        'With -100k SF/quarter in a market adding 400k SF of supply, a 6-month lease-up for 200k SF requires the market to reverse hard and fast — not defensible underwriting. Deal B has an 18-month window, during which 1–2 quarters of trend reversal could occur before stabilization pressure peaks. Price Deal B with worst-case absorption (12–18 months to 90% leased) and confirm returns hold at those assumptions. If Deal A must proceed, require a pre-lease before closing.',
    },
    {
      label: 'Both deals are risky — pause both until absorption turns positive.',
      isBest: false,
      explanation:
        'Too binary. Waiting for positive absorption could mean 12–18 months of missed opportunities. Deal B with an 18-month window has time for the cycle to shift; dismissing it without running the downside math misses the nuance. Disciplined underwriting of the scenarios is the right answer, not blanket paralysis.',
    },
    {
      label: 'Use the trailing 4-quarter average (-56k SF) as the base case for both deals.',
      isBest: false,
      explanation:
        'Averaging over an accelerating trend understates current-period risk. When absorption runs -50k, -75k, -100k, the trailing average of -56k is already stale. When a trend is clearly directional and accelerating, the most recent data point is a better forward estimate than the trailing mean.',
    },
    {
      label: 'Industrial leasing is cyclical — underwrite both deals at the long-run average absorption pace.',
      isBest: false,
      explanation:
        'Long-run averages smooth out exactly the dislocations that create underwriting risk. Using a long-run average during a confirmed negative-trend quarter will produce systematically optimistic stabilization timelines and budget misses.',
    },
  ],
  takeaway:
    'Accelerating negative net absorption is a compounding red flag: each deteriorating quarter makes the near-term more severe. Short lease-up windows (6 months) become indefensible in negative-absorption markets with a large supply pipeline. Longer windows (18 months) can still work if you price the downside scenario and confirm IRR holds. Never use the trailing average when the trend is clearly moving in one direction.',
  tips: [
    'Trend matters as much as level: -50, -75, -100 is worse than a flat -75 for 3 quarters.',
    'Check the supply pipeline: new deliveries into negative absorption create a double headwind.',
    'Always confirm deal IRR at the extended stabilization case (e.g., 24 months), not just at plan.',
  ],
};
