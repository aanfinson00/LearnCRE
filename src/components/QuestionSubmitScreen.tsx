import { useEffect, useState } from 'react';
import { useAuth } from '../cloud/auth';
import {
  fetchMySubmissions,
  type QuestionSubmission,
  type SubmissionDifficulty,
  type SubmissionDraft,
  type SubmissionType,
  submitQuestion,
  validateSubmission,
} from '../cloud/questionSubmissions';
import { ROLES } from '../types/role';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface Props {
  onBack: () => void;
}

const TYPE_OPTIONS: { id: SubmissionType; label: string; hint: string }[] = [
  {
    id: 'multipleChoice',
    label: 'Multiple choice',
    hint: '2-8 choices, you mark one as correct.',
  },
  {
    id: 'solvable',
    label: 'Solvable',
    hint: 'Numeric answer with a unit (% / $ / x / bps / $/SF).',
  },
  {
    id: 'wordProblem',
    label: 'Word problem',
    hint: 'Free-form answer; reviewer reads it manually.',
  },
];

const UNIT_OPTIONS = [
  { id: 'usd', label: '$ — US dollars' },
  { id: 'pct', label: '% — percent' },
  { id: 'pctChange', label: '% — percent change (signed)' },
  { id: 'bps', label: 'bps — basis points' },
  { id: 'multiple', label: 'x — multiple (e.g. EM, DSCR)' },
  { id: 'usdPerSf', label: '$/SF — dollars per square foot' },
  { id: 'usdChange', label: '$ — dollar change (signed)' },
];

