import { site } from "@/data/site";
import { Channel } from "./channel";
import { Reveal } from "../reveal";

/** Channel 3: experience, printed as thermal-printer receipts (they "print" when scrolled into view). */
export function Receipts() {
  return (
    <Channel
      id="log"
      no="03"
      kicker="Experience · print log"
      title={
        <>
          Where I&apos;ve <span className="text-t-orange">shipped</span>.
        </>
      }
    >
      <ol className="grid items-start gap-8 md:grid-cols-2">
        {site.experience.map((job, i) => (
          <Reveal as="li" key={job.company} delay={i * 120} className={i % 2 ? "md:mt-16 md:rotate-[1deg]" : "md:-rotate-[0.8deg]"}>
            <article className="receipt print" aria-labelledby={`job-${i}`}>
              <p className="text-center text-[0.68rem] uppercase tracking-[0.25em]">*** SJ-01 print log ***</p>
              <h3 id={`job-${i}`} className="mt-3 text-center font-sans text-3xl font-extrabold uppercase leading-none tracking-tight [font-stretch:76%]">
                {job.company}
              </h3>
              <p className="mt-1 text-center uppercase">
                {job.role} · {job.location}
              </p>
              <p className="text-center">{job.period}</p>
              {job.note && <p className="mt-2 text-center italic">{job.note}</p>}
              <hr />
              <ul className="space-y-2">
                {job.highlights.map((h, j) => (
                  <li key={h} className="flex gap-2">
                    <span aria-hidden className="shrink-0 tabular-nums">{String(j + 1).padStart(2, "0")}</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
              {job.stack && (
                <>
                  <hr />
                  <p className="uppercase">
                    Items: <span className="font-semibold">{job.stack.join(" · ")}</span>
                  </p>
                </>
              )}
              <hr />
              <p className="flex justify-between uppercase">
                <span>Status</span>
                <span className="font-bold">{/present/i.test(job.period) ? "● Running" : "✓ Complete"}</span>
              </p>
              <div aria-hidden className="barcode mt-4" />
              <p className="mt-1 text-center text-[0.62rem] tracking-[0.3em]">THANK YOU · COME AGAIN</p>
            </article>
          </Reveal>
        ))}
      </ol>
    </Channel>
  );
}
