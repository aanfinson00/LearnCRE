import type { SituationalCase } from '../../types/situational';

export const constructionEquityFirstVsParipassu: SituationalCase = {
  id: 'construction-equity-first-vs-paripassu',
  title: 'Equity-first vs pari-passu — which structure does the lender want?',
  category: 'deal-process',
  difficulty: 'intermediate',
  roles: ['development', 'mortgageUw'],
  scenario:
    'You\'re negotiating a construction loan term sheet. The lender is proposing equity-first funding ($20M sponsor equity must be drawn in full before the lender funds the first dollar). Sponsor is pushing for pari-passu (each draw splits 40/60 sponsor/lender from day 1). Total project cost is $50M; expected duration is 18 months. The current rate environment makes carry costs significant.',
  data: [
    { label: 'Total project cost', value: '$50M' },
    { label: 'Capital stack', value: '$20M equity / $30M lender' },
    { label: 'Construction duration', value: '~18 months' },
    { label: 'Construction loan rate', value: '9% (SOFR + 350)' },
  ],
  question:
    'Which structure does each party prefer, and what\'s the dollar impact on sponsor over the construction period?',
  options: [
    {
      label:
        'Lender prefers equity-first: sponsor capital sits in front of lender risk, so if the project blows up, sponsor loses first. Sponsor prefers pari-passu: it preserves sponsor cash + delays equity deployment, which boosts equity IRR. The carry-cost savings on pari-passu over 18 months: avg lender balance is ~$15M for ~9 months extra under pari-passu vs ~6 months under equity-first → ~$340k of additional interest avoided × the sponsor\'s ~33% effective interest carry burden = $340k of cash impact, plus IRR uplift from delayed deployment.',
      isBest: true,
      explanation:
        'Lender economics: equity-first puts sponsor capital "below" lender capital in the loss waterfall — if the project value at completion is less than total cost, sponsor eats first (because their equity is already drawn / spent). Pari-passu draws split each draw at the committed-capital ratio, leaving lender exposed earlier. Sponsor economics: pari-passu defers equity outlay, which (1) keeps sponsor cash deployed elsewhere earning return, (2) compresses the equity-deployment-to-exit time period, mathematically improving IRR. Numerically: under equity-first, sponsor is fully drawn by month ~6 (vs continuously through month 18 under pari-passu); the time-value of having $X drawn 12 months later rather than now is real dollars in a 9% rate environment.',
    },
    {
      label:
        'They\'re economically equivalent — both fund the same total dollars over the life of the project, just at different paces.',
      isBest: false,
      explanation:
        'Total dollars are the same, but the *time value* of capital differs materially. Equity-first front-loads sponsor commitment; pari-passu spreads it. In a 9% rate environment, that timing difference is ~$200-400k of cash impact + IRR uplift to sponsor.',
    },
    {
      label:
        'Sponsor prefers equity-first: putting capital in early demonstrates commitment to the lender and improves loan pricing.',
      isBest: false,
      explanation:
        'Loan pricing is set at term-sheet stage; equity-first vs pari-passu doesn\'t change pricing meaningfully (sponsor commitment is shown via personal guaranties, completion guaranties, and loan covenants — not via draw structure). Sponsors universally prefer pari-passu when they can get it.',
    },
    {
      label:
        'Lender prefers pari-passu — it gives the lender more visibility into sponsor cash flow throughout construction.',
      isBest: false,
      explanation:
        'Pari-passu reduces the lender\'s loss-cushion at any given moment of the project (sponsor cap is less front-loaded). Lenders consistently prefer equity-first for the same reason sponsors prefer pari-passu — cushion timing.',
    },
  ],
  takeaway:
    'Equity-first vs pari-passu is one of the most-negotiated terms in construction term sheets. **Equity-first**: sponsor capital fully drawn before lender begins; lender-friendly (sponsor exposed first to losses). **Pari-passu**: each draw splits at committed-capital ratio; sponsor-friendly (defers equity, boosts IRR). Sponsor leverage: stronger relationships, lower-LTC requests, and competitive lender bidding push toward pari-passu. Lender leverage: tight credit markets, weaker sponsors, or higher-LTC requests push toward equity-first.',
  tips: [
    'Equity-first delays lender funding; pari-passu accelerates it. Lender prefers the structure that keeps their funding *behind* sponsor capital.',
    'Sponsor IRR uplift from pari-passu is ~50-150 bps over an 18-month construction (depends on draw curve + carry rate).',
    'Hybrid structures exist: "equity-first to 50% then pari-passu" splits the difference and is a common compromise.',
    'In tight credit markets, sponsors take what they get. In loose markets, push for pari-passu.',
  ],
};
