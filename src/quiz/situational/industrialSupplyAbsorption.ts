import type { SituationalCase } from '../../types/situational';

export const industrialSupplyAbsorption: SituationalCase = {
  id: 'industrial-supply-absorption',
  title: 'Industrial: how long to clear a spec-supply wave?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'development'],
  assetClass: 'industrial',
  scenario:
    "You're evaluating a spec industrial development in a Sunbelt distribution submarket. The broker's OM notes the submarket is currently 94% leased on 80M SF of existing inventory. Four new spec buildings totaling 6M SF are under construction, all delivering in the next 12 months with no pre-leasing. Net absorption over the prior four quarters averaged 1.5M SF/quarter. You need the submarket to hold above 90% occupancy for your lender's debt yield test to pass.",
  data: [
    { label: 'Existing inventory', value: '80M SF' },
    { label: 'Existing occupancy', value: '94%' },
    { label: 'New spec deliveries (12 mos)', value: '6M SF — no pre-leasing' },
    { label: 'Net absorption (trailing 4Q avg)', value: '1.5M SF/quarter' },
    { label: 'Lender occupancy floor', value: '90%' },
  ],
  question:
    'Based on these numbers, will the submarket stay above 90% occupancy through the delivery wave — and what is the single biggest risk to that assumption?',
  options: [
    {
      label:
        'The math is borderline: deliveries add 7.5% to inventory on a base that's already 6M SF vacant. At 1.5M SF/quarter absorption, the 4Q delivery window adds net 6M SF of supply against 6M SF of absorption — which keeps occupancy roughly flat at 93–94%, above the 90% floor. But the single biggest risk is absorption decelerating if any large tenants pause expansion decisions.',
      isBest: true,
      explanation:
        'Start from the combined picture: post-delivery inventory = 86M SF. Current vacancy = 80M × 6% = 4.8M SF. New vacant supply = 6M SF pre-leased = 6M SF. Total vacancy to clear = 10.8M SF. To stay above 90% you need to hold vacancy below 8.6M SF (86M × 10%). At 1.5M SF/quarter absorption, 4 quarters = 6M SF absorbed — net vacancy falls from 10.8M to 4.8M, which is 5.6% of 86M SF, or 94.4% occupancy. The floor holds IF absorption stays at trend. The risk: trailing absorption reflects a tighter supply environment; once 6M SF of spec delivers simultaneously, effective demand per square foot of new vacant space is thinner, and any macro softening hits oversupplied submarkets first.',
    },
    {
      label:
        'The submarket will blow through 90% — 6M SF of absorption in a year is easy when 1.5M SF/quarter is trending.',
      isBest: false,
      explanation:
        "This ignores that 6M SF is the absorption needed just to absorb the new supply — the existing 4.8M SF of vacancy also needs clearing to stay above 90%. The denominator also changes: 86M SF base means 90% threshold is 7.74M SF of vacancy, not the same as on the 80M SF base. Flat-absorbing 6M SF of new supply against 10.8M SF of total vacancy still leaves 4.8M SF unabsorbed, which on the new base works out fine — but the problem is framed as if it's easy when it's actually right at the margin.",
    },
    {
      label:
        'The submarket will fall below 90% — 6M SF of simultaneous deliveries always overwhelms trailing absorption.',
      isBest: false,
      explanation:
        'Not necessarily. The absorption math shows the submarket can stay above 90% if trailing demand holds. The flaw is assuming simultaneous delivery is always fatal — in strong Sunbelt distribution corridors with active e-commerce demand, 6M SF/year is sometimes absorbed in 6–8 months. The accurate answer quantifies the scenario, not the direction.',
    },
    {
      label:
        'The 90% floor is irrelevant because industrial lenders use debt yield, not occupancy, as the binding test.',
      isBest: false,
      explanation:
        "Partially correct that debt yield (NOI / loan amount) is lender-preferred, but the lender's occupancy floor in this prompt is explicit. More importantly, occupancy drives NOI: at 90% vs 94%, NOI per SF drops significantly if that vacancy represents unleased space with no rent. Understanding the absorption picture is required to model the NOI forward, regardless of which metric the lender headlines.",
    },
  ],
  takeaway:
    'Industrial absorption math follows the same formula as multifamily: (target vacancy at goal occupancy − current vacancy − new supply) ÷ quarterly absorption rate. The key variable most analysts miss is that the denominator (total inventory) changes when deliveries hit. Model both existing vacancy and new supply against the revised base, then stress absorption pace to see where the floor breaks.',
  tips: [
    'Net absorption = (occupancy × inventory at end of period) − (occupancy × inventory at start of period).',
    'Spec deliveries without pre-leasing add directly to vacant supply — pre-leased deliveries count toward absorption from day one.',
    'Submarket occupancy < 90% is typically when landlords shift from rent-growth to retention mode — underwriting should flag this transition.',
  ],
};
