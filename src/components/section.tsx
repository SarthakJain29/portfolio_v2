import { Reveal } from "./reveal";

/**
 * Standard section shell: eyebrow label, big heading (pass `<em>`-style accent words with
 * the `.serif text-gradient` classes), optional lead paragraph.
 */
export function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
}: {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="relative mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
        <h2
          id={`${id}-title`}
          className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
        >
          {title}
        </h2>
        {lead && <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{lead}</p>}
      </Reveal>
      <div className="mt-12 sm:mt-14">{children}</div>
    </section>
  );
}

/** Convenience for the italic gradient accent word inside a heading. */
export const Accent = ({ children }: { children: React.ReactNode }) => (
  <span className="serif text-gradient pr-[0.06em]">{children}</span>
);
