import type React from "react"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  // Check if the path is /admin/login
  const isLoginPage = children.props?.childProp?.segment === "login"

  // If not authenticated and not on login page, redirect to login
  if (!session && !isLoginPage) {
    redirect("/admin/login")
  }

  // If authenticated and on login page, redirect to dashboard
  if (session && isLoginPage) {
    redirect("/admin/dashboard")
  }

  return <>{children}</>
}

