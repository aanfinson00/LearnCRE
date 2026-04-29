/**
 * Topological re-evaluation for the scratch sheet.
 *
 * The scratch sheet is a small grid (~15 cells) where every cell may carry a
 * raw formula referencing other cells in the same grid. We need to:
 *   1. Detect circular references (mark them as #CIRC!).
 *   2. Evaluate each non-cyclic cell in dependency order so values referenced
 *      by other cells are already computed.
 *
 * Strategy: Kahn's topo sort. Build an "address → set of addresses it depends
 * on" graph, then peel off cells with no remaining unresolved deps.
 */

import { FormulaError, extractReferencedAddresses } from './parser';
import { evaluateFormula } from './evaluate';

export interface ScratchEvalResult {
  /** Cell address → computed numeric value (only present if evaluation succeeded). */
  values: Record<string, number>;
  /** Cell address → error message (parse error, circular ref, or non-finite). */
  errors: Record<string, string>;
}

/** Evaluate the entire scratch sheet, returning per-cell values and errors. */
export function evaluateScratch(raws: Record<string, string>): ScratchEvalResult {
  const values: Record<string, number> = {};
  const errors: Record<string, string> = {};

  // Active cells = cells with a non-empty raw formula
  const active = new Set<string>();
  for (const addr of Object.keys(raws)) {
    if (raws[addr].trim() !== '') active.add(addr);
  }

  // Build dep graph: addr → set of addrs it references that are also active.
  // Cells that reference non-active addresses default to 0 in the evaluator
  // (matches Excel's empty-cell behavior); we only track *internal* deps for
  // ordering.
  const deps: Record<string, Set<string>> = {};
  for (const addr of active) {
    const refs = extractReferencedAddresses(raws[addr]);
    const internal = new Set<string>();
    for (const r of refs) if (active.has(r)) internal.add(r);
    deps[addr] = internal;
  }

  // Reverse map: addr → set of addrs that depend on it
  const dependents: Record<string, Set<string>> = {};
  for (const addr of active) dependents[addr] = new Set();
  for (const addr of active) {
    for (const d of deps[addr]) dependents[d].add(addr);
  }

  // Kahn's: queue cells with no internal deps
  const inDegree: Record<string, number> = {};
  for (const addr of active) inDegree[addr] = deps[addr].size;

  const queue: string[] = [];
  for (const addr of active) if (inDegree[addr] === 0) queue.push(addr);

  while (queue.length > 0) {
    const addr = queue.shift()!;
    try {
      const v = evaluateFormula(raws[addr], values);
      if (Number.isFinite(v)) {
        values[addr] = v;
      } else {
        errors[addr] = '#NUM! non-finite result';
      }
    } catch (e) {
      errors[addr] = e instanceof FormulaError ? e.message : String(e);
    }
    for (const child of dependents[addr]) {
      inDegree[child]--;
      if (inDegree[child] === 0) queue.push(child);
    }
  }

  // Any cells not yet evaluated are part of a cycle.
  const visited = new Set([...Object.keys(values), ...Object.keys(errors)]);
  for (const addr of active) {
    if (!visited.has(addr)) {
      errors[addr] = '#CIRC! circular reference';
    }
  }

  return { values, errors };
}
