import type { SituationalCase } from '../../types/situational';

export const compDistressedSale: SituationalCase = {
  id: 'comp-distressed-sale',
  title: 'Should distressed and related-party comps stay in the set?',
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'office',
  scenario:
    'You\'re pricing a 180,000 SF Class-B suburban office asset. Three recent comps in the same submarket, all within 10 months:\n\nComp A: Arm\'s-length sale, 175k SF, 7.5% cap — standard transaction\nComp B: Lender REO sale, 190k SF, 8.25% cap — bank forced the sale after borrower default\nComp C: Subsidiary sells to parent company, 170k SF, 7.0% cap — internal transfer',
  data: [
    { label: 'Comp A', value: 'Arm\'s-length · 7.5% cap' },
    { label: 'Comp B', value: 'Lender REO · 8.25% cap (distressed)' },
    { label: 'Comp C', value: 'Related-party / internal transfer · 7.0% cap' },
  ],
  question: 'How do you treat this comp set?',
  options: [
    {
      label: 'Use Comp A as the clean anchor (7.5%). Consider Comp B with a disclosed adjustment — distressed sales run 25-50 bps wider than arm\'s-length, suggesting a normal-process value around 7.75-8.0%. Discard Comp C entirely — related-party pricing is never market-tested.',
      isBest: true,
      explanation:
        'Comp B (lender REO) is a legitimate data point reflecting forced-sale dynamics: no marketing period, lender motivation, and a discounted price. It can anchor a downside scenario with a disclosed adjustment, but should not be averaged into a base-case without documentation. Comp C (related-party transfer) should be discarded: the 7.0% cap may reflect intercompany accounting, transfer pricing, or below-market terms — it never cleared an open market. Your anchor range from Comp A: 7.25–7.75%. If you reference Comp B with adjustment, your floor is closer to 7.75-8.0%.',
    },
    {
      label: 'Average all three — that\'s a balanced 3-comp set by definition.',
      isBest: false,
      explanation:
        'Averaging unfiltered comps gives (7.5 + 8.25 + 7.0) ÷ 3 = 7.58%. The 7.0% related-party comp pulls the average artificially tight. Any IC or lender will challenge the Comp C inclusion, and the supporting analysis will fall apart.',
    },
    {
      label: 'Use Comp B as the base — it\'s the most recent reflection of what the market will actually accept.',
      isBest: false,
      explanation:
        'Distressed sales reflect what a forced seller and an opportunistic buyer agree to — not what a motivated arm\'s-length buyer pays in a normalized process. Using a lender REO as your base case systematically undervalues the subject and would produce a low-ball bid in a normal sale process.',
    },
    {
      label: 'Use Comp C as the anchor — related-party deals often reflect replacement cost thinking.',
      isBest: false,
      explanation:
        'Related-party transactions have zero market validation. The subsidiary-to-parent price could reflect tax optimization, book value, or negotiated intercompany terms — none of which is what an unrelated buyer would pay. Presenting a related-party comp as pricing support will be immediately challenged in any IC or lender credit review.',
    },
  ],
  takeaway:
    'Three comp conditions automatically warrant exclusion or documented adjustment: (1) distressed/forced sales (lender REO, foreclosure), (2) related-party/intercompany transfers, (3) portfolio trades where assets are bundled at blended pricing. None of these clear the open market. Arm\'s-length, single-asset, normal-motivation transactions are the standard. Always disclose adjustments when non-standard comps appear in the set.',
  tips: [
    'Signs of distress: listed as "lender REO," foreclosure auction, short sale, or court-ordered sale.',
    'Signs of related party: subsidiary-to-parent, partner buyout at pre-agreed price, intra-fund transfer.',
    'Portfolio allocations: per-asset cap rates from a multi-asset portfolio sale are allocations, not market tests.',
  ],
};
