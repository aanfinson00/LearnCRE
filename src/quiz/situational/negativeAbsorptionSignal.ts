import type { SituationalCase } from '../../types/situational';

export const negativeAbsorptionSignal: SituationalCase = {
  id: 'negative-absorption-signal',
  title: 'Three straight quarters of negative absorption — buy or pass?',
  category: 'absorption',
  difficulty: 'advanced',
  roles: ['acquisitions'],
  assetClass: 'office',
  scenario:
    'An off-market opportunity surfaces in an urban office submarket. The asset is 85% leased with a 4.5-year WALT. The submarket has posted negative net absorption for three consecutive quarters (Q1: −80k SF, Q2: −130k SF, Q3: −150k SF) on a 15M SF base. Current submarket vacancy is 17%. The asking price implies a 6.0% going-in cap on in-place NOI. Your firm targets a 14% levered IRR.',
  data: [
    { label: 'Asset occupancy', value: '85% (4.5-yr WALT)' },
    { label: 'Submarket inventory', value: '15M SF' },
    { label: 'Submarket vacancy', value: '17%' },
    { label: 'Q1 net absorption', value: '−80,000 SF' },
    { label: 'Q2 net absorption', value: '−130,000 SF' },
    { label: 'Q3 net absorption', value: '−150,000 SF' },
    { label: 'Going-in cap (ask)', value: '6.0%' },
  ],
  question: 'Which response reflects the correct underwriting posture?',
  options: [
    {
      label: 'Price for rollover risk: underwrite flat-to-negative rent growth, model the 15% of leases expiring within 3 years at a realistic renewal rate (below 100%), and only proceed if the deal returns 14%+ on that stressed scenario — not just on in-place NOI.',
      isBest: true,
      explanation:
        'Accelerating negative absorption (−80 → −130 → −150k) signals structural demand loss, not cyclical. In 17% vacancy submarket, tenants have leverage; rents at rollover will likely be flat or negative. The 6.0% going-in cap on in-place leases is misleading — what matters is stabilized NOI after the WALT burns off. Model: (a) conservative renewal probability, (b) flat/negative re-leasing spreads, (c) concession costs (TI + LCs) at lease-up. If the deal pencils to 14% on that basis, it\'s a defensible thesis. If it only works on a mark-to-market recovery, it needs a specific catalyst.',
    },
    {
      label: 'Pass immediately — negative absorption for three quarters means the market is in structural decline.',
      isBest: false,
      explanation:
        'Negative absorption in a particular submarket doesn\'t automatically mean permanent structural decline, though it is a serious warning sign. Many good risk-adjusted deals exist in stressed markets — the key is pricing correctly. Knee-jerk passes leave money on the table in repriced markets. The discipline is in the underwriting, not the avoidance.',
    },
    {
      label: 'Buy at the 6.0% cap — the in-place WALT insulates you from the current market softness for 4+ years.',
      isBest: false,
      explanation:
        '4.5-year WALT protects you for 4.5 years, but roll risk starts inside that horizon (15% of leases typically expire in years 1–3). By year 4–5, you\'re releasing into the same challenged submarket. The 6.0% going-in cap doesn\'t account for the mark-to-market risk at rollover in a 17% vacancy environment. Buying on in-place NOI alone ignores the cliff.',
    },
    {
      label: 'Bid 10% below asking to extract a margin of safety from the negative absorption trend.',
      isBest: false,
      explanation:
        'A haircut without a model is not discipline — it\'s guessing. The correct approach is to build the stressed scenario (realistic renewal rates, negative rent growth, full concession costs) and back-solve for the price that delivers the target IRR. That price may be 10% off, 20% off, or at asking — but the number should come from the model, not from a rule-of-thumb.',
    },
  ],
  takeaway:
    'Negative absorption is a compounding signal: three consecutive quarters of acceleration means vacancy is building, not stabilizing. The underwriting response is not a blanket pass — it\'s stress-testing the rollover math. In-place NOI is a floor, not a target, in a market with structural oversupply.',
  tips: [
    'Map lease expiration schedule against absorption trend: leases expiring in years 1–3 are in the danger window.',
    'In 17%+ vacancy markets, tenants have pricing power — underwrite re-leasing spreads as flat or negative.',
    'Three consecutive quarters of accelerating negative absorption is a structural signal; two is ambiguous.',
  ],
};
