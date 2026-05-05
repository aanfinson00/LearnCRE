import { describe, expect, it } from 'vitest';
import { CERTS, certById } from '..';
import { caseById as situationalCaseById } from '../../situational';
import { caseById as longformCaseById } from '../../longform';
import { templates } from '../../templates';
import { getWalkthroughById } from '../../walkthroughs';
import { templateById as excelTemplateById } from '../../../excel/templates';
import type { Benchmark } from '../../../types/cert';

/**
 * Cert-catalog invariants. These tests catch typos in benchmark refs (a
 * dangling situational id, an excel template that doesn't exist, etc.) before
 * they break the cert-detail UI or final-exam runner at runtime.
 */

describe('cert catalog — structure', () => {
  it('has 6 certs (1 fundamentals + 5 role)', () => {
    expect(CERTS).toHaveLength(6);
    const fundamentals = certById('cre-fundamentals');
    expect(fundamentals?.prerequisiteCertId).toBeUndefined();
    for (const id of [
      'acq-analyst',
      'asset-manager',
      'mortgage-uw',
      'portfolio-manager',
      'developer',
    ]) {
      const c = certById(id);
      expect(c, `missing cert ${id}`).toBeDefined();
      expect(c!.prerequisiteCertId).toBe('cre-fundamentals');
    }
  });

  it('each cert id is unique', () => {
    const ids = CERTS.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('each cert benchmark id is unique within its cert', () => {
    for (const cert of CERTS) {
      const ids = new Set<string>();
      for (const m of cert.modules) {
        for (const b of m.benchmarks) {
          expect(
            ids.has(b.id),
            `${cert.id}: duplicate benchmark id ${b.id}`,
          ).toBe(false);
          ids.add(b.id);
        }
      }
    }
  });

  it('each final-exam composition sums to totalQuestions', () => {
    for (const cert of CERTS) {
      const sum = cert.finalExam.composition.reduce((s, c) => s + c.count, 0);
      expect(sum, `${cert.id} composition`).toBe(
        cert.finalExam.totalQuestions,
      );
    }
  });
});

function checkBenchmarkRefs(certId: string, b: Benchmark): void {
  switch (b.kind) {
    case 'quizAccuracy':
      for (const k of b.kindSet) {
        expect(
          templates[k],
          `${certId}/${b.id}: unknown quiz kind ${k}`,
        ).toBeDefined();
      }
      break;
    case 'situationalCorrect':
      for (const id of b.caseIds) {
        expect(
          situationalCaseById(id),
          `${certId}/${b.id}: unknown situational case ${id}`,
        ).toBeDefined();
      }
      break;
    case 'walkthroughComplete':
      expect(
        getWalkthroughById(b.walkId),
        `${certId}/${b.id}: unknown walkthrough ${b.walkId}`,
      ).toBeDefined();
      break;
    case 'excelTemplate':
      for (const id of b.templateIds) {
        expect(
          excelTemplateById(id),
          `${certId}/${b.id}: unknown excel template ${id}`,
        ).toBeDefined();
      }
      break;
    case 'longformScore':
      for (const id of b.caseIds) {
        expect(
          longformCaseById(id),
          `${certId}/${b.id}: unknown longform case ${id}`,
        ).toBeDefined();
      }
      break;
  }
}

describe('cert catalog — referenced ids exist', () => {
  for (const cert of CERTS) {
    it(`${cert.id} benchmarks reference real content`, () => {
      for (const m of cert.modules) {
        for (const b of m.benchmarks) {
          checkBenchmarkRefs(cert.id, b);
        }
      }
    });

    it(`${cert.id} final-exam scopes reference real content`, () => {
      const s = cert.finalExam.contentScopes;
      for (const k of s.quizKinds ?? []) {
        expect(
          templates[k],
          `${cert.id} exam quiz kind ${k}`,
        ).toBeDefined();
      }
      for (const id of s.situationalIds ?? []) {
        expect(
          situationalCaseById(id),
          `${cert.id} exam situational id ${id}`,
        ).toBeDefined();
      }
      for (const id of s.walkIds ?? []) {
        expect(
          getWalkthroughById(id),
          `${cert.id} exam walk id ${id}`,
        ).toBeDefined();
      }
      for (const id of s.excelIds ?? []) {
        expect(
          excelTemplateById(id),
          `${cert.id} exam excel id ${id}`,
        ).toBeDefined();
      }
      for (const id of s.longformIds ?? []) {
        expect(
          longformCaseById(id),
          `${cert.id} exam longform id ${id}`,
        ).toBeDefined();
      }
    });
  }
});
