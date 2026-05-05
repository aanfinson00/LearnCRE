import type { ExcelTemplate, ExcelRunConfig, Sheet, SheetLayout } from '../types';
import { matchesRole } from '../../types/role';
import { noiRollForward } from './noiRollForward';
import { capRateFromComps } from './capRateFromComps';
import { equityMultipleTemplate } from './equityMultiple';
import { irrFromCashflows } from './irrFromCashflows';
import { reversionValueTemplate } from './reversionValue';
import { amortizationPrincipal } from './amortizationPrincipal';
import { loanSizingDscr } from './loanSizingDscr';
import { perUnitNormalization } from './perUnitNormalization';
import { markToMarketLift } from './markToMarketLift';
import { rentBumpsWithSteps } from './rentBumpsWithSteps';
import { waterfall3Tier } from './waterfall3Tier';
import { costToCompleteExcel } from './costToComplete';
import { drawScheduleExcel } from './drawSchedule';

export const EXCEL_TEMPLATES: ExcelTemplate[] = [
  noiRollForward,
  capRateFromComps,
  equityMultipleTemplate,
  irrFromCashflows,
  reversionValueTemplate,
  amortizationPrincipal,
  loanSizingDscr,
  perUnitNormalization,
  markToMarketLift,
  rentBumpsWithSteps,
  waterfall3Tier,
  costToCompleteExcel,
  drawScheduleExcel,
];

export function templateById(id: string): ExcelTemplate | undefined {
  return EXCEL_TEMPLATES.find((t) => t.id === id);
}

export function filterTemplates(
  config: Pick<ExcelRunConfig, 'category' | 'difficulty' | 'role'>,
): ExcelTemplate[] {
  return EXCEL_TEMPLATES.filter((t) => {
    if (config.category !== 'all' && t.category !== config.category) return false;
    if (config.difficulty !== 'all' && t.difficulty !== config.difficulty) return false;
    if (!matchesRole(t.roles, config.role)) return false;
    return true;
  });
}

export function pickTemplates(
  pool: ExcelTemplate[],
  length: number,
  seed = Date.now(),
): ExcelTemplate[] {
  const arr = [...pool];
  let s = seed >>> 0;
  for (let i = arr.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) >>> 0;
    const j = s % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, Math.min(length, arr.length));
}

/** Build a Sheet (cell-keyed numeric values) from a layout's assumption cells. */
export function sheetFromLayout(layout: SheetLayout): Sheet {
  const out: Sheet = {};
  for (const c of layout.cells) {
    if (c.role === 'assumption' && typeof c.value === 'number') {
      out[c.address] = c.value;
    } else if (c.role === 'computed' && typeof c.computed === 'number') {
      out[c.address] = c.computed;
    }
  }
  return out;
}
