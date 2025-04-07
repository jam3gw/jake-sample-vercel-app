"use server"

import { createNote, deleteNote } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function createNoteAction(content: string) {
  if (!content || !content.trim()) {
    return { success: false, error: "Note content cannot be empty" }
  }

  try {
    const note = await createNote(content.trim())

    if (!note) {
      return { success: false, error: "Failed to create note" }
    }

    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Failed to create note:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function deleteNoteAction(id: number) {
  if (!id || isNaN(id)) {
    return { success: false, error: "Invalid note ID" }
  }

  try {
    const success = await deleteNote(id)

    if (!success) {
      return { success: false, error: "Failed to delete note" }
    }

    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Failed to delete note:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

