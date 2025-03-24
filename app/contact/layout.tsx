import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us | Legal Consultation",
  description:
    "Get in touch with Seif Law Firm for expert legal advice and consultation. Schedule a meeting with our attorneys today.",
  openGraph: {
    title: "Contact Seif Law Firm",
    description:
      "Get in touch with Seif Law Firm for expert legal advice and consultation. Schedule a meeting with our attorneys today.",
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

