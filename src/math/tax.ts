/**
 * After-tax sale-proceeds math for hold-vs-sell decisions.
 *
 * Real-estate gains break into two pieces:
 *   1. Depreciation recapture (Section 1250) — taxed at ~25%, on the lesser of
 *      total gain or accumulated depreciation.
 *   2. Capital gain — taxed at ~20% (long-term federal), on the rest.
 *
 * Sale costs reduce gross proceeds before computing the gain.
 *
 * Default rates match typical federal-only treatment for an LP investor:
 *   recaptureRate = 25% · capGainsRate = 20% · saleCostRate = 1.5%
 *
 * State taxes, NIIT (3.8%), and Section 1231 nuances are out of scope —
 * extend the params if you need to model them.
 */

export interface AfterTaxParams {
  /** Original purchase price (cost basis at acquisition). */
  purchasePrice: number;
  /** Gross sale proceeds before sale costs and taxes. */
  saleProceeds: number;
  /** Depreciation taken across the holding period. */
  accumulatedDepreciation: number;
  /** Sale cost rate as a decimal. Default 1.5%. */
  saleCostRate?: number;
  /** Recapture rate as a decimal. Default 25%. */
  recaptureRate?: number;
  /** Cap-gains rate as a decimal. Default 20%. */
  capGainsRate?: number;
}

export interface AfterTaxResult {
  /** Net proceeds after sale costs but before any taxes. */
  netSale: number;
  /** Adjusted basis = purchase price − accumulated depreciation. */
  adjustedBasis: number;
  /** Total gain = netSale − adjustedBasis. */
  totalGain: number;
  /** Recapture-eligible portion (capped at accumulated depreciation). */
  recaptureGain: number;
  /** Capital-gain portion (residual). */
  capitalGain: number;
  /** Recapture tax owed. */
  recaptureTax: number;
  /** Cap-gains tax owed. */
  capGainsTax: number;
  /** Final cash to investor after sale costs and taxes. */
  afterTaxProceeds: number;
}

export function afterTaxSaleProceeds(params: AfterTaxParams): AfterTaxResult {
  const saleCostRate = params.saleCostRate ?? 0.015;
  const recaptureRate = params.recaptureRate ?? 0.25;
  const capGainsRate = params.capGainsRate ?? 0.2;

  const netSale = params.saleProceeds * (1 - saleCostRate);
  const adjustedBasis = params.purchasePrice - params.accumulatedDepreciation;
  const totalGain = netSale - adjustedBasis;

  // Recapture is the lesser of total gain or accumulated depreciation, but
  // never negative (a loss has no recapture).
  const recaptureGain = Math.max(0, Math.min(totalGain, params.accumulatedDepreciation));
  const capitalGain = Math.max(0, totalGain - recaptureGain);

  const recaptureTax = recaptureGain * recaptureRate;
  const capGainsTax = capitalGain * capGainsRate;

  const afterTaxProceeds = netSale - recaptureTax - capGainsTax;

  return {
    netSale,
    adjustedBasis,
    totalGain,
    recaptureGain,
    capitalGain,
    recaptureTax,
    capGainsTax,
    afterTaxProceeds,
  };
}

/**
 * Straight-line depreciation accumulated over `years` of holding.
 *
 * `lifeYears` defaults to 27.5 (residential MF, IRS Section 168). For commercial
 * (office, retail, industrial), pass 39. Mixed-use should weight by use.
 *
 * Land is non-depreciable; pass `basis` net of land. A useful rule: land is
 * typically 15–25% of MF purchase price, 10–20% of office, 5–15% of industrial.
 */
export function depreciationStraightLine(
  basis: number,
  years: number,
  lifeYears = 27.5,
): number {
  if (basis <= 0 || years <= 0) return 0;
  const cappedYears = Math.min(years, lifeYears);
  return (basis / lifeYears) * cappedYears;
}
