import type { SituationalCase } from '../../types/situational';

export const devSpreadThinMargin: SituationalCase = {
  id: 'dev-spread-thin-margin',
  title: 'Is a 50 bps development spread enough?',
  category: 'pricing',
  scenario: 'A sponsor wants to greenlight a 280-unit garden multifamily development. Untrended yield on cost is 5.75%. Recent stabilized trades in the submarket are pricing at 5.25% cap rates. The sponsor argues the project "creates value" because it will be worth more than it costs.',
  data: [
    {
      label: 'Untrended yield on cost',
      value: '5.75%'
    },
    {
      label: 'Market cap rate (stabilized)',
      value: '5.25%'
    },
    {
      label: 'Development spread',
      value: '50 bps'
    },
    {
      label: 'Construction + lease-up',
      value: '~30 months'
    },
    {
      label: 'Typical hurdle for ground-up',
      value: '100–150 bps'
    }
  ],
  question: 'How should you react to the proposed spread?',
  options: [
    {
      label: 'Pass or re-trade — 50 bps does not compensate for construction, lease-up, and exit-cap risk.',
      isBest: true,
      explanation: 'Ground-up development carries entitlement, cost, lease-up, and timing risk that a stabilized purchase does not. Markets generally need 100–150+ bps of spread over the market cap rate to pay for it. At 50 bps, a 50 bps move in exit cap or a 5% cost overrun erases the entire profit margin.'
    },
    {
      label: 'Proceed — any positive spread means the project creates value.',
      isBest: false,
      explanation: 'A positive spread is necessary, not sufficient. The spread is the only cushion against cost overruns, rent shortfalls, and cap-rate expansion over a ~30-month build. Thin spreads turn small misses into value destruction.'
    },
    {
      label: 'Proceed, but assume the exit cap compresses to 4.75% to justify the deal.',
      isBest: false,
      explanation: 'Underwriting cap compression to make a deal pencil is the classic way to fool yourself. Exit assumptions should be flat-to-wider than today\'s cap rate, not tighter.'
    },
    {
      label: 'Proceed because stabilized NOI will grow with rents during construction.',
      isBest: false,
      explanation: 'Trending rents is how you get a "trended" yield, but the hurdle is usually measured on untrended yield precisely so rent growth is upside, not the thing paying for the risk.'
    }
  ],
  takeaway: 'Development spread (yield on cost minus market cap) is the margin of safety for building rather than buying. Thin spreads leave no room for the ordinary misses every project has.',
  tips: [
    'Judge the spread on untrended yield on cost.',
    'Rule of thumb: 100–150+ bps over market cap for ground-up.',
    'Stress cost +5–10% and exit cap +50 bps before you believe the spread.'
  ],
  difficulty: 'advanced',
  assetClass: 'multifamily',
  roles: [
    'development',
    'acquisitions'
  ]
};
