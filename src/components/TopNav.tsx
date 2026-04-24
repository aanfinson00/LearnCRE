type Mode = 'quiz' | 'speedDrill' | 'study';

interface Props {
  active: Mode;
  onSwitch: (mode: Mode) => void;
}

const TABS: { id: Mode; label: string; hint: string }[] = [
  { id: 'quiz', label: 'Quiz', hint: 'Single questions, full explanation.' },
  { id: 'speedDrill', label: 'Speed drill', hint: 'Times-table style against the clock.' },
  { id: 'study', label: 'Study tables', hint: 'Reference cheat sheets.' },
];

export function TopNav({ active, onSwitch }: Props) {
  return (
    <nav className="border-b border-warm-line">
      <div className="mx-auto flex max-w-5xl items-end gap-1 px-4">
        {TABS.map((t) => {
          const on = active === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onSwitch(t.id)}
              className={`relative px-4 py-3 text-sm font-medium transition-colors duration-aa ease-aa ${
                on
                  ? 'text-warm-black'
                  : 'text-warm-mute hover:text-warm-ink'
              }`}
            >
              {t.label}
              {on && (
                <span className="absolute inset-x-4 -bottom-px h-0.5 rounded-full bg-copper" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
