import type { AxiosResponse } from 'axios'
import type { NoteInput, NoteUpd } from '../interfaces/Notes'
import axios from './axios'

export const getNotesReq = async (): Promise<AxiosResponse> => await axios.get('/notes/')
export const createNoteReq = async (note: NoteInput): Promise<AxiosResponse> => await axios.post('/notes/', note)
export const getNoteReq = async (id: string): Promise<AxiosResponse> => await axios.get(`/notes/${id}`)
export const updateNoteReq = async (id: string, note: NoteUpd): Promise<AxiosResponse> => await axios.put(`/notes/${id}`, note)
export const deleteNoteReq = async (id: string): Promise<AxiosResponse> => await axios.delete(`/notes/${id}`)
