import type { VocabTerm } from '../../types/vocab';

/** Tax + regulatory vocabulary — the hidden levers behind after-tax IRR. */
export const TAX_REGULATORY_TERMS: VocabTerm[] = [
  {
    id: 'section-1031',
    term: '1031 Exchange',
    category: 'tax-regulatory',
    difficulty: 'intermediate',
    shortDef:
      'Tax-deferred exchange of like-kind real property — defer cap-gains tax by reinvesting proceeds.',
    longDef:
      'IRC Section 1031: defers cap-gains tax on sale by reinvesting proceeds into "like-kind" replacement property within 180 days. Common in CRE for portfolio churn without tax drag. Strict timeline rules (45-day ID, 180-day close) and qualified-intermediary requirements.',
    distractors: [
      'Loan exchange — refi swap of one loan for another.',
      'Reverse mortgage tax exemption.',
      'REIT-to-REIT merger tax shelter.',
    ],
    reverseDistractorIds: ['oz', 'cost-seg', 'recapture'],
  },
  {
    id: 'oz',
    term: 'OZ (Opportunity Zone)',
    category: 'tax-regulatory',
    difficulty: 'advanced',
    shortDef:
      'Federal program allowing tax-deferred gain investment in designated low-income census tracts.',
    longDef:
      'Created by 2017 Tax Cuts and Jobs Act. Investors defer cap gains by investing into Qualified Opportunity Funds within 180 days. Hold for 10+ years = step-up to FMV at exit (no cap gains on the OZ-investment appreciation). Strong tax incentive for ground-up dev in qualifying tracts.',
    distractors: [
      'Off-Zone — investment outside metropolitan limits.',
      'Owner-occupier zone — homeowner tax exemption.',
      'Originator Zone — first-position lender tax break.',
    ],
    reverseDistractorIds: ['section-1031', 'cost-seg', 'reit'],
  },
  {
    id: 'cost-seg',
    term: 'Cost Segregation',
    category: 'tax-regulatory',
    difficulty: 'intermediate',
    shortDef:
      'Engineering study breaking out shorter-life assets from buildings to accelerate depreciation.',
    longDef:
      'Standard buildings depreciate over 27.5y (residential) / 39y (commercial). Cost-seg separates parts that qualify for 5/7/15-year MACRS (carpets, fixtures, parking, landscaping). Accelerates depreciation deductions early, boosting after-tax IRR by ~50-150 bps.',
    distractors: [
      'Capital structure segregation by tier.',
      'Operating cost segregation by department.',
      'Cost-segment accounting for retail tenants.',
    ],
    reverseDistractorIds: ['bonus-depreciation', 'recapture', 'section-1031'],
  },
  {
    id: 'bonus-depreciation',
    term: 'Bonus Depreciation',
    category: 'tax-regulatory',
    difficulty: 'advanced',
    shortDef:
      'Immediate first-year deduction of qualifying capex — historically 100%, phasing down to 20% by 2026.',
    longDef:
      'Under the 2017 TCJA, qualifying property (5/7/15-year MACRS items) was eligible for 100% first-year expensing. Phasing down: 80% in 2023, 60% 2024, 40% 2025, 20% 2026, 0% 2027 (subject to Congressional changes). Cost-seg + bonus dep was the most powerful CRE tax tool of the late 2010s / early 2020s.',
    distractors: [
      'Tax-exempt bonus depreciation for REITs.',
      'Special depreciation for renewable energy assets.',
      'Accelerated depreciation for low-income housing.',
    ],
    reverseDistractorIds: ['cost-seg', 'recapture', 'reit'],
  },
  {
    id: 'reit',
    term: 'REIT',
    category: 'tax-regulatory',
    difficulty: 'beginner',
    shortDef:
      'Real Estate Investment Trust — tax-pass-through entity owning income-producing real estate.',
    longDef:
      'Avoids corporate tax by distributing 90%+ of income to shareholders. Public REITs trade like stocks; private REITs are non-traded. Specific compliance requirements: 75% of assets must be real estate, 75% of income real-estate-related. Tax-efficient holding structure.',
    distractors: [
      'Real Estate Industry Trust — trade association.',
      'Regulatory Estate Investment Treaty — international.',
      'Real Estate Insurance Trust — title insurance entity.',
    ],
    reverseDistractorIds: ['op-units', 'oz', 'section-1031'],
  },
  {
    id: 'op-units',
    term: 'OP Units',
    category: 'tax-regulatory',
    difficulty: 'advanced',
    shortDef:
      'Operating Partnership units in a UPREIT — tax-deferred currency for property contributions.',
    longDef:
      'When property contributors swap real estate for OP units (instead of cash), they defer cap-gains tax. UPREIT structure: properties live in OP, REIT owns OP units, OP units convertible to REIT shares 1:1. Common acquisition currency for public REITs.',
    distractors: [
      'Operating profit per unit — multifamily metric.',
      'Operations partnership — JV management entity.',
      'Open-position units — fund inventory tracking.',
    ],
    reverseDistractorIds: ['reit', 'section-1031', 'oz'],
  },
  {
    id: 'recapture',
    term: 'Recapture (Depreciation)',
    category: 'tax-regulatory',
    difficulty: 'advanced',
    shortDef:
      'Tax owed on previously-deducted depreciation, payable at sale at a 25% federal rate.',
    longDef:
      'Sec 1250 recapture: depreciation taken over the hold reduces basis; on sale, the depreciation portion is taxed at 25% federal (vs 20% cap-gains rate). Example: $10M asset, $3M of depreciation taken, sold at $12M → cap gain split: $3M @ 25% recapture + $2M @ 20% cap-gains. After-tax math hinges on this.',
    distractors: [
      'Tax-loss carryforward at sale.',
      'Tenant security-deposit return mechanism.',
      'Sale escrow holdback for environmental risks.',
    ],
    reverseDistractorIds: ['cost-seg', 'bonus-depreciation', 'step-up'],
  },
  {
    id: 'step-up',
    term: 'Step-Up in Basis',
    category: 'tax-regulatory',
    difficulty: 'advanced',
    shortDef:
      'When inherited property is re-valued to FMV at owner\'s death — eliminates accumulated cap gains.',
    longDef:
      'Estate-planning lever for high-net-worth real estate holders. Property held to death gets a "step-up" in basis to FMV; heirs can sell with no cap-gains tax on appreciation prior to death. Proposals to repeal step-up have been floated periodically — political risk.',
    distractors: [
      'Refi-driven basis adjustment.',
      'Cost-segregation basis reset.',
      'Like-kind exchange basis reset.',
    ],
    reverseDistractorIds: ['recapture', 'section-1031', 'oz'],
  },
  {
    id: 'firpta',
    term: 'FIRPTA',
    category: 'tax-regulatory',
    difficulty: 'advanced',
    shortDef:
      'Foreign Investment in Real Property Tax Act — 15% withholding on foreign sellers of US real estate.',
    longDef:
      'Buyers of US real estate from foreign sellers must withhold 15% of sale proceeds at closing, remitted to IRS. Foreign sellers reconcile actual tax liability via filing. Critical compliance item — buyers risk personal liability for failure to withhold.',
    distractors: [
      'Federal Insurance Real Property Taxation Act.',
      'Foreign-Investment Recapture Provision Tax Adjustment.',
      'Federal Income Real Property Trust Authorization.',
    ],
    reverseDistractorIds: ['recapture', 'reit', 'op-units'],
  },
  {
    id: 'dst',
    term: 'DST (Delaware Statutory Trust)',
    category: 'tax-regulatory',
    difficulty: 'advanced',
    shortDef:
      'Pass-through entity that qualifies as "like-kind" for 1031 exchange — popular small-investor 1031 vehicle.',
    longDef:
      'Allows 1031-exchange investors to acquire fractional interests in larger institutional properties. Each investor gets a beneficial interest in the trust. Compliant with IRS Rev Rul 2004-86 if structured properly. Common 1031 destination for individual investors selling rental properties.',
    distractors: [
      'Daylight Savings Trust — temporary holding entity.',
      'Direct Sale Trust — sponsor liquidation vehicle.',
      'Distressed-Sale Trust — auction-driven entity.',
    ],
    reverseDistractorIds: ['section-1031', 'reit', 'oz'],
  },
];
