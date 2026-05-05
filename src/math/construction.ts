/**
 * Construction-finance math.
 *
 * Primitives that show up in development underwriting and draw schedules:
 *   - costToCompletePct: how far through the budget vs the work
 *   - costToCompleteDollars: remaining budget (and overrun signal)
 *   - retainageBalance: cumulative dollars held back across draws
 *   - contingencyRemaining: contingency reserve net of overruns booked
 *   - equityFirstDraw: split a draw between equity and lender on equity-first basis
 *   - drawWithRetainage: split a draw into funded + retained
 *
 * All inputs in dollars unless stated otherwise.
 */

/** Percent of budget incurred. Capped at 1.0. */
export function costToCompletePct(incurred: number, totalBudget: number): number {
  if (totalBudget <= 0) return 0;
  return Math.min(1, Math.max(0, incurred / totalBudget));
}

/** Remaining budget. Negative means overrun. */
export function costToCompleteDollars(totalBudget: number, incurred: number): number {
  return totalBudget - incurred;
}

/** Cumulative retainage held across a list of draws (each draw retained at retainagePct). */
export function retainageBalance(draws: number[], retainagePct: number): number {
  if (retainagePct <= 0) return 0;
  return draws.reduce((sum, d) => sum + d * retainagePct, 0);
}

/** Contingency reserve net of overrun draws. Floors at 0. */
export function contingencyRemaining(
  contingency: number,
  overruns: number[],
): number {
  const used = overruns.reduce((s, o) => s + Math.max(0, o), 0);
  return Math.max(0, contingency - used);
}

/**
 * Equity-first draw allocation.
 * If sponsor's equity commitment isn't fully drawn, this draw funds from
 * equity first; only the remainder from lender. After equity is exhausted,
 * the full draw flows from lender.
 */
export function equityFirstDraw(args: {
  equityCommitted: number;
  equityDrawnSoFar: number;
  drawAmount: number;
}): { fromEquity: number; fromLender: number } {
  const equityRemaining = Math.max(0, args.equityCommitted - args.equityDrawnSoFar);
  const fromEquity = Math.min(equityRemaining, args.drawAmount);
  const fromLender = Math.max(0, args.drawAmount - fromEquity);
  return { fromEquity, fromLender };
}

/**
 * Pari-passu (proportional) draw allocation.
 * Splits the draw between equity and lender at their committed-capital ratio
 * across the whole project.
 */
export function pariPassuDraw(args: {
  equityCommitted: number;
  lenderCommitted: number;
  drawAmount: number;
}): { fromEquity: number; fromLender: number } {
  const total = args.equityCommitted + args.lenderCommitted;
  if (total <= 0) return { fromEquity: 0, fromLender: 0 };
  const eqShare = args.equityCommitted / total;
  return {
    fromEquity: args.drawAmount * eqShare,
    fromLender: args.drawAmount * (1 - eqShare),
  };
}

/**
 * Single-draw retainage split — funded vs held.
 * E.g. 10% retainage on a $1M draw → $900k funded, $100k held.
 */
export function drawWithRetainage(
  drawAmount: number,
  retainagePct: number,
): { funded: number; held: number } {
  const r = Math.max(0, Math.min(1, retainagePct));
  return {
    funded: drawAmount * (1 - r),
    held: drawAmount * r,
  };
}
