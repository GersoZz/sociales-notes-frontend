import { useContext } from 'react'
import { type NoteContextType, NotesContext } from '../context/NotesContext'

export const useNotes = (): NoteContextType => {
  const { createNote, deleteNote, getNote, getNotes, notes, setNotes, updateNote } =
    useContext(NotesContext)

  return {
    setNotes,
    createNote,
    deleteNote,
    getNote,
    getNotes,
    notes,
    updateNote
  }
}
