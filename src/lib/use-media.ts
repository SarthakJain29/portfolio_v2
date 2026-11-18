"use client";

import { useSyncExternalStore } from "react";

/** Subscribe to a CSS media query without effects/setState. Server value is `fallback`. */
export function useMedia(query: string, fallback = false): boolean {
  return useSyncExternalStore(
    (notify) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", notify);
      return () => mq.removeEventListener("change", notify);
    },
    () => window.matchMedia(query).matches,
    () => fallback,
  );
}

export const usePrefersReducedMotion = () => useMedia("(prefers-reduced-motion: reduce)");
