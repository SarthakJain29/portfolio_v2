import { site } from "@/data/site";
import { CodeIcon, DownloadIcon, GithubIcon, LinkedinIcon, MailIcon } from "./icons";
import { Reveal } from "./reveal";
import { Section } from "./section";
import { CopyEmail } from "./copy-email";

export function Contact() {
  const { profile } = site;
  const links = [
    { label: "GitHub", href: profile.socials.github, Icon: GithubIcon },
    { label: "LinkedIn", href: profile.socials.linkedin, Icon: LinkedinIcon },
    { label: "LeetCode", href: profile.socials.leetcode, Icon: CodeIcon },
  ];
  return (
    <Section id="contact" eyebrow="06 · Contact" title="Let's talk">
      <Reveal>
        <p className="max-w-xl text-lg leading-relaxed text-muted">
          Have a role, a project or an idea you&apos;d like to discuss? The fastest way to reach me is email.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
          >
            <MailIcon /> {profile.email}
          </a>
          <CopyEmail email={profile.email} />
          <a
            href={profile.resumeUrl}
            download
            className="inline-flex items-center gap-2 rounded-md border border-line px-4 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
          >
            <DownloadIcon /> Download resume
          </a>
        </div>
        <ul className="mt-8 flex flex-wrap gap-3">
          {links.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-line px-3 py-2 text-sm text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <Icon /> {label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
