import { value } from './core';

export function capCompressionPctChange(oldCap: number, newCap: number): number {
  return oldCap / newCap - 1;
}

export function valueDeltaFromNoiDelta(noiDelta: number, capRate: number): number {
  return noiDelta / capRate;
}

export function vacancyNoiDelta(params: {
  gpr: number;
  otherIncome?: number;
  oldVacancy: number;
  newVacancy: number;
}): number {
  const other = params.otherIncome ?? 0;
  const gross = params.gpr + other;
  return gross * (params.oldVacancy - params.newVacancy);
}

export function rentNoiDelta(params: {
  oldRent: number;
  newRent: number;
  vacancyRate: number;
}): number {
  return (params.newRent - params.oldRent) * (1 - params.vacancyRate);
}

export function otherIncomeValueDelta(params: {
  otherIncomeDelta: number;
  vacancyRate: number;
  capRate: number;
}): number {
  return valueDeltaFromNoiDelta(
    params.otherIncomeDelta * (1 - params.vacancyRate),
    params.capRate,
  );
}

export function opexValueDelta(params: {
  opexDelta: number;
  capRate: number;
}): number {
  return valueDeltaFromNoiDelta(-params.opexDelta, params.capRate);
}

export function pctValueChange(oldValue: number, newValue: number): number {
  return newValue / oldValue - 1;
}

export function valueAt(noi: number, capRate: number): number {
  return value(noi, capRate);
}
