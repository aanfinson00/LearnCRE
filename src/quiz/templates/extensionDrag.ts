import { irrMulti } from '../../math/returns';
import { formatPct, formatUsd, formatYears } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { bands, pickBand } from '../bands';
import { nextId } from '../random';

function buildSolution(params: {
  irrAtN: number;
  irrAtNPlusExtension: number;
  drag: number;
  extensionYears: number;
}): Solution {
  return {
    formula: 'Drag = IRR(holdN) − IRR(holdN+ext)   when no growth captured',
    steps: [
      {
        label: 'Original-hold IRR',
        expression: 'Year-N exit',
        result: formatPct(params.irrAtN),
      },
      {
        label: `IRR after ${formatYears(params.extensionYears)} extension`,
        expression: `Same exit value, ${formatYears(params.extensionYears)} more`,
        result: formatPct(params.irrAtNPlusExtension),
      },
      {
        label: 'Drag (bps)',
        expression: 'IRR(N) − IRR(N+ext)',
        result: formatPct(params.drag),
      },
    ],
    answerDisplay: formatPct(params.drag),
  };
}

export const extensionDragTemplate: QuestionTemplate<'extensionDrag'> = {
  kind: 'extensionDrag',
  label: 'Hold-extension IRR drag',
  description:
    'How much IRR do you give up by extending a hold N years if growth doesn\'t materialize?',
  category: 'returns',
  roles: ['assetManagement', 'portfolioMgmt'],
  pattern: 'IRR_original − IRR_extended  when interim NOI offsets nothing',
  tips: [
    'If you extend a hold and the asset doesn\'t appreciate, the income alone has to beat your alt-deployment hurdle for the extension to pencil.',
    'The "extension drag" is the cost of being wrong about future growth — quantifies the optionality cost.',
    'Quick mental: every extra year of flat exit drags IRR by roughly (income yield − cap-rate-spread) × 0.X depending on the multiplier.',
    'Sponsors who ask for extensions "to capture more growth" should be made to defend the extension IRR as a standalone test.',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    const noi = pickBand(rng, bands.noi, difficulty);
    const cap = pickBand(rng, bands.capRate, difficulty);
    const equity = noi / cap;
    const originalHold = rng.pickInt(5, 10);
    const extension = rng.pickInt(1, 3);

    // Both paths have the SAME exit value (flat, no growth captured during the
    // extension). We compare IRR of original-hold vs extended-hold. Vary the
    // appreciation multiplier so the underlying numbers aren't always identical.
    const apprec = rng.pickRange(1.15, 1.45, { step: 0.025 });
    const exitValue = equity * apprec;

    const cashflowsOriginal: number[] = [-equity];
    for (let y = 1; y <= originalHold; y++) {
      cashflowsOriginal.push(y === originalHold ? noi + exitValue : noi);
    }
    const irrAtN = irrMulti(cashflowsOriginal);

    const cashflowsExtended: number[] = [-equity];
    for (let y = 1; y <= originalHold + extension; y++) {
      cashflowsExtended.push(y === originalHold + extension ? noi + exitValue : noi);
    }
    const irrAtNPlusExtension = irrMulti(cashflowsExtended);

    const drag = irrAtN - irrAtNPlusExtension;

    return {
      id: nextId('ext_drag'),
      kind: 'extensionDrag',
      prompt: `Equity ${formatUsd(equity)}; flat NOI ${formatUsd(noi)}/yr; exit value ${formatUsd(exitValue)} (${(((exitValue / equity) - 1) * 100).toFixed(0)}% appreciation, captured by year ${originalHold}). If you extend the hold by ${formatYears(extension)} *with no incremental appreciation*, by how many points does IRR drag (positive number)?`,
      context: {
        equityIn: equity,
        equityOut: exitValue,
        holdYears: originalHold + extension,
      },
      expected: drag,
      unit: 'pct',
      tolerance: { type: 'abs', band: 0.005 },
      solution: buildSolution({
        irrAtN,
        irrAtNPlusExtension,
        drag,
        extensionYears: extension,
      }),
    };
  },
};
