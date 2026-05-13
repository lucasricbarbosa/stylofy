"use client"

import { Button } from "@/components/ui/button"
import { ShowcaseCard } from "./showcase-card"

export function HierarchyCard() {
  return (
    <ShowcaseCard title="Inherit - Inter">
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold tracking-tight">
            Designing with rhythm and hierarchy.
          </h3>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          A strong body style keeps long-form content readable and balances the visual weight of headings.
        </p>

        <p className="text-sm text-muted-foreground leading-relaxed">
          Thoughtful spacing and cadence help paragraphs scan quickly without feeling dense.
        </p>

        <Button variant="outline" className="w-full">
          Share Feedback
        </Button>
      </div>
    </ShowcaseCard>
  )
}
