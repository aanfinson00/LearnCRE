import type { Cert } from '../../types/cert';
import { creFundamentals } from './cre-fundamentals';

/**
 * Catalog of all certs. Phase 1 ships only CRE Fundamentals; the 5 role-
 * specific certs land in Phase 4 and import the same Cert interface.
 */
export const CERTS: Cert[] = [creFundamentals];

export function certById(id: string): Cert | undefined {
  return CERTS.find((c) => c.id === id);
}
