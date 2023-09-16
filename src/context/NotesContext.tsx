import { createContext, useState } from 'react'
import { type NoteInput, type INote, type NoteUpd } from '../interfaces/Notes'
import {
  getNotesReq,
  getNoteReq,
  createNoteReq,
  updateNoteReq,
  deleteNoteReq
} from '../api/notes'

export interface NoteContextType {
  notes: INote[]
  setNotes: React.Dispatch<React.SetStateAction<INote[]>>
  getNotes: () => Promise<void>
  createNote: (note: NoteInput) => Promise<void>
  getNote: (id: string) => Promise<void>
  updateNote: (id: string, note: NoteUpd) => Promise<void>
  deleteNote: (id: string) => Promise<void>
}

export const NotesContext = createContext<NoteContextType>({
  notes: [],
  setNotes: () => {},
  getNotes: async () => {},
  createNote: async () => {},
  getNote: async () => {},
  updateNote: async () => {},
  deleteNote: async () => {}
})

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const NotesProvider: React.FC<Props> = ({ children }: Props) => {
  const [notes, setNotes] = useState<INote[]>([])

  const getNotes = async (): Promise<void> => {
    try {
      const res = await getNotesReq()
      if (res.status === 200) {
        setNotes(res.data.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const createNote = async (note: NoteInput): Promise<void> => {
    try {
      const res = await createNoteReq(note)
      if (res.status === 200) {
        setNotes(res.data.data)
      }
    } catch (err) {
      console.log(err)
    }
  }
  const updateNote = async (id: string, note: NoteUpd): Promise<void> => {
    try {
      const res = await updateNoteReq(id, note)
      if (res.status === 200) {
        setNotes(res.data.data)
      }
    } catch (err) {
      console.log(err)
    }
  }
  const getNote = async (id: string): Promise<void> => {
    try {
      const res = await getNoteReq(id)
      if (res.status === 200) {
        setNotes(res.data.data)
      }
    } catch (err) {
      console.log(err)
    }
  }
  const deleteNote = async (id: string): Promise<void> => {
    try {
      const res = await deleteNoteReq(id)
      if (res.status === 200) {
        setNotes(res.data.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <NotesContext.Provider
      value={{ notes, setNotes, getNotes, createNote, getNote, updateNote, deleteNote }}
    >
      {children}
    </NotesContext.Provider>
  )
}
