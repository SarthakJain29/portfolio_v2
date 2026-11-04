import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.profile.name} — ${site.profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const { profile } = site;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0a0a0b",
          color: "#f4f4f5",
          backgroundImage: "radial-gradient(circle at 85% 15%, rgba(165,180,252,0.22), transparent 55%)",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#a5b4fc", letterSpacing: 4, textTransform: "uppercase" }}>
          {profile.role} · {profile.location}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 112, fontWeight: 700, letterSpacing: -3, lineHeight: 1.05 }}>{profile.name}</div>
          <div style={{ marginTop: 28, fontSize: 36, color: "#a1a1aa", lineHeight: 1.35, maxWidth: 940 }}>
            {profile.tagline}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#8b8b94" }}>
          <span style={{ color: "#a5b4fc" }}>$&nbsp;</span>ask primary-model &quot;who is sarthak?&quot;
        </div>
      </div>
    ),
    size,
  );
}
