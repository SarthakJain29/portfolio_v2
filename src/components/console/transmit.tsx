import { site } from "@/data/site";
import { CodeIcon, DownloadIcon, GithubIcon, LinkedinIcon, MailIcon } from "../icons";
import { CopyEmail } from "../copy-email";
import { Channel } from "./channel";
import { Reveal } from "../reveal";

/** Channel 6: contact, as the transmit panel. */
export function Transmit() {
  const { profile } = site;
  return (
    <Channel
      id="transmit"
      no="06"
      kicker="Contact · transmit"
      title={
        <>
          Open a channel<span className="text-t-orange">.</span>
        </>
      }
      lead="Hiring for backend, full-stack or GenAI work, or just want to talk LLM reliability? Email is the fastest route; there's no fallback needed."
    >
      <Reveal>
        <div className="chassis screws p-5 pt-10 sm:p-9 sm:pt-12">
          <div className="lcd px-4 py-4 sm:px-6">
            <p className="text-[1.05rem] text-lcd-dim">TX ADDRESS</p>
            <a href={`mailto:${profile.email}`} className="relative z-10 mt-1 block break-all text-[clamp(1.6rem,5vw,3rem)] leading-none hover:underline">
              {profile.email}
            </a>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={`mailto:${profile.email}`} className="key key-blue">
              <MailIcon /> Send email
            </a>
            <CopyEmail email={profile.email} />
            <a href={profile.resumeUrl} download className="key key-orange">
              <DownloadIcon /> Download resume
            </a>
          </div>
          <ul className="mt-6 flex flex-wrap gap-3 border-t border-dashed border-line-2 pt-6">
            {[
              { label: "GitHub", href: profile.socials.github, Icon: GithubIcon },
              { label: "LinkedIn", href: profile.socials.linkedin, Icon: LinkedinIcon },
              { label: "LeetCode", href: profile.socials.leetcode, Icon: CodeIcon },
            ].map(({ label, href, Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" className="key text-sm">
                  <Icon /> {label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Channel>
  );
}
