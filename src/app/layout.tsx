import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import localFont from "next/font/local";
import { site } from "@/data/site";
import { getSiteUrl } from "@/lib/site-url";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Interactions } from "@/components/interactions";
import { ScrollProgress } from "@/components/scroll-progress";
import "./globals.css";

// Display serif used only for italic accent words (see .serif in globals.css).
const serif = localFont({
  src: "../../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2",
  weight: "400",
  style: "italic",
  variable: "--font-serif-display",
  display: "swap",
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
  themeColor: [
    // Dark is the default theme; the light value only matters if the visitor picked light.
    { color: "#07070b" },
  ],
  width: "device-width",
  initialScale: 1,
};

/** Runs before first paint: sets data-theme (stored choice, default dark) and the `js` flag. */
const themeScript = `(function(){try{var d=document.documentElement;d.classList.add('js');var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t='dark'}d.setAttribute('data-theme',t)}catch(e){document.documentElement.classList.add('js')}})();`;

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
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable} ${serif.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-fg"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Interactions />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
