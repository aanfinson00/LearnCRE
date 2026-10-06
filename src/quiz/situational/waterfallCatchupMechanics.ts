import type { SituationalCase } from '../../types/situational';

export const waterfallCatchupMechanics: SituationalCase = {
  id: 'waterfall-catchup-mechanics',
  title: 'Full catch-up vs 50/50 catch-up — which is more sponsor-friendly?',
  category: 'deal-process',
  difficulty: 'intermediate',
  roles: ['portfolioMgmt', 'acquisitions'],
  scenario:
    'Two LPAs propose different catch-up structures, both targeting a 20% promote above an 8% pref. Structure A: 100% catch-up — every dollar above the pref goes to GP until GP has 20% of all profit distributed so far. Structure B: 50/50 catch-up — every dollar above the pref splits 50/50 (LP/GP) until GP has 20% of all profit distributed so far. Both split 80/20 after the catch-up clears. Capital has been returned; the deal has paid $4M of pref to the LP and has $5M more to distribute.',
  data: [
    { label: 'Pref paid to LP', value: '$4M' },
    { label: 'Cash left above pref', value: '$5M' },
    { label: 'Promote target', value: 'GP = 20% of total profit' },
    { label: 'After catch-up', value: '80/20 (LP/GP)' },
  ],
  question:
    'How much does GP receive in total from the $5M under each structure, and when does the choice of catch-up actually change GP\'s take?',
  options: [
    {
      label:
        'Both pay GP $1.8M (20% of the $9M total profit). Full catch-up clears after $1M; 50/50 needs ~$2.67M. The choice only changes GP dollars when the deal runs out of cash before the catch-up clears, and then full catch-up pays GP more.',
      isBest: true,
      explanation:
        'Full catch-up: GP needs C with C / ($4M + C) = 20% → C = $1M, all to GP. 50/50: GP needs G with G / ($4M + 2G) = 20% → G ≈ $1.33M, so ~$2.67M flows through the tier ($1.33M each). With $5M available both clear, and the remainder splits 80/20, so GP lands at exactly 20% × $9M = $1.8M either way (full: $1M + 20% × $4M; 50/50: $1.33M + 20% × $2.33M). If only $1M were left, full catch-up would pay GP $1M versus $0.5M under 50/50. That shortfall case is why full catch-up is the sponsor-friendly term.',
    },
    {
      label:
        'Full catch-up pays GP more in total: about $1M in the tier versus about $0.5M under 50/50.',
      isBest: false,
      explanation:
        'This stops the 50/50 tier at the same $1M of cash as the full catch-up. A 50/50 tier keeps running until GP actually reaches its 20% target (~$2.67M of cash, $1.33M to GP). With $5M available both structures clear, so total GP dollars are identical.',
    },
    {
      label:
        '50/50 pays GP more overall, because GP collects ~$1.33M inside the tier versus $1M under full catch-up.',
      isBest: false,
      explanation:
        'GP does collect more *inside* the 50/50 tier, but the tier also consumes ~$2.67M of cash, leaving less to split 80/20 afterwards. Once both clear, GP ends at 20% of total profit ($1.8M) under either structure.',
    },
    {
      label:
        'They are identical in every scenario, because the target promote percentage is the same.',
      isBest: false,
      explanation:
        'Identical only when there is enough cash to clear both catch-ups. If the deal stops between $1M and ~$2.67M above the pref, full catch-up has already delivered GP its full 20% while 50/50 has not, so GP\'s take differs.',
    },
  ],
  takeaway:
    'The catch-up rate controls how fast GP reaches its promote target, not where it ends up. When the deal clears the catch-up, GP gets the same share of profit either way. The structure only changes GP dollars in the band where cash runs out mid-tier, and there full catch-up favors the sponsor while 50/50 favors LPs.',
  tips: [
    '100% catch-up: GP gets every dollar in the tier. 50/50 catch-up: GP gets half of each dollar.',
    'Full catch-up size with target X: pref × X / (1 − X). With 50/50, GP\'s catch-up is pref × X / (1 − 2X), and the tier is twice that.',
    'Check: once cleared, GP total = X × (all profit distributed). If your numbers don\'t tie to that, re-check the tier.',
    'Many institutional LPAs use 50/50 catch-up + a lower target (e.g. 50/50 to 15%) to soften GP economics.',
  ],
};
