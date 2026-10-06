/**
 * Content guardrails for hand-written content: situational cases, long-form
 * cases, mock-interview prompts and archetypes, vocab, walkthroughs, Excel
 * drills, modeling tests, certifications and template tips.
 *
 * Text rules catch the classes of mistakes that have shipped before: drafting
 * notes left in ("— wait, that fails. Let me re-state"), TODOs, float noise,
 * broken interpolation, doubled words, unbalanced **bold**, and "a 5 years
 * hold" phrasing. Structural rules catch broken cases (not exactly one best
 * answer, empty explanations) and duplicate ids / vocab terms.
 */
import { SITUATIONAL_CASES } from '../../quiz/situational';
import { LONGFORM_CASES } from '../../quiz/longform';
import { VOCAB_TERMS } from '../../quiz/vocab';
import { PROSE_PROMPTS } from '../../quiz/mockInterview/prompts';
import { MOCK_ARCHETYPES } from '../../quiz/mockInterview';
import { walkthroughs } from '../../quiz/walkthroughs';
import { EXCEL_TEMPLATES } from '../../excel/templates';
import { MODELING_TEST_TEMPLATES } from '../../excel/modelingTest/templates';
import { CERTS } from '../../quiz/certs';
import { templates } from '../../quiz/templates';

const TEXT_RULES: { name: string; re: RegExp; bad: string; good: string }[] = [
  {
    name: 'drafting note ("wait —")',
    re: /\bwait\b\s*[,—–-]/i,
    bad: 'passes at 1.19x — wait, that fails.',
    good: 'Lenders wait for the cure period to lapse.',
  },
  {
    name: 'drafting note ("let me re-state")',
    re: /let me (re-?state|redo|re-?do|recompute|fix|correct)/i,
    bad: 'Let me re-state: the DSCR is 1.31x.',
    good: 'Let me walk you through the waterfall.',
  },
  { name: 'TODO marker', re: /\b(TODO|TBD|FIXME|XXX)\b/, bad: 'TODO: check cap', good: 'Today' },
  { name: 'placeholder text', re: /lorem ipsum/i, bad: 'Lorem ipsum dolor', good: 'Loan sizing' },
  {
    name: 'broken interpolation',
    re: /\bundefined\b|\bNaN\b|\[object Object\]/,
    bad: 'NOI of $undefined',
    good: 'NOI of $1,000,000',
  },
  { name: 'double question mark', re: /\?\?/, bad: 'Why??', good: 'Why?' },
  { name: 'float noise', re: /\d\.\d{5,}/, bad: '8.200000000000001-yr hold', good: '8.2-yr hold' },
  {
    name: 'doubled word',
    re: /\b(the|a|an|to|of|and|is|in|on|for|at|by)\s+\1\b/i,
    bad: 'pay the the lender',
    good: 'pay the lender',
  },
  {
    name: 'unbalanced **bold**',
    re: /^(?:(?!\*\*)[\s\S])*\*\*(?:(?!\*\*)[\s\S])*$/,
    bad: 'the **binding constraint is DSCR',
    good: 'the **binding** constraint',
  },
  {
    name: '"a N years hold" (use "N-year")',
    re: /\ba \d+ years (hold|lease|loan|amortiz)/i,
    bad: 'over a 5 years hold',
    good: 'over a 5-year hold',
  },
];

const COLLECTIONS: Record<string, readonly unknown[]> = {
  situational: SITUATIONAL_CASES,
  longform: LONGFORM_CASES,
  vocab: VOCAB_TERMS,
  mockPrompts: PROSE_PROMPTS,
  mockArchetypes: MOCK_ARCHETYPES,
  walkthroughs,
  excelDrills: EXCEL_TEMPLATES,
  modelingTests: MODELING_TEST_TEMPLATES,
  certs: CERTS,
  templateCopy: Object.entries(templates).map(([kind, t]) => ({
    id: kind,
    label: t.label,
    description: t.description,
    pattern: t.pattern,
    tips: t.tips,
  })),
};

function collectStrings(value: unknown, path: string, out: [string, string][]): void {
  if (typeof value === 'string') out.push([path, value]);
  else if (Array.isArray(value)) value.forEach((v, i) => collectStrings(v, `${path}[${i}]`, out));
  else if (value && typeof value === 'object')
    for (const [k, v] of Object.entries(value)) collectStrings(v, `${path}.${k}`, out);
}

function excerpt(s: string, index: number): string {
  return s.slice(Math.max(0, index - 40), index + 60).replace(/\s+/g, ' ');
}

describe('text rules', () => {
  it.each(TEXT_RULES)('rule "$name" flags its bad sample and passes its good one', (rule) => {
    expect(rule.re.test(rule.bad)).toBe(true);
    expect(rule.re.test(rule.good)).toBe(false);
  });
});

describe.each(Object.entries(COLLECTIONS))('%s content', (name, items) => {
  it('has no drafting notes, broken text or formatting slips', () => {
    const strings: [string, string][] = [];
    items.forEach((item, i) =>
      collectStrings(item, `${name}[${(item as { id?: string }).id ?? i}]`, strings),
    );
    expect(strings.length).toBeGreaterThan(0);
    const hits: string[] = [];
    for (const [path, s] of strings)
      for (const rule of TEXT_RULES) {
        const m = rule.re.exec(s);
        if (m) hits.push(`${rule.name} at ${path}: "…${excerpt(s, m.index)}…"`);
      }
    expect(hits).toEqual([]);
  });

  it('has unique ids', () => {
    const ids = items.map((i) => (i as { id?: string }).id).filter(Boolean);
    expect(ids.filter((id, i) => ids.indexOf(id) !== i)).toEqual([]);
  });
});

describe('situational cases', () => {
  it.each(SITUATIONAL_CASES.map((c) => [c.id, c] as const))('%s is well-formed', (_id, c) => {
    expect(c.options.filter((o) => o.isBest)).toHaveLength(1);
    expect(c.options.length).toBeGreaterThanOrEqual(3);
    for (const o of c.options) {
      expect(o.label.trim()).not.toBe('');
      expect(o.explanation.trim()).not.toBe('');
    }
    expect(c.scenario.trim()).not.toBe('');
    expect(c.takeaway.trim()).not.toBe('');
  });
});

describe('long-form cases', () => {
  it.each(LONGFORM_CASES.map((c) => [c.id, c] as const))('%s has a usable rubric', (_id, c) => {
    expect(c.modelAnswer.trim().length).toBeGreaterThan(200);
    expect(c.rubric.length).toBeGreaterThanOrEqual(3);
    for (const item of c.rubric) expect(item.weight ?? 1).toBeGreaterThan(0);
    const rubricIds = c.rubric.map((r) => r.id);
    expect(new Set(rubricIds).size).toBe(rubricIds.length);
  });
});

describe('vocab', () => {
  it('has no duplicate terms', () => {
    const terms = VOCAB_TERMS.map((t) => t.term.trim().toLowerCase());
    expect(terms.filter((t, i) => terms.indexOf(t) !== i)).toEqual([]);
  });
});
