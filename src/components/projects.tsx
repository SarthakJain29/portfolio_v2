import Image from "next/image";
import { site } from "@/data/site";
import type { Project } from "@/data/types";
import { ArrowUpRight, GithubIcon } from "./icons";
import { Reveal } from "./reveal";
import { Section } from "./section";

const isDev = process.env.NODE_ENV !== "production";

function ProjectCard({ p, index }: { p: Project; index: number }) {
  const inProgress = p.status === "in-progress";
  return (
    <Reveal as="article" delay={(index % 2) * 80} className="group flex flex-col overflow-hidden rounded-xl border border-line bg-card transition-colors hover:border-accent/60">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-accent-soft">
        <Image
          src={p.image}
          alt={p.imageAlt}
          width={1200}
          height={750}
          sizes="(min-width: 768px) 480px, 100vw"
          unoptimized={p.image.endsWith(".svg")}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        {inProgress && (
          <span className="absolute left-3 top-3 rounded-full border border-line bg-bg/90 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-accent backdrop-blur">
            In progress
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
        <p className="mt-1 text-sm text-fg/90">{p.tagline}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{p.description}</p>
        {p.highlights && (
          <ul className="mt-3 space-y-1 text-sm text-muted">
            {p.highlights.map((h) => (
              <li key={h} className="flex gap-2">
                <span aria-hidden className="mt-2 h-px w-2.5 shrink-0 bg-accent" />
                {h}
              </li>
            ))}
          </ul>
        )}
        {p.stack.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
            {p.stack.map((s) => (
              <li key={s} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-xs text-muted">
                {s}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-5 text-sm">
          {p.github ? (
            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium transition-colors hover:text-accent"
            >
              <GithubIcon /> GitHub
              <span className="sr-only"> repository for {p.title} (opens in a new tab)</span>
              <ArrowUpRight />
            </a>
          ) : isDev ? (
            // Visible only in `npm run dev`, so missing links are impossible to miss while editing.
            <span className="rounded border border-dashed border-err/60 px-2 py-0.5 font-mono text-xs text-err">
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
        {p.credit && (
          <p className="mt-3 text-xs text-subtle">
            <a href={p.credit.href} target="_blank" rel="noopener noreferrer" className="underline decoration-line underline-offset-2 hover:text-fg">
              {p.credit.label}
            </a>
          </p>
        )}
      </div>
    </Reveal>
  );
}

export function Projects() {
  const shipped = site.projects.filter((p) => p.status === "shipped");
  const wip = site.projects.filter((p) => p.status === "in-progress");
  return (
    <Section id="projects" eyebrow="03 · Projects" title="Things I've built">
      <ul className="grid gap-6 md:grid-cols-2">
        {shipped.map((p, i) => (
          <li key={p.slug} className="contents">
            <ProjectCard p={p} index={i} />
          </li>
        ))}
      </ul>

      <Reveal>
        <h3 className="mt-20 flex items-center gap-3 text-xl font-semibold tracking-tight">
          In progress
          <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-xs font-normal text-muted">
            {wip.length} building
          </span>
        </h3>
        <p className="mt-2 max-w-xl text-sm text-muted">Work in progress, so expect rough edges and moving targets.</p>
      </Reveal>
      <ul className="mt-8 grid gap-6 md:grid-cols-2">
        {wip.map((p, i) => (
          <li key={p.slug} className="contents">
            <ProjectCard p={p} index={i} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
