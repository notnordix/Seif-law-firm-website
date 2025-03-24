"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, you would check for a valid auth token
    // This is a simple mock implementation
    const checkAuth = () => {
      // For demo purposes, we'll consider the user authenticated if they're on the login page
      // or if they've navigated from the login page (simulating a successful login)
      const isLoginPage = pathname === "/admin/login"

      // In a real app, you would check localStorage or cookies for auth tokens
      const hasAuthToken =
        typeof window !== "undefined" &&
        (localStorage.getItem("isLoggedIn") === "true" || sessionStorage.getItem("isLoggedIn") === "true")

      if (!isLoginPage && !hasAuthToken) {
        router.push("/admin/login")
      } else {
        setIsAuthenticated(true)
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [pathname, router])

  // Show nothing while checking authentication
  if (isLoading) {
    return null
  }

  // If we're on the login page or authenticated, show the children
  return <>{children}</>
}

