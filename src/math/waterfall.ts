/**
 * Capital-stack waterfall math.
 *
 * Three primitives that compose every common waterfall:
 *   - prefAccrual: compounded or simple preferred return owed to LP
 *   - gpCatchUp: catch-up amount needed for GP to reach a target % of (pref + catch-up)
 *   - splitDollars: residual split at a stated LP/GP ratio
 *
 * runWaterfall ties them together for a 3-tier American distribution
 * (pref → ROC → catch-up → above-split). It returns per-tier dollar
 * splits suitable for displaying the full waterfall in the UI.
 *
 * Conventions:
 *   - `lpCapital` and `gpCapital` are contributed equity (positive numbers).
 *   - `totalDistributable` is the cash available to distribute.
 *   - `prefRate` is annual decimal (0.08 = 8%).
 *   - `catchUpTargetGpPct` is the GP's target share of (pref + cat-up), e.g.
 *     0.20 means GP catches up until they have 20% of the cumulative
 *     pref-tier-plus-catch-up dollars (equivalent to "100% catch-up to a
 *     20% promote tier").
 *   - `aboveSplit` is { lp, gp } summing to 1.0 (e.g. { lp: 0.80, gp: 0.20 }).
 */

export type PrefAccrual = 'simple' | 'compound';

export interface WaterfallTerms {
  lpCapital: number;
  gpCapital: number;
  prefRate: number;
  prefAccrual: PrefAccrual;
  /** GP target share of (pref + catch-up). 0 disables the catch-up tier. */
  catchUpTargetGpPct: number;
  aboveSplit: { lp: number; gp: number };
}

export interface WaterfallInputs extends WaterfallTerms {
  totalDistributable: number;
  holdYears: number;
}

export interface WaterfallTierResult {
  /** Tier label for display. */
  label: string;
  /** Cash flowing to LP at this tier. */
  lp: number;
  /** Cash flowing to GP at this tier. */
  gp: number;
}

export interface WaterfallResult {
  tiers: WaterfallTierResult[];
  /** LP grand total across all tiers. */
  lpTotal: number;
  /** GP grand total across all tiers. */
  gpTotal: number;
  /** Pre-tier preferred dollars due to LP (computed from terms). */
  prefDue: number;
  /** Catch-up dollars to GP (zero if catchUpTargetGpPct = 0). */
  catchUp: number;
  /** Residual cash split at aboveSplit. */
  aboveSplitResidual: number;
  /**
   * GP's "promote" — dollars beyond what they'd have gotten on a pure pro-rata
   * basis. Always >= 0 in scenarios where GP capital share < their realized
   * profit share.
   */
  gpPromote: number;
}

/** Pref due to LP for a hold of N years. */
export function prefAccrual(
  lpCapital: number,
  rate: number,
  years: number,
  mode: PrefAccrual,
): number {
  if (lpCapital <= 0 || years <= 0 || rate <= 0) return 0;
  if (mode === 'simple') return lpCapital * rate * years;
  return lpCapital * (Math.pow(1 + rate, years) - 1);
}

/**
 * Catch-up amount: the dollars to flow to GP such that GP ends with
 * targetGpPct of (pref + catch-up).
 *
 * Math: solve C for C / (pref + C) = targetGpPct
 *       → C = pref * targetGpPct / (1 - targetGpPct)
 */
export function gpCatchUp(prefPaid: number, targetGpPct: number): number {
  if (targetGpPct <= 0 || targetGpPct >= 1 || prefPaid <= 0) return 0;
  return (prefPaid * targetGpPct) / (1 - targetGpPct);
}

/** Split a residual at a stated LP/GP ratio. */
export function splitDollars(
  residual: number,
  split: { lp: number; gp: number },
): { lp: number; gp: number } {
  if (residual <= 0) return { lp: 0, gp: 0 };
  return {
    lp: residual * split.lp,
    gp: residual * split.gp,
  };
}

/**
 * GP's effective promote = realized GP take less the pro-rata share of
 * total profit (above return-of-capital) at the GP's capital weight.
 */
export function gpEffectivePromote(args: {
  gpTake: number;
  gpCapital: number;
  lpCapital: number;
  totalDistributable: number;
}): number {
  const totalCap = args.gpCapital + args.lpCapital;
  if (totalCap <= 0) return 0;
  const totalProfit = args.totalDistributable - totalCap;
  if (totalProfit <= 0) return 0;
  const gpProRataShare = (args.gpCapital / totalCap) * totalProfit;
  // GP's realized "profit dollars" = take minus their returned capital
  const gpProfitDollars = args.gpTake - args.gpCapital;
  return Math.max(0, gpProfitDollars - gpProRataShare);
}

/**
 * Run a full 3-tier American waterfall:
 *   1) Pref to LP (compound or simple)
 *   2) Return of capital, pro-rata to LP and GP
 *   3) GP catch-up (until GP has targetGpPct of pref + catch-up)
 *   4) Above-split residual
 *
 * Cash distributions are taken in order and clipped to the cash available.
 */
export function runWaterfall(inputs: WaterfallInputs): WaterfallResult {
  const tiers: WaterfallTierResult[] = [];
  let cash = inputs.totalDistributable;

  // Tier 1 — Pref to LP
  const prefDue = prefAccrual(
    inputs.lpCapital,
    inputs.prefRate,
    inputs.holdYears,
    inputs.prefAccrual,
  );
  const prefPaid = Math.min(prefDue, cash);
  cash -= prefPaid;
  tiers.push({ label: 'Pref to LP', lp: prefPaid, gp: 0 });

  // Tier 2 — Return of capital, pro-rata
  const totalCap = inputs.lpCapital + inputs.gpCapital;
  const rocPool = Math.min(totalCap, cash);
  const lpRoc = totalCap > 0 ? rocPool * (inputs.lpCapital / totalCap) : 0;
  const gpRoc = totalCap > 0 ? rocPool * (inputs.gpCapital / totalCap) : 0;
  cash -= lpRoc + gpRoc;
  tiers.push({ label: 'Return of capital', lp: lpRoc, gp: gpRoc });

  // Tier 3 — GP catch-up to target promote share
  let catchUp = 0;
  if (inputs.catchUpTargetGpPct > 0 && prefPaid >= prefDue && cash > 0) {
    catchUp = Math.min(
      gpCatchUp(prefPaid, inputs.catchUpTargetGpPct),
      cash,
    );
    cash -= catchUp;
    tiers.push({ label: 'GP catch-up', lp: 0, gp: catchUp });
  }

  // Tier 4 — Above-split residual
  const aboveSplitResidual = Math.max(0, cash);
  const above = splitDollars(aboveSplitResidual, inputs.aboveSplit);
  cash -= above.lp + above.gp;
  tiers.push({
    label: `Above split (${(inputs.aboveSplit.lp * 100).toFixed(0)}/${(inputs.aboveSplit.gp * 100).toFixed(0)})`,
    lp: above.lp,
    gp: above.gp,
  });

  const lpTotal = tiers.reduce((s, t) => s + t.lp, 0);
  const gpTotal = tiers.reduce((s, t) => s + t.gp, 0);

  return {
    tiers,
    lpTotal,
    gpTotal,
    prefDue,
    catchUp,
    aboveSplitResidual,
    gpPromote: gpEffectivePromote({
      gpTake: gpTotal,
      gpCapital: inputs.gpCapital,
      lpCapital: inputs.lpCapital,
      totalDistributable: inputs.totalDistributable,
    }),
  };
}
