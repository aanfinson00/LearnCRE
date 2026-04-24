export function cagr(startValue: number, endValue: number, years: number): number {
  return Math.pow(endValue / startValue, 1 / years) - 1;
}

export function compoundGrowth(startValue: number, rate: number, years: number): number {
  return startValue * Math.pow(1 + rate, years);
}

export function reversionValue(exitNoi: number, exitCapRate: number): number {
  return exitNoi / exitCapRate;
}

export function operatingExpenseRatio(opex: number, egi: number): number {
  return opex / egi;
}

export function noiFromOer(egi: number, opexRatio: number): number {
  return egi * (1 - opexRatio);
}

export function perUnit(total: number, units: number): number {
  return total / units;
}
