"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CHAOS_EVENT } from "@/lib/nav";
import { usePrefersReducedMotion } from "@/lib/use-media";

type ProviderId = "primary" | "secondary" | "offline";
const ORDER: ProviderId[] = ["primary", "secondary", "offline"];

/** Mirrors the real chain used across the projects on this site: Gemini → Groq → offline mock. */
const PROVIDERS: Record<ProviderId, { name: string; model: string }> = {
  primary: { name: "Primary", model: "Gemini" },
  secondary: { name: "Secondary", model: "Groq" },
  offline: { name: "Offline", model: "Mock" },
};

type Line = { text: string; tone: "cmd" | "ok" | "err" | "out" | "dim" };

export type ConsoleFacts = {
  name: string;
  role: string;
  company: string;
  location: string;
  top: string[];
};

/** What the LCD prints for a given set of switches. Pure, so SSR and client agree. */
function transcript(on: Record<ProviderId, boolean>, f: ConsoleFacts): { lines: Line[]; via: ProviderId | null } {
  const lines: Line[] = [{ text: '> ask "who is sarthak?"', tone: "cmd" }];
  let via: ProviderId | null = null;
  for (const id of ORDER) {
    const label = `→ ${PROVIDERS[id].name.toUpperCase()} (${PROVIDERS[id].model})`.padEnd(26, ".");
    if (!on[id]) {
      lines.push({ text: `${label} 503 ✗`, tone: "err" });
      continue;
    }
    lines.push({ text: `${label} 200 ✓`, tone: "ok" });
    via = id;
    break;
  }
  const top = f.top.join(" · ");
  if (via === "primary") {
    lines.push(
      { text: `${f.name}: ${f.role} at ${f.company}, ${f.location}.`, tone: "out" },
      { text: "Builds full-stack TypeScript apps and GenAI tools that keep working when the models don't.", tone: "out" },
      { text: `Top 3 → ${top}`, tone: "out" },
    );
  } else if (via === "secondary") {
    lines.push(
      { text: `[fallback] ${f.role} at ${f.company}. Ships reliable full-stack + GenAI software.`, tone: "out" },
      { text: `Start with: ${top}`, tone: "out" },
    );
  } else if (via === "offline") {
    lines.push(
      { text: `[cached] ${f.name.toUpperCase()} / ${f.role.toUpperCase()} / ${f.company.toUpperCase()}`, tone: "out" },
      { text: `[cached] TOP: ${top.toUpperCase()}`, tone: "out" },
    );
  } else {
    lines.push(
      { text: "✗ ALL PROVIDERS DOWN", tone: "err" },
      { text: "Degrading gracefully → plain view (same content, zero frills).", tone: "dim" },
    );
  }
  return { lines, via };
}

const ALL_ON: Record<ProviderId, boolean> = { primary: true, secondary: true, offline: true };

