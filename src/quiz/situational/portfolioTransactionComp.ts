import type { SituationalCase } from '../../types/situational';

export const portfolioTransactionComp: SituationalCase = {
  id: 'portfolio-transaction-comp',
  title: 'Portfolio sale in the comp set: how do you adjust for the bulk-bid premium?',
  category: 'comp-selection',
  difficulty: 'advanced',
  roles: ['acquisitions', 'portfolioMgmt'],
  assetClass: 'multifamily',
  scenario:
    "You are pricing a 200-unit Class-B multifamily acquisition in a primary market. The broker's comp set includes one 7-property, 1,400-unit portfolio trade at a 4.85% blended cap rate. The other two comps are single-asset trades in the same submarket at 5.25% and 5.50% cap rates. The broker is anchoring to the portfolio trade as the tight comp to justify a 5.0% going-in cap on your 200-unit subject.",
  data: [
    { label: 'Subject', value: '200 units, Class B, single asset' },
    { label: 'Comp A', value: '7-property portfolio, 1,400 units — 4.85% cap' },
    { label: 'Comp B', value: '180-unit single asset — 5.25% cap' },
    { label: 'Comp C', value: '220-unit single asset — 5.50% cap' },
    { label: 'Broker ask', value: '5.0% cap on subject' },
  ],
  question: 'How should you treat the portfolio trade comp when pricing the single-asset subject?',
  options: [
    {
      label:
        'Adjust (do not discard) the portfolio comp: institutional portfolio trades typically reflect a 25–50 bps pricing premium over equivalent single-asset transactions, because the buyer acquires scale, deployment efficiency, and operational concentration in a single close. Strip the portfolio premium by adding 25–40 bps to the 4.85% cap to estimate the single-asset equivalent — roughly 5.10–5.25%. This keeps a three-comp bracket of 5.10–5.50%. The broker\'s 5.0% ask is 10–15 bps through the adjusted range; defensible pricing is 5.20–5.40%.',
      isBest: true,
      explanation:
        'Portfolio premiums are real, well-documented, and consistently observed in the data: institutional buyers pay up for scale because acquiring 1,400 units in one transaction saves transaction costs, management overhead, and due diligence redundancy compared to assembling 7 individual buys. The premium typically ranges 25–50 bps depending on portfolio size and buyer type. The correct analytical move is to adjust the portfolio cap to a single-asset equivalent, not to silently average the contaminated comp with the single-asset trades. A transparent adjustment with a documented rationale is defensible to IC; unexplained averaging is not.',
    },
    {
      label:
        'Include the portfolio comp as-is — all traded caps reflect market clearing for capital deployed in the submarket.',
      isBest: false,
      explanation:
        'Portfolio and single-asset trades do not clear at the same cap rate for the same product. The portfolio premium is real: including a 4.85% portfolio cap in a single-asset comp set artificially tightens the bracket by ~40–50 bps and would produce pricing that overpays by millions on a $50M+ single asset. The broker benefits from this framing; the buyer does not.',
    },
    {
      label:
        'Discard the portfolio comp entirely — only single-asset trades are relevant for single-asset pricing.',
      isBest: false,
      explanation:
        'Discarding useful data is overcorrection. Portfolio trades contain real submarket pricing signal; the portfolio participants are the same buyers you would compete with on a single asset. The right treatment is to adjust for the premium, not to eliminate the data point. Three comps is better than two; a documented adjustment keeps the portfolio comp in play.',
    },
    {
      label:
        'Average all three caps (4.85%, 5.25%, 5.50%) and use the result as your pricing anchor.',
      isBest: false,
      explanation:
        'Unweighted averaging with an unadjusted portfolio comp gives ~5.20%, which is 15–20 bps tighter than the defensible single-asset range. The issue is not the arithmetic — it\'s that the portfolio comp is a structurally different transaction type mixed with single-asset comps. The same money weighted average will mislead IC if the portfolio premium is not disclosed and adjusted.',
    },
  ],
  takeaway:
    'Portfolio trades command 25–50 bps of pricing premium versus single-asset equivalents because institutional buyers pay for scale, deployment efficiency, and reduced transaction costs per unit. When a portfolio trade appears in your single-asset comp set, the right response is to document and apply the premium adjustment, not to average it in or discard it. A transparent comp set adjustment is more defensible — and more honest — than silent averaging.',
  tips: [
    'Portfolio premium range: 25–50 bps tighter cap vs. single-asset equivalent (larger portfolios → larger premium).',
    'Always clarify with the broker: was the comp a single-asset trade or part of a portfolio? This is not always disclosed upfront.',
    'Adjusted portfolio cap (single-asset equivalent) = portfolio cap + estimated premium (25–50 bps).',
    'The premium may be smaller in thin markets where portfolio buyers are the only liquid buyers.',
  ],
};
