/** The console's "channels": every section, one click (or one digit key) away. */
export const sections = [
  { id: "console", label: "Console", key: "1" },
  { id: "projects", label: "Projects", key: "2" },
  { id: "log", label: "Experience", key: "3" },
  { id: "keys", label: "Skills", key: "4" },
  { id: "school", label: "Education", key: "5" },
  { id: "transmit", label: "Contact", key: "6" },
] as const;

export const OPEN_PALETTE_EVENT = "open-palette";
export const openPalette = () => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT));

/** Fired by the palette / Konami code to make the console fail everything. */
export const CHAOS_EVENT = "console-chaos";

/** Projects open in the inspector via `#project-<slug>` (deep-linkable). */
export const projectHash = (slug: string) => `#project-${slug}`;
export const openProject = (slug: string) => {
  window.location.hash = projectHash(slug);
};
