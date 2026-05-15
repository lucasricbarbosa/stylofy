"use client";

import { useTheme } from "next-themes";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { LocalThemesProvider } from "./hooks/useLocalThemes";
import { SHADCN_DARK_DEFAULTS, SHADCN_LIGHT_DEFAULTS } from "./lib/defaults";
import { deriveShadcnTokens } from "./lib/derive-shadcn";
import type {
  BuiltInPreset,
  ModeTheme,
  ShadcnToken,
  SimpleTokens,
  ThemeMode,
  ThemeSnapshot,
  ThemeState,
  TokenValues,
} from "./types";

const HISTORY_CAP = 50;
const STORAGE_KEY = "stylofy:theming:v3:working";

// ── Simple → Shadcn token mapping ─────────────────────────────────────────────
// Defines which shadcn tokens are derived from each simple key. Used in
// SET_SIMPLE to reset ONLY those tokens' source back to "derived" while
// preserving overrides on unrelated tokens.

const SIMPLE_TO_SHADCN_MAP: Record<keyof SimpleTokens, Set<ShadcnToken>> = {
  foreground: new Set<ShadcnToken>([
    "foreground",
    "card-foreground",
    "popover-foreground",
    "muted-foreground",
    "sidebar-foreground",
  ]),
  background: new Set<ShadcnToken>([
    "background",
    "card",
    "popover",
    "border",
    "input",
    "sidebar",
    "sidebar-border",
    "muted-foreground", // blend of foreground + background
  ]),
  primary: new Set<ShadcnToken>([
    "primary",
    "primary-foreground",
    "ring",
    "sidebar-primary",
    "sidebar-primary-foreground",
    "sidebar-ring",
  ]),
  secondary: new Set<ShadcnToken>([
    "secondary",
    "secondary-foreground",
    "muted",
  ]),
  accent: new Set<ShadcnToken>([
    "accent",
    "accent-foreground",
    "chart-1",
    "chart-2",
    "chart-3",
    "chart-4",
    "chart-5",
    "sidebar-accent",
    "sidebar-accent-foreground",
  ]),
};

// ── Actions ───────────────────────────────────────────────────────────────────

type Action =
  | { type: "SET_SIMPLE"; key: keyof SimpleTokens; value: string }
  | { type: "SET_SHADCN_TOKEN"; token: ShadcnToken; value: string }
  | { type: "RESET_TOKEN_TO_DERIVED"; token: ShadcnToken }
  | { type: "RESET_ALL_TO_DERIVED" }
  | { type: "SET_ACTIVE_MODE"; mode: ThemeMode }
  | { type: "APPLY_PRESET"; preset: BuiltInPreset }
  | { type: "UNDO" }
  | { type: "REDO" }
  | { type: "SET_RADIUS"; value: string };

// ── Helpers ───────────────────────────────────────────────────────────────────

function snapshot(state: ThemeState): ThemeSnapshot {
  return { simple: state.simple, light: state.light, dark: state.dark };
}

function pushPast(state: ThemeState): ThemeState {
  const past = [snapshot(state), ...state.past].slice(0, HISTORY_CAP);
  return { ...state, past, future: [] };
}

// ── Initial state ─────────────────────────────────────────────────────────────

const DEFAULT_SIMPLE: SimpleTokens = {
  foreground: SHADCN_LIGHT_DEFAULTS.foreground,
  background: SHADCN_LIGHT_DEFAULTS.background,
  primary: SHADCN_LIGHT_DEFAULTS.primary,
  secondary: SHADCN_LIGHT_DEFAULTS.secondary,
  accent: SHADCN_LIGHT_DEFAULTS.accent,
};

function tokenValuesToModeTheme(tv: Record<string, string>): ModeTheme {
  const result: Record<string, { value: string; source: "derived" }> = {};
  for (const k of Object.keys(tv)) {
    result[k] = { value: tv[k], source: "derived" };
  }
  return result as ModeTheme;
}

function buildInitialState(): ThemeState {
  const light = deriveShadcnTokens(DEFAULT_SIMPLE, "light");
  const dark = tokenValuesToModeTheme(SHADCN_DARK_DEFAULTS);
  return {
    simple: DEFAULT_SIMPLE,
    light,
    dark,
    activeMode: "light",
    past: [],
    future: [],
  };
}

const INITIAL_STATE: ThemeState = buildInitialState();

// ── Reducer ───────────────────────────────────────────────────────────────────

