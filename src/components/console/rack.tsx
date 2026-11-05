import { site } from "@/data/site";
import { Channel } from "./channel";
import { RackCartridge } from "./cartridge";
import { Reveal } from "../reveal";

/** Channel 2: every project as a cartridge on a rack. Featured first. */
export function Rack() {
  const projects = [...site.projects].sort((a, b) => (a.featured ?? 9) - (b.featured ?? 9));
  return (
    <Channel
      id="projects"
      no="02"
      kicker="Projects · cartridge rack"
      title={
        <>
          Ten cartridges. <span className="text-t-blue">Every one degrades gracefully.</span>
        </>
      }
      lead="Insert any cartridge to see real screenshots, demo videos, the interesting engineering and its fallback chain, all taken from each project's README."
    >
      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal as="li" key={p.slug} delay={(i % 3) * 70}>
            <RackCartridge p={p} index={i} />
          </Reveal>
        ))}
      </ul>
    </Channel>
  );
}
