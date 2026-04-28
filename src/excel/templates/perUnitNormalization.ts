import type { ExcelTemplate } from '../types';

// Portfolio-weighted NOI per unit across 4 properties.
const nois = [800_000, 1_200_000, 600_000, 900_000];
const units = [50, 75, 40, 55];
const totalNoi = nois.reduce((a, b) => a + b, 0);
const totalUnits = units.reduce((a, b) => a + b, 0);
const expected = totalNoi / totalUnits;

export const perUnitNormalization: ExcelTemplate = {
  id: 'per-unit-normalization',
  title: 'Portfolio-weighted NOI per unit',
  category: 'normalization',
  difficulty: 'beginner',
  scenario:
    'You\'re comparing four multifamily properties of different sizes. To compare them on a like-for-like basis, compute the *portfolio-weighted* NOI per unit — total NOI across the four divided by total units.',
  instruction:
    'In B6, compute total NOI / total units. Use SUM over both column ranges — don\'t average the per-property ratios (that\'d weight a 40-unit asset the same as a 75-unit asset).',
  targetCell: 'B6',
  expected,
  tolerancePct: 0.005,
  exampleFormula: '=SUM(B2:B5)/SUM(C2:C5)',
  layout: {
    rows: 6,
    cols: 3,
    cells: [
      { address: 'A1', role: 'header', text: 'Property' },
      { address: 'B1', role: 'header', text: 'NOI' },
      { address: 'C1', role: 'header', text: 'Units' },
      { address: 'A2', role: 'header', text: 'Park' },
      { address: 'B2', role: 'assumption', value: nois[0], format: 'usd' },
      { address: 'C2', role: 'assumption', value: units[0], format: 'number' },
      { address: 'A3', role: 'header', text: 'Oak' },
      { address: 'B3', role: 'assumption', value: nois[1], format: 'usd' },
      { address: 'C3', role: 'assumption', value: units[1], format: 'number' },
      { address: 'A4', role: 'header', text: 'River' },
      { address: 'B4', role: 'assumption', value: nois[2], format: 'usd' },
      { address: 'C4', role: 'assumption', value: units[2], format: 'number' },
      { address: 'A5', role: 'header', text: 'Hill' },
      { address: 'B5', role: 'assumption', value: nois[3], format: 'usd' },
      { address: 'C5', role: 'assumption', value: units[3], format: 'number' },
      { address: 'A6', role: 'header', text: 'NOI / unit' },
      { address: 'B6', role: 'target', format: 'usd' },
      { address: 'C6', role: 'spacer' },
    ],
  },
  takeaway:
    'Portfolio-weighted ratios are the right way to roll up across mismatched property sizes. Averaging the four per-unit ratios would give a different (smaller) number because each property would carry equal weight regardless of size — not what you want when one asset is twice as big as another.',
  solution: `Total NOI = $${totalNoi.toLocaleString()}; total units = ${totalUnits}; weighted NOI per unit = $${Math.round(expected).toLocaleString()}.`,
};
