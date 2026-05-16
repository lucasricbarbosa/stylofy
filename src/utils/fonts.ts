export interface FontDefinition {
  slug: string;
  label: string;
  family: string;
  category: "sans-serif" | "serif" | "monospace";
  googleUrl?: string;
}

export const FONTS: FontDefinition[] = [
  {
    slug: "Inter",
    label: "Inter",
    family: "'Inter', sans-serif",
    category: "sans-serif",
  },
  {
    slug: "DM Sans",
    label: "DM Sans",
    family: "'DM Sans', sans-serif",
    category: "sans-serif",
    googleUrl:
      "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap",
  },
  {
    slug: "Space Grotesk",
    label: "Space Grotesk",
    family: "'Space Grotesk', sans-serif",
    category: "sans-serif",
    googleUrl:
      "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap",
  },
  {
    slug: "Nunito",
    label: "Nunito",
    family: "'Nunito', sans-serif",
    category: "sans-serif",
    googleUrl:
      "https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap",
  },
  {
    slug: "Montserrat",
    label: "Montserrat",
    family: "'Montserrat', sans-serif",
    category: "sans-serif",
    googleUrl:
      "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap",
  },
  {
    slug: "Sora",
    label: "Sora",
    family: "'Sora', sans-serif",
    category: "sans-serif",
    googleUrl:
      "https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap",
  },
  {
    slug: "Figtree",
    label: "Figtree",
    family: "'Figtree', sans-serif",
    category: "sans-serif",
    googleUrl:
      "https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&display=swap",
  },
  {
    slug: "Playfair Display",
    label: "Playfair Display",
    family: "'Playfair Display', serif",
    category: "serif",
    googleUrl:
      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap",
  },
  {
    slug: "Merriweather",
    label: "Merriweather",
    family: "'Merriweather', serif",
    category: "serif",
    googleUrl:
      "https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap",
  },
  {
    slug: "Fira Code",
    label: "Fira Code",
    family: "'Fira Code', monospace",
    category: "monospace",
    googleUrl:
      "https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&display=swap",
  },
  {
    slug: "Space Mono",
    label: "Space Mono",
    family: "'Space Mono', monospace",
    category: "monospace",
    googleUrl:
      "https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap",
  },
];

// Module-level set — tracks what's already been injected this session.
// Inter is pre-loaded via next/font so it starts in the set.
const loadedFonts = new Set<string>(["Inter"]);

export function injectFont(font: FontDefinition): void {
  if (!font.googleUrl || loadedFonts.has(font.slug)) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = font.googleUrl;
  document.head.appendChild(link);
  loadedFonts.add(font.slug);
}

const GENERIC_FONTS = new Set([
  "system-ui", "sans-serif", "serif", "monospace",
  "ui-monospace", "ui-sans-serif", "ui-serif", "ui-rounded",
  "inherit", "initial", "unset", "revert",
]);

/** Inject a Google Font given a raw CSS font-family string like "'IBM Plex Mono', monospace". */
export function injectFontFamilyString(fontFamily: string): void {
  if (!fontFamily || fontFamily.startsWith("var(")) return;
  const firstFont = fontFamily.split(",")[0].trim().replace(/['"]/g, "").trim();
  if (!firstFont || GENERIC_FONTS.has(firstFont.toLowerCase())) return;

  // Reuse existing FONTS entries when possible (they have curated URLs).
  const known = FONTS.find((f) => f.slug === firstFont);
  if (known) { injectFont(known); return; }

  if (loadedFonts.has(firstFont)) return;
  loadedFonts.add(firstFont);
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${firstFont.replace(/ /g, "+")}:wght@400;500;600;700&display=swap`;
  document.head.appendChild(link);
}

export function applyFont(slug: string): void {
  const font = FONTS.find((f) => f.slug === slug) ?? FONTS[0];
  if (font.googleUrl) injectFont(font);
  const root = document.documentElement;
  // Set --font-sans and --font-mono directly so the change is immediate
  // even when a preset previously set them as inline styles.
  root.style.setProperty("--font-sans", font.family);
  root.style.setProperty("--font-mono", font.family);
  // Keep --font-user for the CSS fallback chain in globals.css
  if (slug === "Inter") {
    root.style.removeProperty("--font-user");
  } else {
    root.style.setProperty("--font-user", font.family);
  }
}
