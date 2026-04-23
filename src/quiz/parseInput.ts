import type { UnitFormat } from '../types/question';

export function parseInput(raw: string, unit: UnitFormat): number | null {
  const cleaned = raw.replace(/[$,\s]/g, '').replace(/%$/, '').replace(/x$/i, '');
  if (cleaned === '' || cleaned === '-' || cleaned === '+' || cleaned === '.') return null;
  const num = Number(cleaned);
  if (!Number.isFinite(num)) return null;

  switch (unit) {
    case 'pct':
    case 'pctChange':
      return num / 100;
    case 'bps':
      return Math.round(num);
    default:
      return num;
  }
}
