import type { SituationalCase } from '../../types/situational';

export const absorptionPreleasedLeaseup: SituationalCase = {
  id: 'absorption-preleased-leaseup',
  title: 'When does the new building stabilize?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['development', 'acquisitions'],
  assetClass: 'multifamily',
  scenario:
    'A 240-unit multifamily property delivers next month with 40 units already pre-leased. The leasing team expects to sign about 25 net new leases per month at current concession levels. Your lender\'s stabilization test is 93% physical occupancy.',
  data: [
    { label: 'Total units', value: '240' },
    { label: 'Pre-leased at delivery', value: '40 units' },
    { label: 'Net absorption pace', value: '25 units/month' },
    { label: 'Stabilization threshold', value: '93% occupancy' },
  ],
  question: 'Roughly how many months from delivery to hit the 93% threshold?',
  options: [
    {
      label: 'About 7 months — 93% of 240 is ~223 units; subtract the 40 pre-leased and absorb the remaining ~183 at 25/month.',
      isBest: true,
      explanation:
        '93% × 240 = 223.2, so ~223 occupied units are required. Pre-leased units count toward that total, leaving ~183 to lease. 183 ÷ 25 ≈ 7.3 months. Add a cushion for seasonality: a winter delivery can run slower than the trailing pace.',
    },
    {
      label: 'About 9 months — 223 units ÷ 25/month.',
      isBest: false,
      explanation:
        'Ignores the 40 pre-leased units. Pre-leases are already in the bag at delivery, so dividing the full 223 by the pace overstates the timeline by roughly 1.6 months.',
    },
    {
      label: 'About 8 months — you must lease up to 100%, so (240 − 40) ÷ 25.',
      isBest: false,
      explanation:
        'Stabilization is tested at the lender\'s threshold, not 100%. Underwriting to full occupancy is a different (and never fully achieved) target; it overstates time and interest carry.',
    },
    {
      label: 'About 10 months — 240 ÷ 25, since all units must be leased.',
      isBest: false,
      explanation:
        'Ignores both the pre-leased units and the 93% threshold. Two errors that happen to compound in the same direction.',
    },
  ],
  takeaway:
    'Lease-up time = (threshold occupancy × units − pre-leased units) ÷ net monthly absorption. Count pre-leases as done, and test against the threshold actually in the loan or business plan, not 100%.',
  tips: [
    'Pre-leased units reduce the remaining work, but check whether they are executed leases or just deposits.',
    'Use net absorption (leases minus move-outs), not gross leasing velocity.',
    'Stress the pace by 20–30% to size interest reserve and carry.',
  ],
};
