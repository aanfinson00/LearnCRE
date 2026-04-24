import { useState } from 'react';
import type { Question } from '../types/question';
import { templates } from '../quiz/templates';

interface Props {
  question: Question;
}

export function QuestionCard({ question }: Props) {
  const template = templates[question.kind];
  const [showPattern, setShowPattern] = useState(false);
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center rounded-full bg-warm-paper px-2.5 py-0.5 text-xs font-medium text-warm-ink">
          {template.label}
        </span>
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            template.category === 'valuation'
              ? 'bg-copper-soft/30 text-copper-deep'
              : 'bg-warm-paper text-warm-ink'
          }`}
        >
          {template.category}
        </span>
        <button
          type="button"
          onClick={() => setShowPattern((v) => !v)}
          className="inline-flex items-center rounded-full border border-warm-line px-2.5 py-0.5 font-mono text-xs text-warm-stone hover:bg-warm-paper/50"
          title="Toggle pattern hint"
        >
          {showPattern ? template.pattern : 'pattern ?'}
        </button>
      </div>
      <p className="text-lg leading-relaxed text-warm-black">{question.prompt}</p>
    </div>
  );
}
