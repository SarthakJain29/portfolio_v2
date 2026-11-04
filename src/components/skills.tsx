import { site } from "@/data/site";
import { Reveal } from "./reveal";
import { Section } from "./section";

export function Skills() {
  return (
    <Section id="skills" eyebrow="04 · Skills" title="Tools I reach for">
      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
        {site.skills.map((g, i) => (
          <Reveal key={g.title} delay={(i % 2) * 70}>
            <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-subtle">{g.title}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <li
                  key={s}
                  className="rounded-md border border-line bg-card px-3 py-1.5 text-sm transition-colors hover:border-accent hover:text-accent"
                >
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
