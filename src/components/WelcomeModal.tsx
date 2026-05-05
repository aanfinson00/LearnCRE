import { useEffect, useState } from 'react';
import { ROLES, type Role } from '../types/role';
import { markWelcomeSeen, savePreferredRole } from '../storage/onboarding';
import { Button } from './ui/Button';

interface Props {
  onSkip: () => void;
  onStartQuiz: () => void;
}

export function WelcomeModal({ onSkip, onStartQuiz }: Props) {
  const [slide, setSlide] = useState(0);
  const [selectedRole, setSelectedRole] = useState<Role | 'all'>('all');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleSkip();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSkip() {
    markWelcomeSeen();
    onSkip();
  }

  function handleStart() {
    markWelcomeSeen();
    savePreferredRole(selectedRole);
    onStartQuiz();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-warm-black/40 backdrop-blur-sm"
        onClick={handleSkip}
        aria-hidden
      />
      <div className="relative flex w-full max-w-xl flex-col rounded-xl border border-warm-line bg-warm-white shadow-aa">
        <button
          type="button"
          onClick={handleSkip}
          aria-label="Skip welcome"
          className="absolute right-3 top-3 rounded-md p-1.5 text-warm-mute transition-colors duration-aa ease-aa hover:bg-warm-paper/60 hover:text-warm-ink"
        >
          ✕
        </button>

        <div className="px-8 pt-8 pb-3">
          <div className="font-mono text-[10px] uppercase tracking-widest text-copper-deep num">
            Welcome · {slide + 1} / 3
          </div>
        </div>

        <div className="min-h-[320px] px-8 pb-3">
          {slide === 0 && <SlideOne />}
          {slide === 1 && (
            <SlideTwo selected={selectedRole} onPick={setSelectedRole} />
          )}
          {slide === 2 && <SlideThree role={selectedRole} />}
        </div>

        <div className="flex items-center justify-between border-t border-warm-line px-8 py-4">
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`h-1.5 w-1.5 rounded-full transition-all duration-aa ease-aa ${
                  i === slide ? 'w-4 bg-copper' : 'bg-warm-line'
                }`}
                aria-hidden
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={handleSkip} className="text-xs">
              Skip
            </Button>
            {slide > 0 && (
              <Button
                variant="secondary"
                onClick={() => setSlide(slide - 1)}
                className="text-xs"
              >
                Back
              </Button>
            )}
            {slide < 2 ? (
              <Button onClick={() => setSlide(slide + 1)}>Next</Button>
            ) : (
              <Button onClick={handleStart}>Start with a quiz</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SlideOne() {
  return (
    <div className="space-y-4">
      <div className="display text-3xl text-warm-black">
        Learn CRE<span className="text-copper">.</span>
      </div>
      <p className="editorial text-lg leading-relaxed text-warm-ink">
        A CRE interview-prep gym. Drill the math, the vocabulary, the case
        framing, and the modeling reps that real acquisitions, asset-management,
        and underwriting interviews actually ask about.
      </p>
      <ul className="space-y-1.5 text-sm text-warm-stone">
        <li className="flex gap-2">
          <span className="text-copper">▸</span>
          <span>
            <span className="font-medium text-warm-ink">11 modes</span> across
            quick drills, applied cases, and full take-home-style modeling
            tests
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-copper">▸</span>
          <span>
            <span className="font-medium text-warm-ink">35 question kinds</span>
            {' '}covering valuation, returns, debt, lease economics, growth, basis
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-copper">▸</span>
          <span>
            <span className="font-medium text-warm-ink">Tier ladder + 5 role certs</span>
            {' '}— earn XP, unlock difficulty, prove competence
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-copper">▸</span>
          <span>
            <span className="font-medium text-warm-ink">No signup, no cloud</span>
            {' '}— everything runs in your browser, all progress is local
          </span>
        </li>
      </ul>
    </div>
  );
}

function SlideTwo({
  selected,
  onPick,
}: {
  selected: Role | 'all';
  onPick: (r: Role | 'all') => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <div className="display text-2xl text-warm-black">
          What are you prepping for<span className="text-copper">?</span>
        </div>
        <p className="mt-2 text-sm text-warm-stone">
          Filters the question catalog so you see what your interview cares
          about. You can change this anytime per session.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <RoleButton
          label="All"
          hint="Everything, no role filter."
          active={selected === 'all'}
          onClick={() => onPick('all')}
        />
        {ROLES.map((r) => (
          <RoleButton
            key={r.id}
            label={r.label}
            hint={r.hint}
            active={selected === r.id}
            onClick={() => onPick(r.id)}
          />
        ))}
      </div>
    </div>
  );
}

function RoleButton({
  label,
  hint,
  active,
  onClick,
}: {
  label: string;
  hint: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg border p-2.5 text-left transition-all duration-aa ease-aa ${
        active
          ? 'border-copper bg-copper/10 text-warm-black'
          : 'border-warm-line bg-warm-white/50 text-warm-ink hover:border-copper hover:text-copper-deep'
      }`}
    >
      <div className="text-sm font-medium">{label}</div>
      <div
        className={`mt-0.5 text-xs ${
          active ? 'text-copper-ink' : 'text-warm-mute'
        }`}
      >
        {hint}
      </div>
    </button>
  );
}

function SlideThree({ role }: { role: Role | 'all' }) {
  const roleLabel =
    role === 'all'
      ? 'All roles'
      : (ROLES.find((r) => r.id === role)?.label ?? role);
  return (
    <div className="space-y-4">
      <div className="display text-2xl text-warm-black">
        Ready<span className="text-copper">?</span>
      </div>
      <p className="editorial text-base leading-relaxed text-warm-ink">
        Start with a 10-question quiz on <span className="font-medium">{roleLabel}</span> at
        intermediate difficulty. You'll get a feel for the question format,
        timing, and the scoring — then pick whichever mode in the sidebar
        sounds useful.
      </p>
      <div className="rounded-md bg-warm-paper/50 p-3 text-sm text-warm-stone">
        <div className="font-mono text-[10px] uppercase tracking-widest text-warm-mute num">
          What to look for in your first session
        </div>
        <ul className="mt-2 space-y-1 text-sm text-warm-ink">
          <li>· Tight feedback loop — every question has a step-by-step solution.</li>
          <li>· Categories you struggle with get logged to a mistake bank.</li>
          <li>· XP earned per correct answer ladders you up the tier system.</li>
        </ul>
      </div>
    </div>
  );
}
