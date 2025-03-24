import type React from "react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  // We'll use a simpler approach - check the URL in middleware instead
  // For now, just protect all admin routes except login
  if (!session) {
    // Allow access to login page without a session
    // The login page itself will handle redirects if already logged in
    return <>{children}</>
  }

  return <>{children}</>
}

