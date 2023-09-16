import { useAuth } from '../hooks/useAuth'

export const NotesPage: React.FC = () => {
  const { user } = useAuth()
  console.log('🚀 ~ file: NotesPage.tsx:6 ~ user:', user)
  return (
    <div>NotesPage</div>
  )
}