function reducer(state: ThemeState, action: Action): ThemeState {
  switch (action.type) {
    case "SET_SIMPLE": {
      const next = pushPast(state);
      const newSimple = { ...state.simple, [action.key]: action.value };
      const mapped = SIMPLE_TO_SHADCN_MAP[action.key];
      const isLight = state.activeMode === "light";

      // Only recompute and update the active mode.
      // The inactive mode is left completely untouched — no cross-mode propagation.
      const freshActive = deriveShadcnTokens(newSimple, state.activeMode);

      const mergeActive = (fresh: ModeTheme, prev: ModeTheme): ModeTheme => {
        const result = { ...fresh };
        for (const token of Object.keys(prev) as ShadcnToken[]) {
          if (prev[token].source === "override" && !mapped.has(token)) {
            result[token] = prev[token];
          }
        }
        return result;
      };

      return {
        ...next,
        simple: newSimple,
        light: isLight ? mergeActive(freshActive, state.light) : state.light,
        dark: !isLight ? mergeActive(freshActive, state.dark) : state.dark,
      };
    }

    case "SET_SHADCN_TOKEN": {
      const next = pushPast(state);
      if (state.activeMode === "light") {
        return {
          ...next,
          light: {
            ...state.light,
            [action.token]: {
              value: action.value,
              source: "override" as const,
            },
          },
        };
      } else {
        return {
          ...next,
          dark: {
            ...state.dark,
            [action.token]: {
              value: action.value,
              source: "override" as const,
            },
          },
        };
      }
    }

    case "RESET_TOKEN_TO_DERIVED": {
      const rederived =
        state.activeMode === "light"
          ? deriveShadcnTokens(state.simple, "light")
          : deriveShadcnTokens(state.simple, "dark");
      if (state.activeMode === "light") {
        return {
          ...state,
          light: {
            ...state.light,
            [action.token]: rederived[action.token],
          },
        };
      } else {
        return {
          ...state,
          dark: {
            ...state.dark,
            [action.token]: rederived[action.token],
          },
        };
      }
    }

    case "RESET_ALL_TO_DERIVED": {
      const next = pushPast(state);
      if (state.activeMode === "light") {
        return {
          ...next,
          light: deriveShadcnTokens(state.simple, "light"),
        };
      } else {
        return {
          ...next,
          dark: deriveShadcnTokens(state.simple, "dark"),
        };
      }
    }

    case "SET_ACTIVE_MODE":
      return { ...state, activeMode: action.mode };

    case "APPLY_PRESET": {
      const { preset } = action;
      return {
        ...state,
        simple: preset.simple,
        light: preset.light,
        dark: preset.dark,
        past: [],
        future: [],
      };
    }

    case "UNDO": {
      if (!state.past.length) return state;
      const [prev, ...rest] = state.past;
      return {
        ...state,
        ...prev,
        past: rest,
        future: [snapshot(state), ...state.future].slice(0, HISTORY_CAP),
      };
    }

    case "REDO": {
      if (!state.future.length) return state;
      const [next, ...rest] = state.future;
      return {
        ...state,
        ...next,
        past: [snapshot(state), ...state.past].slice(0, HISTORY_CAP),
        future: rest,
      };
    }

    case "SET_RADIUS": {
      const next = pushPast(state);
      const radiusToken = { value: action.value, source: "override" as const };
      return {
        ...next,
        light: { ...state.light, radius: radiusToken },
        dark: { ...state.dark, radius: radiusToken },
      };
    }

    default:
      return state;
  }
}

// ── Context ───────────────────────────────────────────────────────────────────

interface ThemingStoreContextValue {
  state: ThemeState;
  dispatch: (action: Action) => void;
  canUndo: boolean;
  canRedo: boolean;
}

const ThemingContext = createContext<ThemingStoreContextValue | undefined>(
  undefined,
);

// ── Persistence ───────────────────────────────────────────────────────────────

function loadPersistedState(): Partial<ThemeState> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const saved = JSON.parse(raw) as Partial<ThemeState>;
    if (!saved.simple || !saved.light || !saved.dark) return {};
    return {
      simple: saved.simple,
      light: saved.light,
      dark: saved.dark,
      activeMode: saved.activeMode ?? "light",
    };
  } catch {
    return {};
  }
}

// ── Provider ──────────────────────────────────────────────────────────────────

