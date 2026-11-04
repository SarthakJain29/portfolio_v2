import { site } from "@/data/site";
import { Reveal } from "./reveal";
import { Section } from "./section";

export function About() {
  const { profile } = site;
  return (
    <Section id="about" eyebrow="01 · About" title="A bit about me">
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5 text-lg leading-relaxed text-muted">
          {profile.about.map((p, i) => (
            <Reveal key={i} delay={i * 60}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <dl className="divide-y divide-line rounded-xl border border-line bg-card">
            {profile.facts.map((f) => (
              <div key={f.label} className="flex items-baseline justify-between gap-6 px-5 py-3.5">
                <dt className="font-mono text-xs uppercase tracking-wider text-subtle">{f.label}</dt>
                <dd className="text-right text-sm">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
