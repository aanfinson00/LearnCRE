import type { SituationalCase } from '../../types/situational';

export const multifamilyOversupplyAbsorption: SituationalCase = {
  id: 'multifamily-oversupply-absorption',
  title: 'Multifamily submarket with heavy new supply — does your lease-up still pencil?',
  category: 'absorption',
  difficulty: 'advanced',
  roles: ['acquisitions', 'development'],
  assetClass: 'multifamily',
  scenario:
    "You're underwriting a 320-unit Class A multifamily development in a Sun Belt submarket. Your proforma underwrites 18-month lease-up from first unit delivery to 95% stabilized. The submarket currently has 8,400 units in inventory at 94% occupancy. However, the pipeline shows 2,200 units delivering in the next 18 months — five competing projects, all Class A. Your absorption target is ~17 units/month (320 × 95% ÷ 18 months). Market rents in your project have been flat for 2 quarters and 3 of the 5 pipeline projects are offering 2–4 months of free rent to lease up.",
  data: [
    { label: 'Project size', value: '320 units' },
    { label: 'Current submarket inventory', value: '8,400 units at 94% occ' },
    { label: 'Pipeline deliveries (18 months)', value: '2,200 units (5 projects)' },
    { label: 'Required absorption', value: '~17 units/month' },
    { label: 'Market rent trend', value: 'Flat for 2 quarters' },
    { label: 'Concession environment', value: '2–4 months free rent at comps' },
  ],
  question:
    'How does the supply pipeline change your view of the 18-month stabilization underwriting, and what adjustments do you flag?',
  options: [
    {
      label:
        'The 18-month timeline is at meaningful risk — the pipeline adds 26% more units to the submarket and concession pressure signals competing projects are not absorbing at target pace. Extend stabilization to 24–28 months, budget 2–3 months of effective free rent in your lease-up model (reducing effective rent 15–25% below face), and stress-test occupancy at 90% stabilized rather than 95%.',
      isBest: true,
      explanation:
        'Right diagnosis. Adding 2,200 units to an 8,400-unit submarket (26% supply shock) in 18 months is historically correlated with occupancy compression and concession escalation. The fact that three out of five comps are already offering free rent means demand is not keeping pace with supply — projects are trading ADR/effective rent for occupancy. Your 17 units/month target assumes you capture ~8% of submarket demand per month, which is achievable only if demand is healthy. In a concession environment, extend to 24+ months and use net effective rent for modeling.',
    },
    {
      label:
        '94% current occupancy is healthy and confirms the submarket can absorb supply. The 2,200 pipeline units spread across five projects means each project is only ~440 units — no single competitor overwhelms demand.',
      isBest: false,
      explanation:
        'The "spread across five projects" logic is false comfort — all five projects compete for the same local demand pool simultaneously. Concession activity already tells you demand isn\'t meeting supply at face rents; 94% current occupancy is the *pre-delivery* baseline, not the post-delivery reality. The correct question is: can demand absorb 2,520 units (your 320 + the 2,200 pipeline) in 18 months? Flat rent trends + free-rent concessions say no.',
    },
    {
      label:
        'Push stabilization to 36 months and model 88% stabilized occupancy. A 26% supply shock in 18 months is severe and comparable to cycles where occupancy troughed below 90%.',
      isBest: false,
      explanation:
        'Overcorrects without specificity. 36 months and 88% are defensible in a true oversupply scenario but need supporting precedent — the scenario doesn\'t indicate occupancy has historically troughed this low here. 88% stabilized is below typical Class A lender thresholds (usually 90%+), which would impair your loan sizing. The right answer adjusts to 24–28 months and 90% stabilized first; go to 36 months and 88% only if comp data supports it.',
    },
    {
      label:
        'The concession environment is a temporary lease-up tactic, not a structural signal. Once competing projects stabilize, concessions will disappear and your project will benefit from the reduced competition.',
      isBest: false,
      explanation:
        'Free rent and concessions typically persist until the local submarket clears the excess supply — which, at 26% supply injection, could take 2–3 years. "Once comps stabilize" assumes they stabilize quickly, which is exactly what\'s in question. Additionally, your lease-up is happening *simultaneously* with the concession environment, so you\'re competing for tenants against free-rent offers during your most critical lease-up months.',
    },
  ],
  takeaway:
    'Heavy pipeline relative to current inventory is the single most important risk factor in multifamily lease-up underwriting. The concession environment (free rent, reduced deposits, etc.) at competing projects is a real-time signal that face rents are above market-clearing levels. Key adjustments: (1) extend stabilization timeline proportionally to supply shock, (2) model effective rent rather than face rent, (3) stress-test at 90% stabilized occupancy, (4) check lender DSCR sensitivity at stressed occupancy.',
  tips: [
    'Pipeline as % of inventory: <10% = manageable; 10–20% = elevated risk; >20% = significant supply pressure requiring conservative assumptions.',
    'Effective rent = face rent × (1 − free-rent months ÷ lease term). 2 months free on a 12-month lease = effective rent 83% of face.',
    'Concession data from competitors is your leading indicator of actual demand/supply balance — not current occupancy, which reflects pre-delivery leases.',
    'Lenders typically underwrite DSCR on 90% occupancy; if you need 94% to hit 1.25x DSCR, that\'s a red flag for loan sizing.',
  ],
};
