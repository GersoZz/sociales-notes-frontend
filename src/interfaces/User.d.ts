export interface userSignUp {
  username: string
  email: string
  password: string
}

export interface userSignIn {
  email: string
  password: string
}

export interface IUser {
  id: string
  username: string
  email: string
}
