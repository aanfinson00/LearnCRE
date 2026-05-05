import { useState } from 'react';
import { dismissModePrimer, isModePrimerDismissed } from '../storage/onboarding';

export type PrimerMode =
  | 'quiz'
  | 'speedDrill'
  | 'vocab'
  | 'walkthrough'
  | 'situational'
  | 'longform'
  | 'mockInterview'
  | 'excel'
  | 'modelingTest'
  | 'study'
  | 'certify';

interface PrimerContent {
  label: string;
  blurb: string;
  whenToUse: string;
  time: string;
}

const PRIMER_CONTENT: Record<PrimerMode, PrimerContent> = {
  quiz: {
    label: 'Quiz',
    blurb:
      'Single-question reps across 35 kinds — cap rates, debt sizing, lease economics, returns. Tight feedback loop with a full step-by-step solution after every answer.',
    whenToUse:
      'Best for absorbing new concepts and pattern-matching how assumption changes move valuations. Filter by role, asset class, and category.',
    time: '5-15 min',
  },
  speedDrill: {
    label: 'Speed drill',
    blurb:
      'Times-table-style grid: a 5×5, 7×7, or 9×9 of cap-rate, IRR, or loan-constant problems against a clock. Heatmap reveals which rows / columns you flub.',
    whenToUse:
      "When the math is right but it's slow. Grinds the lookup speed an interviewer expects when you're at the whiteboard.",
    time: '3-8 min',
  },
  vocab: {
    label: 'Vocab',
    blurb:
      'Flashcard drill on industry terminology — DSCR, debt yield, mark-to-market, NER, mezz, capex reserve, and the dozens of acronyms interviewers throw at you.',
    whenToUse:
      "When you compute fine but the language trips you up. Lock in definitions before you walk into a behavioral round that turns technical.",
    time: '5-10 min',
  },
  walkthrough: {
    label: 'Walkthroughs',
    blurb:
      'Multi-step guided problems — "walk me through the deal" prompts decomposed into 8-12 chained steps. Each step gates on the previous, like a real conversation.',
    whenToUse:
      "When you can compute pieces but stumble on the full deal narrative. Trains the muscle for the canonical 'walk me through a deal' interview prompt.",
    time: '10-20 min',
  },
  situational: {
    label: 'Situational',
    blurb:
      "Mini case studies that test reasoning, not computation. 'Subject is at 8 cap, comps are at 6 — what's likely going on?' Pick the most-defensible answer, then see why the others are less right.",
    whenToUse:
      "When you've memorized the formulas but don't yet have the judgment to read a deal. Closes the gap between mechanics and instinct.",
    time: '8-15 min',
  },
  longform: {
    label: 'Case study',
    blurb:
      'Long-form prose answers graded against a rubric. You type a 4-6 sentence response; the system scores against expected concepts and shows where you missed.',
    whenToUse:
      "When the interviewer asks a nuanced question and a one-line numeric answer won't do. Practices the explanation, not just the math.",
    time: '15-25 min',
  },
  mockInterview: {
    label: 'Mock interview',
    blurb:
      "Firm-archetype mocks — 8 archetypes (megafund acquisitions, regional asset mgr, debt shop, etc.) each with their own question mix and tone. Self-graded against a rubric.",
    whenToUse:
      "When you've drilled the components and want full-session practice. Best a few days before the actual round.",
    time: '25-45 min',
  },
  excel: {
    label: 'Excel',
    blurb:
      'One-formula-at-a-time drill: write the spreadsheet formula a junior analyst would type. Live preview computes your answer; submit checks tolerance + structure.',
    whenToUse:
      "Bridges 'I can compute this in my head' to 'I can write the formula on a screen sharing during a take-home test.' 60-90 seconds per template.",
    time: '5-15 min',
  },
  modelingTest: {
    label: 'Modeling test',
    blurb:
      "Take-home-style multi-cell exercises. Open a partial template, fill 30-50 cells in any order, submit when ready. Graded on whether the bottom-line outputs (IRR, exit value, max loan) hit within tolerance.",
    whenToUse:
      "When you're a few days out from a take-home modeling test or a live Excel-share interview. Auto-saves so you can resume.",
    time: '15-30 min per template',
  },
  study: {
    label: 'Study tables',
    blurb:
      'Reference cheat sheets — cap rate ladders, multiple↔IRR conversions, growth tables, debt constants, lease econ. Open in a side panel while drilling.',
    whenToUse:
      "When you need a quick lookup mid-drill, or want to memorize the canonical reference numbers (e.g. 'a 5% rate at 30-yr amort = 6.4% loan constant').",
    time: 'Reference, browse anytime',
  },
  certify: {
    label: 'Certify',
    blurb:
      'Five role certifications (Acquisitions, Asset Mgmt, Mortgage UW, Development, Portfolio Mgmt). Each has a benchmark exam: 25 questions, 80% to pass, downloadable certificate.',
    whenToUse:
      "When you want to test that you've actually internalized a role's full surface area, not just drilled bits and pieces. The exam is harder than a quiz session.",
    time: '30-45 min per cert',
  },
};

interface Props {
  mode: PrimerMode;
}

export function ModePrimer({ mode }: Props) {
  const [dismissed, setDismissed] = useState(() => isModePrimerDismissed(mode));
  if (dismissed) return null;
  const content = PRIMER_CONTENT[mode];

  function handleDismiss() {
    dismissModePrimer(mode);
    setDismissed(true);
  }

  return (
    <div className="relative rounded-xl border border-copper/30 bg-copper/5 p-5 shadow-aa">
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Dismiss primer"
        className="absolute right-3 top-3 rounded-md p-1.5 text-warm-mute transition-colors duration-aa ease-aa hover:bg-warm-paper/60 hover:text-warm-ink"
      >
        ✕
      </button>
      <div className="font-mono text-[10px] uppercase tracking-widest text-copper-deep num">
        New here? · {content.time}
      </div>
      <div className="mt-1 text-base font-medium text-warm-black">
        {content.label}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-warm-stone">
        {content.blurb}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-warm-stone">
        <span className="font-medium text-warm-ink">When to use: </span>
        {content.whenToUse}
      </p>
    </div>
  );
}
