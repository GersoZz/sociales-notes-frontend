import { useEffect } from 'react'
import { useNotes } from '../hooks/useNotes'
import { Link } from 'react-router-dom'

export const NotesPage: React.FC = () => {
  const { notes, getNotes } = useNotes()

  useEffect(() => {
    getNotes().catch(err => { console.log(err) })
  }, [])

  if (notes.length === 0) return (<h1>No hay notes</h1>)

  return (
    <div>
      {
        notes.map(note => {
          return <div key={note._id}>
            <ul>
              <li>{note.title} </li>
              <li>{note.description} </li>
              <li>{note.date} </li>
            </ul>
          </div>
        })
      }

      <p className="flex gap-x-2 flex-row-reverse">
        <Link to="/add-notes" className="text-sky-500">
          Create Note
        </Link>
      </p>
    </div>
  )
}
