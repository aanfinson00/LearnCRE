import type { SituationalCase } from '../../types/situational';

export const retailOccupancyCostRatio: SituationalCase = {
  id: 'retail-occupancy-cost-ratio',
  title: 'Retail: tenant occupancy cost ratio is 14% — what does this tell you?',
  category: 'diagnostic',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'retail',
  scenario:
    "You're underwriting a 25,000 SF strip center anchored by a regional fitness studio (8,000 SF) that has 5 years remaining on its lease. The fitness studio pays $28/SF in base rent plus $8/SF in NNN recoveries ($36/SF all-in). The tenant's most recent sales report shows $2.6M in annual gross revenue from this location.",
  data: [
    { label: 'Tenant type', value: 'Regional fitness studio (8,000 SF)' },
    { label: 'Base rent', value: '$28/SF' },
    { label: 'NNN recoveries', value: '$8/SF' },
    { label: 'Total occupancy cost', value: '$36/SF ($288k/yr)' },
    { label: 'Tenant annual gross revenue', value: '$2.6M' },
    { label: 'Remaining lease term', value: '5 years' },
  ],
  question: 'What does the occupancy cost ratio tell you about renewal risk, and how does it affect your underwriting?',
  options: [
    {
      label:
        "Occupancy cost ratio = $288k / $2.6M = 11.1%. For fitness/experiential retail, the healthy range is 10–15%, so this tenant is at the lower end of stress — workable but not comfortable. The renewal risk is moderate: if sales don't grow, any rent increase at renewal pushes them into the 15–18% range where renewals stall. Underwrite with a conservative renewal assumption: assume flat rent (no growth) at renewal, model 12 months of downtime risk, and cap value off base + recoveries at a wider cap rate than your anchor tenants.",
      isBest: true,
      explanation:
        "Occupancy cost ratio (OCR) is the most direct measure of lease sustainability for a specific tenant. The formula is total occupancy cost ÷ tenant sales. For fitness studios, the sustainable range is generally 10–15% (higher than traditional retail's 5–10% because fitness draws repeat visits with lower per-visit spend). At 11.1%, the tenant is paying a meaningful portion of revenue in rent — functional but with limited headroom. The renewal risk framing: at lease rollover in 5 years, if base rent increases by even $3/SF (to $31/SF), OCR jumps to ~12.4% assuming flat sales. If sales decline at all (fitness is consumer discretionary), the OCR rapidly approaches the threshold where operators choose to downsize or relocate. Model the renewal conservatively, not at full rent growth.",
    },
    {
      label:
        "14% OCR is too high — this tenant is almost certainly going to close before the lease expires. Mark the space as vacant in your underwriting.",
      isBest: false,
      explanation:
        "14% would be the upper bound of concern for traditional retail (grocery: 3–5%, apparel: 8–12%). For fitness/experiential retail, 11% is within the sustainable operating range. Marking the space as vacant when the tenant is paying rent and has 5 years remaining is overly punitive without specific evidence of distress (declining comp-set closures, deteriorating review scores, visible membership attrition). OCR flags renewal risk, not imminent default.",
    },
    {
      label:
        "The OCR is irrelevant — fitness is a traffic driver, not a revenue generator for the landlord, so tenant economics don't matter for underwriting.",
      isBest: false,
      explanation:
        "Tenant economics directly determine whether the tenant renews, extends, or walks at lease expiration. A fitness studio paying 11% OCR is economically fragile; its traffic contribution doesn't matter if it can't afford the rent at renewal. Both factors are important: the tenant as a traffic anchor (which affects adjacent tenant renewals and cap rates) AND the tenant's ability to sustain rent payments. Dismissing OCR ignores one of the two variables.",
    },
    {
      label:
        "The OCR is fine — the tenant is growing sales in fitness (industry is up 15% post-pandemic) so the ratio will naturally improve.",
      isBest: false,
      explanation:
        "Industry-level trends don't determine individual tenant performance. Sales reports show this location at $2.6M; you'd need to know whether sales are growing or declining at this specific store to project OCR improvement. Anchoring to industry growth without location-specific data is a common acquisition analysis mistake. If sales ARE growing at this location, model the OCR improvement explicitly — don't assume it.",
    },
  ],
  takeaway:
    "Occupancy cost ratio is the tenant-level sustainability test every retail underwriter should run. OCR = total occupancy cost (base rent + NNN recoveries) ÷ tenant gross sales. Healthy ranges vary by retail category: grocery 3–5%, QSR 5–8%, apparel 8–12%, fitness/experiential 10–15%. Above the sustainable range, tenants exercise downsize or relocation options at renewal. Always pull the sales report, compute the OCR, and model renewal probability accordingly.",
  tips: [
    'OCR sustainable ranges: grocery 3–5% · QSR/food service 5–8% · apparel 8–12% · fitness/experiential 10–15%.',
    'OCR > 15% for most categories = renewal at current rent is unlikely; budget TIs and downtime for the rollover.',
    'Ask for 3 years of sales history, not just the most recent year — trend matters more than the point-in-time figure.',
  ],
};
