import { site } from "@/data/site";
import { Accent, Section } from "./section";
import { Reveal } from "./reveal";
import { ProjectCard } from "./project-card";

export function Projects() {
  const shipped = site.projects.filter((p) => p.status === "shipped");
  const wip = site.projects.filter((p) => p.status === "in-progress");
  const [featured, ...rest] = shipped;

  return (
    <Section
      id="projects"
      eyebrow="03 — Projects"
      title={<>Things I&apos;ve <Accent>built</Accent></>}
      lead="Real-time systems, AI tooling and developer utilities, plus what I'm building next."
    >
      <ul className="grid gap-5 md:grid-cols-2">
        {featured && (
          <Reveal as="li" className="md:col-span-2">
            <ProjectCard p={featured} featured />
          </Reveal>
        )}
        {rest.map((p, i) => (
          <Reveal as="li" key={p.slug} delay={(i % 2) * 80}>
            <ProjectCard p={p} />
          </Reveal>
        ))}
      </ul>

      <Reveal className="mt-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">In the lab</p>
            <h3 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              In <Accent>progress</Accent>
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
              Work in progress, so expect rough edges and moving targets.
            </p>
          </div>
          <p className="chip" aria-hidden>
            {wip.length} building · scroll →
          </p>
        </div>
      </Reveal>

      {/* Horizontal snap row: focusable so keyboard users can scroll it. */}
      <div
        role="region"
        aria-label="Projects in progress"
        tabIndex={0}
        className="-mx-5 mt-8 overflow-x-auto px-5 pb-6 [scrollbar-color:var(--line-strong)_transparent] [scrollbar-width:thin] [mask-image:linear-gradient(90deg,#000_calc(100%-4rem),transparent)] sm:-mx-8 sm:px-8"
      >
        <ul className="flex snap-x snap-mandatory gap-5">
          {wip.map((p) => (
            <li key={p.slug} className="w-[82vw] max-w-[340px] shrink-0 snap-start sm:w-[340px]">
              <ProjectCard p={p} compact />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
