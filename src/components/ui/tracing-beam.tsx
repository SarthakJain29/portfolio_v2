"use client";

import { useEffect, useRef } from "react";

/**
 * A vertical line that fills with a gradient as you scroll past the content,
 * with a glowing head. Progress is driven through one CSS variable (--p),
 * updated in rAF; no React state, so no re-renders while scrolling.
 */
export function TracingBeam({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the block's top hits ~60% of the viewport, 1 when its bottom reaches it.
      const p = (vh * 0.6 - r.top) / Math.max(r.height, 1);
      el.style.setProperty("--p", Math.min(1, Math.max(0, p)).toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update); // first paint first, no forced reflow
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={root} className="relative pl-8 sm:pl-12" style={{ ["--p" as string]: 0 }}>
      <div aria-hidden className="pointer-events-none absolute bottom-2 left-[7px] top-2 w-px bg-line-strong sm:left-[11px]">
        <div
          className="absolute inset-x-0 top-0 w-px origin-top"
          style={{
            height: "100%",
            transform: "scaleY(var(--p))",
            background: "linear-gradient(to bottom, var(--g1), var(--g2) 60%, var(--g3))",
          }}
        />
        <div
          className="absolute -left-[3px] size-[7px] rounded-full"
          style={{
            top: "calc(var(--p) * 100%)",
            background: "var(--g3)",
            boxShadow: "0 0 14px 3px var(--g2)",
          }}
        />
      </div>
      {children}
    </div>
  );
}
