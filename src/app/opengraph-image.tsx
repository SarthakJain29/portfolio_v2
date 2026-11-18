import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.profile.name}: ${site.profile.role}. The SJ-01 Fallback Console portfolio.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const COLORS: Record<string, string> = {
  orange: "#ff5a1f",
  blue: "#2d5bff",
  yellow: "#ffc21a",
  green: "#1fb46a",
  pink: "#ff7ab6",
  violet: "#8e6bff",
};

export default async function OpengraphImage() {
  const { profile, projects } = site;
  const featured = projects.filter((p) => p.featured).sort((a, b) => (a.featured ?? 9) - (b.featured ?? 9));
  // Satori needs ttf/otf/woff (not woff2, not variable): static files from @fontsource.
  const root = join(process.cwd(), "node_modules/@fontsource");
  const [regular, heavy, pixel] = await Promise.all([
    readFile(join(root, "bricolage-grotesque/files/bricolage-grotesque-latin-400-normal.woff")),
    readFile(join(root, "bricolage-grotesque/files/bricolage-grotesque-latin-800-normal.woff")),
    readFile(join(root, "vt323/files/vt323-latin-400-normal.woff")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 40,
          fontFamily: "Bricolage",
          background: "#ebe5d8",
          backgroundImage:
            "linear-gradient(rgba(23,23,26,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(23,23,26,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            background: "#f7f4ee",
            borderRadius: 32,
            border: "2px solid rgba(23,23,26,0.2)",
            padding: "36px 44px",
            color: "#17171a",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 20, letterSpacing: 3, color: "#6b675d" }}>
            <div style={{ width: 14, height: 14, borderRadius: 14, background: "#1fb46a" }} />
            SJ-01 · FALLBACK CONSOLE · {profile.location.toUpperCase()}
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: 14 }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", fontSize: 116, fontWeight: 800, letterSpacing: -4, lineHeight: 0.95 }}>
                {profile.name}
                <span style={{ color: "#ff5a1f" }}>.</span>
              </div>
              <div style={{ display: "flex", fontSize: 32, marginTop: 10, color: "#4a4740" }}>
                {profile.role} · GenAI & LLM reliability
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 22, marginTop: 28, flex: 1 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1.15,
                background: "#c5d3a0",
                color: "#1e2a10",
                borderRadius: 18,
                padding: "16px 22px",
                fontFamily: "Pixel",
                fontSize: 30,
                lineHeight: 1.2,
              }}
            >
              <span>{'> ask "who is sarthak?"'}</span>
              <span style={{ opacity: 0.6, textDecoration: "line-through" }}>→ PRIMARY (Gemini) ....... 503 ✗</span>
              <span>→ SECONDARY (Groq) ...... 200 ✓</span>
              <span>[fallback] answered. Nothing broke.</span>
            </div>
            <div style={{ display: "flex", gap: 12, flex: 1 }}>
              {featured.map((p) => (
                <div
                  key={p.slug}
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    background: COLORS[p.color],
                    borderRadius: "16px 16px 8px 8px",
                    padding: 10,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      background: "#fffdf6",
                      borderRadius: 10,
                      padding: "10px 12px",
                      fontSize: 24,
                      fontWeight: 800,
                      lineHeight: 1,
                    }}
                  >
                    {p.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bricolage", data: regular, style: "normal", weight: 400 },
        { name: "Bricolage", data: heavy, style: "normal", weight: 800 },
        { name: "Pixel", data: pixel, style: "normal", weight: 400 },
      ],
    },
  );
}
