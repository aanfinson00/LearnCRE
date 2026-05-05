import type { SituationalCase } from '../../types/situational';

export const lpaCostOverrunSharing: SituationalCase = {
  id: 'lpa-cost-overrun-sharing',
  title: 'Cost overrun sharing — who eats what when the budget blows up?',
  category: 'document-literacy',
  difficulty: 'advanced',
  roles: ['portfolioMgmt', 'acquisitions'],
  documentExcerpt: {
    docType: 'lpa',
    label: 'Section 4.3 — Cost Overrun Allocation',
    text: `Cost Overruns shall be allocated and funded as follows:

Tier 1: Contingency Reserve. The first $2,500,000 (the "Contingency
    Reserve") shall be drawn from project funds and shall not require
    additional Member capital.

Tier 2: Sponsor Skin. The next $1,500,000 (the "Sponsor Skin")
    shall be funded by the Managing Member only, in addition to the
    Managing Member\'s Initial Capital Contribution.

Tier 3: Pro Rata. Cost Overruns in excess of Tier 1 + Tier 2 shall
    be funded by all Members in accordance with their Percentage
    Interests; provided, however, that no Member shall be required
    to fund Tier 3 contributions in excess of fifteen percent (15%)
    of such Member\'s Initial Capital Contribution.

Tier 4: Construction Completion Guaranty. To the extent Cost
    Overruns exceed amounts funded under Tiers 1 through 3, the
    Managing Member shall fund such excess pursuant to its
    Construction Completion Guaranty under the Loan Documents.`,
  },
  scenario:
    'A development project has a $50M budget with a $2.5M Contingency Reserve. Initial capital: $25M total ($22.5M LP at 90%, $2.5M GP at 10%). Construction is now $7M over budget and counting. The GP is asking how the overruns get allocated. You\'re calculating each tier.',
  question:
    'How does the $7M overrun flow through the four tiers?',
  options: [
    {
      label:
        'Tier 1 absorbs the first $2.5M (no member capital). Tier 2: GP funds $1.5M alone (Sponsor Skin). Tier 3: remaining $3M is pro-rata 90/10 — LP\'s share = $2.7M, capped at 15% of $22.5M = $3.375M (within cap). GP\'s share = $0.3M, also within their $375k cap. So full $3M flows through Tier 3. Total funding: $0 from project + $1.5M from GP (Tier 2) + $2.7M LP / $0.3M GP (Tier 3). LP exposure so far: $2.7M. GP exposure: $1.8M. Tier 4 would only fire if overruns exceed total Tier 1-3 capacity — currently $7M is within capacity.',
      isBest: true,
      explanation:
        'Tier-by-tier walkthrough: Tier 1 ($2.5M) is project funds — no member capital required. Tier 2 ($1.5M) is GP-only Sponsor Skin — locked-in pro-sponsor exposure. Tier 3 starts at $4.0M of cumulative overrun and goes pro-rata. Capacity in Tier 3 is capped: LP\'s 15% cap = 15% × $22.5M = $3.375M; GP\'s = 15% × $2.5M = $375k. Total Tier 3 capacity = $3.75M, so the structure can absorb up to $4.0M (Tier 1) + $1.5M (Tier 2) + $3.75M (Tier 3) = $9.25M in total. After that, Tier 4 (GP\'s Construction Completion Guaranty) kicks in — *unlimited* personal exposure to the GP. The current $7M overrun is well within Tier 3 capacity. Critical sponsor takeaway: Tier 4 is real — it converts a non-recourse construction loan into personal liability for the GP if overruns blow through the prior tiers.',
    },
    {
      label:
        'GP eats the entire $7M because they signed the Completion Guaranty.',
      isBest: false,
      explanation:
        'Misorders the tiers. Tier 4 (Completion Guaranty) only fires after Tiers 1-3 are exhausted. GP\'s personal exposure starts at the project\'s capacity threshold, not at dollar one of overrun.',
    },
    {
      label:
        'All $7M is shared 90/10 because Members fund pro-rata to ownership.',
      isBest: false,
      explanation:
        'Skips Tiers 1 and 2 entirely. Only Tier 3 is pro-rata; Tier 1 is project-funded and Tier 2 is sponsor-only.',
    },
    {
      label:
        'LP funds all $7M because GP\'s Sponsor Skin is its only obligation.',
      isBest: false,
      explanation:
        'Ignores the Tier 1 contingency reserve and the pro-rata sharing in Tier 3. GP funds Tier 2 plus their pro-rata share of Tier 3 plus all of Tier 4 — typically *more* exposure than LP, especially with the unlimited Completion Guaranty.',
    },
  ],
  takeaway:
    'Cost overrun structures in LPAs typically have 4 tiers: (1) Contingency Reserve from project funds, (2) Sponsor Skin from GP only, (3) pro-rata up to a capped percentage of Initial Capital, (4) GP\'s Completion Guaranty (often personal recourse). The structure pushes the first dollar of overrun pain onto the project, the next onto the GP\'s skin, the middle to all Members pro-rata, and the long tail back onto the GP\'s personal balance sheet. The GP\'s Completion Guaranty is the real horror story: unlimited exposure on a deal where the budget went off the rails.',
  tips: [
    'Always model overruns at multiple severity levels — what does 5% / 10% / 20% do? The structure typically holds at 5%, breaks at 15-20%.',
    'Sponsor Skin is GP\'s reputational cushion. Lenders sometimes require a stated minimum (e.g. "first 5% of budget").',
    'LP cap on Tier 3 (typically 10-25% of Initial) is the binding constraint LPs negotiate hardest. Lower cap = more sponsor-friendly.',
    'Tier 4 Completion Guaranty is the GP\'s biggest exposure on a development deal. Sometimes capped at a percentage of GP capital; sometimes uncapped.',
    'Cross-reference the loan docs: lender Completion Guaranty *triggers* and *cures* should align with the LPA Tier 4 mechanic.',
  ],
};
