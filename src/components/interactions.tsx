"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CommandPalette } from "./command-palette";
import { burstConfetti } from "@/lib/confetti";

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a",
];

/** Mounts global, non-visual behaviour: command palette, toast, Konami easter egg. */
export function Interactions() {
  const [toast, setToast] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const notify = useCallback((msg: string) => {
    setToast(msg);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(""), 3200);
  }, []);

  const fallback = useCallback(() => {
    notify("primary-model unavailable → falling back to confetti 🎉");
    burstConfetti();
  }, [notify]);

  useEffect(() => {
    let i = 0;
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === KONAMI[i]) {
        i++;
        if (i === KONAMI.length) {
          i = 0;
          fallback();
        }
      } else {
        i = key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fallback]);

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <>
      <CommandPalette notify={notify} confetti={fallback} />
      <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[70] flex justify-center px-4">
        {toast && (
          <p className="rounded-lg border border-line-strong bg-card-solid px-4 py-2.5 font-mono text-sm shadow-lg">{toast}</p>
        )}
      </div>
    </>
  );
}
