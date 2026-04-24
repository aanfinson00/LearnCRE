export function netEffectiveRent(params: {
  grossRentPerSf: number;
  leaseTermYears: number;
  tiPerSf: number;
  freeMonths: number;
}): number {
  const months = params.leaseTermYears * 12;
  const grossTotal = params.grossRentPerSf * params.leaseTermYears;
  const freeRent = (params.grossRentPerSf / 12) * params.freeMonths;
  const netTotalPerSf = grossTotal - params.tiPerSf - freeRent;
  return (netTotalPerSf / months) * 12;
}

export function effectiveRentCostPerSf(params: {
  rentPerSf: number;
  tiPerSf: number;
  leaseTermYears: number;
}): number {
  const total = params.rentPerSf * params.leaseTermYears - params.tiPerSf;
  return total / params.leaseTermYears;
}

export function tiVsRentDelta(params: {
  rentA: number;
  tiA: number;
  rentB: number;
  tiB: number;
  leaseTermYears: number;
}): number {
  const a = effectiveRentCostPerSf({
    rentPerSf: params.rentA,
    tiPerSf: params.tiA,
    leaseTermYears: params.leaseTermYears,
  });
  const b = effectiveRentCostPerSf({
    rentPerSf: params.rentB,
    tiPerSf: params.tiB,
    leaseTermYears: params.leaseTermYears,
  });
  return a - b;
}

export function requiredRentPremiumPerSf(params: {
  tiPerSf: number;
  paybackYears: number;
}): number {
  return params.tiPerSf / params.paybackYears;
}

export function rentRollNoiChange(params: {
  oldRentPerSf: number;
  newRentPerSf: number;
  subjectSf: number;
  vacancy: number;
}): number {
  return (params.newRentPerSf - params.oldRentPerSf) * params.subjectSf * (1 - params.vacancy);
}

export function rentRollValueChange(params: {
  oldRentPerSf: number;
  newRentPerSf: number;
  subjectSf: number;
  vacancy: number;
  capRate: number;
}): number {
  return rentRollNoiChange(params) / params.capRate;
}

export function taxReassessmentValueImpact(params: {
  purchasePrice: number;
  oldAnnualTax: number;
  newTaxRate: number;
  capRate: number;
}): number {
  const newTax = params.purchasePrice * params.newTaxRate;
  const taxDelta = newTax - params.oldAnnualTax;
  return -taxDelta / params.capRate;
}
