import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Plain view",
  description: `${site.profile.name}: the whole portfolio as a plain, printable text page.`,
  alternates: { canonical: "/plain" },
};

/**
 * The graceful fallback of the console: every word of the site as a plain document.
 * No client JS, no animation, print-friendly. Cartridge links point here (#slug) so the
 * site still works without JavaScript.
 */
export default function PlainView() {
  const { profile, experience, projects, skills, education, achievements, stats } = site;
  const ordered = [...projects].sort((a, b) => (a.featured ?? 9) - (b.featured ?? 9));
  const a = "underline underline-offset-2 hover:text-t-blue";

  return (
    <main id="main" className="mx-auto max-w-3xl bg-chassis px-5 py-10 text-ink sm:my-8 sm:rounded-2xl sm:border sm:border-line-2 sm:px-10 print:my-0 print:border-0 print:bg-white">
      <p className="no-print label flex flex-wrap items-center justify-between gap-2">
        <span>Plain view · graceful fallback of the SJ-01 console</span>
        <Link href="/" className={`${a} !text-ink`}>
          ← Back to the console
        </Link>
      </p>

      <header className="mt-6 border-b border-line-2 pb-6">
        <h1 className="text-5xl font-extrabold leading-none tracking-tight [font-stretch:80%]">{profile.name}</h1>
        <p className="mt-2 text-xl font-semibold">
          {profile.role} · {profile.location}
        </p>
        <p className="mt-3 leading-relaxed text-ink-2">{profile.summary}</p>
        <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm">
          <a className={a} href={`mailto:${profile.email}`}>{profile.email}</a>
          <a className={a} href={profile.resumeUrl} download>Resume (PDF)</a>
          <a className={a} href={profile.socials.github}>GitHub</a>
          <a className={a} href={profile.socials.linkedin}>LinkedIn</a>
          <a className={a} href={profile.socials.leetcode}>LeetCode</a>
        </p>
      </header>

      <section aria-labelledby="p-about" className="mt-8">
        <h2 id="p-about" className="text-2xl font-bold">About</h2>
        {profile.about.map((p, i) => (
          <p key={i} className="mt-3 leading-relaxed">{p}</p>
        ))}
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-ink-2">
          {stats.map((s) => (
            <li key={s.label}>{s.value}{s.suffix} {s.label}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="p-exp" className="mt-10">
        <h2 id="p-exp" className="text-2xl font-bold">Experience</h2>
        {experience.map((job) => (
          <article key={job.company} className="mt-5">
            <h3 className="text-lg font-bold">
              {job.role}, {job.company} <span className="font-normal text-ink-2">· {job.location}</span>
            </h3>
            <p className="text-sm text-ink-2">{job.period}{job.note ? ` · ${job.note}` : ""}</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {job.highlights.map((h) => <li key={h}>{h}</li>)}
            </ul>
          </article>
        ))}
      </section>

      <section aria-labelledby="p-proj" className="mt-10">
        <h2 id="p-proj" className="text-2xl font-bold">Projects</h2>
        {ordered.map((p) => (
          <article key={p.slug} id={p.slug} className="mt-6 scroll-mt-6 border-t border-line pt-5">
            <h3 className="text-lg font-bold">
              {p.title}
              {p.featured ? " ★" : ""}
              <span className="font-normal text-ink-2">
                {" "}· {p.status === "built" ? "built" : "in progress"}
                {p.repoName ? ` · repo ${p.repoName}` : ""}
              </span>
            </h3>
            <p className="font-semibold">{p.tagline}</p>
            <p className="mt-2 leading-relaxed">{p.description}</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {p.highlights.map((h) => <li key={h}>{h}</li>)}
            </ul>
            {p.facts && (
              <p className="mt-2 text-sm">
                {p.facts.map((f) => `${f.value} ${f.label}`).join(" · ")}
              </p>
            )}
            <p className="mt-2 text-sm text-ink-2">
              <strong className="text-ink">Fallbacks:</strong>{" "}
              {p.fallbacks.map((f) => `${f.label}: ${f.chain.join(" → ")}`).join("; ")}
            </p>
            <p className="mt-1 text-sm text-ink-2">
              <strong className="text-ink">Stack:</strong> {p.stack.join(", ")}
            </p>
            <p className="mt-2 flex flex-wrap gap-x-4 text-sm">
              {p.github && <a className={a} href={p.github}>Code on GitHub</a>}
              {p.live && <a className={a} href={p.live}>Live demo</a>}
              {p.video && <a className={a} href={p.video.src}>Demo video ({p.video.title.split(": ")[1] ?? "MP4"})</a>}
              {p.credit && <a className={a} href={p.credit.href}>{p.credit.label}</a>}
            </p>
          </article>
        ))}
      </section>

      <section aria-labelledby="p-skills" className="mt-10">
        <h2 id="p-skills" className="text-2xl font-bold">Skills</h2>
        <dl className="mt-3 space-y-1">
          {skills.map((g) => (
            <div key={g.title}>
              <dt className="inline font-semibold">{g.title}: </dt>
              <dd className="inline">{g.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="p-edu" className="mt-10">
        <h2 id="p-edu" className="text-2xl font-bold">Education & achievements</h2>
        <p className="mt-3">
          <strong>{education.degree}</strong>, {education.school}, {education.period} ({education.details.join(", ")})
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          {achievements.map((x) => (
            <li key={x.title}>{x.title}{x.detail ? `: ${x.detail}` : ""}</li>
          ))}
        </ul>
      </section>

      <p className="no-print mt-12 border-t border-line pt-4 text-sm text-ink-2">
        Prefer the playful version? <Link href="/" className={a}>Back to the console</Link>. Printing this page gives a one-file résumé.
      </p>
    </main>
  );
}
