"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/use-media";

type Kind = "cmd" | "err" | "info" | "ok";
type Line = { kind: Kind; text: string; typed?: boolean; speed?: number; pause: number };

/** A tiny nod to my day job: an LLM call that fails over to a second model. */
const LINES: Line[] = [
  { kind: "cmd", text: 'ask primary-model "who is sarthak?"', typed: true, speed: 1, pause: 8 },
  { kind: "err", text: "503 · primary-model unavailable", pause: 10 },
  { kind: "info", text: "falling back to secondary-model…", pause: 12 },
  { kind: "ok", text: "200 · Full-stack engineer who cares about APIs and LLM reliability.", typed: true, speed: 2, pause: 0 },
];

const prefix: Record<Kind, string> = { cmd: "$", err: "✗", info: "↻", ok: "✓" };
const color: Record<Kind, string> = {
  cmd: "text-fg",
  err: "text-err",
  info: "text-muted",
  ok: "text-ok",
};

// Pre-compute when each line starts and how many ticks it takes.
const timeline = (() => {
  let t = 0;
  return LINES.map((l) => {
    const duration = l.typed ? Math.ceil(l.text.length / (l.speed ?? 1)) : 1;
    const start = t;
    t += duration + l.pause;
    return { start, duration };
  });
})();
const TOTAL = timeline.reduce((m, x) => Math.max(m, x.start + x.duration), 0);
const TICK_MS = 28;

export function HeroTerminal() {
  const reduced = usePrefersReducedMotion();
  const [tick, setTick] = useState(0);
  const [run, setRun] = useState(0); // bump to replay

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setTick((t) => {
        if (t >= TOTAL) {
          clearInterval(id);
          return t;
        }
        return t + 1;
      });
    }, TICK_MS);
    return () => clearInterval(id);
  }, [reduced, run]);

  const t = reduced ? TOTAL : tick;
  const done = t >= TOTAL;

  return (
    <div className="no-print">
      {/* Screen readers get the outcome, not the animation. */}
      <p className="sr-only">
        Fun fact: my API calls fail over gracefully. Result: full-stack engineer who cares about APIs and LLM reliability.
      </p>
      <div
        aria-hidden
        className="relative overflow-hidden rounded-2xl border border-line-strong bg-card-solid/85 font-mono text-[13px] leading-relaxed shadow-[0_30px_80px_-30px_var(--glow)] backdrop-blur sm:text-sm lg:text-[15px]"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--g2)] to-transparent opacity-70" />
        <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
            <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
            <span className="size-2.5 rounded-full bg-[#28c840]/80" />
          </div>
          <span className="text-xs text-subtle">reliability.sh</span>
          <span className="w-10" />
        </div>
        <div className="space-y-2 px-5 py-6 sm:px-7 sm:py-8">
          {LINES.map((l, i) => {
            const { start, duration } = timeline[i]!;
            const local = t - start;
            const visible = local >= 0;
            const chars = !visible
              ? 0
              : l.typed
                ? Math.min(l.text.length, Math.floor(local * (l.speed ?? 1)))
                : l.text.length;
            const typing = visible && l.typed && local < duration;
            const isLastShown = visible && (i === LINES.length - 1 || t < timeline[i + 1]!.start);
            return (
              <div key={i} className={`${visible ? "" : "invisible"} ${color[l.kind]} min-h-[1.5em] break-words`}>
                <span className="mr-2 select-none text-subtle">{prefix[l.kind]}</span>
                <span className={typing || (isLastShown && !done) ? "caret" : ""}>{l.text.slice(0, chars)}</span>
              </div>
            );
          })}
        </div>
      </div>
      {!reduced && (
        <button
          type="button"
          onClick={() => {
            setTick(0);
            setRun((r) => r + 1);
          }}
          disabled={!done}
          className="mt-2 font-mono text-xs text-subtle transition-colors hover:text-fg disabled:opacity-40"
        >
          ↻ replay
        </button>
      )}
    </div>
  );
}
