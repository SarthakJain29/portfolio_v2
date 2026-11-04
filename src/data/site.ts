import type { SiteData } from "./types";

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  ALL SITE CONTENT LIVES HERE.
 *  Edit text, add/remove projects, swap links. Nothing else needs to change.
 *
 *  Search this file for "TODO" to find every missing link/asset.
 * ─────────────────────────────────────────────────────────────────────────
 */

const GITHUB = "https://github.com/SarthakJain29";

export const site: SiteData = {
  profile: {
    name: "Sarthak Jain",
    role: "Software Engineer",
    location: "Hyderabad, India",
    email: "sarthakjain3241@gmail.com",
    tagline:
      "Full-stack developer (MERN + TypeScript) building reliable APIs and GenAI applications.",
    summary:
      "Full-stack developer (MERN + TypeScript) with strong backend fundamentals and API design, increasingly focused on GenAI applications and LLM reliability.",
    about: [
      "I'm a full-stack developer working across the MERN stack and TypeScript, with strong backend fundamentals and a focus on API design.",
      "These days I'm increasingly focused on GenAI applications and LLM reliability: model fallbacks, task-specific model selection, and tooling that shows how an LLM's behaviour changes over time.",
      "Off the clock I solve problems on LeetCode (300+ and counting) and build side projects, several of them AI-flavoured.",
    ],
    facts: [
      { label: "Based in", value: "Hyderabad, India" },
      { label: "Currently", value: "Software Engineer at Myra AI" },
      { label: "Focus", value: "Backend, APIs, GenAI & LLM reliability" },
      { label: "LeetCode", value: "300+ problems solved" },
    ],
    socials: {
      github: GITHUB,
      linkedin: "https://www.linkedin.com/in/sarthakjain29/",
      leetcode: "https://leetcode.com/u/sarthak_2907/",
    },
    // TODO(resume): add your PDF at public/resume.pdf — the button already points here.
    resumeUrl: "/resume.pdf",
  },

  experience: [
    {
      company: "Myra AI",
      role: "Software Engineer",
      location: "Hyderabad",
      period: "Jan 2026 – Present",
      highlights: [
        "Built MCP OAuth integrations with credential management, token refresh and reconnection flows.",
        "Shipped MFA and session revocation for 500+ users.",
        "Built reusable MongoDB Atlas Search infrastructure shared across modules.",
        "Improved LLM reliability with model fallbacks and task-specific model selection.",
        "Built an evaluation tool that replays conversations to analyse how persistent LLM memory is generated over time.",
      ],
      stack: ["TypeScript", "Node.js", "MongoDB Atlas Search", "OAuth", "LLM APIs"],
    },
    {
      company: "Protiviti Consulting",
      role: "Technology Consultant",
      location: "Gurgaon",
      period: "Jun 2024 – Dec 2025",
      note: "Started as a Technology Intern for a year; promoted to full-time in Jun 2025.",
      highlights: [
        "Built a role management tool in React + MongoDB that automates role distribution and access tracking, with 45% faster data retrieval.",
        "Built REST APIs in Node.js/Express, improving request performance by 30%.",
      ],
      stack: ["React", "MongoDB", "Node.js", "Express"],
    },
  ],

  projects: [
    {
      slug: "quickchat",
      title: "QuickChat",
      status: "shipped",
      tagline: "Real-time chat app with sub-100ms messaging.",
      description:
        "A real-time chat application with JWT-secured rooms, persistent chat history, media sharing and editable user profiles. Built with React on the front end and Express + MongoDB on the back end, with Socket.IO delivering messages at under 100ms latency.",
      highlights: [
        "Sub-100ms messaging over Socket.IO",
        "JWT-secured rooms and authentication",
        "Media sharing, profiles and persistent chats",
      ],
      stack: ["React", "Express", "MongoDB", "Socket.IO", "JWT"],
      image: "/projects/quickchat.svg",
      imageAlt: "Placeholder artwork for QuickChat",
      github: `${GITHUB}/Quick-Chat`,
      // TODO(link): add a live demo URL if QuickChat is deployed.
      live: null,
    },
    {
      slug: "meetnote",
      title: "MeetNote",
      status: "shipped",
      tagline: "AI meeting summarizer.",
      // NOTE: the MeetNote README is the default create-next-app text, so this
      // description comes from the stack/summary you gave, not from the README.
      description:
        "An AI meeting summarizer. Built with a Next.js front end, an Express API and PostgreSQL.",
      stack: ["Next.js", "Express", "PostgreSQL", "AI"],
      image: "/projects/meetnote.svg",
      imageAlt: "Placeholder artwork for MeetNote",
      github: `${GITHUB}/MeetNote`,
      // TODO(link): add a live demo URL.
      live: null,
    },
    {
      slug: "ai-blog-generator",
      title: "AI-Blog-Generator",
      status: "shipped",
      tagline: "AI blog generator in a Turborepo + Bun monorepo.",
      // NOTE: the README documents the monorepo setup, not product features.
      description:
        "An AI blog generator organised as a Turborepo + Bun monorepo: a Next.js 15 front end, a Dockerised Express API, and shared packages for ESLint/TypeScript config, utilities and database models.",
      highlights: [
        "Turborepo pipeline with cached builds across workspaces",
        "Docker-ready Express API with a health endpoint",
        "Shared TypeScript, ESLint, utils and DB packages",
      ],
      stack: ["Next.js", "Express", "TypeScript", "Turborepo", "Bun", "Docker"],
      image: "/projects/ai-blog-generator.svg",
      imageAlt: "Placeholder artwork for AI-Blog-Generator",
      github: `${GITHUB}/AI-Blog-Generator`,
      // TODO(link): add a live demo URL.
      live: null,
    },
    {
      slug: "pdf-chatbot",
      title: "PDF_Chatbot",
      status: "shipped",
      tagline: "Chat with your PDFs, in a Turborepo + Bun monorepo.",
      // NOTE: the README documents the monorepo setup, not product features.
      description:
        "A PDF chatbot built as a Turborepo + Bun monorepo: a Next.js (App Router) web app, an Express API with health and readiness endpoints, and shared packages for types and tooling config. Docker-ready API.",
      highlights: [
        "Next.js App Router web app + Express API",
        "Health and readiness endpoints, Dockerised API",
        "Shared constants, types, ESLint and TypeScript configs",
      ],
      stack: ["Next.js", "Express", "TypeScript", "Turborepo", "Bun", "Docker"],
      image: "/projects/pdf-chatbot.svg",
      imageAlt: "Placeholder artwork for PDF_Chatbot",
      github: `${GITHUB}/PDF_Chatbot`,
      // TODO(link): add a live demo URL.
      live: null,
    },
    {
      slug: "dragshift",
      title: "DragShift",
      status: "shipped",
      tagline: "Drag a file, press Control, drop on a radial menu.",
      // NOTE: the repo README is titled "ShiftDrop" — a native macOS rewrite of
      // llamaboi55/DragShift (MIT). Credit is shown on the card on purpose.
      description:
        "A native macOS menu-bar app (README title: ShiftDrop) in Swift + AppKit. Start dragging a file in Finder, press Control, and drop it on a slice of a radial menu to convert, compress, resize, split, rotate or merge images, PDFs, Word and text files. Results are saved next to the original, which is never changed, and every action can be undone.",
      highlights: [
        "Radial drop menu built with a masked NSVisualEffectView",
        "Images via ImageIO, PDFs via PDFKit — no extra libraries",
        "Headless commands for scripting and testing",
      ],
      stack: ["Swift", "AppKit", "ImageIO", "PDFKit", "macOS"],
      image: "/projects/dragshift.svg",
      imageAlt: "Placeholder artwork for DragShift",
      github: `${GITHUB}/DragShift`,
      live: null,
      credit: {
        label: "Rewrite of DragShift by llamaboi55 (MIT)",
        href: "https://github.com/llamaboi55/DragShift",
      },
    },

    // ── In progress ────────────────────────────────────────────────────────
    // TODO(link): none of the in-progress repos have a confirmed GitHub URL yet.
    // Replace `github: null` with the repo URL for each, e.g. `${GITHUB}/Diffwise`.
    {
      slug: "diffwise",
      title: "Diffwise",
      status: "in-progress",
      tagline: "AI pull-request reviewer, as a GitHub App.",
      description:
        "An AI code reviewer that runs as a GitHub App and reviews pull requests, with an eval scoreboard to measure how good its reviews actually are.",
      stack: ["GitHub App", "LLM evals"],
      image: "/projects/diffwise.svg",
      imageAlt: "Placeholder artwork for Diffwise",
      github: null, // TODO(link)
      live: null,
    },
    {
      slug: "mf-xray",
      title: "MF X-ray",
      status: "in-progress",
      tagline: "Privacy-first mutual fund portfolio analyzer.",
      description:
        "A mutual fund portfolio analyzer designed to be privacy-first.",
      stack: ["Privacy-first"],
      image: "/projects/mf-xray.svg",
      imageAlt: "Placeholder artwork for MF X-ray",
      github: null, // TODO(link)
      live: null,
    },
    {
      slug: "notes-inbox",
      title: "Notes Inbox",
      status: "in-progress",
      tagline: "AI Telegram notes bot.",
      description: "An AI-powered notes bot that lives in Telegram.",
      stack: ["Telegram", "AI"],
      image: "/projects/notes-inbox.svg",
      imageAlt: "Placeholder artwork for Notes Inbox",
      github: null, // TODO(link)
      live: null,
    },
    {
      slug: "similar-song-ai",
      title: "Similar Song AI",
      status: "in-progress",
      tagline: "Find songs similar to the ones you love.",
      description: "An AI project for finding songs similar to ones you already like.",
      stack: ["AI"],
      image: "/projects/similar-song-ai.svg",
      imageAlt: "Placeholder artwork for Similar Song AI",
      github: null, // TODO(link)
      live: null,
    },
    {
      slug: "news-shorts",
      title: "News Shorts",
      status: "in-progress",
      tagline: "News, in short.",
      description: "A short-form news project: stories in a few lines.",
      stack: [],
      image: "/projects/news-shorts.svg",
      imageAlt: "Placeholder artwork for News Shorts",
      github: null, // TODO(link)
      live: null,
    },
  ],

  skills: [
    { title: "Languages", items: ["JavaScript", "TypeScript", "C++", "Python"] },
    { title: "Frameworks", items: ["Node.js", "Express", "React", "Next.js", "Tailwind"] },
    { title: "Databases", items: ["PostgreSQL", "MongoDB", "Vector DBs"] },
    {
      title: "AI / LLM",
      items: ["OpenAI", "Gemini API", "Vercel AI SDK", "LangChain (basic)", "Prompt engineering"],
    },
    { title: "Tools", items: ["Git", "Redux"] },
  ],

  education: {
    school: "Bennett University (Times Group)",
    degree: "B.Tech, Computer Science",
    period: "2021 – 2025",
    details: ["CGPA 9.07", "50% academic scholarship"],
  },

  achievements: [
    { title: "Smart India Hackathon 2023 finalist", detail: "Among 250+ teams" },
    { title: "AWS Academy Cloud Foundations" },
    { title: "AWS Academy Machine Learning Foundations" },
    { title: "300+ LeetCode problems solved" },
  ],
};
