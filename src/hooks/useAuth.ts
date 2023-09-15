import { useContext } from 'react'
import { AuthContext, type AuthContextProps } from '../context/AuthContext'

export const useAuth = (): AuthContextProps => {
  const { user, signup, isAuthenticated } = useContext(AuthContext)

  return {
    user,
    signup,
    isAuthenticated
  }
}
