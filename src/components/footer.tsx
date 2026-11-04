import { site } from "@/data/site";
import { Wordmark } from "./ui/wordmark";

export function Footer() {
  return (
    <footer className="relative mt-10 overflow-hidden border-t border-line">
      <div className="mx-auto max-w-6xl px-5 pt-14 sm:px-8">
        <Wordmark text="SARTHAK JAIN" />
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 pb-10 pt-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {new Date().getFullYear()} {site.profile.name}. Designed &amp; built by me with Next.js &amp; Tailwind.
        </p>
        <p className="font-mono text-xs">
          psst — press <kbd className="rounded border border-line px-1">⌘K</kbd> or try the Konami code
        </p>
      </div>
    </footer>
  );
}
