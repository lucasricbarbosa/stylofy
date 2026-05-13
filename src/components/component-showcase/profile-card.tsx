"use client"

import { Button } from "@/components/ui/button"
import { ShowcaseCard } from "./showcase-card"

export function ProfileCard() {
  return (
    <ShowcaseCard title="Profile">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Manage your profile information.</span>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" className="h-7 w-7 p-0">01</Button>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-muted-foreground">02</Button>
          </div>
        </div>

        <div className="h-8" />

        <Button className="w-full">Submit</Button>
      </div>
    </ShowcaseCard>
  )
}
