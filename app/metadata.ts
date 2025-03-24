import type { Metadata } from "next"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),
  title: {
    default: "Seif Law Firm",
    template: "%s | Seif Law Firm",
  },
  description: "Professional legal services for businesses and individuals in Morocco.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXTAUTH_URL || "http://localhost:3000",
    siteName: "Seif Law Firm",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Seif Law Firm",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seif Law Firm",
    description: "Professional legal services for businesses and individuals in Morocco.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

