"use server"

import { sql, queryRow } from "@/lib/db"
import { hashPassword, verifyPassword, createSession, destroySession } from "@/lib/auth"
import { redirect } from "next/navigation"

// Type definitions
interface AuthResult {
  success: boolean
  error?: string
  user?: {
    id: number
    email: string
    role: string
  }
}

// Hospital Registration
export async function registerHospital(formData: FormData): Promise<AuthResult> {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const hospitalName = formData.get("hospitalName") as string
  const hospitalUID = formData.get("hospitalUID") as string
  const licenseNumber = formData.get("licenseNumber") as string
  const registrationNumber = formData.get("registrationNumber") as string

  try {
    // Check if email already exists
    const existingUser = await queryRow<{ id: number }>(`SELECT id FROM users WHERE email = $1`, [email])

    if (existingUser) {
      return { success: false, error: "Email already registered" }
    }

    // Check if hospital UID already exists
    const existingHospital = await queryRow<{ id: number }>(`SELECT id FROM hospitals WHERE uid = $1`, [hospitalUID])

    if (existingHospital) {
      return { success: false, error: "Hospital UID already registered" }
    }

    const passwordHash = await hashPassword(password)

    const userResult = await sql.query(
      `INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING id, email, role`,
      [email, passwordHash, "hospital"],
    )

    const userId = userResult.rows[0].id

    // Create hospital profile
    await sql.query(
      `INSERT INTO hospitals (user_id, name, uid, license_number, registration_number) VALUES ($1, $2, $3, $4, $5)`,
      [userId, hospitalName, hospitalUID, licenseNumber, registrationNumber],
    )

    // Create session
    await createSession(userId)

    return {
      success: true,
      user: { id: userId, email, role: "hospital" },
    }
  } catch (error) {
    console.error("Hospital registration error:", error)
    return { success: false, error: "Registration failed. Please try again." }
  }
}

// Donor Registration
export async function registerDonor(formData: FormData): Promise<AuthResult> {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const bloodType = formData.get("bloodType") as string
  const phone = formData.get("phone") as string
  const county = formData.get("county") as string

  try {
    // Check if email already exists
    const existingUser = await queryRow<{ id: number }>(`SELECT id FROM users WHERE email = $1`, [email])

    if (existingUser) {
      return { success: false, error: "Email already registered" }
    }

    const passwordHash = await hashPassword(password)

    const userResult = await sql.query(
      `INSERT INTO users (email, password_hash, role, is_verified) VALUES ($1, $2, $3, $4) RETURNING id, email, role`,
      [email, passwordHash, "donor", true],
    )

    const userId = userResult.rows[0].id

    // Create donor profile
    await sql.query(
      `INSERT INTO donors (user_id, first_name, last_name, blood_type, phone, county) VALUES ($1, $2, $3, $4, $5, $6)`,
      [userId, firstName, lastName, bloodType, phone, county],
    )

    // Create session
    await createSession(userId)

    return {
      success: true,
      user: { id: userId, email, role: "donor" },
    }
  } catch (error) {
    console.error("Donor registration error:", error)
    return { success: false, error: "Registration failed. Please try again." }
  }
}

// Rider Registration
export async function registerRider(formData: FormData): Promise<AuthResult> {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const phone = formData.get("phone") as string
  const vehicleType = formData.get("vehicleType") as string
  const licenseNumber = formData.get("licenseNumber") as string

  try {
    // Check if email already exists
    const existingUser = await queryRow<{ id: number }>(`SELECT id FROM users WHERE email = $1`, [email])

    if (existingUser) {
      return { success: false, error: "Email already registered" }
    }

    const passwordHash = await hashPassword(password)

    const userResult = await sql.query(
      `INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING id, email, role`,
      [email, passwordHash, "rider"],
    )

    const userId = userResult.rows[0].id

    // Create rider profile
    await sql.query(
      `INSERT INTO riders (user_id, first_name, last_name, phone, vehicle_type, license_number) VALUES ($1, $2, $3, $4, $5, $6)`,
      [userId, firstName, lastName, phone, vehicleType, licenseNumber],
    )

    // Create session
    await createSession(userId)

    return {
      success: true,
      user: { id: userId, email, role: "rider" },
    }
  } catch (error) {
    console.error("Rider registration error:", error)
    return { success: false, error: "Registration failed. Please try again." }
  }
}

// Login for all user types
export async function login(formData: FormData): Promise<AuthResult> {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  try {
    const user = await queryRow<{
      id: number
      email: string
      password_hash: string
      role: string
      is_verified: boolean
      is_active: boolean
    }>(`SELECT id, email, password_hash, role, is_verified, is_active FROM users WHERE email = $1`, [email])

    if (!user) {
      return { success: false, error: "Invalid email or password" }
    }

    if (!user.is_active) {
      return { success: false, error: "Account is deactivated" }
    }

    const isValidPassword = await verifyPassword(password, user.password_hash)

    if (!isValidPassword) {
      return { success: false, error: "Invalid email or password" }
    }

    // Create session
    await createSession(user.id)

    return {
      success: true,
      user: { id: user.id, email: user.email, role: user.role },
    }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, error: "Login failed. Please try again." }
  }
}

// Logout
export async function logout(): Promise<void> {
  await destroySession()
  redirect("/")
}
