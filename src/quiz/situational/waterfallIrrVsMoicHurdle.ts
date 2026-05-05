import type { SituationalCase } from '../../types/situational';

export const waterfallIrrVsMoicHurdle: SituationalCase = {
  id: 'waterfall-irr-vs-moic-hurdle',
  title: 'IRR hurdle vs MOIC hurdle — which does the sponsor prefer?',
  category: 'deal-process',
  difficulty: 'advanced',
  roles: ['portfolioMgmt', 'acquisitions'],
  scenario:
    'You\'re negotiating an LPA. Two structures on the table: Structure X — pref hurdle is 8% IRR; promote starts at 8% and steepens at 14% IRR. Structure Y — pref hurdle is 1.5× MOIC (multiple of capital); promote starts at 1.5× and steepens at 1.8×. The deal is a value-add multifamily with a planned 5-year hold. The sponsor expects to outperform on time (push IRR by exiting in year 3 or 4 if pricing allows) but expects a modest MOIC because the cap-rate environment is volatile.',
  data: [
    { label: 'Asset', value: 'Value-add MF, 5-yr hold' },
    { label: 'Sponsor\'s edge', value: 'Time (early exit at peak)' },
    { label: 'Risk', value: 'Cap rate widens before exit' },
    { label: 'Hurdle X', value: '8% IRR' },
    { label: 'Hurdle Y', value: '1.5× MOIC' },
  ],
  question:
    'Which hurdle does the sponsor prefer in this deal, and why?',
  options: [
    {
      label:
        'Sponsor prefers the IRR hurdle (Structure X). IRR is sensitive to time — early exit at modest MOIC can clear an 8% IRR easily. A 1.5× MOIC is harder to clear in a cap-rate-widening environment because absolute dollars depend on stabilized value, not on time.',
      isBest: true,
      explanation:
        'IRR rewards *speed* — getting paid earlier increases IRR even at modest absolute dollars. A 1.4× MOIC realized in 2.5 years = ~14.7% IRR; that clears an 8% IRR hurdle but fails a 1.5× MOIC hurdle. MOIC rewards *absolute dollars* and is insensitive to time — the only way to clear it is to actually deliver more capital back. In a deal where the sponsor\'s edge is exiting at peak pricing (time-sensitive) and the risk is cap-rate widening (absolute-dollar-sensitive), the sponsor wants the time-sensitive hurdle to clear easily. So IRR. Sophisticated LPs negotiate dual hurdles (must clear *both* an IRR and MOIC threshold) to protect against this asymmetry.',
    },
    {
      label:
        'MOIC hurdle (Structure Y). It\'s simpler to compute and harder for LP to manipulate.',
      isBest: false,
      explanation:
        'Sponsor preference is driven by which hurdle is easier to clear in *this* deal\'s expected outcome, not by computational simplicity. MOIC is harder to clear when the sponsor expects modest absolute dollars but wants to exit on time.',
    },
    {
      label:
        'They\'re equivalent — sponsors and LPs both prefer the hurdle that aligns interests, regardless of which.',
      isBest: false,
      explanation:
        'IRR and MOIC are mathematically distinct under different exit scenarios. A 1.5× in 2 years (≈22.5% IRR) clears an 8% IRR easily; a 1.4× in 5 years (≈7% IRR) fails an 8% IRR but still doesn\'t clear 1.5× MOIC. The hurdles diverge whenever timing or magnitude differs, which is always.',
    },
    {
      label:
        'Sponsor prefers MOIC because it pays absolute dollars and the deal is value-add.',
      isBest: false,
      explanation:
        'Value-add deals can deliver high IRR at modest MOIC if exited quickly at peak. MOIC is harder to clear in this profile, so sponsors avoid it.',
    },
  ],
  takeaway:
    'IRR hurdles reward *time-to-realization*; MOIC hurdles reward *absolute capital multiplied*. They diverge whenever the deal\'s exit timing is asymmetric. Sponsors push for the hurdle that\'s easier to clear given their expected outcome — usually IRR for fast-exit value-add, MOIC for long-hold core. Sophisticated LPs negotiate dual hurdles to protect against this asymmetry.',
  tips: [
    'IRR and MOIC ≠ the same. A 1.4× in 2.5 years clears most IRR hurdles; a 1.4× in 5 years rarely does.',
    'Dual hurdles ("must clear 8% IRR AND 1.5× MOIC") are the LP-friendly version.',
    'Sponsors typically win this negotiation when LPs accept a single hurdle. Push for dual.',
  ],
};
