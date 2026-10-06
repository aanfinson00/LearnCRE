import { describe, it, expect } from 'vitest';
import { parseInput } from '../parseInput';

describe('quiz/parseInput', () => {
  it('usd strips $ and commas', () => {
    expect(parseInput('$1,250,000', 'usd')).toBe(1_250_000);
    expect(parseInput('1250000', 'usd')).toBe(1_250_000);
  });

  it('pct converts from display units to decimal', () => {
    expect(parseInput('5.3', 'pct')).toBeCloseTo(0.053, 10);
    expect(parseInput('6', 'pctChange')).toBeCloseTo(0.06, 10);
    expect(parseInput('-2.5%', 'pctChange')).toBeCloseTo(-0.025, 10);
  });

  it('bps is integer', () => {
    expect(parseInput('525', 'bps')).toBe(525);
    expect(parseInput('525.7', 'bps')).toBe(526);
  });

  it('multiple strips x suffix', () => {
    expect(parseInput('2.3x', 'multiple')).toBe(2.3);
    expect(parseInput('2.30', 'multiple')).toBe(2.3);
  });

  it('usd accepts k / M / mm / B shorthand', () => {
    expect(parseInput('250k', 'usd')).toBeCloseTo(250_000, 6);
    expect(parseInput('$47.8M', 'usd')).toBeCloseTo(47_800_000, 6);
    expect(parseInput('47.8mm', 'usd')).toBeCloseTo(47_800_000, 6);
    expect(parseInput('1.2B', 'usd')).toBeCloseTo(1_200_000_000, 6);
    expect(parseInput('-1.5m', 'usdChange')).toBeCloseTo(-1_500_000, 6);
  });

  it('bps accepts a bps suffix', () => {
    expect(parseInput('550bps', 'bps')).toBe(550);
    expect(parseInput('550 bp', 'bps')).toBe(550);
  });

  it('suffixes do not leak into non-dollar units', () => {
    expect(parseInput('5m', 'pct')).toBe(null);
  });

  it('returns null for empty or non-numeric', () => {
    expect(parseInput('', 'usd')).toBe(null);
    expect(parseInput('abc', 'usd')).toBe(null);
    expect(parseInput('-', 'pct')).toBe(null);
  });
});
