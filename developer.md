# developer.md

Working notes for Sarthak Jain's portfolio (`portfolio_v2`). Start here if you (or a new Claude session) are picking this up.

- [Progress](#progress) · [Concept & research](#concept--research) · [Setup & run](#setup--run) · [Editing content](#editing-content) · [Deploy to Vercel](#deploy-to-vercel) · [Decisions](#decisions) · [Blockers & workarounds](#blockers--workarounds) · [TODO inventory](#todo-inventory) · [Quality results](#quality-results)

---

## Progress

> Updated on every push. Branch: `claude/v1`.

### Done
- Next.js 16 (App Router) + TypeScript (strict) + Tailwind 4 scaffold. `npm run check` (typecheck + lint) and `npm run build` pass.
- All content in one typed file: `src/data/site.ts` (types in `src/data/types.ts`).
- Sections: hero, about, experience, projects (5 shipped + 5 in progress), skills, education & achievements, contact. Resume button → `/resume.pdf`.
- Interactive elements: command palette (⌘/Ctrl+K or `/`), pointer-reactive hero spotlight, "model fallback" hero terminal, easter eggs (Konami code, `sudo hire sarthak`).
- Dark/light theme (no flash, remembers choice, follows OS by default), scroll reveals, `prefers-reduced-motion` honoured everywhere.
- SEO: metadata, canonical, Open Graph + Twitter image (generated), JSON-LD `Person`, `robots.txt`, `sitemap.xml`, favicon.
- Placeholder project images (`public/projects/*.svg`) + generator script.
- Verified in headless Chromium (desktop + mobile + reduced motion): no console errors, no horizontal overflow, palette/theme/Konami work.
- Lighthouse (local prod build): desktop 100/100/100/100; mobile 98–100 performance, 100 for the rest. Details [below](#quality-results).
- README with screenshots; this file.

### In progress
- Nothing. Final review and the PR to `main` (not merged — that's yours).

### Next (for you)
1. Add `public/resume.pdf` (see [TODO inventory](#todo-inventory)).
2. Add GitHub URLs for the in-progress projects, and live-demo URLs where they exist.
3. Replace placeholder images in `public/projects/` with real screenshots.
4. Deploy on Vercel and set `NEXT_PUBLIC_SITE_URL` once you have a final domain.

---

## Concept & research

### Concept: "Graceful fallback"

A quiet, editorial, mostly-typographic page (generous whitespace, one indigo accent, Geist Sans + Geist Mono) with a few playful touches that all hang off a single idea from my actual work: **LLM reliability — when the primary model fails, fall back gracefully.**

| Touch | What it does |
| --- | --- |
| **Hero terminal** | A fake `reliability.sh` session: `ask primary-model "who is sarthak?"` → `503` → "falling back to secondary-model…" → `200` with a one-line bio. Replayable. Screen readers get a static sentence; reduced-motion users see the final state immediately. |
| **Pointer spotlight** | A soft accent glow follows the cursor over a dot grid in the hero. Fine-pointer devices only; hidden under reduced motion. |
| **Command palette** | `⌘/Ctrl+K` (or `/`, or the "Menu" button — which is also the mobile nav). Jump to sections, toggle theme, copy/send email, open socials and project repos. Built on the native `<dialog>` (free focus trap, Esc, inert background) with the ARIA combobox/listbox pattern. |
| **Easter eggs** | Konami code (↑↑↓↓←→←→BA) or the palette command `sudo hire sarthak` → "primary-model unavailable → falling back to confetti 🎉" (confetti is skipped under reduced motion; the toast still shows). `sudo hire sarthak` then opens a pre-filled email. |

Design rules I held myself to: content first, one accent colour, animation only where it earns its place (≤0.7s, transform/opacity), no animation library (CSS + a handful of tiny hooks), no layout shift, fully usable without JS.

### Research: what I looked at and what I took from it

I loaded each site below with a real HTTP request (all returned 200 and I read their `<title>`/meta description). For Bruno Simon and the palette-based sites I also used search results that cite Awwwards or the sites themselves. **Honest limits:** my web search returned mostly roundup/listing pages, and I could not get godly.website or Awwwards listing pages to return detail, so I did not browse them gallery-style. Observations about visual design/behaviour below come from those loads, the search snippets, and my prior familiarity with these sites — I did not click through each one interactively. Treat them as inspiration notes, not audits.

| # | Site | Why it's in the list | Taken into this design |
| --- | --- | --- | --- |
| 1 | [Brittany Chiang](https://brittanychiang.com) | The canonical minimal developer portfolio ("software engineer who builds accessible, inclusive products"); appears in 2026 roundups as the minimalist reference. | Single page, section-per-concern structure, restrained palette, experience-first narrative. |
| 2 | [Bruno Simon](https://bruno-simon.com) | Awwwards Site of the Day (Nov 2019), Site of the Month, and Developer Award/Site of the Year in the 2019 annuals; newer Awwwards entry listed too. You drive a car around his projects. | The lesson: one *memorable* idea beats ten effects. I took the "play, but keep it optional" attitude, not the 3D. |
| 3 | [Lee Robinson](https://leerob.com) ("Developer and writer.") | Almost pure typography; loads instantly. | Typographic hierarchy, tiny footprint, performance as a feature. |
| 4 | [Rauno Freiberg](https://rauno.me) | Design-engineering craft and keyboard-friendly detail. | Attention to small interaction details (focus states, hints like the `⌘K` chip). |
| 5 | [Paco Coursey](https://paco.me) | Minimal site by the author of the `cmdk` command-menu library. | The command palette as primary power-user navigation. |
| 6 | [Emil Kowalski](https://emilkowal.ski) ("Design engineer working at Linear.") | Known for restrained, well-tuned animation. | Short easing curves, no gratuitous motion. |
| 7 | [Josh W. Comeau](https://joshwcomeau.com) | Playful micro-interactions and a polished dark-mode toggle. | Delight that doesn't block content; theme toggle behaviour. |
| 8 | [Lynn Fisher](https://lynnandtonic.com) | Yearly playful redesigns; proof personality sticks. | Permission to be a little silly (the easter eggs). |
| 9 | [Cassie Evans](https://cassie.codes) | SVG/animation-forward personal site. | Reinforced "one playful hero element", not many. |
| 10 | [Samuel Kraft](https://samuelkraft.com) ("I design & build interfaces") | Clean design-engineer portfolio. | Card/spacing rhythm for the projects grid. |
| 11 | [Delba](https://delba.dev) | Listed in Scrimba's roundup for using a small highlighter animation (Rough Notation) to add interactivity without clutter. | Confirmed that one subtle flourish is enough. |
| 12 | [Devouring Details](https://devouringdetails.com) | "An interactive reference manual for interaction-curious designers." | Inspiration for in-context, demonstrative interaction (the replayable terminal). |
| 13 | [Tobias Ahlin](https://tobiasahlin.com) / [Adam Wathan](https://adamwathan.me) | Loaded and compared: dense-but-readable personal sites from tool authors. | Plain, scannable lists for skills/achievements. |
| 14 | [0PNG portfolio](https://0png.github.io/projects/0png-portfolio) | Found via search: global Ctrl+K palette modelled as a small virtual filesystem + terminal-window hero. | Validated the terminal-hero + palette combo; I chose a narrative (fallback) instead of a filesystem. |
| 15 | [Aiyu portfolio terminal feature](https://github.com/aiyu-ayaan/Aiyu/wiki/Terminal-Feature) | Found via search: Ctrl+` focuses a terminal; Cmd+K is separate search. | Kept palette and terminal conceptually separate: terminal is decoration, palette is navigation. |
| 16 | [newbieboiz](https://newbieboiz.vercel.app/projects/portfolio-website) and [Harris Ahmad's palette docs](https://harris-ahmad.github.io/COMMAND_PALETTE) | Found via search: cmdk-style palettes as first-class navigation. | `⌘K`/`Ctrl+K` conventions. |
| 17 | [awesome-command-palette](https://www.github.com/stefanjudis/awesome-command-palette) | List of sites/libraries using palettes (GitHub, Vercel, Linear, Sentry…). | Convention check; I built a small custom palette instead of adding `cmdk`/`kbar` (bundle size). |

**Patterns across them:** the best ones are fast, typographic and opinionated; the playful ones keep the playfulness *optional* and the content reachable without it; and keyboard-first navigation is a signature of engineer portfolios. That's the brief this site follows.

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
  components/           sections + hero, command palette, theme toggle, etc.
  lib/                  small helpers (site URL, nav list, media-query hook, confetti)
public/projects/        placeholder project images (replace these)
public/resume.pdf       ← you add this
scripts/                placeholder generator
docs/                   README screenshots
```

---

## Editing content

Everything lives in **`src/data/site.ts`**; the TypeScript types in `src/data/types.ts` will tell you if you get a field wrong.

- **Profile / about / links / resume path:** `site.profile`.
- **Experience:** `site.experience` (an array; newest first).
- **Add a project:** append an object to `site.projects`. Required: `slug`, `title`, `status` (`"shipped"` or `"in-progress"`), `tagline`, `description`, `stack`, `image`, `imageAlt`, `github`, `live`. Use `null` for links you don't have yet. Shipped projects render first, in-progress ones in their own group.
- **Replace a placeholder image:** drop your screenshot into `public/projects/` (1200×750 recommended; `.png`, `.jpg`, `.webp` or `.svg`), then set that project's `image` to e.g. `"/projects/quickchat.png"`. Update `imageAlt` too.
- **Skills / education / achievements:** `site.skills`, `site.education`, `site.achievements`.
- **Resume:** put your PDF at `public/resume.pdf`. Until you do, the Resume buttons and the palette's "Download resume" will 404 — that's expected. (To change the path, edit `profile.resumeUrl`.)
- **Colours / theme:** the tokens at the top of `src/app/globals.css` (`--accent`, `--bg`, …).
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
3. **No animation or palette libraries.** CSS transitions + IntersectionObserver for reveals; a custom ~250-line palette on native `<dialog>`. Keeps JS small and Lighthouse high.
4. **Fonts:** Geist via the `geist` npm package (self-hosted at build; no Google Fonts network call).
5. **Contact:** `mailto:` + "copy email" button, no contact form — a form needs a backend/email service and secrets, and you asked for free-only/no keys. No phone number anywhere, per your instruction.
6. **Missing links policy:** missing GitHub/live URLs are `null` in the data file with `// TODO(link)` comments. In `npm run dev` the card shows a red dashed **"TODO: add GitHub link"** chip; in production it quietly reads "Repository link coming soon" instead of looking broken to visitors.
7. **In-progress projects get no GitHub link**, because I couldn't verify the repo URLs (see blockers) and you said not to invent links.
8. **Project copy is sourced, not embellished** — see blockers for how each description was derived. In-progress projects use only what you told me (name + one phrase); I did not add technologies you didn't mention.
9. **DragShift is credited to its upstream.** Its README says it's a rewrite of `llamaboi55/DragShift` (MIT) "from reading DragShift's source", so the card carries a visible credit link rather than implying it's an original idea.
10. **QuickChat's demo login (in its README) is not reproduced** on the site.
11. **Theme:** follows the OS by default, remembers a manual choice in `localStorage`, set by an inline script before paint (no flash). No-JS users get the OS theme via CSS.
12. **No availability claim** ("open to work" etc.) — you didn't say it, so I didn't.
13. **Hero entrance is CSS-only and transform-only.** An earlier JS/opacity reveal on the hero text kept Chrome from counting the H1 as LCP (mobile LCP 3.0s); switching fixed it (0.9s). Below-the-fold sections use the JS reveal, which falls back to fully visible without JS.
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

Measured with Lighthouse 13 against a local production build (`next build && next start`), headless Chromium.

| Run | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Desktop | 100 | 100 | 100 | 100 | 0.8 s | 0 | 50 ms |
| Mobile (after LCP fix) | 98–100 | 100 | 100 | 100 | 0.9 s | 0 | 90–150 ms |

Other checks (Playwright): no console errors/warnings; no horizontal overflow at 1440 px and 390 px; `⌘/Ctrl+K` opens/closes the palette and Enter navigates; theme toggle works; Konami code fires the toast + 48 confetti pieces; with `prefers-reduced-motion: reduce` the terminal renders fully at once, reveals are visible immediately and confetti is skipped.

Accessibility notes: skip link, one `h1`, labelled landmarks/sections, visible focus rings, `aria-current` on the active nav link, external links announce "(opens in a new tab)", decorative elements `aria-hidden`, colour contrast AA in both themes, palette uses the ARIA combobox/listbox pattern on a native modal `<dialog>`.
