"use client"

import { Button } from "@/components/ui/button"
import { ShowcaseCard } from "./showcase-card"

export function ButtonVariantsCard() {
  return (
    <ShowcaseCard title="Button Variants">
      <div className="flex flex-wrap gap-2">
        <Button>Button</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    </ShowcaseCard>
  )
}
