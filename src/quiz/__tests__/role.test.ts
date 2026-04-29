import { describe, expect, it } from 'vitest';
import { matchesRole } from '../../types/role';
import { SITUATIONAL_CASES, filterCases } from '../situational';
import { EXCEL_TEMPLATES, filterTemplates } from '../../excel/templates';
import { templates, allKinds } from '../templates';
import { walkthroughs } from '../walkthroughs';

describe('types/role — matchesRole', () => {
  it('treats undefined / "all" requested as everything passes', () => {
    expect(matchesRole(['acquisitions'], undefined)).toBe(true);
    expect(matchesRole(['acquisitions'], 'all')).toBe(true);
  });

  it('untagged content matches every role (catch-all default)', () => {
    expect(matchesRole(undefined, 'mortgageUw')).toBe(true);
    expect(matchesRole([], 'mortgageUw')).toBe(true);
  });

  it('tagged content only matches included roles', () => {
    expect(matchesRole(['acquisitions'], 'acquisitions')).toBe(true);
    expect(matchesRole(['acquisitions'], 'mortgageUw')).toBe(false);
    expect(matchesRole(['acquisitions', 'mortgageUw'], 'mortgageUw')).toBe(true);
  });
});

describe('quiz/templates — role coverage', () => {
  it('every shipped quiz template carries at least one role tag', () => {
    for (const k of allKinds) {
      const t = templates[k];
      expect(t.roles, `kind ${k}`).toBeDefined();
      expect(t.roles!.length, `kind ${k}`).toBeGreaterThan(0);
    }
  });

  it('every role except none has at least 2 quiz templates tagged to it', () => {
    const counts: Record<string, number> = {};
    for (const k of allKinds) {
      for (const r of templates[k].roles ?? []) counts[r] = (counts[r] ?? 0) + 1;
    }
    for (const role of [
      'acquisitions',
      'assetManagement',
      'mortgageUw',
      'portfolioMgmt',
      'development',
    ]) {
      expect(counts[role] ?? 0, `role ${role}`).toBeGreaterThanOrEqual(2);
    }
  });
});

describe('quiz/situational — role filter', () => {
  it('every shipped case carries at least one role tag', () => {
    for (const c of SITUATIONAL_CASES) {
      expect(c.roles, `case ${c.id}`).toBeDefined();
      expect(c.roles!.length, `case ${c.id}`).toBeGreaterThan(0);
    }
  });

  it('filterCases honors the role filter', () => {
    const all = filterCases({
      category: 'all',
      difficulty: 'all',
      assetClass: 'mixed',
      role: 'all',
    });
    const uwOnly = filterCases({
      category: 'all',
      difficulty: 'all',
      assetClass: 'mixed',
      role: 'mortgageUw',
    });
    expect(all.length).toBe(SITUATIONAL_CASES.length);
    expect(uwOnly.length).toBeLessThan(all.length);
    for (const c of uwOnly) {
      expect(c.roles).toContain('mortgageUw');
    }
  });
});

describe('excel/templates — role filter', () => {
  it('every shipped template carries at least one role tag', () => {
    for (const t of EXCEL_TEMPLATES) {
      expect(t.roles, `template ${t.id}`).toBeDefined();
      expect(t.roles!.length, `template ${t.id}`).toBeGreaterThan(0);
    }
  });

  it('filterTemplates honors the role filter', () => {
    const all = filterTemplates({ category: 'all', difficulty: 'all', role: 'all' });
    const uwOnly = filterTemplates({
      category: 'all',
      difficulty: 'all',
      role: 'mortgageUw',
    });
    expect(all.length).toBe(EXCEL_TEMPLATES.length);
    for (const t of uwOnly) {
      expect(t.roles).toContain('mortgageUw');
    }
  });
});

describe('quiz/walkthroughs — role coverage', () => {
  it('every shipped walkthrough carries at least one role tag', () => {
    for (const w of walkthroughs) {
      expect(w.roles, `walkthrough ${w.id}`).toBeDefined();
      expect(w.roles!.length, `walkthrough ${w.id}`).toBeGreaterThan(0);
    }
  });
});
