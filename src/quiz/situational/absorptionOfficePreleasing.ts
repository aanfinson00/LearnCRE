import type { SituationalCase } from '../../types/situational';

export const absorptionOfficePreleasing: SituationalCase = {
  id: 'absorption-office-preleasing',
  title: '45% pre-leased at delivery — when do we stabilize?',
  category: 'absorption',
  difficulty: 'advanced',
  roles: ['development', 'acquisitions'],
  assetClass: 'office',
  scenario:
    'A 400,000 SF office building delivers next quarter, 45% pre-leased. Stabilization for your loan is 90% occupancy. Submarket net absorption is about 150,000 SF per quarter, but three buildings (including yours) are competing for that demand as they deliver in the same window.',
  data: [
    { label: 'Building size', value: '400,000 SF' },
    { label: 'Pre-leased', value: '45% (180,000 SF)' },
    { label: 'Stabilization target', value: '90%' },
    { label: 'Submarket absorption', value: '150,000 SF/quarter' },
    { label: 'Competing deliveries', value: '3 buildings, similar timing' },
  ],
  question: 'Which timeline is the most defensible underwriting assumption for reaching 90%?',
  options: [
    {
      label: 'About 3–4 quarters — 180,000 SF remaining, and the building captures roughly a one-third fair share of ~150,000 SF/quarter.',
      isBest: true,
      explanation:
        'Remaining to lease: (90% − 45%) × 400,000 = 180,000 SF. A fair share of 150,000 SF/quarter across three competitors is ~50,000 SF/quarter, so 180,000 ÷ 50,000 ≈ 3.6 quarters. Add a cushion for downtime between signing and commencement.',
    },
    {
      label: 'About 1.2 quarters — the submarket absorbs 150,000 SF per quarter.',
      isBest: false,
      explanation:
        'Assumes your building captures all submarket demand. Absorption is shared by every competing building, so capture rate matters more than the market total.',
    },
    {
      label: 'About 8 quarters — new office demand is always slow, so double it.',
      isBest: false,
      explanation:
        'A blanket multiplier isn\'t underwriting. Tie the pace to measurable inputs (remaining SF, market absorption, capture share) and then flex it.',
    },
    {
      label: 'Pre-leasing is irrelevant; stabilization is determined by the debt maturity.',
      isBest: false,
      explanation:
        'Debt terms set the deadline, not the leasing pace. The pre-leased share is the single best early signal of how much risk remains.',
    },
  ],
  takeaway:
    'Lease-up time = remaining SF to target ÷ (market absorption × your capture share). Pre-leasing reduces the numerator; competing deliveries reduce your share of the denominator.',
  tips: [
    'Fair share is a starting point; adjust for quality, location, and pricing vs. competitors.',
    'Signed is not occupied: add months for buildout and rent commencement.',
    'Check the loan\'s stabilization test against this timeline before the closing.',
  ],
};
