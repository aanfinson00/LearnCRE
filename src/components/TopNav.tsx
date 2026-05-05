import { ProfilePicker } from './ProfilePicker';
import { TierBadge } from './TierBadge';

type Mode =
  | 'quiz'
  | 'speedDrill'
  | 'study'
  | 'walkthrough'
  | 'situational'
  | 'excel'
  | 'longform'
  | 'certify'
  | 'profile';

interface Props {
  active: Mode;
  onSwitch: (mode: Mode) => void;
}

const TABS: { id: Mode; label: string; hint: string }[] = [
  { id: 'quiz', label: 'Quiz', hint: 'Single questions, full explanation.' },
  { id: 'speedDrill', label: 'Speed drill', hint: 'Times-table style against the clock.' },
  { id: 'walkthrough', label: 'Walkthroughs', hint: 'Chained-step deal decompositions.' },
  { id: 'situational', label: 'Situational', hint: 'Mini case studies and reasoning.' },
  { id: 'longform', label: 'Case study', hint: 'Long-form prose answers, graded against a rubric.' },
  { id: 'excel', label: 'Excel', hint: 'Write spreadsheet formulas against a mini-grid.' },
  { id: 'study', label: 'Study tables', hint: 'Reference cheat sheets.' },
  { id: 'certify', label: 'Certify', hint: 'Benchmark-gated certifications.' },
  { id: 'profile', label: 'Profile', hint: 'Your stats, tier, and achievements.' },
];

export function TopNav({ active, onSwitch }: Props) {
  return (
    <nav className="border-b border-warm-line">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4">
        <div className="flex items-end gap-1">
          {TABS.map((t) => {
            const on = active === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => onSwitch(t.id)}
                className={`relative px-3 py-3 text-sm font-medium transition-colors duration-aa ease-aa sm:px-4 ${
                  on ? 'text-warm-black' : 'text-warm-mute hover:text-warm-ink'
                }`}
              >
                {t.label}
                {on && (
                  <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-copper sm:inset-x-4" />
                )}
              </button>
            );
          })}
        </div>
        <div className="hidden py-2 sm:flex sm:items-center sm:gap-3">
          <TierBadge />
          <ProfilePicker />
        </div>
        <div className="py-2 sm:hidden">
          <ProfilePicker />
        </div>
      </div>
    </nav>
  );
}
