import { site } from "@/data/site";
import { Hero } from "@/components/console/hero";
import { Manual } from "@/components/console/manual";
import { Rack } from "@/components/console/rack";
import { Receipts } from "@/components/console/receipts";
import { Channel } from "@/components/console/channel";
import { Keyboard } from "@/components/console/keyboard";
import { School } from "@/components/console/school";
import { Transmit } from "@/components/console/transmit";

export default function Home() {
  return (
    <>
      <Hero />
      <Manual />
      <Rack />
      <Receipts />
      <Channel
        id="keys"
        no="04"
        kicker="Skills · keyboard"
        title={
          <>
            Tools I <span className="text-t-violet">type with</span>.
          </>
        }
        lead="Press a key to see which of the projects above actually use it."
      >
        <Keyboard groups={site.skills} projects={site.projects} />
      </Channel>
      <School />
      <Transmit />
    </>
  );
}
