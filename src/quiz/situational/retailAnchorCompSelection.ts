import type { SituationalCase } from '../../types/situational';

export const retailAnchorCompSelection: SituationalCase = {
  id: 'retail-anchor-comp-selection',
  title: 'Which comps price a grocery-anchored center?',
  category: 'comp-selection',
  scenario: 'You are pricing a 95,000 SF grocery-anchored neighborhood center with a 12-year remaining lease to a national grocer. Your analyst pulled three sales comps: a 400,000 SF power center anchored by big-box users, an unanchored strip center, and a 100,000 SF grocery-anchored center two miles away with a 9-year grocer lease.',
  data: [
    {
      label: 'Subject',
      value: '95,000 SF grocery-anchored'
    },
    {
      label: 'Anchor lease remaining',
      value: '12 years'
    },
    {
      label: 'Comp A',
      value: '400K SF power center'
    },
    {
      label: 'Comp B',
      value: 'Unanchored strip'
    },
    {
      label: 'Comp C',
      value: '100K SF grocery-anchored, 9-yr lease'
    }
  ],
  question: 'How should you use these comps?',
  options: [
    {
      label: 'Lead with Comp C and adjust for lease term; use A and B only as outer bounds.',
      isBest: true,
      explanation: 'Comp C matches the income driver that sets the cap rate — a grocer-anchored, necessity-based center in the same trade area. Adjust for the 3-year shorter anchor term (roughly a modest cap-rate give-up). A and B have different tenant mix, credit, and demand drivers and are only directional.'
    },
    {
      label: 'Average all three to get a market cap rate.',
      isBest: false,
      explanation: 'Averaging dissimilar products hides risk differences. Power centers and unanchored strips trade on different drivers than a grocer-anchored center.'
    },
    {
      label: 'Use the power center, since it has the most NOI and the most data.',
      isBest: false,
      explanation: 'Size and data volume do not make a comp relevant. Big-box power centers carry different credit and re-tenanting risk.'
    },
    {
      label: 'Use the unanchored strip, since it is the most conservative.',
      isBest: false,
      explanation: 'Conservatism by choosing a bad comp is just a mispricing. You would overstate the cap rate and lose the deal for the wrong reason.'
    }
  ],
  takeaway: 'A comp should share the characteristic that drives value. In retail the anchor — its credit, category, and remaining term — usually matters more than size or location alone.',
  tips: [
    'Match on the income driver first, then size and location.',
    'Adjust for lease term and anchor credit explicitly.',
    'Use dissimilar comps only as bounds.'
  ],
  difficulty: 'intermediate',
  assetClass: 'retail',
  roles: [
    'acquisitions',
    'portfolioMgmt'
  ]
};
