import { useEffect, useMemo, useRef, useState } from 'react';
import { useFeedbackContext } from '../hooks/useFeedbackContext';
import {
  appendFeedback,
  clearFeedback,
  exportAsMarkdown,
  loadFeedback,
  removeFeedback,
  type FeedbackEntry,
  type FeedbackEntryType,
} from '../storage/feedbackLog';

const TYPES: { id: FeedbackEntryType; label: string; hint: string }[] = [
  { id: 'bug', label: 'Bug / wrong answer', hint: 'Math is off, expected value wrong' },
  { id: 'wording', label: 'Wording / clarity', hint: 'Prompt or solution unclear' },
  { id: 'idea', label: 'New content idea', hint: 'Suggest a question, case, or template' },
  { id: 'other', label: 'Other', hint: 'Anything else' },
];

const REPO = 'aanfinson00/learncre';

function buildIssueTitle(type: FeedbackEntryType, where: string): string {
  const prefix =
    type === 'bug'
      ? 'Bug'
      : type === 'wording'
        ? 'Wording'
        : type === 'idea'
          ? 'Idea'
          : 'Feedback';
  const trimmedWhere = where.trim().slice(0, 60);
  return trimmedWhere ? `[${prefix}] ${trimmedWhere}` : `[${prefix}]`;
}

function buildIssueBody(params: {
  type: FeedbackEntryType;
  where: string;
  description: string;
  url: string;
  userAgent: string;
  questionId?: string;
  questionLabel?: string;
}): string {
  const { type, where, description, url, userAgent, questionId, questionLabel } = params;
  const lines = [
    `**Type:** ${type}`,
    `**Where:** ${where || '_(not specified)_'}`,
  ];
  if (questionId) lines.push(`**Question id:** \`${questionId}\``);
  if (questionLabel) lines.push(`**Question:** ${questionLabel}`);
  lines.push(
    '',
    '## Description',
    description.trim() || '_(none)_',
    '',
    '---',
    '',
    '<details><summary>Context</summary>',
    '',
    `- URL: ${url}`,
    `- User agent: \`${userAgent}\``,
    `- Submitted: ${new Date().toISOString()}`,
    '',
    '</details>',
  );
  return lines.join('\n');
}

function githubIssueUrl(title: string, body: string): string {
  const params = new URLSearchParams({ title, body });
  return `https://github.com/${REPO}/issues/new?${params.toString()}`;
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      return true;
    } catch {
      return false;
    } finally {
      document.body.removeChild(ta);
    }
  }
}

type View = 'compose' | 'log';

