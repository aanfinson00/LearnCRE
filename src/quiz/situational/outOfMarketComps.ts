import type { SituationalCase } from '../../types/situational';

export const outOfMarketComps: SituationalCase = {
  id: 'out-of-market-comps',
  title: 'Local trade volume is thin — can you use out-of-market comps?',
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'multifamily',
  scenario:
    'You are pricing a 150-unit Class-B multifamily asset in a secondary Midwest market. Only two trades have occurred locally in the past 12 months, both smaller (<80 units) and a different vintage than the subject. Your broker suggests pulling comps from two comparable secondary markets 200 miles away, where four trades occurred in the same period at consistent cap rates.',
  data: [
    { label: 'Subject', value: '150-unit Class-B, secondary Midwest market' },
    { label: 'Local comps (12 mos)', value: '2 trades — different size and vintage' },
    { label: 'Proposed out-of-market comps', value: '4 trades, comparable secondary markets, ~200 mi away' },
    { label: 'Local comp cap range', value: '5.75–6.00%' },
    { label: 'Out-of-market cap range', value: '5.50–5.75%' },
  ],
  question:
    'Should you use the out-of-market comps, and if so, how do you treat them?',
  options: [
    {
      label:
        'Use them as a secondary reference with an explicit market-level adjustment — document why the markets are comparable and what spread, if any, is warranted, so the adjustment can survive an IC or loan review challenge.',
      isBest: true,
      explanation:
        'Out-of-market comps are appropriate when local trade volume is insufficient and the markets are economically comparable (similar demographics, vacancy levels, rent growth history). Using them as the primary pricing anchor without adjustment is a mistake because cap rates reflect local investor sentiment and supply/demand dynamics. The 25-bps tighter out-of-market range relative to local comps suggests a market-level premium that should be documented and adjusted for. "Same submarket" is the gold standard for a comp; out-of-market comps are a legitimate second tier when the first tier is too thin to support pricing.',
    },
    {
      label:
        'Reject them entirely — secondary market cap rates are idiosyncratic and cannot be adjusted accurately across geographies.',
      isBest: false,
      explanation:
        'Rejecting all cross-market comps when local trade volume is thin leaves pricing unsupported. Two local comps with size and vintage mismatches, combined with a documented adjusted out-of-market set, are more defensible than relying on two imperfect locals alone. Transparency about the methodology matters more than geographic purity.',
    },
    {
      label:
        'Use them without adjustment — comparable secondary markets should price identically if supply/demand fundamentals match.',
      isBest: false,
      explanation:
        'Identical fundamentals don\'t guarantee identical cap rates. Investor appetite, local buyer depth, and market liquidity all differ by geography. The out-of-market comps are 25 bps tighter than local trades — using them unadjusted inflates the implied value of the subject. That gap needs a documented explanation or an adjustment.',
    },
    {
      label:
        'Extend the local comp lookback to 24 months to build a larger sample of same-market trades.',
      isBest: false,
      explanation:
        'In a moving rate environment, trades from 18–24 months ago reflect materially different cost-of-capital conditions. A stale same-market comp is worse than a current, well-documented cross-market comp with a transparent adjustment. Currency of the comp matters more than geographic identity.',
    },
  ],
  takeaway:
    'Out-of-market comps are a legitimate second-tier pricing tool when local volume is thin — but they require an explicit market-level adjustment and clear documentation. The IC question will always be: "Why is that market comparable, and what spread do you apply?" Prepare the answer before the meeting.',
  tips: [
    'Primary comps: same submarket, <12 months old, similar size and vintage.',
    'Secondary comps: comparable markets with a documented market-level spread adjustment.',
    'A current cross-market comp beats a 24-month-old local comp in a moving rate environment.',
  ],
};
