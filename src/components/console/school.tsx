import { site } from "@/data/site";
import { Channel } from "./channel";
import { Stickers, type StickerItem } from "./stickers";
import { Reveal } from "../reveal";

// All pass AA with the dark sticker text (#17171a) in both themes.
const COLORS = ["var(--yellow)", "var(--pink)", "var(--green)", "var(--orange)", "var(--violet)", "#c9dbff"];
const SHAPES: StickerItem["shape"][] = ["badge", "circle", "pill", "circle", "pill", "badge"];
const ROT = [-6, 5, -3, 8, -8, 3];

/** Channel 5: education as a warranty card, achievements as stickers. */
export function School() {
  const { education: ed, achievements } = site;
  const items: StickerItem[] = [
    ...achievements.map((a) => ({ title: a.title, detail: a.detail })),
    ...ed.details.map((d) => ({ title: d, detail: "Bennett University" })),
  ].map((x, i) => ({
    ...x,
    color: COLORS[i % COLORS.length]!,
    shape: SHAPES[i % SHAPES.length]!,
    rotate: ROT[i % ROT.length]!,
  }));

  return (
    <Channel
      id="school"
      no="05"
      kicker="Education & achievements"
      title={
        <>
          Certified, <span className="text-t-green">stickered</span>, under warranty.
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <article className="relative h-full overflow-hidden rounded-2xl border-2 border-dashed border-line-2 bg-receipt p-6 text-[#17171a] sm:p-8">
            <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#6b675d]">Warranty card · education</p>
            <h3 className="mt-3 text-3xl font-extrabold leading-none tracking-tight [font-stretch:78%]">{ed.degree}</h3>
            <p className="mt-2 text-lg">{ed.school}</p>
            <dl className="mt-6 grid grid-cols-2 gap-4 font-mono text-sm">
              <div>
                <dt className="text-[0.62rem] uppercase tracking-widest text-[#6b675d]">Period</dt>
                <dd className="font-semibold">{ed.period}</dd>
              </div>
              {ed.details.map((d) => (
                <div key={d}>
                  <dt className="text-[0.62rem] uppercase tracking-widest text-[#6b675d]">Note</dt>
                  <dd className="font-semibold">{d}</dd>
                </div>
              ))}
            </dl>
            <span aria-hidden className="absolute -right-6 -top-6 grid size-28 rotate-12 place-items-center rounded-full border-4 border-[#0b6e3c] font-mono text-[0.6rem] font-bold uppercase text-[#0b6e3c]">
              Passed QA
            </span>
          </article>
        </Reveal>
        <Reveal delay={100} className="chassis screws grid place-items-center px-4 py-10 lg:col-span-7">
          <h3 className="sr-only">Achievements</h3>
          <Stickers items={items} />
          <p className="label mt-6 hidden md:block">Psst: the stickers peel off. Drag them.</p>
        </Reveal>
      </div>
    </Channel>
  );
}
