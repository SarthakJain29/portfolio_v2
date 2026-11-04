import { site } from "@/data/site";
import { ArrowUpRight, CodeIcon, DownloadIcon, GithubIcon, LinkedinIcon } from "./icons";
import { HeroSpotlight } from "./hero-spotlight";
import { HeroTerminal } from "./hero-terminal";
import { FlipWords } from "./ui/flip-words";
import { Tilt } from "./ui/tilt";

const social = [
  { label: "GitHub", href: site.profile.socials.github, Icon: GithubIcon },
  { label: "LinkedIn", href: site.profile.socials.linkedin, Icon: LinkedinIcon },
  { label: "LeetCode", href: site.profile.socials.leetcode, Icon: CodeIcon },
];

const rise = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export function Hero() {
  const { profile } = site;
  const [first, ...rest] = profile.name.split(" ");
  return (
    <HeroSpotlight>
      <div
        id="top"
        className="mx-auto grid min-h-[100svh] w-full max-w-6xl content-center gap-14 px-5 pb-24 pt-32 sm:px-8 lg:grid-cols-12 lg:items-center lg:gap-8"
      >
        <div className="lg:col-span-7">
          <div className="rise" style={rise(0)}>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-card px-3.5 py-1.5 text-[13px] text-muted backdrop-blur">
              <span className="relative flex size-2">
                <span className="absolute inset-0 animate-[pulse-ring_2s_ease-out_infinite] rounded-full bg-ok" />
                <span className="relative size-2 rounded-full bg-ok" />
              </span>
              {profile.role} at {profile.now.company}
              <span aria-hidden className="text-subtle">·</span>
              {profile.location}
            </p>
          </div>

          <h1 className="mt-7 text-[clamp(3.25rem,10.5vw,7.75rem)] font-semibold leading-[0.92] tracking-[-0.04em]">
            <span className="gen-word" style={rise(60)}>
              {first}
            </span>{" "}
            <span className="gen-word" style={rise(200)}>
              {rest.join(" ")}
            </span>
          </h1>

          <div className="rise mt-6 text-2xl leading-snug tracking-tight sm:text-4xl" style={rise(280)}>
            <span className="text-muted">I build </span>
            <span className="block min-h-[1.25em] sm:inline-block sm:min-h-0">
              <FlipWords words={profile.heroWords} />
            </span>
          </div>

          <p className="rise mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg" style={rise(340)}>
            {profile.summary}
          </p>

          <div className="rise mt-9 flex flex-wrap items-center gap-3" style={rise(400)}>
            <a href="#projects" className="btn-orbit">
              <span>
                View my work <ArrowUpRight />
              </span>
            </a>
            <a href={profile.resumeUrl} download className="btn-ghost">
              <DownloadIcon /> Resume
            </a>
            <a href="#contact" className="px-2 py-2 text-sm font-medium text-muted transition-colors hover:text-fg">
              Get in touch
            </a>
          </div>

          <ul className="rise mt-9 flex items-center gap-3 text-muted" style={rise(460)}>
            {social.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} (opens in a new tab)`}
                  className="inline-flex size-10 items-center justify-center rounded-full border border-line bg-card transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="rise relative lg:col-span-5" style={rise(240)}>
          <Tilt className="relative">
            <HeroTerminal />
          </Tilt>
          {/* Decorative floating chips (hidden on small screens). */}
          <div aria-hidden className="pointer-events-none hidden sm:block">
            <span className="chip float-chip absolute -right-3 -top-6 bg-card-solid" style={{ "--d": "0s" } as React.CSSProperties}>
              TypeScript
            </span>
            <span className="chip float-chip absolute -left-8 -top-3 bg-card-solid" style={{ "--d": "-2s" } as React.CSSProperties}>
              LLM evals
            </span>
            <span className="chip float-chip absolute -bottom-7 right-10 bg-card-solid" style={{ "--d": "-4s" } as React.CSSProperties}>
              MERN
            </span>
          </div>
        </div>
      </div>
    </HeroSpotlight>
  );
}
