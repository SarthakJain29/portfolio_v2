"use client";

import { useEffect, useRef } from "react";

/** Thin gradient bar at the top showing how far down the page you are. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      el.style.setProperty("--p", max > 0 ? Math.min(1, window.scrollY / max).toFixed(4) : "0");
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
    <div aria-hidden className="no-print pointer-events-none fixed inset-x-0 top-0 z-[55] h-[2px]">
      <div
        ref={ref}
        className="scroll-progress h-full w-full"
        style={{ background: "linear-gradient(90deg, var(--g1), var(--g2), var(--g3))" }}
      />
    </div>
  );
}
