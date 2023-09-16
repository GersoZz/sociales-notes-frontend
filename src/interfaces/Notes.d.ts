export interface NoteInput {
  title: string
  description: string
  date: string
}

export interface NoteUpd {
  title?: string
  description?: string
  date?: string
}

export interface INote {
  _id: string
  title: string
  description: string
  date: string
}
