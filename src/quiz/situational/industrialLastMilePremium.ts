import type { SituationalCase } from '../../types/situational';

export const industrialLastMilePremium: SituationalCase = {
  id: 'industrial-last-mile-premium',
  title: 'Industrial: last-mile vs. big-box — how do you price the location premium?',
  category: 'pricing',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'industrial',
  scenario:
    "You're underwriting two industrial assets in the same MSA: Asset A is a 120,000 SF urban infill warehouse 4 miles from downtown, clear height 24', dock & grade loading, asking $285/SF. Asset B is a 500,000 SF Class A big-box facility 28 miles from downtown at the interstate interchange, clear height 36', 40 dock doors, asking $155/SF. Both have in-place NNN leases with 3 years remaining. Market rents: Asset A is $18/SF in-place vs $21/SF market; Asset B is $8.50/SF in-place vs $9.25/SF market. Your fund targets a 5.5% stabilized cap rate.",
  data: [
    { label: 'Asset A', value: '120k SF urban infill, 24\' clear, $285/SF ask, $18/SF in-place → $21/SF market' },
    { label: 'Asset B', value: '500k SF big-box, 36\' clear, $155/SF ask, $8.50/SF in-place → $9.25/SF market' },
    { label: 'Lease remaining (both)', value: '3 years' },
    { label: 'Target cap rate', value: '5.5% stabilized' },
    { label: 'Distance to downtown', value: 'Asset A: 4 miles; Asset B: 28 miles' },
  ],
  question:
    'Why does Asset A trade at nearly double the $/SF of Asset B, and how do you evaluate whether each price is justified at your 5.5% target?',
  options: [
    {
      label:
        "Asset A's premium comes from irreplaceable last-mile location — you can't build a 120k SF infill warehouse 4 miles from a dense urban core at a competitive land price. The premium is a function of land scarcity (infill land costs $40-80/SF vs $8-15/SF exurban), limited functional competing supply, and the rent premium last-mile tenants (e-commerce delivery nodes, food distribution) pay for proximity to the consumer. The math: Asset A at $285/SF on $21/SF NNN stabilized = 7.4% yield on cost — above your 5.5% target, implying significant cap-rate compression upside. Asset B at $155/SF on $9.25/SF NNN = 6.0% yield — tighter, reflecting commodity pricing on a spec product. Location scarcity is the source of the $/SF premium; the financial test is stabilized yield on cost vs. target.",
      isBest: true,
      explanation:
        "Right framework. Last-mile industrial is priced on land scarcity and functional irreplaceability, not on building specs. The $/SF premium over big-box reflects: (1) infill land basis multiples (4-6x higher than suburban), (2) supply constraint (you can't build new infill at those prices), (3) tenant premium for proximity (same-day/next-day delivery radius is a hard constraint on location). The financial test — yield on cost vs. target cap rate — is how you convert the location story into a bid decision. Asset A at 7.4% yield on cost vs 5.5% target is deeply favorable; the spread is your execution cushion and cap-compression upside.",
    },
    {
      label:
        "Asset B is the better buy — it has superior specs (36' clear vs 24'), much larger tenant pool, and costs less per SF. Asset A is overpriced for what it is physically.",
      isBest: false,
      explanation:
        "Compares specs without pricing location. Physical specs (clear height, dock doors) determine which *class* of tenant can use the building, but they don't explain the market-clearing rent. Last-mile tenants pay $18-22/SF for infill because consumer proximity is the product they're buying — no amount of clear height at 28 miles out substitutes for being 4 miles from 2 million consumers. Asset A's 24' clear is adequate for parcel, e-commerce, and food distribution. Judging industrial purely on specs misses the location-rent premium entirely.",
    },
    {
      label:
        "Both assets should trade at the same cap rate since they're in the same MSA with similar in-place occupancy.",
      isBest: false,
      explanation:
        "Same MSA ≠ same cap rate. Industrial cap rates bifurcate within an MSA by location type — last-mile infill (4-10 miles from core) typically trades 50-150 bps tighter than big-box exurban in the same market, because the supply constraint and rent durability are structurally different. Big-box is commodity spec product; infill is scar-city-protected. The spread also reflects the rent growth durability: infill rents track consumer density growth, while big-box rents track tenant supply chain optimization (more substitutable).",
    },
    {
      label:
        "Asset A's 24' clear height is functionally obsolete — modern tenants require 32' minimum. The location premium is a theoretical benefit that will be competed away when tenants prefer the newer big-box spec.",
      isBest: false,
      explanation:
        "24' is below the 32'+ modern big-box standard but adequate for last-mile users (e-commerce sortation, food delivery, parcel nodes). The tenant pool is different, not smaller. Last-mile infill users aren't choosing between your 24' urban warehouse and a 36' suburban box — the consumer proximity is non-negotiable for their model. 'Functionally obsolete' is a supply-side view; last-mile tenants buy the address, not the clear height.",
    },
  ],
  takeaway:
    "Last-mile industrial trades at a $/SF premium over big-box because location scarcity drives a structurally different rent premium and supply ceiling. The financial test is stabilized yield on cost vs. target cap rate — that converts the location story into a bid decision. Asset A at $285/SF and $21/SF NNN yields 7.4% unlevered vs. a 5.5% target, implying room for execution risk and cap-compression upside. Big-box is commodity pricing; infill is scar-city pricing — evaluate them on different frameworks.",
  tips: [
    "Last-mile rent premium: urban infill (4-8 mi from core) typically commands 40-80% premium over big-box exurban in the same MSA, driven by tenant proximity requirements.",
    "Industrial cap rate spread (same MSA): infill typically 50-150 bps tighter than big-box exurban; gateway infill can trade 150-300 bps tighter than secondary-market big-box.",
    "Yield on cost = stabilized NOI / total capitalized cost. Compare to target acquisition cap rate to evaluate value creation opportunity.",
  ],
};