export function FallbackConsole({ facts }: { facts: ConsoleFacts }) {
  const reduced = usePrefersReducedMotion();
  const [on, setOn] = useState(ALL_ON);
  const [shown, setShown] = useState(Number.POSITIVE_INFINITY); // SSR: full transcript
  const [session, setSession] = useState({ answered: 0, fallbacks: 0 });
  const [wobble, setWobble] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const { lines, via, starts, total } = useMemo(() => {
    const t = transcript(on, facts);
    const offsets: number[] = [];
    let n = 0;
    for (const l of t.lines) {
      offsets.push(n);
      n += l.text.length;
    }
    return { ...t, starts: offsets, total: n };
  }, [on, facts]);

  // Stream the transcript character by character after each change.
  const replay = useCallback(
    (next: Record<ProviderId, boolean>) => {
      setOn(next);
      const t = transcript(next, facts);
      if (t.via) setSession((s) => ({ answered: s.answered + 1, fallbacks: s.fallbacks + (t.via === "primary" ? 0 : 1) }));
      window.clearInterval(timer.current);
      if (reduced) {
        setShown(Number.POSITIVE_INFINITY);
        return;
      }
      setShown(0);
      const len = t.lines.reduce((n, l) => n + l.text.length, 0);
      timer.current = window.setInterval(() => {
        setShown((c) => {
          if (c >= len) {
            window.clearInterval(timer.current);
            return Number.POSITIVE_INFINITY;
          }
          return c + 3;
        });
      }, 16);
    },
    [facts, reduced],
  );
  useEffect(() => () => window.clearInterval(timer.current), []);

  const flip = (id: ProviderId) => replay({ ...on, [id]: !on[id] });

  const allOff = ORDER.every((id) => !on[id]);
  const chaos = () => {
    // Restart the wobble animation without remounting the button (keeps keyboard focus).
    setWobble(false);
    requestAnimationFrame(() => setWobble(true));
    if (allOff) return replay(ALL_ON); // REBOOT
    const live = ORDER.filter((id) => on[id]);
    const victim = live[Math.floor(Math.random() * live.length)]!;
    replay({ ...on, [victim]: false });
  };

  // Palette / Konami can trigger a total outage.
  useEffect(() => {
    const kill = () => replay({ primary: false, secondary: false, offline: false });
    window.addEventListener(CHAOS_EVENT, kill);
    return () => window.removeEventListener(CHAOS_EVENT, kill);
  }, [replay]);

  // Slice the transcript to the streamed length.
  const visible = lines.map((l, i) => {
    const take = Math.max(0, Math.min(l.text.length, shown - (starts[i] ?? 0)));
    return { ...l, text: l.text.slice(0, take), done: take === l.text.length };
  });
  const streaming = shown < total;

  const tone: Record<Line["tone"], string> = {
    cmd: "",
    ok: "",
    err: "opacity-70 line-through decoration-1",
    out: "",
    dim: "text-lcd-dim",
  };

  const nodeState = (id: ProviderId) => {
    const idx = ORDER.indexOf(id);
    const viaIdx = via ? ORDER.indexOf(via) : ORDER.length;
    if (idx < viaIdx) return "err"; // tried and failed
    if (id === via) return "on"; // serving
    return "off"; // standby
  };

  return (
    <div className="grid gap-5 lg:grid-cols-12 lg:gap-6">
      {/* LCD */}
      <div className="lg:col-span-7">
        <div className="lcd p-4 sm:p-5" role="region" aria-label="Console display">
          <div className="mb-2 flex items-center justify-between text-[0.95rem] text-lcd-dim">
            <span>SJ-01 · SIMULATED MODEL ROUTE</span>
            <span aria-hidden>{via ? `VIA ${PROVIDERS[via].name.toUpperCase()}` : "NO ROUTE"}</span>
          </div>
          {/* Screen readers get the final state, announced once per change. */}
          <div className="sr-only" aria-live="polite">
            {via
              ? `Answered via ${PROVIDERS[via].name} (${PROVIDERS[via].model}). ${lines
                  .filter((l) => l.tone === "out")
                  .map((l) => l.text)
                  .join(" ")}`
              : "All providers are down. The console falls back to the plain view."}
          </div>
          <div aria-hidden className="min-h-[11.5rem] space-y-0.5 text-[1.15rem] leading-snug sm:min-h-[10rem] sm:text-[1.3rem]">
            {visible.map((l, i) => (
              <p key={i} className={`${tone[l.tone]} ${l.text.length === 0 ? "invisible" : ""}`}>
                <span className={!l.done && streaming && l.text.length > 0 ? "caret" : ""}>{l.text || "."}</span>
              </p>
            ))}
            {!streaming && <span className="caret" />}
          </div>
          {allOff && !streaming && (
            <Link href="/plain" className="key key-yellow relative z-10 mt-3 !min-h-10 !font-sans text-sm">
              Open plain view →
            </Link>
          )}
        </div>
        <p className="label mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
          <span>
            This session: {session.answered} answered · {session.fallbacks} via fallback
          </span>
          <span className="text-ink-3">Same idea runs every project below ↓</span>
        </p>
      </div>

      {/* Control panel */}
      <div className="well p-4 sm:p-5 lg:col-span-5">
        <div className="flex items-center justify-between">
          <p className="label">Provider route</p>
          <p className="label hidden sm:block">Flip a switch, or press chaos</p>
        </div>

        {/* Route diagram */}
        <div aria-hidden className="mt-3 flex items-center gap-1 font-mono text-[0.6rem] font-semibold uppercase tracking-wider">
          <span className="rounded-md bg-ink px-1.5 py-1 text-chassis">REQ</span>
          {ORDER.map((id) => {
            const st = nodeState(id);
            return (
              <span key={id} className="flex flex-1 items-center gap-1">
                <span
                  className={`h-0.5 flex-1 ${st === "on" ? "route-wire text-t-green" : st === "err" ? "bg-red/50" : "bg-line-2"}`}
                />
                <span
                  className={`rounded-md border px-1.5 py-1 ${
                    st === "on"
                      ? "border-green bg-green text-[#17171a]"
                      : st === "err"
                        ? "border-t-red text-t-red line-through"
                        : "border-line-2 text-ink-3"
                  }`}
                >
                  {PROVIDERS[id].model}
                </span>
              </span>
            );
          })}
        </div>

        {/* Switches */}
        <ul className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-1 sm:gap-2.5">
          {ORDER.map((id) => {
            const st = nodeState(id);
            return (
              <li key={id}>
                <button
                  type="button"
                  role="switch"
                  aria-checked={on[id]}
                  onClick={() => flip(id)}
                  className="flex w-full flex-col items-center gap-2 rounded-xl bg-chassis px-2 py-3 text-left shadow-[0_1px_0_var(--line-2)] transition-colors hover:bg-chassis-2 sm:flex-row sm:px-3 sm:py-2.5"
                >
                  <span className="led" data-state={st === "on" ? "on" : st === "err" ? "err" : on[id] ? "warn" : "off"} aria-hidden />
                  <span className="flex-1 text-center sm:text-left">
                    <span className="block text-sm font-semibold leading-tight">{PROVIDERS[id].name}</span>
                    <span className="label !text-[0.58rem]">{PROVIDERS[id].model}</span>
                  </span>
                  <span aria-hidden data-on={on[id]} className="toggle" />
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-4 flex items-center gap-4">
          <button
            type="button"
            onClick={chaos}
            onAnimationEnd={() => setWobble(false)}
            className={`grid size-20 shrink-0 place-items-center rounded-full text-sm font-extrabold uppercase tracking-wider text-white shadow-[inset_0_-6px_0_rgba(0,0,0,0.25),0_6px_0_rgba(0,0,0,0.25),0_12px_20px_-8px_rgba(0,0,0,0.5)] transition-transform active:translate-y-1 ${
              allOff ? "bg-green !text-[#17171a]" : "bg-red"
            } ${wobble ? "wobble" : ""}`}
          >
            {allOff ? "Reboot" : "Chaos"}
          </button>
          <p className="text-sm leading-snug text-ink-2">
            {allOff
              ? "Everything's down. A good system still answers: the plain view has every word of this site."
              : "Kill a random provider and watch the request route around it. It's what I build at work, and in every project here."}
          </p>
        </div>
      </div>
    </div>
  );
}
