"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AppointmentModal } from "@/components/appointment-modal"
import { CalendarDays } from "lucide-react"
import { cn } from "@/lib/utils"

export function BookAppointmentButton({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)} className={cn("flex items-center", className)}>
        <CalendarDays className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
        Book Appointment
      </Button>
      <AppointmentModal open={open} onOpenChange={setOpen} />
    </>
  )
}

