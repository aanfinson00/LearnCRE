import { describe, expect, it } from 'vitest';
import { evaluateScratch } from '../scratch';

describe('excel/scratch — evaluateScratch', () => {
  it('evaluates literal values', () => {
    const r = evaluateScratch({ A1: '100', A2: '200' });
    expect(r.values.A1).toBe(100);
    expect(r.values.A2).toBe(200);
    expect(r.errors).toEqual({});
  });

  it('evaluates dependent formulas in topo order', () => {
    const r = evaluateScratch({
      A1: '=B1*2',
      B1: '=C1+5',
      C1: '10',
    });
    expect(r.values.C1).toBe(10);
    expect(r.values.B1).toBe(15);
    expect(r.values.A1).toBe(30);
  });

  it('handles ranges and SUM', () => {
    const r = evaluateScratch({
      A1: '1',
      A2: '2',
      A3: '3',
      B1: '=SUM(A1:A3)',
    });
    expect(r.values.B1).toBe(6);
  });

  it('detects direct circular references', () => {
    const r = evaluateScratch({
      A1: '=B1+1',
      B1: '=A1+1',
    });
    expect(r.errors.A1).toContain('#CIRC');
    expect(r.errors.B1).toContain('#CIRC');
  });

  it('detects indirect cycles via SUM', () => {
    const r = evaluateScratch({
      A1: '=SUM(B1:C1)',
      B1: '=A1*2',
      C1: '5',
    });
    expect(r.errors.A1).toContain('#CIRC');
    expect(r.errors.B1).toContain('#CIRC');
    expect(r.values.C1).toBe(5);
  });

  it('reports parse errors per-cell without breaking other cells', () => {
    const r = evaluateScratch({
      A1: '=invalid syntax @@@',
      B1: '5',
    });
    expect(r.errors.A1).toBeDefined();
    expect(r.values.B1).toBe(5);
  });

  it('skips empty cells', () => {
    const r = evaluateScratch({ A1: '', A2: '   ', A3: '5' });
    expect(r.values).toEqual({ A3: 5 });
    expect(r.errors).toEqual({});
  });

  it('handles ranges that include empty cells (default to 0)', () => {
    const r = evaluateScratch({
      A1: '10',
      A3: '20',
      B1: '=SUM(A1:A3)',
    });
    // A2 not set, evaluator treats as 0
    expect(r.values.B1).toBe(30);
  });
});
