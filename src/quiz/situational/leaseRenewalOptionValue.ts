import type { SituationalCase } from '../../types/situational';

export const leaseRenewalOptionValue: SituationalCase = {
  id: 'lease-renewal-option-value',
  title: 'Below-market renewal option — how much does it cost you?',
  category: 'lease-econ',
  difficulty: 'advanced',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'office',
  scenario:
    'You\'re acquiring an office building. The largest tenant (40% of GLA, 60,000 SF) has 3 years remaining on their lease at $38/SF and holds a renewal option at $42/SF for an additional 5 years. Market rents are currently $50/SF and are projected to grow to $54/SF by lease expiry. The tenant is "economically captive" — they\'ve heavily built out the space and will almost certainly exercise the option. You\'re pricing the acquisition at a 5.5% going-in cap on in-place NOI.',
  data: [
    { label: 'Tenant space', value: '60,000 SF (40% of GLA)' },
    { label: 'In-place rent', value: '$38/SF (3 yrs remaining)' },
    { label: 'Option rent', value: '$42/SF (5-yr renewal)' },
    { label: 'Current market rent', value: '$50/SF' },
    { label: 'Market rent at expiry (est.)', value: '$54/SF' },
    { label: 'Going-in cap', value: '5.5% on in-place NOI' },
  ],
  question: 'How do you underwrite the impact of the below-market renewal option on value?',
  options: [
    {
      label:
        'The option creates a $12/SF/yr revenue gap vs. market at exercise ($54 − $42). Over 60K SF for 5 years, that\'s $36M of foregone revenue. Discounted at ~7%, PV ≈ $25M of value destruction vs. a market-rate renewal scenario. This risk should be reflected in a wider going-in cap (or haircut to purchase price) — not buried in the in-place NOI multiple.',
      isBest: true,
      explanation:
        'The option locks you into $42/SF on 40% of your GLA during the option period, when market would be $54/SF. The annual shortfall per SF: $12/SF. Total annual shortfall: $12 × 60,000 = $720,000/yr. Over 5 years (years 4–8 of ownership), cumulative shortfall ≈ $3.6M undiscounted. The option has real economic cost. In an acquisition context, this is typically reflected as: (1) a haircut to the assumed NOI at lease rollover (replace $54 market NOI with $42 option NOI for 5 years), (2) a longer stabilized NOI timeline (true stabilization is pushed to year 9, not year 4), and (3) a wider cap at pricing to account for the income ceiling. Buyers who price off today\'s in-place NOI without modeling the option impact are overpaying.',
    },
    {
      label:
        'The renewal option is a positive — a long-term lease renewal with a creditworthy tenant reduces vacancy risk and supports stable cash flow.',
      isBest: false,
      explanation:
        'Lease certainty is valuable, but only at or near market rent. A 5-year renewal at $12/SF below market reduces certainty and caps NOI growth. The option converts a potential mark-to-market event (tenant renewing at $54/SF) into a locked-in $42/SF scenario. This is economically worse than a tenant that might leave but could be re-leased at market. The value of certainty must be weighed against the value of the locked-in below-market rent.',
    },
    {
      label:
        'Model the option as not exercised — at 3 years out, the tenant might leave, and a 40% vacancy event is the bigger risk to underwrite.',
      isBest: false,
      explanation:
        'The prompt says the tenant is "economically captive" with heavy build-out. In CRE analysis, you follow the most probable scenario: if the tenant has a $42/SF option with market at $54 and is built out, they will almost certainly exercise. Modeling them as leaving ignores the economic reality. The correct analysis prices the option as exercised and quantifies the below-market discount — not as a vacancy scenario.',
    },
    {
      label:
        'Options are standard — every lease has them. Underwrite the going-in cap and flag the option in the IC memo.',
      isBest: false,
      explanation:
        '"Flag it in the IC memo" without quantifying the impact is a due-diligence gap. Below-market options on 40% of GLA for 5 years represent a material reduction in projected NOI growth — potentially $3-4M of present-value impact. IC members expect a quantified analysis, not a mention. Disclosing without quantifying is incomplete.',
    },
  ],
  takeaway:
    'Below-market renewal options are a form of embedded cost to the landlord: they cap the rent the landlord can collect even when market rates rise above the option rent. When an economically captive tenant holds a below-market option, the option should be modeled as exercised, the revenue gap vs. market quantified, and the present value of that gap treated as a price discount or required yield compensation. Options on large tenants (25%+ of GLA) are material diligence items, not a footnote.',
  tips: [
    'Below-market option impact: (market rent − option rent) × SF × term years, then PV that cash flow at your discount rate.',
    'Economically captive tenants (heavy build-out, specialized fit) almost always exercise options.',
    'Options on 25%+ of GLA should drive a cap rate adjustment at acquisition, not just a memo footnote.',
    'True stabilization occurs after the option period expires and rent can reset to market — model that timeline.',
  ],
};
