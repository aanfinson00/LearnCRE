import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import type { UnitFormat } from '../types/question';

export interface AnswerInputHandle {
  focus: () => void;
  clear: () => void;
}

interface Props {
  unit: UnitFormat;
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
}

function placeholderFor(unit: UnitFormat): string {
  switch (unit) {
    case 'usd':
    case 'usdChange':
      return 'e.g. 1250000';
    case 'pct':
      return 'e.g. 12.5';
    case 'pctChange':
      return 'e.g. 6  (for +6%)';
    case 'bps':
      return 'e.g. 525';
    case 'multiple':
      return 'e.g. 2.3';
    case 'usdPerSf':
      return 'e.g. 245';
  }
}

function adornmentFor(unit: UnitFormat): { prefix?: string; suffix?: string } {
  switch (unit) {
    case 'usd':
    case 'usdChange':
      return { prefix: '$' };
    case 'pct':
    case 'pctChange':
      return { suffix: '%' };
    case 'bps':
      return { suffix: 'bps' };
    case 'multiple':
      return { suffix: 'x' };
    case 'usdPerSf':
      return { prefix: '$', suffix: '/SF' };
  }
}

export const AnswerInput = forwardRef<AnswerInputHandle, Props>(function AnswerInput(
  { unit, value, onChange, onSubmit, disabled },
  ref,
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { prefix, suffix } = adornmentFor(unit);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    clear: () => onChange(''),
  }));

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex items-stretch rounded-lg border border-warm-line bg-warm-white/80 transition-colors duration-aa ease-aa focus-within:border-copper focus-within:shadow-aa-inset">
      {prefix && (
        <div className="flex items-center px-3 text-warm-mute font-mono">{prefix}</div>
      )}
      <input
        ref={inputRef}
        type="text"
        inputMode="decimal"
        value={value}
        disabled={disabled}
        placeholder={placeholderFor(unit)}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            onSubmit();
          }
        }}
        className="flex-1 bg-transparent px-3 py-3 text-lg font-mono outline-none num placeholder:text-warm-mute/70 disabled:text-warm-mute"
      />
      {suffix && (
        <div className="flex items-center px-3 text-warm-mute font-mono">{suffix}</div>
      )}
    </div>
  );
});
