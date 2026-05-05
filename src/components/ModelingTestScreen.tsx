import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { buildSheet } from '../excel/modelingTest/grade';
import { extractReferencedAddresses } from '../excel/parser';
import type { ModelingTestState } from '../types/modelingTest';
import { ModelingTestGrid } from './ModelingTestGrid';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

const CELL_REF_AT_END_RE = /(\$?[A-Z]+\$?\d+)$/i;

interface Props {
  state: ModelingTestState;
  onSetFormula: (ref: string, raw: string) => void;
  onFocus: (ref: string | null) => void;
  onSubmit: () => void;
  onSaveAndExit: () => void;
}

export function ModelingTestScreen({
  state,
  onSetFormula,
  onFocus,
  onSubmit,
  onSaveAndExit,
}: Props) {
  const { template, formulas, focusRef } = state;
  const [briefOpen, setBriefOpen] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const pendingCursorRef = useRef<number | null>(null);

  const targetCells = useMemo(
    () => template.layout.cells.filter((c) => c.role === 'target'),
    [template],
  );
  const outputRefs = useMemo(
    () => new Set(template.outputs.map((o) => o.ref)),
    [template],
  );

  const { sheet, parseErrors } = useMemo(
    () => buildSheet(template, formulas),
    [template, formulas],
  );

  const focusRaw = focusRef ? formulas[focusRef] ?? '' : '';
  const focusCell = focusRef
    ? template.layout.cells.find((c) => c.address === focusRef) ?? null
    : null;
  const focusOutput = focusRef
    ? template.outputs.find((o) => o.ref === focusRef) ?? null
    : null;

  const filledOutputCount = template.outputs.filter((o) => {
    const raw = formulas[o.ref] ?? '';
    return raw.trim() !== '' && raw.trim() !== '=';
  }).length;

  // Restore cursor after click-to-insert
  useEffect(() => {
    const pos = pendingCursorRef.current;
    if (pos === null) return;
    const input = inputRef.current;
    if (!input) return;
    input.focus();
    input.setSelectionRange(pos, pos);
    pendingCursorRef.current = null;
  }, [focusRaw]);

  // Refocus the formula input on focus change
  useEffect(() => {
    if (focusRef) inputRef.current?.focus();
  }, [focusRef]);

  const handleInsert = useCallback(
    (address: string, shiftKey: boolean) => {
      if (!focusRef) return;
      const input = inputRef.current;
      const start = input?.selectionStart ?? focusRaw.length;
      const end = input?.selectionEnd ?? start;
      const before = focusRaw.slice(0, start);
      const after = focusRaw.slice(end);
      const trailingMatch = before.match(CELL_REF_AT_END_RE);
      const insert = shiftKey && trailingMatch ? `:${address}` : address;
      const next = before + insert + after;
      pendingCursorRef.current = before.length + insert.length;
      onSetFormula(focusRef, next);
    },
    [focusRef, focusRaw, onSetFormula],
  );

  const highlighted = useMemo(
    () => extractReferencedAddresses(focusRaw),
    [focusRaw],
  );

  const handleTargetClick = useCallback((address: string) => onFocus(address), [onFocus]);

  const goPrev = () => {
    if (!focusRef) return;
    const idx = targetCells.findIndex((c) => c.address === focusRef);
    if (idx <= 0) return;
    onFocus(targetCells[idx - 1].address);
  };
  const goNext = () => {
    if (!focusRef) return;
    const idx = targetCells.findIndex((c) => c.address === focusRef);
    if (idx === -1 || idx === targetCells.length - 1) return;
    onFocus(targetCells[idx + 1].address);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-5 py-8">
      <header className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <div className="display text-3xl text-warm-black">
            {template.title}<span className="text-copper">.</span>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-warm-mute num">
            {template.difficulty} · ~{template.estimatedMinutes} min · {filledOutputCount}/
            {template.outputs.length} outputs filled
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={onSaveAndExit} className="text-xs">
            Save & exit
          </Button>
          <Button onClick={onSubmit}>Submit</Button>
        </div>
      </header>

      <Card className="space-y-3">
        <button
          type="button"
          onClick={() => setBriefOpen((v) => !v)}
          className="flex w-full items-center justify-between text-left"
        >
          <p className="editorial text-base leading-relaxed text-warm-ink">
            {template.scenario}
          </p>
          <span className="ml-3 font-mono text-[10px] text-warm-mute num">
            {briefOpen ? '▾ hide brief' : '▸ show brief'}
          </span>
        </button>
        {briefOpen && template.brief && (
          <div className="space-y-2 border-t border-warm-line pt-3">
            {template.brief.paragraphs.map((p, i) => (
              <p key={i} className="text-sm leading-relaxed text-warm-stone">
                {p}
              </p>
            ))}
            {template.brief.bullets && (
              <ul className="list-disc space-y-1 pl-5 text-sm text-warm-stone">
                {template.brief.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </Card>

      <ModelingTestGrid
        layout={template.layout}
        sheet={sheet}
        parseErrors={parseErrors}
        outputRefs={outputRefs}
        focusRef={focusRef}
        onTargetClick={handleTargetClick}
        onInsertClick={handleInsert}
        highlightedAddresses={highlighted}
      />

      <Card className="space-y-2">
        {focusCell && focusRef ? (
          <>
            <div className="flex items-baseline justify-between gap-3">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-widest text-warm-mute num">
                  Editing <span className="text-warm-black">{focusRef}</span>
                  {focusOutput && (
                    <span className="ml-2 rounded-full bg-copper/10 px-1.5 py-0.5 text-[9px] text-copper-deep">
                      output
                    </span>
                  )}
                </div>
                <div className="mt-0.5 text-sm font-medium text-warm-black">
                  {focusCell.label ?? focusRef}
                </div>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" onClick={goPrev} className="text-xs">
                  ← Prev cell
                </Button>
                <Button variant="ghost" onClick={goNext} className="text-xs">
                  Next cell →
                </Button>
              </div>
            </div>
            <div className="flex items-stretch rounded-lg border border-warm-line bg-warm-white focus-within:border-copper">
              <span className="flex items-center px-3 font-mono text-warm-mute num">=</span>
              <input
                ref={inputRef}
                type="text"
                value={focusRaw}
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                placeholder="type a formula or click cells to insert"
                onChange={(e) => onSetFormula(focusRef, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    goNext();
                  }
                  if (e.key === 'Tab') {
                    e.preventDefault();
                    if (e.shiftKey) goPrev();
                    else goNext();
                  }
                }}
                className="flex-1 bg-transparent px-2 py-2.5 font-mono text-sm outline-none num placeholder:text-warm-mute/70"
              />
            </div>
            <div className="font-mono text-[11px] text-warm-mute num">
              {parseErrors[focusRef] ? (
                <span className="text-signal-bad-ink">⚠ {parseErrors[focusRef]}</span>
              ) : sheet[focusRef] !== undefined ? (
                <span>
                  Live:{' '}
                  <span className="text-warm-black">
                    {Number.isFinite(sheet[focusRef])
                      ? sheet[focusRef].toLocaleString('en-US', {
                          maximumFractionDigits: 4,
                        })
                      : '—'}
                  </span>
                </span>
              ) : (
                <span>↵ to advance · Tab/Shift-Tab to move · click cells to insert</span>
              )}
            </div>
          </>
        ) : (
          <div className="text-sm text-warm-mute">
            Click any target cell to start typing a formula.
          </div>
        )}
      </Card>
    </div>
  );
}
