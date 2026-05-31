import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  REVIEW_QUESTIONS,
  type ReviewQuestion,
} from '../quiz/reviewQuestions';
import {
  deleteMemo,
  getMemo,
  listMemoMeta,
  putMemo,
  type MemoMeta,
} from '../storage/voiceMemos';
import { buildZip, type ZipEntry } from '../lib/zip';

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40);
}

function extFor(meta: MemoMeta): string {
  const fromName = meta.filename.includes('.') ? meta.filename.split('.').pop() : '';
  if (fromName) return fromName.toLowerCase();
  const fromMime = meta.mime.split('/')[1];
  return fromMime || 'audio';
}

function pad(n: number): string {
  return String(n).padStart(3, '0');
}

export interface UseFeedbackReview {
  questions: ReviewQuestion[];
  index: number;
  current: ReviewQuestion;
  /** questionId -> memo metadata, for attached/progress rendering. */
  memos: Record<string, MemoMeta>;
  attachedCount: number;
  busy: boolean;
  goto: (i: number) => void;
  next: () => void;
  prev: () => void;
  attach: (file: File) => Promise<void>;
  remove: () => Promise<void>;
  /** Resolve a playable object-URL for the current question's memo, if any. */
  loadAudioUrl: (questionId: string) => Promise<string | null>;
  exportAll: () => Promise<void>;
}

export function useFeedbackReview(): UseFeedbackReview {
  const questions = REVIEW_QUESTIONS;
  const [index, setIndex] = useState(0);
  const [memos, setMemos] = useState<Record<string, MemoMeta>>({});
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let alive = true;
    listMemoMeta().then((list) => {
      if (!alive) return;
      const map: Record<string, MemoMeta> = {};
      for (const m of list) map[m.questionId] = m;
      setMemos(map);
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

  const attach = useCallback(
    async (file: File) => {
      setBusy(true);
      try {
        const meta = await putMemo(current.id, file);
        setMemos((m) => ({ ...m, [current.id]: meta }));
      } finally {
        setBusy(false);
      }
    },
    [current.id],
  );

  const remove = useCallback(async () => {
    setBusy(true);
    try {
      await deleteMemo(current.id);
      setMemos((m) => {
        const { [current.id]: _gone, ...rest } = m;
        return rest;
      });
    } finally {
      setBusy(false);
    }
  }, [current.id]);

  const loadAudioUrl = useCallback(async (questionId: string) => {
    const rec = await getMemo(questionId);
    if (!rec) return null;
    return URL.createObjectURL(rec.blob);
  }, []);

  const exportAll = useCallback(async () => {
    setBusy(true);
    try {
      const entries: ZipEntry[] = [];
      const manifest: Array<{
        number: number;
        id: string;
        type: string;
        title: string;
        memoFile: string | null;
      }> = [];

      for (const q of questions) {
        const meta = memos[q.id];
        let memoFile: string | null = null;
        if (meta) {
          const rec = await getMemo(q.id);
          if (rec) {
            memoFile = `q${pad(q.number)}-${slugify(q.title)}.${extFor(meta)}`;
            const buf = new Uint8Array(await rec.blob.arrayBuffer());
            entries.push({ name: `voice-memos/${memoFile}`, data: buf });
          }
        }
        manifest.push({
          number: q.number,
          id: q.id,
          type: q.type,
          title: q.title,
          memoFile,
        });
      }

      const manifestJson = JSON.stringify(
        { exportedAt: new Date().toISOString(), total: questions.length, items: manifest },
        null,
        2,
      );
      entries.push({
        name: 'manifest.json',
        data: new TextEncoder().encode(manifestJson),
      });

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

  const attachedCount = useMemo(() => Object.keys(memos).length, [memos]);

  return {
    questions,
    index,
    current,
    memos,
    attachedCount,
    busy,
    goto,
    next,
    prev,
    attach,
    remove,
    loadAudioUrl,
    exportAll,
  };
}
