import { capCompressionPctChange } from '../math/sensitivity';
import { loanConstant } from '../math/debt';
import { value as noiCapValue } from '../math/core';
import { requiredMultiple } from '../math/returns';
import { formatMultiple, formatPct, formatUsd, formatYears } from '../math/rounding';
import type { DrillVariant, DrillVariantAxis, DrillVariantId } from '../types/speedDrill';

const CAP_STEP = 0.005;
const capAxis = (n: number, min = 0.04, step = CAP_STEP): DrillVariantAxis => {
  const values: number[] = [];
  for (let i = 0; i < n; i++) values.push(+(min + i * step).toFixed(5));
  return { label: 'Cap rate', values, format: (v) => formatPct(v, 2) };
};

const CAP_PRESETS_CAP_COMPRESSION = {
  warmup: capAxis(5, 0.04, 0.01),
  standard: capAxis(7, 0.04, 0.005),
  gauntlet: capAxis(9, 0.04, 0.005),
};

const capCompressionVariant: DrillVariant = {
  id: 'capCompression',
  name: 'Cap Rate × Cap Rate',
  description: 'Rows = starting cap, columns = ending cap. Cell = % value change.',
  rowAxis: CAP_PRESETS_CAP_COMPRESSION.standard,
  colAxis: CAP_PRESETS_CAP_COMPRESSION.standard,
  computeCell: capCompressionPctChange,
  unit: 'pctChange',
  toleranceBand: 0.05,
  isDiagonalZero: true,
  formulaLabel: '%Δ value = (oldCap / newCap) − 1',
  inputHint: 'e.g. 6 for +6%',
};

const irrToEmVariant: DrillVariant = {
  id: 'irrToEm',
  name: 'IRR × Hold Years → Equity Multiple',
  description: 'Rows = IRR, columns = hold years. Cell = required EM (×).',
  rowAxis: {
    label: 'IRR',
    values: [0.08, 0.1, 0.12, 0.15, 0.17, 0.2, 0.25],
    format: (v) => formatPct(v, 0),
  },
  colAxis: {
    label: 'Hold years',
    values: [3, 5, 7, 10],
    format: formatYears,
  },
  computeCell: requiredMultiple,
  unit: 'multiple',
  toleranceBand: 0.05,
  isDiagonalZero: false,
  formulaLabel: 'EM = (1 + IRR)^years',
  inputHint: 'e.g. 2.3 for 2.3×',
};

const loanConstantVariant: DrillVariant = {
  id: 'loanConstant',
  name: 'Rate × Amort Years → Loan Constant',
  description: 'Rows = interest rate, columns = amort years. Cell = loan constant (bps).',
  rowAxis: {
    label: 'Rate',
    values: [0.045, 0.05, 0.055, 0.06, 0.065, 0.07, 0.075],
    format: (v) => formatPct(v, 2),
  },
  colAxis: {
    label: 'Amort',
    values: [20, 25, 30],
    format: formatYears,
  },
  computeCell: (rate, years) => Math.round(loanConstant(rate, years) * 10_000),
  unit: 'bps',
  toleranceBand: 0.02,
  isDiagonalZero: false,
  formulaLabel: 'constant = PMT(r/12, years×12, -1) × 12 × 10,000 bps',
  inputHint: 'e.g. 720 bps',
};

const noiCapToValueVariant: DrillVariant = {
  id: 'noiCapToValue',
  name: 'NOI × Cap → Value',
  description: 'Rows = NOI, columns = cap. Cell = property value.',
  rowAxis: {
    label: 'NOI',
    values: [500_000, 1_000_000, 2_500_000, 5_000_000, 10_000_000],
    format: formatUsd,
  },
  colAxis: {
    label: 'Cap rate',
    values: [0.04, 0.045, 0.05, 0.055, 0.06, 0.065, 0.07, 0.08],
    format: (v) => formatPct(v, 2),
  },
  computeCell: (noi, cap) => noiCapValue(noi, cap),
  unit: 'usd',
  toleranceBand: 0.03,
  isDiagonalZero: false,
  formulaLabel: 'value = NOI / cap',
  inputHint: 'e.g. 20000000',
};

const percentOfVariant: DrillVariant = {
  id: 'percentOf',
  name: 'A × B%  (percent of a number)',
  description: 'Rows = dollar amount, columns = percent. Cell = A × B%.',
  rowAxis: {
    label: '$ amount',
    values: [100_000, 500_000, 1_000_000, 2_500_000, 5_000_000, 10_000_000],
    format: formatUsd,
  },
  colAxis: {
    label: 'Percent',
    values: [0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.1],
    format: (v) => formatPct(v, 0),
  },
  computeCell: (a, b) => a * b,
  unit: 'usd',
  toleranceBand: 0.03,
  isDiagonalZero: false,
  formulaLabel: 'answer = A × B',
  inputHint: 'e.g. 300000',
};

const divideByVariant: DrillVariant = {
  id: 'divideBy',
  name: 'A / B%  (dollars over a rate)',
  description: 'Rows = dollar amount, columns = percent. Cell = A / B%.',
  rowAxis: {
    label: '$ amount',
    values: [50_000, 100_000, 250_000, 500_000, 1_000_000, 2_500_000],
    format: formatUsd,
  },
  colAxis: {
    label: 'Percent',
    values: [0.04, 0.05, 0.06, 0.07, 0.08, 0.1],
    format: (v) => formatPct(v, 0),
  },
  computeCell: (a, b) => a / b,
  unit: 'usd',
  toleranceBand: 0.03,
  isDiagonalZero: false,
  formulaLabel: 'answer = A / B',
  inputHint: 'e.g. 8330000',
};

