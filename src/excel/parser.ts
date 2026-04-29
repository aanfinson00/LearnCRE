import type { CellRef, Expr } from './types';

type TokKind =
  | 'NUM'
  | 'CELL'
  | 'IDENT'
  | 'COLON'
  | 'COMMA'
  | 'LPAREN'
  | 'RPAREN'
  | 'PLUS'
  | 'MINUS'
  | 'STAR'
  | 'SLASH'
  | 'CARET'
  | 'EOF';

interface Token {
  kind: TokKind;
  text: string;
  pos: number;
  /** Pre-parsed payload for NUM and CELL tokens */
  num?: number;
  cell?: CellRef;
}

export class FormulaError extends Error {
  constructor(
    message: string,
    public readonly position?: number,
  ) {
    super(message);
    this.name = 'FormulaError';
  }
}

const CELL_RE = /^(\$?)([A-Z]+)(\$?)(\d+)/i;

function colLettersToIndex(letters: string): number {
  let n = 0;
  for (const ch of letters.toUpperCase()) n = n * 26 + (ch.charCodeAt(0) - 64);
  return n - 1;
}

export function indexToColLetters(col: number): string {
  let n = col + 1;
  let out = '';
  while (n > 0) {
    const r = (n - 1) % 26;
    out = String.fromCharCode(65 + r) + out;
    n = Math.floor((n - 1) / 26);
  }
  return out;
}

export function cellRefToA1(ref: CellRef): string {
  return `${ref.absCol ? '$' : ''}${indexToColLetters(ref.col)}${ref.absRow ? '$' : ''}${ref.row + 1}`;
}

export function a1ToCellRef(a1: string): CellRef | null {
  const m = a1.match(CELL_RE);
  if (!m || m[0].length !== a1.length) return null;
  return {
    col: colLettersToIndex(m[2]),
    row: Number(m[4]) - 1,
    absCol: m[1] === '$',
    absRow: m[3] === '$',
  };
}

function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  // Strip a leading "=" if present
  let s = input.trim();
  if (s.startsWith('=')) s = s.slice(1);
  let i = 0;
  while (i < s.length) {
    const ch = s[i];
    if (ch === ' ' || ch === '\t' || ch === '\n' || ch === '\r') {
      i++;
      continue;
    }
    if (ch === '(') {
      tokens.push({ kind: 'LPAREN', text: '(', pos: i });
      i++;
      continue;
    }
    if (ch === ')') {
      tokens.push({ kind: 'RPAREN', text: ')', pos: i });
      i++;
      continue;
    }
    if (ch === ',') {
      tokens.push({ kind: 'COMMA', text: ',', pos: i });
      i++;
      continue;
    }
    if (ch === ':') {
      tokens.push({ kind: 'COLON', text: ':', pos: i });
      i++;
      continue;
    }
    if (ch === '+') {
      tokens.push({ kind: 'PLUS', text: '+', pos: i });
      i++;
      continue;
    }
    if (ch === '-') {
      tokens.push({ kind: 'MINUS', text: '-', pos: i });
      i++;
      continue;
    }
    if (ch === '*') {
      tokens.push({ kind: 'STAR', text: '*', pos: i });
      i++;
      continue;
    }
    if (ch === '/') {
      tokens.push({ kind: 'SLASH', text: '/', pos: i });
      i++;
      continue;
    }
    if (ch === '^') {
      tokens.push({ kind: 'CARET', text: '^', pos: i });
      i++;
      continue;
    }

    // Number literal: digits with optional decimal
    if (ch >= '0' && ch <= '9') {
      let j = i;
      while (j < s.length && /[0-9]/.test(s[j])) j++;
      if (j < s.length && s[j] === '.') {
        j++;
        while (j < s.length && /[0-9]/.test(s[j])) j++;
      }
      const text = s.slice(i, j);
      tokens.push({ kind: 'NUM', text, pos: i, num: Number(text) });
      i = j;
      continue;
    }

    // Cell reference or function name (starts with letter or $)
    if (ch === '$' || /[A-Za-z_]/.test(ch)) {
      // Try cell-ref first
      const tail = s.slice(i);
      const cellMatch = tail.match(CELL_RE);
      if (cellMatch) {
        const ref = a1ToCellRef(cellMatch[0]);
        if (ref) {
          tokens.push({ kind: 'CELL', text: cellMatch[0], pos: i, cell: ref });
          i += cellMatch[0].length;
          continue;
        }
      }
      // Otherwise an identifier (function name)
      let j = i;
      while (j < s.length && /[A-Za-z_0-9]/.test(s[j])) j++;
      const text = s.slice(i, j);
      if (text.length === 0) {
        throw new FormulaError(`unexpected character '${ch}'`, i);
      }
      tokens.push({ kind: 'IDENT', text, pos: i });
      i = j;
      continue;
    }

    throw new FormulaError(`unexpected character '${ch}'`, i);
  }
  tokens.push({ kind: 'EOF', text: '', pos: s.length });
  return tokens;
}

class Parser {
  private pos = 0;
  constructor(private readonly tokens: Token[]) {}
  private peek(): Token {
    return this.tokens[this.pos];
  }
  private eat(): Token {
    return this.tokens[this.pos++];
  }
  private expect(kind: TokKind): Token {
    const t = this.peek();
    if (t.kind !== kind) {
      throw new FormulaError(
        `expected ${kind.toLowerCase()} but got '${t.text || t.kind}'`,
        t.pos,
      );
    }
    return this.eat();
  }

