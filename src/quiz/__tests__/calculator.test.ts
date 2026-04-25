import { describe, it, expect } from 'vitest';
import { evaluateExpression, formatResult } from '../calculator';

describe('quiz/calculator', () => {
  it('basic arithmetic', () => {
    expect(evaluateExpression('2 + 2')).toBe(4);
    expect(evaluateExpression('10 - 3')).toBe(7);
    expect(evaluateExpression('6 * 7')).toBe(42);
    expect(evaluateExpression('20 / 4')).toBe(5);
  });

  it('parentheses respected', () => {
    expect(evaluateExpression('(2 + 3) * 4')).toBe(20);
    expect(evaluateExpression('2 + 3 * 4')).toBe(14);
  });

  it('M shorthand → millions', () => {
    expect(evaluateExpression('5M')).toBe(5_000_000);
    expect(evaluateExpression('1.5M + 500k')).toBe(2_000_000);
  });

  it('k shorthand → thousands', () => {
    expect(evaluateExpression('500k')).toBe(500_000);
    expect(evaluateExpression('250K')).toBe(250_000);
  });

  it('% shorthand → decimal', () => {
    expect(evaluateExpression('6%')).toBeCloseTo(0.06, 10);
    expect(evaluateExpression('5.25%')).toBeCloseTo(0.0525, 10);
  });

  it('caret → power', () => {
    expect(evaluateExpression('2^10')).toBe(1024);
    expect(evaluateExpression('(1.10)^5')).toBeCloseTo(1.61051, 4);
  });

  it('CRE example: other income at cap', () => {
    expect(evaluateExpression('100k / 6%')).toBeCloseTo(1_666_666.67, 1);
  });

  it('CRE example: combined proforma', () => {
    // 5M gross × (1 − 5% vac) × (1 − 40% opex) / 6% cap
    expect(evaluateExpression('5M * 95% * 60% / 6%')).toBeCloseTo(47_500_000, 0);
  });

  it('currency + commas are stripped', () => {
    expect(evaluateExpression('$1,250,000 + $750k')).toBe(2_000_000);
  });

  it('rejects invalid input', () => {
    expect(evaluateExpression('')).toBeNull();
    expect(evaluateExpression('abc')).toBeNull();
    expect(evaluateExpression('5M +')).toBeNull();
    expect(evaluateExpression('alert(1)')).toBeNull();
  });

  it('formatResult picks sensible unit', () => {
    expect(formatResult(5_000_000)).toContain('M');
    expect(formatResult(5_500)).toContain('k');
    expect(formatResult(0.06)).toContain('%');
    expect(formatResult(42)).toContain('42');
  });
});
