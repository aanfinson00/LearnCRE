/**
 * IndexedDB-backed store for Feedback studio voice memos. Audio blobs are too
 * large for localStorage, so they live in IndexedDB keyed by question id.
 * Local-first and fully offline — the memos never leave the device until the
 * user exports the bundle (see the Feedback studio "Export" action).
 *
 * Every function degrades gracefully when IndexedDB is unavailable (SSR /
 * private-mode quirks) so the screen can still render.
 */

const DB_NAME = 'learncre-feedback';
const STORE = 'memos';
const VERSION = 1;

export interface MemoRecord {
  questionId: string;
  filename: string;
  mime: string;
  size: number;
  blob: Blob;
  updatedAt: number;
}

/** Lightweight metadata (no blob) for progress rendering. */
export type MemoMeta = Omit<MemoRecord, 'blob'>;

function hasIdb(): boolean {
  return typeof indexedDB !== 'undefined';
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: 'questionId' });
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

export async function putMemo(questionId: string, file: File): Promise<MemoMeta> {
  const record: MemoRecord = {
    questionId,
    filename: file.name,
    mime: file.type || 'application/octet-stream',
    size: file.size,
    blob: file,
    updatedAt: Date.now(),
  };
  if (!hasIdb()) return stripBlob(record);
  await tx('readwrite', (s) => s.put(record));
  return stripBlob(record);
}

export async function getMemo(questionId: string): Promise<MemoRecord | undefined> {
  if (!hasIdb()) return undefined;
  return tx<MemoRecord | undefined>('readonly', (s) => s.get(questionId) as IDBRequest<MemoRecord | undefined>);
}

export async function deleteMemo(questionId: string): Promise<void> {
  if (!hasIdb()) return;
  await tx('readwrite', (s) => s.delete(questionId));
}

export async function listMemoMeta(): Promise<MemoMeta[]> {
  if (!hasIdb()) return [];
  const all = await tx<MemoRecord[]>('readonly', (s) => s.getAll() as IDBRequest<MemoRecord[]>);
  return all.map(stripBlob).sort((a, b) => a.questionId.localeCompare(b.questionId));
}

function stripBlob(r: MemoRecord): MemoMeta {
  const { blob: _blob, ...meta } = r;
  return meta;
}
