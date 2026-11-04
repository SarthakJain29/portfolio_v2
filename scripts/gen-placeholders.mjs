// Generates the placeholder project images in public/projects/*.svg.
// Run: node scripts/gen-placeholders.mjs   (only needed if you add a project and want a placeholder)
// To use a real screenshot instead, drop it in public/projects/ and update `image` in src/data/site.ts.
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const out = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "projects");
mkdirSync(out, { recursive: true });

// [slug, title, hue]
const items = [
  ["quickchat", "QuickChat", 245],
  ["meetnote", "MeetNote", 190],
  ["ai-blog-generator", "AI-Blog-Generator", 285],
  ["pdf-chatbot", "PDF_Chatbot", 335],
  ["dragshift", "DragShift", 160],
  ["diffwise", "Diffwise", 265],
  ["mf-xray", "MF X-ray", 150],
  ["notes-inbox", "Notes Inbox", 215],
  ["similar-song-ai", "Similar Song AI", 310],
  ["news-shorts", "News Shorts", 30],
];

for (const [slug, title, hue] of items) {
  const a = `hsl(${hue} 85% 62%)`;
  const b = `hsl(${(hue + 60) % 360} 85% 58%)`;
  const size = title.length > 14 ? 54 : 68;
  // Keep everything important inside the central ~60% so object-cover crops stay safe.
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 750" width="1200" height="750" role="img" aria-label="${title} placeholder">
  <defs>
    <radialGradient id="a" cx="18%" cy="12%" r="70%"><stop offset="0" stop-color="${a}" stop-opacity=".85"/><stop offset="1" stop-color="${a}" stop-opacity="0"/></radialGradient>
    <radialGradient id="b" cx="88%" cy="95%" r="65%"><stop offset="0" stop-color="${b}" stop-opacity=".8"/><stop offset="1" stop-color="${b}" stop-opacity="0"/></radialGradient>
    <pattern id="g" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#fff" stroke-opacity=".06"/></pattern>
    <linearGradient id="w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".1"/><stop offset="1" stop-color="#fff" stop-opacity=".03"/></linearGradient>
  </defs>
  <rect width="1200" height="750" fill="#08080d"/>
  <rect width="1200" height="750" fill="url(#a)"/>
  <rect width="1200" height="750" fill="url(#b)"/>
  <rect width="1200" height="750" fill="url(#g)"/>
  <g>
    <rect x="260" y="185" width="680" height="380" rx="24" fill="url(#w)" stroke="#fff" stroke-opacity=".18"/>
    <circle cx="298" cy="223" r="7" fill="#fff" fill-opacity=".35"/><circle cx="322" cy="223" r="7" fill="#fff" fill-opacity=".35"/><circle cx="346" cy="223" r="7" fill="#fff" fill-opacity=".35"/>
    <line x1="260" y1="250" x2="940" y2="250" stroke="#fff" stroke-opacity=".12"/>
    <rect x="300" y="290" width="180" height="10" rx="5" fill="#fff" fill-opacity=".16"/>
    <rect x="300" y="312" width="120" height="10" rx="5" fill="#fff" fill-opacity=".1"/>
    <text x="600" y="425" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="${size}" font-weight="700" fill="#fff">${title}</text>
    <text x="600" y="475" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="20" fill="#fff" fill-opacity=".55">placeholder · replace in public/projects/</text>
    <rect x="300" y="515" width="600" height="10" rx="5" fill="#fff" fill-opacity=".08"/>
  </g>
</svg>
`;
  writeFileSync(join(out, `${slug}.svg`), svg);
}
console.log(`wrote ${items.length} placeholders to ${out}`);
