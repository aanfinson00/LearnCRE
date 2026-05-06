import type { SituationalCase } from '../../types/situational';

export const capitalAllocationPriority: SituationalCase = {
  id: 'capital-allocation-priority',
  title: 'Five deals, three slots — which framework picks?',
  category: 'investment-thesis',
  difficulty: 'advanced',
  roles: ['portfolioMgmt', 'acquisitions'],
  scenario:
    "Your fund has $150M of dry powder and five acquisitions in the pipeline that all clear committee individually. Each is roughly $50M of equity, so only three will close. Deal A is a 14% IRR / 1.7x EM Class-A office. Deal B is a 22% IRR / 2.2x EM ground-up MF. Deal C is a 16% IRR / 1.9x EM stabilized MF (off-market). Deal D is a 24% IRR / 2.5x EM distressed retail. Deal E is a 12% IRR / 1.6x EM industrial. Pick the three.",
  data: [
    { label: 'Deal A — Class-A office', value: '14% IRR / 1.7x' },
    { label: 'Deal B — ground-up MF', value: '22% IRR / 2.2x' },
    { label: 'Deal C — stabilized MF (off-market)', value: '16% IRR / 1.9x' },
    { label: 'Deal D — distressed retail', value: '24% IRR / 2.5x' },
    { label: 'Deal E — industrial', value: '12% IRR / 1.6x' },
    { label: 'Fund mandate', value: 'value-add diversified' },
    { label: 'Current portfolio', value: '40% office, 25% MF, 20% industrial, 15% retail' },
  ],
  question:
    'Which three deals close, and what weighted the call?',
  options: [
    {
      label:
        'B, C, and E. Pass on A (too much office in the portfolio already) and pass on D (return is highest but risk-adjusted weight collapses against the existing portfolio risk profile and the binary distressed-retail outcome).',
      isBest: true,
      explanation:
        "Best answer because it weights *three* dimensions: (1) return — B and C are top-quartile risk-adjusted; (2) diversification — closing A would push office to 50%+, which violates fund concentration limits; (3) risk distribution — D's 24% IRR sits on a binary outcome (retail tenant bankruptcy, lease-up failure) that doesn't pair well with the rest of the book. E is a lower headline return but it's an industrial deal in a fund that's underweight industrial, and stabilized industrial is exactly the LP-safe foundation to balance the higher-beta MF deals. The unsexy answer is the right one.",
    },
    {
      label:
        'B, D, and C. Highest IRRs win — that\'s what LPs are paying you to deliver. Office concentration is fixable on the next round of deployment.',
      isBest: false,
      explanation:
        "Headline-IRR maximization, but it's the wrong frame for a portfolio. LPs aren't paying for the highest-IRR deal — they're paying for the highest *risk-adjusted* IRR for the *fund*. Stacking three high-beta deals (ground-up + distressed + value-add) in one allocation cycle produces concentrated downside if any one materially underperforms. And ignoring the office overweight makes the next allocation cycle harder, not easier.",
    },
    {
      label:
        'A, B, and C. Office and MF are the deepest markets; stick to deal types you understand and pass on the riskier propositions (D distressed, E industrial).',
      isBest: false,
      explanation:
        "Conservative but doubles down on office concentration (now 50%+) and skips industrial entirely. Industrial has been a structural-tailwind asset class for a decade and a 'safe-but-12%' deal in the right submarket is exactly the portfolio anchor a value-add fund needs. Avoiding D is defensible (distressed retail is a separate skillset), but skipping E because the IRR is 'only' 12% misreads what the fund needs.",
    },
    {
      label:
        'A, B, and D. Diversify by deal type (one stable office, one ground-up, one distressed) and let the highest-return deal in each bucket carry the fund.',
      isBest: false,
      explanation:
        "Diversification logic is right, but the buckets are wrong: office is overweight already (so A is a bad pick), and pairing ground-up MF with distressed retail is two binary-outcome deals rather than one — the fund is too thin on stabilized cash flow. Better diversification adds a stabilized anchor (C or E), not two value-add bets.",
    },
  ],
  takeaway:
    "Capital allocation in a fund context is never just IRR-ranking. The weights are: (1) absolute return, (2) risk-adjusted return given the deal's beta, (3) diversification against the existing portfolio, (4) skill-fit (does your team know how to execute this strategy?), and (5) capital efficiency (does $50M of equity in this deal preclude better future deals?). The 'right' answer almost always passes on at least one of the highest-IRR deals.",
  tips: [
    "Risk-adjusted IRR ≈ headline IRR ÷ probability-weighted variance. A 24% IRR with 40% downside is worse than a 16% IRR with 5% downside.",
    "Concentration limits — if any one allocation pushes a property type above 50% of NAV, that's usually a hard stop regardless of return.",
    "Stabilized cash-flow deals serve as 'portfolio anchors' — under-allocating to them is a common rookie portfolio-mgmt mistake.",
    "Skill-fit beats deal-quality — a 24% deal you don't know how to operate is worse than a 14% deal you do.",
  ],
};
