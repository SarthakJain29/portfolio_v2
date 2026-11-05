"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/data/types";
import { projectHash } from "@/lib/nav";
import { ArrowUpRight, GithubIcon } from "../icons";
import { ChainLine, StatusLamp } from "./cartridge";
import { DemoVideo } from "./demo-video";

type Dims = Record<string, { w: number; h: number }>;
const isDev = process.env.NODE_ENV !== "production";
const HASH_PREFIX = "#project-";

/**
 * The cartridge inspector: one dialog for every project, opened by `#project-<slug>`.
 * Cartridges are plain links to /plain#slug (works without JS); this intercepts them.
 */
export function Inspector({ projects, media }: { projects: Project[]; media: Dims }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [slug, setSlug] = useState<string | null>(null);
  const [shot, setShot] = useState(0);
  const pushedRef = useRef(false); // did *we* add the history entry? then Back closes it
  const dragRef = useRef<{ y: number; dy: number } | null>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  const p = projects.find((x) => x.slug === slug) ?? null;
  const index = p ? projects.indexOf(p) : -1;

  // Hash → open/close.
  useEffect(() => {
    const sync = () => {
      const h = window.location.hash;
      const next = h.startsWith(HASH_PREFIX) ? h.slice(HASH_PREFIX.length) : null;
      if (next && projects.some((x) => x.slug === next)) {
        setSlug(next);
        setShot(0);
      } else {
        setSlug(null);
      }
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [projects]);

  // Intercept cartridge clicks (progressive enhancement over the /plain#slug links).
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[data-project]");
      if (!a) return;
      e.preventDefault();
      pushedRef.current = true;
      window.location.hash = projectHash(a.dataset.project!);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Keep the <dialog> in sync with state.
  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (p && !d.open) d.showModal();
    if (!p && d.open) d.close();
  }, [p]);

  const close = useCallback(() => {
    if (pushedRef.current && window.history.length > 1) {
      pushedRef.current = false;
      window.history.back(); // pops our #project-… entry → hashchange closes the dialog
    } else {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
      setSlug(null);
    }
  }, []);

  const go = (delta: number) => {
    const next = projects[(index + delta + projects.length) % projects.length];
    if (next) window.history.replaceState(null, "", projectHash(next.slug));
    if (next) {
      setSlug(next.slug);
      setShot(0);
    }
  };

  // Mobile bottom sheet: drag the handle down to dismiss.
  const onHandleDown = (e: React.PointerEvent) => {
    dragRef.current = { y: e.clientY, dy: 0 };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onHandleMove = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d || !sheetRef.current) return;
    d.dy = Math.max(0, e.clientY - d.y);
    sheetRef.current.style.transform = `translateY(${d.dy}px)`;
  };
  const onHandleUp = () => {
    const d = dragRef.current;
    dragRef.current = null;
    if (sheetRef.current) sheetRef.current.style.transform = "";
    if (d && d.dy > 110) close();
  };

  const current = p?.media[shot];

  return (
    <dialog
      ref={dialog}
      aria-labelledby={p ? `insp-${p.slug}` : undefined}
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onClick={(e) => {
        if (e.target === dialog.current) close(); // backdrop
      }}
      className="inspector m-0 mt-auto h-[92svh] max-h-none w-full max-w-none overflow-visible bg-transparent p-0 text-ink md:m-auto md:h-[min(88vh,860px)] md:w-[min(1120px,calc(100vw-3rem))]"
    >
      {p && (
        <div ref={sheetRef} className="chassis flex h-full flex-col overflow-hidden !rounded-b-none md:!rounded-[28px]">
          {/* Header strip */}
          <div className={`c-${p.color} relative flex shrink-0 items-center gap-3 bg-[var(--c)] px-4 py-2.5 text-[#17171a]`}>
            <button
              type="button"
              aria-label="Drag down to close"
              onPointerDown={onHandleDown}
              onPointerMove={onHandleMove}
              onPointerUp={onHandleUp}
              onPointerCancel={onHandleUp}
              className="absolute left-1/2 top-1.5 h-1.5 w-12 -translate-x-1/2 touch-none rounded-full bg-black/25 md:hidden"
            />
            <span className="font-mono text-[0.62rem] font-bold uppercase tracking-widest">
              Cart {String(index + 1).padStart(2, "0")} · {p.label}
            </span>
            <span className="ml-auto flex items-center gap-1.5">
              <button type="button" onClick={() => go(-1)} className="key !min-h-8 !rounded-lg !px-2 !py-0.5 text-xs" aria-label="Previous project">
                ◂
              </button>
              <button type="button" onClick={() => go(1)} className="key !min-h-8 !rounded-lg !px-2 !py-0.5 text-xs" aria-label="Next project">
                ▸
              </button>
              <button type="button" onClick={close} className="key key-ink !min-h-8 !rounded-lg !px-2.5 !py-0.5 text-xs">
                Eject <span className="hidden font-mono text-[0.6rem] opacity-70 sm:inline">esc</span>
              </button>
            </span>
          </div>

          <div className="grid min-h-0 flex-1 overflow-y-auto md:grid-cols-12">
            {/* Gallery */}
            <div className="p-4 sm:p-6 md:col-span-7 md:overflow-y-auto md:border-r md:border-line">
              {p.video && <DemoVideo key={p.video.src} v={p.video} width={media[p.video.poster]?.w ?? 1280} height={media[p.video.poster]?.h ?? 720} />}

              {current && (
                <figure className={`m-0 ${p.video ? "mt-5" : ""}`}>
                  <div
                    className={`grid place-items-center overflow-hidden rounded-xl ${
                      current.kind === "desktop" ? "bg-well" : "bg-[#17171a] p-4"
                    }`}
                  >
                    <Image
                      key={current.src}
                      src={current.src}
                      alt={current.alt}
                      width={media[current.src]?.w ?? 1600}
                      height={media[current.src]?.h ?? 1000}
                      sizes={current.kind === "desktop" ? "(min-width: 768px) 640px, 100vw" : "320px"}
                      className={current.kind === "desktop" ? "h-auto w-full" : "h-auto max-h-[60vh] w-auto rounded-lg"}
                    />
                  </div>
                  {(current.caption || p.mediaNote) && (
                    <figcaption className="mt-2 text-xs leading-snug text-ink-3">{current.caption ?? p.mediaNote}</figcaption>
                  )}
                </figure>
              )}

              {p.media.length > 1 && (
                <ul className="mt-3 flex gap-2 overflow-x-auto pb-1" aria-label="Screenshots">
                  {p.media.map((m, i) => (
                    <li key={m.src} className="shrink-0">
                      <button
                        type="button"
                        onClick={() => setShot(i)}
                        aria-pressed={i === shot}
                        aria-label={`Show screenshot ${i + 1}: ${m.alt}`}
                        className={`block overflow-hidden rounded-lg border-2 transition-colors ${
                          i === shot ? "border-ink" : "border-transparent opacity-70 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={m.src}
                          alt=""
                          width={media[m.src]?.w ?? 1600}
                          height={media[m.src]?.h ?? 1000}
                          sizes="120px"
                          className={`h-16 object-cover object-top ${m.kind === "desktop" ? "w-24" : "w-10"}`}
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Spec sheet */}
            <div className="p-4 pb-10 sm:p-6 md:col-span-5 md:overflow-y-auto">
              <div className="flex items-center gap-2">
                <StatusLamp status={p.status} />
                {p.featured && <span className="label">★ Featured</span>}
              </div>
              <h2 id={`insp-${p.slug}`} className="mt-3 text-4xl font-extrabold leading-[0.95] tracking-tight [font-stretch:78%] sm:text-5xl">
                {p.title}
              </h2>
              {p.repoName && <p className="label mt-1">repo: {p.repoName}</p>}
              <p className="mt-3 text-lg font-semibold leading-snug">{p.tagline}</p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-2">{p.description}</p>

              {p.facts && (
                <dl className="mt-5 grid grid-cols-2 gap-2">
                  {p.facts.map((f) => (
                    <div key={f.label} className="well flex flex-col-reverse p-3">
                      <dt className="mt-1 text-xs leading-snug text-ink-2">{f.label}</dt>
                      <dd className="text-2xl font-extrabold tracking-tight [font-stretch:80%]">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              )}

              <h3 className="label mt-6">The interesting engineering</h3>
              <ul className="mt-2 space-y-2.5 text-[0.92rem] leading-relaxed">
                {p.highlights.map((h) => (
                  <li key={h} className="flex gap-2.5">
                    <span aria-hidden className={`c-${p.color} mt-2 size-2 shrink-0 rounded-sm bg-[var(--c)]`} />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <h3 className="label mt-6">Graceful fallback</h3>
              <ul className="mt-2 space-y-2">
                {p.fallbacks.map((f) => (
                  <li key={f.label} className="well px-3 py-2">
                    <span className="block text-xs font-semibold text-ink-2">{f.label}</span>
                    <ChainLine chain={f.chain} />
                  </li>
                ))}
              </ul>

              <h3 className="label mt-6">Stack</h3>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <li key={s} className="rounded-md border border-line-2 bg-chassis px-2 py-0.5 font-mono text-[0.68rem]">
                    {s}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2.5">
                {p.github ? (
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="key key-ink text-sm">
                    <GithubIcon /> Code <ArrowUpRight />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                ) : null}
                {p.live ? (
                  <a href={p.live} target="_blank" rel="noopener noreferrer" className="key key-orange text-sm">
                    Live demo <ArrowUpRight />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                ) : isDev ? (
                  <span className="rounded-lg border-2 border-dashed border-t-red px-3 py-2 font-mono text-xs text-t-red">
                    TODO(live): add live URL in src/data/site.ts
                  </span>
                ) : null}
              </div>
              {p.credit && (
                <p className="mt-4 text-xs text-ink-3">
                  <a href={p.credit.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-ink">
                    {p.credit.label}
                  </a>
                </p>
              )}
              {p.mediaNote && <p className="mt-4 text-xs leading-snug text-ink-3">{p.mediaNote}</p>}
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
