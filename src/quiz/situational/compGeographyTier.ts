import type { SituationalCase } from '../../types/situational';

export const compGeographyTier: SituationalCase = {
  id: 'comp-geography-tier',
  title: 'Can you use comps from a nearby tier-2 market to fill a thin comp set?',
  category: 'comp-selection',
  difficulty: 'advanced',
  roles: ['acquisitions'],
  assetClass: 'multifamily',
  scenario:
    'You\'re pricing a 180-unit multifamily asset in a tertiary market (City T). You have only 2 local comps, both from 20 months ago (cap rates: 5.50% and 5.75%). A broker proposes supplementing with 3 comps from a nearby tier-2 market (City B, 70 miles away, population 4x larger), all within 8 months at 5.0–5.2%. His argument: "Same region, similar product, more recent data — clearly more useful."',
  data: [
    { label: 'Subject', value: 'City T (tertiary) · 180 units · MF' },
    { label: 'Local comps', value: '2 comps · 20 months old · 5.50–5.75%' },
    { label: 'Broker comps', value: '3 comps · City B (tier-2) · 5.0–5.2%' },
    { label: 'City B vs City T', value: 'Population 4x larger; 70 miles distant' },
  ],
  question: 'How do you handle the cross-market comps?',
  options: [
    {
      label: 'Anchor on the local comps at 5.50–5.75% with a documented vintage adjustment (+25–50 bps for the rising-rate lag since 20 months ago). The City B comps at 5.0–5.2% belong in the reference section as a ceiling, not as anchors — tier-2 vs. tertiary carries a structural 25–75 bps cap premium.',
      isBest: true,
      explanation:
        'Tertiary markets carry a structural illiquidity premium of 25–75 bps vs. tier-2 markets: thinner buyer pools, less institutional capital, slower price discovery. The City B comps at 5.0–5.2% are tier-2 pricing that doesn\'t transfer to City T. Averaging them in would tighten your anchor ~50 bps — the wrong direction. The stale local comps at 5.50–5.75% need a vintage adjustment for the rate environment change over 20 months (add ~25–50 bps for 2022–23-era Treasury moves). Final range: 5.75–6.25% for City T. Reference City B as "we\'d expect a 25–50 bps premium to nearby tier-2 markets."',
    },
    {
      label: 'Use the City B comps as the primary anchor — they\'re more recent and comparables are comparables.',
      isBest: false,
      explanation:
        'Comparables from a materially different market tier are not comparable on cap rate. A tier-2 market has deeper institutional demand, lower vacancy risk, and better rent growth outlook than a tertiary market — all of which compress the cap. Applying tier-2 pricing to a tertiary asset overpays by 25–75 bps and would be challenged in any institutional IC.',
    },
    {
      label: 'Average all 5 comps and disclose the geographic difference in a footnote.',
      isBest: false,
      explanation:
        'A footnote doesn\'t undo structural market-tier mixing. An average of 5.0–5.75% comps lands at ~5.35%, which is tier-2 pricing applied to a tertiary asset. That\'s 25–50 bps too tight and represents real dollars of overpaying. Footnotes are for minor adjustments; cross-tier pricing is a structural issue requiring separate treatment, not disclosure.',
    },
    {
      label: 'Walk away — fewer than 3 local comps means this deal can\'t be priced.',
      isBest: false,
      explanation:
        'Thin comp sets are common in tertiary markets; they\'re not a dealbreaker. Document the stale local comps, apply a vintage adjustment, reference City B as a directional ceiling, and present a range rather than a point. A defensible range with disclosed methodology is what ICs expect — not perfect comps.',
    },
  ],
  takeaway:
    'Cross-market comps require a documented market-tier adjustment. The standard cap-rate premium for tertiary vs. tier-2 markets is 25–75 bps, reflecting liquidity and buyer-pool differences. Use out-of-market comps only as a directional reference or ceiling, not as pricing anchors. Stale local comps need a vintage adjustment for the rate-environment move since they traded. In thin comp markets, present a range with explicit methodology — that\'s more defensible than either walking away or averaging incompatible data.',
  tips: [
    'Market tier premium rule of thumb: gateway vs. tier-2 ≈ 50–100 bps; tier-2 vs. tertiary ≈ 25–75 bps.',
    'Vintage adjustment for stale comps: roughly 20–30 bps per 100 bps of 10-yr Treasury move since comp date.',
    'In thin-comp markets, a well-reasoned range beats a single questionable point estimate every time.',
  ],
};
