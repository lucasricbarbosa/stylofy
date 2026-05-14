"use client";

import { applyFont } from "@/utils/fonts";
import { useTheme } from "next-themes";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export type PaletteKey =
  | "foreground"
  | "background"
  | "primary"
  | "secondary"
  | "accent";

export type Palette = Record<PaletteKey, string>;

export interface PalettePreset {
  name: string;
  light: Palette;
  dark: Palette;
}

const LIGHT_DEFAULTS: Palette = {
  foreground: "oklch(0.13 0.005 280)",
  background: "oklch(0.99 0 0)",
  primary: "oklch(0.55 0.22 260)",
  secondary: "oklch(0.96 0.004 280)",
  accent: "oklch(91.7% 0.08 205.041)",
};

const DARK_DEFAULTS: Palette = {
  foreground: "oklch(0.97 0 0)",
  background: "oklch(0.09 0.008 280)",
  primary: "oklch(0.55 0.22 260)",
  secondary: "oklch(0.18 0.006 280)",
  accent: "oklch(39.8% 0.07 227.392)",
};

export const PALETTE_PRESETS: PalettePreset[] = [
  {
    name: "Default",
    light: {
      foreground: "oklch(0.13 0.005 280)",
      background: "oklch(0.99 0 0)",
      primary: "oklch(0.55 0.22 260)",
      secondary: "oklch(0.967 0.001 286.375)",
      accent: "oklch(91.7% 0.08 205.041)",
    },
    dark: {
      foreground: "oklch(0.985 0 0)",
      background: "oklch(0.145 0 0)",
      primary: "oklch(0.424 0.199 265.638)",
      secondary: "oklch(0.274 0.006 286.033)",
      accent: "oklch(39.8% 0.07 227.392)",
    },
  },
  {
    name: "Editorial",
    light: {
      foreground: "#1a1a1a",
      background: "#faf9f7",
      primary: "#2d2d2d",
      secondary: "#f0ede8",
      accent: "#c4a882",
    },
    dark: {
      foreground: "#f0ede8",
      background: "#141210",
      primary: "#e8e3db",
      secondary: "#252220",
      accent: "#a8896a",
    },
  },
  {
    name: "Fintech",
    light: {
      foreground: "#0f172a",
      background: "#f8fafc",
      primary: "#2563eb",
      secondary: "#e2e8f0",
      accent: "#10b981",
    },
    dark: {
      foreground: "#f1f5f9",
      background: "#0a0f1e",
      primary: "#3b82f6",
      secondary: "#1e293b",
      accent: "#10b981",
    },
  },
  {
    name: "Kiwi",
    light: {
      foreground: "#182a0f",
      background: "#f8fcf8",
      primary: "#b3df00",
      secondary: "#e2e8f0",
      accent: "#cffb7e",
    },
    dark: {
      foreground: "#f1f9f1",
      background: "#061a07",
      primary: "#CCFF00",
      secondary: "#1e3b1e",
      accent: "#083511",
    },
  },
  {
    name: "Playful",
    light: {
      foreground: "#18181b",
      background: "#ffffff",
      primary: "#8b5cf6",
      secondary: "#fce7f3",
      accent: "#f59e0b",
    },
    dark: {
      foreground: "#fafafa",
      background: "#09090b",
      primary: "#a78bfa",
      secondary: "#1c1917",
      accent: "#fbbf24",
    },
  },
  {
    name: "Brutalist",
    light: {
      foreground: "#000000",
      background: "#ffffff",
      primary: "#ff0000",
      secondary: "#f5f5f5",
      accent: "#ffff00",
    },
    dark: {
      foreground: "#ffffff",
      background: "#000000",
      primary: "#ff3333",
      secondary: "#111111",
      accent: "#ffff00",
    },
  },
  {
    name: "Ocean",
    light: {
      foreground: "#0c2340",
      background: "#f0f7ff",
      primary: "#0369a1",
      secondary: "#e0f2fe",
      accent: "#06b6d4",
    },
    dark: {
      foreground: "#e0f2fe",
      background: "#030d1a",
      primary: "#38bdf8",
      secondary: "#0c1a2e",
      accent: "#22d3ee",
    },
  },
];

