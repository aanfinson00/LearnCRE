import type { UnitFormat } from '../types/question';

export function parseInput(raw: string, unit: UnitFormat): number | null {
  let cleaned = raw
    .replace(/[$,\s]/g, '')
    .replace(/\/SF$/i, '')
    .replace(/bps?$/i, '')
    .replace(/%$/, '')
    .replace(/x$/i, '');

  // Dollar shorthand people type in mental-math drills: 250k, 47.8M, 47.8mm, 1.2B.
  let scale = 1;
  if (unit === 'usd' || unit === 'usdChange' || unit === 'usdPerSf') {
    const m = cleaned.match(/^(.*?)(k|mm|m|b)$/i);
    if (m) {
      cleaned = m[1];
      const suffix = m[2].toLowerCase();
      scale = suffix === 'k' ? 1e3 : suffix === 'b' ? 1e9 : 1e6;
    }
  }

  if (cleaned === '' || cleaned === '-' || cleaned === '+' || cleaned === '.') return null;
  const parsed = Number(cleaned);
  if (!Number.isFinite(parsed)) return null;
  const num = parsed * scale;

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
