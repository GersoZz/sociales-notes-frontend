import { useContext } from 'react'
import { type NoteContextType, NotesContext } from '../context/NotesContext'

export const useNotes = (): NoteContextType => {
  const { createNote, deleteNote, getNote, getNotes, notes, updateNote } =
    useContext(NotesContext)

  return {
    createNote,
    deleteNote,
    getNote,
    getNotes,
    notes,
    updateNote
  }
}
