"use client";

import { useId, useRef } from "react";

/**
 * Giant outlined wordmark; a rainbow-gradient copy is revealed under the pointer.
 * Decorative (aria-hidden). On touch it simply rests as a subtle outline.
 */
export function Wordmark({ text }: { text: string }) {
  const uid = useId().replace(/:/g, "");
  const svg = useRef<SVGSVGElement>(null);
  const mask = useRef<SVGCircleElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const s = svg.current;
    const m = mask.current;
    if (!s || !m) return;
    const r = s.getBoundingClientRect();
    m.setAttribute("cx", String(((e.clientX - r.left) / r.width) * 1200));
    m.setAttribute("cy", String(((e.clientY - r.top) / r.height) * 260));
    m.setAttribute("r", "170");
  };
  const onLeave = () => mask.current?.setAttribute("r", "0");

  const common = {
    x: "50%",
    y: "62%",
    textAnchor: "middle" as const,
    dominantBaseline: "middle" as const,
    fontSize: 200,
    fontWeight: 700,
    letterSpacing: -6,
    textLength: 1120,
    lengthAdjust: "spacingAndGlyphs" as const,
    style: { fontFamily: "var(--font-geist-sans), sans-serif" },
  };

  return (
    <svg
      ref={svg}
      viewBox="0 0 1200 260"
      aria-hidden
      focusable="false"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="w-full select-none"
    >
      <defs>
        <linearGradient id={`${uid}-g`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1200" y2="0">
          <stop offset="0%" stopColor="var(--g1)" />
          <stop offset="50%" stopColor="var(--g2)" />
          <stop offset="100%" stopColor="var(--g3)" />
        </linearGradient>
        <radialGradient id={`${uid}-r`}>
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor="#000" />
        </radialGradient>
        <mask id={`${uid}-m`}>
          <circle ref={mask} cx="600" cy="130" r="0" fill={`url(#${uid}-r)`} style={{ transition: "r .3s ease" }} />
        </mask>
      </defs>
      <text {...common} fill="none" stroke="var(--line-strong)" strokeWidth="1.5">
        {text}
      </text>
      <text {...common} fill="none" stroke={`url(#${uid}-g)`} strokeWidth="2.5" mask={`url(#${uid}-m)`}>
        {text}
      </text>
    </svg>
  );
}
