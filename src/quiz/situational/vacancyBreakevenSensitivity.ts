import type { SituationalCase } from '../../types/situational';

export const vacancyBreakevenSensitivity: SituationalCase = {
  id: 'vacancy-breakeven-sensitivity',
  title: 'What vacancy rate breaks the deal?',
  category: 'sensitivity',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'mortgageUnderwriting'],
  assetClass: 'multifamily',
  scenario:
    'A 200-unit multifamily asset is underwritten at 5% economic vacancy with a going-in cap of 5.25% and a DSCR of 1.25x at closing. Debt service is $1.2M/year. Gross potential rent is $3.0M/year. OpEx (fixed) is $900k/year. You\'re asked to determine: at what vacancy rate does the deal either breach 1.0x DSCR or generate negative cash flow?',
  data: [
    { label: 'Gross potential rent', value: '$3,000,000/yr' },
    { label: 'Economic vacancy (base)', value: '5%' },
    { label: 'Effective gross income (base)', value: '$2,850,000/yr' },
    { label: 'Operating expenses (fixed)', value: '$900,000/yr' },
    { label: 'NOI (base)', value: '$1,950,000/yr' },
    { label: 'Debt service', value: '$1,200,000/yr' },
    { label: 'DSCR (base)', value: '1.25x' },
  ],
  question: 'At what economic vacancy rate does DSCR fall to exactly 1.0x?',
  options: [
    {
      label: 'About 30% vacancy — the deal hits 1.0x DSCR when NOI = $1.2M, which requires EGI = $2.1M, which requires collecting 70% of gross rent ($2.1M ÷ $3.0M).',
      isBest: true,
      explanation:
        'Work backward: DSCR = 1.0x requires NOI = debt service = $1.2M. NOI = EGI − OpEx → $1.2M = EGI − $0.9M → EGI = $2.1M. Vacancy rate = 1 − (EGI / GPR) = 1 − ($2.1M / $3.0M) = 30%. So the deal has 25 ppts of vacancy cushion above the base case (5% → 30%) before it hits 1.0x DSCR. That\'s a wide cushion for a stabilized asset — this is healthy debt coverage for a market with normal vacancy fluctuation, but would matter more in a lease-up context.',
    },
    {
      label: 'About 15% vacancy — halfway between 5% (base) and 25% (rough stress).',
      isBest: false,
      explanation:
        'Picking the midpoint is guessing, not computing. The correct method is back-solving: what EGI is needed for NOI = $1.2M (1.0x DSCR), then what vacancy does that imply. The math produces 30%, not 15%.',
    },
    {
      label: 'About 10% vacancy — any more than double the base case should trip coverage.',
      isBest: false,
      explanation:
        'Rules of thumb (double the base case) are not a substitute for the actual calculation. The answer depends on the OpEx load and debt service level. Fixed OpEx means each dollar of lost rent hits NOI dollar-for-dollar — calculate it, don\'t approximate.',
    },
    {
      label: 'DSCR never hits 1.0x because OpEx adjusts with occupancy.',
      isBest: false,
      explanation:
        'The prompt explicitly states OpEx is fixed at $900k/yr. Even if some OpEx is variable, the question asks you to model the scenario as given. In practice, some OpEx does flex with occupancy (utilities, management fees), but fixed-OpEx is the standard conservative modeling assumption for a sensitivity stress test.',
    },
  ],
  takeaway:
    'DSCR breakeven vacancy is a standard lender stress test, and a useful underwriter\'s check. The formula is straightforward: back-solve EGI from the debt service floor, then derive the implied vacancy. A 25+ ppt cushion above base case vacancy is healthy for stabilized; a 10 ppt cushion in a lease-up is tight.',
  tips: [
    'DSCR breakeven: NOI = DS → EGI = DS + OpEx → vacancy% = 1 − (EGI/GPR).',
    'Fixed OpEx is conservative and standard for sensitivity runs — every $1 of lost rent hits NOI $1.',
    'Lenders typically want 20+ ppts of breakeven vacancy cushion for stabilized assets.',
  ],
};
