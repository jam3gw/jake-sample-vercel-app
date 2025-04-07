"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { createNoteAction } from "@/lib/actions"
import { useRouter } from "next/navigation"

export function CreateNoteForm() {
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    try {
      setIsSubmitting(true)
      setError(null)

      const result = await createNoteAction(content)

      if (!result.success) {
        setError(result.error || "Failed to create note")
        return
      }

      setContent("")
      router.refresh()
    } catch (error) {
      console.error("Failed to create note:", error)
      setError("An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a New Note</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Textarea
            placeholder="Write your note here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="resize-none"
            required
          />
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="ml-auto" disabled={isSubmitting || !content.trim()}>
            {isSubmitting ? "Creating..." : "Create Note"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

