import { describe, it, expect } from 'vitest';
import { zipBytes } from '../lib/zip';

function entryCount(bytes: Uint8Array): number {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  // total-entries field sits at offset 10 of the 22-byte EOCD record.
  return view.getUint16(bytes.length - 22 + 10, true);
}

describe('zipBytes', () => {
  it('produces a valid store-only zip with correct signatures', () => {
    const data = new TextEncoder().encode('hello memo');
    const bytes = zipBytes([{ name: 'q001.txt', data }]);

    // Local file header signature PK\x03\x04
    expect([bytes[0], bytes[1], bytes[2], bytes[3]]).toEqual([0x50, 0x4b, 0x03, 0x04]);
    // End-of-central-directory signature PK\x05\x06 near the tail.
    const tail = bytes.slice(-22);
    expect([tail[0], tail[1], tail[2], tail[3]]).toEqual([0x50, 0x4b, 0x05, 0x06]);
    expect(entryCount(bytes)).toBe(1);
  });

  it('handles multiple entries', () => {
    const enc = new TextEncoder();
    const bytes = zipBytes([
      { name: 'a.bin', data: enc.encode('aaa') },
      { name: 'b.bin', data: enc.encode('bbbb') },
    ]);
    expect(bytes.length).toBeGreaterThan(0);
    expect(entryCount(bytes)).toBe(2);
  });
});
