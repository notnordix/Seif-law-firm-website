import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(req: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const date = searchParams.get("date")
    const status = searchParams.get("status")

    let sql = `
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
    `

    const params: any[] = []
    const conditions: string[] = []

    if (date) {
      conditions.push("appointment_date = ?")
      params.push(date)
    }

    if (status) {
      conditions.push("status = ?")
      params.push(status)
    }

    if (conditions.length > 0) {
      sql += " WHERE " + conditions.join(" AND ")
    }

    sql += " ORDER BY appointment_date ASC, appointment_time ASC"

    const appointments = await query(sql, params)

    return NextResponse.json({ appointments })
  } catch (error) {
    console.error("Error fetching appointments:", error)
    return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const { clientName, email, phone, date, time, service, notes } = data

    // Validate required fields
    if (!clientName || !email || !date || !time || !service) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Insert appointment
    const sql = `
      INSERT INTO appointments (
        client_name, 
        client_email, 
        client_phone, 
        appointment_date, 
        appointment_time, 
        service_type, 
        message, 
        status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')
    `

    const result = await query(sql, [clientName, email, phone, date, time, service, notes || ""])

    return NextResponse.json({
      success: true,
      message: "Appointment created successfully",
      id: (result as any).insertId,
    })
  } catch (error) {
    console.error("Error creating appointment:", error)
    return NextResponse.json({ error: "Failed to create appointment" }, { status: 500 })
  }
}

