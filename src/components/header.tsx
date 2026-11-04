"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { openPalette, sections } from "@/lib/nav";
import { SearchIcon } from "./icons";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line/70 bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#top" className="font-mono text-sm font-medium tracking-tight" aria-label={`${site.profile.name} — back to top`}>
          sarthak<span className="text-accent">.</span>dev
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={active === s.id ? "true" : undefined}
                  className={`rounded-md px-3 py-1.5 text-sm transition-colors hover:text-fg ${
                    active === s.id ? "text-fg" : "text-muted"
                  }`}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openPalette}
            aria-label="Menu — open command palette"
            aria-keyshortcuts="Control+K Meta+K"
            className="inline-flex h-9 items-center gap-2 rounded-md border border-line px-2.5 text-sm text-muted transition-colors hover:text-fg"
          >
            <SearchIcon />
            <span className="hidden sm:inline">Menu</span>
            <kbd className="hidden rounded border border-line px-1.5 font-mono text-[11px] sm:inline">⌘K</kbd>
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
