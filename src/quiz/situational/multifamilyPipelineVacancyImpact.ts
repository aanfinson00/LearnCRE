import type { SituationalCase } from '../../types/situational';

export const multifamilyPipelineVacancyImpact: SituationalCase = {
  id: 'multifamily-pipeline-vacancy-impact',
  title: 'Where does vacancy land after the pipeline?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['mortgageUw', 'portfolioMgmt', 'acquisitions'],
  assetClass: 'multifamily',
  scenario:
    'A multifamily submarket has 25,000 units at 5% vacancy. A pipeline of 2,000 units will deliver over the next 18 months. Household formation has historically absorbed about 700 units per year, and you\'re sizing a loan whose DSCR depends on occupancy over that window.',
  data: [
    { label: 'Existing inventory', value: '25,000 units' },
    { label: 'Current vacancy', value: '5% (1,250 units)' },
    { label: 'Pipeline', value: '2,000 units over 18 months' },
    { label: 'Absorption', value: '700 units/yr' },
    { label: 'Absorption over 18 months', value: '1,050 units' },
  ],
  question: 'Where does market vacancy land at the end of the 18 months?',
  options: [
    {
      label: 'About 8% — 950 net new vacant units added to the 1,250 existing, on a 27,000-unit base: 2,200 ÷ 27,000 ≈ 8.1%.',
      isBest: true,
      explanation:
        'Absorption over 18 months is 700 × 1.5 = 1,050 units. Net vacant added = 2,000 − 1,050 = 950. Total vacant = 1,250 + 950 = 2,200 on 27,000 units = ~8.1%. A 3-point rise in vacancy will pressure concessions and rent growth, so sensitize the DSCR.',
    },
    {
      label: 'About 12% — all 2,000 new units sit vacant on top of the existing 1,250.',
      isBest: false,
      explanation:
        'Ignores absorption. Over 18 months, demand fills roughly half the pipeline.',
    },
    {
      label: 'About 5% — the pipeline is only 8% of inventory, so vacancy won\'t move.',
      isBest: false,
      explanation:
        'Pipeline size relative to inventory isn\'t the test; it\'s pipeline versus absorption. Deliveries of 2,000 units against 1,050 absorbed is a 950-unit gap.',
    },
    {
      label: 'About 3% — vacancy falls because the new units attract more renters.',
      isBest: false,
      explanation:
        'New supply doesn\'t create demand by itself. Without evidence of induced demand, assume the historical absorption pace.',
    },
  ],
  takeaway:
    'Future vacancy = (existing vacant + deliveries − absorption) ÷ (inventory + deliveries). Convert absorption to the full delivery window and expand the base before computing the new rate.',
  tips: [
    'Scale annual absorption to the length of the delivery window.',
    'Expand the inventory base to include the deliveries.',
    'Sensitize DSCR to a vacancy rise and concession growth.',
  ],
};
