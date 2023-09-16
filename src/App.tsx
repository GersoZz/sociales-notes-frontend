import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

import { RegisterPage } from './pages/RegisterPage'
import { LoginPage } from './pages/LoginPage'
import { ProtectedRoute } from './components/ProtectedRoute'
import { NotesPage } from './pages/NotesPage'

function App (): JSX.Element {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element= {<h1 className='text-4xl font-bold'>Home Page</h1>}></Route>
          <Route path='/signup' element= {<RegisterPage/>}></Route>
          <Route path='/signin' element= {<LoginPage/>}></Route>
          <Route element={<ProtectedRoute/>}>
            <Route path='/notes' element= {<NotesPage/>}></Route>
            <Route path='/add-notes' element= {<h1 className='text-4xl font-bold'>New Task</h1>}></Route>
            <Route path='/notes/:id' element= {<h1 className='text-4xl font-bold'>Update Task</h1>}></Route>
            <Route path='/profile' element= {<h1 className='text-4xl font-bold'>Profile</h1>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
