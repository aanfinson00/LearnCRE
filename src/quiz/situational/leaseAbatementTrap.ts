import type { SituationalCase } from '../../types/situational';

export const leaseAbatementTrap: SituationalCase = {
  id: 'lease-abatement-trap',
  title: 'Is the Year 1 cash flow actually there?',
  category: 'lease-econ',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement', 'mortgageUw'],
  assetClass: 'office',
  scenario:
    "You're pricing an office building with a recently signed 10-year lease for its largest tenant (40% of GLA) at $32/SF NNN. The lease includes a 12-month rent abatement from commencement. The seller's broker quotes a $4.2M stabilized NOI and offers the building at a 6.5% going-in cap ($64.6M). A closer read of the rent roll reveals the abatement is in effect for all of Year 1.",
  data: [
    { label: 'Largest tenant', value: '40% of GLA, $32/SF NNN, 10-yr term' },
    { label: 'Rent abatement', value: '12 months from commencement' },
    { label: "Seller's Year 1 NOI", value: '$4.2M (includes full-year rent)' },
    { label: 'Going-in cap (seller)', value: '6.5%' },
    { label: 'Implied price', value: '$64.6M' },
  ],
  question: "What's wrong with the seller's Year 1 NOI and how should you reprice?",
  options: [
    {
      label: "The seller's Year 1 NOI is overstated by the abated rent — that income isn't collected in Year 1. The actual going-in cap is lower than 6.5% once you remove the phantom rent. Underwrite actual Year 1 cash flow in the cap; model the rent recovery as Year 2 NOI growth in the IRR.",
      isBest: true,
      explanation:
        "If the largest tenant is 40% of GLA at $32/SF and their rent is fully abated in Year 1, the actual Year 1 NOI excludes their contribution. On a $4.2M stabilized NOI, removing ~40% of that tenant's rent (say ~$800K–$1M+ depending on size) puts Year 1 actual NOI materially below $4.2M. At $64.6M price, the real going-in cap on collected rent is well below 6.5%. The correct frame: (1) determine actual Year 1 collected NOI, (2) compute the real going-in cap, (3) model Year 2 NOI step-up as the abatement burns off, (4) run the IRR on the full cash flow timeline including the abatement gap.",
    },
    {
      label: "It's fine — the lease is signed and the rent is contractually committed, even if temporarily abated.",
      isBest: false,
      explanation:
        "Contractual commitment ≠ cash flow. Cap rates apply to NOI — actual collected income, not contractual rent that hasn't been received yet. Paying $64.6M today based on NOI that won't arrive until Year 2 means funding a Year 1 income gap at the seller's price. The buyer absorbs the carry cost of the abatement; the going-in cap must reflect what actually flows in Year 1.",
    },
    {
      label: "Price on stabilized (Year 2) NOI and apply a separate discount for the abatement period.",
      isBest: false,
      explanation:
        "Pricing on Year 2 NOI without modeling Year 1 cash flows skips the problem rather than solving it. The right method is to model all cash flows (reduced Year 1 → full Year 2+) and solve for the IRR at the seller's price. If the IRR at $64.6M meets the target, the deal works — but you need to run the actual timeline, not just swap the denominator.",
    },
    {
      label: "Abatements are standard and already priced into the 6.5% market cap rate for office.",
      isBest: false,
      explanation:
        "Market cap rates apply to actual NOI, not to contracted-but-not-yet-collected income. If the market is pricing at 6.5% on real collected NOI, then including abated rent in the numerator overstates NOI and understates the effective going-in cap. The seller's 6.5% is only valid if it's computed on actual Year 1 cash flow, which it isn't here.",
    },
  ],
  takeaway:
    "Rent abatements create a gap between contracted rent and actual Year 1 cash flow. Cap rates must be applied to income actually collected — not to scheduled rent that won't arrive during the abatement period. When reviewing a rent roll, look for abatements, free rent, and step-ups that affect what the building actually earns at closing vs. what the OM projects at 'stabilization.'",
  tips: [
    "Cap-rate denominator = NOI you actually receive in Year 1, not NOI the lease will eventually produce.",
    "Abatement period = Year 1 NOI shortfall; ask the seller to price on actual collected rent.",
    "Model the full cash flow timeline: abatement gap in Year 1, step-up in Year 2, then run the IRR.",
  ],
};
