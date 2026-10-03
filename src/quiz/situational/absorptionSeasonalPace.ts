import type { SituationalCase } from '../../types/situational';

export const absorptionSeasonalPace: SituationalCase = {
  id: 'absorption-seasonal-pace',
  title: 'Sponsor underwrites the peak leasing month',
  category: 'absorption',
  difficulty: 'beginner',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'multifamily',
  scenario:
    'A new 200-unit apartment community started leasing in June. Monthly leases signed so far: June 18, July 17, August 16, September 12, October 9, November 7. The sponsor\'s pro forma assumes the June pace of 18 leases per month continues until the property reaches 93% (186 units).',
  data: [
    { label: 'Units', value: '200' },
    { label: 'Stabilization target', value: '93% (186 units)' },
    { label: 'Sponsor pace', value: '18 leases/month' },
    { label: 'Leases so far (Jun–Nov)', value: '79' },
  ],
  question: 'What is the main flaw in the sponsor\'s timeline?',
  options: [
    {
      label: 'It extrapolates the seasonal peak; leasing slows into winter, so the true pace is closer to the blended 12–13/month and stabilization takes ~15 months, not ~10.',
      isBest: true,
      explanation:
        'Sponsor: 186 ÷ 18 ≈ 10.3 months. Realistic blended pace is ~12/month (the 6-month average is 13.2 and falling), so 186 ÷ 12 ≈ 15.5 months. Leasing in the winter months is typically the slowest of the year.',
    },
    {
      label: 'There is no flaw; best-month pace shows what the property can do.',
      isBest: false,
      explanation:
        'The peak month shows the ceiling, not the expected pace. Underwriting to the ceiling guarantees missing the timeline.',
    },
    {
      label: 'The sponsor should use the November pace of 7/month for all remaining months.',
      isBest: false,
      explanation:
        'Over-corrects. The latest month is seasonal low, and using it for spring and summer too would understate absorption.',
    },
    {
      label: 'The target should be 100% occupancy, not 93%.',
      isBest: false,
      explanation:
        'Stabilization targets are set below 100% to allow for normal turnover. 93% is a reasonable and common target.',
    },
  ],
  takeaway:
    'Never annualize a seasonal peak. Underwrite lease-up at a blended pace, shaped by the season, and check the pro forma against the actual trend in the most recent months.',
  tips: [
    'Plot leases per month and check the direction of the trend.',
    'Seasonal adjustment: spring/summer faster, Nov–Feb slower.',
    'Ask whether concessions were increased to hit the early pace.',
  ],
};
