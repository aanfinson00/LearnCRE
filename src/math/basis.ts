export function pricePerSf(purchasePrice: number, buildingSf: number): number {
  return purchasePrice / buildingSf;
}

export function allInBasis(params: {
  purchasePrice: number;
  capex: number;
  closingCostRate: number;
  buildingSf: number;
}): number {
  const closingCosts = params.purchasePrice * params.closingCostRate;
  const total = params.purchasePrice + params.capex + closingCosts;
  return total / params.buildingSf;
}

export function totalProjectCost(params: {
  purchasePrice: number;
  capex: number;
  closingCostRate: number;
}): number {
  return params.purchasePrice + params.capex + params.purchasePrice * params.closingCostRate;
}

export function yieldOnCost(noi: number, projectCost: number): number {
  return noi / projectCost;
}

export function developmentSpread(yoc: number, marketCap: number): number {
  return yoc - marketCap;
}

export function replacementCost(perSf: number, buildingSf: number): number {
  return perSf * buildingSf;
}
