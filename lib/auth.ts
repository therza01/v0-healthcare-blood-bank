import { sql, queryRow } from "./db"
import { cookies } from "next/headers"

// Simple hash function for passwords (in production, use bcrypt)
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password + process.env.PASSWORD_SALT || "damu_salama_salt")
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const passwordHash = await hashPassword(password)
  return passwordHash === hash
}

// Generate a secure session token
export function generateSessionToken(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

// Create a session for a user
export async function createSession(userId: number): Promise<string> {
  const token = generateSessionToken()
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

  await sql`
    INSERT INTO sessions (user_id, token, expires_at)
    VALUES (${userId}, ${token}, ${expiresAt.toISOString()})
  `

  // Set the session cookie
  const cookieStore = await cookies()
  cookieStore.set("session_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  })

  return token
}

// Get the current user from session
export async function getCurrentUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get("session_token")?.value

  if (!token) return null

  const result = await queryRow<{
    id: number
    email: string
    role: string
    is_verified: boolean
  }>(
    `SELECT u.id, u.email, u.role, u.is_verified
     FROM users u
     JOIN sessions s ON u.id = s.user_id
     WHERE s.token = $1 AND s.expires_at > NOW()`,
    [token],
  )

  return result
}

// Get user with profile data
export async function getCurrentUserWithProfile() {
  const user = await getCurrentUser()
  if (!user) return null

  let profile = null

  if (user.role === "hospital") {
    profile = await queryRow(`SELECT * FROM hospitals WHERE user_id = $1`, [user.id])
  } else if (user.role === "donor") {
    profile = await queryRow(`SELECT * FROM donors WHERE user_id = $1`, [user.id])
  } else if (user.role === "rider") {
    profile = await queryRow(`SELECT * FROM riders WHERE user_id = $1`, [user.id])
  }

  return { ...user, profile }
}

// Logout - destroy session
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies()
  const token = cookieStore.get("session_token")?.value

  if (token) {
    await sql`DELETE FROM sessions WHERE token = ${token}`
    cookieStore.delete("session_token")
  }
}
