export const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;

export const OPEN_PALETTE_EVENT = "open-palette";
export const openPalette = () => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT));
