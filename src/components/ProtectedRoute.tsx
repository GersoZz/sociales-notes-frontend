import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, loadingVerify } = useAuth()

  if (loadingVerify) return <h1>Loading...</h1>
  if (!isAuthenticated && !loadingVerify) return <Navigate to="/login" replace />
  return <Outlet />
}
