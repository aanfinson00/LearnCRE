import { netEffectiveRent } from '../../math/lease';
import { formatUsdPerSf, formatYears } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { bands, pickBand } from '../bands';
import { classBand } from '../assetClasses';
import { nextId } from '../random';

function buildSolution(params: {
  grossRent: number;
  years: number;
  tiPerSf: number;
  freeMonths: number;
}): Solution {
  const months = params.years * 12;
  const freePerSf = (params.grossRent / 12) * params.freeMonths;
  const ner = netEffectiveRent({
    grossRentPerSf: params.grossRent,
    leaseTermYears: params.years,
    tiPerSf: params.tiPerSf,
    freeMonths: params.freeMonths,
  });
  return {
    formula: 'NER = (Gross × Term − TI − Free Rent) / Term',
    steps: [
      {
        label: 'Gross over term',
        expression: `${formatUsdPerSf(params.grossRent)} × ${formatYears(params.years)}`,
        result: formatUsdPerSf(params.grossRent * params.years),
      },
      {
        label: 'Free rent /SF',
        expression: `${formatUsdPerSf(params.grossRent / 12)} × ${params.freeMonths} months`,
        result: formatUsdPerSf(freePerSf),
      },
      {
        label: 'NER',
        expression: `(${formatUsdPerSf(params.grossRent * params.years)} − ${formatUsdPerSf(params.tiPerSf)} − ${formatUsdPerSf(freePerSf)}) / ${months}mo × 12`,
        result: formatUsdPerSf(ner),
      },
    ],
    answerDisplay: formatUsdPerSf(ner),
  };
}

export const netEffectiveRentTemplate: QuestionTemplate<'netEffectiveRent'> = {
  kind: 'netEffectiveRent',
  label: 'Net Effective Rent',
  description: 'Rent after spreading TI + free rent across the lease term.',
  category: 'valuation',
  pattern: 'A − B/n − (f × A / 12) / n   [face − TI/yr − freeRent/yr]',
  tips: [
    'Annualize every concession. $15/SF TI over 5 years = $3/SF/yr. 3 months free on a $20 rent = $5/SF total = $1/SF/yr over 5y.',
    'Shortcut: NER ≈ face rent − (TI ÷ term years) − (free months × face rent ÷ 12 ÷ term years).',
    'NER drives cap-rate math — always underwrite to NER, not face rent.',
    'Quick check: $20 face, $15 TI over 5y, 3 free months → $20 − $3 − $1 = $16/SF NER.',
  ],
  generate(rng, difficulty = 'intermediate', assetClass = 'mixed') {
    const grossRent = pickBand(rng, classBand('rentPerSf', assetClass), difficulty);
    const years = rng.pickInt(bands.leaseTermYears.min, bands.leaseTermYears.max);
    const tiCap = Math.max(5, grossRent * 1.2);
    const tiPerSf = pickBand(rng, { min: 0, max: tiCap, step: 1 }, difficulty);
    const freeMonths = rng.pickInt(bands.freeMonths.min, bands.freeMonths.max);
    const expected = netEffectiveRent({
      grossRentPerSf: grossRent,
      leaseTermYears: years,
      tiPerSf,
      freeMonths,
    });

    const concessionText =
      (tiPerSf > 0 ? `${formatUsdPerSf(tiPerSf)} in TI` : 'no TI') +
      (freeMonths > 0 ? ` and ${freeMonths} month${freeMonths > 1 ? 's' : ''} of free rent` : '');
    return {
      id: nextId('ner'),
      kind: 'netEffectiveRent',
      prompt: `${formatYears(years)} lease at ${formatUsdPerSf(grossRent)} face rent, with ${concessionText}. What's the NER?`,
      context: {
        rentPerSf: grossRent,
        leaseTermYears: years,
        tiPerSf,
        freeMonths,
      },
      expected,
      unit: 'usdPerSf',
      tolerance: { type: 'pct', band: 0.03 },
      solution: buildSolution({ grossRent, years, tiPerSf, freeMonths }),
    };
  },
};
