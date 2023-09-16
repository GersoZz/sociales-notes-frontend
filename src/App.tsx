import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

import { RegisterPage } from './pages/RegisterPage'
import { LoginPage } from './pages/LoginPage'
import { ProtectedRoute } from './components/ProtectedRoute'
import { NotesPage } from './pages/NotesPage'
import { NoteFormPage } from './pages/NoteFormPage'
import { NotesProvider } from './context/NotesContext'
import { Navbar } from './components/NavBar'

function App (): JSX.Element {
  return (
    <NotesProvider>
      <AuthProvider>
        <BrowserRouter>
          <main className="container content-container mx-auto px-10 md:px-0">
          <Navbar/>
          <Routes>
            <Route path='/' element= {<h1 className='text-4xl font-bold'>Home Page</h1>}></Route>
            <Route path='/signup' element= {<RegisterPage/>}></Route>
            <Route path='/signin' element= {<LoginPage/>}></Route>
            <Route element={<ProtectedRoute/>}>
              <Route path='/notes' element= {<NotesPage/>}></Route>
              <Route path='/add-notes' element= {<NoteFormPage/>}></Route>
              <Route path='/notes/:id' element= {<h1 className='text-4xl font-bold'>Update Task</h1>}></Route>
              <Route path='/profile' element= {<h1 className='text-4xl font-bold'>Profile</h1>}></Route>
            </Route>
          </Routes>
          </main>
        </BrowserRouter>
      </AuthProvider>
    </NotesProvider>
  )
}

export default App
