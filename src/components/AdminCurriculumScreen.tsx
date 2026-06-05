import { useMemo, useState } from 'react';
import { loadDraft, state, type Idea, type IdeaStatus } from '../curriculum/data';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

const STATUS_TABS: { id: 'all' | IdeaStatus; label: string }[] = [
  { id: 'refined', label: 'Refined' },
  { id: 'drafted', label: 'Drafted' },
  { id: 'accepted', label: 'Accepted' },
  { id: 'queued', label: 'Queued' },
  { id: 'rejected', label: 'Rejected' },
  { id: 'all', label: 'All' },
];

const STATUS_TONE: Record<IdeaStatus, string> = {
  pending: 'bg-warm-paper text-warm-stone',
  queued: 'bg-warm-paper text-warm-stone',
  accepted: 'bg-copper/15 text-copper-deep',
  drafted: 'bg-copper/25 text-copper-ink',
  refined: 'bg-signal-good/15 text-signal-good-ink',
  rejected: 'bg-signal-bad/10 text-signal-bad-ink',
};

export function AdminCurriculumScreen() {
  const [filter, setFilter] = useState<'all' | IdeaStatus>('refined');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const ideas = useMemo(() => Object.values(state.ideas) as Idea[], []);
  const counts = useMemo(() => {
    const c: Record<IdeaStatus, number> = {
      pending: 0,
      queued: 0,
      accepted: 0,
      drafted: 0,
      refined: 0,
      rejected: 0,
    };
    for (const i of ideas) c[i.status] = (c[i.status] ?? 0) + 1;
    return c;
  }, [ideas]);

  const filtered = useMemo(() => {
    const list = filter === 'all' ? ideas : ideas.filter((i) => i.status === filter);
    return [...list].sort(
      (a, b) => (b.score_total ?? 0) - (a.score_total ?? 0) || a.title.localeCompare(b.title),
    );
  }, [ideas, filter]);

  return (
    <main className="mx-auto max-w-5xl space-y-6 px-4 py-10">
      <header className="space-y-2">
        <div className="font-mono text-xs uppercase tracking-widest text-warm-mute">
          Curriculum review
        </div>
        <h1 className="font-serif text-3xl text-warm-black">
          Curriculum pipeline queue
        </h1>
        <p className="text-sm text-warm-stone">
          Two-tier pipeline: Ollama drafts at volume; Claude Opus refines what survives grading
          and vetting. Compare raw vs refined to see what the refinement pass fixed. Edits to the
          accept/reject checkboxes happen in <code className="font-mono text-xs">docs/CURRICULUM_QUEUE.md</code>{' '}
          and ship via <code className="font-mono text-xs">sync-queue</code>.
        </p>
        <div className="flex flex-wrap gap-2 pt-2 text-xs">
          {(['refined', 'drafted', 'accepted', 'queued', 'rejected'] as IdeaStatus[]).map((s) => (
            <span
              key={s}
              className={`rounded-md px-2 py-1 font-mono uppercase tracking-wider ${STATUS_TONE[s]}`}
            >
              {s} · {counts[s]}
            </span>
          ))}
        </div>
      </header>

      <nav className="flex flex-wrap gap-2">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setFilter(tab.id);
              setExpandedId(null);
            }}
            className={`rounded-md px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-all duration-aa ease-aa ${
              filter === tab.id
                ? 'bg-warm-black text-warm-white'
                : 'bg-transparent text-warm-stone border border-warm-line hover:border-warm-black hover:bg-warm-paper/40'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {filtered.length === 0 ? (
        <Card>
          <p className="text-sm text-warm-stone">
            No ideas with status <code className="font-mono">{filter}</code>. Run{' '}
            <code className="font-mono text-xs">
              python3 scripts/curriculum-pipeline.py generate
            </code>{' '}
            locally, then commit + push to see results here.
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((idea) => (
            <IdeaRow
              key={idea.id}
              idea={idea}
              expanded={expandedId === idea.id}
              onToggle={() => setExpandedId(expandedId === idea.id ? null : idea.id)}
            />
          ))}
        </div>
      )}
    </main>
  );
}

interface IdeaRowProps {
  idea: Idea;
  expanded: boolean;
  onToggle: () => void;
}

function IdeaRow({ idea, expanded, onToggle }: IdeaRowProps) {
  const wtRaw = loadDraft(idea.draft_walkthrough_path);
  const wtRefined = loadDraft(idea.refined_walkthrough_path);
  const quizRaw = loadDraft(idea.draft_quiz_path);
  const quizRefined = loadDraft(idea.refined_quiz_path);

  return (
    <Card className="!p-0 overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-4 p-5 text-left transition-colors duration-aa ease-aa hover:bg-warm-paper/30"
      >
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${STATUS_TONE[idea.status]}`}
            >
              {idea.status}
            </span>
            <span className="font-mono text-xs text-warm-mute">{idea.category}</span>
            <span className="font-mono text-xs text-warm-mute">
              · {idea.score_total ?? '—'}/20
            </span>
          </div>
          <h2 className="font-serif text-lg text-warm-black">{idea.title}</h2>
          {idea.outline ? (
            <p className="text-sm text-warm-stone line-clamp-2">{idea.outline}</p>
          ) : null}
        </div>
        <div className="font-mono text-xs text-warm-mute">{expanded ? '−' : '+'}</div>
      </button>

      {expanded ? (
        <div className="border-t border-warm-line bg-warm-paper/20 p-5 space-y-6">
          <Section title="Outline">
            <p className="text-sm text-warm-stone">{idea.outline || '(none)'}</p>
            {idea.key_numbers && idea.key_numbers.length > 0 ? (
              <p className="mt-2 font-mono text-xs text-warm-mute">
                Key numbers: {idea.key_numbers.join(', ')}
              </p>
            ) : null}
          </Section>

          {idea.scores ? (
            <Section title="Grading">
              <div className="flex flex-wrap gap-3 text-xs font-mono text-warm-stone">
                {Object.entries(idea.scores).map(([dim, n]) => (
                  <span key={dim}>
                    {dim}: <span className="text-warm-black">{n}</span>
                  </span>
                ))}
              </div>
              {idea.reasoning ? (
                <p className="mt-2 text-sm italic text-warm-stone">{idea.reasoning}</p>
              ) : null}
            </Section>
          ) : null}

          {wtRaw || wtRefined ? (
            <Section title="Walkthrough — raw (Ollama) vs refined (Claude)">
              <DraftCompare raw={wtRaw} refined={wtRefined} />
            </Section>
          ) : null}

          {quizRaw || quizRefined ? (
            <Section title="Quiz template — raw (Ollama) vs refined (Claude)">
              <DraftCompare raw={quizRaw} refined={quizRefined} />
            </Section>
          ) : null}

          <div className="flex flex-wrap gap-2 pt-2 text-xs font-mono text-warm-mute">
            <span>id: {idea.id}</span>
            {idea.generated_at ? <span>· generated {idea.generated_at}</span> : null}
            {idea.drafted_at ? <span>· drafted {idea.drafted_at}</span> : null}
            {idea.refined_at ? <span>· refined {idea.refined_at}</span> : null}
          </div>

          <FeedbackBox ideaId={idea.id} />
        </div>
      ) : null}
    </Card>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h3 className="font-mono text-[11px] uppercase tracking-widest text-warm-mute">
        {title}
      </h3>
      {children}
    </div>
  );
}