const DIFFICULTY_OPTIONS: { id: SubmissionDifficulty; label: string }[] = [
  { id: 'beginner', label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' },
];

const STATUS_TONE: Record<QuestionSubmission['status'], string> = {
  pending: 'bg-warm-paper text-warm-stone',
  approved: 'bg-signal-good/15 text-signal-good-ink',
  rejected: 'bg-signal-bad/10 text-signal-bad-ink',
  integrated: 'bg-copper/15 text-copper-deep',
};

export function QuestionSubmitScreen({ onBack }: Props) {
  const { user, cloudEnabled } = useAuth();
  const [submissions, setSubmissions] = useState<QuestionSubmission[]>([]);
  const [loadingList, setLoadingList] = useState(true);

  async function refresh() {
    if (!user) {
      setLoadingList(false);
      return;
    }
    setLoadingList(true);
    setSubmissions(await fetchMySubmissions(user.id));
    setLoadingList(false);
  }

  useEffect(() => {
    if (!cloudEnabled || !user) {
      setLoadingList(false);
      return;
    }
    refresh();
  }, [cloudEnabled, user]);

  return (
    <div className="mx-auto max-w-3xl space-y-5 py-8">
      <header className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <div className="display text-3xl text-warm-black">
            Submit a question<span className="text-copper">.</span>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-warm-mute num">
            Pending submissions queue for owner review
          </p>
        </div>
        <Button variant="ghost" onClick={onBack} className="text-xs">
          ← Back
        </Button>
      </header>

      {!cloudEnabled && (
        <Card className="text-sm text-warm-stone">
          Cloud sync is off. Submissions activate when{' '}
          <code>VITE_SUPABASE_URL</code> / <code>VITE_SUPABASE_ANON_KEY</code>{' '}
          are configured.
        </Card>
      )}

      {cloudEnabled && !user && (
        <Card className="text-sm text-warm-stone">
          Sign in on the Profile screen to submit a question for review.
        </Card>
      )}

      {cloudEnabled && user && (
        <>
          <SubmitForm userId={user.id} onSubmitted={refresh} />
          <MySubmissionsCard
            submissions={submissions}
            loading={loadingList}
            myUserId={user.id}
          />
        </>
      )}
    </div>
  );
}

interface SubmitFormProps {
  userId: string;
  onSubmitted: () => void;
}

function emptyDraft(): SubmissionDraft {
  return {
    question_type: 'solvable',
    prompt: '',
    expected_answer: '',
    choices: ['', '', '', ''],
    unit: 'pct',
    explanation: '',
    kind_hint: '',
    role_hint: null,
    difficulty_hint: null,
    tags: [],
  };
}

function SubmitForm({ userId, onSubmitted }: SubmitFormProps) {
  const [draft, setDraft] = useState<SubmissionDraft>(emptyDraft);
  const [tagInput, setTagInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  function setField<K extends keyof SubmissionDraft>(key: K, value: SubmissionDraft[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
    setDone(false);
    setError(null);
  }

  function setChoice(i: number, value: string) {
    setDraft((d) => {
      const next = [...(d.choices ?? [])];
      next[i] = value;
      return { ...d, choices: next };
    });
  }

  function addChoice() {
    setDraft((d) => {
      const next = [...(d.choices ?? []), ''];
      return next.length <= 8 ? { ...d, choices: next } : d;
    });
  }

  function removeChoice(i: number) {
    setDraft((d) => {
      const next = (d.choices ?? []).filter((_, idx) => idx !== i);
      return { ...d, choices: next.length >= 2 ? next : d.choices };
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setDone(false);
    const tags = tagInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    const payload: SubmissionDraft = { ...draft, tags };
    const errors = validateSubmission(payload);
    if (errors.length > 0) {
      setError(errors[0].message);
      return;
    }
    setBusy(true);
    const res = await submitQuestion(userId, payload);
    setBusy(false);
    if (res.ok) {
      setDone(true);
      setDraft(emptyDraft());
      setTagInput('');
      onSubmitted();
    } else {
      setError(res.error);
    }
  }

  return (
    <Card className="space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        New submission
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Type radio group */}
        <fieldset className="space-y-1">
          <legend className="font-mono text-[11px] uppercase tracking-widest text-warm-mute">
            Question type
          </legend>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {TYPE_OPTIONS.map((t) => (
              <label
                key={t.id}
                className={`cursor-pointer rounded-lg border p-2 text-xs transition-colors duration-aa ease-aa ${
                  draft.question_type === t.id
                    ? 'border-copper bg-copper/10 text-copper-deep'
                    : 'border-warm-line bg-warm-white text-warm-stone hover:bg-warm-paper/40'
                }`}
              >
                <input
                  type="radio"
                  name="qtype"
                  value={t.id}
                  checked={draft.question_type === t.id}
                  onChange={() => setField('question_type', t.id)}
                  className="sr-only"
                />
                <span className="block font-medium">{t.label}</span>
                <span className="block text-[10px] text-warm-mute">{t.hint}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Prompt */}
        <label className="block space-y-1">
          <span className="font-mono text-[11px] uppercase tracking-widest text-warm-mute">
            Prompt
          </span>
          <textarea
            value={draft.prompt}
            onChange={(e) => setField('prompt', e.target.value)}
            placeholder="Write the full question. Include any numbers / context. 20-2000 chars."
            rows={4}
            className="w-full rounded-lg border border-warm-line bg-warm-white px-3 py-2 text-sm outline-none focus:border-copper"
          />
          <span className="block font-mono text-[10px] text-warm-mute num">
            {draft.prompt.length} / 2000
          </span>
        </label>

        {/* Type-specific block */}
        {draft.question_type === 'multipleChoice' && (
          <fieldset className="space-y-1">
            <legend className="font-mono text-[11px] uppercase tracking-widest text-warm-mute">
              Choices (mark the correct one)
            </legend>
            <div className="space-y-1">
              {(draft.choices ?? []).map((c, i) => {
                const letter = String.fromCharCode(65 + i);
                const isCorrect = draft.expected_answer.toUpperCase() === letter;
                return (
                  <div key={i} className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setField('expected_answer', letter)}
                      className={`flex h-7 w-7 items-center justify-center rounded-full border font-mono text-xs transition-colors duration-aa ease-aa ${
                        isCorrect
                          ? 'border-copper bg-copper text-warm-paper'
                          : 'border-warm-line text-warm-stone hover:bg-warm-paper/40'
                      }`}
                      title={isCorrect ? 'Correct answer' : 'Mark as correct'}
                    >
                      {letter}
                    </button>
                    <input
                      type="text"
                      value={c}
                      onChange={(e) => setChoice(i, e.target.value)}
                      placeholder={`Choice ${letter}`}
                      className="flex-1 rounded-lg border border-warm-line bg-warm-white px-3 py-1.5 text-sm outline-none focus:border-copper"
                    />
                    {(draft.choices ?? []).length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeChoice(i)}
                        className="font-mono text-[11px] text-warm-mute hover:text-signal-bad-ink"
                        title="Remove choice"
                      >
                        ×
                      </button>
                    )}
                  </div>
                );
              })}
              {(draft.choices ?? []).length < 8 && (
                <button
                  type="button"
                  onClick={addChoice}
                  className="font-mono text-[11px] text-copper-deep hover:underline"
                >
                  + add choice
                </button>
              )}
            </div>
          </fieldset>
        )}

        {draft.question_type === 'solvable' && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="block space-y-1">
              <span className="font-mono text-[11px] uppercase tracking-widest text-warm-mute">
                Expected answer (numeric)
              </span>
              <input
                type="text"
                value={draft.expected_answer}
                onChange={(e) => setField('expected_answer', e.target.value)}
                placeholder="e.g. 5.25 or $1,250,000"
                className="w-full rounded-lg border border-warm-line bg-warm-white px-3 py-2 font-mono text-sm outline-none focus:border-copper"
              />
            </label>
            <label className="block space-y-1">
              <span className="font-mono text-[11px] uppercase tracking-widest text-warm-mute">
                Unit
              </span>
              <select
                value={draft.unit ?? ''}
                onChange={(e) => setField('unit', e.target.value || null)}
                className="w-full rounded-lg border border-warm-line bg-warm-white px-3 py-2 text-sm outline-none focus:border-copper"
              >
                <option value="">Pick a unit…</option>
                {UNIT_OPTIONS.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}

        {draft.question_type === 'wordProblem' && (
          <label className="block space-y-1">
            <span className="font-mono text-[11px] uppercase tracking-widest text-warm-mute">
              Expected answer (prose)
            </span>
            <textarea
              value={draft.expected_answer}
              onChange={(e) => setField('expected_answer', e.target.value)}
              placeholder="Free-form expected answer. The reviewer reads this manually."
              rows={3}
              className="w-full rounded-lg border border-warm-line bg-warm-white px-3 py-2 text-sm outline-none focus:border-copper"
            />
          </label>
        )}

        {/* Explanation */}
        <label className="block space-y-1">
          <span className="font-mono text-[11px] uppercase tracking-widest text-warm-mute">
            Explanation (optional — the why)
          </span>
          <textarea
            value={draft.explanation ?? ''}
            onChange={(e) => setField('explanation', e.target.value)}
            placeholder="What's the formula / intuition behind the answer? Helps the reviewer."
            rows={2}
            className="w-full rounded-lg border border-warm-line bg-warm-white px-3 py-2 text-sm outline-none focus:border-copper"
          />
        </label>

        {/* Hints */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <label className="block space-y-1">
            <span className="font-mono text-[11px] uppercase tracking-widest text-warm-mute">
              Kind hint
            </span>
            <input
              type="text"
              value={draft.kind_hint ?? ''}
              onChange={(e) => setField('kind_hint', e.target.value)}
              placeholder="e.g. dscrFromNoiAndDs"
              className="w-full rounded-lg border border-warm-line bg-warm-white px-3 py-1.5 font-mono text-xs outline-none focus:border-copper"
            />
          </label>
          <label className="block space-y-1">
            <span className="font-mono text-[11px] uppercase tracking-widest text-warm-mute">
              Role
            </span>
            <select
              value={draft.role_hint ?? ''}
              onChange={(e) => setField('role_hint', e.target.value || null)}
              className="w-full rounded-lg border border-warm-line bg-warm-white px-3 py-1.5 text-xs outline-none focus:border-copper"
            >
              <option value="">— any —</option>
              {ROLES.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block space-y-1">
            <span className="font-mono text-[11px] uppercase tracking-widest text-warm-mute">
              Difficulty
            </span>
            <select
              value={draft.difficulty_hint ?? ''}
              onChange={(e) =>
                setField(
                  'difficulty_hint',
                  (e.target.value || null) as SubmissionDifficulty | null,
                )
              }
              className="w-full rounded-lg border border-warm-line bg-warm-white px-3 py-1.5 text-xs outline-none focus:border-copper"
            >
              <option value="">— pick —</option>
              {DIFFICULTY_OPTIONS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Tags */}
        <label className="block space-y-1">
          <span className="font-mono text-[11px] uppercase tracking-widest text-warm-mute">
            Tags (comma-separated)
          </span>
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="e.g. multifamily, refinance, value-add"
            className="w-full rounded-lg border border-warm-line bg-warm-white px-3 py-1.5 text-xs outline-none focus:border-copper"
          />
        </label>

        {error && (
          <p className="font-mono text-[11px] text-signal-bad-ink">{error}</p>
        )}
        {done && (
          <p className="font-mono text-[11px] text-copper-deep">
            Submitted — visible below in your queue. The owner reviews via
            service-role.
          </p>
        )}

        <div className="flex justify-end">
          <Button type="submit" disabled={busy}>
            {busy ? 'Submitting…' : 'Submit for review'}
          </Button>
        </div>
      </form>
    </Card>
  );
}

function MySubmissionsCard({
  submissions,
  loading,
  myUserId,
}: {
  submissions: QuestionSubmission[];
  loading: boolean;
  myUserId: string;
}) {
  void myUserId; // placeholder: future "edit pending" surface
  return (
    <Card className="space-y-2">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Your submissions
      </div>
      {loading ? (
        <p className="font-mono text-[11px] text-warm-mute">Loading…</p>
      ) : submissions.length === 0 ? (
        <p className="text-sm text-warm-stone">
          Nothing submitted yet. Use the form above.
        </p>
      ) : (
        <ul className="space-y-3">
          {submissions.map((s) => (
            <li
              key={s.id}
              className="space-y-1 border-b border-dotted border-warm-line pb-3 last:border-b-0 last:pb-0"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-warm-mute num">
                  {new Date(s.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}{' '}
                  · {s.question_type}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest ${STATUS_TONE[s.status]}`}
                >
                  {s.status}
                </span>
              </div>
              <p className="text-sm text-warm-black line-clamp-2">{s.prompt}</p>
              {s.reviewer_notes && (
                <p className="font-mono text-[11px] text-warm-mute num">
                  Reviewer: {s.reviewer_notes}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
