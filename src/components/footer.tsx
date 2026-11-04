import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {new Date().getFullYear()} {site.profile.name}. Built with Next.js &amp; Tailwind.
        </p>
        <p className="font-mono text-xs">
          psst — press <kbd className="rounded border border-line px-1">⌘K</kbd> or try the Konami code
        </p>
      </div>
    </footer>
  );
}
