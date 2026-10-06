import { useEffect, useMemo, useState } from 'react';
import type { Question, QuestionKind } from '../types/question';
import { generateQuestion } from '../quiz/engine';
import { CONTENT_STATS } from '../content/stats';
import { track, type CtaLocation } from '../analytics';
import { ChoiceList } from './ChoiceList';
import { SolutionDetails } from './SolutionDetails';
import { Button } from './ui/Button';

interface Props {
  /** Enter the app. `quickStart` drops straight into a 10-question drill. */
  onEnter: (opts: { quickStart: boolean }) => void;
}

/** Kinds that read instantly to a first-time visitor and show off the viz. */
const SAMPLE_KINDS: QuestionKind[] = [
  'capCompression',
  'goingInCap',
  'debtYield',
  'equityMultiple',
  'dscrLoanSizing',
  'netEffectiveRent',
];

function sampleQuestion(): Question {
  return generateQuestion({
    categories: SAMPLE_KINDS,
    mode: 'mc',
    tolerancePreset: 'normal',
    difficulty: 'intermediate',
  });
}

const MODES: { group: string; title: string; body: string }[] = [
  {
    group: 'Drill',
    title: 'Quiz & speed drills',
    body: 'Cap rates, debt sizing, IRR and multiples, waterfalls, lease economics. Every answer comes with the worked math and the mental-math shortcut.',
  },
  {
    group: 'Drill',
    title: 'Vocab flashcards',
    body: 'The jargon interviewers expect you to use without thinking: debt yield, loss-to-lease, cash sweep, cap-ex reserves.',
  },
  {
    group: 'Apply',
    title: 'Situational cases',
    body: '"Why does this trade at an 8 cap when the comps are at 6?" Reasoning drills that train judgment, not just arithmetic.',
  },
  {
    group: 'Apply',
    title: 'Excel & modeling tests',
    body: 'Write the formula a junior analyst would type, then build take-home-style models graded cell by cell. All in the browser.',
  },
  {
    group: 'Apply',
    title: 'Mock interviews',
    body: 'Mixed technical + behavioral sets modeled on real firm types: megafund acquisitions, debt shops, developers, asset managers.',
  },
  {
    group: 'Prove',
    title: 'Role certifications',
    body: 'Benchmark exams for Acquisitions, Asset Management, Mortgage UW, Development and Portfolio Management.',
  },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: 'Is it really free?',
    a: 'Yes. Every drill, case and modeling test runs free in your browser. No credit card, and no account needed to start.',
  },
  {
    q: 'Why would I make an account?',
    a: 'To keep your progress across devices, and to join the daily challenge, leaderboards, head-to-head matches and cohorts with your classmates. Sign-in is a one-click email link, no password.',
  },
  {
    q: 'Who is this for?',
    a: 'Undergrads and MSRE/MBA students recruiting for REPE, acquisitions, debt and development roles, plus career-switchers and first-year analysts who want the math to be automatic.',
  },
  {
    q: 'How is this different from a modeling course?',
    a: "Courses teach through hours of video. LearnCRE is the practice reps: hundreds of short questions, instant feedback, and spaced repetition on the ones you miss. Use it alongside whatever course you're taking.",
  },
  {
    q: 'Does it work on my phone?',
    a: 'Yes. Quick drills work well on mobile, so you can do ten reps on the train. The Excel and modeling tests are best on a laptop.',
  },
];

