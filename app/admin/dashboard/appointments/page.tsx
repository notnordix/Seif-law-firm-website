"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Check, X, CalendarIcon, Clock, User, Phone, Mail, Plus, ChevronLeft, ChevronRight } from "lucide-react"
import { AppointmentModal } from "@/components/admin/appointment-modal"
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
  parseISO,
} from "date-fns"
import { cn } from "@/lib/utils"

// Define the appointment type
type Appointment = {
  id: number
  clientName: string
  email: string
  phone: string
  date: Date | string
  time: string
  service: string
  notes?: string
  status: "pending" | "confirmed" | "cancelled"
}

// Make sure the appointments page is properly exported and accessible
// Check if there are any issues with the component that might prevent it from rendering

// Ensure the export is correct
export default function AppointmentsPage() {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<"add" | "view" | "edit">("add")
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  // Fetch appointments from the API
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/appointments")

        if (!response.ok) {
          throw new Error("Failed to fetch appointments")
        }

        const data = await response.json()

        // Convert date strings to Date objects
        const formattedAppointments = data.appointments.map((appointment: any) => ({
          ...appointment,
          date: appointment.date ? parseISO(appointment.date) : new Date(),
        }))

        setAppointments(formattedAppointments)
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching appointments")
        console.error("Error fetching appointments:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAppointments()
  }, [])

  // Function to handle opening the modal for adding a new appointment
  const handleAddAppointment = () => {
    setSelectedAppointment(null)
    setModalMode("add")
    setModalOpen(true)
  }

  // Function to handle opening the modal for viewing an appointment
  const handleViewAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setModalMode("view")
    setModalOpen(true)
  }

  // Function to handle opening the modal for editing an appointment
  const handleEditAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setModalMode("edit")
    setModalOpen(true)
  }

  // Function to handle saving an appointment (new or edited)
  const handleSaveAppointment = async (appointmentData: Appointment) => {
    try {
      if (modalMode === "add") {
        // Add new appointment
        const response = await fetch("/api/appointments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(appointmentData),
        })

        if (!response.ok) {
          throw new Error("Failed to create appointment")
        }

        const data = await response.json()

        // Add the new appointment to the state with the returned ID
        const newAppointment = {
          ...appointmentData,
          id: data.id,
        }

        setAppointments([...appointments, newAppointment])
      } else if (modalMode === "edit" && selectedAppointment) {
        // Update existing appointment
        const response = await fetch(`/api/appointments/${selectedAppointment.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(appointmentData),
        })

        if (!response.ok) {
          throw new Error("Failed to update appointment")
        }

        // Update the appointment in the state
        setAppointments(
          appointments.map((appointment) =>
            appointment.id === selectedAppointment.id ? { ...appointmentData, id: appointment.id } : appointment,
          ),
        )
      }
    } catch (err: any) {
      console.error("Error saving appointment:", err)
      alert(err.message || "An error occurred while saving the appointment")
    }
  }

  // Add these functions to handle appointment status changes
  const confirmAppointment = async (id: number) => {
    try {
      const appointmentToUpdate = appointments.find((a) => a.id === id)

      if (!appointmentToUpdate) {
        throw new Error("Appointment not found")
      }

      const response = await fetch(`/api/appointments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...appointmentToUpdate,
          status: "confirmed",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update appointment status")
      }

      setAppointments(
        appointments.map((appointment) =>
          appointment.id === id ? { ...appointment, status: "confirmed" } : appointment,
        ),
      )
    } catch (err: any) {
      console.error("Error confirming appointment:", err)
      alert(err.message || "An error occurred while confirming the appointment")
    }
  }

  const cancelAppointment = async (id: number) => {
    try {
      const appointmentToUpdate = appointments.find((a) => a.id === id)

      if (!appointmentToUpdate) {
        throw new Error("Appointment not found")
      }

      const response = await fetch(`/api/appointments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...appointmentToUpdate,
          status: "cancelled",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update appointment status")
      }

      setAppointments(
        appointments.map((appointment) =>
          appointment.id === id ? { ...appointment, status: "cancelled" } : appointment,
        ),
      )
    } catch (err: any) {
      console.error("Error cancelling appointment:", err)
      alert(err.message || "An error occurred while cancelling the appointment")
    }
  }

  // Function to format the date for display
  const formatDate = (date: Date | string) => {
    if (typeof date === "string") {
      return date
    }
    return format(date, "MMMM d, yyyy")
  }

  // Calendar navigation functions
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  // Calendar helper functions
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

  // Function to check if a date has appointments
  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter((appointment) => {
      const appointmentDate = appointment.date instanceof Date ? appointment.date : new Date(appointment.date as string)
      return isSameDay(appointmentDate, date)
    })
  }

  // Function to check if a date is unavailable
  const isDateUnavailable = (date: Date) => {
    // In a real app, you'd check against your database
    // For now, just check if it's in the past or a weekend
    return isPast(date) || isWeekend(date)
  }

  // Function to check if a date is partially booked
  const isDatePartiallyBooked = (date: Date) => {
    const appointmentsOnDate = getAppointmentsForDate(date)
    // Consider a date partially booked if it has 1-2 appointments
    return appointmentsOnDate.length > 0 && appointmentsOnDate.length < 3
  }

  // Function to check if a date is fully booked
  const isDateFullyBooked = (date: Date) => {
    const appointmentsOnDate = getAppointmentsForDate(date)
    // Consider a date fully booked if it has 3 or more appointments
    return appointmentsOnDate.length >= 3
  }

  const calendarDays = getCalendarDays()
  const weekDays = ["M", "T", "W", "T", "F", "S", "S"]

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e376b] mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading appointments...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 p-4 rounded-md text-red-800 mb-4">{error}</div>
        <Button onClick={() => window.location.reload()} className="bg-[#1e376b] hover:bg-[#8c1c40]">
          Retry
        </Button>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1e376b] font-roboto">Appointments</h1>
        <p className="text-gray-500">Manage client appointments</p>
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          </TabsList>
          <Button className="bg-[#1e376b] hover:bg-[#8c1c40]" onClick={handleAddAppointment}>
            <Plus className="mr-2 h-4 w-4" />
            New Appointment
          </Button>
        </div>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="font-roboto">Upcoming Appointments</CardTitle>
              <CardDescription>
                You have {appointments.filter((a) => a.status !== "cancelled").length} upcoming appointments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.length > 0 ? (
                  appointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex flex-col md:flex-row md:items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-[#1e376b] font-roboto">{appointment.clientName}</h3>
                          <Badge
                            className={
                              appointment.status === "confirmed"
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : appointment.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                  : "bg-red-100 text-red-800 hover:bg-red-100"
                            }
                          >
                            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <CalendarIcon className="mr-1 h-3 w-3" />
                            {formatDate(appointment.date)}
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-1 h-3 w-3" />
                            {appointment.time.includes(":") ? appointment.time : `${appointment.time} AM`}
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">{appointment.service}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-2 md:mt-0">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8"
                          onClick={() => handleViewAppointment(appointment)}
                        >
                          Details
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8"
                          onClick={() => handleEditAppointment(appointment)}
                        >
                          Edit
                        </Button>
                        {appointment.status !== "cancelled" && (
                          <>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 text-green-600"
                              onClick={() => confirmAppointment(appointment.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 text-red-600"
                              onClick={() => cancelAppointment(appointment.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-gray-500">No appointments found</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
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
                    <span>Partially Booked</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-[#f8d7da] rounded-full mr-1"></div>
                    <span>Fully Booked</span>
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
                    const isFullyBooked = isDateFullyBooked(date)
                    const isSelected = selectedDate && isSameDay(date, selectedDate)
                    const isCurrentMonth = isSameMonth(date, currentMonth)
                    const hasAppointments = getAppointmentsForDate(date).length > 0

                    return (
                      <button
                        key={i}
                        disabled={isUnavailable}
                        onClick={() => setSelectedDate(date)}
                        className={cn(
                          "h-8 w-full rounded-md flex items-center justify-center text-xs transition-colors relative",
                          isSelected && "bg-[#1e376b] text-white",
                          !isSelected &&
                            !isUnavailable &&
                            !isPartiallyBooked &&
                            !isFullyBooked &&
                            "bg-[#e5edff] hover:bg-[#d1e0ff]",
                          !isSelected && isPartiallyBooked && "bg-[#fff3cd] hover:bg-[#ffe7a0]",
                          !isSelected && isFullyBooked && "bg-[#f8d7da] hover:bg-[#f5c2c7]",
                          !isSelected && isUnavailable && "bg-gray-200 text-gray-400 cursor-not-allowed",
                          !isCurrentMonth && "opacity-40",
                          "focus:outline-none focus:ring-2 focus:ring-[#6cbdfc] focus:ring-opacity-50",
                        )}
                      >
                        {format(date, "d")}
                        {hasAppointments && !isSelected && (
                          <span className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-[#1e376b]"></span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Appointments for selected date */}
          <Card>
            <CardHeader>
              <CardTitle className="font-roboto">
                {selectedDate ? (
                  <span>Appointments for {format(selectedDate, "MMMM d, yyyy")}</span>
                ) : (
                  <span>Select a date</span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDate && (
                <div className="space-y-4">
                  {getAppointmentsForDate(selectedDate).length > 0 ? (
                    getAppointmentsForDate(selectedDate).map((appointment) => (
                      <div
                        key={appointment.id}
                        className="flex flex-col space-y-2 border-b pb-3 last:border-0 last:pb-0"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-[#6cbdfc]/10 flex items-center justify-center">
                              <User className="h-4 w-4 text-[#6cbdfc]" />
                            </div>
                            <div>
                              <p className="font-medium text-[#1e376b] font-roboto">{appointment.clientName}</p>
                              <p className="text-sm text-gray-500">
                                {appointment.time.includes(":") ? appointment.time : `${appointment.time} AM`} •{" "}
                                {appointment.service}
                              </p>
                            </div>
                          </div>
                          <Badge
                            className={
                              appointment.status === "confirmed"
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : appointment.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                  : "bg-red-100 text-red-800 hover:bg-red-100"
                            }
                          >
                            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 ml-10">
                          <div className="flex items-center">
                            <Phone className="mr-1 h-3 w-3" />
                            {appointment.phone}
                          </div>
                          <div className="flex items-center">
                            <Mail className="mr-1 h-3 w-3" />
                            {appointment.email}
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 text-xs"
                            onClick={() => handleViewAppointment(appointment)}
                          >
                            Details
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 text-xs"
                            onClick={() => handleEditAppointment(appointment)}
                          >
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-gray-500">No appointments scheduled for this date</div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Appointment Modal */}
      <AppointmentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        appointment={selectedAppointment}
        onSave={handleSaveAppointment}
        mode={modalMode}
      />
    </div>
  )
}

