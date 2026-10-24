import type { SituationalCase } from '../../types/situational';

export const devEntitlementClosing: SituationalCase = {
  id: 'dev-entitlement-closing',
  title: 'Close before entitlements?',
  category: 'deal-process',
  difficulty: 'intermediate',
  roles: ['development', 'acquisitions'],
  scenario:
    'You have a 12-acre infill site under contract at $9M for a 280-unit multifamily project. Rezoning is pending and a hearing is scheduled in seven months. The seller wants to close in 90 days, and your deposit goes hard at the end of diligence in 60 days.',
  data: [
    { label: 'Contract price', value: '$9.0M' },
    { label: 'Planned density', value: '280 units' },
    { label: 'By-right density', value: '90 units' },
    { label: 'Hearing date', value: '7 months out' },
    { label: 'Deposit goes hard', value: '60 days' },
  ],
  question: 'What is the best way to structure this?',
  options: [
    {
      label: 'Negotiate an entitlement contingency with extension payments: closing within 30 days of final approval, with extension deposits that are credited to price.',
      isBest: true,
      explanation:
        'By-right density supports roughly one-third of the units, so the price only works with the rezoning. Extension deposits compensate the seller for time and credit against price, while the entitlement contingency keeps the downside limited to the deposits.',
    },
    {
      label: 'Close in 90 days and pursue the rezoning as owner — you control the application.',
      isBest: false,
      explanation:
        'Closing converts entitlement risk into land-basis risk. If rezoning fails, you hold a $9M site worth a fraction of that.',
    },
    {
      label: 'Let the deposit go hard on schedule to show the seller you are serious.',
      isBest: false,
      explanation:
        'A hard deposit before approval puts that money at risk for a hearing outcome you do not control.',
    },
    {
      label: 'Reduce the price by one-third to reflect by-right density and close on schedule.',
      isBest: false,
      explanation:
        'This pricing is defensible if you are buying by-right, but it surrenders the whole upside and the seller is unlikely to accept it.',
    },
  ],
  takeaway:
    'Entitlement risk should sit in the contract, not on your balance sheet. Pay time-based extension fees, credit them to price, and tie closing to approval.',
  tips: [
    'Credit extension payments to the purchase price when negotiating.',
    'Tie closing to final, non-appealable approval where possible.',
    'Know your by-right fallback value before you sign.',
  ],
};
