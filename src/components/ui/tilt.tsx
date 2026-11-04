"use client";

import { useRef } from "react";

/**
 * 3D tilt that follows the pointer, with a moving glare.
 * Fine pointers only; no-op on touch and under prefers-reduced-motion.
 */
export function Tilt({
  children,
  className = "",
  max = 7,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const allowed = () =>
    window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || !allowed()) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--ry", `${((px - 0.5) * 2 * max).toFixed(2)}deg`);
    el.style.setProperty("--rx", `${(-(py - 0.5) * 2 * max).toFixed(2)}deg`);
    el.style.setProperty("--gx", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--gy", `${(py * 100).toFixed(1)}%`);
  };
  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div style={{ perspective: "1100px" }} className={className}>
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        className="relative h-full transition-transform duration-200 ease-out will-change-transform"
        style={{ transform: "rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))", transformStyle: "preserve-3d" }}
      >
        {children}
        {/* Glare */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 [div:hover>&]:opacity-100"
          style={{
            background: "radial-gradient(360px circle at var(--gx,50%) var(--gy,50%), rgba(255,255,255,0.09), transparent 60%)",
          }}
        />
      </div>
    </div>
  );
}