function DraftCompare({ raw, refined }: { raw: string | null; refined: string | null }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <DraftColumn label="raw" body={raw} variant="raw" />
      <DraftColumn label="refined" body={refined} variant="refined" />
    </div>
  );
}

function DraftColumn({
  label,
  body,
  variant,
}: {
  label: string;
  body: string | null;
  variant: 'raw' | 'refined';
}) {
  const tone =
    variant === 'refined'
      ? 'border-signal-good/40 bg-signal-good/5'
      : 'border-warm-line bg-warm-white';
  return (
    <div className={`rounded-md border ${tone} overflow-hidden`}>
      <div className="border-b border-warm-line/60 bg-warm-paper/50 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-warm-mute">
        {label}
      </div>
      {body ? (
        <pre className="max-h-[60vh] overflow-auto whitespace-pre-wrap break-words p-3 font-mono text-xs text-warm-ink">
          {body}
        </pre>
      ) : (
        <p className="p-3 font-mono text-xs italic text-warm-mute">(not produced)</p>
      )}
    </div>
  );
}

function FeedbackBox({ ideaId }: { ideaId: string }) {
  const [note, setNote] = useState('');
  const [copied, setCopied] = useState(false);

  async function copyAsMarkdown() {
    const block = `### Feedback on \`${ideaId}\`\n\n${note.trim()}\n`;
    try {
      await navigator.clipboard.writeText(block);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore; users can select the text manually
    }
  }

  return (
    <Section title="Your notes (copy to share)">
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="What worked, what didn't, what to fix in the prompt or rubric…"
        className="w-full min-h-[6rem] rounded-md border border-warm-line bg-warm-white px-3 py-2 text-sm text-warm-black placeholder:text-warm-mute focus:outline-none focus:ring-2 focus:ring-copper"
      />
      <div className="flex items-center gap-2">
        <Button variant="secondary" onClick={copyAsMarkdown} disabled={!note.trim()}>
          {copied ? 'Copied ✓' : 'Copy as markdown'}
        </Button>
        <span className="font-mono text-[11px] text-warm-mute">
          Paste this into the chat for me to react to.
        </span>
      </div>
    </Section>
  );
}