export function LandingPage({ onEnter }: Props) {
  const [question, setQuestion] = useState<Question>(sampleQuestion);
  const [pick, setPick] = useState<number | null>(null);
  const [tries, setTries] = useState(0);

  useEffect(() => {
    track('landing_viewed', {});
  }, []);

  const enter = (location: CtaLocation, quickStart: boolean) => {
    track('landing_cta_clicked', { location, quick_start: quickStart });
    onEnter({ quickStart });
  };

  const answer = (v: number) => {
    if (pick !== null) return;
    setPick(v);
    track('landing_sample_answered', {
      question_kind: question.kind,
      correct: Math.abs(v - question.expected) < 1e-9,
    });
  };

  const answered = pick !== null;
  const correct = answered && Math.abs(pick - question.expected) < 1e-9;

  const stats = useMemo(
    () => [
      { n: CONTENT_STATS.questionKinds, label: 'question types' },
      { n: CONTENT_STATS.situationalCases, label: 'situational cases' },
      { n: CONTENT_STATS.vocabTerms, label: 'vocab terms' },
      { n: CONTENT_STATS.excelDrills, label: 'Excel drills' },
      { n: CONTENT_STATS.mockArchetypes, label: 'mock interview firm types' },
    ],
    [],
  );

  const another = () => {
    track('landing_sample_another', {});
    setQuestion(sampleQuestion());
    setPick(null);
    setTries((t) => t + 1);
  };

  return (
    <div className="min-h-screen bg-warm-white text-warm-black">
      {/* Nav */}
      <header className="sticky top-0 z-20 border-b border-warm-line/70 bg-warm-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="aa-parcel h-5 w-5" aria-hidden>
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className={i === 4 ? 'accent' : undefined} />
              ))}
            </span>
            <span className="text-lg font-light tracking-tight">
              Learn CRE<span className="text-copper">.</span>
            </span>
          </div>
          <nav className="flex items-center gap-1 sm:gap-3">
            <a href="#how" className="hidden rounded-md px-3 py-2 text-sm text-warm-stone hover:text-warm-black sm:inline">
              How it works
            </a>
            <a href="#faq" className="hidden rounded-md px-3 py-2 text-sm text-warm-stone hover:text-warm-black sm:inline">
              FAQ
            </a>
            <Button variant="ghost" onClick={() => enter('open_app', false)}>
              Open app
            </Button>
            <Button onClick={() => enter('nav', true)} className="hidden sm:inline-flex">
              Start free
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl gap-10 px-4 pt-12 pb-16 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:items-start lg:pt-20">
        <div className="space-y-6 lg:pt-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-copper/40 bg-copper/10 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-copper-ink">
            CRE &amp; REPE interview prep
          </div>
          <h1 className="display text-5xl leading-[1.05] sm:text-6xl">
            Walk into the interview already fluent in the math
            <span className="text-copper">.</span>
          </h1>
          <p className="editorial max-w-xl text-xl text-warm-stone sm:text-2xl">
            Cap rates, debt sizing, IRR, waterfalls, modeling tests. LearnCRE is the practice reps
            that video courses skip: quick questions, instant worked solutions, and spaced repetition
            on what you miss.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button onClick={() => enter('hero', true)} className="px-6 py-3 text-base">
              Start a free 10-question drill →
            </Button>
            <span className="text-sm text-warm-mute">No signup · no credit card · ~5 minutes</span>
          </div>
        </div>

        {/* Live sample question */}
        <div className="rounded-2xl border border-warm-line bg-warm-white p-5 shadow-aa sm:p-6">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-widest text-copper-deep">
              Try one · live question
            </span>
            <button
              type="button"
              onClick={another}
              className="text-xs text-warm-mute underline-offset-2 hover:text-copper-deep hover:underline"
            >
              Another one ↻
            </button>
          </div>
          <p className="mb-4 text-lg leading-snug text-warm-black" key={question.id}>
            {question.prompt}
          </p>
          <ChoiceList
            question={question}
            selected={pick}
            onSelect={answer}
            disabled={answered}
            correctValue={answered ? question.expected : null}
          />
          {answered && (
            <div className="mt-4 space-y-4">
              <div
                className={`rounded-lg border px-4 py-3 text-sm font-medium ${
                  correct
                    ? 'border-signal-good/50 bg-signal-good/10 text-signal-good-ink'
                    : 'border-signal-bad/50 bg-signal-bad/10 text-signal-bad-ink'
                }`}
              >
                {correct
                  ? 'Correct. Here is the fastest way to get there in your head:'
                  : 'Not quite. Here is how to get it, and the shortcut for next time:'}
              </div>
              <div className="max-h-[22rem] overflow-y-auto pr-1">
                <SolutionDetails question={question} />
              </div>
              <div className="flex flex-col gap-2 border-t border-warm-line pt-4 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-sm text-warm-stone">
                  {tries > 0 ? 'Getting the hang of it?' : 'That was one of thousands.'}
                </span>
                <Button onClick={() => enter('sample', true)}>Keep going: 10 more →</Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-y border-warm-line bg-warm-paper/40">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 sm:grid-cols-5 sm:px-6">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="display text-4xl text-warm-black num">{s.n}</div>
              <div className="mt-1 text-sm text-warm-stone">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Why */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="display text-4xl">
              Courses teach. Interviews test<span className="text-copper">.</span>
            </h2>
            <p className="editorial text-xl text-warm-stone">
              Most prep is 20+ hours of video and $250–$1,500 per course. Then the interviewer asks
              what happens to value when cap rates move 50 bps, and you freeze. Watching someone
              else do it doesn't build that speed. Reps do.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              ['Instant feedback', 'Every answer shows the formula, each step and a picture of the math.'],
              ['Mental-math shortcuts', 'Cap-to-multiple anchors, rule of 72, bps approximations. The tricks VPs use.'],
              ['Adapts to you', 'Dynamic difficulty plus a mistake bank that brings back what you miss.'],
              ['Built for the job', 'Filter by role (acquisitions, debt, AM, development) and asset class.'],
            ].map(([t, b]) => (
              <li key={t} className="rounded-xl border border-warm-line bg-warm-white/70 p-4">
                <div className="font-medium">{t}</div>
                <div className="mt-1 text-sm text-warm-stone">{b}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Modes */}
      <section id="how" className="scroll-mt-16 bg-warm-black py-16 text-warm-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 max-w-2xl space-y-3">
            <div className="font-mono text-[11px] uppercase tracking-widest text-copper">
              How it works
            </div>
            <h2 className="display text-4xl">
              Drill the math. Apply it to deals. Prove it<span className="text-copper">.</span>
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MODES.map((m) => (
              <div key={m.title} className="rounded-xl border border-warm-stone/60 p-5">
                <div className="font-mono text-[10px] uppercase tracking-widest text-copper-soft">
                  {m.group}
                </div>
                <div className="mt-2 text-lg font-medium">{m.title}</div>
                <p className="mt-2 text-sm text-warm-paper/75">{m.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              ['01', 'Pick your track', 'Acquisitions, debt, asset management, development or portfolio management.'],
              ['02', 'Do 10 reps a day', 'About five minutes. Streaks, XP and a six-tier ladder from Rookie to MD keep you coming back.'],
              ['03', 'Walk in ready', 'Pass the role certification, then take a mock interview for the firm type you want.'],
            ].map(([n, t, b]) => (
              <div key={n} className="flex gap-4">
                <div className="font-mono text-sm text-copper">{n}</div>
                <div>
                  <div className="font-medium">{t}</div>
                  <div className="mt-1 text-sm text-warm-paper/70">{b}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compete */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-8 rounded-2xl border border-warm-line bg-warm-paper/40 p-6 sm:p-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div className="space-y-3">
            <h2 className="display text-4xl">
              Better with your RE club<span className="text-copper">.</span>
            </h2>
            <p className="editorial text-xl text-warm-stone">
              Create a free account to join the daily challenge (the same 10 questions worldwide), climb
              the leaderboards, challenge a friend head-to-head, or start a private cohort for your
              club or MSRE class.
            </p>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              'Daily challenge + global leaderboard',
              'Head-to-head: same questions, async 1v1',
              'Private cohorts with their own leaderboard',
              'Progress synced across laptop and phone',
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-0.5 text-copper">▸</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl scroll-mt-16 px-4 pb-16 sm:px-6">
        <h2 className="display mb-6 text-4xl">
          Questions<span className="text-copper">.</span>
        </h2>
        <div className="divide-y divide-warm-line border-y border-warm-line">
          {FAQ.map((f) => (
            <details key={f.q} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                {f.q}
                <span className="text-copper transition-transform duration-aa ease-aa group-open:rotate-45">+</span>
              </summary>
              <p className="mt-2 text-warm-stone">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-warm-line bg-warm-paper/40">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-5 px-4 py-14 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="display text-4xl">
              Five minutes. Ten questions<span className="text-copper">.</span>
            </h2>
            <p className="mt-2 text-warm-stone">See how fast your CRE math really is.</p>
          </div>
          <Button onClick={() => enter('final', true)} className="px-6 py-3 text-base">
            Start drilling free →
          </Button>
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-4 py-8 text-xs text-warm-mute sm:px-6">
        LearnCRE · Practice reps for commercial real estate interviews.
      </footer>
    </div>
  );
}
