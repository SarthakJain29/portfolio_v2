"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/use-media";

/**
 * Cycles through short phrases with a blur/slide transition.
 * Screen readers and reduced-motion users get all phrases as one static sentence fragment.
 */
export function FlipWords({ words, interval = 2600 }: { words: string[]; interval?: number }) {
  const reduced = usePrefersReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduced || words.length < 2) return;
    const id = setInterval(() => setI((n) => (n + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [reduced, words.length, interval]);

  const list = words.join(", ").replace(/, ([^,]*)$/, " and $1");
  const current = words[i % words.length] ?? "";

  if (reduced) {
    return <span className="serif text-gradient">{list}</span>;
  }

  return (
    <>
      <span className="sr-only">{list}</span>
      <span aria-hidden className="relative inline-block align-baseline">
        <span key={current} className="serif text-gradient inline-block animate-[flip_0.55s_cubic-bezier(0.22,1,0.36,1)_both]">
          {current}
        </span>
      </span>
    </>
  );
}
