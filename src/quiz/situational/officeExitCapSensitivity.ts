import type { SituationalCase } from '../../types/situational';

export const officeExitCapSensitivity: SituationalCase = {
  id: 'office-exit-cap-sensitivity',
  title: 'Office: the IC asks you to run the exit cap 50 bps wide — how much does it change the IRR?',
  category: 'sensitivity',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'office',
  scenario:
    "You're presenting a 5-year hold on a Class-B office building to your investment committee. Base case underwriting: purchase price $45M, Year 5 NOI $3.6M, exit cap rate 7.0%, resulting in a gross sale price of $51.4M and a project IRR of 12.8%. The IC chair asks you to sensitize the exit cap 50 bps wider (to 7.5%) and 50 bps tighter (to 6.5%) before approving.",
  data: [
    { label: 'Purchase price', value: '$45M' },
    { label: 'Year 5 NOI', value: '$3.6M' },
    { label: 'Base exit cap', value: '7.0%' },
    { label: 'Base exit value', value: '$3.6M / 0.07 = $51.4M' },
    { label: 'Base IRR', value: '12.8%' },
    { label: 'Annual operating cash flow (yrs 1–4)', value: '~$2.8M/yr (net of debt service est.)' },
  ],
  question: 'How does the exit cap sensitivity change the exit value and project IRR?',
  options: [
    {
      label:
        'At 7.5% exit cap: value = $3.6M / 0.075 = $48.0M (−$3.4M vs base). At 6.5%: value = $3.6M / 0.065 = $55.4M (+$4.0M vs base). Exit value is not symmetric — the downside is $3.4M but the upside is $4.0M because the cap-rate / value relationship is convex. For a rough IRR impact: every $1M of exit value change on a $45M deal with a 5-year hold ≈ 20–25 bps of IRR. Wide cap scenario: IRR drops ~70–85 bps to ~12.0%; tight cap scenario: IRR rises ~80–100 bps to ~13.6–13.8%.',
      isBest: true,
      explanation:
        "The math: $3.6M / 0.075 = $48.0M (wide); $3.6M / 0.065 = $55.4M (tight). Exit value range: $48.0M–$55.4M. Cap rate / value is convex — a 50-bps widening on a 7.0% base shrinks value by 6.6%, while a 50-bps tightening grows it by 7.8%. The asymmetry matters for risk framing: the downside scenario costs more than the upside gains. IRR impact approximation: $3.4M of exit value loss on a $45M equity-heavy deal over 5 years ≈ 70–85 bps IRR. The precise answer requires a full DCF, but the IC is looking for the directional magnitude, which you can rough out mentally.",
    },
    {
      label:
        'Exit cap sensitivity is symmetric — 50 bps wide loses the same dollar value as 50 bps tight gains.',
      isBest: false,
      explanation:
        "This is a common misconception. The cap rate/value relationship is convex (value = NOI / cap rate), so a 50-bps change on a low cap rate produces a larger dollar swing than a 50-bps change on a higher cap rate. Starting at 7.0%: widening to 7.5% = −$3.4M; tightening to 6.5% = +$4.0M. The upside is $600k larger than the downside in absolute dollar terms. This asymmetry is why conservative underwriters add more cushion to cap rate assumptions than a symmetric sensitivity would suggest.",
    },
    {
      label:
        'Exit cap sensitivity doesn\'t matter much — IRR is more driven by Year 1–4 cash flow than the exit.',
      isBest: false,
      explanation:
        "For a 5-year hold, exit value typically drives 50–65% of total return in a levered deal. Year 1–4 cash flows are important, but the lump-sum reversion is the dominant value creation event. A $3.4M swing in exit value on a $45M deal is a ~7.5% change in proceeds — which is highly meaningful to IRR. This answer is more true for very long hold periods (10+ years) where cash flow compounds matter more.",
    },
    {
      label:
        'Run a full Monte Carlo on cap rate scenarios — a single-point sensitivity is too crude for IC analysis.',
      isBest: false,
      explanation:
        "Monte Carlo is analytically rigorous but the IC is asking for a quick mental arithmetic check, not a simulation. The right response in an IC setting is to frame the magnitude of the sensitivity (50 bps wide → ~$3.4M exit value loss → ~70–85 bps IRR) and discuss what market conditions would produce the wide case. A Monte Carlo can supplement a live IC but doesn't replace the ability to reason through the numbers directly.",
    },
  ],
  takeaway:
    "Exit cap rate sensitivity should be framed in three steps: (1) compute exit value under each scenario (NOI / cap); (2) quantify the exit value delta; (3) translate to IRR impact (rough rule: $1M exit value change on a 5-year hold ≈ 20–25 bps IRR on a typical structure). The convexity of cap rate / value means downside scenarios cost more in dollar terms than upside scenarios gain — conservative underwriting should weight the wide case more heavily than a symmetric range suggests.",
  tips: [
    'Exit value convexity: value = NOI / cap. A 50-bps move on a 5.0% base is bigger than on a 7.0% base.',
    'For IC sensitivity tables: always show exit cap ±50 bps and ±100 bps as standard columns.',
    'Exit cap assumption should be set vs. going-in cap + expected spread for market cycle. Flat exit cap = optimistic if you expect market softening.',
  ],
};
