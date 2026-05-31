import { describe, it } from 'vitest';
import { writeFileSync } from 'node:fs';
import { SITUATIONAL_CASES } from '../quiz/situational/index';
import { LONGFORM_CASES } from '../quiz/longform/index';
import { PROSE_PROMPTS } from '../quiz/mockInterview/prompts/index';
import { walkthroughs } from '../quiz/walkthroughs';

/**
 * One-shot deliverable generator (not a real test). Emits a numbered 1-100
 * review sheet of the wordiest question content so it can be reviewed with
 * voice-memo feedback on structure & framing.
 */
describe('extract questions for feedback review', () => {
  it('writes QUESTION_REVIEW.md', () => {
    const lines: string[] = [];
    let n = 0;

    const meta = (parts: (string | undefined)[]) =>
      parts.filter(Boolean).join(' · ');

    lines.push('# LearnCRE — Question Review Sheet (1–100)');
    lines.push('');
    lines.push(
      'Wordier, framing-sensitive questions pulled live from the app. Work through 1–100 and record a voice memo per item on structure & framing. Each entry shows exactly what the learner reads (scenario → data → the ask → answer choices). Model answers / explanations are omitted on purpose — this pass is about how the question is *posed*.',
    );
    lines.push('');

    // ---- Situational cases (scenario + data + question + option labels) ----
    lines.push('---');
    lines.push('');
    lines.push('## Situational cases');
    lines.push('');
    for (const c of SITUATIONAL_CASES) {
      n += 1;
      lines.push(`### ${n}. ${c.title}`);
      lines.push(
        `*Type: Situational · ${meta([c.category, c.difficulty, c.assetClass, c.roles?.join('/')])}*`,
      );
      lines.push('');
      if (c.documentExcerpt) {
        lines.push(
          `> **[${c.documentExcerpt.docType.toUpperCase()}${c.documentExcerpt.label ? ' — ' + c.documentExcerpt.label : ''}]**`,
        );
        for (const dl of c.documentExcerpt.text.split('\n')) {
          lines.push(`> ${dl}`);
        }
        lines.push('');
      }
      lines.push(c.scenario);
      lines.push('');
      if (c.data?.length) {
        for (const d of c.data) lines.push(`- **${d.label}:** ${d.value}`);
        lines.push('');
      }
      lines.push(`**Q: ${c.question}**`);
      lines.push('');
      c.options.forEach((o, i) => {
        lines.push(`- ${String.fromCharCode(65 + i)}. ${o.label}`);
      });
      lines.push('');
    }

    // ---- Longform case studies (scenario + data + question) ----
    lines.push('---');
    lines.push('');
    lines.push('## Longform case studies (open-text)');
    lines.push('');
    for (const c of LONGFORM_CASES) {
      n += 1;
      lines.push(`### ${n}. ${c.title}`);
      lines.push(
        `*Type: Longform · ${meta([c.difficulty, c.assetClass, c.roles?.join('/')])}*`,
      );
      lines.push('');
      lines.push(c.scenario);
      lines.push('');
      if (c.data?.length) {
        for (const d of c.data) lines.push(`- **${d.label}:** ${d.value}`);
        lines.push('');
      }
      lines.push(`**Q: ${c.question}**`);
      if (c.guidanceHint) {
        lines.push('');
        lines.push(`*Guidance shown: ${c.guidanceHint}*`);
      }
      lines.push('');
    }

    // ---- Mock-interview prose prompts ----
    lines.push('---');
    lines.push('');
    lines.push('## Mock-interview prompts (spoken/prose)');
    lines.push('');
    for (const p of PROSE_PROMPTS) {
      n += 1;
      lines.push(`### ${n}. ${p.prompt.split('.')[0].slice(0, 60)}…`);
      lines.push(
        `*Type: Mock · ${meta([p.kind, p.expectedDurationSec ? `~${p.expectedDurationSec}s` : undefined])}*`,
      );
      lines.push('');
      lines.push(`**Q: ${p.prompt}**`);
      lines.push('');
    }

    // ---- Walkthroughs (setup narrative + step prompts) — fill to 100 ----
    lines.push('---');
    lines.push('');
    lines.push('## Guided walkthroughs (multi-step framing)');
    lines.push('');
    for (const w of walkthroughs) {
      if (n >= 100) break;
      n += 1;
      lines.push(`### ${n}. ${w.label}`);
      lines.push(
        `*Type: Walkthrough · ${meta([w.kind, w.roles?.join('/')])}*`,
      );
      lines.push('');
      lines.push(w.setupNarrative);
      lines.push('');
      w.steps.forEach((s, i) => {
        lines.push(`${i + 1}. **${s.label}** — ${s.prompt}`);
      });
      lines.push('');
    }

    lines.push('---');
    lines.push('');
    lines.push(`_Total questions: ${n}. Generated from live app content._`);

    writeFileSync('QUESTION_REVIEW.md', lines.join('\n'));
    // eslint-disable-next-line no-console
    console.log(`Wrote QUESTION_REVIEW.md with ${n} numbered questions.`);
  });
});
