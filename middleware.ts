import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // If it's not an admin path, don't do anything
  if (!path.startsWith("/admin")) {
    return NextResponse.next()
  }

  // Check if the user is authenticated
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // If it's the login page and the user is authenticated, redirect to dashboard
  if (path === "/admin/login" && token) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url))
  }

  // If it's not the login page and the user is not authenticated, redirect to login
  if (path !== "/admin/login" && !token) {
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }

  // Add security headers
  const response = NextResponse.next()
  response.headers.set("X-DNS-Prefetch-Control", "on")
  response.headers.set("X-XSS-Protection", "1; mode=block")
  response.headers.set("X-Frame-Options", "SAMEORIGIN")
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; frame-src 'self';",
  )
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), interest-cohort=()")

  return response
}

export const config = {
  matcher: ["/admin/:path*"],
}

