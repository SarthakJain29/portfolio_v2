import { site } from "@/data/site";
import { LocalClock } from "../ui/local-clock";
import { Reveal } from "../reveal";

/** About, as the instrument's folded operator manual + a few live readouts. */
export function Manual() {
  const { profile, stats } = site;
  return (
    <section aria-labelledby="manual-title" className="mx-auto max-w-6xl px-3 py-10 sm:px-4">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <article className="relative h-full rotate-[-0.6deg] rounded-md bg-receipt p-6 text-[#17171a] shadow-[0_18px_30px_-18px_rgba(23,20,12,0.55)] sm:p-9">
            {/* fold line */}
            <span aria-hidden className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-black/10 to-transparent" />
            <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#6b675d]">Operator manual · p. 1</p>
            <h2 id="manual-title" className="mt-2 text-4xl font-extrabold leading-none tracking-tight [font-stretch:78%] sm:text-5xl">
              About the operator
            </h2>
            <div className="mt-5 space-y-4 text-[1.02rem] leading-relaxed text-[#2c2a25]">
              {profile.about.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </article>
        </Reveal>

        <Reveal delay={90} className="lg:col-span-5">
          <div className="chassis grid grid-cols-1 h-full gap-3 p-5 sm:p-6">
            <div className="lcd flex items-center justify-between px-4 py-3">
              <span className="text-[1.05rem] text-lcd-dim">HYDERABAD · LOCAL</span>
              <span className="text-4xl leading-none">
                <LocalClock timeZone={profile.timeZone} />
              </span>
            </div>
            <div className="well p-4">
              <p className="label">Now running</p>
              <p className="mt-1.5 text-lg font-bold leading-tight">
                {profile.now.role} · {profile.now.company}
              </p>
              <p className="text-sm text-ink-2">Since {profile.now.since}. {profile.now.blurb}</p>
            </div>
            <dl className="grid grid-cols-2 gap-3">
              {stats.map((s) => (
                <div key={s.label} className="well flex flex-col-reverse p-3">
                  <dt className="mt-1 text-xs leading-snug text-ink-2">{s.label}</dt>
                  <dd className="text-3xl font-extrabold leading-none tracking-tight [font-stretch:78%]">
                    {s.value}
                    {s.suffix}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
