import { useState } from 'react';
import type { Question } from '../types/question';
import { templates } from '../quiz/templates';

interface Props {
  question: Question;
  defaultOpen?: boolean;
  showTipsByDefault?: boolean;
}

export function SolutionDetails({ question, defaultOpen = true, showTipsByDefault = false }: Props) {
  const [showMath, setShowMath] = useState(defaultOpen);
  const [showTips, setShowTips] = useState(showTipsByDefault);
  const tips = templates[question.kind].tips;

  const template = templates[question.kind];
  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-xs text-slate-700 num">
        <span className="mr-2 text-slate-400">pattern</span>
        {template.pattern}
      </div>

      <div className="flex flex-wrap gap-4 text-sm">
        <button
          type="button"
          onClick={() => setShowMath((v) => !v)}
          className="text-slate-600 underline decoration-dotted hover:text-slate-900"
        >
          {showMath ? 'Hide math' : 'Show math'}
        </button>
        {tips.length > 0 && (
          <button
            type="button"
            onClick={() => setShowTips((v) => !v)}
            className="text-slate-600 underline decoration-dotted hover:text-slate-900"
          >
            {showTips ? 'Hide tips' : 'Show mental-math tips'}
          </button>
        )}
      </div>

      {showMath && (
        <div className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="text-xs uppercase tracking-wide text-slate-500">Formula</div>
          <div className="font-mono text-sm text-slate-800">{question.solution.formula}</div>
          <div className="mt-3 space-y-2">
            {question.solution.steps.map((step, i) => (
              <div key={i} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-sm">
                <div className="text-slate-500">{step.label}</div>
                <div className="flex flex-wrap items-baseline gap-2 font-mono num">
                  <span className="text-slate-500">{step.expression}</span>
                  <span className="text-slate-400">=</span>
                  <span className="font-medium text-slate-900">{step.result}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showTips && tips.length > 0 && (
        <div className="space-y-2 rounded-lg border border-amber-200 bg-amber-50 p-4">
          <div className="text-xs uppercase tracking-wide text-amber-700">Mental-math tips</div>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-slate-700">
            {tips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
