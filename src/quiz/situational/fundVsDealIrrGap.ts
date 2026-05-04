import type { SituationalCase } from '../../types/situational';

export const fundVsDealIrrGap: SituationalCase = {
  id: 'fund-vs-deal-irr-gap',
  title: 'Why is fund-level IRR 14% when deal-level is 16%?',
  category: 'diagnostic',
  difficulty: 'advanced',
  roles: ['portfolioMgmt'],
  assetClass: 'mixed',
  scenario:
    'You\'re reviewing an LP report. Deal-level IRRs across the fund\'s 8 acquisitions average 16%. The fund-level IRR (net to LPs) is 14%. The 200 bps gap is a recurring question from your investor base.',
  data: [
    { label: 'Deal-level IRR (avg)', value: '16%' },
    { label: 'Fund-level net IRR', value: '14%' },
    { label: 'Gap', value: '200 bps' },
    { label: 'Fund vintage', value: 'Year 4 of 7' },
    { label: 'Mgmt fee', value: '1.5% of committed' },
    { label: 'Carry', value: '20% over 8% pref' },
  ],
  question: 'What\'s the dominant explanation for the 200 bps gap?',
  options: [
    {
      label:
        'A combination: management fees on committed capital (~75 bps drag), the J-curve from undeployed capital (~50-75 bps), and carry on outperformance (~25-50 bps). All three compound; no single one explains it.',
      isBest: true,
      explanation:
        'Fund-level vs deal-level IRR gaps come from three structural sources: (1) **fees** — mgmt fee is on committed capital, so undeployed dollars still pay; that\'s a steady drag of 50-100 bps depending on deployment pace; (2) **J-curve** — capital is called over years 1-3 but doesn\'t produce returns until invested, so early-year IRRs are negative even on great deals; (3) **carry/promote** — when the fund crosses the pref hurdle, the GP takes a slice of incremental returns, dropping LP-net IRR. Sophisticated LPs expect 200-300 bps of gap and look for *consistent* gap, not "no gap" (which would suggest no deals are clearing pref or the fees aren\'t being charged).',
    },
    {
      label: 'Cash drag from undeployed capital sitting in the fund account earning low interest.',
      isBest: false,
      explanation:
        'Real but small (typically 25-50 bps, not 200). Most of the gap is fees + J-curve + carry, not idle cash. Capital is usually called close to deployment, so cash-drag is a minor component.',
    },
    {
      label: 'Bad deals dragging down the average — IRR-weighted means a few losses pull the fund-level number below the average.',
      isBest: false,
      explanation:
        'Misreads the math. Deal-level IRR *is* an IRR average; if it shows 16%, the bad deals are already baked in. The gap to fund-level isn\'t about hidden losses — it\'s about fees + structure. Looking for "bad deals" to explain the gap is a category error.',
    },
    {
      label: 'Tax leakage between the deal entity and the fund vehicle.',
      isBest: false,
      explanation:
        'Tax structures *can* introduce friction in some unusual setups, but for most US-based real estate funds the tax pass-through is clean (LPs report deal-level allocations on their K-1s). Tax leakage isn\'t a 200 bps systematic source. Fees + J-curve + carry are.',
    },
  ],
  takeaway:
    'Fund-level vs deal-level IRR always diverges by 200-300 bps for fully-functioning vehicles. The breakdown is roughly fees (50-100 bps), J-curve (50-75 bps), carry (25-100 bps depending on outperformance). No-gap is a red flag, not a positive — it means either fees aren\'t being charged or no deals have crossed pref. LPs who understand this don\'t panic at 200 bps; they panic at 0 bps or 500+ bps.',
  tips: [
    'Mgmt fee on committed = a constant drag for the first 3-4 years until deployment catches up.',
    'J-curve is sharpest in years 1-2 and self-corrects as distributions begin.',
    'No carry being earned typically means the deals haven\'t cleared the 8% pref — could be performance or could be timing.',
  ],
};
