import type { SituationalCase } from '../../types/situational';

export const exchangeBootMechanics: SituationalCase = {
  id: 'exchange-boot-mechanics',
  title: '1031 exchange: identifying and curing boot',
  category: 'deal-process',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'portfolioMgmt'],
  assetClass: 'mixed',
  scenario:
    "You're selling a free-and-clear (no mortgage) warehouse for $5M net of closing costs. You set up a qualified intermediary (QI) who holds the full $5M of sale proceeds. Within 45 days you identify a replacement retail strip center priced at $6M. The lender on the replacement property requires a $4M loan and $2M of equity — meaning the QI will disburse $2M to the replacement closing and you'll wire an additional $800K of new cash out-of-pocket (total equity: $2.8M). At closing, $3M remains in the QI account after the $2M disbursement.",
  data: [
    { label: 'Relinquished property net proceeds', value: '$5M (no mortgage)' },
    { label: 'Cash held by QI', value: '$5M' },
    { label: 'Replacement property price', value: '$6M' },
    { label: 'Replacement loan', value: '$4M' },
    { label: 'QI disbursement to replacement closing', value: '$2M' },
    { label: 'Your additional out-of-pocket cash', value: '$800K' },
    { label: 'Remaining in QI after replacement closes', value: '$3M' },
    { label: 'Old debt / New debt', value: '$0 / $4M' },
  ],
  question:
    'How much boot is generated in this exchange, why, and what is the simplest cure?',
  options: [
    {
      label:
        "Boot generated: $3M of cash boot — the $3M remaining in the QI is returned to you unreinvested and is fully taxable. Cure: reinvest all $5M from the QI (reduce the new loan to $1M, putting $5M of QI proceeds plus $800K of new cash into the $6M replacement), or identify a second replacement property that absorbs the $3M within the 180-day exchange window.",
      isBest: true,
      explanation:
        'The 1031 rules require reinvestment of ALL exchange proceeds to defer 100% of the gain. Cash boot equals any exchange proceeds not reinvested. Here $5M was held by the QI but only $2M went to the replacement closing — the $3M returned to you is taxable boot. Note that your $800K of new cash is NOT boot; adding fresh equity above and beyond QI proceeds is allowed and encouraged. The cure is either (a) increase equity on the same deal (reduce loan to $1M so all $5M of QI proceeds close the $6M replacement), or (b) identify a second replacement property to absorb the unused proceeds. Trading up in total value ($6M > $5M) is a necessary but NOT sufficient condition — you also must reinvest every dollar of exchange proceeds.',
    },
    {
      label:
        'No boot is generated — the replacement property value ($6M) exceeds the relinquished value ($5M), satisfying the "equal or greater value" test.',
      isBest: false,
      explanation:
        'Partially correct but fatally incomplete. Equal-or-greater value is only one of three requirements for a fully tax-deferred exchange. You must ALSO: (1) reinvest all exchange proceeds (equity boot test) and (2) carry equal-or-greater debt (mortgage-relief boot test). Here requirement #1 fails: only $2M of the $5M in QI proceeds is reinvested. The $3M of unreinvested cash is taxable boot regardless of the fact that you bought up in value. This is the most common real-world error in 1031 exchanges.',
    },
    {
      label:
        "Boot generated: $4M equal to the new mortgage on the replacement property — when you take on new debt in an exchange, the lender's loan counts as boot received.",
      isBest: false,
      explanation:
        'Incorrect. New debt taken on the replacement is not boot; it is treated as equity reinvested (it reduces the cash you need to close). Mortgage-relief boot occurs when your OLD debt EXCEEDS your NEW debt — because the lender paying off your old loan puts cash in your pocket (effectively boot received). Here old debt was $0 and new debt is $4M — no mortgage relief, and the new debt is beneficial to the exchange (it helps close the gap). Taking on more debt than you carried is not penalized.',
    },
    {
      label:
        'Boot generated: $800K of new cash you contributed out-of-pocket — fresh equity added above the QI proceeds is treated as boot received from the exchange.',
      isBest: false,
      explanation:
        "Incorrect. Adding fresh equity out-of-pocket to close a replacement acquisition is called 'exchange equity' or 'boot in' — it is specifically permitted and does not generate taxable boot. Only boot OUT (cash you receive from the exchange) is taxable. You can add as much new cash as you want to a 1031 replacement transaction; the only concern is reinvesting exchange proceeds, not the total equity contributed.",
    },
  ],
  takeaway:
    "Three requirements must ALL be satisfied to fully defer gain in a 1031 exchange: (1) equal-or-greater replacement value, (2) all exchange proceeds reinvested (no cash boot), and (3) equal-or-greater debt on the replacement (no mortgage-relief boot). The most common failure mode is #2 — QI proceeds that aren't fully deployed become taxable boot. The cure is simple: size the replacement loan to absorb exactly the gap between purchase price and QI proceeds, or find additional qualifying property.",
  tips: [
    'Boot test mnemonic — cash boot = QI balance not reinvested; mortgage-relief boot = old debt − new debt (if positive). Both are taxable.',
    'Adding fresh equity to the replacement closing is always allowed — it reduces loan sizing and satisfies the reinvestment requirement.',
    '45-day identification / 180-day closing rules: identify up to 3 properties by day 45, close the replacement by day 180 from the relinquished closing.',
  ],
};
