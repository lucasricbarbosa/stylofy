"use client";

import { TailwindPicker } from "@/features/theming/components/tailwind-picker";
import { toHex, toOklch } from "@/features/theming/lib/oklch";
import { useEffect, useRef, useState } from "react";

export type ColorPickerProps = {
  value: string;
  onCommit: (oklch: string) => void;
  onPreview?: (oklch: string | null) => void;
  showTailwindPalette?: boolean;
};

export function ColorPicker({
  value,
  onCommit,
  onPreview,
  showTailwindPalette = true,
}: ColorPickerProps) {
  const [liveHex, setLiveHex] = useState(() => toHex(value) || "#000000");
  const nativeRef = useRef<HTMLInputElement>(null);
  const startHexRef = useRef<string | null>(null);
  const onCommitRef = useRef(onCommit);
  const onPreviewRef = useRef(onPreview);
  onCommitRef.current = onCommit;
  onPreviewRef.current = onPreview;

  // Sync swatch when external value changes (undo, preset apply, etc.)
  useEffect(() => {
    setLiveHex(toHex(value) || "#000000");
  }, [value]);

  // Native "change" fires when the color dialog closes (not on every drag step)
  useEffect(() => {
    const el = nativeRef.current;
    if (!el) return;
    const handleClose = (e: Event) => {
      const finalHex = (e.target as HTMLInputElement).value;
      onPreviewRef.current?.(null); // always clear preview on close
      if (startHexRef.current !== null && finalHex !== startHexRef.current) {
        onCommitRef.current(toOklch(finalHex));
      }
      startHexRef.current = null;
    };
    el.addEventListener("change", handleClose);
    return () => el.removeEventListener("change", handleClose);
  }, []);

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
          onFocus={() => {
            startHexRef.current = liveHex;
          }}
          onChange={(e) => {
            setLiveHex(e.target.value);
            onPreviewRef.current?.(toOklch(e.target.value));
          }}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-md"
          tabIndex={-1}
          aria-label="Pick color"
        />
      </div>

      {showTailwindPalette && (
        <TailwindPicker
          onSelect={(oklch) => {
            setLiveHex(toHex(oklch) || "#000000");
            onPreviewRef.current?.(null);
            onCommitRef.current(oklch);
          }}
        />
      )}
    </div>
  );
}

export default ColorPicker;
