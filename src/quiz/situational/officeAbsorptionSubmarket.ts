import type { SituationalCase } from '../../types/situational';

export const officeAbsorptionSubmarket: SituationalCase = {
  id: 'office-absorption-submarket',
  title: 'Office: two submarkets have identical vacancy — but one will fill faster than the other',
  category: 'absorption',
  difficulty: 'advanced',
  roles: ['acquisitions'],
  assetClass: 'office',
  scenario:
    "You're choosing between two Class-B office acquisitions in the same metro. Both assets have 15% vacancy and similar going-in yields. Submarket A: 8M SF total inventory, 1.2M SF vacant, trailing-12 absorption of 300k SF positive, 200k SF of new supply under construction. Submarket B: 4M SF total inventory, 600k SF vacant, trailing-12 absorption of 50k SF positive, no new supply pipeline.",
  data: [
    { label: 'Both assets', value: '15% vacancy, similar going-in yield' },
    { label: 'Submarket A — inventory', value: '8M SF; 1.2M SF vacant (15%)' },
    { label: 'Submarket A — absorption', value: '+300k SF trailing-12' },
    { label: 'Submarket A — new supply', value: '200k SF under construction' },
    { label: 'Submarket B — inventory', value: '4M SF; 600k SF vacant (15%)' },
    { label: 'Submarket B — absorption', value: '+50k SF trailing-12' },
    { label: 'Submarket B — new supply', value: 'No pipeline' },
  ],
  question: 'Which submarket is likely to absorb its vacancy faster, and why does it matter for your underwriting?',
  options: [
    {
      label:
        'Submarket A fills faster despite higher supply risk. At +300k SF/yr absorption vs 1.2M SF vacant (net of 200k SF new supply = 1.4M to clear), Submarket A clears in ~4.7 years. Submarket B: +50k SF/yr vs 600k SF vacant = 12 years to clear. Submarket A has 6× the absorption velocity — likely driven by stronger demand fundamentals (employment, inbound tenants, lease-up of new product). Even with 200k SF of new supply, Submarket A is a healthier market where occupancy gains are credible in a 5-year hold.',
      isBest: true,
      explanation:
        "Vacancy clearance formula: vacant SF / net absorption = years to equilibrium (ignoring new supply). Submarket A: 1.4M SF (including pipeline) / 300k/yr ≈ 4.7 years. Submarket B: 600k SF / 50k/yr = 12 years. Same vacancy % but radically different absorption engines. Submarket A's 300k SF absorption suggests active employment and tenant demand — the new supply is absorbing into that demand. Submarket B's 50k SF absorption suggests a structurally weak market where vacancy may not clear within a typical hold period. For a 5-year hold, Submarket A's underwriting supports occupancy gains; Submarket B's does not.",
    },
    {
      label:
        'Submarket B fills faster — no new supply means existing vacancy faces no competition, and the smaller total inventory makes it easier for any tenant demand to move the needle.',
      isBest: false,
      explanation:
        "The 'no supply' logic is appealing but wrong here. Submarket B's problem isn't excess supply — it's deficient demand. At 50k SF/yr absorption, it takes 12 years to clear 600k SF of vacancy. The small inventory ($4M SF) means that even modest demand helps, but 50k SF/yr is already factoring in that small inventory. The absence of new supply is a symptom of the problem (developers aren't building because demand is weak), not an advantage.",
    },
    {
      label:
        'Both submarkets have identical vacancy rates, so they should absorb at similar rates — differentiate on price.',
      isBest: false,
      explanation:
        "Vacancy rate is a snapshot; absorption pace is the driver of future occupancy. Same vacancy % with 6× different absorption velocity produces completely different underwriting trajectories. Two assets at 15% vacancy with one clearing in 5 years and the other in 12 years require fundamentally different rent growth assumptions, hold period assumptions, and exit cap rate assumptions. 'Differentiate on price' is the conclusion only after you've done this analysis.",
    },
    {
      label:
        'Submarket A is risky because of the 200k SF new supply — new product will compete with your Class-B asset for tenants.',
      isBest: false,
      explanation:
        "New supply competing with existing Class-B product is a real risk, but in Submarket A, demand (300k SF/yr absorption) is running well ahead of supply (200k SF pipeline). Net demand > net supply = tightening market. The competition risk is real at the tenant level (new Class-A product wins quality tenants) but the market-level vacancy trajectory is improving, which supports your rent and occupancy underwriting.",
    },
  ],
  takeaway:
    "Vacancy rate is a static number; absorption pace is the dynamic driver of where vacancy goes. The correct submarket comparison looks at years to equilibrium (vacant SF / annual absorption), not just the current vacancy percentage. Two submarkets at identical vacancy can have absorption trajectories that diverge by 7+ years depending on underlying demand. For a 5-year hold, only submarkets with absorption pace that supports material occupancy improvement within the hold period are underwriteable for value-add thesis.",
  tips: [
    'Years to equilibrium: vacant SF / net annual absorption. Use this alongside vacancy % to gauge market tightening.',
    "Supply pipeline matters differently depending on whether demand is strong or weak. In strong-demand markets, new supply absorbs quickly. In weak-demand markets, supply risk is lower but demand risk dominates.",
    "Class-B vs Class-A flight-to-quality is a real dynamic: strong absorption in a submarket may be driven by Class-A leasing, leaving Class-B stranded. Segment the absorption data by quality tier when available.",
  ],
};
