/**
 * Minimal store-only (no compression) ZIP writer. Dependency-free so the
 * Feedback studio can bundle uploaded voice memos + a manifest into a single
 * download without pulling a zip library into the singlefile build.
 *
 * Audio files (m4a/mp3/wav) are already compressed, so store-only costs
 * essentially nothing in size and keeps the implementation tiny + auditable.
 */

export interface ZipEntry {
  /** Path inside the archive, e.g. "q001-cap-spread.m4a". */
  name: string;
  data: Uint8Array;
}

function crc32(bytes: Uint8Array): number {
  let crc = ~0;
  for (let i = 0; i < bytes.length; i++) {
    crc ^= bytes[i];
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }
  return (~crc) >>> 0;
}

/** Build the raw zip bytes. Exposed for testing without relying on Blob APIs. */
export function zipBytes(entries: ZipEntry[]): Uint8Array {
  const enc = new TextEncoder();
  const parts: Uint8Array[] = [];
  const central: Uint8Array[] = [];
  let offset = 0;

  for (const e of entries) {
    const nameBytes = enc.encode(e.name);
    const crc = crc32(e.data);
    const size = e.data.length;

    const lh = new DataView(new ArrayBuffer(30));
    lh.setUint32(0, 0x04034b50, true); // local file header signature
    lh.setUint16(4, 20, true); // version needed
    lh.setUint16(6, 0, true); // flags
    lh.setUint16(8, 0, true); // method = store
    lh.setUint16(10, 0, true); // mod time
    lh.setUint16(12, 0, true); // mod date
    lh.setUint32(14, crc, true);
    lh.setUint32(18, size, true); // compressed
    lh.setUint32(22, size, true); // uncompressed
    lh.setUint16(26, nameBytes.length, true);
    lh.setUint16(28, 0, true); // extra length
    parts.push(new Uint8Array(lh.buffer), nameBytes, e.data);

    const ch = new DataView(new ArrayBuffer(46));
    ch.setUint32(0, 0x02014b50, true); // central dir signature
    ch.setUint16(4, 20, true); // version made by
    ch.setUint16(6, 20, true); // version needed
    ch.setUint16(8, 0, true);
    ch.setUint16(10, 0, true); // method
    ch.setUint16(12, 0, true);
    ch.setUint16(14, 0, true);
    ch.setUint32(16, crc, true);
    ch.setUint32(20, size, true);
    ch.setUint32(24, size, true);
    ch.setUint16(28, nameBytes.length, true);
    ch.setUint16(30, 0, true); // extra
    ch.setUint16(32, 0, true); // comment
    ch.setUint16(34, 0, true); // disk number
    ch.setUint16(36, 0, true); // internal attrs
    ch.setUint32(38, 0, true); // external attrs
    ch.setUint32(42, offset, true); // local header offset
    const chHead = new Uint8Array(ch.buffer);
    const chFull = new Uint8Array(chHead.length + nameBytes.length);
    chFull.set(chHead, 0);
    chFull.set(nameBytes, chHead.length);
    central.push(chFull);

    offset += 30 + nameBytes.length + size;
  }

  const centralSize = central.reduce((a, c) => a + c.length, 0);
  const eocd = new DataView(new ArrayBuffer(22));
  eocd.setUint32(0, 0x06054b50, true); // end of central dir signature
  eocd.setUint16(4, 0, true);
  eocd.setUint16(6, 0, true);
  eocd.setUint16(8, entries.length, true);
  eocd.setUint16(10, entries.length, true);
  eocd.setUint32(12, centralSize, true);
  eocd.setUint32(16, offset, true); // central dir offset
  eocd.setUint16(20, 0, true); // comment length

  const all = [...parts, ...central, new Uint8Array(eocd.buffer)];
  const total = all.reduce((a, c) => a + c.length, 0);
  const out = new Uint8Array(total);
  let pos = 0;
  for (const chunk of all) {
    out.set(chunk, pos);
    pos += chunk.length;
  }
  return out;
}

export function buildZip(entries: ZipEntry[]): Blob {
  // Cast through unknown to satisfy lib.dom BlobPart typing for Uint8Array.
  return new Blob([zipBytes(entries)] as unknown as BlobPart[], {
    type: 'application/zip',
  });
}
