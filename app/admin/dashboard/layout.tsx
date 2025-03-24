"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { DashboardSidebar } from "@/components/admin/dashboard-sidebar"
import { cn } from "@/lib/utils"
import AuthCheck from "../auth-check"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Load sidebar state from localStorage if available
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sidebarCollapsed")
      return saved ? JSON.parse(saved) : false
    }
    return false
  })

  // Save sidebar state to localStorage when it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sidebarCollapsed", JSON.stringify(sidebarCollapsed))
    }
  }, [sidebarCollapsed])

  return (
    <AuthCheck>
      <div className="min-h-screen bg-gray-50 font-roboto">
        <DashboardSidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

        <main
          className={cn(
            "min-h-screen transition-all duration-300 pt-14 lg:pt-0",
            sidebarCollapsed ? "lg:pl-16" : "lg:pl-64",
          )}
        >
          {children}
        </main>
      </div>
    </AuthCheck>
  )
}

