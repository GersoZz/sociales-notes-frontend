import axios, { type AxiosResponse } from 'axios'
import type { userSignUp, userSignIn } from '../interfaces/User'

const API = 'http://localhost:3000/api/v1'

export const registerRequest = async (user: userSignUp): Promise<AxiosResponse> => await axios.post(`${API}/auth/signup`, user)

export const loginRequest = async (user: userSignIn): Promise<AxiosResponse> => await axios.post(`${API}/auth/signin`, user)
