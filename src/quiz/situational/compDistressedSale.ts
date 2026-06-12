import type { SituationalCase } from '../../types/situational';

export const compDistressedSale: SituationalCase = {
  id: 'comp-distressed-sale',
  title: 'Should you use the foreclosure comp?',
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'multifamily',
  scenario:
    'You are pricing a stabilized 150-unit multifamily asset in a suburban submarket. The broker provides 4 comps. Three are arm\'s-length trades of stabilized assets in the same submarket over the past 10 months, averaging a 5.60% cap rate. The fourth is a 90-unit property that sold 6 months ago in a foreclosure — the previous owner had a matured loan, occupancy was at 72%, and the lender sold the asset at roughly a 50% discount to its last appraised value, implying a 7.50% cap.',
  data: [
    { label: 'Comps 1–3 (stabilized)', value: 'Same submarket · 5.40–5.75% cap · avg 5.60%' },
    { label: 'Comp 4 (distressed)', value: 'Foreclosure, 72% occupied, 7.50% cap' },
    { label: 'Comp 4 discount vs appraisal', value: '~50%' },
    { label: 'Comp 4 trade date', value: '6 months ago' },
    { label: 'Subject property', value: '150 units, stabilized, 94% occupied' },
  ],
  question: 'How do you handle the distressed comp in your analysis?',
  options: [
    {
      label:
        'Exclude or heavily footnote the distressed comp — it reflects motivated-seller pricing under duress, not the stabilized market. Use the 5.60% average from the three clean comps as the anchor.',
      isBest: true,
      explanation:
        'A valid comp requires a willing buyer and a willing seller, both acting without compulsion. A foreclosure sale at 72% occupancy fails on both counts: the seller (lender) is motivated to dispose of a nonperforming asset, and the buyer is pricing re-leasing risk and uncertainty into the cap. The 7.50% cap embeds the lender\'s urgency, a 22-ppt vacancy discount, and buyer risk premium. None of those conditions apply to a stabilized 94%-occupied subject. Including the distressed comp as-is drags the cap anchor ~190 bps wider than the market evidence supports. If referenced at all, note explicitly why it\'s excluded.',
    },
    {
      label:
        'Weight the distressed comp at 25% and the other three at 75% — you have 4 comps, so use all of them but weight for quality.',
      isBest: false,
      explanation:
        'Weighting a distressed comp is mechanically cleaner than a straight average but still introduces an ~47 bps drag that can\'t be defended. The right action is exclusion with written rationale. Any reviewer will ask why a foreclosure appears in a stabilized comp table regardless of the weight assigned.',
    },
    {
      label:
        'Use the distressed comp as a downside data point — it shows the worst-case clearing price if the deal ever needs to be liquidated under stress.',
      isBest: false,
      explanation:
        'Sensible as a standalone sensitivity, but not as a comp in the primary pricing table. Mixing "distressed liquidation price" with "stabilized market value" conflates two different analyses. If you want to stress-test the exit, model a distressed scenario explicitly with its own cap, timeline, and hold cost — don\'t embed it in the valuation anchor.',
    },
    {
      label:
        'Stabilize the distressed comp by adjusting occupancy to market, then include it — normalization makes it comparable.',
      isBest: false,
      explanation:
        'You can theoretically reconstruct a distressed comp to an implied stabilized value, but the result is a hypothetical estimate, not an observed transaction. Including a reconstructed proxy alongside three actual arm\'s-length trades muddies the evidentiary quality of the comp set. Use the stabilized estimate as context only, never as a primary anchor.',
    },
  ],
  takeaway:
    'Comps must be arm\'s-length transactions between willing, uncompelled parties. Distressed sales, foreclosures, related-party trades, and portfolio bulk allocations fail this test. They can be referenced as stress-scenario context but should never anchor your primary cap rate analysis. When you exclude a comp, document the reason — it protects your underwriting under lender and IC review.',
  tips: [
    'Distressed comp exclusion flags: motivated seller, sub-market occupancy, lender disposition, bulk sale.',
    'If you have fewer than 3 clean comps, widen the range and document the data gap explicitly.',
    'Reconstructing a distressed comp to stabilized value is useful for context — never for the primary anchor.',
  ],
};
