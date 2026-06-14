import type { SituationalCase } from '../../types/situational';

export const leverageSensitivity: SituationalCase = {
  id: 'leverage-sensitivity',
  title: 'Higher leverage raises the IRR 4 points — is it worth it?',
  category: 'sensitivity',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'mortgageUw'],
  assetClass: 'multifamily',
  scenario:
    'You\'re evaluating a multifamily acquisition at two leverage points. At 65% LTV: levered IRR = 13%, Year 1 cash-on-cash = 6.5%, annual debt service = $1.2M. At 75% LTV: levered IRR = 17%, Year 1 cash-on-cash = 4.5%, annual debt service = $1.5M. Going-in NOI is $1.8M. Both loans are 5-year terms. The submarket has experienced NOI declines of 10–15% during mild recessions historically.',
  data: [
    { label: '65% LTV → levered IRR', value: '13%' },
    { label: '65% LTV → Y1 CoC', value: '6.5%' },
    { label: '65% LTV → debt service', value: '$1.2M/yr' },
    { label: '75% LTV → levered IRR', value: '17%' },
    { label: '75% LTV → Y1 CoC', value: '4.5%' },
    { label: '75% LTV → debt service', value: '$1.5M/yr' },
    { label: 'Going-in NOI', value: '$1.8M' },
    { label: 'Stress scenario', value: 'NOI -10–15%' },
  ],
  question: 'How does leverage level change your risk profile, and how should the IC frame the choice?',
  options: [
    {
      label: 'At 75% LTV, a 15% NOI stress ($1.8M → $1.53M) leaves $30k of positive coverage over the $1.5M debt service — 1.02x DSCR. At 65% LTV the same stress leaves $330k of coverage (1.28x). The 4-point IRR premium at 75% is leverage amplification that works in the upside but collapses coverage in downside. The right choice depends on how much recession risk you price in.',
      isBest: true,
      explanation:
        'Leverage amplifies returns symmetrically in both directions. At 75% LTV, a 15% NOI stress produces a 1.02x DSCR — one bad quarter from triggering a loan covenant. At 65%, the same stress gives 1.28x coverage and meaningful headroom. The IRR difference (13% vs 17%) is not free — it\'s purchased with exactly this stress-scenario coverage compression. The IC should quantify the coverage difference and ask: "How likely is a 10-15% NOI decline over 5 years, and what\'s the consequence of breaching at 75% LTV?"',
    },
    {
      label: '75% LTV is always better — higher IRR with the same asset is the definition of an accretive decision.',
      isBest: false,
      explanation:
        'Higher leverage adds financial risk, not just IRR. At 75% LTV the same NOI stress that leaves 1.28x coverage at 65% produces 1.02x — dangerously close to covenant breach. The "same asset" does not produce the same risk profile at different leverage levels.',
    },
    {
      label: 'Go with 65% LTV — you should always minimize leverage to reduce risk.',
      isBest: false,
      explanation:
        '"Minimize leverage" ignores the cost of under-leveraging: lower returns, less efficient equity use. The right answer is calibrated to the stress scenario and IC risk appetite, not a blanket rule. If the 10-15% NOI stress is remote, 75% LTV may be appropriate. The question is whether the IRR premium compensates for the coverage compression.',
    },
    {
      label: 'Stress NOI at 25% decline to get a truer picture of the risk.',
      isBest: false,
      explanation:
        'Escalating the stress magnitude without market basis deflects rather than analyzes the stated scenario. The question establishes the market-appropriate stress (10-15%) based on historical precedent. A 25% scenario may be worth a separate slide, but it\'s not the primary answer to the leverage decision framed here.',
    },
  ],
  takeaway:
    'Leverage sensitivity is asymmetric: higher LTV raises IRR in the upside but compresses debt-service coverage in the downside. The metric to track is not just the IRR swing but the stress-case DSCR. A 75% LTV deal at 1.02x stress coverage and a 65% LTV deal at 1.28x stress coverage are structurally different risk profiles — not a 13% vs. 17% choice. IC decisions on leverage should be explicit about which stress scenario the deal can survive.',
  tips: [
    'Stress coverage = (stressed NOI) ÷ (debt service). Below 1.10x warrants explicit documentation.',
    'Leverage amplifies losses as symmetrically as it amplifies gains — model the downside, not just the upside.',
    'At refi maturity: higher LTV today = tighter refi environment if NOI or values slip.',
  ],
};
