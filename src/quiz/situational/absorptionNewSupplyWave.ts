import type { SituationalCase } from '../../types/situational';

export const absorptionNewSupplyWave: SituationalCase = {
  id: 'absorption-new-supply-wave',
  title: "The submarket's delivery pipeline just tripled — how does it change your underwrite?",
  category: 'absorption',
  difficulty: 'advanced',
  roles: ['acquisitions', 'portfolioMgmt'],
  assetClass: 'multifamily',
  scenario:
    "You're underwriting a stabilized 400-unit multifamily acquisition. The submarket has absorbed roughly 600 units per year for the past three years and currently has 3,000 units in inventory at 5% vacancy. Your model assumes flat vacancy and 3.5% annual rent growth. A new CoStar report shows 1,800 units under construction in the submarket, scheduled to deliver over the next 24 months.",
  data: [
    { label: 'Submarket inventory', value: '3,000 units' },
    { label: 'Annual absorption (3-yr avg)', value: '600 units/yr' },
    { label: 'Current vacancy', value: '5%' },
    { label: 'New deliveries (24 months)', value: '1,800 units' },
    { label: 'Model assumptions', value: 'Flat vacancy, 3.5%/yr rent growth' },
  ],
  question: 'How does the pipeline fundamentally change your underwriting?',
  options: [
    {
      label:
        "The pipeline is 3× the annual absorption pace — at 600 units/yr, absorbing 1,800 new units takes 3 years, implying a material vacancy spike during the hold. Flat vacancy and 3.5% rent growth are not simultaneously defensible. Model 10-15% peak vacancy in years 1-2 and flat-to-negative rent growth during the absorption window.",
      isBest: true,
      explanation:
        "Simple supply/demand math: today's vacant units = 5% × 3,000 = 150; add 1,800 new supply = 1,950 units to absorb at 600/yr ≈ 3.25 years to return to 5% vacancy. During that period, vacancy peaks at roughly (1,800 − 2 yrs × 600) / (3,000 + 1,800) ≈ 600 / 4,800 ≈ 12.5% vacancy at the top of the supply wave. Rent growth stalls or reverses during oversupply periods — landlords compete on concessions, not increases. A defensible underwrite: (a) year 1-2 vacancy of 10-15%, (b) rent growth of −2% to 0% in years 1-2, recovering to 2-3% by year 3-4, (c) re-examine the exit cap if the submarket is still absorbing at year 5 exit.",
    },
    {
      label:
        "Supply pipelines often get delayed or cancelled — discount the delivery schedule by 30% and the flat-vacancy assumption holds.",
      isBest: false,
      explanation:
        "A blanket 30% haircut on CoStar's pipeline without supporting analysis is a modeling shortcut, not underwriting. Check each project's status: under construction (foundation poured, vertical framing) has ~85% delivery probability; projects in permitting have ~30-40%. A generic 30% cut may be directionally reasonable for a broad pipeline but needs to be grounded in project-level data, not assumed. Applying it to preserve a flat-vacancy assumption without checking the math is confirmation bias.",
    },
    {
      label:
        "Your 400-unit stabilized asset will outperform — focus on your specific quality position and don't let submarket-level stats distort the deal underwrite.",
      isBest: false,
      explanation:
        "Individual assets can outperform submarkets by 2-3%, but a 12-15% vacancy headwind doesn't disappear with better amenities. Outperformance only changes the magnitude of impact, not its direction. The correct approach: use the submarket analysis as the base underwrite, then argue outperformance with specific supporting data (quality tier differentiation, location premium, in-place long-term leases). Outperformance without a specific mechanism is an unfalsifiable assumption.",
    },
    {
      label:
        "3.5% rent growth will attract more tenants into the submarket and help absorb the new supply.",
      isBest: false,
      explanation:
        "Backwards. Rent growth doesn't create demand — employment, population growth, and household formation do. In an oversupply environment, landlords typically compete by holding or reducing rents, not raising them. 3.5% rent growth in a 12% vacancy market would cause occupancy losses, not supply absorption. Supply gets absorbed when demand catches up, not when rents increase.",
    },
  ],
  takeaway:
    'A supply pipeline 3× the historical absorption pace implies a material vacancy spike and rent growth stall. The quick formula: (new supply + existing vacancy) ÷ annual absorption pace = years to normalize. Flat vacancy and above-trend rent growth cannot coexist with a supply wave of this magnitude — underwrite the oversupply period explicitly before projecting recovery.',
  tips: [
    'Quick formula: (new supply + existing vacancy) ÷ annual absorption pace = years to return to equilibrium.',
    'Check CoStar pipeline by construction stage: under construction ≈ 85% probability; planning/permitting ≈ 30-40%.',
    'Rent growth and new supply are inversely correlated in the short run — never assume both simultaneously.',
  ],
};
