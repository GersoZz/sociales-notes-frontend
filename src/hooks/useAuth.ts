import { useContext } from 'react'
import { AuthContext, type AuthContextProps } from '../context/AuthContext'

export const useAuth = (): AuthContextProps => {
  const { user, logout, signup, signin, isAuthenticated, errors, loadingVerify } = useContext(AuthContext)

  return {
    user,
    logout,
    signup,
    signin,
    isAuthenticated,
    errors,
    loadingVerify
  }
}
