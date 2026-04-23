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