  parseExpr(): Expr {
    const e = this.parseAdditive();
    if (this.peek().kind !== 'EOF') {
      throw new FormulaError(`unexpected '${this.peek().text || this.peek().kind}'`, this.peek().pos);
    }
    return e;
  }

  // additive  := multiplicative (('+'|'-') multiplicative)*
  private parseAdditive(): Expr {
    let left = this.parseMultiplicative();
    while (this.peek().kind === 'PLUS' || this.peek().kind === 'MINUS') {
      const op = this.eat().kind === 'PLUS' ? '+' : '-';
      const right = this.parseMultiplicative();
      left = { kind: 'binop', op, left, right };
    }
    return left;
  }

  // multiplicative := power (('*'|'/') power)*
  private parseMultiplicative(): Expr {
    let left = this.parsePower();
    while (this.peek().kind === 'STAR' || this.peek().kind === 'SLASH') {
      const op = this.eat().kind === 'STAR' ? '*' : '/';
      const right = this.parsePower();
      left = { kind: 'binop', op, left, right };
    }
    return left;
  }

  // power := unary ('^' power)?       (right-associative)
  private parsePower(): Expr {
    const left = this.parseUnary();
    if (this.peek().kind === 'CARET') {
      this.eat();
      const right = this.parsePower();
      return { kind: 'binop', op: '^', left, right };
    }
    return left;
  }

  // unary := ('-'|'+') unary | primary
  private parseUnary(): Expr {
    if (this.peek().kind === 'MINUS') {
      this.eat();
      return { kind: 'unary', op: '-', expr: this.parseUnary() };
    }
    if (this.peek().kind === 'PLUS') {
      this.eat();
      return this.parseUnary();
    }
    return this.parsePrimary();
  }

  // primary := NUM | cellOrRange | call | '(' expr ')'
  private parsePrimary(): Expr {
    const t = this.peek();
    if (t.kind === 'NUM') {
      this.eat();
      return { kind: 'num', value: t.num! };
    }
    if (t.kind === 'LPAREN') {
      this.eat();
      const inner = this.parseAdditive();
      this.expect('RPAREN');
      return inner;
    }
    if (t.kind === 'CELL') {
      this.eat();
      // Check for range
      if (this.peek().kind === 'COLON') {
        this.eat();
        const end = this.expect('CELL');
        return { kind: 'range', start: t.cell!, end: end.cell! };
      }
      return { kind: 'cell', ref: t.cell! };
    }
    if (t.kind === 'IDENT') {
      this.eat();
      this.expect('LPAREN');
      const args: Expr[] = [];
      if (this.peek().kind !== 'RPAREN') {
        args.push(this.parseAdditive());
        while (this.peek().kind === 'COMMA') {
          this.eat();
          args.push(this.parseAdditive());
        }
      }
      this.expect('RPAREN');
      return { kind: 'call', name: t.text.toUpperCase(), args };
    }
    throw new FormulaError(`unexpected '${t.text || t.kind}'`, t.pos);
  }
}

export function parseFormula(input: string): Expr {
  const tokens = tokenize(input);
  return new Parser(tokens).parseExpr();
}

/**
 * Walk a (possibly invalid / partial) formula and return the set of cell
 * addresses it references. Ranges (A1:A5) are expanded to every cell in the
 * range. Used for live highlighting in the UI as the user types.
 *
 * Robust to malformed input — pure regex scan, no parse pass.
 */
export function extractReferencedAddresses(formula: string): Set<string> {
  const out = new Set<string>();
  let s = formula.trim();
  if (s.startsWith('=')) s = s.slice(1);
  if (s.length === 0) return out;

  // First pass: ranges (A1:A5). Mark consumed regions so the single-cell pass
  // doesn't double-count their endpoints.
  const rangeRe = /(\$?[A-Z]+\$?\d+)\s*:\s*(\$?[A-Z]+\$?\d+)/gi;
  const consumed: [number, number][] = [];
  let m: RegExpExecArray | null;
  while ((m = rangeRe.exec(s)) !== null) {
    const refA = a1ToCellRef(m[1].toUpperCase());
    const refB = a1ToCellRef(m[2].toUpperCase());
    if (refA && refB) {
      const colA = Math.min(refA.col, refB.col);
      const colB = Math.max(refA.col, refB.col);
      const rowA = Math.min(refA.row, refB.row);
      const rowB = Math.max(refA.row, refB.row);
      for (let r = rowA; r <= rowB; r++) {
        for (let c = colA; c <= colB; c++) {
          out.add(cellRefToA1({ col: c, row: r, absCol: false, absRow: false }));
        }
      }
    }
    consumed.push([m.index, m.index + m[0].length]);
  }

  // Second pass: standalone cell refs not inside a range we already handled.
  const singleRe = /\$?[A-Z]+\$?\d+/gi;
  while ((m = singleRe.exec(s)) !== null) {
    const inside = consumed.some(([a, b]) => m!.index >= a && m!.index < b);
    if (inside) continue;
    const ref = a1ToCellRef(m[0].toUpperCase());
    if (ref) {
      out.add(cellRefToA1({ col: ref.col, row: ref.row, absCol: false, absRow: false }));
    }
  }
  return out;
}
