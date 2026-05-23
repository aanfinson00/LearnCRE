import type { SituationalCase } from '../../types/situational';

export const absorptionRetailAnchor: SituationalCase = {
  id: 'absorption-retail-anchor',
  title: 'The anchor vacated — how does that change your lease-up math?',
  category: 'absorption',
  difficulty: 'advanced',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'retail',
  scenario:
    'A 400,000 SF power center lost its 100,000 SF anchor tenant nine months ago. Inline occupancy across the remaining 300,000 SF is 88%. The landlord has been marketing the anchor box with no signed LOI. Historical inline leasing has averaged 3 new deals per quarter totaling about 15,000 SF. You are underwriting an acquisition that assumes anchor replacement within 18 months.',
  data: [
    { label: 'Total GLA', value: '400,000 SF' },
    { label: 'Anchor space vacant', value: '100,000 SF (dark 9 months)' },
    { label: 'Inline occupancy', value: '88% of remaining 300,000 SF' },
    { label: 'Historical inline leasing velocity', value: '~15,000 SF/qtr' },
    { label: 'Pro forma anchor retenancy', value: '18 months' },
  ],
  question: 'How should the anchor vacancy status affect your stabilization underwriting?',
  options: [
    {
      label: 'Flag 18 months as optimistic — nine months on market with no LOI signals structural demand scarcity. Run a base case at 30–36 months and a stress case at permanent anchor vacancy, using a repositioning scenario (fitness, entertainment, grocery) with higher TI and lower rent.',
      isBest: true,
      explanation:
        'Nine months of active marketing with zero signed LOIs is a material signal. Anchor-format tenants — big box, grocery, sporting goods, cinema — are contracting systemically in most U.S. markets. Finding a single credit tenant for 100,000 SF can realistically take 2–4 years. The anchor dark period also creates co-tenancy risk: many inline leases include clauses allowing rent abatement or early termination if the anchor stays dark beyond a contractual threshold (typically 6–12 months). Before underwriting 18-month retenancy, you need: (a) identified replacement candidates, (b) a co-tenancy clause review across all inline leases, and (c) a repositioning scenario as a parallel analysis. Without those, 18 months is a placeholder, not an underwriting assumption.',
    },
    {
      label: 'Keep 18 months — the anchor is only 25% of GLA and inline performance at 88% demonstrates the center is healthy.',
      isBest: false,
      explanation:
        'Percentage of GLA understates the anchor\'s functional importance. Anchors drive traffic that supports inline tenants\' sales productivity. When the anchor goes dark, inline tenants often see declining sales and may trigger co-tenancy abatement rights. "Inline is healthy" is not a safe assumption after nine months of anchor vacancy — it requires confirming that no co-tenancy clauses have been triggered or are approaching threshold.',
    },
    {
      label: 'Model anchor rent at 50% of prior levels to reflect softer demand, but keep the 18-month timeline.',
      isBest: false,
      explanation:
        'Adjusting rent without adjusting timing resolves only half the problem. If the rent assumption is conservative but the timeline is wrong, you are modeling cash flow that will not appear when you expect it. On a value-add deal, getting the timing wrong by 12–18 months can swing the levered IRR by 300–500 bps. Both rent level and timing must be grounded in market evidence.',
    },
    {
      label: 'Trust the broker\'s 18-month timeline — they know the active tenant prospects in the market.',
      isBest: false,
      explanation:
        'Brokers have incentive to support a timeline that closes the transaction. Nine months of marketing with no LOI is your observable data point; the broker\'s optimism is an unconfirmed assertion. Ask for named prospects with letter-of-intent history — if none exist, the 18-month assumption has no basis. Verify; do not accept.',
    },
  ],
  takeaway:
    'Anchor vacancy in retail is a binary risk event, not just a NOI line item. Nine months on market with no LOI signals demand scarcity and warrants a meaningful timeline extension. Before closing any retail acquisition with a dark anchor, review all inline leases for co-tenancy language and model a repositioning scenario alongside the base-case retenancy assumption.',
  tips: [
    'Always check inline leases for co-tenancy clauses before modeling anchor-dependent stabilization — breaches may already be active after 9+ months.',
    'Alternative anchor uses — fitness, entertainment, medical, grocery — typically pay 30–50% below prior retail anchor rents.',
    'If the anchor space has been dark beyond the typical co-tenancy threshold, the inline occupancy figure may be deceptively stable and at risk of decline.',
  ],
};
