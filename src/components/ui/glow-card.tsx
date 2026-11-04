"use client";

import { useRef } from "react";

/**
 * Card whose border and background glow follow the pointer.
 * Pure CSS does the painting (`.glow-card` in globals.css); this only feeds it --mx/--my.
 * Works as a plain card on touch devices.
 */
export function GlowCard({
  children,
  className = "",
  as: Tag = "div",
  radius,
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
  radius?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <Tag
      ref={ref as never}
      onPointerMove={onMove}
      className={`glow-card ${className}`}
      style={radius ? ({ "--r": radius } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
