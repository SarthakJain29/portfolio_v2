import { site } from "@/data/site";
import media from "@/data/media.json";
import { TopBar } from "@/components/console/top-bar";
import { Footer } from "@/components/console/footer";
import { Inspector } from "@/components/console/inspector";
import { Interactions } from "@/components/interactions";

export default function ConsoleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopBar />
      <main id="main">{children}</main>
      <Footer />
      <Inspector projects={site.projects} media={media} />
      <Interactions />
    </>
  );
}
