import { getNotes } from "@/lib/db"
import { NoteCard } from "@/components/note-card"
import { Card, CardContent } from "@/components/ui/card"

export async function NotesList() {
  const notes = await getNotes()

  if (!notes || notes.length === 0) {
    return (
      <Card className="col-span-full">
        <CardContent className="pt-6 text-center text-muted-foreground">
          No notes yet. Create your first note above!
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      {notes.map((note) => (
        <div key={note.id} className="h-full">
          <NoteCard id={note.id} content={note.content} createdAt={note.created_at} />
        </div>
      ))}
    </>
  )
}

