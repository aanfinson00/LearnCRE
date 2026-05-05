import type { SituationalCase } from '../../types/situational';

export const covenantTestingCadence: SituationalCase = {
  id: 'covenant-testing-cadence',
  title: 'When does the lender actually check covenant compliance?',
  category: 'deal-process',
  difficulty: 'intermediate',
  roles: ['mortgageUw', 'assetManagement'],
  scenario:
    'You\'ve closed on a permanent loan with these covenants: 1.20x maintenance DSCR (springing recourse below), 8% debt yield floor (cash sweep below), no transfer of property without lender consent. The borrower\'s monthly NOI fluctuates with vacancy and seasonal expenses. As the asset manager, when does the lender actually run these tests?',
  data: [
    { label: 'DSCR maintenance', value: '1.20x — springing recourse below' },
    { label: 'Debt yield floor', value: '8.0% — cash sweep below' },
    { label: 'Transfer covenant', value: 'No transfer without consent' },
    { label: 'NOI volatility', value: 'Monthly fluctuation; quarterly averages stable' },
  ],
  question: 'How is covenant compliance typically measured + tested?',
  options: [
    {
      label:
        'Tested QUARTERLY against trailing-12-months (TTM) NOI, not monthly point-in-time. Borrower delivers a compliance certificate within 45 days of quarter-end with the calc + supporting financials. Trigger events (DSCR breach, debt-yield breach) are based on the TTM number, not the worst single month — which is why monthly NOI bounces don\'t typically trigger covenants.',
      isBest: true,
      explanation:
        'Covenant testing is almost always TTM-based on a quarterly cadence. The reason: monthly NOI swings violently (a one-time legal expense, a quarterly tax bill, seasonal vacancy spikes) and would trigger covenants weekly if tested point-in-time. TTM smooths this out. The compliance certificate is delivered by the borrower within 30-60 days of quarter-end (45 is typical) with the TTM calc plus the supporting GL data so the lender can verify. Trigger events fire only on the TTM number — so a single bad month doesn\'t cascade into a default.',
    },
    {
      label: 'Tested MONTHLY against the prior month\'s NOI to catch deterioration early.',
      isBest: false,
      explanation:
        'Monthly point-in-time testing would turn every operating asset into a compliance fire drill. Real CRE NOI fluctuates 10-30% month-to-month due to tax timing, insurance prepayments, repairs, seasonal vacancy. Covenant breaches based on monthly point-in-time would happen routinely on perfectly-healthy assets. TTM is the industry standard.',
    },
    {
      label: 'Tested ANNUALLY at the loan anniversary based on audited financials.',
      isBest: false,
      explanation:
        'Too slow. Annual testing means deterioration could run for 10 months before the lender knows. Quarterly TTM is the right balance — frequent enough to catch real trends, infrequent enough to smooth volatility.',
    },
    {
      label: 'Tested CONTINUOUSLY by the lender via direct access to the property\'s bank accounts.',
      isBest: false,
      explanation:
        'Lenders almost never have direct read access to operating accounts. The compliance reporting is borrower-self-reported (with reps + warranties + audit rights). "Continuous" monitoring is theoretical, not operational, in standard CRE permanent debt.',
    },
  ],
  takeaway:
    'Covenants test on a quarterly TTM basis, not monthly point-in-time. Compliance certificate delivered by the borrower within 45 days of quarter-end with the calc + supporting data. Trigger events fire on the TTM number, which is why month-to-month NOI volatility doesn\'t typically cascade into default. Calendar this for the asset-management team.',
  tips: [
    'Compliance certificate cadence: 45 days post quarter-end is industry norm.',
    'TTM smooths month-to-month volatility; the lender cares about the trend, not a single bad month.',
    'Covenant breach typically triggers a notice + cure period before recourse / sweep activates.',
  ],
};
