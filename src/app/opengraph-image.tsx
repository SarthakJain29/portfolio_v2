import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.profile.name} — ${site.profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const { profile } = site;
  // Satori needs ttf/otf/woff (not woff2): use the .woff shipped with @fontsource.
  const root = process.cwd();
  const [serif, sansRegular, sansBold] = await Promise.all([
    readFile(join(root, "node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff")),
    readFile(join(root, "node_modules/geist/dist/fonts/geist-sans/Geist-Regular.ttf")),
    readFile(join(root, "node_modules/geist/dist/fonts/geist-sans/Geist-Bold.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "Geist",
          padding: 72,
          background: "#07070b",
          color: "#ececf1",
          backgroundImage:
            "radial-gradient(circle at 12% 8%, rgba(129,140,248,0.38), transparent 45%), radial-gradient(circle at 92% 92%, rgba(192,132,252,0.30), transparent 45%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: "#a0a0b0" }}>
          <div style={{ width: 12, height: 12, borderRadius: 12, background: "#4ade80" }} />
          {profile.role} at {profile.now.company} · {profile.location}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 132, fontWeight: 700, letterSpacing: -5, lineHeight: 1 }}>{profile.name}</div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 52, color: "#a0a0b0", alignItems: "baseline", gap: 16 }}>
            I build
            <span style={{ fontFamily: "Instrument Serif", fontStyle: "italic", fontSize: 64, color: "#c4b5fd" }}>
              reliable APIs
            </span>
            &amp;
            <span style={{ fontFamily: "Instrument Serif", fontStyle: "italic", fontSize: 64, color: "#a5f3fc" }}>
              GenAI apps
            </span>
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 24, color: "#7d7d8c" }}>
          <span style={{ color: "#9ea0ff" }}>$&nbsp;</span>ask primary-model &quot;who is sarthak?&quot;
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: sansRegular, style: "normal", weight: 400 },
        { name: "Geist", data: sansBold, style: "normal", weight: 700 },
        { name: "Instrument Serif", data: serif, style: "italic", weight: 400 },
      ],
    },
  );
}
