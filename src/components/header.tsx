"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { openPalette, sections } from "@/lib/nav";
import { SearchIcon } from "./icons";
import { ThemeToggle } from "./theme-toggle";

/** Floating glass pill navigation with a sliding active indicator. */
export function Header() {
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Which section is in view.
  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      if (window.scrollY < 200) setActive("");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Slide the pill under the active link.
  const measure = useCallback(() => {
    const item = listRef.current?.querySelector<HTMLElement>('a[aria-current="true"]')?.parentElement;
    setPill(item ? { x: item.offsetLeft, w: item.offsetWidth } : null);
  }, []);
  useLayoutEffect(() => {
    const id = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", measure);
    };
  }, [active, measure]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center px-3 pt-3 sm:pt-4">
      <div
        className={`pointer-events-auto flex w-full max-w-3xl items-center justify-between gap-2 rounded-full border px-2 py-1.5 backdrop-blur-xl transition-[background,border-color,box-shadow] duration-300 sm:w-auto sm:max-w-none sm:justify-center sm:gap-1 ${
          scrolled
            ? "border-line-strong bg-bg/75 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)]"
            : "border-line bg-bg/40"
        }`}
      >
        <a
          href="#top"
          className="rounded-full px-3 py-1.5 font-mono text-sm font-medium tracking-tight"
          aria-label="sarthak.dev, back to top"
        >
          sarthak<span className="text-accent">.</span>dev
        </a>

        <nav aria-label="Primary" className="relative hidden md:block">
          <ul ref={listRef} className="relative flex items-center">
            {pill && (
              <li
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 rounded-full bg-accent-soft ring-1 ring-line-strong transition-[transform,width] duration-300 ease-out"
                style={{ width: pill.w, transform: `translateX(${pill.x}px)` }}
              />
            )}
            {sections.map((s) => (
              <li key={s.id} className="relative">
                <a
                  href={`#${s.id}`}
                  aria-current={active === s.id ? "true" : undefined}
                  className={`block rounded-full px-3.5 py-1.5 text-sm transition-colors hover:text-fg ${
                    active === s.id ? "text-fg" : "text-muted"
                  }`}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={openPalette}
            aria-label="Menu — open command palette"
            aria-keyshortcuts="Control+K Meta+K"
            className="inline-flex h-9 items-center gap-2 rounded-full border border-line bg-card px-3 text-sm text-muted transition-colors hover:border-line-strong hover:text-fg"
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
