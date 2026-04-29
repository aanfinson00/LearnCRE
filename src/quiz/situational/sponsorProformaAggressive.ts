import type { SituationalCase } from '../../types/situational';

export const sponsorProformaAggressive: SituationalCase = {
  id: 'sponsor-proforma-aggressive',
  title: 'Re-cut the sponsor\'s aggressive pro forma',
  category: 'diagnostic',
  difficulty: 'advanced',
  roles: ['mortgageUw'],
  assetClass: 'multifamily',
  scenario:
    'You\'re lending on a $50M acquisition. The sponsor\'s pro forma shows 8% NOI growth in years 1–5, no capex, occupancy ramping from 92% to 97% in Year 1, and a 5.5% exit cap (vs 5.25% going-in — only 25 bps of expansion). The submarket has averaged 3% rent growth and the asset is stabilized. You\'re writing your credit memo.',
  data: [
    { label: 'Going-in cap', value: '5.25%' },
    { label: 'Exit cap (sponsor)', value: '5.50% (+25 bps)' },
    { label: 'NOI growth (sponsor)', value: '8%/yr' },
    { label: 'Submarket avg rent growth', value: '3%' },
    { label: 'Occupancy (sponsor)', value: '92% → 97%' },
    { label: 'Capex reserve', value: '$0' },
  ],
  question: 'Where do you push back hardest as the lender?',
  options: [
    {
      label:
        'Re-cut the NOI growth to 3% (matching submarket rent growth less expense inflation), widen the exit cap to ≥75 bps, and require a meaningful capex reserve. The sponsor\'s deck triple-stacks aggressive assumptions; size the loan off your re-cut, not theirs.',
      isBest: true,
      explanation:
        'A lender\'s job is to underwrite to the worse-case-not-disaster. The sponsor\'s pro forma is "everything goes right" — submarket rent growth is 3% historical but they\'ve modeled 8%; capex is a real and recurring cost on stabilized assets but they\'ve modeled zero; cap rates almost always widen on exit but they\'ve modeled only 25 bps. Each item in isolation is debatable; together they compound to overstate value by 20%+. Re-cut every line to lender norms before sizing.',
    },
    {
      label: 'Push back on the exit cap only — that\'s the variable that most drives DSCR at refinance.',
      isBest: false,
      explanation:
        'Half-measure. Exit cap matters but it\'s a hold-period-end variable; a lender sized off Year-1 underwritten NOI also cares about the *path*. Letting through 8% NOI growth means the sponsor\'s mid-term DSCR shows healthy headroom that won\'t materialize. Push on growth, capex, AND exit cap.',
    },
    {
      label: 'Accept the pro forma; you\'re sized off Year-1 NOI anyway, and the rest is the sponsor\'s problem.',
      isBest: false,
      explanation:
        'Misses the point of credit underwriting. Year-1 NOI is the sizing input but the sponsor\'s ability to service debt year over year matters too. If the proforma fails by Year 3, the sponsor is hunting for capital to keep the loan current. Lenders re-cut every line for the same reason equity does — they need to believe the deal pencils on realistic assumptions.',
    },
    {
      label: 'Demand recourse to the sponsor in lieu of underwriting changes.',
      isBest: false,
      explanation:
        'Recourse is a fallback when underwriting is uncertain, not a substitute for it. A lender that takes recourse on bad underwriting still has a problem deal — the borrower\'s balance sheet has to be deep enough to cover the gap, and most CRE sponsors aren\'t. Re-cut first, then decide on recourse.',
    },
  ],
  takeaway:
    'Lenders re-cut the sponsor\'s pro forma to lender-defensible numbers — every line, every year. Common targets to challenge: NOI growth (vs submarket history), capex (zero is wrong), exit cap (≥75 bps for stabilized 5-yr holds), occupancy ramp (be skeptical of fast ramps without a clear catalyst). Stack-conservatism wins: each push is small but they compound.',
  tips: [
    'Lender-defensible NOI growth: submarket rent growth less 50–100 bps for OpEx inflation.',
    'Zero-capex pro formas are almost always wrong on stabilized assets — $250–500/unit/yr is typical multifamily.',
    'Exit cap ≥ going-in + 75 bps is a defensible floor for 5-yr lender underwriting.',
  ],
};