const combinedDiscountVariant: DrillVariant = {
  id: 'combinedDiscount',
  name: '(1−A) × (1−B)  (stacked haircuts)',
  description: 'Rows = A%, columns = B%. Cell = (1 − A) × (1 − B).',
  rowAxis: {
    label: 'A',
    values: [0.02, 0.03, 0.05, 0.07, 0.1, 0.15],
    format: (v) => formatPct(v, 0),
  },
  colAxis: {
    label: 'B',
    values: [0.3, 0.35, 0.4, 0.45, 0.5],
    format: (v) => formatPct(v, 0),
  },
  computeCell: (a, b) => (1 - a) * (1 - b),
  unit: 'pct',
  toleranceBand: 0.02,
  isDiagonalZero: false,
  formulaLabel: 'answer = (1 − A) × (1 − B)',
  inputHint: 'e.g. 57 for 57%',
};

const nthRootVariant: DrillVariant = {
  id: 'nthRoot',
  name: 'A^(1/B) − 1  (rate from multiple + periods)',
  description: 'Rows = multiple, columns = periods. Cell = A^(1/B) − 1.',
  rowAxis: {
    label: 'Multiple',
    values: [1.25, 1.5, 1.75, 2.0, 2.5, 3.0],
    format: (v) => formatMultiple(v, 2),
  },
  colAxis: {
    label: 'Periods',
    values: [3, 5, 7, 10],
    format: formatYears,
  },
  computeCell: (mult, n) => Math.pow(mult, 1 / n) - 1,
  unit: 'pct',
  toleranceBand: 0.05,
  isDiagonalZero: false,
  formulaLabel: 'answer = A^(1/B) − 1',
  inputHint: 'e.g. 14.9 for 14.9%',
};

const reciprocalVariant: DrillVariant = {
  id: 'reciprocalTable',
  name: '1 / N  (integer reciprocals as %)',
  description: 'Rows = integer group, columns = offset. Cell = 1 / (row+col).',
  rowAxis: {
    label: 'Base',
    values: [2, 8, 16],
    format: (v) => `${v}`,
  },
  colAxis: {
    label: '+offset',
    values: [0, 1, 2, 3, 4, 5],
    format: (v) => `+${v}`,
  },
  computeCell: (base, offset) => 1 / (base + offset),
  unit: 'pct',
  toleranceBand: 0.02,
  isDiagonalZero: false,
  formulaLabel: 'answer = 1 / (row + col)',
  inputHint: 'e.g. 12.5 for 1/8',
};

export const variants: Record<DrillVariantId, DrillVariant> = {
  capCompression: capCompressionVariant,
  irrToEm: irrToEmVariant,
  loanConstant: loanConstantVariant,
  noiCapToValue: noiCapToValueVariant,
  percentOf: percentOfVariant,
  divideBy: divideByVariant,
  combinedDiscount: combinedDiscountVariant,
  nthRoot: nthRootVariant,
  reciprocalTable: reciprocalVariant,
};

export const variantOrder: DrillVariantId[] = [
  'capCompression',
  'irrToEm',
  'loanConstant',
  'noiCapToValue',
  'percentOf',
  'divideBy',
  'combinedDiscount',
  'nthRoot',
  'reciprocalTable',
];

export const CAP_PRESETS = {
  warmup: CAP_PRESETS_CAP_COMPRESSION.warmup.values,
  standard: CAP_PRESETS_CAP_COMPRESSION.standard.values,
  gauntlet: CAP_PRESETS_CAP_COMPRESSION.gauntlet.values,
} as const;

export function formatCellExpected(v: DrillVariant, val: number): string {
  switch (v.unit) {
    case 'pctChange':
      return val === 0 ? '0.0%' : `${val > 0 ? '+' : ''}${(val * 100).toFixed(1)}%`;
    case 'multiple':
      return formatMultiple(val, 2);
    case 'bps':
      return `${Math.round(val)} bps`;
    case 'usd':
      return formatUsd(val);
    case 'pct':
      return formatPct(val, 2);
    default:
      return String(val);
  }
}

export function formatCellUserInput(v: DrillVariant, val: number): string {
  return formatCellExpected(v, val);
}

export function parseCellInput(v: DrillVariant, raw: string): number | null {
  const trimmed = raw.trim();
  if (trimmed === '' || trimmed === '-' || trimmed === '+' || trimmed === '.') return null;
  let cleaned = trimmed.replace(/%$/, '').replace(/\s*bps$/i, '').replace(/x$/i, '');
  cleaned = cleaned.replace(/[$,\s]/g, '');
  if (cleaned === '' || cleaned === '-' || cleaned === '+') return null;
  const num = Number(cleaned);
  if (!Number.isFinite(num)) return null;
  switch (v.unit) {
    case 'pct':
    case 'pctChange':
      return num / 100;
    case 'bps':
      return Math.round(num);
    default:
      return num;
  }
}
