import type { SituationalCase } from '../../types/situational';

export const distributionWaterfall: SituationalCase = {
  id: 'distribution-waterfall-1tier',
  title: 'A 1-tier waterfall: in what order does cash get distributed?',
  category: 'deal-process',
  difficulty: 'intermediate',
  roles: ['portfolioMgmt', 'assetManagement', 'acquisitions'],
  scenario:
    'You\'re modeling distributions on a deal sale. Joint venture: LP contributed $20M (90%), GP contributed $2.2M (10%). Waterfall is 1-tier: 8% pref to LP, then return of capital pro-rata, then 80/20 split (LP/GP) on residual. Sale net proceeds + accumulated cash flow = $35M total distributable. Hold was 4 years.',
  data: [
    { label: 'LP capital', value: '$20M (90%)' },
    { label: 'GP capital', value: '$2.2M (10%)' },
    { label: 'Pref hurdle', value: '8% on LP capital' },
    { label: 'Promote', value: '20% above pref' },
    { label: 'Hold', value: '4 years' },
    { label: 'Total distributable', value: '$35M' },
  ],
  question: 'In what order does the $35M get split, and what does each side end up with?',
  options: [
    {
      label:
        'Tier 1: pay LP 8% pref accrued = $20M × ((1.08)^4 − 1) = $7.2M. Tier 2: return capital pro-rata = $20M LP + $2.2M GP = $22.2M. Subtotal $29.4M paid; residual = $5.6M. Tier 3: split 80/20 = LP $4.48M + GP $1.12M (the GP\'s "promote" beyond their 10% capital share). Final: LP gets $20M cap + $7.2M pref + $4.48M = $31.68M. GP gets $2.2M cap + $1.12M = $3.32M.',
      isBest: true,
      explanation:
        'Standard 1-tier waterfall sequence: (1) **pref** to LP only — accrues at the stated rate compounded annually (or simple, per LPA); on $20M @ 8% over 4 years, compound pref = $7.2M; (2) **return of capital** pro-rata to LP and GP based on their original contributions ($20M + $2.2M = $22.2M); (3) **promote split** on the residual ($35M − $7.2M − $22.2M = $5.6M) at 80/20 (LP/GP). LP\'s total = $31.68M; GP\'s total = $3.32M. The GP\'s $3.32M includes their $2.2M of capital back + $1.12M of "carry" or "promote" — money they earn for outperforming the pref hurdle, despite only having put in 10% of the capital.',
    },
    {
      label: 'Split everything 90/10 based on the contribution percentages: LP $31.5M, GP $3.5M.',
      isBest: false,
      explanation:
        'Ignores the pref + promote structure entirely. The whole point of a waterfall is that the GP earns more than their capital share when the deal performs above the pref — that\'s the incentive structure. Just splitting pro-rata is a "no waterfall" arrangement.',
    },
    {
      label: 'Pay GP first to make them whole, then pay LP a fixed 12% IRR, then split anything left 50/50.',
      isBest: false,
      explanation:
        'Inverts the LP-GP relationship. LPs are senior in distributions; they get pref + return of capital before any promote flows to the GP. The GP earns from the residual after the LP has been made whole on capital + pref, not before.',
    },
    {
      label: 'Pay the LP $20M back, then split the remaining $15M 80/20.',
      isBest: false,
      explanation:
        'Skips the pref tier. Pref is the LP\'s preferred return — they get paid 8% (or whatever the LPA states) on their capital before the promote split kicks in. Skipping pref over-pays the GP and under-pays the LP.',
    },
  ],
  takeaway:
    'A 1-tier waterfall has three sequential steps: pay pref to LP (typically 8% on capital, accrued for the hold period), return capital pro-rata to all partners, then split the residual at the promote split (80/20 is most common). The promote is the GP\'s incentive — earning more than capital share when the deal beats the hurdle. Multi-tier waterfalls (with catch-up + multiple hurdles) layer additional steps but the pref + return + promote skeleton is consistent.',
  tips: [
    'Pref accrues — it\'s 8% per year compounded (or simple, per LPA), not 8% one-time.',
    'Return of capital is pro-rata based on contributions, not 50/50 between LP and GP.',
    '80/20 is the most common promote; 70/30 (steeper GP take) and 75/25 also common at outperforming sponsors.',
  ],
};
