import type { SituationalCase } from '../../types/situational';

export const capRateBidSensitivity: SituationalCase = {
  id: 'cap-rate-bid-sensitivity',
  title: 'How much does a 25 bps cap rate move change the bid?',
  category: 'sensitivity',
  difficulty: 'beginner',
  roles: ['acquisitions'],
  assetClass: 'office',
  scenario:
    'You\'re pricing a stabilized office building with a forward NOI of $2,400,000. Market cap rates for comparable stabilized office assets are trading in a range of 6.50–7.00%. Your base case uses a 6.75% cap rate. A co-investor asks: "If we\'re wrong on the cap rate by 25 bps, how much does our bid price change?"',
  data: [
    { label: 'Forward NOI', value: '$2,400,000' },
    { label: 'Market cap range', value: '6.50–7.00%' },
    { label: 'Base case cap', value: '6.75%' },
    { label: 'Stress test', value: '±25 bps cap rate move' },
  ],
  question: 'How much does the bid price change for a 25 bps cap rate move in either direction?',
  options: [
    {
      label: 'Roughly $1.3M per 25 bps. At 6.50% the value is $36.9M; at 6.75% it\'s $35.6M; at 7.00% it\'s $34.3M — each 25 bps step changes the value by ~$1.3M, or about 3.6% of the base case bid.',
      isBest: true,
      explanation:
        'Value = NOI ÷ Cap Rate. At 6.50%: $2.4M ÷ 0.065 = $36.92M. At 6.75%: $2.4M ÷ 0.0675 = $35.56M. At 7.00%: $2.4M ÷ 0.070 = $34.29M. Step from 6.50% to 6.75%: −$1.37M. Step from 6.75% to 7.00%: −$1.27M. The sensitivity is not perfectly linear (it\'s a hyperbola) but approximates $1.3M per 25 bps in this range. Communicate it as: "every 25 bps of cap rate change moves our bid by roughly $1.3M, or about 3.6% of value." This is essential mental math for IC presentations and competitive bid situations.',
    },
    {
      label: 'About $600K — 25 bps is a small move and the NOI doesn\'t change.',
      isBest: false,
      explanation:
        'Underestimates the denominator effect. $2.4M NOI ÷ 0.0675 = $35.56M base. $2.4M ÷ 0.07 = $34.29M. The difference is $1.27M, not $600K. Cap rate sensitivity on assets with multi-million dollar NOI is material. The intuition that "25 bps is small" is wrong — 25 bps is ~3.7% of the cap rate itself, which translates roughly 1:1 into a percentage move in asset value.',
    },
    {
      label: 'Can\'t tell without knowing the financing structure — leverage amplifies the cap rate impact on equity.',
      isBest: false,
      explanation:
        'Partially true for equity return sensitivity, but the question asks about *bid price* (total asset value), not equity sensitivity. Total asset value = NOI ÷ cap rate, and financing structure doesn\'t affect that equation. Leverage amplifies equity returns but doesn\'t change the capitalized value of the NOI stream. The bid price sensitivity is a pure cap rate math question.',
    },
    {
      label: 'About $2.4M — 25 bps on $2.4M NOI equals $600K annually, times a 4-year implied hold period.',
      isBest: false,
      explanation:
        'Confuses the income stream with the capitalized value. Cap rate sensitivity is a division effect (NOI ÷ cap rate), not multiplication of annual income by holding period. The hold period is irrelevant to the going-in pricing equation. Value = NOI ÷ Cap; compute the delta directly from that formula.',
    },
  ],
  takeaway:
    'Cap rate bid sensitivity is essential mental math for any acquisition professional. Formula: ΔValue = NOI × (1/Cap₁ − 1/Cap₂). In the 6.5–7.0% range with $2.4M NOI, every 25 bps ≈ $1.3M of bid price, or ~3.6% of total value. Know this cold before any IC presentation.',
  tips: [
    'Formula: Value = NOI ÷ Cap. Sensitivity: ΔValue = NOI × (1/Cap₁ − 1/Cap₂).',
    'At lower cap rates, each 25 bps matters more in dollar terms: $2.4M ÷ 5.0% vs ÷ 5.25% is a larger dollar move than ÷ 7.0% vs ÷ 7.25%.',
    'Know the $/bps for each deal before walking into IC — partners will test it.',
  ],
};
