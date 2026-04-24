/**
 * Evaluate a user-typed math expression with CRE shorthand.
 *
 * Supports:
 *  - 5M / 5m        → 5,000,000
 *  - 500k / 500K    → 500,000
 *  - 6% / 6.25%     → 0.06 / 0.0625
 *  - ^              → exponentiation (x^y)
 *  - + - * / ()     → standard arithmetic
 *  - $  ,           → stripped (so you can paste "$1,250,000")
 *
 * Returns a number if evaluation succeeded, null otherwise.
 */
export function evaluateExpression(raw: string): number | null {
  if (!raw || raw.trim() === '') return null;

  let expr = raw
    .replace(/\$/g, '')
    .replace(/,/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  expr = expr
    .replace(/(\d+(?:\.\d+)?)\s*[mM]\b/g, '($1 * 1000000)')
    .replace(/(\d+(?:\.\d+)?)\s*[kK]\b/g, '($1 * 1000)')
    .replace(/(\d+(?:\.\d+)?)\s*%/g, '($1 / 100)')
    .replace(/\^/g, '**');

  // Allow digits, whitespace, +, -, *, /, (, ), . — ** is covered by allowing *
  if (!/^[\d\s+\-*/().]+$/.test(expr)) {
    return null;
  }

  try {
    // eslint-disable-next-line no-new-func
    const fn = new Function(`"use strict"; return (${expr});`);
    const result = fn();
    if (typeof result !== 'number' || !Number.isFinite(result)) return null;
    return result;
  } catch {
    return null;
  }
}

/** Format a result in a compact, legible form — pick a natural unit. */
export function formatResult(value: number): string {
  const abs = Math.abs(value);
  if (abs >= 1_000_000) return `${(value / 1_000_000).toFixed(3)}M`;
  if (abs >= 1_000) return `${(value / 1_000).toFixed(2)}k`;
  if (abs < 1 && abs !== 0) return `${(value * 100).toFixed(2)}%  (${value.toFixed(6)})`;
  return value.toLocaleString('en-US', { maximumFractionDigits: 6 });
}
