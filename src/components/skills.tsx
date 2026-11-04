import { site } from "@/data/site";
import { Accent, Section } from "./section";
import { Reveal } from "./reveal";
import { GlowCard } from "./ui/glow-card";

// Column spans on the 6-col desktop grid, by index → 2/2/2 then 3/3.
const spans = ["lg:col-span-2", "lg:col-span-2", "lg:col-span-2", "lg:col-span-3", "lg:col-span-3"];

export function Skills() {
  return (
    <Section id="skills" eyebrow="04 — Skills" title={<>Tools I <Accent>reach for</Accent></>}>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {site.skills.map((g, i) => (
          <Reveal as="li" key={g.title} delay={(i % 3) * 70} className={`${spans[i] ?? "lg:col-span-2"} ${i === site.skills.length - 1 && site.skills.length % 2 === 1 ? "sm:col-span-2" : ""}`}>
            <GlowCard className="h-full p-6 sm:p-7">
              <div className="flex items-baseline justify-between">
                <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-subtle">{g.title}</h3>
                <span aria-hidden className="font-mono text-xs text-subtle/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <li
                    key={s}
                    className="rounded-xl border border-line bg-card px-3.5 py-2 text-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent motion-reduce:hover:translate-y-0"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </GlowCard>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
