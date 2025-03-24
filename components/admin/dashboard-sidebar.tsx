"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Scale, LayoutDashboard, Calendar, FileText, LogOut, Menu, X, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface SidebarNavProps {
  isCollapsed: boolean
  onToggle: () => void
}

export function DashboardSidebar({ isCollapsed, onToggle }: SidebarNavProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const router = useRouter()

  const handleLogout = () => {
    // In a real app, you would clear auth tokens/cookies here
    // For example: localStorage.removeItem('authToken')

    // Redirect to login page
    router.push("/admin/login")
  }

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Appointments",
      href: "/admin/dashboard/appointments",
      icon: Calendar,
    },
    {
      name: "Blog Posts",
      href: "/admin/dashboard/blog",
      icon: FileText,
    },
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-30">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={cn(
          "fixed inset-0 z-20 bg-white/80 backdrop-blur-sm lg:hidden transition-opacity duration-300",
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
      >
        <div className="fixed inset-y-0 left-0 z-20 w-64 bg-white shadow-lg">
          <div className="flex h-14 items-center border-b px-4">
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-[#1e376b]">
                <Scale className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-[#1e376b]">Admin</span>
            </Link>
          </div>
          <div className="py-4">
            <nav className="space-y-1 px-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                    pathname === item.href ? "bg-[#1e376b]/10 text-[#1e376b]" : "text-gray-700 hover:bg-gray-100",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
            <div className="mt-auto px-2 py-4 border-t">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 w-full"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-10 hidden lg:flex flex-col border-r bg-white transition-all duration-300",
          isCollapsed ? "w-16" : "w-64",
        )}
      >
        <div className={cn("flex h-14 items-center border-b px-4", isCollapsed && "justify-center")}>
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-[#1e376b]">
              <Scale className="h-5 w-5 text-white" />
            </div>
            {!isCollapsed && <span className="text-lg font-bold text-[#1e376b]">Admin</span>}
          </Link>
          <Button variant="ghost" size="icon" onClick={onToggle} className="ml-auto">
            {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                  isCollapsed && "justify-center",
                  pathname === item.href ? "bg-[#1e376b]/10 text-[#1e376b]" : "text-gray-700 hover:bg-gray-100",
                )}
              >
                <item.icon className="h-5 w-5" />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            ))}
          </nav>
        </div>
        <div className={cn("border-t px-2 py-4", isCollapsed && "flex justify-center")}>
          <button
            onClick={handleLogout}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 w-full",
              isCollapsed && "justify-center",
            )}
          >
            <LogOut className="h-5 w-5" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  )
}

