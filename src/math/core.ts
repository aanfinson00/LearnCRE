export function value(noi: number, capRate: number): number {
  return noi / capRate;
}

export function capRate(propertyValue: number, noi: number): number {
  return noi / propertyValue;
}

export function egi(params: {
  gpr: number;
  otherIncome?: number;
  vacancyRate: number;
}): number {
  const other = params.otherIncome ?? 0;
  return (params.gpr + other) * (1 - params.vacancyRate);
}

export function noi(params: {
  gpr: number;
  otherIncome?: number;
  vacancyRate: number;
  opex: number;
}): number {
  return egi(params) - params.opex;
}

export function impliedValue(params: {
  gpr: number;
  otherIncome?: number;
  vacancyRate: number;
  opex: number;
  capRate: number;
}): number {
  return value(noi(params), params.capRate);
}
