import Image from "next/image";
import type { Project } from "@/data/types";
import { dims } from "@/lib/media";

/** Status lamp printed on every cartridge. */
export function StatusLamp({ status }: { status: Project["status"] }) {
  const built = status === "built";
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-[#17171a] px-2 py-0.5 font-mono text-[0.58rem] font-semibold uppercase tracking-wider text-[#fffdf6]">
      <span className="led !size-[7px]" data-state={built ? "on" : "warn"} aria-hidden />
      {built ? "Built" : "In progress"}
    </span>
  );
}

/** "Gemini → Groq → Mock": the project's first real fallback chain. */
export function ChainLine({ chain, className = "" }: { chain: string[]; className?: string }) {
  return (
    <span className={`font-mono text-[0.62rem] font-semibold uppercase tracking-wide ${className}`}>
      {chain.map((c, i) => (
        <span key={c}>
          {i > 0 && <span aria-label="falls back to"> → </span>}
          {c}
        </span>
      ))}
    </span>
  );
}

/**
 * Compact cartridge "inserted" in the console slot (hero). No screenshot: just the label,
 * so the first screen stays light and fast.
 */
export function SlotCartridge({ p, index }: { p: Project; index: number }) {
  return (
    <a href={`/plain#${p.slug}`} data-project={p.slug} className={`cart c-${p.color} group h-full`}>
      <span className="flex items-center justify-between gap-2">
        <span className="whitespace-nowrap font-mono text-[0.6rem] font-bold uppercase tracking-widest">Cart 0{index + 1}</span>
        <StatusLamp status={p.status} />
      </span>
      <span className="cart-sticker mt-2 flex flex-1 flex-col p-3">
        <span className="truncate font-mono text-[0.56rem] font-semibold uppercase tracking-widest text-[#6b675d]">{p.label}</span>
        <span className="mt-1 text-2xl font-extrabold leading-none tracking-tight [font-stretch:80%]">{p.title}</span>
        <span className="mt-1.5 line-clamp-2 text-[0.82rem] leading-snug text-[#4a4740]">{p.tagline}</span>
        <span className="mt-auto flex items-center justify-between gap-2 pt-3">
          {p.fallbacks[0] && <ChainLine chain={p.fallbacks[0].chain} className="truncate text-[#4a4740]" />}
          <span aria-hidden className="shrink-0 text-sm font-bold transition-transform group-hover:translate-x-0.5">
            ▸
          </span>
        </span>
      </span>
    </a>
  );
}

/** The thumbnail on a rack cartridge: wide screenshot, or two phone captures side by side. */
function Thumb({ p }: { p: Project }) {
  const first = p.media[0];
  if (!first) return null;
  if (first.kind === "desktop") {
    const d = dims(first.src);
    return (
      <Image
        src={first.src}
        alt="" /* decorative here: the link already names the project; the inspector has full alts */
        width={d.w}
        height={d.h}
        sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
        className="aspect-[16/10] w-full rounded-lg object-cover object-top"
      />
    );
  }
  const phones = p.media.filter((m) => m.kind !== "desktop").slice(0, 2);
  return (
    <span className="flex aspect-[16/10] w-full items-end justify-center gap-3 overflow-hidden rounded-lg bg-[#17171a] px-4 pt-4">
      {phones.map((m, i) => {
        const d = dims(m.src);
        return (
          <Image
            key={m.src}
            src={m.src}
            alt=""
            width={d.w}
            height={d.h}
            sizes="160px"
            className={`h-auto w-[38%] rounded-t-xl ${i === 1 ? "translate-y-4" : ""}`}
          />
        );
      })}
    </span>
  );
}

/** Full cartridge on the projects rack. */
export function RackCartridge({ p, index }: { p: Project; index: number }) {
  return (
    <a href={`/plain#${p.slug}`} data-project={p.slug} className={`cart c-${p.color} group h-full`}>
      <span className="flex items-center justify-between gap-2 px-1">
        <span className="min-w-0 truncate font-mono text-[0.6rem] font-bold uppercase tracking-widest">
          {p.featured ? "★ " : ""}
          {String(index + 1).padStart(2, "0")} · {p.label}
        </span>
        <StatusLamp status={p.status} />
      </span>
      <span className="cart-sticker mt-2 flex flex-1 flex-col p-2.5">
        <Thumb p={p} />
        <span className="flex flex-1 flex-col px-1.5 pb-1 pt-3">
          <span className="flex items-baseline justify-between gap-2">
            <span className="text-[1.65rem] font-extrabold leading-none tracking-tight [font-stretch:80%]">{p.title}</span>
            {p.repoName && <span className="truncate font-mono text-[0.56rem] text-[#6b675d]">{p.repoName}</span>}
          </span>
          <span className="mt-2 text-[0.9rem] leading-snug text-[#4a4740]">{p.tagline}</span>
          <span className="mt-auto pt-4">
            <span className="label !text-[0.55rem] !text-[#6b675d]">Fallback</span>
            {p.fallbacks.slice(0, 2).map((f) => (
              <span key={f.label} className="mt-0.5 block truncate">
                <ChainLine chain={f.chain} className="text-[#17171a]" />
              </span>
            ))}
          </span>
        </span>
      </span>
      <span className="mt-2 flex items-center justify-between px-1 font-mono text-[0.6rem] font-bold uppercase tracking-widest">
        <span>{p.video ? "▶ Demo video inside" : `${p.media.length} screenshots`}</span>
        <span aria-hidden className="transition-transform group-hover:translate-x-1">
          Insert ▸
        </span>
      </span>
    </a>
  );
}
