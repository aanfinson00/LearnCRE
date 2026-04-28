import { describe, expect, it } from 'vitest';
import { FormulaError, a1ToCellRef, cellRefToA1, parseFormula } from '../parser';

describe('excel/parser — cell address helpers', () => {
  it('round-trips A1', () => {
    const ref = a1ToCellRef('A1')!;
    expect(ref).toMatchObject({ col: 0, row: 0, absCol: false, absRow: false });
    expect(cellRefToA1(ref)).toBe('A1');
  });

  it('parses absolute markers', () => {
    expect(a1ToCellRef('$A$1')).toMatchObject({ absCol: true, absRow: true });
    expect(a1ToCellRef('$A1')).toMatchObject({ absCol: true, absRow: false });
    expect(a1ToCellRef('A$1')).toMatchObject({ absCol: false, absRow: true });
  });

  it('parses multi-letter columns', () => {
    expect(a1ToCellRef('AA1')).toMatchObject({ col: 26, row: 0 });
    expect(cellRefToA1({ col: 26, row: 0, absCol: false, absRow: false })).toBe('AA1');
  });

  it('rejects invalid addresses', () => {
    expect(a1ToCellRef('A')).toBe(null);
    expect(a1ToCellRef('1A')).toBe(null);
    expect(a1ToCellRef('A1B')).toBe(null);
  });
});

describe('excel/parser — formula parsing', () => {
  it('parses leading "="', () => {
    const expr = parseFormula('=1+2');
    expect(expr.kind).toBe('binop');
  });

  it('parses naked formulas (no leading =)', () => {
    const expr = parseFormula('1+2');
    expect(expr.kind).toBe('binop');
  });

  it('respects operator precedence — *,/ over +,-', () => {
    // 1 + 2 * 3 should parse as 1 + (2 * 3)
    const expr = parseFormula('=1+2*3') as { kind: 'binop'; op: string; right: { kind: string } };
    expect(expr.kind).toBe('binop');
    expect(expr.op).toBe('+');
    expect(expr.right.kind).toBe('binop');
  });

  it('parses parens', () => {
    const expr = parseFormula('=(1+2)*3') as { kind: 'binop'; op: string; left: { kind: string } };
    expect(expr.kind).toBe('binop');
    expect(expr.op).toBe('*');
    expect(expr.left.kind).toBe('binop');
  });

  it('parses cell refs', () => {
    const expr = parseFormula('=A1+$B$2');
    expect(expr.kind).toBe('binop');
  });

  it('parses ranges', () => {
    const expr = parseFormula('=SUM(A1:A5)') as {
      kind: 'call';
      name: string;
      args: { kind: string }[];
    };
    expect(expr.kind).toBe('call');
    expect(expr.name).toBe('SUM');
    expect(expr.args[0].kind).toBe('range');
  });

  it('parses function calls with multiple args', () => {
    const expr = parseFormula('=ROUND(A1*0.1,2)') as { kind: 'call'; args: unknown[] };
    expect(expr.kind).toBe('call');
    expect(expr.args.length).toBe(2);
  });

  it('parses unary minus', () => {
    const expr = parseFormula('=-A1') as { kind: 'unary' };
    expect(expr.kind).toBe('unary');
  });

  it('rejects malformed input', () => {
    expect(() => parseFormula('=1+')).toThrow(FormulaError);
    expect(() => parseFormula('=SUM(')).toThrow(FormulaError);
    expect(() => parseFormula('=)1(')).toThrow(FormulaError);
    expect(() => parseFormula('=A1 B1')).toThrow(FormulaError);
  });

  it('uppercases function names', () => {
    const expr = parseFormula('=sum(A1:A2)') as { kind: 'call'; name: string };
    expect(expr.name).toBe('SUM');
  });
});
