import media from "@/data/media.json";

type Dims = { w: number; h: number };
const table = media as Record<string, Dims>;

/** Real pixel size of an imported image (see scripts/import-assets.py). Throws at build time if missing. */
export function dims(src: string): Dims {
  const d = table[src];
  if (!d) throw new Error(`No dimensions for ${src}: re-run scripts/import-assets.py`);
  return d;
}
