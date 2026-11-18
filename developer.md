# developer.md

Working notes for Sarthak Jain's portfolio (`portfolio_v2`). Start here if you (or a new Claude session) are picking this up.

- [Progress](#progress) · [v3 concept & research](#v3-concept--research) · [Screenshot critique](#screenshot-critique-v3) · [Data sources](#data-sources) · [Setup & run](#setup--run) · [Editing content](#editing-content) · [Deploy to Vercel](#deploy-to-vercel) · [Decisions](#decisions) · [Blockers & workarounds](#blockers--workarounds) · [TODO inventory](#todo-inventory) · [Quality results](#quality-results) · [History](#history-v1--v2)

---

## Progress

> Updated on every push. Branch: `claude/v1` (PR [SarthakJain29/portfolio_v2#1](https://github.com/SarthakJain29/portfolio_v2/pull/1), not merged).

### Done
- **v3 redesign, "The Fallback Console"**: a light, colourful, tactile hardware-style instrument (teenage-engineering inspired) replacing the v2 dark glass UI. Concept, research and the two rejected alternatives are [below](#v3-concept--research).
  - Hero: the console. Name, role, Resume/Email keys and the **top-3 project cartridges** sit in one screen; the LCD streams an answer through a simulated provider route (Gemini → Groq → offline). Flip a switch or hit **CHAOS** and it re-routes; turn everything off and it gracefully falls back to the **plain view**.
  - Projects: a rack of 10 cartridges, each labelled with its **real fallback chain**; "insert" one to open the inspector (screenshots, demo video, the interesting engineering, fallback chains, stack, links). The inspector is deep-linkable (`#project-<slug>`), and on phones it's a bottom sheet with drag-to-close.
  - Experience printed as thermal receipts; skills as a pressable keycap keyboard whose LCD shows which projects use each skill; education as a warranty card, achievements as draggable stickers; contact as a transmit panel; About as an "operator manual" with a live Hyderabad clock.
  - **Plain view** (`/plain`): every word of the site as a simple, printable page. It's also the no-JS target of every cartridge link.
  - Bold palette, Bricolage Grotesque (variable width) + Martian Mono + VT323, a day theme by default and a "night shift" dark theme.
  - Keyboard: every control is a real button/switch; keys **1–6** jump between channels; ⌘K palette ("insert cartridge: …", "total outage"); the Konami code fails every provider.
- **Real proof of work**: all 10 projects rewritten from their README/CHANGES.md on the named branches; 25 real screenshots imported as webp at their true aspect ratios; two demo videos re-encoded to 720p (lazy, muted hover preview, click for sound where there *is* sound); MF X-ray, News Shorts and Diffwise Evals featured.
- Verified: typecheck + lint + build pass; Lighthouse **100/100/100/100 desktop, 99/100/100/100 mobile** (plain view 100 everywhere); axe-core **0 WCAG A/AA violations** in day and night, desktop and mobile; Playwright regression (keyboard switches keep focus, digit channels, palette → inspector, Esc/Back closes, video plays with sound, reduced motion renders everything static). Details in [Quality results](#quality-results).
- Screenshots in `docs/`, critiqued against the brief, weakest parts fixed (see [critique](#screenshot-critique-v3)).

### In progress
- Nothing. PR #1 is updated and open for your review.

### Next (for you)
1. Add `public/resume.pdf` (every Resume key points there).
2. Deploy on Vercel, then fill the `live: null // TODO(live)` URLs in `src/data/site.ts`.
3. Decide whether project links should keep pointing at the `claude/*` branches (what the copy describes) or at `main` once you merge those branches.
4. Optional: re-render the Diffwise video with narration once the Gemini TTS quota allows (it's captions-only today).

---

## v3 concept & research

> v3 brief (Nov 2026): v2 felt "too dark and generic, boring stacked sections". Make it **playful and interactive with one memorable signature concept**, light/colourful by default, while recruiters still get name, role, top 3 projects, resume and contact in 10 seconds.

### Research: playful / interactive portfolios (v3 round)

Method: each site below was loaded with a real request; the ones marked 📸 were also rendered in headless Chromium and looked at (contact sheet in my scratchpad, not committed). Notes on behaviour beyond the first screen come from prior familiarity, not a click-through, so treat them as inspiration notes.

| # | Site | What it does | What I take / avoid |
| --- | --- | --- | --- |
| 1 | 📸 [daedalOS](https://dustinbrett.com) (Dustin Brett) | A full Windows-style desktop in the browser: icons, start menu, galaxy wallpaper, working apps. | The joy of "opening" things. Avoid: content is hidden behind icons; nothing is readable in 10 s. |
| 2 | 📸 [ryOS](https://os.ryo.lu) (Ryo Lu) | Mac-OS-style desktop with a dock, Finder bar and an AI assistant ("An AI OS experience, made with Cursor"). | An AI helper as part of the metaphor. Avoid: another OS clone. |
| 3 | 📸 [PostHog](https://posthog.com) | A company site rebuilt as a desktop: icons down both sides (incl. Trash), windows with traffic lights, illustrated wallpaper. | Proof the OS metaphor works for a *product* site. It also shows the trope is now mainstream (there are Bolt/Framer tutorials for "macOS-style portfolios"), so it's no longer memorable on its own. |
| 4 | [Bruno Simon](https://bruno-simon.com) | Drive a 3D car around his projects (Awwwards Site of the Day/Month, 2019; new Site of the Month Jan 2026). | One signature idea people retell. Avoid: WebGL weight vs. Lighthouse 95+. |
| 5 | 📸 [Lynn Fisher](https://lynnandtonic.com) | Redesigns every year (now "v.XIX"), currently a paper-textured book index with a display serif. | Personality and texture on a light background; an index that's one click to everything. |
| 6 | 📸 [Josh W. Comeau](https://www.joshwcomeau.com) | Bright sky-blue world, rainbow arc, 3D avatar, sound toggle, whimsical micro-interactions. | Light + colourful can still feel premium; delight in the details. |
| 7 | 📸 [Henry Heffernan](https://henryheffernan.com) | "Click start to begin": a 3D retro computer you sit in front of, with an OS inside. | A single tactile "object" as the hero. Avoid: gating content behind a start button. |
| 8 | 📸 [Jhey Tompkins](https://jhey.dev) | Light, minimal list with a hand-drawn signature, underlined links, live status lines (weather, now playing). | Small "live" readouts that make a page feel alive. |
| 9 | 📸 [Cassie Evans](https://cassie.codes) | Fluid generative artwork with a terminal-style note on top. | Generative background as atmosphere. (Dark; not my direction this time.) |
| 10 | 📸 [Pacôme Pertant](https://pacomepertant.com) | Motion & sound designer; Awwwards Site of the Day (Jun 2026) per search. | Sound/motion as identity; restraint in the first frame. |
| 11 | [teenage engineering](https://teenage.engineering) | Not a portfolio: a hardware brand (pocket operators, OP-1) famous for playful, labelled, colour-coded industrial design. | **The visual language for v3**: off-white chassis, orange/blue/yellow controls, tiny mono labels, toggles, LEDs. |
| 12 | [Nothing](https://nothing.tech) | Hardware brand: "a world where tech is fun again"; dot-matrix type and transparent hardware. | Dot-matrix / LCD type as a display face. |
| 13 | [godly.website](https://godly.website) → now redirects to **recent.design** (rendered 📸) | A feed of UI shots. Relevant items on the day: "Physical Texture Web Experiments", "Mechanical Key Switch Anatomy", "Playful Loading Screens", "Crumple Changelog", "Bot Animation States". | Physical, tactile UI is a current thread: keycaps, switches, paper. |
| 14 | ViramOS write-up and the Bolt "macOS-style portfolio" tutorial (search results) | Boot screens, draggable windows, taskbars, mini-games. | Confirms OS portfolios are a template genre now, a reason *not* to pick it. |
| — | Robby Leonardi's interactive résumé (rleonardi.com) | Classic "résumé as a side-scrolling game". | Couldn't load it (proxy refused), listed from memory only. |

### Three signature concepts

**A. "Fallback OS": a mini desktop where projects open as draggable windows.**
A light, colourful desktop; each project is an app icon; windows drag, stack and minimise; a "system tray" shows model status and the OS visibly fails over when you kill a provider.
- ➕ Instantly legible metaphor; draggable windows are genuinely fun; good container for screenshots/videos.
- ➖ It is the most common "creative dev portfolio" template right now (daedalOS, ryOS, PostHog, tutorials). Windows hide content (bad for the 10-second recruiter test), and it adapts poorly to phones (you end up building a second site).

**B. "Mission control": a status-page dashboard where projects are live service widgets.**
Every project is a service tile with health, uptime and latency; the hero is an incident console.
- ➕ Strong fit with LLM reliability and observability.
- ➖ Dashboards want numbers, and I have **no real live metrics**: any uptime or latency figure would be invented, which the brief forbids. Dashboards also skew dark and dense, which is what v2 was criticised for.

**C. "The Fallback Console": a tactile, colourful hardware device (teenage-engineering style) that demonstrates graceful fallback.** ✅ **Chosen**
The page *is* an instrument: an off-white chassis with chunky toggles, LEDs, keycaps and an LCD.
- **Hero:** the LCD streams an answer to "who is sarthak?" through a provider route (PRIMARY → SECONDARY → OFFLINE). Visitors flip the provider switches or hit a big red **CHAOS** button, and the console re-routes live and still answers. Turn *everything* off and it gracefully falls back to… the plain-text résumé view.
- **Projects** are cartridges / rack modules, each labelled with its real **fallback chain** taken from its README (e.g. "Gemini → Groq → mock").
- **Experience** prints out as a receipt from a thermal printer; **skills** are keycaps you can press; achievements are stickers on the case.

**Why C wins for a GenAI / LLM-reliability engineer:**
1. **It demonstrates the skill instead of decorating with it.** Model fallbacks and task-specific model selection are literally what Sarthak does at Myra AI, and **every one of the 10 projects has a real, documented fallback chain** (verified in each README). The interaction is the thesis: *things fail; good systems degrade gracefully*.
2. **It's honest.** The console shows states and routes, never fake uptime or latency numbers.
3. **It's memorable without being a template.** A "toy instrument" portfolio is rarer than an OS clone, and the CHAOS button gives people something to retell.
4. **It passes the 10-second test.** Name, role, the top-3 project cartridges, a RESUME key and a CONTACT key are all on the hero device. Everything else is one click away via the channel buttons, and ⌘K still works.
5. **It adapts to touch rather than shrinking.** On phones the console becomes a handheld (LCD on top, big thumb toggles), cartridges become a swipeable deck with bottom-sheet details, and channels become a bottom tab bar.
6. **It's light and colourful by default** (chassis cream, signal orange, electric blue, sunny yellow), with a "night shift" dark mode as the secondary option.

---

## Screenshot critique (v3)

I captured desktop (1440×900), mobile (390×844, DPR 2) and night mode, then judged them against the brief. Final screenshots are in `docs/`.

| Brief requirement | First pass (honest) | Fix |
| --- | --- | --- |
| Recruiter gets name, role, top 3, resume, contact in 10 s | ❌ The top-3 cartridges sat **below the fold** at 1440×900; only the LCD text named them. | Re-laid the hero as two columns: left = name, role, Resume/Email keys and the cartridge slot; right = the console. Measured: the cartridges end at 847 px, so they're fully visible at 1440×900. At 1280×800 the titles are visible. On a phone the first cartridge is visible before scrolling. |
| Strong mobile layout | ❌ **The whole page was 477 px wide on a 390 px phone.** The projects grid had no base column track, so one long, unbreakable fallback-chain line stretched it; mobile Chrome then widened the layout viewport and the top bar and inspector were cut off. My first "no overflow" check missed it because `overflow-x: clip` hid the scrollbar. | `grid-cols-1` (minmax(0,1fr)) on every breakpoint-only grid; added a check for `innerWidth` vs the device width. Now 390 = 390, and 360 too. |
| Experience section | ❌ **Receipts were invisible**: the "print" clip-path waited for `.in` on the receipt, but the reveal adds `.in` to the wrapper. | CSS now also matches `.in .print`. |
| Purposeful interactions | ⚠️ Standby providers had a blinking yellow LED, which read as "warning" though nothing was wrong. The CHAOS button remounted on each press and lost keyboard focus. | A calm "standby" LED state; the wobble restarts without remounting (verified: focus stays on the button). |
| Signature is understood | ⚠️ On desktop a blank band sat between the essentials and the cartridge slot, and nothing told people the console was interactive. | A small "That console is live. Switch Gemini off, or hit chaos…" hint fills the gap with purpose. |
| Accessibility | ⚠️ Lighthouse a11y 96: faint labels on the inset "wells" (3.9:1), white on the CHAOS red (4.36:1), the logo link's aria-label not containing its visible text, and small link targets on `/plain`. Signal orange/green/violet *text* on the light paper would also have failed (about 2.2:1). | Darker `--ink-3`, a deeper red, separate darker `--t-*` text tokens for coloured words in day mode, an sr-only link suffix instead of the aria-label, and taller tap targets. Now 100, and 0 axe violations in both themes. |
| Mobile polish | ⚠️ LinkedIn wrapped alone onto a second row; CGPA/scholarship appeared twice (card + stickers); the keyboard LCD was empty until you pressed a key. | Four-column key row on phones; stickers are achievements only; TypeScript is pre-pressed so the readout shows what it does. |

**Still not perfect (left as is, by choice):**
- Slot cartridges truncate the tagline and fallback chain at desktop width. The full text is one click away, and the rack shows it all.
- The LCD transcript is a *simulation*, which is labelled on the screen. It doesn't call real models (that would need keys and cost money).
- Stickers drag only with a mouse (touch drags would fight scrolling). They're decoration; the text is all readable without dragging.

---

## Data sources

Every project's copy, highlights, stack and fallback chains come from its README (and CHANGES.md where present) on the branch below, read on 5 Nov 2026. Images were imported from each repo's `docs/` with `scripts/import-assets.py`.

| Project (site) | Repo @ branch | Notes |
| --- | --- | --- |
| MF X-ray ★ | `MF-x-ray` @ `claude/v1` | Screenshots use the repo's synthetic sample portfolio. No CHANGES.md. |
| News Shorts ★ | `News-shorts` @ `claude/news-shorts-pwa-bs4t1d` | Phone screenshots (589×990) shown at their real ratio. No CHANGES.md. |
| Diffwise Evals ★ | `AI-code-review-bot` @ `claude/evals-scoreboard` (`evals/`) | **No Results section with headline scores**: only a 5-case smoke test has run, so the site describes the methodology and shows dataset facts (110 cases, 91/19, 12 repos) and the judge validation (19/19, κ 1.00, small set), with caveats. The bot itself is at Phase 1 (`docs/learning/PROGRESS.md`), so it's marked "in progress". |
| ScribeAI | `AI-Blog-Generator` @ `claude/revamp-v2-fpu17b` | Renamed product. |
| Folio | `PDF_Chatbot` @ `claude/revamp-v2` | Renamed product. |
| MeetNote | `MeetNote` @ `claude/revamp-v2` | |
| QuickChat | `Quick-Chat` @ `claude/revamp-v2-nyr6lf` | The README's demo login is **not** reproduced. |
| DragShift | `DragShift` @ `claude/revamp-v2` | The bundled macOS app is a Swift rewrite of `llamaboi55/DragShift` (MIT); credited in the inspector. |
| Similar Song AI | `Similar-song-AI` @ `claude/v1` | |
| Notes Inbox | `Notes-Inbox-app` @ `claude/v1` | Its images are **illustrative mockups** of real bot output (per its README); labelled as such. |
| Demo videos | `Demo-Videos` @ `claude/diffwise-video`, `claude/mf-xray-video` | Both are Remotion motion-graphics videos with **stylised mock UIs** (per their READMEs). Diffwise is captions-only (narration never generated), so it gets no sound control and its silent audio track was dropped. |

To refresh assets after a repo changes: clone the repos (lower-case folder names) on those branches into one folder, render `evals/reports/scoreboard.html` to a PNG if you want that image, then:

```bash
python3 scripts/import-assets.py --repos /path/to/clones --scoreboard /path/to/scoreboard.png
```

It rewrites `public/projects/**`, `public/video/**` and `src/data/media.json` (the real width/height of each image, used by `next/image`). Needs Pillow and ffmpeg.

---

## Setup & run

Requirements: Node.js ≥ 20.9 (developed on 22) and npm.

```bash
npm install
npm run dev        # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server. In dev, projects without a live URL show a red **TODO(live)** chip in the inspector. |
| `npm run build` / `npm start` | Production build / serve it (use this for Lighthouse). |
| `npm run check` | typecheck + lint |
| `python3 scripts/import-assets.py …` | Re-import screenshots/videos (see [Data sources](#data-sources)). |

No environment variables are required (`.env.example` documents the optional `NEXT_PUBLIC_SITE_URL`).

### Project layout

```
src/
  data/site.ts            ← ALL content (edit this)
  data/types.ts           ← types for the content
  data/media.json         ← generated image sizes (don't edit by hand)
  app/(console)/          the console page + its layout (top bar, inspector, palette)
  app/plain/page.tsx      plain view (no client JS)
  app/layout.tsx          fonts, theme script, SEO metadata, JSON-LD
  app/globals.css         design tokens (day/night), chassis, LCD, keys, cartridges, receipts…
  app/opengraph-image.tsx generated OG image
  components/console/     hero, fallback-console (the signature), cartridge, inspector, demo-video,
                          rack, receipts, keyboard, stickers/school, transmit, manual, top-bar, footer
  components/             command palette, interactions (keys 1–6, Konami), theme toggle, reveal, icons
public/projects/<slug>/   real screenshots (webp)
public/video/             demo videos (720p MP4) + posters
public/resume.pdf         ← you add this
scripts/import-assets.py  asset pipeline
docs/                     README screenshots
```

---

## Editing content

Everything lives in **`src/data/site.ts`**; `src/data/types.ts` explains each field.

- **Profile, About, links, resume path, "Now", time zone:** `site.profile`. Stats (`site.stats`) must be real numbers.
- **A project** needs: `slug`, `title`, `status` (`"built"` | `"in-progress"`), `label` (printed on the cartridge), `color` (`orange|blue|yellow|green|pink|violet`), `tagline`, `description`, `highlights`, `stack`, `fallbacks` (real chains, e.g. `{ label: "Answers", chain: ["Gemini", "Groq", "Mock"] }`), `media`, `github`, `live`. Optional: `repoName`, `featured` (1–3 = hero order), `facts`, `video`, `mediaNote`, `credit`.
- **Featured top 3:** set `featured: 1 | 2 | 3` on exactly three projects.
- **Images:** add the file to `public/projects/<slug>/`, add its size to `src/data/media.json` (or re-run the import script), then reference it in `media` with an honest `alt` and `kind` (`desktop` wide screenshot, `mobile` phone capture, `mockup` illustration). The build fails loudly if a size is missing.
- **Video:** `{ src, poster, title, caption, hasAudio }`. `hasAudio: false` hides the sound control.
- **Live links:** replace `live: null` (each has a `TODO(live)` comment).
- **Colours/theme:** tokens at the top of `src/app/globals.css`. Coloured *text* uses the `--t-*` tokens (they're darker in day mode for contrast).
- **Channels (nav):** `src/lib/nav.ts`.

---

## Deploy to Vercel

Free (Hobby) plan is enough.

1. Merge the PR to `main` when you're happy (or deploy the branch as a preview first).
2. Import `SarthakJain29/portfolio_v2` at <https://vercel.com/new>. Next.js is auto-detected; keep the defaults.
3. Deploy. You get a free `*.vercel.app` URL.
4. Optional: set `NEXT_PUBLIC_SITE_URL` to your final URL (Project → Settings → Environment Variables) and redeploy so canonical/OG/sitemap URLs are exact. Otherwise Vercel's `VERCEL_PROJECT_PRODUCTION_URL` is used.

Everything is statically prerendered (`/`, `/plain`, OG image, sitemap, robots). No server functions, databases or paid services. The videos (3.4 MB total) are served from `public/` with `preload="none"`.

---

## Decisions

v3 decisions first; earlier ones that still apply follow.

1. **Signature concept: "The Fallback Console"** (concept C), over a desktop-OS clone (common now, poor on phones, hides content) and a status dashboard (would need invented metrics). See [three signature concepts](#three-signature-concepts).
2. **The console is a labelled simulation.** No real LLM calls (keys, cost, abuse). The LCD says "SIMULATED MODEL ROUTE"; the only counters are the visitor's own session counts.
3. **Provider names on the switches mirror the real chain** used across the projects (Gemini → Groq → offline mock), so the toy maps to real work.
4. **"Graceful fallback" is structural.** Every cartridge is an `<a href="/plain#slug">`, so with no JS it lands on that project in the plain view. JS intercepts the click and opens the inspector instead. Turning every provider off offers the plain view too.
5. **Plain view is a route (`/plain`), not a CSS toggle.** It's server-rendered, has no client JS, prints cleanly, and is linkable and indexable. The header "PLAIN" control is a link styled as a switch.
6. **Light "day" theme is the default regardless of OS** (per the brief); "night shift" is opt-in and remembered.
7. **Typography:** Bricolage Grotesque (variable weight + **width**, used condensed for display), Martian Mono for hardware labels and VT323 for LCDs, all self-hosted from `@fontsource` (no Geist/Inter). Only Bricolage is preloaded. The OG image uses static `.woff` files because Satori can't read woff2 or variable fonts.
8. **Coloured text uses darker `--t-*` tokens in day mode**, because signal orange/green/violet as text on the paper colour fail WCAG. The bright colours stay for surfaces (keys, cartridges, stickers).
9. **Featured top 3 = MF X-ray, News Shorts, Diffwise Evals** (per the brief). Featured status shows as the hero slot and a ★ in the rack; the rack still lists all 10, so the Projects channel is complete on its own.
10. **Status labels are "Built" vs "In progress", never "Shipped"/"Live"**, because no deployments are confirmed yet. Diffwise is "In progress" because the bot is at Phase 1; only its eval harness is complete.
11. **GitHub links point at the branches the copy was written from** (e.g. `…/MeetNote/tree/claude/revamp-v2`). Several `main` branches still hold the older v1 code, which the descriptions don't describe.
12. **Diffwise shows methodology, not a score.** There's no Results section in `evals/README.md`; the committed report is a 5-case smoke test the README itself calls meaningless. The site shows dataset facts and judge validation, with caveats.
13. **The demo videos are captioned as what they are**: Remotion motion-graphics with mock UIs and fictional data. For Diffwise the primary visual is the real committed scoreboard report, not a frame of the mock UI.
14. **Videos re-encoded** to 1280×720 H.264 with faststart (12.6 MB → 3.4 MB), `preload="none"` with a poster. Hover gives a muted preview (fine pointers, motion allowed); a click or the button plays with sound. The captions-only Diffwise cut lost its silent audio track and has no sound control.
15. **Images** are pre-sized webp (≤1600 px wide desktop, ≤720 px phone) at the true aspect ratio, served through `next/image` with the real width/height from `media.json` (no CLS). Cartridge thumbnails use `alt=""` because the link already names the project; the inspector gallery carries descriptive alts.
16. **No animation, UI or 3D libraries.** CSS animation + small hooks. Interactive bits (console, top bar, inspector, video, keyboard, stickers, palette, theme, clock, copy button, scroll reveal) are client components; everything else is server-rendered. Lighthouse stays at 99–100.
17. **Reduced motion:** transcripts render instantly; no reveals, receipt printing, wire animation, blinking or wobble; no hover autoplay; confetti is skipped.
18. Still applicable from v1/v2: Next.js 16 + React 19 + TS 5.9 strict + Tailwind 4 + ESLint 9; all content in one typed file; `mailto:` + copy instead of a contact form (no backend/keys); no phone number; JSON-LD `Person`; branch `claude/v1`, never `main`, no force-push.

---

## Blockers & workarounds

| # | What | What I did | What you need to do |
| --- | --- | --- | --- |
| 1 | **Diffwise evals have no headline results** (full eval never run; only a 5-case smoke test). | Described the methodology; showed dataset facts and judge validation with caveats. | Run `npm run evals -- run --reviewer baseline` and add a Results section; then put real numbers in `facts`. |
| 2 | **Diffwise demo video is captions-only** (its README: narration lost to the Gemini TTS free-tier quota). | Dropped the silent track; no sound control. | Re-render with narration later and re-run the import script. |
| 3 | **Demo videos show mock UIs, not the real apps.** | Captioned honestly. | Optional: record real screen captures. |
| 4 | **Diffwise has no app screenshots** (the bot isn't built). | Rendered the committed `evals/reports/scoreboard.html` offline (network blocked) as a real artifact. | — |
| 5 | **No live demos confirmed.** | `live: null // TODO(live)` for all 10. | Deploy and fill them in. |
| 6 | **godly.website now redirects to recent.design** (a UI-shot feed), and rleonardi.com was refused by the proxy. | Rendered recent.design and used its relevant items; listed rleonardi from memory only (marked). | — |
| 7 | **`/resume.pdf` doesn't exist yet** (by design). | Every Resume key points there. | Add `public/resume.pdf`. |
| 8 | **`npm audit`: 8 moderate advisories, dev-only** (ESLint/typescript-eslint toolchain). Production dependencies: 0. | Left; the fix needs `--force` and breaks the lint config. | Re-check after future `eslint-config-next` releases. |
| 9 | **Lighthouse ran locally**, not on Vercel. | Recorded local numbers. | Re-run on the deployed URL if you want exact figures. |

---

## TODO inventory

Search `TODO` in `src/data/site.ts`:

- [ ] `public/resume.pdf`
- [ ] Live URLs for all 10 projects (`live: null // TODO(live)`)
- [ ] Decide branch vs `main` for the GitHub links once branches are merged
- [ ] Diffwise: real results after a full eval run; narrated video
- [ ] Optional: `NEXT_PUBLIC_SITE_URL` on Vercel

---

## Quality results

Local production build (`next build && next start`), Lighthouse 13, headless Chromium, 5 Nov 2026.

| Page | Run | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | Desktop | 100 | 100 | 100 | 100 | 0.3 s | 0.014 | 0 ms |
| `/` | Mobile (slow 4G, 4× CPU) | 99 | 100 | 100 | 100 | 1.0 s | 0.001 | 110 ms |
| `/plain` | Desktop | 100 | 100 | 100 | 100 | 0.2 s | 0 | 0 ms |
| `/plain` | Mobile | 100 | 100 | 100 | 100 | 0.9 s | 0 | 50 ms |

- **axe-core 4** (WCAG 2 A/AA + best practice), with transitions disabled so nothing is caught mid-fade: **0 violations** on `/` (day 1440, night 1440, night 390) and `/plain` (day, night).
- **Playwright regression:** no console errors; layout viewport = device width at 360/390 px; Space/Enter toggle provider switches and focus stays put; CHAOS keeps focus; keys 1–6 jump channels and update `aria-current`; Konami → total outage → REBOOT + plain-view link; ⌘K "news shorts" → inspector opens with `#project-news-shorts`; ▸ goes to the next project; Esc closes and clears the hash; MF X-ray video plays unmuted from its button (`preload="none"` beforehand); Diffwise shows ▶ Play only; the MongoDB keycap lists QuickChat. With `prefers-reduced-motion`, the transcript is complete immediately, reveals are at opacity 1 and receipts aren't clipped.

---

## History (v1 → v2)

- **v1** (Nov 4): a minimal Next.js portfolio, typed content file, command palette, SEO; a "graceful fallback" terminal in the hero. Research: 17 developer portfolios (Brittany Chiang, Lee Robinson, Rauno, Paco, Emil Kowalski, Josh Comeau, Lynn Fisher…).
- **v2** (Nov 4): a dark glass UI with Aceternity-style effects written from scratch (spotlight, glow cards, tracing beam, flip words, wordmark). It was rejected as "too dark and generic, boring stacked sections", which led to v3.
- Kept from v1/v2: the typed data file, SEO/OG/JSON-LD, the palette, the Konami egg and the "graceful fallback" idea, which went from a decoration to the whole concept.
