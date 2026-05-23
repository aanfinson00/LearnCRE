import type { SituationalCase } from '../../types/situational';

export const absorptionIndustrialDeliveries: SituationalCase = {
  id: 'absorption-industrial-deliveries',
  title: 'New supply is eating your lease-up runway',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'development'],
  assetClass: 'industrial',
  scenario:
    'You are evaluating a 300,000 SF speculative industrial building in a Sunbelt distribution submarket. The building just delivered vacant. Submarket net absorption has averaged 1.2M SF per year over the trailing three years. However, 3.5M SF of new industrial supply is in the pipeline across 8 competing buildings, all expected to deliver over the next 18 months. Your pro forma assumes the subject stabilizes at 95% leased in 18 months.',
  data: [
    { label: 'Subject SF', value: '300,000 SF (vacant at delivery)' },
    { label: 'Submarket annual absorption', value: '1.2M SF/yr' },
    { label: 'Pipeline deliveries', value: '3.5M SF over 18 months' },
    { label: 'Pro forma stabilization target', value: '18 months at 95%' },
    { label: 'Competing new buildings', value: '8 additional properties' },
  ],
  question: 'How should the pipeline supply change your stabilization underwriting?',
  options: [
    {
      label: 'The pipeline significantly extends your lease-up runway. With 3.5M SF delivering against ~1.8M SF of 18-month demand capacity, the submarket is likely oversupplied — push stabilization to 24–30 months in your base case and stress-test at 36.',
      isBest: true,
      explanation:
        '1.2M SF/yr absorption equals 1.8M SF of demand capacity over 18 months. But 3.5M SF of new supply — plus your 300k SF — hits the submarket in that same window. Net supply surplus: 3.8M SF deliveries minus 1.8M SF demand = 2.0M SF more space than the market can absorb in 18 months. Your building competes with 8 other new buildings for the same tenants. Even if demand holds at historical pace, systematic oversupply means higher vacancy, longer lease-up tails, and concession escalation. Conservative underwriting pushes stabilization to 24–30 months and stress-tests at 36+ months.',
    },
    {
      label: 'Stick with 18 months — 1.2M SF/yr is the absorption pace and 300,000 SF is only 25% of that annual demand.',
      isBest: false,
      explanation:
        'Uses total demand without accounting for competing supply. The relevant question is not "can the submarket absorb 300k SF?" but "can the submarket absorb 3.8M SF in 18 months?" With 3.5M SF of competing pipeline, every building slows down. Your 300k SF does not get first-mover advantage over the other 3.2M SF delivering simultaneously.',
    },
    {
      label: 'Reduce your stabilization target from 95% to 85% — that closes the absorption gap and is still a reasonable benchmark.',
      isBest: false,
      explanation:
        'Reducing the occupancy target avoids the real problem without solving it. Lenders and institutional buyers use 95% as the stabilized benchmark. A building underwritten to 85% occupancy faces cap rate haircuts, refinancing difficulty, and a persistent rent disadvantage against fully-leased comps. The right variable to stress is time, not occupancy definition.',
    },
    {
      label: 'Pipeline does not matter for your building specifically — tenants choose based on specs, not submarket supply conditions.',
      isBest: false,
      explanation:
        'Overstates differentiation in a commodity-driven market. Industrial tenants prioritize location, clear height, dock ratio, and truck court depth — but so do the 8 competing buildings. In an oversupplied submarket, tenants gain negotiating leverage and extract higher concessions: free rent, above-market TI, or lower face rent. Your building\'s specs are table stakes, not an immunity to supply conditions.',
    },
  ],
  takeaway:
    'Stabilization timing is a function of demand relative to ALL new supply in the submarket — not just your building\'s share of demand. When pipeline deliveries meaningfully exceed absorption capacity over the same horizon, every building\'s lease-up slows and concessions rise. Always measure net supply (pipeline deliveries minus expected demand) over the same horizon as your stabilization assumption.',
  tips: [
    'Net supply surplus = pipeline deliveries over the hold − historical absorption over the same period; negative means demand-constrained, positive means supply-constrained.',
    'Oversupply does not just slow lease-up — it depresses effective rents as landlords compete on concessions to win tenants.',
    'Stress-test at 1.5× and 2× your base stabilization timeline when the pipeline-to-absorption ratio exceeds 1.5×.',
  ],
};
