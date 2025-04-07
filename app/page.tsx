import { Suspense } from "react"
import { CreateNoteForm } from "@/components/create-note-form"
import { NotesList } from "@/components/notes-list"

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Simple Notes App</h1>

      <div className="max-w-3xl mx-auto mb-8">
        <CreateNoteForm />
      </div>

      <h2 className="text-2xl font-semibold mb-4">Your Notes</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Suspense
          fallback={
            <div className="col-span-full text-center p-4">
              <p>Loading notes...</p>
            </div>
          }
        >
          <NotesList />
        </Suspense>
      </div>
    </main>
  )
}

