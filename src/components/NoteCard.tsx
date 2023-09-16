import { Link } from 'react-router-dom'
import { type INote } from '../interfaces/Notes'
import { useNotes } from '../hooks/useNotes'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

interface NoteCardProps {
  note: INote
}

export const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  const { deleteNote } = useNotes()

  const handleDelete = (): void => {
    deleteNote(note._id).catch(err => { console.log(err) })
  }

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{note.title}</h1>
        <div className="flex gap-x-2 items-center">
          <button className="bg-indigo-500 px-4 py-1 rounded-md my-2 disabled:bg-indigo-300"
           onClick={handleDelete}>Delete</button>
          <Link className="bg-indigo-500 px-4 py-1 rounded-md" to={`/notes/${note._id}`}>Edit</Link>
        </div>
      </header>
      <p className="text-slate-300">{note.description}</p>
      <p>
        {dayjs.utc(note.date).format('DD/MM/YY')}
      </p>
    </div>
  )
}
