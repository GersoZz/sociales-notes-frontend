import { AxiosError } from 'axios'

interface handleErrorType {
  error: any
  setErrors: React.Dispatch<React.SetStateAction<string[]>>
}

export const handleError = ({ error, setErrors }: handleErrorType): void => {
  if (error instanceof AxiosError) {
    const data = error?.response?.data

    if (data.data.type === 'ZodError') {
      const axiosErrorArr = data.data.message.map((e: any) => {
        return e.message
      })
      setErrors(axiosErrorArr)
    } else {
      setErrors([data.data.message])
    }
  } else {
    console.log(error)
  }
}
