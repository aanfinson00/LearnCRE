import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../cloud/auth';
import {
  buildTemplateScaffold,
  fetchAllSubmissions,
  isCurrentUserAdmin,
  reviewSubmission,
} from '../cloud/admin';
import type {
  QuestionSubmission,
  SubmissionStatus,
} from '../cloud/questionSubmissions';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

const STATUS_TABS: { id: 'all' | SubmissionStatus; label: string }[] = [
  { id: 'pending', label: 'Pending' },
  { id: 'approved', label: 'Approved' },
  { id: 'integrated', label: 'Integrated' },
  { id: 'rejected', label: 'Rejected' },
  { id: 'all', label: 'All' },
];

const STATUS_TONE: Record<SubmissionStatus, string> = {
  pending: 'bg-warm-paper text-warm-stone',
  approved: 'bg-signal-good/15 text-signal-good-ink',
  rejected: 'bg-signal-bad/10 text-signal-bad-ink',
  integrated: 'bg-copper/15 text-copper-deep',
};

export function AdminSubmissionsScreen() {
  const { user, cloudEnabled, loading } = useAuth();
  const [adminCheckState, setAdminCheckState] = useState<'pending' | 'yes' | 'no'>(
    'pending',
  );
  const [filter, setFilter] = useState<'all' | SubmissionStatus>('pending');
  const [submissions, setSubmissions] = useState<QuestionSubmission[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (loading) return;
    if (!cloudEnabled || !user) {
      setAdminCheckState('no');
      return;
    }
    let active = true;
    isCurrentUserAdmin(user.id).then((yes) => {
      if (active) setAdminCheckState(yes ? 'yes' : 'no');
    });
    return () => {
      active = false;
    };
  }, [cloudEnabled, user, loading]);

  async function refresh() {
    setListLoading(true);
    setSubmissions(
      await fetchAllSubmissions(filter === 'all' ? undefined : filter),
    );
    setListLoading(false);
  }

  useEffect(() => {
    if (adminCheckState !== 'yes') return;
    refresh();
  }, [adminCheckState, filter]);

  if (adminCheckState === 'pending' || loading) {
    return (
      <main className="mx-auto max-w-3xl space-y-4 py-12">
        <div className="font-mono text-xs uppercase tracking-widest text-warm-mute">
          Checking access…
        </div>
      </main>
    );
  }

  if (adminCheckState === 'no') {
    return (
      <main className="mx-auto max-w-3xl space-y-4 py-12">
        <Card className="space-y-2">
          <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
            Not authorized
          </div>
          <p className="text-sm text-warm-stone">
            This page is admin-only. You're either signed out, on a build
            without cloud, or your account isn't in the admins table. Sign in
            via the Profile screen, or have an existing admin grant your
            access via{' '}
            <code>insert into public.admins (user_id) values ('&lt;your-id&gt;');</code>
            .
          </p>
          <p>
            <a
              href="/"
              className="inline-block font-mono text-xs text-copper-deep hover:underline"
            >
              ← Back to LearnCRE
            </a>
          </p>
        </Card>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl space-y-5 py-8">
      <header className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <div className="display text-3xl text-warm-black">
            Submission review<span className="text-copper">.</span>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-warm-mute num">
            Admin · approve / reject / integrate community questions
          </p>
        </div>
        <a
          href="/"
          className="inline-block font-mono text-xs text-copper-deep hover:underline"
        >
          ← LearnCRE
        </a>
      </header>

      <Card className="space-y-3">
        <div className="flex flex-wrap gap-1.5">
          {STATUS_TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setFilter(t.id);
                setExpandedId(null);
              }}
              className={`rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-widest transition-colors duration-aa ease-aa ${
                filter === t.id
                  ? 'border-copper bg-copper text-warm-paper'
                  : 'border-warm-line bg-warm-paper/40 text-warm-stone hover:bg-warm-paper'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {listLoading ? (
          <p className="font-mono text-[11px] text-warm-mute">Loading…</p>
        ) : submissions.length === 0 ? (
          <p className="text-sm text-warm-mute">
            No submissions in this view.
          </p>
        ) : (
          <ul className="space-y-3">
            {submissions.map((s) => (
              <SubmissionRow
                key={s.id}
                submission={s}
                reviewerId={user!.id}
                expanded={expandedId === s.id}
                onToggleExpand={() =>
                  setExpandedId(expandedId === s.id ? null : s.id)
                }
                onReviewed={refresh}
              />
            ))}
          </ul>
        )}
      </Card>
    </main>
  );
}

interface RowProps {
  submission: QuestionSubmission;
  reviewerId: string;
  expanded: boolean;
  onToggleExpand: () => void;
  onReviewed: () => void;
}

function SubmissionRow({
  submission: s,
  reviewerId,
  expanded,
  onToggleExpand,
  onReviewed,
}: RowProps) {
  const [notes, setNotes] = useState(s.reviewer_notes ?? '');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scaffoldCopied, setScaffoldCopied] = useState(false);

  const scaffold = useMemo(() => buildTemplateScaffold(s), [s]);

  async function handleAction(status: 'approved' | 'rejected' | 'integrated') {
    setBusy(true);
    setError(null);
    const res = await reviewSubmission(s.id, reviewerId, status, notes);
    setBusy(false);
    if (res.ok) onReviewed();
    else setError(res.error ?? 'review failed');
  }

  async function copyScaffold() {
    try {
      await navigator.clipboard.writeText(scaffold);
      setScaffoldCopied(true);
      window.setTimeout(() => setScaffoldCopied(false), 1500);
    } catch {
      /* ignore */
    }
  }

  return (
    <li className="space-y-2 border-b border-dotted border-warm-line pb-3 last:border-b-0 last:pb-0">
      <button
        type="button"
        onClick={onToggleExpand}
        className="flex w-full items-baseline justify-between gap-3 text-left"
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2 font-mono text-[10px] uppercase tracking-widest text-warm-mute num">
            <span>
              {new Date(s.created_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            <span>·</span>
            <span>{s.question_type}</span>
            {s.kind_hint && <span>· kind={s.kind_hint}</span>}
            {s.role_hint && <span>· role={s.role_hint}</span>}
            {s.difficulty_hint && <span>· {s.difficulty_hint}</span>}
          </div>
          <p
            className={`text-sm text-warm-black ${expanded ? '' : 'line-clamp-2'}`}
          >
            {s.prompt}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest ${STATUS_TONE[s.status]}`}
        >
          {s.status}
        </span>
      </button>

      {expanded && (
        <div className="space-y-3 rounded-lg border border-warm-line bg-warm-paper/20 p-3">
          <div className="space-y-1 font-mono text-[11px] num">
            <div>
              <span className="text-warm-mute">expected → </span>
              <span className="text-warm-black break-words">
                {s.expected_answer}
              </span>
              {s.unit && <span className="text-warm-mute"> {s.unit}</span>}
            </div>
            {s.choices && s.choices.length > 0 && (
              <div className="space-y-0.5">
                <div className="text-warm-mute">choices:</div>
                <ol className="ml-4 list-decimal text-warm-black">
                  {s.choices.map((c, i) => {
                    const letter = String.fromCharCode(65 + i);
                    const isCorrect = s.expected_answer.toUpperCase() === letter;
                    return (
                      <li
                        key={i}
                        className={isCorrect ? 'text-copper-deep font-medium' : ''}
                      >
                        {letter}. {c}
                        {isCorrect && ' ←'}
                      </li>
                    );
                  })}
                </ol>
              </div>
            )}
            {s.explanation && (
              <div>
                <span className="text-warm-mute">why → </span>
                <span className="text-warm-black">{s.explanation}</span>
              </div>
            )}
            {s.tags && s.tags.length > 0 && (
              <div>
                <span className="text-warm-mute">tags → </span>
                <span className="text-warm-black">{s.tags.join(', ')}</span>
              </div>
            )}
          </div>

          {s.status === 'pending' || s.status === 'approved' ? (
            <div className="space-y-2 border-t border-warm-line pt-2">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Reviewer notes (visible to the submitter)"
                rows={2}
                className="w-full rounded-lg border border-warm-line bg-warm-white px-3 py-2 text-sm outline-none focus:border-copper"
              />
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  type="button"
                  onClick={() => handleAction('approved')}
                  disabled={busy || s.status === 'approved'}
                  className="text-xs"
                >
                  {s.status === 'approved' ? '✓ approved' : 'Approve'}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => handleAction('integrated')}
                  disabled={busy}
                  className="text-xs"
                >
                  Mark integrated
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => handleAction('rejected')}
                  disabled={busy}
                  className="text-xs"
                >
                  Reject
                </Button>
              </div>
              {error && (
                <p className="font-mono text-[11px] text-signal-bad-ink">{error}</p>
              )}
            </div>
          ) : (
            s.reviewer_notes && (
              <div className="font-mono text-[11px] text-warm-mute num">
                Reviewer note: {s.reviewer_notes}
              </div>
            )
          )}

          <div className="space-y-2 border-t border-warm-line pt-2">
            <div className="flex items-baseline justify-between">
              <div className="text-[10px] uppercase tracking-wider text-warm-mute">
                Template scaffold (copy + drop into{' '}
                <code>src/quiz/templates/</code>)
              </div>
              <Button
                type="button"
                variant="ghost"
                onClick={copyScaffold}
                className="text-xs"
              >
                {scaffoldCopied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
            <pre className="max-h-64 overflow-auto rounded-lg border border-warm-line bg-warm-paper/40 p-2 font-mono text-[10px] leading-snug text-warm-stone">
              {scaffold}
            </pre>
          </div>
        </div>
      )}
    </li>
  );
}
