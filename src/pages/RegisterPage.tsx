import { useState, useEffect } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { AxiosError } from 'axios'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

interface RegisterInputs {
  username: string
  email: string
  password: string
}

export const RegisterPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterInputs>()

  const { signup, isAuthenticated } = useAuth()

  const [axiosErrors, setAxiosErrors] = useState<string[]>([])
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    try {
      console.log(data)
      await signup(data)
    } catch (error) {
      if (error instanceof AxiosError) {
        const data = error?.response?.data

        // q necesidad de manejar los errores en el contexto ?
        console.log('🚀 ~ file: data:', data)
        if (data.data.type === 'ZodError') {
          const axiosErrorArr = data.data.message.map((e: any) => {
            return e.message
          })
          console.log('🚀 ~ file: axiosErrorArr:', axiosErrorArr)

          setAxiosErrors(axiosErrorArr)
        } else {
          console.log([data.data.message])
          setAxiosErrors([data.data.message])
        }
      } else {
        console.log(error) // un error que no es de axios
      }
    }
  }

  useEffect(() => {
    if (isAuthenticated) navigate('/tasks')
  }, [isAuthenticated])

  return (
    <div className="bg-zinc-800 max-w-md p-10 rounded-md">
      {axiosErrors.length > 0 && (
        <ul className="list-decimal">
          {axiosErrors.map((e, id) => {
            return (
              <li className="text-red-500" key={id}>
                {e}
              </li>
            )
          })}
        </ul>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register('username', { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Username"
        />
        {errors.username !== undefined && (
          <p className="text-red-500">Username is required</p>
        )}
        <input
          type="email"
          {...register('email', { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Email"
        />
        {errors.email !== undefined && (
          <p className="text-red-500">Email is required</p>
        )}
        <input
          type="password"
          {...register('password', { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Password"
        />
        {errors.password !== undefined && (
          <p className="text-red-500">Password is required</p>
        )}
        <button type="submit">Register</button>
      </form>
    </div>
  )
}
