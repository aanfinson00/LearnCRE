export function loanConstant(
  annualRate: number,
  years: number,
  periodsPerYear = 12,
): number {
  const i = annualRate / periodsPerYear;
  const n = years * periodsPerYear;
  if (i === 0) return 1 / years;
  const payment = i / (1 - Math.pow(1 + i, -n));
  return payment * periodsPerYear;
}

export function annualDebtService(loan: number, annualRate: number, years: number): number {
  return loan * loanConstant(annualRate, years);
}

export function debtYield(noi: number, loan: number): number {
  return noi / loan;
}

export function maxLoanByDebtYield(noi: number, debtYieldTarget: number): number {
  return noi / debtYieldTarget;
}

export function maxLoanByDscr(params: {
  noi: number;
  dscrTarget: number;
  annualRate: number;
  years: number;
}): number {
  const constant = loanConstant(params.annualRate, params.years);
  return params.noi / (params.dscrTarget * constant);
}

export function dscr(noi: number, debtServiceAnnual: number): number {
  return noi / debtServiceAnnual;
}

export function cashOnCash(params: {
  noi: number;
  debtServiceAnnual: number;
  equity: number;
}): number {
  return (params.noi - params.debtServiceAnnual) / params.equity;
}

export function breakEvenOccupancy(params: {
  opex: number;
  debtServiceAnnual: number;
  pgi: number;
}): number {
  return (params.opex + params.debtServiceAnnual) / params.pgi;
}

/** Max loan from an LTV constraint: appraisedValue × ltv. */
export function maxLoanByLtv(appraisedValue: number, ltv: number): number {
  return appraisedValue * ltv;
}

/** Annual interest-only debt service: loanAmount × annualRate. */
export function interestOnlyPayment(loanAmount: number, annualRate: number): number {
  return loanAmount * annualRate;
}

/** DSCR net of annual reserves: (NOI − reserves) / debtService. */
export function dscrNetOfReserves(
  noi: number,
  annualReserves: number,
  debtService: number,
): number {
  if (debtService <= 0) return 0;
  return (noi - annualReserves) / debtService;
}

export function leveredIrrApprox(params: {
  unleveredIrr: number;
  borrowRate: number;
  ltv: number;
}): number {
  const { unleveredIrr, borrowRate, ltv } = params;
  return unleveredIrr + (ltv * (unleveredIrr - borrowRate)) / (1 - ltv);
}
