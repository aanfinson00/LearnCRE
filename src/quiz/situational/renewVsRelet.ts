import type { SituationalCase } from '../../types/situational';

export const renewVsRelet: SituationalCase = {
  id: 'renew-vs-relet-net-effective',
  title: 'Renew cheaper or re-let higher?',
  category: 'lease-econ',
  scenario: 'An office tenant is rolling. Option 1: renew for 5 years at $30/SF gross, $10/SF TI, 1 month free. Option 2: let it go and re-let at $33/SF for 7 years with $55/SF TI, 6 months free, and about 9 months of downtime. Leasing commissions are similar.',
  data: [
    {
      label: 'Renewal',
      value: '5 yr, $30, $10 TI, 1 mo free'
    },
    {
      label: 'Re-let',
      value: '7 yr, $33, $55 TI, 6 mo free'
    },
    {
      label: 'Downtime (re-let)',
      value: '~9 months'
    },
    {
      label: 'Commissions',
      value: 'Similar'
    }
  ],
  question: 'Which has the better net effective economics?',
  options: [
    {
      label: 'Renewal: about $27.50/SF/yr versus about $20.60/SF/yr over the full cycle for the re-let.',
      isBest: true,
      explanation: 'Renewal: ($30 × 4.92 yrs − $10) ÷ 5 ≈ $27.50. Re-let: ($33 × 6.5 yrs − $55) ÷ 7.75 yrs (including downtime) ≈ $20.60. The higher headline rent is eaten by TI, free rent, and vacancy.'
    },
    {
      label: 'Re-let: the $33 headline rent is 10% higher.',
      isBest: false,
      explanation: 'Headline rent ignores concessions and downtime, which together consume the premium.'
    },
    {
      label: 'They are equivalent once commissions are included.',
      isBest: false,
      explanation: 'Commissions are similar, so they do not close a ~$7/SF/yr gap.'
    },
    {
      label: 'Cannot compare because terms differ.',
      isBest: false,
      explanation: 'Different terms are exactly why you annualize net effective rent over the full cycle including downtime.'
    }
  ],
  takeaway: 'Compare leases on net effective rent over the whole cycle: rent less TI, free rent, and downtime, divided by total time.',
  tips: [
    'Include downtime in the denominator.',
    'Spread TI and free rent over the term.',
    'Renewals usually win on economics; re-lets win on mark-to-market only when spreads are large.'
  ],
  difficulty: 'intermediate',
  assetClass: 'office',
  roles: [
    'assetManagement',
    'acquisitions'
  ]
};
