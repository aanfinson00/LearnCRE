import { afterTaxSaleProceeds, depreciationStraightLine } from '../../math/tax';
import { formatPct, formatUsd, formatYears } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { bands, pickBand } from '../bands';
import { nextId } from '../random';

function buildSolution(params: {
  purchase: number;
  saleProceeds: number;
  accumulatedDep: number;
  saleCostRate: number;
  recaptureRate: number;
  capGainsRate: number;
  netProceeds: number;
  totalGain: number;
  recaptureGain: number;
  capitalGain: number;
}): Solution {
  const r = params;
  return {
    formula: 'Net = sale × (1 − sc) − recap × rRate − capGain × cgRate',
    steps: [
      {
        label: 'Net sale (less costs)',
        expression: `${formatUsd(r.saleProceeds)} × (1 − ${formatPct(r.saleCostRate)})`,
        result: formatUsd(r.saleProceeds * (1 - r.saleCostRate)),
      },
      {
        label: 'Adjusted basis',
        expression: `${formatUsd(r.purchase)} − ${formatUsd(r.accumulatedDep)}`,
        result: formatUsd(r.purchase - r.accumulatedDep),
      },
      {
        label: 'Recapture tax',
        expression: `${formatUsd(r.recaptureGain)} × ${formatPct(r.recaptureRate)}`,
        result: formatUsd(r.recaptureGain * r.recaptureRate),
      },
      {
        label: 'Capital gains tax',
        expression: `${formatUsd(r.capitalGain)} × ${formatPct(r.capGainsRate)}`,
        result: formatUsd(r.capitalGain * r.capGainsRate),
      },
      {
        label: 'After-tax proceeds',
        expression: 'net sale − recapture tax − cap gains tax',
        result: formatUsd(r.netProceeds),
      },
    ],
    answerDisplay: formatUsd(r.netProceeds),
  };
}

export const taxAdjustedExitTemplate: QuestionTemplate<'taxAdjustedExit'> = {
  kind: 'taxAdjustedExit',
  label: 'After-tax sale proceeds',
  description: 'Compute net cash to investor after sale costs, recapture, and cap gains.',
  category: 'returns',
  roles: ['assetManagement', 'portfolioMgmt'],
  pattern: 'sale − costs − recapture × 25% − capGain × 20%',
  tips: [
    'Sale price ≠ cash to investor — sale costs (~1.5%) and taxes typically eat 4–8%.',
    'Recapture (25%) hits first, capped at accumulated depreciation. Cap gains (20%) on the residual.',
    'Hold-vs-sell decisions belong on after-tax IRR, not gross IRR — the gap can be 100+ bps.',
    'Land is non-depreciable; reduce the depreciable basis to building cost (~75–85% of purchase).',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    const purchase = pickBand(rng, bands.loanAmount, difficulty);
    const holdYears = rng.pickInt(3, 10);
    const appreciationRate =
      difficulty === 'beginner'
        ? rng.pickRange(0.03, 0.05, { step: 0.005 })
        : difficulty === 'intermediate'
          ? rng.pickRange(0.02, 0.05, { step: 0.0025 })
          : rng.pickRange(-0.01, 0.06, { step: 0.0025 });
    const saleProceeds = purchase * Math.pow(1 + appreciationRate, holdYears);
    // Depreciable basis: ~80% of purchase (land = 20%); 27.5-yr MF life
    const depreciableBasis = purchase * 0.8;
    const accumulatedDep = depreciationStraightLine(depreciableBasis, holdYears);
    const saleCostRate = 0.015;
    const recaptureRate = 0.25;
    const capGainsRate = 0.2;

    const result = afterTaxSaleProceeds({
      purchasePrice: purchase,
      saleProceeds,
      accumulatedDepreciation: accumulatedDep,
      saleCostRate,
      recaptureRate,
      capGainsRate,
    });

    return {
      id: nextId('tax_exit'),
      kind: 'taxAdjustedExit',
      prompt: `${formatUsd(purchase)} purchase, sold ${formatYears(holdYears)} later for ${formatUsd(saleProceeds)}. Accumulated depreciation ${formatUsd(accumulatedDep)} (80% depreciable basis, 27.5-yr life). Sale costs ${formatPct(saleCostRate)}; recapture ${formatPct(recaptureRate)}; cap gains ${formatPct(capGainsRate)}. What's the after-tax cash to the investor?`,
      context: {
        purchasePrice: purchase,
        holdYears,
      },
      expected: result.afterTaxProceeds,
      unit: 'usd',
      tolerance: { type: 'pct', band: 0.02 },
      solution: buildSolution({
        purchase,
        saleProceeds,
        accumulatedDep,
        saleCostRate,
        recaptureRate,
        capGainsRate,
        netProceeds: result.afterTaxProceeds,
        totalGain: result.totalGain,
        recaptureGain: result.recaptureGain,
        capitalGain: result.capitalGain,
      }),
    };
  },
};
