import type { SituationalCase } from '../../types/situational';

export const exitCapVsRentGrowthSensitivity: SituationalCase = {
  id: 'exit-cap-vs-rent-growth-sensitivity',
  title: 'Which assumption moves IRR the most?',
  category: 'sensitivity',
  scenario: 'A 5-year value-add deal is underwritten at a 5.5% going-in cap, 3% annual rent growth, and a 5.5% exit cap. Reversion proceeds make up about 70% of total levered cash returned. Your IC memo needs a one-slide answer on what to stress first.',
  data: [
    {
      label: 'Going-in / exit cap',
      value: '5.5% / 5.5%'
    },
    {
      label: 'Rent growth',
      value: '3.0%/yr'
    },
    {
      label: 'Hold',
      value: '5 years'
    },
    {
      label: 'Reversion share of proceeds',
      value: '~70%'
    },
    {
      label: 'Candidate stresses',
      value: 'Exit cap +50 bps; rent growth −100 bps'
    }
  ],
  question: 'Which stress should lead the sensitivity page?',
  options: [
    {
      label: 'Exit cap +50 bps: it cuts sale value roughly 8%, and leverage magnifies that hit to equity.',
      isBest: true,
      explanation: 'Value scales with 1 ÷ cap: 5.5% to 6.0% is a ~8.3% drop in sale price on the bulk of proceeds. A 100 bps haircut on rent growth lowers Year-5 revenue by roughly 5% and NOI a bit more. Both matter, but the exit cap is the larger, more direct hit — and equity bears the whole loss after debt.'
    },
    {
      label: 'Rent growth −100 bps: operations drive everything.',
      isBest: false,
      explanation: 'It matters, but the effect compounds slowly, and it hits Year-5 NOI by only mid-single digits.'
    },
    {
      label: 'Neither — IRR is mostly driven by the going-in cap.',
      isBest: false,
      explanation: 'The going-in cap is known at purchase. Uncertainty sits in future assumptions.'
    },
    {
      label: 'Vary both together only; one-at-a-time tables are misleading.',
      isBest: false,
      explanation: 'Joint scenarios are useful, but single-variable tables are how you rank which input matters most.'
    }
  ],
  takeaway: 'Rank sensitivities by how much value each assumption moves. Exit cap usually dominates because it reprices the largest single cash flow.',
  tips: [
    'Value ∝ 1 ÷ cap rate.',
    'Show single-variable stresses first, then combined downside.',
    'Equity absorbs leveraged losses first.'
  ],
  difficulty: 'advanced',
  assetClass: 'mixed',
  roles: [
    'acquisitions',
    'portfolioMgmt'
  ]
};
