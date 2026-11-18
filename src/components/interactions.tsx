"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CommandPalette } from "./command-palette";
import { burstConfetti } from "@/lib/confetti";
import { CHAOS_EVENT, sections } from "@/lib/nav";

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a",
];

/** Mounts global behaviour: command palette, toast, digit-key channels, Konami easter egg. */
export function Interactions() {
  const [toast, setToast] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const notify = useCallback((msg: string) => {
    setToast(msg);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(""), 3200);
  }, []);

  const fallback = useCallback(() => {
    notify("All providers down → falling back to confetti 🎉");
    burstConfetti();
  }, [notify]);

  /** Konami / palette "total outage": every provider fails, then confetti. */
  const outage = useCallback(() => {
    window.dispatchEvent(new Event(CHAOS_EVENT));
    document.getElementById("console")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
    fallback();
  }, [fallback]);

  useEffect(() => {
    let i = 0;
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (document.querySelector("dialog[open]")) return;
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      // Hardware channel keys: 1–6 jump to a section.
      const ch = sections.find((s) => s.key === key);
      if (ch && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const el = document.getElementById(ch.id);
        if (el) {
          el.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
          history.replaceState(null, "", `#${ch.id}`);
        }
        i = 0;
        return;
      }
      if (key === KONAMI[i]) {
        i++;
        if (i === KONAMI.length) {
          i = 0;
          outage();
        }
      } else {
        i = key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [outage]);

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <>
      <CommandPalette notify={notify} confetti={fallback} outage={outage} />
      <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-24 z-[70] flex justify-center px-4 md:bottom-6">
        {toast && <p className="lcd px-4 py-2.5 text-lg shadow-lg">{toast}</p>}
      </div>
    </>
  );
}
