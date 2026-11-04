import { site } from "@/data/site";
import { Reveal } from "./reveal";
import { Section } from "./section";

export function Education() {
  const { education: ed, achievements } = site;
  return (
    <Section id="education" eyebrow="05 · Education" title="Education & achievements">
      <div className="grid gap-8 md:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-xl border border-line bg-card p-6">
            <p className="font-mono text-xs text-subtle">{ed.period}</p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight">{ed.school}</h3>
            <p className="mt-1 text-muted">{ed.degree}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {ed.details.map((d) => (
                <li key={d} className="rounded-full bg-accent-soft px-3 py-1 text-sm text-accent">
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="h-full rounded-xl border border-line bg-card p-6">
            <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-subtle">Achievements</h3>
            <ul className="mt-4 space-y-3">
              {achievements.map((a) => (
                <li key={a.title} className="flex gap-3">
                  <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-accent" />
                  <span>
                    {a.title}
                    {a.detail && <span className="text-muted"> — {a.detail}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
