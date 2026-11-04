import { site } from "@/data/site";
import { CountUp } from "./ui/count-up";
import { Marquee } from "./ui/marquee";
import { Reveal } from "./reveal";

/** Animated numbers + a ticker of the stack. Every figure comes from `site.stats`. */
export function Stats() {
  const tech = Array.from(new Set(site.skills.flatMap((g) => g.items)));
  const half = Math.ceil(tech.length / 2);
  return (
    <div className="relative">
      <section aria-label="Highlights" className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <dl className="grid grid-cols-2 overflow-hidden rounded-3xl border border-line bg-card lg:grid-cols-4">
            {site.stats.map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-col-reverse justify-end gap-2 p-6 sm:p-8 ${i % 2 === 1 ? "border-l border-line" : ""} ${
                  i >= 2 ? "border-t border-line lg:border-t-0" : ""
                } ${i >= 1 ? "lg:border-l" : ""}`}
              >
                <dt className="text-sm leading-snug text-muted">{s.label}</dt>
                <dd className="text-4xl font-semibold tracking-tight sm:text-5xl">
                  <span className="text-gradient">
                    <CountUp value={s.value} suffix={s.suffix} />
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      <div className="mt-14 space-y-4" aria-label="Technologies I work with">
        <Marquee items={tech.slice(0, half)} duration={50} />
        <Marquee items={tech.slice(half)} duration={58} reverse />
      </div>
    </div>
  );
}
