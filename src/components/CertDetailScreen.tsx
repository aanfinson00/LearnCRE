import { useMemo } from 'react';
import { certById } from '../quiz/certs';
import { useCertProgress } from '../hooks/useCertProgress';
import { templates } from '../quiz/templates';
import { getWalkthroughById } from '../quiz/walkthroughs';
import { caseById as situationalCaseById } from '../quiz/situational';
import { caseById as longformCaseById } from '../quiz/longform';
import type { Benchmark, Module } from '../types/cert';
import type { BenchmarkResult } from '../quiz/certs/evaluate';
import { CertProgressBar } from './CertProgressBar';
import { CertBadge } from './CertBadge';
import { CertArtifact } from './CertArtifact';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { useProfile } from '../hooks/useProfile';
import { loadSessions } from '../storage/localStorage';

export type CertMode =
  | 'quiz'
  | 'situational'
  | 'walkthrough'
  | 'excel'
  | 'longform';

interface Props {
  certId: string;
  onBack: () => void;
  /** Switches the app to the named mode (and optionally to a specific item). */
  onDeepLink: (mode: CertMode) => void;
  /** Starts the cert's final exam runner. */
  onStartFinalExam: (certId: string) => void;
}

function benchModeLabel(b: Benchmark): string {
  switch (b.kind) {
    case 'quizAccuracy':
      return 'Quiz';
    case 'situationalCorrect':
      return 'Situational';
    case 'walkthroughComplete':
      return 'Walkthrough';
    case 'excelTemplate':
      return 'Excel';
    case 'longformScore':
      return 'Long-form';
  }
}

function deepLinkMode(b: Benchmark): CertMode {
  switch (b.kind) {
    case 'quizAccuracy':
      return 'quiz';
    case 'situationalCorrect':
      return 'situational';
    case 'walkthroughComplete':
      return 'walkthrough';
    case 'excelTemplate':
      return 'excel';
    case 'longformScore':
      return 'longform';
  }
}

function benchScopeLabel(b: Benchmark): string {
  switch (b.kind) {
    case 'quizAccuracy':
      return b.kindSet
        .map((k) => templates[k]?.label ?? k)
        .join(' · ');
    case 'situationalCorrect':
      return b.caseIds
        .map((id) => situationalCaseById(id)?.title ?? id)
        .join(' · ');
    case 'walkthroughComplete':
      return getWalkthroughById(b.walkId)?.label ?? b.walkId;
    case 'excelTemplate':
      return b.templateIds.join(' · ');
    case 'longformScore':
      return b.caseIds
        .map((id) => longformCaseById(id)?.title ?? id)
        .join(' · ');
  }
}

interface BenchRowProps {
  bench: Benchmark;
  result: BenchmarkResult;
  onDrill: () => void;
}

