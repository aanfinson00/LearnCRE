import type { SituationalCase } from '../../types/situational';

export const diagnosticOpexFlat: SituationalCase = {
  id: 'diagnostic-opex-flat',
  title: 'Why is OpEx growing at only 0.5%/year?',
  category: 'diagnostic',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement', 'mortgageUw'],
  assetClass: 'multifamily',
  scenario:
    'A sponsor\'s proforma for a 300-unit Class-B multifamily acquisition shows operating expenses growing at 0.5% per year for a 5-year hold. Year-1 operating expenses are $3,200/unit ($960k total). The property has a full-service management contract, pays property taxes in a state with reassessment-on-sale provisions, and has aging HVAC systems. CPI over the past 5 years has averaged 3.8%. Insurance premiums in the market have increased 15–20% annually for 3 consecutive years.',
  data: [
    { label: 'OpEx Year 1', value: '$3,200/unit ($960k)' },
    { label: 'Sponsor OpEx growth', value: '0.5%/yr (5 years)' },
    { label: 'CPI (5-yr avg)', value: '3.8%' },
    { label: 'Insurance premium trend', value: '+15–20%/yr for 3 years' },
    { label: 'Property tax trigger', value: 'Reassessment on sale in this state' },
    { label: 'HVAC status', value: 'Aging systems (15+ years old)' },
  ],
  question: 'What are the red flags in this OpEx growth assumption?',
  options: [
    {
      label: 'Multiple red flags: (1) 0.5% assumes OpEx grows below CPI, which historically hasn\'t happened; (2) insurance premiums alone have been growing 15–20%/year; (3) reassessment on sale will likely spike property taxes at closing; (4) aging HVAC systems suggest maintenance costs will exceed inflation. Re-underwrite at 3–4% total OpEx growth.',
      isBest: true,
      explanation:
        'Operating expenses in real estate tend to grow with or above CPI, not below it. Breaking down the OpEx bucket: insurance (growing 15–20%/year in many markets), property taxes (reassessment on sale = one-time step-change, then growing at local mill rate), utilities (often inflation-plus), and repairs & maintenance (aging systems accelerate this). A blended 0.5% is only achievable if multiple expenses are assumed to decline in real terms. The correct approach is to model insurance at a realistic growth rate (even if stepped down from recent peaks), stress-test post-sale reassessment on taxes, and allocate adequate capex/maintenance for aging mechanical systems.',
    },
    {
      label: 'The 0.5% growth rate is aggressive, but sponsors often underestimate OpEx — just widen the exit cap to compensate.',
      isBest: false,
      explanation:
        'Masking an OpEx error with an exit cap adjustment doesn\'t fix the issue — it creates a different one. The underwriting should get the OpEx right, which flows through to accurate NOI, which informs the entry price correctly. If the sponsor\'s NOI is overstated by $60/unit/year due to OpEx underestimation, that\'s $18k/year on a 300-unit property — at a 5.5% exit cap, that\'s $327k of overvaluation on exit alone.',
    },
    {
      label: '0.5% is conservative — it means OpEx is essentially flat in real terms, which is prudent.',
      isBest: false,
      explanation:
        'Growing at 0.5% when CPI is 3.8% means OpEx is shrinking in real terms by ~3.3% annually. That\'s not conservative — it\'s optimistic. Operating expenses don\'t shrink in real terms absent deliberate expense reduction initiatives. Insurance, taxes, and repairs all tend to grow faster than CPI over time.',
    },
    {
      label: 'Focus only on the insurance assumption — that\'s the most visible line item to stress.',
      isBest: false,
      explanation:
        'Insurance is the most visible single-line red flag, but narrowing to one line misses the systemic issue: the entire OpEx growth assumption is below inflation. A thorough diagnostic reviews each major bucket (insurance, taxes, management fee, utilities, R&M, and reserves) individually before accepting a blended growth rate.',
    },
  ],
  takeaway:
    'OpEx growing below CPI is almost always a red flag on a residential asset. Always disaggregate OpEx into its major components (insurance, taxes, management, utilities, R&M) and apply market-specific growth rates to each. Reassessment on sale is a deal-specific tax trigger that requires its own line.',
  tips: [
    'OpEx benchmark: residential multifamily grows at CPI to CPI+1%, not below it.',
    'Insurance has been growing 10–20% annually in coastal and catastrophe-exposed markets — don\'t use 5%.',
    'Reassessment on sale states: model a property tax step-change at acquisition, then normal growth thereafter.',
  ],
};
