"use client"

import { PlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ShowcaseCard } from "./showcase-card"

export function DistributeTrackCard() {
  return (
    <ShowcaseCard title="Distribute Track">
      <div className="flex flex-col items-center justify-center py-4 text-center">
        <div className="h-12 w-12 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center mb-4">
          <PlusIcon className="h-6 w-6 text-muted-foreground" />
        </div>

        <div className="font-medium">Distribute Track</div>
        <p className="text-sm text-muted-foreground mt-1 mb-4">
          Upload your first master to start reaching listeners on Spotify, Apple Music, and more.
        </p>

        <Button>Create Release</Button>
      </div>
    </ShowcaseCard>
  )
}
