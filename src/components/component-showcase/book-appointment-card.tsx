"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ShowcaseCard } from "./showcase-card"

export function BookAppointmentCard() {
  const times = ["9:00 AM", "10:30 AM", "11:00 AM", "1:30 PM"]

  return (
    <ShowcaseCard title="Book Appointment">
      <div className="space-y-4">
        <div>
          <div className="font-medium">Dr. Sarah Chen - Cardiology</div>
          <div className="text-sm text-muted-foreground">Available on March 18, 2026</div>
        </div>

        <div className="flex flex-wrap gap-2">
          {times.map((time, index) => (
            <Button
              key={time}
              variant={index === 0 ? "default" : "outline"}
              size="sm"
              className="text-xs"
            >
              {time}
            </Button>
          ))}
        </div>

        <div className="flex items-start gap-2 p-3 rounded-md border bg-muted/30">
          <Checkbox id="new-patient" className="mt-0.5" />
          <div>
            <label htmlFor="new-patient" className="text-sm font-medium cursor-pointer">
              New patient?
            </label>
            <p className="text-xs text-muted-foreground">
              Please arrive 15 minutes early.
            </p>
          </div>
        </div>

        <Button className="w-full">Book Appointment</Button>
      </div>
    </ShowcaseCard>
  )
}
