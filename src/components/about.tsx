import { site } from "@/data/site";
import { ArrowUpRight } from "./icons";
import { Accent, Section } from "./section";
import { Reveal } from "./reveal";
import { GlowCard } from "./ui/glow-card";
import { LocalClock } from "./ui/local-clock";

/** Wrap configured key phrases in a highlighter underline. */
function Highlighted({ text, phrases }: { text: string; phrases: string[] }) {
  const escaped = phrases.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  if (escaped.length === 0) return <>{text}</>;
  const parts = text.split(new RegExp(`(${escaped.join("|")})`, "g"));
  return (
    <>
      {parts.map((part, i) =>
        phrases.includes(part) ? (
          <mark key={i} className="mark">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

export function About() {
  const { profile, education } = site;
  const focus = ["Backend", "API design", "GenAI", "LLM reliability"];
  return (
    <Section id="about" eyebrow="01 — About" title={<>A bit <Accent>about me</Accent></>}>
      <div className="grid gap-4 md:grid-cols-6 lg:grid-cols-12">
        {/* Bio */}
        <Reveal className="md:col-span-6 lg:col-span-7 lg:row-span-2">
          <GlowCard className="h-full p-7 sm:p-9">
            <div className="space-y-5 text-[17px] leading-relaxed text-muted sm:text-lg">
              {profile.about.map((p, i) => (
                <p key={i}>
                  <Highlighted text={p} phrases={profile.aboutHighlights} />
                </p>
              ))}
            </div>
          </GlowCard>
        </Reveal>

        {/* Now */}
        <Reveal delay={80} className="md:col-span-3 lg:col-span-5">
          <GlowCard className="h-full p-6 sm:p-7">
            <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-subtle">
              <span className="relative flex size-2">
                <span className="absolute inset-0 animate-[pulse-ring_2s_ease-out_infinite] rounded-full bg-ok" />
                <span className="relative size-2 rounded-full bg-ok" />
              </span>
              Now
            </p>
            <p className="mt-4 text-xl font-semibold tracking-tight">
              {profile.now.role} · {profile.now.company}
            </p>
            <p className="mt-1 text-sm text-subtle">Since {profile.now.since}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{profile.now.blurb}</p>
          </GlowCard>
        </Reveal>

        {/* Local time */}
        <Reveal delay={140} className="md:col-span-3 lg:col-span-5">
          <GlowCard className="h-full p-6 sm:p-7">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-subtle">Based in</p>
            <p className="mt-4 text-xl font-semibold tracking-tight">{profile.location}</p>
            <p className="mt-3 flex items-baseline gap-2">
              <span className="text-gradient text-4xl font-semibold tracking-tight">
                <LocalClock timeZone={profile.timeZone} />
              </span>
              <span className="text-sm text-subtle">local time</span>
            </p>
            <p className="mt-2 font-mono text-xs text-subtle">{profile.coords}</p>
          </GlowCard>
        </Reveal>

        {/* Focus */}
        <Reveal delay={60} className="md:col-span-3 lg:col-span-4">
          <GlowCard className="h-full p-6 sm:p-7">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-subtle">Focus</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {focus.map((f) => (
                <li key={f} className="chip !text-fg">
                  {f}
                </li>
              ))}
            </ul>
          </GlowCard>
        </Reveal>

        {/* Education snapshot */}
        <Reveal delay={120} className="md:col-span-3 lg:col-span-4">
          <GlowCard className="h-full p-6 sm:p-7">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-subtle">Education</p>
            <p className="mt-4 text-lg font-semibold leading-snug tracking-tight">{education.degree}</p>
            <p className="mt-1 text-sm text-muted">
              {education.school.split(" (")[0]} · {education.details[0]}
            </p>
          </GlowCard>
        </Reveal>

        {/* LeetCode */}
        <Reveal delay={180} className="md:col-span-6 lg:col-span-4">
          <a href={profile.socials.leetcode} target="_blank" rel="noopener noreferrer" className="block h-full">
            <GlowCard className="h-full p-6 sm:p-7">
              <p className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.16em] text-subtle">
                LeetCode <ArrowUpRight />
                <span className="sr-only">(opens in a new tab)</span>
              </p>
              <p className="text-gradient mt-4 text-4xl font-semibold tracking-tight">300+</p>
              <p className="mt-1 text-sm text-muted">problems solved</p>
            </GlowCard>
          </a>
        </Reveal>
      </div>
    </Section>
  );
}
