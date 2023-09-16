import { useContext } from 'react'
import { AuthContext, type AuthContextProps } from '../context/AuthContext'

export const useAuth = (): AuthContextProps => {
  const { user, signup, signin, isAuthenticated, errors, loadingVerify } = useContext(AuthContext)

  return {
    user,
    signup,
    signin,
    isAuthenticated,
    errors,
    loadingVerify
  }
}
