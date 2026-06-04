import type { SituationalCase } from '../../types/situational';

export const distressedSaleCompExclusion: SituationalCase = {
  id: 'distressed-sale-comp-exclusion',
  title: 'Should a special servicer sale set the market cap rate?',
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'multifamily',
  scenario:
    'You\'re pricing a 96-unit stabilized Class-B multifamily in a suburban submarket. The only sale in the submarket over the past 9 months is a 112-unit property that traded at a 7.2% cap via special servicer after a maturity default. The seller accepted a 15% discount to a prior broker opinion of value under covenant pressure. Pre-distress market consensus from active brokers and appraisers: 6.0–6.5% caps for stabilized product in this submarket.',
  data: [
    { label: 'Distressed comp', value: '112 units — 7.2% cap, special servicer sale' },
    { label: 'Distress driver', value: 'Maturity default, covenant breach, forced sale' },
    { label: 'Discount to BOV', value: '~15%' },
    { label: 'Pre-distress market consensus', value: '6.0–6.5% caps' },
    { label: 'Months since trade', value: '6 months' },
    { label: 'Subject property', value: '96 units, stabilized, no financial distress' },
  ],
  question: 'How should you treat this comp in your cap rate pricing?',
  options: [
    {
      label: 'Exclude it from the primary comp set for your going-in cap; document the exclusion; use 6.0–6.5% based on broker consensus, with 7.2% as an explicit downside scenario.',
      isBest: true,
      explanation:
        'A special servicer sale with a documented 15% forced-seller discount is not an arm\'s-length market transaction. Including it would drag your cap 70–120 bps wider than market-clearing and undervalue the subject. The professional standard: exclude forced sales from the base comp set, document the reason, use active broker quotes and appraisal estimates as the primary anchor, and reference the distressed trade only as a downside scenario or market-dislocation floor.',
    },
    {
      label: 'Use it as the primary comp — it\'s the only recent transaction in the submarket.',
      isBest: false,
      explanation:
        'Recency doesn\'t override arm\'s-length status. A forced sale is a liquidity event for a distressed seller — it reflects the seller\'s covenant pressure, not the submarket\'s clearing price. Underwriting to the distressed comp prices a stabilized asset as if it were in the same distress, systematically overstating risk and undervaluing the deal. Sophisticated buyers who use market consensus will out-compete you at disciplined pricing.',
    },
    {
      label: 'Average the 7.2% distressed trade with the 6.25% consensus midpoint to get ~6.7%.',
      isBest: false,
      explanation:
        'Averaging a market price with a non-market price produces a number that\'s neither. The 7.2% trade has no informational value for arm\'s-length pricing because the seller discount is documented — it\'s not market evidence of where stabilized assets clear. Including it in an average produces a number that looks like a compromise but is actually just polluted.',
    },
    {
      label: 'Adjust the 7.2% upward by 15% to reverse the forced-sale discount — use 6.12% as an adjusted comp.',
      isBest: false,
      explanation:
        'Adjusting back is methodologically defensible (appraisers do this in thin markets), but it relies on the accuracy of the 15% discount estimate — itself derived from a broker opinion. An adjusted comp is weaker than an arm\'s-length trade. If broker consensus gives you 6.0–6.5% from active market participants, prefer that over a single reverse-adjusted forced-sale comp.',
    },
  ],
  takeaway:
    'Not all transactions are market comps. Special servicer sales, deed-in-lieu trades, and estate sales are priced by seller constraints, not market demand. The standard: exclude forced sales from the primary comp set with documentation, anchor pricing on arm\'s-length broker consensus or appraisal estimates, and use distressed trades only as stress scenarios.',
  tips: [
    'Forced sale indicators: special servicer, deed-in-lieu, auction, receivership, estate sale, maturity default.',
    'Document exclusions with reasons — IC committees expect to see what was left out and why.',
    'Thin comp markets (<2 trades/year): use broker consensus and appraiser estimates to triangulate; a single excluded trade doesn\'t mean no pricing anchor exists.',
  ],
};
