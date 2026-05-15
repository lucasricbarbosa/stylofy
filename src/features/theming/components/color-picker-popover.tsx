"use client";

import ColorPicker from "@/components/color-picker/color-picker";
import { oklchToHex } from "@/utils/colors";
import { useDeferredCommit } from "../hooks/useDeferredCommit";
import { toOklch } from "../lib/oklch";
import { TailwindPicker } from "./tailwind-picker";

interface ColorPickerPopoverProps {
  value: string;
  onCommit: (oklch: string) => void;
}

function safeHex(value: string): string {
  return oklchToHex(value) || "#000000";
}

export function ColorPickerPopover({
  value,
  onCommit,
}: ColorPickerPopoverProps) {
  // Draft lives in hex — no OKLCH round-trip during drag.
  // Because setDraftHex receives the exact hex ColorPicker emitted, draftHex always
  // equals lastEmittedRef inside ColorPicker, so the external-sync effect is blocked
  // on every interaction tick and the indicator never teleports.
  const [draftHex, setDraftHex, flushHex] = useDeferredCommit(
    safeHex(value),
    (hex) => onCommit(toOklch(hex)),
  );

  return (
    <div className="flex flex-col items-end gap-1">
      {/* Flush the deferred commit when the pointer is released anywhere inside the picker. */}
      <div onPointerUp={flushHex} onPointerCancel={flushHex}>
        <ColorPicker initialColor={draftHex} onColorChange={setDraftHex} />
      </div>
      {/* TailwindPicker is outside the flush wrapper so its click doesn't trigger a
          stale-draft flush that would override the Tailwind selection. */}
      <TailwindPicker onSelect={onCommit} />
    </div>
  );
}
