import { SITUATIONAL_CASES } from './situational/index';
import { LONGFORM_CASES } from './longform/index';
import { PROSE_PROMPTS } from './mockInterview/prompts/index';
import { walkthroughs } from './walkthroughs';

/**
 * Feedback studio dataset. Assembles the wordiest, most framing-sensitive
 * question content into a single numbered 1-100 list so it can be reviewed
 * one-at-a-time (student-style) with a voice memo attached per batch.
 *
 * Each question carries both the PROMPT side (`blocks`) and the interactive
 * ANSWER side (`answer`) so the reader reproduces the real user experience:
 * click an option, see correct/incorrect, read the reasoning + takeaway.
 *
 * This is the single source of truth: the in-app Feedback studio screen,
 * `feedback/questions.json`, and `QUESTION_REVIEW.md` all render from
 * `REVIEW_QUESTIONS`, so numbering can never drift between them.
 *
 * Composition (in order): 71 situational + 9 longform + 14 mock prose +
 * walkthroughs to fill to exactly 100.
 */

export const REVIEW_TARGET = 100;

export type ReviewType = 'situational' | 'longform' | 'mock' | 'walkthrough';

/** Prompt-side blocks — what the learner reads before answering. */
export type ReviewBlock =
  | { kind: 'doc'; docType: string; label?: string; text: string }
  | { kind: 'prose'; text: string }
  | { kind: 'data'; points: { label: string; value: string }[] }
  | { kind: 'ask'; text: string }
  | { kind: 'note'; text: string };

/** Answer-side payload — the interaction + reasoning the learner gets. */
export type ReviewAnswer =
  | {
      kind: 'choice';
      options: { label: string; isBest: boolean; explanation: string }[];
      takeaway: string;
      tips: string[];
    }
  | {
      kind: 'model';
      guidanceHint?: string;
      modelAnswer: string;
      rubric: string[];
      tips: string[];
      takeaway?: string;
      expectedDurationSec?: number;
    }
  | {
      kind: 'steps';
      steps: {
        label: string;
        prompt: string;
        expected: number;
        unit: string;
        resultDescription: string;
      }[];
      takeaway: string;
    };

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
  answer: ReviewAnswer;
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
      answer: {
        kind: 'choice' as const,
        options: c.options.map((o) => ({
          label: o.label,
          isBest: o.isBest,
          explanation: o.explanation,
        })),
        takeaway: c.takeaway,
        tips: c.tips,
      },
    };
  });
}

function buildLongform(): Omit<ReviewQuestion, 'number'>[] {
  return LONGFORM_CASES.map((c) => {
    const blocks: ReviewBlock[] = [{ kind: 'prose', text: c.scenario }];
    if (c.data?.length) blocks.push({ kind: 'data', points: c.data });
    blocks.push({ kind: 'ask', text: c.question });
    return {
      id: `lf:${c.id}`,
      type: 'longform' as const,
      title: c.title,
      meta: metaParts(['Longform', c.difficulty, c.assetClass, c.roles?.join('/')]),
      blocks,
      answer: {
        kind: 'model' as const,
        guidanceHint: c.guidanceHint,
        modelAnswer: c.modelAnswer,
        rubric: c.rubric.map((r) => r.dimension),
        tips: c.tips,
        takeaway: c.takeaway,
      },
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
    answer: {
      kind: 'model' as const,
      modelAnswer: p.modelAnswer,
      rubric: p.rubric.map((r) => r.dimension),
      tips: p.tips,
      expectedDurationSec: p.expectedDurationSec,
    },
  }));
}

function buildWalkthrough(): Omit<ReviewQuestion, 'number'>[] {
  return walkthroughs.map((w) => ({
    id: `walk:${w.id}`,
    type: 'walkthrough' as const,
    title: w.label,
    meta: metaParts(['Walkthrough', w.kind, w.roles?.join('/')]),
    blocks: [{ kind: 'prose' as const, text: w.setupNarrative }],
    answer: {
      kind: 'steps' as const,
      steps: w.steps.map((s) => ({
        label: s.label,
        prompt: s.prompt,
        expected: s.expected,
        unit: String(s.unit),
        resultDescription: s.resultDescription,
      })),
      takeaway: w.takeaway,
    },
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

/** Render a single question (prompt + answer key) to markdown. */
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
      case 'note':
        lines.push(`*${b.text}*`);
        lines.push('');
        break;
    }
  }

  const a = q.answer;
  lines.push('<details><summary>Answer & reasoning</summary>');
  lines.push('');
  if (a.kind === 'choice') {
    a.options.forEach((o, i) => {
      lines.push(`- ${o.isBest ? '✅' : '◻️'} **${String.fromCharCode(65 + i)}.** ${o.label}`);
      lines.push(`  - ${o.explanation}`);
    });
    lines.push('');
    lines.push(`**Takeaway:** ${a.takeaway}`);
    if (a.tips.length) {
      lines.push('');
      a.tips.forEach((t) => lines.push(`- ${t}`));
    }
  } else if (a.kind === 'model') {
    if (a.guidanceHint) lines.push(`*Guidance: ${a.guidanceHint}*`, '');
    lines.push('**Model answer:**', '', a.modelAnswer, '');
    lines.push('**Graded on:**');
    a.rubric.forEach((r) => lines.push(`- ${r}`));
    if (a.takeaway) lines.push('', `**Takeaway:** ${a.takeaway}`);
    if (a.tips.length) {
      lines.push('');
      a.tips.forEach((t) => lines.push(`- ${t}`));
    }
  } else {
    a.steps.forEach((s, i) => {
      lines.push(`${i + 1}. **${s.label}** — ${s.prompt}`);
      lines.push(`   - Expected: \`${s.expected}\` (${s.unit}) — ${s.resultDescription}`);
    });
    lines.push('', `**Takeaway:** ${a.takeaway}`);
  }
  lines.push('', '</details>');
  return lines.join('\n').trimEnd();
}
