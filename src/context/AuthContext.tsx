import { createContext, useState, useEffect } from 'react'
import { registerRequest, loginRequest, verifyTokenRequest } from '../api/auth'
import type { userSignIn, IUser, userSignUp } from '../interfaces/User'
import { handleError } from '../utils/request'
import Cookies from 'js-cookie'
import { useNotes } from '../hooks/useNotes'

export interface AuthContextProps {
  user: IUser | null
  signup: (signUpInput: userSignUp) => Promise<void>
  signin: (signInInput: userSignIn) => Promise<void>
  logout: () => void
  errors: string[]
  isAuthenticated: boolean
  loadingVerify: boolean
}

export const AuthContext = createContext<AuthContextProps>({
  user: { id: '', username: '', email: '' },
  signup: async () => {},
  signin: async () => {},
  logout: async () => {},
  errors: [],
  isAuthenticated: false,
  loadingVerify: true
})

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const AuthProvider: React.FC<Props> = ({ children }: Props) => {
  const [user, setUser] = useState<IUser | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loadingVerify, setLoadingVerify] = useState(true)
  const { setNotes } = useNotes()

  const [errors, setErrors] = useState<string[]>([])

  useEffect(() => {
    const checkLogin = async (): Promise<void> => {
      const cookies = Cookies.get()
      if (!Object.prototype.hasOwnProperty.call(cookies, 'token')) {
        setIsAuthenticated(false)
        setLoadingVerify(false)
        return
      }

      try {
        const res = await verifyTokenRequest()
        if (res.status === 200) {
          setIsAuthenticated(true)
          setUser(res.data.data)
          setLoadingVerify(false)
          return
        }
        setIsAuthenticated(false)
      } catch (error) {
        setIsAuthenticated(false)
      }
      setLoadingVerify(false)
    }

    checkLogin().catch(err => { console.log(err) })
  }, [])

  const signup = async (signUpInput: userSignUp): Promise<void> => {
    try {
      const res = await registerRequest(signUpInput)
      if (res.status === 200) {
        setUser(res.data.data)
        setIsAuthenticated(true)
      }
    } catch (error) {
      handleError({ error, setErrors })
    }
  }

  const signin = async (signInInput: userSignIn): Promise<void> => {
    try {
      const res = await loginRequest(signInInput)
      if (res.status === 200) {
        setUser(res.data.data)
        setIsAuthenticated(true)
      }
    } catch (error) {
      handleError({ error, setErrors })
    }
  }

  const logout = (): void => {
    Cookies.remove('token')
    setUser(null)
    setIsAuthenticated(false)
    setNotes([])
  }

  return (
    <AuthContext.Provider
      value={{ user, errors, signup, signin, logout, isAuthenticated, loadingVerify }}
    >
      {children}
    </AuthContext.Provider>
  )
}
