/**
 * Infinite horizontal ticker. CSS-only. The second copy is aria-hidden so screen readers
 * read the list once. Under prefers-reduced-motion it becomes a static wrapped list.
 */
export function Marquee({
  items,
  duration = 48,
  reverse = false,
  className = "",
}: {
  items: string[];
  duration?: number;
  reverse?: boolean;
  className?: string;
}) {
  const style = { "--dur": `${duration}s`, "--dir": reverse ? "reverse" : "normal" } as React.CSSProperties;
  const row = (hidden: boolean) => (
    <ul className="marquee-track" style={style} aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <li key={t} className="flex shrink-0 items-center gap-3 whitespace-nowrap font-mono text-sm text-muted">
          <span aria-hidden className="size-1 rounded-full bg-accent/70" />
          {t}
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`marquee ${className}`}>
      {row(false)}
      {row(true)}
    </div>
  );
}
