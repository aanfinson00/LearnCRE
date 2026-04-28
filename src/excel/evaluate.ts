import { FormulaError, cellRefToA1, parseFormula } from './parser';
import type { CellRef, EvalValue, Expr, Sheet } from './types';

function rangeAddresses(start: CellRef, end: CellRef): string[] {
  const colA = Math.min(start.col, end.col);
  const colB = Math.max(start.col, end.col);
  const rowA = Math.min(start.row, end.row);
  const rowB = Math.max(start.row, end.row);
  const out: string[] = [];
  for (let r = rowA; r <= rowB; r++) {
    for (let c = colA; c <= colB; c++) {
      out.push(
        cellRefToA1({ col: c, row: r, absCol: false, absRow: false }),
      );
    }
  }
  return out;
}

function lookup(sheet: Sheet, addr: string): number {
  const v = sheet[addr];
  if (typeof v === 'number') return v;
  // Default empty cells to 0 (matches Excel behavior in arithmetic contexts)
  return 0;
}

function coerceScalar(v: EvalValue, ctx: string): number {
  if (Array.isArray(v)) {
    throw new FormulaError(`${ctx}: expected a single value, got a range`);
  }
  return v;
}

function flatten(values: EvalValue[]): number[] {
  const out: number[] = [];
  for (const v of values) {
    if (Array.isArray(v)) out.push(...v);
    else out.push(v);
  }
  return out;
}

// ---------------- Finance helpers ----------------

/** PMT: payment for a loan with rate per period, nper periods, pv (positive), fv (default 0). */
function pmt(rate: number, nper: number, pv: number, fv = 0): number {
  if (rate === 0) return -(pv + fv) / nper;
  const r = rate;
  const f = Math.pow(1 + r, nper);
  return -(pv * f + fv) * (r / (f - 1));
}

/** NPV: classic Excel signature — discount rate + cash-flow series; t=1 for first arg. */
function npv(rate: number, cashflows: number[]): number {
  let acc = 0;
  for (let i = 0; i < cashflows.length; i++) {
    acc += cashflows[i] / Math.pow(1 + rate, i + 1);
  }
  return acc;
}

/** IRR via Newton's method with bisection fallback. Returns NaN if no root. */
function irr(cashflows: number[], guess = 0.1): number {
  if (cashflows.length < 2) return NaN;
  // Validate signs: must have at least one positive and one negative
  let hasPos = false;
  let hasNeg = false;
  for (const cf of cashflows) {
    if (cf > 0) hasPos = true;
    if (cf < 0) hasNeg = true;
  }
  if (!hasPos || !hasNeg) return NaN;

  const f = (rate: number): number => {
    let v = 0;
    for (let t = 0; t < cashflows.length; t++) {
      v += cashflows[t] / Math.pow(1 + rate, t);
    }
    return v;
  };
  const fPrime = (rate: number): number => {
    let v = 0;
    for (let t = 1; t < cashflows.length; t++) {
      v -= (t * cashflows[t]) / Math.pow(1 + rate, t + 1);
    }
    return v;
  };
  let r = guess;
  for (let i = 0; i < 50; i++) {
    const fr = f(r);
    if (Math.abs(fr) < 1e-9) return r;
    const fpr = fPrime(r);
    if (fpr === 0) break;
    const next = r - fr / fpr;
    if (!Number.isFinite(next)) break;
    if (Math.abs(next - r) < 1e-10) return next;
    r = Math.max(-0.999, next);
  }
  // Fallback: bisection over [-0.99, 10]
  let lo = -0.99;
  let hi = 10;
  let flo = f(lo);
  let fhi = f(hi);
  if (flo * fhi > 0) return NaN;
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    const fm = f(mid);
    if (Math.abs(fm) < 1e-9) return mid;
    if (flo * fm < 0) {
      hi = mid;
      fhi = fm;
    } else {
      lo = mid;
      flo = fm;
    }
  }
  return (lo + hi) / 2;
}

// ---------------- Function dispatch ----------------

type FnHandler = (args: EvalValue[]) => number;

