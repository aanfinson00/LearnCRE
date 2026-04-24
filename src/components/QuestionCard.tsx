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
        <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
          {template.label}
        </span>
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            template.category === 'valuation'
              ? 'bg-sky-100 text-sky-800'
              : 'bg-violet-100 text-violet-800'
          }`}
        >
          {template.category}
        </span>
        <button
          type="button"
          onClick={() => setShowPattern((v) => !v)}
          className="inline-flex items-center rounded-full border border-slate-200 px-2.5 py-0.5 font-mono text-xs text-slate-600 hover:bg-slate-50"
          title="Toggle pattern hint"
        >
          {showPattern ? template.pattern : 'pattern ?'}
        </button>
      </div>
      <p className="text-lg leading-relaxed text-slate-900">{question.prompt}</p>
    </div>
  );
}
