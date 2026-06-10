import type { SituationalCase } from '../../types/situational';

export const noiGrowthMissExitValue: SituationalCase = {
  id: 'noi-growth-miss-exit-value',
  title: 'NOI growth misses by 1% — how much does exit value change?',
  category: 'sensitivity',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'mixed',
  scenario:
    "You acquire a stabilized multifamily asset at a 5.0% going-in cap with a $1.2M year-1 NOI and model 3.5% annual NOI growth over a 5-year hold. Exit is at a 5.25% cap on year-5 NOI. Your modeled exit value is $19.1M. A partner challenges: 'What if NOI growth underperforms by 1% per year (2.5% instead of 3.5%)?' You need to quickly assess the impact without re-running the full model.",
  data: [
    { label: 'Year-1 NOI', value: '$1.2M' },
    { label: 'Modeled growth', value: '3.5%/yr' },
    { label: 'Stress growth', value: '2.5%/yr' },
    { label: 'Hold period', value: '5 years' },
    { label: 'Exit cap', value: '5.25%' },
    { label: 'Modeled exit value', value: '$19.1M' },
  ],
  question:
    'Estimate the exit value impact of a 1%/yr NOI growth miss over the 5-year hold.',
  options: [
    {
      label:
        'Year-5 NOI at 3.5% growth: $1.2M × (1.035)^5 ≈ $1.423M. At 2.5%: $1.2M × (1.025)^5 ≈ $1.360M. Difference in year-5 NOI: ~$63k. At a 5.25% exit cap, that $63k NOI difference translates to ~$1.2M less in exit value (~6% of the modeled exit price).',
      isBest: true,
      explanation:
        "(1.035)^5 ≈ 1.1877; $1.2M × 1.1877 = $1.425M NOI at 3.5% growth. (1.025)^5 ≈ 1.1314; $1.2M × 1.1314 = $1.358M NOI at 2.5% growth. Difference: $1.425M − $1.358M = $67k NOI shortfall. Exit value at 5.25% cap = NOI ÷ 0.0525. $67k ÷ 0.0525 = $1.276M less in exit value. As a % of $19.1M: ~6.7%. Quick mental math shortcut: 1% NOI growth miss compounded over 5 years ≈ ~5% of NOI at exit; capitalized at 5.25%, that's 5%/5.25% × year-5 NOI — roughly 5% of exit value for every 1% sustained growth miss.",
    },
    {
      label:
        'The impact is negligible — 1% per year is small and compounds to less than 3% of exit value.',
      isBest: false,
      explanation:
        '1%/yr compounded for 5 years moves year-5 NOI by about 5%, and capitalized at a 5.25% exit cap, that 5% NOI miss translates to about 5%/5.25% ≈ ~95bps × year-5 NOI in exit value loss. On a $19.1M exit, that is roughly $1.2M — about 6%. Not negligible.',
    },
    {
      label:
        '1% growth miss reduces exit value by approximately 20% because it compounds dramatically over 5 years.',
      isBest: false,
      explanation:
        "1%/yr × 5 years doesn't compound to 20% of exit value. The math: (1.035)^5 / (1.025)^5 ≈ 1.1877 / 1.1314 ≈ 1.0497 — a 5% difference in year-5 NOI, not 20%. Capitalized at 5.25%, the exit value difference is roughly 5%/5.25% × year-5 NOI ≈ 6.5% of exit value.",
    },
    {
      label:
        "You can't estimate this without running the full model — too many compounding interactions.",
      isBest: false,
      explanation:
        'For a stabilized asset with a simple growth rate, the math is tractable without a model: (1 + growth)^hold computes the year-5 NOI multiple, and NOI ÷ exit cap gives exit value. The compounding of a 1% growth miss over 5 years is about 5% of year-5 NOI — a quick calculation in your head that every acquisitions analyst should be able to do.',
    },
  ],
  takeaway:
    'Quick rule: a 1% annual NOI growth miss over 5 years shrinks year-5 NOI by roughly 5%. Capitalized at a 5%–6% exit cap, that is ~80–100 bps of exit value per 1% sustained growth miss (as a % of year-5 NOI ÷ exit cap). On a 5-year stabilized deal, the exit value typically drives 50%+ of total IRR — so a 6% exit value reduction from a 1% growth miss meaningfully impacts IRR. Always run this sensitivity at IC.',
  tips: [
    'Shortcut: 1%/yr growth miss × 5 years ≈ 5% less NOI at exit (exact: (1+g1)^n / (1+g2)^n).',
    'NOI miss impact on exit value = NOI miss ÷ exit cap rate.',
    'Present the growth sensitivity alongside exit cap sensitivity — they often interact.',
  ],
};
