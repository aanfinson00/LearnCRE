import type { SituationalCase } from '../../types/situational';

export const absorptionGrossVsNet: SituationalCase = {
  id: 'absorption-gross-vs-net',
  title: 'Strong leasing, shrinking occupancy?',
  category: 'absorption',
  difficulty: 'beginner',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'office',
  scenario:
    'A broker touts an office submarket as having a record year of leasing: 400,000 SF of gross leasing activity. You dig into the data: move-outs and contractions totaled 520,000 SF. The submarket has 8.0M SF of inventory at 88% occupancy and no new deliveries.',
  data: [
    { label: 'Inventory', value: '8.0M SF' },
    { label: 'Occupancy', value: '88%' },
    { label: 'Gross leasing', value: '400,000 SF' },
    { label: 'Move-outs / contractions', value: '520,000 SF' },
  ],
  question: 'What is the right read on the market?',
  options: [
    {
      label: 'Net absorption is −120,000 SF; occupancy drops to ~86.5%, so landlord leverage is weakening despite the headline leasing volume.',
      isBest: true,
      explanation:
        'Net absorption = 400,000 − 520,000 = −120,000 SF. Occupied SF falls from 7.04M to 6.92M; 6.92 ÷ 8.0 ≈ 86.5%. Gross leasing includes renewals and tenants relocating within the market, which move space around without adding demand.',
    },
    {
      label: 'Strong demand — gross leasing volume is the best indicator of market health.',
      isBest: false,
      explanation:
        'Gross leasing ignores space returned to the market. Demand is net.',
    },
    {
      label: 'Neutral — leasing and move-outs are noise that average out.',
      isBest: false,
      explanation:
        'They didn\'t average out here: the gap is 120k SF, roughly 1.5% of inventory in one year.',
    },
    {
      label: 'Occupancy rises to ~93% because leasing covers the existing vacancy.',
      isBest: false,
      explanation:
        'Treats gross leasing as if it all filled vacant space and ignores move-outs.',
    },
  ],
  takeaway:
    'Net absorption (move-ins minus move-outs) drives occupancy and pricing power. Gross leasing volume is a vanity metric unless you net out move-outs.',
  tips: [
    'Ask for net absorption and occupancy trend, not gross leasing.',
    'Renewals are not demand growth.',
    'Sublease space returning to market counts against absorption.',
  ],
};
