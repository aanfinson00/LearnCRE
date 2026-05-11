import type { SituationalCase } from '../../types/situational';

export const costSegregationPencilTest: SituationalCase = {
  id: 'cost-segregation-pencil-test',
  title: 'Does the cost-seg study pencil? Running the quick math',
  category: 'investment-thesis',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'development'],
  assetClass: 'industrial',
  scenario:
    "You've just closed on a $12M flex industrial building (land: $2M, depreciable building: $10M). Using standard 39-year straight-line depreciation, annual depreciation is ~$256K/yr. A cost-segregation firm quotes $15,000 for a study and estimates that 25% of the depreciable basis ($2.5M) can be reclassified from 39-year property to 5-, 7-, and 15-year components (electrical, HVAC, site improvements, etc.). Bonus depreciation for the acquisition year is 40% (2026 phasedown schedule). Your effective marginal tax rate on ordinary income is 37%.",
  data: [
    { label: 'Purchase price', value: '$12M' },
    { label: 'Depreciable basis', value: '$10M (excl. $2M land)' },
    { label: 'Reclassifiable to shorter life', value: '$2.5M (25% of depreciable basis)' },
    { label: 'Bonus depreciation rate (2026)', value: '40%' },
    { label: 'Marginal tax rate (ordinary income)', value: '37%' },
    { label: 'Study cost', value: '$15,000' },
    { label: 'Standard yr-1 deduction (no study)', value: '~$256K (1/39 × $10M)' },
  ],
  question:
    "Without the study, year-1 depreciation is ~$256K. Does commissioning the cost-seg study pencil, and what's the approximate first-year tax benefit?",
  options: [
    {
      label:
        "Yes — year-1 bonus depreciation alone on the reclassified components is $2.5M × 40% = $1M, generating a tax shield of $1M × 37% = $370K. Net of the $15K study fee, the first-year gain is ~$355K — roughly a 24× return on the study cost. The remaining $1.5M of reclassified basis also depreciates over 5–15 years (vs. 39), adding further present-value benefit. The study clearly pencils.",
      isBest: true,
      explanation:
        'Right framework. The key driver is bonus depreciation: you accelerate a $1M deduction into year 1 versus spreading it over 39 years. The tax shield ($370K) dwarfs the $15K cost. Even without any bonus depreciation, reclassifying $2.5M onto 5–15-year schedules vs. 39-year generates ~$255K of additional deductions in year 1 alone ($2.5M × (1/7 − 1/39) ≈ $255K) — a $94K tax shield. Industrial and flex properties are among the highest-value cost-seg candidates because they have identifiable short-life components (loading equipment, HVAC, electrical for tenant power, parking/site improvements).',
    },
    {
      label:
        "No — bonus depreciation has phased down from 100% to 40%, so the math no longer works for properties acquired in 2026.",
      isBest: false,
      explanation:
        'Incorrect. 40% bonus depreciation on $2.5M = $1M accelerated deduction — still generates a $370K tax shield vs. a $15K study cost. The phase-down reduced the benefit relative to the 100% bonus era, but the study still produces an extraordinary return at 40%. The threshold for the study to pencil is much lower than full bonus depreciation.',
    },
    {
      label:
        "Depends — cost-seg only pencils if you can use the deductions in the current year. If you're a passive investor subject to passive activity loss (PAL) limits, the deductions may be suspended.",
      isBest: false,
      explanation:
        'Partially true but incomplete as a final answer. PAL rules can limit or defer deductions for passive investors who lack sufficient passive income or who don\'t qualify as real estate professionals. However, for direct owners, operators, or real estate professionals (750+ hours/yr in real estate activities), the deductions are usable immediately. The question describes the owner directly — the PAL caveat is real but secondary to whether the math works, which it clearly does.',
    },
    {
      label:
        'No — cost-segregation studies only apply to residential real estate (§168(e)(2)(A)), not commercial industrial property.',
      isBest: false,
      explanation:
        'Incorrect. Cost segregation is available for any depreciable real property. The study identifies building components that qualify for shorter recovery periods under §168 (5-year, 7-year, or 15-year personal property or land improvements), separate from the 39-year building shell. Industrial properties are among the most cost-seg-friendly asset classes precisely because they have identifiable short-life components.',
    },
  ],
  takeaway:
    "Cost-segregation studies pencil on virtually every commercial acquisition of $3M+ when any bonus depreciation is available. The math is simple: (reclassifiable basis × bonus depreciation rate × marginal tax rate) vs. study fee. Industrial, flex, and manufacturing properties are the highest-value candidates due to abundant short-life components. Always commission the study in the acquisition year; retroactive studies (look-backs) are permitted but require an amended return.",
  tips: [
    'Bonus depreciation phase-down schedule: 100% (2022) → 80% (2023) → 60% (2024) → 40% (2025) → 20% (2026) → 0% (2027+) for most property. Confirm with tax counsel each year.',
    'Passive activity loss rules may defer benefits for limited partners — check LP tax status before modeling cost-seg upside in fund underwriting.',
    'Reclassifiable percentages by property type: industrial 20–30%, multifamily 20–35%, hotel 25–40%, office 15–25% (varies by fit-out).',
  ],
};
