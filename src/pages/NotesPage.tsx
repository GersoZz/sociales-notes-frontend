import { useEffect } from 'react'
import { useNotes } from '../hooks/useNotes'
import { NoteCard } from '../components/NoteCard'

export const NotesPage: React.FC = () => {
  const { notes, getNotes } = useNotes()

  useEffect(() => {
    getNotes().catch((err) => {
      console.log(err)
    })
  }, [])

  return (
    <>
      {notes.length === 0 && (
        <div className="flex justify-center items-center p-10">
          <div>
            <div className="text-6xl text-gray-400 m-auto my-2">
              <h1 className="font-bold text-xl">
                No tasks yet, please add a new task
              </h1>
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {notes.map((note) => {
          return <NoteCard key={note._id} note={note} />
        })}
      </div>
    </>
  )
}
