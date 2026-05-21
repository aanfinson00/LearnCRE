import { dscrNetOfReserves } from '../../math/debt';
import { formatMultiple, formatUsd, formatUsdPerSf } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { bands, pickBand } from '../bands';
import { nextId } from '../random';

const GROSS_DSCR_OPTIONS = [1.20, 1.25, 1.30, 1.35, 1.40] as const;
const RESERVE_PER_SF = [0.15, 0.20, 0.25, 0.30, 0.35] as const;

function buildSolution(
  noi: number,
  annualReserves: number,
  debtService: number,
  netDscr: number,
): Solution {
  return {
    formula: 'DSCR (net of reserves) = (NOI − Reserves) / Debt Service',
    steps: [
      {
        label: 'NOI net of reserves',
        expression: `${formatUsd(noi)} − ${formatUsd(annualReserves)}`,
        result: formatUsd(noi - annualReserves),
      },
      {
        label: 'Net DSCR',
        expression: `${formatUsd(noi - annualReserves)} / ${formatUsd(debtService)}`,
        result: formatMultiple(netDscr),
      },
    ],
    answerDisplay: formatMultiple(netDscr),
  };
}

export const dscrWithReservesTemplate: QuestionTemplate<'dscrWithReserves'> = {
  kind: 'dscrWithReserves',
  label: 'DSCR Net of Reserves',
  description: 'Debt service coverage after deducting annual capital reserves from NOI.',
  category: 'returns',
  roles: ['mortgageUw', 'assetManagement'],
  pattern: '(NOI − reserves) / debt service',
  tips: [
    'Lenders often test "DSCR net of reserves" to account for recurring capex that\'s not in the NOI line. A 1.30x gross DSCR can drop to 1.15x after reserves.',
    'Reserve deduction is standard in CMBS sizing: lender uses the underwritten NOI less an assumed capital reserve before dividing by debt service.',
    'Watch for sponsors who show gross NOI (no reserves) to hit a DSCR threshold, then fund capex from LP equity during hold — it\'s the same math, just hidden.',
    'Agency (Fannie/Freddie) multifamily underwrites with a $250–$350/unit/yr reserve; CMBS office/retail uses $/SF reserves.',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    const noi = pickBand(rng, bands.noi, difficulty);
    const buildingSf = pickBand(rng, bands.devSf, difficulty);
    const reservePerSf = rng.pickFromSet(RESERVE_PER_SF);
    const annualReserves = reservePerSf * buildingSf;
    const grossDscr = rng.pickFromSet(GROSS_DSCR_OPTIONS);
    const debtServiceRound = difficulty === 'beginner' ? 50_000 : 25_000;
    const debtService = Math.round(noi / grossDscr / debtServiceRound) * debtServiceRound;
    const netDscr = dscrNetOfReserves(noi, annualReserves, debtService);

    return {
      id: nextId('dscr_res'),
      kind: 'dscrWithReserves',
      prompt: `NOI is ${formatUsd(noi)}. Lender requires ${formatUsdPerSf(reservePerSf)}/yr capital reserves on a ${buildingSf.toLocaleString()} SF building. Annual debt service is ${formatUsd(debtService)}. What is the DSCR net of reserves?`,
      context: {
        noi,
        buildingSf,
        capexReservePerSf: reservePerSf,
        debtServiceAnnual: debtService,
      },
      expected: netDscr,
      unit: 'multiple',
      tolerance: { type: 'abs', band: 0.03 },
      solution: buildSolution(noi, annualReserves, debtService, netDscr),
    };
  },
};
