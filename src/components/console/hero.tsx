import { site } from "@/data/site";
import { ArrowUpRight, DownloadIcon, GithubIcon, LinkedinIcon, MailIcon } from "../icons";
import { FallbackConsole } from "./fallback-console";
import { SlotCartridge } from "./cartridge";

const rise = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

/** Channel 1: the instrument itself. Name, role, top-3, resume and contact all live here (10-second test). */
export function Hero() {
  const { profile, projects } = site;
  const featured = projects.filter((p) => p.featured).sort((a, b) => (a.featured ?? 9) - (b.featured ?? 9));

  return (
    <section id="console" aria-labelledby="console-title" className="mx-auto max-w-6xl px-3 pb-10 pt-20 sm:px-4 sm:pt-24">
      <div className="chassis screws px-4 pb-5 pt-9 sm:px-8 sm:pb-8 sm:pt-11">
        {/* Model plate */}
        <div className="rise flex flex-wrap items-center justify-between gap-2" style={rise(0)}>
          <p className="label flex items-center gap-2">
            <span className="led" data-state="on" aria-hidden /> SJ-01 · Fallback Console · {profile.location}
          </p>
          <p className="label hidden sm:block">Now: {profile.now.role} @ {profile.now.company}</p>
        </div>

        {/* Name & role */}
        <div className="mt-5 grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="rise lg:col-span-8" style={rise(60)}>
            <h1
              id="console-title"
              className="text-[clamp(3.4rem,13vw,8.75rem)] font-extrabold leading-[0.82] tracking-[-0.035em] [font-stretch:76%]"
            >
              Sarthak
              <br />
              Jain<span className="text-t-orange">.</span>
            </h1>
          </div>
          <div className="rise lg:col-span-4" style={rise(140)}>
            <p className="inline-flex rounded-lg bg-ink px-2.5 py-1 font-mono text-xs font-semibold uppercase tracking-widest text-chassis">
              {profile.role}
            </p>
            <p className="mt-3 text-lg font-medium leading-snug sm:text-xl">
              Full-stack (MERN + TypeScript), now building <mark className="rounded bg-yellow px-1 text-[#17171a]">GenAI apps</mark>{" "}
              that keep working when the model doesn&apos;t.
            </p>
            {/* Essentials, always one tap away */}
            <div className="mt-5 flex flex-wrap gap-2.5">
              <a href={profile.resumeUrl} download className="key key-orange text-sm">
                <DownloadIcon /> Resume
              </a>
              <a href={`mailto:${profile.email}`} className="key key-blue text-sm">
                <MailIcon /> Email me
              </a>
              <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="key !px-3 text-sm" aria-label="GitHub (opens in a new tab)">
                <GithubIcon />
              </a>
              <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="key !px-3 text-sm" aria-label="LinkedIn (opens in a new tab)">
                <LinkedinIcon />
              </a>
            </div>
          </div>
        </div>

        {/* The signature: simulated model fallback */}
        <div className="rise mt-7" style={rise(220)}>
          <FallbackConsole
            facts={{
              name: profile.name,
              role: profile.role,
              company: profile.now.company,
              location: profile.location,
              top: featured.map((p) => p.title),
            }}
          />
        </div>

        {/* Cartridge slot: top 3 projects */}
        <div className="mt-8">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="label !text-[0.7rem] !text-ink">Cartridge slot · top 3 projects</h2>
            <a href="#projects" className="label inline-flex items-center gap-1 hover:!text-ink">
              All {projects.length} projects <ArrowUpRight />
            </a>
          </div>
          <div className="well -mx-1 mt-3 overflow-x-auto p-3 sm:mx-0">
            <ul className="flex snap-x snap-mandatory gap-3 sm:grid sm:grid-cols-3">
              {featured.map((p, i) => (
                <li key={p.slug} className="w-[78vw] max-w-[320px] shrink-0 snap-start sm:w-auto sm:max-w-none">
                  <SlotCartridge p={p} index={i} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
