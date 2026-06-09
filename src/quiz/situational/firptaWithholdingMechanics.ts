import type { SituationalCase } from '../../types/situational';

export const firptaWithholdingMechanics: SituationalCase = {
  id: 'firpta-withholding-mechanics',
  title: 'Closing day: seller is a foreign national — who withholds the 15%?',
  category: 'deal-process',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  scenario:
    'You are the acquiring entity closing on a $20M industrial asset. Three days before close, your title company flags that the seller is a Canadian citizen holding the property through a Delaware LLC. Your transaction attorney confirms FIRPTA applies. Closing is Thursday.',
  data: [
    { label: 'Purchase price', value: '$20M' },
    { label: 'Seller entity', value: 'Delaware LLC owned by Canadian national' },
    { label: 'Standard withholding rate', value: '15% of gross purchase price' },
    { label: 'Withholding amount', value: '$3M' },
    { label: 'Closing date', value: 'Thursday (3 days away)' },
  ],
  question: 'What does FIRPTA require of the buyer, and what is the consequence of ignoring it?',
  options: [
    {
      label:
        'The buyer must withhold 15% of the gross sale price ($3M) at closing and remit it to the IRS via Form 8288 within 20 days. The buyer is the withholding agent — personally liable if the obligation is missed, regardless of whether the seller pays their own taxes.',
      isBest: true,
      explanation:
        'FIRPTA (Foreign Investment in Real Property Tax Act) designates the buyer as the withholding agent whenever the seller is a foreign person. Withholding is 15% of gross purchase price — not gain, gross price. The buyer remits via Form 8288 within 20 days of closing. If the buyer fails to withhold and the seller leaves the country without paying U.S. taxes, the IRS can assess the full liability against the buyer. This has happened — buyers have been assessed FIRPTA liability years after closing with no recourse to the departed seller. The seller can apply for a withholding certificate (Form 8288-B) to reduce withholding if actual tax is less than 15%, but processing typically takes 90+ days; with a Thursday close, that window has almost certainly passed.',
    },
    {
      label:
        'This is the seller\'s tax problem — close the deal and let the seller handle their own U.S. tax obligations.',
      isBest: false,
      explanation:
        'The most expensive mistake a buyer can make on a foreign-seller transaction. FIRPTA explicitly and unambiguously transfers the withholding obligation to the buyer. If you close without withholding and the seller leaves without remitting taxes, the IRS comes after you — not the seller. Buyer liability is not contingent on the seller\'s behavior.',
    },
    {
      label:
        'FIRPTA does not apply to a Delaware LLC — FIRPTA only reaches foreign persons holding U.S. real estate in their own name.',
      isBest: false,
      explanation:
        'Incorrect. FIRPTA applies to "U.S. real property interests" held by "foreign persons," and a Delaware LLC whose ultimate beneficial owner is a foreign national qualifies as a foreign person for FIRPTA purposes. The state of formation of the LLC is irrelevant to FIRPTA classification; the nationality of the controlling beneficial owner is what matters.',
    },
    {
      label:
        'The withholding rate is 10%, not 15% — 15% only applies to residential transactions above certain thresholds.',
      isBest: false,
      explanation:
        'The rates work in the opposite direction: 15% is the standard rate for commercial transactions and residential transactions over $1M. The lower 10% rate applies to residential properties sold between $300k and $1M where the buyer intends to occupy. At $20M commercial, the full 15% applies.',
    },
  ],
  takeaway:
    'FIRPTA makes the buyer the withholding agent on sales by foreign persons — 15% of gross purchase price, remitted to IRS within 20 days via Form 8288. Buyer liability is not contingent on seller behavior; if the seller disappears, you still owe the IRS. Every acquisition closing checklist should include a seller-nationality verification step before T-30 days, not T-3 days — withholding certificates take 90+ days and a last-minute flag creates real closing risk.',
  tips: [
    'FIRPTA withholding = 15% of gross price (not gain). On a $20M deal, that\'s $3M withheld from seller proceeds at close.',
    'Flag foreign sellers early — Form 8288-B withholding certificate processing takes 90+ days. A T-3 day discovery means no certificate.',
    'The title company handles mechanics, but the legal obligation is the buyer\'s. Know who files Form 8288 — it is you, not the escrow agent.',
  ],
};