export function FeedbackButton() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>('compose');
  const [type, setType] = useState<FeedbackEntryType>('bug');
  const [where, setWhere] = useState('');
  const [description, setDescription] = useState('');
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [exported, setExported] = useState(false);
  const [entries, setEntries] = useState<FeedbackEntry[]>([]);
  const initialDescRef = useRef<HTMLTextAreaElement>(null);
  const { current } = useFeedbackContext();

  // Refresh entries from localStorage whenever the panel opens
  useEffect(() => {
    if (open) setEntries(loadFeedback());
  }, [open]);

  // Auto-prefill "Where" when the modal opens. Prefer the active question's
  // label, fall back to the document title (stripped of the LearnCRE prefix).
  useEffect(() => {
    if (!open) return;
    if (where.trim() === '') {
      const fromContext = current?.label?.trim();
      const fromTitle = document.title?.replace(/^LearnCRE\s*[—|-]?\s*/, '').trim();
      const initial = fromContext || fromTitle || '';
      if (initial) setWhere(initial);
    }
    requestAnimationFrame(() => initialDescRef.current?.focus());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Esc closes
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const issueParams = useMemo(() => {
    const title = buildIssueTitle(type, where);
    const body = buildIssueBody({
      type,
      where,
      description,
      url: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      questionId: current?.itemId,
      questionLabel: current?.label,
    });
    return { title, body };
  }, [type, where, description, current]);

  const canSubmit = description.trim().length > 0;

  const resetForm = () => {
    setType('bug');
    setWhere('');
    setDescription('');
    setSaved(false);
    setCopied(false);
  };

  const submitGithub = () => {
    if (!canSubmit) return;
    const url = githubIssueUrl(issueParams.title, issueParams.body);
    window.open(url, '_blank', 'noopener,noreferrer');
    setOpen(false);
    resetForm();
  };

  const copyToClipboard = async () => {
    if (!canSubmit) return;
    const text = `${issueParams.title}\n\n${issueParams.body}`;
    const ok = await copyText(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const saveToLog = () => {
    if (!canSubmit) return;
    appendFeedback({
      type,
      where,
      description,
      question: current,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
    });
    setEntries(loadFeedback());
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
    // Clear the form so the user can keep going
    setDescription('');
  };

  const deleteEntry = (id: string) => {
    removeFeedback(id);
    setEntries(loadFeedback());
  };

  const clearAll = () => {
    if (entries.length === 0) return;
    const ok = window.confirm(`Delete all ${entries.length} feedback entries?`);
    if (!ok) return;
    clearFeedback();
    setEntries([]);
  };

  const exportLog = async () => {
    if (entries.length === 0) return;
    const md = exportAsMarkdown(entries);
    const ok = await copyText(md);
    if (ok) {
      setExported(true);
      setTimeout(() => setExported(false), 1500);
    }
  };

  return (
    <>
      {/* Floating trigger — stacked above the scratch sheet button. Counter
          badge surfaces the saved-entry count without opening the panel. */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close feedback' : 'Open feedback'}
        title={open ? 'Close feedback' : 'Send feedback'}
        className={`fixed bottom-16 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border shadow-aa transition-all duration-aa ease-aa ${
          open
            ? 'border-copper bg-copper text-warm-white'
            : 'border-warm-line bg-warm-white text-warm-stone hover:border-copper hover:text-copper-deep'
        }`}
      >
        <span className="text-base leading-none">💬</span>
        {entries.length > 0 && !open && (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-copper px-1 font-mono text-[9px] font-medium text-warm-white num">
            {entries.length}
          </span>
        )}
      </button>

      {open && (
        <>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close feedback"
            className="fixed inset-0 z-30 bg-warm-black/30 backdrop-blur-sm"
          />

          <div
            role="dialog"
            aria-label="Send feedback"
            className="fixed left-1/2 top-1/2 z-30 flex max-h-[90vh] w-full max-w-xl -translate-x-1/2 -translate-y-1/2 flex-col rounded-xl border border-warm-line bg-warm-white shadow-aa"
          >
            <header className="flex items-baseline justify-between border-b border-warm-line px-5 py-3">
              <div>
                <div className="display text-lg text-warm-black">
                  Feedback<span className="text-copper">.</span>
                </div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-warm-mute num">
                  Log feedback as you go · compile + export when ready
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md border border-warm-line bg-warm-white px-2 py-0.5 text-xs text-warm-stone hover:border-warm-black hover:text-warm-black"
              >
                ✕
              </button>
            </header>

            {/* View tabs */}
            <div className="flex gap-1 border-b border-warm-line px-5 pt-2">
              <Tab on={view === 'compose'} onClick={() => setView('compose')}>
                Compose
              </Tab>
              <Tab on={view === 'log'} onClick={() => setView('log')}>
                Log {entries.length > 0 && <span className="ml-1 font-mono num">({entries.length})</span>}
              </Tab>
            </div>

            {view === 'compose' ? (
              <ComposeView
                type={type}
                setType={setType}
                where={where}
                setWhere={setWhere}
                description={description}
                setDescription={setDescription}
                current={current}
                issueBody={issueParams.body}
                descRef={initialDescRef}
                canSubmit={canSubmit}
                copied={copied}
                saved={saved}
                onSaveToLog={saveToLog}
                onCopy={copyToClipboard}
                onGithub={submitGithub}
              />
            ) : (
              <LogView
                entries={entries}
                exported={exported}
                onExport={exportLog}
                onClearAll={clearAll}
                onDelete={deleteEntry}
              />
            )}
          </div>
        </>
      )}
    </>
  );
}

function Tab({
  on,
  onClick,
  children,
}: {
  on: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative px-3 py-1.5 text-xs font-medium transition-colors duration-aa ease-aa ${
        on ? 'text-warm-black' : 'text-warm-mute hover:text-warm-ink'
      }`}
    >
      {children}
      {on && <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-copper" />}
    </button>
  );
}

interface ComposeProps {
  type: FeedbackEntryType;
  setType: (t: FeedbackEntryType) => void;
  where: string;
  setWhere: (s: string) => void;
  description: string;
  setDescription: (s: string) => void;
  current: ReturnType<typeof useFeedbackContext>['current'];
  issueBody: string;
  descRef: React.RefObject<HTMLTextAreaElement>;
  canSubmit: boolean;
  copied: boolean;
  saved: boolean;
  onSaveToLog: () => void;
  onCopy: () => void;
  onGithub: () => void;
}

function ComposeView(props: ComposeProps) {
  const placeholderByType: Record<FeedbackEntryType, string> = {
    bug: 'Expected vs got. If the math is wrong, paste the prompt + your work.',
    wording: 'Which sentence is unclear? What would read better?',
    idea: 'What problem / scenario / template would help? Who\'s the audience?',
    other: 'Anything you want to flag.',
  };

  return (
    <>
      <div className="flex-1 space-y-4 overflow-y-auto p-5">
        {props.current && (
          <div className="rounded-md border border-copper/40 bg-copper/5 p-2 text-[11px] text-warm-ink">
            <div className="font-mono uppercase tracking-widest text-copper-deep num text-[9px]">
              Auto-attached question
            </div>
            <div className="mt-1 font-medium text-warm-black">{props.current.label}</div>
            <div className="mt-0.5 font-mono text-[10px] text-warm-mute num">
              {props.current.mode} · <code>{props.current.itemId}</code>
              {props.current.difficulty ? ` · ${props.current.difficulty}` : ''}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <div className="text-xs font-medium uppercase tracking-widest text-warm-stone">
            Type
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {TYPES.map((t) => {
              const on = props.type === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => props.setType(t.id)}
                  className={`rounded-lg border p-2 text-left transition-colors duration-aa ease-aa ${
                    on
                      ? 'border-copper bg-copper/10 text-warm-black'
                      : 'border-warm-line bg-warm-white text-warm-ink hover:border-copper/60 hover:text-copper-deep'
                  }`}
                >
                  <div className="text-xs font-medium">{t.label}</div>
                  <div className={`mt-0.5 text-[10px] leading-tight ${on ? 'text-copper-ink' : 'text-warm-mute'}`}>
                    {t.hint}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-1">
          <label
            htmlFor="feedback-where"
            className="text-xs font-medium uppercase tracking-widest text-warm-stone"
          >
            Where
          </label>
          <input
            id="feedback-where"
            type="text"
            value={props.where}
            onChange={(e) => props.setWhere(e.target.value)}
            placeholder="e.g. Cap rate compression — solution step"
            className="w-full rounded-md border border-warm-line bg-warm-white px-2.5 py-1.5 text-sm text-warm-black outline-none focus:border-copper"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="feedback-description"
            className="text-xs font-medium uppercase tracking-widest text-warm-stone"
          >
            Description
          </label>
          <textarea
            ref={props.descRef}
            id="feedback-description"
            rows={6}
            value={props.description}
            onChange={(e) => props.setDescription(e.target.value)}
            placeholder={placeholderByType[props.type]}
            className="w-full resize-y rounded-md border border-warm-line bg-warm-white px-2.5 py-1.5 font-mono text-sm text-warm-black outline-none focus:border-copper"
          />
        </div>

        <details className="rounded-lg border border-warm-line bg-warm-paper/40 p-3">
          <summary className="cursor-pointer text-xs font-medium uppercase tracking-widest text-warm-stone">
            Auto-included context (preview)
          </summary>
          <pre className="mt-2 overflow-x-auto whitespace-pre-wrap break-all font-mono text-[10px] text-warm-mute num">
            {props.issueBody}
          </pre>
        </details>
      </div>

      <footer className="flex items-center justify-between gap-2 border-t border-warm-line px-5 py-3">
        <button
          type="button"
          onClick={props.onSaveToLog}
          disabled={!props.canSubmit}
          className="rounded-md bg-warm-black px-3 py-1.5 text-xs font-medium text-warm-white transition-colors duration-aa ease-aa hover:bg-warm-ink disabled:cursor-not-allowed disabled:bg-warm-mute"
        >
          {props.saved ? '✓ Saved' : 'Save to log'}
        </button>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={props.onCopy}
            disabled={!props.canSubmit}
            className="rounded-md border border-warm-line bg-warm-white px-3 py-1.5 text-xs text-warm-stone transition-colors duration-aa ease-aa hover:border-copper hover:text-copper-deep disabled:cursor-not-allowed disabled:opacity-50"
          >
            {props.copied ? '✓ Copied' : 'Copy text'}
          </button>
          <button
            type="button"
            onClick={props.onGithub}
            disabled={!props.canSubmit}
            className="rounded-md border border-warm-line bg-warm-white px-3 py-1.5 text-xs text-warm-stone transition-colors duration-aa ease-aa hover:border-copper hover:text-copper-deep disabled:cursor-not-allowed disabled:opacity-50"
          >
            GitHub issue ↗
          </button>
        </div>
      </footer>
    </>
  );
}

interface LogProps {
  entries: FeedbackEntry[];
  exported: boolean;
  onExport: () => void;
  onClearAll: () => void;
  onDelete: (id: string) => void;
}

function LogView(props: LogProps) {
  const sorted = [...props.entries].sort((a, b) => b.createdAt - a.createdAt);

  return (
    <>
      <div className="flex-1 overflow-y-auto p-5">
        {sorted.length === 0 ? (
          <div className="rounded-lg border border-dashed border-warm-line bg-warm-paper/20 p-6 text-center text-sm text-warm-stone">
            No feedback logged yet. Switch to Compose, fill the form, and hit
            <span className="mx-1 font-medium text-warm-black">Save to log</span>
            to add an entry. Entries persist locally and can be exported as
            markdown for the maintainer.
          </div>
        ) : (
          <div className="space-y-2.5">
            {sorted.map((e) => (
              <div
                key={e.id}
                className="rounded-lg border border-warm-line bg-warm-white p-3"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <div className="flex items-baseline gap-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest ${
                        e.type === 'bug'
                          ? 'bg-signal-bad/15 text-signal-bad-ink'
                          : e.type === 'wording'
                            ? 'bg-warm-stone/20 text-warm-ink'
                            : e.type === 'idea'
                              ? 'bg-copper/15 text-copper-deep'
                              : 'bg-warm-paper/60 text-warm-mute'
                      }`}
                    >
                      {e.type}
                    </span>
                    <span className="font-mono text-[10px] text-warm-mute num">
                      {new Date(e.createdAt).toLocaleString(undefined, {
                        dateStyle: 'short',
                        timeStyle: 'short',
                      })}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => props.onDelete(e.id)}
                    aria-label="Delete entry"
                    className="rounded-md border border-warm-line bg-warm-white px-1.5 py-0 text-[10px] text-warm-mute hover:border-signal-bad hover:text-signal-bad-ink"
                  >
                    ✕
                  </button>
                </div>
                <div className="mt-1 text-sm font-medium text-warm-black">
                  {e.question?.label ?? e.where ?? '(no headline)'}
                </div>
                {e.question && (
                  <div className="mt-0.5 font-mono text-[10px] text-warm-mute num">
                    {e.question.mode} · <code>{e.question.itemId}</code>
                  </div>
                )}
                <div className="mt-1.5 whitespace-pre-wrap text-xs text-warm-ink">
                  {e.description}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="flex items-center justify-between gap-2 border-t border-warm-line px-5 py-3">
        <button
          type="button"
          onClick={props.onClearAll}
          disabled={sorted.length === 0}
          className="rounded-md border border-warm-line bg-warm-white px-3 py-1.5 text-xs text-warm-stone transition-colors duration-aa ease-aa hover:border-signal-bad hover:text-signal-bad-ink disabled:cursor-not-allowed disabled:opacity-50"
        >
          Clear all
        </button>
        <button
          type="button"
          onClick={props.onExport}
          disabled={sorted.length === 0}
          className="rounded-md bg-warm-black px-3 py-1.5 text-xs font-medium text-warm-white transition-colors duration-aa ease-aa hover:bg-warm-ink disabled:cursor-not-allowed disabled:bg-warm-mute"
        >
          {props.exported ? '✓ Exported' : 'Copy compiled markdown'}
        </button>
      </footer>
    </>
  );
}
