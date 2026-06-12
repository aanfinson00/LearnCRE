import type { SituationalCase } from '../../types/situational';

export const compOffMarketTrade: SituationalCase = {
  id: 'comp-off-market-trade',
  title: 'Can you use an off-market comp?',
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'office',
  scenario:
    'You are pricing a stabilized 80,000 SF suburban office asset. The best recent comp is a trade 4 months ago — same submarket, same vintage, similar single-tenant occupancy — but it was an off-market transaction: a pension fund buyer acquired the asset directly from the seller without broker representation, and no offering memo was circulated. The trade recorded at a 6.25% cap. Two other comps are available but both are more than 2 years old. Rates have risen approximately 100 bps over the past 18 months.',
  data: [
    { label: 'Off-market comp', value: 'Same submarket, 4 months old, 6.25% cap' },
    { label: 'Other comps', value: '2 comps, both 2+ years old' },
    { label: 'Subject', value: '80,000 SF, suburban office, stabilized' },
    { label: 'Rate move (trailing 18 mo)', value: '+100 bps' },
  ],
  question: 'How should you treat the off-market comp?',
  options: [
    {
      label:
        'Include the off-market comp as the primary anchor — it is the most recent transaction and appears in public records. Note in the write-up that it traded off-market (possible relationship premium or discount), but recency matters most in a moving rate environment.',
      isBest: true,
      explanation:
        'Off-market trades are legitimate arm\'s-length transactions that appear in CoStar, RCA, and county records. The meaningful caveat is process, not validity: a targeted sale may reflect a relationship premium (buyer paid above market to avoid competition) or a discount (seller took speed/certainty over price). Without specific evidence of non-market pricing, the trade stands as the best data point available. The 2+ year-old comps predate a 100 bps rate move — they reflect a materially different cost-of-capital environment and should anchor secondary, not primary. Recency beats process quality when rate conditions have shifted.',
    },
    {
      label:
        'Discard the off-market comp — only marketed transactions reflect true market clearing prices.',
      isBest: false,
      explanation:
        'Off-market transactions make up a significant share of commercial real estate volume — portfolio trades, relationship deals, JV buy-outs. Discarding them wholesale would eliminate a large portion of the transaction database. The question is whether there is specific evidence of non-market pricing, not whether a broker ran the process.',
    },
    {
      label:
        'Use the 2-year-old comps instead — they came from a fully marketed process and are more reliable.',
      isBest: false,
      explanation:
        'In a +100 bps rate environment, 2-year-old comps are materially stale regardless of process quality. Cap rates broadly follow treasury movements; a comp that predates the rate cycle reflects a different cost-of-capital environment. Recency should outweigh process quality unless there is a specific documented concern about the off-market trade.',
    },
    {
      label:
        'Average all three comps — the off-market cap and the older caps will self-correct in the blend.',
      isBest: false,
      explanation:
        'Averaging across vintages in a moving rate environment blends incompatible data. The 2-year-old comps reflect pre-rate-cycle pricing and will artificially tighten the average. The resulting number may look defensible on paper but does not hold up under scrutiny from a lender or IC reviewer who asks when each comp traded.',
    },
  ],
  takeaway:
    'Off-market trades are valid comps — the process is off-market, not the validity. Document any known process factors (relationship, speed of close) as a caveat, but use the trade if it is the most relevant data available. In a rate-transition environment, recency is often the most important filter: a recent off-market comp beats a stale marketed comp in nearly every case.',
  tips: [
    'Off-market transactions appear in CoStar, RCA, and public records — use them with a process note.',
    'Flag off-market comps in the write-up with a one-sentence caveat about potential process premium or discount.',
    'In a rising-rate environment, any comp older than 12–18 months needs an explicit rate-environment adjustment.',
  ],
};
