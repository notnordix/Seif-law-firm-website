import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { queryRow } from "@/lib/db"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        try {
          // Find user in database
          const user = await queryRow(
            "SELECT id, username, password, full_name, email, role FROM admins WHERE username = ? AND is_active = 1",
            [credentials.username],
          )

          if (!user) {
            console.log("User not found")
            return null
          }

          // Add this log to debug
          console.log("Found user:", { ...user, password: "HIDDEN" })

          // Add these logs right before the password comparison
          console.log("Credentials password length:", credentials.password.length)
          console.log("Password from DB length:", user.password.length)

          // Verify password
          const isValid = await bcrypt.compare(credentials.password, user.password)

          // Add this log to debug
          console.log("Password valid:", isValid)

          if (!isValid) {
            return null
          }

          // Update last login time
          await queryRow("UPDATE admins SET last_login = CURRENT_TIMESTAMP WHERE id = ?", [user.id])

          // Return user without password
          return {
            id: user.id.toString(),
            name: user.full_name,
            email: user.email,
            username: user.username,
            role: user.role,
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.username = user.username
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.username = token.username as string
        session.user.role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

