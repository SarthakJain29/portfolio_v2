import { site } from "@/data/site";
import { Accent, Section } from "./section";
import { Reveal } from "./reveal";
import { GlowCard } from "./ui/glow-card";

export function Education() {
  const { education: ed, achievements } = site;
  const [headline, ...others] = achievements;
  // The CGPA is the first detail ("CGPA 9.07"): pull the number out for the big display.
  const cgpa = ed.details.find((d) => /cgpa/i.test(d))?.replace(/cgpa\s*/i, "");
  const extras = ed.details.filter((d) => !/cgpa/i.test(d));

  return (
    <Section id="education" eyebrow="05 — Education" title={<>Education &amp; <Accent>achievements</Accent></>}>
      <div className="grid gap-4 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <GlowCard className="relative flex h-full flex-col justify-between gap-10 overflow-hidden p-7 sm:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full opacity-60"
              style={{ background: "radial-gradient(circle, var(--glow), transparent 70%)" }}
            />
            <div>
              <p className="font-mono text-xs text-subtle">{ed.period}</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{ed.school}</h3>
              <p className="mt-1 text-muted">{ed.degree}</p>
            </div>
            <div className="flex flex-wrap items-end gap-x-10 gap-y-5">
              {cgpa && (
                <p>
                  <span className="text-gradient text-6xl font-semibold tracking-tight sm:text-7xl">{cgpa}</span>
                  <span className="ml-2 text-sm text-subtle">CGPA</span>
                </p>
              )}
              <ul className="flex flex-wrap gap-2 pb-2">
                {extras.map((d) => (
                  <li key={d} className="chip !text-fg">
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </GlowCard>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
          {headline && (
            <Reveal delay={80} className="sm:col-span-2 lg:col-span-1">
              <GlowCard className="h-full p-6 sm:p-7">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">Achievement</p>
                <p className="mt-3 text-xl font-semibold leading-snug tracking-tight">{headline.title}</p>
                {headline.detail && <p className="mt-1 text-sm text-muted">{headline.detail}</p>}
              </GlowCard>
            </Reveal>
          )}
          {others.slice(0, 2).map((a, i) => (
            <Reveal key={a.title} delay={140 + i * 60}>
              <GlowCard className="h-full p-6 sm:p-7">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-subtle">Certification</p>
                <p className="mt-3 text-base font-medium leading-snug">{a.title}</p>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
