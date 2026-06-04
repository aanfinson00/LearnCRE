import type { SituationalCase } from '../../types/situational';

export const rentBumpStructureComparison: SituationalCase = {
  id: 'rent-bump-structure-comparison',
  title: 'Fixed bumps vs. CPI escalation — which protects NOI better?',
  category: 'lease-econ',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'office',
  scenario:
    'You\'re negotiating a 10-year lease for a 15,000 SF office tenant at $40/SF. The tenant proposes two escalation structures: Option A — 2.5% fixed annual bumps. Option B — CPI-indexed bumps, measured annually, with a 1.0% floor and 4.0% cap. CPI has been running 5–6% for the past 2 years. Long-run CPI consensus is 2.5–3.5% over the next decade.',
  data: [
    { label: 'Base rent', value: '$40/SF on 15,000 SF ($600,000/yr)' },
    { label: 'Option A', value: '2.5% fixed annual bumps' },
    { label: 'Option B', value: 'CPI annual, floor 1.0%, cap 4.0%' },
    { label: 'Trailing 2-yr CPI', value: '5–6%' },
    { label: 'Long-run CPI consensus', value: '2.5–3.5%' },
    { label: 'Lease term', value: '10 years' },
  ],
  question: 'Which structure is preferable for the landlord, and what is the key factor?',
  options: [
    {
      label: 'Option B (CPI) is better if CPI stays above 2.5% — the 4.0% cap delivers more upside than fixed 2.5%, and the 1.0% floor still protects against deflation. In an elevated-inflation environment, CPI outperforms fixed.',
      isBest: true,
      explanation:
        'At 3.5% CPI (within the long-run consensus), Option B delivers 3.5% vs. Option A\'s 2.5% each year. Compounded over 10 years: Year-10 rent at 3.5% CPI ≈ $40 × (1.035)^10 ≈ $56.4/SF; at 2.5% fixed ≈ $51.2/SF. On 15,000 SF, that\'s ~$78K/year more rent in Year 10, roughly $420K present-value advantage over the lease term at a 7% discount rate. If CPI drops below 2.5%, Option A wins. The choice is an inflation bet — and the current macro environment makes Option B the stronger landlord position.',
    },
    {
      label: 'Option A (fixed 2.5%) is better — it\'s predictable, easy to underwrite, and removes inflation risk from the model.',
      isBest: false,
      explanation:
        'Predictability benefits the model, not necessarily returns. If CPI stays at or above 3%, Option A systematically caps rent growth below inflation — a real NOI reduction over time. "Predictability" is an argument for simplicity; "better for the landlord" requires analyzing expected rent outcomes across realistic inflation scenarios.',
    },
    {
      label: 'It doesn\'t matter — the difference is too small to affect deal-level returns.',
      isBest: false,
      explanation:
        'A $420K present-value advantage on a single 15,000 SF lease is meaningful, especially if the asset has multiple leases with the same structure. For a 100,000 SF building, the same choice across all leases could represent $2.5–3M of NPV difference. Lease escalation structure is one of the most durable and overlooked levers on long-term NOI.',
    },
    {
      label: 'Negotiate 3.0% fixed as a compromise — that splits the difference between both options.',
      isBest: false,
      explanation:
        'Splitting the number doesn\'t analyze which is better — it avoids the analysis. A 3.0% fixed bump is better than Option A at 2.5% in all scenarios, but it\'s still worse than Option B when CPI is 3.5–4.0%. The choice should be based on an inflation outlook, not a political average of two proposals.',
    },
  ],
  takeaway:
    'Rent bump structure selection is an active underwriting decision. CPI-indexed bumps outperform fixed bumps when inflation runs above the fixed rate; fixed bumps win when inflation falls below the fixed rate. Model both scenarios and compound the difference over the full lease term before choosing. The floor/cap band matters: a low floor + high cap is a landlord-favorable structure.',
  tips: [
    'Compound the difference: a 1% bump differential over 10 years on a $600K lease is ~$450K NPV at 7%.',
    'CPI floor/cap negotiation: landlords want low floors (protection vs. deflation) and high caps (inflation upside).',
    'For long-term leases (7+ years), CPI structures with 4–5% caps have increasingly replaced fixed bumps post-2021.',
  ],
};
