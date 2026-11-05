"use client";

import { useSyncExternalStore } from "react";

const subscribe = (notify: () => void) => {
  const id = setInterval(notify, 15_000);
  return () => clearInterval(id);
};

/** Live local time for a time zone. Renders nothing on the server (no hydration mismatch). */
export function LocalClock({ timeZone }: { timeZone: string }) {
  const time = useSyncExternalStore(
    subscribe,
    () =>
      new Intl.DateTimeFormat("en-GB", { timeZone, hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date()),
    () => "",
  );
  return <span className="tabular-nums">{time || "--:--"}</span>;
}
