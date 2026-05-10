"use client";

import { cn } from "@/lib/utils";
import React from "react";
export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface AvatarGroupProps {
  children: React.ReactNode;
  max?: number;
  total?: number;
  size?: AvatarSize;
  border?: boolean;
  className?: string;
}

const sizeClasses: Record<AvatarSize, string> = {
  xs: "h-6 w-6 text-[10px]",
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

const spacingClasses: Record<AvatarSize, string> = {
  xs: "-ml-1",
  sm: "-ml-1.5",
  md: "-ml-2",
  lg: "-ml-3",
  xl: "-ml-4",
};

export function AvatarGroup({
  children,
  max,
  total,
  size = "md",
  border = true,
  className,
}: AvatarGroupProps) {
  const childArray = React.Children.toArray(children);
  const displayChildren = max ? childArray.slice(0, max) : childArray;

  const totalCount = total ?? childArray.length;
  const remainingCount = max && totalCount > max ? totalCount - max : 0;

  return (
    <div className={cn("flex items-center", className)}>
      {displayChildren.map((child, index) => (
        <div
          key={index}
          className={cn(
            "relative transition-transform duration-200 ease-out hover:z-10 hover:-translate-x-1",
            sizeClasses[size],
            index !== 0 && spacingClasses[size],
          )}
          style={{ zIndex: displayChildren.length + index }}
        >
          {React.isValidElement(child)
            ? React.cloneElement(
                child as React.ReactElement<{
                  size?: AvatarSize;
                  border?: boolean;
                }>,
                {
                  size,
                  border,
                },
              )
            : child}
        </div>
      ))}
      {remainingCount > 0 && (
        <div
          className={cn(
            "relative inline-flex shrink-0 items-center justify-center rounded-full bg-muted",
            sizeClasses[size],
            spacingClasses[size],
            border && "ring-2 ring-border",
          )}
          style={{ zIndex: displayChildren.length + 1 }}
        >
          <span className="font-medium text-muted-foreground">
            +{remainingCount}
          </span>
        </div>
      )}
    </div>
  );
}
