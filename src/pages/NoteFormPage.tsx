import { useEffect } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { type NoteInput } from '../interfaces/Notes'
import { useNotes } from '../hooks/useNotes'

export const NoteFormPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<NoteInput>()

  const { createNote, getNote, updateNote } = useNotes()
  const navigate = useNavigate()

  const { id } = useParams()

  const onSubmit: SubmitHandler<NoteInput> = (data) => {
    if (id !== undefined) {
      updateNote(id, data).then(() => {
        navigate('/notes')
      }).catch(err => {
        console.log(err)
      })
    } else {
      createNote(data).then(() => {
        navigate('/notes')
      }).catch(err => {
        console.log(err)
      })
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      getNote(id)
        .then(note => {
          if (note !== undefined) {
            setValue('title', note?.title)
            setValue('description', note?.description)
          }
        })
        .catch(err => { console.log(err) })
    }
  }, [])

  return (
    <div className="h-[calc(100vh-100px)] flex items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <h1 className="text-2xl font-bold">{ id !== undefined ? 'Update Note' : 'Create New Note'}</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            {...register('title', { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Title"
          />
          {errors.title !== undefined && (
            <p className="text-red-500">Title is required</p>
          )}
          <input
            type="text"
            {...register('description')}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Description"
          />
          {/*           <input
            type="date"
            {...register('date')}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Date"
          /> */}

          <button
            className="bg-indigo-500 px-4 py-1 rounded-md my-2 disabled:bg-indigo-300"
            type="submit"
          >
            { id !== undefined ? 'Update' : 'Create'}
          </button>
        </form>
        <p className="flex gap-x-2 flex-row-reverse">
          <Link to="/notes" className="text-sky-500">
            View Notes
          </Link>
        </p>
      </div>
    </div>
  )
}
