import { describe, it, expect } from 'vitest';
import { equityMultiple, irrSingle, requiredMultiple, requiredEquityOut } from '../returns';

describe('math/returns', () => {
  it('equityMultiple = out / in', () => {
    expect(equityMultiple(10_000_000, 23_000_000)).toBe(2.3);
    expect(equityMultiple(5_000_000, 5_000_000)).toBe(1.0);
  });

  it('irrSingle: $10M → $18M in 5 years ≈ 12.47%', () => {
    expect(irrSingle(10_000_000, 18_000_000, 5)).toBeCloseTo(0.12475, 4);
  });

  it('irrSingle: 2x in 5 years ≈ 14.87% (rule of 72 sanity)', () => {
    expect(irrSingle(1, 2, 5)).toBeCloseTo(0.1487, 3);
  });

  it('requiredMultiple: 15% IRR over 5y ≈ 2.01x', () => {
    expect(requiredMultiple(0.15, 5)).toBeCloseTo(2.011, 2);
  });

  it('requiredEquityOut: $10M @ 20% IRR over 4y ≈ $20.736M', () => {
    expect(requiredEquityOut(10_000_000, 0.2, 4)).toBeCloseTo(20_736_000, 0);
  });

  it('round-trip: requiredMultiple ↔ irrSingle', () => {
    const irr = 0.175;
    const years = 7;
    const em = requiredMultiple(irr, years);
    expect(irrSingle(1, em, years)).toBeCloseTo(irr, 10);
  });
});
