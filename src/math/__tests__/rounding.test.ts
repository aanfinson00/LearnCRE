import { describe, it, expect } from 'vitest';
import {
  formatUsd,
  formatUsdSigned,
  formatPct,
  formatPctChange,
  formatBps,
  formatMultiple,
  roundToNearest,
} from '../rounding';

describe('math/rounding', () => {
  it('formatUsd', () => {
    expect(formatUsd(1_234_567)).toBe('$1,234,567');
    expect(formatUsd(0)).toBe('$0');
  });

  it('formatUsdSigned', () => {
    expect(formatUsdSigned(1000)).toBe('+$1,000');
    expect(formatUsdSigned(-1000)).toBe('-$1,000');
  });

  it('formatPct', () => {
    expect(formatPct(0.053)).toBe('5.30%');
    expect(formatPct(0.06, 0)).toBe('6%');
  });

  it('formatPctChange adds sign', () => {
    expect(formatPctChange(0.0566, 1)).toBe('+5.7%');
    expect(formatPctChange(-0.05)).toBe('-5.0%');
  });

  it('formatBps rounds', () => {
    expect(formatBps(0.0525)).toBe('525 bps');
    expect(formatBps(0.065)).toBe('650 bps');
  });

  it('formatMultiple', () => {
    expect(formatMultiple(2.345)).toBe('2.35x');
  });

  it('roundToNearest', () => {
    expect(roundToNearest(527, 25)).toBe(525);
    expect(roundToNearest(0.0527, 0.0005)).toBeCloseTo(0.0525, 10);
    expect(roundToNearest(0.0528, 0.0005)).toBeCloseTo(0.053, 10);
  });
});
