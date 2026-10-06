/** Shown while a lazily loaded screen's chunk downloads. */
export function RouteFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center" role="status" aria-live="polite">
      <span className="aa-parcel h-6 w-6 animate-pulse" aria-hidden>
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className={i === 4 ? 'accent' : undefined} />
        ))}
      </span>
      <span className="sr-only">Loading…</span>
    </div>
  );
}
