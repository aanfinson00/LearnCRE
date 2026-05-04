import type { SituationalCase } from '../../types/situational';

export const closingProrations: SituationalCase = {
  id: 'closing-prorations',
  title: 'Prorations at closing — who pays what?',
  category: 'deal-process',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement'],
  scenario:
    'You\'re closing a $30M MF acquisition on the 15th of the month. Property tax for the year is $360k (annualized; bills land in Q4). Tenant rents totaling $250k were collected by the seller for the full month on the 1st. Insurance prepaid for the next 6 months is $90k.',
  data: [
    { label: 'Closing date', value: '15th of month' },
    { label: 'Annual property tax', value: '$360k ($30k/mo)' },
    { label: 'Rent collected (full month)', value: '$250k' },
    { label: 'Insurance prepaid (6 mo)', value: '$90k' },
  ],
  question: 'How are these three items prorated at closing?',
  options: [
    {
      label:
        'Tax: seller credits buyer for tax accrued through close (~$345k for ~11.5 mos); rent: seller credits buyer for the second-half-of-month portion (~$125k); insurance: buyer credits seller for the 5.5 mos remaining unused (~$82.5k). Net effect on the closing statement: a wash-or-near-wash.',
      isBest: true,
      explanation:
        'Standard CRE proration rules: (1) **Tax** accrues daily but is paid in arrears or annually — at close, seller owes the buyer for the time period seller owned but hasn\'t yet paid. With a full-year tax of $360k closing on the 15th, seller has ~9.5 months of accrued unpaid tax = ~$285k credit to buyer. (2) **Rent** collected covers the full month — seller keeps half, credits buyer for the remaining ~half (~$125k). (3) **Prepaid insurance** is the seller\'s asset — buyer reimburses seller for the unused portion (~$82.5k credit to seller). Each line gets explicitly stated on the closing statement.',
    },
    {
      label: 'No prorations needed — everything resets on closing day; seller owes no credits and buyer owes no reimbursements.',
      isBest: false,
      explanation:
        'Wrong on every line. Each of these items has accrued or been paid during a period that spans the closing date, so each must be allocated. "No prorations" only works if everything was paid on the exact closing date, which never happens.',
    },
    {
      label: 'Buyer pays for everything from closing forward; seller keeps everything they\'ve already received. No money changes hands at closing for these items.',
      isBest: false,
      explanation:
        'Misunderstands the principle. Seller may have *received* rent for July but they didn\'t *earn* the second half — they owe the buyer for the part of July they didn\'t own the building. Same for prepaid insurance and accrued tax. Each item gets specifically prorated.',
    },
    {
      label: 'Apply a flat 1% reduction to the purchase price as a "proration adjustment" and skip the line-item math.',
      isBest: false,
      explanation:
        'Closing statements never use a flat reduction; every prorated item is a separate line. Buyers and sellers want to see exactly what they\'re paying for or being credited. "Just round it" loses real money on each line.',
    },
  ],
  takeaway:
    'Prorations are the closing-statement plumbing that allocates partial-period costs and revenues between buyer and seller. The principle: each side bears the cost — and keeps the income — for the time *they own the property*. Tax (accrued, paid later → seller credits buyer), rent (collected ahead, partially earned → seller credits buyer for unearned portion), prepaid expenses (already paid, partially used → buyer credits seller for unused portion).',
  tips: [
    'Tax proration: most common closing item; verify the tax year and payment schedule (calendar vs fiscal).',
    'Rent proration: typically per-day or per-half-month depending on the contract.',
    'Prepaid: insurance, service contracts, HOA — anything paid forward gets reimbursed for unused portion.',
  ],
};
