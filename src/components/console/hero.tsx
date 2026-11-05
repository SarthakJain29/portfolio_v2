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

        <div className="mt-5 grid grid-cols-1 gap-7 lg:grid-cols-12 lg:gap-8">
          {/* Left: who, what, essentials, top 3 (the 10-second column) */}
          <div className="flex flex-col lg:col-span-7">
            <h1
              id="console-title"
              className="rise text-[clamp(3.4rem,12vw,7.4rem)] font-extrabold leading-[0.82] tracking-[-0.035em] [font-stretch:76%]"
              style={rise(60)}
            >
              Sarthak Jain<span className="text-t-orange">.</span>
            </h1>
            <div className="rise mt-5 flex flex-wrap items-center gap-x-3 gap-y-2" style={rise(120)}>
              <p className="inline-flex rounded-lg bg-ink px-2.5 py-1 font-mono text-xs font-semibold uppercase tracking-widest text-chassis">
                {profile.role}
              </p>
              <p className="label">GenAI · LLM reliability · APIs</p>
            </div>
            <p className="rise mt-3 max-w-xl text-lg font-medium leading-snug sm:text-xl" style={rise(160)}>
              Full-stack (MERN + TypeScript), now building{" "}
              <mark className="rounded bg-yellow px-1 text-[#17171a]">GenAI apps</mark> that keep working when the model doesn&apos;t.
            </p>
            {/* Essentials, always one tap away */}
            <div
              className="rise mt-5 grid grid-cols-[1fr_1fr_auto_auto] gap-2 sm:flex sm:flex-wrap sm:gap-2.5"
              style={rise(200)}
            >
              <a href={profile.resumeUrl} download className="key key-orange !px-3 text-sm sm:!px-4">
                <DownloadIcon /> Resume
              </a>
              <a href={`mailto:${profile.email}`} className="key key-blue !px-3 text-sm sm:!px-4">
                <MailIcon /> Email<span className="hidden sm:inline"> me</span>
              </a>
              <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="key !px-2.5 text-sm sm:!px-3" aria-label="GitHub (opens in a new tab)">
                <GithubIcon />
              </a>
              <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="key !px-2.5 text-sm sm:!px-3" aria-label="LinkedIn (opens in a new tab)">
                <LinkedinIcon />
              </a>
            </div>

            {/* Desktop: point at the signature so nobody mistakes it for decoration */}
            <p aria-hidden className="rise mt-8 hidden max-w-sm items-start gap-3 lg:flex" style={rise(260)}>
              <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-yellow font-mono text-xs font-bold text-[#17171a]">↗</span>
              <span className="text-sm leading-snug text-ink-2">
                <strong className="font-semibold text-ink">That console is live.</strong> Switch Gemini off, or hit chaos, and watch the
                request fall back. It&apos;s the same pattern every project below ships with.
              </span>
            </p>

            {/* Cartridge slot: top 3 projects */}
            <div className="rise mt-7 lg:mt-auto lg:pt-7" style={rise(240)}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="label !text-[0.7rem] !text-ink">Cartridge slot · top 3 projects</h2>
                <a href="#projects" className="label inline-flex items-center gap-1 hover:!text-ink">
                  All {projects.length} projects <ArrowUpRight />
                </a>
              </div>
              <div className="well -mx-1 mt-3 overflow-x-auto p-3 sm:mx-0">
                <ul className="flex snap-x snap-mandatory gap-3 sm:grid sm:grid-cols-3">
                  {featured.map((p, i) => (
                    <li key={p.slug} className="w-[74vw] max-w-[300px] shrink-0 snap-start sm:w-auto sm:max-w-none">
                      <SlotCartridge p={p} index={i} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right: the signature, simulated model fallback */}
          <div className="rise lg:col-span-5" style={rise(180)}>
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
        </div>
      </div>
    </section>
  );
}
