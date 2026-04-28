import type { SituationalCase } from '../../types/situational';

export const capSpread: SituationalCase = {
  id: 'going-in-vs-exit-cap-spread',
  title: 'Is your exit cap conservative enough?',
  category: 'sensitivity',
  difficulty: 'intermediate',
  assetClass: 'mixed',
  scenario:
    'You\'re underwriting a 5-year hold at a 5.0% going-in cap rate. Your model uses a 6.0% exit cap — 100 bps of cap expansion. The deal otherwise pencils to a 14% IRR. A senior reviewer pushes back: "Why 100 bps? Why not 75 or 125?" The submarket has seen cap rates trade in a tight band over the past 10 years (4.75–5.50%) outside of brief stress periods.',
  data: [
    { label: 'Going-in cap', value: '5.0%' },
    { label: 'Modeled exit cap', value: '6.0% (+100 bps)' },
    { label: 'Hold period', value: '5 years' },
    { label: 'Modeled IRR', value: '14%' },
    { label: '10-yr submarket cap range', value: '4.75–5.50%' },
  ],
  question: 'How do you defend the 100 bps spread?',
  options: [
    {
      label: '100 bps is a reasonable conservative anchor — it expands the cap by ~20% off the going-in level, which absorbs most realistic mean-reversion scenarios over a 5-7 year hold without being so punitive that the deal is impossible to win.',
      isBest: true,
      explanation:
        'Industry convention for stable assets: 50–100 bps cap expansion over a 5-7 year hold. 100 bps is the upper end of "conservative-but-not-punitive". It puts the exit at 6%, which is outside the trailing 10-year range — so you\'re modeling an exit harder than anything observed in the past decade. If the deal pencils on that, you have margin. Sub-50 bps is aggressive for stabilized; >150 bps is recession underwriting.',
    },
    {
      label: 'Use 0 bps spread — flat caps. The historical range supports it.',
      isBest: false,
      explanation:
        'Aggressive. Using the going-in cap as the exit cap embeds an assumption that the cap rate environment 5 years from now matches today\'s. That happens, but it\'s not the conservative case. Bidders using 0 bps spread will always win deals — until the rate environment moves and they take the loss. The 10-year band tells you what *has been*; conservative underwriting models what *could be*.',
    },
    {
      label: 'Use 200 bps spread — always assume rate stress on exit.',
      isBest: false,
      explanation:
        'Punitive. 200 bps cap expansion takes a 5% to a 7% — that\'s recession-grade pricing for a stabilized industrial asset. You\'ll never win a deal at that underwriting; if the model only pencils to 200 bps spread, the deal is in trouble already. Conservative ≠ pessimistic; conservative means absorbs realistic downside without modeling the worst case.',
    },
    {
      label: 'Match the spread to the going-in IRR — the higher the IRR, the more cap expansion you can absorb.',
      isBest: false,
      explanation:
        'Inverts the discipline. The spread is an underwriting input that *protects* against an unfavorable exit; tying it to the IRR creates a feedback loop where aggressive deals get aggressive spreads. The spread should be set by hold period, asset stability, and the rate environment — not by how much "room" the deal has.',
    },
  ],
  takeaway:
    'Exit cap spread is a stability test, not a knob to flex deal IRRs. Standard convention for stabilized 5-7 year holds is 50-100 bps; under that is aggressive, over 150 bps is recession underwriting. The right number is "the worst plausible cap environment" not "what makes the deal pencil".',
  tips: [
    'Stabilized 5-7 yr holds: 50-100 bps spread is industry standard.',
    '10+ year holds or value-add: 100-150 bps is more defensible.',
    'If the deal only pencils at <50 bps spread, it\'s a thin underwrite.',
  ],
};
