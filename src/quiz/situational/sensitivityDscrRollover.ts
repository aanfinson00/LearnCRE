import type { SituationalCase } from '../../types/situational';

export const sensitivityDscrRollover: SituationalCase = {
  id: 'sensitivity-dscr-rollover',
  title: 'Above-market leases are rolling — what happens to DSCR?',
  category: 'sensitivity',
  difficulty: 'advanced',
  roles: ['mortgageUw', 'acquisitions'],
  assetClass: 'office',
  scenario:
    'You are underwriting a 5-year office loan. Current DSCR at close is 1.32x on in-place rents of $28/SF across 100% occupancy. Market rents are $24/SF — existing tenants are on legacy leases signed above current market. Forty percent of net rentable area rolls in Year 2. If renewing tenants negotiate down to market ($24/SF) and 30% of the rolling space has 6 months of downtime before re-leasing, how does DSCR change in Year 2?',
  data: [
    { label: 'In-place rent', value: '$28/SF (100% occupied)' },
    { label: 'Market rent', value: '$24/SF' },
    { label: 'DSCR at origination', value: '1.32x' },
    { label: 'NRSF rolling in Year 2', value: '40%' },
    { label: 'Downtime on non-renewals', value: '6 months on 30% of rolling SF' },
  ],
  question: 'What is the approximate DSCR impact in Year 2 and what lender risk does it create?',
  options: [
    {
      label: 'DSCR likely falls to approximately 1.10–1.18x in Year 2. The rent roll-down from $28 to $24 on 40% of the portfolio plus downtime on non-renewals can drive a 10–13% NOI decline — potentially tripping cash trap or covenant thresholds if the lender\'s floor is 1.15x or 1.20x.',
      isBest: true,
      explanation:
        'Break it into two pieces. Rent roll-down: 40% of SF moves from $28 to $24 = 14.3% rent decline on that cohort = 5.7% total NOI impact. Downtime: 40% rolling × 30% not renewing × 6 months = 6% of total SF dark for 6 months = ~3% annual NOI hit. Combined: roughly 8–9% NOI decline in Year 2. Stressed DSCR: 1.32 × (1 − 0.09) ≈ 1.20x. This is already at the boundary of typical cash trap thresholds (1.10–1.20x). If downtime or renewal concessions are worse than assumed, DSCR trips below 1.15x. Lenders should model every major rollover year — not just underwrite at close.',
    },
    {
      label: 'DSCR stays at 1.32x — above-market leases rolling to market is normal and lenders build this expectation into origination.',
      isBest: false,
      explanation:
        'Lenders may expect rollover, but they still need to model it. A $28-to-$24 roll on 40% of SF plus downtime is a 10%+ NOI event — not within normal tolerance. The right question is whether the stressed DSCR trips loan covenants, not whether the scenario is "expected." The covenant may have a cure mechanism, but prospectively identifying the breach is the entire purpose of sensitivity analysis.',
    },
    {
      label: 'DSCR impact is minimal because debt service does not change — only income fluctuates, and the fixed payment provides stability.',
      isBest: false,
      explanation:
        'Fixed debt service does not provide stability — it amplifies income volatility. Because the denominator (debt service) is fixed, every dollar of NOI decline flows dollar-for-dollar into DSCR compression. A 10% NOI decline on a 1.32x DSCR loan produces a 1.32 × 0.90 = 1.19x Year-2 DSCR. That is a 13-point drop in just one year and may breach the cash trap threshold.',
    },
    {
      label: 'Ask the borrower to lock in renewals before close — that eliminates the rollover sensitivity entirely.',
      isBest: false,
      explanation:
        'Sometimes viable but not always practical 18–24 months pre-expiry. More importantly, even if the borrower pursues renewals, the underwriting must model the scenario where tenants negotiate to market or vacate. "Pre-negotiate at close" is a mitigation step, not a substitute for running the sensitivity. If the leases have not been renewed yet, the rollover risk exists and must be modeled.',
    },
  ],
  takeaway:
    'Above-market in-place rents create a hidden DSCR cliff when legacy leases roll. The combination of rent roll-down and downtime can produce a 10–13% NOI decline that trips loan covenant or cash trap thresholds. Lenders should run DSCR sensitivity at every major rollover event within the loan term — not only at origination.',
  tips: [
    'DSCR sensitivity formula: stressed DSCR = origination DSCR × (1 − NOI decline %).',
    'Model rollover NOI in two pieces: rent roll-down (market vs in-place × rolling SF) plus downtime (months dark × annualized rent).',
    'Cash trap thresholds are typically 1.10–1.20x; model whether each rollover year breaches them and whether the cure mechanism is achievable.',
  ],
};
