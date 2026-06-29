import type { SituationalCase } from '../../types/situational';

export const valueAddVsStabilizedComps: SituationalCase = {
  id: 'value-add-vs-stabilized-comps',
  title: 'Should you comp a value-add deal off stabilized trades?',
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'multifamily',
  scenario:
    'You\'re pricing a 250-unit, 1990-vintage multifamily asset that is 72% leased at below-market rents with deferred maintenance. A $15K/unit renovation program will bring rents to market levels. Two comp sets are available: (A) stabilized Class-B trades: 95%+ occupied, going-in caps of 5.25–5.50%; (B) comparable value-add transactions: 65–75% occupied at purchase, going-in caps of 6.50–7.00% on in-place NOI.',
  data: [
    { label: 'Subject occupancy', value: '72% (below-market rents)' },
    { label: 'Renovation budget', value: '$15K/unit' },
    { label: 'Stabilized comp going-in caps', value: '5.25–5.50%' },
    { label: 'Value-add comp going-in caps', value: '6.50–7.00% on in-place NOI' },
    { label: 'Investment strategy', value: 'Renovate and lease up to market' },
  ],
  question: 'Which comp set anchors the right going-in cap for your bid?',
  options: [
    {
      label: 'Value-add comps (6.50–7.00%) are the right anchor — they reflect what buyers actually paid for similar risk profiles: occupancy risk, renovation execution risk, and lease-up risk. Stabilized comps at 5.25–5.50% are priced for a different risk set.',
      isBest: true,
      explanation:
        'Cap rate = NOI ÷ price. When NOI is suppressed by vacancy and below-market rents, a "5.50% cap on in-place NOI" implies the buyer paid for future stabilized NOI — which means the value-add premium is already priced into the bid. Value-add transactions where buyers paid 6.50–7.00% on in-place NOI reflect the correct risk pricing: the buyer is compensated for renovation and lease-up uncertainty. Stabilized comps reflect investors who bought certainty; value-add buyers demand a wider spread. Bidding at 5.50% on in-place NOI for a 72% occupied, deferred-maintenance asset dramatically overpays.',
    },
    {
      label: 'Stabilized comps are the right anchor — they show where the asset will trade when renovated and stabilized, which is what you\'re really buying.',
      isBest: false,
      explanation:
        'This conflates going-in underwriting with residual value. Stabilized comps are the correct exit comp — they show where you\'ll sell the asset after renovation and stabilization. The going-in acquisition price must reflect current risk (occupancy, renovation, lease-up), not the post-execution value. Paying a going-in cap based on the exit comp means you\'ve underwritten zero spread for the value-add work.',
    },
    {
      label: 'Average both comp sets — the subject is partly stabilized (72% leased) and partly value-add.',
      isBest: false,
      explanation:
        'Arbitrary blending produces a meaningless number. At 72% occupied with deferred maintenance and $15K/unit of planned capex, the subject is squarely a value-add deal, not a hybrid. The right reference is the value-add comp set with adjustments for specific occupancy level; blending in stabilized comps at equal weight misprices the risk.',
    },
    {
      label: 'Ignore both comp sets — reverse-engineer the going-in cap from the stabilized exit value minus renovation cost.',
      isBest: false,
      explanation:
        'Reverse-engineering the going-in cap from the exit value sets the maximum bid — it\'s a useful ceiling check but not a substitute for market comps. The comp sets are the market check on your internal underwriting. Ignoring them means you can\'t tell whether your derived cap is in line with what other buyers are paying for similar risk.',
    },
  ],
  takeaway:
    'Always match the comp set to the investment\'s risk profile. Going-in comps should reflect similar risk (occupancy, renovation, lease-up); exit comps should reflect the projected stabilized profile. Conflating the two is the most common pricing mistake in value-add acquisitions — it causes buyers to overpay by applying stabilized going-in caps to un-stabilized NOI.',
  tips: [
    'Going-in comp = same risk tier (value-add, core-plus, core); exit comp = post-renovation stabilized profile.',
    'Value-add spread over stabilized: typically 100–200 bps wider going-in cap to price execution risk.',
    'Sanity check: purchase price + renovation cost ÷ unit count — is that within range of replacement cost?',
  ],
};
