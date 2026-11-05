"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

function subscribe(notify: () => void) {
  const mo = new MutationObserver(notify);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}
const getTheme = (): Theme =>
  document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "light" as Theme);
  const setTheme = (t: Theme) => {
    document.documentElement.setAttribute("data-theme", t);
    try {
      localStorage.setItem("theme", t);
    } catch {
      /* storage may be blocked; the choice just won't persist */
    }
  };
  return { theme, setTheme, toggle: () => setTheme(theme === "dark" ? "light" : "dark") };
}

/** A physical DAY / NIGHT switch. */
export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, toggle } = useTheme();
  const night = theme === "dark";
  return (
    <button
      type="button"
      role="switch"
      aria-checked={night}
      onClick={toggle}
      className="group inline-flex items-center gap-2 rounded-full py-1 pl-1 pr-1 sm:pr-2"
      title={night ? "Switch to day mode" : "Switch to night mode"}
    >
      <span className="sr-only">Night mode</span>
      <span aria-hidden data-on={night} className="toggle toggle-sm toggle-night" />
      {!compact && (
        <span aria-hidden className="label hidden !text-[0.6rem] sm:inline">
          {night ? "Night" : "Day"}
        </span>
      )}
    </button>
  );
}
