import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | Our Legal Team",
  description: "Learn about Seif Law Firm, our history, values, and expert legal team led by Ayoub Seif El Islam.",
  openGraph: {
    title: "About Seif Law Firm",
    description: "Learn about Seif Law Firm, our history, values, and expert legal team led by Ayoub Seif El Islam.",
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

