import type { SituationalCase } from '../../types/situational';

export const multifamilySeasonalAbsorption: SituationalCase = {
  id: 'multifamily-seasonal-absorption',
  title: 'Is Q4 absorption a warning sign?',
  category: 'absorption',
  difficulty: 'beginner',
  roles: ['assetManagement', 'portfolioMgmt'],
  assetClass: 'multifamily',
  scenario:
    'A multifamily submarket recorded weak absorption last quarter, and a colleague wants to cut next year\'s lease-up pace assumption for your stabilized-by-year-two deal accordingly. You pull the trailing four quarters, and last quarter was Q4, the seasonally slowest leasing period.',
  data: [
    { label: 'Q1 absorption', value: '150 units' },
    { label: 'Q2 absorption', value: '220 units' },
    { label: 'Q3 absorption', value: '200 units' },
    { label: 'Q4 absorption', value: '70 units' },
    { label: 'Trailing 12 months', value: '640 units' },
  ],
  question: 'What pace should you use to underwrite lease-up?',
  options: [
    {
      label: 'About 53 units/month — use trailing-twelve-month absorption (640 ÷ 12), since Q4 is seasonally slow.',
      isBest: true,
      explanation:
        'T12 smooths the seasonal cycle: 640 ÷ 12 ≈ 53 units/month. Q4\'s 70 units annualizes to only ~23/month, which would mistake seasonality for a demand shift. If you see Q4 weakness repeat in the next Q1–Q2, then revisit.',
    },
    {
      label: 'About 23 units/month — the latest quarter is the most current signal.',
      isBest: false,
      explanation:
        'Extrapolating the seasonal low would more than halve your pace and push stabilization out far beyond what the market supports.',
    },
    {
      label: 'About 73 units/month — annualize the best quarter, Q2.',
      isBest: false,
      explanation:
        'Cherry-picks the seasonal high. Leasing in Q2 is typically strongest, so it overstates the average pace.',
    },
    {
      label: 'Use zero until the market recovers.',
      isBest: false,
      explanation:
        'Overreaction to one seasonal data point. Absorption over the full year was healthy.',
    },
  ],
  takeaway:
    'Leasing has a seasonal rhythm. Underwrite against trailing-twelve-month absorption, or compare the same quarter year over year, rather than extrapolating a single quarter.',
  tips: [
    'Compare quarters year over year, not sequentially.',
    'T12 absorption neutralizes seasonality.',
    'Never annualize the best or worst quarter.',
  ],
};
