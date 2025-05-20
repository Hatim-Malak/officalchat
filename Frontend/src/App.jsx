import React from 'react'
import { Routes,Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import Navbar from "./components/Navbar.jsx"
import { useAuthstore } from './store/useAuthStore.js'
import { useEffect } from 'react'
import {Loader} from "lucide-react"
import { Toaster } from 'react-hot-toast'
import AboutPage from './pages/AboutPage.jsx'

const App = () => {
  const {authUser,checkAuth,isCheckingAuth} = useAuthstore()

  useEffect(() => {
    checkAuth()

  }, [checkAuth])
  
  console.log({authUser})
  if(isCheckingAuth&&!authUser){
    return(
      <div className=' flex justify-center items-center h-[607px]'>
        <Loader className="size-10 animate-spin" />
      </div>
    )
  }

  return (
    <div className= "">
      <Routes>
        <Route path='/' element={authUser?<HomePage/>:<Navigate to="/login" />}/>
        <Route path='/signup' element={!authUser?<SignupPage/>:<Navigate to="/" />}/>
        <Route path='/login' element={!authUser?<LoginPage/>:<Navigate to="/" />}/>
        <Route path='/profile' element={authUser?<ProfilePage/>:<Navigate to='/login'/>}/>
        <Route path='/About' element={<AboutPage/>}/>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App