import { describe, expect, it } from 'vitest';
import {
  MOCK_ARCHETYPES,
  aggregateMockScore,
  archetypeById,
  assembleQuestions,
  rubricScorePct,
} from '..';
import { prosePromptById } from '../prompts';
import { caseById as longformCaseById } from '../../longform';
import { caseById as situationalCaseById } from '../../situational';
import type { MockArchetypeSpec, MockQuestionAttempt } from '../../../types/mockInterview';

describe('mock interview — archetypes', () => {
  it('has at least one archetype registered', () => {
    expect(MOCK_ARCHETYPES.length).toBeGreaterThan(0);
  });

  it('every archetype id is unique', () => {
    const ids = MOCK_ARCHETYPES.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  function checkScopeRefs(spec: MockArchetypeSpec): void {
    for (const id of spec.contentScopes.fitIdPool ?? []) {
      expect(prosePromptById(id), `${spec.id}: unknown fit id ${id}`).toBeDefined();
    }
    for (const id of spec.contentScopes.behavioralIdPool ?? []) {
      expect(
        prosePromptById(id),
        `${spec.id}: unknown behavioral id ${id}`,
      ).toBeDefined();
    }
    for (const id of spec.contentScopes.marketViewIdPool ?? []) {
      expect(
        prosePromptById(id),
        `${spec.id}: unknown marketView id ${id}`,
      ).toBeDefined();
    }
    for (const id of spec.contentScopes.situationalIdPool ?? []) {
      expect(
        situationalCaseById(id),
        `${spec.id}: unknown situational id ${id}`,
      ).toBeDefined();
    }
    for (const id of spec.contentScopes.longformIdPool ?? []) {
      expect(
        longformCaseById(id),
        `${spec.id}: unknown longform id ${id}`,
      ).toBeDefined();
    }
  }

  for (const spec of MOCK_ARCHETYPES) {
    it(`${spec.id} content scopes reference real content`, () => {
      checkScopeRefs(spec);
    });
  }
});

describe('mock interview — assembleQuestions', () => {
  it('produces one question per composition slot when pools are sufficient', () => {
    const spec = archetypeById('mega-fund-acq')!;
    const questions = assembleQuestions(spec, 1);
    expect(questions.length).toBe(spec.composition.length);
  });

  it('preserves slot order + section labels', () => {
    const spec = archetypeById('mega-fund-acq')!;
    const questions = assembleQuestions(spec, 1);
    for (let i = 0; i < spec.composition.length; i++) {
      expect(questions[i].kind).toBe(spec.composition[i].kind);
      expect(questions[i].sectionLabel).toBe(spec.composition[i].sectionLabel);
    }
  });

  it('does not repeat prose or situational/longform ids in a single run', () => {
    const spec = archetypeById('mega-fund-acq')!;
    const questions = assembleQuestions(spec, 5);
    const seenProse = new Set<string>();
    const seenSit = new Set<string>();
    const seenLf = new Set<string>();
    for (const q of questions) {
      if (q.kind === 'fit' || q.kind === 'behavioral' || q.kind === 'marketView') {
        expect(seenProse.has(q.promptId), `repeated prose id ${q.promptId}`).toBe(false);
        seenProse.add(q.promptId);
      } else if (q.kind === 'situational') {
        expect(seenSit.has(q.caseId), `repeated situational ${q.caseId}`).toBe(false);
        seenSit.add(q.caseId);
      } else if (q.kind === 'longform') {
        expect(seenLf.has(q.caseId), `repeated longform ${q.caseId}`).toBe(false);
        seenLf.add(q.caseId);
      }
    }
  });

  it('different seeds produce different question selections', () => {
    const spec = archetypeById('mega-fund-acq')!;
    const a = assembleQuestions(spec, 1);
    const b = assembleQuestions(spec, 999);
    const aIds = a
      .map((q) =>
        q.kind === 'situational' || q.kind === 'longform'
          ? q.caseId
          : q.kind === 'fit' || q.kind === 'behavioral' || q.kind === 'marketView'
            ? q.promptId
            : '',
      )
      .filter(Boolean)
      .join('|');
    const bIds = b
      .map((q) =>
        q.kind === 'situational' || q.kind === 'longform'
          ? q.caseId
          : q.kind === 'fit' || q.kind === 'behavioral' || q.kind === 'marketView'
            ? q.promptId
            : '',
      )
      .filter(Boolean)
      .join('|');
    // With 3+ pools and different seeds, ordering should diverge.
    expect(aIds === bIds).toBe(false);
  });
});

describe('mock interview — rubricScorePct', () => {
  it('returns 1.0 for an empty rubric (warmup convention)', () => {
    expect(rubricScorePct([], {})).toBe(1);
  });

  it('returns 0.0 with no scores recorded', () => {
    expect(
      rubricScorePct(
        [
          { id: 'a', dimension: 'foo' },
          { id: 'b', dimension: 'bar' },
        ],
        {},
      ),
    ).toBe(0);
  });

  it('returns 1.0 when all rubric items at max (3)', () => {
    expect(
      rubricScorePct(
        [
          { id: 'a', dimension: 'foo' },
          { id: 'b', dimension: 'bar' },
        ],
        { a: 3, b: 3 },
      ),
    ).toBe(1);
  });

  it('weights items correctly', () => {
    // Item A weight 2 max=6, B weight 1 max=3. Total max = 9.
    // Scores: A=3 (full) + B=0 → 6 / 9 ≈ 0.667
    const score = rubricScorePct(
      [
        { id: 'a', dimension: 'foo', weight: 2 },
        { id: 'b', dimension: 'bar', weight: 1 },
      ],
      { a: 3, b: 0 },
    );
    expect(score).toBeCloseTo(2 / 3, 5);
  });
});

describe('mock interview — aggregateMockScore', () => {
  const baseAttempts: MockQuestionAttempt[] = [
    {
      kind: 'technical',
      questionId: 't1',
      userInput: 5,
      correct: true,
      elapsedMs: 1000,
      skipped: false,
    },
    {
      kind: 'technical',
      questionId: 't2',
      userInput: 5,
      correct: false,
      elapsedMs: 1000,
      skipped: false,
    },
    {
      kind: 'situational',
      caseId: 'om-red-flags',
      pickedIndex: 0,
      correct: true,
      elapsedMs: 1000,
      skipped: false,
    },
    {
      kind: 'longform',
      promptOrCaseId: 'walk-me-through-bid',
      userAnswer: 'x',
      rubricScores: { a: 2 },
      scorePct: 0.5,
      elapsedMs: 1000,
      skipped: false,
    },
  ];

  it('averages across attempts', () => {
    const r = aggregateMockScore(baseAttempts);
    // Scores: 1, 0, 1, 0.5 → 2.5 / 4 = 0.625
    expect(r.totalScorePct).toBeCloseTo(0.625, 5);
  });

  it('per-kind buckets count correctly', () => {
    const r = aggregateMockScore(baseAttempts);
    expect(r.perKindScore.technical?.count).toBe(2);
    expect(r.perKindScore.technical?.scoreSum).toBe(1);
    expect(r.perKindScore.situational?.count).toBe(1);
    expect(r.perKindScore.longform?.count).toBe(1);
  });

  it('skipped attempts excluded', () => {
    const skipped: MockQuestionAttempt[] = [
      ...baseAttempts,
      {
        kind: 'fit',
        promptOrCaseId: 'fit-tell-me-about-yourself',
        userAnswer: '',
        rubricScores: {},
        scorePct: 0,
        elapsedMs: 0,
        skipped: true,
      },
    ];
    const r = aggregateMockScore(skipped);
    // Same as before — skipped one excluded.
    expect(r.totalScorePct).toBeCloseTo(0.625, 5);
  });
});
