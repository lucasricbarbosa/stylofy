"use client"

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CheckIcon,
  MinusIcon,
  PlusIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { ShowcaseCard } from "./showcase-card"

export function NavigationButtonsCard() {
  return (
    <ShowcaseCard title="Navigation">
      <div className="space-y-4">
        <ButtonGroup>
          <Button variant="outline" size="icon"><MinusIcon className="h-4 w-4" /></Button>
          <Button variant="outline" size="icon"><ArrowLeftIcon className="h-4 w-4" /></Button>
          <Button variant="outline" size="icon"><ArrowRightIcon className="h-4 w-4" /></Button>
          <Button variant="outline" size="icon"><ArrowUpIcon className="h-4 w-4" /></Button>
          <Button variant="outline" size="icon"><ArrowDownIcon className="h-4 w-4" /></Button>
          <Button variant="outline" size="icon"><CheckIcon className="h-4 w-4" /></Button>
          <Button variant="outline" size="icon"><PlusIcon className="h-4 w-4" /></Button>
        </ButtonGroup>
      </div>
    </ShowcaseCard>
  )
}
