import type { SituationalCase } from '../../types/situational';

export const hotelPipEconomics: SituationalCase = {
  id: 'hotel-pip-economics',
  title: 'Does the PIP pay for itself?',
  category: 'investment-thesis',
  difficulty: 'advanced',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'hotel',
  scenario:
    'A 150-key full-service hotel is offered at $22M. The franchisor will require a $12M property improvement plan within 18 months of closing. The seller says the renovation will lift ADR by $14 at today\'s 70% occupancy. Incremental revenue converts to NOI at about 60%, and the hotel would trade at an 8.5% cap rate after renovation.',
  data: [
    { label: 'Purchase price', value: '$22M ($147K/key)' },
    { label: 'Required PIP', value: '$12M ($80K/key)' },
    { label: 'Expected ADR lift', value: '+$14' },
    { label: 'Occupancy', value: '70%' },
    { label: 'Flow-through', value: '60%' },
    { label: 'Exit cap rate', value: '8.5%' },
  ],
  question: 'How should you treat the PIP in your pricing?',
  options: [
    {
      label: 'As part of your basis: all-in cost is about $34M, and the ADR lift supports only about $3.8M of value, so you need a price reduction.',
      isBest: true,
      explanation:
        'Occupied rooms = 150 × 365 × 70% ≈ 38,325. × $14 ≈ $537K revenue × 60% ≈ $322K NOI ÷ 8.5% ≈ $3.8M of created value against $12M spent. The PIP is largely a cost of keeping the flag, not a value-creation play, so the seller should bear most of it in price.',
    },
    {
      label: 'As a normal capex line — the ADR lift justifies the spend.',
      isBest: false,
      explanation:
        'The lift supports only about a third of the spend. Treating it as ROI-positive capex ignores that most of the $12M is brand-mandated.',
    },
    {
      label: 'As the seller\'s problem — close on the quoted price and negotiate with the franchisor for a longer PIP timeline.',
      isBest: false,
      explanation:
        'A longer timeline defers the spend but does not remove it. The obligation transfers to you at closing, so price must reflect it.',
    },
    {
      label: 'As irrelevant to price, because the PIP is funded from the FF&E reserve.',
      isBest: false,
      explanation:
        'A reserve of 4% of revenue funds ordinary replacements. A $12M renovation would take many years of reserve and cannot be funded from it.',
    },
  ],
  takeaway:
    'A PIP is a debt-like obligation you inherit at closing. Test whether the NOI lift pays back the spend; whatever it does not pay back is a price adjustment.',
  tips: [
    'Compare the PIP per key to the value created per key.',
    'Ask for the PIP scope early; brands often have discretion over it.',
    'Negotiate a price credit or seller-funded portion at contract, not after diligence.',
  ],
};
