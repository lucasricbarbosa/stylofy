"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ShowcaseCardProps {
  title: string
  children: React.ReactNode
  className?: string
}

export function ShowcaseCard({ title, children, className }: ShowcaseCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-5">
        <div className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {title}
        </div>
        {children}
      </CardContent>
    </Card>
  )
}
