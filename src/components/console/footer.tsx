import Link from "next/link";
import { site } from "@/data/site";

/** The serial-number plate on the bottom of the instrument. */
export function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-3 pb-28 pt-6 sm:px-4 md:pb-10">
      <div className="flex flex-col gap-3 rounded-2xl border border-line-2 px-5 py-4 font-mono text-[0.68rem] uppercase tracking-wider text-ink-3 sm:flex-row sm:items-center sm:justify-between">
        <p>
          SJ-01 Fallback Console · designed &amp; built by {site.profile.name} · © {new Date().getFullYear()}
        </p>
        <p className="flex flex-wrap gap-x-4 gap-y-1">
          <span>Keys 1–6: channels</span>
          <span>⌘K: everything</span>
          <Link href="/plain" className="underline underline-offset-2 hover:text-ink">
            Plain view
          </Link>
        </p>
      </div>
    </footer>
  );
}
