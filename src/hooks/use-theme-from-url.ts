import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { useThemingStore } from "@/features/theming/store";
import type { ModeTheme, SimpleTokens } from "@/features/theming/types";
import { decodeThemeState, parseThemeFromHash } from "@/lib/share-theme";

export type PendingTheme = {
  simple: SimpleTokens;
  light: ModeTheme;
  dark: ModeTheme;
};

export function useThemeFromUrl() {
  const { dispatch } = useThemingStore();
  const [pendingTheme, setPendingTheme] = useState<PendingTheme | null>(null);
  const initializedRef = useRef(false);

  const applyTheme = useCallback(
    (theme: PendingTheme) => {
      dispatch({
        type: "APPLY_PRESET",
        preset: {
          name: "Shared",
          description: "",
          level: "advanced",
          simple: theme.simple,
          light: theme.light,
          dark: theme.dark,
        },
      });
    },
    [dispatch],
  );

  // On mount: decode #theme= from the URL, apply it, then clear the hash so
  // the address bar stays clean while the user edits.
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const encoded = parseThemeFromHash();
    if (!encoded) return;

    const decoded = decodeThemeState(encoded);
    history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search,
    );

    if (!decoded) {
      toast.error("Couldn't load shared theme — using defaults");
      return;
    }

    applyTheme(decoded);
    toast.success("Shared theme loaded");
  }, [applyTheme]);

  // hashchange: someone pastes a shared URL into the same tab while editing.
  // Surface a confirm prompt rather than silently blowing away their work.
  useEffect(() => {
    function onHashChange() {
      const encoded = parseThemeFromHash();
      if (!encoded) return;

      const decoded = decodeThemeState(encoded);
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );

      if (!decoded) {
        toast.error("Couldn't load shared theme — URL is invalid");
        return;
      }

      setPendingTheme(decoded);
    }

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const confirmLoad = useCallback(() => {
    if (!pendingTheme) return;
    applyTheme(pendingTheme);
    setPendingTheme(null);
    toast.success("Shared theme loaded");
  }, [pendingTheme, applyTheme]);

  const dismissPending = useCallback(() => setPendingTheme(null), []);

  return { pendingTheme, confirmLoad, dismissPending };
}
