import { site } from "@/data/site";
import { Reveal } from "./reveal";
import { Section } from "./section";

export function Experience() {
  return (
    <Section id="experience" eyebrow="02 · Experience" title="Where I've worked">
      <ol className="relative space-y-12 border-l border-line pl-6 sm:pl-8">
        {site.experience.map((job, i) => (
          <Reveal as="li" key={job.company} delay={i * 80} className="relative">
            <span
              aria-hidden
              className="absolute -left-[1.85rem] top-2 size-2.5 rounded-full border-2 border-accent bg-bg sm:-left-[2.35rem]"
            />
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-xl font-semibold tracking-tight">
                {job.role} <span className="text-muted">· {job.company}</span>
              </h3>
              <p className="font-mono text-xs text-subtle">{job.period}</p>
            </div>
            <p className="mt-1 text-sm text-muted">{job.location}</p>
            {job.note && <p className="mt-2 text-sm italic text-muted">{job.note}</p>}
            <ul className="mt-4 space-y-2.5 text-[15px] leading-relaxed text-muted">
              {job.highlights.map((h) => (
                <li key={h} className="flex gap-3">
                  <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-accent" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            {job.stack && (
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
                {job.stack.map((s) => (
                  <li key={s} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-xs text-muted">
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
