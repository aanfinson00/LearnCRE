import type { SituationalCase } from '../../types/situational';

export const industrialSingleTenantRisk: SituationalCase = {
  id: 'industrial-single-tenant-risk',
  title: 'Industrial: 2-year WALT on a single-tenant 400,000 SF building — how do you size the rollover risk?',
  category: 'risk',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'mortgageUw'],
  assetClass: 'industrial',
  scenario:
    "A 400,000 SF Class A industrial building (32' clear, 185' truck court, ESFR sprinklers) is listed at $58M ($145/SF). The single tenant — a regional 3PL logistics company — pays $6.50/SF NNN with 2 years remaining and no renewal option. Market rent in the submarket is $8.25/SF NNN (27% above in-place). Submarket vacancy is 4.5%. Average lease-up time for comparable big-box industrial in this market is 9 months. The seller is marketing the mark-to-market upside as the key value driver.",
  data: [
    { label: 'Building', value: '400,000 SF Class A (32\' clear, 185\' court)' },
    { label: 'In-place rent', value: '$6.50/SF NNN ($2.6M/yr)' },
    { label: 'Market rent', value: '$8.25/SF NNN ($3.3M/yr)' },
    { label: 'Lease WALT', value: '2 years, no renewal option' },
    { label: 'Asking price', value: '$58M ($145/SF)' },
    { label: 'Going-in cap (in-place)', value: '4.5%' },
    { label: 'Submarket vacancy', value: '4.5%' },
    { label: 'Avg lease-up time (comps)', value: '9 months' },
  ],
  question: "How do you underwrite the rollover risk, and should you bid near the seller's asking price?",
  options: [
    {
      label:
        "Build a probability-weighted scenario rather than anchoring to either in-place or the full mark-to-market. In a 4.5% vacancy market with top-tier specs, renewal probability is ~65-70%. Non-renewal scenario: 9 months downtime + $10-20/SF TI + 3-4 months free rent on new lease = ~$6-9M of leasing-cost NPV. Weighted NOI: (0.65 × $3.3M) + (0.35 × [$3.3M - leasing cost annualized]) drives your bid price. At $145/SF on a 4.5% going-in cap, you're paying for the mark-to-market to materialize — price in the 35% scenario where it doesn't.",
      isBest: true,
      explanation:
        "Right framework. Single-tenant industrial rollover is binary — the tenant either renews (upside realized) or vacates (execution risk materializes). In a tight submarket with superior specs, renewal probability is 65-70%, but a 30-35% non-renewal scenario with 9 months downtime and $6-9M of leasing costs can crater IRR by 300-400bps. Probability-weighted underwriting — rather than assuming the optimistic or pessimistic case — produces a defensible bid that compensates for execution risk without walking from a legitimate opportunity.",
    },
    {
      label:
        "The 27% mark-to-market upside is the story. Pay the ask — $8.25/SF at stabilization caps back at 5.7% on cost, which is strong for this asset class.",
      isBest: false,
      explanation:
        "Ignores binary rollover risk. 5.7% yield on cost is attractive only if the mark-to-market materializes — and with a 30-35% probability of vacancy, you have a meaningful chance of 12+ months of downtime and $6-9M of leasing costs. Underwriting to the optimistic case without probability-weighting the alternative is the classic single-tenant rollover mistake.",
    },
    {
      label:
        "Two-year WALT on single-tenant industrial is uninvestable — walk without bidding.",
      isBest: false,
      explanation:
        "Too binary. 2-year WALT in a 4.5% vacancy market with superior specs is a manageable risk when priced correctly. Many institutional investors specifically target single-tenant rollover situations because the mark-to-market premium compensates for execution risk at the right entry price. The discipline is probability-weighted underwriting, not automatic avoidance.",
    },
    {
      label:
        "Underwrite at in-place rent only ($6.50/SF) — the mark-to-market is speculative and has no place in the base case.",
      isBest: false,
      explanation:
        "Too conservative. In a 4.5% vacancy submarket with top-tier specs, the renewal probability is 65-70% — the mark-to-market upside is a real probabilistic value, not pure speculation. Underwriting at in-place only ignores most of the probability mass and leads to a below-market bid, effectively gifting upside to the seller.",
    },
  ],
  takeaway:
    "Single-tenant industrial rollover should be underwritten as a probability-weighted scenario, not a binary assumption. Inputs: renewal probability (submarket vacancy, building specs, tenant operational footprint), downtime if vacancy (average lease-up for comparable buildings), and leasing costs (TI + free rent + commission). In a tight submarket (<5% vacancy) with superior specs, renewal probability runs 65-75% — price the 25-35% tail explicitly rather than either assuming the optimistic outcome or walking away.",
  tips: [
    "Rollover cost stack: TI ($10-25/SF on industrial), free rent (3-6 months), and commission (3-5% of lease value) can total $6-12M on a 400,000 SF building — model these as a capital call in year 2 of the hold.",
    "DSCR at vacancy: confirm debt service coverage if the building goes dark for 9-12 months. If you can't service the loan from reserves, size a debt service reserve at acquisition.",
    "Renewal signals during diligence: tenant capex in the building (racking, dock levelers, floor coating) signals high switching costs and higher renewal probability. Tour the building and ask the broker for any tenant capex history.",
  ],
};
