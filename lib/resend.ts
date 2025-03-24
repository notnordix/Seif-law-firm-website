import { Resend } from "resend"

// Initialize Resend with API key from environment variables
// Only create a real instance if the API key is available
export const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : ({
      emails: {
        send: async () => {
          console.warn("No RESEND_API_KEY provided. Email sending is disabled.")
          return { data: null, error: new Error("No API key provided") }
        },
      },
    } as unknown as Resend)

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

