/** A few CSS-only shooting stars. Deterministic values → no hydration mismatch. */
const METEORS = Array.from({ length: 9 }, (_, i) => ({
  x: `${(i * 37 + 11) % 100}%`,
  delay: `${((i * 1.9) % 9).toFixed(1)}s`,
  dur: `${(5.5 + ((i * 7) % 5)).toFixed(1)}s`,
}));

export function Meteors() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {METEORS.map((m, i) => (
        <span key={i} className="meteor" style={{ "--x": m.x, "--delay": m.delay, "--dur": m.dur } as React.CSSProperties} />
      ))}
    </div>
  );
}
