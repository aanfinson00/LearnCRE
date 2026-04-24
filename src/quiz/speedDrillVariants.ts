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

export const variants: Record<DrillVariantId, DrillVariant> = {
  capCompression: capCompressionVariant,
  irrToEm: irrToEmVariant,
  loanConstant: loanConstantVariant,
  noiCapToValue: noiCapToValueVariant,
};

export const variantOrder: DrillVariantId[] = [
  'capCompression',
  'irrToEm',
  'loanConstant',
  'noiCapToValue',
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
