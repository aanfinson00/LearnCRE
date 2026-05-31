/**
 * IndexedDB-backed store for Feedback studio voice memos.
 *
 * Memos are *batch* memos: one recording covers a range of questions (e.g.
 * "Q1–15"), rather than one file per question. Audio blobs are too large for
 * localStorage, so they live in IndexedDB. Local-first and fully offline — the
 * memos never leave the device until the user exports the bundle.
 *
 * Every function degrades gracefully when IndexedDB is unavailable (SSR /
 * private-mode quirks) so the screen can still render.
 */

const DB_NAME = 'learncre-feedback';
const STORE = 'batchMemos';
const LEGACY_STORE = 'memos';
const VERSION = 2;

export interface BatchMemoRecord {
  /** Stable id for this memo. */
  id: string;
  /** First question number this memo covers (1-based, inclusive). */
  fromNumber: number;
  /** Last question number this memo covers (inclusive). */
  toNumber: number;
  /** Optional free-text label. */
  note?: string;
  filename: string;
  mime: string;
  size: number;
  blob: Blob;
  updatedAt: number;
}

/** Lightweight metadata (no blob) for list + progress rendering. */
export type BatchMemoMeta = Omit<BatchMemoRecord, 'blob'>;

function hasIdb(): boolean {
  return typeof indexedDB !== 'undefined';
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: 'id' });
      }
      // Drop the v1 per-question store; the model is batch memos now.
      if (db.objectStoreNames.contains(LEGACY_STORE)) {
        db.deleteObjectStore(LEGACY_STORE);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function tx<T>(mode: IDBTransactionMode, fn: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  return openDb().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const t = db.transaction(STORE, mode);
        const req = fn(t.objectStore(STORE));
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
        t.oncomplete = () => db.close();
      }),
  );
}

function newId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export interface SaveMemoInput {
  fromNumber: number;
  toNumber: number;
  note?: string;
  file: File;
}

export async function saveMemo(input: SaveMemoInput): Promise<BatchMemoMeta> {
  const record: BatchMemoRecord = {
    id: newId(),
    fromNumber: input.fromNumber,
    toNumber: input.toNumber,
    note: input.note?.trim() || undefined,
    filename: input.file.name,
    mime: input.file.type || 'application/octet-stream',
    size: input.file.size,
    blob: input.file,
    updatedAt: Date.now(),
  };
  if (!hasIdb()) return stripBlob(record);
  await tx('readwrite', (s) => s.put(record));
  return stripBlob(record);
}

export async function getMemo(id: string): Promise<BatchMemoRecord | undefined> {
  if (!hasIdb()) return undefined;
  return tx<BatchMemoRecord | undefined>(
    'readonly',
    (s) => s.get(id) as IDBRequest<BatchMemoRecord | undefined>,
  );
}

export async function deleteMemo(id: string): Promise<void> {
  if (!hasIdb()) return;
  await tx('readwrite', (s) => s.delete(id));
}

export async function listMemoMeta(): Promise<BatchMemoMeta[]> {
  if (!hasIdb()) return [];
  const all = await tx<BatchMemoRecord[]>('readonly', (s) => s.getAll() as IDBRequest<BatchMemoRecord[]>);
  return all
    .map(stripBlob)
    .sort((a, b) => a.fromNumber - b.fromNumber || a.updatedAt - b.updatedAt);
}

function stripBlob(r: BatchMemoRecord): BatchMemoMeta {
  const { blob: _blob, ...meta } = r;
  return meta;
}
