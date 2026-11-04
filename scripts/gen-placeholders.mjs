// Generates the placeholder project images in public/projects/*.svg.
// Run: node scripts/gen-placeholders.mjs   (only needed if you add a project and want a placeholder)
// To use a real screenshot instead, drop it in public/projects/ and update `image` in src/data/site.ts.
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const out = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "projects");
mkdirSync(out, { recursive: true });

const items = [
  ["quickchat", "QuickChat", 245],
  ["meetnote", "MeetNote", 190],
  ["ai-blog-generator", "AI-Blog-Generator", 285],
  ["pdf-chatbot", "PDF_Chatbot", 15],
  ["dragshift", "DragShift", 160],
  ["diffwise", "Diffwise", 265],
  ["mf-xray", "MF X-ray", 140],
  ["notes-inbox", "Notes Inbox", 215],
  ["similar-song-ai", "Similar Song AI", 320],
  ["news-shorts", "News Shorts", 35],
];

for (const [slug, title, hue] of items) {
  const a = `hsl(${hue} 70% 55%)`;
  const b = `hsl(${(hue + 50) % 360} 70% 40%)`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 750" width="1200" height="750" role="img" aria-label="${title} placeholder">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>
    <pattern id="p" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="#fff" fill-opacity=".25"/></pattern>
  </defs>
  <rect width="1200" height="750" fill="url(#g)"/>
  <rect width="1200" height="750" fill="url(#p)"/>
  <rect x="150" y="150" width="900" height="450" rx="22" fill="#0a0a0b" fill-opacity=".72"/>
  <circle cx="190" cy="190" r="8" fill="#fff" fill-opacity=".5"/><circle cx="218" cy="190" r="8" fill="#fff" fill-opacity=".5"/><circle cx="246" cy="190" r="8" fill="#fff" fill-opacity=".5"/>
  <text x="600" y="395" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="72" font-weight="700" fill="#fff">${title}</text>
  <text x="600" y="460" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="26" fill="#fff" fill-opacity=".7">placeholder · replace in public/projects/</text>
</svg>
`;
  writeFileSync(join(out, `${slug}.svg`), svg);
}
console.log(`wrote ${items.length} placeholders to ${out}`);
