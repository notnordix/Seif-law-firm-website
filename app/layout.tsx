import type React from "react"
import "@/app/globals.css"
import { Great_Vibes, Poppins, Roboto } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"

// Great Vibes for titles (more readable than Imperial Script)
const greatVibes = Great_Vibes({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-great-vibes",
  display: "swap",
})

// Poppins for regular text
const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
})

// Roboto for admin pages
const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
})

export const metadata = {
  title: {
    default: "Seif Law Firm - Expert Legal Solutions",
    template: "%s | Seif Law Firm",
  },
  description:
    "Professional legal services with a focus on business and commercial law in Morocco. Expert attorneys providing comprehensive legal solutions since 2019.",
  keywords: [
    "law firm",
    "legal services",
    "business law",
    "commercial litigation",
    "Morocco",
    "Ayoub Seif El Islam",
    "attorney",
    "lawyer",
  ],
  authors: [{ name: "Ayoub Seif El Islam" }],
  creator: "Seif Law Firm",
  publisher: "Seif Law Firm",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://seiflawfirm.com",
    title: "Seif Law Firm - Expert Legal Solutions",
    description: "Professional legal services with a focus on business and commercial law in Morocco.",
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
    title: "Seif Law Firm - Expert Legal Solutions",
    description: "Professional legal services with a focus on business and commercial law in Morocco.",
    images: ["/images/og-image.jpg"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${greatVibes.variable} ${poppins.variable} ${roboto.variable} font-poppins`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Script id="viewport-height-fix" strategy="afterInteractive">
          {`
            // Fix for mobile browser viewport height
            function setVH() {
              let vh = window.innerHeight * 0.01;
              document.documentElement.style.setProperty('--vh', \`\${vh}px\`);
            }
            
            // Set the height initially
            setVH();
            
            // Reset on resize and orientation change
            window.addEventListener('resize', setVH);
            window.addEventListener('orientationchange', setVH);
          `}
        </Script>
      </body>
    </html>
  )
}

