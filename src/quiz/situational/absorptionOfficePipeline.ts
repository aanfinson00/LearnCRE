import type { SituationalCase } from '../../types/situational';

export const absorptionOfficePipeline: SituationalCase = {
  id: 'absorption-office-pipeline',
  title: 'Does the pipeline threaten your office lease-up?',
  category: 'absorption',
  difficulty: 'advanced',
  roles: ['acquisitions', 'development'],
  assetClass: 'office',
  scenario:
    "You're acquiring a 150,000 SF suburban Class-B office building at 78% leased ($28/SF NNN). The submarket has 800,000 SF of existing vacancy and 120,000 SF of new Class-A construction delivering within 18 months. Historical submarket absorption runs 60,000–80,000 SF/year. You're underwriting to 92% leased in 36 months at $30/SF.",
  data: [
    { label: 'Submarket existing vacancy', value: '800,000 SF' },
    { label: 'New Class-A pipeline (18 mo)', value: '+120,000 SF' },
    { label: 'Submarket absorption', value: '60,000–80,000 SF/yr' },
    { label: 'Subject current occupancy', value: '78% (33,000 SF vacant)' },
    { label: 'Underwriting assumption', value: '92% leased + $30/SF in 36 months' },
  ],
  question: 'Is the 92% / 36-month stabilization assumption internally consistent with submarket conditions?',
  options: [
    {
      label: "No — total submarket supply (920,000 SF) takes 13+ years to clear at current absorption. Projecting occupancy growth AND rent growth for a Class-B asset while Class-A delivers is internally inconsistent. Class B competing against Class A in oversupply typically concedes rent, not grows it.",
      isBest: true,
      explanation:
        "Total supply: 800,000 + 120,000 = 920,000 SF. At 70,000 SF/yr, clearing takes ~13 years. For the subject to reach 92% in 36 months it must capture 33,000 SF of net absorption against that backdrop — a market-share bet that requires explanation. Simultaneously projecting $28→$30/SF rent growth means winning on quality and price, unlikely when new Class-A is delivering nearby. The two projections (occupancy recovery + rent growth) need separate justification or they're contradictory in an oversupplied submarket.",
    },
    {
      label: "Yes — the subject only needs 21,000 SF net absorbed into it, which is achievable even in a soft market.",
      isBest: false,
      explanation:
        "Narrowing the frame to '21,000 SF' ignores competition for the same demand pool. Those 21,000 SF must come from tenants who are also being courted by 920,000 SF of competing space. Capturing that share requires an explicit 'why us' thesis — location, price, amenities — that isn't supported by simply noting the required amount is small.",
    },
    {
      label: "Pipeline only matters if the new Class-A buildings are in the exact same node as the subject.",
      isBest: false,
      explanation:
        "Submarket-wide vacancy levels compress rents across nodes, not just near new deliveries. Even if the Class-A product is 2 miles away, landlords competing for the same tenant pool (corporate tenants, professional services) adjust asking rents downward when alternatives exist. Node proximity affects the intensity of direct competition; it doesn't determine whether competition exists at all.",
    },
    {
      label: "Forward broker guidance trumps historical absorption data — use the broker's leasing velocity estimate.",
      isBest: false,
      explanation:
        "Broker guidance is forward-looking but incentivized to support the transaction. Historical absorption gives an observable baseline for how much space the market has actually cleared — the rational anchor for stress-testing forward assumptions. Starting with broker projections and ignoring historical context is how optimistic proformas get written and underperform.",
    },
  ],
  takeaway:
    "Office underwriting must compare lease-up assumptions against total submarket supply, not just the space you need to fill. Projecting simultaneous occupancy and rent growth in an oversupplied market requires an explicit competitive advantage thesis. Use historical absorption as the sanity-check floor; treat broker projections as the upside case.",
  tips: [
    "Total supply = existing vacancy + pipeline deliveries within the underwriting window.",
    "Class-B vs. Class-A in oversupply: typically concede rent, not grow it, to win tenants.",
    "Occupancy growth + rent growth together in an oversupplied market is a double-bullish bet.",
  ],
};
