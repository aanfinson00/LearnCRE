import type { SituationalCase } from '../../types/situational';

export const closingChecklistSequence: SituationalCase = {
  id: 'closing-checklist-sequence',
  title: 'Closing in 30 days — what\'s the right diligence sequence?',
  category: 'deal-process',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  scenario:
    'You\'ve signed a PSA on a $40M MF acquisition with a 30-day diligence period and a 15-day financing-contingency carveout. The deal team is six people including legal, environmental, financial, and operations diligence streams. The PSA hard-money goes up day 30; loss of all earnest money happens at PSA term plus 5 days for closing.',
  data: [
    { label: 'Diligence period', value: '30 days from PSA signing' },
    { label: 'Financing contingency', value: '+15 day carveout' },
    { label: 'Earnest money', value: '$1M (refundable to day 30, hard after)' },
    { label: 'Team', value: 'Legal + environ + financial + ops + lender' },
  ],
  question: 'How should the diligence work be sequenced across 30 days?',
  options: [
    {
      label:
        'Front-load deal-killers (Phase I environmental, title commitment, financial audit) in days 1-10 so any go/no-go signal hits before earnest is at risk. Days 10-20: legal review of leases, vendor contracts, ALTA survey. Days 20-30: confirmatory diligence (final tour, lender appraisal alignment, pre-closing walkthrough). Lender deliverables run in parallel; financing-contingency carveout protects the back end.',
      isBest: true,
      explanation:
        'Diligence sequencing is risk-driven, not alphabetical. Phase I environmental (~10 day turn), title commitment (3-5 days), and financial audit (one operations cycle) are the THREE most common deal-killers — pull them up so any negative signal hits while earnest is still refundable. Days 10-20 are the document-heavy review phase (leases, vendor contracts, survey). Days 20-30 confirm what you found and align with the lender. Most deals that blow up post-hard-money missed something in the first-10-days bucket because they front-loaded easy work and saved the hard items for later.',
    },
    {
      label: 'Run all diligence streams in parallel from day 1; whichever finishes first dictates the closing schedule.',
      isBest: false,
      explanation:
        'Parallel-everything sounds efficient but ignores cost and earnest exposure. Some deliverables (Phase II environmental if Phase I shows concerns, lender appraisal, structural engineering) cost real money and take weeks. Spinning up all of them on day 1 burns cash before you know if the deal\'s going to clear basic deal-killer signals. Front-load the cheap-but-fatal items first.',
    },
    {
      label: 'Start with legal review of leases and contracts; that\'s where most deals fall apart.',
      isBest: false,
      explanation:
        'Lease review IS critical, but it\'s rarely the same kind of fatal as environmental contamination or a title defect. Lease issues usually reduce the price (re-trade) rather than kill the deal. Environmental and title issues actually kill deals. Sequence the deal-killers first.',
    },
    {
      label: 'Wait for the lender to provide their diligence checklist; align your work to theirs.',
      isBest: false,
      explanation:
        'Buyer diligence and lender diligence overlap but aren\'t identical. Buyer cares about long-term operating risk + value; lender cares about Year-1 collateral value + DS coverage. Aligning entirely to the lender\'s checklist misses items the buyer should investigate (capex deferred maintenance, tenant credit, market trajectory). Run buyer diligence with lender alignment, not lender-led.',
    },
  ],
  takeaway:
    'Diligence sequencing follows risk + cost. Front-load the deal-killers (Phase I environmental, title, financial audit) in the first 10 days so any go/no-go hits while earnest is refundable. Document-heavy review (leases, contracts, survey) in days 10-20. Confirmation + lender alignment days 20-30. Parallel work is fine for items that don\'t depend on each other, but always with the cheap-but-fatal items going first.',
  tips: [
    'Phase I environmental: ~10 day turn, often the longest cheap-but-fatal item.',
    'Title commitment: 3-5 days; flag any encumbrances or title defects ASAP.',
    'Lease review can re-trade price; environmental + title kill deals.',
  ],
};
