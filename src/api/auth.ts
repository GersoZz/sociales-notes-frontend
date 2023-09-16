import type { AxiosResponse } from 'axios'
import type { userSignUp, userSignIn } from '../interfaces/User'
import axios from './axios'

export const registerRequest = async (user: userSignUp): Promise<AxiosResponse> => await axios.post('/auth/signup', user)

export const loginRequest = async (user: userSignIn): Promise<AxiosResponse> => await axios.post('/auth/signin', user)

export const verifyTokenRequest = async (): Promise<AxiosResponse> => await axios.post('/auth/verify')
