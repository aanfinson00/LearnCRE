export function equityMultiple(equityIn: number, equityOut: number): number {
  return equityOut / equityIn;
}

export function irrSingle(equityIn: number, equityOut: number, years: number): number {
  return Math.pow(equityOut / equityIn, 1 / years) - 1;
}

export function requiredMultiple(irr: number, years: number): number {
  return Math.pow(1 + irr, years);
}

export function requiredEquityOut(equityIn: number, irr: number, years: number): number {
  return equityIn * requiredMultiple(irr, years);
}

/**
 * Multi-period IRR via Newton's method with bisection fallback.
 * `cashflows[0]` is the initial outflow at t=0 (negative); subsequent entries
 * are at t=1, t=2, etc. Returns NaN if no sign change exists in the series.
 */
export function irrMulti(cashflows: number[], guess = 0.1): number {
  if (cashflows.length < 2) return NaN;
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
  // Bisection fallback
  let lo = -0.99;
  let hi = 10;
  let flo = f(lo);
  if (flo * f(hi) > 0) return NaN;
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    const fm = f(mid);
    if (Math.abs(fm) < 1e-9) return mid;
    if (flo * fm < 0) {
      hi = mid;
    } else {
      lo = mid;
      flo = fm;
    }
  }
  return (lo + hi) / 2;
}

