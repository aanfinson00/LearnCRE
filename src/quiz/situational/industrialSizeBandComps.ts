import type { SituationalCase } from '../../types/situational';

export const industrialSizeBandComps: SituationalCase = {
  id: 'industrial-size-band-comps',
  title: 'Can small-bay comps price a big-box?',
  category: 'comp-selection',
  scenario: 'You are valuing a 420,000 SF, 36\' clear, single-tenant distribution building near a major port. The broker\'s comp set is mostly 40,000–80,000 SF multi-tenant flex and small-bay buildings that sold at $210–$250/SF and 4.9–5.3% caps.',
  data: [
    {
      label: 'Subject size / clear height',
      value: '420,000 SF / 36\''
    },
    {
      label: 'Comp size range',
      value: '40–80K SF'
    },
    {
      label: 'Comp pricing',
      value: '$210–250/SF'
    },
    {
      label: 'Comp caps',
      value: '4.9–5.3%'
    },
    {
      label: 'Subject tenancy',
      value: 'Single tenant'
    }
  ],
  question: 'What is the best way to handle this comp set?',
  options: [
    {
      label: 'Re-cut the set to big-box (250K+ SF), 32\'+ clear buildings and treat small-bay comps as a separate market.',
      isBest: true,
      explanation: 'Industrial pricing splits by size band and function. Small-bay product has deep buyer demand and many tenants; big-box is a thinner, more institutional pool priced on tenant credit and lease term. Per-SF values do not translate across bands.'
    },
    {
      label: 'Apply the small-bay $/SF to the full 420,000 SF.',
      isBest: false,
      explanation: 'Mechanically scaling per-SF value from a different size band ignores the buyer pool, tenant demand, and clear-height differences.'
    },
    {
      label: 'Apply the small-bay cap rates but a lower $/SF.',
      isBest: false,
      explanation: 'Mixing metrics from different products builds a number with no market support.'
    },
    {
      label: 'Throw out comps and value on replacement cost alone.',
      isBest: false,
      explanation: 'Replacement cost is a cross-check, not a substitute for market evidence.'
    }
  ],
  takeaway: 'Industrial comps live in size and clear-height bands. Cross-band comps are context, not evidence.',
  tips: [
    'Segment by size band, clear height, and tenancy.',
    'Per-SF values rarely transfer across bands.',
    'Cross-check with replacement cost, not instead of comps.'
  ],
  difficulty: 'intermediate',
  assetClass: 'industrial',
  roles: [
    'acquisitions',
    'assetManagement'
  ]
};
