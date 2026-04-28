import type { SituationalCase } from '../../types/situational';

export const taxReassessmentSurprise: SituationalCase = {
  id: 'tax-reassessment-surprise',
  title: 'What does the reassessment do to your bid?',
  category: 'risk',
  difficulty: 'advanced',
  assetClass: 'multifamily',
  scenario:
    'You\'re bidding $50M for a stabilized multifamily asset in a jurisdiction that reassesses property tax on sale. The seller has owned for 12 years; current annual property tax is $200,000 (effectively ~0.4% of your bid price). The jurisdiction\'s post-sale assessment rate is 1.25% of sale price.',
  data: [
    { label: 'Bid price', value: '$50M' },
    { label: 'Current tax bill', value: '$200,000' },
    { label: 'Reassessment rate', value: '1.25% of sale price' },
    { label: 'Going-in cap (pre-reassessment)', value: '5.0%' },
  ],
  question: 'How should you handle the reassessment?',
  options: [
    {
      label: 'Reduce NOI by ~$425k and price the deal off the post-reassessment NOI — at a 5% cap, that\'s ~$8.5M of value, so either bid $41–42M or accept a wider going-in cap on the same NOI.',
      isBest: true,
      explanation:
        'Post-sale tax: $50M × 1.25% = $625k. NOI hit: $625k − $200k = $425k. Value impact at 5% cap: $425k / 0.05 = $8.5M. The seller\'s in-place NOI uses the legacy tax bill; your stabilized NOI must reflect the new bill. Either lower the bid to compensate or push the going-in cap from 5.0% to ~5.85% on the as-marketed NOI to back into the same value.',
    },
    {
      label: 'Use the seller\'s tax bill in your underwriting — that\'s what shows up in the financials.',
      isBest: false,
      explanation:
        'Will systematically overpay by ~$8.5M. The legacy tax bill applies to the seller; the moment the deed transfers, the assessor re-prices and your tax bill jumps. Underwriting at the legacy figure is one of the most common mistakes in jurisdictions with sale-triggered reassessment.',
    },
    {
      label: 'Phase in the reassessment over 3 years to smooth the impact.',
      isBest: false,
      explanation:
        'Most jurisdictions don\'t phase in reassessment — the new bill hits in the next tax year (sometimes the same year). Even where phasing exists, your IRR underwriting must include the full burden by the time you exit. Smoothing the input understates the cost.',
    },
    {
      label: 'Reassessment is a wash because the cap rate already reflects the tax environment.',
      isBest: false,
      explanation:
        'The cap rate reflects the tax environment of *comparable trades*, not your specific reassessment trigger. Comp caps are inputs to pricing; the post-sale tax is a separate, additive cost you bear regardless of where the comp set traded. They don\'t cancel.',
    },
  ],
  takeaway:
    'In jurisdictions with sale-triggered reassessment, the post-sale tax bill is part of the bid price. Always compute (bid × reassessment rate) − (current tax) and run the value impact at your cap rate. Bidding off the seller\'s NOI is the single most expensive avoidable mistake in these markets.',
  tips: [
    'Common reassessment-on-sale jurisdictions: California (Prop 13), Florida, Texas (varies).',
    'Value impact ≈ (post-sale tax − current tax) / cap rate.',
    'If the reassessment is uncertain, get a tax-consultant quote *before* bidding.',
  ],
};
