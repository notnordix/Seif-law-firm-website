import { type NextRequest, NextResponse } from "next/server"
import { query, queryRow } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = params.id

    const sql = `
      SELECT 
        id,
        client_name as clientName,
        client_email as email,
        client_phone as phone,
        service_type as service,
        message as notes,
        DATE_FORMAT(appointment_date, '%Y-%m-%d') as date,
        TIME_FORMAT(appointment_time, '%H:%i') as time,
        status
      FROM appointments
      WHERE id = ?
    `

    const appointment = await queryRow(sql, [id])

    if (!appointment) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 })
    }

    return NextResponse.json({ appointment })
  } catch (error) {
    console.error("Error fetching appointment:", error)
    return NextResponse.json({ error: "Failed to fetch appointment" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = params.id
    const data = await req.json()
    const { clientName, email, phone, date, time, service, notes, status } = data

    // Validate required fields
    if (!clientName || !email || !date || !time || !service || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Update appointment
    const sql = `
      UPDATE appointments
      SET 
        client_name = ?, 
        client_email = ?, 
        client_phone = ?, 
        appointment_date = ?, 
        appointment_time = ?, 
        service_type = ?, 
        message = ?, 
        status = ?
      WHERE id = ?
    `

    await query(sql, [clientName, email, phone, date, time, service, notes || "", status, id])

    return NextResponse.json({
      success: true,
      message: "Appointment updated successfully",
    })
  } catch (error) {
    console.error("Error updating appointment:", error)
    return NextResponse.json({ error: "Failed to update appointment" }, { status: 500 })
  }
}

