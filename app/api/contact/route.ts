import { type NextRequest, NextResponse } from "next/server"
import { resend } from "@/lib/resend"
import ContactFormEmail from "@/components/emails/contact-form-email"

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const { name, email, message } = data

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Send email
    const { data: emailData, error } = await resend.emails.send({
      from: "Contact Form <contact@seiflawfirm.com>",
      to: ["ayoub.seif@seiflawfirm.com"],
      subject: `New Contact Form Submission from ${name}`,
      react: ContactFormEmail({ name, email, message }),
      reply_to: email,
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

