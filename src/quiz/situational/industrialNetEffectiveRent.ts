import type { SituationalCase } from '../../types/situational';

export const industrialNetEffectiveRent: SituationalCase = {
  id: 'industrial-net-effective-rent',
  title: 'Industrial: which lease proposal is actually better?',
  category: 'lease-econ',
  difficulty: 'intermediate',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'industrial',
  scenario:
    "You're leasing a 100,000 SF warehouse for 7 years. Two proposals are on the table. Tenant A offers a higher headline rent but wants more free rent and TI. Tenant B offers a lower headline rent with lighter concessions. Both are NNN with flat rent and similar credit. Ignore leasing commissions and discounting for the first pass.",
  data: [
    { label: 'Proposal A', value: '$8.00/SF NNN, 4 months free, $3.00/SF TI' },
    { label: 'Proposal B', value: '$7.60/SF NNN, 2 months free, $1.50/SF TI' },
    { label: 'Term', value: '7 years, flat rent' },
    { label: 'Credit', value: 'Comparable' },
  ],
  question: 'Which proposal is better, and why?',
  options: [
    {
      label:
        "Proposal B. The net effective rents are nearly identical ($7.19 vs $7.21/SF), but B puts about $2.77/SF ($277,000) of rent and TI at risk up front, against about $5.67/SF ($567,000) for A. Same return, less capital out the door.",
      isBest: true,
      explanation:
        "A: $8.00 × 7 = $56.00, less 4 months of free rent ($2.67) and $3.00 TI = $50.33, or $7.19/SF/yr. B: $7.60 × 7 = $53.20, less 2 months free ($1.27) and $1.50 TI = $50.43, or $7.20/SF/yr. The undiscounted economics are a wash, and concessions are front-loaded, so A's extra $2.90/SF of upfront cost is the tiebreaker. Add a discount rate and a commission on gross rent and B's advantage widens.",
    },
    {
      label:
        "Proposal A, because $8.00 is 5% higher than $7.60 and the headline rent will support a higher valuation.",
      isBest: false,
      explanation:
        "Headline rent is the number that gets marketed, but cash flow is what you collect. After concessions A's net effective rent is no better than B's. A buyer valuing the building on in-place rent may give credit for the higher face rate, but the owner funds the extra TI and free rent either way.",
    },
    {
      label:
        "Proposal A, because a bigger TI allowance means the tenant is more invested and less likely to leave.",
      isBest: false,
      explanation:
        "Tenant stickiness comes from the tenant's own build-out spend, relocation cost and operational fit, not from the landlord's allowance. A larger allowance is simply landlord capital that is returned over a seven-year term. It does not buy retention by itself.",
    },
    {
      label:
        "Neither can be compared until you know the tenants' exact start dates.",
      isBest: false,
      explanation:
        "Start dates would shift cash flow timing, but the proposals share a term and structure, so net effective rent and upfront capital already separate them. Waiting for more data defers a decision that the available terms support.",
    },
  ],
  takeaway:
    "Compare leases on net effective rent and on how much capital goes out the door first. When net effective rents tie, the proposal with less front-loaded concession wins.",
  tips: [
    "Net effective rent = (total rent − free rent − TI) ÷ term.",
    "Concessions are paid up front, while higher rent arrives over time.",
    "Rank proposals by net effective rent, then by capital at risk.",
  ],
};
