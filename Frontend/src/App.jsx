import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom'
import Notes from './Pages/Notes'
import Profile from './Pages/Profile'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Home from './Pages/Home';
export default function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path="/notes/:id" element={<Notes />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='*' element={<h1>404 Not Found</h1>} />
      </Routes>     
    </div>
  )
}
