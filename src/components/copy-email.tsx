"use client";

import { useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <>
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        } catch {
          window.location.href = `mailto:${email}`;
        }
      }}
      className="rounded-md border border-line px-4 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
    >
      {copied ? "Copied ✓" : "Copy email"}
    </button>
    <span className="sr-only" role="status" aria-live="polite">
      {copied ? "Email address copied to clipboard" : ""}
    </span>
    </>
  );
}
