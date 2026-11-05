import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/data/site";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

// Characterful, self-hosted type (no Google Fonts request at runtime):
// Bricolage Grotesque (variable weight + width) for display & body,
// Martian Mono for tiny hardware labels, VT323 for the LCD.
const display = localFont({
  src: "../../node_modules/@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wdth-normal.woff2",
  weight: "200 800",
  style: "normal",
  variable: "--font-display",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "75% 100%" }],
});
const label = localFont({
  src: "../../node_modules/@fontsource-variable/martian-mono/files/martian-mono-latin-wght-normal.woff2",
  weight: "100 800",
  variable: "--font-label",
  display: "swap",
  preload: false,
});
const pixel = localFont({
  src: "../../node_modules/@fontsource/vt323/files/vt323-latin-400-normal.woff2",
  weight: "400",
  variable: "--font-pixel",
  display: "swap",
  preload: false,
});

const { profile } = site;
const title = `${profile.name} — ${profile.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: { default: title, template: `%s · ${profile.name}` },
  description: profile.tagline,
  applicationName: `${profile.name} — Portfolio`,
  authors: [{ name: profile.name, url: profile.socials.github }],
  keywords: [
    "Sarthak Jain",
    "Software Engineer",
    "Full-stack developer",
    "TypeScript",
    "MERN",
    "GenAI",
    "LLM",
    "Hyderabad",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: profile.name,
    title,
    description: profile.tagline,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title, description: profile.tagline },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  // Day (light) is the default theme; Night is opt-in.
  themeColor: "#ebe5d8",
  width: "device-width",
  initialScale: 1,
};

/** Runs before first paint: sets data-theme (stored choice, default light "day") and the `js` flag. */
const themeScript = `(function(){try{var d=document.documentElement;d.classList.add('js');var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t='light'}d.setAttribute('data-theme',t)}catch(e){document.documentElement.classList.add('js')}})();`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: getSiteUrl(),
  address: { "@type": "PostalAddress", addressLocality: "Hyderabad", addressCountry: "IN" },
  alumniOf: { "@type": "CollegeOrUniversity", name: site.education.school },
  sameAs: [profile.socials.github, profile.socials.linkedin, profile.socials.leetcode],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${label.variable} ${pixel.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-yellow focus:px-3 focus:py-2 focus:font-semibold focus:text-[#17171a]"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
