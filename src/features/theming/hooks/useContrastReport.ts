"use client";

import { useMemo } from "react";
import { computeContrastReport, countFailingAA } from "../lib/contrast";
import { useThemingStore } from "../store";

export function useContrastReport() {
  const { state } = useThemingStore();
  const modeTokens = state.activeMode === "light" ? state.light : state.dark;

  // Extract plain string values for the contrast computation
  const tokenValues = useMemo(() => {
    const result: Record<string, string> = {};
    for (const k of Object.keys(modeTokens)) {
      result[k] = modeTokens[k as keyof typeof modeTokens].value;
    }
    return result as Parameters<typeof computeContrastReport>[0];
  }, [modeTokens]);

  const results = useMemo(() => computeContrastReport(tokenValues), [tokenValues]);
  const failCount = useMemo(() => countFailingAA(results), [results]);

  return { results, failCount };
}
