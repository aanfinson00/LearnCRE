import type { SituationalCase } from '../../types/situational';

export const officeNegativeAbsorption: SituationalCase = {
  id: 'office-negative-absorption',
  title: 'Three quarters of negative absorption: do you still underwrite 36-month stabilization?',
  category: 'absorption',
  difficulty: 'advanced',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'office',
  scenario:
    'A CBD Class-B office submarket has posted negative net absorption for three consecutive quarters — roughly (150,000) SF per quarter. Total submarket inventory is 15 million SF, currently 74% leased. You are acquiring a vacant 120,000 SF building for a value-add play at a steep discount. Your LP underwriting shows full stabilization at 92% occupancy in 36 months.',
  data: [
    { label: 'Total inventory', value: '15,000,000 SF' },
    { label: 'Current occupancy', value: '74% → 11,100,000 SF leased' },
    { label: 'Target occupancy', value: '92% of submarket → 13,800,000 SF leased' },
    { label: 'Gap to target (submarket)', value: '2,700,000 SF' },
    { label: 'Trailing quarterly absorption', value: '(150,000) SF — negative' },
    { label: 'Your building', value: '120,000 SF (vacant at acquisition)' },
  ],
  question:
    'Given the submarket data, how should you frame the 36-month stabilization assumption for your LP deck?',
  options: [
    {
      label:
        'The 36-month timeline is very difficult to defend on submarket data alone. At negative (150k) SF/quarter, the market is shrinking — occupied space is declining, not growing. Your building can only lease up if you are specifically outperforming the submarket through below-market rent, a known tenant commitment, or a flight-to-quality story. Without a named demand catalyst, stress to a 48–60 month base case and present 36 months as the upside scenario with explicit assumptions spelled out.',
      isBest: true,
      explanation:
        'Negative net absorption means the submarket is contracting: more space is vacating than being leased. The 2.7M SF gap to 92% submarket occupancy would require absorption to reverse and sustain ~90k SF/quarter for 30 quarters even if it turns positive tomorrow. Your 120k SF building needs specific demand that is not driven by general submarket momentum. Three consecutive quarters of negative absorption signals structural supply/demand imbalance, not a cyclical blip. A catalyst-specific leasing thesis (below-market rent, consolidation play, pending anchor LOI) is required to underwrite sub-48-month stabilization.',
    },
    {
      label:
        '36 months is fine — the submarket is large, and even a small shift in absorption can fill a single building.',
      isBest: false,
      explanation:
        'While true that a large submarket can absorb a small building, that logic fails when absorption is negative: the market is actively shrinking. Your competition for tenants has also increased as existing buildings offer concessions to retain tenants. "Large submarket" is not a substitute for demand momentum.',
    },
    {
      label:
        'Negative absorption is a trailing metric and will mean-revert; no penalty to underwriting is needed.',
      isBest: false,
      explanation:
        'Mean reversion is not guaranteed within a 36-month window, particularly in structural office demand shifts (post-pandemic hybrid work, tech sector contraction). Three quarters of consistent negative absorption is a trend, not noise. You must model what you can defend with observable data, not hope for mean reversion.',
    },
    {
      label:
        'Lower the asking rent aggressively and use the same timeline — price discovery will clear the vacancy.',
      isBest: false,
      explanation:
        'Lower rent may marginally accelerate leasing velocity but does not change the structural demand environment that is producing negative absorption. It also materially reduces NOI and blows up the stabilized cap rate assumption. If rent is cut enough to change the absorption dynamic, the business plan is a different deal — the return profile must be recalculated from scratch.',
    },
  ],
  takeaway:
    'Negative net absorption is a structural warning sign that cannot be dismissed in lease-up underwriting. Three or more consecutive quarters of negative absorption means occupied space is shrinking — tenants are vacating more than they are taking. For any value-add office play in a negative-absorption submarket, present a 36-month stabilization only as an upside scenario with named catalyst assumptions, and build a 48–60 month base case for LP credibility.',
  tips: [
    'Negative absorption means the submarket\'s total leased SF is declining quarter over quarter — not just that vacancy is rising from new supply.',
    'In office, structural drivers (work-from-home, corporate footprint reduction) can keep absorption negative for years — don\'t assume one-cycle mean reversion.',
    'Always identify a specific demand driver: a named tenant LOI, a company consolidating two buildings into one, or a flight-to-quality play with documented cost savings vs. Class A.',
  ],
};
