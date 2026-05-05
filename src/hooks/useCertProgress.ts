import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  evaluateAllModules,
  evaluateCert,
  type ModuleProgressView,
} from '../quiz/certs/evaluate';
import { CERTS, certById } from '../quiz/certs';
import { useProfile } from './useProfile';
import {
  loadCertProgressMap,
  recordFinalExamAttempt,
  markCertEarned,
} from '../storage/certProgress';
import { loadSessions } from '../storage/localStorage';
import type {
  CertProgress,
  CertProgressView,
  FinalExamAttempt,
} from '../types/cert';
import type { SessionRecord } from '../types/profile';

interface CertProgressState {
  /** Per-cert summary (modules passed, eligible-for-final, earned). */
  views: Record<string, CertProgressView>;
  /** Per-cert raw progress record (with finalExamAttempts list). */
  records: Record<string, CertProgress>;
  /** Per-cert per-module benchmark results (for the detail page). */
  moduleResults: Record<string, ModuleProgressView[]>;
  /** Refresh by re-reading sessions + records from localStorage. */
  refresh: () => void;
  /** Record a final-exam attempt; auto-marks earned if passed + modules cleared. */
  recordExam: (certId: string, attempt: FinalExamAttempt) => void;
}

/**
 * Reads session history + cert progress records and emits derived views.
 * Use in CertList / CertDetail / FinalExam screens.
 */
export function useCertProgress(): CertProgressState {
  const { active } = useProfile();
  const [sessions, setSessions] = useState<SessionRecord[]>(() =>
    loadSessions(active.id),
  );
  const [records, setRecords] = useState<Record<string, CertProgress>>(() =>
    loadCertProgressMap(active.id),
  );

  // Refresh on profile switch
  useEffect(() => {
    setSessions(loadSessions(active.id));
    setRecords(loadCertProgressMap(active.id));
  }, [active.id]);

  const refresh = useCallback(() => {
    setSessions(loadSessions(active.id));
    setRecords(loadCertProgressMap(active.id));
  }, [active.id]);

  const views = useMemo<Record<string, CertProgressView>>(() => {
    const out: Record<string, CertProgressView> = {};
    for (const cert of CERTS) {
      const rec = records[cert.id];
      out[cert.id] = evaluateCert(
        cert,
        sessions,
        rec?.finalExamAttempts ?? [],
        rec?.earnedAt,
      );
    }
    return out;
  }, [sessions, records]);

  const moduleResults = useMemo<Record<string, ModuleProgressView[]>>(() => {
    const out: Record<string, ModuleProgressView[]> = {};
    for (const cert of CERTS) {
      out[cert.id] = evaluateAllModules(cert, sessions);
    }
    return out;
  }, [sessions]);

  const recordExam = useCallback(
    (certId: string, attempt: FinalExamAttempt) => {
      recordFinalExamAttempt(certId, attempt, active.id);
      // If this attempt passes AND all modules were already passed, mark earned.
      const cert = certById(certId);
      if (cert && attempt.passed) {
        const view = views[certId];
        if (view && view.eligibleForFinal && !view.earned) {
          markCertEarned(certId, attempt.finishedAt, active.id);
        }
      }
      refresh();
    },
    [active.id, views, refresh],
  );

  return { views, records, moduleResults, refresh, recordExam };
}
