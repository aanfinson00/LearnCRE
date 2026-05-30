import type { SituationalCase } from '../../types/situational';

export const dscrRateSensitivity: SituationalCase = {
  id: 'dscr-rate-sensitivity',
  title: 'Does the deal still cover if rates reset 200 bps higher?',
  category: 'sensitivity',
  difficulty: 'advanced',
  roles: ['mortgageUw', 'acquisitions'],
  assetClass: 'mixed',
  scenario:
    'A stabilized office building underwrites to a 1.35x DSCR at origination on a $20M floating-rate loan (SOFR + 250 bps spread). The loan matures in 3 years. SOFR is currently 4.50%. NOI is $1.8M and is projected to grow at 2% per year. The loan is interest-only. A credit officer runs a stress test asking: "What is the DSCR if SOFR rises 200 bps before the loan matures?"',
  data: [
    { label: 'Loan amount', value: '$20,000,000' },
    { label: 'Loan structure', value: 'Floating rate, interest-only, 3-yr term' },
    { label: 'Current SOFR', value: '4.50%' },
    { label: 'Spread', value: '250 bps over SOFR' },
    { label: 'NOI (Year 1)', value: '$1,800,000' },
    { label: 'NOI growth', value: '2%/yr' },
    { label: 'Origination DSCR', value: '1.35x' },
  ],
  question: 'What is the stressed DSCR at loan maturity if SOFR rises 200 bps, and does the loan trip its covenant?',
  options: [
    {
      label: 'Stressed DSCR at maturity ≈ 0.98x — the loan is in default on its covenant. The $200 bps rate increase raises debt service from $1.40M to $1.90M/yr, while NOI only grows to ~$1.91M after 3 years at 2%/yr. The nearly 1:1 coverage in the stress case is well below any typical 1.20x trigger.',
      isBest: true,
      explanation:
        'Origination debt service: ($20M × (4.50% + 2.50%)) = $1.40M/yr. Origination DSCR: $1.80M ÷ $1.40M = 1.29x (consistent with stated 1.35x — slight approximation from 2% growth already baked in). Stressed rate: SOFR at 6.50% + 2.50% spread = 9.00% all-in. Stressed annual debt service: $20M × 9.00% = $1.80M. Year-3 NOI at 2%/yr: $1.80M × 1.02^3 ≈ $1.91M. Stressed DSCR: $1.91M ÷ $1.80M = 1.06x. Most covenants require 1.20–1.25x; at 1.06x the loan is soft, and any NOI shortfall below 2% growth puts it in breach. If the covenant is 1.20x, the loan trips its covenant at roughly 100 bps of rate increase.',
    },
    {
      label: 'The DSCR stays above 1.30x — NOI growth at 2%/yr covers the rate increase.',
      isBest: false,
      explanation:
        'NOI growth at 2%/yr on an interest-only loan can\'t keep pace with a 200 bps rate shock on a floating-rate loan. $20M × 200 bps = $400K/yr of incremental debt service. Three years of 2% NOI growth adds only ~$110K to NOI. The rate increase overwhelms the NOI growth by 4:1.',
    },
    {
      label: 'The impact depends on the rate cap protection the loan has at origination.',
      isBest: false,
      explanation:
        'Correct in practice — floating-rate loans often require rate caps — but the question is asking you to compute the stressed DSCR directly. If no cap exists or the cap strike is above the stress scenario, the math applies as shown. The correct response is to compute the stressed DSCR first, then note whether a cap changes the answer.',
    },
    {
      label: 'The DSCR risk is only relevant at maturity — the loan won\'t trip a covenant mid-term on floating rate.',
      isBest: false,
      explanation:
        'Many floating-rate loans have ongoing DSCR covenants tested quarterly or annually, not just at maturity. A rate shock year 1 would trigger the covenant in year 1, not just year 3. Covenant testing cadence is a key term to understand before origination; assuming covenants are only tested at maturity is a material underwriting error.',
    },
  ],
  takeaway:
    'On interest-only floating-rate loans, rate shocks are amplified because there\'s no amortization cushion and the full loan balance drives debt service. A 200 bps SOFR move on a 70% LTV IO loan translates to ~1.4% of asset value in additional annual debt service — roughly 7–10x the annual NOI growth from a 2% rent assumption. Always stress-test floating-rate debt at +200 bps SOFR vs. the covenant trigger.',
  tips: [
    'IO loan rate sensitivity: $1M of loan × 200 bps = $20K/yr additional debt service.',
    'NOI growth rarely offsets rate shocks: 2%/yr NOI growth vs. 200 bps rate move is ~10:1 against you.',
    'Know the covenant trigger (typically 1.20–1.25x DSCR) and when it\'s tested before committing.',
  ],
};
