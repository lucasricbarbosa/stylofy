export const SHADCN_TOKENS = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "border",
  "input",
  "ring",
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
  "radius",
  "sidebar",
  "sidebar-foreground",
  "sidebar-primary",
  "sidebar-primary-foreground",
  "sidebar-accent",
  "sidebar-accent-foreground",
  "sidebar-border",
  "sidebar-ring",
] as const;

export type ShadcnToken = (typeof SHADCN_TOKENS)[number];
export type ThemeMode = "light" | "dark";
export type ExportFormat = "oklch" | "hsl" | "rgb" | "hex";

// Kept for defaults.ts, export.ts and legacy components
export type TokenValues = Record<ShadcnToken, string>;

// ── New token value system ────────────────────────────────────────────────────

export type TokenSource = "derived" | "override";
export type TokenValue = { value: string; source: TokenSource };
export type ModeTheme = Record<ShadcnToken, TokenValue>;

export type SimpleTokens = {
  foreground: string; // OKLCH string, light-mode canonical
  background: string;
  primary: string;
  secondary: string;
  accent: string;
};

export type ThemeSnapshot = {
  simple: SimpleTokens;
  light: ModeTheme;
  dark: ModeTheme;
};

export interface ThemeState {
  simple: SimpleTokens;
  light: ModeTheme;
  dark: ModeTheme;
  activeMode: ThemeMode;
  past: ThemeSnapshot[];
  future: ThemeSnapshot[];
}

export interface BuiltInPreset {
  name: string;
  description: string;
  level: "simple" | "advanced";
  simple: SimpleTokens;
  light?: ModeTheme; // advanced presets only
  dark?: ModeTheme;
}

export interface SavedTheme {
  id: string;
  name: string;
  light: TokenValues;
  dark: TokenValues;
  createdAt: number;
}

export interface ContrastPair {
  fg: ShadcnToken;
  bg: ShadcnToken;
  label: string;
}

export interface ContrastResult extends ContrastPair {
  ratio: number;
  passAA: boolean;
  passAAA: boolean;
  passAALarge: boolean;
}

export type TailwindColorFamily =
  | "slate"
  | "gray"
  | "zinc"
  | "neutral"
  | "stone"
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "teal"
  | "cyan"
  | "sky"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "fuchsia"
  | "pink"
  | "rose";

export type TailwindShade =
  | "50"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900"
  | "950";

export type TailwindPalette = Record<TailwindColorFamily, Record<TailwindShade, string>>;
