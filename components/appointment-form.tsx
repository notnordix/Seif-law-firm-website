"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"

export function AppointmentForm() {
  const [formData, setFormData] = useState({
    clientName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    service: "",
    notes: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit appointment")
      }

      setSuccess(true)
      setFormData({
        clientName: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        service: "",
        notes: "",
      })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSuccess(false)
      }, 5000)
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success && (
        <div className="bg-green-50 p-4 rounded-md text-green-800 mb-4">
          Your appointment request has been submitted successfully. We will contact you shortly to confirm.
        </div>
      )}

      {error && <div className="bg-red-50 p-4 rounded-md text-red-800 mb-4">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="clientName">Full Name</Label>
          <Input id="clientName" name="clientName" value={formData.clientName} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="service">Service</Label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            required
          >
            <option value="">Select a service</option>
            <option value="Business Law">Business Law</option>
            <option value="Property Law">Property Law</option>
            <option value="Intellectual Property">Intellectual Property</option>
            <option value="Corporate Law">Corporate Law</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Preferred Date</Label>
          <Input
            id="date"
            name="date"
            type="date"
            min={format(new Date(), "yyyy-MM-dd")}
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="time">Preferred Time</Label>
          <Input id="time" name="time" type="time" value={formData.time} onChange={handleChange} required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Message (Optional)</Label>
        <Textarea
          id="notes"
          name="notes"
          placeholder="Please provide any additional details about your legal needs"
          value={formData.notes}
          onChange={handleChange}
          className="min-h-[120px]"
        />
      </div>

      <Button type="submit" className="w-full bg-[#1e376b] hover:bg-[#8c1c40]" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Request Appointment"}
      </Button>
    </form>
  )
}

