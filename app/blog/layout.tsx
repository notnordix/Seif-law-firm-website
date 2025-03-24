import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Legal Blog | Insights & Updates",
  description:
    "Stay informed with our latest articles on legal topics, case studies, and industry trends in business and commercial law.",
  openGraph: {
    title: "Legal Blog | Seif Law Firm",
    description:
      "Stay informed with our latest articles on legal topics, case studies, and industry trends in business and commercial law.",
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

