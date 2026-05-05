import { useEffect, useMemo, useRef, useState } from 'react';
import type { Cert } from '../types/cert';
import type { SessionRecord } from '../types/profile';
import { computeCertHash } from '../quiz/certs/hash';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface Props {
  cert: Cert;
  holderName: string;
  earnedAt: number;
  finalScorePct: number | null;
  sessions: SessionRecord[];
  /** When set, the final-exam finishedAt timestamp seeds the hash (otherwise earnedAt is used). */
  examFinishedAt?: number;
}

const WIDTH = 1100;
const HEIGHT = 760;

function formatDate(ms: number): string {
  return new Date(ms).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function buildSvg(opts: {
  cert: Cert;
  holderName: string;
  earnedAt: number;
  finalScorePct: number | null;
  hashShort: string;
}): string {
  const { cert, holderName, earnedAt, finalScorePct, hashShort } = opts;
  const score =
    finalScorePct == null ? '—' : `${Math.round(finalScorePct * 100)}%`;
  // Embed only safe fields. SVG values are the only XML strings we need to
  // escape — none of the inputs contain raw user-controlled HTML at this
  // layer, but escape defensively anyway.
  const esc = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fbf4eb"/>
      <stop offset="100%" stop-color="#f3e8d6"/>
    </linearGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  <rect x="32" y="32" width="${WIDTH - 64}" height="${HEIGHT - 64}" fill="none" stroke="#d4895a" stroke-width="2"/>
  <rect x="42" y="42" width="${WIDTH - 84}" height="${HEIGHT - 84}" fill="none" stroke="#d4895a" stroke-width="0.5" opacity="0.5"/>

  <!-- Header -->
  <text x="${WIDTH / 2}" y="120" text-anchor="middle" font-family="Georgia, serif" font-size="22" letter-spacing="6" fill="#8f5430" font-weight="500">CERTIFICATE OF COMPLETION</text>
  <line x1="${WIDTH / 2 - 110}" y1="140" x2="${WIDTH / 2 + 110}" y2="140" stroke="#d4895a" stroke-width="1"/>

  <!-- Title -->
  <text x="${WIDTH / 2}" y="240" text-anchor="middle" font-family="Georgia, serif" font-size="64" fill="#1c1614" font-weight="500">${esc(cert.title)}</text>

  <!-- Holder -->
  <text x="${WIDTH / 2}" y="320" text-anchor="middle" font-family="Georgia, serif" font-size="18" fill="#5b504a">awarded to</text>
  <text x="${WIDTH / 2}" y="380" text-anchor="middle" font-family="Georgia, serif" font-size="46" font-style="italic" fill="#1c1614">${esc(holderName)}</text>
  <line x1="${WIDTH / 2 - 220}" y1="410" x2="${WIDTH / 2 + 220}" y2="410" stroke="#1c1614" stroke-width="0.5"/>

  <!-- Body description -->
  <text x="${WIDTH / 2}" y="460" text-anchor="middle" font-family="Georgia, serif" font-size="16" fill="#5b504a">${esc(cert.description.length > 130 ? cert.description.slice(0, 127) + '...' : cert.description)}</text>

  <!-- Stats row -->
  <g font-family="ui-monospace, SFMono-Regular, monospace" font-size="13" fill="#3a322d">
    <text x="120" y="600" font-weight="600">DATE</text>
    <text x="120" y="625">${esc(formatDate(earnedAt))}</text>

    <text x="${WIDTH / 2}" y="600" text-anchor="middle" font-weight="600">FINAL EXAM</text>
    <text x="${WIDTH / 2}" y="625" text-anchor="middle">${esc(score)}</text>

    <text x="${WIDTH - 120}" y="600" text-anchor="end" font-weight="600">VERIFICATION</text>
    <text x="${WIDTH - 120}" y="625" text-anchor="end">${esc(hashShort)}</text>
  </g>

  <!-- Footer -->
  <text x="${WIDTH / 2}" y="${HEIGHT - 70}" text-anchor="middle" font-family="Georgia, serif" font-size="13" letter-spacing="3" fill="#8f5430">LEARNCRE</text>
  <text x="${WIDTH / 2}" y="${HEIGHT - 50}" text-anchor="middle" font-family="ui-monospace, SFMono-Regular, monospace" font-size="10" fill="#9a8d83">commercial real estate intuition · learncre.local</text>
</svg>`;
}

async function svgToPngBlob(svg: string): Promise<Blob> {
  const svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);
  try {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('SVG image load failed'));
      img.src = url;
    });
    const canvas = document.createElement('canvas');
    canvas.width = WIDTH * 2;
    canvas.height = HEIGHT * 2;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas 2D unavailable');
    ctx.scale(2, 2);
    ctx.drawImage(img, 0, 0, WIDTH, HEIGHT);
    return await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error('toBlob failed'))),
        'image/png',
      );
    });
  } finally {
    URL.revokeObjectURL(url);
  }
}

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function CertArtifact({
  cert,
  holderName,
  earnedAt,
  finalScorePct,
  sessions,
  examFinishedAt,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hashFull, setHashFull] = useState<string>('');
  const [hashShort, setHashShort] = useState<string>('…');
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    let cancelled = false;
    computeCertHash(
      cert.id,
      sessions,
      examFinishedAt ?? earnedAt,
    ).then((h) => {
      if (cancelled) return;
      setHashFull(h.full);
      setHashShort(h.short);
    });
    return () => {
      cancelled = true;
    };
  }, [cert.id, sessions, earnedAt, examFinishedAt]);

  const svg = useMemo(
    () =>
      buildSvg({
        cert,
        holderName,
        earnedAt,
        finalScorePct,
        hashShort,
      }),
    [cert, holderName, earnedAt, finalScorePct, hashShort],
  );

  const downloadPng = async () => {
    const filename = `${cert.id}-${holderName.replace(/\W+/g, '-')}.png`;
    try {
      const png = await svgToPngBlob(svg);
      downloadBlob(png, filename);
    } catch {
      // Fallback: download the SVG itself.
      downloadBlob(
        new Blob([svg], { type: 'image/svg+xml' }),
        filename.replace(/\.png$/, '.svg'),
      );
    }
  };

  const credential = useMemo(() => {
    return JSON.stringify(
      {
        version: 1,
        certId: cert.id,
        certTitle: cert.title,
        holderName,
        earnedAt,
        earnedAtIso: new Date(earnedAt).toISOString(),
        finalExamFinishedAt: examFinishedAt ?? earnedAt,
        finalScorePct,
        sessionCount: sessions.length,
        hash: hashFull,
        issuer: 'learncre.local',
      },
      null,
      2,
    );
  }, [cert, holderName, earnedAt, examFinishedAt, finalScorePct, sessions, hashFull]);

  const copyCredential = async () => {
    try {
      await navigator.clipboard.writeText(credential);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Some browsers reject clipboard access without user gesture context;
      // fall back to a download.
      downloadBlob(
        new Blob([credential], { type: 'application/json' }),
        `${cert.id}-credential.json`,
      );
    }
  };

  return (
    <Card className="space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-stone">
        Cert artifact
      </div>
      <div
        ref={containerRef}
        className="overflow-hidden rounded-lg border border-warm-line bg-warm-paper/40"
      >
        <div
          className="aspect-[1100/760] w-full"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={downloadPng} className="text-xs">
          Download PNG
        </Button>
        <Button variant="secondary" onClick={copyCredential} className="text-xs">
          {copied ? '✓ Copied JSON' : 'Copy credential JSON'}
        </Button>
        <div className="ml-auto font-mono text-[10px] text-warm-mute num">
          hash {hashShort}
        </div>
      </div>
      <p className="text-[11px] text-warm-mute">
        The verification hash is a SHA-256 of your session ids + cert id.
        Share by downloading the PNG or pasting the JSON; verifiers can
        regenerate the hash from the same session log to confirm authenticity.
      </p>
    </Card>
  );
}
