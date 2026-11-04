import { site } from "@/data/site";
import { Accent, Section } from "./section";
import { Reveal } from "./reveal";
import { GlowCard } from "./ui/glow-card";
import { TracingBeam } from "./ui/tracing-beam";

export function Experience() {
  return (
    <Section id="experience" eyebrow="02 — Experience" title={<>Where I&apos;ve <Accent>worked</Accent></>}>
      <TracingBeam>
        <ol className="space-y-8">
          {site.experience.map((job, i) => {
            const current = /present/i.test(job.period);
            return (
              <Reveal as="li" key={job.company} delay={i * 80} className="relative">
                <GlowCard className="p-6 sm:p-9">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-4">
                      <span
                        aria-hidden
                        className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-line-strong bg-accent-soft font-mono text-base font-semibold text-accent"
                      >
                        {job.company
                          .split(" ")
                          .map((w) => w[0])
                          .join("")
                          .slice(0, 2)}
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{job.role}</h3>
                        <p className="mt-0.5 text-muted">
                          {job.company} <span aria-hidden>·</span> {job.location}
                        </p>
                      </div>
                    </div>
                    <p className="flex shrink-0 items-center gap-2 font-mono text-xs text-subtle">
                      {current && (
                        <span className="rounded-full border border-line-strong bg-accent-soft px-2 py-0.5 text-[10px] uppercase tracking-wider text-accent">
                          Current
                        </span>
                      )}
                      {job.period}
                    </p>
                  </div>

                  {job.note && <p className="mt-5 text-sm italic text-subtle">{job.note}</p>}

                  <ul className="mt-6 space-y-3 text-[15px] leading-relaxed text-muted">
                    {job.highlights.map((h) => (
                      <li key={h} className="flex gap-3">
                        <span aria-hidden className="mt-[0.65rem] size-1 shrink-0 rounded-full bg-accent" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {job.stack && (
                    <ul className="mt-7 flex flex-wrap gap-2" aria-label="Technologies">
                      {job.stack.map((s) => (
                        <li key={s} className="chip">
                          {s}
                        </li>
                      ))}
                    </ul>
                  )}
                </GlowCard>
              </Reveal>
            );
          })}
        </ol>
      </TracingBeam>
    </Section>
  );
}
