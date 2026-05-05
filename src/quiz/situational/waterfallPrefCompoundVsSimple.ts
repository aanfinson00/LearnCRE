import type { SituationalCase } from '../../types/situational';

export const waterfallPrefCompoundVsSimple: SituationalCase = {
  id: 'waterfall-pref-compound-vs-simple',
  title: 'Compound vs simple pref — how much does the language actually move?',
  category: 'deal-process',
  difficulty: 'intermediate',
  roles: ['portfolioMgmt', 'acquisitions'],
  scenario:
    'You\'re reading two LPAs back-to-back. Both stipulate an 8% preferred return on $20M of LP capital over a 5-year hold. LPA #1 says "8% annual preferred return, *compounded*". LPA #2 says "8% annual preferred return, *simple*". The deal generates exactly enough cash above ROC to clear pref + a modest catch-up + about $3M of above-pref residual.',
  data: [
    { label: 'LP capital', value: '$20M' },
    { label: 'Pref rate', value: '8% annual' },
    { label: 'Hold', value: '5 years' },
    { label: 'Compound pref due', value: '~$9.39M' },
    { label: 'Simple pref due', value: '$8.00M' },
  ],
  question:
    'How much does the compound vs simple language move LP\'s pref dollars, and what\'s the second-order impact?',
  options: [
    {
      label:
        'Compound pref pays LP ~$1.39M more in pref ($9.39M vs $8.00M). Bigger second-order effect: the GP\'s catch-up is calculated against the *paid* pref, so GP\'s catch-up scales up too. With 100% catch-up to 20%, compound pref → ~$2.35M GP catch-up vs simple → $2.00M. Net to LP: ~$1.39M more in pref *plus* same dollars in above-split. So the language is worth ~$1.4M to LP.',
      isBest: true,
      explanation:
        'Compound pref math: $20M × ((1.08)^5 − 1) ≈ $9.39M. Simple: $20M × 0.08 × 5 = $8.00M. The compound advantage is real and grows with hold length: at 7 years it\'s ~$2.5M, at 10 years ~$5M. The second-order effect on GP catch-up is also real: GP\'s catch-up = pref × target/(1−target), so if pref is $1.39M higher, catch-up is also $1.39M × 0.25 = $0.35M higher. Net net: LP\'s gross pref gain ($1.39M) is partially offset by higher catch-up to GP (-$0.35M), so LP\'s net pickup ≈ $1.04M. The takeaway: this single word ("compounded" vs "simple") in the LPA is worth high-six- to low-seven-figures to LP on a $20M position.',
    },
    {
      label:
        'They\'re essentially identical — 8% is 8%. The compound vs simple language is convention.',
      isBest: false,
      explanation:
        'Compound and simple diverge by ~$1.4M on this $20M / 5-year deal. At larger LP positions or longer holds, the divergence is millions. This is one of the most commonly missed LPA terms.',
    },
    {
      label:
        'Simple pref pays LP more because pref doesn\'t accrue on prior unpaid pref.',
      isBest: false,
      explanation:
        'Inverts the math. Compound pays *more* because pref accrues on prior accrued pref (compound interest); simple just adds rate × years.',
    },
    {
      label:
        'Compound pref pays LP ~$1.4M more, but it doesn\'t affect GP\'s catch-up because catch-up is calculated against ROC, not pref.',
      isBest: false,
      explanation:
        'Catch-up is calculated against pref *paid*, not ROC. The compound language scales the catch-up too, which changes the second-order GP economics.',
    },
  ],
  takeaway:
    'Compound vs simple pref in an LPA is not boilerplate — it\'s a load-bearing term. On an 8% pref over 5 years, compound delivers ~$1.4M more on $20M of LP capital than simple. The second-order effect on GP catch-up partially offsets, but the LP\'s net pickup is still 5-6% of capital over the hold. Always read the pref language carefully and confirm whether the GP\'s catch-up is calculated against gross pref or after-tax pref.',
  tips: [
    'Compound at 8% for N years: ((1.08)^N − 1). Simple: 8% × N. Memorize both for 3 / 5 / 7 / 10 year holds.',
    'On long holds (>7 years) the compound advantage exceeds 20% of capital — material for LP modeling.',
    'GP catch-up scales with pref paid; compound pref + 100% catch-up to 20% means GP catches up to ~25% of compound pref dollars.',
  ],
};
