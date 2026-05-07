import type { SituationalCase } from '../../types/situational';

export const retailPercentageRentClause: SituationalCase = {
  id: 'retail-percentage-rent-clause',
  title: 'Retail: how do you underwrite percentage rent that\'s 8% of NOI?',
  category: 'investment-thesis',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'retail',
  scenario:
    "You're underwriting a $40M anchored grocery-shadow center. T-12 NOI is $2.6M. The rent roll: 60% of in-place rent is base rent, 8% is percentage rent overages from three in-line tenants (a bakery, a fitness studio, a quick-service restaurant), and the remainder is recoveries (CAM / tax / insurance). T-12 sales reports show all three percentage-rent tenants are flat YoY. The seller's broker is presenting the 8% as recurring and is asking you to underwrite it at full value over the 5-year hold.",
  data: [
    { label: 'Asking price', value: '$40M' },
    { label: 'T-12 NOI', value: '$2.6M' },
    { label: 'Going-in cap', value: '6.5%' },
    { label: 'Base rent', value: '60% of in-place' },
    { label: 'Percentage rent', value: '8% of in-place ($208k/yr)' },
    { label: 'Recoveries (CAM/tax/ins)', value: '32%' },
    { label: 'Sales trend (% rent tenants)', value: 'Flat YoY' },
    { label: 'Hold', value: '5 years' },
  ],
  question:
    "How do you underwrite the percentage rent line, and what's the right haircut?",
  options: [
    {
      label:
        "Haircut percentage rent to 50-65% of T-12 in your underwriting and treat it as variable upside, not base income — it's contingent on tenant sales staying above the natural breakpoint, and three tenants is a thin sample. Cap value at base + recoveries (~$2.4M NOI / 6.5% = $36.9M) and treat the percentage rent contribution as the upside that justifies your bid above ask if comps support it.",
      isBest: true,
      explanation:
        "Right framework. Percentage rent has a different risk profile from base rent — it's contingent on tenant sales clearing the natural breakpoint, and breakpoints reset under most leases at renewal. Three tenants flat YoY is *exactly* the warning sign: you're at or near the natural breakpoint, and any sales decline kicks the contribution to zero. Conservative shops cap value off base + recoveries and treat % rent as bonus; aggressive shops (sponsor's broker pitch) underwrite it full and end up missing on year-2 NOI when one tenant slips below breakpoint. The 50-65% haircut is the institutional middle ground that absorbs the volatility.",
    },
    {
      label:
        'Underwrite percentage rent at full T-12 value — it has been there for 3+ years with stable tenants, and the lease structure means it scales with inflation as sales grow.',
      isBest: false,
      explanation:
        "Misses the mechanics. Sales aren't growing — they're flat YoY. Percentage rent only scales with inflation if *sales* outpace inflation; flat sales over an inflationary period means the in-place tenants are losing pricing power, and natural breakpoints don't reset down for the landlord's benefit. Underwriting full value treats variable income as fixed and gets the buyer caught when sales soften.",
    },
    {
      label:
        'Throw out percentage rent entirely — it\'s too volatile to underwrite. Cap value at $36.9M (base + recoveries / 6.5%).',
      isBest: false,
      explanation:
        "Too conservative. Percentage rent that's been sitting at $200k+ for 3+ years on stable tenants has *some* value — discounting to zero ignores that. The discipline is to haircut + treat as upside, not eliminate. Throwing out the line entirely concedes price to a buyer willing to underwrite it.",
    },
    {
      label:
        'Cap the entire NOI ($2.6M) at a higher cap rate (7.0% instead of 6.5%) to compensate for the percentage-rent risk in the going-in yield.',
      isBest: false,
      explanation:
        "Doesn't isolate the right risk. Raising the cap rate on the whole NOI penalizes the base-rent line (which is contractual and not at risk) the same as the percentage-rent line (which is contingent). Cleaner to underwrite the two lines at different reliability levels — base + recoveries at full value, percentage rent at 50-65% of T-12.",
    },
  ],
  takeaway:
    "Percentage rent should be underwritten separately from base rent because the risk profile is fundamentally different — base rent is contractual; percentage rent is contingent on the tenant clearing the natural breakpoint each year. Standard discipline: haircut to 50-65% of T-12 in the underwriting, cap value off base + recoveries only as the floor, treat the percentage rent contribution as upside that justifies pricing above floor. Flat sales is a warning sign, not a stability signal.",
  tips: [
    'Natural breakpoint = base rent / percentage rate. Above this, % rent kicks in; below it, the landlord gets nothing extra.',
    'Always pull the sales reports the lease requires the tenant to provide — if you can\'t see them, that itself is a flag.',
    "Percentage rent is most reliable in grocery-anchored / necessity retail (volumes don't swing); least reliable in apparel / dining (revenue volatile, breakpoint-sensitive).",
  ],
};
