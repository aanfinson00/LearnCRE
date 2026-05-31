import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  REVIEW_QUESTIONS,
  type ReviewQuestion,
} from '../quiz/reviewQuestions';
import {
  deleteMemo,
  getMemo,
  listMemoMeta,
  saveMemo,
  type BatchMemoMeta,
} from '../storage/voiceMemos';
import { buildZip, type ZipEntry } from '../lib/zip';

/** Default number of questions a single batch memo covers. */
export const DEFAULT_BATCH = 15;

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 30);
}

function extFor(meta: BatchMemoMeta): string {
  const fromName = meta.filename.includes('.') ? meta.filename.split('.').pop() : '';
  if (fromName) return fromName.toLowerCase();
  return meta.mime.split('/')[1] || 'audio';
}

function pad(n: number): string {
  return String(n).padStart(3, '0');
}

export interface SaveBatch {
  fromNumber: number;
  toNumber: number;
  note?: string;
  file: File;
}

export interface UseFeedbackReview {
  questions: ReviewQuestion[];
  index: number;
  current: ReviewQuestion;
  memos: BatchMemoMeta[];
  /** Set of question numbers covered by at least one memo. */
  coveredNumbers: Set<number>;
  coveredCount: number;
  busy: boolean;
  goto: (i: number) => void;
  next: () => void;
  prev: () => void;
  saveBatch: (b: SaveBatch) => Promise<void>;
  removeBatch: (id: string) => Promise<void>;
  loadAudioUrl: (id: string) => Promise<string | null>;
  exportAll: () => Promise<void>;
}

export function useFeedbackReview(): UseFeedbackReview {
  const questions = REVIEW_QUESTIONS;
  const [index, setIndex] = useState(0);
  const [memos, setMemos] = useState<BatchMemoMeta[]>([]);
  const [busy, setBusy] = useState(false);

  const refresh = useCallback(async () => {
    const list = await listMemoMeta();
    setMemos(list);
  }, []);

  useEffect(() => {
    let alive = true;
    listMemoMeta().then((list) => {
      if (alive) setMemos(list);
    });
    return () => {
      alive = false;
    };
  }, []);

  const current = questions[index];

  const goto = useCallback(
    (i: number) => setIndex(Math.max(0, Math.min(questions.length - 1, i))),
    [questions.length],
  );
  const next = useCallback(() => goto(index + 1), [goto, index]);
  const prev = useCallback(() => goto(index - 1), [goto, index]);

  const saveBatch = useCallback(
    async (b: SaveBatch) => {
      setBusy(true);
      try {
        const from = Math.min(b.fromNumber, b.toNumber);
        const to = Math.max(b.fromNumber, b.toNumber);
        await saveMemo({ fromNumber: from, toNumber: to, note: b.note, file: b.file });
        await refresh();
      } finally {
        setBusy(false);
      }
    },
    [refresh],
  );

  const removeBatch = useCallback(
    async (id: string) => {
      setBusy(true);
      try {
        await deleteMemo(id);
        await refresh();
      } finally {
        setBusy(false);
      }
    },
    [refresh],
  );

  const loadAudioUrl = useCallback(async (id: string) => {
    const rec = await getMemo(id);
    if (!rec) return null;
    return URL.createObjectURL(rec.blob);
  }, []);

  const coveredNumbers = useMemo(() => {
    const set = new Set<number>();
    for (const m of memos) {
      for (let n = m.fromNumber; n <= m.toNumber; n++) set.add(n);
    }
    return set;
  }, [memos]);

  const exportAll = useCallback(async () => {
    setBusy(true);
    try {
      const entries: ZipEntry[] = [];
      const manifest: Array<{
        fromNumber: number;
        toNumber: number;
        note?: string;
        memoFile: string;
        covers: Array<{ number: number; id: string; title: string }>;
      }> = [];

      for (const meta of memos) {
        const rec = await getMemo(meta.id);
        if (!rec) continue;
        const slug = meta.note ? slugify(meta.note) : 'memo';
        const memoFile = `q${pad(meta.fromNumber)}-${pad(meta.toNumber)}-${slug}.${extFor(meta)}`;
        const buf = new Uint8Array(await rec.blob.arrayBuffer());
        entries.push({ name: `voice-memos/${memoFile}`, data: buf });
        manifest.push({
          fromNumber: meta.fromNumber,
          toNumber: meta.toNumber,
          note: meta.note,
          memoFile,
          covers: questions
            .filter((q) => q.number >= meta.fromNumber && q.number <= meta.toNumber)
            .map((q) => ({ number: q.number, id: q.id, title: q.title })),
        });
      }

      const manifestJson = JSON.stringify(
        { exportedAt: new Date().toISOString(), totalQuestions: questions.length, memos: manifest },
        null,
        2,
      );
      entries.push({ name: 'manifest.json', data: new TextEncoder().encode(manifestJson) });

      const blob = buildZip(entries);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `learncre-feedback-${new Date().toISOString().slice(0, 10)}.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } finally {
      setBusy(false);
    }
  }, [questions, memos]);

  return {
    questions,
    index,
    current,
    memos,
    coveredNumbers,
    coveredCount: coveredNumbers.size,
    busy,
    goto,
    next,
    prev,
    saveBatch,
    removeBatch,
    loadAudioUrl,
    exportAll,
  };
}
