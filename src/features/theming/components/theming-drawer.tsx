"use client";

import { cn } from "@/lib/utils";
import { Dialog } from "radix-ui";
import { EditorPanel } from "./editor-panel";

interface ThemingDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function ThemingDrawer({ open, onClose }: ThemingDrawerProps) {
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(o) => !o && onClose()}
      modal={false}
    >
      <Dialog.Portal>
        {/* No overlay — non-modal so user can interact with the Playground behind it */}
        <Dialog.Content
          aria-label="Theme editor"
          className={cn(
            "fixed inset-y-0 right-0 z-50 flex flex-col w-[80%] sm:w-[440px] bg-background border-l border-border shadow-2xl",
            "transition ease-in-out",
            "data-[state=open]:animate-in data-[state=open]:slide-in-from-right data-[state=open]:duration-300",
            "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=closed]:duration-200",
          )}
        >
          <EditorPanel />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
