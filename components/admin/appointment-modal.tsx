"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { CalendarIcon, Clock, X, Check, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isWeekend,
  isPast,
  startOfWeek,
  endOfWeek,
} from "date-fns"

// Make sure this type matches exactly with the Appointment type in the dashboard
type AppointmentType = {
  id: number // Changed from optional to required to match dashboard
  clientName: string
  email: string
  phone: string
  date: Date | string
  time: string
  service: string
  notes?: string
  status: "pending" | "confirmed" | "cancelled"
}

interface AppointmentModalProps {
  isOpen: boolean
  onClose: () => void
  appointment?: AppointmentType | null
  onSave: (appointment: AppointmentType) => Promise<void> // Changed to accept Promise<void>
  mode: "add" | "view" | "edit"
}

export function AppointmentModal({ isOpen, onClose, appointment, onSave, mode }: AppointmentModalProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [step, setStep] = useState(1)
  const [showTimeSlots, setShowTimeSlots] = useState(false)
  const [formData, setFormData] = useState<AppointmentType>({
    id: 0, // Default ID for new appointments
    clientName: "",
    email: "",
    phone: "",
    date: new Date(),
    time: "",
    service: "",
    notes: "",
    status: "pending",
  })

  // Reset time selection when date changes
  useEffect(() => {
    setSelectedTime(null)
    // Add a small delay before showing time slots for animation
    setShowTimeSlots(false)
    const timer = setTimeout(() => {
      setShowTimeSlots(!!selectedDate)
    }, 150)
    return () => clearTimeout(timer)
  }, [selectedDate])

  // Initialize form data when appointment changes
  useEffect(() => {
    if (appointment) {
      const appointmentDate = appointment.date instanceof Date ? appointment.date : new Date(appointment.date as string)

      setFormData({
        ...appointment,
        date: appointmentDate,
      })
      setSelectedDate(appointmentDate)
      setSelectedTime(appointment.time)
      setCurrentMonth(appointmentDate)
      setStep(2) // Go directly to form step for edit/view
    } else {
      setFormData({
        id: 0, // Default ID for new appointments
        clientName: "",
        email: "",
        phone: "",
        date: new Date(),
        time: "",
        service: "",
        notes: "",
        status: "pending",
      })
      setSelectedDate(null)
      setSelectedTime(null)
      setStep(1)
      setCurrentMonth(new Date())
    }
  }, [appointment])

  // Mock data for unavailable dates (in a real app, this would come from your backend)
  const unavailableDates = [
    new Date(2025, 2, 25), // March 25, 2025
    new Date(2025, 2, 26), // March 26, 2025
    new Date(2025, 2, 30), // March 30, 2025
    new Date(2025, 3, 2), // April 2, 2025
    new Date(2025, 3, 10), // April 10, 2025
  ]

  // Mock data for partially booked dates (some time slots available)
  const partiallyBookedDates = [
    new Date(2025, 2, 27), // March 27, 2025
    new Date(2025, 2, 28), // March 28, 2025
    new Date(2025, 3, 3), // April 3, 2025
    new Date(2025, 3, 8), // April 8, 2025
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (mode === "add" || mode === "edit") {
      // Prepare the appointment data
      const appointmentData: AppointmentType = {
        ...formData,
        date: selectedDate || new Date(),
        time: selectedTime || "09:00",
      }

      try {
        await onSave(appointmentData)

        if (mode === "add") {
          setFormSubmitted(true)
          // Reset form after 2 seconds and close modal
          setTimeout(() => {
            setFormSubmitted(false)
            onClose()
            setSelectedDate(null)
            setSelectedTime(null)
            setStep(1)
            setShowTimeSlots(false)
          }, 2000)
        } else {
          onClose()
        }
      } catch (error) {
        console.error("Error saving appointment:", error)
        // Handle error if needed
      }
    } else {
      onClose()
    }
  }

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const getDaysInMonth = () => {
    const start = startOfMonth(currentMonth)
    const end = endOfMonth(currentMonth)
    return eachDayOfInterval({ start, end })
  }

  const getCalendarDays = () => {
    const days = getDaysInMonth()
    const firstDay = startOfMonth(currentMonth)
    const startWeek = startOfWeek(firstDay, { weekStartsOn: 1 }) // Start on Monday
    const endWeek = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 })

    return eachDayOfInterval({ start: startWeek, end: endWeek })
  }

  const isDateUnavailable = (date: Date) => {
    // Check if date is in the past, is a weekend, or is in the unavailable list
    return (
      isPast(date) || isWeekend(date) || unavailableDates.some((unavailableDate) => isSameDay(unavailableDate, date))
    )
  }

  const isDatePartiallyBooked = (date: Date) => {
    return partiallyBookedDates.some((partiallyBookedDate) => isSameDay(partiallyBookedDate, date))
  }

  // Generate available time slots based on the selected date
  const getAvailableTimeSlots = () => {
    if (!selectedDate) return []

    const allTimeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"]

    // If the date is partially booked, remove some time slots
    if (isDatePartiallyBooked(selectedDate)) {
      // This is mock logic - in a real app, you'd get this from your backend
      const unavailableTimes = ["09:00 AM", "02:00 PM"] // Example unavailable times
      return allTimeSlots.filter((time) => !unavailableTimes.includes(time))
    }

    return allTimeSlots
  }

  const calendarDays = getCalendarDays()
  const availableTimeSlots = getAvailableTimeSlots()
  const weekDays = ["M", "T", "W", "T", "F", "S", "S"]

  const isViewOnly = mode === "view"

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden rounded-lg max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-[#1e376b] to-[#2a4a8e] text-white p-3 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <DialogTitle className="text-lg font-bold">
              {mode === "add" ? "Add New Appointment" : mode === "edit" ? "Edit Appointment" : "Appointment Details"}
            </DialogTitle>
            <Button
              variant="ghost"
              className="h-7 w-7 p-0 text-white hover:bg-white/10 rounded-full"
              onClick={() => onClose()}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription className="text-gray-200 text-xs mt-1">
            {mode === "add"
              ? "Select an available date and time for the appointment"
              : "View or edit appointment details"}
          </DialogDescription>
        </div>

        {formSubmitted ? (
          <div className="p-5 flex flex-col items-center justify-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-base font-semibold text-[#1e376b] mb-2">
              Appointment {mode === "add" ? "Created" : "Updated"}
            </h3>
            <p className="text-gray-500 text-center text-sm">
              {selectedDate && selectedTime && (
                <>
                  The appointment is scheduled for{" "}
                  <span className="font-medium">{format(selectedDate, "MMMM d, yyyy")}</span> at{" "}
                  <span className="font-medium">{selectedTime}</span>.
                </>
              )}
            </p>
          </div>
        ) : (
          <>
            {step === 1 && (
              <div className="p-3">
                {/* Calendar Header */}
                <div className="flex justify-between items-center mb-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={prevMonth}
                    disabled={isPast(endOfMonth(subMonths(currentMonth, 1)))}
                    className="h-7 w-7 p-0"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <h3 className="text-sm font-medium">{format(currentMonth, "MMMM yyyy")}</h3>
                  <Button variant="ghost" size="sm" onClick={nextMonth} className="h-7 w-7 p-0">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                {/* Calendar Legend */}
                <div className="flex items-center justify-start gap-3 mb-2 text-xs text-gray-500">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-[#e5edff] rounded-full mr-1"></div>
                    <span>Available</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-[#fff3cd] rounded-full mr-1"></div>
                    <span>Limited</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-gray-200 rounded-full mr-1"></div>
                    <span>Unavailable</span>
                  </div>
                </div>

                {/* Weekday Headers */}
                <div className="grid grid-cols-7 mb-1">
                  {weekDays.map((day, i) => (
                    <div key={i} className="h-6 flex items-center justify-center text-xs font-medium text-gray-500">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 mb-3">
                  {calendarDays.map((date, i) => {
                    const isUnavailable = isDateUnavailable(date)
                    const isPartiallyBooked = isDatePartiallyBooked(date)
                    const isSelected = selectedDate && isSameDay(date, selectedDate)
                    const isCurrentMonth = isSameMonth(date, currentMonth)

                    return (
                      <button
                        key={i}
                        disabled={isUnavailable}
                        onClick={() => setSelectedDate(date)}
                        className={cn(
                          "h-8 w-full rounded-md flex items-center justify-center text-xs transition-colors relative",
                          isSelected && "bg-[#1e376b] text-white",
                          !isSelected && !isUnavailable && !isPartiallyBooked && "bg-[#e5edff] hover:bg-[#d1e0ff]",
                          !isSelected && isPartiallyBooked && "bg-[#fff3cd] hover:bg-[#ffe7a0]",
                          !isSelected && isUnavailable && "bg-gray-200 text-gray-400 cursor-not-allowed",
                          !isCurrentMonth && "opacity-40",
                          "focus:outline-none focus:ring-2 focus:ring-[#6cbdfc] focus:ring-opacity-50",
                        )}
                      >
                        {format(date, "d")}
                      </button>
                    )
                  })}
                </div>

                {/* Time Slots - with transition */}
                <div
                  className={cn(
                    "transition-all duration-300 overflow-hidden",
                    showTimeSlots ? "max-h-60 opacity-100" : "max-h-0 opacity-0",
                  )}
                >
                  {selectedDate && (
                    <>
                      <h3 className="text-xs font-medium text-gray-700 mb-2">
                        Available Times for {format(selectedDate, "MMMM d, yyyy")}
                      </h3>
                      {availableTimeSlots.length > 0 ? (
                        <div className="grid grid-cols-4 gap-1 mb-3">
                          {availableTimeSlots.map((time, index) => (
                            <button
                              key={index}
                              onClick={() => setSelectedTime(time)}
                              className={cn(
                                "py-1.5 px-1 rounded-md text-xs transition-colors border",
                                selectedTime === time
                                  ? "bg-[#1e376b] text-white border-[#1e376b]"
                                  : "border-gray-200 hover:bg-gray-50",
                                "focus:outline-none focus:ring-2 focus:ring-[#6cbdfc] focus:ring-opacity-50",
                              )}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-gray-500 mb-3">
                          No available time slots for this date. Please select another date.
                        </p>
                      )}
                    </>
                  )}
                </div>

                <div className="flex justify-between items-center pt-2 border-t">
                  <div>
                    {selectedDate && (
                      <div className="text-xs text-gray-600">
                        <span className="font-medium">Selected:</span> {format(selectedDate, "MMM d, yyyy")}
                        {selectedTime && <> at {selectedTime}</>}
                      </div>
                    )}
                  </div>
                  <Button
                    onClick={() => setStep(2)}
                    disabled={!selectedDate || !selectedTime}
                    className="bg-[#8c1c40] hover:bg-[#6cbdfc] transition-colors text-xs h-8 px-3"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <form onSubmit={handleSubmit} className="p-3">
                {!isViewOnly && (
                  <div className="mb-3 p-2 bg-gray-50 rounded-md text-xs">
                    <div className="flex items-center text-gray-700 mb-1">
                      <CalendarIcon className="h-3 w-3 mr-1 text-[#6cbdfc]" />
                      <span className="font-medium">{selectedDate && format(selectedDate, "MMMM d, yyyy")}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Clock className="h-3 w-3 mr-1 text-[#6cbdfc]" />
                      <span className="font-medium">{selectedTime}</span>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label htmlFor="first-name" className="text-xs">
                        First name
                      </Label>
                      <Input
                        id="first-name"
                        name="clientName"
                        value={formData.clientName}
                        onChange={handleChange}
                        className="h-8 text-xs"
                        required
                        disabled={isViewOnly}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="last-name" className="text-xs">
                        Last name
                      </Label>
                      <Input id="last-name" className="h-8 text-xs" disabled={isViewOnly} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="email" className="text-xs">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                      className="h-8 text-xs"
                      required
                      disabled={isViewOnly}
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="phone" className="text-xs">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      type="tel"
                      className="h-8 text-xs"
                      required
                      disabled={isViewOnly}
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="service" className="text-xs">
                      Service
                    </Label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full h-8 rounded-md border border-input bg-background px-3 py-1 text-xs ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      required
                      disabled={isViewOnly}
                    >
                      <option value="">Select a service</option>
                      <option value="Business Law">Business Law</option>
                      <option value="Property Law">Property Law</option>
                      <option value="Patent Law">Patent Law</option>
                      <option value="Corporate Law">Corporate Law</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {(mode === "edit" || mode === "view") && (
                    <div className="space-y-1">
                      <Label htmlFor="status" className="text-xs">
                        Status
                      </Label>
                      <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className={`w-full h-8 rounded-md border border-input px-3 py-1 text-xs ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                          formData.status === "confirmed"
                            ? "text-green-600 bg-green-50"
                            : formData.status === "pending"
                              ? "text-yellow-600 bg-yellow-50"
                              : "text-red-600 bg-red-50"
                        }`}
                        disabled={isViewOnly}
                      >
                        <option value="pending" className="bg-white text-yellow-600">
                          Pending
                        </option>
                        <option value="confirmed" className="bg-white text-green-600">
                          Confirmed
                        </option>
                        <option value="cancelled" className="bg-white text-red-600">
                          Cancelled
                        </option>
                      </select>
                    </div>
                  )}

                  <div className="space-y-1">
                    <Label htmlFor="message" className="text-xs">
                      Message (optional)
                    </Label>
                    <Textarea
                      id="message"
                      name="notes"
                      value={formData.notes || ""}
                      onChange={handleChange}
                      placeholder="Brief description of your legal needs"
                      className="min-h-[50px] text-xs resize-none"
                      disabled={isViewOnly}
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center mt-3 pt-2 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => (mode === "add" ? setStep(1) : onClose())}
                    className="text-xs h-8 px-3"
                  >
                    {mode === "add" ? "Back" : "Cancel"}
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[#8c1c40] hover:bg-[#6cbdfc] transition-colors text-xs h-8 px-3"
                    disabled={isViewOnly}
                  >
                    {mode === "add" ? "Confirm Appointment" : "Save Changes"}
                  </Button>
                </div>
              </form>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

