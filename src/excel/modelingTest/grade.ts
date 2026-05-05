import { evaluate } from '../evaluate';
import { FormulaError, parseFormula } from '../parser';
import type { Sheet, SheetCell, SheetLayout } from '../types';
import type {
  CellGrade,
  CheckpointCellSpec,
  CheckpointResult,
  GradingResult,
  ModelingTestTemplate,
  OutputCellSpec,
  OutputResult,
  ToleranceSpec,
} from '../../types/modelingTest';

export function withinTolerance(
  computed: number,
  expected: number,
  tol: ToleranceSpec,
): boolean {
  if (!Number.isFinite(computed) || !Number.isFinite(expected)) return false;
  if (tol.abs !== undefined) {
    if (Math.abs(computed - expected) <= tol.abs) return true;
  }
  if (tol.rel !== undefined) {
    if (expected === 0) {
      if (Math.abs(computed) <= tol.rel) return true;
    } else if (Math.abs(computed - expected) / Math.abs(expected) <= tol.rel) {
      return true;
    }
  }
  return false;
}

function staticSheetFromLayout(layout: SheetLayout): Sheet {
  const sheet: Sheet = {};
  for (const c of layout.cells) {
    if (c.role === 'assumption' && typeof c.value === 'number') {
      sheet[c.address] = c.value;
    } else if (c.role === 'computed' && typeof c.computed === 'number') {
      sheet[c.address] = c.computed;
    }
  }
  return sheet;
}

function targetCells(layout: SheetLayout): SheetCell[] {
  return layout.cells.filter((c) => c.role === 'target');
}

/**
 * Build a Sheet by evaluating every target cell's user-supplied formula in
 * dependency order. Cells whose formulas reference each other resolve through
 * iterative passes; cells that fail to parse or remain unresolved render as 0.
 */
export function buildSheet(template: ModelingTestTemplate, formulas: Record<string, string>): {
  sheet: Sheet;
  parseErrors: Record<string, string>;
} {
  const sheet = staticSheetFromLayout(template.layout);
  const targets = targetCells(template.layout);
  const parseErrors: Record<string, string> = {};

  const remaining = new Map<string, string>();
  for (const cell of targets) {
    const raw = (formulas[cell.address] ?? '').trim();
    if (raw === '' || raw === '=') continue;
    remaining.set(cell.address, raw);
  }

  let progress = true;
  while (progress && remaining.size > 0) {
    progress = false;
    for (const [addr, raw] of Array.from(remaining)) {
      try {
        const expr = parseFormula(raw);
        const v = evaluate(expr, sheet);
        if (Array.isArray(v)) {
          parseErrors[addr] = 'formula must produce a single value';
          remaining.delete(addr);
          progress = true;
          continue;
        }
        if (!Number.isFinite(v)) {
          remaining.delete(addr);
          progress = true;
          continue;
        }
        sheet[addr] = v;
        remaining.delete(addr);
        progress = true;
      } catch (e) {
        if (e instanceof FormulaError) {
          // If the error references a missing cell, leave for another pass —
          // the dep may resolve later. Otherwise surface as a parse error.
          if (/division by zero|unknown function|expected|unexpected/i.test(e.message)) {
            parseErrors[addr] = e.message;
            remaining.delete(addr);
            progress = true;
          }
        }
      }
    }
  }
  // Anything still in `remaining` is an unresolvable cycle / persistent error.
  for (const [addr] of remaining) {
    parseErrors[addr] = parseErrors[addr] ?? 'could not resolve';
  }
  return { sheet, parseErrors };
}

function gradeCell(
  spec: OutputCellSpec | CheckpointCellSpec,
  rawFormula: string,
  sheet: Sheet,
  parseError: string | null,
): { grade: CellGrade; computed: number | null } {
  if (rawFormula.trim() === '' || rawFormula.trim() === '=') {
    return { grade: 'missing', computed: null };
  }
  if (parseError !== null) {
    return { grade: 'parseError', computed: null };
  }
  const computed = sheet[spec.ref];
  if (typeof computed !== 'number' || !Number.isFinite(computed)) {
    return { grade: 'parseError', computed: null };
  }
  return {
    grade: withinTolerance(computed, spec.expected, spec.tolerance) ? 'pass' : 'fail',
    computed,
  };
}

export function gradeSubmission(
  template: ModelingTestTemplate,
  formulas: Record<string, string>,
): GradingResult {
  const { sheet, parseErrors } = buildSheet(template, formulas);

  const outputs: OutputResult[] = template.outputs.map((spec) => {
    const raw = formulas[spec.ref] ?? '';
    const err = parseErrors[spec.ref] ?? null;
    const { grade, computed } = gradeCell(spec, raw, sheet, err);
    return {
      ref: spec.ref,
      label: spec.label,
      format: spec.format,
      expected: spec.expected,
      tolerance: spec.tolerance,
      rawFormula: raw,
      computed,
      parseError: err,
      grade,
      whenWrongTry: spec.whenWrongTry,
    };
  });

  const checkpoints: CheckpointResult[] = template.checkpoints.map((spec) => {
    const raw = formulas[spec.ref] ?? '';
    const err = parseErrors[spec.ref] ?? null;
    const { grade, computed } = gradeCell(spec, raw, sheet, err);
    return {
      ref: spec.ref,
      label: spec.label,
      format: spec.format,
      expected: spec.expected,
      tolerance: spec.tolerance,
      rawFormula: raw,
      computed,
      parseError: err,
      grade,
      diagnostic: spec.diagnostic,
      explains: spec.explains,
    };
  });

  const outputsCorrect = outputs.filter((o) => o.grade === 'pass').length;
  return {
    passed: outputsCorrect === outputs.length,
    outputsCorrect,
    outputsTotal: outputs.length,
    outputs,
    checkpoints,
  };
}
