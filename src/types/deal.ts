export interface DealInputs {
  gpr?: number;
  otherIncome?: number;
  vacancyRate?: number;
  opex?: number;
  noi?: number;
  capRate?: number;
  newCapRate?: number;
  oldVacancy?: number;
  newVacancy?: number;
  oldOpex?: number;
  newOpex?: number;
  oldRent?: number;
  newRent?: number;
  purchasePrice?: number;
  exitCap?: number;
  equityIn?: number;
  equityOut?: number;
  holdYears?: number;
  targetIrr?: number;
  buildingSf?: number;
  capex?: number;
  closingCostRate?: number;
  totalProjectCost?: number;
  replacementCostPerSf?: number;
  marketCapRate?: number;
  stabilizedNoi?: number;
  loanAmount?: number;
  debtYieldTarget?: number;
  dscrTarget?: number;
  interestRate?: number;
  amortYears?: number;
  debtServiceAnnual?: number;
  ltv?: number;
  unleveredIrr?: number;
  borrowRate?: number;
  pgiPerSf?: number;
  opexRatio?: number;
  pgi?: number;
  rentPerSf?: number;
  oldRentPerSf?: number;
  newRentPerSf?: number;
  tiPerSf?: number;
  altTiPerSf?: number;
  leaseTermYears?: number;
  freeMonths?: number;
  rolloverPct?: number;
  paybackYears?: number;
  altRentPerSf?: number;
  oldAnnualTax?: number;
  newTaxRate?: number;
  units?: number;
  startValue?: number;
  endValue?: number;
  growthRate?: number;
  projectionYears?: number;
  egi?: number;
  opexRatioValue?: number;
  rentPerUnitValue?: number;
  opexPerUnitValue?: number;
  pricePerUnitValue?: number;
  // Capital-stack waterfall fields
  lpCapital?: number;
  gpCapital?: number;
  prefRate?: number;
  catchUpTargetGpPct?: number;
  totalDistributable?: number;
  prefPaid?: number;
  residual?: number;
  gpSplitPct?: number;
  lpSplitPct?: number;
  gpTake?: number;
  irrBeforePromote?: number;
  promotePctOfProfit?: number;
  // Construction draw fields
  totalBudget?: number;
  incurred?: number;
  retainagePct?: number;
  contingency?: number;
  hardCostBudget?: number;
  overrunsToDate?: number;
  equityCommitted?: number;
  equityDrawnSoFar?: number;
  lenderCommitted?: number;
  drawAmount?: number;
  drawCount?: number;
  cumulativeDraws?: number;
  // Asset-class-specific fields (Phase E)
  adr?: number;
  roomsAvailable?: number;
  roomsSold?: number;
  totalRevenue?: number;
  ffeReserveRate?: number;
  walt?: number;
  leases?: { rent: number; remainingTerm: number }[];
  marketRent?: number;
  inPlaceRent?: number;
  renewalProbability?: number;
  tenantSales?: number;
  tenantSalesPerSf?: number;
  occupancyCostRatio?: number;
  percentageRate?: number;
  baseRent?: number;
  clearHeight?: number;
  baselineRent?: number;
  premiumPerFt?: number;
  truckCount?: number;
  // Mortgage-UW + portfolio-mgmt + development GAP fields
  feeRate?: number;
  leaseUpMonths?: number;
  /** Loan-to-cost ratio for construction loan sizing. */
  ltc?: number;
  /** Total construction loan commitment (constructionInterestCarry). */
  loanCommitment?: number;
  /** Average outstanding balance as fraction of commitment (constructionInterestCarry). */
  avgOutstandingPct?: number;
  /** Draw period in months (constructionInterestCarry). */
  constructionMonths?: number;
  /** Hard construction costs (hardCostPerUnit, softCostRatio). */
  hardCosts?: number;
  /** Soft costs — arch, engineering, permits, legal (softCostRatio). */
  softCosts?: number;
  /** Land acquisition cost (softCostRatio). */
  landCost?: number;
  /** Physically vacant units (economicVacancyRate). */
  vacantUnits?: number;
  /** Occupied units not paying full rent — delinquent or concession (economicVacancyRate). */
  nonPayingUnits?: number;
  /** Units rolling to market over the next 12 months (rollToMarketUplift). */
  rollingUnits?: number;
  /** Site size in acres (buildingCoverageRatio). */
  siteAcres?: number;
  /** Bulk warehouse / distribution SF within a building (warehouseEfficiencyRatio). */
  warehouseSf?: number;
  /** Studio unit count (blendedUnitMixRent). */
  studioCount?: number;
  /** One-bedroom unit count (blendedUnitMixRent). */
  oneBrCount?: number;
  /** Two-bedroom unit count (blendedUnitMixRent). */
  twoBrCount?: number;
  /** Studio monthly rent (blendedUnitMixRent). */
  studioRent?: number;
  /** One-bedroom monthly rent (blendedUnitMixRent). */
  oneBrRent?: number;
  /** Two-bedroom monthly rent (blendedUnitMixRent). */
  twoBrRent?: number;
  /** Capex reserve assumption ($/SF/yr) for hold-period reserve sizing. */
  capexReservePerSf?: number;
  // After-tax exit (taxAdjustedExit)
  saleProceeds?: number;
  accumulatedDep?: number;
  saleCostRate?: number;
  recaptureRate?: number;
  capGainsRate?: number;
}
