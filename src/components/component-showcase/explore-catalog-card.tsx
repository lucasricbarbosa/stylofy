"use client"

import { MusicIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ShowcaseCard } from "./showcase-card"

export function ExploreCatalogCard() {
  return (
    <ShowcaseCard title="Explore Catalog">
      <div className="flex flex-col items-center justify-center py-4 text-center">
        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mb-4">
          <MusicIcon className="h-5 w-5 text-muted-foreground" />
        </div>

        <div className="font-medium">Explore Catalog</div>
        <p className="text-sm text-muted-foreground mt-1 mb-4">
          Check your ISRC codes, metadata, and visual assets before going live.
        </p>

        <Button>View Catalog</Button>
      </div>
    </ShowcaseCard>
  )
}
