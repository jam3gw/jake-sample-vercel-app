import { neon, type NeonQueryFunction } from "@neondatabase/serverless"

// Create a singleton SQL client to avoid too many connections
let sql: NeonQueryFunction<any, any>

export function getSQLClient() {
  if (!sql) {
    sql = neon(process.env.DATABASE_URL!)
  }
  return sql
}

// Type for our Note
export type Note = {
  id: number
  content: string
  created_at: string
}

// Function to get all notes with error handling
export async function getNotes(): Promise<Note[]> {
  try {
    const sql = getSQLClient()
    const notes = await sql`
      SELECT * FROM notes ORDER BY created_at DESC
    `
    return notes as Note[]
  } catch (error) {
    console.error("Error fetching notes:", error)
    return []
  }
}

// Function to create a new note
export async function createNote(content: string): Promise<Note | null> {
  try {
    const sql = getSQLClient()
    const result = await sql`
      INSERT INTO notes (content) VALUES (${content}) 
      RETURNING *
    `
    return (result as Note[])[0] || null
  } catch (error) {
    console.error("Error creating note:", error)
    return null
  }
}

// Function to delete a note
export async function deleteNote(id: number): Promise<boolean> {
  try {
    const sql = getSQLClient()
    await sql`DELETE FROM notes WHERE id = ${id}`
    return true
  } catch (error) {
    console.error("Error deleting note:", error)
    return false
  }
}

