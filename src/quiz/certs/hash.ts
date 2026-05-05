/**
 * Cert verification hash.
 *
 * The cert artifact embeds a hex-encoded SHA-256 of the user's session ids
 * + cert id. It's not a security primitive — anyone with localStorage
 * access could regenerate a cert — but it serves as a portable, easily-
 * pasted "this is the corpus that earned the cert" fingerprint so two
 * users can compare their certs without sharing the full session log.
 *
 * Computed via Web Crypto (SubtleCrypto) so there's no dependency on a
 * crypto library. Returns a short 12-char prefix for display + the full
 * hex for the JSON credential blob.
 */

import type { SessionRecord } from '../../types/profile';

export interface CertHash {
  /** Full 64-char hex SHA-256. */
  full: string;
  /** Short 12-char prefix for display on the artifact. */
  short: string;
}

export async function computeCertHash(
  certId: string,
  sessions: SessionRecord[],
  finalExamFinishedAt: number,
): Promise<CertHash> {
  const sessionIds = sessions.map((s) => s.id).sort().join('|');
  const payload = `${certId}::${finalExamFinishedAt}::${sessionIds}`;
  const data = new TextEncoder().encode(payload);
  const buf = await crypto.subtle.digest('SHA-256', data);
  const bytes = Array.from(new Uint8Array(buf));
  const full = bytes.map((b) => b.toString(16).padStart(2, '0')).join('');
  return { full, short: full.slice(0, 12) };
}
