import { Resend } from "resend"

// Initialize Resend with API key from environment variables
export const resend = new Resend(process.env.RESEND_API_KEY)

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

