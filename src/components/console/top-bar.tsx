"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { openPalette, sections } from "@/lib/nav";
import { SearchIcon } from "../icons";
import { ThemeToggle } from "../theme-toggle";

/** Which channel (section) is in view. */
function useActiveSection() {
  const [active, setActive] = useState<string>("console");
  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

/** The "plain view" is a link styled as a switch: graceful fallback to a plain résumé. */
function PlainSwitch() {
  return (
    <Link
      href="/plain"
      className="inline-flex items-center gap-2 rounded-full py-1 pl-1 pr-1 sm:pr-2"
      title="Plain view: the same content as a simple text page"
    >
      <span aria-hidden data-on="false" className="toggle toggle-sm" />
      <span className="label !text-[0.6rem]">
        Plain<span className="sr-only"> view (simple text version of this site)</span>
      </span>
    </Link>
  );
}

export function TopBar() {
  const active = useActiveSection();
  return (
    <>
      {/* Top strip */}
      <header className="no-print fixed inset-x-0 top-0 z-40 px-2 pt-2 sm:px-4 sm:pt-3">
        <div className="chassis mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 !rounded-2xl px-2 sm:px-3">
          <a href="#console" className="flex items-center gap-2 rounded-xl px-1.5 py-1" aria-label="Sarthak Jain: back to the console">
            <span aria-hidden className="grid size-8 place-items-center rounded-lg bg-orange font-mono text-[0.7rem] font-bold text-[#17171a]">
              SJ
            </span>
            <span className="hidden font-semibold tracking-tight [font-stretch:85%] lg:inline">Sarthak Jain</span>
            <span aria-hidden className="label hidden !text-[0.58rem] xl:inline">
              Model SJ-01
            </span>
          </a>

          <nav aria-label="Channels" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {sections.map((s) => {
                const on = active === s.id;
                return (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      aria-current={on ? "true" : undefined}
                      className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors ${
                        on ? "bg-ink text-chassis" : "text-ink-2 hover:bg-chassis-2 hover:text-ink"
                      }`}
                    >
                      <span aria-hidden className={`font-mono text-[0.62rem] ${on ? "text-yellow" : "text-ink-3"}`}>
                        {s.key}
                      </span>
                      {s.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            <PlainSwitch />
            <ThemeToggle />
            <button
              type="button"
              onClick={openPalette}
              aria-keyshortcuts="Control+K Meta+K"
              className="key !min-h-9 !rounded-lg !px-2.5 !py-1 text-sm"
            >
              <SearchIcon />
              <kbd className="hidden font-mono text-[0.65rem] sm:inline">⌘K</kbd>
              <span className="sr-only">Open command palette</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile: channels move to a thumb-reachable bottom tab bar */}
      <nav aria-label="Channels" className="no-print fixed inset-x-0 bottom-0 z-40 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] md:hidden">
        <ul className="chassis grid grid-cols-6 !rounded-2xl p-1.5">
          {sections.map((s) => {
            const on = active === s.id;
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={on ? "true" : undefined}
                  className={`flex min-h-12 flex-col items-center justify-center rounded-xl text-[0.62rem] font-semibold leading-tight ${
                    on ? "bg-ink text-chassis" : "text-ink-2"
                  }`}
                >
                  <span aria-hidden className={`font-mono text-[0.7rem] ${on ? "text-yellow" : "text-ink-3"}`}>
                    {s.key}
                  </span>
                  {s.label === "Experience" ? "Work" : s.label === "Education" ? "School" : s.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
