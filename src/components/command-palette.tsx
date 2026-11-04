"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { site } from "@/data/site";
import { OPEN_PALETTE_EVENT, sections } from "@/lib/nav";
import { useTheme } from "./theme-toggle";

type Cmd = { id: string; label: string; hint?: string; group: string; keywords?: string; run: () => void };

export function CommandPalette({
  notify,
  confetti,
}: {
  notify: (msg: string) => void;
  confetti: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const { theme, toggle } = useTheme();
  const uid = useId();
  const { profile } = site;

  const close = useCallback(() => dialogRef.current?.close(), []);

  const commands = useMemo<Cmd[]>(() => {
    const go = (id: string) => () => {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      history.replaceState(null, "", `#${id}`);
    };
    const ext = (href: string) => () => window.open(href, "_blank", "noopener,noreferrer");
    const list: Cmd[] = [
      ...sections.map((s) => ({ id: `go-${s.id}`, label: `Go to ${s.label}`, group: "Navigate", keywords: s.id, run: go(s.id) })),
      { id: "go-top", label: "Back to top", group: "Navigate", keywords: "home hero", run: go("top") },
      {
        id: "theme",
        label: `Switch to ${theme === "dark" ? "light" : "dark"} mode`,
        group: "Actions",
        keywords: "theme dark light appearance",
        run: toggle,
      },
      {
        id: "resume",
        label: "Download resume",
        hint: "PDF",
        group: "Actions",
        keywords: "cv",
        run: () => {
          const a = document.createElement("a");
          a.href = profile.resumeUrl;
          a.download = "";
          a.click();
        },
      },
      {
        id: "copy-email",
        label: "Copy email address",
        hint: profile.email,
        group: "Actions",
        keywords: "mail contact",
        run: async () => {
          try {
            await navigator.clipboard.writeText(profile.email);
            notify("Email copied to clipboard");
          } catch {
            notify(profile.email);
          }
        },
      },
      {
        id: "send-email",
        label: "Send an email",
        group: "Actions",
        keywords: "mail contact hire",
        run: () => (window.location.href = `mailto:${profile.email}`),
      },
      { id: "github", label: "Open GitHub", group: "Links", run: ext(profile.socials.github) },
      { id: "linkedin", label: "Open LinkedIn", group: "Links", run: ext(profile.socials.linkedin) },
      { id: "leetcode", label: "Open LeetCode", group: "Links", run: ext(profile.socials.leetcode) },
      ...site.projects.map((p) => ({
        id: `proj-${p.slug}`,
        label: p.github ? `Open ${p.title} on GitHub` : `Jump to projects: ${p.title}`,
        hint: p.status === "in-progress" ? "in progress" : undefined,
        group: "Projects",
        keywords: `${p.tagline} ${p.stack.join(" ")}`,
        run: p.github ? ext(p.github) : go("projects"),
      })),
      {
        id: "sudo",
        label: "sudo hire sarthak",
        hint: "easter egg",
        group: "Fun",
        keywords: "hire recruit job",
        run: () => {
          confetti();
          notify("[sudo] permission granted. Opening your mail client…");
          setTimeout(() => {
            window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent("Let's work together")}`;
          }, 900);
        },
      },
      { id: "fallback", label: "Trigger a model fallback", hint: "easter egg", group: "Fun", keywords: "confetti party 503", run: confetti },
    ];
    return list;
  }, [theme, toggle, profile, notify, confetti]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    const terms = q.split(/\s+/);
    return commands.filter((c) => {
      const hay = `${c.label} ${c.group} ${c.keywords ?? ""} ${c.hint ?? ""}`.toLowerCase();
      return terms.every((t) => hay.includes(t));
    });
  }, [commands, query]);

  const safeIndex = Math.min(index, Math.max(results.length - 1, 0));

  const openPalette = useCallback(() => {
    const d = dialogRef.current;
    if (!d || d.open) return;
    setQuery("");
    setIndex(0);
    d.showModal();
    setOpen(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  }, []);

  // Global shortcuts: ⌘/Ctrl+K, "/" and the header button's custom event.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      const typing = !!t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (dialogRef.current?.open) close();
        else openPalette();
      } else if (e.key === "/" && !typing && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        openPalette();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, openPalette);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, openPalette);
    };
  }, [openPalette, close]);

  // Keep the active option scrolled into view.
  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" });
  }, [safeIndex, results]);

  const run = (c: Cmd | undefined) => {
    if (!c) return;
    close();
    // Let the dialog release focus first so scroll/links behave normally.
    setTimeout(c.run, 0);
  };

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((safeIndex + 1) % Math.max(results.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((safeIndex - 1 + results.length) % Math.max(results.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(results[safeIndex]);
    } else if (e.key === "Home") {
      e.preventDefault();
      setIndex(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setIndex(Math.max(results.length - 1, 0));
    }
  };

  let lastGroup = "";

  return (
    <dialog
      ref={dialogRef}
      aria-label="Command menu"
      onClose={() => setOpen(false)}
      onClick={(e) => {
        if (e.target === dialogRef.current) close(); // backdrop click
      }}
      className="palette mx-auto mt-[10vh] w-[min(36rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-line bg-card p-0 text-fg shadow-2xl"
    >
      <div className="flex items-center gap-3 border-b border-line px-4">
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIndex(0);
          }}
          onKeyDown={onInputKey}
          role="combobox"
          aria-expanded={open}
          aria-controls={`${uid}-list`}
          aria-activedescendant={results[safeIndex] ? `${uid}-${results[safeIndex].id}` : undefined}
          aria-label="Search commands"
          placeholder="Type a command or search…"
          autoComplete="off"
          spellCheck={false}
          className="h-12 w-full bg-transparent text-[15px] outline-none focus-visible:outline-none placeholder:text-subtle"
        />
        <kbd className="shrink-0 rounded border border-line px-1.5 py-0.5 font-mono text-[11px] text-subtle">esc</kbd>
      </div>
      <ul id={`${uid}-list`} ref={listRef} role="listbox" aria-label="Commands" className="max-h-[min(22rem,55vh)] overflow-y-auto p-2">
        {results.length === 0 && (
          <li role="presentation" className="px-3 py-6 text-center text-sm text-muted">
            No matches. (Try &quot;sudo hire sarthak&quot;.)
          </li>
        )}
        {results.map((c, i) => {
          const showGroup = c.group !== lastGroup;
          lastGroup = c.group;
          return (
            <li key={c.id} role="presentation">
              {showGroup && (
                <p className="px-3 pb-1 pt-3 font-mono text-[11px] uppercase tracking-wider text-subtle">{c.group}</p>
              )}
              <div
                id={`${uid}-${c.id}`}
                role="option"
                aria-selected={i === safeIndex}
                onMouseMove={() => setIndex(i)}
                onClick={() => run(c)}
                className={`flex cursor-pointer items-center justify-between gap-3 rounded-md px-3 py-2 text-sm ${
                  i === safeIndex ? "bg-accent-soft text-accent" : "text-fg"
                }`}
              >
                <span>{c.label}</span>
                {c.hint && <span className="truncate font-mono text-xs text-subtle">{c.hint}</span>}
              </div>
            </li>
          );
        })}
      </ul>
      <div className="flex items-center gap-4 border-t border-line px-4 py-2 font-mono text-[11px] text-subtle">
        <span>↑↓ navigate</span>
        <span>↵ select</span>
        <span className="ml-auto hidden sm:inline">⌘K to toggle</span>
      </div>
    </dialog>
  );
}
