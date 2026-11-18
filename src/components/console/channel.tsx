import { Reveal } from "../reveal";

/** Section shell: a printed channel plate + big condensed title. */
export function Channel({
  id,
  no,
  kicker,
  title,
  lead,
  children,
  className = "",
}: {
  id: string;
  no: string;
  kicker: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`mx-auto max-w-6xl px-3 py-14 sm:px-4 sm:py-20 ${className}`}>
      <Reveal>
        <p className="label flex items-center gap-2 !text-ink-2">
          <span className="rounded bg-ink px-1.5 py-0.5 text-chassis">CH {no}</span>
          {kicker}
        </p>
        <h2 id={`${id}-title`} className="mt-3 max-w-3xl text-[clamp(2.6rem,7vw,4.75rem)] font-extrabold leading-[0.9] tracking-[-0.03em] [font-stretch:78%]">
          {title}
        </h2>
        {lead && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">{lead}</p>}
      </Reveal>
      <div className="mt-10">{children}</div>
    </section>
  );
}
