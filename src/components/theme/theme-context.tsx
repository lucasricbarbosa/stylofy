"use client";

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
  accent: "oklch(0.96 0.004 280)",
};

const DARK_DEFAULTS: Palette = {
  foreground: "oklch(0.97 0 0)",
  background: "oklch(0.09 0.008 280)",
  primary: "oklch(0.55 0.22 260)",
  secondary: "oklch(0.18 0.006 280)",
  accent: "oklch(0.18 0.006 280)",
};

export const PALETTE_PRESETS: PalettePreset[] = [
  {
    name: "Default",
    light: {
      foreground: "oklch(0.13 0.005 280)",
      background: "oklch(0.99 0 0)",
      primary: "oklch(0.55 0.22 260)",
      secondary: "oklch(0.967 0.001 286.375)",
      accent: "oklch(0.96 0.004 280)",
    },
    dark: {
      foreground: "oklch(0.985 0 0)",
      background: "oklch(0.145 0 0)",
      primary: "oklch(0.424 0.199 265.638)",
      secondary: "oklch(0.274 0.006 286.033)",
      accent: "oklch(0.269 0 0)",
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

  // Track which palette tokens the user has explicitly changed so we can
  // reset only the untouched ones when the theme switches.
  const userModifiedRef = useRef(new Set<PaletteKey>());

  useEffect(() => {
    const root = document.documentElement;
    const isDark = resolvedTheme === "dark";
    const defaults = isDark ? DARK_DEFAULTS : LIGHT_DEFAULTS;

    // For tokens the user has NOT personally changed, clear the inline style so
    // the stylesheet's .dark / :root rules take effect, then read back the result.
    // For user-modified tokens, keep their inline style and read the current value.
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
        // Also clear related foreground tokens that were cascaded from old picks.
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
    userModifiedRef.current.add(name);
    setColors((prev) => ({ ...prev, [name]: value }));
    document.documentElement.style.setProperty(`--${name}`, value);

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

  const applyPreset = useCallback(
    (preset: PalettePreset) => {
      const isDark = document.documentElement.classList.contains("dark");
      const palette = isDark ? preset.dark : preset.light;
      const root = document.documentElement;

      // Clear all palette-related inline styles so the preset starts clean.
      const toClear = [
        "foreground",
        "background",
        "primary",
        "secondary",
        "accent",
        "primary-foreground",
        "secondary-foreground",
        "accent-foreground",
        "ring",
      ];
      toClear.forEach((key) => root.style.removeProperty(`--${key}`));
      userModifiedRef.current.clear();

      setColors(palette);
      Object.entries(palette).forEach(([name, value]) => {
        updateColor(name as PaletteKey, value);
      });
    },
    [updateColor],
  );

  return (
    <ThemeContext.Provider
      value={{
        colors,
        updateColor,
        applyPreset,
        isReady,
        activeToken,
        setActiveToken,
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
