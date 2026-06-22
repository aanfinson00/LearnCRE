import type { SituationalCase } from '../../types/situational';

export const compOfficeLeaseStructure: SituationalCase = {
  id: 'comp-office-lease-structure',
  title: 'Can you mix NNN and gross comps for an office deal?',
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'office',
  scenario:
    'You are underwriting a 120,000 SF suburban office building leased on a modified-gross basis. The broker provides 4 recent trade comps, all in the same submarket, all within 10 months. You notice 2 comps are gross-lease buildings and 2 are NNN.',
  data: [
    { label: 'Subject', value: 'Modified-gross office, 120k SF' },
    { label: 'Comp A (NNN)', value: '6.25% going-in cap — tenant pays taxes, insurance, CAM' },
    { label: 'Comp B (NNN)', value: '6.50% going-in cap — tenant pays taxes, insurance, CAM' },
    { label: 'Comp C (Gross)', value: '7.75% going-in cap — landlord pays all OpEx' },
    { label: 'Comp D (Gross)', value: '8.00% going-in cap — landlord pays all OpEx' },
  ],
  question: 'How do you reconcile these 4 comps to price the subject?',
  options: [
    {
      label:
        'Average the NNN comps (6.38%) separately from the gross comps (7.88%) — then interpolate for modified-gross based on where the subject\'s OpEx burden falls between the two structures. The spread of ~150 bps reflects the landlord\'s OpEx exposure.',
      isBest: true,
      explanation:
        'NNN and gross cap rates are NOT apples-to-apples. A gross cap embeds the landlord\'s OpEx cost in the denominator, so it naturally produces a wider cap for the same economic yield. Mixing them without adjustment overstates or understates value. Modified-gross is typically 50–100 bps wider than NNN in the same market. The 150 bps observed spread here is consistent — the interpolated target for modified-gross might be ~6.75–7.00%.',
    },
    {
      label:
        'Average all 4 comps at face value (7.13%) and apply that to the subject NOI — more comps improve accuracy.',
      isBest: false,
      explanation:
        'More comps do not improve accuracy if they measure different things. A gross cap rate reflects a different risk/cost structure than a NNN cap rate. Averaging them without adjustment creates a blended number that\'s defensible to no one and misprices the asset by ~50–75 bps.',
    },
    {
      label:
        'Use only the NNN comps and apply a flat 50 bps widener for modified-gross — 6.88% going-in cap.',
      isBest: false,
      explanation:
        'Using only NNN comps and adding a rules-of-thumb premium is a reasonable shortcut — but the gross comps also contain useful data. The 50 bps widener is directionally right but should be calibrated to the actual observed spread, not assumed. If gross comps are available, ignoring them wastes information.',
    },
    {
      label:
        'Discard the gross comps entirely — NNN comps are cleaner and more comparable to modified-gross than full gross.',
      isBest: false,
      explanation:
        'Modified-gross is closer to NNN on the expense-burden spectrum, but discarding gross comps wastes a data point you\'ve already sourced. The better move is to document the adjustment methodology and use all four comps with a bridge.',
    },
  ],
  takeaway:
    'Cap rates across different lease structures are not directly comparable. A gross cap will always be wider than a NNN cap for the same asset because the landlord bears more cost. Always label your comps by lease structure and make the adjustment explicit — auditors, lenders, and IC members will notice if you don\'t.',
  tips: [
    'Rule of thumb: gross vs NNN spread = 100–200 bps in office, narrower in industrial.',
    'Modified-gross: landlord pays base-year OpEx; tenant pays increases above the stop.',
    'When lease structures differ, sort comps by structure before averaging.',
  ],
};
