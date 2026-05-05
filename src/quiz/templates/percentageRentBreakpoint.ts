import { formatPct, formatUsd } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { nextId } from '../random';

function buildSolution(baseRent: number, rate: number, expected: number): Solution {
  return {
    formula: 'Natural Breakpoint = Base Rent / Percentage Rate',
    steps: [
      {
        label: 'Breakpoint',
        expression: `${formatUsd(baseRent)} / ${formatPct(rate, 1)}`,
        result: formatUsd(expected),
      },
    ],
    answerDisplay: formatUsd(expected),
  };
}

export const percentageRentBreakpointTemplate: QuestionTemplate<'percentageRentBreakpoint'> =
  {
    kind: 'percentageRentBreakpoint',
    label: 'Retail: Percentage-Rent Breakpoint',
    description: 'Base rent ÷ percentage rate → sales level at which percentage rent starts.',
    category: 'valuation',
    roles: ['acquisitions', 'assetManagement'],
    pattern: 'Base Rent / Pct Rate',
    tips: [
      'Natural breakpoint = sales above which the tenant pays a % of incremental sales as additional rent.',
      'Default formula assumes rate of 6-8% for typical retail; 4-5% for high-volume / grocery; 10%+ for specialty.',
      'Above breakpoint, every $1 of additional sales costs the tenant $0.06 (6% rate). Material to tenant unit-economics.',
      'Watch for "stated breakpoint" (negotiated, not formula-driven) vs "natural breakpoint" (math-derived) — leases differ.',
    ],
    generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
      void difficulty;
      const baseRent = rng.pickFromSet([
        100_000, 150_000, 200_000, 250_000, 350_000, 450_000, 600_000, 800_000,
      ] as const);
      const rate = rng.pickFromSet([0.04, 0.05, 0.06, 0.07, 0.08, 0.10] as const);
      const expected = baseRent / rate;

      return {
        id: nextId('prb'),
        kind: 'percentageRentBreakpoint',
        prompt: `Retail lease: ${formatUsd(baseRent)} base rent, with percentage rent of ${formatPct(rate, 1)} of sales above the natural breakpoint. At what sales level does percentage rent kick in?`,
        context: { baseRent, percentageRate: rate },
        expected,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        solution: buildSolution(baseRent, rate, expected),
      };
    },
  };
