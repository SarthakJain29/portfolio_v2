import Image from "next/image";
import type { Project } from "@/data/types";
import { ArrowUpRight, GithubIcon } from "./icons";
import { GlowCard } from "./ui/glow-card";

// Visible only in `npm run dev`, so missing links are impossible to miss while editing.
const isDev = process.env.NODE_ENV !== "production";

function Links({ p }: { p: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
      {p.github ? (
        <a
          href={p.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-card px-3.5 py-1.5 font-medium transition-colors hover:border-accent hover:text-accent"
        >
          <GithubIcon /> Code
          <ArrowUpRight />
          <span className="sr-only"> — {p.title} repository (opens in a new tab)</span>
        </a>
      ) : isDev ? (
        <span className="rounded-full border border-dashed border-err/60 px-3 py-1 font-mono text-xs text-err">
          TODO: add GitHub link in src/data/site.ts
        </span>
      ) : (
        <span className="text-xs text-subtle">Repository link coming soon</span>
      )}
      {p.live && (
        <a
          href={p.live}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-medium text-muted transition-colors hover:text-accent"
        >
          Live demo <ArrowUpRight />
          <span className="sr-only"> for {p.title} (opens in a new tab)</span>
        </a>
      )}
    </div>
  );
}

function StatusBadge({ inProgress }: { inProgress: boolean }) {
  if (!inProgress) return null;
  return (
    <span className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full border border-line-strong bg-bg/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-fg backdrop-blur">
      <span className="relative flex size-1.5">
        <span className="absolute inset-0 animate-[pulse-ring_2s_ease-out_infinite] rounded-full bg-amber-400" />
        <span className="relative size-1.5 rounded-full bg-amber-400" />
      </span>
      In progress
    </span>
  );
}

export function ProjectCard({
  p,
  featured = false,
  compact = false,
}: {
  p: Project;
  featured?: boolean;
  compact?: boolean;
}) {
  const inProgress = p.status === "in-progress";
  return (
    <GlowCard as="article" className="group flex h-full flex-col overflow-hidden">
      <div
        className={`relative shrink-0 overflow-hidden border-line ${
          featured ? "aspect-[16/10] border-b sm:aspect-[16/7] lg:aspect-[21/8]" : "aspect-[16/9] border-b"
        }`}
      >
        <Image
          src={p.image}
          alt={p.imageAlt}
          width={1200}
          height={750}
          sizes={featured ? "(min-width: 1024px) 1100px, 100vw" : compact ? "320px" : "(min-width: 1024px) 560px, (min-width: 768px) 50vw, 100vw"}
          unoptimized={p.image.endsWith(".svg")}
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/50 via-transparent to-transparent" />
        <StatusBadge inProgress={inProgress} />
      </div>

      <div className={`flex flex-1 flex-col ${featured ? "gap-8 p-6 sm:p-9 md:grid md:grid-cols-2 md:gap-x-12" : "p-5 sm:p-6"}`}>
        <div className="flex flex-col">
          {featured && <p className="eyebrow mb-4">Featured</p>}
          <h3 className={`font-semibold tracking-tight ${featured ? "text-3xl sm:text-4xl" : "text-xl"}`}>{p.title}</h3>
          <p className={`mt-1.5 ${featured ? "text-lg text-fg/90" : "text-sm text-fg/90"}`}>{p.tagline}</p>
          <p className={`mt-3 text-sm leading-relaxed text-muted ${compact ? "line-clamp-4" : ""}`}>{p.description}</p>

          {p.highlights && !featured && (
            <details className="group/d mt-4 text-sm">
              <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 font-mono text-xs text-subtle transition-colors hover:text-fg [&::-webkit-details-marker]:hidden">
                <span aria-hidden className="inline-block transition-transform group-open/d:rotate-90">▸</span> Highlights
              </summary>
              <ul className="mt-3 space-y-1.5 text-muted">
                {p.highlights.map((h) => (
                  <li key={h} className="flex gap-3">
                    <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                    {h}
                  </li>
                ))}
              </ul>
            </details>
          )}

          {p.stack.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
              {p.stack.map((s) => (
                <li key={s} className="chip">
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={`flex flex-col ${featured ? "md:justify-between" : "mt-auto pt-6"}`}>
          {featured && p.highlights && (
            <ul className="space-y-3 text-sm text-muted">
              {p.highlights.map((h) => (
                <li key={h} className="flex gap-3">
                  <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                  {h}
                </li>
              ))}
            </ul>
          )}
          <div className={featured ? "pt-6" : ""}>
            <Links p={p} />
            {p.credit && (
              <p className="mt-3 text-xs text-subtle">
                <a
                  href={p.credit.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-line-strong underline-offset-2 hover:text-fg"
                >
                  {p.credit.label}
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </GlowCard>
  );
}
