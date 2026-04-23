import { describe, it, expect } from 'vitest';
import { value, capRate, egi, noi, impliedValue } from '../core';

describe('math/core', () => {
  it('value = NOI / cap rate', () => {
    expect(value(1_000_000, 0.05)).toBe(20_000_000);
    expect(value(500_000, 0.06)).toBeCloseTo(8_333_333.333, 3);
  });

  it('cap rate = NOI / value (round-trip)', () => {
    const v = value(800_000, 0.055);
    expect(capRate(v, 800_000)).toBeCloseTo(0.055, 10);
  });

  it('EGI = (GPR + other) * (1 - vacancy)', () => {
    expect(egi({ gpr: 1_000_000, otherIncome: 50_000, vacancyRate: 0.05 })).toBe(997_500);
    expect(egi({ gpr: 1_000_000, vacancyRate: 0.0 })).toBe(1_000_000);
  });

  it('NOI = EGI - OpEx', () => {
    expect(noi({ gpr: 1_000_000, otherIncome: 50_000, vacancyRate: 0.05, opex: 400_000 })).toBe(
      597_500,
    );
  });

  it('impliedValue chains NOI and cap rate', () => {
    expect(
      impliedValue({
        gpr: 1_000_000,
        otherIncome: 0,
        vacancyRate: 0.0,
        opex: 400_000,
        capRate: 0.06,
      }),
    ).toBeCloseTo(10_000_000, 6);
  });
});
