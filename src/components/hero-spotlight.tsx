"use client";

import { useEffect, useRef } from "react";

/**
 * Soft accent glow that follows the pointer inside the hero.
 * Only active for fine pointers; hidden entirely under prefers-reduced-motion (CSS).
 */
export function HeroSpotlight({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    };
    el.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div ref={ref} className={`relative isolate overflow-hidden ${className}`}>
      <div aria-hidden className="hero-spot pointer-events-none absolute inset-0 -z-10" />
      <div aria-hidden className="hero-grid pointer-events-none absolute inset-0 -z-10" />
      {children}
    </div>
  );
}
