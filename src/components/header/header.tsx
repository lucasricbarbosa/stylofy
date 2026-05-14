"use client";

import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { templates } from "@/utils/templates";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeaderLogo } from "./header-logo";
import { HeaderNav } from "./header-nav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="mx-auto grid max-w-[1200px] grid-cols-[1fr_auto_1fr] items-center px-10 py-[18px] max-md:flex max-md:justify-between max-md:px-6 max-md:py-4">
        <HeaderLogo />
        <HeaderNav />
        {/* Right spacer — keeps nav centered on desktop */}
        <div className="hidden md:block" />
        {/* Mobile hamburger */}
        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

function MobileMenu() {
  const pathname = usePathname();
  const isOnHome = pathname === "/";
  const isOnTemplate = pathname.startsWith("/template");

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </SheetTrigger>

      {/*
        Full-screen overlay — inline styles override the sheet's w-3/4 / sm:max-w-sm
        base classes reliably regardless of Tailwind cascade order.
      */}
      <SheetContent
        side="right"
        style={{ width: "100%", maxWidth: "100%", borderWidth: 0 }}
        className="flex flex-col gap-0 p-0 shadow-none"
        showCloseButton={false}
      >
        <SheetTitle className="sr-only">Navigation menu</SheetTitle>

        {/* ── Close ────────────────────────────────────── */}
        <div className="flex shrink-0 justify-end px-7 pt-7">
          <SheetClose asChild>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-foreground/70 transition-colors active:scale-95"
              aria-label="Close menu"
            >
              <X className="h-[15px] w-[15px]" />
            </button>
          </SheetClose>
        </div>

        {/* ── Items ────────────────────────────────────── */}
        <nav className="flex flex-1 flex-col px-9 pt-10">

          {/* Playground */}
          <MenuItem
            label="Playground"
            href="/"
            index="01"
            isActive={isOnHome}
          />

          {/* Export */}
          <MenuItem
            label="Export"
            href="/"
            index="02"
            isActive={false}
          />

          {/* Templates — collapsible */}
          <Collapsible defaultOpen={isOnTemplate}>
            <div className="flex items-center justify-between py-[18px]">
              <CollapsibleTrigger className="group flex items-start gap-1 text-left">
                <span
                  className={cn(
                    "text-[36px] font-semibold leading-[1.1] tracking-[-0.02em] transition-colors",
                    isOnTemplate ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  Templates
                </span>
                {isOnTemplate && (
                  <sup className="ml-0.5 text-[10px] font-normal text-muted-foreground/60">
                    03
                  </sup>
                )}
              </CollapsibleTrigger>

              {/* Indicator — fills when active, bare when not */}
              <CollapsibleTrigger
                className="group ml-4 shrink-0"
                aria-label="Toggle templates"
              >
                {isOnTemplate ? (
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                    <ChevronDown className="h-4 w-4 text-primary-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </span>
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground/30 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                )}
              </CollapsibleTrigger>
            </div>

            <CollapsibleContent>
              <div className="flex flex-col pb-3 pl-1 pt-1">
                {templates.map((t, idx) => {
                  const isActiveTemplate = pathname === t.url;
                  return (
                    <div
                      key={t.url}
                      className="flex items-center justify-between py-3"
                    >
                      <SheetClose asChild>
                        <Link
                          href={t.url}
                          className="flex items-start gap-1"
                        >
                          <span
                            className={cn(
                              "text-[22px] font-medium leading-[1.1] tracking-[-0.01em] transition-colors",
                              isActiveTemplate
                                ? "text-foreground"
                                : "text-muted-foreground",
                            )}
                          >
                            {t.name}
                          </span>
                          {isActiveTemplate && (
                            <sup className="ml-0.5 text-[9px] font-normal text-muted-foreground/60">
                              {String(idx + 1).padStart(2, "0")}
                            </sup>
                          )}
                        </Link>
                      </SheetClose>

                      {isActiveTemplate ? (
                        <span className="ml-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                          <ChevronRight className="h-3.5 w-3.5 text-primary-foreground" />
                        </span>
                      ) : (
                        <ChevronRight className="ml-3 h-3.5 w-3.5 shrink-0 text-muted-foreground/25" />
                      )}
                    </div>
                  );
                })}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

function MenuItem({
  label,
  href,
  index,
  isActive,
}: {
  label: string;
  href: string;
  index: string;
  isActive: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-[18px]">
      <SheetClose asChild>
        <Link href={href} className="flex items-start gap-1">
          <span
            className={cn(
              "text-[36px] font-semibold leading-[1.1] tracking-[-0.02em] transition-colors",
              isActive ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {label}
          </span>
          {isActive && (
            <sup className="ml-0.5 text-[10px] font-normal text-muted-foreground/60">
              {index}
            </sup>
          )}
        </Link>
      </SheetClose>

      {isActive ? (
        <span className="ml-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary">
          <ChevronRight className="h-4 w-4 text-primary-foreground" />
        </span>
      ) : (
        <ChevronRight className="ml-4 h-4 w-4 shrink-0 text-muted-foreground/25" />
      )}
    </div>
  );
}
