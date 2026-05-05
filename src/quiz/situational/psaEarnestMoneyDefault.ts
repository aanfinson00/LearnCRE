import type { SituationalCase } from '../../types/situational';

export const psaEarnestMoneyDefault: SituationalCase = {
  id: 'psa-earnest-money-default',
  title: 'PSA earnest money — who keeps the deposit when the deal blows up?',
  category: 'document-literacy',
  difficulty: 'advanced',
  roles: ['acquisitions'],
  documentExcerpt: {
    docType: 'psa',
    label: 'Article 11 — Default and Remedies',
    text: `11.1 Buyer\'s Default. If Buyer fails to consummate the purchase
    of the Property in accordance with this Agreement for any reason
    other than Seller\'s default or the failure of any condition to
    Buyer\'s obligation to close that has not been waived, Seller\'s
    sole and exclusive remedy shall be to terminate this Agreement
    and retain the Earnest Money as liquidated damages, the parties
    acknowledging that Seller\'s actual damages would be difficult to
    determine.

11.2 Seller\'s Default. If Seller fails to consummate the sale of
    the Property in accordance with this Agreement for any reason
    other than Buyer\'s default or the failure of any condition to
    Seller\'s obligation to close, Buyer may, as Buyer\'s sole and
    exclusive remedies, either: (i) terminate this Agreement and
    receive a refund of the Earnest Money plus reimbursement of
    Buyer\'s third-party diligence costs incurred up to a cap of
    $250,000; or (ii) seek specific performance of this Agreement.

11.3 Earnest Money Schedule. The Earnest Money shall consist of:
    (a) the Initial Deposit of $1,000,000, payable by Buyer within
    two (2) Business Days of mutual execution and held by Escrow
    Agent; and (b) the Additional Deposit of $1,500,000, payable by
    Buyer within one (1) Business Day after expiration of the Due
    Diligence Period. The Earnest Money shall become non-refundable
    (except in the event of Seller default) upon the expiration of
    the Due Diligence Period.

11.4 Due Diligence Period. The Due Diligence Period shall expire at
    11:59 p.m. Pacific Time on the date that is forty-five (45) days
    after the Effective Date.`,
  },
  scenario:
    'You\'re Buyer on a $40M industrial acquisition. The DD period was 45 days; it ended yesterday at midnight. Initial Deposit ($1M) was funded at signing; Additional Deposit ($1.5M) is due tomorrow. Today: your debt source pulled out citing "credit market conditions" — your loan commitment was conditional. You can find replacement debt in 30 days but the PSA closing is in 14 days. Seller refuses to extend.',
  question:
    'What\'s your exposure if you can\'t close on the contracted date?',
  options: [
    {
      label:
        'You\'re exposed for the full $2.5M Earnest Money. The Initial Deposit ($1M) is already with Escrow Agent. The Additional Deposit ($1.5M) is contractually due tomorrow — if you don\'t fund, you\'re in default on funding obligation. The DD Period expired yesterday, so 11.3 says the EM is non-refundable except for Seller default. Your "debt fell through" is *not* a Seller default and is *not* a contractual condition (your loan commitment was conditional, but commitments aren\'t typically PSA closing conditions unless explicitly listed). Specific performance is the Seller\'s remedy here only by analogy — under 11.1, Seller\'s sole remedy is to keep the EM. So you lose $2.5M to walk away cleanly.',
      isBest: true,
      explanation:
        'PSA default analysis: (1) **DD Period expired** = EM hardens (11.3). (2) **Buyer\'s loan failure isn\'t typically a closing condition** unless explicitly listed in the PSA — most institutional deals make loans the *Buyer\'s problem*; financing contingencies are typically out by DD end. (3) **Seller\'s remedy** is liquidated damages = the full EM (11.1). $2.5M is a real, hard-dollar loss. (4) **Specific performance** under 11.2 is *Buyer\'s* remedy against *Seller* — flipped here. (5) **Practical play**: try to negotiate a 30-day extension with Seller for a fee (e.g. $250k of EM goes to Seller as extension consideration); refusing to fund the Additional Deposit and then walking is also an option but Escrow Agent\'s release of the Initial Deposit ($1M already on hand) is automatic on Seller\'s claim. The lesson: financing contingencies should run *through closing*, or DD should be long enough to lock the loan commitment unconditionally.',
    },
    {
      label:
        'Your debt source pulling out is a force-majeure-equivalent event; the EM is refundable.',
      isBest: false,
      explanation:
        'Loan-source failure isn\'t force majeure under standard PSA language. PSAs typically don\'t even *include* force majeure for delay; closing date is "of the essence" and the only refundable triggers are Seller default + listed conditions failure.',
    },
    {
      label:
        'Specific performance is your remedy — you can compel Seller to wait the 30 days.',
      isBest: false,
      explanation:
        'Inverts the parties. Specific performance under 11.2 is *Buyer\'s* remedy against *Seller* (forcing Seller to sell). Buyer doesn\'t have the right to compel Seller to wait while Buyer fixes their own financing problem.',
    },
    {
      label:
        'You only owe the $1M Initial Deposit; the Additional Deposit isn\'t due until you fund it, so you can refuse and walk with that money saved.',
      isBest: false,
      explanation:
        'The Additional Deposit is contractually owed (11.3(b)) — refusing to fund it is itself a default under the PSA and gives Seller additional grounds for damages. Plus, if Seller pursues damages beyond the $1M, the "sole remedy" language in 11.1 may not save Buyer if Seller can show Buyer never funded the contracted EM in the first place. Don\'t assume "I never paid it" gets you out of paying.',
    },
  ],
  takeaway:
    'PSA default mechanics on the buy side: (1) **EM hardens at DD expiration** — past that point, Buyer\'s only refund triggers are listed contingencies + Seller default. (2) **Buyer default = Seller keeps EM** as liquidated damages; that\'s typically Seller\'s sole remedy, but the EM amount is real ($2-5M is common on $30-50M deals). (3) **Seller default = Buyer\'s choice of refund + diligence reimbursement OR specific performance**. (4) **Loan-source failure is NOT a contingency** unless explicitly listed — most institutional deals push this risk onto Buyer. The defense: structure the financing contingency to run through closing if you can negotiate it; lock unconditional commitments inside DD if you can\'t.',
  tips: [
    'EM amounts: 5-10% of purchase price is standard. Under 5% is buyer-friendly; over 10% is a hard-money signal.',
    '"Sole and exclusive remedy" cuts both ways. Seller can\'t pursue actual damages beyond EM; Buyer can\'t pursue specific perf beyond what 11.2 grants.',
    'Financing contingencies are mostly extinct on institutional deals. If you need one, push hard at LOI stage; getting it added to the PSA after LOI is very hard.',
    'Always sequence DD end before financing close. If you have 45 days of DD but need 60 days for unconditional debt, your DD period is meaningfully shorter.',
    'Diligence reimbursement caps ($250k here) cover legal + 3rd-party reports but rarely the full DD spend. Track actual costs.',
  ],
};
