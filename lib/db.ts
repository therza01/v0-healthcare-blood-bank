import { neon } from "@neondatabase/serverless"

// Create a reusable SQL client
export const sql = neon(process.env.DATABASE_URL!)

// Helper to get a single row
export async function queryRow<T>(query: string, params?: unknown[]): Promise<T | null> {
  const result = await sql(query, params)
  return (result[0] as T) || null
}

// Helper to get multiple rows
export async function queryRows<T>(query: string, params?: unknown[]): Promise<T[]> {
  const result = await sql(query, params)
  return result as T[]
}
