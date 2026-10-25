import type { SituationalCase } from '../../types/situational';

export const hotelNewSupplyDilution: SituationalCase = {
  id: 'hotel-new-supply-dilution',
  title: 'What happens when 250 new rooms open?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'development'],
  assetClass: 'hotel',
  scenario:
    'A hotel submarket has 4,000 rooms running at 70% occupancy. A new 250-room hotel is opening next quarter. Demand in the submarket is flat, with no new demand generators, and you\'re acquiring a 150-room hotel in the same competitive set.',
  data: [
    { label: 'Existing supply', value: '4,000 rooms' },
    { label: 'Current occupancy', value: '70%' },
    { label: 'New supply', value: '250 rooms' },
    { label: 'New total supply', value: '4,250 rooms' },
    { label: 'Demand growth', value: '0%' },
  ],
  question: 'What happens to submarket occupancy, assuming flat demand?',
  options: [
    {
      label: 'It falls to about 66% — flat demand of 2,800 occupied rooms spread over 4,250 rooms is 65.9%.',
      isBest: true,
      explanation:
        'Occupied rooms = 4,000 × 70% = 2,800. With no demand growth, 2,800 ÷ 4,250 = 65.9%. A 4-point drop in occupancy at constant ADR is a ~6% RevPAR fall, so your own hotel\'s underwriting needs to absorb that dilution before any share-gain story.',
    },
    {
      label: 'It stays at 70% — new hotels create their own demand.',
      isBest: false,
      explanation:
        'Induced demand is real in some markets but it\'s an assumption you\'d have to prove. With flat demand, new rooms simply dilute occupancy.',
    },
    {
      label: 'It falls to about 62% — the new hotel adds 250 rooms, a 6% supply jump, so occupancy drops six points.',
      isBest: false,
      explanation:
        'Confuses percent supply growth with percentage-point occupancy change. The correct calculation is demand ÷ new supply.',
    },
    {
      label: 'It rises to about 74% — new product pulls in more travelers.',
      isBest: false,
      explanation:
        'No basis in flat demand. The new hotel competes for the same room nights.',
    },
  ],
  takeaway:
    'With flat demand, occupancy resets to existing occupied rooms ÷ new total supply. Run that dilution before crediting any share gain or induced demand.',
  tips: [
    'New occupancy = existing occupied rooms ÷ (existing + new rooms).',
    'Occupancy dilution at flat ADR flows straight to RevPAR.',
    'Treat induced demand as upside you must evidence.',
  ],
};
