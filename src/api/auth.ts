import axios, { type AxiosResponse } from 'axios'
import { type userSignUp } from '../interfaces/User'

const API = 'http://localhost:3000/api/v1'

export const registerRequest = async (user: userSignUp): Promise<AxiosResponse> => await axios.post(`${API}/auth/signup`, user)
