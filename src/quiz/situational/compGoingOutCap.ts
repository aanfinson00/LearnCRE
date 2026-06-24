import type { SituationalCase } from '../../types/situational';

export const compGoingOutCap: SituationalCase = {
  id: 'comp-going-out-cap',
  title: 'Using today\'s comp trades as your exit cap — where\'s the flaw?',
  category: 'comp-selection',
  difficulty: 'advanced',
  roles: ['acquisitions'],
  assetClass: 'mixed',
  scenario:
    'You\'re underwriting a 5-year hold on a multifamily deal. Current comp trades in the submarket are printing at a 4.5% cap rate. Your associate models the exit cap at 4.5% — matching today\'s comps — to "stay in the market." The going-in cap is 4.25%. The LP investment memo goes to IC next week.',
  data: [
    { label: 'Going-in cap', value: '4.25%' },
    { label: 'Current submarket comp trades', value: '4.5%' },
    { label: 'Associate modeled exit cap', value: '4.5% (matches comps)' },
    { label: 'Hold period', value: '5 years' },
    { label: 'Current 10-yr Treasury', value: '4.25%' },
  ],
  question: 'What is the problem with modeling the exit at today\'s comp cap rate?',
  options: [
    {
      label:
        'Today\'s comps tell you where the market is NOW, not where it will be in 5 years. Using current comps as the exit assumption ignores the rate environment, cap rate cycle, and the asset\'s aging. Any deal underwritten at going-in cap = exit cap is effectively assuming a perfect hold with no adverse macro movement.',
      isBest: true,
      explanation:
        'Exit cap selection is a forward projection problem, not a market-observation problem. Using today\'s comps for the Year 5 exit conflates current pricing with future pricing in a way that systematically understates risk. Three structural issues: (1) Rate path: if the 10-year treasury at exit is 100 bps above today\'s level, cap rates will be roughly 50–100 bps wider. (2) Asset aging: a 5-year-old building is worth incrementally less to a buyer (near-term capex, older mechanicals). (3) Cap rate mean-reversion: when going-in cap is already near the historical floor (4.25%), the base case expectation should be modest widening, not stability. Exit cap at or below today\'s comp set is a return-padding assumption that IC should challenge.',
    },
    {
      label:
        'Using market comps is the correct methodology — it\'s more defensible than assuming cap compression or expansion.',
      isBest: false,
      explanation:
        'Defensible does not equal accurate. A market-comp-matched exit cap is easily challenged by anyone who asks "what if the 10-year moves 100 bps over 5 years?" Because the answer to that question produces a materially worse IRR, the market-comp-exit model is hiding a large sensitivity, not removing it. IC-level underwriting requires a stress test on the exit cap — usually +50 to +100 bps — and the model should show the IRR impact.',
    },
    {
      label:
        'The exit cap should always be the going-in cap plus 25 bps — that\'s the industry standard for a 5-year hold.',
      isBest: false,
      explanation:
        '+25 bps is a common rule of thumb in stable rate environments, not a universal standard. In rising-rate environments (where today\'s cap rate is artificially compressed by a low Treasury), +25 bps likely understates the risk. The correct framework is to model the exit cap as: current cap-to-Treasury spread × expected 5-year Treasury, then determine whether +25 / +50 / +100 bps is the right range given the rate path assumption. Rules of thumb need to be calibrated to the rate environment.',
    },
    {
      label:
        'The associate should compress the exit cap below today\'s comps to reflect rent growth improving the asset\'s quality.',
      isBest: false,
      explanation:
        'Rent growth is already captured in the NOI growth assumptions (Year 5 NOI is higher than Year 1), which drives the numerator of value. Simultaneously compressing the exit cap captures the same rent growth in the denominator — double-counting the benefit. Exit cap compression (below entry) should only be modeled if there is a structural reason the asset is worth more to the next buyer on a risk-adjusted basis (lease-up completion, capex invested, repositioning complete). In a stabilized hold, the default is flat or slight widening.',
    },
  ],
  takeaway:
    'Exit cap = today\'s comp is a return-padding assumption, not a market-neutral one. The exit cap should reflect the expected rate environment at the time of sale, the asset\'s age-adjusted risk profile, and a realistic view of where the cap-to-treasury spread will settle. IC-level underwriting should always stress the exit cap +50 to +100 bps and show the IRR sensitivity as part of the base case.',
  tips: [
    'Exit cap ≤ going-in cap (cap compression exit) should be reserved for assets completing a value-add or lease-up.',
    'A reasonable starting point: exit cap = going-in + (expected 5yr Treasury change × cap-to-Treasury beta).',
    'Show the IRR at exit cap +0, +50, and +100 bps in every IC memo — the range reveals the exit-cap risk.',
  ],
};
