import { createContext, useState } from 'react'
import { registerRequest } from '../api/auth'
import { type IUser, type userSignUp } from '../interfaces/User'

export interface AuthContextProps {
  user: IUser | null
  signup: (signUpInput: userSignUp) => Promise<void>
  isAuthenticated: boolean
}

export const AuthContext = createContext<AuthContextProps>({
  user: { id: '', username: '', email: '' },
  signup: async () => {},
  isAuthenticated: false
})

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const AuthProvider: React.FC<Props> = ({ children }: Props) => {
  const [user, setUser] = useState<IUser | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const signup = async (signUpInput: userSignUp): Promise<void> => {
    const res = await registerRequest(signUpInput)
    if (res.status === 200) {
      console.log('user 😀', res.data.data)
      setUser(res.data.data)
      setIsAuthenticated(true)
    }
  }

  return (
    <AuthContext.Provider value={{ user, signup, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}
