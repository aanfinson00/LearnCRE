import { otherIncomeValueDelta } from '../../math/sensitivity';
import { formatPct, formatUsd, formatUsdSigned } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { bands, discreteMoves, pickBand } from '../bands';
import { classBand } from '../assetClasses';
import { nextId } from '../random';

function buildSolution(delta: number, vac: number, cap: number, valueDelta: number): Solution {
  const noiDelta = delta * (1 - vac);
  return {
    formula: 'ΔValue = (ΔOther × (1 − Vacancy)) / Cap',
    steps: [
      {
        label: 'NOI uplift',
        expression: `${formatUsd(delta)} × (1 − ${formatPct(vac)})`,
        result: formatUsdSigned(noiDelta),
      },
      {
        label: 'Value uplift',
        expression: `${formatUsdSigned(noiDelta)} / ${formatPct(cap)}`,
        result: formatUsdSigned(valueDelta),
      },
    ],
    answerDisplay: formatUsdSigned(valueDelta),
  };
}

export const otherIncomeImpactTemplate: QuestionTemplate<'otherIncomeImpact'> = {
  kind: 'otherIncomeImpact',
  label: 'Other Income Impact',
  description: 'Adding other income → value uplift at given cap.',
  category: 'valuation',
  roles: ['acquisitions'],
  pattern: 'A × (1 − B) / C   where A = income, B = vacancy, C = cap',
  tips: [
    '$100k of other income at common caps: 5% → $2.0M, 6% → $1.67M, 7% → $1.43M, 8% → $1.25M.',
    'If vacancy > 0, trim the uplift by (1 − vacancy). 5% vacancy trims the answer ~5%.',
    'Mental shortcut: divide $ amount by cap %, then move decimal 2 places. $150k / 6 = $25k, × 100 = $2.5M (ignoring vacancy).',
    'Sandwich technique: at an ugly cap like 5.35%, solve at 5% and 6% then average toward the closer cap. $100k: $2.0M (5%) and $1.67M (6%) → mid ≈ $1.83M at 5.5%; nudge to ~$1.87M for 5.35%.',
    'Other income is often reviewed skeptically by buyers — reversion/exit cap may treat it differently.',
  ],
  generate(rng, difficulty = 'intermediate', assetClass = 'mixed') {
    const delta = pickBand(rng, bands.otherIncomeDelta, difficulty);
    const vac = rng.pickFromSet(discreteMoves.vacancySet);
    const cap = pickBand(rng, classBand('capRate', assetClass), difficulty);
    const valueDelta = otherIncomeValueDelta({
      otherIncomeDelta: delta,
      vacancyRate: vac,
      capRate: cap,
    });

    const vacText = vac === 0 ? 'no vacancy' : `${formatPct(vac)} vacancy`;
    return {
      id: nextId('otherInc'),
      kind: 'otherIncomeImpact',
      prompt: `Underwriting ${formatUsd(delta)} of new other income at a ${formatPct(cap)} cap (${vacText}). What's the $ change in value?`,
      context: { otherIncome: delta, vacancyRate: vac, capRate: cap },
      expected: valueDelta,
      unit: 'usdChange',
      tolerance: { type: 'pct', band: 0.05 },
      solution: buildSolution(delta, vac, cap, valueDelta),
    };
  },
};
