import { useEffect } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { useAuth } from '../hooks/useAuth'
import { Link, useNavigate } from 'react-router-dom'

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

  const { signup, isAuthenticated, errors: axiosErrors } = useAuth()

  const navigate = useNavigate()

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    await signup(data)
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
        <h1 className="text-2xl font-bold">Register</h1>

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
          <button
            className="bg-indigo-500 px-4 py-1 rounded-md my-2 disabled:bg-indigo-300"
            type="submit"
          >
            Register
          </button>
        </form>
        <p className="flex gap-x-2 justify-between">
          Already Have an Account?
          <Link to="/signin" className="text-sky-500">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}
