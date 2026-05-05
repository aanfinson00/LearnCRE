import type { SituationalCase } from '../../types/situational';

export const waterfallCatchupMechanics: SituationalCase = {
  id: 'waterfall-catchup-mechanics',
  title: 'Full catch-up vs 50/50 catch-up — which is more sponsor-friendly?',
  category: 'deal-process',
  difficulty: 'intermediate',
  roles: ['portfolioMgmt', 'acquisitions'],
  scenario:
    'Two LPAs propose different catch-up structures, both targeting a 20% promote tier above 8% pref. Structure A: 100% catch-up to GP — every dollar above pref flows to GP until GP has 20% of (pref + cat-up). Structure B: 50/50 catch-up — every dollar above pref splits 50/50 (LP/GP) until GP has 20% of (pref + cat-up). Both then split 80/20 above the catch-up tier. The deal earns $4M of pref, $5M of cash above pref before hitting the catch-up target.',
  data: [
    { label: 'Pref earned', value: '$4M' },
    { label: 'Cash above pref before split tier', value: '$5M' },
    { label: 'Promote target', value: '20% of (pref + cat-up)' },
    { label: 'Above split', value: '80/20 (LP/GP)' },
  ],
  question:
    'Which catch-up structure pays GP more *during the catch-up tier itself*, and roughly by how much?',
  options: [
    {
      label:
        'Full catch-up pays GP ~$1M during the tier; 50/50 pays GP ~$0.5M during the tier. Full catch-up is more sponsor-friendly because GP captures every catch-up dollar 1:1.',
      isBest: true,
      explanation:
        'Full catch-up: GP gets 100% of cash flowing through the catch-up tier until the 20% target is hit. With $4M pref earned, target catch-up = $4M × 0.20/0.80 = $1M; that $1M flows entirely to GP. 50/50 catch-up: GP only gets half of each dollar in the tier, so GP needs *twice* as much cash to flow through ($2M total) before the target is hit, and during that tier GP collects $1M while LP also collects $1M. Both eventually deliver GP the same target dollars *if* there\'s enough cash; the difference is **timing** — full catch-up gets GP to the promote target faster, meaning sooner exposure to above-tier upside. Full catch-up is more sponsor-friendly; 50/50 is more LP-friendly.',
    },
    {
      label:
        'They\'re identical because the target promote percentage is the same (20%) — the catch-up rate just changes the path, not the destination.',
      isBest: false,
      explanation:
        'True only in deals with infinite distributable cash. In a real deal where the cash above pref is finite, full catch-up gets GP to the 20% target with less cash needing to flow; 50/50 needs twice the cash to hit the same target. If the deal stops short of fully clearing the catch-up, the structures produce *different* total GP dollars.',
    },
    {
      label:
        '50/50 pays GP more because both LP and GP collect during the tier.',
      isBest: false,
      explanation:
        'GP\'s share *per dollar in the tier* is half (50¢ vs $1), so GP collects less per dollar. Total GP dollars at full catch-up of the tier are equal; the difference is how quickly GP gets there.',
    },
    {
      label:
        'Full catch-up pays GP ~$0.5M; 50/50 pays GP ~$1M.',
      isBest: false,
      explanation:
        'Inverts the math. Full catch-up = 100% to GP at tier = $1M to GP. 50/50 = half to GP at tier × $2M-tier = $1M to GP, but with twice as much LP cash flow during the tier.',
    },
  ],
  takeaway:
    'Catch-up rate controls the *speed* at which GP reaches the promote target, not the long-run target itself. Full catch-up is sponsor-friendly: GP rapidly accelerates to promote-tier economics on every dollar above pref. 50/50 catch-up is LP-friendly: GP only gets half of each dollar in the tier, so the catch-up takes twice as long to crystallize. In deals that don\'t fully clear the catch-up, structure dictates the actual GP take.',
  tips: [
    '100% catch-up: GP gets every dollar in the tier. 50/50 catch-up: GP gets half.',
    'Catch-up multiplier with X% target and full catch-up: pref × X / (1 − X). With 50/50: pref × 2X / (1 − X).',
    'Many institutional LPAs have 50/50 catch-up + lower target (e.g. 50/50 to 15%) to soften GP economics.',
  ],
};
