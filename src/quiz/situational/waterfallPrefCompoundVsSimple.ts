import type { SituationalCase } from '../../types/situational';

export const waterfallPrefCompoundVsSimple: SituationalCase = {
  id: 'waterfall-pref-compound-vs-simple',
  title: 'Compound vs simple pref — how much does the language actually move?',
  category: 'deal-process',
  difficulty: 'intermediate',
  roles: ['portfolioMgmt', 'acquisitions'],
  scenario:
    'You\'re reading two LPAs back-to-back. Both stipulate an 8% preferred return on $20M of LP capital over a 5-year hold, then a 100% GP catch-up to 20%, then an 80/20 split. LPA #1 says "8% annual preferred return, *compounded*". LPA #2 says "8% annual preferred return, *simple*". After returning capital, the base case has $13M of profit to distribute, enough to clear the pref and the catch-up under either LPA.',
  data: [
    { label: 'LP capital', value: '$20M' },
    { label: 'Pref rate', value: '8% annual' },
    { label: 'Hold', value: '5 years' },
    { label: 'Compound pref due', value: '~$9.39M' },
    { label: 'Simple pref due', value: '$8.00M' },
    { label: 'Profit to distribute', value: '$13M' },
  ],
  question:
    'How much does the compound vs simple language move the LP\'s total take in the base case, and when does it actually matter?',
  options: [
    {
      label:
        'In the base case, not at all: the LP ends with 80% of the $13M ($10.4M) under either LPA. The pref gap (~$1.39M) is clawed back by a larger GP catch-up. The language matters in the downside, when profit falls short of clearing the catch-up, where compound protects up to ~$1.39M more for the LP.',
      isBest: true,
      explanation:
        'Compound pref: $20M × (1.08^5 − 1) ≈ $9.39M. Simple: $20M × 8% × 5 = $8.00M. With a 100% catch-up to 20%, the catch-up is pref × 0.20/0.80: ~$2.35M (compound) vs $2.00M (simple). Once the catch-up clears, GP holds exactly 20% of all profit, so the LP gets $9.39M + 80% × ($13M − $11.73M) = $10.4M, or $8.00M + 80% × ($13M − $10M) = $10.4M. Identical. Now suppose only $9M of profit exists. Simple: LP $8M pref, GP $1M of catch-up. Compound: the whole $9M is still pref, so LP $9M, GP $0. The pref language is downside protection, and it matters most on deals that disappoint.',
    },
    {
      label:
        'Compound is worth ~$1.4M more to the LP in the base case: $9.39M vs $8.00M of pref, partly offset by a ~$0.35M larger GP catch-up, so about $1.04M net.',
      isBest: false,
      explanation:
        'This counts the bigger pref but forgets that the bigger catch-up and the smaller residual pool offset it fully. With a 100% catch-up that clears, GP lands at exactly 20% of profit and the LP at 80%, whatever the pref wording.',
    },
    {
      label:
        'They\'re essentially identical in every scenario — 8% is 8%, and the compounding language is convention.',
      isBest: false,
      explanation:
        'Identical only when the catch-up fully clears. In a downside where profit runs out inside the pref or catch-up tiers, compound pref gives the LP up to ~$1.39M more priority dollars on this deal, and far more on longer holds.',
    },
    {
      label:
        'Simple pref pays the LP more because pref doesn\'t accrue on prior unpaid pref.',
      isBest: false,
      explanation:
        'Inverts the math. Compound pref is the larger claim because it accrues on prior accrued pref; simple pref just adds rate × years.',
    },
  ],
  takeaway:
    'With a full catch-up, the pref is a priority claim, not extra economics: if the deal clears the catch-up, the LP gets the same 80% either way. "Compounded" vs "simple" is downside protection, and its value grows with hold length and with how likely the deal is to underperform. Without a catch-up (or with a partial one), the pref wording changes the LP\'s take even in the base case.',
  tips: [
    'Compound at 8% for N years: ((1.08)^N − 1). Simple: 8% × N. Gap on $20M: ~$1.4M at 5 yrs, ~$3.1M at 7, ~$7.2M at 10.',
    'Sanity check: after a 100% catch-up to X clears, GP total = X × all profit. If the LP\'s total moves with the pref wording, the catch-up hasn\'t cleared.',
    'The pref wording matters most on long holds and in downside cases, which is exactly when LPs need protection.',
  ],
};