const FUNCTIONS: Record<string, FnHandler> = {
  SUM: (args) => flatten(args).reduce((a, b) => a + b, 0),
  AVERAGE: (args) => {
    const xs = flatten(args);
    if (xs.length === 0) throw new FormulaError('AVERAGE: empty range');
    return xs.reduce((a, b) => a + b, 0) / xs.length;
  },
  MIN: (args) => {
    const xs = flatten(args);
    if (xs.length === 0) throw new FormulaError('MIN: empty range');
    return Math.min(...xs);
  },
  MAX: (args) => {
    const xs = flatten(args);
    if (xs.length === 0) throw new FormulaError('MAX: empty range');
    return Math.max(...xs);
  },
  ROUND: (args) => {
    if (args.length < 1 || args.length > 2) {
      throw new FormulaError('ROUND: expected 1 or 2 arguments');
    }
    const v = coerceScalar(args[0], 'ROUND value');
    const digits = args.length === 2 ? coerceScalar(args[1], 'ROUND digits') : 0;
    const k = Math.pow(10, digits);
    return Math.round(v * k) / k;
  },
  ABS: (args) => Math.abs(coerceScalar(args[0], 'ABS')),
  IF: (args) => {
    if (args.length !== 3) throw new FormulaError('IF: expected 3 arguments');
    const cond = coerceScalar(args[0], 'IF condition');
    return cond ? coerceScalar(args[1], 'IF then') : coerceScalar(args[2], 'IF else');
  },
  PMT: (args) => {
    if (args.length < 3 || args.length > 4) {
      throw new FormulaError('PMT: expected 3 or 4 arguments (rate, nper, pv, [fv])');
    }
    const rate = coerceScalar(args[0], 'PMT rate');
    const nper = coerceScalar(args[1], 'PMT nper');
    const pv = coerceScalar(args[2], 'PMT pv');
    const fv = args.length === 4 ? coerceScalar(args[3], 'PMT fv') : 0;
    return pmt(rate, nper, pv, fv);
  },
  NPV: (args) => {
    if (args.length < 2) throw new FormulaError('NPV: expected at least 2 arguments');
    const rate = coerceScalar(args[0], 'NPV rate');
    const cashflows = flatten(args.slice(1));
    return npv(rate, cashflows);
  },
  IRR: (args) => {
    if (args.length < 1 || args.length > 2) {
      throw new FormulaError('IRR: expected 1 or 2 arguments (values, [guess])');
    }
    const cashflows = flatten([args[0]]);
    const guess = args.length === 2 ? coerceScalar(args[1], 'IRR guess') : 0.1;
    const r = irr(cashflows, guess);
    if (!Number.isFinite(r)) throw new FormulaError('IRR: no convergent rate');
    return r;
  },
};

// ---------------- Evaluator ----------------

export function evaluate(expr: Expr, sheet: Sheet): EvalValue {
  switch (expr.kind) {
    case 'num':
      return expr.value;
    case 'cell':
      return lookup(sheet, cellRefToA1({ ...expr.ref, absCol: false, absRow: false }));
    case 'range': {
      const addrs = rangeAddresses(expr.start, expr.end);
      return addrs.map((a) => lookup(sheet, a));
    }
    case 'unary': {
      const v = coerceScalar(evaluate(expr.expr, sheet), 'unary');
      return -v;
    }
    case 'binop': {
      const l = coerceScalar(evaluate(expr.left, sheet), `binop '${expr.op}' lhs`);
      const r = coerceScalar(evaluate(expr.right, sheet), `binop '${expr.op}' rhs`);
      switch (expr.op) {
        case '+':
          return l + r;
        case '-':
          return l - r;
        case '*':
          return l * r;
        case '/':
          if (r === 0) throw new FormulaError('division by zero');
          return l / r;
        case '^':
          return Math.pow(l, r);
      }
      // exhaustive
      throw new FormulaError(`unhandled operator`);
    }
    case 'call': {
      const handler = FUNCTIONS[expr.name];
      if (!handler) {
        const known = Object.keys(FUNCTIONS).sort();
        const closest = known.find((k) => k.startsWith(expr.name[0] ?? ''));
        const hint = closest ? ` — did you mean ${closest}?` : '';
        throw new FormulaError(`unknown function '${expr.name}'${hint}`);
      }
      const args = expr.args.map((a) => evaluate(a, sheet));
      return handler(args);
    }
  }
}

/** Parse + evaluate in one shot. Throws FormulaError on failure. */
export function evaluateFormula(input: string, sheet: Sheet): number {
  const expr = parseFormula(input);
  const v = evaluate(expr, sheet);
  if (Array.isArray(v)) {
    throw new FormulaError('formula must produce a single value, not a range');
  }
  return v;
}
