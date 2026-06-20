import type { SituationalCase } from '../../types/situational';

export const distressedCompAdjustment: SituationalCase = {
  id: 'distressed-comp-adjustment',
  title: 'There\'s a foreclosure sale in the comp set — do you include it?',
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'office',
  scenario:
    'You are pricing a 100,000 SF suburban office asset. Your broker provides five sale comps. Four are arm\'s length transactions in the 6.00–6.50% cap range. The fifth is an REO (real-estate-owned / post-foreclosure) sale from 9 months ago at an 8.25% cap — the lender sold it "as-is" with vacant floors, no representation, and a compressed due diligence timeline. The broker is averaging all five comps to support a 6.75% cap recommendation.',
  data: [
    { label: 'Comp 1', value: 'Arm\'s length, 8 mos ago, 6.00% cap' },
    { label: 'Comp 2', value: 'Arm\'s length, 4 mos ago, 6.25% cap' },
    { label: 'Comp 3', value: 'Arm\'s length, 12 mos ago, 6.50% cap' },
    { label: 'Comp 4', value: 'Arm\'s length, 6 mos ago, 6.10% cap' },
    { label: 'Comp 5 (REO)', value: '9 mos ago, 8.25% cap, vacant floors, compressed DD' },
    { label: 'Broker recommendation', value: '6.75% (all-5 average)' },
  ],
  question: 'How should you treat the REO comp in your analysis?',
  options: [
    {
      label:
        'Exclude the REO comp or document a significant downward adjustment. REO/foreclosure sales reflect seller distress, constrained due diligence, and "as-is" conditions — not arm\'s length market value. The four arm\'s-length comps support a 6.00–6.50% range; the broker\'s 6.75% average is distorted by including an outlier that reflects distress pricing, not market pricing.',
      isBest: true,
      explanation:
        'REO sales are not arms-length transactions: the seller (typically a bank) is motivated to liquidate quickly, often sells "as-is" with limited reps and warranties, and may have compressed diligence periods that limit the buyer pool. The resulting cap rate reflects distress, not sustainable market pricing. Including it unweighted in a comp average pulls the indicated cap rate 50–75 bps wider than the true market signal. Standard appraisal practice (USPAP) excludes or adjusts distressed sales from the comp set unless the subject is also a distressed sale. Here, if you\'re buying the subject as a normal arm\'s-length deal, the REO comp overstates what the market would pay.',
    },
    {
      label: 'Include the REO comp but give it half the weight of arm\'s-length comps — it\'s still evidence of where a buyer transacted.',
      isBest: false,
      explanation: 'Half-weighting without a documented reason is arbitrary. The right question is whether the distress conditions (as-is, compressed DD, lender liquidation) apply to the subject. If not, any weight given to the REO comp needs a documented rationale. In practice, most buyers and appraisers exclude it rather than partial-weight it, because the comparability gap is structural, not just price-level.',
    },
    {
      label: 'Trust the broker\'s average — they are aware of all five sales and chose to include the REO.',
      isBest: false,
      explanation: 'The broker has an incentive to support the widest defensible cap rate (if they represent the seller, lower cap = higher price; if they represent the buyer, wider cap = lower price). Either way, you should vet comps independently. "They chose to include it" is not a defense if the REO is pulling the average in a direction you haven\'t independently validated.',
    },
    {
      label: 'The REO comp shows real demand at 8.25% — that\'s the right anchor for valuation since it was the most recent trade.',
      isBest: false,
      explanation: 'Recency is one filter, but it\'s not the only one. Arm\'s-length nature and comparability are equally important. A more recent distressed sale is less comparable than a slightly older arm\'s-length sale. The REO transaction reflected specific seller constraints that don\'t generalize to market pricing.',
    },
  ],
  takeaway:
    'Comp set integrity requires filtering for arm\'s-length transactions. REO, foreclosure, probate, and related-party sales reflect conditions that don\'t represent market pricing — including them unweighted distorts the cap rate anchor. Standard practice: exclude or document a specific adjustment. Always ask the broker whether any comp was a distressed or non-arm\'s-length sale before finalizing the set.',
  tips: [
    'First question for any comp: arm\'s-length or distressed? If distressed, ask what conditions applied (as-is, compressed DD, vacancy).',
    'REO comp inclusion rule: exclude unless (a) the subject is also distressed or (b) you can document a specific market-clearing adjustment.',
    'A broker average including distressed sales is a negotiating tactic, not an appraisal. Rebuild the comp set yourself.',
  ],
};
