import type { SituationalCase } from '../../types/situational';

export const officeNetVsGrossAbsorption: SituationalCase = {
  id: 'office-net-vs-gross-absorption',
  title: 'Leasing is up, so why is absorption negative?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'office',
  scenario:
    'A broker pitches a CBD office submarket as \'roaring back\' because leasing volume rose 15% year over year. Your own data shows net absorption was negative over the same period. You\'re asked whether the leasing volume supports underwriting rent growth on a 70%-leased building in that submarket.',
  data: [
    { label: 'Gross leasing volume (T12)', value: '1.8M SF' },
    { label: 'Move-outs and contractions (T12)', value: '2.2M SF' },
    { label: 'Net absorption (T12)', value: '−0.4M SF' },
    { label: 'Share of leasing that is renewals/relocations', value: '~65%' },
    { label: 'Subject building occupancy', value: '70%' },
  ],
  question: 'What does the data say about underwriting rent growth?',
  options: [
    {
      label: 'Gross leasing mostly reflects renewals and tenants shuffling buildings; with net absorption at −0.4M SF, occupied space is shrinking, so underwrite flat rents and longer downtime.',
      isBest: true,
      explanation:
        'Net absorption = move-ins − move-outs. Leasing volume includes renewals and relocations that add no net demand to the submarket. With occupied space contracting, landlords still compete for the same shrinking tenant pool, and a 70%-leased building has to win share, not ride the market.',
    },
    {
      label: 'Underwrite 3% rent growth — rising leasing volume is the leading indicator.',
      isBest: false,
      explanation:
        'Gross volume is a poor leading indicator when most of it is renewals and relocations. The metric that moves rents is net absorption against supply.',
    },
    {
      label: 'Ignore absorption data and underwrite off the broker\'s leasing comps.',
      isBest: false,
      explanation:
        'Comps tell you what deals priced at, not whether demand is growing. Without the net figure, you can\'t tell whether comps reflect a recovering market or concessions in a shrinking one.',
    },
    {
      label: 'Net absorption is only one quarter of noise; annualize the best quarter.',
      isBest: false,
      explanation:
        'Annualizing the best quarter is cherry-picking. The trailing twelve months is already the smoothed figure.',
    },
  ],
  takeaway:
    'Gross leasing measures activity; net absorption measures demand. Rent growth follows net absorption against supply, so always net out move-outs and strip renewals before trusting a leasing-volume headline.',
  tips: [
    'Ask what share of leasing volume is renewals and relocations.',
    'Net absorption = move-ins − move-outs.',
    'A 70%-leased building needs share gains, not just a good headline.',
  ],
};
