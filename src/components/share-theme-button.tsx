"use client";

import { Check, Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { useThemingStore } from "@/features/theming/store";
import { buildShareUrl, MAX_SAFE_URL_LENGTH } from "@/lib/share-theme";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

const SUCCESS_RESET_MS = 2000;

interface ShareThemeButtonProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * Usage:
 *   <ShareThemeButton />
 *   <ShareThemeButton><Button variant="ghost">Share</Button></ShareThemeButton>
 *
 * Requires: <Toaster /> and <ThemeUrlLoader /> mounted somewhere above.
 * Wire-up: uses useThemingStore() — already reads from your store automatically.
 */
export function ShareThemeButton({
  children,
  className,
}: ShareThemeButtonProps) {
  const { state } = useThemingStore();
  const [copied, setCopied] = useState(false);
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null);

  async function handleShare() {
    if (copied) return;

    const url = buildShareUrl({
      simple: state.simple,
      light: state.light,
      dark: state.dark,
    });

    if (url.length > MAX_SAFE_URL_LENGTH) {
      toast.warning(
        "This link is long — some platforms (Twitter, Discord) may truncate it, but it works in any browser.",
      );
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Theme link copied to clipboard");
      setTimeout(() => setCopied(false), SUCCESS_RESET_MS);
    } catch {
      setFallbackUrl(url);
    }
  }

  return (
    <>
      <span className="contents" onClick={handleShare}>
        {children ?? (
          <Button
            variant="outline"
            size="sm"
            className={cn("gap-1.5 cursor-pointer w-fit", className)}
            aria-label="Share theme"
          >
            {copied ? (
              <Check className="size-3.5 text-green-500" />
            ) : (
              <Share2 className="size-3.5" />
            )}
            {copied ? "Copied!" : "Share Theme"}
          </Button>
        )}
      </span>

      {/* Clipboard unavailable — show URL for manual copy */}
      <Dialog
        open={fallbackUrl !== null}
        onOpenChange={(open) => {
          if (!open) setFallbackUrl(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share your theme</DialogTitle>
            <DialogDescription>
              Copy this link to share your current theme.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2 rounded-md border bg-muted px-3 py-2">
            <code className="min-w-0 flex-1 truncate text-xs">
              {fallbackUrl}
            </code>
            <Button
              size="sm"
              variant="ghost"
              className="shrink-0"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(fallbackUrl ?? "");
                  setFallbackUrl(null);
                  setCopied(true);
                  toast.success("Theme link copied to clipboard");
                  setTimeout(() => setCopied(false), SUCCESS_RESET_MS);
                } catch {
                  // Still unreadable — user can manually select the text
                }
              }}
            >
              Copy
            </Button>
          </div>
          <DialogFooter showCloseButton />
        </DialogContent>
      </Dialog>
    </>
  );
}