interface ThemeContextProps {
  colors: Palette;
  updateColor: (name: PaletteKey, value: string) => void;
  applyPreset: (preset: PalettePreset) => void;
  isReady: boolean;
  activeToken: PaletteKey | null;
  setActiveToken: (token: PaletteKey | null) => void;
  font: string;
  updateFont: (slug: string) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

function getContrastColor(hex: string): string {
  if (hex.startsWith("oklch")) {
    const match = hex.match(/oklch\(\s*([0-9.]+)/);
    if (match?.[1]) {
      return parseFloat(match[1]) > 0.5
        ? "oklch(0.13 0.005 280)"
        : "oklch(0.97 0 0)";
    }
    return "oklch(0.97 0 0)";
  }
  try {
    const h = hex.replace("#", "");
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 128 ? "#000000" : "#ffffff";
  } catch {
    return "#ffffff";
  }
}

export function ThemeColorsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, resolvedTheme } = useTheme();
  const [colors, setColors] = useState<Palette>(LIGHT_DEFAULTS);
  const [isReady, setIsReady] = useState(false);
  const [activeToken, setActiveToken] = useState<PaletteKey | null>(null);
  const [font, setFont] = useState<string>("Inter");

  // Tracks which tokens the user explicitly changed (manual picks only).
  const userModifiedRef = useRef(new Set<PaletteKey>());
  // Tracks the last preset applied so the theme-switch effect can re-apply
  // the correct light/dark variant instead of falling back to CSS defaults.
  const activePresetRef = useRef<PalettePreset | null>(null);
  // Guards the one-time localStorage restore so it only runs on first mount.
  const hasMountedRef = useRef(false);

