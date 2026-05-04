import type { SituationalCase } from '../../types/situational';

export const costSegregationBasics: SituationalCase = {
  id: 'cost-segregation-basics',
  title: 'Cost segregation — what does it actually do for your IRR?',
  category: 'deal-process',
  difficulty: 'intermediate',
  roles: ['assetManagement', 'portfolioMgmt', 'acquisitions'],
  scenario:
    'You\'ve just closed on a $30M MF acquisition. The CFO asks whether to spend $25k on a cost segregation study. You\'re holding 5 years; the LP base is mostly tax-paying individuals + family offices. The asset has $24M of depreciable basis (80% of purchase, excluding land).',
  data: [
    { label: 'Depreciable basis', value: '$24M (80% × $30M)' },
    { label: 'Standard MF life', value: '27.5 yrs straight line' },
    { label: 'Cost-seg study fee', value: '$25k' },
    { label: 'Hold period', value: '5 years' },
    { label: 'LP tax position', value: 'Mostly taxable individuals + FOs' },
  ],
  question: 'What does cost seg actually do, and is the $25k worth it here?',
  options: [
    {
      label:
        'Cost seg reclassifies portions of the basis from 27.5-yr property into 5/7/15-yr property, accelerating depreciation into the early years of the hold. With 100% bonus depreciation phasing down (60% in 2024, 40% in 2025), the front-loaded depreciation creates a large Year-1 paper loss that offsets passive income for taxable LPs. ROI on the $25k is typically 10-50x for taxable LPs on a $24M basis. For tax-exempt LPs (pensions, endowments, sovereign), cost seg has zero value. Decision turns on the LP tax base.',
      isBest: true,
      explanation:
        'Cost seg reclassifies items that ARE part of the building (carpet, appliances, parking lots, land improvements, specialty electrical for cooling) into shorter-life classes (5, 7, 15 years vs the 27.5-year base). With bonus depreciation, those reclassified items can be depreciated heavily or fully in Year 1. On a $24M basis, a typical MF cost seg surfaces ~20-30% as shorter-life property = ~$5-7M in accelerated depreciation. For taxable LPs, that\'s a $5-7M paper loss they can apply against passive income, which at a 37% federal + state marginal rate is worth ~$2M in tax deferral — vastly more than the $25k study fee. For tax-exempt LPs, no benefit. The LP base determines the answer.',
    },
    {
      label: 'Cost seg reduces the property tax bill by reclassifying basis between land and improvements.',
      isBest: false,
      explanation:
        'Confuses cost seg (federal income tax depreciation acceleration) with property tax assessment (state/local, separate process). Cost seg has nothing to do with property taxes; those are based on assessed value, not depreciation schedules.',
    },
    {
      label: 'Cost seg creates a permanent tax savings by reducing total depreciation owed over the asset\'s life.',
      isBest: false,
      explanation:
        'Wrong — cost seg accelerates depreciation but doesn\'t change the total amount. Same total deduction over the life; just front-loaded. The benefit is *time value* of the deferral (tax savings now, recapture/normalization later) plus potentially permanent if the asset is exchanged via 1031 or stepped up at death.',
    },
    {
      label: 'Cost seg increases the depreciable basis itself by including items the standard schedule misses.',
      isBest: false,
      explanation:
        'Doesn\'t change basis. Cost seg only re-allocates the existing depreciable basis across asset-life buckets. The total is the same; the timing is different.',
    },
  ],
  takeaway:
    'Cost segregation is a depreciation ACCELERATION tool, not a basis-increase or tax-elimination tool. It reclassifies parts of the building into shorter-life classes (5/7/15-yr) so more depreciation hits early years — especially valuable when bonus depreciation lets you take it Year 1. Time value + 1031 step-up potential makes it pay for taxable LPs (typical ROI 10-50x on the study fee). For tax-exempt LPs, zero value. Always ask "what\'s the LP tax base?" before commissioning a study.',
  tips: [
    'Typical cost-seg study reclassifies 20-30% of MF basis to shorter lives.',
    'Bonus depreciation: 60% (2024) → 40% (2025) → 20% (2026) → 0% (2027+) under current law.',
    'Recapture on sale: shorter-life property recaptures at ordinary income rates (vs 25% for 1250). Plan exit accordingly.',
  ],
};
