import type { LongformCase } from '../../types/longform';

export const refiOrSellMemo: LongformCase = {
  id: 'refi-or-sell-memo',
  title: 'Recommend: refi or sell — write the IC memo',
  difficulty: 'advanced',
  roles: ['portfolioMgmt', 'assetManagement'],
  assetClass: 'mixed',
  scenario:
    'You\'re three years into a five-year hold on a stabilized $80M MF asset. Realized IRR through Y3 is 14% to LPs. Two paths to year-5 close-out: (a) hold + refi at year 3 to a 65% LTV loan ($52M new loan vs $30M existing), distribute ~$20M of refi proceeds, sell at year 5; (b) sell now at $85M (current market). After-tax IRR on path A is ~14.2%, path B is ~13.9%. The fund is in year 4 of a 7-year vehicle. The LP base is 60% taxable individuals + family offices, 40% pension funds. The fund\'s alternative deployment opportunity set today is thin (most viable deals priced at 10-12% IRR). Draft the recommendation memo to the IC.',
  data: [
    { label: 'Hold-to-date', value: '3 of 5 years' },
    { label: 'Realized LP IRR', value: '14%' },
    { label: 'Refi path after-tax IRR', value: '14.2%' },
    { label: 'Sell path after-tax IRR', value: '13.9%' },
    { label: 'Fund vintage', value: 'Year 4 of 7' },
    { label: 'LP base', value: '60% taxable / 40% tax-exempt' },
    { label: 'Alt deployment opportunity', value: '10-12% IRR (thin)' },
  ],
  question:
    'Write the recommendation in 6-8 sentences. Take a position; don\'t hedge. Explain how each non-IRR factor (LP tax mix, fund life, redeployment) shaped the decision.',
  modelAnswer: `Recommend the **refi path** despite the near-identical after-tax IRRs (14.2% vs 13.9%). Three factors drive the call. First, the LP tax mix: at 60% taxable LPs, the refi defers ~$3-4M of recapture + cap-gains taxes that the sale would crystallize today; that deferral is real value to the taxable side and zero to the tax-exempt side, so the *weighted* benefit favors holding. Second, the fund has 3 years of remaining vehicle life — selling now under fund-life pressure would be a forced disposition; with 3 years of runway, the refi-and-hold gives optionality on selling later if pricing improves. Third, the alt deployment opportunity set is thin (10-12% IRR vs the deal\'s embedded 14%+); selling and redeploying at 11% destroys ~300 bps of LP return, while the refi extracts capital that LPs can deploy on their own or hold while better deals emerge. The risk on the refi path is cap-rate widening in the next 2 years; we model 75 bps of expansion in our base case and the path still clears 13%. Walk threshold: if cap rates widen materially in Q4, re-evaluate selling in Q1; otherwise, execute the refi.`,
  rubric: [
    {
      id: 'takes-position',
      dimension: 'Takes a clear position (refi or sell) and defends it — no hedging',
      weight: 2,
    },
    {
      id: 'tax-mix-analysis',
      dimension: 'Addresses the LP tax mix and how it weighs the decision',
      weight: 1.5,
    },
    {
      id: 'fund-life',
      dimension: 'Considers fund life / time horizon as a factor',
      weight: 1.5,
    },
    {
      id: 'redeployment-opportunity',
      dimension: 'Quantifies the cost of redeployment at thinner returns',
      weight: 1.5,
    },
    {
      id: 'risk-of-recommendation',
      dimension: 'Names the residual risk on the recommended path (cap-rate widening, etc.)',
    },
    {
      id: 'walk-threshold',
      dimension: 'Includes a "what would change my mind" / re-evaluation trigger',
    },
  ],
  takeaway:
    'When two paths have similar IRRs, the decision moves to second-order factors. Senior memos take a position, defend it with the named factors (tax mix, fund life, redeployment opportunity), and include a "what changes my mind" trigger. Hedging ("could go either way") reads as junior; pick a side and own it.',
  tips: [
    'After-tax IRRs that match within 50 bps almost always tip on tax timing or redeployment opportunity.',
    'LP tax mix is the most under-reported decision input. 60/40 vs 80/20 produces different answers.',
    'Always include a walk threshold: senior thinking has "and here\'s when I\'d revisit."',
  ],
};
