import { site } from "@/data/site";
import { ArrowUpRight, DownloadIcon, GithubIcon, LinkedinIcon, CodeIcon } from "./icons";
import { HeroSpotlight } from "./hero-spotlight";
import { HeroTerminal } from "./hero-terminal";
import { Reveal } from "./reveal";

const social = [
  { label: "GitHub", href: site.profile.socials.github, Icon: GithubIcon },
  { label: "LinkedIn", href: site.profile.socials.linkedin, Icon: LinkedinIcon },
  { label: "LeetCode", href: site.profile.socials.leetcode, Icon: CodeIcon },
];

export function Hero() {
  const { profile } = site;
  return (
    <HeroSpotlight>
      <div id="top" className="mx-auto grid min-h-[100svh] w-full max-w-5xl content-center gap-12 px-5 pb-16 pt-28 sm:px-8 lg:grid-cols-[1.15fr_1fr] lg:items-center">
        <div>
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
              {profile.role} · {profile.location}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-7xl">{profile.name}</h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{profile.summary}</p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
              >
                View projects
              </a>
              <a
                href={profile.resumeUrl}
                download
                className="inline-flex items-center gap-2 rounded-md border border-line px-4 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
              >
                <DownloadIcon /> Resume
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-1 px-2 py-2.5 text-sm font-medium text-muted transition-colors hover:text-fg"
              >
                Get in touch <ArrowUpRight />
              </a>
            </div>
          </Reveal>
          <Reveal delay={320}>
            <ul className="mt-8 flex items-center gap-4 text-muted">
              {social.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} (opens in a new tab)`}
                    className="inline-flex size-9 items-center justify-center rounded-md border border-line transition-colors hover:border-accent hover:text-accent"
                  >
                    <Icon />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal delay={200}>
          <HeroTerminal />
        </Reveal>
      </div>
    </HeroSpotlight>
  );
}
