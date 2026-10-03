import type { SituationalCase } from '../../types/situational';

export const sensitivityExitCapVsRentGrowth: SituationalCase = {
  id: 'sensitivity-exit-cap-vs-rent-growth',
  title: 'Which assumption moves the exit value more?',
  category: 'sensitivity',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'portfolioMgmt'],
  assetClass: 'multifamily',
  scenario:
    'You are underwriting a 5-year hold: 5.5% going-in cap, 3% annual NOI growth, and a 5.5% exit cap. The IC memo has two downside cases: Case 1, exit cap widens by 50 bps to 6.0%. Case 2, NOI growth is 1 point lower at 2% per year.',
  data: [
    { label: 'Going-in cap', value: '5.5%' },
    { label: 'Base NOI growth', value: '3%/yr' },
    { label: 'Base exit cap', value: '5.5%' },
    { label: 'Downside 1', value: 'Exit cap +50 bps' },
    { label: 'Downside 2', value: 'NOI growth −1 pt (2%/yr)' },
  ],
  question: 'Which downside reduces the exit value more, approximately?',
  options: [
    {
      label: 'Case 1 (exit cap +50 bps): about −8%, versus about −5% for Case 2.',
      isBest: true,
      explanation:
        'Value ∝ 1/cap. 5.5% → 6.0% means value falls by 1 − 5.5/6.0 ≈ 8.3%. Lower NOI growth compounds to (1.02/1.03)^5 ≈ 0.953, so exit NOI is about 4.7% lower. Exit cap is the bigger lever in most 5-year holds.',
    },
    {
      label: 'Case 2: growth compounds over five years so it is always bigger.',
      isBest: false,
      explanation:
        'Compounding matters, but a 1-point growth shortfall over five years only reduces exit NOI by ~4.7%. A 50 bp cap move is larger.',
    },
    {
      label: 'They are about equal.',
      isBest: false,
      explanation:
        'Roughly 8.3% versus 4.7% is not equal, and the gap grows with the hold length for caps but not for NOI at short holds.',
    },
    {
      label: 'Case 1, but only if the going-in cap also moves.',
      isBest: false,
      explanation:
        'The going-in cap is set by the purchase price and does not change the exit sensitivity.',
    },
  ],
  takeaway:
    'Exit cap sensitivity is usually the largest single driver of value in a short hold, because each 50 bps move at a ~5.5% cap is roughly an 8–9% change in value. Always show it first in sensitivity tables.',
  tips: [
    'Value change from a cap move ≈ −Δcap ÷ new cap.',
    'Growth sensitivity matters more as the hold gets longer.',
    'Run both at once to see the compound downside.',
  ],
};
