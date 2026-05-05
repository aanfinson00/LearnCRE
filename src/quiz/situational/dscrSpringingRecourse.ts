import type { SituationalCase } from '../../types/situational';

export const dscrSpringingRecourse: SituationalCase = {
  id: 'dscr-springing-recourse',
  title: 'Springing recourse — what triggers personal liability?',
  category: 'document-literacy',
  difficulty: 'advanced',
  roles: ['mortgageUw', 'acquisitions'],
  documentExcerpt: {
    docType: 'loan',
    label: 'Section 9 — Recourse Carve-Outs',
    text: `Notwithstanding anything to the contrary in this Agreement, the
Loan shall be fully recourse to Guarantor (the "Springing Recourse
Events") upon the occurrence of any of the following:

(a) any voluntary filing of bankruptcy by Borrower;

(b) any transfer of the Property or controlling interests in
    Borrower without Lender's prior written consent;

(c) the commission of waste, fraud, or any willful misappropriation
    of Operating Revenues, Insurance Proceeds, or Condemnation
    Awards;

(d) the failure of Borrower to deposit Operating Revenues into the
    Lockbox Account following any Trigger Event under Section 4.03;

(e) the failure to maintain the Property in compliance with all
    Environmental Laws, except to the extent such non-compliance
    arises after Lender takes possession.

Recourse under this Section 9 is in addition to, and not in lieu
of, Lender's other remedies under this Agreement.`,
  },
  scenario:
    'You\'re advising a sponsor whose Class B office asset has been hit hard by a tenant departure. NOI dropped 18% YoY, putting the deal in cash trap (DSCR < 1.10×). The sponsor is exploring "what if" scenarios: filing for bankruptcy to push the lender to the table, transferring 49% of Borrower interests to a third-party investor for fresh capital, or just stopping payment on a non-essential vendor while operating cash is short.',
  question:
    'Which of the sponsor\'s contemplated actions actually trips the springing-recourse clause?',
  options: [
    {
      label:
        'Voluntary bankruptcy filing trips full recourse immediately under (a). Transferring controlling interests likely trips (b) — even 49% may count if it constitutes a "controlling interest" via voting or board control. Stopping payment on a vendor doesn\'t trip recourse but compounds the financial problem. The cash-trap activation alone (NOI drop) does not trip recourse.',
      isBest: true,
      explanation:
        'Recourse-trigger analysis: (a) voluntary BK is a hard trigger — sponsor often *thinks* this gives them leverage but it converts a non-recourse loan into a personal liability. Lenders draft this carve-out specifically to deter strategic BK. (b) "Controlling interests" is a defined term, not a flat 50% threshold — voting control, board appointment rights, or operational control can all constitute "control" even at <50%. So a 49% transfer with retained voting control might not trip; a 49% transfer with board reshuffling could. Read the definition carefully. (c)(d)(e) require active misbehavior. Stopping vendor payments isn\'t in the list (it might trigger an Operating Default but not personal recourse). The cash-trap mechanic itself is not on the list — recourse-trigger requires sponsor *misbehavior*, not just bad performance.',
    },
    {
      label:
        'All three actions trip springing recourse — the lender holds all the cards once cash trap activates.',
      isBest: false,
      explanation:
        'Overstates recourse exposure. Cash trap alone doesn\'t trip recourse. Stopping a vendor payment is an operating issue, not a recourse trigger. Only BK and unauthorized transfer hit the list cleanly.',
    },
    {
      label:
        'Voluntary BK doesn\'t trip recourse — that\'s a "bad-boy carve-out" that\'s been struck down by courts as unenforceable.',
      isBest: false,
      explanation:
        'Voluntary BK as a recourse trigger has been litigated extensively but generally upheld. Sponsors *cannot* assume BK is a free option — it\'s the one carve-out lenders most reliably enforce.',
    },
    {
      label:
        'Transferring 49% can\'t trigger (b) because it\'s less than 50% — controlling interest = majority by definition.',
      isBest: false,
      explanation:
        '"Controlling interest" is defined in the loan documents and almost never equals "50%+" mechanically. Voting agreements, side letters, and board-control provisions all factor in. A 49% transfer with management control can absolutely qualify.',
    },
  ],
  takeaway:
    'Springing recourse is the lender\'s big stick on a non-recourse loan. The carve-outs are typically: (1) voluntary BK; (2) unauthorized transfer of "controlling interests" (defined broadly); (3) waste / fraud / cash misappropriation; (4) lockbox circumvention; (5) environmental non-compliance. Cash trap and DSCR misses by themselves don\'t trip recourse. Sponsors who think strategically about BK are usually one read of Section 9 away from realizing why "non-recourse" loans aren\'t actually free options.',
  tips: [
    '"Controlling interest" ≠ "majority interest." Read the defined term carefully — 25-49% can qualify with voting control.',
    'Voluntary BK is the most-enforced carve-out. Lenders draft these deliberately broad and courts uphold them.',
    'Misappropriation of *insurance proceeds* and condemnation awards are the dirty trick — sponsors sometimes try to grab these and find personal liability waiting.',
    'Springing recourse is *separate* from Lender\'s other remedies. Triggering recourse doesn\'t wipe foreclosure; it adds personal liability on top.',
  ],
};
