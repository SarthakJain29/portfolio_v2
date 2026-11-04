import { site } from "@/data/site";
import { ArrowUpRight, CodeIcon, DownloadIcon, GithubIcon, LinkedinIcon } from "./icons";
import { Accent, Section } from "./section";
import { Reveal } from "./reveal";
import { CopyEmail } from "./copy-email";

export function Contact() {
  const { profile } = site;
  const links = [
    { label: "GitHub", href: profile.socials.github, Icon: GithubIcon },
    { label: "LinkedIn", href: profile.socials.linkedin, Icon: LinkedinIcon },
    { label: "LeetCode", href: profile.socials.leetcode, Icon: CodeIcon },
  ];
  return (
    <Section id="contact" eyebrow="06 — Contact" title={<>Let&apos;s <Accent>talk</Accent></>}>
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] border border-line-strong bg-card p-7 sm:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 80% at 15% 0%, color-mix(in srgb, var(--g1) 22%, transparent), transparent 70%), radial-gradient(50% 70% at 100% 100%, color-mix(in srgb, var(--g2) 18%, transparent), transparent 70%)",
            }}
          />
          <div className="relative">
            <p className="max-w-xl text-lg leading-relaxed text-muted">
              Have a role, a project or an idea you&apos;d like to discuss? The fastest way to reach me is email.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="group relative mt-8 inline-block break-all pb-2 text-2xl font-semibold tracking-tight sm:text-5xl"
            >
              <span className="text-gradient">{profile.email}</span>
              <ArrowUpRight className="ml-2 inline size-5 align-middle text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:size-7" />
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-[0.35] bg-gradient-to-r from-[var(--g1)] via-[var(--g2)] to-[var(--g3)] transition-transform duration-500 group-hover:scale-x-100"
              />
            </a>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <CopyEmail email={profile.email} />
              <a href={profile.resumeUrl} download className="btn-ghost">
                <DownloadIcon /> Download resume
              </a>
            </div>

            <ul className="mt-10 flex flex-wrap gap-3 border-t border-line pt-8">
              {links.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 text-sm text-muted transition-colors hover:border-accent hover:text-accent"
                  >
                    <Icon /> {label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
