"use client";

import { useThemeFromUrl } from "@/hooks/use-theme-from-url";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

/**
 * Drop this once anywhere inside ThemingStoreProvider.
 * Handles two things:
 *   1. On mount: decodes #theme= from the URL, applies it, clears the hash.
 *   2. hashchange (same-tab paste): shows a confirm dialog before overwriting
 *      the user's current edits.
 */
export function ThemeUrlLoader() {
  const { pendingTheme, confirmLoad, dismissPending } = useThemeFromUrl();

  return (
    <Dialog
      open={pendingTheme !== null}
      onOpenChange={(open) => {
        if (!open) dismissPending();
      }}
    >
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Load shared theme?</DialogTitle>
          <DialogDescription>
            Your current unsaved changes will be replaced.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={dismissPending}>
            Cancel
          </Button>
          <Button onClick={confirmLoad}>Load theme</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
