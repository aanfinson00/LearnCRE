import type { SituationalCase } from '../../types/situational';

export const absorptionSubleaseOverhang: SituationalCase = {
  id: 'absorption-sublease-overhang',
  title: 'Does sublease space count against absorption?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'office',
  scenario:
    'A downtown office submarket has 2M SF of direct vacant space and an additional 800K SF of sublease space that recently hit the market after two large tenants shed floors. The submarket has been absorbing 80K SF per quarter on a direct basis. Sublease rents are averaging 15–20% below direct asking rents. You are underwriting a value-add office acquisition that requires the submarket to hit 90% occupancy in 3 years to support your exit.',
  data: [
    { label: 'Total inventory', value: '12M SF' },
    { label: 'Direct vacancy', value: '2.0M SF (16.7%)' },
    { label: 'Sublease availability', value: '0.8M SF' },
    { label: 'Total availability', value: '22.5% (direct + sublease)' },
    { label: 'Direct absorption pace', value: '80K SF/quarter' },
    { label: 'Sublease rent discount', value: '15–20% below direct' },
    { label: 'Target occupancy', value: '90% (direct)' },
  ],
  question:
    'How does the sublease overhang affect your absorption timeline underwriting?',
  options: [
    {
      label:
        "Sublease space competes directly with your building for the same tenant demand, so it effectively extends the lease-up timeline — you need to absorb the sublease shadow supply first before direct rents recover. Underwrite an additional 6–12 months relative to a direct-only vacancy analysis, and stress your exit cap wider by 25–50 bps.",
      isBest: true,
      explanation:
        "Sublease space and direct space compete for the same tenant demand. Tenants often prefer sublease because of lower rents and plug-and-play buildouts — so sublease absorbs first, delaying direct absorption. 800K SF at 80K SF/quarter = ~10 quarters (2.5 years) just for the sublease shadow supply to clear, before direct vacancy meaningfully tightens. That blows past a 3-year exit thesis unless absorption accelerates. The professional move is to extend the timeline, widen the exit cap for uncertainty, and confirm whether any of the sublease space competes with YOUR building's floor plates specifically.",
    },
    {
      label:
        "Ignore sublease — it doesn't appear in direct vacancy stats, so it doesn't count against your underwriting. Run the absorption analysis on direct vacancy only.",
      isBest: false,
      explanation:
        "Classic mistake. Sublease space competes for the same tenant demand whether or not it shows up in direct vacancy. If a tenant signs sublease space in a competing building, that demand never materializes for you. Running absorption off direct vacancy alone gives a false picture of how quickly rents and occupancy will recover. It's also why reporting agencies publish 'availability' (direct + sublease) alongside vacancy.",
    },
    {
      label:
        'Count sublease space at 50% of direct vacancy — it absorbs at about half the rate since tenants don\'t prefer it.',
      isBest: false,
      explanation:
        'Actually inverted. In a tenant-favorable market, sublease often absorbs FASTER than direct because rents are 15–20% below market and the space is ready-to-go. The 50% haircut has no empirical basis. The correct framework is to model sublease as competing supply that soaks up demand before direct space tightens — not as a second-tier demand sink.',
    },
    {
      label:
        'Ask the broker how much of the sublease was subleased by investment-grade tenants — only that portion matters for your underwriting.',
      isBest: false,
      explanation:
        'Tenant credit behind the sublease is a secondary question. What matters for your absorption underwriting is whether the *space itself* competes with yours for tenants. A creditworthy sublandlord means the sublandlord can perform on the master lease even if the sublease goes dark — but from a market demand perspective, the 800K SF is competing regardless of who signed the original lease.',
    },
  ],
  takeaway:
    "Sublease availability is shadow supply that competes with direct vacancy for the same pool of tenants. In markets with heavy sublease overhang, always run absorption off total availability (direct + sublease), not just direct vacancy. Sublease typically absorbs first (lower rents, plug-and-play), so the direct vacancy correction often lags the sublease clearance by 2–4 quarters. An exit thesis that ignores sublease will overestimate the speed of rent recovery and occupancy stabilization.",
  tips: [
    'Quote availability (direct + sublease) as the honest availability rate; vacancy (direct only) flatters the picture.',
    'When sublease discount exceeds 20%, it becomes the marginal price-setter — direct rents cannot recover until sublease clears.',
    'Track the weighted-average remaining term on sublease space: short-term sublease burns off faster and may release some subtenants back to the direct market.',
  ],
};
