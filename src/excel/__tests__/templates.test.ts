import { describe, expect, it } from 'vitest';
import { evaluateFormula } from '../evaluate';
import { EXCEL_TEMPLATES, sheetFromLayout } from '../templates';

describe('excel/templates — sanity', () => {
  it.each(EXCEL_TEMPLATES.map((t) => [t.id, t]))(
    'template %s: example formula evaluates to expected within tolerance',
    (_id, t) => {
      const sheet = sheetFromLayout(t.layout);
      const computed = evaluateFormula(t.exampleFormula, sheet);
      const tol = t.tolerancePct ?? 0.005;
      const delta = Math.abs(computed - t.expected) / Math.abs(t.expected);
      expect(delta).toBeLessThanOrEqual(tol);
    },
  );

  it.each(EXCEL_TEMPLATES.map((t) => [t.id, t]))(
    'template %s: layout has exactly one target cell, and target is the declared targetCell',
    (_id, t) => {
      const targets = t.layout.cells.filter((c) => c.role === 'target');
      expect(targets).toHaveLength(1);
      expect(targets[0].address).toBe(t.targetCell);
    },
  );
});