function BenchmarkRow({ bench, result, onDrill }: BenchRowProps) {
  const scope = benchScopeLabel(bench);
  return (
    <div
      className={`rounded-lg border p-3 transition-all duration-aa ease-aa ${
        result.passed
          ? 'border-signal-good/40 bg-signal-good/5'
          : 'border-warm-line bg-warm-white/50'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-xs font-medium text-warm-ink">
            <span className="inline-flex items-center rounded-full border border-warm-line px-1.5 py-0.5 text-[9px] uppercase tracking-widest text-warm-mute">
              {benchModeLabel(bench)}
            </span>
            {result.passed && (
              <span className="text-signal-good-ink">✓ Passed</span>
            )}
          </div>
          <div className="mt-1 text-sm font-medium text-warm-black">
            {bench.label}
          </div>
          <div className="mt-0.5 text-xs text-warm-stone">{scope}</div>
        </div>
        <Button
          variant="secondary"
          onClick={onDrill}
          className="shrink-0 text-xs"
        >
          Drill →
        </Button>
      </div>
      <div className="mt-3">
        <CertProgressBar
          progress={result.progress}
          status={result.detail}
          size="sm"
          passed={result.passed}
        />
      </div>
    </div>
  );
}

interface ModuleSectionProps {
  m: Module;
  index: number;
  results: BenchmarkResult[];
  passed: boolean;
  onDrill: (b: Benchmark) => void;
}

function ModuleSection({
  m,
  index,
  results,
  passed,
  onDrill,
}: ModuleSectionProps) {
  const passedCount = results.filter((r) => r.passed).length;
  return (
    <Card className={`space-y-4 ${passed ? 'border-signal-good/40' : ''}`}>
      <div className="flex items-baseline justify-between gap-3">
        <div>
          <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
            Module {index + 1}
          </div>
          <h3 className="display text-xl text-warm-black">{m.title}</h3>
          <p className="mt-1 text-sm text-warm-stone">{m.description}</p>
        </div>
        <div className="text-right">
          <div className="font-mono text-sm text-warm-ink num">
            {passedCount}/{results.length}
          </div>
          <div className="text-[10px] uppercase tracking-widest text-warm-mute">
            benchmarks
          </div>
        </div>
      </div>
      <div className="space-y-2">
        {m.benchmarks.map((b, i) => (
          <BenchmarkRow
            key={b.id}
            bench={b}
            result={results[i]}
            onDrill={() => onDrill(b)}
          />
        ))}
      </div>
    </Card>
  );
}

export function CertDetailScreen({
  certId,
  onBack,
  onDeepLink,
  onStartFinalExam,
}: Props) {
  const cert = certById(certId);
  const { views, records, moduleResults } = useCertProgress();
  const { active } = useProfile();
  const sessions = useMemo(() => loadSessions(active.id), [active.id]);

  const view = cert ? views[cert.id] : undefined;
  const record = cert ? records[cert.id] : undefined;
  const modules = cert ? moduleResults[cert.id] ?? [] : [];

  const prereq = useMemo(
    () =>
      cert?.prerequisiteCertId ? certById(cert.prerequisiteCertId) : undefined,
    [cert],
  );
  const prereqMet = prereq ? !!views[prereq.id]?.earned : true;

  if (!cert || !view) {
    return (
      <div className="mx-auto max-w-3xl space-y-4 py-10">
        <Button variant="secondary" onClick={onBack} className="text-xs">
          ← Back
        </Button>
        <Card>
          <div className="text-sm text-warm-stone">Cert not found.</div>
        </Card>
      </div>
    );
  }

  const bestExam = record?.finalExamAttempts.length
    ? Math.max(...record.finalExamAttempts.map((a) => a.scorePct))
    : null;

  return (
    <div className="mx-auto max-w-3xl space-y-6 py-10">
      <header className="flex items-start justify-between gap-6">
        <div className="space-y-2">
          <button
            type="button"
            onClick={onBack}
            className="text-xs text-warm-mute transition-colors duration-aa-fast ease-aa hover:text-copper"
          >
            ← All certs
          </button>
          <h1 className="display text-4xl text-warm-black">
            {cert.title}
            <span className="text-copper">.</span>
          </h1>
          <p className="editorial text-lg text-warm-stone">
            {cert.description}
          </p>
        </div>
      </header>

      {view.earned && record?.earnedAt && (
        <>
          <CertBadge
            cert={cert}
            earnedAt={record.earnedAt}
            scorePct={bestExam}
          />
          <CertArtifact
            cert={cert}
            holderName={active.name}
            earnedAt={record.earnedAt}
            finalScorePct={bestExam}
            sessions={sessions}
            examFinishedAt={
              record.finalExamAttempts.length
                ? record.finalExamAttempts[record.finalExamAttempts.length - 1]
                    .finishedAt
                : record.earnedAt
            }
          />
        </>
      )}

      {prereq && !prereqMet && (
        <Card className="border-warm-mute/40 bg-warm-paper/40">
          <div className="text-sm text-warm-stone">
            🔒 Earn{' '}
            <span className="font-medium text-warm-ink">{prereq.title}</span>{' '}
            first to unlock this cert.
          </div>
        </Card>
      )}

      <Card className="space-y-3">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <CertProgressBar
            label="Modules passed"
            status={`${view.modulesPassed}/${view.totalModules}`}
            progress={
              view.totalModules ? view.modulesPassed / view.totalModules : 0
            }
            passed={view.eligibleForFinal}
          />
          <CertProgressBar
            label="Benchmarks passed"
            status={`${view.benchmarksPassed}/${view.totalBenchmarks}`}
            progress={
              view.totalBenchmarks
                ? view.benchmarksPassed / view.totalBenchmarks
                : 0
            }
          />
        </div>
      </Card>

      <div className="space-y-3">
        {cert.modules.map((m, i) => (
          <ModuleSection
            key={m.id}
            m={m}
            index={i}
            results={modules[i]?.benchmarkResults ?? []}
            passed={modules[i]?.passed ?? false}
            onDrill={(b) => onDeepLink(deepLinkMode(b))}
          />
        ))}
      </div>

      <Card className="space-y-3">
        <div className="flex items-baseline justify-between gap-3">
          <div>
            <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
              Final exam
            </div>
            <h3 className="display text-xl text-warm-black">
              {cert.finalExam.totalQuestions}-question mixed exam
            </h3>
            <p className="mt-1 text-sm text-warm-stone">
              Drawn from this cert's modules. Pass at{' '}
              {Math.round(cert.finalExam.passThresholdPct * 100)}%+ to earn the
              certification.
            </p>
            <div className="mt-2 flex flex-wrap gap-1 text-[11px] text-warm-mute">
              {cert.finalExam.composition.map((c) => (
                <span
                  key={c.mode}
                  className="rounded-full border border-warm-line px-2 py-0.5"
                >
                  {c.count} {c.mode}
                </span>
              ))}
            </div>
          </div>
          <div className="text-right">
            <Button
              onClick={() => onStartFinalExam(cert.id)}
              disabled={!view.eligibleForFinal || view.earned}
              className="text-xs"
            >
              {view.earned
                ? 'Earned ✓'
                : view.eligibleForFinal
                  ? 'Take final exam →'
                  : 'Modules first'}
            </Button>
          </div>
        </div>

        {record && record.finalExamAttempts.length > 0 && (
          <div className="border-t border-warm-line pt-3">
            <div className="mb-2 text-xs font-medium uppercase tracking-widest text-warm-mute">
              Past attempts
            </div>
            <div className="space-y-1 text-xs">
              {record.finalExamAttempts
                .slice()
                .reverse()
                .slice(0, 5)
                .map((a, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between font-mono num"
                  >
                    <span className="text-warm-mute">
                      {new Date(a.finishedAt).toLocaleDateString()}
                    </span>
                    <span
                      className={
                        a.passed
                          ? 'text-signal-good-ink'
                          : 'text-signal-bad-ink'
                      }
                    >
                      {Math.round(a.scorePct * 100)}%{' '}
                      {a.passed ? '✓ pass' : '✗ fail'}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
