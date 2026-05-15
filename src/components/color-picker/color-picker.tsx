"use client";

import { TailwindPicker } from "@/features/theming/components/tailwind-picker";
import { toOklch } from "@/features/theming/lib/oklch";
import { oklchToHex } from "@/utils/colors";
import { useEffect, useRef, useState } from "react";

export type ColorPickerProps = {
  value: string;
  onCommit: (oklch: string) => void;
  onPreview?: (oklch: string) => void;
  showTailwindPalette?: boolean;
};

function isValidHex(s: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(s);
}

export function ColorPicker({
  value,
  onCommit,
  onPreview,
  showTailwindPalette = true,
}: ColorPickerProps) {
  const hexFromProp = oklchToHex(value) || "#000000";
  const [liveHex, setLiveHex] = useState(hexFromProp);
  const [textInput, setTextInput] = useState(hexFromProp);
  const nativeRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);
  const pendingOklch = useRef<string | null>(null);
  const isTextFocused = useRef(false);
  const dialogOpenHex = useRef<string | null>(null);
  const onCommitRef = useRef(onCommit);
  const onPreviewRef = useRef(onPreview);
  onCommitRef.current = onCommit;
  onPreviewRef.current = onPreview;

  useEffect(() => {
    const hex = oklchToHex(value) || "#000000";
    setLiveHex(hex);
    if (!isTextFocused.current) setTextInput(hex);
  }, [value]);

  useEffect(() => {
    const el = nativeRef.current;
    if (!el) return;

    const onClose = (e: Event) => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      pendingOklch.current = null;

      const finalHex = (e.target as HTMLInputElement).value;
      // Skip commit (and undo entry) if the user closed without changing anything
      if (
        dialogOpenHex.current !== null &&
        finalHex === dialogOpenHex.current
      ) {
        dialogOpenHex.current = null;
        return;
      }
      dialogOpenHex.current = null;
      onCommitRef.current(toOklch(finalHex));
    };

    el.addEventListener("change", onClose);
    return () => {
      el.removeEventListener("change", onClose);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const schedulePreview = (hex: string) => {
    if (!onPreviewRef.current) return;
    pendingOklch.current = toOklch(hex);
    if (rafRef.current == null) {
      rafRef.current = requestAnimationFrame(() => {
        if (pendingOklch.current) onPreviewRef.current?.(pendingOklch.current);
        pendingOklch.current = null;
        rafRef.current = null;
      });
    }
  };

  const handleNativeChange = (hex: string) => {
    setLiveHex(hex);
    if (!isTextFocused.current) setTextInput(hex);
    schedulePreview(hex);
  };

  const handleTextChange = (text: string) => {
    setTextInput(text);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (isValidHex(text)) {
        setLiveHex(text);
        onCommitRef.current(toOklch(text));
      }
    }, 120);
  };

  const commitText = (text: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (isValidHex(text)) {
      setLiveHex(text);
      onCommitRef.current(toOklch(text));
    }
  };

  return (
    <div className="flex items-center gap-1.5">
      <div className="relative w-7 h-7 shrink-0">
        <div
          className="w-7 h-7 rounded-md border border-border shadow-sm"
          style={{ backgroundColor: liveHex }}
        />
        <input
          ref={nativeRef}
          type="color"
          value={liveHex}
          onChange={(e) => handleNativeChange(e.target.value)}
          onFocus={() => {
            dialogOpenHex.current = liveHex;
          }}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-md"
          tabIndex={-1}
          aria-label="Pick color"
        />
      </div>

      <input
        type="text"
        value={textInput}
        onChange={(e) => handleTextChange(e.target.value)}
        onFocus={() => {
          isTextFocused.current = true;
        }}
        onBlur={(e) => {
          isTextFocused.current = false;
          commitText(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") commitText(textInput);
        }}
        spellCheck={false}
        className="w-20 hidden px-2 py-1 text-xs font-mono border border-border rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-ring"
        aria-label="Hex color value"
      />

      {showTailwindPalette && (
        <TailwindPicker
          onSelect={(oklch) => {
            const hex = oklchToHex(oklch) || "#000000";
            setLiveHex(hex);
            setTextInput(hex);
            onCommitRef.current(oklch);
          }}
        />
      )}
    </div>
  );
}

export default ColorPicker;
