/** Types for everything in `site.ts`. Edit content there, not here. */

export type Link = { label: string; href: string };

export type Profile = {
  name: string;
  role: string;
  location: string;
  email: string;
  /** Short line used in <meta description> and the OG image. */
  tagline: string;
  summary: string;
  /** One-paragraph "about" copy. Each string is rendered as its own paragraph. */
  about: string[];
  /** Quick facts shown beside the about text. */
  facts: { label: string; value: string }[];
  socials: {
    github: string;
    linkedin: string;
    leetcode: string;
  };
  /** Served from /public. Add the PDF at public/resume.pdf. */
  resumeUrl: string;
};

export type Experience = {
  company: string;
  role: string;
  location: string;
  /** Display string, e.g. "Jan 2026 – Present". */
  period: string;
  /** Optional sub-note, e.g. promotion details. */
  note?: string;
  highlights: string[];
  stack?: string[];
};

export type ProjectStatus = "shipped" | "in-progress";

export type Project = {
  /** Unique, URL-safe id. Also used for the placeholder image file name. */
  slug: string;
  title: string;
  status: ProjectStatus;
  /** One-line summary shown on the card. */
  tagline: string;
  description: string;
  highlights?: string[];
  stack: string[];
  /**
   * Image path under /public (e.g. "/projects/quickchat.svg").
   * To replace a placeholder: drop your screenshot into public/projects/
   * and point this at it (1200x750 recommended).
   */
  image: string;
  imageAlt: string;
  /** GitHub repo URL. `null` = not provided yet (see TODO in site.ts). */
  github: string | null;
  /** Live demo URL. `null` = none provided yet. */
  live: string | null;
  /** Optional attribution line (e.g. when a project builds on someone else's work). */
  credit?: Link;
};

export type SkillGroup = { title: string; items: string[] };

export type Education = {
  school: string;
  degree: string;
  period: string;
  details: string[];
};

export type Achievement = { title: string; detail?: string };

export type SiteData = {
  profile: Profile;
  experience: Experience[];
  projects: Project[];
  skills: SkillGroup[];
  education: Education;
  achievements: Achievement[];
};
