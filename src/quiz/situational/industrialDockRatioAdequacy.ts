import type { SituationalCase } from '../../types/situational';

export const industrialDockRatioAdequacy: SituationalCase = {
  id: 'industrial-dock-ratio-adequacy',
  title: 'Industrial: dock-to-SF ratio and tenant pool implications',
  category: 'pricing',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'industrial',
  scenario:
    "You're underwriting a 250,000 SF last-mile distribution facility in a secondary market. The building has 18 dock-high doors and 4 drive-in grade-level doors. The broker's OM describes it as 'well-configured.' Your target tenant pool includes national 3PL operators and e-commerce fulfillment users. You've pulled comp data showing the submarket averages 1 dock per 15,000 SF. Major 3PL operators your leasing team contacts consistently require a minimum of 1 dock per 10,000 SF. Adding a new dock-well costs approximately $30,000–$45,000 per door (concrete, structural, grade-work). The building sits on 18 acres (ample truck court); no site constraints on adding docks.",
  data: [
    { label: 'Building size', value: '250,000 SF' },
    { label: 'Dock-high doors', value: '18' },
    { label: 'Drive-in grade-level doors', value: '4' },
    { label: 'Current dock ratio', value: '1 per ~13,900 SF (18 docks ÷ 250K SF)' },
    { label: 'Submarket average dock ratio', value: '1 per 15,000 SF' },
    { label: 'National 3PL minimum requirement', value: '1 per 10,000 SF = 25 docks needed' },
    { label: 'Dock shortfall for 3PL', value: '7 docks (25 needed − 18 existing)' },
    { label: 'Cost to add docks', value: '$30K–$45K per door ($210K–$315K for 7 doors)' },
  ],
  question:
    "The broker claims the dock count is 'market' and suitable for your target tenants. How do you evaluate that claim, and should you underwrite capex to add docks?",
  options: [
    {
      label:
        "The broker is right that 18 docks (1 per ~14k SF) meets the submarket average — but wrong that it serves your target tenant pool. National 3PLs and e-commerce users require 1 per 10,000 SF = 25 docks; this building is 7 docks short for that tenant category. Adding 7 docks costs $210K–$315K — a modest capex relative to the building value, and the site allows it. Underwrite the dock addition as a cost-to-cure and price the deal to recover that spend; doing so opens the 3PL market and likely narrows your exit cap rate by 15–25 bps relative to the as-is configuration.",
      isBest: true,
      explanation:
        "Right analysis. The submarket average is a ceiling for the current tenant population — it doesn't define what your target tenants require. Dock-ratio adequacy is tenant-specific: local/regional distributors are fine at 1 per 15k SF; national 3PLs and e-commerce have stricter minimums driven by trailer drop-yard and staging requirements. Knowing the tenant category you're pursuing and matching the spec to that category's requirement is the core of industrial underwriting. The cost-to-cure is modest relative to building value; leaving 7 docks short costs you the entire 3PL market and pushes the exit cap higher at sale.",
    },
    {
      label:
        'The building is fine as-is — the 4 drive-in grade-level doors supplement the dock count and effectively give you 22 loading positions, which is above the 3PL requirement.',
      isBest: false,
      explanation:
        "Drive-in grade-level doors don't substitute for dock-high doors for pallet-in / pallet-out loading. Grade-level is used for van delivery, forklift access, or smaller goods — it is not interchangeable with dock-high loading for standard 53-foot trailers. National 3PLs count dock-high positions when specifying requirements; drive-in doors count as access points, not loading capacity.",
    },
    {
      label:
        'Dock ratio is secondary to clear height — if the building has 32' clear, 3PL tenants will overlook a dock shortfall.',
      isBest: false,
      explanation:
        "Clear height and dock ratio are both necessary; neither substitutes for the other. A 32' clear building with 12 docks per 250,000 SF (1:20,833) can only load/unload X trailers simultaneously regardless of vertical storage capacity. 3PL tenants need both specs to hit their throughput targets. Underwriting as if one physical attribute covers for another is how investors overpay for buildings that can't lease to their target tenant.",
    },
    {
      label:
        "Don't add docks — industrial tenants typically install their own dock equipment and will reconfigure as needed. Just price at market and let the tenant handle it.",
      isBest: false,
      explanation:
        "Dock-high openings are structural (they penetrate the building shell and require loading pits or levelers embedded in the concrete slab). Tenants can bring their own levelers and seals but cannot add new dock openings without landlord cooperation and significant construction. A tenant requiring 25 docks won't sign at a building with 18 structural dock openings and no plan to cure — they'll go to the next property. This is not a tenant-manageable issue.",
    },
  ],
  takeaway:
    "Industrial underwriting requires matching the building's dock-ratio to the target tenant category, not just to the submarket average. Submarket averages reflect the existing tenant mix — which may be less demanding than your target users. Know your tenant's minimum specs before assessing whether the building is 'well-configured.' When a cost-to-cure is modest relative to value and the site allows it, underwrite the fix and price accordingly rather than accepting a narrowed tenant pool.",
  tips: [
    'Dock-ratio benchmarks by tenant type: local distribution ~1:15,000 SF; regional distribution ~1:12,000 SF; national 3PL / e-commerce ~1:10,000 SF; cold-storage / food-grade can require 1:8,000 SF.',
    "Other binary spec floors to check: clear height (≥32' for big-box), bay spacing (36' preferred for rack configuration), ESFR sprinkler rating, and power (amps and service voltage for automation).",
    'Cost-to-cure for dock additions: $30K–$45K per door for standard concrete tilt-up; $50K–$75K if structural modifications or grade-work are complex.',
  ],
};
