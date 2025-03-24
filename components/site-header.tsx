"use client"

import Link from "next/link"
import { Scale, Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { BookAppointmentButton } from "@/components/book-appointment-button"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  // Make header transparent on hero sections of main pages
  const isTransparentHeader =
    pathname === "/" ||
    pathname === "/about" ||
    pathname === "/blog" ||
    pathname.startsWith("/blog/") ||
    pathname === "/contact"

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      if (offset > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Close mobile menu when changing routes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ]

  const headerBg = scrolled || !isTransparentHeader ? "bg-white shadow-sm" : "bg-transparent"

  const textColor = scrolled || !isTransparentHeader ? "text-[#1e376b]" : "text-white"

  const activeTextColor = scrolled || !isTransparentHeader ? "text-[#6cbdfc]" : "text-white font-medium"

  return (
    <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", headerBg)}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 z-20">
            <div
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-md transition-colors duration-300",
                scrolled || !isTransparentHeader ? "bg-[#1e376b]" : "bg-white",
              )}
            >
              <Scale
                className={cn(
                  "h-5 w-5 transition-colors duration-300",
                  scrolled || !isTransparentHeader ? "text-white" : "text-[#1e376b]",
                )}
              />
            </div>
            <span className={cn("text-lg font-bold transition-colors duration-300", textColor)}>Seif Law Firm</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "text-sm font-medium transition-colors duration-300 hover:text-[#6cbdfc] relative py-1",
                  pathname === item.path ? activeTextColor : textColor,
                  pathname === item.path &&
                    "after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#6cbdfc]",
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Book Appointment Button - Desktop */}
          <div className="hidden md:block">
            <BookAppointmentButton
              className={cn("custom-btn", scrolled || !isTransparentHeader ? "primary-btn" : "secondary-btn")}
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden z-20 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? (
              <X className={cn("h-5 w-5", textColor)} />
            ) : (
              <Menu className={cn("h-5 w-5", textColor)} />
            )}
          </button>

          {/* Mobile Menu */}
          <div
            id="mobile-menu"
            className={cn(
              "fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden z-40",
              mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none",
            )}
            aria-hidden={!mobileMenuOpen}
          >
            <div
              className={cn(
                "fixed inset-y-0 right-0 z-50 w-72 bg-white shadow-xl transition-transform duration-300 ease-in-out",
                mobileMenuOpen ? "translate-x-0" : "translate-x-full",
              )}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between border-b px-4 h-16">
                  <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                    <div className="flex items-center justify-center w-8 h-8 rounded-md bg-[#1e376b]">
                      <Scale className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-lg font-bold text-[#1e376b]">Seif Law Firm</span>
                  </Link>
                  <button
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5 text-[#1e376b]" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-4">
                  <nav className="flex flex-col space-y-6">
                    {navItems.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center text-lg font-medium transition-colors duration-300 hover:text-[#6cbdfc]",
                          pathname === item.path ? "text-[#6cbdfc]" : "text-[#1e376b]",
                        )}
                      >
                        {item.name}
                        {pathname === item.path && <div className="ml-2 h-1.5 w-1.5 rounded-full bg-[#6cbdfc]"></div>}
                      </Link>
                    ))}
                  </nav>
                </div>

                <div className="border-t p-4">
                  {/* Book Appointment Button - Mobile */}
                  <BookAppointmentButton className="custom-btn primary-btn w-full justify-center" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