export function ThemingStoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { resolvedTheme } = useTheme();
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE, (init) => ({
    ...init,
    ...loadPersistedState(),
  }));

  // Sync activeMode when resolvedTheme changes externally (OS toggle, header button)
  useEffect(() => {
    if (!resolvedTheme) return;
    const mode: ThemeMode = resolvedTheme === "dark" ? "dark" : "light";
    dispatch({ type: "SET_ACTIVE_MODE", mode });
  }, [resolvedTheme, dispatch]);

  // Apply CSS vars to document root whenever state or color scheme changes
  useEffect(() => {
    const isDark = resolvedTheme === "dark";
    const tokens = isDark ? state.dark : state.light;
    const root = document.documentElement;
    for (const token of Object.keys(tokens) as ShadcnToken[]) {
      root.style.setProperty(`--${token}`, tokens[token].value);
    }
  }, [state.light, state.dark, resolvedTheme]);

  // Persist state
  useEffect(() => {
    const id = setTimeout(() => {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            simple: state.simple,
            light: state.light,
            dark: state.dark,
            activeMode: state.activeMode,
          }),
        );
      } catch {}
    }, 400);
    return () => clearTimeout(id);
  }, [state.simple, state.light, state.dark, state.activeMode]);

  const value: ThemingStoreContextValue = {
    state,
    dispatch,
    canUndo: state.past.length > 0,
    canRedo: state.future.length > 0,
  };

  return React.createElement(
    LocalThemesProvider,
    null,
    React.createElement(ThemingContext.Provider, { value }, children),
  );
}

// Keep old name as alias so layout.tsx doesn't break until step c
export const ShadcnThemeStoreProvider = ThemingStoreProvider;

export function useThemingStore(): ThemingStoreContextValue {
  const ctx = useContext(ThemingContext);
  if (!ctx)
    throw new Error("useThemingStore must be used inside ThemingStoreProvider");
  return ctx;
}

// ── Legacy compatibility shim (removed in step e) ────────────────────────────
// Existing components use this API until they are updated in step e.

interface LegacyStoreValue {
  state: {
    light: TokenValues;
    dark: TokenValues;
    mode: ThemeMode;
    past: unknown[];
    future: unknown[];
  };
  setToken: (token: ShadcnToken, value: string) => void;
  setMode: (mode: ThemeMode) => void;
  applyTheme: (light: TokenValues, dark: TokenValues) => void;
  reset: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

function modeThemeToTokenValues(mt: ModeTheme): TokenValues {
  const result: Record<string, string> = {};
  for (const k of Object.keys(mt)) {
    result[k] = mt[k as ShadcnToken].value;
  }
  return result as TokenValues;
}

export function useStore(): LegacyStoreValue {
  const { state, dispatch, canUndo, canRedo } = useThemingStore();

  const setToken = useCallback(
    (token: ShadcnToken, value: string) =>
      dispatch({ type: "SET_SHADCN_TOKEN", token, value }),
    [dispatch],
  );

  const setMode = useCallback(
    (mode: ThemeMode) => dispatch({ type: "SET_ACTIVE_MODE", mode }),
    [dispatch],
  );

  const applyTheme = useCallback(
    (light: TokenValues, dark: TokenValues) => {
      const toLegacyModeTheme = (tv: TokenValues): ModeTheme => {
        const result: Record<string, { value: string; source: "override" }> =
          {};
        for (const k of Object.keys(tv)) {
          result[k] = { value: tv[k as ShadcnToken], source: "override" };
        }
        return result as ModeTheme;
      };
      dispatch({
        type: "APPLY_PRESET",
        preset: {
          name: "Custom",
          description: "",
          level: "advanced",
          simple: {
            foreground: light.foreground,
            background: light.background,
            primary: light.primary,
            secondary: light.secondary,
            accent: light.accent,
          },
          light: toLegacyModeTheme(light),
          dark: toLegacyModeTheme(dark),
        },
      });
    },
    [dispatch],
  );

  const reset = useCallback(
    () => dispatch({ type: "RESET_ALL_TO_DERIVED" }),
    [dispatch],
  );
  const undo = useCallback(() => dispatch({ type: "UNDO" }), [dispatch]);
  const redo = useCallback(() => dispatch({ type: "REDO" }), [dispatch]);

  return {
    state: {
      light: modeThemeToTokenValues(state.light),
      dark: modeThemeToTokenValues(state.dark),
      mode: state.activeMode,
      past: state.past,
      future: state.future,
    },
    setToken,
    setMode,
    applyTheme,
    reset,
    undo,
    redo,
    canUndo,
    canRedo,
  };
}
