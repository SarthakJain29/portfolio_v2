"use client";

import { useRef } from "react";

export type StickerItem = { title: string; detail?: string; color: string; shape: "circle" | "pill" | "badge"; rotate: number };

/**
 * Achievement stickers slapped on the case. Drag them around (fine pointers only, just for fun);
 * the content is plain text, so keyboard and screen-reader users lose nothing.
 */
export function Stickers({ items }: { items: StickerItem[] }) {
  const drag = useRef<{ el: HTMLElement; x: number; y: number; ox: number; oy: number } | null>(null);

  const down = (e: React.PointerEvent<HTMLLIElement>) => {
    if (e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = e.currentTarget;
    const [ox, oy] = (el.dataset.offset ?? "0,0").split(",").map(Number);
    drag.current = { el, x: e.clientX, y: e.clientY, ox: ox ?? 0, oy: oy ?? 0 };
    el.setPointerCapture(e.pointerId);
    el.dataset.dragging = "true";
  };
  const move = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const x = d.ox + e.clientX - d.x;
    const y = d.oy + e.clientY - d.y;
    d.el.style.translate = `${x}px ${y}px`;
    d.el.dataset.pending = `${x},${y}`;
  };
  const up = () => {
    const d = drag.current;
    if (!d) return;
    d.el.dataset.dragging = "false";
    if (d.el.dataset.pending) d.el.dataset.offset = d.el.dataset.pending;
    drag.current = null;
  };

  return (
    <ul className="flex flex-wrap items-center justify-center gap-5 sm:gap-7">
      {items.map((s) => (
        <li
          key={s.title}
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={up}
          style={{ rotate: `${s.rotate}deg`, background: s.color }}
          className={`sticker flex flex-col items-center justify-center text-center md:cursor-grab md:active:cursor-grabbing ${
            s.shape === "circle"
              ? "size-36 rounded-full p-4 sm:size-40"
              : s.shape === "badge"
                ? "w-56 rounded-2xl px-5 py-4"
                : "rounded-full px-6 py-3"
          }`}
        >
          <span className="text-lg font-extrabold leading-tight [font-stretch:80%]">{s.title}</span>
          {s.detail && <span className="mt-0.5 font-mono text-[0.62rem] font-semibold uppercase tracking-wider">{s.detail}</span>}
        </li>
      ))}
    </ul>
  );
}
