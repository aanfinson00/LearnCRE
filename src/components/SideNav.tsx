import { useEffect, useState } from 'react';
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
  | 'vocab'
  | 'mockInterview'
  | 'modelingTest'
  | 'certify'
  | 'profile';

interface Props {
  active: Mode;
  onSwitch: (mode: Mode) => void;
}

interface Item {
  id: Mode;
  label: string;
  hint: string;
}

interface Section {
  label: string;
  items: Item[];
}

const SECTIONS: Section[] = [
  {
    label: 'Drill',
    items: [
      { id: 'quiz', label: 'Quiz', hint: 'Single questions, full explanation.' },
      { id: 'speedDrill', label: 'Speed drill', hint: 'Times-table style against the clock.' },
      { id: 'vocab', label: 'Vocab', hint: 'Flashcard drill on industry terminology.' },
    ],
  },
  {
    label: 'Apply',
    items: [
      { id: 'walkthrough', label: 'Walkthroughs', hint: 'Chained-step deal decompositions.' },
      { id: 'situational', label: 'Situational', hint: 'Mini case studies and reasoning.' },
      { id: 'longform', label: 'Case study', hint: 'Long-form prose answers, graded against a rubric.' },
      { id: 'excel', label: 'Excel', hint: 'Write spreadsheet formulas against a mini-grid.' },
      { id: 'modelingTest', label: 'Modeling test', hint: 'Take-home-style multi-cell models, graded on output cells.' },
      { id: 'mockInterview', label: 'Mock interview', hint: 'Firm-archetype mocks: mixed-mode, self-graded.' },
    ],
  },
  {
    label: 'Reference',
    items: [
      { id: 'study', label: 'Study tables', hint: 'Reference cheat sheets.' },
    ],
  },
  {
    label: 'Progress',
    items: [
      { id: 'certify', label: 'Certify', hint: 'Benchmark-gated certifications.' },
      { id: 'profile', label: 'Profile', hint: 'Your stats, tier, and achievements.' },
    ],
  },
];

export function SideNav({ active, onSwitch }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSwitch = (m: Mode) => {
    onSwitch(m);
    setDrawerOpen(false);
  };

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [drawerOpen]);

  const activeItem =
    SECTIONS.flatMap((s) => s.items).find((i) => i.id === active) ?? null;

  return (
    <>
      <header className="sticky top-0 z-20 flex items-center gap-2 border-b border-warm-line bg-warm-white/90 px-3 py-2 backdrop-blur lg:hidden">
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open navigation"
          className="shrink-0 rounded-md p-2 text-warm-stone transition-colors duration-aa ease-aa hover:bg-warm-paper/60 hover:text-warm-ink"
        >
          <Hamburger />
        </button>
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <Brand />
          {activeItem && (
            <>
              <span className="text-warm-mute" aria-hidden>
                /
              </span>
              <span className="truncate text-sm font-medium text-warm-ink">
                {activeItem.label}
              </span>
            </>
          )}
        </div>
        <div className="shrink-0">
          <ProfilePicker />
        </div>
      </header>

      {drawerOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-warm-black/40"
            onClick={() => setDrawerOpen(false)}
            aria-hidden
          />
          <aside className="absolute inset-y-0 left-0 flex w-64 max-w-[85%] flex-col bg-warm-white shadow-aa">
            <SidebarBody active={active} onSwitch={handleSwitch} mobile />
          </aside>
        </div>
      )}

      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:flex lg:w-56 lg:flex-col lg:border-r lg:border-warm-line lg:bg-warm-white">
        <SidebarBody active={active} onSwitch={onSwitch} />
      </aside>
    </>
  );
}

function SidebarBody({
  active,
  onSwitch,
  mobile = false,
}: {
  active: Mode;
  onSwitch: (m: Mode) => void;
  mobile?: boolean;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-warm-line px-4 pt-5 pb-4">
        <Brand />
        <div className="mt-3">
          <TierBadge />
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto px-2 py-4">
        {SECTIONS.map((section) => (
          <div key={section.label} className="mb-4 last:mb-0">
            <div className="px-3 pb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-warm-mute">
              {section.label}
            </div>
            <ul>
              {section.items.map((item) => {
                const on = active === item.id;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => onSwitch(item.id)}
                      title={item.hint}
                      className={`flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-left text-sm transition-colors duration-aa ease-aa ${
                        on
                          ? 'bg-warm-paper text-warm-black'
                          : 'text-warm-stone hover:bg-warm-paper/60 hover:text-warm-ink'
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                          on ? 'bg-copper' : 'bg-transparent'
                        }`}
                        aria-hidden
                      />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      {!mobile && (
        <div className="hidden border-t border-warm-line px-3 py-3 lg:block">
          <ProfilePicker dropUp align="left" />
        </div>
      )}
    </div>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-2">
      <div className="aa-parcel h-5 w-5">
        <div />
        <div />
        <div className="accent" />
        <div />
        <div className="accent" />
        <div />
        <div className="accent" />
        <div />
        <div />
      </div>
      <div className="display text-base leading-none tracking-tight">
        Learn CRE
      </div>
    </div>
  );
}

function Hamburger() {
  return (
    <svg
      width="18"
      height="14"
      viewBox="0 0 18 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M0 1h18M0 7h18M0 13h18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
