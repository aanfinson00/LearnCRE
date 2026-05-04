import { useEffect, useMemo, useRef, useState } from 'react';

type FeedbackType = 'bug' | 'wording' | 'idea' | 'other';

const TYPES: { id: FeedbackType; label: string; hint: string }[] = [
  { id: 'bug', label: 'Bug / wrong answer', hint: 'Math is off, expected value wrong' },
  { id: 'wording', label: 'Wording / clarity', hint: 'Prompt or solution unclear' },
  { id: 'idea', label: 'New content idea', hint: 'Suggest a question, case, or template' },
  { id: 'other', label: 'Other', hint: 'Anything else' },
];

const REPO = 'aanfinson00/learncre';

function buildIssueTitle(type: FeedbackType, where: string): string {
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
  type: FeedbackType;
  where: string;
  description: string;
  url: string;
  userAgent: string;
}): string {
  const { type, where, description, url, userAgent } = params;
  const lines = [
    `**Type:** ${type}`,
    `**Where:** ${where || '_(not specified)_'}`,
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
  ];
  return lines.join('\n');
}

function githubIssueUrl(title: string, body: string): string {
  const params = new URLSearchParams({ title, body });
  return `https://github.com/${REPO}/issues/new?${params.toString()}`;
}

export function FeedbackButton() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<FeedbackType>('bug');
  const [where, setWhere] = useState('');
  const [description, setDescription] = useState('');
  const [copied, setCopied] = useState(false);
  const initialDescRef = useRef<HTMLTextAreaElement>(null);

  // Auto-prefill "Where:" with the current page title on open
  useEffect(() => {
    if (!open) return;
    if (where.trim() === '') {
      const title = document.title?.replace(/^LearnCRE\s*[—|-]?\s*/, '').trim();
      if (title) setWhere(title);
    }
    // Focus the description textarea on open
    requestAnimationFrame(() => initialDescRef.current?.focus());
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

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
    });
    return { title, body };
  }, [type, where, description]);

  const canSubmit = description.trim().length > 0;

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
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Fallback: select-all hack via a temporary textarea
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      } finally {
        document.body.removeChild(ta);
      }
    }
  };

  const resetForm = () => {
    setType('bug');
    setWhere('');
    setDescription('');
    setCopied(false);
  };

  return (
    <>
      {/* Floating trigger — stacked above the scratch sheet button */}
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
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close feedback"
            className="fixed inset-0 z-30 bg-warm-black/30 backdrop-blur-sm"
          />

          {/* Modal */}
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
                  {"Bugs · wording · ideas — anything that'd make this better"}
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

            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              <div className="space-y-2">
                <div className="text-xs font-medium uppercase tracking-widest text-warm-stone">
                  Type
                </div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {TYPES.map((t) => {
                    const on = type === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setType(t.id)}
                        className={`rounded-lg border p-2 text-left transition-colors duration-aa ease-aa ${
                          on
                            ? 'border-copper bg-copper/10 text-warm-black'
                            : 'border-warm-line bg-warm-white text-warm-ink hover:border-copper/60 hover:text-copper-deep'
                        }`}
                      >
                        <div className="text-xs font-medium">{t.label}</div>
                        <div
                          className={`mt-0.5 text-[10px] leading-tight ${
                            on ? 'text-copper-ink' : 'text-warm-mute'
                          }`}
                        >
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
                  value={where}
                  onChange={(e) => setWhere(e.target.value)}
                  placeholder="e.g. Cap rate compression — solution step"
                  className="w-full rounded-md border border-warm-line bg-warm-white px-2.5 py-1.5 text-sm text-warm-black outline-none focus:border-copper"
                />
                <p className="text-[10px] text-warm-mute">
                  Auto-filled from the current page; tweak as needed.
                </p>
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="feedback-description"
                  className="text-xs font-medium uppercase tracking-widest text-warm-stone"
                >
                  Description
                </label>
                <textarea
                  ref={initialDescRef}
                  id="feedback-description"
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={
                    type === 'bug'
                      ? 'Expected vs got. If the math is wrong, paste the prompt + your work.'
                      : type === 'wording'
                        ? 'Which sentence is unclear? What would read better?'
                        : type === 'idea'
                          ? 'What problem / scenario / template would help? Who\'s the audience?'
                          : 'Anything you want to flag.'
                  }
                  className="w-full resize-y rounded-md border border-warm-line bg-warm-white px-2.5 py-1.5 font-mono text-sm text-warm-black outline-none focus:border-copper"
                />
              </div>

              <details className="rounded-lg border border-warm-line bg-warm-paper/40 p-3">
                <summary className="cursor-pointer text-xs font-medium uppercase tracking-widest text-warm-stone">
                  Auto-included context
                </summary>
                <pre className="mt-2 overflow-x-auto whitespace-pre-wrap break-all font-mono text-[10px] text-warm-mute num">
                  {issueParams.body}
                </pre>
              </details>
            </div>

            <footer className="flex items-center justify-between gap-2 border-t border-warm-line px-5 py-3">
              <div className="text-[10px] text-warm-mute">
                Esc to close · pick how you want to send it →
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={copyToClipboard}
                  disabled={!canSubmit}
                  className="rounded-md border border-warm-line bg-warm-white px-3 py-1.5 text-xs text-warm-stone transition-colors duration-aa ease-aa hover:border-copper hover:text-copper-deep disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {copied ? '✓ Copied' : 'Copy as text'}
                </button>
                <button
                  type="button"
                  onClick={submitGithub}
                  disabled={!canSubmit}
                  className="rounded-md bg-warm-black px-3 py-1.5 text-xs font-medium text-warm-white transition-colors duration-aa ease-aa hover:bg-warm-ink disabled:cursor-not-allowed disabled:bg-warm-mute"
                >
                  Open GitHub issue ↗
                </button>
              </div>
            </footer>
          </div>
        </>
      )}
    </>
  );
}
