"use client"

import { useState } from "react"
import { Trash2 } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { deleteNoteAction } from "@/lib/actions"
import { useRouter } from "next/navigation"

interface NoteCardProps {
  id: number
  content: string
  createdAt: string
}

export function NoteCard({ id, content, createdAt }: NoteCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      setError(null)

      const result = await deleteNoteAction(id)

      if (!result.success) {
        setError(result.error || "Failed to delete note")
        return
      }

      router.refresh()
    } catch (error) {
      console.error("Failed to delete note:", error)
      setError("An unexpected error occurred")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <p className="whitespace-pre-wrap break-words">{content}</p>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2 border-t p-4">
        <div className="flex w-full justify-between items-center">
          <p className="text-xs text-muted-foreground">{new Date(createdAt).toLocaleString()}</p>
          <Button variant="secondary" size="icon" onClick={handleDelete} disabled={isDeleting}>
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete note</span>
          </Button>
        </div>

        {error && <p className="text-xs text-red-500 w-full text-center">{error}</p>}
      </CardFooter>
    </Card>
  )
}

