import type { SituationalCase } from '../../types/situational';

export const exitCapConservatism: SituationalCase = {
  id: 'exit-cap-conservatism',
  title: 'Defend the 150 bps exit cap expansion',
  category: 'sensitivity',
  difficulty: 'advanced',
  roles: ['acquisitions'],
  assetClass: 'mixed',
  scenario:
    'You\'re underwriting a 5-year industrial hold at a 5.0% going-in cap, modeling a 6.5% exit cap (150 bps of expansion). The deal pencils to a 12% IRR at this exit. A senior partner challenges: "150 bps is overkill — comps in this submarket have traded in a tight 4.75–5.50% band for 8 years." You need to defend the 150 bps spread.',
  data: [
    { label: 'Going-in cap', value: '5.0%' },
    { label: 'Modeled exit cap', value: '6.5% (+150 bps)' },
    { label: 'Hold period', value: '5 years' },
    { label: 'Modeled IRR', value: '12%' },
    { label: '8-year submarket cap range', value: '4.75–5.50%' },
  ],
  question: 'What\'s the strongest defense for 150 bps?',
  options: [
    {
      label:
        '150 bps reflects the macro rate environment — when the 10-year treasury is materially above the 5–10 year average, cap rates re-set wider on exit, even if the submarket band has been tight historically.',
      isBest: true,
      explanation:
        'Cap rates aren\'t set by submarket comps in isolation — they\'re set by the spread between cap rates and the risk-free rate. When the 10-year treasury moves +150 bps from its hold-period average, cap rates broadly follow (with lag). The "tight 8-year band" reflects the era it covers, not a structural floor. Modeling +150 bps cap expansion on a 5-year hold in a rising-rate environment is conservative-but-realistic underwriting, not over-reaction.',
    },
    {
      label: '150 bps reflects asset-specific risks — vacancy, capex needs, tenant rollover.',
      isBest: false,
      explanation:
        'Asset-specific risks should be reflected in the *NOI* (vacancy assumptions, capex reserves, lease-up risk) — not the exit cap. Doubling-up by also widening the cap to compensate creates "stacking conservatism" that can\'t be defended item-by-item.',
    },
    {
      label: 'It\'s a buffer against being wrong — pad the underwriting to leave room for surprises.',
      isBest: false,
      explanation:
        'Honest framing of "I\'m not sure" but doesn\'t actually defend the number. Senior partners want to know which specific risk the buffer is sized to. "Just being conservative" loses to underwriters who can name the variable they\'re hedging.',
    },
    {
      label: 'You\'re right — drop to 100 bps. The historical band supports it.',
      isBest: false,
      explanation:
        'Capitulating to the senior\'s pressure without re-examining the rate environment. If the rate move is real, sticking with 150 bps is correct; if not, dropping is correct. The decision should be data-driven, not deference-driven.',
    },
  ],
  takeaway:
    'Exit cap expansion ≠ asset-quality discount. It\'s a macro rate adjustment. The defensible framing is: "where will cap rates likely be in 5 years given my view on the rate path?" Tying it to the treasury spread (vs the historical cap-to-treasury spread) is the cleanest defense.',
  tips: [
    'Cap-to-treasury spread is the durable relationship; cap rate alone moves with rates.',
    'Stabilized 5-yr holds in a rising-rate environment: 100–150 bps spread is industry conservative.',
    'Asset-specific risks belong in NOI assumptions; macro risks belong in the cap.',
  ],
};
