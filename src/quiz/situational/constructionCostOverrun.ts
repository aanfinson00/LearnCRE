import type { SituationalCase } from '../../types/situational';

export const constructionCostOverrun: SituationalCase = {
  id: 'construction-cost-overrun',
  title: 'A $2M cost overrun on a development — where does the money come from?',
  category: 'deal-process',
  difficulty: 'intermediate',
  roles: ['development', 'assetManagement', 'mortgageUw'],
  scenario:
    'You\'re developing a 200-unit MF building. Original TPC was $50M with a 5% ($2.5M) hard-cost contingency. You\'re 80% through construction; the GC has identified $2M of additional costs (foundation issues + steel price spike). Your construction loan is at the 65% LTC ceiling. You\'ve already drawn 70% of the loan.',
  data: [
    { label: 'Original TPC', value: '$50M' },
    { label: 'Hard cost contingency', value: '$2.5M (5%)' },
    { label: 'Cost overrun identified', value: '$2M' },
    { label: 'Construction completion', value: '80%' },
    { label: 'Loan LTC ceiling', value: '65%' },
    { label: 'Loan drawn to date', value: '70% (of approved)' },
  ],
  question: 'Where does the $2M come from?',
  options: [
    {
      label:
        'Tap the contingency reserve first ($2.5M available > $2M overrun, so contingency covers it). Document the draw with the lender; bank may want to see the cause + a revised forecast for remaining costs. No additional capital call needed.',
      isBest: true,
      explanation:
        'Contingency reserves exist exactly for this. $2M of overrun against $2.5M of available contingency is fully absorbed; you\'d still have $500k of remaining cushion for the last 20% of the build. Lender will want documentation (cause of overrun, revised cost-to-complete) before releasing the next draw, but no equity top-up is needed. Contingency is the first place you go for cost overruns; the second place is more equity; the third place (rare) is increased loan size if LTC has room.',
    },
    {
      label: 'Skip the contingency (save it for the unknown unknowns later) and call additional equity from the LPs to fund the $2M.',
      isBest: false,
      explanation:
        'Leaves contingency unused while burning equity. The contingency was budgeted for exactly these scenarios — it\'s "spent budget" not "saved budget." Calling extra equity when contingency is sitting unused doesn\'t protect the LPs; it just front-loads their capital. Use contingency first, then assess whether residual cushion is enough for the remaining build.',
    },
    {
      label: 'Negotiate a loan modification to raise LTC from 65% to 70% and use the additional debt capacity to fund the $2M.',
      isBest: false,
      explanation:
        'Possible but expensive and slow. Loan mods require committee approval, appraisal updates, fee payments, and time you don\'t have during active construction. Lender will also re-test debt yield and DSCR at the new loan amount. Tap contingency first; mods are a last resort if both contingency and equity top-up fail.',
    },
    {
      label: 'Have the GC absorb the overrun under their guaranteed maximum price (GMP) contract — that\'s what the GMP is for.',
      isBest: false,
      explanation:
        'Half-right depending on the contract structure. GMP contracts shift cost-overrun risk to the GC for items within scope. But foundation issues + commodity price spikes are typically *outside* GMP (foundation = unknown subsurface; steel = price escalation clause). The GC will likely have a valid claim for both. Read the contract before assuming GMP absorbs the cost.',
    },
  ],
  takeaway:
    'Cost overruns drain through a defined waterfall: (1) contingency reserve, (2) additional equity capital call, (3) loan modification (if LTC has room), (4) GMP claim if scope-eligible. Always burn contingency first because that\'s what it\'s budgeted for. Document each draw cause for the lender so the next draw isn\'t held up.',
  tips: [
    'Contingency norms: 5% of hard cost (institutional MF / office), 7-10% (heavy reno / older buildings), 10-15% (ground-up complex sites).',
    'GMP shifts overrun risk to GC for IN-SCOPE items; subsurface, force-majeure, and price-escalation typically excluded.',
    'Lender wants explanation + revised forecast before next draw release; have it ready.',
  ],
};
