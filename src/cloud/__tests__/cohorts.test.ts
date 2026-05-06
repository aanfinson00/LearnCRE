import { describe, expect, it } from 'vitest';
import { isValidSlug, normalizeSlug } from '../cohorts';

describe('cloud/cohorts — slug helpers', () => {
  describe('normalizeSlug', () => {
    it('lowercases and replaces non-[a-z0-9] runs with single dashes', () => {
      expect(normalizeSlug('Acme RE Summer Interns 2026')).toBe(
        'acme-re-summer-interns-2026',
      );
    });

    it('strips leading and trailing dashes', () => {
      expect(normalizeSlug('  --hello world--  ')).toBe('hello-world');
    });

    it('caps at 32 chars', () => {
      const long = 'a'.repeat(50);
      expect(normalizeSlug(long).length).toBe(32);
    });

    it('returns empty string for unrecoverable input', () => {
      expect(normalizeSlug('!@#$%')).toBe('');
    });

    it('preserves valid slugs unchanged', () => {
      expect(normalizeSlug('mit-mba-re-2026')).toBe('mit-mba-re-2026');
    });
  });

  describe('isValidSlug', () => {
    it('accepts 3–32 char slugs of [a-z0-9-]', () => {
      expect(isValidSlug('acme')).toBe(true);
      expect(isValidSlug('mit-mba-re-2026')).toBe(true);
      expect(isValidSlug('a-b-c')).toBe(true);
    });

    it('rejects too short', () => {
      expect(isValidSlug('ab')).toBe(false);
    });

    it('rejects too long', () => {
      expect(isValidSlug('a'.repeat(33))).toBe(false);
    });

    it('rejects uppercase or non-alphanumeric', () => {
      expect(isValidSlug('Acme')).toBe(false);
      expect(isValidSlug('acme!')).toBe(false);
      expect(isValidSlug('acme corp')).toBe(false);
    });
  });
});
