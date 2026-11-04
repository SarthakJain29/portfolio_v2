"use client";

import { useEffect, useRef } from "react";
import { Meteors } from "./ui/meteors";

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
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora aurora-a" />
        <div className="aurora aurora-b" />
        <div className="hero-beam" />
        <div className="hero-grid absolute inset-0" />
        <div className="hero-spot absolute inset-0" />
        <Meteors />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
      </div>
      {children}
    </div>
  );
}