  useEffect(() => {
    const root = document.documentElement;
    const isDark = resolvedTheme === "dark";

    // On first mount, restore saved palette and font from localStorage.
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;

      try {
        const savedFont = localStorage.getItem("stylofy-font");
        if (savedFont) {
          applyFont(savedFont);
          setFont(savedFont);
        }
      } catch {}

      try {
        const raw = localStorage.getItem("stylofy-palette");
        if (raw) {
          const saved = JSON.parse(raw) as {
            preset: string | null;
            colors: Palette;
          };

          if (saved.preset) {
            // Preset mode — let PRESET MODE block below apply it.
            const found = PALETTE_PRESETS.find((p) => p.name === saved.preset);
            if (found) activePresetRef.current = found;
          } else if (saved.colors) {
            // Manual colors — apply directly and mark all tokens as user-modified
            // so they persist through future theme switches.
            (Object.keys(saved.colors) as PaletteKey[]).forEach((k) => {
              userModifiedRef.current.add(k);
              root.style.setProperty(`--${k}`, saved.colors[k]);
              if (k === "primary") {
                root.style.setProperty(
                  "--primary-foreground",
                  getContrastColor(saved.colors[k]),
                );
                root.style.setProperty("--ring", saved.colors[k]);
              } else if (k === "secondary") {
                root.style.setProperty(
                  "--secondary-foreground",
                  getContrastColor(saved.colors[k]),
                );
              } else if (k === "accent") {
                root.style.setProperty(
                  "--accent-foreground",
                  getContrastColor(saved.colors[k]),
                );
              }
            });
            setColors(saved.colors);
            setIsReady(true);
            return;
          }
        }
      } catch {
        localStorage.removeItem("stylofy-palette");
      }
    }

    // PRESET MODE — re-apply the active preset's variant for the new theme.
    if (activePresetRef.current) {
      const palette = isDark
        ? activePresetRef.current.dark
        : activePresetRef.current.light;

      [
        "foreground",
        "background",
        "primary",
        "secondary",
        "accent",
        "primary-foreground",
        "secondary-foreground",
        "accent-foreground",
        "ring",
      ].forEach((key) => root.style.removeProperty(`--${key}`));

      Object.entries(palette).forEach(([name, value]) => {
        root.style.setProperty(`--${name}`, value);
        if (name === "primary") {
          root.style.setProperty(
            "--primary-foreground",
            getContrastColor(value),
          );
          root.style.setProperty("--ring", value);
        } else if (name === "secondary") {
          root.style.setProperty(
            "--secondary-foreground",
            getContrastColor(value),
          );
        } else if (name === "accent") {
          root.style.setProperty(
            "--accent-foreground",
            getContrastColor(value),
          );
        }
      });

      setColors(palette);
      setIsReady(true);
      return;
    }

    // MANUAL MODE — reset un-modified tokens to stylesheet defaults.
    const defaults = isDark ? DARK_DEFAULTS : LIGHT_DEFAULTS;
    const modified = userModifiedRef.current;

    (
      [
        "foreground",
        "background",
        "primary",
        "secondary",
        "accent",
      ] as PaletteKey[]
    ).forEach((key) => {
      if (!modified.has(key)) {
        root.style.removeProperty(`--${key}`);
        if (key === "primary") {
          root.style.removeProperty("--primary-foreground");
          root.style.removeProperty("--ring");
        } else if (key === "secondary") {
          root.style.removeProperty("--secondary-foreground");
        } else if (key === "accent") {
          root.style.removeProperty("--accent-foreground");
        }
      }
    });

    const style = getComputedStyle(root);
    const read = (name: string, fallback: string) =>
      style.getPropertyValue(`--${name}`).trim() || fallback;

    setColors({
      foreground: read("foreground", defaults.foreground),
      background: read("background", defaults.background),
      primary: read("primary", defaults.primary),
      secondary: read("secondary", defaults.secondary),
      accent: read("accent", defaults.accent),
    });
    setIsReady(true);
  }, [theme, resolvedTheme]);

  const updateColor = useCallback((name: PaletteKey, value: string) => {
    activePresetRef.current = null; // manual pick exits preset mode
    userModifiedRef.current.add(name);
    document.documentElement.style.setProperty(`--${name}`, value);
    // Persist immediately — use functional form so we have the full current palette.
    setColors((prev) => {
      const next = { ...prev, [name]: value };
      try {
        localStorage.setItem(
          "stylofy-palette",
          JSON.stringify({ preset: null, colors: next }),
        );
      } catch {}
      return next;
    });

    // Keep foreground-contrast tokens in sync with user picks.
    // Intentionally do NOT cascade to --card, --card-foreground, --popover-foreground,
    // etc. — those are chrome tokens that must remain stylesheet-controlled so
    // dark/light mode switching works correctly.
    if (name === "primary") {
      document.documentElement.style.setProperty(
        "--primary-foreground",
        getContrastColor(value),
      );
      document.documentElement.style.setProperty("--ring", value);
    } else if (name === "secondary") {
      document.documentElement.style.setProperty(
        "--secondary-foreground",
        getContrastColor(value),
      );
    } else if (name === "accent") {
      document.documentElement.style.setProperty(
        "--accent-foreground",
        getContrastColor(value),
      );
    }
  }, []);

  const applyPreset = useCallback((preset: PalettePreset) => {
    const isDark = document.documentElement.classList.contains("dark");
    const palette = isDark ? preset.dark : preset.light;
    const root = document.documentElement;

    // Clear all palette-related inline styles so the preset starts clean.
    [
      "foreground",
      "background",
      "primary",
      "secondary",
      "accent",
      "primary-foreground",
      "secondary-foreground",
      "accent-foreground",
      "ring",
    ].forEach((key) => root.style.removeProperty(`--${key}`));

    // Record the active preset so the theme-switch effect can re-apply
    // the correct variant. Keep userModifiedRef empty — preset mode handles
    // theme switching; manual mode uses userModifiedRef.
    activePresetRef.current = preset;
    userModifiedRef.current.clear();

    // Apply CSS vars directly (same side-effects as updateColor, minus tracking).
    Object.entries(palette).forEach(([name, value]) => {
      root.style.setProperty(`--${name}`, value);
      if (name === "primary") {
        root.style.setProperty("--primary-foreground", getContrastColor(value));
        root.style.setProperty("--ring", value);
      } else if (name === "secondary") {
        root.style.setProperty(
          "--secondary-foreground",
          getContrastColor(value),
        );
      } else if (name === "accent") {
        root.style.setProperty("--accent-foreground", getContrastColor(value));
      }
    });

    setColors(palette);

    // Persist preset name + current colors so both survive a page refresh.
    try {
      localStorage.setItem(
        "stylofy-palette",
        JSON.stringify({ preset: preset.name, colors: palette }),
      );
    } catch {}
  }, []);

  const updateFont = useCallback((slug: string) => {
    applyFont(slug);
    setFont(slug);
    try {
      localStorage.setItem("stylofy-font", slug);
    } catch {}
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        colors,
        updateColor,
        applyPreset,
        isReady,
        activeToken,
        setActiveToken,
        font,
        updateFont,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeColors() {
  const ctx = useContext(ThemeContext);
  if (!ctx)
    throw new Error("useThemeColors must be used within ThemeColorsProvider");
  return ctx;
}
