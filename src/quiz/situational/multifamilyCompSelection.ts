import type { SituationalCase } from '../../types/situational';

export const multifamilyCompSelection: SituationalCase = {
  id: 'multifamily-comp-selection',
  title: 'Multifamily: which rent comps belong in your grid?',
  category: 'comp-selection',
  difficulty: 'beginner',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'multifamily',
  scenario:
    "You're underwriting a 200-unit Class-B garden-style multifamily property built in 1992, located in an inner-ring suburb 8 miles from a major CBD. The asset manager asks you to build a rent comp grid to support the underwriting. You pull 5 potential comps from CoStar.",
  data: [
    { label: 'Comp A', value: 'Same submarket, 1988 vintage, Class-B garden, 180 units — $1,450/unit' },
    { label: 'Comp B', value: 'Adjacent submarket (4 mi), 2019 vintage, Class-A midrise, 220 units — $2,100/unit' },
    { label: 'Comp C', value: 'Same submarket, 1995 vintage, Class-B garden, 150 units, recently renovated kitchen/bath — $1,650/unit' },
    { label: 'Comp D', value: 'Same submarket, 1991 vintage, Class-B garden, 200 units — $1,480/unit' },
    { label: 'Comp E', value: 'Same submarket, 2010 vintage, Class-B+ garden, 175 units — $1,710/unit' },
  ],
  question: 'Which comps belong in the grid and what adjustments do they require?',
  options: [
    {
      label:
        'Use Comps A and D as primary (same submarket, similar vintage, Class-B) — average ~$1,465/unit. Include Comp C as a renovated upside comp (+$185/unit renovation premium) and Comp E as a Class-B+ ceiling. Exclude Comp B (wrong asset class — Class-A midrise is a different buyer pool, different renter demographic, different product).',
      isBest: true,
      explanation:
        "Right framework. Comps A and D are the most direct read on unrenovated Class-B garden rents in your submarket — they anchor the as-is rent. Comp C shows the renovation premium: $1,650 − $1,465 = ~$185/unit for kitchen/bath upgrades, which informs your value-add underwriting. Comp E sets the Class-B+ ceiling at $1,710, showing how far rent can stretch with a full renovation and positioning upgrade. Comp B is disqualifying — Class-A midrise attracts a different renter (younger professional, transit-oriented), has amenity packages and finish levels that justify the $2,100, and would overstate the upside potential of a Class-B garden product.",
    },
    {
      label:
        'Average all 5 comps — more data points produce a more accurate market rent estimate.',
      isBest: false,
      explanation:
        "Averaging unfiltered comps ($1,678/unit on all 5) overstates market rents by ~14% vs the right Class-B anchor ($1,465). Including Comp B (Class-A midrise) in a Class-B garden average commits the classic appraisal error: mixing product types that appeal to different renters. More data points are only better if the data is comparable — one well-selected comp is more useful than five mismatched ones.",
    },
    {
      label:
        'Only use the most recent trade comps — vintage has no impact on rents, only location and amenities matter.',
      isBest: false,
      explanation:
        "Vintage is a real rent driver in multifamily. Pre-2000 Class-B product has structural limitations (no in-unit W/D hookups in many cases, smaller unit sizes, dated common areas) that systematically produce lower rents than post-2010 product of similar class. Ignoring vintage leads to an over-optimistic renovation upside projection, because the floor and ceiling are both wrong.",
    },
    {
      label:
        'Use Comp B as the primary comp — it\'s the most recently built and commands the highest rent, showing market strength.',
      isBest: false,
      explanation:
        "Comp B is a different asset class entirely. Using a Class-A midrise rent to underwrite a 1992 Class-B garden property systematically overstates the upside. Even after a full renovation, Class-B garden product in an inner-ring suburb will not trade at Class-A midrise rents because the structural differences (surface parking vs. garage, no concierge, 2–3 story walkups, older unit dimensions) are not bridgeable with renovation dollars.",
    },
  ],
  takeaway:
    "Multifamily comp selection requires matching on three primary axes: (1) submarket — same supply/demand pool; (2) product type — Class-A vs B vs C, and garden vs midrise vs high-rise are fundamentally different products; (3) vintage — pre-2000 vs 2000–2015 vs post-2015 carry different rent ceilings. A renovated comp of the same vintage is more valuable than a newer Class-A comp because it shows the actual renovation premium achievable for your product type.",
  tips: [
    "Renovation premium = renovated Class-B comp rent − unrenovated Class-B comp rent. Typically $100–$250/unit for kitchen/bath; higher in gateway markets.",
    "Class-A comps are only useful as ceiling references — not as primary anchors — for Class-B underwriting.",
    "CoStar 'effective rent' (net of concessions) is more useful than asking rent in soft markets.",
  ],
};
