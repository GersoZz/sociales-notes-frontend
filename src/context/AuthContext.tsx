import { createContext, useState } from 'react'
import { registerRequest, loginRequest } from '../api/auth'
import type { userSignIn, IUser, userSignUp } from '../interfaces/User'
import { handleError } from '../utils/request'

export interface AuthContextProps {
  user: IUser | null
  signup: (signUpInput: userSignUp) => Promise<void>
  signin: (signInInput: userSignIn) => Promise<void>
  errors: string[]
  isAuthenticated: boolean
}

export const AuthContext = createContext<AuthContextProps>({
  user: { id: '', username: '', email: '' },
  signup: async () => {},
  signin: async () => {},
  errors: [],
  isAuthenticated: false
})

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const AuthProvider: React.FC<Props> = ({ children }: Props) => {
  const [user, setUser] = useState<IUser | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

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

  return (
    <AuthContext.Provider
      value={{ user, errors, signup, signin, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  )
}
