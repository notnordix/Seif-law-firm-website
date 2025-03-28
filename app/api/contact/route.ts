import { type NextRequest, NextResponse } from "next/server"
import { resend } from "@/lib/resend"
import ContactFormEmail from "@/components/emails/contact-form-email"

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const { firstName, lastName, email, message, subject, phone, service } = data

    // Validate required fields
    if (!firstName || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Send email
    const { data: emailData, error } = await resend.emails.send({
      from: "Contact Form <contact@seiflawfirm.com>",
      to: ["ayoub.seif@seiflawfirm.com"],
      subject: `New Contact Form Submission from ${firstName} ${lastName || ""}`.trim(),
      react: ContactFormEmail({ firstName, lastName, email, phone, subject, message, service }),
      replyTo: email,
    })

    if (error) {
      console.error("Error sending email:", error)
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
      id: emailData?.id,
    })
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json({ error: "Failed to process contact form" }, { status: 500 })
  }
}

