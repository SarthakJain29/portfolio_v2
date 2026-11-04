# developer.md

Working notes for Sarthak Jain's portfolio (`portfolio_v2`). Start here if you (or a new Claude session) are picking this up.

- [Progress](#progress) · [Concept & research](#concept--research) · [Setup & run](#setup--run) · [Editing content](#editing-content) · [Deploy to Vercel](#deploy-to-vercel) · [Decisions](#decisions) · [Blockers & workarounds](#blockers--workarounds) · [TODO inventory](#todo-inventory) · [Quality results](#quality-results)

---

## Progress

> Updated on every push. Branch: `claude/v1`.

### Done
- **v1** — Next.js 16 (App Router) + TypeScript (strict) + Tailwind 4; all content in one typed file (`src/data/site.ts`); all sections; command palette; SEO/OG; placeholder images; docs.
- **v2 redesign** (after feedback that v1 felt basic/common) — dark-first glass UI with an indigo→violet→cyan accent and a serif-italic accent font; floating pill nav with sliding indicator + scroll-progress bar; hero with aurora/beam/grid/meteors, word-by-word name reveal, flip-words line, tilting terminal card with floating chips and a moving-border CTA; animated stat strip + tech marquee; bento About (Now card, live Hyderabad clock, LeetCode, focus, education); tracing-beam experience timeline; featured project + 2×2 grid + horizontal "in progress" rail, all with pointer-follow glow cards; skills bento; education/achievements bento; contact card with gradient email; giant hover-reveal wordmark footer; restyled OG image.
- Light and dark themes both polished; dark is the default. `prefers-reduced-motion` honoured everywhere (re-verified).
- Verified in headless Chromium: no console errors, no horizontal overflow (1440 px / 390 px), palette, theme persistence, Konami, glow, count-up, reduced motion.
- Lighthouse (local prod build): desktop 100/100/100/100; mobile 95–100 performance, 100 for the rest. Details [below](#quality-results).
- README (new screenshots) and this file.

### In progress
- Nothing. The PR to `main` is open (not merged — that's yours).

### Next (for you)
1. Add `public/resume.pdf` (see [TODO inventory](#todo-inventory)).
2. Add GitHub URLs for the in-progress projects, and live-demo URLs where they exist.
3. Replace placeholder images in `public/projects/` with real screenshots (1200×750).
4. Deploy on Vercel and set `NEXT_PUBLIC_SITE_URL` once you have a final domain.

---

## Concept & research

### Concept: "Graceful fallback" — now with more polish

An elegant, dark-first page (glass cards, hairline borders, one indigo→violet→cyan accent, film grain, Geist Sans + Geist Mono, and Instrument Serif *italic* for emphasis words) whose playful touches all hang off one idea from my actual work: **LLM reliability — when the primary model fails, fall back gracefully.**

| Touch | What it does |
| --- | --- |
| **Hero** | Aurora glows, a swaying light beam, a masked grid, a few meteors and a pointer-following spotlight. The name reveals word-by-word; "I build *reliable APIs / GenAI applications / LLM evaluation tools / real-time apps*" cycles (all from my real work). Moving-border primary button. |
| **Hero terminal** | A fake `reliability.sh` session in a 3D-tilting glass card with floating tech chips: `ask primary-model "who is sarthak?"` → `503` → "falling back to secondary-model…" → `200` with a one-line bio. Replayable. Screen readers get a static sentence; reduced-motion users see the final state immediately. |
| **Stats strip + ticker** | Four count-up numbers (500+, 45%, 30%, 300+ — each taken from the brief) and two counter-rotating tech marquees. |
| **Bento About** | Bio with highlighter marks, a "Now" card, a live Hyderabad clock + coordinates, focus chips, education and LeetCode tiles. |
| **Experience** | A tracing beam that fills with gradient as you scroll, one glow-card per role. |
| **Glow cards** | Every card's border and surface glow follow the pointer. |
| **Floating nav** | Glass pill with a sliding active indicator, plus a thin gradient scroll-progress bar. |
| **Command palette** | `⌘/Ctrl+K` (or `/`, or the "Menu" button — which is also the mobile nav). Native `<dialog>` + ARIA combobox/listbox. |
| **Easter eggs** | Konami code (↑↑↓↓←→←→BA) or `sudo hire sarthak` in the palette → "primary-model unavailable → falling back to confetti 🎉" (confetti skipped under reduced motion). The footer wordmark also reveals a gradient under your cursor. |

Design rules I held myself to: content first, one accent family, animation that earns its place, **no animation or 3D library** (CSS + a few tiny hooks → small bundle, high Lighthouse), no layout shift, fully usable without JS, everything respects `prefers-reduced-motion`.

### Research round 2 (after the "too basic" feedback)

**[vibrant.design](https://vibrant.design)** — loaded directly (HTTP 200). It's a curated inspiration gallery ("Best of the Internet": websites, sections, launch videos, UI shots) with section categories like Hero, Features, **Bento**, Pricing, CTA, Logo Cloud, Testimonials, Footer. Items that stood out and shaped this redesign: *Naty Minimal Portfolio Site*, *Giant Wordmark Footer Concepts*, *Tilt-Responsive Rotating Manga Panel*, *Hex's Hero Section*, *Generative Shader Card Series*. Takeaways → giant outlined wordmark footer, tilt-responsive hero card, bento sections, richer hero depth. (It's a gallery, not a component library — there was no code to take.)

**[Aceternity UI](https://ui.aceternity.com)** — loaded directly; "200+ production-ready components… React, Tailwind CSS and Motion". I read its public component catalogue (114 component pages) and fetched the public registry JSON of 11 free components (`spotlight-new`, `tracing-beam`, `text-hover-effect`, `card-spotlight`, `flip-words`, `moving-border`, `bento-grid`, `infinite-moving-cards`, `text-generate-effect`, `floating-navbar`, `glowing-effect`). I read the first four in detail to understand how they're built (pointer-masked gradients, scroll-linked SVG beam, SVG gradient masks); for the rest I worked from their names/descriptions and standard CSS techniques. What I took:

| Aceternity pattern | My implementation (written from scratch) |
| --- | --- |
| Spotlight / Aurora / Meteors | `.hero-beam` conic-gradient cone, `.aurora-*` radial blobs, `ui/meteors.tsx` (CSS only) |
| Card Spotlight / Glowing Effect | `ui/glow-card.tsx` + `.glow-card` (pointer-masked radial gradients + gradient border) |
| Moving Border | `.btn-orbit` (animated `@property --angle` conic border) |
| Text Generate Effect | `.gen-word` blur-in (never starts at opacity 0, so LCP stays fast) |
| Flip Words | `ui/flip-words.tsx` |
| Tracing Beam | `ui/tracing-beam.tsx` (one CSS variable updated in rAF, no re-renders) |
| Bento Grid | About / Skills / Education / Projects layouts |
| Infinite Moving Cards | `ui/marquee.tsx` (CSS only, reduced-motion safe) |
| Text Hover Effect | `ui/wordmark.tsx` (SVG stroke gradient revealed by a pointer-following mask) |
| Floating Navbar | `header.tsx` pill nav with sliding indicator |
| 3D Card Effect | `ui/tilt.tsx` |

**Why not install Aceternity directly?** Its components depend on `motion` (+ `three`/`@react-three/fiber` for some) and many blocks are paid "Pro". Writing the techniques myself keeps the JS small (Lighthouse), avoids paid/licensed code, and lets everything honour reduced motion. I did **not** copy their source into this repo.

**Also searched:** 2026 web-design trend roundups — bento grids, refined glassmorphism, big expressive typography and dark mode are all current (and a counter-movement toward brutalism exists, which I deliberately did not follow). My search found nothing useful on serif-italic accents, so that choice (Instrument Serif italic on emphasis words) is my own judgement call.

### Research round 1: portfolios I looked at

I loaded each site below with a real HTTP request (all returned 200 and I read their `<title>`/meta description). For Bruno Simon and the palette-based sites I also used search results that cite Awwwards or the sites themselves. **Honest limits:** my web search returned mostly roundup/listing pages, and I could not get godly.website or Awwwards listing pages to return detail, so I did not browse them gallery-style. Observations about visual design/behaviour below come from those loads, the search snippets, and my prior familiarity with these sites — I did not click through each one interactively. Treat them as inspiration notes, not audits.

| # | Site | Why it's in the list | Taken into this design |
| --- | --- | --- | --- |
| 1 | [Brittany Chiang](https://brittanychiang.com) | The canonical minimal developer portfolio; appears in 2026 roundups as the minimalist reference. | Single page, section-per-concern structure, experience-first narrative. |
| 2 | [Bruno Simon](https://bruno-simon.com) | Awwwards Site of the Day (Nov 2019), Site of the Month, and Developer Award/Site of the Year in the 2019 annuals; newer Awwwards entry listed too. You drive a car around his projects. | One *memorable* idea beats ten effects; play, but keep it optional. |
| 3 | [Lee Robinson](https://leerob.com) | Almost pure typography; loads instantly. | Typographic hierarchy, performance as a feature. |
| 4 | [Rauno Freiberg](https://rauno.me) | Design-engineering craft and keyboard-friendly detail. | Small interaction details (focus states, the `⌘K` chip). |
| 5 | [Paco Coursey](https://paco.me) | Minimal site by the author of the `cmdk` command-menu library. | Command palette as primary power-user navigation. |
| 6 | [Emil Kowalski](https://emilkowal.ski) | Known for restrained, well-tuned animation. | Short easing curves, no gratuitous motion. |
| 7 | [Josh W. Comeau](https://joshwcomeau.com) | Playful micro-interactions, polished dark-mode toggle. | Delight that doesn't block content. |
| 8 | [Lynn Fisher](https://lynnandtonic.com) | Yearly playful redesigns. | Permission to be a little silly (easter eggs). |
| 9 | [Cassie Evans](https://cassie.codes) | SVG/animation-forward personal site. | One strong hero moment rather than many. |
| 10 | [Samuel Kraft](https://samuelkraft.com) | Clean design-engineer portfolio. | Card/spacing rhythm. |
| 11 | [Delba](https://delba.dev) | Listed in Scrimba's roundup for a small highlighter animation (Rough Notation). | The highlighter marks in About. |
| 12 | [Devouring Details](https://devouringdetails.com) | "An interactive reference manual for interaction-curious designers." | In-context demonstrative interaction (replayable terminal). |
| 13 | [Tobias Ahlin](https://tobiasahlin.com) / [Adam Wathan](https://adamwathan.me) | Dense-but-readable personal sites from tool authors. | Plain, scannable lists. |
| 14 | [0PNG portfolio](https://0png.github.io/projects/0png-portfolio) | Found via search: global Ctrl+K palette + terminal-window hero. | Validated the terminal-hero + palette combo. |
| 15 | [Aiyu portfolio terminal feature](https://github.com/aiyu-ayaan/Aiyu/wiki/Terminal-Feature) | Found via search: Ctrl+` terminal; Cmd+K separate. | Terminal is decoration, palette is navigation. |
| 16 | [newbieboiz](https://newbieboiz.vercel.app/projects/portfolio-website) / [Harris Ahmad's palette docs](https://harris-ahmad.github.io/COMMAND_PALETTE) | Found via search: cmdk-style palettes as first-class navigation. | `⌘K`/`Ctrl+K` conventions. |
| 17 | [awesome-command-palette](https://www.github.com/stefanjudis/awesome-command-palette) | Sites/libraries using palettes (GitHub, Vercel, Linear, Sentry…). | I built a small custom palette instead of adding `cmdk`/`kbar`. |

---

## Setup & run

Requirements: Node.js ≥ 20.9 (developed on 22) and npm.

```bash
npm install
npm run dev        # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server. In dev, projects missing a GitHub link show a red **TODO** chip. |
| `npm run build` / `npm start` | Production build / serve it (use this for Lighthouse). |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint (Next.js core-web-vitals + TypeScript rules) |
| `npm run check` | typecheck + lint |
| `node scripts/gen-placeholders.mjs` | Regenerate placeholder project SVGs. |

No environment variables are required. `.env.example` documents the one optional variable, `NEXT_PUBLIC_SITE_URL`.

### Project layout

```
src/
  data/site.ts          ← ALL content (edit this)
  data/types.ts         ← types for the content
  app/                  layout (SEO, fonts, theme script), page, OG image, robots, sitemap, icon, globals.css (design tokens)
  components/           page sections, hero, floating nav, command palette, theme toggle, project card…
  components/ui/        reusable effects: glow-card, tilt, flip-words, count-up, marquee, tracing-beam, wordmark, meteors, local-clock
  lib/                  small helpers (site URL, nav list, media-query hook, confetti)
public/projects/        placeholder project images (replace these)
public/resume.pdf       ← you add this
scripts/                placeholder generator
docs/                   README screenshots
```

---

## Editing content

Everything lives in **`src/data/site.ts`**; the TypeScript types in `src/data/types.ts` will tell you if you get a field wrong.

- **Profile / about / links / resume path:** `site.profile`. Also here: `heroWords` (the rotating "I build ___" phrases — keep them true), `aboutHighlights` (phrases underlined in the bio), `now` (the "Now" card), `coords` and `timeZone` (location card + live clock).
- **Stat strip:** `site.stats` (value, optional suffix, label). Only put real figures here.
- **Experience:** `site.experience` (an array; newest first).
- **Add a project:** append an object to `site.projects`. Required: `slug`, `title`, `status` (`"shipped"` or `"in-progress"`), `tagline`, `description`, `stack`, `image`, `imageAlt`, `github`, `live`. Use `null` for links you don't have yet. Shipped projects render first, in-progress ones in their own group.
- **Replace a placeholder image:** drop your screenshot into `public/projects/` (1200×750 recommended; `.png`, `.jpg`, `.webp` or `.svg`), then set that project's `image` to e.g. `"/projects/quickchat.png"`. Update `imageAlt` too.
- **Skills / education / achievements:** `site.skills`, `site.education`, `site.achievements`.
- **Resume:** put your PDF at `public/resume.pdf`. Until you do, the Resume buttons and the palette's "Download resume" will 404 — that's expected. (To change the path, edit `profile.resumeUrl`.)
- **Colours / theme:** the tokens at the top of `src/app/globals.css` (`--g1/--g2/--g3` are the accent gradient; `--bg`, `--fg`, … for the rest). Dark is the default; light is under `[data-theme="light"]`.
- **Accent word in a heading:** wrap it in `<Accent>…</Accent>` (serif italic gradient).
- **Nav sections:** `src/lib/nav.ts`.

---

## Deploy to Vercel

Free (Hobby) plan is enough.

1. Push this repo to GitHub (already done for `claude/v1`; merge the PR to `main` when you're happy).
2. Go to <https://vercel.com/new>, import `SarthakJain29/portfolio_v2`. Framework is auto-detected as Next.js; keep the defaults (build `next build`, no output dir changes).
3. Deploy. You get a free `*.vercel.app` URL.
4. Optional but recommended: in *Project → Settings → Environment Variables* add `NEXT_PUBLIC_SITE_URL` = your final URL (e.g. `https://sarthak-jain.vercel.app`) so canonical/OG/sitemap URLs are exact, then redeploy. If you skip it, the build uses Vercel's `VERCEL_PROJECT_PRODUCTION_URL` automatically.
5. Rename the project in Vercel (Settings → General) if you want a nicer `*.vercel.app` subdomain.

Everything is statically prerendered (`○ Static`); there are no server functions, databases or paid services.

---

## Decisions

Made unattended, as asked. Change any of them freely.

1. **Branch:** you asked for `claude/v1`; the session harness had pre-assigned `claude/optimistic-dijkstra-2w5z5h`. I followed your explicit instruction and worked/pushed only on `claude/v1`. Nothing was pushed to `main`, nothing force-pushed, no history rewritten.
2. **Stack:** Next.js 16 (latest stable), React 19, TypeScript 5.9 (strict + `noUncheckedIndexedAccess`), Tailwind 4, ESLint 9. I deliberately did **not** use TypeScript 7 / ESLint 10 (too new for the Next lint plugins).
3. **No animation, 3D or palette libraries** (no Motion/Framer, three.js, cmdk). CSS animations/transitions + IntersectionObserver + a few rAF-driven CSS variables; a custom ~260-line palette on native `<dialog>`. Keeps JS small and Lighthouse high.
4. **Fonts:** Geist Sans/Mono via the `geist` npm package and Instrument Serif (italic only) via `@fontsource/instrument-serif` loaded with `next/font/local` — all self-hosted at build, no Google Fonts network call. The OG image reads the same font files at build time.
5. **Contact:** `mailto:` + "copy email" button, no contact form — a form needs a backend/email service and secrets, and you asked for free-only/no keys. No phone number anywhere, per your instruction.
6. **Missing links policy:** missing GitHub/live URLs are `null` in the data file with `// TODO(link)` comments. In `npm run dev` the card shows a red dashed **"TODO: add GitHub link"** chip; in production it quietly reads "Repository link coming soon" instead of looking broken to visitors.
7. **In-progress projects get no GitHub link**, because I couldn't verify the repo URLs (see blockers) and you said not to invent links.
8. **Project copy is sourced, not embellished** — see blockers for how each description was derived. In-progress projects use only what you told me (name + one phrase); I did not add technologies you didn't mention.
9. **DragShift is credited to its upstream.** Its README says it's a rewrite of `llamaboi55/DragShift` (MIT) "from reading DragShift's source", so the card carries a visible credit link rather than implying it's an original idea.
10. **QuickChat's demo login (in its README) is not reproduced** on the site.
11. **Theme:** **dark by default** (the v2 design is tuned for it; light is fully supported and polished), regardless of OS setting; a manual choice is remembered in `localStorage` and applied by an inline script before paint (no flash). Say the word if you'd rather follow the OS.
12. **No availability claim** ("open to work" etc.) — you didn't say it, so I didn't.
13. **Hero entrance never starts at opacity 0.** An opacity-from-0 reveal on the hero text kept Chrome from counting it as LCP (mobile LCP 3.0 s); a transform-only entrance and a blur-in whose opacity starts at 0.25 fixed it (LCP 0.9 s mobile / 0.3 s desktop). Below-the-fold sections use the JS scroll reveal, which falls back to fully visible without JS.
17. **v2 redesign scope.** Reworked every section's visual design and added interaction, but kept the content model and facts unchanged. New data fields are limited to things derivable from your brief (stats = your stated numbers; coordinates/time zone = Hyderabad).
18. **Stat strip numbers** count up only if the strip is below the fold at load (otherwise the final number just shows), so there's never a visible reset flicker; SSR/no-JS/reduced-motion always render the final numbers.
19. **In-progress projects** moved to a horizontally scrolling snap row (keyboard-focusable region) so the five placeholder-ish cards don't dominate the page; shipped projects are a featured card + 2×2 grid.
20. **Decorative elements are `aria-hidden`** (meteors, chips, wordmark, aurora); the terminal and flip-words have screen-reader-only static equivalents.
14. **Education + achievements** share one section; the 300+ LeetCode stat appears in the hero summary, About facts and achievements (all from your brief).
15. **OG image** is generated at build time with `next/og` (`src/app/opengraph-image.tsx`), dark card with name/role/tagline — no binary asset to maintain.
16. **Screenshots in `docs/`** are committed (≈0.5 MB) for the README.

---

## Blockers & workarounds

| # | What failed / was unavailable | What I tried | Workaround | What you need to do |
| --- | --- | --- | --- | --- |
| 1 | **MeetNote README is the stock `create-next-app` text** — it says nothing about the product. | Fetched `main` and `master` (both identical, 1.4 KB boilerplate). | Described it only from what you gave me: "AI meeting summarizer", Next.js + Express + PostgreSQL. | Add a real description/feature bullets (and ideally update the repo README). |
| 2 | **AI-Blog-Generator README is a generic Turborepo+Bun monorepo template** (stale names like `prescription-ai`, `@my-scope`), with no product features. | Fetched `main`/`master` (identical). | Described the verifiable architecture: Next.js 15 frontend, Dockerised Express API, shared eslint/ts/utils/db packages, Turborepo pipeline. "AI blog generator" comes from the repo name/your brief. | Add what it actually generates / how (and a better README). |
| 3 | **PDF_Chatbot README** is likewise a monorepo template (stale `business-os-api` name). `main` branch 404s; `master` works. | Tried both branches. | Described Next.js App Router web app + Express API with health/ready endpoints + shared packages. "Chat with your PDFs" comes from the name. | Add features (RAG? embeddings? model?) and a real README. |
| 4 | **DragShift's README is titled "ShiftDrop"**, a native macOS Swift rewrite of someone else's project. | Fetched both branches (identical). | Used its description (radial drop menu, Swift/AppKit/ImageIO/PDFKit) and credited upstream on the card. | Confirm the repo is yours to present as a project and that the name you want shown is "DragShift" (vs "ShiftDrop"). |
| 5 | **Couldn't list your GitHub repos** (API blocked: "sessions are bound to their configured repositories"). | Tried `api.github.com/users/SarthakJain29/repos`. I did not guess URLs for the in-progress repos. | In-progress cards have `github: null` + `TODO(link)`. The five shipped repos link to `github.com/SarthakJain29/<name>`; their READMEs fetched OK via raw.githubusercontent.com, which confirms they exist. | Paste the in-progress repo URLs (or leave null if private). |
| 6 | **godly.website / Awwwards listings gave thin results** through search; some pages timed out (`rykerhoward.com` 502). | Several searches; direct HTTP loads of 17 sites. | Research is based on verified loads + search snippets + prior knowledge, with limits stated openly in [Research](#research-what-i-looked-at-and-what-i-took-from-it). | Optional: browse godly.website yourself for more inspiration. |
| 7 | **No project screenshots or live demos available.** | — | Generated per-project placeholder SVGs; `live: null` everywhere. | Add screenshots/demos (see [Editing content](#editing-content)). |
| 8 | **`/resume.pdf` doesn't exist yet** (by design). | — | Button points at it per your spec; it 404s until the file is added. | Add `public/resume.pdf`. |
| 9 | **`npm audit` reports 8 moderate advisories**, all in the *dev-time* ESLint/typescript-eslint toolchain (transitive deps of `eslint-config-next`). | Checked `npm audit`; the "fix" requires `--force` and would downgrade/break the lint config. | Left as is — they're dev-only and not shipped to the browser. Production dependencies (`next`, `react`, `react-dom`, `geist`) have no findings in my run. | Re-run `npm audit` / bump `eslint-config-next` later. |
| 10 | **Lighthouse ran locally** (headless Chromium vs a local `next start`), not against Vercel. | — | Recorded those numbers. Real-world scores on Vercel's CDN should be equal or better. | Re-run on the deployed URL if you care about exact numbers. |
| 11 | **vibrant.design has no components to scrape** — it's an inspiration gallery. | Loaded it and read its categories/titles. | Used it for layout/visual ideas only (bento, giant wordmark footer, tilt hero). | Nothing. |
| 12 | **Aceternity's licence terms weren't confirmed** (`/license` and `/docs/faq` returned 404 and I didn't locate their licence text), and many of their blocks are paid Pro. | Fetched the public registry JSON of 11 free components and read four in detail (`spotlight-new`, `tracing-beam`, `text-hover-effect`, `card-spotlight`) purely to understand the techniques. | Re-implemented every pattern from scratch in this repo (no copied code, no `motion`/`three` dependency). | If you want to use their actual components, check their terms first. |

FYI (not a blocker): QuickChat's public README contains a demo login. That's fine for a demo account, just be sure it's not a real credential.

---

## TODO inventory

Search for `TODO` in `src/data/site.ts`. Current list:

- [ ] `public/resume.pdf` — add your resume (profile.resumeUrl).
- [ ] GitHub URLs for **Diffwise, MF X-ray, Notes Inbox, Similar Song AI, News Shorts** (`github: null`).
- [ ] Live demo URLs for **QuickChat, MeetNote, AI-Blog-Generator, PDF_Chatbot** (`live: null`) — optional, if deployed.
- [ ] Real screenshots to replace all 10 placeholder images in `public/projects/`.
- [ ] Better descriptions for MeetNote, AI-Blog-Generator, PDF_Chatbot (their READMEs don't describe the products).
- [ ] Optional: set `NEXT_PUBLIC_SITE_URL` on Vercel after you pick a final domain.

---

## Quality results

Measured with Lighthouse 13 against a local production build (`next build && next start`), headless Chromium, v2 design.

| Run | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Desktop | 100 | 100 | 100 | 100 | 0.3 s | 0 | 50 ms |
| Mobile (simulated slow 4G, 4× CPU) | 95–100 | 100 | 100 | 100 | 0.9 s | 0 | 90–240 ms |

Other checks (Playwright): no console errors/warnings; no horizontal overflow at 1440 px and 390 px; default theme is dark even with an OS-light browser, toggle persists across reload; `⌘/Ctrl+K` opens the palette and Enter navigates (nav indicator follows); Konami fires the toast + 48 confetti pieces; glow cards track the pointer; stat numbers end on their final values; with `prefers-reduced-motion: reduce` the terminal renders fully at once, reveals are visible immediately, flip-words become a static sentence, meteors/aurora/beam are off, the marquee becomes a static wrapped list, and confetti is skipped.

Accessibility notes: skip link, one `h1`, labelled landmarks/sections, visible focus rings, `aria-current` on the active nav link, external links announce "(opens in a new tab)", decorative elements `aria-hidden`, colour contrast AA in both themes, in-progress rail is a focusable labelled region, palette uses the ARIA combobox/listbox pattern on a native modal `<dialog>`.
