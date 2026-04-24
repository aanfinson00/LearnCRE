import { requiredRentPremiumPerSf } from '../../math/lease';
import { formatUsdPerSf, formatYears } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { bands, pickBand } from '../bands';
import { nextId } from '../random';

function buildSolution(ti: number, payback: number): Solution {
  const rent = requiredRentPremiumPerSf({ tiPerSf: ti, paybackYears: payback });
  return {
    formula: 'Required rent premium /SF = TI /SF / payback years',
    steps: [
      {
        label: 'Annual premium',
        expression: `${formatUsdPerSf(ti)} / ${formatYears(payback)}`,
        result: formatUsdPerSf(rent),
      },
    ],
    answerDisplay: formatUsdPerSf(rent),
  };
}

export const tiPaybackTemplate: QuestionTemplate<'tiPayback'> = {
  kind: 'tiPayback',
  label: 'TI Payback Rent Premium',
  description: 'What rent premium /SF/yr pays back the TI in N years?',
  category: 'valuation',
  pattern: 'A / B   where A = TI, B = payback years',
  tips: [
    'Premium = TI / payback years. $25 TI / 3-year payback = $8.33/SF/yr extra rent required.',
    'Use a shorter payback horizon (2–3 yrs) for speculative capex; a longer one (5 yrs) for high-credit tenants.',
    'If tenant won\'t pay that rent premium, TI doesn\'t pencil — walk or cut the TI.',
    'Equivalent: TI × payback multiple of 1.5×–2× to reflect risk — higher multiple = pickier landlord.',
  ],
  generate(rng, difficulty = 'intermediate') {
    const ti = pickBand(rng, { min: 10, max: 50, step: 1 }, difficulty);
    const payback = rng.pickInt(bands.paybackYears.min, bands.paybackYears.max);
    const expected = requiredRentPremiumPerSf({ tiPerSf: ti, paybackYears: payback });

    return {
      id: nextId('tiPay'),
      kind: 'tiPayback',
      prompt: `You're giving ${formatUsdPerSf(ti)} in TI. What rent premium (/SF/yr) pays it back in ${formatYears(payback)}?`,
      context: { tiPerSf: ti, paybackYears: payback },
      expected,
      unit: 'usdPerSf',
      tolerance: { type: 'pct', band: 0.05 },
      solution: buildSolution(ti, payback),
    };
  },
};
