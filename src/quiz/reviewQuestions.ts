import { SITUATIONAL_CASES } from './situational/index';
import { LONGFORM_CASES } from './longform/index';
import { PROSE_PROMPTS } from './mockInterview/prompts/index';
import { walkthroughs } from './walkthroughs';

/**
 * Feedback studio dataset. Assembles the wordiest, most framing-sensitive
 * question content into a single numbered 1-100 list so it can be reviewed
 * one-at-a-time (student-style) with a voice memo attached per question.
 *
 * This is the single source of truth: the in-app Feedback studio screen,
 * the `feedback/questions.json` export, and `QUESTION_REVIEW.md` all render
 * from `REVIEW_QUESTIONS`, so the numbering can never drift between them.
 *
 * Composition (in order): 71 situational + 9 longform + 14 mock prose +
 * walkthroughs to fill to exactly 100.
 */

export const REVIEW_TARGET = 100;

export type ReviewType = 'situational' | 'longform' | 'mock' | 'walkthrough';

export type ReviewBlock =
  | { kind: 'doc'; docType: string; label?: string; text: string }
  | { kind: 'prose'; text: string }
  | { kind: 'data'; points: { label: string; value: string }[] }
  | { kind: 'ask'; text: string }
  | { kind: 'options'; options: string[] }
  | { kind: 'steps'; steps: { label: string; prompt: string }[] }
  | { kind: 'note'; text: string };

export interface ReviewQuestion {
  /** 1-based position in the review sheet. */
  number: number;
  /** Stable, source-prefixed id (e.g. "sit:going-in-vs-exit-cap-spread"). */
  id: string;
  type: ReviewType;
  title: string;
  /** One-line provenance string ("Situational · pricing · intermediate · office"). */
  meta: string;
  blocks: ReviewBlock[];
}

function metaParts(parts: (string | undefined)[]): string {
  return parts.filter(Boolean).join(' · ');
}

function buildSituational(): Omit<ReviewQuestion, 'number'>[] {
  return SITUATIONAL_CASES.map((c) => {
    const blocks: ReviewBlock[] = [];
    if (c.documentExcerpt) {
      blocks.push({
        kind: 'doc',
        docType: c.documentExcerpt.docType,
        label: c.documentExcerpt.label,
        text: c.documentExcerpt.text,
      });
    }
    blocks.push({ kind: 'prose', text: c.scenario });
    if (c.data?.length) blocks.push({ kind: 'data', points: c.data });
    blocks.push({ kind: 'ask', text: c.question });
    blocks.push({ kind: 'options', options: c.options.map((o) => o.label) });
    return {
      id: `sit:${c.id}`,
      type: 'situational' as const,
      title: c.title,
      meta: metaParts([
        'Situational',
        c.category,
        c.difficulty,
        c.assetClass,
        c.roles?.join('/'),
      ]),
      blocks,
    };
  });
}

function buildLongform(): Omit<ReviewQuestion, 'number'>[] {
  return LONGFORM_CASES.map((c) => {
    const blocks: ReviewBlock[] = [{ kind: 'prose', text: c.scenario }];
    if (c.data?.length) blocks.push({ kind: 'data', points: c.data });
    blocks.push({ kind: 'ask', text: c.question });
    if (c.guidanceHint) blocks.push({ kind: 'note', text: `Guidance shown: ${c.guidanceHint}` });
    return {
      id: `lf:${c.id}`,
      type: 'longform' as const,
      title: c.title,
      meta: metaParts(['Longform', c.difficulty, c.assetClass, c.roles?.join('/')]),
      blocks,
    };
  });
}

function shorten(s: string, max = 60): string {
  const head = s.split(/[.?!]/)[0].trim();
  return head.length > max ? `${head.slice(0, max).trim()}…` : `${head}…`;
}

function buildMock(): Omit<ReviewQuestion, 'number'>[] {
  return PROSE_PROMPTS.map((p) => ({
    id: `mock:${p.id}`,
    type: 'mock' as const,
    title: shorten(p.prompt),
    meta: metaParts([
      'Mock',
      p.kind,
      p.expectedDurationSec ? `~${p.expectedDurationSec}s` : undefined,
    ]),
    blocks: [{ kind: 'ask' as const, text: p.prompt }],
  }));
}

function buildWalkthrough(): Omit<ReviewQuestion, 'number'>[] {
  return walkthroughs.map((w) => ({
    id: `walk:${w.id}`,
    type: 'walkthrough' as const,
    title: w.label,
    meta: metaParts(['Walkthrough', w.kind, w.roles?.join('/')]),
    blocks: [
      { kind: 'prose' as const, text: w.setupNarrative },
      {
        kind: 'steps' as const,
        steps: w.steps.map((s) => ({ label: s.label, prompt: s.prompt })),
      },
    ],
  }));
}

/** Build the numbered review list, capped at REVIEW_TARGET. */
export function buildReviewQuestions(): ReviewQuestion[] {
  const pool = [
    ...buildSituational(),
    ...buildLongform(),
    ...buildMock(),
    ...buildWalkthrough(),
  ].slice(0, REVIEW_TARGET);
  return pool.map((q, i) => ({ number: i + 1, ...q }));
}

export const REVIEW_QUESTIONS: ReviewQuestion[] = buildReviewQuestions();

/** Render a single question to the markdown used in QUESTION_REVIEW.md. */
export function reviewQuestionToMarkdown(q: ReviewQuestion): string {
  const lines: string[] = [];
  lines.push(`### ${q.number}. ${q.title}`);
  lines.push(`*${q.meta}*`);
  lines.push('');
  for (const b of q.blocks) {
    switch (b.kind) {
      case 'doc':
        lines.push(`> **[${b.docType.toUpperCase()}${b.label ? ' — ' + b.label : ''}]**`);
        for (const dl of b.text.split('\n')) lines.push(`> ${dl}`);
        lines.push('');
        break;
      case 'prose':
        lines.push(b.text);
        lines.push('');
        break;
      case 'data':
        for (const d of b.points) lines.push(`- **${d.label}:** ${d.value}`);
        lines.push('');
        break;
      case 'ask':
        lines.push(`**Q: ${b.text}**`);
        lines.push('');
        break;
      case 'options':
        b.options.forEach((o, i) => lines.push(`- ${String.fromCharCode(65 + i)}. ${o}`));
        lines.push('');
        break;
      case 'steps':
        b.steps.forEach((s, i) => lines.push(`${i + 1}. **${s.label}** — ${s.prompt}`));
        lines.push('');
        break;
      case 'note':
        lines.push(`*${b.text}*`);
        lines.push('');
        break;
    }
  }
  return lines.join('\n').trimEnd();
}
