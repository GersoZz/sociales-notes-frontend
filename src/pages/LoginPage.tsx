import { useEffect } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { useAuth } from '../hooks/useAuth'
import { Link, useNavigate } from 'react-router-dom'

interface LoginInputs {
  email: string
  password: string
}

export const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginInputs>()

  const { signin, isAuthenticated, errors: axiosErrors } = useAuth()

  const navigate = useNavigate()

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    await signin(data)
  }

  useEffect(() => {
    if (isAuthenticated) navigate('/notes')
  }, [isAuthenticated])

  return (
    <div className="h-[calc(100vh-100px)] flex items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        {axiosErrors.length > 0 && (
          <ul className="list-decimal">
            {axiosErrors.map((err, id) => {
              return (
                <li className="text-red-500" key={id}>
                  {err}
                </li>
              )
            })}
          </ul>
        )}
        <h1 className="text-2xl font-bold">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
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
          <button
            className="bg-indigo-500 px-4 py-1 rounded-md my-2 disabled:bg-indigo-300"
            type="submit"
          >
            Login
          </button>
        </form>
        <p className="flex gap-x-2 justify-between">
          Don&#39;t have an account?
          <Link to="/signup" className="text-sky-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
