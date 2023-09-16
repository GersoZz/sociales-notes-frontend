import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export const Navbar: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth()
  // const { isAuthenticated, logout, user } = useAuth()
  console.log(isAuthenticated, user)

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
      <h1 className="text-2xl font-bold">
        <Link to={isAuthenticated ? '/notes' : '/'}>Social Notes</Link>
      </h1>
      <ul className="flex gap-x-2">
        {
          isAuthenticated
            ? <>
                <li>
                  Welcome {user?.username}
                </li>
                <li>
                  <Link className="bg-indigo-500 px-4 py-1 rounded-md" to="/add-notes">Add Task</Link>
                </li>
                <li>
                  <Link className="bg-indigo-500 px-4 py-1 rounded-md" to="/" onClick={() => { logout() }} >
                    Logout
                  </Link>
                </li>
              </>

            : <>
                <li>
                  <Link className="bg-indigo-500 px-4 py-1 rounded-md" to="/signin">Login</Link>
                </li>
                <li>
                  <Link className="bg-indigo-500 px-4 py-1 rounded-md" to="/signup">Register</Link>
                </li>
              </>
        }
      </ul>
    </nav>
  )
}
