import { type NextRequest, NextResponse } from "next/server"
import { resend, isValidEmail } from "@/lib/resend"
import ContactFormEmail from "@/components/emails/contact-form-email"

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json()
    const { firstName, lastName, email, phone, subject, message, service } = body

    // Validate required fields
    if (!firstName || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    // Prepare full name
    const fullName = lastName ? `${firstName} ${lastName}` : firstName

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Seif Law Firm Website <contact@seiflawfirm.com>",
      to: ["contact@seiflawfirm.com"], // Your law firm email
      subject: `New Contact Form Submission: ${subject || "No Subject"}`,
      react: ContactFormEmail({
        firstName,
        lastName,
        email,
        phone,
        subject,
        message,
        service,
      }),
      reply_to: email,
    })

    if (error) {
      console.error("Resend API error:", error)
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }

    // Return success response
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

