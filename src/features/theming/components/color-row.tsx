"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { isValidColor, toHex, toOklch } from "../lib/oklch";
import { useThemingStore } from "../store";
import type { ShadcnToken } from "../types";
import { ColorPickerPopover } from "./color-picker-popover";

interface ColorRowProps {
  token: ShadcnToken;
  label: string;
}

export function ColorRow({ token, label }: ColorRowProps) {
  const { state, dispatch } = useThemingStore();

  const modeTokens = state.activeMode === "light" ? state.light : state.dark;
  const tokenValue = modeTokens[token];
  const isOverride = tokenValue.source === "override";
  const rawValue = tokenValue.value;

  const commit = useCallback(
    (value: string) => dispatch({ type: "SET_SHADCN_TOKEN", token, value }),
    [dispatch, token],
  );

  // Text input with 120ms debounce
  const [inputText, setInputText] = useState(rawValue);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync input text when store value changes externally (undo, preset, etc.)
  useEffect(() => {
    setInputText(rawValue);
  }, [rawValue]);

  const hexValue = (() => {
    try {
      return toHex(rawValue);
    } catch {
      return "#ffffff";
    }
  })();

  const handleInputChange = useCallback(
    (text: string) => {
      setInputText(text);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        if (isValidColor(text)) {
          commit(toOklch(text));
        }
      }, 120);
    },
    [commit],
  );

  const handleInputBlur = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (isValidColor(inputText)) {
      commit(toOklch(inputText));
    }
  }, [inputText, commit]);

  const handleInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        if (isValidColor(inputText)) {
          commit(toOklch(inputText));
        }
      }
    },
    [inputText, commit],
  );

  const handleResetToDerived = useCallback(() => {
    dispatch({ type: "RESET_TOKEN_TO_DERIVED", token });
  }, [dispatch, token]);

  return (
    <div
      className={cn(
        "group flex items-center gap-2.5 px-4 py-2 min-h-[52px] transition-colors hover:bg-muted/40",
        "rounded-lg",
      )}
    >
      {/* Swatch + picker */}
      <Popover>
        <PopoverTrigger asChild>
          <button
            className="w-9 h-9 shrink-0 rounded-lg border border-border shadow-sm transition-all hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-ring"
            style={{ backgroundColor: hexValue }}
            title={`Edit ${label}`}
          />
        </PopoverTrigger>
        <PopoverContent
          className="p-0 border-0 bg-transparent shadow-none w-auto"
          align="start"
          sideOffset={6}
        >
          <ColorPickerPopover
            key={`${token}-${state.activeMode}`}
            value={rawValue}
            onCommit={commit}
          />
        </PopoverContent>
      </Popover>

      {/* Label + input */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-medium text-muted-foreground truncate">
            {label}
          </span>
          {isOverride && (
            <button
              onClick={handleResetToDerived}
              title="Reset to auto-derived value"
              className="flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              override
            </button>
          )}
        </div>
        <input
          type="text"
          value={inputText}
          onChange={(e) => handleInputChange(e.target.value)}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          spellCheck={false}
          className="w-full bg-transparent font-mono text-[11px] text-foreground placeholder:text-muted-foreground focus:outline-none leading-none mt-0.5"
        />
      </div>

      {/* Hex label */}
      <span className="text-[10px] font-mono text-muted-foreground shrink-0 hidden sm:block">
        {hexValue}
      </span>
    </div>
  );
}
